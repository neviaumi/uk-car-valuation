import { checkMotHistoryFromGovUK } from './check-mot-history.js';
import { checkValuationFromWeBuyAnyCar } from './check-valuation.js';
import { createBrowser } from './create-browser.js';

const [, , registrationPlate, runningMileage] = process.argv;

const browser = await createBrowser();
const motHistory = await checkMotHistoryFromGovUK(browser, {
  registrationPlate,
});
const weBuyAnyCarValuation = await checkValuationFromWeBuyAnyCar(browser, {
  mileage: runningMileage,
  registrationPlate,
});
await browser.close();
console.log(`
Vehicle Make: ${motHistory.vehicleMake}
Vehicle Registered At: ${motHistory.vehicleRegisterAt}`);
console.log(`
Value of car: £${weBuyAnyCarValuation.valuation}`);
console.log(`
MOT Expiry Date: ${motHistory.motExpiryDate}
Last MOT Mileage: ${motHistory.lastMOTMileage}
Last MOT Items
${motHistory.lastMOTItems}`);
