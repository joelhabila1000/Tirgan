import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'
import apiDevPlugin from './scripts/vite-api-dev.mjs'

// https://vite.dev/config/
export default defineConfig({
  /* apiDevPlugin serves /api/* during `npm run dev` (no-op in production). */
  plugins: [react(), apiDevPlugin()],
})
