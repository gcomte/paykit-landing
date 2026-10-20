import "server-only";
import Image from "next/image";
import PaymentStoryController from "./PaymentStoryController";
import styles from "./PaymentStory.module.css";

const profiles = [
  {
    person: "Alice",
    methods: [
      { name: "Bitkit", currencies: ["BTC", "USDT"], shared: true },
      { name: "PayPal", currencies: ["USD"], shared: false },
      { name: "Wise", currencies: ["USD", "GBP"], shared: false },
    ],
  },
  {
    person: "Bob",
    methods: [
      { name: "Cake Wallet", currencies: ["ETH", "XMR"], shared: false },
      { name: "Revolut", currencies: ["EUR", "CHF"], shared: false },
      { name: "WDK", currencies: ["BTC", "ETH"], shared: true },
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
    title: "Paykit knows their payment options.",
    description:
      "Wallets implement the Paykit protocol to discover Alice’s and Bob’s payment options and exchange the details. This step shares information, not funds.",
  },
  {
    label: "Find a shared rail",
    title: "Alice asks Paykit how to pay Bob $10 equivalent.",
    description:
      "Using the Paykit protocol, Alice’s wallet queries Bob’s payment options and finds BTC in common: Bitkit can pay WDK.",
  },
  {
    label: "Approve and pay",
    title: "Alice confirms. Her wallet pays Bob directly.",
    description:
      "Bitkit sends BTC directly to WDK. Paykit coordinates the details; the payment never passes through Paykit.",
  },
];
const discoveryLinks = [
  {
    wallet: "Bitkit",
    desktop: "M0 173C12 173 12 48 25 48",
    mobile: "M0 173C14 173 8 50 12 -10",
  },
  {
    wallet: "PayPal",
    desktop: "M0 275C15 275 8 78 25 78",
    mobile: "M0 275C24 275 16 58 29 -10",
  },
  {
    wallet: "Wise",
    desktop: "M0 377C20 377 14 114 38 114",
    mobile: "M0 377C33 377 22 74 43 -10",
  },
  {
    wallet: "Cake Wallet",
    desktop: "M100 173C86 173 85 30 62 30",
    mobile: "M100 173C86 173 92 50 88 -10",
  },
  {
    wallet: "Revolut",
    desktop: "M100 275C85 275 98 74 75 74",
    mobile: "M100 275C76 275 84 58 71 -10",
  },
  {
    wallet: "WDK",
    desktop: "M100 377C82 377 98 100 75 100",
    mobile: "M100 377C67 377 78 74 57 -10",
  },
];
function Person() {
  return (
    <Image
      src="/illustrations/glass-person-v1.png"
      width={112}
      height={112}
      sizes="(max-width: 700px) 56px, 112px"
      alt=""
      draggable={false}
    />
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
        autoplay: "Auto-playing",
        paused: "Paused",
        manual: "Manual steps",
        reducedMotion: "Choose a step to explore at your own pace.",
      }}
      footer={
        <p className={styles.note}>
          Illustrative profiles and currencies, not a list of supported
          integrations. Apps choose which payment methods they support. You
          approve payments in your wallet.
        </p>
      }
    >
      <div className={styles.scene} data-testid="payment-scene">
        {profiles.map((profile) => (
          <div
            className={styles.profile}
            data-person={profile.person}
            key={profile.person}
          >
            <div className={styles.person}>
              <span className={styles.avatar}>
                <Person />
              </span>
              <strong>{profile.person}</strong>
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
          className={styles.discoveryNetwork}
          data-testid="payment-discovery"
          aria-hidden="true"
        >
          <svg
            className={styles.discoveryLinks}
            data-testid="payment-discovery-links"
            viewBox="0 0 100 422"
            preserveAspectRatio="none"
            fill="none"
          >
            <g className={styles.desktopDiscoveryLinks}>
              {discoveryLinks.map((link) => (
                <g key={link.wallet}>
                  <path
                    className={styles.discoveryLink}
                    d={link.desktop}
                    data-discovery-wallet={link.wallet}
                  />
                  <path
                    className={styles.discoveryData}
                    d={link.desktop}
                    pathLength="1"
                  />
                </g>
              ))}
            </g>
            <g className={styles.mobileDiscoveryLinks}>
              {discoveryLinks.map((link) => (
                <g key={link.wallet}>
                  <path
                    className={styles.discoveryLink}
                    d={link.mobile}
                    data-discovery-wallet={link.wallet}
                  />
                  <path
                    className={styles.discoveryData}
                    d={link.mobile}
                    pathLength="1"
                  />
                </g>
              ))}
            </g>
          </svg>
          <div
            className={styles.discoveryNode}
            data-testid="payment-discovery-node"
          >
            Paykit
          </div>
        </div>
        <div
          className={styles.query}
          data-testid="payment-query"
          aria-hidden="true"
        >
          <svg viewBox="0 0 100 422" preserveAspectRatio="none" fill="none">
            <g className={styles.desktopDiscoveryLinks}>
              <path
                className={styles.queryRequest}
                d="M0 40C10 40 15 53 25 53"
                pathLength="1"
              />
              <path
                className={styles.queryResponse}
                d="M25 93C15 93 10 100 0 100"
                pathLength="1"
              />
            </g>
            <g className={styles.mobileDiscoveryLinks}>
              <path
                className={styles.queryRequest}
                d="M0 30C16 30 13 4 28 -10"
                pathLength="1"
              />
              <path
                className={styles.queryResponse}
                d="M60 -10C52 20 28 70 0 70"
                pathLength="1"
              />
            </g>
          </svg>
          <span className={styles.queryLabel}>Query</span>
          <span className={styles.optionsLabel}>Options</span>
        </div>
        <div
          className={styles.route}
          data-testid="payment-route"
          aria-hidden="true"
        >
          <svg viewBox="0 0 100 422" preserveAspectRatio="none" fill="none">
            <path
              className={styles.routeLine}
              d="M0 173C45 173 55 377 100 377"
            />
            <path
              className={styles.routePulse}
              d="M0 173C45 173 55 377 100 377"
              pathLength="1"
            />
            <path className={styles.arrow} d="m94 371 5 6-5 6" />
          </svg>
          <span className={styles.btc}>BTC</span>
        </div>
      </div>
    </PaymentStoryController>
  );
}
