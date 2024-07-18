import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
    server: {
        proxy: {
            '/api': 'http://localhost:5000' // Proxy requests starting with /api to your backend server
        },
        define: {
            'process.env.API_KEY': JSON.stringify(process.env.VITE_APP_API_KEY)
        }
    },
    plugins: [react()]
});