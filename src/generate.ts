import { resolvePalette } from "./palettes.js";
import { drawBody, getBodyBounds } from "./parts/body.js";
import { drawDecoration } from "./parts/decoration.js";
import { drawEars } from "./parts/ears.js";
import { drawEffects } from "./parts/effects.js";
import { drawEyes } from "./parts/eyes.js";
import { drawMarkings } from "./parts/markings.js";
import { drawMouth } from "./parts/mouth.js";
import { drawTail } from "./parts/tail.js";
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
 * Use `traits` to override specific features while keeping the rest seed-derived.
 * Use `preset` to select a pre-designed character.
 */
export function generateSpirit(options: GenerateOptions): SpiritFrame {
  const { seed, animation = "idle", frame: animFrame = 0, preset } = options;

  const palette = resolveSpiritPalette(options, seed);

  if (preset) {
    const drawer = getPresetDrawer(preset);
    return drawer(animFrame, palette, animation, seed);
  }

  return generateProcedural(seed, palette, animation, animFrame, options);
}

function resolveSpiritPalette(options: GenerateOptions, seed: number): ColorPalette {
  if (options.customPalette) return options.customPalette;
  if (options.palette) return resolvePalette(options.palette);
  const paletteId = seedPick(seed, 100, ALL_PALETTE_IDS);
  return resolvePalette(paletteId);
}

function generateProcedural(
  seed: number,
  palette: ColorPalette,
  animation: AnimationType,
  animFrame: number,
  options: GenerateOptions,
): SpiritFrame {
  const traits = deriveTraits(seed, options.traits);
  const frame = createFrame();

  const bounce = animation === "happy" ? (animFrame % 2 === 0 ? -1 : 0) : 0;
  const oy = bounce;

  // 1. Body
  drawBody(frame, traits.bodyShape, traits.bodySize, palette, oy);
  const bounds = getBodyBounds(traits.bodyShape, traits.bodySize);

  // 2. Ears (before decoration, behind head)
  drawEars(frame, traits.earType, bounds.top, traits.bodySize, palette, oy);

  // 3. Decoration (above body)
  drawDecoration(frame, traits.decoration, bounds.top, palette, oy);

  // 4. Eyes
  drawEyes(
    frame,
    traits.eyeStyle,
    traits.eyeSpread,
    bounds.eyeY,
    palette,
    animation,
    animFrame,
    oy,
  );

  // 5. Mouth
  const mouthY = bounds.eyeY + 4;
  drawMouth(frame, traits.mouthStyle, mouthY, palette, animation, oy);

  // 6. Tail
  drawTail(frame, traits.tailType, bounds.bottom, traits.bodySize, palette, oy);

  // 7. Markings
  if (traits.hasMarkings) {
    drawMarkings(frame, traits.markingPattern, palette, seed, oy);
  }

  // 8. Effects (sparkles, cheeks)
  drawEffects(frame, animation, animFrame, bounds.eyeY, palette, seed, oy);

  return frame;
}

/** Get animation configuration for a given animation type. */
export function getAnimationConfig(animation: AnimationType): AnimationConfig {
  return { ...ANIMATION_CONFIGS[animation] };
}
