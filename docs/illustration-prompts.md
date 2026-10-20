# Landing page illustrations

## Pubky foundation

- Project asset: `public/illustrations/pubky-network-v1.png`
- Dimensions: 1536 × 1024 pixels (3:2), RGB PNG.
- Tool: built-in `image_gen.imagegen`, default built-in mode. No API or CLI fallback.
- Original: `/home/gaib/.codex/generated_images/01a15889-4dcc-7812-b0f4-610e6d6824d9/exec-1191f23a-4bf8-4b23-9596-1cc3cc5d3d7f.png`.
- Inspected with `view_image`; selected without image edits. The image contains a glass identity tile with a person/key symbol, three equally sized server objects, and orange connecting paths. It has no text, logos, coins, tokens, clouds, globe, or watermark.
- This is a conceptual illustration of identity and independently operated infrastructure, not a topology specification or a product screenshot.

Exact generation prompt:

```text
Use case: stylized-concept.
Asset type: polished supporting illustration for the Pubky foundation section of a premium modern technology website.
Primary request: create one exceptionally refined 3D/isometric conceptual illustration communicating self-sovereign decentralized identity and user-chosen homeservers. Wide landscape composition, 3:2 aspect ratio.
Scene/backdrop: seamless nearly black graphite background, precise color #090b10, with a very subtle matte floor. Keep generous breathing room around the objects.
Subject: a central upright smoked-glass identity tile, thick clear beveled edges, with a simple cool-white inset person silhouette and a small understated key detail. Connect the identity tile via three thin precise orange light paths to three distinct dark server blocks spaced around it. Each of the three server blocks has an equal visual role, similar size and level of detail, implying distributed peers rather than one dominant server. The server blocks are sculptural dark graphite and brushed metal with tiny cool-white edge details, and at most a restrained orange slit light. The connections run neatly across the floor plane with crisp right-angle bends. The central identity tile represents a person's identity, not a server or hub.
Style/medium: high-end 3D product render, sophisticated editorial art direction, impeccable clean geometry, beautiful but restrained material realism. A purposeful illustration rather than a diagram or a generic crypto artwork.
Composition/framing: all objects completely in frame, balanced asymmetrical isometric arrangement, central identity tile visually clear and prominent; three servers distinct around it with well-separated routes. Medium-wide three-quarter elevated camera, no extreme lens distortion.
Lighting/mood: premium studio edge lighting, soft cool-white glass reflections and brushed-metal highlights, small warm orange accents #ff6b3d, restrained soft shadows, quiet confident precision.
Color palette: graphite #090b10, charcoal, cool-white translucent glass and metal, restrained orange #ff6b3d. Dark scene with enough contrast to read clearly at half size.
Constraints: no text, no letters, no numbers, no logos, no watermark. No cloud symbol, no centralized cloud infrastructure, no coins, no crypto tokens, no globe, no people, no busy decorative particles, no glowing cyberpunk city, no visual clutter. Do not produce CSS-like flat boxes: deliver a beautiful, tangible, expertly rendered image with meaningful depth and material detail.
```

## Contact payment flow

- Project asset: `public/illustrations/contact-payment-v1.png`
- Dimensions: 1774 × 887 pixels (2:1), RGB PNG.
- Tool: built-in `image_gen.imagegen`, default built-in mode. No API or CLI fallback.
- Original: `/home/gaib/.codex/generated_images/01a15889-4dcc-7812-b0f4-610e6d6824d9/exec-fb662bc2-1a54-4cc8-9352-03dcfbe1d6fb.png`.
- Inspected with `view_image`; selected without image edits. The image contains a dark brushed-metal wallet tile, a glass person/contact tile, two small glass detail slips, and an orange connecting path. It has no text, logos, money, coins, tokens, cloud, or watermark.
- This is a conceptual illustration of payment details exchanged with a contact, not a product screenshot or an assertion that a payment has completed. The small glyphs are abstract detail records, not an indication that a particular payment method is supported.

Exact generation prompt:

