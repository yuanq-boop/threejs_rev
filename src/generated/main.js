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
