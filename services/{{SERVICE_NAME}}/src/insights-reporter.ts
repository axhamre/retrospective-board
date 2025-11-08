import { InsightsReporter } from '@tv4/node-kit-insights'
import env from './env.ts'

export const insightsReporter = new InsightsReporter({ brand: env.BRAND, environment: env.ENVIRONMENT_TYPE })

export const trackHelloWorld = async () => {
  await insightsReporter.track({
    eventId: crypto.randomUUID(),
    timestamp: Date.now().toString(),
    domain: 'hello-world',
    subdomain: 'default',
    body: {},
    eventName: 'hello_world',
  })
}