```text
Use case: stylized-concept.
Asset type: premium modern technology website illustration explaining a contact payment protocol, a conceptual illustration rather than a product screenshot.
Primary request: a beautiful restrained 3D product render of a wallet connecting directly to a person, with payment details exchanged automatically between them. Wide 2:1 landscape composition.
Scene/backdrop: nearly black graphite studio background precise #090b10, seamless dark matte floor, generous negative space around all objects.
Subject and composition: on the left, a tasteful black wallet/phone-like rectangular slab with a subtle cool-white minimal line wallet symbol inset on its front, no interface text. On the right, an upright smoked-glass rounded identity/contact tile with a clear simple cool-white person silhouette, visibly representing a person rather than numbers. A thin precise illuminated orange path connects the two objects across the floor plane, with clean intentional bends. Along this path are two or three very small thin glass slips, low to the floor, bearing only tiny minimal line glyphs representing exchanged payment details. The small slips should be integrated into the composition and clearly secondary to the wallet and person, without clutter. No payment-success checkmark or suggestion a transfer already completed.
Style/medium: exceptionally polished high-end 3D product render, refined editorial art direction, realistic depth and impeccable clean geometry. Tangible black brushed metal, smoked translucent glass with thick clear beveled edges, cool-white reflections. Elegant studio render, not a flat diagram or CSS-like box illustration.
Lighting/mood: soft cool-white studio edge lighting, glass highlights, subtle metal reflections, precise warm orange #ff6b3d emissive path and tiny accent detail, soft restrained shadows. Quiet, confident, sophisticated tech.
Composition/framing: balanced two-object arrangement with a readable visual connection between them, three-quarter elevated isometric camera, objects completely in frame, generous breathing room. Match a premium dark graphite, cool glass and brushed metal, orange light-path visual system. Readable at half size.
Constraints: absolutely no text, letters, numbers, logos, brand symbols, watermark. No coins, no actual money, no crypto tokens, no central giant logo or token hub, no globe, no cloud, no people, no decorative particles, no busy circuitry, no neon city, no clutter. The person tile must have a clear human silhouette, not a payment address. All elements contained within the canvas.
```

## Person-to-person compatibility example

- Project asset: `public/illustrations/contact-payment-v2.png`
- Dimensions: 1774 × 887 pixels (2:1), RGB PNG.
- Tool: built-in `image_gen.imagegen`, edit mode with `public/illustrations/contact-payment-v1.png` as reference. No API or CLI fallback.
- Original: `/home/gaib/.codex/generated_images/01a15889-4dcc-7812-b0f4-610e6d6824d9/exec-f433c473-f63e-4f4a-9cc7-67c20ccd3d16.png`.
- Inspected with `view_image`; selected without further image edits. Both main objects are person/contact plaques. Left labels read PayPal, Bitkit / Bitcoin, Wise; right labels read Ethereum, WDK / Bitcoin, Revolut. The only orange connecting route joins the Bitkit and WDK Bitcoin rows, via a small Bitcoin marker. Other methods are neutral and unconnected. Exact capitalization is correct; no success status is present.
- This is a conceptual compatibility example, not a claim of available PayPal, Wise, Ethereum, Revolut, or WDK integrations. The website supplies explanatory context and accessible text.

Exact edit prompt:

```text
Use case: precise-object-edit.
Asset type: conceptual compatibility illustration for the Paykit landing page, not a product screenshot or claim of integrations.
Edit the provided contact-payment illustration to show a PERSON paying another PERSON, with their different available payment methods clearly associated with them, and Bitcoin as their only shared method.
Preserve the original's exceptionally polished premium 3D studio product-render style, graphite background #090b10, smoked glass, brushed black metal, cool-white material highlights, restrained orange #ff6b3d glow, realistic floor, beautiful depth and soft studio shadows. Keep a wide approximately 2:1 balanced landscape frame with all objects contained and generous breathing room.
Replace the left large wallet object with an upright smoked-glass PERSON identity plaque with a large clear simple cool-white human silhouette. Keep another matching PERSON identity plaque on the right. Both main objects must be people/contact identities, not wallet symbols.
Beneath each person's silhouette, integrate three very legible horizontal glass/metal method rows as part of that person's group. Use a mostly front-facing composition so labels are large and readable at a website display width of 1152 pixels. Left person's exact rows top to bottom: "PayPal"; "Bitkit" with a small secondary "Bitcoin" label; "Wise". Right person's exact rows top to bottom: "Ethereum"; "WDK" with a small secondary "Bitcoin" label; "Revolut". The left middle Bitkit/Bitcoin row and right middle WDK/Bitcoin row have orange illuminated edges. All other rows remain neutral graphite with cool-white text.
Between the two middle Bitcoin rows, show one beautiful thin orange light beam linking ONLY the Bitkit/Bitcoin row on the left to the WDK/Bitcoin row on the right. Centered on this single link is a tasteful small glass marker with an orange Bitcoin glyph "₿" and small exact label "Bitcoin". This represents the compatible method. Remove the original's two floating generic detail slips; they are replaced by the single small Bitcoin marker. No connectors, arrows, or beams touch PayPal, Wise, Ethereum, or Revolut. Bitcoin is the ONLY shared payment method. No payment-success checkmarks, paid statuses, actual coins, money, or suggestion any funds have moved.
Typography exact text ONLY: PayPal, Bitkit, Bitcoin, Wise, Ethereum, WDK, Revolut, Bitcoin. Preserve exact lettercase; clean plain modern sans text, no invented logos or imitated brand marks. Do not render the words Paykit, protocol, user, sender, recipient, person, or any title/caption/frame wording; website HTML will supply context. No watermark. No actual people, coins, tokens, globe, cloud, giant central logo, busy circuitry, particles, or clutter.
The visual must clearly read as two people with different available methods, with only their shared Bitcoin route highlighted. Preserve sophisticated tangible 3D materials and visual beauty, not a flat UI screenshot.
```

