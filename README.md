# pixe-spirit

Seed-deterministic pixel spirit generator. Outputs pure pixel data — rendering is up to you.

## Features

- **Deterministic**: Same seed always produces the same character
- **Framework-agnostic**: Outputs raw pixel data (2D color array), not Canvas/SVG/DOM
- **Multiple stages**: Egg, Baby, Child (Diary), Child (Balanced)
- **8 color palettes**: 4 colors × light/dark themes, plus custom palette support
- **Animations**: idle, happy, sad, sleep, evolve, levelup frame data

## Install

```bash
npm install pixe-spirit
```

## Usage

```typescript
import { generateSpirit } from "pixe-spirit";

const frame = generateSpirit({
  stage: "baby_01",
  palette: "blue_light",
  seed: 42,
  animation: "idle",
  frame: 0,
});

// frame.pixels[y][x] is a hex color string or null (transparent)
// frame.width === 32, frame.height === 32
```

### Render to Canvas (example)

```typescript
import { generateSpirit } from "pixe-spirit";

function renderToCanvas(canvas: HTMLCanvasElement, scale: number = 4) {
  const frame = generateSpirit({ stage: "baby_01", seed: 42 });
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

### Animation loop (example)

```typescript
import { generateSpirit, getAnimationConfig } from "pixe-spirit";

const config = getAnimationConfig("idle");
// { frames: 4, fps: 4, loop: true }

let currentFrame = 0;
setInterval(() => {
  const frame = generateSpirit({
    stage: "baby_01",
    animation: "idle",
    frame: currentFrame,
  });
  // render frame...
  currentFrame = (currentFrame + 1) % config.frames;
}, 1000 / config.fps);
```

## API

### `generateSpirit(options): SpiritFrame`

Generate a single frame of pixel data.

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| `stage` | `StageId` | *(required)* | `"egg"`, `"baby_01"`, `"child_diary_01"`, `"child_balanced_01"` |
| `animation` | `AnimationType` | `"idle"` | `"idle"`, `"happy"`, `"sad"`, `"sleep"`, `"evolve"`, `"levelup"` |
| `frame` | `number` | `0` | Animation frame index |
| `palette` | `PaletteId` | `"blue_light"` | Preset palette ID |
| `customPalette` | `ColorPalette` | — | Custom colors (overrides `palette`) |
| `seed` | `number` | `0` | Seed for deterministic variation |

### `SpiritFrame`

```typescript
interface SpiritFrame {
  width: number;                  // 32
  height: number;                 // 32
  pixels: (string | null)[][];    // [y][x] = "#RRGGBB" or null
}
```

### `getStages(): StageInfo[]`

Returns metadata for all available stages.

### `getPalettes(): Record<PaletteId, ColorPalette>`

Returns all built-in color palettes.

### `getAnimationConfig(animation): AnimationConfig`

Returns frame count, FPS, and loop info for an animation type.

## Stages

| Stage | ID | Tier | Description |
|-------|----|------|-------------|
| Egg | `egg` | 0 | Wobbling egg with sparkles |
| Baby | `baby_01` | 1 | Round spirit with eyes, mouth, seed-based markings |
| Child Diary | `child_diary_01` | 2 | Knowledge spirit with book motif |
| Child Balanced | `child_balanced_01` | 2 | Harmony spirit with halo accent |

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
