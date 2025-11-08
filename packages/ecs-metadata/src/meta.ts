import log from '@tv4/node-kit-logger'

export type ECSMetadata = {
  Labels: {
    'com.amazonaws.ecs.cluster': string
    'com.amazonaws.ecs.container-name': string
    'com.amazonaws.ecs.task-arn': string
    'com.amazonaws.ecs.task-definition-family': string
    'com.amazonaws.ecs.task-definition-version': string
  }
}

async function getECSMetadata() {
  if (process.env.ECS_ENABLE_CONTAINER_METADATA !== 'true' || process.env.ECS_CONTAINER_METADATA_URI_V4 === undefined) {
    return
  }
  try {
    const response = await fetch(process.env.ECS_CONTAINER_METADATA_URI_V4)
    return (await response.json()) as ECSMetadata
  } catch (error) {
    log.error('Failed to read ECS metadata', { error })
  }
}

export const ecsMetadata = await getECSMetadata()

export const serviceName = ecsMetadata?.Labels['com.amazonaws.ecs.task-definition-family']
export const serviceVersion = ecsMetadata?.Labels['com.amazonaws.ecs.task-definition-version']
export const serviceInstanceId = ecsMetadata?.Labels['com.amazonaws.ecs.task-arn'].split('/').pop()
