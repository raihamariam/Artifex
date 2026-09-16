import { LAYERS } from "./data/screens";
import type { ExperienceLayer } from "./data/types";

interface ExperienceNavigationProps {
  activeLayer: ExperienceLayer;
  onJumpToLayer: (layer: ExperienceLayer) => void;
}

/**
 * Top layer navigation (CREATIVE / COLLABORATION / ENGINEERING / MATERIALS /
 * PRODUCTION / RELEASE / COMMUNITY) with the lime active-tab underline seen
 * on every reference screen. Styling lives in styles/experience.css.
 */
export function ExperienceNavigation({ activeLayer, onJumpToLayer }: ExperienceNavigationProps) {
  return (
    <nav className="experience-navigation" aria-label="Experience layer navigation">
      {LAYERS.map(({ key, label }) => (
        <button
          key={key}
          type="button"
          className={key === activeLayer ? "experience-nav-tab is-active" : "experience-nav-tab"}
          onClick={() => onJumpToLayer(key)}
        >
          {label}
        </button>
      ))}
    </nav>
  );
}
