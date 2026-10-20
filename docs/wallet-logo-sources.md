# Wallet logo sources

Downloaded 2026-10-20. The six active wallet marks are five official SVG symbols/app icons and the official BitBox PNG app icon. Cake Wallet's earlier SVG is retained for rollback. Original geometry and colors are preserved. These marks identify the illustrative profiles; they do not assert integrations or endorsement.

| Local asset | Official source | Selected artwork |
| --- | --- | --- |
| `public/wallets/bitkit.svg` | [Bitkit brand manual](https://www.bitkit.to/brand-manual), [official asset package](https://www.bitkit.to/images/background/bitkit/bitkit-brand-assets.zip) | `Bitkit-Brand-Assets-2026/Brand Mark/Bitkit brand mark - color - for black background.svg` |
| `public/wallets/paypal.svg` | [PayPal official asset CDN](https://www.paypalobjects.com/paypal-ui/logos/svg/paypal-mark-color.svg) | Full-color 48 × 48 PayPal mark |
| `public/wallets/wise.svg` | [Wise official website pinned-tab icon](https://wise.com/public-resources/assets/icons/wise-personal/safari_pinned_tab.svg) | Black 32 × 32 Wise flag symbol; display on a light/mint background for contrast |
| `public/wallets/cake-wallet.svg` | [Cake Wallet official repository](https://github.com/cake-tech/cake_wallet/blob/main/assets/images/cake_logo_dark.svg), [raw asset](https://raw.githubusercontent.com/cake-tech/cake_wallet/main/assets/images/cake_logo_dark.svg) | Pale 28 × 37 Cake Wallet symbol for dark surfaces |
| `public/wallets/revolut.svg` | [Revolut official logo guidelines](https://developer.revolut.com/docs/resources/open-banking-logo-guidelines), [official main retail logo package](https://developer.revolut.com/assets/oba/Main%28Retail%29-Logo-package.zip) | `Main(Retail) Logo package/Main - SVG/Revolut-01-retail-appicon-FINAL-01.svg`, 800 × 800 app icon |
| `public/wallets/wdk.svg` | [WDK by Tether official website](https://wdk.tether.io/), [official SVG app icon](https://wdk.tether.io/icon.svg?icon.3zxrjexf3btyf.svg) | Orange 48 × 48 rounded app icon with white geometric WDK mark |

The SVGs were parsed and inspected for scripts, event handlers, external resource references, foreign objects, document entities, and executable URLs. They contain no scripts or external resources; any `url(...)` references point to local SVG definitions. No third-party logo aggregators, recreated marks, raster wrappers, or generated logos were used.

## BitBox replacement

- Asset: `public/wallets/bitbox.png` (1024 × 1024 PNG, unchanged official artwork).
- Official product: [BitBox](https://bitbox.swiss/).
- Source: [BitBoxSwiss official app repository](https://github.com/BitBoxSwiss/bitbox-wallet-app/blob/master/frontends/ios/BitBoxApp/BitBoxApp/Assets.xcassets/AppIcon.appiconset/bbapp_ios_icon_light_1024px.png), [raw PNG](https://raw.githubusercontent.com/BitBoxSwiss/bitbox-wallet-app/master/frontends/ios/BitBoxApp/BitBoxApp/Assets.xcassets/AppIcon.appiconset/bbapp_ios_icon_light_1024px.png).
- Selected the actual square BitBoxApp icon instead of the repository's long SVG wordmarks. The original PNG's geometry and colors are preserved, with no image edits or SVG wrapper. Checked PNG signature and 1024 × 1024 dimensions; this static raster asset has no SVG scripts or external resource references.
- The earlier `cake-wallet.svg` remains available for rollback. Brand appearance does not assert a Paykit integration.
