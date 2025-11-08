import { describe, it } from 'node:test'
import { app, featureClient } from '../app.ts'

describe('GET /feature-flagged', () => {
  it('should return false by default', async (t) => {
    t.mock.method(featureClient, 'isHelloWorldSad', () => Promise.resolve(false))
    const res = await app.request('/feature-flagged')
    t.assert.equal(res.status, 200)

    const body = await res.json()
    t.assert.deepEqual(body, { flagged: false, message: 'Hello, World!' })
  })
  it('returns true if the feature flag is set', async (t) => {
    t.mock.method(featureClient, 'isHelloWorldSad', () => Promise.resolve(true))
    const res = await app.request('/feature-flagged')
    t.assert.equal(res.status, 200)

    const body = await res.json()
    t.assert.deepEqual(body, { flagged: true, message: 'Hello, Sad World!' })
  })
})
