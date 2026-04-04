# 섹션 4. 컨텍스트는 주는 게 아니라 설계하는 것이다 — 하네스 & 컨텍스트 엔지니어링

> 발표의 핵심 파트. 앞선 섹션에서 "Spec + TDD를 시스템으로 구축하자"로 연결된 흐름을 받아, 하네스와 컨텍스트 엔지니어링의 개념, 실천법, Claude Code에서의 구현을 깊이 다룬다.

---

## 핵심 메시지

> "좋은 사용자는 잘 시키는 사람이 아니라 잘 설계하는 사람이다."
> "Intelligence is not the bottleneck, context is." — Anthropic
> "코드를 짜는 사람도, 코드를 읽는 사람도 아닙니다. 맥락을 설계하는 사람이 이깁니다." — 정구봉

---

## 프롬프트 → 컨텍스트 → 하네스 엔지니어링의 진화

| 구분 | 프롬프트 엔지니어링 | 컨텍스트 엔지니어링 | 하네스 엔지니어링 |
|------|-------------------|-------------------|-------------------|
| **초점** | 모델에 무엇을 말할 것인가 | 모델에 무엇을 보여줄 것인가 | 모델 주변에 무엇을 구축할 것인가 |
| **범위** | 단일 프롬프트 | 입력 파이프라인 전체 | 실행 환경 전체 |
| **성격** | 정적 | 동적 | 시스템 아키텍처 |
| **시대** | 2023-2024 | 2024-2025 | 2025-2026 |

프롬프트 엔지니어링은 컨텍스트 엔지니어링의 **부분 집합**이다. 컨텍스트 엔지니어링은 프롬프트를 포함하되, 메모리, 도구, 상태, 검색 등 **전체 시스템 아키텍처**를 설계한다. 하네스 엔지니어링은 여기에 검증 루프, 오류 복구, 인간 개입 제어까지 포괄하는 **실행 환경 전체**를 다룬다.

### 용어의 기원

**컨텍스트 엔지니어링**:
- 2025년 4월, Dex Horthy (HumanLayer CEO)가 용어를 처음 사용
- 2025년 6월, Tobi Lutke (Shopify CEO)가 트윗으로 대중화: "I really like the term 'context engineering' over prompt engineering. It describes the core skill better."
- Andrej Karpathy가 "+1" 하며 확산: "Context engineering is the delicate art and science of filling the context window with just the right information for the next step."
- Phil Schmid (Hugging Face)의 공식 정의: "적절한 정보와 도구를, 적절한 형식으로, 적절한 시점에 제공하는 동적 시스템을 설계하고 구축하는 학문"

**하네스 엔지니어링**:
- 2026년 2월, Ryan Lopopolo (OpenAI)가 "하네스 엔지니어링" 용어를 대중화
- LangChain의 Vivek Trivedy가 "Agent = Model + Harness" 공식 정립
- Martin Fowler / Thoughtworks에서 업계 관점의 분석 발표

---

## 왜 프롬프트만으로는 부족한가

### 단발 프롬프트는 재현성이 낮다
같은 프롬프트에도 다른 결과가 나온다. AI는 비결정적(non-deterministic) 시스템이다. 프롬프트를 아무리 잘 써도 **환경이 달라지면 결과가 달라진다**.

### 하네스는 품질을 안정화한다
동일한 모델을 사용해도 하네스 품질에 따라 작업 완료율이 **60% vs 98%**로 갈린다.

- **Manus**: 6개월간 하네스를 5번 완전히 재작성. 동일 모델, 5개 아키텍처. 매번 신뢰성 향상
- **Vercel**: v0 코딩 에이전트에서 도구의 80%를 제거하고 더 나은 결과. 적은 도구 = 적은 단계 = 적은 토큰 = 더 높은 성공률

### 신뢰성의 수학
- 멀티스텝 에이전트에서 각 단계 성공률 95%
- 20단계 체인 → 전체 성공률 **36%**
- "95% 동작하는" 에이전트가 실제 작업의 1/3에서 실패하는 이유
- 하네스가 검증 루프, 재시도, 체크포인트를 추가해야 허용 가능한 수준으로

