# PDD vs SDD vs TDD+AI — 지시 방식 비교 리서치

> 2026.04 수집. 세 방법론의 "AI에게 어떻게 지시하는가"의 차이를 구체적으로 비교.

## 한 줄 요약
> **SDD는 잘못된 것을 만드는 걸 막고, TDD는 올바른 것을 잘못 만드는 걸 막는다.**
> - SDD: "무엇을 만들지" 정의 → 인간이 검증 (방향 가드)
> - TDD: "제대로 만들었는지" 테스트 → 기계가 검증 (구현 가드)

---

## 핵심 구분: 지시가 사는 곳

| 차원 | PDD | SDD | TDD+AI |
|------|-----|-----|--------|
| **무엇을 작성하나** | 잘 만든 프롬프트 | 구조화된 스펙 문서 | 실패하는 테스트 (또는 기능 설명 + 하네스) |
| **지시가 사는 곳** | 채팅 (일회성, 휘발) | 파일 (git 버전 관리) | 테스트 코드 + CLAUDE.md 하네스 |
| **세밀도** | 작업 단위, 반복적 | 시스템 단위, 사전 설계 | 기능 단위, 테스트 우선 |
| **AI의 역할** | 각 프롬프트를 실행 | 스펙에서 코드를 "컴파일" | 강제된 Red-Green-Refactor 따르기 |
| **개발자 핵심 스킬** | 프롬프트 작성 | 스펙 설계 | 테스트 설계 |
| **적합한 경우** | 빠른 프로토타이핑 | 프로덕션, 팀 협업 | 정확성이 중요한 코드 |

---

## PDD 상세

### PDD에서의 지시 방식

프롬프트 자체가 계약서. 별도 문서 없이 대화가 곧 스펙.

**Andrew Miller (Capgemini)의 좋은 프롬프트 3요소:**

| 요소 | 나쁜 예 | 좋은 예 |
|------|---------|---------|
| Context | "백엔드 고쳐줘" | "`backend/routes/user.js`의 `getMarker` 함수 수정. 관련 파일 3개 첨부" |
| Specificity | "submit 누르면 피드에 추가" | "`saveSubmission` 엔드포인트 호출, DB 저장, 페이지 리로드 없이 피드 자동 갱신" |
| Scope | 설정 페이지 전체 | 토글 기능 하나 |

### PDD의 핵심 특성
- 대화가 곧 스펙 (ephemeral, session-bound)
- 한 번에 한 작업 단위로 반복
- 마스터 프롬프트로 세션 시작 → 좁은 후속 프롬프트로 반복

---

## SDD 상세

### SDD에서의 지시 방식

별도 마크다운 파일에 스펙을 먼저 작성 → AI에게 "이 스펙대로 해"

**GitHub Blog의 실제 SDD 워크플로우:**
- 개발자가 `main.md` 스펙 파일 유지
- `compile.prompt.md`에 컴파일 지시: "Update the app to follow [the specification](../../main.md)"
- AI가 스펙에서 코드, DB 스키마, API, CLI까지 생성

**Addy Osmani의 좋은 스펙 구조:**
```markdown
# Project Spec: 팀 태스크 앱

## Objective
- 소규모 팀의 태스크 관리 웹앱

## Tech Stack
- React 18+, TypeScript, Vite, Tailwind CSS
- Node.js/Express 백엔드, PostgreSQL, Prisma ORM

## Commands
- Build: `npm run build`
- Test: `npm test` (커밋 전 반드시 통과)

## Boundaries
- ✅ Always: 커밋 전 테스트 실행
- ⚠️ Ask first: DB 스키마 변경
- 🚫 Never: 시크릿 커밋, node_modules 수정
```

### PDD와의 핵심 차이
- PDD: 지시가 채팅에 산다 (휘발)
- SDD: 지시가 파일에 산다 (git 버전 관리, 세션 재시작 후에도 유지)

---

## TDD+AI 상세

### TDD+AI에서의 지시 방식

**두 가지 패턴이 존재:**

**패턴 1 — 수동 TDD**: 개발자가 직접 테스트 작성 → AI에게 "이 테스트 통과시켜"
```
[인간] 테스트 코드 작성
[AI에게] "이 테스트를 통과하는 코드를 작성해"
[AI] 구현
[반복]
```

