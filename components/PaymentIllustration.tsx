import Image from "next/image";

const profiles = [
  {
    person: "You",
    methods: [
      { name: "PayPal" },
      { name: "Bitkit", shared: true },
      { name: "Wise" },
    ],
  },
  {
    person: "Your contact",
    methods: [
      { name: "Ethereum" },
      { name: "WDK wallet", shared: true },
      { name: "Revolut" },
    ],
  },
];

function Person() {
  return (
    <svg
      width="32"
      height="32"
      viewBox="0 0 32 32"
      fill="none"
      aria-hidden="true"
    >
      <circle cx="16" cy="10" r="5" fill="currentColor" />
      <path d="M6 28v-3a10 10 0 0 1 20 0v3H6Z" fill="currentColor" />
    </svg>
  );
}

export default function PaymentIllustration() {
  return (
    <figure
      className="payment-illustration"
      aria-labelledby="payment-frame-title"
    >
      <div className="payment-frame-heading">
        <span id="payment-frame-title">Handled by Paykit</span>
        <span className="payment-example">Illustrative example</span>
      </div>
      <Image
        className="payment-map-image"
        src="/illustrations/contact-payment-v2.png"
        alt="Two people have different payment options. You use PayPal, Bitkit with Bitcoin, and Wise. Your contact uses Ethereum, a WDK wallet with Bitcoin, and Revolut. The only highlighted connection is Bitcoin, linking Bitkit to the WDK wallet."
        width={1774}
        height={887}
        sizes="(max-width: 900px) 1px, 1152px"
      />
      <div className="mobile-payment-map">
        <div className="method-profiles">
          {profiles.map((profile, index) => (
            <div className="method-profile-group" key={profile.person}>
              {index === 1 && (
                <div className="method-connector" aria-hidden="true">
                  <span>→</span>
                </div>
              )}
              <div className="method-person">
                <div className="method-person-heading">
                  <span className="method-person-icon">
                    <Person />
                  </span>
                  <strong>{profile.person}</strong>
                </div>
                {profile.methods.map((method) => (
                  <div
                    className={`method-option ${method.shared ? "method-shared" : ""}`}
                    key={method.name}
                  >
                    <span>{method.name}</span>
                    {method.shared && (
                      <strong>
                        <span aria-hidden="true">₿</span> Bitcoin
                      </strong>
                    )}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
        <div className="mobile-bitcoin-route">
          <span aria-hidden="true">₿</span> Bitcoin in common
        </div>
      </div>
      <figcaption>
        Paykit lets wallets discover a shared payment method and exchange the
        details automatically. <strong>You just review and pay.</strong>
      </figcaption>
      <p className="payment-example-note">
        Illustrative payment profiles. Paykit integration and supported methods
        vary by app.
      </p>
    </figure>
  );
}
