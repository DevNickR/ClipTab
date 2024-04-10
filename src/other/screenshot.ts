import { chromium, Browser, BrowserContext } from 'playwright';
import * as fs from 'fs';
import * as path from 'path';

async function takeScreenshot(colorScheme: 'light' | 'dark') {
    console.log(`Starting screenshot of: ${colorScheme}`);
    const browser: Browser = await chromium.launch();
    const context: BrowserContext = await browser.newContext({
        colorScheme: colorScheme,
        viewport: { width: 640, height: 400 },
    });
    const page = await context.newPage();

    // Point to your popup.html file. Adjust the path as necessary.
    const popupPath = `file://${path.join(__dirname, '..', 'popup.html')}`;
    console.log(`Path to popup: ${popupPath}`);
    await page.goto(popupPath);
    const screenshotPath = `${path.join(__dirname, '..', '..', 'screenshots', `popup-${colorScheme}.png`)}`;
    console.log(`Path to screenshot: ${screenshotPath}`);
    await page.screenshot({ path: screenshotPath });

    await browser.close();
    console.log(`Completed screenshot of: ${colorScheme}`);
}

(async () => {
    const screenshotsDir = './screenshots';
    if (!fs.existsSync(screenshotsDir)) {
        fs.mkdirSync(screenshotsDir);
    }

    // Take screenshots in both light and dark modes
    await takeScreenshot('light');
    await takeScreenshot('dark');
})();
