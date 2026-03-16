import { seedOffset } from "../seed.js";
import type { AnimationType, ColorPalette, SpiritFrame } from "../types.js";
import { createFrame, drawFlash, drawSparkles, setPixel } from "./utils.js";

export function drawChildBalanced(
  frame: number,
  palette: ColorPalette,
  animation: AnimationType,
  seed: number,
): SpiritFrame {
  const result = createFrame();
  const bounce = animation === "happy" ? (frame % 2 === 0 ? -1 : 0) : 0;
  const blink = animation === "idle" && frame === 3;
  const oy = bounce;

  // Body (balanced round shape)
  for (let y = 8; y <= 24; y++) {
    const dist = Math.abs(y - 16);
    const radius = dist <= 2 ? 8 : 8 - (dist - 2);
    const cx = 16;
    for (let x = cx - radius; x <= cx + radius; x++) {
      setPixel(result, x, y + oy, palette.body);
    }
  }

  // Halo accent (seed-based offset)
  const haloOx = seedOffset(seed, 0, 1);
  const haloPixels: [number, number][] = [
    [14 + haloOx, 6],
    [15 + haloOx, 5],
    [16 + haloOx, 5],
    [17 + haloOx, 5],
    [18 + haloOx, 6],
  ];
  for (const [x, y] of haloPixels) {
    setPixel(result, x, y + oy, palette.accent);
  }

  // Eyes
  if (blink) {
    setPixel(result, 12, 15 + oy, palette.eye);
    setPixel(result, 13, 15 + oy, palette.eye);
    setPixel(result, 19, 15 + oy, palette.eye);
    setPixel(result, 20, 15 + oy, palette.eye);
  } else {
    for (const ex of [12, 19]) {
      setPixel(result, ex, 14 + oy, palette.eye);
      setPixel(result, ex + 1, 14 + oy, palette.eye);
      setPixel(result, ex, 15 + oy, palette.eye);
      setPixel(result, ex + 1, 15 + oy, palette.eye);
      // Eye highlight
      setPixel(result, ex, 14 + oy, "#FFFFFF");
    }
  }

  // Mouth
  setPixel(result, 15, 18 + oy, palette.eye);
  setPixel(result, 16, 18 + oy, palette.eye);

  // Highlight
  setPixel(result, 10, 11 + oy, palette.bodyLight);
  setPixel(result, 10, 12 + oy, palette.bodyLight);
  setPixel(result, 11, 11 + oy, palette.bodyLight);

  // Calm light (seed-based, 4-phase animation)
  const lo = seedOffset(seed, 1, 1);
  const lightPositions: [number, number][][] = [
    [
      [6 + lo, 10],
      [26 - lo, 12],
    ],
    [
      [7 + lo, 9],
      [25 - lo, 13],
    ],
    [
      [6 + lo, 10],
      [26 - lo, 12],
    ],
    [
      [5 + lo, 11],
      [27 - lo, 11],
    ],
  ];
  const lightPhase = frame % 4;
  for (const [lx, ly] of lightPositions[lightPhase]) {
    setPixel(result, lx, ly + oy, palette.accent);
  }

  if (animation === "levelup") {
    drawSparkles(
      result,
      [
        [7, 5],
        [25, 5],
        [5, 12],
        [27, 12],
        [9, 3],
        [23, 3],
      ],
      frame,
      palette.accent,
    );
  }

  if (animation === "evolve") {
    drawFlash(result, frame);
  }

  return result;
}
