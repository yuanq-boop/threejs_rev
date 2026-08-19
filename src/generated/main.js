import * as THREE from 'three';
import { buildScene } from './build-scene.js';
import { initAnimations } from './animation-runtime.js';

const canvas = document.getElementById('app');
const renderer = new THREE.WebGLRenderer({ canvas, antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(window.devicePixelRatio);

const scene = new THREE.Scene();
scene.background = new THREE.Color(0xe4e4e4);

const { root, cameras, lights } = await buildScene();
scene.add(root);

const camera = cameras['Camera 2'];
camera.aspect = window.innerWidth / window.innerHeight;
camera.updateProjectionMatrix();

// The extracted camera's position/rotation/fov reproduce Spline's raw
// Camera 2 node, but the live reference render also goes through Spline's
// "_frameView" responsive-framing system (frames[0].preset: "fullscreen"),
// which adjusts the effective view beyond those raw values in a way this
// project hasn't reverse-engineered -- the camera object even carries a
// stray zoom:2 that, applied directly, makes framing *worse*, not better,
// so it isn't a simple "we forgot to copy one property" fix. Rather than
// guess at Spline's exact framing formula, pull the camera straight back
// along its own authored viewing direction until the whole model's
// bounding sphere fits in frame -- keeps the authored viewing angle, just
// guarantees the full robot (not just head/torso) is actually visible.
function fitCameraToObject(cam, object, paddingFactor = 1.1) {
  const box = new THREE.Box3().setFromObject(object);
  const sphere = box.getBoundingSphere(new THREE.Sphere());

  const verticalFovRad = THREE.MathUtils.degToRad(cam.fov);
  const horizontalFovRad = 2 * Math.atan(Math.tan(verticalFovRad / 2) * cam.aspect);
  const distanceForVertical = sphere.radius / Math.sin(verticalFovRad / 2);
  const distanceForHorizontal = sphere.radius / Math.sin(horizontalFovRad / 2);
  const distance = Math.max(distanceForVertical, distanceForHorizontal) * paddingFactor;

  const viewDirection = new THREE.Vector3();
  cam.getWorldDirection(viewDirection);
  cam.position.copy(sphere.center).sub(viewDirection.multiplyScalar(distance));
  cam.updateProjectionMatrix();
}

// Fit to "Bot" (the robot body) specifically, not the whole `root`. `root`
// also contains "logo" -- the "NEXBOT" wordmark, sitting 1000 units behind
// the robot as background decoration -- and a bounding sphere spanning both
// the robot AND a large flat text plane 1000 units further back forces the
// camera much further out than the reference's actual framing, which is
// clearly composed around the robot alone (the logo just extends past the
// frame edges, visible or not, rather than needing to be "fit").
//
// ?fit=0 skips this and leaves the camera at its raw extracted Camera 2
// transform -- used by scripts/verify-render.mjs, which needs the SAME
// camera as the reference for a pixel diff to mean anything. The reference
// app's camera can't be scripted to an arbitrary angle (Spline's own render
// loop re-applies its transform every frame regardless), so the raw
// extracted transform is the only camera state guaranteed comparable
// between the two renderers.
const skipFit = new URLSearchParams(location.search).get('fit') === '0';
const bot = root.getObjectByName('Bot') ?? root;
if (!skipFit) fitCameraToObject(camera, bot);

// Phase 5: reproduces the source scene's arm idle-sway and head/shoulder
// cursor-tracking (see scripts/extract-animations.mjs and
// src/generated/animation-runtime.js for how this data was captured and
// docs/phase5-animation-notes.md for what's exact vs. approximated). The
// camera's own authored intro transition is only applied in raw-camera mode
// (?fit=0) -- letting it also drive the default full-body auto-fit above
// would mean two different systems fighting over the camera every frame.
const updateAnimations = initAnimations({ root, camera, applyCameraTransition: skipFit });

window.__generatedScene = scene;
window.__generatedCamera = camera;
window.__generatedLights = lights;
window.__generatedReady = true;

const clock = new THREE.Clock();
function animate() {
  updateAnimations(clock.getDelta());
  renderer.render(scene, camera);
  requestAnimationFrame(animate);
}
animate();

window.addEventListener('resize', () => {
  renderer.setSize(window.innerWidth, window.innerHeight);
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
});
