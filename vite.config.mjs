import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  publicDir: false,
  build: {
    outDir: 'public',
    emptyOutDir: false
  },
  server: {
    port: 5173,
    proxy: {
      '/products': {
        target: 'http://localhost:3000',
        changeOrigin: true
      }
    }
  }
});
