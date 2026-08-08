// Reads generated/scene-description.json (written by extract-scene.mjs) and
// emits src/generated/build-scene.js: a plain Three.js module that
// constructs the phase-1 subset of the scene (hierarchy, cameras, lights,
// primitive Box/Cylinder geometry) with `new THREE.XGeometry(...)` calls --
// the actual "as if a human wrote it" deliverable, not a data dump.
import { readFileSync, writeFileSync, mkdirSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import prettier from 'prettier';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const description = JSON.parse(readFileSync(join(root, 'generated', 'scene-description.json'), 'utf8'));

const usedIdents = new Set();
function uniqueIdent(preferred) {
  let base = preferred
    .replace(/[^a-zA-Z0-9_]+/g, '_')
    .replace(/^[0-9]/, '_$&')
    .replace(/^_+|_+$/g, '');
  if (!base) base = 'node';
  let ident = base;
  let suffix = 2;
  while (usedIdents.has(ident)) {
    ident = `${base}_${suffix}`;
    suffix++;
  }
  usedIdents.add(ident);
  return ident;
}

function fmtNum(n) {
  if (Number.isInteger(n)) return String(n);
  return Number(n.toFixed(6)).toString();
}

function fmtVec3Set(varName, [x, y, z]) {
  return `${varName}.set(${fmtNum(x)}, ${fmtNum(y)}, ${fmtNum(z)});`;
}

// --- Geometry dedup: identical Box/Cylinder params (e.g. the ring of neck
// screws, all sharing one geometry) become a single shared `const` reused by
// every THREE.Mesh, matching how a human would avoid duplicating geometry.
const geometryVars = new Map(); // signature -> { ident, lines }
function geometrySignature(geom) {
  return JSON.stringify(geom);
}

function emitGeometry(geom) {
  const sig = geometrySignature(geom);
  if (geometryVars.has(sig)) return geometryVars.get(sig).ident;

  let ident;
  let ctorLine;
  if (geom.kind === 'box') {
    ident = uniqueIdent('boxGeometry');
    ctorLine = `new THREE.BoxGeometry(${fmtNum(geom.width)}, ${fmtNum(geom.height)}, ${fmtNum(geom.depth)}, ${geom.widthSegments}, ${geom.heightSegments}, ${geom.depthSegments})`;
    if (geom.cornerRadius) {
      ctorLine += ` /* cornerRadius=${fmtNum(geom.cornerRadius)} not represented -- THREE.BoxGeometry has sharp edges, see phase notes */`;
    }
  } else if (geom.kind === 'cylinder') {
    ident = uniqueIdent('cylinderGeometry');
    const thetaStartRad = (geom.thetaStart * Math.PI) / 180;
    const thetaLengthRad = (geom.thetaLength * Math.PI) / 180;
    ctorLine = `new THREE.CylinderGeometry(${fmtNum(geom.radiusTop)}, ${fmtNum(geom.radiusBottom)}, ${fmtNum(geom.height)}, ${geom.radialSegments}, ${geom.heightSegments}, ${geom.openEnded}, ${fmtNum(thetaStartRad)}, ${fmtNum(thetaLengthRad)})`;
    if (geom.cornerRadius || geom.hollow) {
      ctorLine += ` /* cornerRadius=${fmtNum(geom.cornerRadius)}, hollow=${fmtNum(geom.hollow)} not represented, see phase notes */`;
    }
  } else {
    return null;
  }

  const lines = [`const ${ident} = ${ctorLine};`];
  geometryVars.set(sig, { ident, lines });
  return ident;
}

// --- Materials: phase 1 placeholder only (phase 2 resolves the real layer
// stack). One shared placeholder per materialId so the structure already
// matches what phase 2 will slot real definitions into.
const materialVars = new Map(); // materialId -> ident
function emitMaterial(materialId) {
  if (!materialId) return null;
  if (materialVars.has(materialId)) return materialVars.get(materialId);
  const ident = uniqueIdent(`material_${materialId.slice(0, 8)}`);
  materialVars.set(materialId, ident);
  return ident;
}

const preludeLines = [];
const bodyLines = [];
const cameraRefs = [];
const lightRefs = [];
let deferredCount = 0;

function emitLight(node, ident) {
  const l = node.light;
  const typeMap = {
    PointLight: 'PointLight',
    DirectionalLight: 'DirectionalLight',
    SpotLight: 'SpotLight',
    AmbientLight: 'AmbientLight',
    HemisphereLight: 'HemisphereLight',
  };
  const ctor = typeMap[l.lightType] ?? 'PointLight';
  const [r, g, b] = l.color;
  const colorHex = `0x${Math.round(r * 255).toString(16).padStart(2, '0')}${Math.round(g * 255)
    .toString(16)
    .padStart(2, '0')}${Math.round(b * 255).toString(16).padStart(2, '0')}`;
  bodyLines.push(`const ${ident} = new THREE.${ctor}(${colorHex}, ${fmtNum(l.intensity ?? 1)});`);
  lightRefs.push({ name: node.name, ident });
}

function emitCamera(node, ident) {
  const c = node.camera;
  if (c.cameraType === 'OrthographicCamera') {
    bodyLines.push(
      `const ${ident} = new THREE.OrthographicCamera(-1, 1, 1, -1, ${fmtNum(c.near)}, ${fmtNum(c.far)}); // frustum set by caller based on viewport`
    );
  } else {
    bodyLines.push(
      `const ${ident} = new THREE.PerspectiveCamera(${fmtNum(c.fov)}, 1, ${fmtNum(c.near)}, ${fmtNum(c.far)}); // aspect set by caller based on viewport`
    );
  }
  cameraRefs.push({ name: node.name, ident });
}

function walk(node, parentIdent) {
  let ident;

  if (node.objectType === 'Camera') {
    ident = uniqueIdent(node.name || 'camera');
    emitCamera(node, ident);
  } else if (node.objectType === 'Light') {
    ident = uniqueIdent(node.name || 'light');
    emitLight(node, ident);
  } else if (node.objectType === 'Mesh') {
    const geomIdent = emitGeometry(node.geometry);
    if (!geomIdent) {
      deferredCount++;
      // No geometry representation yet (phase 3 territory), but this node
      // may still have real children (e.g. "Body" carries the arm/hand
      // groups) -- keep it as a transform-only Group so the hierarchy below
      // it isn't silently dropped.
      ident = uniqueIdent(node.name || 'mesh');
      bodyLines.push(
        `// TODO(phase 3): "${node.name || '(unnamed)'}" used ${node.geometry.originalType} geometry (${node.geometry.note}); standing in with an empty Group so its children still attach correctly.`
      );
      bodyLines.push(`const ${ident} = new THREE.Group();`);
    } else {
      const matIdent = emitMaterial(node.materialId);
      ident = uniqueIdent(node.name || 'mesh');
      bodyLines.push(`const ${ident} = new THREE.Mesh(${geomIdent}, ${matIdent ?? 'placeholderMaterial'});`);
    }
  } else {
    // Scene / Group / Object3D -> THREE.Group
    ident = uniqueIdent(node.name || (node.objectType === 'Scene' ? 'scene' : 'group'));
    bodyLines.push(`const ${ident} = new THREE.Group();`);
    if (node.name) bodyLines.push(`${ident}.name = ${JSON.stringify(node.name)};`);
  }

  if (node.position && node.position.some((v) => v !== 0)) {
    bodyLines.push(fmtVec3Set(`${ident}.position`, node.position));
  }
  if (node.rotation && node.rotation.some((v) => v !== 0)) {
    bodyLines.push(fmtVec3Set(`${ident}.rotation`, node.rotation));
  }
  if (node.scale && node.scale.some((v) => v !== 1)) {
    bodyLines.push(fmtVec3Set(`${ident}.scale`, node.scale));
  }
  if (node.visible === false) {
    bodyLines.push(`${ident}.visible = false;`);
  }
  if (node.castShadow) bodyLines.push(`${ident}.castShadow = true;`);
  if (node.receiveShadow) bodyLines.push(`${ident}.receiveShadow = true;`);

  if (parentIdent) {
    bodyLines.push(`${parentIdent}.add(${ident});`);
  }
  bodyLines.push('');

  for (const child of node.children ?? []) {
    walk(child, ident);
  }

  return ident;
}

// Skip the outer Spline wrapper Scene -> its single "Scene 1" child holds
// everything; that becomes the THREE.Group this module returns.
const wrapper = description.tree;
const inner = wrapper.children?.[0] ?? wrapper;
bodyLines.push('const root = new THREE.Group();');
bodyLines.push(`root.name = ${JSON.stringify(inner.name || 'root')};`);
bodyLines.push('');
for (const child of inner.children ?? []) {
  walk(child, 'root');
}

for (const [, ident] of materialVars) {
  preludeLines.push(
    `const ${ident} = new THREE.MeshStandardMaterial({ color: 0x999999 }); // placeholder -- phase 2 resolves the real layered material`
  );
}

const geometryDeclLines = [...geometryVars.values()].flatMap((g) => g.lines);

const source = `// GENERATED FILE -- do not hand-edit.
// Produced by scripts/generate-scene.mjs from generated/scene-description.json
// (itself produced by scripts/extract-scene.mjs walking the live
// @splinetool/runtime scene graph for public/scene.splinecode).
//
// Phase 1 scope: hierarchy, transforms, cameras, lights, and primitive
// Box/Cylinder geometry. Meshes using organic/subdivided/vector geometry are
// left as TODO comments (${deferredCount} of them) -- phase 3 bakes those to
// glTF assets. Materials are gray placeholders -- phase 2 resolves the real
// layered material stack per shared material id.
import * as THREE from 'three';

export function buildScene() {
${geometryDeclLines.map((l) => '  ' + l).join('\n')}

${preludeLines.map((l) => '  ' + l).join('\n')}

${bodyLines.map((l) => '  ' + l).join('\n')}

  const cameras = {${cameraRefs.map((c) => `${JSON.stringify(c.name)}: ${c.ident}`).join(', ')}};
  const lights = {${lightRefs.map((l) => `${JSON.stringify(l.name)}: ${l.ident}`).join(', ')}};

  return { root, cameras, lights };
}
`;

const formatted = await prettier.format(source, { parser: 'babel', singleQuote: true, printWidth: 100 });

mkdirSync(join(root, 'src', 'generated'), { recursive: true });
writeFileSync(join(root, 'src', 'generated', 'build-scene.js'), formatted);
console.log(`Wrote src/generated/build-scene.js (${deferredCount} deferred meshes, ${geometryVars.size} shared geometries, ${materialVars.size} shared materials)`);
