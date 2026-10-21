import { workshopCalendar } from "@/lib/calendar.mjs";

export function GET() {
  return new Response(workshopCalendar(), {
    headers: {
      "Content-Type": "text/calendar; charset=utf-8",
      "Content-Disposition": 'attachment; filename="paykit-lugano-2026.ics"',
      "Cache-Control": "public, max-age=3600",
    },
  });
}
