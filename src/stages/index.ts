import type { AnimationType, ColorPalette, SpiritFrame, StageId, StageInfo } from "../types.js";
import { drawBaby } from "./baby.js";
import { drawChildBalanced } from "./child-balanced.js";
import { drawChildDiary } from "./child-diary.js";
import { drawEgg } from "./egg.js";

type StageDrawFn = (
  frame: number,
  palette: ColorPalette,
  animation: AnimationType,
  seed: number,
) => SpiritFrame;

const STAGE_DRAWERS: Record<StageId, StageDrawFn> = {
  egg: drawEgg,
  baby_01: drawBaby,
  child_diary_01: drawChildDiary,
  child_balanced_01: drawChildBalanced,
};

const STAGE_INFO: StageInfo[] = [
  { id: "egg", name: "Egg", tier: 0 },
  { id: "baby_01", name: "Baby", tier: 1 },
  { id: "child_diary_01", name: "Child Diary", tier: 2 },
  { id: "child_balanced_01", name: "Child Balanced", tier: 2 },
];

export function getStageDrawer(stageId: StageId): StageDrawFn {
  return STAGE_DRAWERS[stageId];
}

/** Get metadata for all available stages. */
export function getStages(): StageInfo[] {
  return [...STAGE_INFO];
}
