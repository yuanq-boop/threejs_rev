import { chromium } from 'playwright';

const browser = await chromium.launch({ executablePath: '/opt/pw-browsers/chromium' });
const page = await browser.newPage({ viewport: { width: 1280, height: 800 } });
page.on('pageerror', (err) => console.log('[pageerror]', err));

await page.goto('http://127.0.0.1:5173/', { waitUntil: 'load' });
await page.waitForFunction(() => window.__splineLoaded === true, { timeout: 20000 });
await page.waitForTimeout(500);

const dump = await page.evaluate(() => {
  const app = window.__app;
  const scene = app._scene;

  function describeObject3D(obj, depth) {
    const entry = {
      depth,
      name: obj.name,
      type: obj.type,
      ctor: obj.constructor?.name,
      uuid: obj.uuid,
      position: obj.position && [obj.position.x, obj.position.y, obj.position.z],
      rotation: obj.rotation && [obj.rotation.x, obj.rotation.y, obj.rotation.z],
      scale: obj.scale && [obj.scale.x, obj.scale.y, obj.scale.z],
      visible: obj.visible,
      isMesh: obj.isMesh === true,
      isLight: obj.isLight === true,
      isCamera: obj.isCamera === true,
    };
    if (obj.isMesh) {
      entry.geometryType = obj.geometry?.type;
      entry.geometryCtor = obj.geometry?.constructor?.name;
      entry.geometryAttributes = obj.geometry
        ? Object.keys(obj.geometry.attributes || {})
        : undefined;
      const mats = Array.isArray(obj.material) ? obj.material : [obj.material];
      entry.materials = mats.map((m) => ({
        type: m?.type,
        ctor: m?.constructor?.name,
        isMeshStandardMaterial: m?.isMeshStandardMaterial === true,
        isShaderMaterial: m?.isShaderMaterial === true,
        isNodeMaterial: m?.isNodeMaterial === true,
        color: m?.color ? [m.color.r, m.color.g, m.color.b] : undefined,
        keys: m ? Object.keys(m) : undefined,
      }));
      entry.splineData = obj.data
        ? {
            type: obj.data.type,
            topLevelKeys: Object.keys(obj.data),
          }
        : undefined;
    }
    if (obj.isLight) {
      entry.lightColor = obj.color && [obj.color.r, obj.color.g, obj.color.b];
      entry.intensity = obj.intensity;
    }
    if (obj.isCamera) {
      entry.fov = obj.fov;
      entry.near = obj.near;
      entry.far = obj.far;
    }
    entry.children = (obj.children || []).map((c) => describeObject3D(c, depth + 1));
    return entry;
  }

  return {
    sceneType: scene?.type,
    sceneCtor: scene?.constructor?.name,
    childCount: scene?.children?.length,
    tree: describeObject3D(scene, 0),
    rendererInfo: app._renderer
      ? {
          ctor: app._renderer.constructor?.name,
        }
      : undefined,
  };
});

console.log(JSON.stringify(dump, null, 2));
await browser.close();
