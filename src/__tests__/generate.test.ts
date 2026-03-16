import { describe, expect, it } from "vitest";
import {
  generateSpirit,
  getAnimationConfig,
  getPalettes,
  getStages,
} from "../index.js";
import type { PaletteId, StageId } from "../types.js";

describe("generateSpirit", () => {
  it("returns a 32x32 frame", () => {
    const frame = generateSpirit({ stage: "egg" });
    expect(frame.width).toBe(32);
    expect(frame.height).toBe(32);
    expect(frame.pixels).toHaveLength(32);
    expect(frame.pixels[0]).toHaveLength(32);
  });

  it("contains non-null pixels (not an empty frame)", () => {
    const stages: StageId[] = ["egg", "baby_01", "child_diary_01", "child_balanced_01"];
    for (const stage of stages) {
      const frame = generateSpirit({ stage });
      const hasPixels = frame.pixels.some((row) => row.some((p) => p !== null));
      expect(hasPixels).toBe(true);
    }
  });

  it("is deterministic — same options produce identical output", () => {
    const opts = { stage: "baby_01" as StageId, seed: 42, palette: "red_light" as PaletteId };
    const frame1 = generateSpirit(opts);
    const frame2 = generateSpirit(opts);
    expect(frame1.pixels).toEqual(frame2.pixels);
  });

  it("different seeds produce different output", () => {
    const frame1 = generateSpirit({ stage: "baby_01", seed: 0 });
    const frame2 = generateSpirit({ stage: "baby_01", seed: 99 });
    expect(frame1.pixels).not.toEqual(frame2.pixels);
  });

  it("different palettes produce different output", () => {
    const frame1 = generateSpirit({ stage: "egg", palette: "red_light" });
    const frame2 = generateSpirit({ stage: "egg", palette: "blue_light" });
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
    const frame = generateSpirit({ stage: "egg", customPalette });
    const allColors = frame.pixels.flat().filter((p) => p !== null);
    expect(allColors).toContain("#FF0000");
  });

  it("animation frames produce different output", () => {
    const frame0 = generateSpirit({ stage: "egg", frame: 0 });
    const frame1 = generateSpirit({ stage: "egg", frame: 1 });
    expect(frame0.pixels).not.toEqual(frame1.pixels);
  });

  it("all animation types work without error", () => {
    const animations = ["idle", "happy", "sad", "sleep", "evolve", "levelup"] as const;
    for (const animation of animations) {
      expect(() => generateSpirit({ stage: "baby_01", animation })).not.toThrow();
    }
  });
});

describe("getStages", () => {
  it("returns all 4 stages", () => {
    const stages = getStages();
    expect(stages).toHaveLength(4);
    expect(stages.map((s) => s.id)).toEqual(["egg", "baby_01", "child_diary_01", "child_balanced_01"]);
  });

  it("includes tier information", () => {
    const stages = getStages();
    expect(stages[0].tier).toBe(0);
    expect(stages[1].tier).toBe(1);
    expect(stages[2].tier).toBe(2);
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
    const animations = ["idle", "happy", "sad", "sleep", "evolve", "levelup"] as const;
    for (const anim of animations) {
      const config = getAnimationConfig(anim);
      expect(config.frames).toBeGreaterThan(0);
      expect(config.fps).toBeGreaterThan(0);
      expect(typeof config.loop).toBe("boolean");
    }
  });
});
