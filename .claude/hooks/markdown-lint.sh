#!/bin/bash
# PostToolUse hook: markdownlint check for .md files

INPUT=$(cat)
FILE_PATH=$(echo "$INPUT" | jq -r '.tool_input.file_path // empty')

# Only process markdown files
if [[ ! "$FILE_PATH" =~ \.md$ ]]; then
  exit 0
fi

# Skip if file doesn't exist (deleted)
if [[ ! -f "$FILE_PATH" ]]; then
  exit 0
fi

# Run markdownlint-cli2
RESULT=$(npx markdownlint-cli2 "$FILE_PATH" 2>&1)
EXIT_CODE=$?

if [[ $EXIT_CODE -ne 0 ]]; then
  jq -n --arg msg "$RESULT" '{
    decision: "block",
    reason: ("Markdown lint errors found:\n" + $msg + "\n\nPlease fix these lint errors.")
  }'
  exit 0
fi

exit 0
