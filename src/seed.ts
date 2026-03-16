/**
 * Generate a deterministic variation value (0–1) from a seed and index.
 * Same seed + index always produces the same result.
 */
export function seedVariation(seed: number, index: number): number {
  const h = ((seed * 2654435761 + index * 340573321) >>> 0) % 1000;
  return h / 1000;
}

/**
 * Generate a deterministic integer offset in the range [-range, +range] from a seed and index.
 */
export function seedOffset(seed: number, index: number, range: number): number {
  return Math.floor(seedVariation(seed, index) * (range * 2 + 1)) - range;
}
