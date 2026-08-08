// Shared by scripts/generate-materials.mjs (codegen) and
// scripts/verify-materials.mjs (numeric ledger/diff). Kept in one place so
// verification checks "did the generated file actually end up with the
// values this recipe computed" rather than re-deriving the formulas a
// second time, which could silently drift from what generate-materials.mjs
// emits and give false confidence.
export function clamp(v, lo, hi) {
  return Math.min(hi, Math.max(lo, v));
}

export function toHex({ r, g, b }) {
  const c = (v) => clamp(Math.round(v * 255), 0, 255);
  return '0x' + [c(r), c(g), c(b)].map((v) => v.toString(16).padStart(2, '0')).join('');
}

// Blinn-Phong shininess -> GGX roughness, used only when a "light" layer
// predates Spline's PBR fields (no explicit roughness/metalness present).
export function shininessToRoughness(shininess) {
  const s = shininess ?? 30;
  return clamp(Math.sqrt(2 / (s + 2)), 0.05, 1);
}

export function translateMaterial(mat) {
  const layers = (mat.layers ?? []).filter((l) => l.data?.visible !== false);
  const notes = [];

  const colorLayer = [...layers].reverse().find((l) => l.data.type === 'color');
  const lightLayer = layers.find((l) => l.data.type === 'light');
  // "rainbow" was previously mapped to MeshPhysicalMaterial's iridescence as
  // a guess (iridescence = layer alpha). Once actual geometry existed to see
  // it on, that guess produced a strong, wrong blue/purple sheen on the neck
  // assembly (Parts material has rainbow alpha=1 -> iridescence=1, Three's
  // max) where the reference shows plain matte black metal with no visible
  // color fringing at all. Dropped rather than retuned: unlike
  // shininess->roughness (a documented, standard approximation formula),
  // there's no principled mapping from Spline's rainbow layer params to
  // Three's thin-film iridescence model available here, so a guessed number
  // is no better than admitting it isn't translated.
  const deferredLayers = layers.filter((l) => ['matcap', 'texture', 'video', 'rainbow'].includes(l.data.type));

  const params = {};

  if (colorLayer) {
    params.color = toHex(colorLayer.data.color);
  } else {
    notes.push('no visible "color" layer -- left at MeshPhysicalMaterial default white');
  }

  if (lightLayer) {
    const d = lightLayer.data;
    if (typeof d.roughness === 'number') {
      params.roughness = clamp(d.roughness, 0, 1);
    } else {
      params.roughness = shininessToRoughness(d.shininess);
      notes.push(
        `"light" layer had no roughness field (category=${d.category}) -- derived from shininess=${d.shininess} via Blinn-Phong->GGX approximation (roughness=sqrt(2/(shininess+2)))`
      );
    }
    if (typeof d.metalness === 'number') {
      params.metalness = clamp(d.metalness, 0, 1);
    } else {
      params.metalness = 0;
      notes.push('"light" layer had no metalness field -- defaulted to 0 (assumed dielectric)');
    }
    if (typeof d.reflectivity === 'number') {
      if (d.reflectivity > 1 || d.reflectivity < 0) {
        notes.push(`reflectivity=${d.reflectivity} is outside Three.js's [0,1] range -- clamped`);
      }
      params.reflectivity = clamp(d.reflectivity, 0, 1);
    }
    if (d.emissive && (d.emissive.r || d.emissive.g || d.emissive.b)) {
      params.emissive = toHex(d.emissive);
    }
  } else {
    notes.push(
      'no visible "light" layer -- material has no lighting response params set (unlit-looking base color only)'
    );
  }

  for (const l of deferredLayers) {
    if (l.data.type === 'rainbow') {
      notes.push(
        `"rainbow" layer (alpha=${l.data.alpha}, filmThickness=${l.data.filmThickness}) not translated -- no principled mapping to Three.js's iridescence model available, see comment in translate-material.mjs`
      );
    } else {
      notes.push(
        `"${l.data.type}" layer not translated -- needs an image asset (${JSON.stringify(l.data.texture?.image ?? l.data)}), deferred to the asset pipeline`
      );
    }
  }

  const opacity = Math.min(colorLayer?.data.alpha ?? 1, lightLayer?.data.alphaOverride ?? 1);
  if (opacity < 1) {
    params.transparent = true;
    params.opacity = opacity;
  }

  const rainbowLayer = deferredLayers.find((l) => l.data.type === 'rainbow');
  return { name: mat.name, params, notes, sourceLayers: { colorLayer, lightLayer, rainbowLayer, deferredLayers } };
}
