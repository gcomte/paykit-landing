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
      { name: "BitBox", currencies: ["ETH", "XMR"], shared: false },
      { name: "Revolut", currencies: ["EUR", "CHF"], shared: false },
      { name: "WDK", currencies: ["BTC", "ETH"], shared: true },
    ],
  },
];
const walletLogos: Record<string, string> = {
  Bitkit: "/wallets/bitkit.svg",
  PayPal: "/wallets/paypal.svg",
  Wise: "/wallets/wise.svg",
  "BitBox": "/wallets/bitbox.png",
  Revolut: "/wallets/revolut.svg",
  WDK: "/wallets/wdk.svg",
};
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
    desktop: "M0 173C12 173 12 116 30 116",
    mobile: "M0 173C14 173 8 50 12 -66",
  },
  {
    wallet: "PayPal",
    desktop: "M0 275C15 275 14 116 38 116",
    mobile: "M0 275C24 275 16 58 29 -66",
  },
  {
    wallet: "Wise",
    desktop: "M0 377C20 377 20 116 46 116",
    mobile: "M0 377C33 377 22 74 43 -66",
  },
  {
    wallet: "BitBox",
    desktop: "M100 173C86 173 86 116 70 116",
    mobile: "M100 173C86 173 92 50 88 -66",
  },
  {
    wallet: "Revolut",
    desktop: "M100 275C85 275 86 116 62 116",
    mobile: "M100 275C76 275 84 58 71 -66",
  },
  {
    wallet: "WDK",
    desktop: "M100 377C82 377 80 116 54 116",
    mobile: "M100 377C67 377 78 74 57 -66",
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
                  <Image
                    className={styles.walletLogo}
                    src={walletLogos[method.name]}
                    width={40}
                    height={40}
                    alt={method.name}
                    title={method.name}
                  />
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
            <strong className={styles.discoveryNodeTitle}>
              <span>Paykit</span>
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.6"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
                focusable="false"
              >
                <rect x="5" y="10" width="14" height="11" rx="2" />
                <path d="M8 10V7a4 4 0 0 1 8 0v3" />
              </svg>
            </strong>
            <div className={styles.discoverySummary}>
              {profiles.map((profile) => (
                <div
                  className={styles.discoverySummaryPerson}
                  key={profile.person}
                >
                  <strong>{profile.person}</strong>
                  <span className={styles.discoverySummaryMethods}>
                    {profile.methods.map((method) => (
                      <Image
                        src={walletLogos[method.name]}
                        width={28}
                        height={28}
                        alt={method.name}
                        key={method.name}
                      />
                    ))}
                  </span>
                </div>
              ))}
            </div>
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
                d="M0 104C8 144 24 148 30 116"
                pathLength="1"
              />
              <path
                className={styles.queryResponse}
                d="M60 116C58 160 20 170 0 124"
                pathLength="1"
              />
            </g>
            <g className={styles.mobileDiscoveryLinks}>
              <path
                className={styles.queryRequest}
                d="M0 30C16 30 13 4 28 -66"
                pathLength="1"
              />
              <path
                className={styles.queryResponse}
                d="M60 -66C52 20 28 70 0 70"
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
