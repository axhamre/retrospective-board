import type { AddressInfo } from 'node:net'
import { serve } from '@hono/node-server'
import { pino } from 'pino'
import env from './env.ts'
import { app } from './app.ts'

const logger = pino({
  level: env.LOG_LEVEL,
})

const server = serve(
  {
    fetch: app.fetch,
    port: env.PORT,
    serverOptions: {
      keepAliveTimeout: 65000,
      headersTimeout: 66000,
    },
  },
  (info: AddressInfo) => {
    logger.info(`🚀 Hono Server ready at http://localhost:${info.port}/`)
  }
)

const shutdown = () => {
  logger.info('shutting down server')

  server.close(() => {
    logger.info('server closed')
    process.exit(0)
  })
}

process.on('SIGTERM', shutdown)
process.on('SIGINT', shutdown)
