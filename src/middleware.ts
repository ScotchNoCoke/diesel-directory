import { defineMiddleware } from 'astro:middleware';
import { env } from 'cloudflare:workers';

export const onRequest = defineMiddleware(async (context, next) => {
  const url = new URL(context.request.url);

  // Canonical domain redirect
  if (url.hostname === 'www.dieselhub.com.au') {
    url.hostname = 'dieselhub.com.au';
    return Response.redirect(url.toString(), 301);
  }

  // Admin authentication guard
  if (url.pathname.startsWith('/admin') && !url.pathname.startsWith('/admin/login')) {
    const adminSession = context.cookies.get('dh_admin_session')?.value;
    const adminKey = env.ADMIN_SECRET || 'dieselhub-admin-secret-2026';

    if (!adminSession || adminSession !== adminKey) {
      return Response.redirect(new URL('/admin/login', context.url).toString(), 302);
    }
  }

  return next();
});
