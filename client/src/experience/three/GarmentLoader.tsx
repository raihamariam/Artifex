import { useProgress } from "@react-three/drei";

/**
 * Restrained Artifex-styled loading overlay, shown while the GLB + its
 * textures stream in. Rendered as a normal HTML sibling over the <Canvas>
 * (not inside the R3F scene graph) and driven by drei's global loading
 * manager via useProgress, so it reflects genuine asset progress.
 */
export function GarmentLoader() {
  const { active, progress, item } = useProgress();

  if (!active && progress >= 100) return null;

  return (
    <div className="garment-loader" role="status" aria-live="polite">
      <span className="art-meta">Loading model</span>
      <div className="garment-loader-track">
        <div className="garment-loader-fill" style={{ width: `${Math.max(4, progress)}%` }} />
      </div>
      <span className="art-mono">{Math.round(progress)}%</span>
      {item && <span className="art-meta garment-loader-item">{item.split("/").pop()}</span>}
    </div>
  );
}
