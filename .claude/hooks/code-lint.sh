#!/bin/bash
# PostToolUse hook: TypeScript/JavaScript ファイル編集後に lint チェック

INPUT=$(cat)
FILE_PATH=$(echo "$INPUT" | jq -r '.tool_input.file_path // empty')

# TypeScript/JavaScript ファイルのみ対象
if [[ ! "$FILE_PATH" =~ \.(ts|tsx|js|jsx)$ ]]; then
  exit 0
fi

# ファイルが存在しない場合はスキップ
if [[ ! -f "$FILE_PATH" ]]; then
  exit 0
fi

# ファイルのディレクトリから最も近い eslint.config を探す
DIR=$(dirname "$FILE_PATH")
FOUND_CONFIG=""
while [[ "$DIR" != "/" ]]; do
  if ls "$DIR"/eslint.config.* 1>/dev/null 2>&1; then
    FOUND_CONFIG="$DIR"
    break
  fi
  DIR=$(dirname "$DIR")
done

# eslint.config が見つからない場合はスキップ
if [[ -z "$FOUND_CONFIG" ]]; then
  exit 0
fi

# ESLint チェック
RESULT=$(cd "$FOUND_CONFIG" && npx eslint "$FILE_PATH" 2>&1)
EXIT_CODE=$?

if [[ $EXIT_CODE -ne 0 ]]; then
  jq -n --arg msg "$RESULT" '{
    decision: "block",
    reason: ("ESLint errors found:\n" + $msg + "\n\nPlease fix these lint errors.")
  }'
  exit 0
fi

exit 0
