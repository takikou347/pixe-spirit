# pixe-spirit v1.0 — Initial Release Plan

## Goal

Seed-deterministic pixel spirit generator library.
Outputs pure pixel data (2D color array) — rendering is the consumer's responsibility.

## Architecture

```text
src/
├── index.ts            # Public API exports
├── types.ts            # Type definitions
├── palettes.ts         # Color palette definitions
├── seed.ts             # Deterministic seed functions
├── stages/
│   ├── index.ts        # Stage registry
│   ├── egg.ts          # Egg stage pixel pattern
│   ├── baby.ts         # Baby stage pixel pattern
│   ├── child-diary.ts  # Child (diary) stage pixel pattern
│   └── child-balanced.ts # Child (balanced) stage pixel pattern
└── generate.ts         # Main generation function
```

## Output Format

```typescript
interface SpiritFrame {
  width: number;        // 32
  height: number;       // 32
  pixels: (string | null)[][]; // [y][x] = hex color or null (transparent)
}
```

## Public API

```typescript
// Generate a single frame
generateSpirit(options: GenerateOptions): SpiritFrame

// Get available stages
getStages(): StageInfo[]

// Get available palettes
getPalettes(): Record<string, ColorPalette>

// Get animation config for a stage
getAnimationConfig(animation: AnimationType): AnimationConfig
```

## Issues (implementation order)

1. **Project setup** — TypeScript, tsup, vitest, CI
2. **Core types & seed utilities** — Types, seed functions, palettes
3. **Stage implementations** — Pixel patterns for all 4 stages
4. **Main API & tests** — generateSpirit() + comprehensive tests
5. **README & publish prep** — Documentation, package.json metadata

## Non-goals (v1)

- Canvas/React rendering
- CLI tool
- TUI display
- Animation loop management (consumer handles timing)
