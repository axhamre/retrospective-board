import { recommended } from '@tv4/node-kit-eslint'
import reactHooks from 'eslint-plugin-react-hooks'
import reactRefresh from 'eslint-plugin-react-refresh'

export default [
  {
    ignores: ['**/vite.config.d.ts'],
  },
  ...recommended,

  // React-specific rules for web app
  {
    files: ['apps/web/**/*.{ts,tsx}'],
    plugins: {
      'react-hooks': reactHooks,
      'react-refresh': reactRefresh,
    },
    rules: {
      // React hooks linting
      ...reactHooks.configs.recommended.rules,
      'react-refresh/only-export-components': ['warn', { allowConstantExport: true }],

      // Allow interface for module augmentation (TanStack Router, etc.)
      '@typescript-eslint/consistent-type-definitions': 'off',
    },
  },
]
