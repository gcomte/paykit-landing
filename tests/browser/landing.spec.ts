import { test, expect } from "@playwright/test";

const password =
  process.env.TEST_LANDING_PASSWORD || process.env.LANDING_PASSWORD;

test("the server gate protects HTML, RSC, and invalid sessions", async ({
  request,
  baseURL,
}) => {
  const attempts: Record<string, string>[] = [
    {},
    { Cookie: "paykit_access=v1.9999999999.forged" },
  ];
  for (const headers of attempts) {
    const response = await request.get("/", { headers, maxRedirects: 0 });
    expect(response.status()).toBe(307);
    expect(response.headers().location).toBe("/access");
    expect(await response.text()).not.toContain("Skip the back-and-forth");
    expect(await response.text()).not.toContain("payment-story");
    expect(response.headers()["cache-control"]).toContain("no-store");
  }
  const rsc = await request.get("/?_rsc=security-check", {
    headers: { RSC: "1", "Next-Router-Prefetch": "1" },
  });
  expect(await rsc.text()).not.toContain("Skip the back-and-forth");
  expect(await rsc.text()).not.toContain("Pay. Get paid.");
  expect(await rsc.text()).not.toContain("Cake Wallet");
  const calendar = await request.get("/api/calendar", { maxRedirects: 0 });
  expect(calendar.status()).toBe(303);
  expect(calendar.headers().location).toContain("/access");
  const wrong = await request.post("/api/access", {
    form: { password: "invalid-test-value" },
    headers: { Origin: baseURL! },
    maxRedirects: 0,
  });
  expect(wrong.headers().location).toContain("error=invalid");
  expect(wrong.headers()["set-cookie"]).toBeUndefined();
  const foreign = await request.post("/api/access", {
    form: { password: "invalid-test-value" },
    headers: { Origin: "https://foreign.example" },
  });
  expect(foreign.status()).toBe(403);
  const oversized = await request.post("/api/access", {
    form: { password: "x".repeat(3000) },
    headers: { Origin: baseURL! },
  });
  expect(oversized.status()).toBe(413);
});

test("visitors can unlock the page and browse it at desktop and phone widths", async ({
  page,
  context,
}) => {
  expect(
    password,
    "Provide TEST_LANDING_PASSWORD to exercise the real gate",
  ).toBeTruthy();
  const errors: string[] = [];
  page.on("pageerror", (error) => errors.push(error.message));
  await page.setViewportSize({ width: 1440, height: 1000 });
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/");
  await expect(page.getByLabel("Password", { exact: true })).toBeVisible();
  await page.getByLabel("Password", { exact: true }).fill(password!);
  await page.getByRole("button", { name: "Enter Paykit" }).click();
  await expect(page).toHaveURL(/\/$/);
  await expect(page.getByRole("heading", { level: 1 })).toContainText(
    "Pay. Get paid.",
  );
  const cookie = (await context.cookies()).find(
    (cookie) => cookie.name === "paykit_access",
  );
  expect(cookie?.httpOnly).toBe(true);
  expect(cookie?.sameSite).toBe("Lax");
  await expect(page.locator("iframe")).toHaveCount(0);
  await expect(
    page.getByRole("link", { name: /Bitkit/i }).first(),
  ).toHaveAttribute("href", /https:\/\/bitkit\.to\/?$/);
  await expect(
    page.getByRole("link", { name: /Marketplace/i }).first(),
  ).toHaveAttribute("href", "https://staging.pubky.app/shop");
  await expect(
    page.getByText("16:15–17:00", { exact: false }).first(),
  ).toBeVisible();
  const calendar = await page.request.get("/api/calendar", {
    headers: { Cookie: `paykit_access=${cookie?.value}` },
  });
  expect(calendar.headers()["content-type"]).toContain("text/calendar");
  expect(calendar.headers()["content-disposition"]).toContain(
    "paykit-lugano-2026.ics",
  );
  expect(calendar.headers()["cache-control"]).toContain("no-store");
  expect(await calendar.text()).toContain("DTSTART:20261024T141500Z");
  await expect(
    page.getByRole("link", { name: "Add to calendar" }),
  ).toHaveAttribute("href", "/api/calendar");
  const [download] = await Promise.all([
    page.waitForEvent("download"),
    page.getByRole("link", { name: "Add to calendar" }).click(),
  ]);
  expect(download.suggestedFilename()).toBe("paykit-lugano-2026.ics");
  const googleCalendar = new URL(
    (await page
      .getByRole("link", { name: "Google Calendar" })
      .getAttribute("href")) as string,
  );
  expect(googleCalendar.searchParams.get("dates")).toBe(
    "20261024T141500Z/20261024T150000Z",
  );
  await page.evaluate(() => {
    document.documentElement.style.scrollBehavior = "auto";
    window.scrollTo(0, 0);
  });
  await page.screenshot({ path: "test-results/desktop-hero.png" });
  await page.setViewportSize({ width: 390, height: 844 });
  await page.evaluate(() => window.scrollTo(0, 0));
  await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
  expect(
    await page.evaluate(
      () => document.documentElement.scrollWidth <= innerWidth,
    ),
  ).toBe(true);
  await page.screenshot({ path: "test-results/mobile-hero.png" });
  expect(errors).toEqual([]);
});

