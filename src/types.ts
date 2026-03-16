/** A single frame of generated pixel data. */
export interface SpiritFrame {
  /** Grid width in pixels. */
  width: number;
  /** Grid height in pixels. */
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
export type AnimationType = "idle" | "happy" | "sad" | "sleep";

/** Supported preset identifiers. */
export type PresetId = "egg" | "baby" | "child_diary" | "child_balanced";

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

/** Body shape type (procedurally selected from seed). */
export type BodyShape = "circle" | "oval_tall" | "oval_wide" | "rounded_square" | "teardrop";

/** Eye style type. */
export type EyeStyle = "dot" | "small" | "medium" | "large" | "cyclops";

/** Mouth style type. */
export type MouthStyle = "line" | "smile" | "open" | "none";

/** Decoration type. */
export type DecorationType =
  | "none"
  | "halo"
  | "horns"
  | "antennae"
  | "hat"
  | "leaf"
  | "crown"
  | "book";

/** Resolved spirit traits derived from a seed. */
export interface SpiritTraits {
  bodyShape: BodyShape;
  bodySize: number;
  eyeStyle: EyeStyle;
  eyeSpread: number;
  mouthStyle: MouthStyle;
  decoration: DecorationType;
  hasMarkings: boolean;
  markingPattern: number;
}

/** Metadata about a preset. */
export interface PresetInfo {
  id: PresetId;
  name: string;
  description: string;
}

/** Options for generating a spirit frame. */
export interface GenerateOptions {
  /** Seed for deterministic generation. Different seeds produce different characters. */
  seed: number;
  /** Animation type. Default: "idle". */
  animation?: AnimationType;
  /** Animation frame index. Default: 0. */
  frame?: number;
  /** Palette identifier. If omitted, palette is derived from seed. */
  palette?: PaletteId;
  /** Custom palette (overrides palette ID and seed-derived palette). */
  customPalette?: ColorPalette;
  /** Use a preset character instead of procedural generation. */
  preset?: PresetId;
}
