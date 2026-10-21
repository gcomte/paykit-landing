"use client";

import { useState, type FormEvent, type ReactNode } from "react";

export function Teaser({ children }: { children: ReactNode }) {
  const [loaded, setLoaded] = useState(false);
  return (
    <div className={`video-frame ${loaded ? "is-playing" : ""}`}>
      {loaded ? (
        <iframe
          src="https://www.youtube-nocookie.com/embed/cQi8QkG_y4Y?autoplay=1&rel=0"
          title="Paykit teaser"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          referrerPolicy="strict-origin-when-cross-origin"
          allowFullScreen
        />
      ) : (
        <button
          className="video-poster"
          onClick={() => setLoaded(true)}
          aria-label="Play the Paykit teaser. Loads video from YouTube."
        >
          {children}
        </button>
      )}
    </div>
  );
}

export function InquiryForm({
  contactEmail,
  children,
}: {
  contactEmail: string;
  children: ReactNode;
}) {
  const [status, setStatus] = useState("");
  function compose(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const interest = String(data.get("interest") || "A question");
    const body = `Name: ${data.get("name")}\nEmail: ${data.get("email")}\nOrganization: ${data.get("organization") || "—"}\nInterest: ${interest}\n\n${data.get("message")}`;
    window.location.href = `mailto:${contactEmail}?subject=${encodeURIComponent(`Paykit inquiry — ${interest}`)}&body=${encodeURIComponent(body)}`;
    setStatus(
      `Send the draft in your email app. If it did not open, email ${contactEmail} directly.`,
    );
  }
  return (
    <form className="contact-form" onSubmit={compose}>
      {children}
      <p className="form-status" role="status">
        {status}
      </p>
    </form>
  );
}
