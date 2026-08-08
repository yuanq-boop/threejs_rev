// Copies the WASM binaries @splinetool/runtime needs at load time (procedural
// modelling, boolean ops, navmesh, Skia/UI, plus Draco) out of node_modules
// and into public/wasm, so the app can point Application's `wasmPath` at a
// same-origin folder instead of fetching them from unpkg.com/gstatic.com.
import { copyFileSync, mkdirSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const outDir = join(root, 'public', 'wasm');
mkdirSync(outDir, { recursive: true });

const files = [
  ['@splinetool/modelling-wasm/build/process.wasm', 'process.wasm'],
  ['@splinetool/boolean-wasm/build/boolean.wasm', 'boolean.wasm'],
  ['@splinetool/navmesh-wasm/build/navmesh.wasm', 'navmesh.wasm'],
  ['@splinetool/ui-wasm/build/ui.wasm', 'ui.wasm'],
  ['three/examples/jsm/libs/draco/draco_wasm_wrapper.js', 'draco_wasm_wrapper.js'],
  ['three/examples/jsm/libs/draco/draco_decoder.js', 'draco_decoder.js'],
  ['three/examples/jsm/libs/draco/draco_decoder.wasm', 'draco_decoder.wasm'],
];

for (const [src, destName] of files) {
  copyFileSync(join(root, 'node_modules', src), join(outDir, destName));
}

console.log(`Copied ${files.length} wasm assets to public/wasm`);
