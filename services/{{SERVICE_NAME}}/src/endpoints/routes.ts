import { OpenAPIHono } from '@hono/zod-openapi'
import type { Env } from '../app.ts'
import helloWorldGet from './hello-world-get.ts'
import featureFlaggedGet from './feature-flagged.ts'

const router = new OpenAPIHono<Env>()

router.route('/hello', helloWorldGet)
router.route('/feature-flagged', featureFlaggedGet)

export default router
