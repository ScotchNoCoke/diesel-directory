import { defineConfig } from 'astro/config';
import cloudflare from '@astrojs/cloudflare';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://dieselhub.com.au',
  output: 'hybrid',
  adapter: cloudflare({
    imageService: 'cloudflare',
  }),
  integrations: [sitemap()],
});