## Payer and recipient: wallet and currency matching

- Project asset: `public/illustrations/contact-payment-v3.png`
- Dimensions: 1774 × 887 pixels (2:1), RGB PNG.
- Tool: built-in `image_gen.imagegen`, edit mode with `public/illustrations/contact-payment-v2.png` as reference. No API or CLI fallback.
- Original: `/home/gaib/.codex/generated_images/01a15889-4dcc-7812-b0f4-610e6d6824d9/exec-35a14af3-d3c6-4487-9714-6168188d4eca.png`.
- Inspected with `view_image`; selected without further image edits. Both identity plaques are labeled correctly: Payer and Recipient. Payer rows read PayPal / USD; Bitkit / BTC / Tether; Wise / USD / Pounds. Recipient rows read Cake Wallet / Ether / XMR; WDK / BTC / Ether; Revolut / EUR / CHF. A central Paykit box connects faintly to all six rows. The only strong orange route is Bitkit → Paykit → WDK, labeled BTC, with a right-facing arrow. BTC alone is highlighted within the wallet rows; all other currency labels are neutral. Exact capitalization is correct; no paid or success status is present.
- The profiles are hypothetical examples of compatible methods and currencies, not claims of supported wallet integrations or assets. Paykit's box represents coordination, not custody; the website supplies explanatory context and accessible text.

Exact edit prompt:

```text
Use case: precise-object-edit.
Asset type: conceptual payment-method compatibility illustration for a premium Paykit website.
Edit the provided v2 illustration. Preserve its excellent premium 3D product-render style, two upright smoked-glass PERSON plaques, cool-white glass/metal edges, graphite #090b10 floor and background, precise orange #ff6b3d accent lighting, polished materials, restrained soft shadows, wide approximately 2:1 landscape composition. Both main objects remain PERSON/contact plaques with simple large human silhouettes. Keep every object entirely in frame and generous breathing room.
Make these precise changes:
1. Label the left PERSON plaque "Payer" in large clean white modern sans type near the silhouette. Label the right PERSON plaque "Recipient". Keep these exact labels legible.
2. Left plaque has exactly three method rows. Top row primary label "PayPal", secondary currency label "USD". Middle row primary "Bitkit", secondary currencies "BTC" and "Tether". Bottom row primary "Wise", secondary currencies "USD" and "Pounds". All text exact and clean.
3. Right plaque has exactly three method rows. Top row primary label "Cake Wallet", secondary currencies "Ether" and "XMR". Middle row primary "WDK", secondary currencies "BTC" and "Ether". Bottom row primary "Revolut", secondary currencies "EUR" and "CHF". All text exact and clean.
4. Replace the center Bitcoin marker with a modern intelligent-looking but restrained smoked-glass / graphite Paykit matching box, clearly labeled "Paykit" in large clean modern white sans type. Use subtle etched abstract routing lines or a tiny elegant connected-node detail inside it, without a face, AI robot, brain, chip, or giant decorative symbol. It is conceptual protocol coordination, not a money-custody device.
5. Show thin faint cool-gray connections from ALL SIX wallet rows to the central Paykit box, organized neatly without visual clutter. These faint links communicate discovering available methods. Keep those neutral lines very subdued.
6. Show ONE strong orange path joining the left Bitkit row to the central Paykit box, then out to the right WDK row. Specifically highlight the "BTC" currency on both Bitkit and WDK rows in orange. Label this strong orange route "BTC", and place one clear orange arrowhead pointing right toward Recipient. Other currencies on these same rows remain neutral white or gray. No strong orange path touches PayPal, Wise, Cake Wallet, Revolut, Tether, Ether, XMR, USD, Pounds, EUR, or CHF. BTC is the ONLY currency shared between Payer and Recipient. Ether appears only on Recipient's side. No exchange or conversion routes.
Typography: exact labels "Payer", "Recipient", "PayPal", "USD", "Bitkit", "BTC", "Tether", "Wise", "USD", "Pounds", "Cake Wallet", "Ether", "XMR", "WDK", "BTC", "Ether", "Revolut", "EUR", "CHF", "Paykit", "BTC". Large readable plain text, no invented brand logos; preserve exact capitalization. Methods clearly primary, currency labels clearly secondary, without tiny illegible type. Clean nearly frontal plaque faces retain 3D depth and slight perspective.
Do not add a frame, title, subtitle, legend, explanatory prose, supported badge, paid status, success checkmark, any amounts, actual money, coins, crypto token objects, watermark, globe, cloud, or real people. This is a hypothetical compatibility example, not a product screenshot or integration claim. Preserve the original's beautiful quiet premium material quality and balanced presentation.
```

