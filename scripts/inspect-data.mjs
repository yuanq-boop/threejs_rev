import { chromium } from 'playwright';

const browser = await chromium.launch({ executablePath: '/opt/pw-browsers/chromium' });
const page = await browser.newPage({ viewport: { width: 1280, height: 800 } });
await page.goto('http://127.0.0.1:5173/', { waitUntil: 'load' });
await page.waitForFunction(() => window.__splineLoaded === true, { timeout: 20000 });
await page.waitForTimeout(500);

const dump = await page.evaluate(() => {
  const app = window.__app;
  const scene = app._scene;

  const wanted = { BoxGeometry: null, RoundedCylinderBufferGeometry: null, BufferGeometry: null };
  const materialSamples = [];

  function walk(obj) {
    if (obj.isMesh && obj.geometry) {
      const gt = obj.geometry.type;
      if (gt in wanted && wanted[gt] === null) {
        wanted[gt] = {
          name: obj.name,
          dataGeometry: obj.data?.geometry,
          dataMaterialRaw: obj.data?.material,
        };
      }
      if (materialSamples.length < 3 && obj.data?.material) {
        materialSamples.push({ name: obj.name, material: obj.data.material });
      }
    }
    (obj.children || []).forEach(walk);
  }
  walk(scene);

  // JSON.stringify chokes on cyclic/typed-array-heavy structures; use a safe replacer.
  function safe(key, value) {
    if (value instanceof Float32Array || value instanceof Uint32Array || value instanceof Uint16Array) {
      return `TypedArray(${value.constructor.name}, len=${value.length})`;
    }
    if (value && value.isVector3) return { x: value.x, y: value.y, z: value.z };
    if (value && value.isColor) return { r: value.r, g: value.g, b: value.b };
    return value;
  }

  return JSON.parse(JSON.stringify({ wanted, materialSamples }, safe));
});

console.log(JSON.stringify(dump, null, 2));
await browser.close();
