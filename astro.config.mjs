// @ts-check
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';

// https://astro.build/config
export default defineConfig({
  // ── Custom domain ──────────────────────────────────────────────
  // Set this to your real domain. Used for canonical URLs, sitemap,
  // and Open Graph tags. No `base` is needed for a root custom domain.
  site: 'https://benspoolstra.com',

  vite: {
    plugins: [tailwindcss()],
  },
});
