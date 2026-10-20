const features = [
  {
    title: "Recurring payments",
    description:
      "Agree on repeating payment requests with clear amounts and billing periods. Your wallet manages the schedule and payment.",
    icon: (
      <>
        <path d="M20 8a8 8 0 0 0-14-2L3 9m0-6v6h6M4 16a8 8 0 0 0 14 2l3-3m0 6v-6h-6" />
      </>
    ),
  },
  {
    title: "Allowances",
    description:
      "Let your wallet handle approved requests within agreed limits. Set spending caps or expiry, and end an allowance when needed.",
    icon: (
      <>
        <path d="M12 3 4 6v6c0 5 8 9 8 9s8-4 8-9V6l-8-3Z" />
        <path d="m8 12 3 3 5-6" />
      </>
    ),
  },
  {
    title: "Private payment details",
    description:
      "Share receiving details with a specific contact through an encrypted connection, alongside the payment methods you choose to make public.",
    icon: (
      <>
        <rect x="5" y="10" width="14" height="11" rx="2" />
        <path d="M8 10V7a4 4 0 0 1 8 0v3m-4 5v2" />
      </>
    ),
  },
  {
    title: "Requests and receipts",
    description:
      "Keep the context with the payment. Exchange requests, payment proofs, and encrypted receipts between compatible apps.",
    icon: (
      <>
        <path d="M6 3h12v18l-3-2-3 2-3-2-3 2V3Z" />
        <path d="M9 7h6m-6 4h6m-6 4h3" />
      </>
    ),
  },
];

export default function Features() {
  return (
    <section
      className="features section-pad"
      id="features"
      aria-labelledby="features-title"
    >
      <div className="section-heading">
        <div>
          <p className="eyebrow">WHAT PAYKIT MAKES POSSIBLE</p>
          <h2 id="features-title">
            Beyond a<br />
            one-off payment.
          </h2>
        </div>
        <p>
          From paying a friend to an ongoing arrangement, Paykit gives wallets a
          shared way to coordinate what comes next.
        </p>
      </div>
      <div className="features-grid">
        {features.map((feature) => (
          <article className="feature" key={feature.title}>
            <svg
              width="25"
              height="25"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              {feature.icon}
            </svg>
            <div>
              <h3>{feature.title}</h3>
              <p>{feature.description}</p>
            </div>
          </article>
        ))}
      </div>
      <p className="feature-support">
        Available features depend on your wallet or service. Your wallet
        controls payment approval, scheduling, and execution.
      </p>
    </section>
  );
}
