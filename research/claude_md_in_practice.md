# CLAUDE.md 실천편 — 현장 사례와 외부 인사이트

- **수집일**: 2026-04-05
- **수집 범위**: Anthropic 내부(Boris Cherny), HumanLayer, Hunslog, 정구봉(Team Attention), Dan Shipper(Every), Kieran Klaassen 등
- **용도**: 섹션 4 "하네스 & 컨텍스트 엔지니어링"의 CLAUDE.md 파트 보강
- **공식 문서와의 관계**: 공식 원칙은 `official/extensions/official_claude_md_guide.md`에 정리. 이 문서는 **공식 원칙이 현장에서 어떻게 실천·확장되는지**를 다룬다.

---

## 1. Boris Cherny (Claude Code 창시자)의 실천

Boris Cherny는 Anthropic의 Claude Code 창시자이자 현 Head of Claude Code. Claude Code 팀 자체가 CLAUDE.md를 어떻게 운영하는지가 가장 권위 있는 실천 사례다.

### 핵심 실천 4가지

1. **공유 CLAUDE.md를 git에 체크인**
   - Claude Code 팀은 **하나의 공유 CLAUDE.md** 파일을 git으로 관리
   - 팀원 모두가 동일한 Claude 행동 기준으로 작업

2. **주 수 회 업데이트**
   - CLAUDE.md는 "한 번 쓰고 끝"이 아니라 **매주 여러 번** 업데이트되는 살아있는 문서
   - 새로운 실수가 발견될 때마다 규칙 한 줄 추가

3. **"Claude가 실수할 때마다 CLAUDE.md에 추가"**
   - Claude가 잘못된 행동을 할 때마다 해당 상황을 막는 규칙을 CLAUDE.md에 한 줄 추가
   - 같은 실수를 두 번 반복하지 않는 시스템 — "제도적 지식(institutional knowledge)" 누적

4. **PR 기반 자동 업데이트**
   - 코드 리뷰 시 PR에서 `@claude` 태그
   - Claude Code GitHub Action이 자동으로 CLAUDE.md 커밋
   - 리뷰 피드백이 자동으로 팀 전체 규칙이 되는 구조

### 왜 이 접근이 작동하는가

- **복리(compounding)의 메커니즘**: 매 PR마다 제도적 지식이 축적 → 다음 PR에서는 같은 실수 자동 방지
- Dan Shipper가 정립한 "Compound Engineering" 개념과 동일한 원리
- 각 버그 수정이 **패턴으로 문서화** → 다음 유사 버그 자동 감지/방지

### 출처
- `research/compound_engineering.md` (전체 문서, 특히 Boris Cherny 관련 섹션)
- `blog/blog_hunslog_claude_code_power_user_tips.md` (Boris의 12가지 팁)

---

## 2. HumanLayer — "Writing a good CLAUDE.md"

