// Dev-only tool (not part of the generated app): loads the Spline scene via
// @splinetool/runtime, harvests the already wasm-computed BufferGeometry off
// every SubdivGeometry/VectorGeometry mesh, plus any CylinderGeometry mesh
// using cornerRadius/hollow rounding (their radiusTop/radiusBottom aren't
// literal units in that case and no reliable conversion formula was found --
// see the comment in scripts/extract-scene.mjs), deduped by geometry.uuid so
// mirrored left/right body parts aren't exported twice. Rebuilds each as a
// plain THREE.BufferGeometry using OUR OWN three.js install (not the copy
// bundled inside @splinetool/runtime), and exports the lot as one binary
// glTF via GLTFExporter. scripts/extract-scene.mjs drives this page with
// Playwright and writes the result to public/models/body.glb.
import { Application } from '@splinetool/runtime';
import * as THREE from 'three';
import { GLTFExporter } from 'three/addons/exporters/GLTFExporter.js';

const ALWAYS_BAKED_TYPES = new Set(['SubdivGeometry', 'VectorGeometry']);

// Must match extract-scene.mjs's classifyFromData CylinderGeometry branch --
// both decide "bake vs procedural" from the same cornerRadius/hollow check,
// duplicated because one runs here (a real ES module) and the other inside
// a page.evaluate() callback (must be a self-contained function, can't
// import this file).
function shouldBakeMesh(obj) {
  const g = obj.data?.geometry;
  if (!g) return false;
  if (ALWAYS_BAKED_TYPES.has(g.type)) return true;
  if (g.type === 'CylinderGeometry') return !!(g.cornerRadius || g.hollow);
  return false;
}

// Exposed so scripts/extract-scene.mjs's page.evaluate can do matrix math
// (THREE.Matrix4 multiply/decompose) without reimplementing it by hand.
window.THREE = THREE;

const canvas = document.createElement('canvas');
const app = new Application(canvas, { wasmPath: '/wasm' });
// Exposed so scripts/extract-scene.mjs can run its scene-graph walk against
// this SAME page/app instance -- geometry.uuid is randomly regenerated on
// every Application load, so extraction and baking only agree on uuids if
// they read from one shared load, not two independent page.goto()s.
window.__app = app;

// Extracts embedded matcap images so materials can use a real
// THREE.MeshMatcapMaterial instead of leaving the layer untranslated. Both
// forms exist in this file: a matcap layer's texture.image is either a
// string key into app._data.shared.images (e.g. Spline's built-in
// "matcap_roughness_3" preset -- confirmed embedded in the file itself, not
// fetched from a CDN: no network request for it shows up during load), or
// an object with the image bytes inline right on the layer (e.g. the Head
// material's custom "CHROME.png"). Keyed the same way
// scripts/lib/translate-material.mjs derives the key from
// materials-description.json, so the two stay in sync without needing a
// separate id-mapping file.
function bytesToBase64(bytes) {
  let binary = '';
  for (let i = 0; i < bytes.length; i++) binary += String.fromCharCode(bytes[i]);
  return btoa(binary);
}
function extFromMagicBytes(bytes) {
  if (bytes[0] === 0xff && bytes[1] === 0xd8) return 'jpg';
  if (bytes[0] === 0x89 && bytes[1] === 0x50) return 'png';
  return 'bin';
}
function extractMatcapImageAssets(app) {
  const sharedImages = app._data?.shared?.images ?? {};
  const materials = app._data?.shared?.materials ?? {};
  const assets = {};
  for (const mat of Object.values(materials)) {
    for (const layer of mat.layers ?? []) {
      if (layer.data?.type !== 'matcap' || layer.data?.visible === false) continue;
      const imageRef = layer.data.texture?.image;
      let key, entry;
      if (typeof imageRef === 'string') {
        key = imageRef;
        entry = sharedImages[imageRef];
      } else if (imageRef?.data) {
        key = imageRef.name || 'inline-matcap';
        entry = imageRef;
      }
      if (!key || !entry?.data || assets[key]) continue;
      assets[key] = {
        name: entry.name,
        base64: bytesToBase64(entry.data),
        ext: extFromMagicBytes(entry.data),
      };
    }
  }
  return assets;
}

app
  .load('/scene.splinecode')
  .then(async () => {
    window.__splineLoaded = true;
    window.__imageAssets = extractMatcapImageAssets(app);
    const seen = new Map(); // geometry.uuid -> { mesh, sourceNames: [] }

    function walk(obj) {
      if (obj.isMesh && shouldBakeMesh(obj) && obj.geometry?.uuid) {
        const uuid = obj.geometry.uuid;
        if (!seen.has(uuid)) {
          seen.set(uuid, { liveGeometry: obj.geometry, originalType: obj.data.geometry.type, sourceNames: [] });
        }
        seen.get(uuid).sourceNames.push(obj.name || '(unnamed)');
      }
      (obj.children || []).forEach(walk);
    }
    walk(app._scene);

    const exportGroup = new THREE.Group();
    const manifest = [];

    for (const [uuid, { liveGeometry, originalType, sourceNames }] of seen) {
      const geom = new THREE.BufferGeometry();
      for (const attrName of ['position', 'normal', 'uv']) {
        const attr = liveGeometry.attributes[attrName];
        if (!attr) continue;
        geom.setAttribute(attrName, new THREE.BufferAttribute(Float32Array.from(attr.array), attr.itemSize));
      }
      if (liveGeometry.index) {
        geom.setIndex(new THREE.BufferAttribute(Uint32Array.from(liveGeometry.index.array), 1));
      }
      if (!geom.attributes.normal) geom.computeVertexNormals();

      const mesh = new THREE.Mesh(geom, new THREE.MeshBasicMaterial());
      mesh.name = uuid;
      exportGroup.add(mesh);

      manifest.push({
        geometryUuid: uuid,
        originalType,
        sourceNames,
        vertexCount: geom.attributes.position.count,
        indexCount: geom.index ? geom.index.count : null,
      });
    }

    const exporter = new GLTFExporter();
    exporter.parse(
      exportGroup,
      (result) => {
        // binary:true makes result an ArrayBuffer (.glb)
        const bytes = new Uint8Array(result);
        let binary = '';
        for (let i = 0; i < bytes.length; i++) binary += String.fromCharCode(bytes[i]);
        window.__bakedGLBBase64 = btoa(binary);
        window.__bakeManifest = manifest;
        window.__bakeReady = true;
      },
      (err) => {
        window.__bakeError = String(err);
        window.__bakeReady = true;
      },
      { binary: true }
    );
  })
  .catch((err) => {
    window.__bakeError = String(err);
    window.__bakeReady = true;
  });
