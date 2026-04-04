# slides-grab Editor Run Button Activation

## The Insight
The slides-grab editor's "Run Codex" button works with BOTH Codex AND Claude Code models, despite its label. The button has strict activation preconditions that are easy to miss — it's not a bug, it's a sequential workflow requirement.

## Why This Matters
Users see a disabled "Run Codex" button and assume it only works with Codex. In reality, the button requires a specific interaction sequence before it enables. Without knowing this, users waste time investigating Codex-specific setup when the actual issue is missing a drag selection.

## Recognition Pattern
- "Run Codex" button is grayed out / disabled in the slides-grab editor
- User has typed feedback text but button won't activate
- User switched to Claude model but button stays disabled

## The Approach
The activation logic lives in `editor-send.js:47`:
```js
btnSend.disabled = !prompt || pendingCount === 0 || blocked || !model;
```

ALL four conditions must be met:
1. **prompt** — Text typed in the feedback input field
2. **pendingCount > 0** — At least one bbox region dragged on the slide (this is the most commonly missed step)
3. **blocked === false** — No other edit operation currently running
4. **model** — A model selected from the dropdown

The correct workflow: **drag a region first** → type feedback → select model → Run.

## Technical Details
- Claude model support: `codex-edit.js:441` defines `CLAUDE_MODELS = ['claude-opus-4-6', 'claude-sonnet-4-6']`
- Claude exec: `buildClaudeExecArgs()` at line 447 uses `claude -p --dangerously-skip-permissions --model <model> --max-turns 30`
- Codex exec: `buildCodexExecArgs()` at line 421 uses `codex --dangerously-bypass-approvals-and-sandbox exec`
- Model detection: `isClaudeModel()` checks if the selected model is in the Claude list and routes accordingly
