import { resolvePalette } from "./palettes.js";
import { drawBody, getBodyBounds } from "./parts/body.js";
import { drawDecoration } from "./parts/decoration.js";
import { drawEffects } from "./parts/effects.js";
import { drawEyes } from "./parts/eyes.js";
import { drawMarkings } from "./parts/markings.js";
import { drawMouth } from "./parts/mouth.js";
import { getPresetDrawer } from "./presets/index.js";
import { seedPick } from "./seed.js";
import { deriveTraits } from "./traits.js";
import { createFrame } from "./frame.js";
import type {
  AnimationConfig,
  AnimationType,
  ColorPalette,
  GenerateOptions,
  PaletteId,
  SpiritFrame,
} from "./types.js";

const ANIMATION_CONFIGS: Record<AnimationType, AnimationConfig> = {
  idle: { frames: 4, fps: 4, loop: true },
  happy: { frames: 4, fps: 8, loop: false },
  sad: { frames: 4, fps: 4, loop: false },
  sleep: { frames: 2, fps: 2, loop: true },
};

const ALL_PALETTE_IDS: readonly PaletteId[] = [
  "red_light",
  "blue_light",
  "green_light",
  "yellow_light",
  "red_dark",
  "blue_dark",
  "green_dark",
  "yellow_dark",
];

/**
 * Generate a single frame of a pixel spirit.
 *
 * Pass just a `seed` to get a unique procedurally-generated character.
 * Different seeds produce different body shapes, eyes, mouths, and decorations.
 *
 * Optionally use `preset` to select a pre-designed character.
 */
export function generateSpirit(options: GenerateOptions): SpiritFrame {
  const { seed, animation = "idle", frame: animFrame = 0, preset } = options;

  // Resolve palette: custom > explicit ID > seed-derived
  const palette = resolveSpiritPalette(options, seed);

  // Preset mode: use a pre-designed character
  if (preset) {
    const drawer = getPresetDrawer(preset);
    return drawer(animFrame, palette, animation, seed);
  }

  // Procedural mode: derive traits from seed
  return generateProcedural(seed, palette, animation, animFrame);
}

function resolveSpiritPalette(options: GenerateOptions, seed: number): ColorPalette {
  if (options.customPalette) return options.customPalette;
  if (options.palette) return resolvePalette(options.palette);
  // Derive palette from seed
  const paletteId = seedPick(seed, 100, ALL_PALETTE_IDS);
  return resolvePalette(paletteId);
}

function generateProcedural(
  seed: number,
  palette: ColorPalette,
  animation: AnimationType,
  animFrame: number,
): SpiritFrame {
  const traits = deriveTraits(seed);
  const frame = createFrame();

  // Animation offset
  const bounce = animation === "happy" ? (animFrame % 2 === 0 ? -1 : 0) : 0;
  const oy = bounce;

  // 1. Body
  drawBody(frame, traits.bodyShape, traits.bodySize, palette, oy);

  // 2. Get body bounds for positioning parts
  const bounds = getBodyBounds(traits.bodyShape, traits.bodySize);

  // 3. Decoration (above body)
  drawDecoration(frame, traits.decoration, bounds.top, palette, oy);

  // 4. Eyes
  drawEyes(frame, traits.eyeStyle, traits.eyeSpread, bounds.eyeY, palette, animation, animFrame, oy);

  // 5. Mouth
  const mouthY = bounds.eyeY + 4;
  drawMouth(frame, traits.mouthStyle, mouthY, palette, animation, oy);

  // 6. Markings
  if (traits.hasMarkings) {
    drawMarkings(frame, traits.markingPattern, palette, seed, oy);
  }

  // 7. Effects (sparkles, cheeks)
  drawEffects(frame, animation, animFrame, bounds.eyeY, palette, seed, oy);

  return frame;
}

/** Get animation configuration for a given animation type. */
export function getAnimationConfig(animation: AnimationType): AnimationConfig {
  return { ...ANIMATION_CONFIGS[animation] };
}
