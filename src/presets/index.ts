import type { AnimationType, ColorPalette, PresetId, PresetInfo, SpiritFrame } from "../types.js";
import { drawPresetBaby } from "./baby.js";
import { drawPresetChildBalanced } from "./child-balanced.js";
import { drawPresetChildDiary } from "./child-diary.js";
import { drawPresetEgg } from "./egg.js";

type PresetDrawFn = (
  frame: number,
  palette: ColorPalette,
  animation: AnimationType,
  seed: number,
) => SpiritFrame;

const PRESET_DRAWERS: Record<PresetId, PresetDrawFn> = {
  egg: drawPresetEgg,
  baby: drawPresetBaby,
  child_diary: drawPresetChildDiary,
  child_balanced: drawPresetChildBalanced,
};

const PRESET_INFO: PresetInfo[] = [
  { id: "egg", name: "Egg", description: "A wobbling egg with sparkles" },
  { id: "baby", name: "Baby", description: "A round spirit with expressive eyes" },
  { id: "child_diary", name: "Child Diary", description: "A knowledge spirit with a book motif" },
  {
    id: "child_balanced",
    name: "Child Balanced",
    description: "A harmony spirit with a halo accent",
  },
];

export function getPresetDrawer(presetId: PresetId): PresetDrawFn {
  return PRESET_DRAWERS[presetId];
}

/** Get metadata for all available presets. */
export function getPresets(): PresetInfo[] {
  return [...PRESET_INFO];
}
