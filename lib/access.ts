import "server-only";
import { cookies } from "next/headers";
import { validSession, SESSION_COOKIE } from "./session.mjs";

export async function hasAccess() {
  const jar = await cookies();
  return validSession(
    jar.get(SESSION_COOKIE)?.value,
    process.env.SESSION_SECRET,
    process.env.LANDING_PASSWORD,
  );
}
