import playwright from 'playwright';

const browser = await playwright.chromium.launch({
  args: ['--disable-dev-shm-usage'],
  headless: false,
});

const page = await browser.newPage();
await page.goto(new URL('/search?q=testing', 'https://google.com').toString());