HumanLayer 블로그(https://www.humanlayer.dev/blog/writing-a-good-claude-md)의 핵심 주장. 공식 원칙을 극단적으로 밀고 간 입장.

### 2.1 3가지 핵심 요소 — WHAT / WHY / HOW

CLAUDE.md는 Claude의 "온보딩 문서"이며 다음 3가지를 다뤄야 한다:

1. **WHAT**: "tech, stack, project structure. Give Claude a map of the codebase."
2. **WHY**: 프로젝트의 목적과 각 컴포넌트의 기능
3. **HOW**: 프로젝트 작업 방식, 테스트 실행법, 변경 검증법

### 2.2 지시문 예산 — 150-200개가 한계

> "Frontier thinking LLMs can follow ~150-200 instructions with reasonable consistency."

- Claude Code 시스템 프롬프트에 이미 ~50개 지시문 존재
- → **사용자의 CLAUDE.md는 최소화해야** 함 (300줄 이하, 이상적으로 60줄 이하)
- "지시문 개수가 늘수록 지시 준수 품질이 균일하게 감소"

### 2.3 포함하지 말 것 — "린터가 할 일을 LLM에 시키지 말라"

> "Never send an LLM to do a linter's job. LLMs are comparably expensive and incredibly slow compared to traditional linters."

→ **코드 스타일 가이드라인을 CLAUDE.md에 넣지 말라.** 린터/포매터가 할 일이다.

- 자동 생성(auto-generation) 금지: "CLAUDE.md는 하네스에서 가장 고레버리지 지점"이라 수동으로 신중하게 작성해야 한다
- 태스크 특이적(task-specific) 지시도 금지 — CLAUDE.md는 "보편적으로 적용되는 것"만

### 2.4 해결책 — Progressive Disclosure + `agent_docs/`

규칙이 많다면 `agent_docs/` 디렉토리에 주제별 파일을 두고 CLAUDE.md에는 **간단한 설명과 링크**만 둔다.

> "Prefer pointers to copies. Don't include code snippets — they will become out-of-date quickly. Instead, include file:line references."

→ **복사본 대신 포인터**. 코드 스니펫은 금방 낡는다. 대신 `file:line` 참조만 둔다.

### 출처
- https://www.humanlayer.dev/blog/writing-a-good-claude-md (WebFetch로 2026-04-05 수집)

---

## 3. Hunslog (한국) — 실전 CLAUDE.md 최적화

Hunslog의 "Claude Code Power User Tips"(2026-02-05)에서 정리된 한국 커뮤니티의 실천법.

### 3.1 "2.5k 토큰 이내"

- Boris Cherny 팀의 기준을 한국어 커뮤니티에서 실천
- 각 줄마다 "이걸 지우면 Claude가 실수하나?" 자문 → 아니면 삭제 (공식 원칙과 동일)
- **상세 가이드는 Skills로 이동**, CLAUDE.md에는 핵심만

### 3.2 좋은 예 vs 나쁜 예

```markdown
# Good: 핵심만 기록
## Skill 실행
1. skill-manager 에이전트 호출
2. summary.json의 skill_eval에서 activate: true인 skill의 SKILL.md 읽고 실행

# Bad: 수십 줄의 상세 규칙을 CLAUDE.md에 직접 기록
```

### 3.3 반복 실수 기록 + 주 수회 업데이트

```markdown
## 주의사항
- Push 승인 필수: 커밋 목록 보여주고 명시적 허락 후 푸시
- Node.js >= 20 필수 (19 이하는 빌드 실패)
- 환경변수는 .env.local에 저장 (.env 사용 금지)
```

- PR에 `@.claude` 태그 → 학습 내용을 CLAUDE.md에 반영
- **주 수회** 업데이트 (Boris의 실천 그대로)

### 3.4 계층적 CLAUDE.md 구조

```
/
├── CLAUDE.md              (전체 프로젝트 규칙)
├── apps/web/CLAUDE.md     (웹 앱 전용 규칙)
└── packages/ui/
```

모노레포에서 루트 CLAUDE.md 외에 하위 패키지별 CLAUDE.md를 둬서 범위를 한정.

### 3.5 추가 팁

- **몇 주에 한 번 Claude에게 CLAUDE.md 자체를 리뷰시키기** — 메타 운영
- **"IMPORTANT", "YOU MUST"** 같은 강조 표현으로 준수율 높이기 (공식 권장과 일치)
- **CLAUDE.md를 코드처럼 관리**: 리뷰, 정리, 행동 변화 관찰 (공식 권장과 일치)

### 3.6 안티패턴 (현장에서 자주 보는 것)

- **모든 것을 CLAUDE.md에 넣기** — 토큰 소모 주범
- **모호한 지시** ("잘 작성하라", "효율적으로 하라")
- **Skills와 내용 중복**
- **디렉토리별 규칙 충돌**

### 출처
- `blog/blog_hunslog_claude_code_power_user_tips.md`

---

## 4. 정구봉 (Team Attention) — "159개 CLAUDE.md"

정구봉은 Team Attention을 이끌며 Claude Code 기반 Context Engineering을 한국에서 가장 활발히 실천·공유하는 인물.

### 4.1 규모의 실천 — "159개의 CLAUDE.md"

- **159개의 CLAUDE.md 파일**과 **100개 이상의 스킬**을 동시 운영
- 프로젝트/도메인별로 CLAUDE.md를 촘촘히 분리 → 각 파일은 작고 특화됨
- 공식 원칙("짧게 유지")을 "파일 하나는 짧게, 대신 파일을 많이" 방향으로 확장

### 4.2 4개 레이어 이론에서의 CLAUDE.md 위치

| 레이어 | 역할 | Claude Code 구현 |
|--------|------|-----------------|
| **CLAUDE.md** | 시스템 **성격(character)** 정의 | 프로젝트 규칙, 컨벤션, 아키텍처 지침 |
| **Skill** | 실행 로직 구조화 | 재사용 워크플로우 |
| **Memory** | 학습 축적 | 자동/수동 메모리 |
| **MCP** | 외부 도구 연결 | 외부 서비스 통합 |

**핵심 통찰**: CLAUDE.md는 단순한 "설정 파일"이 아니라 **"에이전트의 성격을 정의하는 헌법"**. Skill이 "무엇을 할 줄 아는가"라면 CLAUDE.md는 "누구로서 행동하는가".

### 4.3 메시지

> "코드를 짜는 사람도, 코드를 읽는 사람도 아닙니다. 맥락을 설계하는 사람이 이깁니다."
> — 정구봉

### 출처
- `linkedin/linkedin_goobong_jeong_context_engineering.md`
- `research/context_engineering.md`

---

## 5. Kieran Klaassen — Self-Improving Harness

### 5.1 피드백으로 자라는 CLAUDE.md

Kieran Klaassen의 관찰:

> "Every time I indicate 'I don't like this' or 'Good catch,' the system gets smarter."

- CLAUDE.md는 **정적 문서가 아니라 피드백으로 자라는 유기체**
- 사용자의 "마음에 안 드네", "좋은 지적이다" 한 마디가 곧 새 규칙 한 줄
- **Self-Improving Harness**의 핵심 메커니즘

### 5.2 Taste Files / Preference Docs

- CLAUDE.md에 **결정의 이유(why)**까지 쓴다 — 결과(what)만 쓰면 금방 낡는다
- Klaassen의 실제 패턴:
  - *"When doing X type of work, remember to check Y"*
  - *"I prefer approach A over approach B because of reason C."*

### 5.3 Post-Mortem → Rule 승화

기능 출하 직후 질문:

> "Where did you diverge from the plan? Why? What would have made the plan better?"

→ 답을 **한 줄 규칙으로 승화**하여 CLAUDE.md에 추가.

**실제 사례**: 백그라운드 잡에서 외부 API rate limit 버그를 한 번 겪고 나서, Rails 리뷰 에이전트에 "백그라운드 잡이 외부 API 호출 시 rate limit / retry / partial state 모두 체크" 한 줄 추가 → 같은 종류 버그 재발 **0건**.

### 출처
- `research/harness_context_advanced.md` (8절 — 암묵지 명시화)

---

## 6. Dan Shipper (Every) — Compound Engineering과 SSoT

### 6.1 SSoT(Single Source of Truth)로서의 CLAUDE.md

Every Inc.의 Compound Engineering 방법론에서 CLAUDE.md의 위치:

- 에이전트가 **매 세션 시작 시** 자동으로 읽는 파일
- 프로젝트의 **선호사항, 패턴, 컨텍스트**를 저장하는 **단일 진실의 원천**
- 네이밍 규칙, 에러 처리 패턴, 테스트 접근 방식 등을 담음
- 팀 전체가 공유하며 지속적으로 업데이트

### 6.2 CLAUDE.md를 SSoT로 활용하는 이유

1. **일관성**: 모든 에이전트 세션이 동일한 컨텍스트를 가짐
2. **자동 전파**: 한 번 기록하면 모든 팀원과 에이전트에 자동 적용
3. **누적 학습**: 매 PR, 매 리뷰에서 발견된 패턴이 추가됨

### 6.3 6단계 학습 파이프라인 (Compound Engineering Plugin)

Every Inc.의 Compound Engineering Plugin은 6개 서브에이전트 파이프라인을 운영:

1. **Investigator** — 문제 분석
2. **Solution Extractor** — 재사용 가능한 패턴 추출
3. **Category Classifier** — 메타데이터/태그 부여
4. **Documentation Writer** — `docs/solutions/`에 구조화 문서 생성
5. **CLAUDE.md Updater** — **새 패턴을 CLAUDE.md에 추가**
6. **Verifier** — "다음에 시스템이 이 문제를 자동 감지하는가?" 검증

→ CLAUDE.md가 단순 문서가 아니라 **학습 파이프라인의 최종 산출물** 중 하나.

### 출처
- `research/compound_engineering.md`

---

## 7. Anthropic 팀의 실제 사용 패턴 (공식 블로그)

Anthropic의 "How Anthropic teams use Claude Code" 블로그(2025-07-24)에서 관찰된 실제 사용 패턴.

### 7.1 Claude Code 조직 도입 시 CLAUDE.md의 역할

> "이미 AI 도구를 사용 중인 **20~50명의 개발자**로 시작한다. 데이터베이스 마이그레이션이나 스캐폴딩을 위한 **커스텀 슬래시 커맨드** 생성, 코딩 표준을 담은 **CLAUDE.md 파일** 작성, 자동화할 가치 있는 **반복 워크플로우** 식별, 전용 **트러블슈팅 채널** 설정, 서드파티 인증을 위한 **래퍼 스크립트** 개발"

→ **CLAUDE.md 작성은 조직 도입의 필수 단계**로 취급된다.

### 7.2 CLAUDE.md 모범 사례 (공식 블로그 발췌)

- 리포지토리 루트에 체크인하여 **자동 상속**
- 아키텍처 변경과 함께 업데이트하는 **"살아있는 문서"**
- 개발자 **온보딩 체크리스트**에 포함
- 패턴이 크게 다른 경우 **브랜치별 변형** 유지

### 7.3 실제 사용 사례 — 데이터 사이언스 팀

- 데이터 사이언티스트가 전체 코드베이스를 Claude Code에 제공 → 빠른 온보딩
- **CLAUDE.md 파일을 읽고 파이프라인 의존성 설명**
- Product Engineering 팀이 프로그래밍 작업의 **첫 번째 진입점(first stop)**으로 사용

### 출처
- `blog/claude_official/blog_250724_how-anthropic-teams-use-claude-code.md`
- `blog/claude_official/blog_251015_scaling-agentic-coding.md`

---

## 8. 현장 트렌드 — 500줄 vs 60줄 논쟁

### 8.1 양극단의 입장

| 입장 | 주장 | 대표 인물/사례 |
|------|------|---------------|
| **짧게** (< 60줄) | 150-200 지시문 예산 이론, 한 줄 삭제 테스트 | HumanLayer |
| **중간** (< 200-300줄) | 공식 권장값, 200줄 이하 | Anthropic 공식 문서 |
| **조금 더 길게** (< 500줄) | Context + Task + Expectations + References + Checklist 모두 포함 | Riccardo Marconato (LinkedIn 2026-03-04) |
| **토큰 기준** (< 2.5k 토큰) | 줄 수가 아닌 토큰 수로 관리 | Boris Cherny, Hunslog |

### 8.2 결론 — "줄 수보다는 내용의 신호 대 잡음비"

- 단순 줄 수 경쟁이 아니라 **"이 줄이 Claude의 실제 행동을 바꾸는가"**가 기준
- 공식 한 줄 삭제 테스트가 모든 숫자 기준의 공통 철학
- **비대한 파일 = 규칙이 묻힘 → 지시 준수율 감소** (여러 출처에서 공통 확인)

### 출처
- `research/linkedin_claude_code_tips.md` (Riccardo Marconato, Abhishek Ray 등 LinkedIn 자료)

---

## 9. 섹션 4 발표에서 쓸 만한 "살아있는 사례" 후보

1. **Boris Cherny 루틴**: "Anthropic 팀은 Claude가 실수할 때마다 CLAUDE.md에 한 줄 추가한다. 주 수 회 업데이트된다."
2. **Klaassen 사례**: "백그라운드 잡 rate limit 버그 한 번 → 리뷰 에이전트에 한 줄 → 같은 버그 재발 0건."
3. **정구봉 규모**: "Team Attention은 159개 CLAUDE.md 파일과 100개 이상 스킬을 운영한다."
4. **HumanLayer 원칙**: "'LLM에게 린터가 할 일을 시키지 말라.' 코드 스타일 가이드는 CLAUDE.md에 넣지 않는다."
5. **Hunslog 예시**: 2.5k 토큰 이내, 주의사항 3줄짜리 미니멀 CLAUDE.md 샘플
6. **Compound Engineering 파이프라인**: CLAUDE.md Updater라는 **전용 에이전트**가 학습 파이프라인의 일원이 된 사례

---

## 10. 출처 종합

| 출처 | 활용 부분 |
|------|----------|
| `official/extensions/official_claude_md_guide.md` | 공식 원칙 (짝 문서) |
| `official/extensions/official_memory.md` | 한국어 공식 메모리 문서 |
| `research/compound_engineering.md` | Boris Cherny 실천, Dan Shipper/Every Compound Engineering, SSoT 개념, 6단계 파이프라인 |
| `research/harness_context_advanced.md` | Klaassen Self-Improving Harness, Post-Mortem→Rule 승화, Taste Files |
| `research/context_engineering.md` | 4개 레이어 이론 |
| `research/linkedin_claude_code_tips.md` | LinkedIn 현장 논쟁 (500줄 vs 60줄) |
| `blog/blog_hunslog_claude_code_power_user_tips.md` | Hunslog 한국 실전 팁, Boris 12가지 팁 |
| `blog/claude_official/blog_250724_how-anthropic-teams-use-claude-code.md` | Anthropic 내부 팀 사용 패턴 |
| `blog/claude_official/blog_251015_scaling-agentic-coding.md` | 조직 도입 시 CLAUDE.md 역할 |
| `linkedin/linkedin_goobong_jeong_context_engineering.md` | 정구봉 4개 레이어, 159개 CLAUDE.md |
| https://www.humanlayer.dev/blog/writing-a-good-claude-md | 150-200 지시문 예산, 린터 원칙 (2026-04-05 WebFetch) |
