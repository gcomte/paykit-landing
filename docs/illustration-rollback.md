# Discovery-layer illustration trial

The version before this trial is preserved in the pushed annotated tag
`illustration-before-discovery-layer` (commit `d7eb67e`). Its original asset,
`public/illustrations/contact-payment-v5.png`, remains in the repository.

The trial uses `public/illustrations/contact-payment-v7.png`, places Bitkit first,
and separates Paykit's discovery role from a direct wallet-to-wallet BTC payment.
The initial trial is tagged `illustration-discovery-layer-v1`. The subsequent
heading refinement, “I want to pay”, is tagged `illustration-discovery-layer-v2`.

To restore the previous illustration, responsive layout, and explanatory text
while keeping shared history, run from `feat/paykit-landing`:

```sh
git revert --no-commit illustration-before-discovery-layer..illustration-discovery-layer-v2
git commit -m "Restore previous Paykit illustration"
git push origin HEAD:refs/heads/feat/paykit-landing
npx --yes vercel@64.7.0 --prod --yes --no-wait
```

Verify that deployment reaches Ready and is assigned to
`https://paykit-landing-page.vercel.app/`. Reverting the trial restores the former
Bitkit position too; it can be moved first separately if preferred. Future edits
to the same files may require resolving a normal revert conflict.

## Four-step animation trial

The static discovery-layer version is preserved in the pushed annotated tag
`illustration-before-animation` (commit `c740723`). Its image,
`public/illustrations/contact-payment-v7.png`, remains available.

The animation shows the starting options, protocol discovery, selection of a
shared rail, and a direct wallet-to-wallet payment. The complete animation trial
is tagged `illustration-animation-v1`.

To return to the static version, use:

```sh
git revert --no-commit illustration-before-animation..illustration-animation-v1
git commit -m "Restore static Paykit payment illustration"
git push origin HEAD:refs/heads/feat/paykit-landing
npx --yes vercel@64.7.0 --prod --yes --no-wait
```

This restores the static component, its styling, and its explanatory text while
preserving the earlier illustration history. Confirm the deployment reaches Ready
and the canonical domain points to it.

## Glass scene and looping autoplay

The first animation is preserved in the pushed tag
`illustration-before-lively-animation` (commit `9f9b039`). The subsequent glass
scene and looping autoplay version is tagged `illustration-lively-animation-v1`.

To restore the first animation:

```sh
git revert --no-commit illustration-before-lively-animation..illustration-lively-animation-v1
git commit -m "Restore first Paykit animation"
git push origin HEAD:refs/heads/feat/paykit-landing
npx --yes vercel@64.7.0 --prod --yes --no-wait
```

To return all the way to the static image after this update, revert the complete
range `illustration-before-animation..illustration-lively-animation-v1` instead.
Future edits may require resolving a normal revert conflict.
