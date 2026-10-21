import "server-only";
import Image from "next/image";
import PaymentStoryController from "./PaymentStoryController";
import styles from "./PaymentStory.module.css";

const profiles = [
  {
    person: "Alice",
    methods: [
      {
        name: "Bitkit",
        currencies: ["BTC", "Lightning", "USDT"],
        shared: true,
      },
      { name: "PayPal", currencies: ["USD"], shared: false },
      { name: "Wise", currencies: ["USD", "GBP"], shared: false },
    ],
  },
  {
    person: "Bob",
    methods: [
      { name: "BitBox", currencies: ["ETH"], shared: false },
      { name: "Revolut", currencies: ["EUR", "CHF"], shared: false },
      { name: "WDK", currencies: ["BTC", "ETH"], shared: true },
    ],
  },
];
const walletLogos: Record<string, string> = {
  Bitkit: "/wallets/bitkit.svg",
  PayPal: "/wallets/paypal.svg",
  Wise: "/wallets/wise.svg",
  BitBox: "/wallets/bitbox.png",
  Revolut: "/wallets/revolut.svg",
  WDK: "/wallets/wdk.svg",
};
const paymentOptions = [
  {
    person: "Alice",
    rails: [
      { id: "bitcoin-onchain", label: "Bitcoin on-chain" },
      { id: "lightning", label: "Lightning" },
      { id: "usdt-arbitrum", label: "USDT · Arbitrum" },
      { id: "paypal-usd", label: "PayPal · USD" },
      { id: "bank-usd-gbp", label: "USD / GBP transfer" },
    ],
  },
  {
    person: "Bob",
    rails: [
      { id: "ethereum", label: "Ethereum" },
      { id: "bank-eur-chf", label: "EUR/CHF transfer" },
      { id: "bitcoin-onchain", label: "Bitcoin on-chain" },
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
    label: "Enter Paykit",
    title: "Paykit indexes payment options",
    description:
      "Wallets can register their supported payment rails with Paykit so other wallets can discover them. This step shares information, not funds.",
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
      "Bitkit uses Paykit to discover Bob’s payment options and finds on-chain BTC in common.",
  },
  {
    label: "Approve and pay",
    title: "Alice confirms. Her wallet pays Bob directly.",
    description:
      "Bitkit sends BTC directly to WDK. The payment never passes through Paykit.",
  },
];
const discoveryLinks = [
  {
    wallet: "Bitkit",
    desktop: "M0 150C35 150 65 75 100 75",
    mobile: "M0 150C14 150 8 50 12 -66",
  },
  {
    wallet: "PayPal",
    desktop: "M0 236C35 236 65 150 100 150",
    mobile: "M0 236C24 236 16 58 29 -66",
  },
  {
    wallet: "Wise",
    desktop: "M0 322C35 322 65 220 100 220",
    mobile: "M0 322C33 322 22 74 43 -66",
  },
  {
    wallet: "BitBox",
    desktop: "M100 150C65 150 35 95 0 95",
    mobile: "M100 150C86 150 92 50 88 -66",
  },
  {
    wallet: "Revolut",
    desktop: "M100 236C65 236 35 170 0 170",
    mobile: "M100 236C76 236 84 58 71 -66",
  },
  {
    wallet: "WDK",
    desktop: "M100 322C65 322 35 235 0 235",
    mobile: "M100 322C67 322 78 74 57 -66",
  },
];
function DiscoveryPaths({
  links,
  mobile = false,
}: {
  links: typeof discoveryLinks;
  mobile?: boolean;
}) {
  return links.map((link) => (
    <g key={link.wallet}>
      <path
        className={styles.discoveryLink}
        d={mobile ? link.mobile : link.desktop}
        data-discovery-wallet={link.wallet}
      />
      <path
        className={styles.discoveryData}
        d={mobile ? link.mobile : link.desktop}
        pathLength="1"
        style={{
          animationDelay: ["0.25s", "0.875s", "1.75s", "0.5s", "1.5s", "2.25s"][
            discoveryLinks.indexOf(link)
          ],
        }}
      />
    </g>
  ));
}
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
          Apps choose which payment methods they support.
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
            {profile.person === "Alice" && (
              <div
                className={styles.instructionArrow}
                data-testid="payment-instruction-arrow"
                aria-hidden="true"
              >
                <svg viewBox="0 0 88 88" preserveAspectRatio="none" fill="none">
                  <path d="M0 8C24 20 24 44 0 64" />
                </svg>
                <span className={styles.instructionArrowHead} />
              </div>
            )}
            {profile.person === "Alice" && (
              <div
                className={styles.intent}
                data-testid="payment-intent"
                aria-hidden="true"
              >
                <span
                  className={styles.intentRecipient}
                  data-testid="payment-intent-recipient"
                >
                  Bob
                </span>
                <span
                  className={styles.intentAmount}
                  data-testid="payment-intent-amount"
                >
                  $10
                </span>
              </div>
            )}
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
          <div
            className={styles.discoveryLinks}
            data-testid="payment-discovery-links"
          >
            <div className={styles.desktopDiscoveryLinks}>
              <svg
                className={styles.discoveryLeft}
                viewBox="0 0 100 360"
                preserveAspectRatio="none"
                fill="none"
              >
                <DiscoveryPaths links={discoveryLinks.slice(0, 3)} />
              </svg>
              <svg
                className={styles.discoveryRight}
                viewBox="0 0 100 360"
                preserveAspectRatio="none"
                fill="none"
              >
                <DiscoveryPaths links={discoveryLinks.slice(3)} />
              </svg>
            </div>
            <svg
              className={styles.mobileDiscoveryLinks}
              viewBox="0 0 100 360"
              preserveAspectRatio="none"
              fill="none"
            >
              <DiscoveryPaths links={discoveryLinks} mobile />
            </svg>
          </div>
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
              {paymentOptions.map((profile) => (
                <div
                  className={styles.discoverySummaryPerson}
                  data-summary-person={profile.person}
                  key={profile.person}
                >
                  <strong>{profile.person}</strong>
                  <span className={styles.discoverySummaryMethods}>
                    {profile.rails.map((rail) => (
                      <span
                        className={styles.discoverySummaryOption}
                        data-summary-rail={rail.id}
                        key={rail.id}
                      >
                        {rail.label}
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
          <div
            className={`${styles.desktopDiscoveryLinks} ${styles.desktopQuery}`}
          >
            <span className={styles.queryRequestLine}>
              <span className={styles.queryRequestTravel} />
            </span>
            <span className={styles.queryResponseLine}>
              <span className={styles.queryResponseTravel} />
            </span>
          </div>
          <svg
            className={styles.mobileDiscoveryLinks}
            viewBox="0 0 100 360"
            preserveAspectRatio="none"
            fill="none"
          >
            <path
              className={styles.queryRequest}
              d="M0 140C24 140 28 40 28 -66"
              pathLength="1"
            />
            <path
              className={styles.queryResponse}
              d="M60 -66C60 30 26 160 0 160"
              pathLength="1"
            />
            <path
              className={`${styles.queryPulse} ${styles.queryRequestPulse}`}
              d="M0 140C24 140 28 40 28 -66"
              pathLength="1"
            />
            <path
              className={`${styles.queryPulse} ${styles.queryResponsePulse}`}
              d="M60 -66C60 30 26 160 0 160"
              pathLength="1"
            />
          </svg>
          <span className={styles.mobileQueryRequestHead} />
          <span className={styles.mobileQueryResponseHead} />
          <span className={styles.queryLabel}>How can I pay Bob?</span>
          <span className={styles.optionsLabel}>BTC: bc1q5ayp...</span>
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