## Alice and Bob: vertically stacked currencies and payment intent

- Project asset: `public/illustrations/contact-payment-v4.png`
- Dimensions: 1774 × 887 pixels (2:1), RGB PNG.
- Tool: built-in `image_gen.imagegen`, edit mode with `public/illustrations/contact-payment-v3.png` as reference. No API or CLI fallback.
- Original: `/home/gaib/.codex/generated_images/01a15889-4dcc-7812-b0f4-610e6d6824d9/exec-e62501e5-69a6-4b27-bdf2-9aeaeefbc767.png`.
- Inspected with `view_image`; selected without further image edits. Both identity plaques are labeled correctly: Alice and Bob. Each wallet name occupies the left column and each currency list the right column. Every two-currency pair is vertically stacked: BTC above Tether, USD above GBP, Ether above XMR, BTC above Ether, EUR above CHF. PayPal has USD alone. Above the plaques, a right-facing intent arrow accompanies the exact caption “Alice wants to send $10 equivalent to Bob”. The central Paykit box, six discovery connections, and sole orange BTC route with right-facing arrow remain intact. All text and currency codes verified visually.
- The profiles are hypothetical examples of compatible methods and currencies, not claims of supported wallet integrations or assets. The upper arrow expresses the payer's intent; the illustration does not assert a completed payment. Paykit's box represents coordination, not custody.

Exact edit prompt:

```text
Use case: precise-object-edit.
Asset type: premium conceptual Paykit compatibility illustration.
Edit the attached v3 illustration with only the specific refinements below. Preserve its beautiful high-end 3D studio render, exact dark graphite #090b10 / smoked glass / brushed metal / cool-white highlights / orange #ff6b3d material system, composition, PERSON plaques, center Paykit box, all six faint discovery connections, and sole strong orange Bitkit → Paykit → WDK BTC route with right-facing arrow. Preserve sharp clean type and realistic quiet floor/shadows. Approximately 2:1 landscape, preferably same 1774x887 proportions; a little more height allowed to comfortably fit the changes.
1. Rename the left person's large label "Payer" to "Alice", and the right person's label "Recipient" to "Bob".
2. In the Wise row, change "Pounds" to exact code "GBP".
3. MOST IMPORTANT TYPOGRAPHY REFINEMENT: every wallet row must have the wallet name in a left column and its currencies in a separate right column. If a wallet has two currencies, they must be vertically stacked, one directly ABOVE the other, never side by side. They must share one consistent right-column horizontal alignment. Increase row heights slightly if needed and align the wallet names vertically centered against the currency stack. Use comfortably legible large type.
Left Alice plaque rows:
- PayPal at left; USD in right currency column.
- Bitkit at left; BTC on top and Tether directly BELOW BTC in right currency column. Highlight only BTC in orange, Tether neutral white/gray.
- Wise at left; USD on top and GBP directly BELOW USD in right currency column.
Right Bob plaque rows:
- Cake Wallet at left; Ether on top and XMR directly BELOW Ether in right currency column.
- WDK at left; BTC on top and Ether directly BELOW BTC in right currency column. Highlight only BTC in orange, Ether neutral white/gray.
- Revolut at left; EUR on top and CHF directly BELOW EUR in right currency column.
No pair of currencies is horizontally adjacent. No slashes or commas between currency lines. Do not place any currency below the wallet name; currencies all belong to the distinct right-hand column of their row.
4. Add a clean thin cool-white right-facing intent arrow ABOVE the two person plaques, running from the Alice side toward the Bob side. Set the exact caption "Alice wants to send $10 equivalent to Bob" above that arrow in clean modern white sans type, large and very legible (approximately 32px or larger on a 1774px-wide image). Keep generous breathing room, all arrow/caption content within the canvas, and do not overlap the existing PERSON plaques. This upper arrow represents intent only; keep it visually subdued compared with the middle strong orange BTC route. No paid/success labels.
Preserve the central Paykit label, subtle routing-node detail, subdued neutral connections, and strong orange BTC route labels. No extra explanatory text, no logos, no coins, no money objects, no success checkmarks, no watermark. Keep exact spelling and capitalization: Alice, Bob, PayPal, USD, Bitkit, BTC, Tether, Wise, GBP, Cake Wallet, Ether, XMR, WDK, Revolut, EUR, CHF, Paykit. The caption must be EXACTLY "Alice wants to send $10 equivalent to Bob". The result must remain a premium attractive conceptual illustration, not a flat table.
```

