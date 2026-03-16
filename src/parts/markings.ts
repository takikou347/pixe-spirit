import { setPixel } from "../frame.js";
import { seedOffset } from "../seed.js";

import type { ColorPalette, SpiritFrame } from "../types.js";

const CX = 16;
const CY = 16;

/**
 * Draw body markings based on pattern type.
 */
export function drawMarkings(
  frame: SpiritFrame,
  pattern: number,
  palette: ColorPalette,
  seed: number,
  oy: number,
): void {
  const ox = seedOffset(seed, 10, 1);

  switch (pattern) {
    case 0:
      drawDots(frame, palette, ox, oy);
      break;
    case 1:
      drawStripe(frame, palette, ox, oy);
      break;
    case 2:
      drawPatch(frame, palette, ox, oy);
      break;
    case 3:
      drawSpeckles(frame, palette, seed, oy);
      break;
  }
}

function drawDots(
  frame: SpiritFrame,
  palette: ColorPalette,
  ox: number,
  oy: number,
): void {
  setPixel(frame, CX - 2 + ox, CY - 2 + oy, palette.bodyLight);
  setPixel(frame, CX + 2 + ox, CY + oy, palette.bodyLight);
  setPixel(frame, CX + ox, CY + 2 + oy, palette.bodyLight);
}

function drawStripe(
  frame: SpiritFrame,
  palette: ColorPalette,
  ox: number,
  oy: number,
): void {
  for (let dx = -2; dx <= 2; dx++) {
    setPixel(frame, CX + dx + ox, CY + 2 + oy, palette.bodyLight);
  }
}

function drawPatch(
  frame: SpiritFrame,
  palette: ColorPalette,
  ox: number,
  oy: number,
): void {
  setPixel(frame, CX + 1 + ox, CY + oy, palette.bodyLight);
  setPixel(frame, CX + 2 + ox, CY + oy, palette.bodyLight);
  setPixel(frame, CX + 1 + ox, CY + 1 + oy, palette.bodyLight);
  setPixel(frame, CX + 2 + ox, CY + 1 + oy, palette.bodyLight);
}

function drawSpeckles(
  frame: SpiritFrame,
  palette: ColorPalette,
  seed: number,
  oy: number,
): void {
  for (let i = 0; i < 4; i++) {
    const sx = CX + seedOffset(seed, 20 + i * 2, 3);
    const sy = CY + seedOffset(seed, 21 + i * 2, 3);
    setPixel(frame, sx, sy + oy, palette.bodyLight);
  }
}
