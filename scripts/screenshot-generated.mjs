import { chromium } from 'playwright';

const browser = await chromium.launch({ executablePath: '/opt/pw-browsers/chromium' });
const page = await browser.newPage({ viewport: { width: 1280, height: 800 } });

const consoleLogs = [];
page.on('console', (msg) => consoleLogs.push(`[${msg.type()}] ${msg.text()}`));
page.on('pageerror', (err) => consoleLogs.push(`[pageerror] ${err}`));

await page.goto('http://127.0.0.1:5173/generated.html', { waitUntil: 'load' });

let status = 'timeout';
try {
  await page.waitForFunction(() => window.__generatedReady === true, { timeout: 10000 });
  status = 'ready';
} catch (e) {
  status = `timeout: ${e.message}`;
}

await page.waitForTimeout(500);

const outPath = process.argv[2] ?? '/tmp/generated-screenshot.png';
await page.screenshot({ path: outPath });

console.log('STATUS:', status);
console.log('CONSOLE LOG DUMP:');
console.log(consoleLogs.join('\n'));

await browser.close();