test("video loads on demand and the inquiry composer prepares a structured email", async ({
  page,
  baseURL,
}) => {
  expect(password).toBeTruthy();
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/access");
  await page.getByLabel("Password", { exact: true }).fill(password!);
  await page.getByRole("button", { name: "Enter Paykit" }).click();
  await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
  await expect(page.locator("iframe")).toHaveCount(0);
  await page.route("https://www.youtube-nocookie.com/**", (route) =>
    route.fulfill({
      contentType: "text/html",
      body: "<p>Video test frame</p>",
    }),
  );
  await page.getByRole("button", { name: /Play the Paykit teaser/ }).click();
  await expect(page.locator("iframe")).toHaveAttribute(
    "src",
    /youtube-nocookie\.com\/embed\/yUkBWQ1J7bQ/,
  );
  const cdp = await page.context().newCDPSession(page);
  await cdp.send("Page.enable");
  const draft = new Promise<string>((resolve) => {
    cdp.on("Page.frameRequestedNavigation", (event) => {
      if (event.url.startsWith("mailto:")) resolve(event.url);
    });
  });
  await page.getByLabel("Your name").fill("Integration Test");
  await page.getByLabel("Email address").fill("test@example.com");
  await page.getByLabel("Organization").fill("Example Wallet");
  await page.getByLabel("I’m interested in").selectOption("Wallet integration");
  await page
    .getByLabel("Tell us a little more")
    .fill("I would like to integrate Paykit.");
  await page.getByRole("button", { name: /Open email draft/ }).click();
  const uri = new URL(await draft);
  expect(uri.pathname).toBe("info@synonym.to");
  expect(uri.searchParams.get("subject")).toContain("Wallet integration");
  expect(uri.searchParams.get("body")).toContain("Example Wallet");
  expect(uri.searchParams.get("body")).toContain("test@example.com");
  await expect(page.getByRole("status")).toContainText("email app");
  const response = await page.request.post("/api/logout", {
    headers: { Origin: baseURL! },
    maxRedirects: 0,
  });
  expect(response.status()).toBe(303);
  await page.goto("/");
  await expect(page).toHaveURL(/\/access$/);
});

test("the payment story separates discovery from payment and supports reduced motion", async ({
  page,
}) => {
  expect(password).toBeTruthy();
  const publicScriptBodies: Promise<string>[] = [];
  page.on("response", (response) => {
    if (
      new URL(response.url()).pathname.startsWith("/_next/static/") &&
      response.request().resourceType() === "script"
    ) {
      publicScriptBodies.push(response.text());
    }
  });
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.setViewportSize({ width: 1440, height: 1000 });
  await page.goto("/access");
  await page.getByLabel("Password", { exact: true }).fill(password!);
  await page.getByRole("button", { name: "Enter Paykit" }).click();
  const story = page.getByTestId("payment-story");
  await story.scrollIntoViewIfNeeded();
  await expect(story).toHaveAttribute("data-active-step", "3");
  expect(publicScriptBodies.length).toBeGreaterThan(0);
  const loadedScripts = await Promise.all(publicScriptBodies);
  expect(
    loadedScripts.some((code) => code.includes("payment-story-toggle")),
  ).toBe(true);
  for (const code of loadedScripts) {
    expect(code).not.toContain("Cake Wallet");
    expect(code).not.toContain("Alice wants to pay");
  }
  const route = story.getByTestId("payment-route");
  const caption = story.getByTestId("payment-story-caption");
  for (const step of [0, 1, 2, 3]) {
    const button = story.locator(`button[data-step="${step}"]`);
    await button.click();
    await expect(story).toHaveAttribute("data-active-step", String(step));
    await expect(button).toHaveAttribute("aria-current", "step");
    await expect(route).toHaveCSS("opacity", step === 3 ? "1" : "0");
    if (step === 1)
      await expect(caption.getByRole("heading")).toContainText("Paykit");
    if (step === 2)
      await expect(caption.getByRole("heading")).toContainText("$10");
    if (step === 3)
      await expect(caption.getByRole("heading")).toContainText(/direct/i);
  }
  await story.locator('button[data-step="1"]').focus();
  await page.keyboard.press("Enter");
  await expect(story).toHaveAttribute("data-active-step", "1");

  await page.setViewportSize({ width: 360, height: 1000 });
  await story.scrollIntoViewIfNeeded();
  const bitkit = story.locator('[data-wallet="Bitkit"]');
  const paypal = story.locator('[data-wallet="PayPal"]');
  expect((await bitkit.boundingBox())!.y).toBeLessThan(
    (await paypal.boundingBox())!.y,
  );
  const cake = story.locator('[data-wallet="Cake Wallet"]');
  const wdk = story.locator('[data-wallet="WDK"]');
  expect((await wdk.boundingBox())!.y).toBeGreaterThan(
    (await cake.boundingBox())!.y,
  );
  for (const [wallet, currencies] of [
    ["Bitkit", ["BTC", "Tether"]],
    ["Wise", ["USD", "GBP"]],
    ["Cake Wallet", ["Ether", "XMR"]],
    ["WDK", ["BTC", "Ether"]],
    ["Revolut", ["EUR", "CHF"]],
  ] as const) {
    const row = story.locator(`[data-wallet="${wallet}"]`);
    const top = row.getByText(currencies[0], { exact: true });
    const bottom = row.getByText(currencies[1], { exact: true });
    const topBox = (await top.boundingBox())!;
    const bottomBox = (await bottom.boundingBox())!;
    expect(bottomBox.y).toBeGreaterThan(topBox.y);
    expect(
      await top.evaluate((element) =>
        parseFloat(getComputedStyle(element).fontSize),
      ),
    ).toBeGreaterThanOrEqual(14);
    expect(
      await row.evaluate(
        (element) =>
          element.scrollWidth <= element.clientWidth &&
          element.scrollHeight <= element.clientHeight,
      ),
    ).toBe(true);
  }
  expect(
    await page.evaluate(
      () => document.documentElement.scrollWidth <= innerWidth,
    ),
  ).toBe(true);
});

