# Paykit landing page: research and implementation plan

Research date: 20 October 2026. Code takes precedence over prose and discussion. The landing page presents Paykit as released; the Rust implementation released version 0.1.0 on 16 October 2026.

## Source hierarchy and snapshots

1. Executable protocol, SDK, and server code.
2. Tests and release metadata that establish implemented behavior.
3. Current Pubky documentation and public product/event sources.
4. Recent team discussion for intent and integration context, checked against code before becoming a product claim.

Pinned source snapshots:

- [`pubky/paykit-rs` at `a1f9b6b708ce123b50be02c64e8f61b765e4f298`](https://github.com/pubky/paykit-rs/commit/a1f9b6b708ce123b50be02c64e8f61b765e4f298), checked on 20 October; latest commit dated 19 October. [Release history](https://github.com/pubky/paykit-rs/blob/a1f9b6b708ce123b50be02c64e8f61b765e4f298/CHANGELOG.md) and [0.1.0 release](https://github.com/pubky/paykit-rs/releases/tag/v0.1.0).
- [`pubky/paykit-server` at `aa98a56d87ee0dff0d749029a10c10fd300f39db`](https://github.com/pubky/paykit-server/commit/aa98a56d87ee0dff0d749029a10c10fd300f39db).
- [`pubky/pubky-core` at `131370c0a19c343c5c3aa4b7414f77b01b5066ac`](https://github.com/pubky/pubky-core/commit/131370c0a19c343c5c3aa4b7414f77b01b5066ac), supplementary verification of routing and storage behavior.
- [Pubky documentation supplied for research](https://pubky.org/llms-full.txt).

Repository resource links should use the current default branch, `master`, or pinned commits rather than assuming a `main` branch. A changing default-branch document is useful for visitors; pinned links in this file preserve what was checked.

## What the code establishes

### Protocol and value proposition

Paykit associates payment receiving details with a Pubky public-key identity. A recipient can publish receiving details or share a private payment list with a particular counterparty. A sender's wallet discovers those details and checks which ones it can use. This removes the need to coordinate methods, handles, addresses, and invoices manually between compatible implementations.

Paykit is an open protocol and integration layer. It is not a wallet, a custodial service, or a new settlement network. The Rust crates use the MIT license. Wallets and services can adopt the protocol and implement their own supported payment methods.

Evidence:

- [Endpoint identifiers, payloads, and publication API](https://github.com/pubky/paykit-rs/blob/a1f9b6b708ce123b50be02c64e8f61b765e4f298/paykit-lib/src/payment_endpoint.rs).
- [App registry and canonical storage layout](https://github.com/pubky/paykit-rs/blob/a1f9b6b708ce123b50be02c64e8f61b765e4f298/paykit-lib/src/pubky_routing.rs#L35).
- [Public and private contact payment resolution](https://github.com/pubky/paykit-rs/blob/a1f9b6b708ce123b50be02c64e8f61b765e4f298/paykit-sdk/src/runtime/payment_resolution.rs).
- [Payment adapter boundaries](https://github.com/pubky/paykit-rs/blob/a1f9b6b708ce123b50be02c64e8f61b765e4f298/paykit-sdk/src/domain/adapters/mod.rs#L45).
- [Library manifest and MIT license declaration](https://github.com/pubky/paykit-rs/blob/a1f9b6b708ce123b50be02c64e8f61b765e4f298/paykit-lib/Cargo.toml).

The wallet chooses the final payment route and executes payment. Paykit supplies discovery, structured exchanges, and lifecycle state. Do not claim that Paykit picks the cheapest or best method, signs payments, holds funds, guarantees settlement, or eliminates rail-specific fees.

### Basic flow to explain on the page

1. Choose the contact you want to pay using a compatible wallet.
2. The wallet uses their Pubky identity to discover supported receiving details, or exchange details through an encrypted contact link.
3. Review the payment and pay. The wallet handles method-specific execution.

The illustration can simplify this to **Contact → Payment details → Review and pay**. It must not imply that the protocol can spend without wallet consent.

### Pubky, Mainline DHT, and homeservers

Pubky is the concrete network/storage foundation. Pkarr resolves a signed identity routing record to the identity's homeserver. Mainline DHT provides decentralized discovery; receiving payloads are stored on homeservers, not directly in the DHT.

Paykit public endpoints, app registry entries, encrypted messages, encrypted receipts, and optional encrypted SDK shared state use homeserver storage. Identity public keys address data independently of a conventional platform account. Homeservers can be operated independently, including by users.

Useful page wording: **“Built on Pubky. Your identity is discovered through Mainline DHT; your payment data lives on homeservers, including servers you can run yourself.”** Link to the Pubky explanation without putting storage internals into the introduction.

Evidence:

- [Paykit storage and message paths](https://github.com/pubky/paykit-rs/blob/a1f9b6b708ce123b50be02c64e8f61b765e4f298/paykit-lib/src/pubky_routing.rs).
- [Pubky Pkarr homeserver resolution](https://github.com/pubky/pubky-core/blob/131370c0a19c343c5c3aa4b7414f77b01b5066ac/pubky-sdk/src/actors/pkdns.rs#L143).
- [Pubky public storage requests](https://github.com/pubky/pubky-core/blob/131370c0a19c343c5c3aa4b7414f77b01b5066ac/pubky-sdk/src/actors/storage/core.rs#L181).
- [Pubky client uses public Mainline DHT and Pkarr relays](https://github.com/pubky/pubky-core/blob/131370c0a19c343c5c3aa4b7414f77b01b5066ac/pubky-sdk/src/client/core.rs).

Avoid saying that all data lives on the DHT, that the DHT is a blockchain, or that self-sovereignty means no infrastructure is required. Shared-state recovery has specific Homeserver 0.16.2+ and GCS behavior requirements; integration documentation is the right place for those operational details.

### Public and private data

Public payment details are visible to anyone who knows the recipient's public key. Private payment lists and requests travel over encrypted, per-counterparty links using `pubky-noise`. Receipts are encrypted locally before homeserver storage, and their access information is sent over the encrypted link.

- [Encrypted link handshake](https://github.com/pubky/paykit-rs/blob/a1f9b6b708ce123b50be02c64e8f61b765e4f298/paykit-lib/src/encrypted_link/handshake.rs).
- [Receipt encryption](https://github.com/pubky/paykit-rs/blob/a1f9b6b708ce123b50be02c64e8f61b765e4f298/paykit-lib/src/receipt/crypto.rs).
- [Encrypted shared-state behavior and limitations](https://github.com/pubky/paykit-rs/blob/a1f9b6b708ce123b50be02c64e8f61b765e4f298/paykit-sdk/src/storage/pubky_shared.rs#L104).

Encryption does not hide resource existence, size, or update timing. Do not promise anonymous payments or universally private payment data. “Public or privately shared payment details” is accurate.

### Requests, proofs, receipts, and allowances

The code implements private payment requests with acceptance, rejection, cancellation, conversion-quote, and proof messages, as well as encrypted receipts. Allowances add a scoped consent lifecycle and accounting. Automatic handling remains a wallet decision; the protocol does not autonomously debit funds.

- [Payment request message API](https://github.com/pubky/paykit-rs/blob/a1f9b6b708ce123b50be02c64e8f61b765e4f298/paykit-lib/src/payment_request/api.rs).
- [Allowance implementation](https://github.com/pubky/paykit-rs/tree/a1f9b6b708ce123b50be02c64e8f61b765e4f298/paykit-lib/src/allowance).
- [SDK allowance accounting](https://github.com/pubky/paykit-rs/tree/a1f9b6b708ce123b50be02c64e8f61b765e4f298/paykit-sdk/src/domain/allowance_accounting).

Recurring requests carry interval units from minutes through years, an anchor/start, and an optional end. Proofs for recurring requests reference a billing period. The SDK does not provide a background scheduler: the wallet supplies recurrence eligibility and executes each payment. See [recurrence types](https://github.com/pubky/paykit-rs/blob/a1f9b6b708ce123b50be02c64e8f61b765e4f298/paykit-lib/src/payment_request/types.rs#L53).

Allowance terms support per-payment amount bounds, period amount/count caps, a lifetime amount cap, active dates, expiry, and endpoint restrictions. They require an amount ceiling or an expiry. Either party can end accepted authority through the shared event lifecycle. Automatic handling remains subject to wallet policy and fresh execution checks. See [terms](https://github.com/pubky/paykit-rs/blob/a1f9b6b708ce123b50be02c64e8f61b765e4f298/paykit-lib/src/allowance/types.rs#L341), [lifecycle](https://github.com/pubky/paykit-rs/blob/a1f9b6b708ce123b50be02c64e8f61b765e4f298/paykit-sdk/src/runtime/allowances.rs#L85), and [execution reservation](https://github.com/pubky/paykit-rs/blob/a1f9b6b708ce123b50be02c64e8f61b765e4f298/paykit-sdk/src/runtime/allowance_accounting.rs#L165).

These capabilities belong in deeper resources, not the hero, where they would obscure the simpler contact-payment proposition.

### Payment methods and server implementation

The protocol carries opaque UTF-8 payloads under validated endpoint identifiers. Bitcoin, Lightning, bank accounts, and payment handles can be represented. Mentioned identifiers are interoperability examples, not proof that every current wallet implements them. Sender and recipient implementations must understand compatible identifiers and payloads.

[Endpoint implementation](https://github.com/pubky/paykit-rs/blob/a1f9b6b708ce123b50be02c64e8f61b765e4f298/paykit-lib/src/payment_endpoint.rs#L118) and [recommended identifier convention](https://github.com/pubky/paykit-rs/blob/a1f9b6b708ce123b50be02c64e8f61b765e4f298/specs/payment-endpoint-identifier.md).

Paykit Server implements receiver-side Bitcoin on-chain observation and optional USDT0 on Arbitrum One. It derives invoice-specific BIP84 P2WPKH receiving addresses from an approved account xpub, observes Bitcoin via Electrum, and can verify authenticated ERC-20 proofs when USDT is configured. It does not possess spending keys. Do not infer Lightning support in this server from protocol examples.

- [Bitcoin invoice address derivation](https://github.com/pubky/paykit-server/blob/aa98a56d87ee0dff0d749029a10c10fd300f39db/paykit-server/src/application/create_invoice.rs#L317).
- [Receiving details and USDT constants](https://github.com/pubky/paykit-server/blob/aa98a56d87ee0dff0d749029a10c10fd300f39db/paykit-server/src/domain/receiving.rs).
- [Bitcoin observation boundary](https://github.com/pubky/paykit-server/blob/aa98a56d87ee0dff0d749029a10c10fd300f39db/paykit-server/src/bitcoin.rs).
- [Marketplace payment request preparation](https://github.com/pubky/paykit-server/blob/aa98a56d87ee0dff0d749029a10c10fd300f39db/paykit-server/src/application/marketplace_preparation.rs).

The server prepares/activates Marketplace requests, observes payments, and exposes lifecycle/status endpoints. Source capability does not establish the exact configuration of a live deployment. Keep live-demo copy rail-neutral unless the deployed capability has also been verified.

## Public links and practical destinations

- [Bitkit](https://bitkit.to/): present as a supporting wallet, use the official logo, and invite visitors to try contact payments. Do not imply all published Bitkit builds have identical protocol or asset support.
- [Payky](https://payky.app/): include as a practical destination without inventing product capabilities.
- [Pubky Marketplace](https://staging.pubky.app/shop): use this exact product name. Individual shops are third-party stores within the Marketplace. The supplied staging destination returned an access restriction during research; describe it as staging and do not imply the landing password grants access. Replace the link when the public destination is available.
- [Teaser](https://youtu.be/yUkBWQ1J7bQ): click to load an embedded player using `youtube-nocookie.com`; no video iframe before interaction.
- [Pubky](https://pubky.org/), [Paykit repository](https://github.com/pubky/paykit-rs), [SDK](https://github.com/pubky/paykit-rs/tree/master/paykit-sdk), [Swift/Kotlin bindings](https://github.com/pubky/paykit-rs/tree/master/paykit-ffi), and [Paykit Server](https://github.com/pubky/paykit-server): deeper resources.

Use a restrained “More wallets coming soon” placeholder as requested, without fabricated wallet names, logos, or integration commitments. Offer an integration contact action beside it.

## Lugano workshop

Public agenda evidence: [Plan ₿ Forum agenda](https://planb.lugano.ch/planb-forum/agenda/) and the event's [public Brella timeslots API](https://api.brella.io/api/public/events/PlanBLugano2026/timeslots?date=all).

Verified session ID `1039948`:

- **Paykit: A new Payment Protocol Paradigm**
- 24 October 2026, **16:15–17:00 CEST**
- **UTXO Room**
- **Ben Kaufman and Denys Zaliskyi**

Invite visitors to the workshop and to meet the team in Lugano. Link to the agenda as the authoritative schedule; check it again before publication if the deployment date changes. Once the event has passed, replace the invitation with an appropriate recording or resources link rather than retaining a future-tense invitation.

## Contact and interest capture

Use `info@synonym.to` for questions and integration interest, with a compact composer for wallet/service interest, contact details, and a message. The composer creates a mail draft; the visitor chooses whether to send it. No backend lead database, automatic email sending, analytics, or silent data collection is required for this implementation.

Be explicit that the visitor is opening their email app. A sent message supplies actionable integration interest; opening the composer alone does not record a lead. Link [Synonym's terms](https://synonym.to/terms-of-service), the verified public destination, without inventing an independent Paykit privacy policy.

## Visual and information plan

Direction: warm white canvas, dark ink text, orange accents, generous space, strong typography, and a minimal editorial layout. Use a small number of precise ideas per section. Avoid decorative dashboards, ticker strips, dense protocol diagrams, unsupported statistics, and stacks of competing badges.

1. **Header:** Paykit wordmark, short section links, and an integration/contact action. Compact navigation on mobile.
2. **Hero:** “Pay. Get paid. Skip the back-and-forth.” Lead with the convenience people want, then explain that an open protocol lets wallets handle payment details. One primary try action and one secondary video action.
3. **Single explanatory illustration:** contact → automatic exchange of compatible payment details → review and pay. Keep the relationship legible without animation; motion is optional enhancement and respects reduced-motion preferences.
4. **How it works:** three short steps reinforcing the illustration. Keep addresses, identifiers, Noise handshakes, and allowance terminology out of this overview.
   **Features:** a compact four-feature section covers recurring payments, allowances with limits, private receiving details, and requests/receipts. Recurrence is a request format; wallets own scheduling. Allowances are accepted shared terms, not access to funds. Both facts are enforced by the wallet/adapter boundary and SDK allowance accounting paths linked above. Keep advanced limits out of the main copy.
5. **Pubky foundation:** compact explanation of identity, DHT routing, and self-hostable data storage, with a direct Pubky link.
6. **Try Paykit:** Bitkit logo/card, Payky destination, Pubky Marketplace staging link, and a small future-wallet/integration invitation. Clear actions and honest staging context.
7. **Teaser:** intentional click-to-load video with accessible title and fallback external link.
8. **Resources:** source, SDK/bindings, server, and Pubky links with short descriptions.
9. **Lugano:** concise invitation, verified workshop details, agenda action, direct Google Calendar link, and an `.ics` download with a thirty-minute reminder. Use UTC timestamps so calendar apps display local time correctly.
10. **Contact:** integration-interest composer and direct email fallback.
11. **FAQ/footer:** “Is Paykit a wallet?”, “Who can integrate it?”, and “Where does my data live?” plus source and legal links. Keep answers short.

The FAQ is the main useful addition to the original brief: it reinforces that Paykit is an adoptable protocol and clarifies data control without lengthening the introduction.

## Preview hosting and verification plan

Build with Next.js 16 App Router and deploy on Vercel. Keep `LANDING_PASSWORD` and a random `SESSION_SECRET` of at least 32 characters in server-only environment variables. Never place the preview password in repository content or public JavaScript.

Authenticate on the server before rendering protected content. Use a signed seven-day HTTP-only cookie, `SameSite=Lax`, secure in production; bind sessions to the configured password so rotation revokes them. Fail closed if either variable is absent. Do not store the raw password in a cookie.

Apply `noindex` metadata, robots exclusion, and response headers during the gated preview. These are indexing controls, not the access-control mechanism. At public launch remove the gate deliberately and revise the indexing/preview metadata together.

The Vercel project has a published persistent WAF rule limiting `/api/access` to ten requests per sixty seconds per IP. This lives in Vercel platform configuration and must be recreated if the site moves to a new project.

Validation includes session integrity/expiry/configuration tests, TypeScript checking, a production build, and browser checks for password access, desktop/mobile layout, contact-draft behavior, and click-to-load video. Review the implemented authentication and data handling before deployment. Check deployed headers, unauthenticated redirects, failed/successful login, and protected responses on the final Vercel URL.

Deployment URL: **TBD** until deployment is complete and verified.
