import React from 'react'
import ReactDOM from 'react-dom/client'
import { RouterProvider, createRouter, createRootRoute, createRoute, Outlet } from '@tanstack/react-router'
import './styles/index.css'

const rootRoute = createRootRoute({
  component: () => (
    <>
      <div>
        <h1>Retrospective Board</h1>
        <nav>{/* Navigation will go here */}</nav>
      </div>
      <Outlet />
    </>
  )
})

const indexRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/',
  component: function Index() {
    return (
      <div>
        <h2>Welcome to Retrospective Board</h2>
        <p>Start by creating a new retrospective session.</p>
      </div>
    )
  }
})

const routeTree = rootRoute.addChildren([indexRoute])

const router = createRouter({ routeTree })

declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router
  }
}

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
)
