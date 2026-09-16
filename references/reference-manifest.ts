/**
 * ARTIFEX — 27-screen reference manifest.
 * Source of truth for the Phase 0 reference extraction.
 * See REFERENCE_MAP.md for board/quadrant provenance.
 */

export type ExperienceLayer =
  | "creative"
  | "collaboration"
  | "engineering"
  | "materials"
  | "production"
  | "release"
  | "community";

export type InteractionType =
  | "static-editorial"
  | "clickable-callouts"
  | "multi-stage-flow"
  | "3d-viewer"
  | "metadata-panel"
  | "branch-comparison"
  | "review-thread"
  | "zone-isolation"
  | "layer-toggle"
  | "technical-drawing"
  | "pattern-decomposition"
  | "bidirectional-mapping"
  | "option-comparison"
  | "fit-metrics"
  | "material-inspector"
  | "material-comparison"
  | "dependency-chain"
  | "marker-layout"
  | "marker-comparison"
  | "sequence-tiles"
  | "bom-table"
  | "risk-analysis"
  | "readiness-checklist"
  | "export-dashboard"
  | "profile-dashboard"
  | "fork-grid"
  | "ecosystem-graph";

export type GarmentMode =
  | "editorial-hero"
  | "annotated-hero"
  | "sketch-silhouette-3d"
  | "real-3d-orbit"
  | "hero-with-metadata"
  | "hero-triptych-variants"
  | "hero-with-region-callouts"
  | "technical-matte-zones"
  | "technical-matte-seams"
  | "technical-flat-lines"
  | "pattern-decomposition-views"
  | "pattern-highlight-sync"
  | "hero-triptych-options"
  | "hero-with-fit-markers"
  | "material-swatch-macro"
  | "hero-triptych-materials"
  | "material-swatch-with-hero"
  | "marker-with-hero"
  | "marker-before-after"
  | "construction-tiles-with-hero"
  | "hero-with-bom-callouts"
  | "hero-with-risk-markers"
  | "hero-with-readiness-rings"
  | "hero-with-package-grid"
  | "hero-profile"
  | "hero-fork-variants"
  | "hero-ecosystem-center";

export interface ArtifexScreen {
  screenNumber: number;
  title: string;
  layer: ExperienceLayer;
  referencePath: string;
  interactionType: InteractionType;
  garmentMode: GarmentMode;
  requiredAssets: string[];
}

const GARMENT = "/artifex/3d/artifex-hero.glb";
const PATTERN_SET = [
  "P01", "P02", "P03", "P04", "P05", "P06", "P07", "P08",
  "P09", "P10", "P11", "P12", "P13", "P14", "P15",
];

