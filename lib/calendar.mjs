export const workshop = {
  title: 'Paykit: A new Payment Protocol Paradigm',
  start: '20261024T141500Z',
  end: '20261024T150000Z',
  location: 'UTXO Room, Plan ₿ Forum, Lugano, Switzerland',
  agenda: 'https://planb.lugano.ch/planb-forum/agenda/',
};

function escape(value) {
  return value.replace(/\\/g, '\\\\').replace(/\n/g, '\\n').replace(/;/g, '\\;').replace(/,/g, '\\,');
}

// Fold by UTF-8 octets (RFC 5545), preserving multibyte characters.
function fold(line) {
  const parts = [];
  let chunk = '';
  let bytes = 0;
  for (const character of line) {
    const length = Buffer.byteLength(character, 'utf8');
    if (bytes + length > 75) {
      parts.push(chunk);
      chunk = ' ';
      bytes = 1;
    }
    chunk += character;
    bytes += length;
  }
  parts.push(chunk);
  return parts.join('\r\n');
}

export function workshopCalendar() {
  const description = `Join Ben Kaufman and Denys Zaliskyi for the Paykit workshop.\nSaturday 24 October 2026, 16:15–17:00 CEST (Lugano local time).\nOfficial agenda: ${workshop.agenda}`;
  return [
    'BEGIN:VCALENDAR', 'VERSION:2.0', 'PRODID:-//Paykit//Lugano Workshop//EN',
    'CALSCALE:GREGORIAN', 'METHOD:PUBLISH', 'BEGIN:VEVENT',
    'UID:paykit-planb-2026-1039948@paykit.pubky.org',
    'DTSTAMP:20261020T000000Z',
    `DTSTART:${workshop.start}`, `DTEND:${workshop.end}`,
    `SUMMARY:${escape(workshop.title)}`, `LOCATION:${escape(workshop.location)}`,
    `DESCRIPTION:${escape(description)}`, `URL:${workshop.agenda}`,
    'BEGIN:VALARM', 'ACTION:DISPLAY', 'DESCRIPTION:Paykit workshop starts in 30 minutes',
    'TRIGGER:-PT30M', 'END:VALARM', 'END:VEVENT', 'END:VCALENDAR', '',
  ].map(fold).join('\r\n');
}
