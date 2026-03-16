/** A single frame of generated pixel data. */
export interface SpiritFrame {
  /** Grid width in pixels (default: 32). */
  width: number;
  /** Grid height in pixels (default: 32). */
  height: number;
  /** 2D pixel grid — `pixels[y][x]` is a hex color string or `null` (transparent). */
  pixels: (string | null)[][];
}

/** Color palette for a spirit. */
export interface ColorPalette {
  body: string;
  bodyLight: string;
  bodyDark: string;
  eye: string;
  accent: string;
}

/** Supported animation types. */
export type AnimationType = "idle" | "happy" | "sad" | "sleep" | "evolve" | "levelup";

/** Supported stage identifiers. */
export type StageId = "egg" | "baby_01" | "child_diary_01" | "child_balanced_01";

/** Supported palette identifiers. */
export type PaletteId =
  | "red_light"
  | "blue_light"
  | "green_light"
  | "yellow_light"
  | "red_dark"
  | "blue_dark"
  | "green_dark"
  | "yellow_dark";

/** Animation configuration. */
export interface AnimationConfig {
  frames: number;
  fps: number;
  loop: boolean;
}

/** Metadata about a stage. */
export interface StageInfo {
  id: StageId;
  name: string;
  tier: number;
}

/** Options for generating a spirit frame. */
export interface GenerateOptions {
  /** Stage to generate. */
  stage: StageId;
  /** Animation type. Default: "idle". */
  animation?: AnimationType;
  /** Animation frame index. Default: 0. */
  frame?: number;
  /** Palette identifier. Default: "blue_light". */
  palette?: PaletteId;
  /** Custom palette (overrides palette ID). */
  customPalette?: ColorPalette;
  /** Seed for deterministic variation. Default: 0. */
  seed?: number;
}
