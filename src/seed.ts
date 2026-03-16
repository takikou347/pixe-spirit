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

/**
 * Pick an item from an array deterministically based on seed and index.
 */
export function seedPick<T>(seed: number, index: number, items: readonly T[]): T {
  const i = Math.floor(seedVariation(seed, index) * items.length);
  return items[i];
}

/**
 * Generate a deterministic integer in the range [min, max] (inclusive).
 */
export function seedRange(seed: number, index: number, min: number, max: number): number {
  return min + Math.floor(seedVariation(seed, index) * (max - min + 1));
}

/**
 * Generate a deterministic boolean with a given probability (0–1).
 */
export function seedBool(seed: number, index: number, probability: number = 0.5): boolean {
  return seedVariation(seed, index) < probability;
}
