import { NextRequest, NextResponse } from "next/server";
import {
  createSession,
  passwordMatches,
  SESSION_COOKIE,
  SESSION_SECONDS,
} from "@/lib/session.mjs";
import { isSameOrigin, requestOrigin } from "@/lib/request";

export const runtime = "nodejs";

function back(request: NextRequest, error?: string) {
  const url = new URL(
    error ? `/access?error=${error}` : "/",
    requestOrigin(request),
  );
  const response = NextResponse.redirect(url, 303);
  response.headers.set("Cache-Control", "no-store");
  return response;
}

export async function POST(request: NextRequest) {
  // Origin must be same-site. Host is supplied by the deployment proxy.
  if (!isSameOrigin(request))
    return new NextResponse("Forbidden", {
      status: 403,
      headers: { "Cache-Control": "no-store" },
    });
  const type = request.headers.get("content-type") || "";
  if (!type.startsWith("application/x-www-form-urlencoded"))
    return new NextResponse("Unsupported form", { status: 415 });
  // Read at most 2KB, even if the client omits or lies about Content-Length.
  const reader = request.body?.getReader();
  if (!reader) return back(request, "invalid");
  let text = "";
  let size = 0;
  const decoder = new TextDecoder();
  while (true) {
    const { done, value } = await reader.read();
    if (done) break;
    size += value.byteLength;
    if (size > 2048) {
      await reader.cancel();
      return new NextResponse("Form too large", { status: 413 });
    }
    text += decoder.decode(value, { stream: true });
  }
  text += decoder.decode();
  const expected = process.env.LANDING_PASSWORD;
  const secret = process.env.SESSION_SECRET;
  if (!expected || !secret || secret.length < 32)
    return back(request, "unavailable");
  const password = new URLSearchParams(text).get("password");
  if (!passwordMatches(password, expected)) return back(request, "invalid");
  const response = back(request);
  response.cookies.set(SESSION_COOKIE, createSession(secret, expected), {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: SESSION_SECONDS,
  });
  return response;
}
