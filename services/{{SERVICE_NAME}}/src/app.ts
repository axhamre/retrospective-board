import { swaggerUI } from '@hono/swagger-ui'
import { OpenAPIHono } from '@hono/zod-openapi'
import { HTTPException } from 'hono/http-exception'
import { createLoggerMiddleware, log } from '@tv4/node-kit-logger'
import { ObservabilityHandler } from '@tv4/node-kit-observability'
import { OpenFeature } from '@openfeature/server-sdk'
import { MetricsHook, TracingHook } from '@openfeature/open-telemetry-hooks'
import { createFeatureFlagProvider } from '@tv4/node-kit-features'
import env from './env.ts'
import routes from './endpoints/routes.ts'
import { getGeneratedClient } from './openfeature.ts'

export * from './errors.ts'

type SecurityScheme = {
  name: string
  scheme?: 'bearer' | 'basic'
}

export class HealthCheck {
  public healthy = () => Promise.resolve(true)
}

export type AppOptions = {
  healthCheck?: HealthCheck
  routes: OpenAPIHono<Env>
  securitySchemes?: SecurityScheme[]
}

const observability = new ObservabilityHandler(
  {
    name: env.SERVICE_NAME,
    version: env.SERVICE_VERSION,
    serviceInstanceId: env.SERVICE_INSTANCE_ID,
  },
  log.setCtx
)

export const customMetrics = observability.createCustomMetricsClient({
  helloWorldsIssued: {
    type: 'counter',
    name: 'hello_worlds_issued',
    description: 'Number of hello worlds issued',
    unit: '1',
  },
})

export type Env = {
  Variables: { err?: Error }
}

export const app = new OpenAPIHono<Env>()

const flagOpts = {
  appName: 'node-template',
  projectName: 'default',
  environment: env.ENVIRONMENT_TYPE === 'prod' ? 'production' : 'development',
  apiKey: env.UNLEASH_API_KEY,
  bootstrap: [],
}
if (env.ENVIRONMENT_TYPE !== 'local') {
  OpenFeature.setProvider(createFeatureFlagProvider(flagOpts))
  OpenFeature.addHooks(new TracingHook(), new MetricsHook())
}
export const featureClient = getGeneratedClient()

app.onError((err, c) => {
  if (err instanceof HTTPException) {
    return err.getResponse()
  }
  log.error(err)
  return c.body('Internal Server Error', 500)
})

app.doc31('/openapi.json', {
  openapi: '3.1.0',
  info: {
    title: env.SERVICE_NAME,
    version: env.SERVICE_VERSION,
  },
})

app.get('/health', (c) => {
  return c.json({ status: 'OK' }, 200)
})

app.get('/docs', swaggerUI({ url: '/openapi.json' }))
app.use(observability.createMiddleware())

app.use(createLoggerMiddleware())

app.route('/', routes)
