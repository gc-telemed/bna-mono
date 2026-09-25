// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import tailwindcss from '@tailwindcss/vite';

// https://astro.build/config
export default defineConfig({
  site: 'https://cosys.work',
  trailingSlash: 'never',
  // 'file' emits /clinic-app.html, which Netlify serves at /clinic-app with no
  // trailing-slash redirect. Matches trailingSlash: 'never' above.
  build: { format: 'file' },
  // The two form confirmations are reached by posting a form, never by search.
  integrations: [sitemap({ filter: (page) => !page.includes('/thanks-') })],
  vite: {
    plugins: [tailwindcss()],
  },
});
