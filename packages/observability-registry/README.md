## Observability Registry

This package holds your service's dashboard registry and local tools to preview and upload dashboards.

### Prereqs

- Node + pnpm installed
- Docker installed (for local Grafana)

### Start a local Grafana

- Quick start (ephemeral):

```bash
docker run -d --name=grafana -p 3000:3000 grafana/grafana
```

- With persistence:

```bash
docker run -d --name=grafana -p 3000:3000 \
  -v grafana-storage:/var/lib/grafana grafana/grafana
```

- Open http://localhost:3000 and log in (default admin/admin on first run).
- Create an API token with Editor access.
  - In Grafana, create a service account (Editor) and generate a token, or use API keys if enabled.

Reference: [Grafana Docker image](https://hub.docker.com/r/grafana/grafana/)

### Add dashboards to the registry

Edit `src/index.ts`. Use templates and/or add custom dashboards, then register them with the registry. Example template usage is already scaffolded; uncomment the registration to include it.

### Preview dashboards (JSON)

```bash
pnpm -C packages/observability-registry run print | jq '.'
```

### Upload dashboards to local Grafana

Export env vars and run the local uploader:

```bash
export GRAFANA_URL=http://localhost:3000
export GRAFANA_TOKEN=your_editor_token_here
export GRAFANA_FOLDER_NAME="{{SERVICE_NAME}}/local"
pnpm -C packages/observability-registry run local-upload
```

If successful, dashboards will appear in Grafana under the configured folder.

### Clean up local Grafana

```bash
docker stop grafana && docker rm grafana
```

### Notes

- Local Grafana likely won't have your production data sources. Panels may show "No data"; that's fine for layout testing.
- Keep dashboards small and composable; prefer parameterized templates over copying code.
