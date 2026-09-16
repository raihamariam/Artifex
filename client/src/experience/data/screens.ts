import type { ScreenMeta } from "./types";

const ref = (file: string) => `/references/screens/${file}`;

/**
 * Canonical 27-screen registry. Numbering, titles, and layer grouping mirror
 * /references/reference-manifest.ts exactly (see /references/REFERENCE_MAP.md
 * for board/quadrant provenance). This is the runtime source of truth the app
 * builds screens against; the /references copy is the design-time spec.
 */
export const SCREENS: ScreenMeta[] = [
  { number: 1, title: "Interpret Creative Intent", layer: "creative", referencePath: ref("01-editorial-board.png") },
  { number: 2, title: "Design Intent, Made Tangible", layer: "creative", referencePath: ref("02-design-intent.png") },
  { number: 3, title: "From Sketch to Form", layer: "creative", referencePath: ref("03-sketch-to-form.png") },
  { number: 4, title: "Explore in 3D", layer: "creative", referencePath: ref("04-3d-creative-concept.png") },

  { number: 5, title: "Mainline Garment", layer: "collaboration", referencePath: ref("05-mainline-garment.png") },
  { number: 6, title: "Explore Branches", layer: "collaboration", referencePath: ref("06-branches.png") },
  { number: 7, title: "Review + Merge", layer: "collaboration", referencePath: ref("07-review-merge.png") },

  { number: 8, title: "Garment Anatomy", layer: "engineering", referencePath: ref("08-garment-anatomy.png") },
  { number: 9, title: "Seam Topology", layer: "engineering", referencePath: ref("09-seam-topology.png") },
  { number: 10, title: "Technical Flat", layer: "engineering", referencePath: ref("10-technical-flat.png") },
  { number: 11, title: "Pattern Extraction", layer: "engineering", referencePath: ref("11-pattern-extraction.png") },
  { number: 12, title: "3D ↔ 2D Mapping", layer: "engineering", referencePath: ref("12-3d-2d-mapping.png") },
  { number: 13, title: "Engineering Alternatives", layer: "engineering", referencePath: ref("13-engineering-alternatives.png") },
  { number: 14, title: "Fit Validation", layer: "engineering", referencePath: ref("14-fit-validation.png") },

  { number: 15, title: "Material Digital Twin", layer: "materials", referencePath: ref("15-material-digital-twin.png") },
  { number: 16, title: "Material Comparison", layer: "materials", referencePath: ref("16-material-comparison.png") },
  { number: 17, title: "Change Propagation", layer: "materials", referencePath: ref("17-change-propagation.png") },

  { number: 18, title: "Initial Marker", layer: "production", referencePath: ref("18-initial-marker.png") },
  { number: 19, title: "Marker Optimisation", layer: "production", referencePath: ref("19-marker-optimisation.png") },
  { number: 20, title: "Construction Sequence", layer: "production", referencePath: ref("20-construction-sequence.png") },
  { number: 21, title: "BOM + Cost", layer: "production", referencePath: ref("21-bom-cost.png") },
  { number: 22, title: "Manufacturability", layer: "production", referencePath: ref("22-manufacturability.png") },

  { number: 23, title: "Release Readiness", layer: "release", referencePath: ref("23-release-readiness.png") },
  { number: 24, title: "Release Package", layer: "release", referencePath: ref("24-release-package.png") },

  { number: 25, title: "Published Structured Project", layer: "community", referencePath: ref("25-published-structured-project.png") },
  { number: 26, title: "Forks + Remixes", layer: "community", referencePath: ref("26-forks-remixes.png") },
  { number: 27, title: "Lineage + Ecosystem", layer: "community", referencePath: ref("27-lineage-ecosystem.png") },
];

export const TOTAL_SCREENS = SCREENS.length;

export const LAYERS: { key: ScreenMeta["layer"]; label: string }[] = [
  { key: "creative", label: "Creative" },
  { key: "collaboration", label: "Collaboration" },
  { key: "engineering", label: "Engineering" },
  { key: "materials", label: "Materials" },
  { key: "production", label: "Production" },
  { key: "release", label: "Release" },
  { key: "community", label: "Community" },
];

export function screenByIndex(index: number): ScreenMeta {
  return SCREENS[Math.max(0, Math.min(SCREENS.length - 1, index))];
}

export function firstScreenIndexForLayer(layer: ScreenMeta["layer"]): number {
  return SCREENS.findIndex((s) => s.layer === layer);
}
