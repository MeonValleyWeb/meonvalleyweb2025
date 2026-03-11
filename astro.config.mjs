// @ts-check
import { defineConfig } from 'astro/config';

import sitemap from '@astrojs/sitemap';
import tailwindcss from '@tailwindcss/vite';

// https://astro.build/config
export default defineConfig({
  site: 'https://meonvalleyweb.com',
  integrations: [sitemap()],
  vite: {
    plugins: [tailwindcss()],
    server: {
      allowedHosts: ['devserver-feature-hosting-landing-pages--meonvalleyweb.netlify.app']
    },
    optimizeDeps: {
      esbuildOptions: {
        logLevel: 'silent'
      }
    },
    logLevel: 'error'
  }
});