import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/todo/': {
        target: 'http://localhost:8080'},
      '/weather/': {
        target: 'http://localhost:8081'},
    },
  },
})
