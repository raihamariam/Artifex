# Artifex — Reference Map (Phase 0)

Provenance record for the 27 extracted screen references in `/references/screens/`.
Each screen was cropped directly (pixel copy, no regeneration) from one of the 7 supplied
source boards in `/references/`. Boards 1–6 are 2×2 quadrant grids (1672×941px, split at
x=836 / y=469); Board 7 is a 3-panel strip (1672×941px, split at x=556 / x=1115).

| # | Screen file | Layer | Source board | Quadrant |
|---|---|---|---|---|
| 01 | 01-editorial-board.png | Creative | Board 1 — `ChatGPT Image Sep 16, 2026, 06_43_56 PM (1).png` | top-left |
| 02 | 02-design-intent.png | Creative | Board 1 | top-right |
| 03 | 03-sketch-to-form.png | Creative | Board 1 | bottom-left |
| 04 | 04-3d-creative-concept.png | Creative | Board 1 | bottom-right |
| 05 | 05-mainline-garment.png | Collaboration | Board 2 — `... (2).png` | top-left |
| 06 | 06-branches.png | Collaboration | Board 2 | top-right |
| 07 | 07-review-merge.png | Collaboration | Board 2 | bottom-left |
| 08 | 08-garment-anatomy.png | Engineering | Board 2 | bottom-right |
| 09 | 09-seam-topology.png | Engineering | Board 3 — `... (3).png` | top-left |
| 10 | 10-technical-flat.png | Engineering | Board 3 | top-right |
| 11 | 11-pattern-extraction.png | Engineering | Board 3 | bottom-left |
| 12 | 12-3d-2d-mapping.png | Engineering | Board 3 | bottom-right |
| 13 | 13-engineering-alternatives.png | Engineering | Board 4 — `... (4).png` | top-left |
| 14 | 14-fit-validation.png | Engineering | Board 4 | top-right |
| 15 | 15-material-digital-twin.png | Materials | Board 4 | bottom-left |
| 16 | 16-material-comparison.png | Materials | Board 4 | bottom-right |
| 17 | 17-change-propagation.png | Materials | Board 5 — `... (5).png` | top-left |
| 18 | 18-initial-marker.png | Production | Board 5 | top-right |
| 19 | 19-marker-optimisation.png | Production | Board 5 | bottom-left |
| 20 | 20-construction-sequence.png | Production | Board 5 | bottom-right |
| 21 | 21-bom-cost.png | Production | Board 6 — `... (6).png` | top-left |
| 22 | 22-manufacturability.png | Production | Board 6 | top-right |
| 23 | 23-release-readiness.png | Release | Board 6 | bottom-left |
| 24 | 24-release-package.png | Release | Board 6 | bottom-right |
| 25 | 25-published-structured-project.png | Community | Board 7 — `... (7).png` | left panel |
| 26 | 26-forks-remixes.png | Community | Board 7 | centre panel |
| 27 | 27-lineage-ecosystem.png | Community | Board 7 | right panel |

## Notes

- `ChatGPT Image Sep 11, 2026, 09_44_24 PM.png` is **not** one of the 27 screens. It is the
  canonical garment DNA/moodboard reference (front view, back view, twisted-waist detail,
  drape study, sketch annotations) — kept in `/references/` as the authority for the
  `artifex-hero.glb` model's silhouette, proportions, and surface finish. It has no
  screen number and is not part of the 27-screen flow.
- Each screen file was produced by a direct pixel crop of its source board — see
  `scripts`/crop log below for exact coordinates. No content was invented, resized beyond
  the original crop, or upscaled.
- Crop coordinates used:
  - Boards 1–6 (2×2 grid, 1672×941 source): TL=(0,0,836,469), TR=(836,0,1672,469),
    BL=(0,469,836,941), BR=(836,469,1672,941).
  - Board 7 (3-panel, 1672×941 source): left=(0,0,556,941), centre=(556,0,1115,941),
    right=(1115,0,1672,941).
- Screen numbering matches the `NN / 27` counter printed in the top-right of each
  reference screen itself — verified visually against every crop before acceptance.
- All 27 filenames match `reference-manifest.ts` `referencePath` entries exactly.
