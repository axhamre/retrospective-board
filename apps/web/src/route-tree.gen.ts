import type { AnyRoute } from '@tanstack/react-router'
import { Route as rootRoute } from './routes/__root'
import { Route as indexRoute } from './routes/index'

// Cast to AnyRoute array to satisfy router type expectations without generator tooling
export const routeTree = rootRoute.addChildren([indexRoute as AnyRoute])
