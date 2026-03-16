# pixe-spirit

Seed-deterministic pixel spirit generator. Outputs pure pixel data — rendering is up to you.

## Features

- **Procedural generation**: Different seeds produce different characters — body shape, eyes, mouth, decorations all vary
- **Deterministic**: Same seed always produces the same character
- **Framework-agnostic**: Outputs raw pixel data (2D color array), not Canvas/SVG/DOM
- **8 color palettes**: 4 colors x light/dark themes, plus custom palette support
- **Presets**: 4 pre-designed characters (Egg, Baby, Child Diary, Child Balanced)
- **Animations**: idle, happy, sad, sleep frame data

## Install

```bash
npm install pixe-spirit
```

## Quick Start

```typescript
import { generateSpirit } from "pixe-spirit";

// Just pass a seed — get a unique character
const frame = generateSpirit({ seed: 42 });

// frame.pixels[y][x] is a hex color string or null (transparent)
// frame.width === 32, frame.height === 32
```

Different seeds produce different characters:

```typescript
const char1 = generateSpirit({ seed: 0 });   // might be: round body, dot eyes, halo
const char2 = generateSpirit({ seed: 100 }); // might be: tall body, large eyes, horns
const char3 = generateSpirit({ seed: 999 }); // might be: wide body, cyclops, crown
```

## Procedural Traits

Each seed deterministically generates these traits:

| Trait | Variants |
|-------|----------|
| **Body shape** | circle, oval (tall), oval (wide), rounded square, teardrop |
| **Eye style** | dot, small, medium, large, cyclops |
| **Mouth style** | line, smile, open, none |
| **Decoration** | none, halo, horns, antennae, hat, leaf, crown, book |
| **Markings** | dots, stripe, patch, speckles (or none) |

You can inspect what traits a seed will produce:

```typescript
import { deriveTraits } from "pixe-spirit";

const traits = deriveTraits(42);
// { bodyShape: "circle", eyeStyle: "medium", mouthStyle: "smile", decoration: "halo", ... }
```

## Render to Canvas (example)

```typescript
import { generateSpirit } from "pixe-spirit";

function renderToCanvas(canvas: HTMLCanvasElement, seed: number, scale: number = 4) {
  const frame = generateSpirit({ seed });
  const ctx = canvas.getContext("2d")!;

  canvas.width = frame.width * scale;
  canvas.height = frame.height * scale;
  ctx.imageSmoothingEnabled = false;

  for (let y = 0; y < frame.height; y++) {
    for (let x = 0; x < frame.width; x++) {
      const color = frame.pixels[y][x];
      if (color) {
        ctx.fillStyle = color;
        ctx.fillRect(x * scale, y * scale, scale, scale);
      }
    }
  }
}
```

## Animation

```typescript
import { generateSpirit, getAnimationConfig } from "pixe-spirit";

const config = getAnimationConfig("idle");
// { frames: 4, fps: 4, loop: true }

let currentFrame = 0;
setInterval(() => {
  const frame = generateSpirit({
    seed: 42,
    animation: "idle",
    frame: currentFrame,
  });
  // render frame...
  currentFrame = (currentFrame + 1) % config.frames;
}, 1000 / config.fps);
```

## Presets

Use pre-designed characters instead of procedural generation:

```typescript
const frame = generateSpirit({ seed: 42, preset: "baby" });
```

| Preset | Description |
|--------|-------------|
| `egg` | A wobbling egg with sparkles |
| `baby` | A round spirit with expressive eyes |
| `child_diary` | A knowledge spirit with a book motif |
| `child_balanced` | A harmony spirit with a halo accent |

## API

### `generateSpirit(options): SpiritFrame`

Generate a single frame of pixel data.

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| `seed` | `number` | *(required)* | Seed for deterministic generation |
| `animation` | `AnimationType` | `"idle"` | `"idle"`, `"happy"`, `"sad"`, `"sleep"` |
| `frame` | `number` | `0` | Animation frame index |
| `palette` | `PaletteId` | *(from seed)* | Preset palette ID |
| `customPalette` | `ColorPalette` | — | Custom colors (overrides all) |
| `preset` | `PresetId` | — | Use a pre-designed character |

### `SpiritFrame`

```typescript
interface SpiritFrame {
  width: number;                  // 32
  height: number;                 // 32
  pixels: (string | null)[][];    // [y][x] = "#RRGGBB" or null
}
```

### `deriveTraits(seed): SpiritTraits`

Inspect what traits a seed will produce without generating pixels.

### `getPresets(): PresetInfo[]`

Returns metadata for all available presets.

### `getPalettes(): Record<PaletteId, ColorPalette>`

Returns all built-in color palettes.

### `getAnimationConfig(animation): AnimationConfig`

Returns frame count, FPS, and loop info for an animation type.

## Palettes

`red_light`, `blue_light`, `green_light`, `yellow_light`, `red_dark`, `blue_dark`, `green_dark`, `yellow_dark`

Or provide a custom `ColorPalette`:

```typescript
interface ColorPalette {
  body: string;
  bodyLight: string;
  bodyDark: string;
  eye: string;
  accent: string;
}
```

## License

MIT
