import Image from "next/image";

const profiles = [
  {
    person: "Payer",
    methods: [
      { name: "PayPal", currencies: ["USD"] },
      { name: "Bitkit", currencies: ["BTC", "Tether"], shared: true },
      { name: "Wise", currencies: ["USD", "Pounds"] },
    ],
  },
  {
    person: "Recipient",
    methods: [
      { name: "Cake Wallet", currencies: ["Ether", "XMR"] },
      { name: "WDK", currencies: ["BTC", "Ether"], shared: true },
      { name: "Revolut", currencies: ["EUR", "CHF"] },
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
        src="/illustrations/contact-payment-v3.png"
        alt="Payer has PayPal with USD, Bitkit with BTC and Tether, and Wise with USD and Pounds. Recipient has Cake Wallet with Ether and XMR, WDK with BTC and Ether, and Revolut with EUR and CHF. Faint lines connect every wallet to a central Paykit box. A strong orange BTC route links the Payer's Bitkit to the Recipient's WDK through Paykit."
        width={1774}
        height={887}
        sizes="(max-width: 900px) 1px, 1152px"
      />
      <div className="mobile-payment-map">
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
                      d="M0 128H12Q32 128 32 160V216M0 216H64M0 304H12Q32 304 32 272V216M64 128H52Q32 128 32 160M64 304H52Q32 304 32 272"
                      className="method-discovery-lines"
                    />
                    <path
                      d="M0 216H62M57 211L62 216L57 221"
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
