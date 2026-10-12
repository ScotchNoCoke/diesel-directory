import { defineConfig } from 'astro/config';
import cloudflare from '@astrojs/cloudflare';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://dieselhub.com.au', // Your production domain
  adapter: cloudflare(),
  integrations: [sitemap()],
});