export interface SessionData {
  userId: string;
  businessId: string;
  email: string;
  createdAt: number;
}

// 1. Password Hashing (PBKDF2 with SHA-256)
export async function hashPassword(password: string): Promise<{ hash: string; salt: string }> {
  const saltBytes = crypto.getRandomValues(new Uint8Array(16));
  const salt = Array.from(saltBytes).map(b => b.toString(16).padStart(2, '0')).join('');

  const enc = new TextEncoder();
  const keyMaterial = await crypto.subtle.importKey(
    'raw',
    enc.encode(password),
    'PBKDF2',
    false,
    ['deriveBits']
  );

  const derivedBits = await crypto.subtle.deriveBits(
    {
      name: 'PBKDF2',
      salt: enc.encode(salt),
      iterations: 100000,
      hash: 'SHA-256',
    },
    keyMaterial,
    256
  );

  const hash = Array.from(new Uint8Array(derivedBits))
    .map(b => b.toString(16).padStart(2, '0'))
    .join('');

  return { hash, salt };
}

export async function verifyPassword(password: string, hash: string, salt: string): Promise<boolean> {
  const enc = new TextEncoder();
  const keyMaterial = await crypto.subtle.importKey(
    'raw',
    enc.encode(password),
    'PBKDF2',
    false,
    ['deriveBits']
  );

  const derivedBits = await crypto.subtle.deriveBits(
    {
      name: 'PBKDF2',
      salt: enc.encode(salt),
      iterations: 100000,
      hash: 'SHA-256',
    },
    keyMaterial,
    256
  );

  const computedHash = Array.from(new Uint8Array(derivedBits))
    .map(b => b.toString(16).padStart(2, '0'))
    .join('');

  return computedHash === hash;
}

// 2. Session Management (Cloudflare KV)
export async function createSession(
  sessionKv: any,
  data: Omit<SessionData, 'createdAt'>
): Promise<string> {
  const sessionId = crypto.randomUUID().replace(/-/g, '');
  const sessionPayload: SessionData = {
    ...data,
    createdAt: Math.floor(Date.now() / 1000),
  };

  // 30-day session expiry (2592000 seconds)
  await sessionKv.put(`session:${sessionId}`, JSON.stringify(sessionPayload), {
    expirationTtl: 2592000,
  });

  return sessionId;
}

export async function getSession(sessionKv: any, sessionId: string): Promise<SessionData | null> {
  if (!sessionId) return null;
  const raw = await sessionKv.get(`session:${sessionId}`);
  if (!raw) return null;
  try {
    return JSON.parse(raw) as SessionData;
  } catch {
    return null;
  }
}

export async function destroySession(sessionKv: any, sessionId: string): Promise<void> {
  if (sessionId) {
    await sessionKv.delete(`session:${sessionId}`);
  }
}

export function buildSessionCookie(sessionId: string): string {
  return `dh_session=${sessionId}; Path=/; HttpOnly; Secure; SameSite=Lax; Max-Age=2592000`;
}

export function buildClearCookie(): string {
  return `dh_session=; Path=/; HttpOnly; Secure; SameSite=Lax; Max-Age=0`;
}
