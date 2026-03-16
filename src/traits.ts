import { seedBool, seedPick, seedRange } from "./seed.js";

import type {
  BodyShape,
  DecorationType,
  EarType,
  EyeStyle,
  MouthStyle,
  SpiritTraits,
  TailType,
  TraitsOverride,
} from "./types.js";

const BODY_SHAPES: readonly BodyShape[] = [
  "circle",
  "oval_tall",
  "oval_wide",
  "rounded_square",
  "teardrop",
  "dome",
  "tall_dome",
  "creature",
];

const EYE_STYLES: readonly EyeStyle[] = ["dot", "small", "medium", "large", "cyclops"];

const MOUTH_STYLES: readonly MouthStyle[] = ["line", "smile", "open", "none"];

const DECORATIONS: readonly DecorationType[] = [
  "none",
  "none",
  "halo",
  "horns",
  "antennae",
  "hat",
  "leaf",
  "crown",
  "book",
];

const EAR_TYPES: readonly EarType[] = ["none", "none", "none", "pointed", "round", "long", "cat"];

const TAIL_TYPES: readonly TailType[] = ["none", "none", "none", "bushy", "thin", "curled"];

/**
 * Derive all visual traits from a seed deterministically.
 * Different seeds produce different characters.
 */
export function deriveTraits(seed: number, overrides?: TraitsOverride): SpiritTraits {
  const base: SpiritTraits = {
    bodyShape: seedPick(seed, 0, BODY_SHAPES),
    bodySize: seedRange(seed, 1, 6, 8),
    eyeStyle: seedPick(seed, 2, EYE_STYLES),
    eyeSpread: seedRange(seed, 3, 2, 5),
    mouthStyle: seedPick(seed, 4, MOUTH_STYLES),
    decoration: seedPick(seed, 5, DECORATIONS),
    earType: seedPick(seed, 8, EAR_TYPES),
    tailType: seedPick(seed, 9, TAIL_TYPES),
    hasMarkings: seedBool(seed, 6, 0.4),
    markingPattern: seedRange(seed, 7, 0, 3),
  };

  if (!overrides) return base;

  return { ...base, ...overrides };
}
