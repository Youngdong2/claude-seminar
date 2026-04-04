# Claude를 Skills로 확장하기 (공식 문서)

- **출처**: Claude Code 공식 문서
- **링크**: https://code.claude.com/docs/ko/skills
- **관련 링크**:
  - [기본 제공 명령어 참조](https://code.claude.com/docs/ko/commands)
  - [Agent Skills 개방형 표준](https://agentskills.io)
  - [Subagents](https://code.claude.com/docs/ko/sub-agents)
  - [Subagent에 Skills 미리 로드](https://code.claude.com/docs/ko/sub-agents#preload-skills-into-subagents)
  - [Plugins](https://code.claude.com/docs/ko/plugins)
  - [Hooks](https://code.claude.com/docs/ko/hooks)
  - [Hooks - Skills 및 agents의 Hooks](https://code.claude.com/docs/ko/hooks#hooks-in-skills-and-agents)
  - [메모리 (CLAUDE.md)](https://code.claude.com/docs/ko/memory)
  - [권한](https://code.claude.com/docs/ko/permissions)
  - [설정 파일](https://code.claude.com/docs/ko/settings#settings-files)
  - [모델 구성 - 노력 수준](https://code.claude.com/docs/ko/model-config#adjust-effort-level)
  - [Git Worktree](https://code.claude.com/docs/ko/common-workflows#run-parallel-claude-code-sessions-with-git-worktrees)
  - [예약된 작업](https://code.claude.com/docs/ko/scheduled-tasks)
  - [추가 디렉토리에서 CLAUDE.md 로드](https://code.claude.com/docs/ko/memory#load-from-additional-directories)
  - [확장된 사고](https://code.claude.com/docs/ko/common-workflows#use-extended-thinking-thinking-mode)

---

## 개요

Skills는 Claude가 할 수 있는 작업을 확장합니다. `SKILL.md` 파일을 지침과 함께 생성하면 Claude가 이를 도구 모음에 추가합니다. Claude는 관련이 있을 때 자동 사용하거나 `/skill-name`으로 직접 호출할 수 있습니다.

> 사용자 정의 명령어가 skills로 병합되었습니다. `.claude/commands/deploy.md`와 `.claude/skills/deploy/SKILL.md` 모두 `/deploy`를 생성하며 동일하게 작동합니다.

Claude Code skills는 [Agent Skills](https://agentskills.io) 개방형 표준을 따릅니다.

---

## 번들 Skills

Claude Code와 함께 제공되는 기본 skills:

| Skill | 목적 |
|-------|------|
| `/batch <instruction>` | 코드베이스 전체에서 대규모 변경을 병렬로 조율. 5~30개 독립 단위로 분해, 각각 격리된 git worktree에서 실행, PR 생성 |
| `/claude-api` | 프로젝트 언어에 맞는 Claude API 참조 자료 로드 (Python, TS, Java, Go, Ruby, C#, PHP, cURL). `anthropic`/`@anthropic-ai/sdk`/`claude_agent_sdk` import 시 자동 활성화 |
| `/debug [description]` | 디버그 로깅 활성화 및 세션 디버그 로그 읽어 문제 해결 |
| `/loop [interval] <prompt>` | 프롬프트를 간격에 따라 반복 실행. 예: `/loop 5m check if the deploy finished` |
| `/simplify [focus]` | 최근 변경된 파일에서 코드 재사용/품질/효율성 검토 후 수정. 3개 검토 에이전트 병렬 생성 |

---

## 첫 번째 Skill 생성

### 1단계: Skill 디렉토리 생성

```bash
mkdir -p ~/.claude/skills/explain-code
```

### 2단계: SKILL.md 작성

`~/.claude/skills/explain-code/SKILL.md`:

```yaml
---
name: explain-code
description: Explains code with visual diagrams and analogies. Use when explaining how code works, teaching about a codebase, or when the user asks "how does this work?"
---

When explaining code, always include:

1. **Start with an analogy**: Compare the code to something from everyday life
2. **Draw a diagram**: Use ASCII art to show the flow, structure, or relationships
3. **Walk through the code**: Explain step-by-step what happens
4. **Highlight a gotcha**: What's a common mistake or misconception?

Keep explanations conversational. For complex concepts, use multiple analogies.
```

### 3단계: Skill 테스트

```text
How does this code work?       # Claude가 자동 호출
/explain-code src/auth/login.ts  # 직접 호출
```

---

## Skills 위치 및 우선순위

| 위치 | 경로 | 적용 대상 |
|------|------|----------|
| Enterprise | 관리 설정 참조 | 조직 모든 사용자 |
| Personal | `~/.claude/skills/<skill-name>/SKILL.md` | 모든 프로젝트 |
| Project | `.claude/skills/<skill-name>/SKILL.md` | 이 프로젝트만 |
| Plugin | `<plugin>/skills/<skill-name>/SKILL.md` | 플러그인 활성화된 위치 |

우선순위: **enterprise > personal > project**. Plugin skills는 `plugin-name:skill-name` 네임스페이스.

### Skill 디렉토리 구조

```text
my-skill/
├── SKILL.md           # 주요 지침 (필수)
├── template.md        # 템플릿
├── examples/
│   └── sample.md      # 예제 출력
└── scripts/
    └── validate.sh    # 실행 가능한 스크립트
```

---

## Skills 구성

### Frontmatter 참조

```yaml
---
name: my-skill
description: What this skill does
disable-model-invocation: true
allowed-tools: Read, Grep
---
```

| 필드 | 필수 | 설명 |
|------|------|------|
| `name` | 아니오 | 표시 이름 (생략 시 디렉토리 이름). 소문자, 숫자, 하이픈만 (최대 64자) |
| `description` | 권장 | 무엇을 하는지, 언제 사용할지. 생략 시 첫 단락 사용 |
| `argument-hint` | 아니오 | 자동 완성 중 힌트. 예: `[issue-number]` |
| `disable-model-invocation` | 아니오 | `true`: Claude 자동 로드 방지. 기본값: `false` |
| `user-invocable` | 아니오 | `false`: `/` 메뉴에서 숨김. 기본값: `true` |
| `allowed-tools` | 아니오 | Skill 활성화 시 승인 없이 사용 가능한 도구 |
| `model` | 아니오 | Skill 활성화 시 사용할 모델 |
| `effort` | 아니오 | 노력 수준: `low`, `medium`, `high`, `max` (Opus 4.6만) |
| `context` | 아니오 | `fork`: forked subagent 컨텍스트에서 실행 |
| `agent` | 아니오 | `context: fork` 시 사용할 subagent 유형 |
| `hooks` | 아니오 | Skill 라이프사이클에 범위 지정된 hooks |

### 문자열 치환

| 변수 | 설명 |
|------|------|
| `$ARGUMENTS` | 모든 인수 |
| `$ARGUMENTS[N]` / `$N` | N번째 인수 (0-based) |
| `${CLAUDE_SESSION_ID}` | 현재 세션 ID |
| `${CLAUDE_SKILL_DIR}` | Skill의 SKILL.md가 있는 디렉토리 |

### Skill 콘텐츠 유형

**참조 콘텐츠** (지식 추가):
```yaml
---
name: api-conventions
description: API design patterns for this codebase
---
When writing API endpoints:
- Use RESTful naming conventions
- Return consistent error formats
```

**작업 콘텐츠** (단계별 지침):
```yaml
---
name: deploy
description: Deploy the application to production
context: fork
disable-model-invocation: true
---
Deploy the application:
1. Run the test suite
2. Build the application
3. Push to the deployment target
```

---

## 호출 제어

| Frontmatter | 사용자 호출 | Claude 호출 | 컨텍스트 로드 시기 |
|-------------|----------|------------|---------------|
| (기본값) | O | O | 설명은 항상, 전체는 호출 시 |
| `disable-model-invocation: true` | O | X | 사용자 호출 시에만 |
| `user-invocable: false` | X | O | 설명은 항상, 전체는 호출 시 |

---

## 인수 전달

```yaml
---
name: fix-issue
description: Fix a GitHub issue
disable-model-invocation: true
---
Fix GitHub issue $ARGUMENTS following our coding standards.
```

`/fix-issue 123` -> "Fix GitHub issue 123 following our coding standards."

위치별 인수:
```yaml
---
name: migrate-component
description: Migrate a component from one framework to another
---
Migrate the $0 component from $1 to $2.
```

`/migrate-component SearchBar React Vue`

---

## 고급 패턴

### 동적 컨텍스트 주입 (`` !`<command>` ``)

Shell 명령을 실행하여 결과를 skill에 삽입:

```yaml
---
name: pr-summary
description: Summarize changes in a pull request
context: fork
agent: Explore
allowed-tools: Bash(gh *)
---

## Pull request context
- PR diff: !`gh pr diff`
- PR comments: !`gh pr view --comments`
- Changed files: !`gh pr diff --name-only`

## Your task
Summarize this pull request...
```

### Subagent에서 Skills 실행

`context: fork` 추가 시 격리된 subagent에서 실행:

```yaml
---
name: deep-research
description: Research a topic thoroughly
context: fork
agent: Explore
---
Research $ARGUMENTS thoroughly:
1. Find relevant files using Glob and Grep
2. Read and analyze the code
3. Summarize findings with specific file references
```

| 접근 방식 | 시스템 프롬프트 | 작업 | 추가 로드 |
|----------|------------|------|---------|
| `context: fork` Skill | 에이전트 유형에서 | SKILL.md 콘텐츠 | CLAUDE.md |
| `skills` 필드 Subagent | Subagent markdown 본문 | Claude의 위임 메시지 | 미리 로드된 skills + CLAUDE.md |

`agent` 옵션: `Explore`, `Plan`, `general-purpose` 또는 사용자 정의 subagent. 생략 시 `general-purpose`.

### 도구 액세스 제한

```yaml
---
name: safe-reader
description: Read files without making changes
allowed-tools: Read, Grep, Glob
---
```

### 지원 파일 추가

```text
my-skill/
├── SKILL.md (필수 - 개요/네비게이션)
├── reference.md (상세 API 문서)
├── examples.md (사용 예제)
└── scripts/
    └── helper.py (유틸리티 스크립트)
```

> SKILL.md를 500줄 이하로 유지. 상세 참조를 별도 파일로 이동.

### Claude의 Skill 액세스 제한

**모든 skills 비활성화:**
```text
# /permissions에서 deny 규칙에 추가:
Skill
```

**특정 skills 허용/거부:**
```text
Skill(commit)        # 정확한 일치
Skill(review-pr *)   # 접두사 일치
Skill(deploy *)      # 거부
```

### 시각적 출력 생성

Skills로 Python 스크립트를 번들하여 대화형 HTML 시각화 생성 가능:

```yaml
---
name: codebase-visualizer
description: Generate an interactive collapsible tree visualization
allowed-tools: Bash(python *)
---
# Codebase Visualizer
Run the visualization script from your project root:
```bash
python ~/.claude/skills/codebase-visualizer/scripts/visualize.py .
```
```

---

## Skills 공유

- **프로젝트 skills**: `.claude/skills/`를 버전 제어에 커밋
- **플러그인**: 플러그인의 `skills/` 디렉토리에 생성
- **관리**: 관리 설정을 통해 조직 전체 배포

---

## 문제 해결

### Skill이 트리거되지 않음

1. 설명에 사용자가 자연스럽게 말할 키워드 포함 확인
2. `What skills are available?`에 나타나는지 확인
3. 요청을 설명에 맞게 재표현
4. `/skill-name`으로 직접 호출

### Skill이 너무 자주 트리거됨

1. 설명을 더 구체적으로
2. `disable-model-invocation: true` 추가

### Claude가 모든 Skills를 보지 못함

- Skill 설명이 컨텍스트 윈도우의 2%를 초과하면 예산 초과 가능
- `/context`로 제외된 skills 확인
- `SLASH_COMMAND_TOOL_CHAR_BUDGET` 환경 변수로 제한 재정의
