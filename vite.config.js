import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import vitePluginRequire from "vite-plugin-require";

// https://vite.dev/config/
export default defineConfig({
  base: '/music/',
  plugins: [react(), vitePluginRequire.default()],
  build: {
    outDir: 'build'
  }
})
