/// <reference path="../.astro/types.d.ts" />
/// <reference types="astro/client" />

type D1Database = import("@cloudflare/workers-types").D1Database;

type ENV = {
  DB: D1Database;
  ADMIN_SECRET?: string;
};

type Runtime = import("@astrojs/cloudflare").Runtime<ENV>;

declare namespace App {
  interface Locals extends Runtime {}
}

declare namespace Cloudflare {
  interface Env {
    ADMIN_API_KEY?: string;
    ADMIN_SECRET?: string;
    RESEND_API_KEY?: string;
  }
}
