import { DEFAULT_PALETTE, resolvePalette } from "./palettes.js";
import { getStageDrawer } from "./stages/index.js";
import type { AnimationConfig, AnimationType, GenerateOptions, SpiritFrame } from "./types.js";

const ANIMATION_CONFIGS: Record<AnimationType, AnimationConfig> = {
  idle: { frames: 4, fps: 4, loop: true },
  happy: { frames: 4, fps: 8, loop: false },
  sad: { frames: 4, fps: 4, loop: false },
  sleep: { frames: 2, fps: 2, loop: true },
  evolve: { frames: 8, fps: 8, loop: false },
  levelup: { frames: 4, fps: 8, loop: false },
};

/**
 * Generate a single frame of a pixel spirit.
 *
 * Returns a `SpiritFrame` containing a 32×32 grid of pixel colors.
 * Each pixel is either a hex color string or `null` (transparent).
 */
export function generateSpirit(options: GenerateOptions): SpiritFrame {
  const {
    stage,
    animation = "idle",
    frame = 0,
    palette: paletteId,
    customPalette,
    seed = 0,
  } = options;

  const palette = customPalette ?? (paletteId ? resolvePalette(paletteId) : DEFAULT_PALETTE);
  const drawer = getStageDrawer(stage);

  return drawer(frame, palette, animation, seed);
}

/** Get animation configuration for a given animation type. */
export function getAnimationConfig(animation: AnimationType): AnimationConfig {
  return { ...ANIMATION_CONFIGS[animation] };
}
