import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/')({
  component: function Index() {
    return (
      <div>
        <h2>Welcome to Retrospective Board</h2>
        <p>Start by creating a new retrospective session.</p>
      </div>
    )
  },
})
