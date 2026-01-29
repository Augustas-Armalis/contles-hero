import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  // For a custom domain (e.g. https://contles.com) the site is served from the root.
  // If you ever need to deploy under a subpath (e.g. /contles-hero/), set VITE_BASE accordingly:
  //   VITE_BASE=/contles-hero/ npm run build
  base: process.env.VITE_BASE || '/',
})
