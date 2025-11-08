import { z } from '@hono/zod-openapi'

export const httpErrorSchema = z.object({
  code: z.string().openapi({ description: 'A machine readable error code', example: 'invalid_request' }),
})

const content = {
  content: {
    'application/json': {
      schema: httpErrorSchema,
    },
  },
}

export const httpError = {
  400: {
    400: {
      ...content,
      description: 'The request was malformed',
    },
  },
  401: {
    401: {
      ...content,
      description: 'The request was not authenticated',
    },
  },
  403: {
    403: {
      ...content,
      description: 'The request was authenticated but not authorized',
    },
  },
  404: {
    404: {
      description: 'The requested resource was not found',
    },
  },
}
