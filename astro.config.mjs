import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://codepick.dev',
  integrations: [tailwind(), sitemap()],
  vite: {
    ssr: { noExternal: ['js-yaml'] },
  },
});
