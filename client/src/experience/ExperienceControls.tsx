import { ArrowLeft, ArrowUpRight } from "lucide-react";

interface ExperienceControlsProps {
  onBack: () => void;
  onJoin: () => void;
}

/**
 * Header-level exit/conversion controls, persistent across every screen.
 * Prototype-only chrome (not present in the reference product itself) styled
 * to match the shared technical button language in styles/experience.css.
 */
export function ExperienceControls({ onBack, onJoin }: ExperienceControlsProps) {
  return (
    <div className="experience-controls">
      <button type="button" className="experience-back" onClick={onBack}>
        <ArrowLeft size={16} /> Leave Artifex
      </button>
      <button type="button" className="experience-join" onClick={onJoin}>
        Join waitlist <ArrowUpRight size={15} />
      </button>
    </div>
  );
}
