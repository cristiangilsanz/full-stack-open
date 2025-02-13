import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'


// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173,
    host: '127.0.0.1',
    proxy: {
      '/api': {
        target: 'http://localhost:3001',
        changeOrigin: true,
        // ↓ If you are using a local JSON server with db.json, uncomment the line below ↓
        //rewrite: (path) => path.replace(/^\/api/, ''),
      },
    },
  },
})