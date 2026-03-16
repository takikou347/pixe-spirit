import type { ColorPalette, PaletteId } from "./types.js";

const PALETTES: Record<PaletteId, ColorPalette> = {
  red_light: {
    body: "#FF6B6B",
    bodyLight: "#FF9999",
    bodyDark: "#CC4444",
    eye: "#333333",
    accent: "#FFD93D",
  },
  blue_light: {
    body: "#6BB5FF",
    bodyLight: "#99CCFF",
    bodyDark: "#4488CC",
    eye: "#333333",
    accent: "#FFD93D",
  },
  green_light: {
    body: "#6BCB77",
    bodyLight: "#99DD99",
    bodyDark: "#44AA55",
    eye: "#333333",
    accent: "#FFD93D",
  },
  yellow_light: {
    body: "#FFD93D",
    bodyLight: "#FFE680",
    bodyDark: "#CCAA22",
    eye: "#333333",
    accent: "#FF6B6B",
  },
  red_dark: {
    body: "#CC3333",
    bodyLight: "#DD5555",
    bodyDark: "#991111",
    eye: "#FFEEEE",
    accent: "#FFD93D",
  },
  blue_dark: {
    body: "#3366AA",
    bodyLight: "#5588CC",
    bodyDark: "#224488",
    eye: "#EEEEFF",
    accent: "#FFD93D",
  },
  green_dark: {
    body: "#338844",
    bodyLight: "#55AA66",
    bodyDark: "#226633",
    eye: "#EEFFEE",
    accent: "#FFD93D",
  },
  yellow_dark: {
    body: "#AA8800",
    bodyLight: "#CCAA33",
    bodyDark: "#886600",
    eye: "#FFFFEE",
    accent: "#FF6B6B",
  },
};

export const DEFAULT_PALETTE: ColorPalette = PALETTES.blue_light;

/** Get all available palettes. */
export function getPalettes(): Record<PaletteId, ColorPalette> {
  return { ...PALETTES };
}

/** Resolve a palette by ID. */
export function resolvePalette(id: PaletteId): ColorPalette {
  return PALETTES[id];
}
