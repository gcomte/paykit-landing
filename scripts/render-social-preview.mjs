import { readFile, mkdir } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import { chromium } from "@playwright/test";

// Fixed local inputs keep this render independent of the app and external services.
const artworkUrl = new URL("../public/illustrations/pubky-homeserver-network-v4.png", import.meta.url);
const outputUrl = new URL("../public/social-preview.png", import.meta.url);
const artwork = (await readFile(artworkUrl)).toString("base64");
const browser = await chromium.launch({ headless: true });

try {
  const page = await browser.newPage({
    viewport: { width: 1200, height: 630 },
    deviceScaleFactor: 1,
    reducedMotion: "reduce",
  });
  await page.route("**/*", (route) => route.abort());
  await page.setContent(`<!doctype html>
    <html lang="en"><head><meta charset="utf-8"><style>
      * { box-sizing: border-box; }
      html, body { margin: 0; width: 1200px; height: 630px; overflow: hidden; }
      body { background: #090b10; color: #f5f6fa; font-family: Arial, sans-serif; }
      .card { position: relative; width: 1200px; height: 630px; overflow: hidden;
        background: radial-gradient(ellipse at 80% 90%, #ff6b3d0a, transparent 55%), #090b10; }
      .art { position: absolute; width: 700px; height: 467px; right: 24px; bottom: 35px;
        object-fit: contain; opacity: .94;
        mask-image: linear-gradient(to right, transparent 0%, #000 31%),
          linear-gradient(to bottom, transparent 0%, #000 9%, #000 92%, transparent 100%);
        mask-composite: intersect; }
      .brand { position: absolute; left: 64px; top: 54px; display: flex;
        align-items: center; gap: 23px; }
      .wordmark { font-size: 39px; font-weight: 700; letter-spacing: -1.5px; }
      .tagline { color: #bbc1cc; font-family: Georgia, serif; font-style: italic;
        font-size: 21px; line-height: 1.25; }
      .brand-divider { width: 1px; height: 29px; background: #ffffff29; }
      .copy { position: absolute; top: 211px; left: 64px; z-index: 1; }
      h1 { margin: 0; font-size: 78px; line-height: 1.1; font-weight: 700;
        letter-spacing: -4px; }
      .accent { display: block; margin-top: 13px; color: #ff9a73;
        font-family: Georgia, serif; font-style: italic; font-weight: 400;
        font-size: 57px; line-height: 1.15; letter-spacing: -2.5px; white-space: nowrap; }
      .rule { position: absolute; top: 0; left: 64px; width: 52px; height: 3px;
        background: #ff6b3d; }
    </style></head><body><main class="card">
      <img class="art" alt="" src="data:image/png;base64,${artwork}">
      <div class="rule"></div>
      <div class="brand"><span class="wordmark">Paykit</span><span class="brand-divider"></span>
        <span class="tagline">the open payment coordination protocol</span></div>
      <div class="copy"><h1>Pay. Get paid.<span class="accent">Skip the back-and-forth.</span></h1></div>
    </main></body></html>`, { waitUntil: "load" });
  await page.locator(".art").evaluate((image) => image.decode());
  await page.evaluate(() => document.fonts.ready);
  const copyBounds = await page.locator(".copy").boundingBox();
  if (!copyBounds || copyBounds.x + copyBounds.width > 1136 || copyBounds.y + copyBounds.height > 566) {
    throw new Error("Social preview copy exceeds its safe bounds.");
  }
  await mkdir(new URL("../public/", import.meta.url), { recursive: true });
  await page.screenshot({ path: fileURLToPath(outputUrl), type: "png", animations: "disabled" });
  console.log(`Rendered ${fileURLToPath(outputUrl)} (1200 × 630).`);
} finally {
  await browser.close();
}
