# Hooks 참조 (공식 문서)

- **출처**: Claude Code 공식 문서
- **링크**: [https://code.claude.com/docs/ko/hooks](https://code.claude.com/docs/ko/hooks)
- **관련 링크**:
  - [Hook으로 워크플로우 자동화 가이드](https://code.claude.com/docs/ko/hooks-guide)
  - [설정](https://code.claude.com/docs/ko/settings)
  - [권한](https://code.claude.com/docs/ko/permissions)
  - [권한 모드](https://code.claude.com/docs/ko/permission-modes)
  - [플러그인](https://code.claude.com/docs/ko/plugins)
  - [플러그인 컴포넌트 참조](https://code.claude.com/docs/ko/plugins-reference)
  - [Skills](https://code.claude.com/docs/ko/skills)
  - [Subagents](https://code.claude.com/docs/ko/sub-agents)
  - [에이전트 팀](https://code.claude.com/docs/ko/agent-teams)
  - [MCP](https://code.claude.com/docs/ko/mcp)
  - [CLAUDE.md (메모리)](https://code.claude.com/docs/ko/memory)
  - [환경 변수](https://code.claude.com/docs/ko/env-vars)
  - [헤드리스 모드](https://code.claude.com/docs/ko/headless)
  - [도구 참조](https://code.claude.com/docs/ko/tools-reference)
  - [Bash 명령 검증기 참조 구현 (GitHub)](https://github.com/anthropics/claude-code/blob/main/examples/hooks/bash_command_validator_example.py)

---

## 개요

Hook은 Claude Code의 수명 주기에서 특정 지점에 자동으로 실행되는 **사용자 정의 셸 명령**, **HTTP 엔드포인트** 또는 **LLM 프롬프트**이다. 이벤트 스키마, 구성 옵션, JSON 입출력 형식, 비동기 hook, HTTP hook, MCP 도구 hook 등 고급 기능을 지원한다.

---

## Hook 수명 주기

Hook은 Claude Code 세션 중 특정 지점에서 실행된다. 이벤트가 발생하고 matcher가 일치하면, Claude Code는 이벤트에 대한 JSON 컨텍스트를 hook 핸들러에 전달한다.

- **명령 hook**: 입력이 stdin으로 도착
- **HTTP hook**: POST 요청 본문으로 도착

### Hook 이벤트 요약

| Event | 발생 시점 |
|:------|:--------|
| `SessionStart` | 세션 시작 또는 재개 시 |
| `UserPromptSubmit` | 사용자가 프롬프트 제출 시 (Claude 처리 전) |
| `PreToolUse` | 도구 호출 실행 전 (차단 가능) |
| `PermissionRequest` | 권한 대화 상자 표시 시 |
| `PostToolUse` | 도구 호출 성공 후 |
| `PostToolUseFailure` | 도구 호출 실패 후 |
| `Notification` | 알림 전송 시 |
| `SubagentStart` | Subagent 생성 시 |
| `SubagentStop` | Subagent 완료 시 |
| `TaskCreated` | TaskCreate를 통한 작업 생성 시 |
| `TaskCompleted` | 작업 완료 표시 시 |
| `Stop` | Claude 응답 완료 시 |
| `StopFailure` | API 오류로 턴 종료 시 |
| `TeammateIdle` | 에이전트 팀 팀원 유휴 전환 시 |
| `InstructionsLoaded` | CLAUDE.md 또는 rules 파일 로드 시 |
| `ConfigChange` | 구성 파일 변경 시 |
| `CwdChanged` | 작업 디렉토리 변경 시 |
| `FileChanged` | 감시 중인 파일 변경 시 |
| `WorktreeCreate` | Worktree 생성 시 |
| `WorktreeRemove` | Worktree 제거 시 |
| `PreCompact` | 컨텍스트 압축 전 |
| `PostCompact` | 컨텍스트 압축 완료 후 |
| `Elicitation` | MCP 서버가 사용자 입력 요청 시 |
| `ElicitationResult` | MCP elicitation 응답 후 |
| `SessionEnd` | 세션 종료 시 |

---

## Hook 해결 예시

파괴적인 셸 명령을 차단하는 `PreToolUse` hook 예시:

```json
{
  "hooks": {
    "PreToolUse": [
      {
        "matcher": "Bash",
        "hooks": [
          {
            "type": "command",
            "if": "Bash(rm *)",
            "command": "\"$CLAUDE_PROJECT_DIR\"/.claude/hooks/block-rm.sh"
          }
        ]
      }
    ]
  }
}
```

```bash
#!/bin/bash
# .claude/hooks/block-rm.sh
COMMAND=$(jq -r '.tool_input.command')

if echo "$COMMAND" | grep -q 'rm -rf'; then
  jq -n '{
    hookSpecificOutput: {
      hookEventName: "PreToolUse",
      permissionDecision: "deny",
      permissionDecisionReason: "Destructive command blocked by hook"
    }
  }'
else
  exit 0  # allow the command
fi
```

---

## 구성

Hook은 JSON 설정 파일에서 정의되며, 3가지 중첩 수준으로 구성된다:

1. **Hook 이벤트** 선택 (예: `PreToolUse`, `Stop`)
2. **Matcher 그룹**으로 필터링 (예: "Bash 도구에만")
3. 일치 시 실행할 **Hook 핸들러** 정의

### Hook 위치 (범위)

| 위치 | 범위 | 공유 가능 |
|:-----|:-----|:---------|
| `~/.claude/settings.json` | 모든 프로젝트 | 아니오, 머신에 로컬 |
| `.claude/settings.json` | 단일 프로젝트 | 예, 리포지토리 커밋 가능 |
| `.claude/settings.local.json` | 단일 프로젝트 | 아니오, gitignored |
| 관리형 정책 설정 | 조직 전체 | 예, 관리자 제어 |
| Plugin `hooks/hooks.json` | plugin 활성 시 | 예, plugin 번들 |
| Skill/Agent frontmatter | 컴포넌트 활성 중 | 예, 컴포넌트 파일 내 |

### Matcher 패턴

`matcher` 필드는 정규식 문자열로 hook 발생 시점을 필터링한다. `"*"`, `""` 또는 생략 시 모든 발생과 일치한다.

| 이벤트 | Matcher 대상 | 예시 |
|:------|:------------|:-----|
| `PreToolUse`, `PostToolUse` 등 | 도구 이름 | `Bash`, `Edit\|Write`, `mcp__.*` |
| `SessionStart` | 시작 방식 | `startup`, `resume`, `clear`, `compact` |
| `Notification` | 알림 유형 | `permission_prompt`, `idle_prompt` |
| `SubagentStart/Stop` | 에이전트 유형 | `Bash`, `Explore`, `Plan` |
| `FileChanged` | 파일명(basename) | `.envrc`, `.env` |

#### MCP 도구 일치

MCP 도구는 `mcp__<server>__<tool>` 명명 패턴을 따른다:
- `mcp__memory__.*` - memory 서버의 모든 도구
- `mcp__.*__write.*` - 모든 서버의 write 관련 도구

### Hook 핸들러 유형

| 유형 | 설명 |
|:-----|:-----|
| `command` | 셸 명령 실행 (stdin으로 JSON 입력, stdout/종료코드로 결과) |
| `http` | HTTP POST 요청 전송 (응답 본문으로 결과) |
| `prompt` | LLM에 단일 턴 평가 프롬프트 전송 |
| `agent` | Subagent 생성하여 도구 사용 후 결정 반환 |

#### 공통 필드

| 필드 | 필수 | 설명 |
|:-----|:-----|:-----|
| `type` | 예 | `"command"`, `"http"`, `"prompt"`, `"agent"` |
| `if` | 아니오 | 권한 규칙 구문으로 필터링 (예: `"Bash(git *)"`, `"Edit(*.ts)"`) |
| `timeout` | 아니오 | 취소 전 초 단위 (기본: 명령 600, 프롬프트 30, 에이전트 60) |
| `statusMessage` | 아니오 | 실행 중 표시되는 스피너 메시지 |
| `once` | 아니오 | true면 세션당 한 번만 실행 |

#### 명령 hook 추가 필드

| 필드 | 설명 |
|:-----|:-----|
| `command` | 실행할 셸 명령 |
| `async` | true면 백그라운드 실행 |
| `shell` | `"bash"` (기본) 또는 `"powershell"` |

#### HTTP hook 추가 필드

| 필드 | 설명 |
|:-----|:-----|
| `url` | POST 요청 URL |
| `headers` | 추가 HTTP 헤더 (환경 변수 보간 지원: `$VAR_NAME`) |
| `allowedEnvVars` | 헤더에서 보간 허용할 환경 변수 이름 목록 |

HTTP hook 예시:

```json
{
  "hooks": {
    "PreToolUse": [
      {
        "matcher": "Bash",
        "hooks": [
          {
            "type": "http",
            "url": "http://localhost:8080/hooks/pre-tool-use",
            "timeout": 30,
            "headers": {
              "Authorization": "Bearer $MY_TOKEN"
            },
            "allowedEnvVars": ["MY_TOKEN"]
          }
        ]
      }
    ]
  }
}
```

#### 프롬프트/에이전트 hook 추가 필드

| 필드 | 설명 |
|:-----|:-----|
| `prompt` | 모델에 전송할 프롬프트 (`$ARGUMENTS`로 입력 JSON 참조) |
| `model` | 사용할 모델 (기본: 빠른 모델) |

### 경로별 스크립트 참조

- `$CLAUDE_PROJECT_DIR`: 프로젝트 루트
- `${CLAUDE_PLUGIN_ROOT}`: plugin 설치 디렉토리
- `${CLAUDE_PLUGIN_DATA}`: plugin 지속적 데이터 디렉토리

---

## Hook 입출력

### 공통 입력 필드 (모든 이벤트)

| 필드 | 설명 |
|:-----|:-----|
| `session_id` | 현재 세션 식별자 |
| `transcript_path` | 대화 JSON 경로 |
| `cwd` | 현재 작업 디렉토리 |
| `permission_mode` | 현재 권한 모드 |
| `hook_event_name` | 이벤트 이름 |
| `agent_id` | Subagent 고유 식별자 (subagent 내부 시) |
| `agent_type` | 에이전트 이름 (`--agent` 사용 또는 subagent 내부 시) |

### 종료 코드

| 종료 코드 | 의미 |
|:---------|:-----|
| **0** | 성공. stdout의 JSON 출력 처리 |
| **2** | 차단 오류. stderr이 Claude에 피드백 |
| **기타** | 비차단 오류. 실행 계속 |

#### 이벤트별 종료 코드 2 동작

| Hook 이벤트 | 차단 가능? | 종료 코드 2 효과 |
|:-----------|:---------|:-------------|
| `PreToolUse` | 예 | 도구 호출 차단 |
| `PermissionRequest` | 예 | 권한 거부 |
| `UserPromptSubmit` | 예 | 프롬프트 처리 차단 |
| `Stop` | 예 | 중지 방지, 대화 계속 |
| `SubagentStop` | 예 | subagent 중지 방지 |
| `TeammateIdle` | 예 | 유휴 전환 방지 |
| `TaskCreated` | 예 | 작업 생성 롤백 |
| `TaskCompleted` | 예 | 완료 표시 방지 |
| `ConfigChange` | 예 | 구성 변경 차단 (`policy_settings` 제외) |
| `Elicitation` | 예 | elicitation 거부 |
| `ElicitationResult` | 예 | 응답 차단 |
| `WorktreeCreate` | 예 | worktree 생성 실패 |
| `PostToolUse` | 아니오 | stderr 표시 (도구 이미 실행됨) |
| `Notification` | 아니오 | 사용자에게 stderr 표시 |
| `SessionStart/End` | 아니오 | 사용자에게 stderr 표시 |

### JSON 출력 필드

| 필드 | 기본값 | 설명 |
|:-----|:------|:-----|
| `continue` | `true` | false면 Claude 완전 중지 |
| `stopReason` | 없음 | continue가 false일 때 사용자에게 표시 |
| `suppressOutput` | `false` | true면 자세한 모드 출력에서 숨김 |
| `systemMessage` | 없음 | 사용자에게 표시되는 경고 메시지 |

### 결정 제어 패턴

| 이벤트 | 패턴 | 주요 필드 |
|:------|:-----|:---------|
| UserPromptSubmit, PostToolUse, Stop 등 | 최상위 `decision` | `decision: "block"`, `reason` |
| PreToolUse | `hookSpecificOutput` | `permissionDecision` (allow/deny/ask) |
| PermissionRequest | `hookSpecificOutput` | `decision.behavior` (allow/deny) |
| WorktreeCreate | 경로 반환 | stdout에 경로 또는 `hookSpecificOutput.worktreePath` |
| Elicitation | `hookSpecificOutput` | `action` (accept/decline/cancel) |

---

## 주요 Hook 이벤트 상세

### SessionStart

세션 시작/재개 시 실행. Matcher: `startup`, `resume`, `clear`, `compact`.

- stdout 텍스트가 Claude 컨텍스트로 추가됨
- `CLAUDE_ENV_FILE`을 통해 환경 변수 유지 가능

```bash
#!/bin/bash
if [ -n "$CLAUDE_ENV_FILE" ]; then
  echo 'export NODE_ENV=production' >> "$CLAUDE_ENV_FILE"
fi
exit 0
```

### PreToolUse

도구 호출 처리 전 실행. 허용/거부/사용자 요청 가능.

도구별 `tool_input` 스키마:
- **Bash**: `command`, `description`, `timeout`, `run_in_background`
- **Write**: `file_path`, `content`
- **Edit**: `file_path`, `old_string`, `new_string`, `replace_all`
- **Read**: `file_path`, `offset`, `limit`
- **Glob**: `pattern`, `path`
- **Grep**: `pattern`, `path`, `glob`, `output_mode`
- **WebFetch**: `url`, `prompt`
- **WebSearch**: `query`, `allowed_domains`, `blocked_domains`
- **Agent**: `prompt`, `description`, `subagent_type`, `model`

결정 제어 출력:

```json
{
  "hookSpecificOutput": {
    "hookEventName": "PreToolUse",
    "permissionDecision": "deny",
    "permissionDecisionReason": "Database writes are not allowed",
    "updatedInput": { "command": "safe-command" },
    "additionalContext": "Extra context for Claude"
  }
}
```

### PostToolUse

도구 성공 완료 후 실행. `tool_input`과 `tool_response` 모두 포함.

### Stop / SubagentStop

Claude 응답 완료 시 실행. `decision: "block"`으로 중지 방지 가능.

```json
{
  "decision": "block",
  "reason": "Must be provided when Claude is blocked from stopping"
}
```

### ConfigChange

구성 파일 변경 시 실행. Matcher: `user_settings`, `project_settings`, `local_settings`, `policy_settings`, `skills`. `policy_settings` 변경은 차단 불가.

### CwdChanged / FileChanged

작업 디렉토리/파일 변경 시 실행. `CLAUDE_ENV_FILE` 접근 가능. `watchPaths` 반환으로 감시 파일 동적 설정 가능.

### WorktreeCreate / WorktreeRemove

Worktree 생성/제거 시 실행. 기본 git 동작을 대체하여 SVN, Perforce 등 사용 가능.

### Elicitation / ElicitationResult

MCP 서버의 사용자 입력 요청/응답 처리. 프로그래밍 방식 응답으로 대화 상자 건너뛰기 가능.

### SessionEnd

세션 종료 시 실행. 기본 시간 초과: 1.5초 (`CLAUDE_CODE_SESSIONEND_HOOKS_TIMEOUT_MS`로 조정).

종료 이유: `clear`, `resume`, `logout`, `prompt_input_exit`, `bypass_permissions_disabled`, `other`.

---

## Hook 비활성화

- 개별 hook 제거: 설정 JSON에서 항목 삭제
- 모든 hook 임시 비활성화: `"disableAllHooks": true` 설정
- 관리형 설정의 hook은 관리형 수준에서만 비활성화 가능

---

## `/hooks` 메뉴

Claude Code에서 `/hooks`를 입력하면 구성된 hook의 읽기 전용 브라우저를 열 수 있다. 소스 레이블: `User`, `Project`, `Local`, `Plugin`, `Session`, `Built-in`.