**패턴 2 — 하네스 기반 자동 TDD** (alexop.dev, Claude Code 사례):
개발자가 기능 설명만 제공 → CLAUDE.md/Skill이 Red-Green-Refactor를 강제

개발자가 입력하는 것:
> "사용자가 운동 페이지에서 과거 운동을 클릭하면 어떤 운동과 세트를 완료했는지 상세 보기를 볼 수 있어야 한다."

이 한 문장이 하네스에 의해 자동 분해:
```
RED:    tdd-test-writer 서브에이전트 → 실패 테스트 작성
        GATE: 테스트 실패 확인 전 진행 불가
GREEN:  tdd-implementer 서브에이전트 → 최소 코드로 테스트 통과
        GATE: 테스트 통과 확인
REFACTOR: tdd-refactorer 서브에이전트 → 리팩토링 체크리스트 평가
```

### 핵심 구조적 차이
TDD+AI는 프롬프트가 아닌 **하네스를 통해 프로세스를 강제**한다. 개발자의 지시는 PDD와 비슷할 수 있지만(기능 설명), 프로세스는 CLAUDE.md나 Skill 파일에 의해 잠겨 있다.

---

## 같은 기능의 세 가지 지시 방식 비교

> Feature: "사용자 로그인 + JWT"

| 방법론 | 개발자가 AI에게 입력하는 것 |
|--------|---------------------------|
| **PDD** | "`auth.js`에 로그인 엔드포인트 추가. DB로 자격증명 확인, 성공 시 JWT 반환, 실패 시 401. 현재 파일: [코드 붙여넣기]" |
| **SDD** | `spec.md`에 작성: `POST /api/auth/login - Request: {email, password} - Response: {token} or 401`. → "spec.md대로 구현해줘" |
| **TDD+AI** | "사용자 로그인 기능 구현해줘" → 하네스가 자동으로 실패 테스트 → 구현 → 리팩토링 순서 강제 |

---

## SDD vs TDD+AI 심층 비교

리서치 2차 (2026.04). SDD와 TDD가 자연어 지시로 보면 비슷해 보이는 문제를 해결하기 위한 심층 조사.

### 왜 비슷해 보이는가
둘 다 "요구사항을 명시하고 AI가 구현"하는 구조. 하지만 **핵심 산출물(artifact)**과 **검증 주체**가 다르다.

### 핵심 차이: 검증의 주체와 시점

| 차원 | SDD | TDD+AI |
|------|-----|--------|
| **핵심 질문** | "우리가 올바른 것을 만들고 있는가?" | "이 코드가 내가 원한 대로 동작하는가?" |
| **검증 주체** | 인간 (스펙 대비 결과 검토) | 기계 (테스트 실행 → Red/Green) |
| **검증 시점** | 구현 후 인간 리뷰 | 구현 즉시 자동 확인 |
| **범위** | 기능/아키텍처/시스템 전체 | 함수/모듈/행위 단위 |
| **드리프트 감지** | 스펙 리뷰 (인간 게이트) | 테스트 실패 (자동 게이트) |
| **소스 오브 트루스** | 스펙 문서 | 테스트 스위트 |

### 각각이 주는 고유한 가치

**SDD만 줄 수 있는 것:**
- 아키텍처, 기술 스택, 제약 같은 **큰 그림**을 문서로 관리 (테스트로 잡을 수 없는 영역)
- 여러 세션에 걸쳐 AI가 스펙을 반복 참조 → 컨텍스트 드리프트 방지
- 비개발자도 스펙을 읽고 검토 가능
- AI가 코드를 쓰기 **전에** 방향을 검증하는 인간 승인 게이트

**TDD만 줄 수 있는 것:**
- **AI 치팅 방지**: AI가 코드+테스트를 동시에 쓰면 자기 코드를 확인하는 약한 테스트 작성. 테스트 실패(Red) 확인을 강제하면 치팅 불가 (Kent Beck: "The genie doesn't want to do TDD.")
- 자동 회귀 감지 — AI가 뭔가 깨뜨리면 즉시 Red
- 설계 압력: 테스트하기 어려운 코드 = 나쁜 아키텍처 신호
- 스스로 검증하는 살아있는 문서 (테스트는 조용히 부패하지 않는다)

