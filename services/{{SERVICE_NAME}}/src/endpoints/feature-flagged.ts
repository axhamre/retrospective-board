import { createRoute, OpenAPIHono, z } from '@hono/zod-openapi'
import { type Env } from '../app.ts'
import { createFeatureFlagContext } from '../feature-flags.ts'
import { featureClient } from '../app.ts'

export default new OpenAPIHono<Env>().openapi(
  createRoute({
    method: 'get',
    path: '/',
    summary: 'Is the feature flagged?',
    responses: {
      200: {
        description: 'Is the hello world feature flagged?',
        content: {
          'application/json': {
            schema: z.object({
              flagged: z.boolean(),
              message: z.string(),
            }),
          },
        },
      },
    },
  }),
  async (c) => {
    const sad = await featureClient.isHelloWorldSad(createFeatureFlagContext(c))

    const message = sad ? 'Hello, Sad World!' : 'Hello, World!'

    return c.json({ flagged: sad, message }, 200)
  }
)
