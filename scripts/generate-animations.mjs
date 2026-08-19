// Copies generated/animations-description.json (ephemeral, gitignored, see
// scripts/extract-animations.mjs) into src/generated/animations-data.json
// (committed). Plain data, not source -- src/generated/animation-runtime.js
// (hand-written, not generated) is what actually interprets it at runtime.
// This split exists for the same reason generate-scene.mjs is separate from
// extract-scene.mjs: re-running the browser extraction is slow, re-copying
// its already-written output is not, and generated/ has to stay out of git
// while src/generated/ doesn't.
import { readFileSync, writeFileSync, mkdirSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const animations = JSON.parse(
  readFileSync(join(root, 'generated', 'animations-description.json'), 'utf8')
);

function round(n) {
  return Math.round(n * 1e6) / 1e6;
}
function roundPose(p) {
  if (!p) return p;
  return {
    position: p.position.map(round),
    rotation: p.rotation.map(round),
    scale: p.scale.map(round),
  };
}

const cleaned = animations.map((entry) => ({
  ...entry,
  restPose: roundPose(entry.restPose),
  transitions: entry.transitions.map((t) => ({
    tweens: t.tweens.map((tw) => ({ ...tw, targetPose: roundPose(tw.targetPose) })),
  })),
}));

mkdirSync(join(root, 'src', 'generated'), { recursive: true });
writeFileSync(join(root, 'src', 'generated', 'animations-data.json'), JSON.stringify(cleaned, null, 2));
console.log(`Wrote src/generated/animations-data.json (${cleaned.length} animated object entries)`);
