// Reads generated/materials-description.json (Spline's authoring-time
// layered material stacks) and emits src/generated/build-materials.js: one
// material per shared material id, translated from the "color" + "light"
// layers into a THREE.MeshPhysicalMaterial, EXCEPT when a "matcap" layer
// resolves to an asset scripts/extract-scene.mjs actually extracted to
// public/textures/ (see generated/image-assets-manifest.json) -- those use
// a real THREE.MeshMatcapMaterial instead, since MeshPhysicalMaterial has
// no way to reproduce a matcap's lighting response. Layers Three.js has no
// clean equivalent for (texture/video -- procedural/triplanar projection,
// need real UV work; matcap when no asset was extracted; rainbow -- no
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
const imageAssetManifest = JSON.parse(
  readFileSync(join(root, 'generated', 'image-assets-manifest.json'), 'utf8')
);
const availableImageKeys = new Set(Object.keys(imageAssetManifest));

const entries = Object.entries(materials).map(([id, mat]) => [
  id,
  translateMaterial(mat, availableImageKeys),
]);

const bodyLines = [];
for (const [id, { name, materialType, params, notes }] of entries) {
  bodyLines.push(`  // ${JSON.stringify(id)} -- "${name}"`);
  for (const note of notes) bodyLines.push(`  // NOTE: ${note}`);

  if (materialType === 'MeshMatcapMaterial') {
    const filename = imageAssetManifest[params.matcapAssetKey].filename;
    bodyLines.push(
      `  materials[${JSON.stringify(id)}] = new THREE.MeshMatcapMaterial({ color: ${params.color}, matcap: textureLoader.load(${JSON.stringify('/textures/' + filename)}) });`
    );
  } else {
    const paramsSrc = JSON.stringify(params, (k, v) =>
      typeof v === 'string' && v.startsWith('0x') ? `__HEX__${v}` : v
    ).replace(/"__HEX__(0x[0-9a-f]+)"/g, '$1');
    bodyLines.push(`  materials[${JSON.stringify(id)}] = new THREE.MeshPhysicalMaterial(${paramsSrc});`);
  }
  bodyLines.push('');
}

const usesMatcap = entries.some(([, e]) => e.materialType === 'MeshMatcapMaterial');

const source = `// GENERATED FILE -- do not hand-edit.
// Produced by scripts/generate-materials.mjs from
// generated/materials-description.json (itself produced by
// scripts/extract-materials.mjs resolving app._data.shared.materials).
//
// Each material's "color" + "light" layers translate to
// MeshPhysicalMaterial's color/roughness/metalness/reflectivity/emissive,
// UNLESS a "matcap" layer resolved to an extracted asset in
// public/textures/ (see generated/image-assets-manifest.json), in which
// case a real THREE.MeshMatcapMaterial is used instead (MeshPhysicalMaterial
// can't reproduce a matcap's lighting response, and the other layers on
// that material -- color/light -- are dropped as inapplicable, not
// approximated; see the NOTE comments per material).
// "texture"/"video" layers need real image assets and are not translated
// here. "rainbow" layers are also not translated -- an earlier attempt
// mapped them to MeshPhysicalMaterial's iridescence as a guess, but once
// real geometry existed to see it on, that guess produced a strong, wrong
// blue sheen where the source renders plain matte black. Dropped rather
// than retuned; see scripts/lib/translate-material.mjs.
import * as THREE from 'three';
${usesMatcap ? "\nconst textureLoader = new THREE.TextureLoader();" : ''}

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
