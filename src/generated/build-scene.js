// GENERATED FILE -- do not hand-edit.
// Produced by scripts/generate-scene.mjs from generated/scene-description.json
// (itself produced by scripts/extract-scene.mjs walking the live
// @splinetool/runtime scene graph for public/scene.splinecode).
//
// Phase 1 scope: hierarchy, transforms, cameras, lights, and primitive
// Box/Cylinder geometry. Meshes using organic/subdivided/vector geometry are
// left as TODO comments (68 of them) -- phase 3 bakes those to
// glTF assets. Materials come from phase 2's build-materials.js (real
// layered-material translation, see that file for per-material notes).
import * as THREE from 'three';
import { buildMaterials } from './build-materials.js';

export function buildScene() {
  const materials = buildMaterials();

  const boxGeometry = new THREE.BoxGeometry(
    5,
    16,
    8,
    1,
    1,
    1,
  ); /* cornerRadius=1 not represented -- THREE.BoxGeometry has sharp edges, see phase notes */
  const cylinderGeometry = new THREE.CylinderGeometry(
    80,
    23,
    45.03777,
    12,
    1,
    false,
    0,
    6.283185,
  ); /* cornerRadius=3, hollow=0.83 not represented, see phase notes */
  const cylinderGeometry_2 = new THREE.CylinderGeometry(
    50,
    50,
    63.42429,
    8,
    1,
    false,
    0,
    6.283185,
  ); /* cornerRadius=8, hollow=0 not represented, see phase notes */
  const cylinderGeometry_3 = new THREE.CylinderGeometry(
    50,
    50,
    63.42429,
    6,
    1,
    false,
    0,
    6.283185,
  ); /* cornerRadius=8, hollow=0 not represented, see phase notes */

  const root = new THREE.Group();
  root.name = 'Scene 1';

  const Camera_2 = new THREE.PerspectiveCamera(45, 1, 70, 100000); // aspect set by caller based on viewport
  Camera_2.position.set(0, 248.98, 360);
  Camera_2.rotation.set(0.014486, 0, 0);
  root.add(Camera_2);

  const Point_Light = new THREE.PointLight(0xffffff, 5000000); // intensity includes an empirical distance-falloff calibration factor, see DISTANCE_FALLOFF_LIGHT_CALIBRATION in generate-scene.mjs
  Point_Light.position.set(-595, 579, -393);
  root.add(Point_Light);

  const logo = new THREE.Group();
  logo.name = 'logo';
  logo.position.set(0, 146, -1000);
  logo.scale.set(0.3, 0.3, 0.3);
  root.add(logo);

  // TODO(phase 3): "Shape 0" used VectorGeometry geometry (organic/vector/procedural geometry -- handled in phase 3 (glTF bake) or a later pass); standing in with an empty Group so its children still attach correctly.
  const Shape_0 = new THREE.Group();
  Shape_0.position.set(-1919, 250, -0.03);
  Shape_0.castShadow = true;
  Shape_0.receiveShadow = true;
  logo.add(Shape_0);

  // TODO(phase 3): "Shape 1" used VectorGeometry geometry (organic/vector/procedural geometry -- handled in phase 3 (glTF bake) or a later pass); standing in with an empty Group so its children still attach correctly.
  const Shape_1 = new THREE.Group();
  Shape_1.position.set(696, 250, -0.02);
  Shape_1.castShadow = true;
  Shape_1.receiveShadow = true;
  logo.add(Shape_1);

  // TODO(phase 3): "Shape 2" used VectorGeometry geometry (organic/vector/procedural geometry -- handled in phase 3 (glTF bake) or a later pass); standing in with an empty Group so its children still attach correctly.
  const Shape_2 = new THREE.Group();
  Shape_2.position.set(1319, 250, -0.01);
  Shape_2.castShadow = true;
  Shape_2.receiveShadow = true;
  logo.add(Shape_2);

  // TODO(phase 3): "Shape 3" used VectorGeometry geometry (organic/vector/procedural geometry -- handled in phase 3 (glTF bake) or a later pass); standing in with an empty Group so its children still attach correctly.
  const Shape_3 = new THREE.Group();
  Shape_3.position.set(-1165, 250, 0);
  Shape_3.castShadow = true;
  Shape_3.receiveShadow = true;
  logo.add(Shape_3);

  // TODO(phase 3): "Shape 4" used VectorGeometry geometry (organic/vector/procedural geometry -- handled in phase 3 (glTF bake) or a later pass); standing in with an empty Group so its children still attach correctly.
  const Shape_4 = new THREE.Group();
  Shape_4.position.set(-1265, 50, 0.01);
  Shape_4.castShadow = true;
  Shape_4.receiveShadow = true;
  logo.add(Shape_4);

  // TODO(phase 3): "Shape 5" used VectorGeometry geometry (organic/vector/procedural geometry -- handled in phase 3 (glTF bake) or a later pass); standing in with an empty Group so its children still attach correctly.
  const Shape_5 = new THREE.Group();
  Shape_5.position.set(42, 250, 0.02);
  Shape_5.castShadow = true;
  Shape_5.receiveShadow = true;
  logo.add(Shape_5);

  // TODO(phase 3): "Shape 6" used VectorGeometry geometry (organic/vector/procedural geometry -- handled in phase 3 (glTF bake) or a later pass); standing in with an empty Group so its children still attach correctly.
  const Shape_6 = new THREE.Group();
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
  Head.position.set(0.939879, 100.623363, 2.670301);
  Top_part.add(Head);

  // TODO(phase 3): "Head 2" used SubdivGeometry geometry (organic/vector/procedural geometry -- handled in phase 3 (glTF bake) or a later pass); standing in with an empty Group so its children still attach correctly.
  const Head_2 = new THREE.Group();
  Head_2.position.set(0, -10.959373, 4.00351);
  Head_2.castShadow = true;
  Head_2.receiveShadow = true;
  Head.add(Head_2);

  const Neck = new THREE.Group();
  Neck.name = 'Neck';
  Neck.position.set(0.939879, 106.841243, -10.699503);
  Top_part.add(Neck);

  const Cube = new THREE.Mesh(boxGeometry, materials['6bdc5132-7ea6-4d70-8d2b-c8849ea9973b']);
  Cube.position.set(0, -13.239626, -0.347205);
  Cube.rotation.set(0.122173, 0, 0);
  Cube.scale.set(1.25, 1.25, 1.25);
  Cube.castShadow = true;
  Cube.receiveShadow = true;
  Neck.add(Cube);

  const Cylinder_3 = new THREE.Mesh(
    cylinderGeometry,
    materials['342265b2-6982-4c49-b670-fee0149640a3'],
  );
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

  const Cylinder_4 = new THREE.Mesh(
    cylinderGeometry_2,
    materials['6bdc5132-7ea6-4d70-8d2b-c8849ea9973b'],
  );
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

  const Cylinder_4_2 = new THREE.Mesh(
    cylinderGeometry_2,
    materials['6bdc5132-7ea6-4d70-8d2b-c8849ea9973b'],
  );
  Cylinder_4_2.position.set(0, 0, 0);
  Cylinder_4_2.rotation.set(0.130289, 0, -0.278824);
  Cylinder_4_2.scale.set(1, 1, 1);
  Cylinder_4_2.castShadow = true;
  Cylinder_4_2.receiveShadow = true;
  Group.add(Cylinder_4_2);

  const Cylinder = new THREE.Mesh(
    cylinderGeometry_3,
    materials['6bdc5132-7ea6-4d70-8d2b-c8849ea9973b'],
  );
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
  elbow.position.set(12.891958, 30.327545, -1.570261);
  elbow.rotation.set(0, -0.142001, 0);
  elbow.scale.set(1, 1, 1);
  arm.add(elbow);

  const Group_4 = new THREE.Group();
  Group_4.name = 'Group';
  Group_4.position.set(4.044188, 50.555755, -23.81106);
  elbow.add(Group_4);

  // TODO(phase 3): "Rectangle 3" used RectangleGeometry geometry (organic/vector/procedural geometry -- handled in phase 3 (glTF bake) or a later pass); standing in with an empty Group so its children still attach correctly.
  const Rectangle_3 = new THREE.Group();
  Rectangle_3.position.set(1.628032, -2.934109, 1.692717);
  Rectangle_3.rotation.set(-0.74906, 1.540222, 0.404439);
  Rectangle_3.scale.set(1, 1, 1);
  Rectangle_3.castShadow = true;
  Rectangle_3.receiveShadow = true;
  Group_4.add(Rectangle_3);

  // TODO(phase 3): "Ellipse 3" used EllipseGeometry geometry (organic/vector/procedural geometry -- handled in phase 3 (glTF bake) or a later pass); standing in with an empty Group so its children still attach correctly.
  const Ellipse_3 = new THREE.Group();
  Ellipse_3.position.set(0.019285, 22.10977, -8.153224);
  Ellipse_3.rotation.set(1.209142, -0.001483, 0.06355);
  Ellipse_3.scale.set(1, 1, 1);
  Ellipse_3.castShadow = true;
  Ellipse_3.receiveShadow = true;
  Group_4.add(Ellipse_3);

  const forearm = new THREE.Group();
  forearm.name = 'forearm';
  forearm.position.set(0, 39.504866, -18.250825);
  elbow.add(forearm);

  // TODO(phase 3): "Hand" used SubdivGeometry geometry (organic/vector/procedural geometry -- handled in phase 3 (glTF bake) or a later pass); standing in with an empty Group so its children still attach correctly.
  const Hand = new THREE.Group();
  Hand.position.set(-9.434524, -91.204258, 36.550164);
  Hand.rotation.set(0.604276, 0.938657, 2.475429);
  Hand.scale.set(-1.4, 1.4, 1.4);
  Hand.castShadow = true;
  Hand.receiveShadow = true;
  forearm.add(Hand);

  // TODO(phase 3): "Ellipse 5" used EllipseGeometry geometry (organic/vector/procedural geometry -- handled in phase 3 (glTF bake) or a later pass); standing in with an empty Group so its children still attach correctly.
  const Ellipse_5 = new THREE.Group();
  Ellipse_5.position.set(-7.607973, 49.656784, -19.144817);
  Ellipse_5.rotation.set(-0.750492, 1.53589, 0.401426);
  Ellipse_5.scale.set(1, 1, 1);
  Ellipse_5.castShadow = true;
  Ellipse_5.receiveShadow = true;
  forearm.add(Ellipse_5);

  // TODO(phase 3): "Rectangle 4" used RectangleGeometry geometry (organic/vector/procedural geometry -- handled in phase 3 (glTF bake) or a later pass); standing in with an empty Group so its children still attach correctly.
  const Rectangle_4 = new THREE.Group();
  Rectangle_4.position.set(-4.097562, 42.344313, -16.585599);
  Rectangle_4.rotation.set(-0.74906, 1.540222, 0.404439);
  Rectangle_4.scale.set(1, 1, 1);
  Rectangle_4.castShadow = true;
  Rectangle_4.receiveShadow = true;
  forearm.add(Rectangle_4);

  // TODO(phase 3): "Ellipse 4" used EllipseGeometry geometry (organic/vector/procedural geometry -- handled in phase 3 (glTF bake) or a later pass); standing in with an empty Group so its children still attach correctly.
  const Ellipse_4 = new THREE.Group();
  Ellipse_4.position.set(3.988018, 36.04969, -13.967361);
  Ellipse_4.rotation.set(1.209142, -0.001483, 0.06355);
  Ellipse_4.scale.set(1, 1, 1);
  Ellipse_4.castShadow = true;
  Ellipse_4.receiveShadow = true;
  forearm.add(Ellipse_4);

  // TODO(phase 3): "Cube 3" used SubdivGeometry geometry (organic/vector/procedural geometry -- handled in phase 3 (glTF bake) or a later pass); standing in with an empty Group so its children still attach correctly.
  const Cube_3 = new THREE.Group();
  Cube_3.position.set(-0.414623, -12.090099, 5.105871);
  Cube_3.rotation.set(1.391073, 1.059082, -1.853814);
  Cube_3.scale.set(1, 1, 1);
  Cube_3.castShadow = true;
  Cube_3.receiveShadow = true;
  forearm.add(Cube_3);

  // TODO(phase 3): "Cube 2" used SubdivGeometry geometry (organic/vector/procedural geometry -- handled in phase 3 (glTF bake) or a later pass); standing in with an empty Group so its children still attach correctly.
  const Cube_2 = new THREE.Group();
  Cube_2.position.set(15.694539, 89.76987, -8.998776);
  Cube_2.scale.set(1, 1, 1);
  Cube_2.castShadow = true;
  Cube_2.receiveShadow = true;
  arm.add(Cube_2);

  // TODO(phase 3): "Ellipse 6" used EllipseGeometry geometry (organic/vector/procedural geometry -- handled in phase 3 (glTF bake) or a later pass); standing in with an empty Group so its children still attach correctly.
  const Ellipse_6 = new THREE.Group();
  Ellipse_6.position.set(-22.508876, 74.889547, -26.100148);
  Ellipse_6.rotation.set(-1.570796, 1.466077, -1.570796);
  Ellipse_6.scale.set(1, 1, 1);
  Ellipse_6.castShadow = true;
  Ellipse_6.receiveShadow = true;
  Hand_LEFT.add(Ellipse_6);

  // TODO(phase 3): "Ellipse 2" used EllipseGeometry geometry (organic/vector/procedural geometry -- handled in phase 3 (glTF bake) or a later pass); standing in with an empty Group so its children still attach correctly.
  const Ellipse_2 = new THREE.Group();
  Ellipse_2.position.set(-24.163375, 74.715652, -26.100148);
  Ellipse_2.rotation.set(-1.570796, 1.466077, -1.570796);
  Ellipse_2.scale.set(1, 1, 1);
  Ellipse_2.castShadow = true;
  Ellipse_2.receiveShadow = true;
  Hand_LEFT.add(Ellipse_2);

  // TODO(phase 3): "Rectangle 2" used RectangleGeometry geometry (organic/vector/procedural geometry -- handled in phase 3 (glTF bake) or a later pass); standing in with an empty Group so its children still attach correctly.
  const Rectangle_2 = new THREE.Group();
  Rectangle_2.position.set(-34.278959, 73.065293, -30.770688);
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
  elbow_2.position.set(12.891958, 30.327545, -1.570261);
  elbow_2.rotation.set(0, -0.142001, 0);
  elbow_2.scale.set(1, 1, 1);
  arm_2.add(elbow_2);

  const Group_5 = new THREE.Group();
  Group_5.name = 'Group';
  Group_5.position.set(4.044188, 50.555755, -23.81106);
  elbow_2.add(Group_5);

  // TODO(phase 3): "Rectangle 3" used RectangleGeometry geometry (organic/vector/procedural geometry -- handled in phase 3 (glTF bake) or a later pass); standing in with an empty Group so its children still attach correctly.
  const Rectangle_3_2 = new THREE.Group();
  Rectangle_3_2.position.set(1.628032, -2.934109, 1.692717);
  Rectangle_3_2.rotation.set(-0.74906, 1.540222, 0.404439);
  Rectangle_3_2.scale.set(1, 1, 1);
  Rectangle_3_2.castShadow = true;
  Rectangle_3_2.receiveShadow = true;
  Group_5.add(Rectangle_3_2);

  // TODO(phase 3): "Ellipse 3" used EllipseGeometry geometry (organic/vector/procedural geometry -- handled in phase 3 (glTF bake) or a later pass); standing in with an empty Group so its children still attach correctly.
  const Ellipse_3_2 = new THREE.Group();
  Ellipse_3_2.position.set(0.019285, 22.10977, -8.153224);
  Ellipse_3_2.rotation.set(1.209142, -0.001483, 0.06355);
  Ellipse_3_2.scale.set(1, 1, 1);
  Ellipse_3_2.castShadow = true;
  Ellipse_3_2.receiveShadow = true;
  Group_5.add(Ellipse_3_2);

  const forearm_2 = new THREE.Group();
  forearm_2.name = 'forearm';
  forearm_2.position.set(0, 39.504866, -18.250825);
  elbow_2.add(forearm_2);

  // TODO(phase 3): "Hand" used SubdivGeometry geometry (organic/vector/procedural geometry -- handled in phase 3 (glTF bake) or a later pass); standing in with an empty Group so its children still attach correctly.
  const Hand_3 = new THREE.Group();
  Hand_3.position.set(-9.434524, -91.204258, 36.550164);
  Hand_3.rotation.set(0.604276, 0.938657, 2.475429);
  Hand_3.scale.set(-1.4, 1.4, 1.4);
  Hand_3.castShadow = true;
  Hand_3.receiveShadow = true;
  forearm_2.add(Hand_3);

  // TODO(phase 3): "Ellipse 5" used EllipseGeometry geometry (organic/vector/procedural geometry -- handled in phase 3 (glTF bake) or a later pass); standing in with an empty Group so its children still attach correctly.
  const Ellipse_5_2 = new THREE.Group();
  Ellipse_5_2.position.set(-7.607973, 49.656784, -19.144817);
  Ellipse_5_2.rotation.set(-0.750492, 1.53589, 0.401426);
  Ellipse_5_2.scale.set(1, 1, 1);
  Ellipse_5_2.castShadow = true;
  Ellipse_5_2.receiveShadow = true;
  forearm_2.add(Ellipse_5_2);

  // TODO(phase 3): "Rectangle 4" used RectangleGeometry geometry (organic/vector/procedural geometry -- handled in phase 3 (glTF bake) or a later pass); standing in with an empty Group so its children still attach correctly.
  const Rectangle_4_2 = new THREE.Group();
  Rectangle_4_2.position.set(-4.097562, 42.344313, -16.585599);
  Rectangle_4_2.rotation.set(-0.74906, 1.540222, 0.404439);
  Rectangle_4_2.scale.set(1, 1, 1);
  Rectangle_4_2.castShadow = true;
  Rectangle_4_2.receiveShadow = true;
  forearm_2.add(Rectangle_4_2);

  // TODO(phase 3): "Ellipse 4" used EllipseGeometry geometry (organic/vector/procedural geometry -- handled in phase 3 (glTF bake) or a later pass); standing in with an empty Group so its children still attach correctly.
  const Ellipse_4_2 = new THREE.Group();
  Ellipse_4_2.position.set(3.988018, 36.04969, -13.967361);
  Ellipse_4_2.rotation.set(1.209142, -0.001483, 0.06355);
  Ellipse_4_2.scale.set(1, 1, 1);
  Ellipse_4_2.castShadow = true;
  Ellipse_4_2.receiveShadow = true;
  forearm_2.add(Ellipse_4_2);

  // TODO(phase 3): "Cube 3" used SubdivGeometry geometry (organic/vector/procedural geometry -- handled in phase 3 (glTF bake) or a later pass); standing in with an empty Group so its children still attach correctly.
  const Cube_3_2 = new THREE.Group();
  Cube_3_2.position.set(-0.414623, -12.090099, 5.105871);
  Cube_3_2.rotation.set(1.391073, 1.059082, -1.853814);
  Cube_3_2.scale.set(1, 1, 1);
  Cube_3_2.castShadow = true;
  Cube_3_2.receiveShadow = true;
  forearm_2.add(Cube_3_2);

  // TODO(phase 3): "Cube 2" used SubdivGeometry geometry (organic/vector/procedural geometry -- handled in phase 3 (glTF bake) or a later pass); standing in with an empty Group so its children still attach correctly.
  const Cube_2_2 = new THREE.Group();
  Cube_2_2.position.set(15.694539, 89.76987, -8.998776);
  Cube_2_2.scale.set(1, 1, 1);
  Cube_2_2.castShadow = true;
  Cube_2_2.receiveShadow = true;
  arm_2.add(Cube_2_2);

  // TODO(phase 3): "Ellipse 6" used EllipseGeometry geometry (organic/vector/procedural geometry -- handled in phase 3 (glTF bake) or a later pass); standing in with an empty Group so its children still attach correctly.
  const Ellipse_6_2 = new THREE.Group();
  Ellipse_6_2.position.set(-22.508876, 74.889547, -26.100148);
  Ellipse_6_2.rotation.set(-1.570796, 1.466077, -1.570796);
  Ellipse_6_2.scale.set(1, 1, 1);
  Ellipse_6_2.castShadow = true;
  Ellipse_6_2.receiveShadow = true;
  Hand_LEFT_2.add(Ellipse_6_2);

  // TODO(phase 3): "Ellipse 2" used EllipseGeometry geometry (organic/vector/procedural geometry -- handled in phase 3 (glTF bake) or a later pass); standing in with an empty Group so its children still attach correctly.
  const Ellipse_2_2 = new THREE.Group();
  Ellipse_2_2.position.set(-24.163375, 74.715652, -26.100148);
  Ellipse_2_2.rotation.set(-1.570796, 1.466077, -1.570796);
  Ellipse_2_2.scale.set(1, 1, 1);
  Ellipse_2_2.castShadow = true;
  Ellipse_2_2.receiveShadow = true;
  Hand_LEFT_2.add(Ellipse_2_2);

  // TODO(phase 3): "Rectangle 2" used RectangleGeometry geometry (organic/vector/procedural geometry -- handled in phase 3 (glTF bake) or a later pass); standing in with an empty Group so its children still attach correctly.
  const Rectangle_2_2 = new THREE.Group();
  Rectangle_2_2.position.set(-34.278959, 73.065293, -30.770688);
  Rectangle_2_2.rotation.set(0, 0, -3.029018);
  Rectangle_2_2.scale.set(1, 1, 1);
  Rectangle_2_2.castShadow = true;
  Rectangle_2_2.receiveShadow = true;
  Hand_LEFT_2.add(Rectangle_2_2);

  // TODO(phase 3): "Body" used SubdivGeometry geometry (organic/vector/procedural geometry -- handled in phase 3 (glTF bake) or a later pass); standing in with an empty Group so its children still attach correctly.
  const Body = new THREE.Group();
  Body.position.set(0.939879, -194.789024, -5.25042);
  Body.castShadow = true;
  Body.receiveShadow = true;
  Top_part.add(Body);

  const Group_6 = new THREE.Group();
  Group_6.name = 'Group';
  Group_6.position.set(-67.839654, 234.756813, -10.055411);
  Group_6.scale.set(-1, 1, 1);
  Body.add(Group_6);

  // TODO(phase 3): "Ellipse" used EllipseGeometry geometry (organic/vector/procedural geometry -- handled in phase 3 (glTF bake) or a later pass); standing in with an empty Group so its children still attach correctly.
  const Ellipse = new THREE.Group();
  Ellipse.position.set(3.583121, 0.584768, -10.710316);
  Ellipse.rotation.set(0, 0, 0.10472);
  Ellipse.scale.set(1, 1, 1);
  Ellipse.castShadow = true;
  Ellipse.receiveShadow = true;
  Group_6.add(Ellipse);

  // TODO(phase 3): "Rectangle" used RectangleGeometry geometry (organic/vector/procedural geometry -- handled in phase 3 (glTF bake) or a later pass); standing in with an empty Group so its children still attach correctly.
  const Rectangle = new THREE.Group();
  Rectangle.position.set(0, 0, -0.740552);
  Rectangle.rotation.set(0, 0, 0.112574);
  Rectangle.scale.set(1, 1, 1);
  Rectangle.castShadow = true;
  Rectangle.receiveShadow = true;
  Group_6.add(Rectangle);

  const Group_7 = new THREE.Group();
  Group_7.name = 'Group';
  Group_7.position.set(67.822813, 234.78921, -10.055411);
  Group_7.scale.set(1, 1, 1);
  Body.add(Group_7);

  // TODO(phase 3): "Ellipse" used EllipseGeometry geometry (organic/vector/procedural geometry -- handled in phase 3 (glTF bake) or a later pass); standing in with an empty Group so its children still attach correctly.
  const Ellipse_7 = new THREE.Group();
  Ellipse_7.position.set(3.583121, 0.584768, -10.710316);
  Ellipse_7.rotation.set(0, 0, 0.10472);
  Ellipse_7.castShadow = true;
  Ellipse_7.receiveShadow = true;
  Group_7.add(Ellipse_7);

  // TODO(phase 3): "Rectangle" used RectangleGeometry geometry (organic/vector/procedural geometry -- handled in phase 3 (glTF bake) or a later pass); standing in with an empty Group so its children still attach correctly.
  const Rectangle_5 = new THREE.Group();
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

  const Cylinder_4_3 = new THREE.Mesh(
    cylinderGeometry_2,
    materials['6bdc5132-7ea6-4d70-8d2b-c8849ea9973b'],
  );
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

  const Cylinder_4_4 = new THREE.Mesh(
    cylinderGeometry_2,
    materials['6bdc5132-7ea6-4d70-8d2b-c8849ea9973b'],
  );
  Cylinder_4_4.position.set(0, 0, 0);
  Cylinder_4_4.rotation.set(0.130289, 0, -0.278824);
  Cylinder_4_4.scale.set(1, 1, 1);
  Cylinder_4_4.castShadow = true;
  Cylinder_4_4.receiveShadow = true;
  Group_8.add(Cylinder_4_4);

  const Leg_Left_Instance = new THREE.Group();
  Leg_Left_Instance.name = 'Leg Left Instance';
  Leg_Left_Instance.position.set(-49.1, 152.350021, 6.963627);
  Leg_Left_Instance.rotation.set(0.127625, -0.331202, 0);
  Leg_Left_Instance.scale.set(-1, 1, 1);
  Bottom.add(Leg_Left_Instance);

  const femur = new THREE.Group();
  femur.name = 'femur';
  femur.position.set(2.574232, -66.66871, 0.633899);
  Leg_Left_Instance.add(femur);

  // TODO(phase 3): "Cube 3" used SubdivGeometry geometry (organic/vector/procedural geometry -- handled in phase 3 (glTF bake) or a later pass); standing in with an empty Group so its children still attach correctly.
  const Cube_3_3 = new THREE.Group();
  Cube_3_3.position.set(-0.695858, -1.555922, -1.795629);
  Cube_3_3.rotation.set(1.570796, 0, -3.141593);
  Cube_3_3.scale.set(1, 1, 1);
  Cube_3_3.castShadow = true;
  Cube_3_3.receiveShadow = true;
  femur.add(Cube_3_3);

  // TODO(phase 3): "Rectangle 9" used RectangleGeometry geometry (organic/vector/procedural geometry -- handled in phase 3 (glTF bake) or a later pass); standing in with an empty Group so its children still attach correctly.
  const Rectangle_9 = new THREE.Group();
  Rectangle_9.position.set(-2.543438, 47.854355, -2.255406);
  Rectangle_9.rotation.set(-1.570796, 1.570796, 0);
  Rectangle_9.scale.set(1, 1.00292, 1);
  Rectangle_9.castShadow = true;
  Rectangle_9.receiveShadow = true;
  femur.add(Rectangle_9);

  // TODO(phase 3): "Rectangle 10" used RectangleGeometry geometry (organic/vector/procedural geometry -- handled in phase 3 (glTF bake) or a later pass); standing in with an empty Group so its children still attach correctly.
  const Rectangle_10 = new THREE.Group();
  Rectangle_10.position.set(-9.695649, -42.919856, -2.255406);
  Rectangle_10.rotation.set(-1.570796, 1.570796, 0);
  Rectangle_10.scale.set(1, 1.00292, 1);
  Rectangle_10.castShadow = true;
  Rectangle_10.receiveShadow = true;
  femur.add(Rectangle_10);

  const shin = new THREE.Group();
  shin.name = 'shin';
  shin.position.set(-2.574232, -64.526822, -2.908291);
  shin.rotation.set(-0.141838, 0, 0);
  shin.scale.set(1, 1, 1);
  femur.add(shin);

  const Foot = new THREE.Group();
  Foot.name = 'Foot';
  Foot.position.set(0, -160.389901, -18.689457);
  shin.add(Foot);

  // TODO(phase 3): "Cube 5" used SubdivGeometry geometry (organic/vector/procedural geometry -- handled in phase 3 (glTF bake) or a later pass); standing in with an empty Group so its children still attach correctly.
  const Cube_5 = new THREE.Group();
  Cube_5.position.set(1.3138, -9.356308, -9.384017);
  Cube_5.rotation.set(0, -0.140367, 0);
  Cube_5.scale.set(1, 1, 1);
  Cube_5.castShadow = true;
  Cube_5.receiveShadow = true;
  Foot.add(Cube_5);

  // TODO(phase 3): "Ellipse 5" used EllipseGeometry geometry (organic/vector/procedural geometry -- handled in phase 3 (glTF bake) or a later pass); standing in with an empty Group so its children still attach correctly.
  const Ellipse_5_3 = new THREE.Group();
  Ellipse_5_3.position.set(2.805771, 24.449085, -26.838991);
  Ellipse_5_3.rotation.set(1.438991, 0, 3.141593);
  Ellipse_5_3.scale.set(1, 1, 1);
  Ellipse_5_3.castShadow = true;
  Ellipse_5_3.receiveShadow = true;
  shin.add(Ellipse_5_3);

  // TODO(phase 3): "Cube 4" used SubdivGeometry geometry (organic/vector/procedural geometry -- handled in phase 3 (glTF bake) or a later pass); standing in with an empty Group so its children still attach correctly.
  const Cube_4 = new THREE.Group();
  Cube_4.position.set(1.26208, 9.302013, 3.463357);
  Cube_4.rotation.set(1.570796, 0, -3.141593);
  Cube_4.scale.set(1, 1, 1);
  Cube_4.castShadow = true;
  Cube_4.receiveShadow = true;
  shin.add(Cube_4);

  // TODO(phase 3): "Ellipse 4" used EllipseGeometry geometry (organic/vector/procedural geometry -- handled in phase 3 (glTF bake) or a later pass); standing in with an empty Group so its children still attach correctly.
  const Ellipse_4_3 = new THREE.Group();
  Ellipse_4_3.position.set(1.3138, 73.224369, 3.463357);
  Ellipse_4_3.rotation.set(1.570796, 0, -3.141593);
  Ellipse_4_3.scale.set(1, 1, 1);
  Ellipse_4_3.castShadow = true;
  Ellipse_4_3.receiveShadow = true;
  shin.add(Ellipse_4_3);

  // TODO(phase 3): "Rectangle 12" used RectangleGeometry geometry (organic/vector/procedural geometry -- handled in phase 3 (glTF bake) or a later pass); standing in with an empty Group so its children still attach correctly.
  const Rectangle_12 = new THREE.Group();
  Rectangle_12.position.set(7.775672, 74.956093, 3.140863);
  Rectangle_12.rotation.set(-1.570796, 1.570796, 0);
  Rectangle_12.scale.set(1, 1.00292, 1);
  Rectangle_12.castShadow = true;
  Rectangle_12.receiveShadow = true;
  shin.add(Rectangle_12);

  // TODO(phase 3): "Rectangle 11" used RectangleGeometry geometry (organic/vector/procedural geometry -- handled in phase 3 (glTF bake) or a later pass); standing in with an empty Group so its children still attach correctly.
  const Rectangle_11 = new THREE.Group();
  Rectangle_11.position.set(-18.023087, 74.956092, 3.140863);
  Rectangle_11.rotation.set(-1.570796, 1.570796, 0);
  Rectangle_11.scale.set(1, 1.00292, 1);
  Rectangle_11.castShadow = true;
  Rectangle_11.receiveShadow = true;
  shin.add(Rectangle_11);

  // TODO(phase 3): "Ellipse 3" used EllipseGeometry geometry (organic/vector/procedural geometry -- handled in phase 3 (glTF bake) or a later pass); standing in with an empty Group so its children still attach correctly.
  const Ellipse_3_3 = new THREE.Group();
  Ellipse_3_3.position.set(1.276419, 145.552649, -3.677815);
  Ellipse_3_3.rotation.set(1.570796, 0, 0);
  Ellipse_3_3.castShadow = true;
  Ellipse_3_3.receiveShadow = true;
  Leg_Left_Instance.add(Ellipse_3_3);

  // TODO(phase 3): "Ellipse 2" used EllipseGeometry geometry (organic/vector/procedural geometry -- handled in phase 3 (glTF bake) or a later pass); standing in with an empty Group so its children still attach correctly.
  const Ellipse_2_3 = new THREE.Group();
  Ellipse_2_3.position.set(1.276419, 151.684418, -3.677815);
  Ellipse_2_3.rotation.set(1.570796, 0, 0);
  Ellipse_2_3.castShadow = true;
  Ellipse_2_3.receiveShadow = true;
  Leg_Left_Instance.add(Ellipse_2_3);

  // TODO(phase 3): "Rectangle 8" used RectangleGeometry geometry (organic/vector/procedural geometry -- handled in phase 3 (glTF bake) or a later pass); standing in with an empty Group so its children still attach correctly.
  const Rectangle_8 = new THREE.Group();
  Rectangle_8.position.set(-11.820034, 123.633083, -4.023472);
  Rectangle_8.rotation.set(-1.570796, 1.570796, 0);
  Rectangle_8.scale.set(1, 1.00292, 1);
  Rectangle_8.castShadow = true;
  Rectangle_8.receiveShadow = true;
  Leg_Left_Instance.add(Rectangle_8);

  // TODO(phase 3): "Rectangle 7" used RectangleGeometry geometry (organic/vector/procedural geometry -- handled in phase 3 (glTF bake) or a later pass); standing in with an empty Group so its children still attach correctly.
  const Rectangle_7 = new THREE.Group();
  Rectangle_7.position.set(-2.67961, 165.267111, -2.376471);
  Rectangle_7.rotation.set(1.570796, 1.570796, 0);
  Rectangle_7.scale.set(1, 1.00292, 1);
  Rectangle_7.castShadow = true;
  Rectangle_7.receiveShadow = true;
  Leg_Left_Instance.add(Rectangle_7);

  const Leg_Left = new THREE.Group();
  Leg_Left.name = 'Leg Left';
  Leg_Left.position.set(49.100531, 152.350021, 6.963627);
  Leg_Left.rotation.set(0.127625, 0.305371, 0);
  Bottom.add(Leg_Left);

  const femur_2 = new THREE.Group();
  femur_2.name = 'femur';
  femur_2.position.set(2.574232, -66.66871, 0.633899);
  Leg_Left.add(femur_2);

  // TODO(phase 3): "Cube 3" used SubdivGeometry geometry (organic/vector/procedural geometry -- handled in phase 3 (glTF bake) or a later pass); standing in with an empty Group so its children still attach correctly.
  const Cube_3_4 = new THREE.Group();
  Cube_3_4.position.set(-0.695858, -1.555922, -1.795629);
  Cube_3_4.rotation.set(1.570796, 0, -3.141593);
  Cube_3_4.scale.set(1, 1, 1);
  Cube_3_4.castShadow = true;
  Cube_3_4.receiveShadow = true;
  femur_2.add(Cube_3_4);

  // TODO(phase 3): "Rectangle 9" used RectangleGeometry geometry (organic/vector/procedural geometry -- handled in phase 3 (glTF bake) or a later pass); standing in with an empty Group so its children still attach correctly.
  const Rectangle_9_2 = new THREE.Group();
  Rectangle_9_2.position.set(-2.543438, 47.854355, -2.255406);
  Rectangle_9_2.rotation.set(-1.570796, 1.570796, 0);
  Rectangle_9_2.scale.set(1, 1.00292, 1);
  Rectangle_9_2.castShadow = true;
  Rectangle_9_2.receiveShadow = true;
  femur_2.add(Rectangle_9_2);

  // TODO(phase 3): "Rectangle 10" used RectangleGeometry geometry (organic/vector/procedural geometry -- handled in phase 3 (glTF bake) or a later pass); standing in with an empty Group so its children still attach correctly.
  const Rectangle_10_2 = new THREE.Group();
  Rectangle_10_2.position.set(-9.695649, -42.919856, -2.255406);
  Rectangle_10_2.rotation.set(-1.570796, 1.570796, 0);
  Rectangle_10_2.scale.set(1, 1.00292, 1);
  Rectangle_10_2.castShadow = true;
  Rectangle_10_2.receiveShadow = true;
  femur_2.add(Rectangle_10_2);

  const shin_2 = new THREE.Group();
  shin_2.name = 'shin';
  shin_2.position.set(-2.574232, -64.526822, -2.908291);
  shin_2.rotation.set(-0.141838, 0, 0);
  shin_2.scale.set(1, 1, 1);
  femur_2.add(shin_2);

  const Foot_2 = new THREE.Group();
  Foot_2.name = 'Foot';
  Foot_2.position.set(0, -160.389901, -18.689457);
  shin_2.add(Foot_2);

  // TODO(phase 3): "Cube 5" used SubdivGeometry geometry (organic/vector/procedural geometry -- handled in phase 3 (glTF bake) or a later pass); standing in with an empty Group so its children still attach correctly.
  const Cube_5_2 = new THREE.Group();
  Cube_5_2.position.set(1.3138, -9.356308, -9.384017);
  Cube_5_2.rotation.set(0, -0.140367, 0);
  Cube_5_2.scale.set(1, 1, 1);
  Cube_5_2.castShadow = true;
  Cube_5_2.receiveShadow = true;
  Foot_2.add(Cube_5_2);

  // TODO(phase 3): "Ellipse 5" used EllipseGeometry geometry (organic/vector/procedural geometry -- handled in phase 3 (glTF bake) or a later pass); standing in with an empty Group so its children still attach correctly.
  const Ellipse_5_4 = new THREE.Group();
  Ellipse_5_4.position.set(2.805771, 24.449085, -26.838991);
  Ellipse_5_4.rotation.set(1.438991, 0, 3.141593);
  Ellipse_5_4.scale.set(1, 1, 1);
  Ellipse_5_4.castShadow = true;
  Ellipse_5_4.receiveShadow = true;
  shin_2.add(Ellipse_5_4);

  // TODO(phase 3): "Cube 4" used SubdivGeometry geometry (organic/vector/procedural geometry -- handled in phase 3 (glTF bake) or a later pass); standing in with an empty Group so its children still attach correctly.
  const Cube_4_2 = new THREE.Group();
  Cube_4_2.position.set(1.26208, 9.302013, 3.463357);
  Cube_4_2.rotation.set(1.570796, 0, -3.141593);
  Cube_4_2.scale.set(1, 1, 1);
  Cube_4_2.castShadow = true;
  Cube_4_2.receiveShadow = true;
  shin_2.add(Cube_4_2);

  // TODO(phase 3): "Ellipse 4" used EllipseGeometry geometry (organic/vector/procedural geometry -- handled in phase 3 (glTF bake) or a later pass); standing in with an empty Group so its children still attach correctly.
  const Ellipse_4_4 = new THREE.Group();
  Ellipse_4_4.position.set(1.3138, 73.224369, 3.463357);
  Ellipse_4_4.rotation.set(1.570796, 0, -3.141593);
  Ellipse_4_4.scale.set(1, 1, 1);
  Ellipse_4_4.castShadow = true;
  Ellipse_4_4.receiveShadow = true;
  shin_2.add(Ellipse_4_4);

  // TODO(phase 3): "Rectangle 12" used RectangleGeometry geometry (organic/vector/procedural geometry -- handled in phase 3 (glTF bake) or a later pass); standing in with an empty Group so its children still attach correctly.
  const Rectangle_12_2 = new THREE.Group();
  Rectangle_12_2.position.set(7.775672, 74.956093, 3.140863);
  Rectangle_12_2.rotation.set(-1.570796, 1.570796, 0);
  Rectangle_12_2.scale.set(1, 1.00292, 1);
  Rectangle_12_2.castShadow = true;
  Rectangle_12_2.receiveShadow = true;
  shin_2.add(Rectangle_12_2);

  // TODO(phase 3): "Rectangle 11" used RectangleGeometry geometry (organic/vector/procedural geometry -- handled in phase 3 (glTF bake) or a later pass); standing in with an empty Group so its children still attach correctly.
  const Rectangle_11_2 = new THREE.Group();
  Rectangle_11_2.position.set(-18.023087, 74.956092, 3.140863);
  Rectangle_11_2.rotation.set(-1.570796, 1.570796, 0);
  Rectangle_11_2.scale.set(1, 1.00292, 1);
  Rectangle_11_2.castShadow = true;
  Rectangle_11_2.receiveShadow = true;
  shin_2.add(Rectangle_11_2);

  // TODO(phase 3): "Ellipse 3" used EllipseGeometry geometry (organic/vector/procedural geometry -- handled in phase 3 (glTF bake) or a later pass); standing in with an empty Group so its children still attach correctly.
  const Ellipse_3_4 = new THREE.Group();
  Ellipse_3_4.position.set(1.276419, 145.552649, -3.677815);
  Ellipse_3_4.rotation.set(1.570796, 0, 0);
  Ellipse_3_4.castShadow = true;
  Ellipse_3_4.receiveShadow = true;
  Leg_Left.add(Ellipse_3_4);

  // TODO(phase 3): "Ellipse 2" used EllipseGeometry geometry (organic/vector/procedural geometry -- handled in phase 3 (glTF bake) or a later pass); standing in with an empty Group so its children still attach correctly.
  const Ellipse_2_4 = new THREE.Group();
  Ellipse_2_4.position.set(1.276419, 151.684418, -3.677815);
  Ellipse_2_4.rotation.set(1.570796, 0, 0);
  Ellipse_2_4.castShadow = true;
  Ellipse_2_4.receiveShadow = true;
  Leg_Left.add(Ellipse_2_4);

  // TODO(phase 3): "Rectangle 8" used RectangleGeometry geometry (organic/vector/procedural geometry -- handled in phase 3 (glTF bake) or a later pass); standing in with an empty Group so its children still attach correctly.
  const Rectangle_8_2 = new THREE.Group();
  Rectangle_8_2.position.set(-11.820034, 123.633083, -4.023472);
  Rectangle_8_2.rotation.set(-1.570796, 1.570796, 0);
  Rectangle_8_2.scale.set(1, 1.00292, 1);
  Rectangle_8_2.castShadow = true;
  Rectangle_8_2.receiveShadow = true;
  Leg_Left.add(Rectangle_8_2);

  // TODO(phase 3): "Rectangle 7" used RectangleGeometry geometry (organic/vector/procedural geometry -- handled in phase 3 (glTF bake) or a later pass); standing in with an empty Group so its children still attach correctly.
  const Rectangle_7_2 = new THREE.Group();
  Rectangle_7_2.position.set(-2.67961, 165.267111, -2.376471);
  Rectangle_7_2.rotation.set(1.570796, 1.570796, 0);
  Rectangle_7_2.scale.set(1, 1.00292, 1);
  Rectangle_7_2.castShadow = true;
  Rectangle_7_2.receiveShadow = true;
  Leg_Left.add(Rectangle_7_2);

  const Pelvic = new THREE.Group();
  Pelvic.name = 'Pelvic';
  Pelvic.position.set(-1.369381, 163.074319, -17.596849);
  Bottom.add(Pelvic);

  const Group_2_3 = new THREE.Group();
  Group_2_3.name = 'Group 2';
  Group_2_3.position.set(-45.453043, -13.74685, 14.786791);
  Group_2_3.scale.set(-1, 1, 1);
  Pelvic.add(Group_2_3);

  // TODO(phase 3): "Rectangle 5" used RectangleGeometry geometry (organic/vector/procedural geometry -- handled in phase 3 (glTF bake) or a later pass); standing in with an empty Group so its children still attach correctly.
  const Rectangle_5_2 = new THREE.Group();
  Rectangle_5_2.position.set(-15.647526, 1.409058, 1.518551);
  Rectangle_5_2.rotation.set(3.141593, 1.570796, 0);
  Rectangle_5_2.scale.set(1, 1, 1);
  Rectangle_5_2.castShadow = true;
  Rectangle_5_2.receiveShadow = true;
  Group_2_3.add(Rectangle_5_2);

  // TODO(phase 3): "Ellipse" used EllipseGeometry geometry (organic/vector/procedural geometry -- handled in phase 3 (glTF bake) or a later pass); standing in with an empty Group so its children still attach correctly.
  const Ellipse_8 = new THREE.Group();
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

  // TODO(phase 3): "Rectangle 5" used RectangleGeometry geometry (organic/vector/procedural geometry -- handled in phase 3 (glTF bake) or a later pass); standing in with an empty Group so its children still attach correctly.
  const Rectangle_5_3 = new THREE.Group();
  Rectangle_5_3.position.set(-15.647526, 1.409058, 1.518551);
  Rectangle_5_3.rotation.set(3.141593, 1.570796, 0);
  Rectangle_5_3.scale.set(1, 1, 1);
  Rectangle_5_3.castShadow = true;
  Rectangle_5_3.receiveShadow = true;
  Group_9.add(Rectangle_5_3);

  // TODO(phase 3): "Ellipse" used EllipseGeometry geometry (organic/vector/procedural geometry -- handled in phase 3 (glTF bake) or a later pass); standing in with an empty Group so its children still attach correctly.
  const Ellipse_9 = new THREE.Group();
  Ellipse_9.position.set(0, 0, -21.967565);
  Ellipse_9.rotation.set(0, 0, -3.141593);
  Ellipse_9.scale.set(1, 1, 1);
  Ellipse_9.castShadow = true;
  Ellipse_9.receiveShadow = true;
  Group_9.add(Ellipse_9);

  // TODO(phase 3): "Rectangle 4" used RectangleGeometry geometry (organic/vector/procedural geometry -- handled in phase 3 (glTF bake) or a later pass); standing in with an empty Group so its children still attach correctly.
  const Rectangle_4_3 = new THREE.Group();
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

  // TODO(phase 3): "Rectangle 3" used RectangleGeometry geometry (organic/vector/procedural geometry -- handled in phase 3 (glTF bake) or a later pass); standing in with an empty Group so its children still attach correctly.
  const Rectangle_3_3 = new THREE.Group();
  Rectangle_3_3.position.set(25.70892, 0, 0);
  Rectangle_3_3.rotation.set(1.570796, -1.570796, 0);
  Rectangle_3_3.scale.set(1, 0.875405, 1);
  Rectangle_3_3.castShadow = true;
  Rectangle_3_3.receiveShadow = true;
  Group_3_2.add(Rectangle_3_3);

  // TODO(phase 3): "Rectangle" used RectangleGeometry geometry (organic/vector/procedural geometry -- handled in phase 3 (glTF bake) or a later pass); standing in with an empty Group so its children still attach correctly.
  const Rectangle_6 = new THREE.Group();
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
