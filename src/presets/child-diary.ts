import { createFrame, setPixel } from "../frame.js";
import { seedOffset } from "../seed.js";

import type { AnimationType, ColorPalette, SpiritFrame } from "../types.js";

export function drawPresetChildDiary(
  frame: number,
  palette: ColorPalette,
  animation: AnimationType,
  seed: number,
): SpiritFrame {
  const result = createFrame();
  const bounce = animation === "happy" ? (frame % 2 === 0 ? -1 : 0) : 0;
  const blink = animation === "idle" && frame === 3;
  const oy = bounce;

  for (let y = 7; y <= 25; y++) {
    const radius = y <= 12 ? y - 6 : y <= 20 ? 8 : 25 - y;
    const cx = 16;
    for (let x = cx - radius; x <= cx + radius; x++) {
      setPixel(result, x, y + oy, palette.body);
    }
  }

  for (let x = 12; x <= 19; x++) setPixel(result, x, 5 + oy, palette.accent);
  for (let x = 13; x <= 18; x++) setPixel(result, x, 4 + oy, palette.accent);
  setPixel(result, 15, 5 + oy, palette.bodyDark);
  setPixel(result, 16, 5 + oy, palette.bodyDark);

  if (blink) {
    setPixel(result, 12, 14 + oy, palette.eye);
    setPixel(result, 13, 14 + oy, palette.eye);
    setPixel(result, 19, 14 + oy, palette.eye);
    setPixel(result, 20, 14 + oy, palette.eye);
  } else {
    for (const ex of [12, 19]) {
      setPixel(result, ex, 13 + oy, palette.eye);
      setPixel(result, ex + 1, 13 + oy, palette.eye);
      setPixel(result, ex, 14 + oy, palette.eye);
      setPixel(result, ex + 1, 14 + oy, palette.eye);
      setPixel(result, ex, 13 + oy, "#FFFFFF");
    }
  }

  if (animation === "happy") {
    setPixel(result, 14, 17 + oy, palette.eye);
    setPixel(result, 15, 18 + oy, palette.eye);
    setPixel(result, 16, 18 + oy, palette.eye);
    setPixel(result, 17, 17 + oy, palette.eye);
  } else {
    setPixel(result, 15, 17 + oy, palette.eye);
    setPixel(result, 16, 17 + oy, palette.eye);
  }

  setPixel(result, 10, 10 + oy, palette.bodyLight);
  setPixel(result, 10, 11 + oy, palette.bodyLight);
  setPixel(result, 11, 10 + oy, palette.bodyLight);

  const px1 = 5 + seedOffset(seed, 0, 1);
  const py1 = 10 + seedOffset(seed, 1, 1);
  const px2 = 27 + seedOffset(seed, 2, 1);
  const py2 = 8 + seedOffset(seed, 3, 1);
  if (frame % 4 < 2) {
    setPixel(result, px1, py1 + oy, palette.accent);
    setPixel(result, px2, py2 + oy, palette.accent);
  }

  return result;
}
