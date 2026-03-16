# CLAUDE.md - pixe-spirit

## WHAT

Seed-deterministic pixel spirit generator.
seed を入れるだけでユニークなピクセルキャラクターを生成するライブラリ。
出力は純粋なピクセルデータ（2D カラー配列）で、描画は利用者側が行う。

**Tech stack**: TypeScript / tsup / vitest / ESLint / Prettier

**リポジトリ構成**:

```text
src/
  index.ts          # Public API exports
  types.ts          # 型定義
  seed.ts           # 決定論的シード関数
  palettes.ts       # カラーパレット定義
  traits.ts         # シードからの特徴導出
  frame.ts          # フレームユーティリティ
  generate.ts       # メインAPI (generateSpirit)
  parts/            # パーツ描画（body, eyes, mouth, ears, tail, etc.）
  presets/           # プリセットキャラクター
  __tests__/        # テスト
docs/               # GitHub Pages ギャラリー
plans/              # 実装計画
```

---

## HOW

```bash
pnpm dev            # Watch モードでビルド
pnpm build          # プロダクションビルド
pnpm test           # テスト実行
pnpm test:watch     # テスト Watch モード
pnpm type-check     # 型チェック
pnpm lint           # ESLint
pnpm format:check   # Prettier チェック
pnpm format         # Prettier 修正
pnpm build:docs     # GitHub Pages 用ビルド
```

---

## Notes for Claude

- 全ての作業は GitHub Issue から始める。Issue のない作業は行わない
- コミットは明示的に依頼された場合のみ行うこと
- main への直接コミット・プッシュは禁止
- 破壊的な Git 操作（reset --hard、force push 等）は実行前に確認すること
- `console.log` をコミットに含めないこと
- 仕様が不明・矛盾している場合は実装を止めてユーザーに確認すること
- このライブラリはフレームワーク非依存。DOM / Canvas / React に依存するコードを含めないこと
- 決定論性を維持すること：同じ入力は常に同じ出力を返す
