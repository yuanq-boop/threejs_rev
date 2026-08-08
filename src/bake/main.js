// Dev-only tool (not part of the generated app): loads the Spline scene via
// @splinetool/runtime, harvests the already wasm-computed BufferGeometry off
// every SubdivGeometry/VectorGeometry mesh (deduped by geometry.uuid so
// mirrored left/right body parts aren't exported twice), rebuilds each as a
// plain THREE.BufferGeometry using OUR OWN three.js install (not the copy
// bundled inside @splinetool/runtime), and exports the lot as one binary
// glTF via GLTFExporter. scripts/extract-scene.mjs drives this page with
// Playwright and writes the result to public/models/body.glb.
import { Application } from '@splinetool/runtime';
import * as THREE from 'three';
import { GLTFExporter } from 'three/addons/exporters/GLTFExporter.js';

const BAKED_TYPES = new Set(['SubdivGeometry', 'VectorGeometry']);

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

app
  .load('/scene.splinecode')
  .then(async () => {
    window.__splineLoaded = true;
    const seen = new Map(); // geometry.uuid -> { mesh, sourceNames: [] }

    function walk(obj) {
      if (obj.isMesh && BAKED_TYPES.has(obj.data?.geometry?.type) && obj.geometry?.uuid) {
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
