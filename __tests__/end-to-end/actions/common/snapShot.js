const { snapshots } = require("../../../config/constants").puppeteer;
const { resolve } = require("path");
const fs = require('fs')

const snapShot = async (page, pass) => {
  try {
    if (!pass && snapshots) {
      if (page && page.content) {
        fs.writeFileSync(
          resolve(
            snapshots,
            `end-state-${global.__TESTID__ || "unknown"}.html`
          ),
            await page.content()
          );
      }
      if (page && page.screenshot) {
        await page.screenshot({
          fullPage: true,
          path: resolve(
            snapshots,
            `end-state-${global.__TESTID__ || "unknown"}.png`
          ),
        });
      }
    }
  } catch (error) {
    console.warn(error.message);
  }
  return true;
};

module.exports = snapShot;