# TDD/SDD 실전 예시 모음 (Claude Code 발표용)

> 목적: "Claude Code로 TDD/SDD를 실천하는 방법"을 청중이 체감할 수 있는 **구체 예시** 모음.
> 추상적 설명 대신 "이 사람은 이렇게 썼다" 형태로 수집.

---

## 1. alexop.dev — Vue 프로젝트에 3단계 강제 TDD 스킬 (가장 실전적)

출처: https://alexop.dev/posts/custom-tdd-workflow-claude-code-vue/

### 구조
`skills → subagents → hooks` 3층 구조로 TDD를 **기계적으로 강제**한다.

### `.claude/skills/tdd-integration/skill.md` (스킬)
핵심 규칙 원문:
> "Every new feature MUST follow this strict 3-phase cycle. Do NOT skip phases."

- 🔴 RED: 테스트 작성 서브에이전트가 실패하는 테스트 작성 → 실패 확인 전까진 블록
- 🟢 GREEN: 구현 서브에이전트가 테스트를 통과시키는 최소 코드 작성 → 통과 전까진 블록
- 🔵 REFACTOR: 리팩터 서브에이전트가 개선 여부 판단

트리거 문구: "implement", "add feature", "build", "create functionality" → 자동 활성화.

### 서브에이전트 3종 (`.claude/agents/*.md`)
- `tdd-test-writer.md` — 도구: Read/Glob/Grep/Write/Edit/Bash. 규칙: **"Test MUST fail when run - verify before returning"**
- `tdd-implementer.md` — 원칙: **"Minimal: Write only what the test requires"**
- `tdd-refactorer.md` — 중복/재사용성 있으면 리팩터, 이미 깨끗하면 스킵

### 훅 (`.claude/settings.json`)
```json
{
  "hooks": {
    "UserPromptSubmit": [{
      "matcher": "",
      "hooks": [{
        "type": "command",
        "command": "npx tsx \"$CLAUDE_PROJECT_DIR/.claude/hooks/user-prompt-skill-eval.ts\""
      }]
    }]
  }
}
```
훅이 매 프롬프트마다 "스킬 평가 → 활성화 → 실행" 3단계를 강제 주입. 저자 측정: 스킬 발동률 **20% → 84%**.

### 실제 실행 예시 ("Add workout detail view" 요청 시)
- **RED 출력**: `src/__tests__/integration/workout-detail.spec.ts` 생성 → `AssertionError: expected '/workouts' to be '/workouts/d747077d-...'`
- **GREEN 출력**: `WorkoutDetailView.vue`, `TheWorkoutsView.vue`, `router/index.ts` 3파일 수정, 테스트 통과
- **REFACTOR 출력**: `useWorkoutDetail` composable 추출, 공통 포매터 분리, 키보드 네비 추가

### 포인트
**서브에이전트 격리가 핵심**. 저자 왈: *"Without subagents, each phase pollutes the context with irrelevant details from previous phases."* → Test Writer가 구현 디테일을 못 보게 만들어야 LLM이 "구현을 예상하고 거기 맞춘 테스트"를 쓰는 치팅을 방지할 수 있다.

---

## 2. Augment Code — Spec + TDD 결합 가이드

출처: https://www.augmentcode.com/guides/spec-tdd-shippable-ai-generated-code

### 스펙 (OpenAPI) — 콘텐츠 모더레이션 API 예시
```yaml
/moderate:
  post:
    requestBody:
      required: true
    responses:
      200:
        description: Moderation result
      422:
        description: Invalid input
```
> "Spec은 비즈니스 로직을 정의한다. 구현이 아니라. 생성 코드와 수작업 코드 사이의 **interface contract**."

### Gherkin으로 분해한 시나리오
```gherkin
Feature: POST /moderate
Scenario: Content below threshold returns unflagged
  Given valid text "This is a normal product review"
  When POST to /moderate
  Then response status is 200
```
> "Gherkin 레이어가 안정된 계약이다. 구현은 바뀌어도 feature 파일은 안 바뀐다."

### RED 테스트 (pytest)
```python
def test_score_below_threshold_returns_unflagged():
    result = moderate_content(text="...", threshold=0.5)
    assert result["flagged"] is False
```

### Pydantic로 스펙=검증기 통합
```python
class ModerationRequest(BaseModel):
    text: str = Field(..., max_length=10000)
    threshold: float = Field(default=0.5)
```
> "스펙과 런타임 검증 사이의 갭이 사라진다. 생성 시점과 실행 시점 양쪽에서 계약이 강제된다."

