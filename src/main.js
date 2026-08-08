import { Application } from '@splinetool/runtime';

const canvas = document.getElementById('app');
const app = new Application(canvas, { wasmPath: '/wasm' });

app
  .load('/scene.splinecode')
  .then(() => {
    window.__splineLoaded = true;
    console.log('Spline scene loaded');
  })
  .catch((err) => {
    window.__splineError = String(err);
    console.error('Spline load failed', err);
  });
