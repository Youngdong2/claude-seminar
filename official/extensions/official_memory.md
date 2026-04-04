# Claude가 프로젝트를 기억하는 방법 (공식 문서)

- **출처**: Claude Code 공식 문서
- **링크**: https://code.claude.com/docs/ko/memory
- **관련 링크**:
  - [Skills](https://code.claude.com/docs/ko/skills)
  - [설정](https://code.claude.com/docs/ko/settings)
  - [설정 파일](https://code.claude.com/docs/ko/settings#settings-files)
  - [세션 관리](https://code.claude.com/docs/ko/sessions)
  - [Subagent 메모리](https://code.claude.com/docs/ko/sub-agents#enable-persistent-memory)
  - [Subagent 구성](https://code.claude.com/docs/ko/sub-agents#enable-persistent-memory)
  - [권한 - 관리 설정](https://code.claude.com/docs/ko/permissions#managed-settings)
  - [Hooks - InstructionsLoaded](https://code.claude.com/docs/ko/hooks#instructionsloaded)
  - [CLI 참조 - 시스템 프롬프트 플래그](https://code.claude.com/docs/ko/cli-reference#system-prompt-flags)

---

## CLAUDE.md vs 자동 메모리

Claude Code에는 두 가지 상호 보완적인 메모리 시스템이 있습니다.

| | CLAUDE.md 파일 | 자동 메모리 |
|---|---|---|
| **작성자** | 사용자 | Claude |
| **포함 내용** | 지침 및 규칙 | 학습 및 패턴 |
| **범위** | 프로젝트, 사용자 또는 조직 | 작업 트리당 |
| **로드 대상** | 모든 세션 | 모든 세션 (처음 200줄) |
| **사용 목적** | 코딩 표준, 워크플로우, 프로젝트 아키텍처 | 빌드 명령, 디버깅 인사이트, 선호도 |

---

## CLAUDE.md 파일

### 배치 위치 및 범위

| 범위 | 위치 | 목적 | 공유 대상 |
|------|------|------|----------|
| **관리 정책** | macOS: `/Library/Application Support/ClaudeCode/CLAUDE.md`<br/>Linux/WSL: `/etc/claude-code/CLAUDE.md`<br/>Windows: `C:\Program Files\ClaudeCode\CLAUDE.md` | IT/DevOps 관리 조직 전체 지침 | 조직 모든 사용자 |
| **프로젝트 지침** | `./CLAUDE.md` 또는 `./.claude/CLAUDE.md` | 팀 공유 지침 | 소스 제어를 통한 팀 |
| **사용자 지침** | `~/.claude/CLAUDE.md` | 개인 선호도 | 본인만 (모든 프로젝트) |

> `/init`을 실행하여 시작 CLAUDE.md를 자동 생성. `CLAUDE_CODE_NEW_INIT=true` 설정 시 대화형 다단계 흐름 활성화.

### 효과적인 지침 작성

- **크기**: CLAUDE.md 파일당 200줄 이하
- **구조**: 마크다운 헤더와 글머리 기호로 관련 지침 그룹화
- **구체성**: 검증 가능한 수준으로 작성
  - "2칸 들여쓰기 사용" (O) vs "코드를 제대로 포맷합니다" (X)
  - "커밋하기 전에 `npm test` 실행" (O) vs "변경 사항을 테스트합니다" (X)
- **일관성**: 충돌하는 지침 정기적으로 검토/제거

### 추가 파일 가져오기 (`@path`)

```text
프로젝트 개요는 @README를 참조하고 이 프로젝트의 사용 가능한 npm 명령은 @package.json을 참조합니다.

# 추가 지침
- git 워크플로우 @docs/git-instructions.md
```

- 상대/절대 경로 모두 허용 (가져오기 포함 파일 기준으로 해석)
- 최대 5개 홉 깊이까지 재귀적 가져오기 가능
- 개인 선호도: `@~/.claude/my-project-instructions.md`

> 외부 가져오기를 처음 만나면 승인 대화 표시. 거부 시 비활성화 유지.

### AGENTS.md 연동

Claude Code는 `CLAUDE.md`를 읽으며 `AGENTS.md`를 읽지 않습니다. 다른 코딩 에이전트와 공유하려면:

```markdown
# CLAUDE.md
@AGENTS.md

## Claude Code
`src/billing/` 아래의 변경 사항에 대해 plan mode를 사용합니다.
```

### CLAUDE.md 파일 로드 방식

- 작업 디렉토리에서 루트까지 디렉토리 트리를 따라 올라가며 모든 CLAUDE.md 읽기
- 하위 디렉토리의 CLAUDE.md는 해당 디렉토리 파일을 읽을 때 포함
- 블록 수준 HTML 주석(`<!-- -->`)은 주입 전 제거 (토큰 비소비)
- `--add-dir` 사용 시: `CLAUDE_CODE_ADDITIONAL_DIRECTORIES_CLAUDE_MD=1` 설정으로 CLAUDE.md 로드

### 특정 CLAUDE.md 파일 제외 (`claudeMdExcludes`)

```json
// .claude/settings.local.json
{
  "claudeMdExcludes": [
    "**/monorepo/CLAUDE.md",
    "/home/user/monorepo/other-team/.claude/rules/**"
  ]
}
```

> 관리 정책 CLAUDE.md 파일은 제외 불가

---

## `.claude/rules/`로 규칙 구성

### 디렉토리 구조

```text
your-project/
├── .claude/
│   ├── CLAUDE.md           # 주 프로젝트 지침
│   └── rules/
│       ├── code-style.md   # 코드 스타일
│       ├── testing.md      # 테스트 규칙
│       └── security.md     # 보안 요구사항
```

### 경로별 규칙 (Path-specific Rules)

YAML frontmatter의 `paths` 필드로 특정 파일에 규칙 범위 지정:

```markdown
---
paths:
  - "src/api/**/*.ts"
---

# API 개발 규칙
- 모든 API 엔드포인트는 입력 검증을 포함해야 합니다
- 표준 오류 응답 형식을 사용합니다
```

### Glob 패턴 예시

| 패턴 | 일치 |
|------|------|
| `**/*.ts` | 모든 디렉토리의 TypeScript 파일 |
| `src/**/*` | `src/` 아래 모든 파일 |
| `*.md` | 프로젝트 루트의 마크다운 파일 |
| `src/components/*.tsx` | 특정 디렉토리의 React 컴포넌트 |

중괄호 확장 지원:
```markdown
---
paths:
  - "src/**/*.{ts,tsx}"
  - "lib/**/*.ts"
  - "tests/**/*.test.ts"
---
```

### 심볼릭 링크로 프로젝트 간 규칙 공유

```bash
ln -s ~/shared-claude-rules .claude/rules/shared
ln -s ~/company-standards/security.md .claude/rules/security.md
```

### 사용자 수준 규칙

`~/.claude/rules/`에 개인 규칙 배치 (모든 프로젝트에 적용):

```text
~/.claude/rules/
├── preferences.md    # 개인 코딩 선호도
└── workflows.md      # 선호하는 워크플로우
```

---

## 대규모 팀을 위한 CLAUDE.md 관리

### 조직 전체 배포

관리 정책 위치에 파일 생성 후 MDM/그룹 정책/Ansible 등으로 배포.

### 관리 설정 vs CLAUDE.md

| 관심사 | 구성 대상 |
|--------|----------|
| 도구/명령/파일 경로 차단 | 관리 설정: `permissions.deny` |
| 샌드박스 격리 강제 | 관리 설정: `sandbox.enabled` |
| 환경 변수/API 공급자 라우팅 | 관리 설정: `env` |
| 인증 방법/조직 잠금 | 관리 설정: `forceLoginMethod`, `forceLoginOrgUUID` |
| 코드 스타일/품질 가이드라인 | 관리 CLAUDE.md |
| 데이터 처리/규정 준수 알림 | 관리 CLAUDE.md |
| Claude의 행동 지침 | 관리 CLAUDE.md |

---

## 자동 메모리

Claude가 작업 중 자동으로 세션 간 지식을 축적합니다 (빌드 명령, 디버깅 인사이트, 아키텍처 노트, 코드 스타일 선호도 등).

> Claude Code v2.1.59 이상 필요

### 활성화/비활성화

- 세션에서 `/memory` 실행 후 토글 사용
- 설정: `"autoMemoryEnabled": false`
- 환경 변수: `CLAUDE_CODE_DISABLE_AUTO_MEMORY=1`

### 저장소 위치

```text
~/.claude/projects/<project>/memory/
├── MEMORY.md          # 간결한 인덱스 (모든 세션에 로드)
├── debugging.md       # 디버깅 패턴
├── api-conventions.md # API 설계 결정
└── ...
```

- git 저장소에서 파생 -> 동일 저장소의 모든 worktree/하위 디렉토리가 공유
- 사용자 정의 위치: `"autoMemoryDirectory": "~/my-custom-memory-dir"` (프로젝트 설정에서는 불허)

### 작동 방식

- `MEMORY.md`의 **처음 200줄**만 세션 시작 시 로드
- 주제 파일은 시작 시 로드되지 않고 필요 시 읽기
- Claude가 "Writing memory" / "Recalled memory" 표시 시 활발히 업데이트/읽기 중

### 감사 및 편집

- 자동 메모리 파일은 일반 마크다운 -> 언제든 편집/삭제 가능
- `/memory` 명령으로 세션 내에서 찾아보기 및 열기

---

## `/memory` 명령

- 현재 세션에 로드된 모든 CLAUDE.md 및 규칙 파일 나열
- 자동 메모리 켜기/끄기
- 자동 메모리 폴더 열기 링크 제공
- 파일 선택 시 편집기에서 열기

---

## 문제 해결

### Claude가 CLAUDE.md를 따르지 않을 때

1. `/memory`로 파일 로드 여부 확인
2. 올바른 위치에 있는지 확인
3. 지침을 더 구체적으로 작성
4. 충돌하는 지침 찾기
5. 시스템 프롬프트 수준 지침: `--append-system-prompt` 사용
6. `InstructionsLoaded` hook으로 로드된 파일 추적

### 자동 메모리 저장 내용 확인

- `/memory` 실행 -> 자동 메모리 폴더 선택

### CLAUDE.md가 너무 클 때

- `@path` 가져오기로 별도 파일 분리
- `.claude/rules/` 파일로 분할

### `/compact` 후 지침 손실

- CLAUDE.md는 압축을 완전히 생존 (디스크에서 다시 읽어 재주입)
- 대화에서만 제공된 지침은 사라짐 -> CLAUDE.md에 추가 필요
