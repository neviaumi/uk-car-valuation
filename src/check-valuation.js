export async function checkValuationFromWeBuyAnyCar(
  browser,
  { mileage, registrationPlate },
) {
  const page = await browser.newPage();
  await page.goto('https://www.webuyanycar.com/');
  await page
    .getByRole('button', {
      name: 'Accept all cookies',
    })
    .click();
  await page.getByPlaceholder('Enter your reg').fill(registrationPlate);
  await page.getByPlaceholder('e.g.').fill(mileage);
  await page.getByRole('button', { name: 'Get my car valuation' }).click();
  await page.waitForURL('https://www.webuyanycar.com/vehicle/details');
  await page
    .getByRole('textbox', { name: 'Email Address' })
    .fill('car-valuation@gmail.com');
  await page.getByRole('textbox', { name: 'Postcode' }).fill('SW1A 1AA');
  await page.getByRole('button', { name: 'Get my valuation' }).first().click();
  await page.waitForURL('https://www.webuyanycar.com/valuation/view');
  const valuation = (
    await page.locator('.amount').first().textContent()
  ).trim();
  await page.close();
  return {
    valuation,
  };
}
