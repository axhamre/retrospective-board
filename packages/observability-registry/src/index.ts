import { PanelBuilder } from '@grafana/grafana-foundation-sdk/timeseries'
import { createRegistry, dashboardTemplates } from '@tv4/grafana-kit-templates'

const registry = createRegistry()

const exampleDashboard = dashboardTemplates.httpOverview({
  datasourceUid: 'prometheus',
  defaultService: '{{SERVICE_NAME}}',
  customize: (b) => {
    b.withPanel(
      new PanelBuilder()
        .title('My Custom HTTP Requests Error Rate')
        .datasource({ uid: 'prometheus', type: 'prometheus' })
    )
  },
})
registry.register(exampleDashboard)

export default registry
