import playwright from 'playwright';

const [, , registrationPlate] = process.argv;

const chromium = playwright.chromium;

const browser = await chromium.connectOverCDP('http://localhost:9222');

const page = await browser.newPage({});
await page.goto(
  new URL('', 'https://www.check-mot.service.gov.uk/').toString(),
);
await page
  .getByRole('textbox', {
    name: 'registration',
  })
  .fill(registrationPlate);
await page.getByRole('button', { name: 'Continue' }).click();

try {
  await page.waitForURL(
    `https://www.check-mot.service.gov.uk/results?**${registrationPlate}**`,
  );
  await page
    .getByRole('button', {
      name: 'Show all sections',
    })
    .click();
  const motExpiryDate = (
    await page.locator('[data-test-id="mot-due-date"]').textContent()
  ).trim();
  const vehicleRegisterAt = (
    await page.locator('[data-test-id="vehicle-date-registered"]').textContent()
  ).trim();
  const vehicleMake = (
    await page.locator('[data-test-id="vehicle-make-model"]').textContent()
  ).trim();
  const lastTestHistoryItem = await page
    .locator('[data-test-id="test-history-item"]')
    .first();
  const lastMOTTestNumber = (
    await lastTestHistoryItem
      .locator('[data-test-id="test-number"]')
      .textContent()
  ).trim();
  const lastMOTMileage = (
    await lastTestHistoryItem
      .locator('[data-test-id="test-history-odometer"]')
      .textContent()
  ).trim();
  const hasMotAdvisories = await page
    .locator(
      `[data-test-id="test-history-rfr-${lastMOTTestNumber.replaceAll(' ', '')}"]`,
    )
    .isVisible();
  const lastMOTItems = hasMotAdvisories
    ? (
        await lastTestHistoryItem
          .locator(
            `[data-test-id="test-history-rfr-${lastMOTTestNumber.replaceAll(' ', '')}"]`,
          )
          .textContent()
      )
        .trim()
        .split('\n')
        .filter(item => item.trim() !== '')
        .map(item => item.trim())
        .join('\n')
    : 'No advisories';

  console.log(`
Vehicle Make: ${vehicleMake}
Vehicle Register At: ${vehicleRegisterAt}
MOT Expiry Date: ${motExpiryDate}
Last MOT Mileage: ${lastMOTMileage}
Last MOT Items:
${lastMOTItems}
  `);
  await browser.close();
} catch (err) {
  console.log(err);
  const errorMessage = await page.getByRole('alert').textContent();
  throw new Error(errorMessage);
}
