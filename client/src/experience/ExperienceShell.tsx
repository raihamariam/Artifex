import type { ReactNode } from "react";
import type { ExperienceLayer } from "./data/types";
import { ExperienceControls } from "./ExperienceControls";
import { ExperienceNavigation } from "./ExperienceNavigation";
import { ExperienceProgress } from "./ExperienceProgress";
import { ExperienceRail } from "./ExperienceRail";

interface ExperienceShellProps {
  activeLayer: ExperienceLayer;
  activeIndex: number;
  onJumpToLayer: (layer: ExperienceLayer) => void;
  onSelectIndex: (index: number) => void;
  onBack: () => void;
  onJoin: () => void;
  children: ReactNode;
}

/**
 * Global chrome shared by all 27 screens: brand mark, layer navigation,
 * screen counter, left tool rail, and the active screen's content. Visual
 * language (tokens, type, borders, lime accent rules) lives in
 * styles/experience.css, locked against the reference shell in Phase 2.
 */
export function ExperienceShell({
  activeLayer,
  activeIndex,
  onJumpToLayer,
  onSelectIndex,
  onBack,
  onJoin,
  children,
}: ExperienceShellProps) {
  return (
    <main className="experience-shell">
      <header className="experience-header">
        <span className="experience-brand">ARTIFEX</span>
        <ExperienceNavigation activeLayer={activeLayer} onJumpToLayer={onJumpToLayer} />
        <ExperienceProgress activeIndex={activeIndex} onSelect={onSelectIndex} />
      </header>
      <div className="experience-body">
        <ExperienceRail />
        <div className="experience-main">
          <ExperienceControls onBack={onBack} onJoin={onJoin} />
          <div className="experience-content">{children}</div>
        </div>
      </div>
    </main>
  );
}
