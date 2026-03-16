import { seedOffset } from "../seed.js";
import type { AnimationType, ColorPalette, SpiritFrame } from "../types.js";
import { setPixel } from "../frame.js";

/**
 * Draw animation effects (cheeks, sparkles, bounce particles).
 */
export function drawEffects(
  frame: SpiritFrame,
  animation: AnimationType,
  animFrame: number,
  eyeY: number,
  palette: ColorPalette,
  seed: number,
  oy: number,
): void {
  // Cheeks when happy
  if (animation === "happy") {
    const cheekY = eyeY + 2;
    setPixel(frame, 10, cheekY + oy, "#FFAAAA");
    setPixel(frame, 22, cheekY + oy, "#FFAAAA");
  }

  // Ambient sparkles based on seed
  const sp1x = 5 + seedOffset(seed, 30, 2);
  const sp1y = 6 + seedOffset(seed, 31, 2);
  const sp2x = 26 + seedOffset(seed, 32, 2);
  const sp2y = 10 + seedOffset(seed, 33, 2);
  if (animFrame % 4 < 2) {
    setPixel(frame, sp1x, sp1y + oy, palette.accent);
    setPixel(frame, sp2x, sp2y + oy, palette.accent);
  } else {
    setPixel(frame, sp1x + 1, sp1y + 1 + oy, palette.accent);
    setPixel(frame, sp2x - 1, sp2y + 1 + oy, palette.accent);
  }
}
