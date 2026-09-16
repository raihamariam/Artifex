import type { ScreenComponent } from "../data/types";
import { ScreenPlaceholder } from "../shared/ScreenPlaceholder";
import { Screen04 } from "./Screen04";

/** Screens 01-03 — built in Phase 4. Screen 04 — gold-standard 3D viewer (Phase 3). */
export const creativeScreens: Record<number, ScreenComponent> = {
  1: ScreenPlaceholder,
  2: ScreenPlaceholder,
  3: ScreenPlaceholder,
  4: Screen04,
};
