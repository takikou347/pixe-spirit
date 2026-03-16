# Git ワークフロー（厳守）

## 基本原則

すべての作業は GitHub Issue から始まる。Issue のない作業は行わない。

```text
Issue 作成 → ブランチ作成 → 実装 → PR（Issue 紐付け） → マージ
```

## ブランチ命名規則

```text
<type>/<issue番号>-<説明>
```

type: feat, fix, refactor, docs, test, chore

## コミットメッセージ

```text
<type>: <概要> (#<issue番号>)
```

## 禁止事項

以下は確認なしに絶対に実行しないこと:

- Issue なしでの作業開始
- main への直接コミット・プッシュ
- `git push --force`
- `git reset --hard` で他者のコミットを削除
- `--no-verify` でのフック回避
- `console.log` をコミットに含めること
