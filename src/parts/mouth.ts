import { setPixel } from "../frame.js";

import type { AnimationType, ColorPalette, MouthStyle, SpiritFrame } from "../types.js";

const CX = 16;

export function drawMouth(
  frame: SpiritFrame,
  style: MouthStyle,
  mouthY: number,
  palette: ColorPalette,
  animation: AnimationType,
  oy: number,
): void {
  if (animation === "sleep") return;

  if (animation === "happy") {
    drawSmileMouth(frame, mouthY, palette, oy);
    return;
  }

  if (animation === "sad") {
    drawSadMouth(frame, mouthY, palette, oy);
    return;
  }

  switch (style) {
    case "line":
      drawLineMouth(frame, mouthY, palette, oy);
      break;
    case "smile":
      drawSmileMouth(frame, mouthY, palette, oy);
      break;
    case "open":
      drawOpenMouth(frame, mouthY, palette, oy);
      break;
    case "none":
      break;
  }
}

function drawLineMouth(
  frame: SpiritFrame,
  mouthY: number,
  palette: ColorPalette,
  oy: number,
): void {
  setPixel(frame, CX - 1, mouthY + oy, palette.eye);
  setPixel(frame, CX, mouthY + oy, palette.eye);
  setPixel(frame, CX + 1, mouthY + oy, palette.eye);
}

function drawSmileMouth(
  frame: SpiritFrame,
  mouthY: number,
  palette: ColorPalette,
  oy: number,
): void {
  setPixel(frame, CX - 1, mouthY + oy, palette.eye);
  setPixel(frame, CX, mouthY + 1 + oy, palette.eye);
  setPixel(frame, CX + 1, mouthY + oy, palette.eye);
}

function drawSadMouth(
  frame: SpiritFrame,
  mouthY: number,
  palette: ColorPalette,
  oy: number,
): void {
  setPixel(frame, CX - 1, mouthY + 1 + oy, palette.eye);
  setPixel(frame, CX, mouthY + oy, palette.eye);
  setPixel(frame, CX + 1, mouthY + 1 + oy, palette.eye);
}

function drawOpenMouth(
  frame: SpiritFrame,
  mouthY: number,
  palette: ColorPalette,
  oy: number,
): void {
  setPixel(frame, CX - 1, mouthY + oy, palette.eye);
  setPixel(frame, CX, mouthY + oy, palette.eye);
  setPixel(frame, CX + 1, mouthY + oy, palette.eye);
  setPixel(frame, CX, mouthY + 1 + oy, palette.eye);
}
