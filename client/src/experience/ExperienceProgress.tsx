import { ChevronLeft, ChevronRight } from "lucide-react";
import { TOTAL_SCREENS } from "./data/screens";

interface ExperienceProgressProps {
  activeIndex: number;
  onSelect: (index: number) => void;
}

/**
 * Screen counter + prev/next stepper (e.g. "09 / 27"), matching the
 * top-right counter printed on every reference screen. Styling lives in
 * styles/experience.css.
 */
export function ExperienceProgress({ activeIndex, onSelect }: ExperienceProgressProps) {
  return (
    <div className="experience-progress">
      <button
        type="button"
        aria-label="Previous screen"
        onClick={() => onSelect(activeIndex - 1)}
        disabled={activeIndex === 0}
      >
        <ChevronLeft size={16} />
      </button>
      <span className="experience-progress-count">
        {String(activeIndex + 1).padStart(2, "0")} / {TOTAL_SCREENS}
      </span>
      <button
        type="button"
        aria-label="Next screen"
        onClick={() => onSelect(activeIndex + 1)}
        disabled={activeIndex === TOTAL_SCREENS - 1}
      >
        <ChevronRight size={16} />
      </button>
    </div>
  );
}