### 더 좋은 모델이 하네스 문제를 해결하지 않는다
더 좋은 모델은 하네스를 덜 중요하게 만드는 것이 아니라 **더 중요하게** 만든다:
1. **능력 확장**: 더 많은 것을 할 수 있고 → 더 많은 실패 모드
2. **비용 최적화**: 좋은 하네스는 단순 작업을 저렴한 모델로, 복잡한 작업을 비싼 모델로 라우팅
3. **신뢰성 요구**: 프로덕션은 99.9% 가용성. 모델은 확률적. 하네스가 재시도, 폴백, 검증 구현

> "The model is commodity. The harness is moat."

---

## Agent = Model + Harness

LangChain의 Vivek Trivedy가 정립한 공식:
> "If you're not the model, you're the harness." (모델이 아닌 것은 전부 하네스다.)

### 비유
- **마구(horse tack)**: 고삐, 안장, 재갈 등 강력하지만 예측 불가능한 동물(= LLM)을 올바른 방향으로 이끄는 장비 전체
- **운영체제(OS)**: 모델은 CPU, 하네스는 OS. CPU는 명령어를 실행하지만, OS가 메모리, 프로세스, I/O, 권한을 관리. OS 없는 CPU는 발열체, 하네스 없는 모델은 데모 — Phil Schmid

### 하네스가 결정하는 것
모델이 텍스트를 생성한다. 하네스가 결정한다:
- 모델이 **무엇을 보는지** (컨텍스트)
- 모델이 **무엇을 할 수 있는지** (도구와 권한)
- 모델이 **언제 멈춰야 하는지** (제약)
- 일이 잘못됐을 때 **무엇이 일어나는지** (복구)

### 하네스의 6대 핵심 구성 요소 (Kai Renner, harness-engineering.ai)

1. **컨텍스트 엔지니어링**: 각 단계에서 모델이 보는 정보를 설계. 무엇을 유지하고, 요약하고, 버릴지 관리
2. **도구 오케스트레이션**: 어떤 도구가 가용한지, 실행이 어떻게 처리되는지. 50개 도구를 주고 알아서 고르라는 식은 반드시 실패
3. **상태 및 메모리 관리**: 수 분~수 시간 실행되는 에이전트의 내구성 있는 상태. 체크포인트-재개
4. **검증 루프**: 출력 생성 후, 결과적 행동 실행 전에 발동하는 검증. 스키마/의미적/정책 유효성
5. **오류 복구**: 실패 감지 → 재시도, 다른 접근법, 인간에게 폴백
6. **인간 개입 제어**: 핵심 의사결정에서 일시정지. DB 삭제? 결제? 이메일 발송? → 승인 요구

---

## 컨텍스트 엔지니어링의 핵심 공식

```
Context = Instructions + Knowledge + Tools + Memory + State
           (지시)       (지식)     (도구)   (기억)   (상태)
```

### LangChain의 WSCI 전략

| 전략 | 설명 |
|------|------|
| **Write (쓰기)** | 컨텍스트 윈도우 외부에 저장하되 접근 가능하게 유지. Scratchpad 패턴 |
| **Select (선택)** | 포함할 정보를 의도적으로 선별. RAG, 도구 설명에 RAG 적용 |
| **Compress (압축)** | 크기를 줄이되 핵심 보존. 요약, 오래된 메시지 압축 |
| **Isolate (격리)** | 서브에이전트로 별도 컨텍스트 윈도우에서 작업 → 요약만 반환 |

### Karpathy의 경고

> "Too much or too irrelevant context can cause LLM costs to go up and performance might come down."

컨텍스트는 많으면 좋은 게 아니다. **적절한** 컨텍스트를 **적절한 시점에** 주는 것이 핵심.

---

## Claude Code에서의 구현: 4개 레이어

정구봉(Team Attention)이 제시한 에이전트 시대의 Context Engineering 4개 레이어:

| 레이어 | 역할 | Claude Code 구현 |
|--------|------|-----------------|
| **CLAUDE.md** | 시스템 성격 정의 | 프로젝트 규칙, 컨벤션, 아키텍처 지침 |
| **Skill** | 실행 로직 구조화 | 재사용 가능한 워크플로우, 슬래시 커맨드 |
| **Memory** | 학습 축적 | 자동 메모리 + 수동 메모리 |
| **MCP** | 외부 도구 연결 | Notion, GitHub, Slack 등 100+ 서비스 |

---

### CLAUDE.md — 프로젝트의 "헌법"

모든 세션에서 자동으로 로드되는 지속적 컨텍스트. 프로젝트의 규칙, 컨벤션, 아키텍처를 정의한다.

