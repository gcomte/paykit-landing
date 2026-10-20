import "server-only";
import Image from "next/image";
import PaymentStoryController from "./PaymentStoryController";
import styles from "./PaymentStory.module.css";

const profiles = [
  {
    person: "Alice",
    methods: [
      { name: "Bitkit", currencies: ["BTC", "Lightning", "USDT"], shared: true },
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
    label: "Enter Paykit",
    title: "Enter Paykit",
    description:
      "Wallets implement the Paykit protocol to discover Alice’s and Bob’s payment options and exchange the details. This step shares information, not funds.",
  },
  {
    label: "Choose who to pay",
    title: "Alice asks Bitkit to send Bob the equivalent of $10.",
    description:
      "Alice opens Bitkit, chooses Bob, and enters $10. Her wallet will send the equivalent amount using a payment method they both support.",
  },
  {
    label: "Find a shared rail",
    title: "Bitkit finds a shared payment rail through Paykit.",
    description:
      "Bitkit uses Paykit to discover Bob’s payment options and finds on-chain BTC in common: Bitkit can pay WDK.",
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
    desktop: "M0 150C12 150 12 116 30 116",
    mobile: "M0 150C14 150 8 50 12 -66",
  },
  {
    wallet: "PayPal",
    desktop: "M0 236C15 236 14 116 38 116",
    mobile: "M0 236C24 236 16 58 29 -66",
  },
  {
    wallet: "Wise",
    desktop: "M0 322C20 322 20 116 46 116",
    mobile: "M0 322C33 322 22 74 43 -66",
  },
  {
    wallet: "BitBox",
    desktop: "M100 150C86 150 86 116 70 116",
    mobile: "M100 150C86 150 92 50 88 -66",
  },
  {
    wallet: "Revolut",
    desktop: "M100 236C85 236 86 116 62 116",
    mobile: "M100 236C76 236 84 58 71 -66",
  },
  {
    wallet: "WDK",
    desktop: "M100 322C82 322 80 116 54 116",
    mobile: "M100 322C67 322 78 74 57 -66",
  },
];
function Person() {
  return (
    <Image
      src="/illustrations/glass-person-v1.png"
      width={96}
      height={96}
      sizes="(max-width: 700px) 56px, 96px"
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
        navigation: "Payment walkthrough steps",
        autoplay: "Auto-playing",
        paused: "Paused",
        manual: "Manual steps",
        reducedMotion: "Choose a step to explore at your own pace.",
      }}
      footer={
        <p className={styles.note}>
          Illustrative payment options, not a list of supported integrations.
          Apps choose which payment methods they support. You
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
            viewBox="0 0 100 360"
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
                      <span
                        className={styles.discoverySummaryOption}
                        data-summary-wallet={method.name}
                        key={method.name}
                      >
                        <Image
                          src={walletLogos[method.name]}
                          width={22}
                          height={22}
                          alt={method.name}
                          title={method.name}
                        />
                        <span className={styles.discoverySummaryCurrencies}>
                          {method.currencies.map((currency) => (
                            <span data-summary-currency={currency} key={currency}>
                              {currency}
                            </span>
                          ))}
                        </span>
                      </span>
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
          <svg viewBox="0 0 100 360" preserveAspectRatio="none" fill="none">
            <g className={styles.desktopDiscoveryLinks}>
              <path
                className={styles.queryRequest}
                d="M0 88C8 128 24 132 30 116"
                pathLength="1"
              />
              <path
                className={styles.queryResponse}
                d="M60 116C58 144 20 154 0 108"
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
          <svg viewBox="0 0 100 360" preserveAspectRatio="none" fill="none">
            <path
              className={styles.routeLine}
              d="M0 150C45 150 55 322 100 322"
            />
            <path
              className={styles.routePulse}
              d="M0 150C45 150 55 322 100 322"
              pathLength="1"
            />
            <path className={styles.arrow} d="m94 316 5 6-5 6" />
          </svg>
          <span className={styles.btc}>BTC</span>
        </div>
      </div>
    </PaymentStoryController>
  );
}