### 그래서 둘을 합친다 (Augment Code)
Augment Code의 5단계 워크플로우:
1. 스펙 스텁 작성 (OpenAPI/JSON Schema) — 계약 정의
2. Gherkin 시나리오로 분해 — 스펙을 테스트 가능한 단위로
3. 첫 실패 테스트 작성 (Red) — 행위 어서션
4. AI가 최소 코드로 통과 (Green) — 스펙+테스트가 이중 컨텍스트
5. 스펙을 안전망 삼아 리팩토링

> "스펙이 계약을 정의하고, TDD가 계약이 이행됐는지 검증한다. 멀티파일 AI 생성에서 어느 하나만으로는 부족하다."

### Martin Fowler의 경고 (2025)
SDD가 이미 "의미적 확산(semantic diffusion)"을 겪고 있다고 경고. "스펙"이 "상세한 프롬프트"의 동의어로 쓰이는 문제. 세 단계를 구분:
- **Spec-first**: 스펙을 쓰고 AI를 안내 (대부분이 말하는 것)
- **Spec-anchored**: 완성 후에도 스펙 유지, 지속적 진화
- **Spec-as-source**: 스펙만 편집, AI가 모든 코드 생성, 인간은 코드 미접촉

(출처: Martin Fowler — Understanding SDD: Kiro, spec-kit, and Tessl)

---

## 참고 자료

| 출처 | 주요 내용 |
|------|----------|
| [Forcing Claude Code to TDD: Agentic Red-Green-Refactor Loop — alexop.dev](https://alexop.dev/posts/custom-tdd-workflow-claude-code-vue/) | Claude Code에서 서브에이전트로 TDD 루프 구현 |
| [Spec-Driven Development: Markdown as a Programming Language — GitHub Blog](https://github.blog/ai-and-ml/generative-ai/spec-driven-development-using-markdown-as-a-programming-language-when-building-with-ai/) | SDD의 가장 구체적 데모 |
| [How to Write a Good Spec for AI Agents — Addy Osmani](https://addyosmani.com/blog/good-spec/) | 좋은 스펙 작성 가이드 |
| [Prompt Driven Development — Andrew Miller (Substack)](https://andrewships.substack.com/p/prompt-driven-development) | PDD 프롬프트 작성 3요소 |
| [Prompt Driven Development — Capgemini](https://capgemini.github.io/ai/prompt-driven-development/) | PDD 실전 가이드 |
| [Spec-Driven Development in 2025 — SoftwareSeni](https://www.softwareseni.com/spec-driven-development-in-2025-the-complete-guide-to-using-ai-to-write-production-code/) | SDD 전체 가이드 |
| [Spec-Driven Development — Thoughtworks](https://www.thoughtworks.com/en-us/insights/blog/agile-engineering-practices/spec-driven-development-unpacking-2025-new-engineering-practices) | 업계 분석 관점 |
| [Prompt-Driven Development: Coding in Conversation — Hexaware](https://hexaware.com/blogs/prompt-driven-development-coding-in-conversation/) | PDD 대화형 코딩 패턴 |
| [SDD: AI-First Coding Practice — Medium](https://medium.com/ai-pace/specification-driven-development-sdd-ai-first-coding-practice-e8f4cc3c2fc4) | SDD AI-First 접근 |
| [TDD Workflow as VSCode Agent Handoffs — danielmeppiel/tdd-copilot](https://github.com/danielmeppiel/tdd-copilot) | VSCode TDD 에이전트 핸드오프 |
| [Augment Code — Spec + TDD: Shippable AI-Generated Code](https://www.augmentcode.com/guides/spec-tdd-shippable-ai-generated-code) | Spec+TDD 5단계 하이브리드 워크플로우 |
| [Martin Fowler — Understanding SDD: Kiro, spec-kit, and Tessl](https://martinfowler.com/articles/exploring-gen-ai/sdd-3-tools.html) | SDD 의미적 확산 경고, 3단계 구분 |
| [DEV.to — SDD vs TDD: Why Spec Driven Development Changes the Game](https://dev.to/planu/sdd-vs-tdd-why-spec-driven-development-changes-the-game-for-ai-assisted-coding-5gba) | SDD vs TDD 직접 비교 |
