import type { ReactElement } from "react";

export type ExperienceLayer =
  | "creative"
  | "collaboration"
  | "engineering"
  | "materials"
  | "production"
  | "release"
  | "community";

export interface ScreenMeta {
  /** 1-27, matches the reference board numbering (NN / 27). */
  number: number;
  title: string;
  layer: ExperienceLayer;
  /** Dev-only path to the reference board crop, used for QA overlay — never shipped as UI content. */
  referencePath: string;
}

export type ScreenComponent = (props: { screen: ScreenMeta }) => ReactElement;
