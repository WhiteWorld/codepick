import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';

export default defineConfig({
  site: 'https://codepick.dev',
  integrations: [tailwind()],
  vite: {
    ssr: { noExternal: ['js-yaml'] },
  },
});
