import test from 'node:test';
import assert from 'node:assert/strict';
import { workshopCalendar } from '../lib/calendar.mjs';

test('calendar uses the verified UTC event time, a reminder, and valid folded CRLF lines', () => {
  const calendar = workshopCalendar();
  const unfolded = calendar.replace(/\r\n /g, '');
  assert.match(unfolded, /DTSTART:20261024T141500Z\r\n/);
  assert.match(unfolded, /DTEND:20261024T150000Z\r\n/);
  assert.match(unfolded, /UTXO Room/);
  assert.match(unfolded, /Ben Kaufman and Denys Zaliskyi/);
  assert.match(unfolded, /TRIGGER:-PT30M/);
  assert.match(unfolded, /https:\/\/planb.lugano.ch\/planb-forum\/agenda\//);
  assert.equal(calendar.replace(/\r\n/g, '').includes('\n'), false);
  for (const line of calendar.split('\r\n')) assert.ok(Buffer.byteLength(line, 'utf8') <= 75);
});
