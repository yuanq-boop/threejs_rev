// Phase 4 verification harness: pixel diff + structural diff between the
// Spline-runtime reference render and the generated Three.js scene.
//
// Two things had to be discovered and worked around for this comparison to
// mean anything at all:
//
// 1. The reference scene is NOT static. Sampling app._camera.position and a
//    hand mesh's world position at increasing delays after load showed the
//    camera flies in and settles by ~2s, while the arm keeps moving even at
//    8s (a looping idle animation, no single "rest pose" exists). Every
//    phase 1-3 extraction implicitly used whatever moment its
//    waitForTimeout(300) landed on -- close to the scene's t=0 authored
//    base state, since 300ms is early enough that drift is still small (the
//    camera is within ~10 units of its t=0 position at t=300ms, vs. having
//    moved >600 units by t=2000ms). That's what's baked into
//    build-scene.js, so THIS script uses the same ~300ms timing for the
//    reference screenshot/structural read, to compare like with like rather
//    than accidentally diffing against a different animation frame. A
//    "pixel-perfect against the live reference" comparison isn't a
//    coherent goal to begin with when the reference keeps moving --
//    animation fidelity is phase 5's territory (not attempted), this phase
//    only claims to reproduce a snapshot near the base state.
//
// 2. Pixel diff needs both renders from the SAME camera to mean anything.
//    The reference app's camera can't be scripted to an arbitrary angle --
//    Spline's own render loop re-applies its transform every frame
//    regardless of what gets set on app._camera (confirmed directly:
//    setting position/lookAt and even disabling
//    _frameView.enableResponsive had no effect). So this only compares the
//    ONE camera state guaranteed comparable: the raw extracted "Camera 2"
//    transform near t=0, which generated.html?fit=0 reproduces (skipping
//    the auto-fit added for human preview). Multi-angle comparison, part
//    of the original phase 4 proposal, isn't achievable against the live
//    reference for the same reason -- noted as a limitation, not attempted.
import { chromium } from 'playwright';
import pixelmatch from 'pixelmatch';
import { PNG } from 'pngjs';
import { readFileSync, writeFileSync, mkdirSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const outDir = join(root, 'generated', 'verification');
mkdirSync(outDir, { recursive: true });

const VIEWPORT = { width: 1280, height: 800 };

const browser = await chromium.launch({ executablePath: '/opt/pw-browsers/chromium' });

// --- Screenshots ---
// Structural info is captured immediately after each screenshot, on the
// same page, before touching the other page at all -- the reference
// camera keeps drifting/settling over time (confirmed: reading its
// position after also loading the second page gave a completely different
// value than reading it right after the screenshot), so "screenshot now,
// query structural info minutes of wall-clock-equivalent-work later" would
// silently describe two different moments.
// 300ms, exactly matching scripts/extract-scene.mjs's wait -- see the
// header comment on why this specific timing matters here.
const REFERENCE_SETTLE_MS = 300;

const refPage = await browser.newPage({ viewport: VIEWPORT });
await refPage.goto('http://127.0.0.1:5173/', { waitUntil: 'load' });
await refPage.waitForFunction(() => window.__splineLoaded === true, { timeout: 20000 });
await refPage.waitForTimeout(REFERENCE_SETTLE_MS);
// Structural info FIRST, screenshot second -- measured directly in this
// environment, page.screenshot() alone can take several seconds (probably
// software/CPU rendering, no GPU), during which the reference's own
// requestAnimationFrame loop keeps advancing the idle animation. A trivial
// page.evaluate() is comparatively fast. Reading structural info first
// keeps it close to the intended ~300ms mark (matching what
// extract-scene.mjs's data walk captured); the screenshot taken
// immediately after may reflect a marginally later animation frame, which
// is an acceptable, documented slop for a "regression baseline" pixel
// diff, not a claim of exact frame alignment.
const refInfo = await structuralInfo(refPage, true);
await refPage.screenshot({ path: join(outDir, 'reference.png') });

const genPage = await browser.newPage({ viewport: VIEWPORT });
genPage.on('pageerror', (e) => console.error('[generated pageerror]', e));
await genPage.goto('http://127.0.0.1:5173/generated.html?fit=0', { waitUntil: 'load' });
await genPage.waitForFunction(() => window.__generatedReady === true, { timeout: 20000 });
await genPage.waitForTimeout(300);
await genPage.screenshot({ path: join(outDir, 'generated.png') });
const genInfo = await structuralInfo(genPage, false);

await browser.close();

// --- Pixel diff ---
const refPng = PNG.sync.read(readFileSync(join(outDir, 'reference.png')));
const genPng = PNG.sync.read(readFileSync(join(outDir, 'generated.png')));
const { width, height } = refPng;
const diffPng = new PNG({ width, height });
const diffPixelCount = pixelmatch(refPng.data, genPng.data, diffPng.data, width, height, {
  threshold: 0.1,
});
writeFileSync(join(outDir, 'diff.png'), PNG.sync.write(diffPng));
const totalPixels = width * height;
const diffPercent = (diffPixelCount / totalPixels) * 100;

// --- Structural diff ---
async function structuralInfo(page, isReference) {
  return page.evaluate((isReference) => {
    const scene = isReference ? window.__app._scene : window.__generatedScene;
    let meshCount = 0;
    let lightCount = 0;
    const lightTypes = {};
    scene.traverse((o) => {
      if (o.isMesh) meshCount++;
      if (o.isLight) {
        lightCount++;
        lightTypes[o.type] = (lightTypes[o.type] || 0) + 1;
      }
    });

    const camera = isReference ? window.__app._camera : window.__generatedCamera;

    let bot = null;
    function findBot(o) {
      if (o.name === 'Bot' && !bot) bot = o;
      (o.children || []).forEach(findBot);
    }
    findBot(scene);
    let botBounds = null;
    if (bot) {
      let minX = Infinity, minY = Infinity, minZ = Infinity;
      let maxX = -Infinity, maxY = -Infinity, maxZ = -Infinity;
      bot.traverse((o) => {
        if (o.isMesh) {
          const p = o.getWorldPosition(o.position.clone());
          minX = Math.min(minX, p.x); maxX = Math.max(maxX, p.x);
          minY = Math.min(minY, p.y); maxY = Math.max(maxY, p.y);
          minZ = Math.min(minZ, p.z); maxZ = Math.max(maxZ, p.z);
        }
      });
      botBounds = {
        size: [maxX - minX, maxY - minY, maxZ - minZ],
        center: [(minX + maxX) / 2, (minY + maxY) / 2, (minZ + maxZ) / 2],
      };
    }

    return {
      meshCount,
      lightCount,
      lightTypes,
      cameraFov: camera?.fov,
      cameraPosition: camera ? [camera.position.x, camera.position.y, camera.position.z] : null,
      botBounds,
    };
  }, isReference);
}

// --- Report ---
function fmtVec(v) {
  return v ? `[${v.map((n) => n.toFixed(2)).join(', ')}]` : 'n/a';
}

const structuralRows = [
  ['mesh count', refInfo.meshCount, genInfo.meshCount, refInfo.meshCount === genInfo.meshCount ? '✅' : '❌'],
  ['light count', refInfo.lightCount, genInfo.lightCount, refInfo.lightCount === genInfo.lightCount ? '✅' : '❌'],
  ['light types', JSON.stringify(refInfo.lightTypes), JSON.stringify(genInfo.lightTypes), JSON.stringify(refInfo.lightTypes) === JSON.stringify(genInfo.lightTypes) ? '✅' : '❌'],
  ['camera fov', refInfo.cameraFov, genInfo.cameraFov, refInfo.cameraFov === genInfo.cameraFov ? '✅' : '❌'],
  ['camera position', fmtVec(refInfo.cameraPosition), fmtVec(genInfo.cameraPosition), '—'],
  ['Bot bbox size', fmtVec(refInfo.botBounds?.size), fmtVec(genInfo.botBounds?.size), '—'],
  ['Bot bbox center', fmtVec(refInfo.botBounds?.center), fmtVec(genInfo.botBounds?.center), '—'],
];

let md = `# Phase 4 verification report\n\n`;
md += `Generated by \`scripts/verify-render.mjs\`. Screenshots/diff image are written to `;
md += `\`generated/verification/\` (gitignored, regenerate with \`node scripts/verify-render.mjs\`).\n\n`;

md += `## Pixel diff\n\n`;
md += `Both renders use the SAME raw extracted "Camera 2" transform (\`generated.html?fit=0\`) -- `;
md += `this is the only camera state guaranteed comparable between the two renderers, since Spline's `;
md += `own render loop re-applies its camera transform every frame and can't be scripted to an `;
md += `arbitrary angle for a multi-angle comparison (tried directly, had no effect).\n\n`;
md += `- Viewport: ${width}x${height} (${totalPixels} px)\n`;
md += `- Differing pixels: ${diffPixelCount} (${diffPercent.toFixed(2)}%)\n\n`;
md += `A nonzero score is expected, not a failure signal by itself -- known, already-documented gaps `;
md += `(no matcap/texture layers, approximate material/lighting calibration, unverified `;
md += `rectangle/ellipse corner conventions) all show up here. This number's value is as a `;
md += `**regression tracker**: rerun after future changes and compare against this baseline.\n\n`;

md += `## Structural diff\n\n`;
md += `| field | reference | generated | match |\n|---|---|---|---|\n`;
for (const [field, ref, gen, match] of structuralRows) {
  md += `| ${field} | \`${ref}\` | \`${gen}\` | ${match} |\n`;
}

md += `\n## Known limitations\n\n`;
md += `- **The reference scene is not static.** Sampling camera position and a hand mesh's world `;
md += `position at increasing delays after load shows the camera flies in and settles by ~2s, while `;
md += `the arm keeps moving even at 8s (a looping idle animation) -- there is no single "rest pose". `;
md += `Every phase 1-3 extraction implicitly captured whatever moment its \`waitForTimeout(300)\` `;
md += `landed on, close to the scene's t=0 authored base state. This script uses that same ~300ms `;
md += `timing so the comparison is apples-to-apples with what's actually baked into `;
md += `\`build-scene.js\`, rather than "pixel-perfect against the live reference," which isn't a `;
md += `coherent goal when the reference keeps moving. Animation fidelity is phase 5's territory `;
md += `(not attempted here).\n`;
md += `- **No multi-angle comparison.** Originally proposed in phase 3's plan, but the reference `;
md += `app's camera can't be moved by script -- Spline's render loop overrides it every frame `;
md += `regardless of \`_frameView.enableResponsive\` or direct \`position\`/\`lookAt\` calls. Only the `;
md += `single default camera angle is compared.\n`;
md += `- **Pixel diff includes known, already-flagged gaps** (materials ledger in `;
md += `\`docs/phase2-materials-ledger.md\`, shape-helper approximations in \`shape-helpers.js\`) -- `;
md += `it is not a fidelity score to drive toward zero, it's a baseline to catch new regressions.\n`;

writeFileSync(join(root, 'docs', 'phase4-verification-report.md'), md);
console.log(`Pixel diff: ${diffPixelCount}/${totalPixels} px (${diffPercent.toFixed(2)}%)`);
console.log('Structural diff:');
for (const [field, ref, gen, match] of structuralRows) {
  console.log(`  ${match} ${field}: ref=${ref} gen=${gen}`);
}
console.log('Wrote docs/phase4-verification-report.md');
console.log(`Screenshots/diff written to generated/verification/`);