## Reordered recipient methods and independent discovery links

- Project asset: `public/illustrations/contact-payment-v5.png`
- Dimensions: 1774 × 887 pixels (2:1), RGB PNG.
- Tool: built-in `image_gen.imagegen`, edit mode, first referencing v4 then applying a targeted cleanup to the generated draft. No API or CLI fallback.
- Draft: `/home/gaib/.codex/generated_images/01a15889-4dcc-7812-b0f4-610e6d6824d9/exec-6f67c2cb-ca7c-4d9c-bb8f-a00eca7cf386.png`.
- Final original: `/home/gaib/.codex/generated_images/01a15889-4dcc-7812-b0f4-610e6d6824d9/exec-b5f31ecd-1edf-4204-a260-d5a9ba63f4bd.png`.
- Both results inspected with `view_image`; the cleanup removed the draft's remaining internal node marks and separated Revolut's gray port from WDK's orange port. The final Paykit box has a plain interior containing only the word Paykit. All four gray discovery paths terminate independently at distinct outer-edge ports. Bob's rows are Cake Wallet, Revolut, WDK; the orange path now descends to the bottom WDK row. Alice/Bob names, intent caption, GBP, and all vertical currency stacks remain correct. Selected final copied without image processing.
- This remains a hypothetical compatibility illustration, not an integration or asset-support claim. The intent arrow and BTC route do not assert payment completion or Paykit custody.

Initial exact edit prompt:

```text
Use case: precise-object-edit.
Asset type: premium conceptual Paykit compatibility illustration.
Edit the attached v4 illustration. Preserve its exact premium dark graphite #090b10, smoked glass, brushed metal, cool-white edges, restrained orange #ff6b3d, beautiful 3D studio-render material style and layout. Preserve all exact text and vertically stacked currency formatting described below. Preserve Alice and Bob silhouettes and labels, and the exact top caption "Alice wants to send $10 equivalent to Bob" with its upper right-facing intent arrow. Wide 2:1 image with all objects in frame.

MAKE TWO CHANGES:
A. REORDER BOB'S WALLET ROWS, moving WDK to BOTTOM and Revolut to MIDDLE.
Bob exact top row: "Cake Wallet" at left, "Ether" vertically ABOVE "XMR" at right, neutral.
Bob exact middle row: "Revolut" at left, "EUR" vertically ABOVE "CHF" at right, neutral.
Bob exact bottom row: "WDK" at left, "BTC" vertically ABOVE "Ether" at right; highlight this bottom WDK row's edges and its BTC label in orange.
Alice remains unchanged: top "PayPal" / "USD"; middle "Bitkit" / "BTC" vertically ABOVE "Tether"; bottom "Wise" / "USD" vertically ABOVE "GBP". Only Alice's Bitkit row is orange-highlighted, only BTC text orange, Tether neutral.

B. MAKE DISCOVERY CONNECTIONS CLEARLY INDEPENDENT AND UNPAIRED:
The four faint gray discovery paths must each end independently at a different staggered edge port around the central Paykit box. They must not resemble continuous aligned left-to-right routes through the box. Avoid mirror symmetry in those port positions.
- Alice PayPal faint path curves gently upward and terminates at a port on the TOP-LEFT section of the Paykit box's TOP edge.
- Alice Wise faint path curves downward and terminates at a distinct port near the LEFT side of the Paykit box's BOTTOM edge.
- Bob Cake Wallet faint path curves down to terminate independently at an UPPER RIGHT edge port of the Paykit box.
- Bob Revolut faint path curves to a separate LOWER RIGHT edge port of the Paykit box.
Ensure all four subdued neutral paths are separate, have visible endpoints, and do not cross the highlighted orange path. Each path belongs to one wallet only. No gray connector continues inside Paykit to an opposite-side wallet and no paired routing lines inside Paykit. Keep only a restrained abstract tiny node detail within Paykit, rather than internal through-wires. Preserve large exact central label "Paykit".

The ONE strong orange BTC route runs from Alice's MIDDLE Bitkit row into Paykit, then bends smoothly down from Paykit to Bob's BOTTOM WDK row. Label this orange route "BTC" and place one clear right-facing arrowhead immediately before it reaches the bottom WDK row. Highlight only Bitkit→Paykit→WDK. The orange route must visibly end at WDK on bottom, never Revolut or Cake Wallet. The orange incoming and outgoing ports on Paykit may occupy different heights to accommodate elegant routing. Maintain beautiful restrained curves and generous breathing room; composition can adjust the central box position slightly if needed to avoid crossings. Show no other strong route.

TYPOGRAPHY: exact caption "Alice wants to send $10 equivalent to Bob". Exact names Alice, Bob, PayPal, USD, Bitkit, BTC, Tether, Wise, GBP, Cake Wallet, Ether, XMR, Revolut, EUR, CHF, WDK, Paykit. Wallet names are in left columns, currencies in right columns. All two-currency pairs must stay VERTICALLY STACKED, one above the other, never side by side. Keep clean legible modern sans typography and premium tangible glass/metal geometry.
No extra words, no paid/success status or checkmarks, no real money, no coins, no watermark, no invented brand logos. The route expresses compatible payment coordination, not a completed payment.
```