export const referenceManifest: ArtifexScreen[] = [
  {
    screenNumber: 1,
    title: "Interpret Creative Intent",
    layer: "creative",
    referencePath: "/references/screens/01-editorial-board.png",
    interactionType: "static-editorial",
    garmentMode: "editorial-hero",
    requiredAssets: ["moodboard-grid.png", "reference-sketches.png", GARMENT],
  },
  {
    screenNumber: 2,
    title: "Design Intent, Made Tangible",
    layer: "creative",
    referencePath: "/references/screens/02-design-intent.png",
    interactionType: "clickable-callouts",
    garmentMode: "annotated-hero",
    requiredAssets: [GARMENT],
  },
  {
    screenNumber: 3,
    title: "From Sketch to Form",
    layer: "creative",
    referencePath: "/references/screens/03-sketch-to-form.png",
    interactionType: "multi-stage-flow",
    garmentMode: "sketch-silhouette-3d",
    requiredAssets: ["sketch-01.png", "silhouette-wireframe.png", GARMENT],
  },
  {
    screenNumber: 4,
    title: "Explore in 3D",
    layer: "creative",
    referencePath: "/references/screens/04-3d-creative-concept.png",
    interactionType: "3d-viewer",
    garmentMode: "real-3d-orbit",
    requiredAssets: [GARMENT],
  },
  {
    screenNumber: 5,
    title: "Mainline Garment",
    layer: "collaboration",
    referencePath: "/references/screens/05-mainline-garment.png",
    interactionType: "metadata-panel",
    garmentMode: "hero-with-metadata",
    requiredAssets: [GARMENT],
  },
  {
    screenNumber: 6,
    title: "Explore Branches",
    layer: "collaboration",
    referencePath: "/references/screens/06-branches.png",
    interactionType: "branch-comparison",
    garmentMode: "hero-triptych-variants",
    requiredAssets: [GARMENT],
  },
  {
    screenNumber: 7,
    title: "Review + Merge",
    layer: "collaboration",
    referencePath: "/references/screens/07-review-merge.png",
    interactionType: "review-thread",
    garmentMode: "hero-with-region-callouts",
    requiredAssets: [GARMENT],
  },
  {
    screenNumber: 8,
    title: "Garment Anatomy",
    layer: "engineering",
    referencePath: "/references/screens/08-garment-anatomy.png",
    interactionType: "zone-isolation",
    garmentMode: "technical-matte-zones",
    requiredAssets: [GARMENT],
  },
  {
    screenNumber: 9,
    title: "Seam Topology",
    layer: "engineering",
    referencePath: "/references/screens/09-seam-topology.png",
    interactionType: "layer-toggle",
    garmentMode: "technical-matte-seams",
    requiredAssets: [GARMENT],
  },
  {
    screenNumber: 10,
    title: "Technical Flat",
    layer: "engineering",
    referencePath: "/references/screens/10-technical-flat.png",
    interactionType: "technical-drawing",
    garmentMode: "technical-flat-lines",
    requiredAssets: ["technical-flat-front.png", "technical-flat-back.png"],
  },
  {
    screenNumber: 11,
    title: "Pattern Extraction",
    layer: "engineering",
    referencePath: "/references/screens/11-pattern-extraction.png",
    interactionType: "pattern-decomposition",
    garmentMode: "pattern-decomposition-views",
    requiredAssets: PATTERN_SET.map((p) => `patterns/${p}.svg`),
  },
  {
    screenNumber: 12,
    title: "3D ↔ 2D Mapping",
    layer: "engineering",
    referencePath: "/references/screens/12-3d-2d-mapping.png",
    interactionType: "bidirectional-mapping",
    garmentMode: "pattern-highlight-sync",
    requiredAssets: [GARMENT, ...PATTERN_SET.map((p) => `patterns/${p}.svg`)],
  },
  {
    screenNumber: 13,
    title: "Engineering Alternatives",
    layer: "engineering",
    referencePath: "/references/screens/13-engineering-alternatives.png",
    interactionType: "option-comparison",
    garmentMode: "hero-triptych-options",
    requiredAssets: [GARMENT],
  },
  {
    screenNumber: 14,
    title: "Fit Validation",
    layer: "engineering",
    referencePath: "/references/screens/14-fit-validation.png",
    interactionType: "fit-metrics",
    garmentMode: "hero-with-fit-markers",
    requiredAssets: [GARMENT],
  },
  {
    screenNumber: 15,
    title: "Material Digital Twin",
    layer: "materials",
    referencePath: "/references/screens/15-material-digital-twin.png",
    interactionType: "material-inspector",
    garmentMode: "material-swatch-macro",
    requiredAssets: ["materials/liquid-metallic-laminate.jpg"],
  },
  {
    screenNumber: 16,
    title: "Material Comparison",
    layer: "materials",
    referencePath: "/references/screens/16-material-comparison.png",
    interactionType: "material-comparison",
    garmentMode: "hero-triptych-materials",
    requiredAssets: [GARMENT],
  },
  {
    screenNumber: 17,
    title: "Change Propagation",
    layer: "materials",
    referencePath: "/references/screens/17-change-propagation.png",
    interactionType: "dependency-chain",
    garmentMode: "material-swatch-with-hero",
    requiredAssets: [GARMENT],
  },
  {
    screenNumber: 18,
    title: "Initial Marker",
    layer: "production",
    referencePath: "/references/screens/18-initial-marker.png",
    interactionType: "marker-layout",
    garmentMode: "marker-with-hero",
    requiredAssets: [GARMENT, ...PATTERN_SET.map((p) => `patterns/${p}.svg`)],
  },
  {
    screenNumber: 19,
    title: "Marker Optimisation",
    layer: "production",
    referencePath: "/references/screens/19-marker-optimisation.png",
    interactionType: "marker-comparison",
    garmentMode: "marker-before-after",
    requiredAssets: PATTERN_SET.map((p) => `patterns/${p}.svg`),
  },
  {
    screenNumber: 20,
    title: "Construction Sequence",
    layer: "production",
    referencePath: "/references/screens/20-construction-sequence.png",
    interactionType: "sequence-tiles",
    garmentMode: "construction-tiles-with-hero",
    requiredAssets: [GARMENT],
  },
  {
    screenNumber: 21,
    title: "BOM + Cost",
    layer: "production",
    referencePath: "/references/screens/21-bom-cost.png",
    interactionType: "bom-table",
    garmentMode: "hero-with-bom-callouts",
    requiredAssets: [GARMENT],
  },
  {
    screenNumber: 22,
    title: "Manufacturability",
    layer: "production",
    referencePath: "/references/screens/22-manufacturability.png",
    interactionType: "risk-analysis",
    garmentMode: "hero-with-risk-markers",
    requiredAssets: [GARMENT],
  },
  {
    screenNumber: 23,
    title: "Release Readiness",
    layer: "release",
    referencePath: "/references/screens/23-release-readiness.png",
    interactionType: "readiness-checklist",
    garmentMode: "hero-with-readiness-rings",
    requiredAssets: [GARMENT],
  },
  {
    screenNumber: 24,
    title: "Release Package",
    layer: "release",
    referencePath: "/references/screens/24-release-package.png",
    interactionType: "export-dashboard",
    garmentMode: "hero-with-package-grid",
    requiredAssets: [GARMENT, ...PATTERN_SET.map((p) => `patterns/${p}.svg`)],
  },
  {
    screenNumber: 25,
    title: "Published Structured Project",
    layer: "community",
    referencePath: "/references/screens/25-published-structured-project.png",
    interactionType: "profile-dashboard",
    garmentMode: "hero-profile",
    requiredAssets: [GARMENT],
  },
  {
    screenNumber: 26,
    title: "Forks + Remixes",
    layer: "community",
    referencePath: "/references/screens/26-forks-remixes.png",
    interactionType: "fork-grid",
    garmentMode: "hero-fork-variants",
    requiredAssets: [GARMENT],
  },
  {
    screenNumber: 27,
    title: "Lineage + Ecosystem",
    layer: "community",
    referencePath: "/references/screens/27-lineage-ecosystem.png",
    interactionType: "ecosystem-graph",
    garmentMode: "hero-ecosystem-center",
    requiredAssets: [GARMENT, "earth-horizon.jpg"],
  },
];

export default referenceManifest;
