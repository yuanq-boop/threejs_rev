// Hand-written runtime for src/generated/animations-data.json (produced by
// scripts/extract-animations.mjs + scripts/generate-animations.mjs).
// Interprets Spline's event/state/tween interaction model. See
// docs/phase5-animation-notes.md for which parts of this are read directly
// from exported data (exact) vs. inferred because Spline doesn't publish
// the format (approximated, and said so below at the point it matters).
//
// Positional name-matching: Spline reuses identical names for mirrored
// left/right body parts (two separate objects both named "arm", etc.), so
// getObjectByName() can't disambiguate them. animations-data.json is
// written in the same depth-first order build-scene.js constructs the live
// hierarchy in (both walk the same source tree), so the Nth animation entry
// for a given name is paired with the Nth live object of that name found by
// root.traverse() -- no uuid or extra id plumbing needed through codegen.
import * as THREE from 'three';
import animationsData from './animations-data.json';

function poseToQuat(pose) {
  return new THREE.Quaternion().setFromEuler(
    new THREE.Euler(pose.rotation[0], pose.rotation[1], pose.rotation[2], 'XYZ')
  );
}

function lerp3(a, b, f) {
  return [THREE.MathUtils.lerp(a[0], b[0], f), THREE.MathUtils.lerp(a[1], b[1], f), THREE.MathUtils.lerp(a[2], b[2], f)];
}

// Spline's numeric "easing" id (4 on every arm/hand tween, 5 on the camera's
// second tween) isn't exposed as a name or curve anywhere the live runtime
// lets a script read it, and there's no public table mapping id -> curve
// shape. Rather than guess a per-id mapping, every tween uses this one
// standard smooth ease -- an approximation, not a translation.
function ease(t) {
  return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2; // easeInOutCubic
}

function samplePose(poseA, quatA, poseB, quatB, f) {
  return {
    position: lerp3(poseA.position, poseB.position, f),
    scale: lerp3(poseA.scale, poseB.scale, f),
    quat: new THREE.Quaternion().copy(quatA).slerp(quatB, f),
  };
}

function applyPose(object, sampled) {
  object.position.set(...sampled.position);
  object.quaternion.copy(sampled.quat);
  object.scale.set(...sampled.scale);
}

// One authored "Transition" action produced two tweens for every animated
// body part in this scene, and only one of a pair is unambiguous: the tween
// that names an explicit target "state" -- ease from the rest pose to that
// state, once, after its own delay. The OTHER tween (repeat:-1, direction
// "pingpong-rewind", no explicit state) is what's producing the ongoing
// idle sway visible in the reference scene, but it has no target of its own
// in the exported data, so its exact chaining semantics aren't derivable
// (Spline doesn't document this format). Approximated as: once the
// move-to-target tween finishes, pingpong between the rest pose and the
// target pose using the sway tween's OWN duration/delay -- a
// "delayDirection: end" pause after each swing, "pingpong-rewind" read as a
// back-and-forth motion. This reproduces the visually-verified behavior
// (settle into a bent pose, then gently sway) without claiming to know
// Spline's exact tween-chaining rules.
class TransitionAnimator {
  constructor(object, restPose, transition) {
    this.object = object;
    this.restPose = restPose;
    this.restQuat = poseToQuat(restPose);

    const moveTween = transition.tweens.find((t) => t.targetPose);
    const swayTween = transition.tweens.find((t) => !t.targetPose && t.repeat === -1) ?? null;

    this.targetPose = moveTween?.targetPose ?? restPose;
    this.targetQuat = poseToQuat(this.targetPose);
    this.moveDelay = (moveTween?.delay ?? 0) / 1000;
    this.moveDuration = Math.max((moveTween?.duration ?? 0) / 1000, 1e-6);

    this.hasSway = !!swayTween;
    this.swayDuration = Math.max((swayTween?.duration ?? 0) / 1000, 1e-6);
    this.swayPause = (swayTween?.delay ?? 0) / 1000;

    this.elapsed = 0;
  }