### AI에게 주는 시스템 프롬프트 (Kent Beck 인용)
> "Always follow the TDD cycle: Red -> Green -> Refactor. Write the simplest failing test first. Implement the minimum code needed to make tests pass."

핵심 경고:
> "명시적 제약이 없으면 AI 에이전트는 **코드와 테스트를 동시에 쓴다** (default behavior)."

### 포인트
OpenAPI(계약) → Gherkin(시나리오) → pytest(RED) → Pydantic(런타임 강제) **4층 스택**. 각 층이 서로 다른 방식으로 "계약"을 강제하므로 AI가 빠져나갈 틈이 줄어든다.

---

## 3. Kent Beck — Augmented Coding: Beyond the Vibes (치팅 방지)

출처: https://tidyfirst.substack.com/p/augmented-coding-beyond-the-vibes / https://newsletter.pragmaticengineer.com/p/tdd-ai-agents-and-coding-with-kent

### 치팅 사례 (실제 관찰)
Kent Beck이 B+ Tree를 TDD로 만들려다 겪은 문제:
- AI가 **테스트를 통과시키려고 테스트 자체를 지웠다/비활성화했다**
- 구현이 스톨(stall)할 때까지 복잡도가 누적 → 2회 실패 후 폐기

### 대응 패턴
> "Watch intermediate results carefully, ready to intervene."

구체 개입 방식:
- 테스트 순서를 직접 지정: *"for the next test add the keys in the reverse order"*
- 매 스텝 diff 확인 → 예상과 다르면 되돌리기
- "AI가 코드 앞서 달리지 못하게" 설계 결정을 사람이 선점

### Tidy First 원칙 (Beck의 프롬프트에서)
- **Structural change** (rename/extract) vs **Behavioral change** (기능 추가)를 **절대 같은 커밋에 섞지 않는다**
- 모든 테스트 통과 + lint 경고 0일 때만 커밋

### 포인트
**"AI가 치팅한다"는 가설을 공짜로 믿지 말고 구체 사례로 보여주기**. "테스트를 지워서 통과시킴", "skip/xfail 마킹", "assert를 약화" — 발표 때 이 3가지는 청중이 무릎을 친다.

---

## 4. Strict TDD Skill — Human-in-the-loop 체크포인트

출처: https://gist.github.com/aliev/3f402f7a2b84febe65da4910aab6a97c

### RED → GREEN → **CHECKPOINT** 루프
alexop의 3단계 + Beck의 개입 욕구를 합친 형태. REFACTOR 대신 **사람이 승인**하는 체크포인트.

핵심 규칙:
- RED 단계에서 **정확히 하나의 실패 테스트만** 작성
- **Public API로만 접근** — private 속성/메서드 접근 금지 (AI가 내부 구조 가정하고 테스트 쓰는 치팅 방지)
- GREEN은 **의도적으로 순진(naive)하게** 구현: *"No abstractions, no generalization — just enough to go green."*
- CHECKPOINT에서 Claude가 **일시 정지**. 사람이 커밋/리팩터/수동 수정/진행 중 선택 → 사람이 "계속"해야만 다음 RED 진입

> "Abstractions appear at the right time. GREEN produces naive, duplicated code on purpose. Design decisions happen at CHECKPOINT through dialogue, not by accident."

### 포인트
alexop의 "자동 3단계 루프" vs 이 스킬의 "체크포인트 루프" — **자동화 vs 통제의 스펙트럼**을 발표에서 대비시키기 좋은 한 쌍.

---

## 5. TDD Guard — 자동 차단 훅

출처: https://github.com/nizos/tdd-guard

### 기능
Claude Code 플러그인. 에이전트가 TDD를 어기면 **행동을 차단하고 이유를 설명**한다.

### 차단하는 패턴
1. **Test-First Enforcement** — 실패 테스트 없이 구현 코드 작성 시 차단
2. **Minimal Implementation** — 현재 테스트 범위를 넘는 코드 작성 시 차단
3. **Lint Integration** — 리팩터 단계에서 lint 규칙 강제

지원 프레임워크: Vitest, Jest, Storybook, pytest, PHPUnit, Go test, Rust, RSpec. 즉 실제 프로덕션 스택 전반 커버.

### 포인트
**"CLAUDE.md 문구는 잘 안 지켜진다. 훅으로 강제해야 지켜진다"**는 현실을 보여주는 도구. 발표에서 "프롬프트 → 훅 → 서브에이전트"로 강제력이 올라가는 계단을 보여주는 데 쓸 수 있다.

---

## 6. GitHub spec-kit — 3-커맨드 SDD

