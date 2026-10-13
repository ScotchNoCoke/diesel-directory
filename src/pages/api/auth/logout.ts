import type { APIRoute } from 'astro';
import { env } from 'cloudflare:workers';
import { destroySession, buildClearCookie } from '../../../lib/auth';

export const prerender = false;

export const POST: APIRoute = async (context) => {
  try {
    const sessionKv = (env as any)?.SESSION;
    const cookieHeader = context.request.headers.get('Cookie') || '';
    const match = cookieHeader.match(/dh_session=([^;]+)/);
    const sessionId = match ? match[1] : null;

    if (sessionId && sessionKv) {
      await destroySession(sessionKv, sessionId);
    }
  } catch (err) {
    console.error('Logout error clearing session:', err);
  }

  return new Response(null, {
    status: 302,
    headers: {
      Location: '/?auth=logged_out',
      'Set-Cookie': buildClearCookie(),
    },
  });
};

export const GET: APIRoute = async (context) => {
  return POST(context);
};
