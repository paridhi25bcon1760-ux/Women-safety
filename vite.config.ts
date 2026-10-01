import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  base: '/Women-safety/',
  plugins: [react(), tailwindcss()], // Added the missing plugins here
})
