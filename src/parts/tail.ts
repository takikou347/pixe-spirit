import type { ColorPalette, SpiritFrame, TailType } from "../types.js";
import { setPixel } from "../frame.js";

const CX = 16;

export function drawTail(
  frame: SpiritFrame,
  type: TailType,
  bodyBottom: number,
  bodySize: number,
  palette: ColorPalette,
  oy: number,
): void {
  switch (type) {
    case "none":
      break;
    case "bushy":
      drawBushyTail(frame, bodyBottom, bodySize, palette, oy);
      break;
    case "thin":
      drawThinTail(frame, bodyBottom, bodySize, palette, oy);
      break;
    case "curled":
      drawCurledTail(frame, bodyBottom, bodySize, palette, oy);
      break;
  }
}

function drawBushyTail(
  frame: SpiritFrame,
  bodyBottom: number,
  bodySize: number,
  palette: ColorPalette,
  oy: number,
): void {
  const tx = CX + bodySize;
  const ty = bodyBottom - 2;

  // Bushy tail curves upward to the right
  setPixel(frame, tx, ty + oy, palette.body);
  setPixel(frame, tx + 1, ty + oy, palette.body);
  setPixel(frame, tx + 1, ty - 1 + oy, palette.body);
  setPixel(frame, tx + 2, ty - 1 + oy, palette.body);
  setPixel(frame, tx + 2, ty - 2 + oy, palette.body);
  setPixel(frame, tx + 3, ty - 2 + oy, palette.body);
  setPixel(frame, tx + 3, ty - 3 + oy, palette.bodyLight);
  setPixel(frame, tx + 2, ty - 3 + oy, palette.bodyLight);
  // Outline
  setPixel(frame, tx + 4, ty - 3 + oy, palette.bodyDark);
  setPixel(frame, tx + 4, ty - 2 + oy, palette.bodyDark);
  setPixel(frame, tx + 3, ty - 1 + oy, palette.bodyDark);
  setPixel(frame, tx + 2, ty + oy, palette.bodyDark);
}

function drawThinTail(
  frame: SpiritFrame,
  bodyBottom: number,
  bodySize: number,
  palette: ColorPalette,
  oy: number,
): void {
  const tx = CX + bodySize;
  const ty = bodyBottom - 1;

  // Thin tail curves right
  setPixel(frame, tx, ty + oy, palette.body);
  setPixel(frame, tx + 1, ty - 1 + oy, palette.body);
  setPixel(frame, tx + 2, ty - 2 + oy, palette.body);
  setPixel(frame, tx + 3, ty - 2 + oy, palette.bodyDark);
  setPixel(frame, tx + 3, ty - 3 + oy, palette.accent);
}

function drawCurledTail(
  frame: SpiritFrame,
  bodyBottom: number,
  bodySize: number,
  palette: ColorPalette,
  oy: number,
): void {
  const tx = CX + bodySize;
  const ty = bodyBottom - 2;

  // Curled tail (spiral to the right)
  setPixel(frame, tx, ty + oy, palette.body);
  setPixel(frame, tx + 1, ty + oy, palette.body);
  setPixel(frame, tx + 2, ty - 1 + oy, palette.body);
  setPixel(frame, tx + 2, ty - 2 + oy, palette.body);
  setPixel(frame, tx + 1, ty - 2 + oy, palette.body);
  setPixel(frame, tx + 1, ty - 3 + oy, palette.bodyDark);
  // Curl tip
  setPixel(frame, tx + 2, ty - 3 + oy, palette.accent);
}
