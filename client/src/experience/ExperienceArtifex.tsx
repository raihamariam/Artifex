import { useMemo, useState } from "react";
import "./styles/experience.css";
import { screenByIndex, firstScreenIndexForLayer, TOTAL_SCREENS } from "./data/screens";
import { SCREEN_REGISTRY } from "./data/registry";
import { ExperienceShell } from "./ExperienceShell";
import type { ExperienceLayer } from "./data/types";

interface ExperienceArtifexProps {
  onBack: () => void;
  onJoin: () => void;
}

/**
 * Entry point into the Experience Artifex product journey (screens 01-27).
 * Owns the single piece of navigation state — the active screen index — and
 * hands rendering to the shell + the current screen's registered component.
 */
export function ExperienceArtifex({ onBack, onJoin }: ExperienceArtifexProps) {
  const [activeIndex, setActiveIndex] = useState(0);

  const screen = useMemo(() => screenByIndex(activeIndex), [activeIndex]);
  const Screen = SCREEN_REGISTRY[screen.number];

  const goToIndex = (index: number) => {
    setActiveIndex(Math.max(0, Math.min(TOTAL_SCREENS - 1, index)));
  };

  const goToLayer = (layer: ExperienceLayer) => {
    const index = firstScreenIndexForLayer(layer);
    if (index >= 0) goToIndex(index);
  };

  return (
    <ExperienceShell
      activeLayer={screen.layer}
      activeIndex={activeIndex}
      onJumpToLayer={goToLayer}
      onSelectIndex={goToIndex}
      onBack={onBack}
      onJoin={onJoin}
    >
      <Screen screen={screen} />
    </ExperienceShell>
  );
}
