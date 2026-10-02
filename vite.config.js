import { resolve } from 'node:path'
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// Sitio multipágina: la landing y una página estática por cada documento legal.
export default defineConfig({
  plugins: [react()],
  build: {
    /*
     * Objetivo explícito de navegadores: baja la sintaxis moderna de JS y añade
     * los prefijos -webkit- que necesita Safari (iOS 15 en adelante).
     */
    target: ['es2020', 'chrome90', 'edge90', 'firefox90', 'safari15'],
    cssTarget: ['chrome90', 'edge90', 'firefox90', 'safari15'],
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
