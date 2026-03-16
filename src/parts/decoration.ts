import type { ColorPalette, DecorationType, SpiritFrame } from "../types.js";
import { setPixel } from "../frame.js";

const CX = 16;

export function drawDecoration(
  frame: SpiritFrame,
  type: DecorationType,
  bodyTop: number,
  palette: ColorPalette,
  oy: number,
): void {
  switch (type) {
    case "none":
      break;
    case "halo":
      drawHalo(frame, bodyTop, palette, oy);
      break;
    case "horns":
      drawHorns(frame, bodyTop, palette, oy);
      break;
    case "antennae":
      drawAntennae(frame, bodyTop, palette, oy);
      break;
    case "hat":
      drawHat(frame, bodyTop, palette, oy);
      break;
    case "leaf":
      drawLeaf(frame, bodyTop, palette, oy);
      break;
    case "crown":
      drawCrown(frame, bodyTop, palette, oy);
      break;
    case "book":
      drawBook(frame, bodyTop, palette, oy);
      break;
  }
}

function drawHalo(
  frame: SpiritFrame,
  bodyTop: number,
  palette: ColorPalette,
  oy: number,
): void {
  const y = bodyTop - 2;
  for (let dx = -2; dx <= 2; dx++) {
    setPixel(frame, CX + dx, y + oy, palette.accent);
  }
  setPixel(frame, CX - 3, y + 1 + oy, palette.accent);
  setPixel(frame, CX + 3, y + 1 + oy, palette.accent);
}

function drawHorns(
  frame: SpiritFrame,
  bodyTop: number,
  palette: ColorPalette,
  oy: number,
): void {
  const y = bodyTop - 1;
  // Left horn
  setPixel(frame, CX - 3, y + oy, palette.accent);
  setPixel(frame, CX - 4, y - 1 + oy, palette.accent);
  setPixel(frame, CX - 4, y - 2 + oy, palette.accent);
  // Right horn
  setPixel(frame, CX + 3, y + oy, palette.accent);
  setPixel(frame, CX + 4, y - 1 + oy, palette.accent);
  setPixel(frame, CX + 4, y - 2 + oy, palette.accent);
}

function drawAntennae(
  frame: SpiritFrame,
  bodyTop: number,
  palette: ColorPalette,
  oy: number,
): void {
  const y = bodyTop;
  // Left antenna
  setPixel(frame, CX - 2, y - 1 + oy, palette.bodyDark);
  setPixel(frame, CX - 3, y - 2 + oy, palette.bodyDark);
  setPixel(frame, CX - 3, y - 3 + oy, palette.accent);
  // Right antenna
  setPixel(frame, CX + 2, y - 1 + oy, palette.bodyDark);
  setPixel(frame, CX + 3, y - 2 + oy, palette.bodyDark);
  setPixel(frame, CX + 3, y - 3 + oy, palette.accent);
}

function drawHat(
  frame: SpiritFrame,
  bodyTop: number,
  palette: ColorPalette,
  oy: number,
): void {
  const y = bodyTop - 1;
  // Brim
  for (let dx = -4; dx <= 4; dx++) {
    setPixel(frame, CX + dx, y + oy, palette.accent);
  }
  // Top
  for (let dx = -2; dx <= 2; dx++) {
    setPixel(frame, CX + dx, y - 1 + oy, palette.accent);
    setPixel(frame, CX + dx, y - 2 + oy, palette.accent);
  }
}

function drawLeaf(
  frame: SpiritFrame,
  bodyTop: number,
  palette: ColorPalette,
  oy: number,
): void {
  const y = bodyTop - 1;
  // Stem
  setPixel(frame, CX, y + oy, palette.bodyDark);
  // Leaf
  setPixel(frame, CX - 1, y - 1 + oy, palette.accent);
  setPixel(frame, CX, y - 1 + oy, palette.accent);
  setPixel(frame, CX + 1, y - 1 + oy, palette.accent);
  setPixel(frame, CX, y - 2 + oy, palette.accent);
}

function drawCrown(
  frame: SpiritFrame,
  bodyTop: number,
  palette: ColorPalette,
  oy: number,
): void {
  const y = bodyTop - 1;
  // Base
  for (let dx = -3; dx <= 3; dx++) {
    setPixel(frame, CX + dx, y + oy, palette.accent);
  }
  // Points
  setPixel(frame, CX - 3, y - 1 + oy, palette.accent);
  setPixel(frame, CX, y - 1 + oy, palette.accent);
  setPixel(frame, CX + 3, y - 1 + oy, palette.accent);
  setPixel(frame, CX - 3, y - 2 + oy, palette.accent);
  setPixel(frame, CX, y - 2 + oy, palette.accent);
  setPixel(frame, CX + 3, y - 2 + oy, palette.accent);
}

function drawBook(
  frame: SpiritFrame,
  bodyTop: number,
  palette: ColorPalette,
  oy: number,
): void {
  const y = bodyTop - 1;
  for (let dx = -3; dx <= 3; dx++) {
    setPixel(frame, CX + dx, y + oy, palette.accent);
  }
  for (let dx = -2; dx <= 2; dx++) {
    setPixel(frame, CX + dx, y - 1 + oy, palette.accent);
  }
  // Spine
  setPixel(frame, CX, y + oy, palette.bodyDark);
  setPixel(frame, CX, y - 1 + oy, palette.bodyDark);
}
