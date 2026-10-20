import Image from "next/image";

const profiles = [
  {
    person: "Alice",
    methods: [
      { name: "PayPal", currencies: ["USD"] },
      { name: "Bitkit", currencies: ["BTC", "Tether"], shared: true },
      { name: "Wise", currencies: ["USD", "GBP"] },
    ],
  },
  {
    person: "Bob",
    methods: [
      { name: "Cake Wallet", currencies: ["Ether", "XMR"] },
      { name: "Revolut", currencies: ["EUR", "CHF"] },
      { name: "WDK", currencies: ["BTC", "Ether"], shared: true },
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
        src="/illustrations/contact-payment-v5.png"
        alt="Alice wants to send $10 equivalent to Bob, shown by a right-pointing arrow. Alice has PayPal with USD, Bitkit with BTC and Tether, and Wise with USD and GBP. Bob has Cake Wallet with Ether and XMR at the top, Revolut with EUR and CHF in the middle, and WDK with BTC and Ether at the bottom. Each wallet's currencies are stacked vertically. Independent faint lines end at different points around a plain Paykit box. A strong orange BTC route links Alice's middle Bitkit wallet through Paykit to Bob's bottom WDK wallet."
        width={1774}
        height={887}
        sizes="(max-width: 900px) 1px, 1152px"
      />
      <div className="mobile-payment-map">
        <p className="payment-intent">
          Alice wants to send $10 equivalent to Bob
          <span className="payment-intent-arrow" aria-hidden="true" />
        </p>
        <div className="method-profiles">
          {profiles.map((profile, index) => (
            <div className="method-profile-group" key={profile.person}>
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
                    <span className="method-currencies">
                      {method.currencies.map((currency) => (
                        <span
                          className={
                            currency === "BTC" ? "currency-selected" : undefined
                          }
                          key={currency}
                        >
                          {currency}
                        </span>
                      ))}
                    </span>
                  </div>
                ))}
              </div>
              {index === 0 && (
                <div className="method-router">
                  <svg viewBox="0 0 64 352" fill="none" aria-hidden="true">
                    <path
                      d="M0 128H12Q22 128 22 146V192M0 304H12Q20 304 20 284V240M64 128H56Q46 128 46 148V192M64 216Q60 216 60 205H59"
                      className="method-discovery-lines"
                    />
                    <path
                      d="M0 216H5M32 240C32 280 50 304 62 304M57 299L62 304L57 309"
                      className="method-btc-line"
                    />
                  </svg>
                  <span className="method-route-currency">BTC</span>
                  <span className="method-paykit-node">Paykit</span>
                </div>
              )}
            </div>
          ))}
        </div>
        <div className="mobile-bitcoin-route">
          <span aria-hidden="true">₿</span> BTC selected: Bitkit → WDK
        </div>
      </div>
      <figcaption>
        Paykit lets wallets discover a shared payment method and exchange the
        details automatically. <strong>You just review and pay.</strong>
      </figcaption>
      <p className="payment-example-note">
        Illustrative profiles and currencies. Paykit exchanges payment details;
        funds move between wallets. Integrations and supported currencies vary
        by app.
      </p>
    </figure>
  );
}
