import type { ScreenComponent } from "./types";
import { creativeScreens } from "../creative";
import { collaborationScreens } from "../collaboration";
import { engineeringScreens } from "../engineering";
import { materialsScreens } from "../materials";
import { productionScreens } from "../production";
import { releaseScreens } from "../release";
import { communityScreens } from "../community";

export const SCREEN_REGISTRY: Record<number, ScreenComponent> = {
  ...creativeScreens,
  ...collaborationScreens,
  ...engineeringScreens,
  ...materialsScreens,
  ...productionScreens,
  ...releaseScreens,
  ...communityScreens,
};
