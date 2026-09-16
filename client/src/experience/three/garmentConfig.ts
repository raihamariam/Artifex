import type { CameraPreset, CameraPresetKey } from "./types";

/** Primary hero asset — full PBR (base color + normal + metallic/roughness). */
export const GARMENT_MODEL_PATH = "/artifex/3d/artifex-hero.glb";
/** Pre-baked emissive fallback, used only if the primary asset fails to load. */
export const GARMENT_MODEL_FALLBACK_PATH = "/artifex/3d/artifex-hero-shaded.glb";

/** Target height (world units) the garment is normalized to after loading. */
export const GARMENT_TARGET_HEIGHT = 1.75;
/** Vertical look-at height used by every camera preset (roughly torso height). */
export const GARMENT_TARGET_Y = 0.95;

export const CAMERA_PRESETS: Record<CameraPresetKey, CameraPreset> = {
  hero: { position: [1.55, 1.15, 3.1], target: [0, GARMENT_TARGET_Y, 0], fov: 32 },
  front: { position: [0, GARMENT_TARGET_Y, 3.4], target: [0, GARMENT_TARGET_Y, 0], fov: 30 },
  side: { position: [3.4, GARMENT_TARGET_Y, 0], target: [0, GARMENT_TARGET_Y, 0], fov: 30 },
  back: { position: [0, GARMENT_TARGET_Y, -3.4], target: [0, GARMENT_TARGET_Y, 0], fov: 30 },
};

export const ORBIT_LIMITS = {
  minDistance: 1.9,
  maxDistance: 5.5,
  minPolarAngle: Math.PI * 0.16,
  maxPolarAngle: Math.PI * 0.52,
  dampingFactor: 0.08,
  rotateSpeed: 0.55,
  zoomSpeed: 0.7,
};

export const CAMERA_TRANSITION_SECONDS = 1.1;
