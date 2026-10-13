/// <reference path="../.astro/types.d.ts" />

declare module 'cloudflare:workers' {
  export const env: {
    DB: import('@cloudflare/workers-types').D1Database;
    SESSION: import('@cloudflare/workers-types').KVNamespace;
    ADMIN_API_KEY?: string;
    RESEND_API_KEY?: string;
  };
}
