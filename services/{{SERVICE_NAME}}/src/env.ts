import { z } from 'zod'

const envSchema = z.object({
  SERVICE_INSTANCE_ID: z.string().default('unknown'),
  SERVICE_NAME: z.string().default('{{SERVICE_NAME}}'),
  SERVICE_VERSION: z.string().default('unknown'),
  LOG_LEVEL: z.enum(['debug', 'info', 'warn', 'error']).default('info'),
  PORT: z.coerce.number().default(8080),
})

const parseResult = envSchema.safeParse({
  SERVICE_INSTANCE_ID: process.env.SERVICE_INSTANCE_ID,
  SERVICE_NAME: process.env.SERVICE_NAME,
  SERVICE_VERSION: process.env.SERVICE_VERSION,
  LOG_LEVEL: process.env.LOG_LEVEL,
})

if (!parseResult.success) {
  throw new Error(`failed to parse environment variables:\n${parseResult.error.toString()}`)
}

export default parseResult.data
