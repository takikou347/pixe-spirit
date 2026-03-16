import type { ColorPalette, EarType, SpiritFrame } from "../types.js";
import { setPixel } from "../frame.js";

const CX = 16;

export function drawEars(
  frame: SpiritFrame,
  type: EarType,
  bodyTop: number,
  bodySize: number,
  palette: ColorPalette,
  oy: number,
): void {
  switch (type) {
    case "none":
      break;
    case "pointed":
      drawPointedEars(frame, bodyTop, bodySize, palette, oy);
      break;
    case "round":
      drawRoundEars(frame, bodyTop, bodySize, palette, oy);
      break;
    case "long":
      drawLongEars(frame, bodyTop, bodySize, palette, oy);
      break;
    case "cat":
      drawCatEars(frame, bodyTop, bodySize, palette, oy);
      break;
  }
}

function drawPointedEars(
  frame: SpiritFrame,
  bodyTop: number,
  bodySize: number,
  palette: ColorPalette,
  oy: number,
): void {
  const earSpread = Math.floor(bodySize * 0.6);
  const y = bodyTop;

  // Left ear (triangle pointing up-left)
  setPixel(frame, CX - earSpread, y + oy, palette.body);
  setPixel(frame, CX - earSpread - 1, y - 1 + oy, palette.body);
  setPixel(frame, CX - earSpread - 2, y - 2 + oy, palette.bodyDark);
  setPixel(frame, CX - earSpread - 1, y - 2 + oy, palette.bodyDark);
  setPixel(frame, CX - earSpread, y - 1 + oy, palette.bodyDark);

  // Right ear
  setPixel(frame, CX + earSpread, y + oy, palette.body);
  setPixel(frame, CX + earSpread + 1, y - 1 + oy, palette.body);
  setPixel(frame, CX + earSpread + 2, y - 2 + oy, palette.bodyDark);
  setPixel(frame, CX + earSpread + 1, y - 2 + oy, palette.bodyDark);
  setPixel(frame, CX + earSpread, y - 1 + oy, palette.bodyDark);
}

function drawRoundEars(
  frame: SpiritFrame,
  bodyTop: number,
  bodySize: number,
  palette: ColorPalette,
  oy: number,
): void {
  const earSpread = Math.floor(bodySize * 0.7);
  const y = bodyTop;

  for (const side of [-1, 1]) {
    const ex = CX + side * earSpread;
    // Round ear (small circle)
    setPixel(frame, ex, y - 2 + oy, palette.bodyDark);
    setPixel(frame, ex - 1, y - 1 + oy, palette.bodyDark);
    setPixel(frame, ex, y - 1 + oy, palette.body);
    setPixel(frame, ex + 1, y - 1 + oy, palette.bodyDark);
    setPixel(frame, ex, y + oy, palette.body);
    // Inner ear color
    setPixel(frame, ex, y - 1 + oy, palette.accent);
  }
}

function drawLongEars(
  frame: SpiritFrame,
  bodyTop: number,
  bodySize: number,
  palette: ColorPalette,
  oy: number,
): void {
  const earSpread = Math.floor(bodySize * 0.5);
  const y = bodyTop;

  for (const side of [-1, 1]) {
    const ex = CX + side * earSpread;
    // Long vertical ear
    for (let dy = -5; dy <= -1; dy++) {
      setPixel(frame, ex, y + dy + oy, palette.body);
      setPixel(frame, ex + side, y + dy + oy, palette.bodyDark);
    }
    setPixel(frame, ex, y - 6 + oy, palette.bodyDark);
    // Inner ear
    setPixel(frame, ex, y - 3 + oy, palette.accent);
    setPixel(frame, ex, y - 4 + oy, palette.accent);
  }
}

function drawCatEars(
  frame: SpiritFrame,
  bodyTop: number,
  bodySize: number,
  palette: ColorPalette,
  oy: number,
): void {
  const earSpread = Math.floor(bodySize * 0.6);
  const y = bodyTop;

  for (const side of [-1, 1]) {
    const ex = CX + side * earSpread;
    // Cat ear (wider triangle)
    setPixel(frame, ex, y + oy, palette.body);
    setPixel(frame, ex + side, y + oy, palette.body);
    setPixel(frame, ex, y - 1 + oy, palette.body);
    setPixel(frame, ex + side, y - 1 + oy, palette.bodyDark);
    setPixel(frame, ex + side * 2, y - 1 + oy, palette.bodyDark);
    setPixel(frame, ex + side, y - 2 + oy, palette.bodyDark);
    setPixel(frame, ex + side * 2, y - 2 + oy, palette.bodyDark);
    setPixel(frame, ex + side * 2, y - 3 + oy, palette.bodyDark);
    // Inner ear
    setPixel(frame, ex + side, y - 1 + oy, palette.accent);
  }
}
