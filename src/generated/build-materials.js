// GENERATED FILE -- do not hand-edit.
// Produced by scripts/generate-materials.mjs from
// generated/materials-description.json (itself produced by
// scripts/extract-materials.mjs resolving app._data.shared.materials).
//
// Each material's "color" + "light" layers translate to
// MeshPhysicalMaterial's color/roughness/metalness/reflectivity/emissive.
// "matcap"/"texture"/"video" layers need real image assets and are not
// translated here (see the NOTE comments per material and phase 3).
// "rainbow" layers get a rough iridescence approximation, also flagged --
// it is a guess, not a derived conversion, and may need visual retuning.
import * as THREE from 'three';

export function buildMaterials() {
  const materials = {};

  // "342265b2-6982-4c49-b670-fee0149640a3" -- "Body"
  // NOTE: "rainbow" layer (filmThickness=7) approximated as iridescence=0.20, iridescenceIOR=1.3 (fixed guess), iridescenceThicknessRange=[100, 240] -- not a derived conversion, needs visual retuning
  // NOTE: "matcap" layer not translated -- needs an image asset ("matcap_roughness_3"), deferred to the asset pipeline
  // NOTE: "texture" layer not translated -- needs an image asset ("image_0"), deferred to the asset pipeline
  materials['342265b2-6982-4c49-b670-fee0149640a3'] = new THREE.MeshPhysicalMaterial({
    color: 0x4f4f4f,
    roughness: 0.2,
    metalness: 0.2,
    reflectivity: 0.2,
    iridescence: 0.2,
    iridescenceIOR: 1.3,
    iridescenceThicknessRange: [100, 240],
  });

  // "6bdc5132-7ea6-4d70-8d2b-c8849ea9973b" -- "Parts"
  // NOTE: reflectivity=1.5 is outside Three.js's [0,1] range -- clamped
  // NOTE: "rainbow" layer (filmThickness=10) approximated as iridescence=1.00, iridescenceIOR=1.3 (fixed guess), iridescenceThicknessRange=[100, 300] -- not a derived conversion, needs visual retuning
  // NOTE: "texture" layer not translated -- needs an image asset ("a782a6a1-fa8d-4ac6-afa9-559f62307868"), deferred to the asset pipeline
  // NOTE: "matcap" layer not translated -- needs an image asset ("matcap_roughness_3"), deferred to the asset pipeline
  materials['6bdc5132-7ea6-4d70-8d2b-c8849ea9973b'] = new THREE.MeshPhysicalMaterial({
    color: 0x030303,
    roughness: 1,
    metalness: 1,
    reflectivity: 1,
    iridescence: 1,
    iridescenceIOR: 1.3,
    iridescenceThicknessRange: [100, 300],
  });

  // "ed42926e-48d3-4907-8975-3cec662ff058" -- "Head"
  // NOTE: "rainbow" layer (filmThickness=5) approximated as iridescence=0.50, iridescenceIOR=1.3 (fixed guess), iridescenceThicknessRange=[100, 200] -- not a derived conversion, needs visual retuning
  // NOTE: "matcap" layer not translated -- needs an image asset ({"data":"TypedArray(Uint8Array, len=742479)","name":"CHROME.png"}), deferred to the asset pipeline
  // NOTE: "video" layer not translated -- needs an image asset ({"alpha":1,"mode":0,"isMask":false,"visible":true,"type":"video","size":[128,128],"blending":0,"axis":"z","side":0,"projection":1,"texture":{"video":{"data":"TypedArray(Uint8Array, len=472970)","thumb":"TypedArray(Uint8Array, len=7249)","type":"video","name":"Screen Recording 2024-05-08 at 10.55.22.mp4"},"wrapping":1001,"repeat":[2,2.5],"offset":[0,-0.19],"rotation":0,"minFilter":1008},"crop":true}), deferred to the asset pipeline
  materials['ed42926e-48d3-4907-8975-3cec662ff058'] = new THREE.MeshPhysicalMaterial({
    color: 0x000000,
    roughness: 0.2,
    metalness: 0.2,
    reflectivity: 0.2,
    iridescence: 0.5,
    iridescenceIOR: 1.3,
    iridescenceThicknessRange: [100, 200],
  });

  // "ac839791-b0cd-406c-a276-0d8c6f6ecfd8" -- "Text"
  // NOTE: no visible "light" layer -- material has no lighting response params set (unlit-looking base color only)
  materials['ac839791-b0cd-406c-a276-0d8c6f6ecfd8'] = new THREE.MeshPhysicalMaterial({
    color: 0xffffff,
  });

  return materials;
}
