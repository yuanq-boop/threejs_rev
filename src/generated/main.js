import * as THREE from 'three';
import { buildScene } from './build-scene.js';

const canvas = document.getElementById('app');
const renderer = new THREE.WebGLRenderer({ canvas, antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(window.devicePixelRatio);

const scene = new THREE.Scene();
scene.background = new THREE.Color(0xe4e4e4);

const { root, cameras } = buildScene();
scene.add(root);

// Preview-only fill light: Spline's compiled PointLight intensity (5) reads
// as near-black under Three.js's physically-correct PointLight falloff at
// this distance -- the two engines use incompatible light-intensity units.
// True light/material calibration is phase 2 (layered material stack); this
// ambient light exists only so phase-1 geometry is visible for verification,
// and is not part of buildScene()'s output.
scene.add(new THREE.AmbientLight(0xffffff, 1.5));

const camera = cameras['Camera 2'];
camera.aspect = window.innerWidth / window.innerHeight;
camera.updateProjectionMatrix();

window.__generatedScene = scene;
window.__generatedCamera = camera;
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
