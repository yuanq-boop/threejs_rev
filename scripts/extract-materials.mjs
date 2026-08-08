// Resolves every entry in app._data.shared.materials -- Spline's authoring-
// time layered material stack (color/light/matcap/texture/rainbow layers) --
// into generated/materials-description.json. Deliberately dumps the WHOLE
// dictionary, not just the materials referenced by phase-1's primitives, so
// phase 3 (which adds the rest of the geometry) doesn't need to redo this.
import { chromium } from 'playwright';
import { writeFileSync, mkdirSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const outDir = join(root, 'generated');
mkdirSync(outDir, { recursive: true });

const browser = await chromium.launch({ executablePath: '/opt/pw-browsers/chromium' });
const page = await browser.newPage({ viewport: { width: 1280, height: 800 } });
page.on('pageerror', (err) => console.error('[pageerror]', err));

await page.goto('http://127.0.0.1:5173/', { waitUntil: 'load' });
await page.waitForFunction(() => window.__splineLoaded === true, { timeout: 20000 });
await page.waitForTimeout(300);

const materials = await page.evaluate(() => {
  const app = window.__app;
  const raw = app._data?.shared?.materials ?? {};

  function safe(key, value) {
    if (
      value instanceof Float32Array ||
      value instanceof Uint32Array ||
      value instanceof Uint16Array ||
      value instanceof Uint8Array
    ) {
      return `TypedArray(${value.constructor.name}, len=${value.length})`;
    }
    return value;
  }

  const out = {};
  for (const [id, mat] of Object.entries(raw)) {
    out[id] = JSON.parse(JSON.stringify(mat, safe));
  }
  return out;
});

writeFileSync(join(outDir, 'materials-description.json'), JSON.stringify(materials, null, 2));
console.log(`Wrote generated/materials-description.json (${Object.keys(materials).length} materials)`);

await browser.close();
