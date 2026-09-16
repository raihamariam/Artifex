/** Shared types for the Artifex 3D garment viewer (Phase 3). */

export type CameraPresetKey = "hero" | "front" | "side" | "back";

export interface CameraPreset {
  /** Camera position in world space. */
  position: [number, number, number];
  /** OrbitControls target (usually the garment's vertical center). */
  target: [number, number, number];
  /** Field of view in degrees. */
  fov: number;
}

export interface GarmentControlsHandle {
  goTo: (preset: CameraPresetKey) => void;
  reset: () => void;
}
