# CLAUDE.md

## PART 1 — PROJECT-SPECIFIC CLAUDE INSTRUCTIONS

### What this project is

Artifex is a conceptual product-vision prototype: a marketing landing page plus an
interactive "Experience Artifex" mockup of a 27-screen fashion creative-engineering
product journey. Per the landing page's own copy, it is explicitly conceptual — "This
experience illustrates the Artifex product vision. Shown capabilities are conceptual and
intended to communicate the future workflow." It is a Vite + React single-page app with a
minimal Express server used only for production static hosting and one small waitlist API
endpoint.

### Repository structure

```
client/               Vite React SPA (the actual product)
  index.html
  public/             Static assets served as-is (includes /artifex 2D/3D assets)
  src/
    main.tsx          React root (createRoot)
    App.tsx           Renders <Home /> directly — no router is mounted
    pages/            Home.tsx (the entire app today), NotFound.tsx (defined, unrouted)
    components/       Shared components, incl. shadcn/ui primitives in components/ui
    experience/       "Experience Artifex" product journey (see below)
    contexts/, hooks/, lib/, assets/
server/               Express server: static file serving + /api/waitlist (production only)
shared/               Tiny cross-cutting constants (shared/const.ts)
references/           Design source-of-truth: 27 reference screen crops, REFERENCE_MAP.md,
                       reference-manifest.ts, and the canonical hero garment concept image
patches/              pnpm patch for the wouter dependency
dist/                 Build output (gitignored)
```

There is no `attached_assets` directory even though `vite.config.ts` defines an `@assets`
alias pointing to one — that alias currently resolves to nothing. Don't assume it exists.

### Frontend/backend structure

- **Frontend**: everything under `client/`. This is the actual, actively developed product.
- **Backend**: `server/index.ts` is a thin Express app that (a) serves the built
  `dist/public` static files and (b) exposes `POST /api/waitlist`, which forwards to a
  Google Apps Script endpoint (see `server/waitlist.ts`). It does not run in dev — in dev,
  the same `/api/waitlist` route and a few other dev-only middlewares (debug log collector,
  storage proxy) are provided directly by plugins in `vite.config.ts`, not by
  `server/index.ts`. There is no database, no auth, and no other backend surface.

### Current technology stack

- React 19 + TypeScript (strict mode), built with Vite 7
- Tailwind CSS v4 (via `@tailwindcss/vite`) + shadcn/ui (`components.json`: "new-york"
  style, CSS variables, neutral base color) for the `client/src/components/ui` primitives
- Radix UI primitives (underlying shadcn/ui)
- `three` + `@react-three/fiber` + `@react-three/drei` + `@react-three/postprocessing` +
  `gsap` for the real-time 3D garment viewer (`client/src/experience/three/`)
- `lucide-react` for icons
- `express` for the minimal production server
- Fonts: Cormorant Garamond (serif/display) + DM Sans (body/sans), loaded via Google Fonts
  `<link>` in `client/index.html` — not self-hosted
- `wouter` and `framer-motion` are installed but **not currently used** anywhere active
  (`wouter` only appears in the unrouted `NotFound.tsx`; `framer-motion` isn't imported
  anywhere in `client/src`). Don't assume routing or animation infrastructure exists because
  the package is installed — check actual usage first.
- No ESLint config exists anywhere in the repo. Code style is enforced only by
  `prettier` (`.prettierrc`) and TypeScript's own strictness.
- `vitest` is a devDependency but there is **no vitest config and no test files** anywhere
  in the repository, and no `test` script in `package.json`. Testing is not currently wired
  up — do not assume a test suite exists.

### Package manager

