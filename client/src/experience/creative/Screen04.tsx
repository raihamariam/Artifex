import { useRef } from "react";
import {
  ArtifexBadge,
  ArtifexButton,
  ArtifexControlGroup,
  ArtifexPanel,
  ArtifexSection,
} from "../ui/primitives";
import { GarmentCanvas } from "../three/GarmentCanvas";
import { GarmentErrorBoundary } from "../three/GarmentErrorBoundary";
import type { GarmentControlsHandle } from "../three/types";
import type { ScreenMeta } from "../data/types";

const PRESETS: { key: "front" | "side" | "back"; label: string }[] = [
  { key: "front", label: "Front" },
  { key: "side", label: "Side" },
  { key: "back", label: "Back" },
];

/**
 * Screen 04 — "Explore in 3D": the gold-standard Artifex garment viewer.
 * Layout mirrors /references/screens/04-3d-creative-concept.png (left
 * copy + view controls, center viewport, right technical readout) built
 * from Phase 2 primitives; the garment itself is genuine real-time WebGL,
 * not the reference's static render.
 */
export function Screen04({ screen }: { screen: ScreenMeta }) {
  const controlsRef = useRef<GarmentControlsHandle>(null);

  return (
    <div className="screen-04">
      <div className="screen-04-left">
        <ArtifexSection
          eyebrow="3D Creative Concept"
          title="Explore in 3D."
          body="Interact with your garment in real time. View, inspect, and refine every detail."
        />
        <ArtifexControlGroup>
          {PRESETS.map(({ key, label }) => (
            <ArtifexButton key={key} variant="technical" onClick={() => controlsRef.current?.goTo(key)}>
              {label}
            </ArtifexButton>
          ))}
          <ArtifexButton variant="technical" onClick={() => controlsRef.current?.reset()}>
            Reset view
          </ArtifexButton>
        </ArtifexControlGroup>
        <span className="art-meta">Drag to orbit · Scroll or pinch to zoom</span>
      </div>

      <div className="screen-04-viewport">
        <div className="screen-04-viewport-label">
          <span className="art-section-title">360°</span>
          <span className="art-meta">Explore every angle.</span>
        </div>
        <GarmentErrorBoundary>
          <GarmentCanvas ref={controlsRef} />
        </GarmentErrorBoundary>
      </div>

      <div className="screen-04-right">
        <ArtifexPanel label="Real-time viewer">
          <div className="screen-04-badges">
            <ArtifexBadge active>Real-time</ArtifexBadge>
            <ArtifexBadge active>High quality</ArtifexBadge>
            <ArtifexBadge active>PBR material</ArtifexBadge>
          </div>
        </ArtifexPanel>
        <ArtifexPanel label={`Screen ${String(screen.number).padStart(2, "0")} / 27`}>
          <span className="art-mono">ARTIFEX_HERO_001</span>
          <br />
          <span className="art-mono">87.5K triangles</span>
          <br />
          <span className="art-mono">Metallic textile PBR</span>
        </ArtifexPanel>
      </div>
    </div>
  );
}
