import type { SpiritFrame } from "./types.js";

const GRID_SIZE = 32;

/** Create an empty 32x32 frame. */
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
