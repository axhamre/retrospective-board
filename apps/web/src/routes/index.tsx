import { createRoute, createFileRoute } from '@tanstack/react-router'
import { Route as rootRoute } from './__root'

export const Route = createRoute('/')({
  getParentRoute: () => rootRoute,
  path: '/',
  component: function Index() {
    return (
      <div>
        <h2>Welcome to Retrospective Board</h2>
        <p>Start by creating a new retrospective session.</p>
      </div>
    )
  },
})
