import Image from "next/image";

const profiles = [
  {
    person: "Alice",
    methods: [
      { name: "Bitkit", currencies: ["BTC", "Tether"], shared: true },
      { name: "PayPal", currencies: ["USD"] },
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
        <span id="payment-frame-title">Payment discovery with Paykit</span>
        <span className="payment-example">Illustrative example</span>
      </div>
      <Image
        className="payment-map-image"
        src="/illustrations/contact-payment-v7.png"
        alt="I want to pay. Alice's wallets are Bitkit with BTC and Tether first, PayPal with USD second, and Wise with USD and GBP third. Bob has Cake Wallet with Ether and XMR, Revolut with EUR and CHF, and WDK with BTC and Ether at the bottom. Currencies are stacked vertically. A subtle discovery frame explains that wallets use Paykit to find a shared payment rail. A single uninterrupted orange BTC arrow goes directly from Alice's Bitkit to Bob's WDK, with no Paykit intermediary."
        width={1774}
        height={887}
        sizes="(max-width: 900px) 1px, 1152px"
      />
      <div className="mobile-payment-map">
        <p className="payment-intent">
          I want to pay
          <span className="payment-intent-arrow" aria-hidden="true" />
        </p>
        <div className="payment-discovery-layer">
          <p className="payment-discovery-label">
            Wallets use Paykit to find a shared payment rail.
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
                              currency === "BTC"
                                ? "currency-selected"
                                : undefined
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
                  <div className="method-payment-route">
                    <svg
                      viewBox="0 0 64 352"
                      preserveAspectRatio="none"
                      fill="none"
                      aria-hidden="true"
                    >
                      <path
                        d="M0 128C32 128 32 304 62 304M57 299L62 304L57 309"
                        className="method-btc-line"
                      />
                    </svg>
                    <span className="method-route-currency">BTC</span>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
        <div className="mobile-bitcoin-route">
          <span aria-hidden="true">₿</span> BTC selected: Bitkit → WDK
        </div>
      </div>
      <figcaption>
        Paykit helps wallets find a shared payment rail and exchange the
        details.
        <strong> Alice pays Bob directly.</strong>
      </figcaption>
      <p className="payment-example-note">
        Illustrative profiles and currencies. Paykit exchanges payment details;
        funds move between wallets. Integrations and supported currencies vary
        by app.
      </p>
    </figure>
  );
}