**배치 위치와 범위**:

| 범위 | 위치 | 목적 |
|------|------|------|
| 관리 정책 | `/Library/Application Support/ClaudeCode/CLAUDE.md` | 조직 전체 지침 |
| 프로젝트 | `./CLAUDE.md` 또는 `./.claude/CLAUDE.md` | 팀 공유 지침 |
| 개인 | `~/.claude/CLAUDE.md` | 개인 선호도 |

**효과적인 작성법**:
- 200줄 이하 유지
- 마크다운 헤더와 글머리 기호로 구조화
- 검증 가능한 수준으로 구체적 작성
- `@path`로 외부 파일 가져오기 가능 (최대 5홉 깊이)
- 증가하면 참조 콘텐츠를 Skill이나 `.claude/rules/`로 분할

**좋은 예**:
```markdown
## 코드 스타일
- TypeScript strict mode 사용
- 함수명은 camelCase, 타입명은 PascalCase
- 커밋 전 `pnpm lint && pnpm test` 실행 필수

## 금지사항
- any 타입 사용 금지
- console.log 커밋 금지
- .env 파일 수정 금지
```

**나쁜 예**:
```markdown
코드를 잘 작성해주세요.
테스트를 해주세요.
좋은 코드를 만들어주세요.
```

**정구봉 사례**: 159개의 CLAUDE.md 파일과 100개 이상의 스킬을 운영 중

---

### Skills — 재사용 가능한 워크플로우 패키징

`.claude/skills/` 폴더에 `SKILL.md` 파일로 정의. 지시문, 지식, 워크플로우를 패키징.

**핵심: 점진적 공개(Progressive Disclosure)**:
- 세션 시작 시 메타데이터만 로드 (스킬당 수십 토큰)
- 관련 스킬 감지 시 전체 지시문 로드
- 수많은 스킬을 과부하 없이 관리 가능

**SKILL.md 예시**:
```yaml
---
name: deploy
description: Runs the deployment checklist for production releases
---

When deploying to production:
1. Run `pnpm test` and confirm all tests pass
2. Run `pnpm lint` and fix any issues
3. Check for uncommitted changes
4. Create a release tag following semver
5. Push to main and trigger CI/CD
```

**번들 Skills** (Claude Code 기본 제공):
| Skill | 목적 |
|-------|------|
| `/batch` | 대규모 변경을 병렬로 조율, 각각 격리된 git worktree에서 실행 |
| `/claude-api` | 프로젝트 언어에 맞는 Claude API 참조 자료 로드 |
| `/debug` | 디버그 로깅 활성화 및 문제 해결 |
| `/loop` | 프롬프트를 간격에 따라 반복 실행 |
| `/simplify` | 최근 변경 코드의 재사용/품질/효율성 검토 |

**PRD의 진화**: 정구봉에 따르면 기존 Product Requirement Document가 'Skill'로 진화. 각 Skill = 프로덕트 요구사항 + 실행 로직 + 품질 기준을 하나의 프롬프트로 담은 것.

---

### Hooks — 이벤트 기반 결정론적 자동화

특정 이벤트에 자동 실행되는 셸 명령. LLM이 아닌 결정론적 스크립트.

**12+ 이벤트 타입**: SessionStart, PreToolUse, PostToolUse, Notification 등

**활용 예시**:
- 모든 파일 편집 후 ESLint 자동 실행
- 커밋 전 테스트 자동 실행
- 보호된 파일(.env, credentials) 편집 차단
- 작업 완료 시 Slack/Telegram 알림

**Spec + TDD를 시스템으로 구축하는 예**:
- CLAUDE.md에 스펙 템플릿 정의
- Skills로 TDD 워크플로우 패키징 (`/tdd` 커맨드)
- Hooks로 테스트 자동 실행 (PostToolUse에 `pnpm test` 연결)

---

### Memory — 학습의 축적

| | CLAUDE.md | 자동 메모리 |
|---|---|---|
| 작성자 | 사용자 | Claude |
| 포함 내용 | 지침 및 규칙 | 학습 및 패턴 |
| 범위 | 프로젝트, 사용자, 조직 | 작업 트리당 |
| 사용 목적 | 코딩 표준, 워크플로우 | 빌드 명령, 디버깅 인사이트, 선호도 |

---

### MCP — 외부 도구 연결