  update(dt) {
    this.elapsed += dt;
    const t = this.elapsed;

    let sampled;
    if (t < this.moveDelay) {
      sampled = { position: this.restPose.position, scale: this.restPose.scale, quat: this.restQuat };
    } else if (t < this.moveDelay + this.moveDuration) {
      const f = ease((t - this.moveDelay) / this.moveDuration);
      sampled = samplePose(this.restPose, this.restQuat, this.targetPose, this.targetQuat, f);
    } else if (!this.hasSway) {
      sampled = { position: this.targetPose.position, scale: this.targetPose.scale, quat: this.targetQuat };
    } else {
      // pause at target -> swing to rest -> pause at rest -> swing to target -> repeat
      const cycle = 2 * this.swayPause + 2 * this.swayDuration;
      const tc = (t - this.moveDelay - this.moveDuration) % cycle;
      if (tc < this.swayPause) {
        sampled = { position: this.targetPose.position, scale: this.targetPose.scale, quat: this.targetQuat };
      } else if (tc < this.swayPause + this.swayDuration) {
        const f = ease((tc - this.swayPause) / this.swayDuration);
        sampled = samplePose(this.targetPose, this.targetQuat, this.restPose, this.restQuat, f);
      } else if (tc < 2 * this.swayPause + this.swayDuration) {
        sampled = { position: this.restPose.position, scale: this.restPose.scale, quat: this.restQuat };
      } else {
        const f = ease((tc - 2 * this.swayPause - this.swayDuration) / this.swayDuration);
        sampled = samplePose(this.restPose, this.restQuat, this.targetPose, this.targetQuat, f);
      }
    }

    applyPose(this.object, sampled);
  }
}

// Cursor-follow ("LookAt") behavior: rotates an object's local +Z axis
// toward the mouse cursor. Every LookAt object in this scene authored
// axis:"z", read here as "local +Z is the facing direction to point at the
// cursor" -- a reasonable, but not certain, interpretation; other axis
// values aren't handled since none occur in this scene. Spline's
// "distance"/"limitDistance"/"plane" fields don't have documented geometric
// definitions available from the live runtime, so this approximates the
// target point as: cast a ray from the camera through the mouse, intersect
// it with a plane through the object facing the camera -- i.e. "wherever
// the cursor is, at the object's own depth" -- rather than modeling
// Spline's exact projection. dampingFactor/resetSpeed (units also
// undocumented) are turned into a framerate-independent exponential smoothing
// rate by treating them as roughly "how many effective smoothing steps per
// second", which reproduces smooth-follow-then-settle behavior without
// claiming to match Spline's curve exactly.
//
// MAX_LOOK_ANGLE exists because the raw "point local +Z exactly at the
// cursor" math has no limit of its own: measured directly, an off-center
// cursor rotated "Top part" (the chest, a parent of the whole arm chain)
// by over 90 degrees from rest, and "Head" by ~20. Neither object's pivot
// sits at the joint a human would rotate it around (Spline's own rig
// presumably keeps this bounded through something not present in the
// exported data -- "limitDistanceEnabled" is false for both objects in this
// scene, so it isn't a limit this data ever captured), so an unclamped
// rotation that large visibly swings the mesh's neck/shoulder attachment
// points away from where the pelvis/torso expects them, reading as the
// upper body tearing off rather than tracking the cursor. Clamped to a
// fixed cone from rest instead -- chosen for a plausible-looking tracking
// range, not derived from any source value, since none exists to derive it
// from.
const MAX_LOOK_ANGLE = THREE.MathUtils.degToRad(20);

class LookAtController {
  constructor(object, restPose, config) {
    this.object = object;
    this.restQuat = poseToQuat(restPose);
    this.currentQuat = this.restQuat.clone();
    this.config = config;
  }

