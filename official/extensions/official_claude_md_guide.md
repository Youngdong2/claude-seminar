# CLAUDE.md 공식 심층 가이드 (Write an effective CLAUDE.md)

- **1차 출처**: Claude Code 공식 문서 — Best Practices (https://code.claude.com/docs/en/best-practices)
- **2차 출처**: Claude Code 공식 문서 — Memory (https://code.claude.com/docs/en/memory)
- **수집일**: 2026-04-05
- **수집 목적**: 섹션 4 "하네스 & 컨텍스트 엔지니어링"의 CLAUDE.md 파트 보강용
- **비고**: 기존 `official_memory.md`가 한국어 공식 문서 기반이라면, 이 문서는 영문 공식 문서의 추가 내용(한국어판에 없거나 축약된 부분)과 Best Practices 문서의 CLAUDE.md 섹션을 통합한 심층판이다.

---

## 1. CLAUDE.md란 무엇인가

> "CLAUDE.md is a special file that Claude reads at the start of every conversation. Include Bash commands, code style, and workflow rules. This gives Claude persistent context it can't infer from code alone."
> — Claude Code Best Practices

핵심 포인트:
- **매 세션 시작마다 자동 로드**되는 특별한 파일
- 모델이 코드만 읽어서는 알 수 없는 **영속적(persistent) 컨텍스트**를 주입하는 통로
- 시스템 프롬프트가 아닌 **"system prompt 다음에 오는 user message"** 로 전달됨 → 지시의 엄격한 강제는 불가능, 컨텍스트(지침)로만 작용

> "CLAUDE.md content is delivered as a user message after the system prompt, not as part of the system prompt itself. Claude reads it and tries to follow it, but there's no guarantee of strict compliance, especially for vague or conflicting instructions."
> — Memory 공식 문서

### CLAUDE.md vs 자동 메모리 — 상호보완 관계

| | CLAUDE.md | Auto Memory |
|---|---|---|
| **작성자** | 사람 | Claude |
| **내용** | 지침과 규칙 | 학습과 패턴 |
| **범위** | 프로젝트 / 사용자 / 조직 | 작업 트리(worktree)당 |
| **로드 대상** | 매 세션 전체 로드 | 매 세션 (MEMORY.md 첫 200줄 또는 25KB) |
| **용도** | 코딩 표준, 워크플로우, 프로젝트 아키텍처 | 빌드 명령, 디버깅 인사이트, 사용자 선호도 |

> "Use CLAUDE.md files when you want to guide Claude's behavior. Auto memory lets Claude learn from your corrections without manual effort."

---

## 2. 어디에 두는가 — 배치 위치와 우선순위

Claude Code는 5가지 위치에서 CLAUDE.md를 읽는다. **더 구체적인 위치가 더 광범위한 위치보다 우선**한다.

| 범위 | 위치 | 용도 | 공유 대상 |
|------|------|------|----------|
| **관리 정책 (Managed Policy)** | macOS: `/Library/Application Support/ClaudeCode/CLAUDE.md`<br>Linux/WSL: `/etc/claude-code/CLAUDE.md`<br>Windows: `C:\Program Files\ClaudeCode\CLAUDE.md` | 조직 전체 정책 — IT/DevOps가 관리 | 조직의 모든 사용자 |
| **프로젝트 지침** | `./CLAUDE.md` 또는 `./.claude/CLAUDE.md` | 팀 공유 지침 | 소스 제어를 통한 팀 |
| **사용자 지침** | `~/.claude/CLAUDE.md` | 개인 선호도 (모든 프로젝트) | 본인만 |
| **로컬 지침** | `./CLAUDE.local.md` | 프로젝트별 개인 메모 — **`.gitignore`에 추가** | 본인만 (현재 프로젝트) |
| **모노레포 상위** | 작업 디렉토리보다 위쪽의 `CLAUDE.md` | 상위 컨텍스트 상속 | 해당 디렉토리 이용자 |

> **CLAUDE.local.md 주의**: worktree를 여러 개 쓰는 경우, `CLAUDE.local.md`는 생성한 worktree에만 존재한다. 여러 worktree에 공유하려면 홈 디렉토리의 파일을 `@~/.claude/my-project-instructions.md`로 import 하는 게 낫다.

### 로드 방식 상세 (How CLAUDE.md files load)

1. **트리 워킹 (launch 시 전체 로드)**: 현재 작업 디렉토리에서 루트까지 올라가며 각 디렉토리의 `CLAUDE.md`와 `CLAUDE.local.md`를 모두 **전부** 로드한다. 예: `foo/bar/`에서 실행하면 `foo/bar/CLAUDE.md`, `foo/CLAUDE.md` 모두 로드.
2. **하위 디렉토리 (lazy load)**: 서브디렉토리의 `CLAUDE.md`는 **launch 시가 아니라** 해당 디렉토리의 파일을 읽을 때 로드된다.
3. **병합 방식**: 발견된 모든 파일을 **concatenate**한다(덮어쓰기가 아님). 같은 디렉토리에서 `CLAUDE.local.md`는 `CLAUDE.md` 뒤에 붙는다 → 충돌 시 로컬 파일이 마지막에 읽힘.
4. **HTML 주석 제거**: 블록 수준 `<!-- ... -->` 주석은 컨텍스트 주입 전에 제거 → 토큰 소비 없이 유지보수자용 메모 작성 가능. 단, 코드 블록 내부 주석은 보존됨.
5. **`--add-dir` 디렉토리**: 기본값은 CLAUDE.md 비로드. 환경 변수 `CLAUDE_CODE_ADDITIONAL_DIRECTORIES_CLAUDE_MD=1` 설정 시에만 로드 (단, `CLAUDE.local.md`는 여전히 제외).

---

## 3. 무엇을 쓰는가 — Include / Exclude 표

Anthropic이 공식 best practices에서 제시한 포함/제외 기준:

| ✅ 포함해야 할 것 | ❌ 제외해야 할 것 |
|---|---|
| Claude가 추측할 수 없는 Bash 명령 | Claude가 코드만 읽어도 알 수 있는 것 |
| 기본값과 다른 코드 스타일 규칙 | Claude가 이미 아는 표준 언어 컨벤션 |
| 테스트 실행법 및 선호 테스트 러너 | 상세 API 문서 (대신 링크 걸기) |
| 저장소 에티켓 (브랜치명, PR 규칙) | 자주 바뀌는 정보 |
| 프로젝트 고유 아키텍처 결정 | 긴 설명이나 튜토리얼 |
| 개발 환경 특이사항 (필수 env var 등) | 파일 하나하나를 묘사하는 내용 |
| 일반적이지 않은(non-obvious) gotcha | "깨끗한 코드 작성" 같은 자명한 원칙 |

### 간결성 원칙 — "한 줄 삭제 테스트"

> "Keep it concise. For each line, ask: 'Would removing this cause Claude to make mistakes?' If not, cut it. Bloated CLAUDE.md files cause Claude to ignore your actual instructions!"
> — Claude Code Best Practices

**각 줄마다 "이 줄을 지우면 Claude가 실수할까?"를 물어본다. 아니라면 삭제한다.** 비대한 CLAUDE.md는 Claude가 진짜 중요한 지시를 무시하게 만든다.

### 크기 가이드라인

- **목표**: 파일당 200줄 이하
- **근거**: 더 긴 파일은 더 많은 컨텍스트를 소비하고 준수율이 떨어진다
- **초과 시**: `@path` import로 쪼개거나 `.claude/rules/`로 분할

### 구조 원칙

- **마크다운 헤더와 불릿**으로 관련 지침을 그룹화
- Claude는 독자와 같은 방식으로 구조를 스캔 — 조직된 섹션이 빽빽한 문단보다 낫다

### 구체성 원칙 — 검증 가능한 수준으로

> "Write instructions that are concrete enough to verify."

- ✅ "2-space indentation 사용" vs ❌ "코드를 제대로 포맷하세요"
- ✅ "커밋 전 `npm test` 실행" vs ❌ "변경 사항을 테스트하세요"
- ✅ "API 핸들러는 `src/api/handlers/`에 위치" vs ❌ "파일을 잘 정리하세요"

### 일관성 원칙

> "If two rules contradict each other, Claude may pick one arbitrarily."

- 서로 모순되는 규칙이 있으면 Claude가 **임의로** 하나를 고른다
- CLAUDE.md 파일들, 하위 디렉토리 CLAUDE.md, `.claude/rules/`를 **정기적으로 리뷰**해서 오래되거나 충돌하는 지침 제거
- 모노레포에서는 `claudeMdExcludes`로 다른 팀 CLAUDE.md 제외

### 강조 표현 — "IMPORTANT" / "YOU MUST"

> "You can tune instructions by adding emphasis (e.g., 'IMPORTANT' or 'YOU MUST') to improve adherence."

강조 표현을 추가하면 준수율이 올라간다. 단, 모든 규칙에 붙이면 강조 자체가 무의미해진다.

---

## 4. 표준 예시 (공식 문서 발췌)

```markdown
# Code style
- Use ES modules (import/export) syntax, not CommonJS (require)
- Destructure imports when possible (eg. import { foo } from 'bar')

# Workflow
- Be sure to typecheck when you're done making a series of code changes
- Prefer running single tests, and not the whole test suite, for performance
```

**핵심 관찰**:
- 짧다 (10줄 미만)
- 사람이 읽기 편하다 (human-readable)
- 구체적이다 ("ES modules" vs "모던 JS", "typecheck" vs "검증")
- "왜"가 없는데도 작동한다 — 규칙 자체가 모호하지 않으면 이유가 필수는 아님

---

## 5. `@path` import 문법

CLAUDE.md는 다른 파일을 `@path/to/import`로 가져올 수 있다. import된 파일은 CLAUDE.md와 함께 launch 시 **전부 로드**된다.

```markdown
See @README for project overview and @package.json for available npm commands for this project.

# Additional Instructions
- git workflow @docs/git-instructions.md
- Personal overrides: @~/.claude/my-project-instructions.md
```

### Import 규칙

- **상대경로/절대경로 모두** 허용 — 상대경로는 "import를 포함한 파일 기준"으로 해석 (작업 디렉토리 기준 아님!)
- **재귀 import 가능** — 최대 5홉 깊이까지
- **개인 오버라이드**: 홈 디렉토리 파일을 import하면 worktree 간 공유 가능
- **첫 외부 import 시 승인 다이얼로그**: 거부하면 비활성화 상태로 유지, 다이얼로그 재표시 없음

---

## 6. AGENTS.md 연동

Claude Code는 **CLAUDE.md만 읽고 AGENTS.md는 읽지 않는다**. 다른 코딩 에이전트와 지침을 공유하려면 CLAUDE.md에서 AGENTS.md를 import한다.

```markdown
# CLAUDE.md
@AGENTS.md

## Claude Code
Use plan mode for changes under `src/billing/`.
```

→ AGENTS.md를 세션 시작 시 로드하고, 그 뒤에 Claude 전용 섹션을 append.

---

## 7. `.claude/rules/` — 규칙을 모듈화

대규모 프로젝트에서는 CLAUDE.md를 비대하게 만들지 말고, `.claude/rules/`로 규칙을 쪼갠다.

### 디렉토리 구조

```text
your-project/
├── .claude/
│   ├── CLAUDE.md           # 주 프로젝트 지침
│   └── rules/
│       ├── code-style.md   # 코드 스타일 가이드
│       ├── testing.md      # 테스트 컨벤션
│       └── security.md     # 보안 요구사항
```

- 모든 `.md` 파일이 재귀적으로 발견됨 → `frontend/`, `backend/` 등 서브디렉토리 구성 가능
- `paths` frontmatter 없는 규칙은 `.claude/CLAUDE.md`와 **동일한 우선순위로 launch 시 로드**

### 경로별 규칙 (Path-specific Rules) — YAML frontmatter

특정 파일 패턴에만 적용되는 규칙은 YAML frontmatter의 `paths` 필드로 범위를 지정한다.

```markdown
---
paths:
  - "src/api/**/*.ts"
---

# API Development Rules
- 모든 API 엔드포인트는 입력 검증을 포함해야 합니다
- 표준 오류 응답 형식을 사용합니다
- OpenAPI 문서 주석을 포함합니다
```

**중요 포인트**:
- `paths` 없는 규칙은 **무조건 로드** (전체 파일에 적용)
- `paths` 있는 규칙은 Claude가 매칭되는 파일을 **읽을 때만** 트리거 (모든 도구 사용마다 X)
- **글롭 패턴** 지원: `**/*.ts`, `src/**/*`, `src/components/*.tsx`
- **중괄호 확장** 지원: `src/**/*.{ts,tsx}`

### 심볼릭 링크로 프로젝트 간 규칙 공유

```bash
ln -s ~/shared-claude-rules .claude/rules/shared
ln -s ~/company-standards/security.md .claude/rules/security.md
```

- 심볼릭 링크 해결되어 정상 로드
- 순환 심볼릭 링크는 감지되어 우아하게 처리됨

### 사용자 수준 규칙 (`~/.claude/rules/`)

```text
~/.claude/rules/
├── preferences.md    # 개인 코딩 선호도
└── workflows.md      # 선호하는 워크플로우
```

- 모든 프로젝트에 적용
- **사용자 수준 규칙이 프로젝트 규칙보다 먼저 로드** → 프로젝트 규칙이 더 높은 우선순위

### Rules vs Skills — 언제 어느 쪽을 쓰나

> "Rules load into context every session or when matching files are opened. For task-specific instructions that don't need to be in context all the time, use skills instead, which only load when you invoke them or when Claude determines they're relevant to your prompt."

- **Rules**: "항상" 또는 "특정 파일 읽을 때마다" 적용되는 지침 → 컨텍스트에 상주
- **Skills**: 필요할 때만 호출되는 태스크 지향 지침 → 점진적 공개(progressive disclosure)

---

## 8. 대규모 팀 관리

### 조직 전체 CLAUDE.md 배포

관리 정책 위치(`/Library/Application Support/ClaudeCode/CLAUDE.md` 등)에 파일 생성 후, MDM/그룹 정책/Ansible로 배포. **이 파일은 개인 설정으로 제외할 수 없다** — 조직 지침이 항상 적용된다.

### 관리 설정 vs 관리 CLAUDE.md — 역할 분리

| 관심사 | 구성 위치 |
|--------|----------|
| 특정 도구/명령/파일 경로 차단 | 관리 설정: `permissions.deny` |
| 샌드박스 격리 강제 | 관리 설정: `sandbox.enabled` |
| 환경 변수/API 공급자 라우팅 | 관리 설정: `env` |
| 인증 방법/조직 잠금 | 관리 설정: `forceLoginMethod`, `forceLoginOrgUUID` |
| 코드 스타일/품질 가이드 | 관리 CLAUDE.md |
| 데이터 처리/규정 준수 알림 | 관리 CLAUDE.md |
| Claude의 행동 지침 | 관리 CLAUDE.md |

**핵심 차이**:
- **설정(Settings)**: 기술적 강제 — 클라이언트가 Claude의 의도와 무관하게 enforce
- **CLAUDE.md**: 행동 지침 — Claude의 동작을 "유도"하되 hard enforcement 아님

### `claudeMdExcludes` — 특정 CLAUDE.md 제외

모노레포에서 관련 없는 다른 팀의 CLAUDE.md가 로드되는 문제를 해결.

```json
// .claude/settings.local.json
{
  "claudeMdExcludes": [
    "**/monorepo/CLAUDE.md",
    "/home/user/monorepo/other-team/.claude/rules/**"
  ]
}
```

- 절대 경로에 대해 글롭 매칭
- 설정 레이어 어디서든 구성 가능 (user/project/local/managed)
- 배열은 레이어 간 merge됨
- **관리 정책 CLAUDE.md는 제외 불가** — 조직 지침은 항상 우선

---

## 9. `/memory` 명령어

세션 내에서 CLAUDE.md 관련 모든 작업의 진입점.

- 현재 세션에 로드된 모든 `CLAUDE.md`, `CLAUDE.local.md`, rules 파일 **나열**
- 자동 메모리 켜기/끄기 토글
- 자동 메모리 폴더 열기 링크 제공
- 파일 선택 시 편집기에서 열기

**유용한 패턴**:
- "Claude에게 기억시켜줘"라고 말하면 Claude는 **자동 메모리**에 저장
- CLAUDE.md에 추가하려면 명시적으로 "add this to CLAUDE.md"라고 말하거나 `/memory`에서 직접 편집

---

## 10. 문제 해결 (Troubleshooting)

### Claude가 CLAUDE.md를 따르지 않을 때

1. `/memory`로 **파일 로드 여부 확인** — 목록에 없으면 Claude는 볼 수 없음
2. 올바른 위치에 있는지 확인 (섹션 2의 배치 표 참조)
3. 지침을 **더 구체적으로** 작성 ("2-space indentation" > "포맷 잘 해")
4. **충돌하는 지침** 찾기 — 여러 CLAUDE.md 간 모순이 있으면 Claude가 임의 선택
5. 시스템 프롬프트 수준 지침이 필요하면 **`--append-system-prompt`** 사용 (매 호출마다 전달 필요, 스크립트/자동화에 적합)
6. `InstructionsLoaded` hook으로 **로드된 파일 추적** — path-specific rules나 lazy-loaded 파일 디버깅에 유용

### CLAUDE.md가 너무 클 때

- `@path` import로 별도 파일로 분리
- `.claude/rules/` 파일로 분할
- Progressive disclosure 원칙 적용 — 필요한 것만 로드되게

### `/compact` 후 지침이 사라진 것 같을 때

> "CLAUDE.md fully survives compaction. After `/compact`, Claude re-reads your CLAUDE.md from disk and re-injects it fresh into the session."

- **CLAUDE.md는 `/compact`를 완전히 생존한다** — 디스크에서 다시 읽어 재주입
- 압축 후 지침이 사라졌다면, 그 지침은 **대화에서만** 주어진 것 → CLAUDE.md에 추가해야 영속화

### 자동 메모리가 무엇을 저장했는지 확인

- `/memory` 실행 → 자동 메모리 폴더 선택 → 일반 마크다운으로 읽기/편집/삭제

---

## 11. 컨텍스트 윈도우와의 관계 — 왜 짧게 유지해야 하는가

> "Most best practices are based on one constraint: Claude's context window fills up fast, and performance degrades as it fills."

- CLAUDE.md는 **매 세션 시작 시** 컨텍스트 윈도우에 로드 → 대화와 토큰 예산을 공유
- 긴 CLAUDE.md = 실제 작업 컨텍스트를 위한 공간 감소 + 준수율 감소
- **컨텍스트 윈도우 시각화**: https://code.claude.com/docs/en/context-window 에서 startup 컨텍스트에서 CLAUDE.md가 차지하는 위치를 확인 가능

### CLAUDE.md를 "코드처럼" 관리하기

> "Treat CLAUDE.md like code: review it when things go wrong, prune it regularly, and test changes by observing whether Claude's behavior actually shifts."

- 뭔가 잘못될 때 **리뷰** (review when things go wrong)
- 정기적으로 **가지치기** (prune regularly)
- 변경사항을 **Claude 동작 관찰로 테스트** (test changes by observing)

### 디버깅 휴리스틱

> "If Claude keeps doing something you don't want despite having a rule against it, the file is probably too long and the rule is getting lost."

→ **규칙이 있는데도 지키지 않는다 = 파일이 너무 길어서 규칙이 묻혔다**

> "If Claude asks you questions that are answered in CLAUDE.md, the phrasing might be ambiguous."

→ **CLAUDE.md에 있는 내용을 Claude가 물어본다 = 표현이 모호하다**

---

## 12. 섹션 4 발표에 활용할 핵심 인용구 (원문)

1. **정의**: "CLAUDE.md is a special file that Claude reads at the start of every conversation."
2. **전달 방식**: "CLAUDE.md content is delivered as a user message after the system prompt, not as part of the system prompt itself. Claude reads it and tries to follow it, but there's no guarantee of strict compliance."
3. **한 줄 삭제 테스트**: "For each line, ask: 'Would removing this cause Claude to make mistakes?' If not, cut it."
4. **비대 경고**: "Bloated CLAUDE.md files cause Claude to ignore your actual instructions!"
5. **코드처럼**: "Treat CLAUDE.md like code: review it when things go wrong, prune it regularly, and test changes by observing whether Claude's behavior actually shifts."
6. **컴팩션 생존**: "CLAUDE.md fully survives compaction. After `/compact`, Claude re-reads your CLAUDE.md from disk and re-injects it fresh."
7. **컨텍스트 원칙**: "Claude treats them as context, not enforced configuration. The more specific and concise your instructions, the more consistently Claude follows them."

---

## 13. 한국어 공식 문서(official_memory.md)와의 차이점

이 문서에만 있는 내용 (영문 공식 문서 + best practices 블로그 기반):

- `CLAUDE.local.md` (gitignore용 개인 프로젝트 노트) 정의 및 worktree 주의사항
- **로드 방식의 정확한 동작**: 트리 워킹 + lazy loading + concatenate (덮어쓰기 X)
- **"user message after system prompt"** 전달 방식 — 왜 엄격한 강제가 불가능한지
- **`autoMemoryDirectory`가 프로젝트 설정에서 불허**되는 보안 이유 (shared project가 sensitive 위치로 리다이렉트 방지)
- **MEMORY.md의 "25KB 또는 200줄 중 먼저 도달하는 쪽"** 제한
- **Best Practices의 Include/Exclude 표** (14개 항목)
- **"한 줄 삭제 테스트"** 원칙
- **"IMPORTANT / YOU MUST"** 강조 팁
- **`InstructionsLoaded` hook** 디버깅 활용법
- **`/compact` 생존** 메커니즘의 정확한 설명 ("디스크에서 다시 읽어 재주입")
- **디버깅 휴리스틱 2개** (규칙 무시 = 파일 길이 문제 / 되묻기 = 표현 모호)