AI가 외부 서비스와 통신하는 표준 규격. Skills가 "어떻게 사용하는지" 가르친다면, MCP는 "무엇에 접근 가능한지" 제공.

- 2024년 11월 Anthropic이 도입, 2025년 12월 Linux Foundation 산하로 기증
- 2026년 3월 기준: 월간 9,700만 SDK 다운로드, 10,000+ 활성 서버
- 공동 설립/지원: Anthropic, OpenAI, Google, Microsoft, AWS 등

---

## "모델이 사용하는 코드"를 만드는 것

Ouroboros 창시자 Ari Mendelow의 핵심 발견:

> "나는 모델을 사용하는 코드(code that uses a model)를 만드는 것이 아니었다. 모델이 사용하는 코드(code a model can use)를 만들고 있었다."

이 관점 전환이 설계 제약을 뒤집는다:
- **파일 구조**가 중요하다 — 모델이 탐색해야 하니까
- **네이밍**이 중요하다 — 모델이 이름으로 목적을 파악하니까
- **문서화**가 중요하다 — 문서가 곧 모델의 자기인식이니까

---

## Harness Builder — 새로운 역할

기존 Builder, Reviewer 외에 세 번째 역할:

| 역할 | 하는 일 |
|------|---------|
| **Builder** | 기능을 구현하고 코드를 작성 |
| **Reviewer** | 작성된 코드의 품질, 정확성, 보안을 검토 |
| **Harness Builder** | 에이전트가 일하는 환경 자체를 설계 |

Harness Builder의 핵심 업무 (OpenAI 팀 경험 기반):
1. **리포지토리 지식 체계 설계**: 구조화된 `docs/` 디렉토리를 진실의 체계로 운영
2. **결정론적 제약 구현**: 커스텀 린터, 구조적 테스트, 아키텍처 경계 강제
3. **에이전트 가독성 최적화**: 코드를 에이전트가 읽기 좋게 최적화
4. **취향과 원칙의 인코딩**: 인간의 판단을 문서화나 도구에 직접 인코딩

OpenAI Codex 팀이 5개월간 **수동으로 작성한 코드 0줄**로 100만 줄 프로덕트를 만든 실험에서:
> "인간이 방향을 잡고, 에이전트가 실행한다."
> "우리 엔지니어링 팀의 주된 업무는 에이전트가 유용한 일을 할 수 있도록 환경을 만드는 것이 되었다."

에이전트가 어려움을 겪을 때 해결책은 "더 열심히 시도하라"가 아니었다. **"어떤 역량이 빠져 있는가? 그것을 에이전트가 읽을 수 있고 강제 가능하게 만들려면?"**

---

## 미래 전망: 하네스 템플릿의 시대

Martin Fowler / Thoughtworks의 Birgitta Bockeler:
> "미래에는 팀이 일반적인 애플리케이션 토폴로지를 위한 하네스 세트에서 하나를 골라 시작하는 상상을 하게 됐다. 이것은 오늘날의 서비스 템플릿을 연상시킨다."

하네스는 커스텀 린터, 구조적 테스트, 기본 컨텍스트 및 지식 문서를 포함한 **새로운 서비스 템플릿**이 될 수 있다.

---

## 전환 멘트 (다음 섹션으로)

> "하네스를 잘 설계하는 것이 핵심이라는 건 알겠습니다. 그런데 잘못 설계하면 어떻게 될까요? 다음은 실제로 자주 발생하는 실패 패턴입니다."

---

## 참고 자료

| 자료 | 활용 부분 |
|------|----------|
| research/harness_engineering.md | 하네스 정의, Agent=Model+Harness, 6대 구성요소, 신뢰성의 수학, Harness Builder, Ouroboros, OpenAI 사례, 미래 전망 |
| research/context_engineering.md | 컨텍스트 엔지니어링 정의, 용어 기원, WSCI 전략, 5대 구성요소, Claude Code 구현 |
| linkedin/linkedin_goobong_jeong_context_engineering.md | 4개 레이어, Harness Builder 역할, PRD→Skill 진화, 159개 CLAUDE.md |
| official/extensions/official_memory.md | CLAUDE.md 배치/범위, 효과적 작성법, 자동 메모리 |
| official/extensions/official_skills.md | Skill 생성법, 번들 Skills, 점진적 공개 |
| official/extensions/official_hooks.md | Hook 이벤트 타입, 활용 예시 |
| official/extensions/official_mcp.md | MCP 정의, 설치, 활용 |
