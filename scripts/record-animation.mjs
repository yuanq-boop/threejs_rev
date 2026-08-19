// Records a short video of the generated (reconstructed) Three.js scene so
// the arm idle-transition + sway and the head/"Top part" cursor-tracking
// (phase 5, see docs/phase5-animation-notes.md) can be reviewed without
// having to run the dev server and watch it live. Uses Playwright's
// built-in video recording (continuous capture of the actual rendered
// canvas) rather than stitching together individual page.screenshot()
// calls -- screenshots take multiple seconds each in this environment
// (no GPU), which would badly undersample fast motion; video recording
// captures every composited frame Chromium actually produces.
//
// Requires the Vite dev server already running on :5173 (same assumption
// scripts/extract-scene.mjs makes) -- this doesn't start one itself.
import { chromium } from 'playwright';
import { mkdirSync, readdirSync, renameSync, rmSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const outDir = join(root, 'generated', 'recordings');
mkdirSync(outDir, { recursive: true });

const DURATION_MS = 12000;
const VIEWPORT = { width: 1280, height: 960 };

const browser = await chromium.launch({ executablePath: '/opt/pw-browsers/chromium' });
const context = await browser.newContext({
  viewport: VIEWPORT,
  recordVideo: { dir: outDir, size: VIEWPORT },
});
const page = await context.newPage();
page.on('pageerror', (err) => console.error('[pageerror]', err));

// Default (auto-fit) camera, not ?fit=0 -- keeps the whole body in frame
// for the full recording; see "Camera: deliberately not animated by
// default" in docs/phase5-animation-notes.md for why the camera itself
// doesn't move here.
await page.goto('http://127.0.0.1:5173/generated.html', { waitUntil: 'load' });
await page.waitForFunction(() => window.__generatedReady === true, { timeout: 20000 });

const start = Date.now();

// Sweep the mouse across the canvas partway through so the head/"Top part"
// LookAt behavior is visible in the recording too, not just the arm sway.
async function sweepMouse() {
  const { width, height } = VIEWPORT;
  const points = [
    [width * 0.5, height * 0.5],
    [width * 0.15, height * 0.35],
    [width * 0.85, height * 0.3],
    [width * 0.5, height * 0.7],
    [width * 0.5, height * 0.5],
  ];
  for (const [x, y] of points) {
    await page.mouse.move(x, y, { steps: 20 });
    await page.waitForTimeout(1200);
  }
}

await Promise.race([sweepMouse(), page.waitForTimeout(DURATION_MS)]);
const elapsed = Date.now() - start;
if (elapsed < DURATION_MS) await page.waitForTimeout(DURATION_MS - elapsed);

await context.close();
await browser.close();

// Playwright names the video by an internal id; rename it to something
// predictable and remove any stale recordings from earlier runs.
const files = readdirSync(outDir).filter((f) => f.endsWith('.webm'));
const target = join(outDir, 'animation.webm');
rmSync(target, { force: true });
for (const f of files) {
  const full = join(outDir, f);
  if (full === target) continue;
  renameSync(full, target);
}
console.log(`Wrote ${join('generated', 'recordings', 'animation.webm')}`);
