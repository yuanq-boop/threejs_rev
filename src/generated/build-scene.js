// GENERATED FILE -- do not hand-edit.
// Produced by scripts/generate-scene.mjs from generated/scene-description.json
// (itself produced by scripts/extract-scene.mjs walking the live
// @splinetool/runtime scene graph for public/scene.splinecode).
//
// Hierarchy/transforms/cameras/lights and primitive Box/Cylinder geometry
// are generated directly. RectangleGeometry/EllipseGeometry (panel/screw/
// seam details) become THREE.Shape + THREE.ExtrudeGeometry via
// shape-helpers.js -- see that file for the (unverified) percentage/corner-
// order assumptions. SubdivGeometry (organic body) and VectorGeometry (the
// logo text) are baked into public/models/body.glb by
// scripts/extract-scene.mjs (the geometry bake half of it) and loaded here via GLTFLoader, since there's no
// clean source-of-truth formula to regenerate wasm-computed subdivision
// surfaces or bezier-path text from. Materials come from phase 2's
// build-materials.js.
import * as THREE from 'three';
import { buildMaterials } from './build-materials.js';
import { roundedRectShape, ellipseShape, hollowTaperedTubeGeometry } from './shape-helpers.js';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';

export async function buildScene() {
  const materials = buildMaterials();

  const bakedGltf = await new GLTFLoader().loadAsync('/models/body.glb');
  const bakedAssets = {};
  bakedGltf.scene.traverse((o) => {
    if (o.isMesh) bakedAssets[o.name] = o;
  });

  const boxGeometry = new THREE.BoxGeometry(
    5,
    16,
    8,
    1,
    1,
    1,
  ); /* cornerRadius=1 not represented -- THREE.BoxGeometry has sharp edges, see phase notes */
  const rectExtrudeGeometry = new THREE.ExtrudeGeometry(
    roundedRectShape(29, 41.938941, [100, 100, 100, 100], 0),
    { depth: 9, bevelEnabled: true, bevelSize: 1, bevelThickness: 1, bevelSegments: 1 },
  ); /* approximated: cornerRadius% and corner-index order are inferred, not verified, see shape-helpers.js */
  const ellipseExtrudeGeometry = new THREE.ExtrudeGeometry(
    ellipseShape(29.136834, 29.136834, 16, 0, 360),
    { depth: 26, bevelEnabled: true, bevelSize: 1, bevelThickness: 1, bevelSegments: 1 },
  ); /* approximated: innerRadius% convention inferred, not verified, see shape-helpers.js */
  const ellipseExtrudeGeometry_2 = new THREE.ExtrudeGeometry(ellipseShape(19, 19, 16, 0, 360), {
    depth: 25,
    bevelEnabled: true,
    bevelSize: 1,
    bevelThickness: 1,
    bevelSegments: 1,
  }); /* approximated: innerRadius% convention inferred, not verified, see shape-helpers.js */
  const rectExtrudeGeometry_2 = new THREE.ExtrudeGeometry(
    roundedRectShape(29, 41.938941, [100, 100, 100, 100], 0),
    { depth: 9, bevelEnabled: true, bevelSize: 1, bevelThickness: 1, bevelSegments: 1 },
  ); /* approximated: cornerRadius% and corner-index order are inferred, not verified, see shape-helpers.js */
  const ellipseExtrudeGeometry_3 = new THREE.ExtrudeGeometry(
    ellipseShape(29.136834, 29.136834, 16, 0, 360),
    { depth: 26, bevelEnabled: true, bevelSize: 1, bevelThickness: 1, bevelSegments: 1 },
  ); /* approximated: innerRadius% convention inferred, not verified, see shape-helpers.js */
  const ellipseExtrudeGeometry_4 = new THREE.ExtrudeGeometry(
    ellipseShape(47.927139, 47.927139, 16, 81, 360),
    { depth: 17.827009, bevelEnabled: true, bevelSize: 2, bevelThickness: 2, bevelSegments: 1 },
  ); /* approximated: innerRadius% convention inferred, not verified, see shape-helpers.js */
  const ellipseExtrudeGeometry_5 = new THREE.ExtrudeGeometry(
    ellipseShape(40.489532, 40.489532, 16, 0, 360),
    { depth: 15.060512, bevelEnabled: true, bevelSize: 2, bevelThickness: 2, bevelSegments: 1 },
  ); /* approximated: innerRadius% convention inferred, not verified, see shape-helpers.js */
  const rectExtrudeGeometry_3 = new THREE.ExtrudeGeometry(
    roundedRectShape(51.537699, 36.367288, [0, 25, 25, 0], 0),
    { depth: 10, bevelEnabled: true, bevelSize: 2, bevelThickness: 2, bevelSegments: 1 },
  ); /* approximated: cornerRadius% and corner-index order are inferred, not verified, see shape-helpers.js */
  const ellipseExtrudeGeometry_6 = new THREE.ExtrudeGeometry(
    ellipseShape(17.591709, 17.591709, 12, 0, 360),
    { depth: 21.420632, bevelEnabled: true, bevelSize: 1, bevelThickness: 1, bevelSegments: 1 },
  ); /* approximated: innerRadius% convention inferred, not verified, see shape-helpers.js */
  const rectExtrudeGeometry_4 = new THREE.ExtrudeGeometry(
    roundedRectShape(36.367288, 36.367288, [0, 25, 25, 0], 0),
    { depth: 10, bevelEnabled: true, bevelSize: 2, bevelThickness: 2, bevelSegments: 1 },
  ); /* approximated: cornerRadius% and corner-index order are inferred, not verified, see shape-helpers.js */
  const ellipseExtrudeGeometry_7 = new THREE.ExtrudeGeometry(
    ellipseShape(17.591709, 17.591709, 12, 0, 360),
    { depth: 21.420632, bevelEnabled: true, bevelSize: 1, bevelThickness: 1, bevelSegments: 1 },
  ); /* approximated: innerRadius% convention inferred, not verified, see shape-helpers.js */
  const rectExtrudeGeometry_5 = new THREE.ExtrudeGeometry(
    roundedRectShape(36.367288, 36.367288, [0, 25, 25, 0], 0),
    { depth: 10, bevelEnabled: true, bevelSize: 2, bevelThickness: 2, bevelSegments: 1 },
  ); /* approximated: cornerRadius% and corner-index order are inferred, not verified, see shape-helpers.js */
  const rectExtrudeGeometry_6 = new THREE.ExtrudeGeometry(
    roundedRectShape(47.414315, 37.526075, [100, 100, 100, 100], 0),
    { depth: 20.060472, bevelEnabled: true, bevelSize: 9, bevelThickness: 9, bevelSegments: 2 },
  ); /* approximated: cornerRadius% and corner-index order are inferred, not verified, see shape-helpers.js */
  const rectExtrudeGeometry_7 = new THREE.ExtrudeGeometry(
    roundedRectShape(59.551878, 32.188194, [100, 100, 100, 100], 0),
    { depth: 16.301922, bevelEnabled: true, bevelSize: 9, bevelThickness: 9, bevelSegments: 2 },
  ); /* approximated: cornerRadius% and corner-index order are inferred, not verified, see shape-helpers.js */
  const ellipseExtrudeGeometry_8 = new THREE.ExtrudeGeometry(ellipseShape(32, 32, 16, 0, 360), {
    depth: 109.856402,
    bevelEnabled: true,
    bevelSize: 6,
    bevelThickness: 6,
    bevelSegments: 3,
  }); /* approximated: innerRadius% convention inferred, not verified, see shape-helpers.js */
  const ellipseExtrudeGeometry_9 = new THREE.ExtrudeGeometry(ellipseShape(40, 40, 16, 0, 360), {
    depth: 28,
    bevelEnabled: true,
    bevelSize: 1,
    bevelThickness: 1,
    bevelSegments: 1,
  }); /* approximated: innerRadius% convention inferred, not verified, see shape-helpers.js */
  const rectExtrudeGeometry_8 = new THREE.ExtrudeGeometry(
    roundedRectShape(59.551878, 32.188194, [100, 100, 100, 100], 0),
    { depth: 12.674239, bevelEnabled: true, bevelSize: 9, bevelThickness: 9, bevelSegments: 2 },
  ); /* approximated: cornerRadius% and corner-index order are inferred, not verified, see shape-helpers.js */
  const rectExtrudeGeometry_9 = new THREE.ExtrudeGeometry(
    roundedRectShape(59.551878, 32.188194, [100, 100, 100, 100], 0),
    { depth: 12.674239, bevelEnabled: true, bevelSize: 9, bevelThickness: 9, bevelSegments: 2 },
  ); /* approximated: cornerRadius% and corner-index order are inferred, not verified, see shape-helpers.js */
  const ellipseExtrudeGeometry_10 = new THREE.ExtrudeGeometry(
    ellipseShape(41.795361, 41.795361, 16, 0, 360),
    { depth: 15.853413, bevelEnabled: true, bevelSize: 1, bevelThickness: 1, bevelSegments: 1 },
  ); /* approximated: innerRadius% convention inferred, not verified, see shape-helpers.js */
  const ellipseExtrudeGeometry_11 = new THREE.ExtrudeGeometry(ellipseShape(35, 35, 16, 0, 360), {
    depth: 12.814902,
    bevelEnabled: true,
    bevelSize: 1,
    bevelThickness: 1,
    bevelSegments: 1,
  }); /* approximated: innerRadius% convention inferred, not verified, see shape-helpers.js */
  const rectExtrudeGeometry_10 = new THREE.ExtrudeGeometry(
    roundedRectShape(47.414315, 37.526075, [100, 100, 100, 100], 0),
    { depth: 19.21625, bevelEnabled: true, bevelSize: 9, bevelThickness: 9, bevelSegments: 2 },
  ); /* approximated: cornerRadius% and corner-index order are inferred, not verified, see shape-helpers.js */
  const rectExtrudeGeometry_11 = new THREE.ExtrudeGeometry(
    roundedRectShape(40.898026, 22.87133, [0, 80, 80, 0], 0),
    { depth: 16, bevelEnabled: true, bevelSize: 4, bevelThickness: 4, bevelSegments: 2 },
  ); /* approximated: cornerRadius% and corner-index order are inferred, not verified, see shape-helpers.js */
  const rectExtrudeGeometry_12 = new THREE.ExtrudeGeometry(
    roundedRectShape(40.898026, 31.296882, [0, 80, 80, 0], 0),
    { depth: 16, bevelEnabled: true, bevelSize: 4, bevelThickness: 4, bevelSegments: 2 },
  ); /* approximated: cornerRadius% and corner-index order are inferred, not verified, see shape-helpers.js */
  const ellipseExtrudeGeometry_12 = new THREE.ExtrudeGeometry(ellipseShape(36, 36, 16, 0, 360), {
    depth: 14.629749,
    bevelEnabled: true,
    bevelSize: 4,
    bevelThickness: 4,
    bevelSegments: 1,
  }); /* approximated: innerRadius% convention inferred, not verified, see shape-helpers.js */
  const rectExtrudeGeometry_13 = new THREE.ExtrudeGeometry(
    roundedRectShape(40.898026, 31.296882, [0, 80, 80, 0], 0),
    { depth: 16, bevelEnabled: true, bevelSize: 4, bevelThickness: 4, bevelSegments: 2 },
  ); /* approximated: cornerRadius% and corner-index order are inferred, not verified, see shape-helpers.js */
  const ellipseExtrudeGeometry_13 = new THREE.ExtrudeGeometry(ellipseShape(36, 36, 16, 0, 360), {
    depth: 14.629749,
    bevelEnabled: true,
    bevelSize: 4,
    bevelThickness: 4,
    bevelSegments: 1,
  }); /* approximated: innerRadius% convention inferred, not verified, see shape-helpers.js */
  const rectExtrudeGeometry_14 = new THREE.ExtrudeGeometry(
    roundedRectShape(138.009357, 45.986932, [91, 91, 91, 91], 0),
    { depth: 13.092062, bevelEnabled: true, bevelSize: 8, bevelThickness: 8, bevelSegments: 2 },
  ); /* approximated: cornerRadius% and corner-index order are inferred, not verified, see shape-helpers.js */
  const rectExtrudeGeometry_15 = new THREE.ExtrudeGeometry(
    roundedRectShape(35.006892, 40, [100, 100, 100, 100], 0),
    { depth: 51.417841, bevelEnabled: true, bevelSize: 1, bevelThickness: 1, bevelSegments: 2 },
  ); /* approximated: cornerRadius% and corner-index order are inferred, not verified, see shape-helpers.js */
  const rectExtrudeGeometry_16 = new THREE.ExtrudeGeometry(
    roundedRectShape(35.006892, 35.911912, [100, 100, 100, 100], 1),
    { depth: 72.290401, bevelEnabled: true, bevelSize: 10, bevelThickness: 10, bevelSegments: 2 },
  ); /* approximated: cornerRadius% and corner-index order are inferred, not verified, see shape-helpers.js */

  const root = new THREE.Group();
  root.name = 'Scene 1';

  const Camera_2 = new THREE.PerspectiveCamera(45, 1, 70, 100000); // aspect set by caller based on viewport
  Camera_2.name = 'Camera 2';
  Camera_2.position.set(0, 249.000214, 359.873166);
  Camera_2.rotation.set(0.014488, 0, 0);
  root.add(Camera_2);

  const Point_Light = new THREE.PointLight(0xffffff, 5000000); // intensity includes an empirical distance-falloff calibration factor, see DISTANCE_FALLOFF_LIGHT_CALIBRATION in generate-scene.mjs
  Point_Light.name = 'Point Light';
  Point_Light.position.set(-595, 579, -393);
  root.add(Point_Light);

  const logo = new THREE.Group();
  logo.name = 'logo';
  logo.position.set(0, 146, -1000);
  logo.rotation.set(0, 0, 0);
  logo.scale.set(0.3, 0.3, 0.3);
  root.add(logo);

  const Shape_0 = bakedAssets['279aecbf-9e18-4321-818a-a4de40c0dcdf'].clone();
  Shape_0.material = materials['ac839791-b0cd-406c-a276-0d8c6f6ecfd8'];
  Shape_0.name = 'Shape 0';
  Shape_0.position.set(-1919, 250, -0.03);
  Shape_0.castShadow = true;
  Shape_0.receiveShadow = true;
  logo.add(Shape_0);

  const Shape_1 = bakedAssets['4fb783a6-c2f7-40b9-920c-ce36e0590128'].clone();
  Shape_1.material = materials['ac839791-b0cd-406c-a276-0d8c6f6ecfd8'];
  Shape_1.name = 'Shape 1';
  Shape_1.position.set(696, 250, -0.02);
  Shape_1.castShadow = true;
  Shape_1.receiveShadow = true;
  logo.add(Shape_1);

  const Shape_2 = bakedAssets['fb21df3e-adc5-4c03-add4-e50bd2225961'].clone();
  Shape_2.material = materials['ac839791-b0cd-406c-a276-0d8c6f6ecfd8'];
  Shape_2.name = 'Shape 2';
  Shape_2.position.set(1319, 250, -0.01);
  Shape_2.castShadow = true;
  Shape_2.receiveShadow = true;
  logo.add(Shape_2);

  const Shape_3 = bakedAssets['6a48c22e-3658-4a9e-9e21-605f7e8422fe'].clone();
  Shape_3.material = materials['ac839791-b0cd-406c-a276-0d8c6f6ecfd8'];
  Shape_3.name = 'Shape 3';
  Shape_3.position.set(-1165, 250, 0);
  Shape_3.castShadow = true;
  Shape_3.receiveShadow = true;
  logo.add(Shape_3);

  const Shape_4 = bakedAssets['54335e62-f78a-4755-b1f2-7a6f29159caf'].clone();
  Shape_4.material = materials['ac839791-b0cd-406c-a276-0d8c6f6ecfd8'];
  Shape_4.name = 'Shape 4';
  Shape_4.position.set(-1265, 50, 0.01);
  Shape_4.castShadow = true;
  Shape_4.receiveShadow = true;
  logo.add(Shape_4);

  const Shape_5 = bakedAssets['3a7c9113-4e4f-4885-8ea5-55311d7df13b'].clone();
  Shape_5.material = materials['ac839791-b0cd-406c-a276-0d8c6f6ecfd8'];
  Shape_5.name = 'Shape 5';
  Shape_5.position.set(42, 250, 0.02);
  Shape_5.castShadow = true;
  Shape_5.receiveShadow = true;
  logo.add(Shape_5);

  const Shape_6 = bakedAssets['045d4a67-981d-4cf9-b608-268579ec9740'].clone();
  Shape_6.material = materials['ac839791-b0cd-406c-a276-0d8c6f6ecfd8'];
  Shape_6.name = 'Shape 6';
  Shape_6.position.set(-612, 250, 0.03);
  Shape_6.castShadow = true;
  Shape_6.receiveShadow = true;
  logo.add(Shape_6);

  const Bot = new THREE.Group();
  Bot.name = 'Bot';
  Bot.position.set(-2.754778, 25.676866, 0);
  Bot.scale.set(0.8, 0.8, 0.8);
  root.add(Bot);

  const Top_part = new THREE.Group();
  Top_part.name = 'Top part';
  Top_part.position.set(-0.184025, 58.94695, 2.035342);
  Bot.add(Top_part);

  const Head = new THREE.Group();
  Head.name = 'Head';
  Head.position.set(0.184025, 183.553801, 18.621848);
  Top_part.add(Head);

  const Head_2 = bakedAssets['e7f71d65-a96d-46c5-a6aa-03f30c9eb130'].clone();
  Head_2.material = materials['ed42926e-48d3-4907-8975-3cec662ff058'];
  Head_2.name = 'Head 2';
  Head_2.position.set(0, 42.940033, 4.00351);
  Head_2.castShadow = true;
  Head_2.receiveShadow = true;
  Head.add(Head_2);

  const Neck = new THREE.Group();
  Neck.name = 'Neck';
  Neck.position.set(0.184025, 189.771681, 5.252044);
  Top_part.add(Neck);

  const Cube = new THREE.Mesh(boxGeometry, materials['6bdc5132-7ea6-4d70-8d2b-c8849ea9973b']);
  Cube.name = 'Cube';
  Cube.position.set(0, -13.239626, -0.347205);
  Cube.rotation.set(0.122173, 0, 0);
  Cube.scale.set(1.25, 1.25, 1.25);
  Cube.castShadow = true;
  Cube.receiveShadow = true;
  Neck.add(Cube);

  const Cylinder_3 = bakedAssets['737ec683-fa0e-45f1-b2aa-116b3ff31005'].clone();
  Cylinder_3.material = materials['342265b2-6982-4c49-b670-fee0149640a3'];
  Cylinder_3.name = 'Cylinder 3';
  Cylinder_3.position.set(0, -34.319604, -3.149482);
  Cylinder_3.rotation.set(0.20565, 0, 0);
  Cylinder_3.scale.set(1, 1, 1);
  Cylinder_3.castShadow = true;
  Cylinder_3.receiveShadow = true;
  Neck.add(Cylinder_3);

  const Group_3 = new THREE.Group();
  Group_3.name = 'Group 3';
  Group_3.position.set(0.001873, -9.407779, -0.645972);
  Group_3.rotation.set(0.429163, 0, 0);
  Neck.add(Group_3);

  const Group_2 = new THREE.Group();
  Group_2.name = 'Group 2';
  Group_2.position.set(20.598127, 0, 0);
  Group_2.scale.set(-1, 1, 1);
  Group_3.add(Group_2);

  const Cylinder_4 = bakedAssets['7d8adc50-0310-4a54-9bbd-99ea6a48318b'].clone();
  Cylinder_4.material = materials['6bdc5132-7ea6-4d70-8d2b-c8849ea9973b'];
  Cylinder_4.name = 'Cylinder 4';
  Cylinder_4.position.set(0, 0, 0);
  Cylinder_4.rotation.set(0.130289, 0, -0.278824);
  Cylinder_4.scale.set(1, 1, 1);
  Cylinder_4.castShadow = true;
  Cylinder_4.receiveShadow = true;
  Group_2.add(Cylinder_4);

  const Group = new THREE.Group();
  Group.name = 'Group';
  Group.position.set(-20.598127, 0, 0);
  Group_3.add(Group);

  const Cylinder_4_2 = bakedAssets['0963e8e4-4461-48cd-87e4-702a1e7a0086'].clone();
  Cylinder_4_2.material = materials['6bdc5132-7ea6-4d70-8d2b-c8849ea9973b'];
  Cylinder_4_2.name = 'Cylinder 4';
  Cylinder_4_2.position.set(0, 0, 0);
  Cylinder_4_2.rotation.set(0.130289, 0, -0.278824);
  Cylinder_4_2.scale.set(1, 1, 1);
  Cylinder_4_2.castShadow = true;
  Cylinder_4_2.receiveShadow = true;
  Group.add(Cylinder_4_2);

  const Cylinder = bakedAssets['01186c26-da26-42cd-961a-dce04dea6d0b'].clone();
  Cylinder.material = materials['6bdc5132-7ea6-4d70-8d2b-c8849ea9973b'];
  Cylinder.name = 'Cylinder';
  Cylinder.position.set(0, 12.026392, 4.411749);
  Cylinder.rotation.set(0.130289, 0, 0);
  Cylinder.scale.set(1, 1, 1);
  Cylinder.castShadow = true;
  Cylinder.receiveShadow = true;
  Neck.add(Cylinder);

  const group = new THREE.Group();
  Neck.add(group);

  const mesh = new THREE.Mesh(boxGeometry, materials['6bdc5132-7ea6-4d70-8d2b-c8849ea9973b']);
  mesh.position.set(11, 0, 0);
  mesh.rotation.set(0, 0, 0.139626);
  mesh.castShadow = true;
  mesh.receiveShadow = true;
  group.add(mesh);

  const mesh_2 = new THREE.Mesh(boxGeometry, materials['6bdc5132-7ea6-4d70-8d2b-c8849ea9973b']);
  mesh_2.position.set(9.526279, 0, 5.5);
  mesh_2.rotation.set(0, -0.523599, 0.139626);
  mesh_2.castShadow = true;
  mesh_2.receiveShadow = true;
  group.add(mesh_2);

  const mesh_3 = new THREE.Mesh(boxGeometry, materials['6bdc5132-7ea6-4d70-8d2b-c8849ea9973b']);
  mesh_3.position.set(5.5, 0, 9.526279);
  mesh_3.rotation.set(0, -1.047198, 0.139626);
  mesh_3.castShadow = true;
  mesh_3.receiveShadow = true;
  group.add(mesh_3);

  const mesh_4 = new THREE.Mesh(boxGeometry, materials['6bdc5132-7ea6-4d70-8d2b-c8849ea9973b']);
  mesh_4.position.set(0, 0, 11);
  mesh_4.rotation.set(0, -1.570796, 0.139626);
  mesh_4.castShadow = true;
  mesh_4.receiveShadow = true;
  group.add(mesh_4);

  const mesh_5 = new THREE.Mesh(boxGeometry, materials['6bdc5132-7ea6-4d70-8d2b-c8849ea9973b']);
  mesh_5.position.set(-5.5, 0, 9.526279);
  mesh_5.rotation.set(0, -2.094395, 0.139626);
  mesh_5.castShadow = true;
  mesh_5.receiveShadow = true;
  group.add(mesh_5);

  const mesh_6 = new THREE.Mesh(boxGeometry, materials['6bdc5132-7ea6-4d70-8d2b-c8849ea9973b']);
  mesh_6.position.set(-9.526279, 0, 5.5);
  mesh_6.rotation.set(0, -2.617994, 0.139626);
  mesh_6.castShadow = true;
  mesh_6.receiveShadow = true;
  group.add(mesh_6);

  const mesh_7 = new THREE.Mesh(boxGeometry, materials['6bdc5132-7ea6-4d70-8d2b-c8849ea9973b']);
  mesh_7.position.set(-11, 0, 0);
  mesh_7.rotation.set(0, -3.141593, 0.139626);
  mesh_7.castShadow = true;
  mesh_7.receiveShadow = true;
  group.add(mesh_7);

  const mesh_8 = new THREE.Mesh(boxGeometry, materials['6bdc5132-7ea6-4d70-8d2b-c8849ea9973b']);
  mesh_8.position.set(-9.526279, 0, -5.5);
  mesh_8.rotation.set(0, -3.665191, 0.139626);
  mesh_8.castShadow = true;
  mesh_8.receiveShadow = true;
  group.add(mesh_8);

  const mesh_9 = new THREE.Mesh(boxGeometry, materials['6bdc5132-7ea6-4d70-8d2b-c8849ea9973b']);
  mesh_9.position.set(-5.5, 0, -9.526279);
  mesh_9.rotation.set(0, -4.18879, 0.139626);
  mesh_9.castShadow = true;
  mesh_9.receiveShadow = true;
  group.add(mesh_9);

  const mesh_10 = new THREE.Mesh(boxGeometry, materials['6bdc5132-7ea6-4d70-8d2b-c8849ea9973b']);
  mesh_10.position.set(0, 0, -11);
  mesh_10.rotation.set(0, -4.712389, 0.139626);
  mesh_10.castShadow = true;
  mesh_10.receiveShadow = true;
  group.add(mesh_10);

  const mesh_11 = new THREE.Mesh(boxGeometry, materials['6bdc5132-7ea6-4d70-8d2b-c8849ea9973b']);
  mesh_11.position.set(5.5, 0, -9.526279);
  mesh_11.rotation.set(0, -5.235988, 0.139626);
  mesh_11.castShadow = true;
  mesh_11.receiveShadow = true;
  group.add(mesh_11);

  const mesh_12 = new THREE.Mesh(boxGeometry, materials['6bdc5132-7ea6-4d70-8d2b-c8849ea9973b']);
  mesh_12.position.set(9.526279, 0, -5.5);
  mesh_12.rotation.set(0, -5.759587, 0.139626);
  mesh_12.castShadow = true;
  mesh_12.receiveShadow = true;
  group.add(mesh_12);

  const Hand_Instance = new THREE.Group();
  Hand_Instance.name = 'Hand Instance';
  Hand_Instance.position.set(-112.74, 26.226166, 1.711038);
  Hand_Instance.scale.set(-1, 1, 1);
  Top_part.add(Hand_Instance);

  const Hand_LEFT = new THREE.Group();
  Hand_LEFT.name = 'Hand LEFT';
  Hand_LEFT.position.set(-40.588189, 98.305221, -3.47071);
  Hand_LEFT.rotation.set(0, 0, 0.085987);
  Hand_LEFT.scale.set(1, 1, 1);
  Hand_Instance.add(Hand_LEFT);

  const arm = new THREE.Group();
  arm.name = 'arm';
  arm.position.set(24.873446, 7.425945, 2.202431);
  Hand_LEFT.add(arm);

  const elbow = new THREE.Group();
  elbow.name = 'elbow';
  elbow.position.set(20.541998, -85.632304, 2.657058);
  elbow.rotation.set(0, -0.142001, 0);
  elbow.scale.set(1, 1, 1);
  arm.add(elbow);

  const Group_4 = new THREE.Group();
  Group_4.name = 'Group';
  Group_4.position.set(-0.745778, -0.015518, -0.393904);
  Group_4.rotation.set(0.323899, 0, 0);
  Group_4.scale.set(1, 1, 1);
  elbow.add(Group_4);

  const Rectangle_3 = new THREE.Mesh(
    rectExtrudeGeometry,
    materials['6bdc5132-7ea6-4d70-8d2b-c8849ea9973b'],
  );
  Rectangle_3.name = 'Rectangle 3';
  Rectangle_3.position.set(1.628032, -2.934109, 1.692717);
  Rectangle_3.rotation.set(-0.74906, 1.540222, 0.404439);
  Rectangle_3.scale.set(1, 1, 1);
  Rectangle_3.castShadow = true;
  Rectangle_3.receiveShadow = true;
  Group_4.add(Rectangle_3);

  const Ellipse_3 = new THREE.Mesh(
    ellipseExtrudeGeometry,
    materials['6bdc5132-7ea6-4d70-8d2b-c8849ea9973b'],
  );
  Ellipse_3.name = 'Ellipse 3';
  Ellipse_3.position.set(0.019285, 22.10977, -8.153224);
  Ellipse_3.rotation.set(1.209142, -0.001483, 0.06355);
  Ellipse_3.scale.set(1, 1, 1);
  Ellipse_3.castShadow = true;
  Ellipse_3.receiveShadow = true;
  Group_4.add(Ellipse_3);

  const forearm = new THREE.Group();
  forearm.name = 'forearm';
  forearm.position.set(-4.789966, -12.261409, 1.360096);
  forearm.rotation.set(0.323899, 0, 0);
  forearm.scale.set(1, 1, 1);
  elbow.add(forearm);

  const Hand = bakedAssets['29a7d5fe-83bf-472d-a861-6907e20a9a5b'].clone();
  Hand.material = materials['6bdc5132-7ea6-4d70-8d2b-c8849ea9973b'];
  Hand.name = 'Hand';
  Hand.position.set(-9.434524, -91.204258, 36.550164);
  Hand.rotation.set(0.280377, 0.938657, 2.475429);
  Hand.scale.set(-1.4, 1.4, 1.4);
  Hand.castShadow = true;
  Hand.receiveShadow = true;
  forearm.add(Hand);

  const Ellipse_5 = new THREE.Mesh(
    ellipseExtrudeGeometry_2,
    materials['6bdc5132-7ea6-4d70-8d2b-c8849ea9973b'],
  );
  Ellipse_5.name = 'Ellipse 5';
  Ellipse_5.position.set(-7.607973, -0.806285, -0.893992);
  Ellipse_5.rotation.set(-0.750492, 1.53589, 0.401426);
  Ellipse_5.scale.set(1, 1, 1);
  Ellipse_5.castShadow = true;
  Ellipse_5.receiveShadow = true;
  forearm.add(Ellipse_5);

  const Rectangle_4 = new THREE.Mesh(
    rectExtrudeGeometry_2,
    materials['6bdc5132-7ea6-4d70-8d2b-c8849ea9973b'],
  );
  Rectangle_4.name = 'Rectangle 4';
  Rectangle_4.position.set(-4.097562, -8.118756, 1.665227);
  Rectangle_4.rotation.set(-0.74906, 1.540222, 0.404439);
  Rectangle_4.scale.set(1, 1, 1);
  Rectangle_4.castShadow = true;
  Rectangle_4.receiveShadow = true;
  forearm.add(Rectangle_4);

  const Ellipse_4 = new THREE.Mesh(
    ellipseExtrudeGeometry_3,
    materials['6bdc5132-7ea6-4d70-8d2b-c8849ea9973b'],
  );
  Ellipse_4.name = 'Ellipse 4';
  Ellipse_4.position.set(3.988018, -14.413379, 4.283465);
  Ellipse_4.rotation.set(1.209142, -0.001483, 0.06355);
  Ellipse_4.scale.set(1, 1, 1);
  Ellipse_4.castShadow = true;
  Ellipse_4.receiveShadow = true;
  forearm.add(Ellipse_4);

  const Cube_3 = bakedAssets['2cb7c1f2-8047-4b8e-ab42-e1291863ae2b'].clone();
  Cube_3.material = materials['342265b2-6982-4c49-b670-fee0149640a3'];
  Cube_3.name = 'Cube 3';
  Cube_3.position.set(-0.423061, -62.578567, 23.356696);
  Cube_3.rotation.set(0.998206, 1.408529, -1.444335);
  Cube_3.scale.set(1, 1, 1);
  Cube_3.castShadow = true;
  Cube_3.receiveShadow = true;
  forearm.add(Cube_3);

  const Cube_2 = bakedAssets['695ea319-f3dc-4aeb-af0f-db05e68b5a1d'].clone();
  Cube_2.material = materials['342265b2-6982-4c49-b670-fee0149640a3'];
  Cube_2.name = 'Cube 2';
  Cube_2.position.set(23.34458, -26.18998, -4.771457);
  Cube_2.rotation.set(0, 0, 0.368074);
  Cube_2.scale.set(1, 1, 1);
  Cube_2.castShadow = true;
  Cube_2.receiveShadow = true;
  arm.add(Cube_2);

  const Ellipse_6 = new THREE.Mesh(
    ellipseExtrudeGeometry_4,
    materials['6bdc5132-7ea6-4d70-8d2b-c8849ea9973b'],
  );
  Ellipse_6.name = 'Ellipse 6';
  Ellipse_6.position.set(15.042097, 1.437313, -2.583165);
  Ellipse_6.rotation.set(-1.570796, 1.466077, -1.570796);
  Ellipse_6.scale.set(1, 1, 1);
  Ellipse_6.castShadow = true;
  Ellipse_6.receiveShadow = true;
  Hand_LEFT.add(Ellipse_6);

  const Ellipse_2 = new THREE.Mesh(
    ellipseExtrudeGeometry_5,
    materials['6bdc5132-7ea6-4d70-8d2b-c8849ea9973b'],
  );
  Ellipse_2.name = 'Ellipse 2';
  Ellipse_2.position.set(13.387598, 1.263418, -2.583165);
  Ellipse_2.rotation.set(-1.570796, 1.466077, -1.570796);
  Ellipse_2.scale.set(1, 1, 1);
  Ellipse_2.castShadow = true;
  Ellipse_2.receiveShadow = true;
  Hand_LEFT.add(Ellipse_2);

  const Rectangle_2 = new THREE.Mesh(
    rectExtrudeGeometry_3,
    materials['6bdc5132-7ea6-4d70-8d2b-c8849ea9973b'],
  );
  Rectangle_2.name = 'Rectangle 2';
  Rectangle_2.position.set(3.272014, -0.386941, -7.253705);
  Rectangle_2.rotation.set(0, 0, -3.029018);
  Rectangle_2.scale.set(1, 1, 1);
  Rectangle_2.castShadow = true;
  Rectangle_2.receiveShadow = true;
  Hand_LEFT.add(Rectangle_2);

  const Hand_2 = new THREE.Group();
  Hand_2.name = 'Hand';
  Hand_2.position.set(112.738036, 26.226166, 1.711038);
  Top_part.add(Hand_2);

  const Hand_LEFT_2 = new THREE.Group();
  Hand_LEFT_2.name = 'Hand LEFT';
  Hand_LEFT_2.position.set(-40.588189, 98.305221, -3.47071);
  Hand_LEFT_2.rotation.set(0, 0, 0.085987);
  Hand_LEFT_2.scale.set(1, 1, 1);
  Hand_2.add(Hand_LEFT_2);

  const arm_2 = new THREE.Group();
  arm_2.name = 'arm';
  arm_2.position.set(24.873446, 7.425945, 2.202431);
  Hand_LEFT_2.add(arm_2);

  const elbow_2 = new THREE.Group();
  elbow_2.name = 'elbow';
  elbow_2.position.set(20.541998, -85.632304, 2.657058);
  elbow_2.rotation.set(0, -0.142001, 0);
  elbow_2.scale.set(1, 1, 1);
  arm_2.add(elbow_2);

  const Group_5 = new THREE.Group();
  Group_5.name = 'Group';
  Group_5.position.set(-0.745778, -0.015518, -0.393904);
  Group_5.rotation.set(0.323899, 0, 0);
  Group_5.scale.set(1, 1, 1);
  elbow_2.add(Group_5);

  const Rectangle_3_2 = new THREE.Mesh(
    rectExtrudeGeometry,
    materials['6bdc5132-7ea6-4d70-8d2b-c8849ea9973b'],
  );
  Rectangle_3_2.name = 'Rectangle 3';
  Rectangle_3_2.position.set(1.628032, -2.934109, 1.692717);
  Rectangle_3_2.rotation.set(-0.74906, 1.540222, 0.404439);
  Rectangle_3_2.scale.set(1, 1, 1);
  Rectangle_3_2.castShadow = true;
  Rectangle_3_2.receiveShadow = true;
  Group_5.add(Rectangle_3_2);

  const Ellipse_3_2 = new THREE.Mesh(
    ellipseExtrudeGeometry,
    materials['6bdc5132-7ea6-4d70-8d2b-c8849ea9973b'],
  );
  Ellipse_3_2.name = 'Ellipse 3';
  Ellipse_3_2.position.set(0.019285, 22.10977, -8.153224);
  Ellipse_3_2.rotation.set(1.209142, -0.001483, 0.06355);
  Ellipse_3_2.scale.set(1, 1, 1);
  Ellipse_3_2.castShadow = true;
  Ellipse_3_2.receiveShadow = true;
  Group_5.add(Ellipse_3_2);

  const forearm_2 = new THREE.Group();
  forearm_2.name = 'forearm';
  forearm_2.position.set(-4.789966, -12.261409, 1.360096);
  forearm_2.rotation.set(0.323899, 0, 0);
  forearm_2.scale.set(1, 1, 1);
  elbow_2.add(forearm_2);

  const Hand_3 = bakedAssets['29a7d5fe-83bf-472d-a861-6907e20a9a5b'].clone();
  Hand_3.material = materials['6bdc5132-7ea6-4d70-8d2b-c8849ea9973b'];
  Hand_3.name = 'Hand';
  Hand_3.position.set(-9.434524, -91.204258, 36.550164);
  Hand_3.rotation.set(0.280377, 0.938657, 2.475429);
  Hand_3.scale.set(-1.4, 1.4, 1.4);
  Hand_3.castShadow = true;
  Hand_3.receiveShadow = true;
  forearm_2.add(Hand_3);

  const Ellipse_5_2 = new THREE.Mesh(
    ellipseExtrudeGeometry_2,
    materials['6bdc5132-7ea6-4d70-8d2b-c8849ea9973b'],
  );
  Ellipse_5_2.name = 'Ellipse 5';
  Ellipse_5_2.position.set(-7.607973, -0.806285, -0.893992);
  Ellipse_5_2.rotation.set(-0.750492, 1.53589, 0.401426);
  Ellipse_5_2.scale.set(1, 1, 1);
  Ellipse_5_2.castShadow = true;
  Ellipse_5_2.receiveShadow = true;
  forearm_2.add(Ellipse_5_2);

  const Rectangle_4_2 = new THREE.Mesh(
    rectExtrudeGeometry_2,
    materials['6bdc5132-7ea6-4d70-8d2b-c8849ea9973b'],
  );
  Rectangle_4_2.name = 'Rectangle 4';
  Rectangle_4_2.position.set(-4.097562, -8.118756, 1.665227);
  Rectangle_4_2.rotation.set(-0.74906, 1.540222, 0.404439);
  Rectangle_4_2.scale.set(1, 1, 1);
  Rectangle_4_2.castShadow = true;
  Rectangle_4_2.receiveShadow = true;
  forearm_2.add(Rectangle_4_2);

  const Ellipse_4_2 = new THREE.Mesh(
    ellipseExtrudeGeometry_3,
    materials['6bdc5132-7ea6-4d70-8d2b-c8849ea9973b'],
  );
  Ellipse_4_2.name = 'Ellipse 4';
  Ellipse_4_2.position.set(3.988018, -14.413379, 4.283465);
  Ellipse_4_2.rotation.set(1.209142, -0.001483, 0.06355);
  Ellipse_4_2.scale.set(1, 1, 1);
  Ellipse_4_2.castShadow = true;
  Ellipse_4_2.receiveShadow = true;
  forearm_2.add(Ellipse_4_2);

  const Cube_3_2 = bakedAssets['2cb7c1f2-8047-4b8e-ab42-e1291863ae2b'].clone();
  Cube_3_2.material = materials['342265b2-6982-4c49-b670-fee0149640a3'];
  Cube_3_2.name = 'Cube 3';
  Cube_3_2.position.set(-0.423061, -62.578567, 23.356696);
  Cube_3_2.rotation.set(0.998206, 1.408529, -1.444335);
  Cube_3_2.scale.set(1, 1, 1);
  Cube_3_2.castShadow = true;
  Cube_3_2.receiveShadow = true;
  forearm_2.add(Cube_3_2);

  const Cube_2_2 = bakedAssets['695ea319-f3dc-4aeb-af0f-db05e68b5a1d'].clone();
  Cube_2_2.material = materials['342265b2-6982-4c49-b670-fee0149640a3'];
  Cube_2_2.name = 'Cube 2';
  Cube_2_2.position.set(23.34458, -26.18998, -4.771457);
  Cube_2_2.rotation.set(0, 0, 0.368074);
  Cube_2_2.scale.set(1, 1, 1);
  Cube_2_2.castShadow = true;
  Cube_2_2.receiveShadow = true;
  arm_2.add(Cube_2_2);

  const Ellipse_6_2 = new THREE.Mesh(
    ellipseExtrudeGeometry_4,
    materials['6bdc5132-7ea6-4d70-8d2b-c8849ea9973b'],
  );
  Ellipse_6_2.name = 'Ellipse 6';
  Ellipse_6_2.position.set(15.042097, 1.437313, -2.583165);
  Ellipse_6_2.rotation.set(-1.570796, 1.466077, -1.570796);
  Ellipse_6_2.scale.set(1, 1, 1);
  Ellipse_6_2.castShadow = true;
  Ellipse_6_2.receiveShadow = true;
  Hand_LEFT_2.add(Ellipse_6_2);

  const Ellipse_2_2 = new THREE.Mesh(
    ellipseExtrudeGeometry_5,
    materials['6bdc5132-7ea6-4d70-8d2b-c8849ea9973b'],
  );
  Ellipse_2_2.name = 'Ellipse 2';
  Ellipse_2_2.position.set(13.387598, 1.263418, -2.583165);
  Ellipse_2_2.rotation.set(-1.570796, 1.466077, -1.570796);
  Ellipse_2_2.scale.set(1, 1, 1);
  Ellipse_2_2.castShadow = true;
  Ellipse_2_2.receiveShadow = true;
  Hand_LEFT_2.add(Ellipse_2_2);

  const Rectangle_2_2 = new THREE.Mesh(
    rectExtrudeGeometry_3,
    materials['6bdc5132-7ea6-4d70-8d2b-c8849ea9973b'],
  );
  Rectangle_2_2.name = 'Rectangle 2';
  Rectangle_2_2.position.set(3.272014, -0.386941, -7.253705);
  Rectangle_2_2.rotation.set(0, 0, -3.029018);
  Rectangle_2_2.scale.set(1, 1, 1);
  Rectangle_2_2.castShadow = true;
  Rectangle_2_2.receiveShadow = true;
  Hand_LEFT_2.add(Rectangle_2_2);

  const Body = bakedAssets['ad502cc8-8b8d-4446-8024-62ceda574a65'].clone();
  Body.material = materials['342265b2-6982-4c49-b670-fee0149640a3'];
  Body.name = 'Body';
  Body.position.set(0.184025, -111.858585, 10.701127);
  Body.castShadow = true;
  Body.receiveShadow = true;
  Top_part.add(Body);

  const Group_6 = new THREE.Group();
  Group_6.name = 'Group';
  Group_6.position.set(-67.839654, 234.756813, -10.055411);
  Group_6.rotation.set(0, 0, -0.093819);
  Group_6.scale.set(-1, 1, 1);
  Body.add(Group_6);

  const Ellipse = new THREE.Mesh(
    ellipseExtrudeGeometry_6,
    materials['6bdc5132-7ea6-4d70-8d2b-c8849ea9973b'],
  );
  Ellipse.name = 'Ellipse';
  Ellipse.position.set(3.583121, 0.584768, -10.710316);
  Ellipse.rotation.set(0, 0, 0.10472);
  Ellipse.scale.set(1, 1, 1);
  Ellipse.castShadow = true;
  Ellipse.receiveShadow = true;
  Group_6.add(Ellipse);

  const Rectangle = new THREE.Mesh(
    rectExtrudeGeometry_4,
    materials['6bdc5132-7ea6-4d70-8d2b-c8849ea9973b'],
  );
  Rectangle.name = 'Rectangle';
  Rectangle.position.set(0, 0, -0.740552);
  Rectangle.rotation.set(0, 0, 0.112574);
  Rectangle.scale.set(1, 1, 1);
  Rectangle.castShadow = true;
  Rectangle.receiveShadow = true;
  Group_6.add(Rectangle);

  const Group_7 = new THREE.Group();
  Group_7.name = 'Group';
  Group_7.position.set(67.822813, 234.78921, -10.055411);
  Group_7.rotation.set(0, 0, 0.085987);
  Group_7.scale.set(1, 1, 1);
  Body.add(Group_7);

  const Ellipse_7 = new THREE.Mesh(
    ellipseExtrudeGeometry_7,
    materials['6bdc5132-7ea6-4d70-8d2b-c8849ea9973b'],
  );
  Ellipse_7.name = 'Ellipse';
  Ellipse_7.position.set(3.583121, 0.584768, -10.710316);
  Ellipse_7.rotation.set(0, 0, 0.10472);
  Ellipse_7.scale.set(1, 1, 1);
  Ellipse_7.castShadow = true;
  Ellipse_7.receiveShadow = true;
  Group_7.add(Ellipse_7);

  const Rectangle_5 = new THREE.Mesh(
    rectExtrudeGeometry_5,
    materials['6bdc5132-7ea6-4d70-8d2b-c8849ea9973b'],
  );
  Rectangle_5.name = 'Rectangle';
  Rectangle_5.position.set(0, 0, -0.740552);
  Rectangle_5.rotation.set(0, 0, 0.112574);
  Rectangle_5.castShadow = true;
  Rectangle_5.receiveShadow = true;
  Group_7.add(Rectangle_5);

  const Bottom = new THREE.Group();
  Bottom.name = 'Bottom';
  Bottom.position.set(1.369381, 24.236298, 4.706879);
  Bot.add(Bottom);

  const Group_4_2 = new THREE.Group();
  Group_4_2.name = 'Group 4';
  Group_4_2.position.set(-1.367508, 43.102067, 4.056482);
  Bottom.add(Group_4_2);

  const Group_2_2 = new THREE.Group();
  Group_2_2.name = 'Group 2';
  Group_2_2.position.set(20.598127, 0, 0);
  Group_2_2.scale.set(-1, 1, 1);
  Group_4_2.add(Group_2_2);

  const Cylinder_4_3 = bakedAssets['050e22e5-7b7f-4dde-a791-2eefd4ce5e5b'].clone();
  Cylinder_4_3.material = materials['6bdc5132-7ea6-4d70-8d2b-c8849ea9973b'];
  Cylinder_4_3.name = 'Cylinder 4';
  Cylinder_4_3.position.set(0, 0, 0);
  Cylinder_4_3.rotation.set(0.130289, 0, -0.278824);
  Cylinder_4_3.scale.set(1, 1, 1);
  Cylinder_4_3.castShadow = true;
  Cylinder_4_3.receiveShadow = true;
  Group_2_2.add(Cylinder_4_3);

  const Group_8 = new THREE.Group();
  Group_8.name = 'Group';
  Group_8.position.set(-20.598127, 0, 0);
  Group_4_2.add(Group_8);

  const Cylinder_4_4 = bakedAssets['050e22e5-7b7f-4dde-a791-2eefd4ce5e5b'].clone();
  Cylinder_4_4.material = materials['6bdc5132-7ea6-4d70-8d2b-c8849ea9973b'];
  Cylinder_4_4.name = 'Cylinder 4';
  Cylinder_4_4.position.set(0, 0, 0);
  Cylinder_4_4.rotation.set(0.130289, 0, -0.278824);
  Cylinder_4_4.scale.set(1, 1, 1);
  Cylinder_4_4.castShadow = true;
  Cylinder_4_4.receiveShadow = true;
  Group_8.add(Cylinder_4_4);

  const Leg_Left_Instance = new THREE.Group();
  Leg_Left_Instance.name = 'Leg Left Instance';
  Leg_Left_Instance.position.set(-49.1, 2.780147, 23.601931);
  Leg_Left_Instance.rotation.set(0.127625, -0.331202, 0);
  Leg_Left_Instance.scale.set(-1, 1, 1);
  Bottom.add(Leg_Left_Instance);

  const femur = new THREE.Group();
  femur.name = 'femur';
  femur.position.set(2.574232, -66.66871, 0.633899);
  Leg_Left_Instance.add(femur);

  const Cube_3_3 = bakedAssets['0da9d4d2-4cf5-4269-9bfc-46952dbec2eb'].clone();
  Cube_3_3.material = materials['342265b2-6982-4c49-b670-fee0149640a3'];
  Cube_3_3.name = 'Cube 3';
  Cube_3_3.position.set(-0.695858, -51.541058, -1.795629);
  Cube_3_3.rotation.set(1.570796, 0, -3.141593);
  Cube_3_3.scale.set(1, 1, 1);
  Cube_3_3.castShadow = true;
  Cube_3_3.receiveShadow = true;
  femur.add(Cube_3_3);

  const Rectangle_9 = new THREE.Mesh(
    rectExtrudeGeometry_6,
    materials['6bdc5132-7ea6-4d70-8d2b-c8849ea9973b'],
  );
  Rectangle_9.name = 'Rectangle 9';
  Rectangle_9.position.set(-2.543438, -2.130781, -2.255406);
  Rectangle_9.rotation.set(-1.570796, 1.570796, 0);
  Rectangle_9.scale.set(1, 1.00292, 1);
  Rectangle_9.castShadow = true;
  Rectangle_9.receiveShadow = true;
  femur.add(Rectangle_9);

  const Rectangle_10 = new THREE.Mesh(
    rectExtrudeGeometry_7,
    materials['6bdc5132-7ea6-4d70-8d2b-c8849ea9973b'],
  );
  Rectangle_10.name = 'Rectangle 10';
  Rectangle_10.position.set(-9.695649, -92.904992, -2.255406);
  Rectangle_10.rotation.set(-1.570796, 1.570796, 0);
  Rectangle_10.scale.set(1, 1.00292, 1);
  Rectangle_10.castShadow = true;
  Rectangle_10.receiveShadow = true;
  femur.add(Rectangle_10);

  const shin = new THREE.Group();
  shin.name = 'shin';
  shin.position.set(-2.574232, -114.511958, -2.908291);
  shin.rotation.set(-0.141838, 0, 0);
  femur.add(shin);

  const Foot = new THREE.Group();
  Foot.name = 'Foot';
  Foot.position.set(0, -160.389901, -18.689457);
  shin.add(Foot);

  const Cube_5 = bakedAssets['63fcf98c-03a6-40ff-8357-19922ed43ab0'].clone();
  Cube_5.material = materials['6bdc5132-7ea6-4d70-8d2b-c8849ea9973b'];
  Cube_5.name = 'Cube 5';
  Cube_5.position.set(1.3138, -9.356308, 18.236206);
  Cube_5.rotation.set(0.009128, -0.140367, 0);
  Cube_5.scale.set(1, 1, 1);
  Cube_5.castShadow = true;
  Cube_5.receiveShadow = true;
  Foot.add(Cube_5);

  const Ellipse_5_3 = new THREE.Mesh(
    ellipseExtrudeGeometry_8,
    materials['6bdc5132-7ea6-4d70-8d2b-c8849ea9973b'],
  );
  Ellipse_5_3.name = 'Ellipse 5';
  Ellipse_5_3.position.set(2.805771, -61.162566, -29.886513);
  Ellipse_5_3.rotation.set(1.448119, 0, 3.141593);
  Ellipse_5_3.scale.set(1, 1, 1);
  Ellipse_5_3.castShadow = true;
  Ellipse_5_3.receiveShadow = true;
  shin.add(Ellipse_5_3);

  const Cube_4 = bakedAssets['16037eb4-9226-4642-a016-a2e6de44cdcb'].clone();
  Cube_4.material = materials['342265b2-6982-4c49-b670-fee0149640a3'];
  Cube_4.name = 'Cube 4';
  Cube_4.position.set(1.26208, -76.585611, 0.276309);
  Cube_4.rotation.set(1.579925, 0, -3.141593);
  Cube_4.scale.set(1, 1, 1);
  Cube_4.castShadow = true;
  Cube_4.receiveShadow = true;
  shin.add(Cube_4);

  const Ellipse_4_3 = new THREE.Mesh(
    ellipseExtrudeGeometry_9,
    materials['6bdc5132-7ea6-4d70-8d2b-c8849ea9973b'],
  );
  Ellipse_4_3.name = 'Ellipse 4';
  Ellipse_4_3.position.set(1.3138, -12.665917, 0.8598);
  Ellipse_4_3.rotation.set(1.579925, 0, -3.141593);
  Ellipse_4_3.scale.set(1, 1, 1);
  Ellipse_4_3.castShadow = true;
  Ellipse_4_3.receiveShadow = true;
  shin.add(Ellipse_4_3);

  const Rectangle_12 = new THREE.Mesh(
    rectExtrudeGeometry_8,
    materials['6bdc5132-7ea6-4d70-8d2b-c8849ea9973b'],
  );
  Rectangle_12.name = 'Rectangle 12';
  Rectangle_12.position.set(7.775672, -10.931322, 0.553126);
  Rectangle_12.rotation.set(-1.561668, 1.570796, 0);
  Rectangle_12.scale.set(1, 1.00292, 1);
  Rectangle_12.castShadow = true;
  Rectangle_12.receiveShadow = true;
  shin.add(Rectangle_12);

  const Rectangle_11 = new THREE.Mesh(
    rectExtrudeGeometry_9,
    materials['6bdc5132-7ea6-4d70-8d2b-c8849ea9973b'],
  );
  Rectangle_11.name = 'Rectangle 11';
  Rectangle_11.position.set(-18.023087, -10.931323, 0.553126);
  Rectangle_11.rotation.set(-1.561668, 1.570796, 0);
  Rectangle_11.scale.set(1, 1.00292, 1);
  Rectangle_11.castShadow = true;
  Rectangle_11.receiveShadow = true;
  shin.add(Rectangle_11);

  const Ellipse_3_3 = new THREE.Mesh(
    ellipseExtrudeGeometry_10,
    materials['6bdc5132-7ea6-4d70-8d2b-c8849ea9973b'],
  );
  Ellipse_3_3.name = 'Ellipse 3';
  Ellipse_3_3.position.set(1.276419, -29.423016, -1.275851);
  Ellipse_3_3.rotation.set(1.570796, 0, 0);
  Ellipse_3_3.castShadow = true;
  Ellipse_3_3.receiveShadow = true;
  Leg_Left_Instance.add(Ellipse_3_3);

  const Ellipse_2_3 = new THREE.Mesh(
    ellipseExtrudeGeometry_11,
    materials['6bdc5132-7ea6-4d70-8d2b-c8849ea9973b'],
  );
  Ellipse_2_3.name = 'Ellipse 2';
  Ellipse_2_3.position.set(1.276419, -23.291247, -1.275851);
  Ellipse_2_3.rotation.set(1.570796, 0, 0);
  Ellipse_2_3.castShadow = true;
  Ellipse_2_3.receiveShadow = true;
  Leg_Left_Instance.add(Ellipse_2_3);

  const Rectangle_8 = new THREE.Mesh(
    rectExtrudeGeometry_10,
    materials['6bdc5132-7ea6-4d70-8d2b-c8849ea9973b'],
  );
  Rectangle_8.name = 'Rectangle 8';
  Rectangle_8.position.set(-11.820034, -51.342582, -1.621507);
  Rectangle_8.rotation.set(-1.570796, 1.570796, 0);
  Rectangle_8.scale.set(1, 1.00292, 1);
  Rectangle_8.castShadow = true;
  Rectangle_8.receiveShadow = true;
  Leg_Left_Instance.add(Rectangle_8);

  const Rectangle_7 = new THREE.Mesh(
    rectExtrudeGeometry_11,
    materials['6bdc5132-7ea6-4d70-8d2b-c8849ea9973b'],
  );
  Rectangle_7.name = 'Rectangle 7';
  Rectangle_7.position.set(-2.67961, -9.708554, 0.025493);
  Rectangle_7.rotation.set(1.570796, 1.570796, 0);
  Rectangle_7.scale.set(1, 1.00292, 1);
  Rectangle_7.castShadow = true;
  Rectangle_7.receiveShadow = true;
  Leg_Left_Instance.add(Rectangle_7);

  const Leg_Left = new THREE.Group();
  Leg_Left.name = 'Leg Left';
  Leg_Left.position.set(49.100531, 2.780147, 23.601931);
  Leg_Left.rotation.set(0.127625, 0.305371, 0);
  Bottom.add(Leg_Left);

  const femur_2 = new THREE.Group();
  femur_2.name = 'femur';
  femur_2.position.set(2.574232, -66.66871, 0.633899);
  Leg_Left.add(femur_2);

  const Cube_3_4 = bakedAssets['0da9d4d2-4cf5-4269-9bfc-46952dbec2eb'].clone();
  Cube_3_4.material = materials['342265b2-6982-4c49-b670-fee0149640a3'];
  Cube_3_4.name = 'Cube 3';
  Cube_3_4.position.set(-0.695858, -51.541058, -1.795629);
  Cube_3_4.rotation.set(1.570796, 0, -3.141593);
  Cube_3_4.scale.set(1, 1, 1);
  Cube_3_4.castShadow = true;
  Cube_3_4.receiveShadow = true;
  femur_2.add(Cube_3_4);

  const Rectangle_9_2 = new THREE.Mesh(
    rectExtrudeGeometry_6,
    materials['6bdc5132-7ea6-4d70-8d2b-c8849ea9973b'],
  );
  Rectangle_9_2.name = 'Rectangle 9';
  Rectangle_9_2.position.set(-2.543438, -2.130781, -2.255406);
  Rectangle_9_2.rotation.set(-1.570796, 1.570796, 0);
  Rectangle_9_2.scale.set(1, 1.00292, 1);
  Rectangle_9_2.castShadow = true;
  Rectangle_9_2.receiveShadow = true;
  femur_2.add(Rectangle_9_2);

  const Rectangle_10_2 = new THREE.Mesh(
    rectExtrudeGeometry_7,
    materials['6bdc5132-7ea6-4d70-8d2b-c8849ea9973b'],
  );
  Rectangle_10_2.name = 'Rectangle 10';
  Rectangle_10_2.position.set(-9.695649, -92.904992, -2.255406);
  Rectangle_10_2.rotation.set(-1.570796, 1.570796, 0);
  Rectangle_10_2.scale.set(1, 1.00292, 1);
  Rectangle_10_2.castShadow = true;
  Rectangle_10_2.receiveShadow = true;
  femur_2.add(Rectangle_10_2);

  const shin_2 = new THREE.Group();
  shin_2.name = 'shin';
  shin_2.position.set(-2.574232, -114.511958, -2.908291);
  shin_2.rotation.set(-0.141838, 0, 0);
  femur_2.add(shin_2);

  const Foot_2 = new THREE.Group();
  Foot_2.name = 'Foot';
  Foot_2.position.set(0, -160.389901, -18.689457);
  shin_2.add(Foot_2);

  const Cube_5_2 = bakedAssets['63fcf98c-03a6-40ff-8357-19922ed43ab0'].clone();
  Cube_5_2.material = materials['6bdc5132-7ea6-4d70-8d2b-c8849ea9973b'];
  Cube_5_2.name = 'Cube 5';
  Cube_5_2.position.set(1.3138, -9.356308, 18.236206);
  Cube_5_2.rotation.set(0.009128, -0.140367, 0);
  Cube_5_2.scale.set(1, 1, 1);
  Cube_5_2.castShadow = true;
  Cube_5_2.receiveShadow = true;
  Foot_2.add(Cube_5_2);

  const Ellipse_5_4 = new THREE.Mesh(
    ellipseExtrudeGeometry_8,
    materials['6bdc5132-7ea6-4d70-8d2b-c8849ea9973b'],
  );
  Ellipse_5_4.name = 'Ellipse 5';
  Ellipse_5_4.position.set(2.805771, -61.162566, -29.886513);
  Ellipse_5_4.rotation.set(1.448119, 0, 3.141593);
  Ellipse_5_4.scale.set(1, 1, 1);
  Ellipse_5_4.castShadow = true;
  Ellipse_5_4.receiveShadow = true;
  shin_2.add(Ellipse_5_4);

  const Cube_4_2 = bakedAssets['16037eb4-9226-4642-a016-a2e6de44cdcb'].clone();
  Cube_4_2.material = materials['342265b2-6982-4c49-b670-fee0149640a3'];
  Cube_4_2.name = 'Cube 4';
  Cube_4_2.position.set(1.26208, -76.585611, 0.276309);
  Cube_4_2.rotation.set(1.579925, 0, -3.141593);
  Cube_4_2.scale.set(1, 1, 1);
  Cube_4_2.castShadow = true;
  Cube_4_2.receiveShadow = true;
  shin_2.add(Cube_4_2);

  const Ellipse_4_4 = new THREE.Mesh(
    ellipseExtrudeGeometry_9,
    materials['6bdc5132-7ea6-4d70-8d2b-c8849ea9973b'],
  );
  Ellipse_4_4.name = 'Ellipse 4';
  Ellipse_4_4.position.set(1.3138, -12.665917, 0.8598);
  Ellipse_4_4.rotation.set(1.579925, 0, -3.141593);
  Ellipse_4_4.scale.set(1, 1, 1);
  Ellipse_4_4.castShadow = true;
  Ellipse_4_4.receiveShadow = true;
  shin_2.add(Ellipse_4_4);

  const Rectangle_12_2 = new THREE.Mesh(
    rectExtrudeGeometry_8,
    materials['6bdc5132-7ea6-4d70-8d2b-c8849ea9973b'],
  );
  Rectangle_12_2.name = 'Rectangle 12';
  Rectangle_12_2.position.set(7.775672, -10.931322, 0.553126);
  Rectangle_12_2.rotation.set(-1.561668, 1.570796, 0);
  Rectangle_12_2.scale.set(1, 1.00292, 1);
  Rectangle_12_2.castShadow = true;
  Rectangle_12_2.receiveShadow = true;
  shin_2.add(Rectangle_12_2);

  const Rectangle_11_2 = new THREE.Mesh(
    rectExtrudeGeometry_9,
    materials['6bdc5132-7ea6-4d70-8d2b-c8849ea9973b'],
  );
  Rectangle_11_2.name = 'Rectangle 11';
  Rectangle_11_2.position.set(-18.023087, -10.931323, 0.553126);
  Rectangle_11_2.rotation.set(-1.561668, 1.570796, 0);
  Rectangle_11_2.scale.set(1, 1.00292, 1);
  Rectangle_11_2.castShadow = true;
  Rectangle_11_2.receiveShadow = true;
  shin_2.add(Rectangle_11_2);

  const Ellipse_3_4 = new THREE.Mesh(
    ellipseExtrudeGeometry_10,
    materials['6bdc5132-7ea6-4d70-8d2b-c8849ea9973b'],
  );
  Ellipse_3_4.name = 'Ellipse 3';
  Ellipse_3_4.position.set(1.276419, -29.423016, -1.275851);
  Ellipse_3_4.rotation.set(1.570796, 0, 0);
  Ellipse_3_4.castShadow = true;
  Ellipse_3_4.receiveShadow = true;
  Leg_Left.add(Ellipse_3_4);

  const Ellipse_2_4 = new THREE.Mesh(
    ellipseExtrudeGeometry_11,
    materials['6bdc5132-7ea6-4d70-8d2b-c8849ea9973b'],
  );
  Ellipse_2_4.name = 'Ellipse 2';
  Ellipse_2_4.position.set(1.276419, -23.291247, -1.275851);
  Ellipse_2_4.rotation.set(1.570796, 0, 0);
  Ellipse_2_4.castShadow = true;
  Ellipse_2_4.receiveShadow = true;
  Leg_Left.add(Ellipse_2_4);

  const Rectangle_8_2 = new THREE.Mesh(
    rectExtrudeGeometry_10,
    materials['6bdc5132-7ea6-4d70-8d2b-c8849ea9973b'],
  );
  Rectangle_8_2.name = 'Rectangle 8';
  Rectangle_8_2.position.set(-11.820034, -51.342582, -1.621507);
  Rectangle_8_2.rotation.set(-1.570796, 1.570796, 0);
  Rectangle_8_2.scale.set(1, 1.00292, 1);
  Rectangle_8_2.castShadow = true;
  Rectangle_8_2.receiveShadow = true;
  Leg_Left.add(Rectangle_8_2);

  const Rectangle_7_2 = new THREE.Mesh(
    rectExtrudeGeometry_11,
    materials['6bdc5132-7ea6-4d70-8d2b-c8849ea9973b'],
  );
  Rectangle_7_2.name = 'Rectangle 7';
  Rectangle_7_2.position.set(-2.67961, -9.708554, 0.025493);
  Rectangle_7_2.rotation.set(1.570796, 1.570796, 0);
  Rectangle_7_2.scale.set(1, 1.00292, 1);
  Rectangle_7_2.castShadow = true;
  Rectangle_7_2.receiveShadow = true;
  Leg_Left.add(Rectangle_7_2);

  const Pelvic = new THREE.Group();
  Pelvic.name = 'Pelvic';
  Pelvic.position.set(-1.369381, 13.504445, -0.958545);
  Bottom.add(Pelvic);

  const Group_2_3 = new THREE.Group();
  Group_2_3.name = 'Group 2';
  Group_2_3.position.set(-45.453043, -13.74685, 14.786791);
  Group_2_3.scale.set(-1, 1, 1);
  Pelvic.add(Group_2_3);

  const Rectangle_5_2 = new THREE.Mesh(
    rectExtrudeGeometry_12,
    materials['6bdc5132-7ea6-4d70-8d2b-c8849ea9973b'],
  );
  Rectangle_5_2.name = 'Rectangle 5';
  Rectangle_5_2.position.set(-15.647526, 1.409058, 1.518551);
  Rectangle_5_2.rotation.set(3.141593, 1.570796, 0);
  Rectangle_5_2.scale.set(1, 1, 1);
  Rectangle_5_2.castShadow = true;
  Rectangle_5_2.receiveShadow = true;
  Group_2_3.add(Rectangle_5_2);

  const Ellipse_8 = new THREE.Mesh(
    ellipseExtrudeGeometry_12,
    materials['6bdc5132-7ea6-4d70-8d2b-c8849ea9973b'],
  );
  Ellipse_8.name = 'Ellipse';
  Ellipse_8.position.set(0, 0, -21.967565);
  Ellipse_8.rotation.set(0, 0, -3.141593);
  Ellipse_8.scale.set(1, 1, 1);
  Ellipse_8.castShadow = true;
  Ellipse_8.receiveShadow = true;
  Group_2_3.add(Ellipse_8);

  const Group_9 = new THREE.Group();
  Group_9.name = 'Group';
  Group_9.position.set(48.587897, -13.74685, 14.786791);
  Pelvic.add(Group_9);

  const Rectangle_5_3 = new THREE.Mesh(
    rectExtrudeGeometry_13,
    materials['6bdc5132-7ea6-4d70-8d2b-c8849ea9973b'],
  );
  Rectangle_5_3.name = 'Rectangle 5';
  Rectangle_5_3.position.set(-15.647526, 1.409058, 1.518551);
  Rectangle_5_3.rotation.set(3.141593, 1.570796, 0);
  Rectangle_5_3.scale.set(1, 1, 1);
  Rectangle_5_3.castShadow = true;
  Rectangle_5_3.receiveShadow = true;
  Group_9.add(Rectangle_5_3);

  const Ellipse_9 = new THREE.Mesh(
    ellipseExtrudeGeometry_13,
    materials['6bdc5132-7ea6-4d70-8d2b-c8849ea9973b'],
  );
  Ellipse_9.name = 'Ellipse';
  Ellipse_9.position.set(0, 0, -21.967565);
  Ellipse_9.rotation.set(0, 0, -3.141593);
  Ellipse_9.scale.set(1, 1, 1);
  Ellipse_9.castShadow = true;
  Ellipse_9.receiveShadow = true;
  Group_9.add(Ellipse_9);

  const Rectangle_4_3 = new THREE.Mesh(
    rectExtrudeGeometry_14,
    materials['6bdc5132-7ea6-4d70-8d2b-c8849ea9973b'],
  );
  Rectangle_4_3.name = 'Rectangle 4';
  Rectangle_4_3.position.set(0, -13.172924, -5.527948);
  Rectangle_4_3.rotation.set(-3.141593, 0, 0);
  Rectangle_4_3.scale.set(1, 0.875405, 1);
  Rectangle_4_3.castShadow = true;
  Rectangle_4_3.receiveShadow = true;
  Pelvic.add(Rectangle_4_3);

  const Group_3_2 = new THREE.Group();
  Group_3_2.name = 'Group 3';
  Group_3_2.position.set(0, -13.172924, 0.664054);
  Pelvic.add(Group_3_2);

  const Rectangle_3_3 = new THREE.Mesh(
    rectExtrudeGeometry_15,
    materials['6bdc5132-7ea6-4d70-8d2b-c8849ea9973b'],
  );
  Rectangle_3_3.name = 'Rectangle 3';
  Rectangle_3_3.position.set(25.70892, 0, 0);
  Rectangle_3_3.rotation.set(1.570796, -1.570796, 0);
  Rectangle_3_3.scale.set(1, 0.875405, 1);
  Rectangle_3_3.castShadow = true;
  Rectangle_3_3.receiveShadow = true;
  Group_3_2.add(Rectangle_3_3);

  const Rectangle_6 = new THREE.Mesh(
    rectExtrudeGeometry_16,
    materials['6bdc5132-7ea6-4d70-8d2b-c8849ea9973b'],
  );
  Rectangle_6.name = 'Rectangle';
  Rectangle_6.position.set(0, 61.488752, 0.664054);
  Rectangle_6.rotation.set(1.570796, 0, 0);
  Rectangle_6.castShadow = true;
  Rectangle_6.receiveShadow = true;
  Pelvic.add(Rectangle_6);

  const camera = new THREE.PerspectiveCamera(45, 1, 70, 100000); // aspect set by caller based on viewport
  camera.position.set(-6.279971, 219.995091, 735.089341);
  root.add(camera);

  const cameras = { 'Camera 2': Camera_2, '': camera };
  const lights = { 'Point Light': Point_Light };

  return { root, cameras, lights };
}