Exact refinement prompt:

```text
Use case: precise-object-edit.
Make an extremely narrow precise edit to the attached illustration. Preserve EVERYTHING else exactly: composition, all words and currency spellings, Alice and Bob, upper caption and arrow, wallet row order, vertically stacked currencies, beautiful premium graphite glass material style, borders and floor, and highlighted Bitkit→Paykit→WDK orange BTC route and arrow.
CHANGE ONLY THE CENTRAL PAYKIT BOX INTERIOR AND ONE GRAY EDGE PORT:
1. Remove ALL internal lines, internal nodes, dots, circuit etching, branching marks, glyphs, and decorative routing graphics from inside the central Paykit box. Its front face must be clean plain dark smoked glass with ONLY the single white word "Paykit". No internal line segments or node circles remain anywhere above, below, or beside this word. Keep the beautiful beveled glass border, subtle reflections, and external edge ports.
2. The faint gray connection from Bob's MIDDLE Revolut row must terminate on its OWN gray outer-edge port on the RIGHT edge of Paykit at a height between the Cake Wallet gray port and the orange WDK outgoing port. It must not connect to, touch, share, or merge with the orange outgoing WDK route/port. Separate them clearly by at least 30 pixels vertically. If needed, place the Revolut gray port on the upper-right edge and Cake Wallet gray port at the right part of the TOP edge, using clean independent curved paths. All four gray paths must terminate on the box's OUTER edges only, not continue inside. Keep Alice's PayPal path entering the upper-left/top edge and Alice's Wise path entering the lower-left/bottom edge.
No other edits. All existing labels, person plaques, colors, shadows, and wallet/currency text must remain exactly as shown. The final center face is plain with ONLY the word Paykit, while every external faint connection ends at a distinct port.
```

## Trial: shared discovery layer with direct wallet-to-wallet payment

- Project asset: `public/illustrations/contact-payment-v6.png`
- Dimensions: 1774 × 887 pixels (2:1), RGB PNG.
- Tool: built-in `image_gen.imagegen`, edit mode, first referencing v5 then applying a targeted discovery-outline refinement. No API or CLI fallback.
- Draft: `/home/gaib/.codex/generated_images/01a15889-4dcc-7812-b0f4-610e6d6824d9/exec-5144d1e8-2e35-4674-a493-352da822001b.png`.
- Final original: `/home/gaib/.codex/generated_images/01a15889-4dcc-7812-b0f4-610e6d6824d9/exec-3aa67eac-cee3-4e65-ad29-d5982da2ea65.png`.
- Both results inspected with `view_image`. The final outline surrounds wallet options only; person portraits and names sit above it. Exact lower caption: “Wallets use Paykit to find a shared payment rail.” The former central Paykit box and all faint wallet links are removed. One uninterrupted orange curve runs directly from Alice's top Bitkit row to Bob's bottom WDK row, labeled BTC, with no intermediary. Alice's row order is Bitkit, PayPal, Wise; Bob's is Cake Wallet, Revolut, WDK. All exact names, intent caption, GBP, and vertically stacked currencies were visually verified. Final copied without image processing.
- Version 5 is unchanged and available for rollback. This version presents Paykit as a discovery protocol used by wallets rather than an intermediary. The hypothetical profiles are not integration or asset-support claims and the intent/route does not assert payment completion.

Initial exact edit prompt:

```text
Use case: precise-object-edit.
Asset type: premium Paykit protocol-discovery conceptual illustration for a technology landing page.
Edit the attached v5 image, preserving the excellent polished 3D graphite/glass/orange visual style, dark #090b10 studio floor/background, cool-white smoked-glass edges, orange #ff6b3d light, beautiful soft reflections and shadows. Preserve the two PERSON plaques and exact names Alice and Bob, the exact upper caption "Alice wants to send $10 equivalent to Bob" and its thin upper right-facing intent arrow. Preserve large legible modern sans labels and vertical currency stacks. Approximately 1774x887 wide 2:1 composition; all content within canvas.

CRITICAL SEMANTIC CHANGE: Paykit is a discovery protocol used by wallets, NOT an intermediary or payment relay. REMOVE the central Paykit box ENTIRELY. Remove ALL four faint gray wallet-connection lines and their edge ports. The space between people must contain NO central object, hub, box, node, port, icon, server, Paykit logo, or split route.

Reorder Alice's wallet rows so Bitkit comes FIRST:
Alice TOP row: "Bitkit" left; "BTC" vertically ABOVE "Tether" in right column. Orange row edge and orange BTC label; Tether neutral.
Alice MIDDLE row: "PayPal" left; single "USD" right. Neutral graphite row.
Alice BOTTOM row: "Wise" left; "USD" vertically ABOVE "GBP" in right column. Neutral graphite row.
Bob's row order stays:
TOP "Cake Wallet" left; "Ether" vertically ABOVE "XMR" right, neutral.
MIDDLE "Revolut" left; "EUR" vertically ABOVE "CHF" right, neutral.
BOTTOM "WDK" left; "BTC" vertically ABOVE "Ether" right. Orange row edge and orange BTC label; Ether neutral.

Replace the central box/faint lines with a quiet conceptual DISCOVERY LAYER: a single subtle thin smoked-glass frame or faint cool-gray outline that spatially encloses the available wallet OPTIONS on both left and right (not the people/upper intent caption). Its purpose is to indicate that the wallets use the same protocol to discover a compatible rail. Place the exact caption "Wallets use Paykit to find a shared payment rail." as a clear legible label along the frame's lower border BELOW the wallet options. The outline should be restrained and secondary; it is not a service, container, money path, or central relay. No opaque panel background obscures the scene. Do not introduce any additional explanatory wording or title.

Show ONE uninterrupted strong orange BTC payment arrow DIRECTLY from Alice's TOP Bitkit row to Bob's BOTTOM WDK row, curving smoothly down through otherwise EMPTY middle space. The route must be a continuous single elegant curve without any intermediate box, waypoint, node, center marker, or break. Give it one clear arrowhead pointing into Bob's bottom WDK row. Label the route "BTC" near the curve. It must NOT go through or touch the Paykit discovery caption or any box/hub. No connections from PayPal, Wise, Cake Wallet, or Revolut; no gray/dashed wallet links, no secondary route. The frame stays quiet behind and separate from the orange direct payment arrow.

Maintain exact spelling and capitalization everywhere: Alice, Bob, Bitkit, BTC, Tether, PayPal, USD, Wise, GBP, Cake Wallet, Ether, XMR, Revolut, EUR, CHF, WDK. All two-currency lists VERTICALLY STACKED one above another in their right columns, NEVER side by side. Exact captions: "Alice wants to send $10 equivalent to Bob" and "Wallets use Paykit to find a shared payment rail.".
No paid/success statuses, no checkmarks, no actual money or coins, no invented brand logos, no watermark. Preserve the quiet tangible beautiful 3D material style.
```

Exact discovery-outline refinement prompt:

```text
Use case: precise-object-edit.
Make ONE narrow refinement to the attached image and preserve all other pixels/content/style as closely as possible.
The cool-gray protocol-discovery outline currently wraps the entire Alice and Bob plaques, including their head silhouettes and names. Change ONLY this secondary outline so it encloses the SIX WALLET OPTION ROWS only, with Alice and Bob's names and portrait silhouettes ABOVE and OUTSIDE the outlined discovery layer.
Use one beautiful faint thin cool-gray rounded rectangular outline spanning from the left of Alice's wallet rows across to the right of Bob's wallet rows. Its TOP horizontal edge lies just above the top Bitkit and Cake Wallet rows and just BELOW the names/portraits. Its BOTTOM horizontal edge lies below the Wise and WDK rows and includes the exact existing caption "Wallets use Paykit to find a shared payment rail." centered as a tasteful label interrupting the bottom border. The outline is very subtle, visually behind the wallet objects, not a central object or service and not a gray connection route. It can pass invisibly behind the glass plaques as needed. No outline around the portraits, heads or names; remove the old top outline that wraps their upper corners. All wallet options belong to this quiet shared discovery layer.
Preserve the uninterrupted orange direct BTC arrow EXACTLY from Alice's top Bitkit row to Bob's bottom WDK row through empty middle space, its BTC label, all wallet names, all stacked currencies, Alice/Bob names, the exact top caption "Alice wants to send $10 equivalent to Bob" and upper intent arrow, beautiful premium graphite glass 3D rendering, light and reflections. No central object, logo, box, node, faint wallet links, or other changes. Exact existing typography/spellings must remain unchanged.
```

