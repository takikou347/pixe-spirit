# pixe-spirit

シード値から決定論的にピクセルキャラクターを生成するライブラリです。純粋なピクセルデータを出力し、描画方法は利用者に委ねます。

[ギャラリー](https://takikou347.github.io/pixe-spirit/) | [English](../README.md)

## 特徴

- **プロシージャル生成**: シード値ごとに異なるキャラクターが生成されます（体型、目、耳、しっぽ、装飾、模様が変化）
- **決定論的**: 同じシード値からは常に同じキャラクターが生成されます
- **トレイトの上書き**: 特定の特徴だけを指定し、残りはシード値から自動生成できます
- **フレームワーク非依存**: Canvas/SVG/DOM ではなく、生のピクセルデータ（2D カラー配列）を出力します
- **8 種類のカラーパレット**: 4 色 x ライト/ダークテーマ + カスタムパレット対応
- **プリセット**: 4 種類のデザイン済みキャラクター
- **アニメーション**: idle、happy、sad、sleep のフレームデータ
- **デュアルフォーマット**: ESM / CommonJS 両対応、TypeScript 型定義付き

## インストール

```bash
npm install pixe-spirit
```

## クイックスタート

```typescript
import { generateSpirit } from "pixe-spirit";

// シード値を渡すだけでユニークなキャラクターが生成されます
const frame = generateSpirit({ seed: 42 });

// frame.pixels[y][x] は 16 進カラー文字列または null（透明）
// frame.width === 32, frame.height === 32
```

シード値を変えると異なるキャラクターが生成されます:

```typescript
const char1 = generateSpirit({ seed: 0 });   // 丸い体、ドット目、光輪
const char2 = generateSpirit({ seed: 100 }); // ドーム型（スライム風）、大きな目、角
const char3 = generateSpirit({ seed: 999 }); // 足付きクリーチャー、猫耳、巻きしっぽ
```

## プロシージャルトレイト

各シード値から以下のトレイトが決定論的に生成されます:

| トレイト | バリエーション |
|----------|----------------|
| **体型** | circle（円）、oval_tall（縦長楕円）、oval_wide（横長楕円）、rounded_square（角丸四角）、teardrop（涙型）、dome（ドーム）、tall_dome（縦長ドーム）、creature（クリーチャー） |
| **目のスタイル** | dot（ドット）、small（小）、medium（中）、large（大）、cyclops（単眼） |
| **口のスタイル** | line（線）、smile（笑顔）、open（開口）、none（なし） |
| **装飾** | none（なし）、halo（光輪）、horns（角）、antennae（触角）、hat（帽子）、leaf（葉）、crown（王冠）、book（本） |
| **耳の種類** | none（なし）、pointed（とがり耳）、round（丸耳）、long（長耳）、cat（猫耳） |
| **しっぽの種類** | none（なし）、bushy（ふさふさ）、thin（細い）、curled（巻き） |
| **模様** | dots（ドット）、stripe（ストライプ）、patch（パッチ）、speckles（そばかす）、none（なし） |

体型にはスライム風の形状（dome、tall_dome）や動物風の形状（creature: 足付き）が含まれます。

### トレイトの確認

```typescript
import { deriveTraits } from "pixe-spirit";

const traits = deriveTraits(42);
// { bodyShape: "circle", eyeStyle: "medium", earType: "none", tailType: "none", ... }
```

### 特定のトレイトを上書き

`traits` オプションで特定の特徴を固定し、残りはシード値で変化させることができます:

```typescript
import { generateSpirit } from "pixe-spirit";

// ドーム型（スライム）の体に猫耳を指定、他はランダム
const slimeCat = generateSpirit({
  seed: 42,
  traits: { bodyShape: "dome", earType: "cat" },
});

// クリーチャー型にふさふさしっぽを指定（キツネ風）
const foxLike = generateSpirit({
  seed: 7,
  traits: { bodyShape: "creature", earType: "pointed", tailType: "bushy" },
});
```

## Canvas への描画（例）

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

## アニメーション

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
  // フレームを描画...
  currentFrame = (currentFrame + 1) % config.frames;
}, 1000 / config.fps);
```

## プリセット

プロシージャル生成の代わりにデザイン済みキャラクターを使用できます:

```typescript
const frame = generateSpirit({ seed: 42, preset: "baby" });
```

| プリセット | 説明 |
|------------|------|
| `egg` | キラキラと揺れる卵 |
| `baby` | 表情豊かな目を持つ丸い精霊 |
| `child_diary` | 本のモチーフを持つ知識の精霊 |
| `child_balanced` | 光輪のアクセントを持つ調和の精霊 |

## API

### `generateSpirit(options): SpiritFrame`

ピクセルデータの 1 フレームを生成します。

| オプション | 型 | デフォルト | 説明 |
|------------|-----|-----------|------|
| `seed` | `number` | *(必須)* | 生成用のシード値 |
| `animation` | `AnimationType` | `"idle"` | `"idle"`, `"happy"`, `"sad"`, `"sleep"` |
| `frame` | `number` | `0` | アニメーションフレームのインデックス |
| `palette` | `PaletteId` | *(シード値から決定)* | プリセットパレット ID |
| `customPalette` | `ColorPalette` | — | カスタムカラー（全てを上書き） |
| `preset` | `PresetId` | — | デザイン済みキャラクターを使用 |
| `traits` | `TraitsOverride` | — | 特定のトレイトを上書き（部分指定可能） |

### `SpiritFrame`

```typescript
interface SpiritFrame {
  width: number;                  // 32
  height: number;                 // 32
  pixels: (string | null)[][];    // [y][x] = "#RRGGBB" or null
}
```

### `deriveTraits(seed, overrides?): SpiritTraits`

ピクセルを生成せずに、シード値から決まるトレイトを確認・上書きできます。

### `getPresets(): PresetInfo[]`

利用可能な全プリセットのメタデータを返します。

### `getPalettes(): Record<PaletteId, ColorPalette>`

全ビルトインカラーパレットを返します。

### `getAnimationConfig(animation): AnimationConfig`

アニメーションタイプのフレーム数、FPS、ループ情報を返します。

## パレット

`red_light`, `blue_light`, `green_light`, `yellow_light`, `red_dark`, `blue_dark`, `green_dark`, `yellow_dark`

カスタム `ColorPalette` も指定可能です:

```typescript
interface ColorPalette {
  body: string;
  bodyLight: string;
  bodyDark: string;
  eye: string;
  accent: string;
}
```

## ライセンス

MIT
