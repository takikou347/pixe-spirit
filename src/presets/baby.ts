import { createFrame, setPixel } from "../frame.js";
import { seedOffset, seedVariation } from "../seed.js";

import type { AnimationType, ColorPalette, SpiritFrame } from "../types.js";

export function drawPresetBaby(
  frame: number,
  palette: ColorPalette,
  animation: AnimationType,
  seed: number,
): SpiritFrame {
  const result = createFrame();
  const bounce = animation === "happy" ? (frame % 2 === 0 ? -2 : 0) : 0;
  const blink = animation === "idle" && frame === 3;
  const sleeping = animation === "sleep";
  const oy = bounce;

  const eyeSpread = seedOffset(seed, 0, 1);
  const markingY = 12 + seedOffset(seed, 1, 2);
  const markingX = 15 + seedOffset(seed, 2, 1);
  const hasMarking = seedVariation(seed, 3) > 0.4;

  for (let y = 10; y <= 24; y++) {
    const radius = y <= 14 ? y - 9 : y <= 20 ? 7 : 24 - y;
    const cx = 16;
    for (let x = cx - radius; x <= cx + radius; x++) {
      setPixel(result, x, y + oy, palette.body);
    }
  }

  if (hasMarking) {
    setPixel(result, markingX, markingY + oy, palette.bodyLight);
    setPixel(result, markingX + 1, markingY + oy, palette.bodyLight);
  }

  for (let x = 12; x <= 20; x++) setPixel(result, x, 9 + oy, palette.bodyDark);
  setPixel(result, 11, 10 + oy, palette.bodyDark);
  setPixel(result, 21, 10 + oy, palette.bodyDark);
  setPixel(result, 10, 11 + oy, palette.bodyDark);
  setPixel(result, 22, 11 + oy, palette.bodyDark);
  setPixel(result, 9, 13 + oy, palette.bodyDark);
  setPixel(result, 23, 13 + oy, palette.bodyDark);

  const leftEyeX = 13 + eyeSpread;
  const rightEyeX = 19 - eyeSpread;
  if (sleeping) {
    setPixel(result, leftEyeX, 16 + oy, palette.eye);
    setPixel(result, leftEyeX + 1, 15 + oy, palette.eye);
    setPixel(result, rightEyeX - 1, 16 + oy, palette.eye);
    setPixel(result, rightEyeX, 15 + oy, palette.eye);
    if (frame === 0) {
      setPixel(result, 24, 8, palette.accent);
      setPixel(result, 25, 7, palette.accent);
      setPixel(result, 26, 8, palette.accent);
    }
  } else if (blink) {
    setPixel(result, leftEyeX, 16 + oy, palette.eye);
    setPixel(result, rightEyeX, 16 + oy, palette.eye);
  } else {
    setPixel(result, leftEyeX, 15 + oy, palette.eye);
    setPixel(result, leftEyeX, 16 + oy, palette.eye);
    setPixel(result, rightEyeX, 15 + oy, palette.eye);
    setPixel(result, rightEyeX, 16 + oy, palette.eye);
  }

  if (animation === "happy") {
    setPixel(result, 15, 19 + oy, palette.eye);
    setPixel(result, 16, 20 + oy, palette.eye);
    setPixel(result, 17, 19 + oy, palette.eye);
  } else if (animation === "sad") {
    setPixel(result, 15, 20 + oy, palette.eye);
    setPixel(result, 16, 19 + oy, palette.eye);
    setPixel(result, 17, 20 + oy, palette.eye);
  } else if (!sleeping) {
    setPixel(result, 15, 19 + oy, palette.eye);
    setPixel(result, 16, 19 + oy, palette.eye);
    setPixel(result, 17, 19 + oy, palette.eye);
  }

  setPixel(result, 12, 12 + oy, palette.bodyLight);
  setPixel(result, 12, 13 + oy, palette.bodyLight);
  setPixel(result, 13, 12 + oy, palette.bodyLight);

  if (animation === "happy") {
    setPixel(result, 11, 17 + oy, "#FFAAAA");
    setPixel(result, 21, 17 + oy, "#FFAAAA");
  }

  return result;
}
