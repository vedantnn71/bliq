import { defineConfig } from 'vite'
import { crx, defineManifest } from "@crxjs/vite-plugin";
import pkg from "./package.json";
import react from '@vitejs/plugin-react'
import manifest from './manifest.json'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react({ jsxRuntime: 'classic' }),
    crx({ manifest }),
  ]
})
