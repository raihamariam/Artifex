import type { ScreenMeta } from "../data/types";

/**
 * Temporary stand-in for a not-yet-built screen, living inside the real
 * Artifex shell/token system (Phase 2). Shows only screen number, title,
 * and layer — every layer module renders this until its real screen is
 * implemented in the phase that owns it (Phase 4: creative, 5: collaboration,
 * 6-7: engineering, 8: materials, 9-10: production, 11: release, 12: community).
 */
export function ScreenPlaceholder({ screen }: { screen: ScreenMeta }) {
  return (
    <div className="screen-placeholder">
      <span className="art-meta">
        {String(screen.number).padStart(2, "0")} / 27 · {screen.layer}
      </span>
      <h2 className="art-display">{screen.title}</h2>
      <p className="art-body">Screen content for this layer is not yet implemented.</p>
    </div>
  );
}
