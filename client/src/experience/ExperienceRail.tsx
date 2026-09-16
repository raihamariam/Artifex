import { Eye, ImageIcon, Layers, Lock, Settings2, SlidersHorizontal } from "lucide-react";
import { ArtifexIconButton } from "./ui/primitives";

const RAIL_ICONS = [Settings2, Layers, Lock, ImageIcon, Eye, SlidersHorizontal];

/**
 * Persistent left-edge tool rail visible on every reference screen
 * (see /references/screens — a fixed vertical icon dock below the header).
 * Icons are structural/decorative in Phase 2: the tools they represent are
 * wired up by the phase that implements each screen's real functionality.
 */
export function ExperienceRail() {
  return (
    <aside className="experience-rail" aria-hidden="true">
      {RAIL_ICONS.map((Icon, index) => (
        <ArtifexIconButton key={index} plain icon={<Icon size={16} />} tabIndex={-1} />
      ))}
    </aside>
  );
}
