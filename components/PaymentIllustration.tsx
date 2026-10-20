import "server-only";
import PaymentStoryController from "./PaymentStoryController";
import styles from "./PaymentStory.module.css";

const profiles = [
  {
    person: "Alice",
    methods: [
      { name: "Bitkit", currencies: ["BTC", "Tether"], shared: true },
      { name: "PayPal", currencies: ["USD"], shared: false },
      { name: "Wise", currencies: ["USD", "GBP"], shared: false },
    ],
  },
  {
    person: "Bob",
    methods: [
      { name: "Cake Wallet", currencies: ["Ether", "XMR"], shared: false },
      { name: "Revolut", currencies: ["EUR", "CHF"], shared: false },
      { name: "WDK", currencies: ["BTC", "Ether"], shared: true },
    ],
  },
];
const steps = [
  {
    label: "Meet Alice and Bob",
    title: "Different people. Different payment options.",
    description:
      "Alice and Bob each use their own wallets and payment services.",
  },
  {
    label: "Discover the options",
    title: "Their wallets speak Paykit.",
    description:
      "Wallets that implement the Paykit protocol learn which payment options are available and exchange the details.",
  },
  {
    label: "Find a shared rail",
    title: "Alice wants to pay Bob $10 equivalent.",
    description:
      "Paykit helps their wallets find BTC in common: Alice can use Bitkit, and Bob can receive with WDK. Nothing moves yet.",
  },
  {
    label: "Approve and pay",
    title: "Alice confirms. Her wallet pays Bob directly.",
    description:
      "Bitkit sends BTC directly to WDK. Paykit coordinates the details; the payment never passes through Paykit.",
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
    <PaymentStoryController
      steps={steps}
      labels={{
        play: "Play payment walkthrough",
        pause: "Pause payment walkthrough",
        replay: "Replay payment walkthrough",
        navigation: "Payment walkthrough steps",
        reducedMotion:
          "Animation is off because you prefer reduced motion. Choose any step to explore.",
      }}
      heading={
        <>
          <span>From a contact to a payment</span>
          <span className={styles.example}>Illustrative example</span>
        </>
      }
      footer={
        <p className={styles.note}>
          Illustrative profiles and currencies, not a list of supported
          integrations. Apps choose which payment methods they support. You
          approve payments in your wallet.
        </p>
      }
    >
      <div className={styles.scene}>
        <div className={styles.discovery} aria-hidden="true">
          <span>Wallets use Paykit to discover payment options.</span>
        </div>
        {profiles.map((profile) => (
          <div className={styles.profile} key={profile.person}>
            <div className={styles.person}>
              <span className={styles.avatar}>
                <Person />
              </span>
              <strong>{profile.person}</strong>
              <span className={styles.protocol}>
                Speaks Paykit
                <span className={styles.activity} aria-hidden="true" />
              </span>
            </div>
            <div className={styles.methods}>
              {profile.methods.map((method) => (
                <div
                  className={styles.method}
                  data-wallet={method.name}
                  data-shared={method.shared}
                  key={method.name}
                >
                  <strong>{method.name}</strong>
                  <span className={styles.currencies}>
                    {method.currencies.map((currency) => (
                      <span key={currency} data-currency={currency}>
                        {currency}
                      </span>
                    ))}
                  </span>
                </div>
              ))}
            </div>
          </div>
        ))}
        <div
          className={styles.route}
          data-testid="payment-route"
          aria-hidden="true"
        >
          <svg viewBox="0 0 100 378" preserveAspectRatio="none" fill="none">
            <path
              className={styles.routeLine}
              d="M0 129C45 129 55 333 100 333"
            />
            <path
              className={styles.routePulse}
              d="M0 129C45 129 55 333 100 333"
              pathLength="1"
            />
            <path className={styles.arrow} d="m94 327 5 6-5 6" />
          </svg>
          <span className={styles.btc}>BTC</span>
        </div>
      </div>
    </PaymentStoryController>
  );
}
