import { NextRequest, NextResponse } from "next/server";
import { SESSION_COOKIE } from "@/lib/session.mjs";
import { isSameOrigin, requestOrigin } from "@/lib/request";

export async function POST(request: NextRequest) {
  if (!isSameOrigin(request))
    return new NextResponse("Forbidden", { status: 403 });
  const response = NextResponse.redirect(
    new URL("/access", requestOrigin(request)),
    303,
  );
  response.cookies.set(SESSION_COOKIE, "", {
    path: "/",
    maxAge: 0,
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
  });
  response.headers.set("Cache-Control", "no-store");
  return response;
}
