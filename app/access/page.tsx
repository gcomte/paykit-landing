import { redirect } from "next/navigation";
import { hasAccess } from "@/lib/access";
import "./access.css";

export const dynamic = "force-dynamic";

export default async function Access({
  searchParams,
}: {
  searchParams: Promise<{ error?: string }>;
}) {
  if (await hasAccess()) redirect("/");
  const { error } = await searchParams;
  return (
    <main className="access-shell">
      <a className="access-wordmark" href="/access" aria-label="Paykit">
        Paykit
      </a>
      <section className="access-card" aria-labelledby="access-title">
        <span className="access-eyebrow">A FIRST LOOK</span>
        <h1 id="access-title">
          You’re in
          <br />
          good company.
        </h1>
        <p>Enter the preview password to explore Paykit.</p>
        <form method="post" action="/api/access">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            name="password"
            autoComplete="current-password"
            required
            maxLength={256}
            aria-describedby={error ? "access-error" : undefined}
            autoFocus
          />
          {error && (
            <p id="access-error" className="access-error" role="alert">
              {error === "unavailable"
                ? "Access is temporarily unavailable. Please try again later."
                : error === "rate"
                  ? "Too many attempts. Please wait a minute and try again."
                  : "That password didn’t match. Please try again."}
            </p>
          )}
          <button type="submit">
            Enter Paykit <span aria-hidden="true">↗</span>
          </button>
        </form>
        <span className="access-note">
          Private preview · Shared by invitation
        </span>
      </section>
      <span className="access-bottom">A simpler way to connect.</span>
    </main>
  );
}
