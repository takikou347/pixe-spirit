#!/bin/bash
# PreToolUse hook: main への直接コミット・プッシュをブロック

INPUT=$(cat)
TOOL_NAME=$(echo "$INPUT" | jq -r '.tool_name // empty')

# git commit / git push のみチェック
if [[ "$TOOL_NAME" != "Bash" ]]; then
  exit 0
fi

COMMAND=$(echo "$INPUT" | jq -r '.tool_input.command // empty')

# git commit または git push コマンドかチェック
if [[ ! "$COMMAND" =~ ^git\ (commit|push) ]]; then
  exit 0
fi

# 現在のブランチを取得
CURRENT_BRANCH=$(git rev-parse --abbrev-ref HEAD 2>/dev/null)

if [[ "$CURRENT_BRANCH" == "main" ]]; then
  jq -n --arg branch "$CURRENT_BRANCH" '{
    decision: "block",
    reason: ("ブランチ `" + $branch + "` への直接コミット・プッシュは禁止されています。\n作業ブランチを作成してください: git checkout -b <type>/<issue番号>-<説明>")
  }'
  exit 0
fi

exit 0