test("the payment story autoplays, loops, pauses, and replays", async ({
  page,
}) => {
  test.setTimeout(60_000);
  expect(password).toBeTruthy();
  await page.emulateMedia({ reducedMotion: "no-preference" });
  await page.setViewportSize({ width: 1440, height: 1000 });
  await page.goto("/access");
  await page.getByLabel("Password", { exact: true }).fill(password!);
  await page.getByRole("button", { name: "Enter Paykit" }).click();
  const story = page.getByTestId("payment-story");
  await story.scrollIntoViewIfNeeded();
  await expect(story).toHaveAttribute("data-playing", "true");
  await expect(story.getByText("Auto-playing", { exact: true })).toBeVisible();
  await expect(story).toHaveAttribute("data-active-step", "0");
  await expect(story).toHaveAttribute("data-active-step", "1", {
    timeout: 9_000,
  });
  await story.getByTestId("payment-story-toggle").click();
  await expect(story).toHaveAttribute("data-playing", "false");
  const pausedStep = await story.getAttribute("data-active-step");
  const pausedProgress = await story.evaluate((element) =>
    (element as HTMLElement).style.getPropertyValue("--story-progress"),
  );
  await page.waitForTimeout(5_500);
  await expect(story).toHaveAttribute("data-active-step", pausedStep!);
  expect(
    await story.evaluate((element) =>
      (element as HTMLElement).style.getPropertyValue("--story-progress"),
    ),
  ).toBe(pausedProgress);
  expect(
    await story.evaluate((element) =>
      element
        .getAnimations({ subtree: true })
        .filter((animation) => animation instanceof CSSAnimation)
        .every((animation) => animation.playState === "paused"),
    ),
  ).toBe(true);
  await story.getByTestId("payment-story-toggle").click();
  await expect(story).toHaveAttribute("data-active-step", "2", {
    timeout: 9_000,
  });
  await expect(story).toHaveAttribute("data-active-step", "3", {
    timeout: 9_000,
  });
  await expect(story.getByTestId("payment-route")).toHaveCSS("opacity", "1");
  await story.getByTestId("payment-story-toggle").click();
  await expect(story).toHaveAttribute("data-playing", "false");
  await story.getByTestId("payment-story-toggle").click();
  await expect(story).toHaveAttribute("data-playing", "true");
  await expect(story).toHaveAttribute("data-active-step", "3");
  await expect(story).toHaveAttribute("data-active-step", "0", {
    timeout: 8_000,
  });
  await expect(story).toHaveAttribute("data-playing", "true");
  await story.getByTestId("payment-story-replay").click();
  await expect(story).toHaveAttribute("data-active-step", "0");
  await page.evaluate(() => window.scrollTo({ top: 0, behavior: "instant" }));
  await page.waitForTimeout(5_500);
  await expect(story).toHaveAttribute("data-active-step", "0");
  await expect(story).toHaveAttribute("data-playing", "false");
  await story.scrollIntoViewIfNeeded();
  await story.locator('button[data-step="0"]').click();
  await expect(story).toHaveAttribute("data-playing", "false");
  for (const wallet of ["Bitkit", "WDK"]) {
    await expect
      .poll(() =>
        story.locator(`[data-wallet="${wallet}"]`).evaluate((row) => {
          let opacity = 1;
          let element: Element | null = row;
          while (element) {
            opacity *= Number(getComputedStyle(element).opacity);
            element = element.parentElement;
          }
          return opacity;
        }),
      )
      .toBeGreaterThan(0.95);
  }
});
