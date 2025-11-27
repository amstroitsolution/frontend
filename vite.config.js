import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
   base: '/',
  plugins: [react()],
  build: {
    // Reduce memory usage during build
    chunkSizeWarningLimit: 1000,
    rollupOptions: {
      output: {
        manualChunks: undefined
      }
    },
    // Reduce parallelization to save memory
    minify: 'esbuild',
    target: 'es2015'
  }
})
