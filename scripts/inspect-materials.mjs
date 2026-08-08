import { chromium } from 'playwright';

const browser = await chromium.launch({ executablePath: '/opt/pw-browsers/chromium' });
const page = await browser.newPage({ viewport: { width: 1280, height: 800 } });
await page.goto('http://127.0.0.1:5173/', { waitUntil: 'load' });
await page.waitForFunction(() => window.__splineLoaded === true, { timeout: 20000 });
await page.waitForTimeout(500);

const dump = await page.evaluate(() => {
  const app = window.__app;

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

  const candidateKeys = Object.keys(app).filter((k) => k.startsWith('_'));
  const dataKeys = app._data ? Object.keys(app._data) : null;

  const ids = [
    'ac839791-b0cd-406c-a276-0d8c6f6ecfd8', // text/shape material
    '342265b2-6982-4c49-b670-fee0149640a3', // cylinder material
    '6bdc5132-7ea6-4d70-8d2b-c8849ea9973b', // cube material
  ];

  // Try common lookup spots for a shared-materials registry.
  const lookups = {};
  const sharedManager = app._sharedAssetsManager;
  lookups.sharedAssetsManagerKeys = sharedManager ? Object.keys(sharedManager) : null;

  const materials = sharedManager?.materials;
  lookups.materialsType = materials?.constructor?.name;
  lookups.materialsKind = materials instanceof Map ? 'Map' : typeof materials;
  if (materials instanceof Map) {
    lookups.materialsSize = materials.size;
    lookups.materialIdsSample = [...materials.keys()].slice(0, 10);
    lookups.materialLookups = ids.map((id) => [id, materials.get(id)]);
  } else if (materials && typeof materials === 'object') {
    lookups.materialKeysSample = Object.keys(materials).slice(0, 10);
    lookups.materialLookups = ids.map((id) => [id, materials[id]]);
  }
  try {
    lookups.materialLookupsSafe = JSON.parse(JSON.stringify(lookups.materialLookups, safe));
    delete lookups.materialLookups;
  } catch (e) {
    lookups.materialLookupsError = String(e);
  }

  // also check top-level app._data.shared for a raw (pre-hydration) materials dict
  lookups.dataSharedKeys = app._data?.shared ? Object.keys(app._data.shared) : null;
  const rawMaterials = app._data?.shared?.materials;
  if (rawMaterials) {
    lookups.rawMaterialsKind = rawMaterials instanceof Map ? 'Map' : typeof rawMaterials;
    const rawIds =
      rawMaterials instanceof Map ? [...rawMaterials.keys()] : Object.keys(rawMaterials);
    lookups.rawMaterialIdsSample = rawIds.slice(0, 10);
    const rawLookups = ids.map((id) => [
      id,
      rawMaterials instanceof Map ? rawMaterials.get(id) : rawMaterials[id],
    ]);
    try {
      lookups.rawMaterialLookupsSafe = JSON.parse(JSON.stringify(rawLookups, safe));
    } catch (e) {
      lookups.rawMaterialLookupsError = String(e);
    }
  }

  return JSON.parse(
    JSON.stringify({ candidateKeys, dataKeys, lookups }, safe)
  );
});

console.log(JSON.stringify(dump, null, 2));
await browser.close();
