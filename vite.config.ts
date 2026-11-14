import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes('node_modules/@mui')) return 'mui'
          if (id.includes('node_modules/@react-pdf')) return 'react-pdf'
          if (id.includes('node_modules/framer-motion')) return 'motion'
        },
      },
    },
  },
})
