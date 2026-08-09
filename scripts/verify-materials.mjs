// Numeric ledger/diff for phase 2. Two things get checked, not one:
//
// 1. Codegen fidelity: does src/generated/build-materials.js (the actual
//    emitted file) construct THREE.MeshPhysicalMaterial instances whose
//    live property values match what scripts/lib/translate-material.mjs's
//    recipe says they should be? This catches codegen/serialization bugs
//    (e.g. a hex value accidentally emitted as a quoted string).
// 2. Translation fidelity: does the recipe's output plausibly correspond to
//    the source layer values (color channels, roughness, metalness, ...)?
//    This is reported as a human-readable ledger, not a pass/fail, because
//    some fields are intentionally approximated (shininess->roughness) or
//    intentionally left untranslated (rainbow, matcap, texture, video) and
//    are expected to differ from a naive reading of the source.
//
// Run after `npm run scene:codegen`. Exits non-zero if check #1 fails
// (a real bug); check #2's approximated fields are reported, not gated.
import { readFileSync, writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import * as THREE from 'three';

// build-materials.js may construct a THREE.TextureLoader for matcap
// materials (see generate-materials.mjs); TextureLoader -> ImageLoader
// calls document.createElementNS to build an <img>, which doesn't exist in
// plain Node. This script only needs the resulting Texture object to exist
// (to check e.g. .color), not the actual pixel data to load, so a minimal
// no-op stub is enough -- must be set up before importing build-materials.js
// triggers module-level THREE usage that could touch it indirectly, and
// before buildMaterials() is called below.
if (typeof globalThis.document === 'undefined') {
  const stubElement = () => ({
    style: {},
    addEventListener() {},
    removeEventListener() {},
    setAttribute() {},
  });
  globalThis.document = { createElement: stubElement, createElementNS: stubElement };
}

const { buildMaterials } = await import('../src/generated/build-materials.js');
const { translateMaterial } = await import('./lib/translate-material.mjs');

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const sourceMaterials = JSON.parse(
  readFileSync(join(root, 'generated', 'materials-description.json'), 'utf8')
);
const imageAssetManifest = JSON.parse(
  readFileSync(join(root, 'generated', 'image-assets-manifest.json'), 'utf8')
);
const availableImageKeys = new Set(Object.keys(imageAssetManifest));

const liveMaterials = buildMaterials();

const NUMERIC_FIELDS = ['roughness', 'metalness', 'reflectivity', 'iridescence', 'iridescenceIOR'];
const COLOR_FIELDS = ['color', 'emissive'];

function readLive(mat, field) {
  if (COLOR_FIELDS.includes(field)) {
    return mat[field] ? '0x' + mat[field].getHexString() : undefined;
  }
  if (field === 'iridescenceThicknessRange') {
    return mat.iridescenceThicknessRange ? [...mat.iridescenceThicknessRange] : undefined;
  }
  return mat[field];
}

let codegenMismatches = 0;
const rows = [];

for (const [id, mat] of Object.entries(sourceMaterials)) {
  const recipe = translateMaterial(mat, availableImageKeys);
  const live = liveMaterials[id];
  if (!live) {
    codegenMismatches++;
    rows.push({ id, name: mat.name, error: 'MISSING from build-materials.js output' });
    continue;
  }

  const fieldChecks = [];
  for (const field of [...COLOR_FIELDS, ...NUMERIC_FIELDS, 'iridescenceThicknessRange', 'transparent', 'opacity']) {
    if (!(field in recipe.params)) continue;
    const expected = recipe.params[field];
    const actual = readLive(live, field);
    const expectedStr = JSON.stringify(expected);
    const actualStr = JSON.stringify(actual);
    // MeshPhysicalMaterial.reflectivity round-trips through an internal ior
    // conversion (reflectivity -> ior -> reflectivity), which loses a few
    // bits of float precision even when codegen is correct -- compare
    // numeric fields with a tolerance instead of exact string equality.
    const match =
      typeof expected === 'number' && typeof actual === 'number'
        ? Math.abs(expected - actual) < 1e-6
        : expectedStr === actualStr;
    if (!match) codegenMismatches++;
    fieldChecks.push({ field, expected: expectedStr, actual: actualStr, match });
  }

  if (recipe.materialType === 'MeshMatcapMaterial') {
    const hasMatcapTexture = !!live.matcap;
    const isMatcapMaterial = live.type === 'MeshMatcapMaterial';
    if (!hasMatcapTexture) codegenMismatches++;
    if (!isMatcapMaterial) codegenMismatches++;
    fieldChecks.push({
      field: 'materialType',
      expected: 'MeshMatcapMaterial',
      actual: live.type,
      match: isMatcapMaterial,
    });
    fieldChecks.push({
      field: 'matcap texture present',
      expected: 'true',
      actual: String(hasMatcapTexture),
      match: hasMatcapTexture,
    });
  }

  // Human-readable source values for the ledger, independent of what got
  // translated -- lets a reader see the raw layer data next to the result.
  const src = {
    colorLayer: recipe.sourceLayers.colorLayer?.data.color,
    lightRoughness: recipe.sourceLayers.lightLayer?.data.roughness,
    lightMetalness: recipe.sourceLayers.lightLayer?.data.metalness,
    lightShininess: recipe.sourceLayers.lightLayer?.data.shininess,
    lightReflectivity: recipe.sourceLayers.lightLayer?.data.reflectivity,
    rainbowAlpha: recipe.sourceLayers.rainbowLayer?.data.alpha,
    rainbowFilmThickness: recipe.sourceLayers.rainbowLayer?.data.filmThickness,
    matcapAssetKey: recipe.params.matcapAssetKey,
  };

  rows.push({ id, name: mat.name, fieldChecks, notes: recipe.notes, src });
}

// --- Console summary ---
console.log(`Checked ${rows.length} materials, ${codegenMismatches} codegen mismatch(es).\n`);
for (const row of rows) {
  console.log(`${row.name} (${row.id})`);
  if (row.error) {
    console.log(`  ERROR: ${row.error}`);
    continue;
  }
  for (const c of row.fieldChecks) {
    console.log(`  ${c.match ? 'OK  ' : 'FAIL'} ${c.field}: recipe=${c.expected} live=${c.actual}`);
  }
  for (const n of row.notes) console.log(`  NOTE: ${n}`);
  console.log('');
}

// --- Markdown ledger (committed artifact, human-readable) ---
function fmtNum(v) {
  return v === undefined ? '—' : typeof v === 'number' ? v.toFixed(3) : String(v);
}

let md = `# Phase 2 materials ledger\n\n`;
md += `Generated by \`scripts/verify-materials.mjs\`. Two checks:\n\n`;
md += `1. **Codegen fidelity** -- does \`build-materials.js\`'s actual output match what \`translate-material.mjs\`'s recipe computed? (${codegenMismatches} mismatch(es) found)\n`;
md += `2. **Translation ledger** -- source layer values next to the translated result, so approximations are visible rather than hidden inside the generator.\n\n`;

for (const row of rows) {
  md += `## ${row.name} (\`${row.id}\`)\n\n`;
  if (row.error) {
    md += `**ERROR: ${row.error}**\n\n`;
    continue;
  }
  md += `| field | recipe value | live material value | match |\n|---|---|---|---|\n`;
  for (const c of row.fieldChecks) {
    md += `| ${c.field} | \`${c.expected}\` | \`${c.actual}\` | ${c.match ? '✅' : '❌'} |\n`;
  }
  md += `\n**Source layer values:**\n\n`;
  md += `| source field | value |\n|---|---|\n`;
  for (const [k, v] of Object.entries(row.src)) {
    if (v === undefined) continue;
    md += `| ${k} | ${typeof v === 'object' ? JSON.stringify(v) : fmtNum(v)} |\n`;
  }
  if (row.notes.length) {
    md += `\n**Notes (approximations/gaps):**\n\n`;
    for (const n of row.notes) md += `- ${n}\n`;
  }
  md += '\n';
}

writeFileSync(join(root, 'docs', 'phase2-materials-ledger.md'), md);
console.log('Wrote docs/phase2-materials-ledger.md');

if (codegenMismatches > 0) {
  console.error(`\n${codegenMismatches} codegen mismatch(es) -- build-materials.js does not match its own recipe.`);
  process.exit(1);
}
