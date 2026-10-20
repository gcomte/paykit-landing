import { hasAccess } from "@/lib/access";
import { workshopCalendar } from "@/lib/calendar.mjs";
import { requestOrigin } from "@/lib/request";
import { NextRequest, NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function GET(request: NextRequest) {
  if (!(await hasAccess())) {
    const response = NextResponse.redirect(
      new URL("/access", requestOrigin(request)),
      303,
    );
    response.headers.set("Cache-Control", "no-store");
    return response;
  }
  return new Response(workshopCalendar(), {
    headers: {
      "Content-Type": "text/calendar; charset=utf-8",
      "Content-Disposition": 'attachment; filename="paykit-lugano-2026.ics"',
      "Cache-Control": "private, no-store",
    },
  });
}
