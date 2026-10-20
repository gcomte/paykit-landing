import type { NextRequest } from "next/server";

export function requestOrigin(request: NextRequest) {
  // Next's local server may use its bind address in request.url; Host retains
  // the address the visitor used. Vercel normalizes Host at its edge.
  const url = new URL(request.url);
  url.host = request.headers.get("host") || url.host;
  return url.origin;
}

export function isSameOrigin(request: NextRequest) {
  return request.headers.get("origin") === requestOrigin(request);
}
