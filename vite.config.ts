import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

import { cloudflare } from "@cloudflare/vite-plugin";
import { readFileSync } from 'node:fs'

// The ata version the site is built with, read from the installed package so
// the version shown in the docs and the one the playground runs never differ.
// .github/workflows/sync-ata.yml moves the dependency to each new release.
const ataVersion = JSON.parse(readFileSync(new URL('./node_modules/ata-validator/package.json', import.meta.url), 'utf8')).version

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), cloudflare()],
  define: { __ATA_VERSION__: JSON.stringify(ataVersion) },
})