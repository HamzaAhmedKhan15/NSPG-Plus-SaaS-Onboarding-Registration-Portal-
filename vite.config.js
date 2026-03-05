// import { defineConfig } from 'vite'
// import react from '@vitejs/plugin-react'
// import tailwindcss from '@tailwindcss/vite'
// import path from 'path'
// export default defineConfig({
//   plugins: [react(),tailwindcss()],
// resolve: {
//     alias: {
//       '@': './src',

     
//     },
//   },
// })

// vite.config.js   (or .ts if using TypeScript)
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite' 

import path from 'path'

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),  
  ],
  resolve: {
    alias: {
      // Best & most reliable way:
      '@': path.resolve(__dirname, './src'),

      // Alternative (often works, but less robust on some systems / monorepos):
      // '@': '/src',
    },
  },
})