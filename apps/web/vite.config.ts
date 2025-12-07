import react from '@vitejs/plugin-react'
import { TanStackRouterVite } from '@tanstack/router-plugin/vite'
import { defineConfig } from 'vitest/config'

export default defineConfig({
  plugins: [react(), TanStackRouterVite()],
  server: {
    port: 3000,
    proxy: {
      '/api': {
        target: 'http://localhost:8080',
        changeOrigin: true,
      },
    },
  },
  test: {
    passWithNoTests: true,
    globals: false,
  },
})
