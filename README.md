# pixe-spirit

Seed-deterministic pixel spirit generator. Outputs pure pixel data — rendering is up to you.

[Gallery](https://takikou347.github.io/pixe-spirit/) | [日本語版はこちら](./docs/README_ja.md)

## Features

- **Procedural generation**: Different seeds produce unique characters with varied body shapes, eyes, ears, tails, decorations, and markings
- **Deterministic**: Same seed always produces the same character
- **Traits override**: Specify some traits, randomize the rest from seed
- **Framework-agnostic**: Outputs raw pixel data (2D color array), not Canvas/SVG/DOM
- **8 color palettes**: 4 colors x light/dark themes, plus custom palette support
- **Presets**: 4 pre-designed characters (Egg, Baby, Child Diary, Child Balanced)
- **Animations**: idle, happy, sad, sleep frame data
- **Dual format**: ESM and CommonJS builds with TypeScript declarations

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
const char1 = generateSpirit({ seed: 0 });   // round body, dot eyes, halo
const char2 = generateSpirit({ seed: 100 }); // dome (slime-like), large eyes, horns
const char3 = generateSpirit({ seed: 999 }); // creature with legs, cat ears, curled tail
```

## Procedural Traits

Each seed deterministically generates these traits:

| Trait | Variants |
|-------|----------|
| **Body shape** | circle, oval (tall), oval (wide), rounded square, teardrop, dome, tall dome, creature |
| **Eye style** | dot, small, medium, large, cyclops |
| **Mouth style** | line, smile, open, none |
| **Decoration** | none, halo, horns, antennae, hat, leaf, crown, book |
| **Ear type** | none, pointed, round, long, cat |
| **Tail type** | none, bushy, thin, curled |
| **Markings** | dots, stripe, patch, speckles (or none) |

Body shapes include slime-like forms (dome, tall dome) and animal-like forms (creature with stubby legs).

### Inspect Traits

```typescript
import { deriveTraits } from "pixe-spirit";

const traits = deriveTraits(42);
// { bodyShape: "circle", eyeStyle: "medium", earType: "none", tailType: "none", ... }
```

### Override Specific Traits

Use `traits` to pin specific features while letting the rest vary by seed:

```typescript
import { generateSpirit } from "pixe-spirit";

// Force a dome (slime) body with cat ears, but randomize everything else
const slimeCat = generateSpirit({
  seed: 42,
  traits: { bodyShape: "dome", earType: "cat" },
});

// Force a creature body with a bushy tail
const foxLike = generateSpirit({
  seed: 7,
  traits: { bodyShape: "creature", earType: "pointed", tailType: "bushy" },
});
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
| `traits` | `TraitsOverride` | — | Override specific traits (partial) |

### `SpiritFrame`

```typescript
interface SpiritFrame {
  width: number;                  // 32
  height: number;                 // 32
  pixels: (string | null)[][];    // [y][x] = "#RRGGBB" or null
}
```

### `deriveTraits(seed, overrides?): SpiritTraits`

Inspect or override what traits a seed will produce without generating pixels.

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
