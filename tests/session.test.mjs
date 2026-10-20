import test from 'node:test';
import assert from 'node:assert/strict';
import { createSession, validSession, passwordMatches, SESSION_SECONDS } from '../lib/session.mjs';

const secret = 'unit-test-secret-32-characters-minimum';
const password = 'test-only-password';
const now = 1792483200000;

test('valid sessions expire and cannot be modified or reused after secret/password rotation', () => {
  const token = createSession(secret, password, now);
  assert.equal(validSession(token, secret, password, now), true);
  assert.equal(validSession(token, secret, password, now + SESSION_SECONDS * 1000), false);
  assert.equal(validSession(token + 'a', secret, password, now), false);
  assert.equal(validSession(token.replace('v1.', 'v2.'), secret, password, now), false);
  assert.equal(validSession(token, secret + 'rotated', password, now), false);
  assert.equal(validSession(token, secret, password + 'rotated', now), false);
  assert.equal(validSession(token, secret, password, now - 1000), false);
});

test('missing configuration and malformed sessions fail closed', () => {
  for (const token of [undefined, '', '.', 'v1.123.nope', 'a'.repeat(500)]) {
    assert.equal(validSession(token, secret, password, now), false);
  }
  assert.equal(validSession(createSession(secret, password, now), undefined, password, now), false);
  assert.equal(validSession(createSession(secret, password, now), secret, undefined, now), false);
  assert.throws(() => createSession('short', password, now));
});

test('password matching is exact and bounded', () => {
  assert.equal(passwordMatches(password, password), true);
  for (const value of [undefined, null, '', password.toUpperCase(), 'a'.repeat(257)]) {
    assert.equal(passwordMatches(value, password), false);
  }
  assert.equal(passwordMatches('', undefined), false);
});
