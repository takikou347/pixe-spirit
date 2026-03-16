import type { SpiritFrame } from "../types.js";

const GRID_SIZE = 32;

/** Create an empty 32×32 frame. */
export function createFrame(): SpiritFrame {
  const pixels: (string | null)[][] = Array.from({ length: GRID_SIZE }, () =>
    Array.from<string | null>({ length: GRID_SIZE }).fill(null),
  );
  return { width: GRID_SIZE, height: GRID_SIZE, pixels };
}

/** Set a pixel color on a frame (bounds-checked). */
export function setPixel(frame: SpiritFrame, x: number, y: number, color: string): void {
  if (x >= 0 && x < frame.width && y >= 0 && y < frame.height) {
    frame.pixels[y][x] = color;
  }
}

/** Draw sparkle pixels that appear progressively with each frame. */
export function drawSparkles(
  frame: SpiritFrame,
  positions: [number, number][],
  animFrame: number,
  color: string,
): void {
  const visibleCount = Math.min(animFrame + 1, positions.length);
  for (let i = 0; i < visibleCount; i++) {
    const [sx, sy] = positions[i];
    setPixel(frame, sx, sy, color);
  }
}

/** Apply a white flash overlay (sets all non-null pixels to semi-transparent white marker). */
export function drawFlash(frame: SpiritFrame, animFrame: number): void {
  if (animFrame % 2 !== 0) return;
  for (let y = 0; y < frame.height; y++) {
    for (let x = 0; x < frame.width; x++) {
      if (frame.pixels[y][x] !== null) {
        frame.pixels[y][x] = "#FFFFFF";
      }
    }
  }
}
