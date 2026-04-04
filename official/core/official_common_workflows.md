# 일반적인 워크플로우 (공식 문서)

- **출처**: Claude Code 공식 문서
- **링크**: https://code.claude.com/docs/ko/common-workflows
- **관련 링크**:
  - [모범 사례](https://code.claude.com/docs/ko/best-practices)
  - [코드 인텔리전스 플러그인](https://code.claude.com/docs/ko/discover-plugins#code-intelligence)
  - [subagent 문서](https://code.claude.com/docs/ko/sub-agents)
  - [subagent frontmatter 필드](https://code.claude.com/docs/ko/sub-agents#supported-frontmatter-fields)
  - [도구 참조 - AskUserQuestion](https://code.claude.com/docs/ko/tools-reference)
  - [설정 문서](https://code.claude.com/docs/ko/settings#available-settings)
  - [헤드리스 모드](https://code.claude.com/docs/ko/headless)
  - [MCP 리소스](https://code.claude.com/docs/ko/mcp#use-mcp-resources)
  - [모델 구성 - 노력 수준 조정](https://code.claude.com/docs/ko/model-config#adjust-effort-level)
  - [환경 변수](https://code.claude.com/docs/ko/env-vars)
  - [터미널 구성](https://code.claude.com/docs/ko/terminal-config)
  - [확장된 사고 (Anthropic 플랫폼)](https://platform.claude.com/docs/en/build-with-claude/extended-thinking)
  - [에이전트 팀](https://code.claude.com/docs/ko/agent-teams)
  - [Hooks 가이드 - 알림](https://code.claude.com/docs/ko/hooks-guide#get-notified-when-claude-needs-input)
  - [Hooks 참조 - Notification](https://code.claude.com/docs/ko/hooks#notification)
  - [Hooks - WorktreeCreate](https://code.claude.com/docs/ko/hooks#worktreecreate)
  - [Git worktree 공식 문서](https://git-scm.com/docs/git-worktree)
  - [Claude Code 작동 방식](https://code.claude.com/docs/ko/how-claude-code-works)
  - [기능 개요](https://code.claude.com/docs/ko/features-overview)
  - [참조 구현 (devcontainer)](https://github.com/anthropics/claude-code/tree/main/.devcontainer)

---

## 1. 새로운 코드베이스 이해하기

### 코드베이스의 빠른 개요 얻기

```bash
cd /path/to/project
claude
```

```text
give me an overview of this codebase
```

후속 질문:

```text
explain the main architecture patterns used here
what are the key data models?
how is authentication handled?
```

> **팁**: 광범위한 질문으로 시작 -> 특정 영역으로 좁혀나가기. 프로젝트 용어집 요청 가능.

### 관련 코드 찾기

```text
find the files that handle user authentication
how do these authentication files work together?
trace the login process from front-end to database
```

> **팁**: 코드 인텔리전스 플러그인 설치 시 정확한 "정의로 이동" 및 "참조 찾기" 네비게이션 제공

---

## 2. 효율적으로 버그 수정하기

```text
I'm seeing an error when I run npm test
suggest a few ways to fix the @ts-ignore in user.ts
update user.ts to add the null check you suggested
```

> **팁**: 스택 추적 공유, 재현 단계 언급, 간헐적/일관적 여부 알리기

---

## 3. 코드 리팩토링

```text
find deprecated API usage in our codebase
suggest how to refactor utils.js to use modern JavaScript features
refactor utils.js to use ES2024 features while maintaining the same behavior
run tests for the refactored code
```

> **팁**: 하위 호환성 요청, 작고 테스트 가능한 증분으로 수행

---

## 4. 특화된 Subagent 사용하기

- `/agents` 명령으로 사용 가능한 subagent 확인
- Claude Code가 자동으로 특화된 subagent에 위임
- 명시적 요청 가능: `use the code-reviewer subagent to check the auth module`
- `/agents` → "Create New subagent"로 사용자 정의 subagent 생성

> **팁**: `.claude/agents/`에 프로젝트별 subagent 생성, `description` 필드로 자동 위임 활성화

---

## 5. Plan Mode를 사용하여 안전한 코드 분석

Plan Mode는 Claude에게 **읽기 전용 작업**으로 코드베이스를 분석하게 합니다.

### 사용 시기

- 다단계 구현 (많은 파일 편집)
- 코드 탐색 (변경 전 조사)
- 대화형 개발 (방향 반복)

### 사용 방법

| 방법 | 명령 |
|------|------|
| 세션 중 전환 | **Shift+Tab** (Normal → Auto-Accept → Plan) |
| 새 세션 시작 | `claude --permission-mode plan` |
| 헤드리스 쿼리 | `claude --permission-mode plan -p "Analyze the authentication system"` |

- `Ctrl+G`: 기본 텍스트 편집기에서 계획 열기/편집

### 기본값 구성

```json
// .claude/settings.json
{
  "permissions": {
    "defaultMode": "plan"
  }
}
```

---

## 6. 테스트 작업하기

```text
find functions in NotificationsService.swift that are not covered by tests
add tests for the notification service
add test cases for edge conditions in the notification service
run the new tests and fix any failures
```

Claude는 프로젝트 기존 패턴(스타일, 프레임워크, 어설션 패턴)을 따르는 테스트를 생성합니다.

---

## 7. 풀 요청 만들기

```text
summarize the changes I've made to the authentication module
create a pr
enhance the PR description with more context about the security improvements
```

- `gh pr create` 사용 시 세션이 PR에 자동 연결
- `claude --from-pr <number>`로 재개 가능

---

## 8. 문서 처리하기

```text
find functions without proper JSDoc comments in the auth module
add JSDoc comments to the undocumented functions in auth.js
improve the generated documentation with more context and examples
check if the documentation follows our project standards
```

---

## 9. 이미지 작업하기

### 이미지 추가 방법

1. 드래그 앤 드롭
2. 복사 후 `Ctrl+V`로 붙여넣기 (cmd+v 아님)
3. 이미지 경로 제공: `Analyze this image: /path/to/your/image.png`

### 활용 예시

```text
What does this image show?
Here's a screenshot of the error. What's causing it?
Generate CSS to match this design mockup
```

> **팁**: `Cmd+Click` (Mac) / `Ctrl+Click` (Win/Linux)으로 이미지 뷰어에서 열기

---

## 10. 파일 및 디렉토리 참조하기 (`@` 구문)

```text
Explain the logic in @src/utils/auth.js         # 파일 참조
What's the structure of @src/components?          # 디렉토리 참조
Show me the data from @github:repos/owner/repo/issues  # MCP 리소스 참조
```

- 상대/절대 경로 모두 가능
- `@` 참조 시 해당 파일의 디렉토리 및 상위 디렉토리의 `CLAUDE.md` 자동 추가

---

## 11. 확장된 사고 (Thinking Mode)

확장된 사고는 **기본적으로 활성화**되어 있으며, 복잡한 문제를 단계별로 추론합니다.

### 구성 옵션

| 범위 | 구성 방법 | 세부 정보 |
|------|----------|----------|
| 노력 수준 | `/effort`, `/model`에서 조정, `CLAUDE_CODE_EFFORT_LEVEL` 설정 | Opus 4.6 및 Sonnet 4.6의 사고 깊이 제어 |
| `ultrathink` 키워드 | 프롬프트에 "ultrathink" 포함 | 해당 턴에서 노력을 높음으로 설정 |
| 토글 단축키 | `Option+T` (macOS) / `Alt+T` (Win/Linux) | 현재 세션에서 사고 켜기/끄기 |
| 전역 기본값 | `/config`에서 thinking mode 토글 | `~/.claude/settings.json`에 `alwaysThinkingEnabled`로 저장 |
| 토큰 예산 제한 | `MAX_THINKING_TOKENS` 환경 변수 | 예: `export MAX_THINKING_TOKENS=10000` |

- `Ctrl+O`: 자세한 모드 전환 (사고 과정 보기)
- 적응형 사고 비활성화: `CLAUDE_CODE_DISABLE_ADAPTIVE_THINKING=1`

> **참고**: "think", "think hard" 등의 구문은 사고 토큰을 할당하지 않습니다.

---

## 12. 이전 대화 재개하기

| 명령 | 기능 |
|------|------|
| `claude --continue` | 현재 디렉토리에서 가장 최근 대화 계속 |
| `claude --resume` | 대화 선택기 열기 또는 이름으로 재개 |
| `claude --from-pr 123` | 특정 PR에 연결된 세션 재개 |
| `/resume` | 활성 세션 내에서 다른 대화로 전환 |

### 세션 이름 지정

```bash
claude -n auth-refactor          # 시작 시 이름 지정
```

```text
/rename auth-refactor            # 세션 중 이름 변경
```

### 세션 선택기 단축키

| 단축키 | 작업 |
|--------|------|
| `↑`/`↓` | 세션 간 이동 |
| `→`/`←` | 그룹 확장/축소 |
| `Enter` | 세션 선택 |
| `P` | 미리보기 |
| `R` | 이름 바꾸기 |
| `/` | 검색 필터 |
| `A` | 현재 디렉토리/모든 프로젝트 전환 |
| `B` | 현재 git 분기로 필터 |
| `Esc` | 종료 |

---

## 13. Git Worktree를 사용한 병렬 세션

```bash
claude --worktree feature-auth    # 명명된 worktree에서 시작
claude --worktree bugfix-123      # 별도 worktree에서 시작
claude --worktree                 # 자동 이름 생성
```

- Worktree는 `<repo>/.claude/worktrees/<name>`에 생성
- `.claude/worktrees/`를 `.gitignore`에 추가 권장

### Subagent Worktree

- subagent frontmatter에 `isolation: worktree` 추가
- `"use worktrees for your agents"` 요청 가능

### 정리

- **변경사항 없음**: 자동 제거
- **변경사항 있음**: 유지/제거 선택 프롬프트

---

## 14. 알림 설정

`~/.claude/settings.json`에 `Notification` hook 추가:

**macOS:**
```json
{
  "hooks": {
    "Notification": [
      {
        "matcher": "",
        "hooks": [
          {
            "type": "command",
            "command": "osascript -e 'display notification \"Claude Code needs your attention\" with title \"Claude Code\"'"
          }
        ]
      }
    ]
  }
}
```

**Linux:**
```json
{
  "hooks": {
    "Notification": [
      {
        "matcher": "",
        "hooks": [
          {
            "type": "command",
            "command": "notify-send 'Claude Code' 'Claude Code needs your attention'"
          }
        ]
      }
    ]
  }
}
```

### Matcher 옵션

| Matcher | 발생 시기 |
|---------|----------|
| `permission_prompt` | 도구 사용 승인 요청 시 |
| `idle_prompt` | 완료 후 다음 프롬프트 대기 시 |
| `auth_success` | 인증 완료 시 |
| `elicitation_dialog` | 질문할 때 |

---

## 15. Unix 스타일 유틸리티로 사용하기

### 빌드 스크립트에 추가

```json
// package.json
{
  "scripts": {
    "lint:claude": "claude -p 'you are a linter. please look at the changes vs. main and report any issues related to typos...'"
  }
}
```

### 파이프 인/아웃

```bash
cat build-error.txt | claude -p 'concisely explain the root cause of this build error' > output.txt
```

### 출력 형식 제어

```bash
# 텍스트 (기본값)
cat data.txt | claude -p 'summarize this data' --output-format text > summary.txt

# JSON (메타데이터 포함)
cat code.py | claude -p 'analyze this code for bugs' --output-format json > analysis.json

# 스트리밍 JSON (실시간)
cat log.txt | claude -p 'parse this log file for errors' --output-format stream-json
```

---

## 16. Claude의 기능에 대해 물어보기

Claude는 자신의 문서에 기본 제공 액세스 권한을 가지고 있으며, 기능/제한사항에 대해 답변 가능합니다.

```text
can Claude Code create pull requests?
how does Claude Code handle permissions?
what skills are available?
how do I use MCP with Claude Code?
```
