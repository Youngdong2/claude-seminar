# 사용자 정의 Subagent 만들기 (공식 문서)

- **출처**: Claude Code 공식 문서
- **링크**: [https://code.claude.com/docs/ko/sub-agents](https://code.claude.com/docs/ko/sub-agents)
- **관련 링크**:
  - [에이전트 팀](https://code.claude.com/docs/ko/agent-teams)
  - [Plan Mode](https://code.claude.com/docs/ko/common-workflows#use-plan-mode-for-safe-code-analysis)
  - [플러그인](https://code.claude.com/docs/ko/plugins)
  - [플러그인 컴포넌트 참조 - 에이전트](https://code.claude.com/docs/ko/plugins-reference#agents)
  - [Skills](https://code.claude.com/docs/ko/skills)
  - [MCP](https://code.claude.com/docs/ko/mcp)
  - [MCP 서버 구성](https://code.claude.com/docs/ko/mcp#configure-mcp-servers)
  - [Hooks](https://code.claude.com/docs/ko/hooks)
  - [권한](https://code.claude.com/docs/ko/permissions)
  - [권한 모드](https://code.claude.com/docs/ko/permission-modes)
  - [모델 구성](https://code.claude.com/docs/ko/model-config)
  - [도구 참조](https://code.claude.com/docs/ko/tools-reference)
  - [설정](https://code.claude.com/docs/ko/settings)
  - [환경 변수](https://code.claude.com/docs/ko/env-vars)
  - [CLI 참조](https://code.claude.com/docs/ko/cli-reference)
  - [Commands](https://code.claude.com/docs/ko/commands)
  - [헤드리스 모드](https://code.claude.com/docs/ko/headless)
  - [일반 워크플로우](https://code.claude.com/docs/ko/common-workflows)
  - [대화형 모드 - /btw](https://code.claude.com/docs/ko/interactive-mode#side-questions-with-btw)

---

## 개요

Subagent는 특정 유형의 작업을 처리하는 특화된 AI 어시스턴트이다. 각 subagent는 **자체 컨텍스트 윈도우**에서 실행되며, 사용자 정의 시스템 프롬프트, 특정 도구 액세스, 독립적인 권한을 가진다.

**주요 장점:**
- **컨텍스트 보존** - 탐색/구현을 주 대화에서 분리
- **제약 조건 적용** - 사용 가능한 도구 제한
- **구성 재사용** - 프로젝트 간 구성 재사용
- **동작 특화** - 도메인별 집중된 시스템 프롬프트
- **비용 제어** - Haiku 같은 저렴한 모델로 작업 라우팅

---

## 내장 Subagent

### Explore
- **모델**: Haiku (빠름, 낮은 지연시간)
- **도구**: 읽기 전용 (Write/Edit 거부)
- **목적**: 파일 검색, 코드 검색, 코드베이스 탐색
- 철저함 수준: `quick`, `medium`, `very thorough`

### Plan
- **모델**: 주 대화에서 상속
- **도구**: 읽기 전용
- **목적**: Plan mode 중 계획을 위한 코드베이스 연구

### General-purpose
- **모델**: 주 대화에서 상속
- **도구**: 모든 도구
- **목적**: 복잡한 연구, 다단계 작업, 코드 수정

### 기타
| 에이전트 | 모델 | 사용 시기 |
|:--------|:-----|:---------|
| Bash | 상속 | 별도 컨텍스트에서 터미널 명령 실행 |
| statusline-setup | Sonnet | `/statusline` 구성 시 |
| Claude Code Guide | Haiku | Claude Code 기능 질문 시 |

---

## 빠른 시작: 첫 번째 Subagent 만들기

1. `/agents` 실행
2. **Create new agent** > **Personal** 선택 (`~/.claude/agents/`에 저장)
3. **Generate with Claude** 선택하여 설명 입력
4. 도구 선택 (예: Read-only tools)
5. 모델 선택 (예: Sonnet)
6. 색상 선택 (UI 식별용)
7. 메모리 구성 (User scope / None)
8. 저장 후 사용

```text
Use the code-improver agent to suggest improvements in this project
```

---

## Subagent 구성

### 범위 선택

| 위치 | 범위 | 우선순위 |
|:-----|:-----|:---------|
| `--agents` CLI 플래그 | 현재 세션 | 1 (최고) |
| `.claude/agents/` | 현재 프로젝트 | 2 |
| `~/.claude/agents/` | 모든 프로젝트 | 3 |
| 플러그인의 `agents/` | 플러그인 활성 시 | 4 (최저) |

#### CLI 정의 Subagent

```bash
claude --agents '{
  "code-reviewer": {
    "description": "Expert code reviewer. Use proactively after code changes.",
    "prompt": "You are a senior code reviewer. Focus on code quality, security, and best practices.",
    "tools": ["Read", "Grep", "Glob", "Bash"],
    "model": "sonnet"
  },
  "debugger": {
    "description": "Debugging specialist for errors and test failures.",
    "prompt": "You are an expert debugger. Analyze errors, identify root causes, and provide fixes."
  }
}'
```

### Subagent 파일 작성

YAML frontmatter + Markdown 시스템 프롬프트:

```markdown
---
name: code-reviewer
description: Reviews code for quality and best practices
tools: Read, Glob, Grep
model: sonnet
---

You are a code reviewer. When invoked, analyze the code and provide
specific, actionable feedback on quality, security, and best practices.
```

### 지원되는 Frontmatter 필드

| 필드 | 필수 | 설명 |
|:-----|:-----|:-----|
| `name` | 예 | 소문자/하이픈 고유 식별자 |
| `description` | 예 | Claude가 이 subagent에 위임할 시기 |
| `tools` | 아니오 | 사용 가능한 도구 (생략 시 모든 도구 상속) |
| `disallowedTools` | 아니오 | 거부할 도구 |
| `model` | 아니오 | `sonnet`, `opus`, `haiku`, 전체 ID, `inherit` |
| `permissionMode` | 아니오 | `default`, `acceptEdits`, `dontAsk`, `bypassPermissions`, `plan` |
| `maxTurns` | 아니오 | 최대 에이전트 턴 수 |
| `skills` | 아니오 | 시작 시 로드할 skills |
| `mcpServers` | 아니오 | 사용 가능한 MCP 서버 |
| `hooks` | 아니오 | 라이프사이클 hooks |
| `memory` | 아니오 | 지속적 메모리 범위: `user`, `project`, `local` |
| `background` | 아니오 | 항상 background task로 실행 (기본: false) |
| `effort` | 아니오 | 노력 수준: `low`, `medium`, `high`, `max` |
| `isolation` | 아니오 | `worktree`로 설정 시 격리된 git worktree에서 실행 |
| `initialPrompt` | 아니오 | `--agent`로 실행 시 첫 번째 사용자 턴으로 자동 제출 |

### 모델 선택

해결 순서:
1. `CLAUDE_CODE_SUBAGENT_MODEL` 환경 변수
2. 호출별 `model` 매개변수
3. Subagent 정의의 `model` frontmatter
4. 주 대화의 모델

### 도구 액세스 제어

**허용 목록 (`tools`)**:
```yaml
tools: Read, Grep, Glob, Bash
```

**거부 목록 (`disallowedTools`)**:
```yaml
disallowedTools: Write, Edit
```

**생성 가능한 Subagent 제한**:
```yaml
tools: Agent(worker, researcher), Read, Bash
```

### MCP 서버 범위 지정

```yaml
---
name: browser-tester
description: Tests features in a real browser using Playwright
mcpServers:
  - playwright:
      type: stdio
      command: npx
      args: ["-y", "@playwright/mcp@latest"]
  - github
---
```

### 권한 모드

| 모드 | 동작 |
|:-----|:-----|
| `default` | 표준 권한 확인 |
| `acceptEdits` | 파일 편집 자동 수락 |
| `dontAsk` | 권한 프롬프트 자동 거부 |
| `bypassPermissions` | 권한 프롬프트 건너뛰기 (주의 필요) |
| `plan` | 읽기 전용 탐색 |

### 지속적 메모리

```yaml
memory: user
```

| 범위 | 위치 | 사용 시기 |
|:-----|:-----|:---------|
| `user` | `~/.claude/agent-memory/<name>/` | 모든 프로젝트 간 학습 |
| `project` | `.claude/agent-memory/<name>/` | 프로젝트별, 버전 제어 공유 |
| `local` | `.claude/agent-memory-local/<name>/` | 프로젝트별, 비공개 |

### Hook을 사용한 조건부 규칙

```yaml
---
name: db-reader
description: Execute read-only database queries
tools: Bash
hooks:
  PreToolUse:
    - matcher: "Bash"
      hooks:
        - type: command
          command: "./scripts/validate-readonly-query.sh"
---
```

### 특정 Subagent 비활성화

```json
{
  "permissions": {
    "deny": ["Agent(Explore)", "Agent(my-custom-agent)"]
  }
}
```

---

## Subagent 작업 패턴

### 자동 위임
Claude는 `description` 필드를 기반으로 자동으로 위임한다. "use proactively" 같은 구문으로 적극적 위임 유도 가능.

### 명시적 호출
- **자연어**: `Use the test-runner subagent to fix failing tests`
- **@-mention**: `@"code-reviewer (agent)" look at the auth changes`
- **세션 전체**: `claude --agent code-reviewer`

### Foreground vs Background

- **Foreground**: 완료까지 주 대화 차단. 권한 프롬프트가 사용자에게 전달.
- **Background**: 동시 실행. 필요 권한을 미리 요청. `Ctrl+B`로 background 이동 가능.

### 일반적인 패턴

**대량 작업 격리:**
```text
Use a subagent to run the test suite and report only the failing tests
```

**병렬 연구:**
```text
Research the authentication, database, and API modules in parallel using separate subagents
```

**Subagent 체인:**
```text
Use the code-reviewer to find performance issues, then use the optimizer to fix them
```

### Subagent 재개

재개된 subagent는 전체 대화 기록을 유지하며, 중단한 위치에서 정확히 계속한다.

```text
Continue that code review and now analyze the authorization logic
```

---

## 예제 Subagent

### 코드 검토자

```markdown
---
name: code-reviewer
description: Expert code review specialist. Use immediately after writing or modifying code.
tools: Read, Grep, Glob, Bash
model: inherit
---

You are a senior code reviewer ensuring high standards of code quality and security.
Review checklist:
- Code clarity, naming, no duplication
- Error handling, no exposed secrets
- Input validation, test coverage, performance
Provide feedback by priority: Critical / Warnings / Suggestions
```

### 디버거

```markdown
---
name: debugger
description: Debugging specialist for errors, test failures, and unexpected behavior.
tools: Read, Edit, Bash, Grep, Glob
---

You are an expert debugger specializing in root cause analysis.
Process: Capture error -> Identify reproduction -> Isolate failure -> Implement fix -> Verify
```

### 데이터 과학자

```markdown
---
name: data-scientist
description: Data analysis expert for SQL queries, BigQuery operations, and data insights.
tools: Bash, Read, Write
model: sonnet
---

You are a data scientist specializing in SQL and BigQuery analysis.
```

### 데이터베이스 쿼리 검증자

```markdown
---
name: db-reader
description: Execute read-only database queries.
tools: Bash
hooks:
  PreToolUse:
    - matcher: "Bash"
      hooks:
        - type: command
          command: "./scripts/validate-readonly-query.sh"
---

You are a database analyst with read-only access. Execute SELECT queries to answer questions.
```

검증 스크립트:

```bash
#!/bin/bash
INPUT=$(cat)
COMMAND=$(echo "$INPUT" | jq -r '.tool_input.command // empty')

if echo "$COMMAND" | grep -iE '\b(INSERT|UPDATE|DELETE|DROP|CREATE|ALTER|TRUNCATE|REPLACE|MERGE)\b' > /dev/null; then
  echo "Blocked: Write operations not allowed. Use SELECT queries only." >&2
  exit 2
fi
exit 0
```

---

## 다음 단계

- [플러그인으로 subagent 배포](https://code.claude.com/docs/ko/plugins)
- [Claude Code를 프로그래밍 방식으로 실행](https://code.claude.com/docs/ko/headless)
- [MCP 서버 사용](https://code.claude.com/docs/ko/mcp)
