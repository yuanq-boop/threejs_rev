import { chromium } from 'playwright';

const browser = await chromium.launch({ executablePath: '/opt/pw-browsers/chromium' });
const page = await browser.newPage({ viewport: { width: 1280, height: 800 } });
page.on('pageerror', (err) => console.error('[pageerror]', err));

await page.goto('http://127.0.0.1:5173/generated.html', { waitUntil: 'load' });
await page.waitForFunction(() => window.__generatedReady === true, { timeout: 10000 });

const multipliers = [1, 1000, 10000, 50000, 100000, 300000, 700000, 1500000];
for (const m of multipliers) {
  await page.evaluate((mult) => {
    const light = window.__generatedLights['Point Light'];
    light.intensity = 5 * mult;
  }, m);
  await page.waitForTimeout(150);
  await page.screenshot({ path: `/tmp/claude-0/-home-user-threejs-rev/e9f22bed-5216-591c-b648-122452da471e/scratchpad/calib-${m}.png` });
  console.log('captured multiplier', m);
}

await browser.close();
