import { swaggerUI } from '@hono/swagger-ui'
import { OpenAPIHono } from '@hono/zod-openapi'
import { HTTPException } from 'hono/http-exception'
import { pinoLogger } from 'hono-pino'
import { pino } from 'pino'
import env from './env.ts'
import routes from './endpoints/routes.ts'

export * from './errors.ts'

export const logger = pino({
  level: env.LOG_LEVEL,
})

export type Env = {
  Variables: { err?: Error }
}

export const app = new OpenAPIHono<Env>()

app.onError((err, c) => {
  if (err instanceof HTTPException) {
    return err.getResponse()
  }
  logger.error(err)
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

app.use(pinoLogger({ pino: logger }))

app.route('/', routes)
