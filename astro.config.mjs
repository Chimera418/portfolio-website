// @ts-check
import { defineConfig } from 'astro/config';

import tailwindcss from '@tailwindcss/vite';

import vercel from '@astrojs/vercel';

// https://astro.build/config
export default defineConfig({
  output: 'server',
  server: {
    port: 3000,
  },
  base: process.env.NODE_ENV === 'production' ? '/' : '/',
  vite: {
    plugins: [tailwindcss()]
  },
  adapter: vercel()
});