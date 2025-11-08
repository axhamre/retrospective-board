import assert from 'node:assert'
import { describe, it } from 'node:test'
import { MockAgent } from 'undici'

const agent = new MockAgent()

const client = agent.get('http://localhost:3000')

const mockECSMetadata = {
  DockerId: 'fd466ae4c09043238415162f3a55bf2e-0946514567',
  Name: 'api',
  DockerName: 'api',
  Image:
    '884099773627.dkr.ecr.eu-west-1.amazonaws.com/ubs-tv4user-api-api:919f0ab92c9774354af94c787b8f7743968dc042@sha256:b23d04d8e5b0a1de498d1c679cc9787622e571c7b57b8d15d9dc1c34f122c203',
  ImageID: 'sha256:b23d04d8e5b0a1de498d1c679cc9787622e571c7b57b8d15d9dc1c34f122c203',
  Labels: {
    'com.amazonaws.ecs.cluster': 'arn:aws:ecs:eu-west-1:884099773627:cluster/coreecs-general-cluster-fargate-main-ew1',
    'com.amazonaws.ecs.container-name': 'api',
    'com.amazonaws.ecs.task-arn':
      'arn:aws:ecs:eu-west-1:884099773627:task/coreecs-general-cluster-fargate-main-ew1/fd466ae4c09043238415162f3a55bf2e',
    'com.amazonaws.ecs.task-definition-family': 'meta-test-api',
    'com.amazonaws.ecs.task-definition-version': '142',
  },
  DesiredStatus: 'RUNNING',
  KnownStatus: 'RUNNING',
  Limits: { CPU: 1024, Memory: 2048 },
  CreatedAt: '2024-12-05T13:13:23.362036381Z',
  StartedAt: '2024-12-05T13:13:23.362036381Z',
  Type: 'NORMAL',
  Health: { status: 'HEALTHY', statusSince: '2024-12-05T13:13:39.673385303Z' },
  LogDriver: 'awslogs',
  LogOptions: {
    'awslogs-group': '/aws/ecs/tv4apps/meta-test-api',
    'awslogs-region': 'eu-west-1',
    'awslogs-stream': 'containers/api/fd466ae4c09043238415162f3a55bf2e',
    mode: 'non-blocking',
  },
  ContainerARN:
    'arn:aws:ecs:eu-west-1:884099773627:container/coreecs-general-cluster-fargate-main-ew1/fd466ae4c09043238415162f3a55bf2e/194ca991-b9c9-420c-a88f-45e282c1cd1e',
  Networks: [
    {
      NetworkMode: 'awsvpc',
      IPv4Addresses: ['172.29.172.96'],
      AttachmentIndex: 0,
      MACAddress: '02:3d:f5:fb:9b:e7',
      IPv4SubnetCIDRBlock: '172.29.168.0/21',
      DomainNameServers: ['172.29.160.2'],
      PrivateDNSName: 'ip-172-29-172-96.eu-west-1.compute.internal',
      SubnetGatewayIpv4Address: '172.29.168.1/21',
    },
  ],
  Snapshotter: 'overlayfs',
}

describe('ecs-metadata', () => {
  it('should set the environment variables', async () => {
    client
      .intercept({
        method: 'GET',
        path: '/',
      })
      .reply(200, mockECSMetadata)

    process.env.ECS_ENABLE_CONTAINER_METADATA = 'true'
    process.env.ECS_CONTAINER_METADATA_URI_V4 = 'http://localhost:3000'

    const imports = await import('../src/meta.ts')

    assert.equal(imports.serviceName, 'meta-test-api')
    assert.equal(imports.serviceVersion, '142')
    assert.equal(imports.serviceInstanceId, 'fd466ae4c09043238415162f3a55bf2e')
  })
})
