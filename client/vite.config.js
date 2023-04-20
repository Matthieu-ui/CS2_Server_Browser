import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/

// server proxy is used to proxy requests to the backend server for running the app in development mode with vite

export default defineConfig({
  server: {
    proxy: {
      '/api': "http://localhost:5000"
    },
    define: {
      'process.env': {
        API_KEY: process.env.VITE_APP_API_KEY,
        SUPABASE_URL: process.env.VITE_APP_SUPABASE_URL,
        SUPABASE_KEY: process.env.VITE_APP_API_KEY
    }
  }

  },
  plugins: [react()],
});
