import { resolve } from 'node:path'
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// Sitio multipágina: la landing y una página estática por cada documento legal.
export default defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: {
      input: {
        main: resolve(import.meta.dirname, 'index.html'),
        privacidad: resolve(import.meta.dirname, 'privacidad/index.html'),
        terminos: resolve(import.meta.dirname, 'terminos/index.html'),
        cookies: resolve(import.meta.dirname, 'cookies/index.html'),
      },
    },
  },
})
