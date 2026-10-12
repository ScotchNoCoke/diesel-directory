import { defineMiddleware } from 'astro:middleware';

export const onRequest = defineMiddleware((context, next) => {
  const url = new URL(context.request.url);

  if (url.hostname === 'www.dieselhub.com.au') {
    url.hostname = 'dieselhub.com.au';
    return context.redirect(url.toString(), 301);
  }

  return next();
});