## Shorter intent heading

- Project asset: `public/illustrations/contact-payment-v7.png`
- Dimensions: 1774 × 887 pixels (2:1), RGB PNG.
- Tool: built-in `image_gen.imagegen`, edit mode referencing v6. No API or CLI fallback.
- Original: `/home/gaib/.codex/generated_images/01a15889-4dcc-7812-b0f4-610e6d6824d9/exec-1aa12522-7a7d-42f3-b70a-0e8c089b4e9c.png`.
- Inspected with `view_image`; exact upper heading now reads “I want to pay”. Upper arrow, Alice/Bob, Bitkit-first order, all stacked currencies, direct uninterrupted BTC curve, and the discovery outline and exact lower caption remain present and correct. Final copied without image processing. Versions 5 and 6 remain unchanged.

Exact edit prompt:

```text
Use case: text-localization.
Make exactly ONE narrow text edit to the attached image: replace the upper heading "Alice wants to send $10 equivalent to Bob" with the exact heading "I want to pay".
Center "I want to pay" above the existing upper arrow using the same clean large cool-white modern sans typography and the same heading baseline, leaving calm empty space on either side.
Preserve EVERYTHING ELSE as closely as possible, unchanged: exact 1774x887 wide composition; upper right-facing intent arrow; Alice and Bob names/portraits; Alice row order Bitkit / PayPal / Wise; Bob row order Cake Wallet / Revolut / WDK; vertically stacked currencies BTC above Tether, USD alone, USD above GBP, Ether above XMR, EUR above CHF, BTC above Ether; beautiful premium graphite smoked-glass 3D rendering; all orange highlights; the single uninterrupted direct orange BTC curve from Alice's top Bitkit row to Bob's bottom WDK row with its BTC label and arrow; subtle discovery frame surrounding wallet options only; exact lower caption "Wallets use Paykit to find a shared payment rail."; shadows, reflections, lighting and all object positions.
No other changes, additions or removals. No central box/hub, no faint wallet links. The ONLY changed content is the heading, now EXACTLY "I want to pay".
```

## Animated walkthrough: physical glass identity sculpture

- Project asset: `public/illustrations/glass-person-v1.png`
- Dimensions: 1254 × 1254 pixels, RGBA PNG with transparent background.
- Tool: built-in `image_gen.imagegen`, with v7 as material/art-direction reference and `transparent_background: true`. No API or CLI fallback.
- Original: `/home/gaib/.codex/generated_images/01a15889-4dcc-7812-b0f4-610e6d6824d9/exec-6457e92e-997b-47f0-b503-2f755135871c.png`.
- Inspected with `view_image`; selected without image processing. The asset is a physical frosted-glass/silver person silhouette with restrained orange edge reflections, no text or logos. The transparent cutout sits inside responsive HTML/CSS glass identity plaques; names, currencies, and payment steps remain accessible HTML. Delivered through Next Image at display-appropriate sizes.

Exact generation prompt:

```text
Use case: stylized-concept.
Asset type: transparent-background 3D person/identity sculpture for an animated premium technology website. The attached image is a MATERIAL AND ART-DIRECTION REFERENCE ONLY.
Generate ONE beautiful standalone three-dimensional person silhouette sculpture: simple round head above broad curved shoulders and chest, like an elegant universally recognizable contact icon made physical. No facial features, no gender traits, no real person. Thick dimensional translucent smoked crystal body, cool-white frosted glass front with subtly brushed-silver edges, meticulously beveled rim, soft clean studio edge light, a tiny restrained warm orange #ff6b3d reflected edge along its lower right. Quiet refined premium product-render quality, realistic depth and material sparkle, not flat vector art.
Composition: icon entirely visible, centered, head and shoulder sculpture together as one coherent object, nearly frontal three-quarter view with only slight perspective so silhouette remains very clear. Object fills about 75 percent of square canvas. Genuine TRANSPARENT BACKGROUND / alpha, isolated cutout, no floor, no backdrop, no pedestal, no surrounding tile or plaque, no rectangular frame, no drop shadow outside the object, no text, no letters, no logo, no watermark, no extra symbols, no coins or tokens. Preserve clean smooth edges and glass translucency so this asset can sit naturally on a dark graphite #090b10 website.
Create a polished tangible object with depth and beautiful highlights, not a screen/UI illustration.
```
