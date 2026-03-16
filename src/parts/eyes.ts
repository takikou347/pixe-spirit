import { setPixel } from "../frame.js";

import type { AnimationType, ColorPalette, EyeStyle, SpiritFrame } from "../types.js";

const CX = 16;

export function drawEyes(
  frame: SpiritFrame,
  style: EyeStyle,
  spread: number,
  eyeY: number,
  palette: ColorPalette,
  animation: AnimationType,
  animFrame: number,
  oy: number,
): void {
  const blink = animation === "idle" && animFrame === 3;
  const sleeping = animation === "sleep";

  if (sleeping) {
    drawSleepingEyes(frame, spread, eyeY, palette, animFrame, oy);
    return;
  }

  if (blink) {
    drawBlinkEyes(frame, style, spread, eyeY, palette, oy);
    return;
  }

  switch (style) {
    case "dot":
      drawDotEyes(frame, spread, eyeY, palette, oy);
      break;
    case "small":
      drawSmallEyes(frame, spread, eyeY, palette, oy);
      break;
    case "medium":
      drawMediumEyes(frame, spread, eyeY, palette, oy);
      break;
    case "large":
      drawLargeEyes(frame, spread, eyeY, palette, oy);
      break;
    case "cyclops":
      drawCyclopsEye(frame, eyeY, palette, oy);
      break;
  }
}

function drawSleepingEyes(
  frame: SpiritFrame,
  spread: number,
  eyeY: number,
  palette: ColorPalette,
  animFrame: number,
  oy: number,
): void {
  const lx = CX - spread;
  const rx = CX + spread;
  // Closed eyes (horizontal lines)
  setPixel(frame, lx - 1, eyeY + oy, palette.eye);
  setPixel(frame, lx, eyeY + oy, palette.eye);
  setPixel(frame, rx, eyeY + oy, palette.eye);
  setPixel(frame, rx + 1, eyeY + oy, palette.eye);
  // Z's
  if (animFrame === 0) {
    setPixel(frame, CX + spread + 3, eyeY - 4 + oy, palette.accent);
    setPixel(frame, CX + spread + 4, eyeY - 5 + oy, palette.accent);
    setPixel(frame, CX + spread + 5, eyeY - 4 + oy, palette.accent);
  }
}

function drawBlinkEyes(
  frame: SpiritFrame,
  style: EyeStyle,
  spread: number,
  eyeY: number,
  palette: ColorPalette,
  oy: number,
): void {
  if (style === "cyclops") {
    setPixel(frame, CX, eyeY + oy, palette.eye);
    setPixel(frame, CX + 1, eyeY + oy, palette.eye);
  } else {
    setPixel(frame, CX - spread, eyeY + oy, palette.eye);
    setPixel(frame, CX + spread, eyeY + oy, palette.eye);
  }
}

function drawDotEyes(
  frame: SpiritFrame,
  spread: number,
  eyeY: number,
  palette: ColorPalette,
  oy: number,
): void {
  setPixel(frame, CX - spread, eyeY + oy, palette.eye);
  setPixel(frame, CX + spread, eyeY + oy, palette.eye);
}

function drawSmallEyes(
  frame: SpiritFrame,
  spread: number,
  eyeY: number,
  palette: ColorPalette,
  oy: number,
): void {
  setPixel(frame, CX - spread, eyeY + oy, palette.eye);
  setPixel(frame, CX - spread, eyeY + 1 + oy, palette.eye);
  setPixel(frame, CX + spread, eyeY + oy, palette.eye);
  setPixel(frame, CX + spread, eyeY + 1 + oy, palette.eye);
}

function drawMediumEyes(
  frame: SpiritFrame,
  spread: number,
  eyeY: number,
  palette: ColorPalette,
  oy: number,
): void {
  for (const ex of [CX - spread, CX + spread]) {
    setPixel(frame, ex, eyeY + oy, palette.eye);
    setPixel(frame, ex + 1, eyeY + oy, palette.eye);
    setPixel(frame, ex, eyeY + 1 + oy, palette.eye);
    setPixel(frame, ex + 1, eyeY + 1 + oy, palette.eye);
    // Highlight
    setPixel(frame, ex, eyeY + oy, "#FFFFFF");
  }
}

function drawLargeEyes(
  frame: SpiritFrame,
  spread: number,
  eyeY: number,
  palette: ColorPalette,
  oy: number,
): void {
  for (const ex of [CX - spread - 1, CX + spread - 1]) {
    for (let dy = 0; dy < 3; dy++) {
      for (let dx = 0; dx < 2; dx++) {
        setPixel(frame, ex + dx, eyeY + dy + oy, palette.eye);
      }
    }
    // Highlight
    setPixel(frame, ex, eyeY + oy, "#FFFFFF");
    setPixel(frame, ex + 1, eyeY + oy, "#FFFFFF");
  }
}

function drawCyclopsEye(
  frame: SpiritFrame,
  eyeY: number,
  palette: ColorPalette,
  oy: number,
): void {
  for (let dy = 0; dy < 3; dy++) {
    for (let dx = 0; dx < 3; dx++) {
      setPixel(frame, CX - 1 + dx, eyeY + dy + oy, palette.eye);
    }
  }
  setPixel(frame, CX - 1, eyeY + oy, "#FFFFFF");
  setPixel(frame, CX, eyeY + oy, "#FFFFFF");
}
