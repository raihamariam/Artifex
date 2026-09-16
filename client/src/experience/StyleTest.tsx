import { Layers, Settings2 } from "lucide-react";
import "./styles/experience.css";
import {
  ArtifexAnnotation,
  ArtifexBadge,
  ArtifexButton,
  ArtifexCallout,
  ArtifexControlGroup,
  ArtifexDivider,
  ArtifexIconButton,
  ArtifexImageFrame,
  ArtifexMetric,
  ArtifexPanel,
  ArtifexSection,
  ArtifexStatus,
  ArtifexTab,
  ArtifexTabGroup,
  ArtifexThumbnail,
} from "./ui/primitives";

/**
 * Dev-only visual QA sandbox for the Phase 2 Artifex design system.
 * Renders every shared primitive and typography category in isolation so
 * the shell can be checked against the reference screens without any
 * screen-specific content. Not linked from any public navigation — reached
 * only via `?view=styletest` in development (see Home.tsx).
 */
export function StyleTest() {
  return (
    <main className="experience-shell">
      <div className="experience-content style-test">
        <div className="style-test-block">
          <span className="art-meta">Typography</span>
          <h1 className="art-display">
            Interpret <em>creative intent.</em>
          </h1>
          <h2 className="art-section-title">Liquid Metallic Laminate</h2>
          <p className="art-body">
            A precise digital representation of material behaviour in the real world.
          </p>
          <span className="art-meta">Creative / Editorial</span>
          <span className="art-label">Control label</span>
          <span className="art-mono">ARTIFEX HERO 001 · v1.4 · 482 MB</span>
          <p className="art-tagline">From idea to garment.</p>
        </div>

        <ArtifexDivider />

        <div className="style-test-block">
          <span className="art-meta">Layer navigation + progress</span>
          <div className="experience-header" style={{ position: "static", border: "1px solid var(--art-border)", borderRadius: "var(--art-radius)" }}>
            <span className="experience-brand">ARTIFEX</span>
            <nav className="experience-navigation" aria-label="Sample layer navigation">
              <button type="button" className="experience-nav-tab is-active">Creative</button>
              <button type="button" className="experience-nav-tab">Collaboration</button>
              <button type="button" className="experience-nav-tab">Engineering</button>
              <button type="button" className="experience-nav-tab">Materials</button>
            </nav>
            <div className="experience-progress">
              <span className="experience-progress-count">08 / 27</span>
            </div>
          </div>
        </div>

        <ArtifexDivider />

        <div className="style-test-block">
          <span className="art-meta">Buttons</span>
          <div className="style-test-row">
            <ArtifexButton variant="primary">Explore the ecosystem</ArtifexButton>
            <ArtifexButton variant="secondary">View gate report</ArtifexButton>
            <ArtifexButton variant="ghost">View full discussion →</ArtifexButton>
            <ArtifexButton variant="technical">Run final check</ArtifexButton>
            <ArtifexIconButton icon={<Settings2 size={16} />} />
            <ArtifexIconButton plain icon={<Layers size={16} />} />
          </div>
        </div>

        <ArtifexDivider />

        <div className="style-test-block">
          <span className="art-meta">Badges + status</span>
          <div className="style-test-row">
            <ArtifexBadge active>Active</ArtifexBadge>
            <ArtifexBadge>Draft</ArtifexBadge>
            <ArtifexStatus tone="positive">Approved</ArtifexStatus>
            <ArtifexStatus tone="neutral">Pending</ArtifexStatus>
            <ArtifexCallout>Collar · P01–P05</ArtifexCallout>
          </div>
        </div>

        <ArtifexDivider />

        <div className="style-test-block">
          <span className="art-meta">Panel + section</span>
          <div className="style-test-row" style={{ alignItems: "stretch" }}>
            <ArtifexPanel label="System details" className="style-test-panel">
              <ArtifexAnnotation index="01." title="Collar" subtitle="Architectural volume" />
            </ArtifexPanel>
            <ArtifexSection
              eyebrow="Engineering / Anatomy"
              title="Garment Anatomy."
              body="From sculptural form to functional systems."
              tagline="Form meets function."
            />
          </div>
        </div>

        <ArtifexDivider />

        <div className="style-test-block">
          <span className="art-meta">Tabs (segmented sidebar)</span>
          <ArtifexTabGroup>
            <ArtifexTab active>Systems</ArtifexTab>
            <ArtifexTab>Construction</ArtifexTab>
            <ArtifexTab>Technical specs</ArtifexTab>
          </ArtifexTabGroup>
        </div>

        <ArtifexDivider />

        <div className="style-test-block">
          <span className="art-meta">Control group</span>
          <ArtifexControlGroup>
            <ArtifexButton variant="technical">Expand all</ArtifexButton>
            <ArtifexButton variant="technical">Cost simulation</ArtifexButton>
            <ArtifexButton variant="technical">Compare versions</ArtifexButton>
          </ArtifexControlGroup>
        </div>

        <ArtifexDivider />

        <div className="style-test-block">
          <span className="art-meta">Metrics</span>
          <ArtifexMetric label="Reflectivity" value="92%" percent={92} lowLabel="Matte" highLabel="Mirror" />
          <ArtifexMetric label="Rigidity" value="High" percent={70} lowLabel="Soft" highLabel="Rigid" />
        </div>

        <ArtifexDivider />

        <div className="style-test-block">
          <span className="art-meta">Thumbnails + image frame</span>
          <div className="style-test-grid">
            <ArtifexThumbnail caption="Front" active>
              <span className="art-meta">IMG</span>
            </ArtifexThumbnail>
            <ArtifexThumbnail caption="Side">
              <span className="art-meta">IMG</span>
            </ArtifexThumbnail>
            <ArtifexThumbnail caption="Drape">
              <span className="art-meta">IMG</span>
            </ArtifexThumbnail>
          </div>
          <ArtifexImageFrame className="style-test-hero">
            <span className="art-meta">Hero image frame</span>
          </ArtifexImageFrame>
        </div>
      </div>
    </main>
  );
}
