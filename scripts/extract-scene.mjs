// Walks the live app._scene (built by @splinetool/runtime) and serializes a
// normalized description of hierarchy/transforms/cameras/lights/geometry,
// classifying each mesh's geometry as a translatable "primitive" (clean
// parametric fields on .data.geometry) or "deferred" (organic/subdivided/
// boolean geometry that phase 3 bakes to a glTF asset instead).
import { chromium } from 'playwright';
import { writeFileSync, mkdirSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const outDir = join(root, 'generated');
mkdirSync(outDir, { recursive: true });

const PRIMITIVE_GEOMETRY_TYPES = new Set(['CubeGeometry', 'CylinderGeometry']);

const browser = await chromium.launch({ executablePath: '/opt/pw-browsers/chromium' });
const page = await browser.newPage({ viewport: { width: 1280, height: 800 } });
page.on('pageerror', (err) => console.error('[pageerror]', err));

await page.goto('http://127.0.0.1:5173/', { waitUntil: 'load' });
await page.waitForFunction(() => window.__splineLoaded === true, { timeout: 20000 });
await page.waitForTimeout(300);

const description = await page.evaluate((primitiveTypesArr) => {
  const app = window.__app;
  const scene = app._scene;
  const primitiveTypes = new Set(primitiveTypesArr);

  function vec3(v) {
    return v ? [v.x, v.y, v.z] : [0, 0, 0];
  }

  // Cloner-generated instances (e.g. the ring of neck screws) share the same
  // compiled geometry.uuid/material.uuid as their authored template but have
  // no .data of their own. Build a geometry.uuid -> classification map from
  // whichever mesh DOES carry .data.geometry, then every mesh (template or
  // clone) looks itself up by geometry.uuid.
  const classificationByGeomUuid = new Map();

  function classifyFromData(dataGeom) {
    const type = dataGeom.type;
    if (type === 'CubeGeometry') {
      return {
        kind: 'box',
        width: dataGeom.width,
        height: dataGeom.height,
        depth: dataGeom.depth,
        widthSegments: dataGeom.widthSegments ?? 1,
        heightSegments: dataGeom.heightSegments ?? 1,
        depthSegments: dataGeom.depthSegments ?? 1,
        cornerRadius: dataGeom.cornerRadius ?? 0,
        cornerSegments: dataGeom.cornerSegments ?? 1,
      };
    }
    if (type === 'CylinderGeometry') {
      return {
        kind: 'cylinder',
        radiusTop: dataGeom.radiusTop,
        radiusBottom: dataGeom.radiusBottom,
        height: dataGeom.height,
        radialSegments: dataGeom.radialSegments ?? 12,
        heightSegments: dataGeom.heightSegments ?? 1,
        openEnded: !!dataGeom.openEnded,
        thetaStart: dataGeom.thetaStart ?? 0,
        thetaLength: dataGeom.thetaLength ?? 360,
        cornerRadius: dataGeom.cornerRadius ?? 0,
        cornerSegments: dataGeom.cornerSegments ?? 1,
        hollow: dataGeom.hollow ?? 0,
      };
    }
    return {
      kind: 'deferred',
      originalType: type,
      note: 'organic/vector/procedural geometry -- handled in phase 3 (glTF bake) or a later pass',
    };
  }

  // Pass 1: collect classifications from every mesh that has .data.geometry.
  (function collect(obj) {
    if (obj.isMesh && obj.data?.geometry && obj.geometry?.uuid) {
      if (!classificationByGeomUuid.has(obj.geometry.uuid)) {
        classificationByGeomUuid.set(obj.geometry.uuid, classifyFromData(obj.data.geometry));
      }
    }
    (obj.children || []).forEach(collect);
  })(scene);

  function classifyGeometry(obj) {
    const byUuid = obj.geometry?.uuid && classificationByGeomUuid.get(obj.geometry.uuid);
    if (byUuid) return byUuid;
    return {
      kind: 'deferred',
      originalType: obj.geometry?.type ?? 'Unknown',
      note: 'no .data.geometry on this mesh or any sibling sharing its geometry.uuid',
    };
  }

  function describe(obj) {
    const node = {
      name: obj.name || '',
      objectType: obj.isMesh
        ? 'Mesh'
        : obj.isLight
          ? 'Light'
          : obj.isCamera
            ? 'Camera'
            : obj.type === 'Scene'
              ? 'Scene'
              : 'Group',
      position: vec3(obj.position),
      rotation: obj.rotation ? [obj.rotation.x, obj.rotation.y, obj.rotation.z] : [0, 0, 0],
      scale: vec3(obj.scale),
      visible: obj.visible !== false,
    };

    if (obj.isCamera) {
      node.camera = {
        cameraType: obj.isOrthographicCamera ? 'OrthographicCamera' : 'PerspectiveCamera',
        fov: obj.fov,
        near: obj.near,
        far: obj.far,
      };
    }

    if (obj.isLight) {
      node.light = {
        lightType: obj.type,
        color: obj.color ? [obj.color.r, obj.color.g, obj.color.b] : [1, 1, 1],
        intensity: obj.intensity,
        distance: obj.distance,
        decay: obj.decay,
        angle: obj.angle,
        penumbra: obj.penumbra,
      };
    }

    if (obj.isMesh) {
      node.geometry = classifyGeometry(obj);
      // obj.material.uuid stays equal to the shared material's authoring
      // uuid even on clones that lack their own .data, so prefer it over
      // obj.data?.material.
      const mat = Array.isArray(obj.material) ? obj.material[0] : obj.material;
      node.materialId = mat?.uuid ?? obj.data?.material ?? null;
      node.castShadow = !!obj.castShadow;
      node.receiveShadow = !!obj.receiveShadow;
    }

    node.children = (obj.children || []).map(describe);
    return node;
  }

  const tree = describe(scene);

  function countGeomKinds(node, acc = {}) {
    if (node.geometry) acc[node.geometry.kind] = (acc[node.geometry.kind] || 0) + 1;
    (node.children || []).forEach((c) => countGeomKinds(c, acc));
    return acc;
  }

  return {
    tree,
    stats: countGeomKinds(tree),
  };
}, [...PRIMITIVE_GEOMETRY_TYPES]);

writeFileSync(join(outDir, 'scene-description.json'), JSON.stringify(description, null, 2));
console.log('Geometry kind counts:', description.stats);
console.log('Wrote generated/scene-description.json');

await browser.close();
