import { z } from 'zod'
import { serviceInstanceId, serviceName, serviceVersion } from '@packages/ecs-metadata'

const envSchema = z.object({
  SERVICE_INSTANCE_ID: z.string().default(serviceInstanceId ?? 'unknown'),
  SERVICE_NAME: z.string().default(serviceName ?? '{{SERVICE_NAME}}'),
  SERVICE_VERSION: z.string().default(serviceVersion ?? 'unknown'),
  LOG_LEVEL: z.enum(['debug', 'info', 'warn', 'error']).default('info'),
  PORT: z.coerce.number().default(8080),
  BRAND: z.enum(['tv4', 'mtv']).default('tv4'),
  UNLEASH_API_KEY: z.string().default('unknown'),
  ENVIRONMENT_TYPE: z.enum(['local', 'dev', 'stage', 'prod']).default('dev'),
})

const parseResult = envSchema.safeParse({
  SERVICE_INSTANCE_ID: process.env.SERVICE_INSTANCE_ID,
  SERVICE_NAME: process.env.SERVICE_NAME,
  SERVICE_VERSION: process.env.SERVICE_VERSION,
  LOG_LEVEL: process.env.LOG_LEVEL,
  BRAND: process.env.BRAND,
  ENVIRONMENT_TYPE: process.env.ENVIRONMENT_TYPE,
  UNLEASH_API_KEY: process.env.UNLEASH_API_KEY,
})

if (!parseResult.success) {
  throw new Error(`failed to parse environment variables:\n${parseResult.error.toString()}`)
}

export default parseResult.data