  update(dt, pointerWorldTarget, pointerActive) {
    let desiredQuat = this.restQuat;
    if (pointerActive && pointerWorldTarget) {
      const worldPos = new THREE.Vector3();
      this.object.getWorldPosition(worldPos);
      const dir = pointerWorldTarget.clone().sub(worldPos).normalize();

      const parentQuat = new THREE.Quaternion();
      if (this.object.parent) this.object.parent.getWorldQuaternion(parentQuat);
      const localDir = dir.clone().applyQuaternion(parentQuat.clone().invert());

      // Matrix4.lookAt(eye, target, up) orients local +Z to point from
      // target toward eye; with eye at the origin, passing -localDir as
      // "target" makes local +Z end up pointing along +localDir instead.
      const m = new THREE.Matrix4().lookAt(new THREE.Vector3(), localDir.clone().negate(), new THREE.Vector3(0, 1, 0));
      const lookQuat = new THREE.Quaternion().setFromRotationMatrix(m);

      const [ex, ey, ez] = this.config.enabledRotation;
      if (ex && ey && ez) {
        desiredQuat = lookQuat;
      } else {
        const restEuler = new THREE.Euler().setFromQuaternion(this.restQuat, 'XYZ');
        const lookEuler = new THREE.Euler().setFromQuaternion(lookQuat, 'XYZ');
        desiredQuat = new THREE.Quaternion().setFromEuler(
          new THREE.Euler(
            ex ? lookEuler.x : restEuler.x,
            ey ? lookEuler.y : restEuler.y,
            ez ? lookEuler.z : restEuler.z,
            'XYZ'
          )
        );
      }

      const dot = THREE.MathUtils.clamp(Math.abs(this.restQuat.dot(desiredQuat)), -1, 1);
      const angle = 2 * Math.acos(dot);
      if (angle > MAX_LOOK_ANGLE) {
        desiredQuat = this.restQuat.clone().slerp(desiredQuat, MAX_LOOK_ANGLE / angle);
      }
    }

    const rate = pointerActive && pointerWorldTarget ? this.config.dampingFactor : this.config.resetSpeed;
    const smoothing = THREE.MathUtils.clamp(1 - Math.exp(-(rate / 10) * dt), 0, 1);
    this.currentQuat.slerp(desiredQuat, smoothing);
    this.object.quaternion.copy(this.currentQuat);
  }
}

// applyCameraTransition: the authored camera intro competes with this
// project's own fitCameraToObject() full-body auto-fit (see main.js) --
// both can't drive the camera at once without one undoing the other. main.js
// only passes true when it already skipped its own auto-fit (?fit=0, the
// same raw-camera mode scripts/verify-render.mjs uses to match the
// reference), so the two never fight over the camera in the default view.
export function initAnimations({ root, camera, applyCameraTransition = false }) {
  const byName = new Map();
  root.traverse((obj) => {
    if (!obj.name) return;
    if (!byName.has(obj.name)) byName.set(obj.name, []);
    byName.get(obj.name).push(obj);
  });

  const usedIndex = new Map();
  const transitionAnimators = [];
  const lookAtControllers = [];

  for (const entry of animationsData) {
    const candidates = byName.get(entry.name) ?? [];
    const idx = usedIndex.get(entry.name) ?? 0;
    usedIndex.set(entry.name, idx + 1);
    const object = candidates[idx];
    if (!object) continue;
    if (entry.objectType === 'Camera' && !applyCameraTransition) continue;

    if (entry.transitions.length) {
      transitionAnimators.push(new TransitionAnimator(object, entry.restPose, entry.transitions[0]));
    }
    if (entry.lookAt) {
      lookAtControllers.push(new LookAtController(object, entry.restPose, entry.lookAt));
    }
  }

  const mouseNDC = new THREE.Vector2(0, 0);
  let pointerActive = false;
  window.addEventListener('pointermove', (e) => {
    mouseNDC.x = (e.clientX / window.innerWidth) * 2 - 1;
    mouseNDC.y = -(e.clientY / window.innerHeight) * 2 + 1;
    pointerActive = true;
  });
  window.addEventListener('pointerleave', () => {
    pointerActive = false;
  });

  const raycaster = new THREE.Raycaster();
  const _worldPos = new THREE.Vector3();
  const _camDir = new THREE.Vector3();
  const _target = new THREE.Vector3();
  function pointerWorldTargetFor(objectWorldPos) {
    raycaster.setFromCamera(mouseNDC, camera);
    camera.getWorldDirection(_camDir);
    const plane = new THREE.Plane().setFromNormalAndCoplanarPoint(_camDir, objectWorldPos);
    return raycaster.ray.intersectPlane(plane, _target) ? _target : null;
  }

  return function update(dt) {
    for (const anim of transitionAnimators) anim.update(dt);
    for (const controller of lookAtControllers) {
      controller.object.getWorldPosition(_worldPos);
      const target = pointerActive ? pointerWorldTargetFor(_worldPos) : null;
      controller.update(dt, target, pointerActive && !!target);
    }
  };
}
