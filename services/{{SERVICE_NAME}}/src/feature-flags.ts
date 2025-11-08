import type { EvaluationContext } from '@openfeature/server-sdk'
import type { Context } from 'hono'
import { getConnInfo } from '@hono/node-server/conninfo'
import env from './env.ts'

export const createFeatureFlagContext = (c: Context): EvaluationContext => {
  const userId = 'anonymous' // TODO: get userId from auth or other method if your application can
  return {
    sessionId: 'some-session-id',
    remoteAddress: env.ENVIRONMENT_TYPE === 'prod' ? (getConnInfo(c).remote.address ?? 'unknown') : '127.0.0.1',
    targetingKey: userId,
    country: 'SE',
  }
}
