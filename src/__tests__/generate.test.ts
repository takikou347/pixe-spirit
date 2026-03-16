import { describe, expect, it } from "vitest";
import {
  deriveTraits,
  generateSpirit,
  getAnimationConfig,
  getPalettes,
  getPresets,
} from "../index.js";
import type { PresetId } from "../types.js";

describe("generateSpirit (procedural)", () => {
  it("returns a 32x32 frame", () => {
    const frame = generateSpirit({ seed: 0 });
    expect(frame.width).toBe(32);
    expect(frame.height).toBe(32);
    expect(frame.pixels).toHaveLength(32);
    expect(frame.pixels[0]).toHaveLength(32);
  });

  it("contains non-null pixels", () => {
    const frame = generateSpirit({ seed: 42 });
    const hasPixels = frame.pixels.some((row) => row.some((p) => p !== null));
    expect(hasPixels).toBe(true);
  });

  it("is deterministic — same seed produces identical output", () => {
    const frame1 = generateSpirit({ seed: 42 });
    const frame2 = generateSpirit({ seed: 42 });
    expect(frame1.pixels).toEqual(frame2.pixels);
  });

  it("different seeds produce different characters", () => {
    const frame1 = generateSpirit({ seed: 0 });
    const frame2 = generateSpirit({ seed: 99 });
    expect(frame1.pixels).not.toEqual(frame2.pixels);
  });

  it("different palettes produce different output", () => {
    const frame1 = generateSpirit({ seed: 42, palette: "red_light" });
    const frame2 = generateSpirit({ seed: 42, palette: "blue_light" });
    expect(frame1.pixels).not.toEqual(frame2.pixels);
  });

  it("supports custom palettes", () => {
    const customPalette = {
      body: "#FF0000",
      bodyLight: "#FF8888",
      bodyDark: "#880000",
      eye: "#000000",
      accent: "#00FF00",
    };
    const frame = generateSpirit({ seed: 42, customPalette });
    const allColors = frame.pixels.flat().filter((p) => p !== null);
    expect(allColors).toContain("#FF0000");
  });

  it("animation frames produce different output", () => {
    // Frames 0 and 2 differ because sparkle positions alternate on even/odd pairs
    const frame0 = generateSpirit({ seed: 42, frame: 0 });
    const frame2 = generateSpirit({ seed: 42, frame: 2 });
    expect(frame0.pixels).not.toEqual(frame2.pixels);
  });

  it("all animation types work without error", () => {
    const animations = ["idle", "happy", "sad", "sleep"] as const;
    for (const animation of animations) {
      expect(() => generateSpirit({ seed: 42, animation })).not.toThrow();
    }
  });

  it("generates diverse characters across seed range", () => {
    const uniqueOutputs = new Set<string>();
    for (let seed = 0; seed < 50; seed++) {
      const frame = generateSpirit({ seed });
      uniqueOutputs.add(JSON.stringify(frame.pixels));
    }
    // At least 10 distinct characters out of 50 seeds
    expect(uniqueOutputs.size).toBeGreaterThanOrEqual(10);
  });
});

describe("generateSpirit (preset)", () => {
  const presets: PresetId[] = ["egg", "baby", "child_diary", "child_balanced"];

  it("all presets produce non-empty frames", () => {
    for (const preset of presets) {
      const frame = generateSpirit({ seed: 0, preset });
      const hasPixels = frame.pixels.some((row) => row.some((p) => p !== null));
      expect(hasPixels).toBe(true);
    }
  });

  it("presets are deterministic", () => {
    for (const preset of presets) {
      const frame1 = generateSpirit({ seed: 42, preset });
      const frame2 = generateSpirit({ seed: 42, preset });
      expect(frame1.pixels).toEqual(frame2.pixels);
    }
  });

  it("presets differ from procedural output", () => {
    const procedural = generateSpirit({ seed: 42 });
    const preset = generateSpirit({ seed: 42, preset: "baby" });
    expect(procedural.pixels).not.toEqual(preset.pixels);
  });
});

describe("deriveTraits", () => {
  it("returns valid traits", () => {
    const traits = deriveTraits(42);
    expect(traits.bodyShape).toBeDefined();
    expect(traits.eyeStyle).toBeDefined();
    expect(traits.mouthStyle).toBeDefined();
    expect(traits.decoration).toBeDefined();
    expect(traits.bodySize).toBeGreaterThanOrEqual(6);
    expect(traits.bodySize).toBeLessThanOrEqual(8);
  });

  it("is deterministic", () => {
    expect(deriveTraits(42)).toEqual(deriveTraits(42));
  });

  it("different seeds produce different traits", () => {
    const traits1 = deriveTraits(0);
    const traits2 = deriveTraits(999);
    // At least one trait should differ
    const same =
      traits1.bodyShape === traits2.bodyShape &&
      traits1.eyeStyle === traits2.eyeStyle &&
      traits1.mouthStyle === traits2.mouthStyle &&
      traits1.decoration === traits2.decoration;
    expect(same).toBe(false);
  });
});

describe("getPresets", () => {
  it("returns all 4 presets", () => {
    const presets = getPresets();
    expect(presets).toHaveLength(4);
    expect(presets.map((p) => p.id)).toEqual(["egg", "baby", "child_diary", "child_balanced"]);
  });
});

describe("getPalettes", () => {
  it("returns 8 palettes", () => {
    const palettes = getPalettes();
    expect(Object.keys(palettes)).toHaveLength(8);
  });

  it("each palette has required color fields", () => {
    const palettes = getPalettes();
    for (const palette of Object.values(palettes)) {
      expect(palette).toHaveProperty("body");
      expect(palette).toHaveProperty("bodyLight");
      expect(palette).toHaveProperty("bodyDark");
      expect(palette).toHaveProperty("eye");
      expect(palette).toHaveProperty("accent");
    }
  });
});

describe("getAnimationConfig", () => {
  it("returns config for all animation types", () => {
    const animations = ["idle", "happy", "sad", "sleep"] as const;
    for (const anim of animations) {
      const config = getAnimationConfig(anim);
      expect(config.frames).toBeGreaterThan(0);
      expect(config.fps).toBeGreaterThan(0);
      expect(typeof config.loop).toBe("boolean");
    }
  });
});
