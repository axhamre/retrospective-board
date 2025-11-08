import { OpenAPIHono } from '@hono/zod-openapi'
import type { Env } from '../app.ts'
import helloWorldGet from './hello-world-get.ts'

const router = new OpenAPIHono<Env>()

router.route('/hello', helloWorldGet)

export default router
