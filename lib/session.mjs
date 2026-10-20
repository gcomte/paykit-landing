import { createHmac, createHash, timingSafeEqual } from 'node:crypto';

export const SESSION_COOKIE = 'paykit_access';
export const SESSION_SECONDS = 60 * 60 * 24 * 7;

function configured(secret) {
  return typeof secret === 'string' && secret.length >= 32;
}

export function passwordMatches(value, expected) {
  if (typeof value !== 'string' || !expected || value.length > 256) return false;
  return timingSafeEqual(createHash('sha256').update(value).digest(), createHash('sha256').update(expected).digest());
}

function signature(payload, secret, password) {
  // Bind sessions to the password as well, so rotating it revokes all sessions.
  return createHmac('sha256', secret).update(payload).update('\0').update(password).digest('base64url');
}

export function createSession(secret, password, now = Date.now()) {
  if (!configured(secret) || !password) throw new Error('Access is not configured');
  const payload = `v1.${Math.floor(now / 1000) + SESSION_SECONDS}`;
  return `${payload}.${signature(payload, secret, password)}`;
}

export function validSession(token, secret, password, now = Date.now()) {
  if (!configured(secret) || !password || typeof token !== 'string' || token.length > 128) return false;
  const parts = token.split('.');
  if (parts.length !== 3 || parts[0] !== 'v1' || !/^\d{10}$/.test(parts[1]) || !/^[A-Za-z0-9_-]{43}$/.test(parts[2])) return false;
  const expiry = Number(parts[1]);
  const current = Math.floor(now / 1000);
  if (expiry <= current || expiry > current + SESSION_SECONDS) return false;
  const expected = signature(`${parts[0]}.${parts[1]}`, secret, password);
  return timingSafeEqual(Buffer.from(parts[2]), Buffer.from(expected));
}
