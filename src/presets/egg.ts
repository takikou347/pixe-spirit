import { createFrame, setPixel } from "../frame.js";
import { seedOffset } from "../seed.js";

import type { AnimationType, ColorPalette, SpiritFrame } from "../types.js";

const EGG_OUTLINE: [number, number][] = [
  [13, 8], [14, 8], [15, 8], [16, 8], [17, 8], [18, 8],
  [11, 9], [12, 9], [13, 9], [14, 9], [15, 9], [16, 9], [17, 9], [18, 9], [19, 9], [20, 9],
  [10, 10], [11, 10], [12, 10], [21, 10], [20, 10],
  [9, 11], [10, 11], [21, 11], [22, 11],
  [9, 12], [22, 12],
  [8, 13], [23, 13],
  [8, 14], [23, 14],
  [8, 15], [23, 15],
  [8, 16], [23, 16],
  [8, 17], [23, 17],
  [9, 18], [22, 18],
  [9, 19], [22, 19],
  [10, 20], [21, 20],
  [11, 21], [12, 21], [19, 21], [20, 21],
  [13, 22], [14, 22], [15, 22], [16, 22], [17, 22], [18, 22],
];

export function drawPresetEgg(
  frame: number,
  palette: ColorPalette,
  _animation: AnimationType,
  seed: number,
): SpiritFrame {
  const result = createFrame();
  const wobble = frame % 4 === 1 ? 1 : frame % 4 === 3 ? -1 : 0;
  const ox = wobble;

  for (let y = 8; y <= 22; y++) {
    const rowPixels = EGG_OUTLINE.filter(([, py]) => py === y).map(([px]) => px);
    if (rowPixels.length >= 2) {
      const minX = Math.min(...rowPixels);
      const maxX = Math.max(...rowPixels);
      for (let x = minX; x <= maxX; x++) {
        setPixel(result, x + ox, y, palette.body);
      }
    }
  }

  for (const [x, y] of EGG_OUTLINE) {
    setPixel(result, x + ox, y, palette.bodyDark);
  }

  setPixel(result, 12 + ox, 11, palette.bodyLight);
  setPixel(result, 12 + ox, 12, palette.bodyLight);
  setPixel(result, 11 + ox, 12, palette.bodyLight);
  setPixel(result, 11 + ox, 13, palette.bodyLight);

  const sp1x = 6 + seedOffset(seed, 0, 1);
  const sp1y = 6 + seedOffset(seed, 1, 1);
  const sp2x = 25 + seedOffset(seed, 2, 1);
  const sp2y = 10 + seedOffset(seed, 3, 1);
  if (frame % 4 < 2) {
    setPixel(result, sp1x + ox, sp1y, palette.accent);
    setPixel(result, sp2x + ox, sp2y, palette.accent);
  } else {
    setPixel(result, sp1x + 1 + ox, sp1y + 1, palette.accent);
    setPixel(result, sp2x - 1 + ox, sp2y + 1, palette.accent);
  }

  return result;
}
