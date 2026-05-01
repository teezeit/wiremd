import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { resolve } from 'path'

export default defineConfig({
  plugins: [vue({ template: { transformAssetUrls: { includeAbsolute: false } } })],
  base: process.env.VITE_BASE ?? '/wiremd/',
  // Serve docs/assets during dev so /wiremd/assets/... paths resolve
  publicDir: resolve(__dirname, '../docs'),
  server: {
    port: 5175,
    strictPort: true,
    fs: { allow: ['..'] },
  },
  resolve: {
    alias: {
      '@eclectic-ai/wiremd': resolve(__dirname, '../../packages/core/src/index.ts'),
      fs: resolve(__dirname, '../editor/src/stubs/fs.ts'),
      path: resolve(__dirname, '../editor/src/stubs/path.ts'),
    },
  },
  build: {
    outDir: 'dist',
  },
})
