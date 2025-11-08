import type { AddressInfo } from 'node:net'
import { serve } from '@hono/node-server'
import log from '@tv4/node-kit-logger'
import { openTelemetrySDK } from '@tv4/node-kit-observability'
import env from './env.ts'
import { app } from './app.ts'

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
    log.info(`🚀 Hono Server ready at http://localhost:${info.port}/`)
  }
)

const shutdown = () => {
  log.info('shutting down server')

  server.close(() => {
    void openTelemetrySDK.shutdown().then(() => {
      log.info('server closed')
      process.exit(0)
    })
  })
}

process.on('SIGTERM', shutdown)
process.on('SIGINT', shutdown)
