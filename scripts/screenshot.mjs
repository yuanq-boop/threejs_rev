import { chromium } from 'playwright';

const browser = await chromium.launch({
  executablePath: '/opt/pw-browsers/chromium',
});
const page = await browser.newPage({ viewport: { width: 1280, height: 800 } });

const consoleLogs = [];
page.on('console', (msg) => consoleLogs.push(`[${msg.type()}] ${msg.text()}`));
page.on('pageerror', (err) => consoleLogs.push(`[pageerror] ${err}`));
page.on('requestfailed', (req) =>
  consoleLogs.push(`[requestfailed] ${req.url()} -- ${req.failure()?.errorText}`)
);
page.on('response', (res) => {
  if (!res.ok()) consoleLogs.push(`[response ${res.status()}] ${res.url()}`);
});

await page.goto('http://127.0.0.1:5173/', { waitUntil: 'load' });

let status = 'timeout';
try {
  await page.waitForFunction(
    () => window.__splineLoaded === true || window.__splineError !== undefined,
    { timeout: 20000 }
  );
  status = await page.evaluate(() =>
    window.__splineLoaded ? 'loaded' : `error: ${window.__splineError}`
  );
} catch (e) {
  status = `timeout: ${e.message}`;
}

// give it a moment to render a frame or two after load
await page.waitForTimeout(1500);

await page.screenshot({ path: '/tmp/claude-0/-home-user-threejs-rev/e9f22bed-5216-591c-b648-122452da471e/scratchpad/spline-screenshot.png' });

console.log('STATUS:', status);
console.log('CONSOLE LOG DUMP:');
console.log(consoleLogs.join('\n'));

await browser.close();
