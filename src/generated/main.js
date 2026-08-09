import * as THREE from 'three';
import { buildScene } from './build-scene.js';

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

fitCameraToObject(camera, root);

window.__generatedScene = scene;
window.__generatedCamera = camera;
window.__generatedLights = lights;
window.__generatedReady = true;

function animate() {
  renderer.render(scene, camera);
  requestAnimationFrame(animate);
}
animate();

window.addEventListener('resize', () => {
  renderer.setSize(window.innerWidth, window.innerHeight);
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
});
