// Reads generated/materials-description.json (Spline's authoring-time
// layered material stacks) and emits src/generated/build-materials.js: one
// THREE.MeshPhysicalMaterial per shared material id, translated from the
// "color" + "light" layers. Layers Three.js has no clean equivalent for
// (matcap/texture/video -- they need actual image assets; rainbow only gets
// a rough iridescence approximation) are recorded in a per-material comment
// ledger rather than silently dropped.
import { readFileSync, writeFileSync, mkdirSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import prettier from 'prettier';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const materials = JSON.parse(
  readFileSync(join(root, 'generated', 'materials-description.json'), 'utf8')
);

function clamp(v, lo, hi) {
  return Math.min(hi, Math.max(lo, v));
}

function toHex({ r, g, b }) {
  const c = (v) => clamp(Math.round(v * 255), 0, 255);
  return (
    '0x' +
    [c(r), c(g), c(b)].map((v) => v.toString(16).padStart(2, '0')).join('')
  );
}

// Blinn-Phong shininess -> GGX roughness, used only when a "light" layer
// predates Spline's PBR fields (no explicit roughness/metalness present).
function shininessToRoughness(shininess) {
  const s = shininess ?? 30;
  return clamp(Math.sqrt(2 / (s + 2)), 0.05, 1);
}

function translateMaterial(id, mat) {
  const layers = (mat.layers ?? []).filter((l) => l.data?.visible !== false);
  const notes = [];

  const colorLayer = [...layers].reverse().find((l) => l.data.type === 'color');
  const lightLayer = layers.find((l) => l.data.type === 'light');
  const rainbowLayer = layers.find((l) => l.data.type === 'rainbow' && l.data.alpha > 0);
  const deferredLayers = layers.filter((l) => ['matcap', 'texture', 'video'].includes(l.data.type));

  const params = {};

  if (colorLayer) {
    params.color = toHex(colorLayer.data.color);
  } else {
    notes.push('no visible "color" layer -- left at MeshPhysicalMaterial default white');
  }

  if (lightLayer) {
    const d = lightLayer.data;
    if (typeof d.roughness === 'number') {
      params.roughness = clamp(d.roughness, 0, 1);
    } else {
      params.roughness = shininessToRoughness(d.shininess);
      notes.push(
        `"light" layer had no roughness field (category=${d.category}) -- derived from shininess=${d.shininess} via Blinn-Phong->GGX approximation (roughness=sqrt(2/(shininess+2)))`
      );
    }
    if (typeof d.metalness === 'number') {
      params.metalness = clamp(d.metalness, 0, 1);
    } else {
      params.metalness = 0;
      notes.push('"light" layer had no metalness field -- defaulted to 0 (assumed dielectric)');
    }
    if (typeof d.reflectivity === 'number') {
      if (d.reflectivity > 1 || d.reflectivity < 0) {
        notes.push(`reflectivity=${d.reflectivity} is outside Three.js's [0,1] range -- clamped`);
      }
      params.reflectivity = clamp(d.reflectivity, 0, 1);
    }
    if (d.emissive && (d.emissive.r || d.emissive.g || d.emissive.b)) {
      params.emissive = toHex(d.emissive);
    }
  } else {
    notes.push('no visible "light" layer -- material has no lighting response params set (unlit-looking base color only)');
  }

  if (rainbowLayer) {
    const d = rainbowLayer.data;
    params.iridescence = clamp(d.alpha, 0, 1);
    params.iridescenceIOR = 1.3;
    params.iridescenceThicknessRange = [100, Math.round(100 + (d.filmThickness ?? 0) * 20)];
    notes.push(
      `"rainbow" layer (filmThickness=${d.filmThickness}) approximated as iridescence=${params.iridescence.toFixed(2)}, iridescenceIOR=1.3 (fixed guess), iridescenceThicknessRange=[100, ${params.iridescenceThicknessRange[1]}] -- not a derived conversion, needs visual retuning`
    );
  }

  for (const l of deferredLayers) {
    notes.push(
      `"${l.data.type}" layer not translated -- needs an image asset (${JSON.stringify(l.data.texture?.image ?? l.data)}), deferred to the asset pipeline`
    );
  }

  const opacity = Math.min(colorLayer?.data.alpha ?? 1, lightLayer?.data.alphaOverride ?? 1);
  if (opacity < 1) {
    params.transparent = true;
    params.opacity = opacity;
  }

  return { name: mat.name, params, notes };
}

const entries = Object.entries(materials).map(([id, mat]) => [id, translateMaterial(id, mat)]);

const bodyLines = [];
for (const [id, { name, params, notes } ] of entries) {
  bodyLines.push(`  // ${JSON.stringify(id)} -- "${name}"`);
  for (const note of notes) bodyLines.push(`  // NOTE: ${note}`);
  const paramsSrc = JSON.stringify(params, (k, v) =>
    typeof v === 'string' && v.startsWith('0x') ? `__HEX__${v}` : v
  )
    .replace(/"__HEX__(0x[0-9a-f]+)"/g, '$1');
  bodyLines.push(`  materials[${JSON.stringify(id)}] = new THREE.MeshPhysicalMaterial(${paramsSrc});`);
  bodyLines.push('');
}

const source = `// GENERATED FILE -- do not hand-edit.
// Produced by scripts/generate-materials.mjs from
// generated/materials-description.json (itself produced by
// scripts/extract-materials.mjs resolving app._data.shared.materials).
//
// Each material's "color" + "light" layers translate to
// MeshPhysicalMaterial's color/roughness/metalness/reflectivity/emissive.
// "matcap"/"texture"/"video" layers need real image assets and are not
// translated here (see the NOTE comments per material and phase 3).
// "rainbow" layers get a rough iridescence approximation, also flagged --
// it is a guess, not a derived conversion, and may need visual retuning.
import * as THREE from 'three';

export function buildMaterials() {
  const materials = {};

${bodyLines.join('\n')}
  return materials;
}
`;

const formatted = await prettier.format(source, { parser: 'babel', singleQuote: true, printWidth: 100 });
mkdirSync(join(root, 'src', 'generated'), { recursive: true });
writeFileSync(join(root, 'src', 'generated', 'build-materials.js'), formatted);
console.log(`Wrote src/generated/build-materials.js (${entries.length} materials)`);