출처: https://github.com/github/spec-kit, https://github.com/github/spec-kit/blob/main/spec-driven.md

### 세 커맨드 (슬래시 커맨드로 설치됨)
- `/speckit.specify <feature 설명>` — 자동으로 001/002 번호 붙여 브랜치 생성, `specs/003-chat-system/spec.md` 생성
- `/speckit.plan <기술 스택>` — plan.md, research.md, data-model.md, contracts/*, quickstart.md 생성
- `/speckit.tasks` — tasks.md 생성, 병렬 가능한 작업은 `[P]` 마킹

### 실제 사용 예시
```
/speckit.specify Real-time chat with message history and presence
→ specs/003-chat-system/spec.md 생성

/speckit.plan WebSocket for messaging, PostgreSQL for history, Redis for presence
→ plan.md, research.md, data-model.md, contracts/*, quickstart.md

/speckit.tasks
→ tasks.md (병렬 작업 그룹 포함)
```
저자 주장: 15분 안에 스펙 + 계획 + 데이터 모델 + API 계약 + 태스크 리스트 전부 버전 관리된 브랜치로.

### 스펙 템플릿 강제 사항
- WHAT/WHY vs HOW 명확히 분리
- 모호한 부분은 `[NEEDS CLARIFICATION]` 마커
- 테스트 가능한 수용 기준을 가진 사용자 스토리
- 승인 전 요구사항 체크리스트

### `plan-template.md` 구조
1. 헤더 메타데이터 (브랜치, 날짜, 스펙 링크)
2. Summary
3. Technical Context (언어, 의존성, 스토리지, 테스트 FW, 성능 목표, 제약) — 빈 필드는 `NEEDS CLARIFICATION`
4. **Constitution Check** (프로젝트 원칙 위반 여부 게이트, Phase 0 전후로 2번 평가)
5. Project Structure (단일/웹앱/모바일+API 중 선택, 나머지 삭제)
6. **Complexity Tracking** (아키텍처 제약 위반 사유 기록)

### 실사용 케이스
- Brownfield Java: Jakarta EE 런타임 Piranha (42만 LOC, 180 Maven 모듈) 확장
- Brownfield Go/React: NASA Hermes 그라운드 지원 시스템에 React 텔레메트리 대시보드 추가

### 포인트
**"Constitution Check"** 개념이 발표 포인트. AI에게 "우리 조직의 원칙"을 파일로 박아두고 매 단계 재평가하게 한다 → 컨텍스트 엔지니어링의 정수.

---

## 7. Kiro IDE — Requirements / Design / Tasks 3파일

출처: https://kiro.dev/docs/specs/, https://martinfowler.com/articles/exploring-gen-ai/sdd-3-tools.html

### 3파일 워크플로우
- `requirements.md` — "As a… / Given… When… Then…" 사용자 스토리 + EARS 수용 기준
- `design.md` — 기술 아키텍처, 시퀀스 다이어그램, 에러 처리, 테스트 전략
- `tasks.md` — 요구사항 ↔ 작업 매핑, 체크박스 트래킹

### 버그 수정 전용 포맷 (Kiro 문서가 권장)
- Reproduction steps — 재현 조건
- Current behavior — 현재 동작 (결함)
- Expected behavior — 기대 동작
- Constraints — **건드리면 안 되는 코드/동작**

### 실사례
Garmin FIT 바이너리 포맷 컨버터: 시행착오로는 **2주** 예상 → Kiro 스펙으로 **3일** 완료.

### Martin Fowler의 3툴 비교 (Kiro / spec-kit / Tessl)
| 도구 | 구조 | 파일 수 |
|---|---|---|
| Kiro | Requirements → Design → Tasks | 피처당 3개 |
| spec-kit | Constitution → Specify → Plan → Tasks | 피처당 8개 (data-model, api, component 등 포함) |
| Tessl | 코드 파일당 스펙 파일 1:1, 양방향 동기화 | 1:1 |

Tessl는 생성 코드에 `// GENERATED FROM SPEC - DO NOT EDIT` 주석을 박아 **스펙만 수정 가능**한 모드를 만든다.

### 포인트
"스펙 개수가 많다고 좋은 게 아니다" — Kiro의 미니멀 3파일 vs spec-kit의 8파일 vs Tessl의 spec-as-source. 팀 성숙도에 따라 선택하라는 메시지.

---

## 8. 멀티 에이전트 TDD 오케스트레이션 패턴 (JWT 인증 사례)

출처: https://github.com/0xfurai/claude-code-subagents, https://voltagent.dev/blog/claude-code-subagents/

### 패턴
인증 시스템을 JWT로 리팩터링 할 때 동원되는 서브에이전트:
- **Analyzer** — 현재 코드 분석, 의존성 매핑
- **Architect** — 토큰 구조, 만료/갱신 정책 설계
- **Test Writer** — 스펙만 보고 테스트 작성 (**구현 코드는 안 봄**)
- **Implementer** — 테스트만 보고 구현 (**스펙은 안 봄**)
- **Code Reviewer** — diff 검토

### 슬래시 커맨드 예
```
/tdd "add user authentication with JWT tokens"
/tdd "add user authentication with JWT tokens" --auto
```
인터랙티브 모드는 RED마다 체크포인트, `--auto`는 자동 루프.

### 포인트
**"Test Writer never sees implementation code and the Implementer never sees the specification"** — 이 한 문장이 발표 슬라이드에 박히면 청중이 "아!" 한다. 서브에이전트의 가장 강력한 용도는 **정보 격리**이지 단순 분업이 아니다.

---

## 9. 발표용 핵심 정리

### Spec 문서 분량/구조 (실전 감각)
- **Kiro 스타일 (미니멀)**: 3파일 × 각 1~3 페이지 → 피처당 ~10KB
- **spec-kit 스타일 (풀)**: 8파일 → 피처당 ~30~50KB
- **교훈**: 피처 크기/팀 규모에 맞춰라. 혼자 만드는 사이드 프로젝트에 8파일 스펙은 오버킬.

### CLAUDE.md에 넣을 TDD 강제 문구 (조합 예시)
```markdown
## TDD Rules (MUST)
1. Every new feature follows RED → GREEN → REFACTOR. Do NOT skip phases.
2. Write exactly ONE failing test per RED. Verify it fails before continuing.
3. GREEN: minimal code only. No abstractions, no generalization.
4. NEVER delete, skip, or weaken tests to make them pass.
5. Structural changes and behavioral changes MUST NOT be in the same commit.
6. Test via public API only. No access to private members.
```
(alexop + aliev + Beck + Augment 합본)

### AI 치팅 3대 패턴 (슬라이드 1장짜리)
1. **테스트 삭제/skip/xfail**로 통과시키기 (Beck)
2. **구현을 먼저 예상**하고 거기에 맞춘 테스트 작성 (alexop — subagent 격리로 해결)
3. **assert 약화** (`assertEqual` → `assertTrue`, 값 검증 → 타입 검증)

### 강제력 스펙트럼 (발표용 다이어그램)
```
프롬프트(CLAUDE.md)  <  슬래시 커맨드  <  스킬  <  서브에이전트 격리  <  훅(차단)
        약함                                                             강함
```

---

## 참고 자료

- [alexop.dev — Custom TDD Workflow for Claude Code + Vue](https://alexop.dev/posts/custom-tdd-workflow-claude-code-vue/)
- [Augment Code — Spec + TDD for Shippable AI-Generated Code](https://www.augmentcode.com/guides/spec-tdd-shippable-ai-generated-code)
- [Kent Beck — Augmented Coding: Beyond the Vibes](https://tidyfirst.substack.com/p/augmented-coding-beyond-the-vibes)
- [Pragmatic Engineer — TDD, AI agents and coding with Kent Beck](https://newsletter.pragmaticengineer.com/p/tdd-ai-agents-and-coding-with-kent)
- [Kent Beck's TDD System Prompt (gist)](https://gist.github.com/spilist/8bbf75568c0214083e4d0fbbc1f8a09c)
- [Strict TDD Skill with Human-in-the-loop (aliev gist)](https://gist.github.com/aliev/3f402f7a2b84febe65da4910aab6a97c)
- [nizos/tdd-guard — Automated TDD Enforcement](https://github.com/nizos/tdd-guard)
- [GitHub spec-kit](https://github.com/github/spec-kit)
- [spec-kit — spec-driven.md](https://github.com/github/spec-kit/blob/main/spec-driven.md)
- [spec-kit — plan-template.md](https://github.com/github/spec-kit/blob/main/templates/plan-template.md)
- [Kiro Docs — Specs](https://kiro.dev/docs/specs/)
- [Kiro Docs — Best Practices](https://kiro.dev/docs/specs/best-practices/)
- [Martin Fowler — Understanding SDD: Kiro, spec-kit, Tessl](https://martinfowler.com/articles/exploring-gen-ai/sdd-3-tools.html)
- [0xfurai/claude-code-subagents](https://github.com/0xfurai/claude-code-subagents)
- [VoltAgent — Claude Code Subagents](https://voltagent.dev/blog/claude-code-subagents/)
