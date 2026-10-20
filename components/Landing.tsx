import type { ReactNode } from "react";
import { InquiryForm, Teaser } from "./Interactions";
import Features from "./Features";

function Arrow({
  diagonal = false,
  className = "",
}: {
  diagonal?: boolean;
  className?: string;
}) {
  return (
    <svg
      className={className}
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
    >
      <path
        d={diagonal ? "M6 18 18 6M6 6h12v12" : "M4 12h15m-6-6 6 6-6 6"}
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function Mark({ className = "" }: { className?: string }) {
  return (
    <svg
      className={className}
      width="31"
      height="31"
      viewBox="0 0 32 32"
      fill="none"
      aria-hidden="true"
    >
      <path
        d="M4 6h12a9 9 0 0 1 0 18h-3v6H4V6Zm9 8v3h3a1.5 1.5 0 0 0 0-3h-3Z"
        fill="currentColor"
      />
      <path d="m22 2 6 6-6 6V2Z" fill="currentColor" />
    </svg>
  );
}

function Icon({ kind, size = 24 }: { kind: string; size?: number }) {
  const paths: Record<string, ReactNode> = {
    person: (
      <>
        <circle cx="12" cy="8" r="3.5" />
        <path d="M5 21v-2a7 7 0 0 1 14 0v2" />
      </>
    ),
    discover: (
      <>
        <circle cx="10.5" cy="10.5" r="6.5" />
        <path d="m16 16 5 5M8 10.5h5m-2.5-2.5v5" />
      </>
    ),
    exchange: (
      <>
        <path d="M3 7h17m-5-5 5 5-5 5M21 17H4m5-5-5 5 5 5" />
      </>
    ),
    wallet: (
      <>
        <path d="M20 8V5H5a2 2 0 0 0 0 4h16v11H5a2 2 0 0 1-2-2V7m14 7h4" />
        <circle cx="17" cy="14" r=".5" />
      </>
    ),
    check: <path d="m5 12 4.5 4.5L19 7" />,
    code: (
      <>
        <path d="m8 6-6 6 6 6m8-12 6 6-6 6m-3-15-2 18" />
      </>
    ),
    globe: (
      <>
        <circle cx="12" cy="12" r="9" />
        <ellipse cx="12" cy="12" rx="4" ry="9" />
        <path d="M3 12h18" />
      </>
    ),
    lock: (
      <>
        <rect x="5" y="10" width="14" height="11" rx="2" />
        <path d="M8 10V7a4 4 0 0 1 8 0v3m-4 5v2" />
      </>
    ),
    mail: (
      <>
        <rect x="3" y="5" width="18" height="14" rx="2" />
        <path d="m3 7 9 6 9-6" />
      </>
    ),
    pin: (
      <>
        <path d="M19 10c0 5-7 11-7 11S5 15 5 10a7 7 0 1 1 14 0Z" />
        <circle cx="12" cy="10" r="2" />
      </>
    ),
  };
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      {paths[kind] ?? paths.code}
    </svg>
  );
}

const links = {
  github: "https://github.com/pubky/paykit-rs",
  specs: "https://github.com/pubky/paykit-rs/tree/master/specs",
  server: "https://github.com/pubky/paykit-server",
  agenda: "https://planb.lugano.ch/planb-forum/agenda/",
};

function Contact({ contactEmail }: { contactEmail: string }) {
  return (
    <section
      className="contact section-pad"
      id="contact"
      aria-labelledby="contact-title"
    >
      <div className="contact-copy">
        <p className="eyebrow">
          <span className="status-dot" /> LET’S CONNECT
        </p>
        <h2 id="contact-title">
          Your next payment
          <br />
          idea starts here.
        </h2>
        <p>
          Building a wallet? Adding payments to a service? Or just curious? We’d
          love to hear what you have in mind.
        </p>
        <a className="text-link" href={`mailto:${contactEmail}`}>
          <Icon kind="mail" size={20} /> {contactEmail} <Arrow diagonal />
        </a>
        <div className="contact-note">
          <span className="mini-mark">
            <Mark />
          </span>
          <p>
            Open protocol.
            <br />
            Open conversation.
          </p>
        </div>
      </div>
      <InquiryForm contactEmail={contactEmail}>
        <div className="form-row">
          <label>
            Your name
            <input
              name="name"
              autoComplete="name"
              placeholder="Alex Rivera"
              required
              maxLength={120}
            />
          </label>
          <label>
            Email address
            <input
              type="email"
              name="email"
              autoComplete="email"
              placeholder="alex@example.com"
              required
              maxLength={254}
            />
          </label>
        </div>
        <label>
          Organization <span className="optional">(optional)</span>
          <input
            name="organization"
            autoComplete="organization"
            placeholder="Your company or project"
            maxLength={160}
          />
        </label>
        <label>
          I’m interested in
          <select name="interest" defaultValue="Wallet integration">
            <option>Wallet integration</option>
            <option>Service integration</option>
            <option>A question about Paykit</option>
            <option>Meeting in Lugano</option>
          </select>
        </label>
        <label>
          Tell us a little more
          <textarea
            name="message"
            rows={4}
            placeholder="What would you like to build, ask, or explore?"
            required
            maxLength={4000}
          />
        </label>
        <button className="button button-dark" type="submit">
          Open email draft <Arrow />
        </button>
        <p className="form-explainer">
          Opens your email app. Send the draft there to reach us. This website
          doesn’t store your inquiry.
        </p>
      </InquiryForm>
    </section>
  );
}

export default function Landing({ contactEmail }: { contactEmail: string }) {
  return (
    <>
      <a href="#main" className="skip-link">
        Skip to content
      </a>
      <header className="site-header">
        <div className="header-inner">
          <a href="#" className="wordmark" aria-label="Paykit home">
            <Mark />
            <span>
              paykit<span className="wordmark-dot">.</span>
            </span>
          </a>
          <nav className="desktop-nav" aria-label="Main navigation">
            <a href="#how-it-works">How it works</a>
            <a href="#try-paykit">Try Paykit</a>
            <a href="#build">Build with Paykit</a>
          </nav>
          <a href="#try-paykit" className="button button-orange header-cta">
            Try Paykit <Arrow />
          </a>
          <details className="mobile-menu">
            <summary aria-label="Open navigation">
              <span />
              <span />
            </summary>
            <nav className="mobile-nav" aria-label="Mobile navigation">
              <a href="#how-it-works">How it works</a>
              <a href="#try-paykit">Try Paykit</a>
              <a href="#build">Build with Paykit</a>
            </nav>
          </details>
        </div>
      </header>
      <main id="main">
        <section className="hero section-pad" aria-labelledby="hero-title">
          <div className="hero-copy">
            <p className="eyebrow">
              <span className="status-dot" /> THE OPEN PAYMENT PROTOCOL
            </p>
            <h1 id="hero-title">
              Pay. Get paid.
              <br />
              Skip the
              <br className="desktop-break" />{" "}
              <span className="serif-word">back-and-forth.</span>
            </h1>
            <p className="hero-intro">
              Paykit is an open protocol that lets wallets handle the payment
              details. Choose a contact, review, and pay—without chasing
              methods, addresses, or invoices.
            </p>
            <div className="hero-actions">
              <a className="button button-orange" href="#try-paykit">
                Try Paykit <Arrow />
              </a>
              <a className="button button-plain" href="#watch">
                <span className="play-small">▶</span> Watch the teaser
              </a>
            </div>
            <div className="hero-footnote">
              <span className="tiny-pubky">
                p<span>✳</span>
              </span>
              <span>
                Built on{" "}
                <a href="https://pubky.org/" target="_blank" rel="noreferrer">
                  Pubky
                </a>
                . Made for any wallet.
              </span>
            </div>
          </div>
          <div
            className="hero-art"
            role="img"
            aria-label="Illustration: select a contact, your wallet discovers their payment methods and exchanges payment details through Paykit, then you approve the payment."
          >
            <div className="art-grid" />
            <div className="pay-card">
              <div className="pay-card-top">
                <span className="pay-label">PAY A CONTACT</span>
                <span className="card-dots">•••</span>
              </div>
              <div className="recipient">
                <span className="avatar avatar-large">
                  L
                  <span className="avatar-check">
                    <Icon kind="check" size={10} />
                  </span>
                </span>
                <div>
                  <b>Lea</b>
                  <span>Someone you know.</span>
                </div>
              </div>
              <div className="amount">
                21,000 <span>sats</span>
              </div>
              <div className="automatic-row">
                <span>
                  <span className="live-dot" /> Payment details found
                </span>
                <Icon kind="check" size={15} />
              </div>
              <div className="illustrated-pay">
                Pay Lea <Arrow />
              </div>
            </div>
            <div className="protocol-chip">
              <span className="protocol-mark">
                <Mark />
              </span>
              <div>
                <b>Paykit connects the details.</b>
                <span>Your wallet is ready. You approve.</span>
              </div>
              <Icon kind="check" size={20} />
            </div>
            <span className="art-coordinate coordinate-bottom">
              ILLUSTRATIVE FLOW · YOU APPROVE THE PAYMENT
            </span>
          </div>
        </section>

        <section
          className="how section-pad"
          id="how-it-works"
          aria-labelledby="how-title"
        >
          <div className="section-heading">
            <div>
              <p className="eyebrow">LESS ASKING. MORE PAYING.</p>
              <h2 id="how-title">
                Pay a person,
                <br />
                <span className="muted">in three steps.</span>
              </h2>
            </div>
            <p>
              “How can I pay you?” shouldn’t be a conversation. Paykit gives
              wallets a shared way to find and exchange the details they need.
            </p>
          </div>
          <div className="steps-grid">
            <article className="step">
              <div className="step-top">
                <span className="step-number">01</span>
                <Icon kind="discover" size={30} />
              </div>
              <div className="step-visual step-contact">
                <span className="avatar avatar-small">L</span>
                <b>Lea</b>
                <span className="small-pill">Your contact</span>
              </div>
              <h3>Find the person.</h3>
              <p>
                Start with a contact’s Pubky identity. Your wallet discovers the
                payment methods they make available.
              </p>
              <span className="step-resolves">No “What do you accept?”</span>
            </article>
            <article className="step">
              <div className="step-top">
                <span className="step-number">02</span>
                <Icon kind="exchange" size={30} />
              </div>
              <div className="step-visual step-exchange">
                <span>
                  <Icon kind="wallet" size={23} />
                </span>
                <div className="exchange-line">
                  <i />
                  <i />
                  <i />
                </div>
                <span>
                  <Icon kind="person" size={23} />
                </span>
              </div>
              <h3>Get the details.</h3>
              <p>
                Compatible apps coordinate the payment details, including
                addresses or invoices, behind the scenes.
              </p>
              <span className="step-resolves">
                No copying. No back-and-forth.
              </span>
            </article>
            <article className="step">
              <div className="step-top">
                <span className="step-number">03</span>
                <Icon kind="wallet" size={30} />
              </div>
              <div className="step-visual step-approved">
                <span>
                  <Icon kind="check" size={20} />
                </span>
                <b>Ready to pay</b>
              </div>
              <h3>Make the payment.</h3>
              <p>
                Review and approve in your wallet. Your wallet sends the payment
                using a method you both support.
              </p>
              <span className="step-resolves">Your wallet. Your approval.</span>
            </article>
          </div>
          <div className="protocol-note">
            <Mark />
            <p>
              <strong>A common language for payments.</strong> Paykit is an open
              protocol that any wallet, app, or service can adopt. Your money
              stays with your wallet.
            </p>
            <a className="text-link" href="#build">
              Build with it <Arrow />
            </a>
          </div>
        </section>

        <Features />

        <section className="foundation" aria-labelledby="foundation-title">
          <div className="foundation-inner section-pad">
            <div className="foundation-copy">
              <p className="eyebrow">
                <span className="status-dot" /> BUILT ON PUBKY
              </p>
              <h2 id="foundation-title">
                Your identity.
                <br />
                Your data.
                <br />
                <span>Your call.</span>
              </h2>
              <p>
                Convenient payments shouldn’t need a central address book.
                Paykit builds on Pubky, a decentralized protocol that puts
                identity and data in your hands.
              </p>
              <p>
                Your payment data lives on a Homeserver you choose—or run
                yourself. Mainline DHT helps apps discover where to find it.
              </p>
              <a
                href="https://pubky.org/overview/"
                target="_blank"
                rel="noreferrer"
                className="text-link"
              >
                Explore Pubky <Arrow diagonal />
              </a>
            </div>
            <div className="foundation-diagram">
              <div className="foundation-diagram-label">
                <span className="mono">UNDER THE HOOD</span>
                <span className="foundation-live">
                  <span /> Open by design
                </span>
              </div>
              <div className="network-node">
                <span className="node-icon">
                  <Icon kind="person" />
                </span>
                <div>
                  <b>Your Pubky identity</b>
                  <span>One identity. A stable starting point.</span>
                </div>
                <span className="node-index">01</span>
              </div>
              <div className="node-connector">
                <span>Discover</span>
                <Arrow />
              </div>
              <a
                className="network-node"
                href="https://pubky.org/mainline-dht/"
                target="_blank"
                rel="noreferrer"
              >
                <span className="node-icon">
                  <Icon kind="globe" />
                </span>
                <div>
                  <b>Mainline DHT</b>
                  <span>Signed records point to your Homeserver.</span>
                </div>
                <Arrow diagonal />
              </a>
              <div className="node-connector">
                <span>Connect</span>
                <Arrow />
              </div>
              <a
                className="network-node final-node"
                href="https://pubky.org/homeserver/"
                target="_blank"
                rel="noreferrer"
              >
                <span className="node-icon">
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    aria-hidden="true"
                  >
                    <rect x="4" y="3" width="16" height="7" rx="1.5" />
                    <rect x="4" y="14" width="16" height="7" rx="1.5" />
                    <path d="M8 6.5h.1M8 17.5h.1M13 6.5h4m-4 11h4" />
                  </svg>
                </span>
                <div>
                  <b>Your chosen Homeserver</b>
                  <span>Your payment data lives here.</span>
                </div>
                <Arrow diagonal />
              </a>
              <div className="foundation-privacy">
                <Icon kind="lock" size={18} />
                <p>
                  Publish payment methods for discovery. Exchange private
                  details through encrypted channels.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section
          className="watch section-pad"
          id="watch"
          aria-labelledby="watch-title"
        >
          <div className="watch-copy">
            <p className="eyebrow">LESS FRICTION. MORE CONNECTION.</p>
            <h2 id="watch-title">
              See the idea
              <br />
              in motion.
            </h2>
            <p>
              A little less payment admin.
              <br />A lot more possibility.
            </p>
            <span className="video-duration">
              THE PAYKIT TEASER <span>↗</span>
            </span>
          </div>
          <Teaser>
            <div className="poster-lines" />
            <span className="poster-wordmark">
              <Mark /> paykit.
            </span>
            <span className="poster-text">
              Goodbye,
              <br />
              <span>payment friction.</span>
            </span>
            <span className="video-play">
              <svg
                width="22"
                height="24"
                viewBox="0 0 22 24"
                fill="none"
                aria-hidden="true"
              >
                <path d="M21 12 1 23V1l20 11Z" fill="currentColor" />
              </svg>
            </span>
            <span className="poster-caption">
              PRESS PLAY <Arrow />
            </span>
          </Teaser>
        </section>

        <section
          className="try section-pad"
          id="try-paykit"
          aria-labelledby="try-title"
        >
          <div className="section-heading">
            <div>
              <p className="eyebrow">
                <span className="status-dot" /> TAKE IT FOR A SPIN
              </p>
              <h2 id="try-title">
                Less theory.
                <br />
                More trying it.
              </h2>
            </div>
            <p>
              Pick up a compatible wallet, create a payment page, or try a
              purchase. Meet the apps bringing Paykit to life.
            </p>
          </div>
          <div className="app-grid">
            <a
              className="app-card bitkit-card"
              href="https://bitkit.to/"
              target="_blank"
              rel="noreferrer"
            >
              <div className="app-card-top">
                <span className="app-category">THE WALLET</span>
                <Arrow diagonal />
              </div>
              <div className="app-logo">
                <img
                  src="/bitkit-logo.svg"
                  alt="Bitkit"
                  width="163"
                  height="48"
                />
              </div>
              <h3>
                People-first payments.
                <br />
                In your pocket.
              </h3>
              <p>
                Try Paykit with Bitkit, the self-custodial Bitcoin and Lightning
                wallet. Use a Paykit-compatible build.
              </p>
              <span className="card-link">
                Get Bitkit <Arrow />
              </span>
            </a>
            <a
              className="app-card payky-card"
              href="https://payky.app/"
              target="_blank"
              rel="noreferrer"
            >
              <div className="app-card-top">
                <span className="app-category">THE PAYMENT PAGE</span>
                <Arrow diagonal />
              </div>
              <div className="payky-wordmark">
                payky<span>↗</span>
              </div>
              <h3>
                One link.
                <br />
                Every way to pay you.
              </h3>
              <p>
                Bring your payment methods together on a page built on your
                Pubky identity. Set it up, then share your link.
              </p>
              <span className="card-link">
                Create your Payky page <Arrow />
              </span>
            </a>
            <a className="app-card future-card" href="#contact">
              <div className="app-card-top">
                <span className="app-category">WHAT’S NEXT</span>
                <Arrow diagonal />
              </div>
              <div className="future-logo">
                <span>+</span>
                <span>+</span>
                <span>+</span>
              </div>
              <h3>
                Your wallet
                <br />
                could be here.
              </h3>
              <p>
                An open protocol has room for everyone. Bring Paykit to your
                wallet or service and help connect the ecosystem.
              </p>
              <span className="card-link">
                Let’s build together <Arrow />
              </span>
            </a>
          </div>
          <a
            className="marketplace-card"
            href="https://staging.pubky.app/shop"
            target="_blank"
            rel="noreferrer"
          >
            <div className="marketplace-icon">
              <svg
                width="55"
                height="55"
                viewBox="0 0 56 56"
                fill="none"
                aria-hidden="true"
              >
                <path
                  d="m13 19 4-11h22l4 11M12 26v22h32V26M8 19h40v5a5 5 0 0 1-10 0 5 5 0 0 1-10 0 5 5 0 0 1-10 0 5 5 0 0 1-10 0v-5ZM22 48V34h12v14M28 8v11M18 19l3-11m17 11L35 8"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
            <div>
              <span className="app-category">PUT IT TO WORK</span>
              <h3>Meet the Pubky Marketplace.</h3>
              <p>
                Explore stores run by independent sellers and try a purchase
                with Bitkit.
              </p>
              <span className="marketplace-access">
                Temporary demo URL · Access may be required
              </span>
            </div>
            <span className="marketplace-action">
              Explore the marketplace <Arrow diagonal />
            </span>
          </a>
        </section>

        <section
          className="build section-pad"
          id="build"
          aria-labelledby="build-title"
        >
          <div className="section-heading">
            <div>
              <p className="eyebrow">OPEN SOURCE. OPEN POSSIBILITIES.</p>
              <h2 id="build-title">
                Make payments
                <br />
                <span className="muted">part of what you build.</span>
              </h2>
            </div>
            <p>
              Give your app a common way to discover and coordinate payments.
              Start with the code, explore the protocol, and make it your own.
            </p>
          </div>
          <div className="resource-list">
            <a href={links.github} target="_blank" rel="noreferrer">
              <span className="resource-icon">
                <Icon kind="code" />
              </span>
              <div>
                <h3>Explore the protocol</h3>
                <p>Rust implementation, library, and integration examples.</p>
              </div>
              <span className="resource-tag">paykit-rs</span>
              <Arrow diagonal />
            </a>
            <a href={links.specs} target="_blank" rel="noreferrer">
              <span className="resource-icon">
                <Icon kind="exchange" />
              </span>
              <div>
                <h3>Read the specifications</h3>
                <p>The formats and messages that let apps speak Paykit.</p>
              </div>
              <span className="resource-tag">Protocol specs</span>
              <Arrow diagonal />
            </a>
            <a href={links.server} target="_blank" rel="noreferrer">
              <span className="resource-icon">
                <Icon kind="wallet" />
              </span>
              <div>
                <h3>Build a receiving service</h3>
                <p>A reference server for receiving Paykit payments.</p>
              </div>
              <span className="resource-tag">paykit-server</span>
              <Arrow diagonal />
            </a>
            <a
              href="https://pubky.org/overview/"
              target="_blank"
              rel="noreferrer"
            >
              <span className="resource-icon">
                <Icon kind="globe" />
              </span>
              <div>
                <h3>Get to know Pubky</h3>
                <p>The identity and data foundation beneath Paykit.</p>
              </div>
              <span className="resource-tag">Pubky overview</span>
              <Arrow diagonal />
            </a>
          </div>
        </section>

        <section className="lugano" aria-labelledby="lugano-title">
          <div className="lugano-landscape" aria-hidden="true">
            <svg viewBox="0 0 1440 400" preserveAspectRatio="xMidYMax slice">
              <path d="m0 230 118-60 100 42 141-165 152 179 121-95 77 47 75-131 100 142 104-67 116 109 92-85 144 103" />
              <path d="m0 265 118-60 100 42 141-165 152 179 121-95 77 47 75-131 100 142 104-67 116 109 92-85 144 103" />
              <path d="m0 300 118-60 100 42 141-165 152 179 121-95 77 47 75-131 100 142 104-67 116 109 92-85 144 103" />
              <path d="m0 335 118-60 100 42 141-165 152 179 121-95 77 47 75-131 100 142 104-67 116 109 92-85 144 103" />
              <path d="m0 370 118-60 100 42 141-165 152 179 121-95 77 47 75-131 100 142 104-67 116 109 92-85 144 103" />
            </svg>
          </div>
          <div className="lugano-inner section-pad">
            <div className="lugano-copy">
              <p className="eyebrow">
                <Icon kind="pin" size={17} /> LUGANO, SWITZERLAND · 23–24 OCT
                2026
              </p>
              <h2 id="lugano-title">
                Let’s talk Paykit.
                <br />
                <span className="serif-word">In person.</span>
              </h2>
              <p>
                We’re at Plan ₿ Forum in Lugano. Come say hello, bring your
                questions, and join us for a hands-on conversation about better
                payments.
              </p>
              <a href="#contact" className="button button-dark">
                Meet us in Lugano <Arrow />
              </a>
              <a
                className="lugano-forum-link"
                href="https://planb.lugano.ch/planb-forum/"
                target="_blank"
                rel="noreferrer"
              >
                Explore Plan ₿ Forum <Arrow diagonal />
              </a>
            </div>
            <div className="workshop-card">
              <div className="workshop-card-top">
                <span>YOU’RE INVITED</span>
                <span className="workshop-badge">WORKSHOP</span>
              </div>
              <h3>
                Paykit: A new
                <br />
                Payment Protocol
                <br />
                Paradigm
              </h3>
              <div className="workshop-details">
                <div>
                  <span>WHEN</span>
                  <b>Saturday, 24 October</b>
                  <p>16:15–17:00 CEST</p>
                </div>
                <div>
                  <span>WHERE</span>
                  <b>UTXO Room</b>
                  <p>Plan ₿ Forum, Lugano</p>
                </div>
              </div>
              <p className="workshop-speakers">
                With Ben Kaufman &amp; Denys Zaliskyi
              </p>
              <div className="calendar-actions">
                <a href="/api/calendar" download className="calendar-download">
                  Add to calendar <Arrow />
                </a>
                <a
                  href="https://calendar.google.com/calendar/render?action=TEMPLATE&amp;text=Paykit%3A%20A%20new%20Payment%20Protocol%20Paradigm&amp;dates=20261024T141500Z%2F20261024T150000Z&amp;details=With%20Ben%20Kaufman%20and%20Denys%20Zaliskyi.%20Agenda%3A%20https%3A%2F%2Fplanb.lugano.ch%2Fplanb-forum%2Fagenda%2F&amp;location=UTXO%20Room%2C%20Plan%20%E2%82%BF%20Forum%2C%20Lugano%2C%20Switzerland"
                  target="_blank"
                  rel="noreferrer"
                  className="calendar-google"
                >
                  Google Calendar <Arrow diagonal />
                </a>
              </div>
              <p className="calendar-help">
                Calendar download for Apple Calendar, Outlook &amp; more.
              </p>
              <a
                href={links.agenda}
                target="_blank"
                rel="noreferrer"
                className="workshop-link"
              >
                Find it on the agenda <Arrow diagonal />
              </a>
            </div>
          </div>
        </section>

        <section className="faq section-pad" aria-labelledby="faq-title">
          <div>
            <p className="eyebrow">A FEW GOOD QUESTIONS</p>
            <h2 id="faq-title">Clear things up.</h2>
          </div>
          <div className="faq-list">
            <details>
              <summary>
                Is Paykit a wallet?<span>+</span>
              </summary>
              <p>
                Paykit is an open payment protocol. Wallets and services
                integrate it to discover someone’s payment methods and exchange
                the details needed to pay them. You keep using your wallet to
                approve and send payments.
              </p>
            </details>
            <details>
              <summary>
                Does Paykit hold my money?<span>+</span>
              </summary>
              <p>
                No. Paykit coordinates payment information. Funds move through
                the payment method your wallet uses, and your wallet handles
                your keys and payment approval.
              </p>
            </details>
            <details>
              <summary>
                Which payment methods can I use?<span>+</span>
              </summary>
              <p>
                That depends on the wallet or service you use and the methods
                the recipient accepts. Bitkit supports Bitcoin and Lightning.
                Paykit’s endpoint format can describe other payment methods, so
                apps can add support for their own use cases.
              </p>
            </details>
            <details>
              <summary>
                Are all my payment details public?<span>+</span>
              </summary>
              <p>
                You can publish payment methods for others to discover. Paykit
                also supports exchanging private details through encrypted
                channels. What is published or shared depends on the app and how
                you use it.
              </p>
            </details>
            <details>
              <summary>
                Can anyone integrate Paykit?<span>+</span>
              </summary>
              <p>
                Yes. It’s an open protocol with open-source implementations.
                Explore the specifications and code, or get in touch about
                adding Paykit to your wallet, service, or application.
              </p>
            </details>
          </div>
        </section>
        <Contact contactEmail={contactEmail} />
      </main>
      <footer className="site-footer">
        <div className="footer-top">
          <a href="#" className="wordmark" aria-label="Paykit home">
            <Mark />
            <span>
              paykit<span className="wordmark-dot">.</span>
            </span>
          </a>
          <p>
            Good payments start
            <br />
            with a connection.
          </p>
          <div className="footer-links">
            <a href={links.github} target="_blank" rel="noreferrer">
              GitHub <Arrow diagonal />
            </a>
            <a href="https://pubky.org/" target="_blank" rel="noreferrer">
              Pubky <Arrow diagonal />
            </a>
            <a href="https://t.me/pubkycore" target="_blank" rel="noreferrer">
              Community <Arrow diagonal />
            </a>
            <a href="#contact">
              Get in touch <Arrow />
            </a>
          </div>
        </div>
        <div className="footer-bottom">
          <span>An open payment protocol, built on Pubky.</span>
          <form action="/api/logout" method="post">
            <button type="submit" className="lock-preview">
              Lock preview
            </button>
          </form>
          <a href="#">Back to top ↑</a>
        </div>
      </footer>
    </>
  );
}
