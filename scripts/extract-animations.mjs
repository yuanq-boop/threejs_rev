// Walks the live app._scene the same way extract-scene.mjs does, but pulls
// out interaction/animation data instead of geometry: every object's
// obj.data.states (named target poses authored in the Spline editor) and
// obj.data.events (things that happen on "Start" of the scene, or
// continuously for "LookAt" cursor-tracking). Writes
// generated/animations-description.json, an array in scene-graph DFS order
// (so scripts/generate-animations.mjs / the runtime can re-associate entries
// with same-named live objects positionally -- see the big comment in
// src/generated/animation-runtime.js for why that's necessary).
//
// Loads /bake.html like extract-scene.mjs, though sharing that page session
// isn't required here (nothing here reads a randomly-regenerated uuid) --
// reusing the same harness just avoids a second Playwright launch.
import { chromium } from 'playwright';
import { writeFileSync, mkdirSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const outDir = join(root, 'generated');
mkdirSync(outDir, { recursive: true });

const browser = await chromium.launch({ executablePath: '/opt/pw-browsers/chromium' });
const page = await browser.newPage({ viewport: { width: 1280, height: 800 } });
page.on('pageerror', (err) => console.error('[pageerror]', err));

await page.goto('http://127.0.0.1:5173/bake.html', { waitUntil: 'load' });
await page.waitForFunction(() => window.__splineLoaded === true, { timeout: 20000 });
await page.waitForTimeout(300);

const animations = await page.evaluate(() => {
  const app = window.__app;
  const scene = app._scene;
  const THREE = window.THREE;

  // A captured target State's position/scale are in the same local units as
  // a live object's own .position/.scale, but its rotation is authored in
  // DEGREES (Spline's raw editor format) where a live Object3D's .rotation
  // is already-converted radians -- and, same as any live object, a State
  // can carry its own hiddenMatrix rig offset (see extract-scene.mjs's
  // effectiveTRS comment). Composing hidden * localTRS the same way here is
  // what makes a State's resulting position/rotation/scale directly
  // comparable to -- interpolatable with -- the rest pose extract-scene.mjs
  // already wrote to scene-description.json.
  function poseFromStateData(d) {
    const pos = new THREE.Vector3(...(d.position ?? [0, 0, 0]));
    const rotDeg = d.rotation ?? [0, 0, 0];
    const euler = new THREE.Euler(
      THREE.MathUtils.degToRad(rotDeg[0]),
      THREE.MathUtils.degToRad(rotDeg[1]),
      THREE.MathUtils.degToRad(rotDeg[2]),
      'XYZ'
    );
    const quat = new THREE.Quaternion().setFromEuler(euler);
    const scl = new THREE.Vector3(...(d.scale ?? [1, 1, 1]));
    const local = new THREE.Matrix4().compose(pos, quat, scl);
    const hiddenArr = d.hiddenMatrix;
    const effective = hiddenArr ? new THREE.Matrix4().fromArray(hiddenArr).multiply(local) : local;
    const outPos = new THREE.Vector3();
    const outQuat = new THREE.Quaternion();
    const outScl = new THREE.Vector3();
    effective.decompose(outPos, outQuat, outScl);
    const outEuler = new THREE.Euler().setFromQuaternion(outQuat, 'XYZ');
    return {
      position: [outPos.x, outPos.y, outPos.z],
      rotation: [outEuler.x, outEuler.y, outEuler.z],
      scale: [outScl.x, outScl.y, outScl.z],
    };
  }

  // Duplicated from extract-scene.mjs (can't import a page.evaluate
  // callback) -- same hiddenMatrix composition, applied to the LIVE object
  // this time instead of a State snapshot, so the two are expressed in the
  // same coordinate convention.
  function effectiveTRS(obj) {
    const hiddenMatrixArr = obj.data?.hiddenMatrix;
    if (!hiddenMatrixArr) {
      return {
        position: [obj.position.x, obj.position.y, obj.position.z],
        rotation: [obj.rotation.x, obj.rotation.y, obj.rotation.z],
        scale: [obj.scale.x, obj.scale.y, obj.scale.z],
      };
    }
    const hidden = new THREE.Matrix4().fromArray(hiddenMatrixArr);
    const effective = hidden.multiply(obj.matrix);
    const pos = new THREE.Vector3();
    const quat = new THREE.Quaternion();
    const scl = new THREE.Vector3();
    effective.decompose(pos, quat, scl);
    const euler = new THREE.Euler().setFromQuaternion(quat, 'XYZ');
    return {
      position: [pos.x, pos.y, pos.z],
      rotation: [euler.x, euler.y, euler.z],
      scale: [scl.x, scl.y, scl.z],
    };
  }

  function stateById(states, id) {
    const s = (states ?? []).find((s) => s.id === id);
    return s ? poseFromStateData(s.data) : null;
  }

  const entries = [];

  function walk(obj) {
    const d = obj.data;
    if (d) {
      const states = d.states ?? [];
      const events = d.events ?? [];

      // "Transition" actions fired by a "Start" event: interpolate the
      // object's TRS through one or more tweens. Other action types on a
      // Start event (e.g. "Video" autoplay, seen on the Head 2 material)
      // aren't motion and aren't captured here.
      const transitions = [];
      for (const ev of events.filter((e) => e.data.type === 'Start')) {
        for (const action of ev.data.actions ?? []) {
          if (action.data.type !== 'Transition') continue;
          const tweens = (action.data.tweens ?? []).map((t) => ({
            // A tween with no "state" field doesn't name an explicit target
            // -- see docs/phase5-animation-notes.md for how the runtime
            // interprets this (not fully documented by Spline).
            targetPose: t.data.state ? stateById(states, t.data.state) : null,
            repeat: t.data.repeat ?? 0,
            delay: t.data.delay ?? 0,
            delayDirection: t.data.delayDirection ?? 'start-once',
            direction: t.data.direction ?? 'normal',
            duration: t.data.duration ?? 0,
            easing: t.data.easing ?? 0,
          }));
          if (tweens.length) transitions.push({ tweens });
        }
      }

      const lookAtEvent = events.find((e) => e.data.type === 'LookAt');
      const lookAt = lookAtEvent
        ? {
            dampingFactor: lookAtEvent.data.dampingFactor ?? 10,
            distance: lookAtEvent.data.distance ?? 1000,
            limitDistanceEnabled: !!lookAtEvent.data.limitDistanceEnabled,
            limitDistance: lookAtEvent.data.limitDistance ?? 1000,
            resetOnPointerLeave: !!lookAtEvent.data.resetOnPointerLeave,
            resetSpeed: lookAtEvent.data.resetSpeed ?? 5,
            axis: lookAtEvent.data.axis ?? 'z',
            enabledRotation: lookAtEvent.data.enabledRotation ?? [true, true, true],
          }
        : null;

      if (transitions.length || lookAt) {
        entries.push({
          name: obj.name || '',
          objectType: obj.isCamera ? 'Camera' : obj.isMesh ? 'Mesh' : 'Group',
          restPose: effectiveTRS(obj),
          transitions,
          lookAt,
        });
      }
    }
    (obj.children || []).forEach(walk);
  }
  walk(scene);

  return entries;
});

writeFileSync(join(outDir, 'animations-description.json'), JSON.stringify(animations, null, 2));
console.log(
  `Found ${animations.length} animated object(s):`,
  animations.map((a) => `${a.name} (${a.transitions.length ? 'transition' : ''}${a.transitions.length && a.lookAt ? '+' : ''}${a.lookAt ? 'lookAt' : ''})`)
);
console.log('Wrote generated/animations-description.json');

await browser.close();
