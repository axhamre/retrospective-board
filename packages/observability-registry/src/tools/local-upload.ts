import reg from '../index.ts'

const grafanaUrl = process.env.GRAFANA_URL ?? 'http://localhost:3000'
const grafanaToken = process.env.GRAFANA_TOKEN
const folderName = process.env.GRAFANA_FOLDER_NAME ?? '{{SERVICE_NAME}}/local'

if (!grafanaToken) {
  throw new Error('GRAFANA_TOKEN is required. Create an Editor token in your local Grafana and export it.')
}

const localUpload = async () => {
  await reg.upload({
    grafanaUrl,
    grafanaToken,
    folderName,
  })
}

void localUpload()
