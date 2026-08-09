// Hand-written helper module imported by the generated build-scene.js --
// not itself regenerated, since the shape-construction algorithm is stable
// even though the per-instance parameters (from scripts/generate-scene.mjs)
// change with the source scene.
//
// Translates Spline's RectangleGeometry/EllipseGeometry (2D vector shapes,
// extruded) into THREE.Shape + THREE.ExtrudeGeometry. Two assumptions here
// are unverified against Spline's own algorithm (there's no public spec for
// this proprietary format) and should be treated as approximations:
//   1. cornerRadius/innerRadius are 0-100 percentages of min(width,height)/2
//      (inferred from the value range in the source data -- e.g. a
//      cornerRadius of 100 on a 29-unit-wide rect can't be a literal length).
//   2. The 4-element cornerRadius array order is [top-left, top-right,
//      bottom-right, bottom-left] (a guess at a common CSS-like convention;
//      only matters visually for the asymmetric-radius rectangles).
import * as THREE from 'three';

function clamp(v, lo, hi) {
  return Math.min(hi, Math.max(lo, v));
}

// cornerType: 0 = rounded (arc), 1 = chamfered (straight cut)
export function roundedRectShape(width, height, cornerRadiusPct, cornerType) {
  const w = width / 2;
  const h = height / 2;
  const maxR = Math.min(width, height) / 2;
  const [rtl, rtr, rbr, rbl] = cornerRadiusPct.map((pct) => (clamp(pct, 0, 100) / 100) * maxR);

  const shape = new THREE.Shape();
  shape.moveTo(-w + rbl, -h);
  shape.lineTo(w - rbr, -h);
  if (cornerType === 0) shape.absarc(w - rbr, -h + rbr, rbr, -Math.PI / 2, 0, false);
  else shape.lineTo(w, -h + rbr);
  shape.lineTo(w, h - rtr);
  if (cornerType === 0) shape.absarc(w - rtr, h - rtr, rtr, 0, Math.PI / 2, false);
  else shape.lineTo(w - rtr, h);
  shape.lineTo(-w + rtl, h);
  if (cornerType === 0) shape.absarc(-w + rtl, h - rtl, rtl, Math.PI / 2, Math.PI, false);
  else shape.lineTo(-w, h - rtl);
  shape.lineTo(-w, -h + rbl);
  if (cornerType === 0) shape.absarc(-w + rbl, -h + rbl, rbl, Math.PI, Math.PI * 1.5, false);
  else shape.lineTo(-w + rbl, -h);
  return shape;
}

// Spline's CylinderGeometry has a "hollow" fraction (0-1) that THREE.
// CylinderGeometry has no equivalent for -- ignoring it (as an earlier pass
// here did) renders a SOLID cone/cylinder at the full outer radius instead
// of a thin-walled tube, which for at least one real instance in this scene
// (a radiusTop=80 "neck" ring with hollow=0.83, i.e. an 83%-empty ring only
// ~17% wall thickness) is a massive, visually dominant difference -- it
// rendered as a giant solid cowl instead of a slender collar ring. Built via
// LatheGeometry: a capped tapered-tube profile (outer bottom -> outer top ->
// inner top -> inner bottom -> back to outer bottom, closing both caps),
// revolved around Y. openEnded (no end caps) isn't handled -- no instance in
// this scene needs it -- see the TODO if that changes.
export function hollowTaperedTubeGeometry(
  radiusTop,
  radiusBottom,
  height,
  hollowFraction,
  radialSegments,
  thetaStartRad,
  thetaLengthRad
) {
  const halfHeight = height / 2;
  const innerTop = radiusTop * hollowFraction;
  const innerBottom = radiusBottom * hollowFraction;
  const points = [
    new THREE.Vector2(radiusBottom, -halfHeight),
    new THREE.Vector2(radiusTop, halfHeight),
    new THREE.Vector2(innerTop, halfHeight),
    new THREE.Vector2(innerBottom, -halfHeight),
    new THREE.Vector2(radiusBottom, -halfHeight), // TODO: skip this point (and the two end caps it implies) to support openEnded=true, unneeded so far
  ];
  return new THREE.LatheGeometry(points, radialSegments, thetaStartRad, thetaLengthRad);
}

// spikes = polygon point count (also doubles as star-point count when
// innerRadiusPct > 0). innerRadiusPct is 0-100, same percentage convention
// as cornerRadius above.
export function ellipseShape(width, height, spikes, innerRadiusPct, angleDeg) {
  const rx = width / 2;
  const ry = height / 2;
  const innerFraction = clamp(innerRadiusPct, 0, 100) / 100;
  const angleRad = (angleDeg * Math.PI) / 180;
  const isStar = innerFraction > 0;
  const pointCount = isStar ? spikes * 2 : spikes;

  const shape = new THREE.Shape();
  for (let i = 0; i <= pointCount; i++) {
    const t = i / pointCount;
    const a = t * angleRad - Math.PI / 2;
    const R = isStar && i % 2 === 1 ? innerFraction : 1;
    const x = Math.cos(a) * rx * R;
    const y = Math.sin(a) * ry * R;
    if (i === 0) shape.moveTo(x, y);
    else shape.lineTo(x, y);
  }
  return shape;
}
