import { resolve } from 'node:path'
import { defineConfig } from 'vite'

export default defineConfig({
  define: {
    __DEV__: 'true',
  },
  resolve: {
    alias: {
      unplugin: resolve('src/index.ts'),
    },
  },
})