**pnpm** (`packageManager` field in `package.json` pins `pnpm@10.4.1`; `pnpm-lock.yaml` is
the committed lockfile). The lockfile uses `workspace:`-style patched-dependency syntax
(`pnpm.patchedDependencies`, `pnpm.overrides`) that plain `npm install` cannot resolve
(`EUNSUPPORTEDPROTOCOL`) — always use `pnpm install` / `pnpm add`, never `npm install`, to
add or change dependencies. Running an already-defined script (e.g. `npm run check`) works
fine either way since it's just invoking the script in `package.json`, but prefer `pnpm run
<script>` for consistency.

### Commands

| Purpose | Command |
|---|---|
| Install deps | `pnpm install` |
| Add a dependency | `pnpm add <pkg>` (use `pnpm add -D` for devDependencies) |
| Dev server | `npm run dev` (Vite, `--host`, port 3000, falls back to next free port) |
| Production build | `npm run build` (Vite client build → `dist/public`, then esbuild bundles `server/index.ts` → `dist/index.js`) |
| Run production build | `npm run start` (`NODE_ENV=production node dist/index.js`) |
| Preview production build | `npm run preview` |
| Type-check | `npm run check` (`tsc --noEmit`) — **this is the only automated correctness gate that currently exists in this repo** |
| Format | `npm run format` (`prettier --write .`) |
| Lint | **not configured** — no ESLint config or `lint` script exists. Do not invent one or assume it exists. |
| Test | **not configured** — `vitest` is installed but has no config and no test files. Do not invent a `test` script or assume test coverage exists. |

After any change, at minimum run `npm run check` and `npm run build`. If the change is
UI-visible, also actually run the dev server and look at it (browser automation or a
screenshot) — passing typecheck/build does not mean a feature or a visual change works.

### Important directories

- `client/src/experience/` — the entire "Experience Artifex" 27-screen journey.
  - `ExperienceArtifex.tsx` — entry point/owner of the active-screen-index state
  - `ExperienceShell.tsx`, `ExperienceNavigation.tsx`, `ExperienceProgress.tsx`,
    `ExperienceControls.tsx`, `ExperienceRail.tsx` — shared chrome (header, layer nav,
    screen counter, back/waitlist controls, left icon rail)
  - `data/screens.ts`, `data/types.ts`, `data/registry.tsx` — the canonical 27-screen
    registry and per-layer component lookup
  - `creative/`, `collaboration/`, `engineering/`, `materials/`, `production/`,
    `release/`, `community/` — one folder per layer, each exporting a `Record<number,
    ScreenComponent>` for the screen numbers it owns (see `data/registry.tsx`)
  - `shared/ScreenPlaceholder.tsx` — stand-in for any screen not yet built
  - `three/` — the R3F 3D garment viewer engine (see below)
  - `ui/primitives.tsx` — the shared Artifex design-system primitives (buttons, panels,
    tabs, badges, metrics, etc.) — see "existing architectural decisions"
  - `styles/experience.css` — all Experience-scoped design tokens and component styles
  - `StyleTest.tsx` — dev-only visual QA sandbox for the primitives, reachable only via
    `?view=styletest` when `import.meta.env.DEV` is true
- `client/src/pages/Home.tsx` — owns the single top-level `view` state
  (`landing | journey | wireframes | styletest`) that switches between the public landing
  page, the Experience Artifex journey, the legacy wireframe map, and the dev style-test
  sandbox. This is the whole app's routing today; there is no router library in use.

### 2D/3D asset locations

- **3D**: `client/public/artifex/3d/artifex-hero.glb` (primary hero garment model, ~10MB,
  single mesh/node, full PBR: base color + normal + combined metallic-roughness texture)
  and `artifex-hero-shaded.glb` (pre-baked emissive fallback, same geometry). Loaded via
  `client/src/experience/three/GarmentModel.tsx` (`useGLTF`). The model has **no separate
  named sub-meshes** for garment regions (collar/sleeve/waist/etc.) — it is one merged
  mesh. Per-region selection is not currently possible without either a re-exported model
  with separated parts or raycast/UV-mask work.
- **2D**: `client/public/artifex/` (served as static assets, organized by layer:
  `creative/`, `garment/`, plus empty-so-far `collaboration/`, `community/`,
  `construction/`, `materials/`, `patterns/` directories) and `client/src/assets/garment/`
  (imported directly by components). `references/screens/01.png`…`27.png` plus
  `references/ChatGPT Image *.png` are **design-time reference material only** — the design
  authority for what each screen/asset should look like — not shipped UI content.
  `references/reference-manifest.ts` and `references/REFERENCE_MAP.md` document exactly
  which source board/quadrant each reference screen came from and list the intended
  `requiredAssets` per screen (many of which — patterns, material photos, technical flats —
  do not exist yet and will need to be produced when those screens are built).

### Existing architectural decisions

- The public landing page (`Home.tsx`'s `landing` view, plus its `Nav`/`Waitlist`/
  `WaitlistModal` sub-components) and the Experience Artifex journey are two intentionally
  separate visual systems. The landing page's own header (`.site-nav`, defined in
  `client/src/index.css`) is **conditionally unmounted** while `view === "journey"` (and
  `"styletest"`) specifically because it used to visually and functionally overlap the
  Experience header and intercept clicks — do not remount it inside the Experience view.
- The Experience journey's own visual system (tokens, typography, primitives) lives
  entirely in `client/src/experience/styles/experience.css`, scoped under the
  `.experience-shell` selector so its custom properties never leak into or collide with
  the landing page's `:root` tokens in `client/src/index.css`. The two token systems
  (`--ink`/`--acid`/… on `:root` for landing, `--art-*` on `.experience-shell` for the
  journey) are deliberately kept separate — do not merge them.
- Screens are registered per-layer in `client/src/experience/<layer>/index.tsx` as a
  `Record<number, ScreenComponent>`, aggregated in `data/registry.tsx`, and looked up by
  screen number from `data/screens.ts`. A not-yet-built screen maps to
  `ScreenPlaceholder`. When building a new screen, follow this exact pattern rather than
  inventing a new registration mechanism.
- Shared Experience UI (buttons, panels, tabs, badges, metrics, thumbnails, dividers,
  callouts, image frames, control groups) are built once as primitives in
  `client/src/experience/ui/primitives.tsx` and reused by every screen. Prefer extending
  or composing these primitives over writing new one-off styled markup per screen.
- The 3D viewer (`client/src/experience/three/`) is deliberately split into small
  single-responsibility files (`GarmentCanvas`, `GarmentModel`, `GarmentControls`,
  `GarmentLighting`, `GarmentEnvironment`, `GarmentLoader`, `GarmentErrorBoundary`,
  `garmentConfig.ts`, `types.ts`) rather than one large component. It currently powers only
  Screen 04 ("Explore in 3D") and has not been propagated to other screens.
- A separate, generic full-page `ErrorBoundary` already exists at
  `client/src/components/ErrorBoundary.tsx`, but it is **not currently mounted anywhere**
  (not in `main.tsx` or `App.tsx`). `GarmentErrorBoundary` in `experience/three/` is a
  narrower, viewport-scoped boundary for 3D-renderer failures specifically — the two serve
  different purposes; check which one is appropriate before adding a new one.
- Dev-only routes/tools are gated behind `import.meta.env.DEV` and a `?view=` query param
  (e.g. `?view=styletest`) rather than a real router, matching the existing `Home.tsx`
  pattern — do not introduce a routing library for this.

### Naming/conventions already used in the repository

- Components: PascalCase filenames matching the exported component (`GarmentCanvas.tsx`
  exports `GarmentCanvas`).
- Experience-layer CSS classes use a flat, hyphenated `experience-*` / `art-*` /
  `screen-NN-*` naming scheme (e.g. `.experience-nav-tab`, `.art-button--primary`,
  `.screen-04-viewport`), not CSS Modules or styled-components. New Experience UI should
  follow this same convention in `experience.css`, not introduce a new styling approach.
- Path aliases: `@/*` → `client/src/*`, `@shared/*` → `shared/*` (see `tsconfig.json` and
  `vite.config.ts` — keep both in sync if you ever add a new alias).
- Prettier config (`.prettierrc`): double quotes, semicolons, trailing commas (ES5), 2-space
  indent, LF line endings. Run `npm run format` rather than hand-formatting.

### Things that must not be unnecessarily rewritten

- The landing page (`Home.tsx`'s `landing` view and its sub-components) and the waitlist
  flow (`Waitlist`, `WaitlistModal`, `server/waitlist.ts`) — these are explicitly
  called out across prior phases of this project as "do not touch" unless a phase
  explicitly says otherwise.
- `client/src/index.css`'s `:root` tokens (the landing page's own design system).
- The per-screen registry pattern in `data/registry.tsx` / `<layer>/index.tsx` — don't
  invent a parallel screen-registration mechanism.
- The shared Experience primitives in `ui/primitives.tsx` — extend them; don't duplicate a
  near-identical button/panel/badge component elsewhere.
- Reference material under `references/` — this is source-of-truth design documentation,
  not application code. Don't move, rename, or regenerate the 27 reference screen crops;
  `REFERENCE_MAP.md` documents exactly how they were produced from the original source
  boards.

### How to inspect the existing implementation before modifying it

Before changing anything, actually read the relevant files rather than assuming behavior
from a filename or a memory of an earlier phase:

1. Read `client/src/pages/Home.tsx` to understand current view/state wiring.
2. For any Experience screen, read `data/screens.ts` (canonical title/layer/number),
   `data/registry.tsx` (which component currently serves that screen number), and the
   layer's `index.tsx`.
3. For visual/styling questions, check `client/src/experience/styles/experience.css` for
   existing tokens/classes before adding new ones, and check `references/` for the
   relevant reference screen crop before redesigning anything.
4. For the 3D viewer, read `client/src/experience/three/garmentConfig.ts` first (camera
   presets, control limits, model paths) — most tuning happens there, not by editing the
   component logic.
5. Run `git log` / `git status` / `git diff` to see what's actually changed versus what a
   past summary claims — treat this repository's current file contents as authoritative
   over any prior phase report.

### Requirement to preserve working functionality

Do not break previously verified behavior (landing page, waitlist, Experience navigation,
the 3D viewer) while implementing a new phase. If a change to shared code (the shell,
primitives, `Home.tsx`) is required, re-verify the things that depend on it — don't assume
they still work.

### Requirement to use the existing architecture unless a phase explicitly requires a change

Follow the patterns documented above (screen registry, shared primitives, scoped CSS
tokens, per-responsibility file splitting in `three/`) unless the current phase's
instructions explicitly call for an architectural change. Don't redesign the shell,
introduce a new state-management or routing library, or restructure directories as a side
effect of an unrelated task.

### Requirement not to fake integrations or hardcode successful behaviour

Never hardcode a "success" response, stub out a real API/service call with a fake resolved
value, or mark a feature as working without actually exercising it. If a required
integration, credential, or asset does not exist and cannot reasonably be produced, stop
and report the blocker explicitly rather than faking the behavior it would have produced.
This applies equally to visual/3D work — do not simulate real-time 3D with prerendered
images, video, or CSS tricks; do not claim a model or material is production-quality
without actually rendering and looking at it.

### Requirement to run appropriate validation after changes

At minimum: `npm run check` (TypeScript) and `npm run build` after every change. For
UI-visible or interactive changes, also load the app (dev server + browser) and verify the
actual behavior — do not rely on typecheck/build passing as proof that a feature works.
There is no lint or test command currently configured (see Commands table above) — don't
invent one to "complete" a validation step; use what actually exists, and note explicitly
in your report if a category of validation (lint, automated tests) isn't available.

### Requirement to treat the repository itself as the source of truth

Prior phase reports, chat summaries, or comments describing "what was built" can go stale
or be wrong. When in doubt, read the actual current file contents, `git log`, and `git
diff` rather than trusting a description of past work — including this file. If this file
and the repository ever disagree, the repository wins; update this file to match.

---

# AUTONOMOUS PHASE EXECUTION

This repository may be executed by an autonomous GitHub Actions Claude runner.

When instructed to execute a file from PHASES/:

1. Read CLAUDE.md completely.
2. Inspect the current repository before changing anything.
3. Read the requested phase completely.
4. Implement the phase.
5. Run the phase's required verification and tests.
6. Fix ordinary implementation failures yourself.
7. Do not stop merely because:

   * a test fails
   * TypeScript fails
   * lint fails
   * a dependency is missing
   * the build fails
   * your first implementation does not work
   * you encounter an ordinary coding problem

Investigate and repair these yourself.

Never weaken tests simply to obtain a pass.

Never fake functionality or successful integrations.

Never mark unfinished or unverified work as complete.

## Phase completion

At the end of the phase create:

PHASE_RESULTS/XX.md

where XX is the current phase number.

If all acceptance criteria pass, the FIRST LINE must be exactly:

STATUS: PASS

Then document:

* what was implemented
* files changed
* tests executed
* test results
* architectural decisions
* known limitations

If continuation genuinely requires human action, the FIRST LINE must instead be exactly:

STATUS: BLOCKED

Then explain:

* what is blocking progress
* what was already attempted
* exactly what human action is required

Human blockers include things such as:

* missing account credentials
* required external authentication
* unavailable paid services
* irreversible product decisions
* assets that do not exist and cannot reasonably be produced

Ordinary programming problems are NOT human blockers.

## Autonomous operation

If the phase passes, finish cleanly and allow the automation system to start the next phase.

Do not request user confirmation between successful phases.

The repository is the source of truth.
