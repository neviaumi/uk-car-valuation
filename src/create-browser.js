import playwright from 'playwright';

const chromium = playwright.chromium;

export function createBrowser() {
  return chromium.connectOverCDP('http://localhost:9222');
}
