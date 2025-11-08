import { createRoute, OpenAPIHono, z } from '@hono/zod-openapi'
import { customMetrics, type Env } from '../app.ts'
import { trackHelloWorld } from '../insights-reporter.ts'

export default new OpenAPIHono<Env>().openapi(
  createRoute({
    method: 'get',
    path: '/',
    summary: 'Hello, World!',
    responses: {
      200: {
        description: 'Hello, World!',
        content: {
          'application/json': {
            schema: z.object({
              message: z.string(),
            }),
          },
        },
      },
    },
  }),
  async (c) => {
    customMetrics.helloWorldsIssued.add(1)
    await trackHelloWorld()

    return c.json({ message: 'Hello, World!' }, 200)
  }
)
