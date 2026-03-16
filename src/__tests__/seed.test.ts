import { describe, expect, it } from "vitest";
import { seedOffset, seedVariation } from "../seed.js";

describe("seedVariation", () => {
  it("returns a value between 0 and 1", () => {
    for (let seed = 0; seed < 100; seed++) {
      for (let index = 0; index < 10; index++) {
        const v = seedVariation(seed, index);
        expect(v).toBeGreaterThanOrEqual(0);
        expect(v).toBeLessThan(1);
      }
    }
  });

  it("is deterministic — same input always gives same output", () => {
    expect(seedVariation(42, 0)).toBe(seedVariation(42, 0));
    expect(seedVariation(42, 1)).toBe(seedVariation(42, 1));
    expect(seedVariation(100, 5)).toBe(seedVariation(100, 5));
  });

  it("produces different values for different seeds", () => {
    expect(seedVariation(0, 0)).not.toBe(seedVariation(1, 0));
  });

  it("produces different values for different indices", () => {
    expect(seedVariation(42, 0)).not.toBe(seedVariation(42, 1));
  });
});

describe("seedOffset", () => {
  it("returns values within the specified range", () => {
    for (let seed = 0; seed < 100; seed++) {
      const offset = seedOffset(seed, 0, 2);
      expect(offset).toBeGreaterThanOrEqual(-2);
      expect(offset).toBeLessThanOrEqual(2);
    }
  });

  it("is deterministic", () => {
    expect(seedOffset(42, 0, 3)).toBe(seedOffset(42, 0, 3));
  });
});
