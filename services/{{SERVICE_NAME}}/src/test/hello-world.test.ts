import { describe, it } from 'node:test'
import { app } from '../app.ts'

describe('GET /hello', () => {
  it('should return 200', async (t) => {
    const res = await app.request('/hello')
    t.assert.equal(res.status, 200)

    const body = await res.json()
    t.assert.deepEqual(body, { message: 'Hello, World!' })
  })
})
