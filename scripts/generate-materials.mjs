// Reads generated/materials-description.json (Spline's authoring-time
// layered material stacks) and emits src/generated/build-materials.js: one
// THREE.MeshPhysicalMaterial per shared material id, translated from the
// "color" + "light" layers. Layers Three.js has no clean equivalent for
// (matcap/texture/video -- they need actual image assets; rainbow -- no
// principled mapping to Three's iridescence model, see
// scripts/lib/translate-material.mjs) are recorded in a per-material
// comment ledger rather than silently dropped.
import { readFileSync, writeFileSync, mkdirSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import prettier from 'prettier';
import { translateMaterial } from './lib/translate-material.mjs';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const materials = JSON.parse(
  readFileSync(join(root, 'generated', 'materials-description.json'), 'utf8')
);

const entries = Object.entries(materials).map(([id, mat]) => [id, translateMaterial(mat)]);

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
// "rainbow" layers are also not translated -- an earlier attempt mapped
// them to MeshPhysicalMaterial's iridescence as a guess, but once real
// geometry existed to see it on, that guess produced a strong, wrong blue
// sheen where the source renders plain matte black. Dropped rather than
// retuned; see scripts/lib/translate-material.mjs.
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
