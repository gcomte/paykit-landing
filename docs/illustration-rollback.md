# Discovery-layer illustration trial

The version before this trial is preserved in the pushed annotated tag
`illustration-before-discovery-layer` (commit `d7eb67e`). Its original asset,
`public/illustrations/contact-payment-v5.png`, remains in the repository.

The trial uses `public/illustrations/contact-payment-v6.png`, places Bitkit first,
and separates Paykit's discovery role from a direct wallet-to-wallet BTC payment.
The complete trial is one commit, tagged `illustration-discovery-layer-v1`.

To restore the previous illustration, responsive layout, and explanatory text
while keeping shared history, run from `feat/paykit-landing`:

```sh
git revert illustration-discovery-layer-v1
git push origin HEAD:refs/heads/feat/paykit-landing
npx --yes vercel@64.7.0 --prod --yes --no-wait
```

Verify that deployment reaches Ready and is assigned to
`https://paykit-landing-page.vercel.app/`. Reverting the trial restores the former
Bitkit position too; it can be moved first separately if preferred. Future edits
to the same files may require resolving a normal revert conflict.
