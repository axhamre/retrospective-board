import { Outlet, createRootRoute } from '@tanstack/react-router'

export const Route = createRootRoute({
  component: () => (
    <>
      <div>
        <h1>Retrospective Board</h1>
        <nav>{/* Navigation will go here */}</nav>
      </div>
      <Outlet />
    </>
  ),
})
