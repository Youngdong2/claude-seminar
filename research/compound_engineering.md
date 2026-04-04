# Compound Engineering (컴파운드 엔지니어링) 심층 조사 보고서

> 작성일: 2026-03-31
> 조사 범위: 정의, 기원, 핵심 구성요소, 관련 프레임워크, 한국 적용 사례, 유사 개념 비교

---

## 출처 및 참고 링크

### 원문 아티클 (Every)
- [Compound Engineering: How Every Codes With Agents](https://every.to/chain-of-thought/compound-engineering-how-every-codes-with-agents) - Dan Shipper & Kieran Klaassen (2025-12-11, 최초 공개)
- [Compound Engineering: The Definitive Guide](https://every.to/source-code/compound-engineering-the-definitive-guide) - Kieran Klaassen (2026-02-09)
- [Compound Engineering Guide](https://every.to/guides/compound-engineering) - Every 공식 가이드 페이지
- [Compound Engineering Camp: Every Step, From Scratch](https://every.to/source-code/compound-engineering-camp-every-step-from-scratch) - (2026-03-13)

### GitHub
- [EveryInc/compound-engineering-plugin](https://github.com/EveryInc/compound-engineering-plugin) - 공식 플러그인 (12,300+ stars, MIT License)

### 분석 및 해설
- [Learning from Every's Compound Engineering](https://lethain.com/everyinc-compound-engineering/) - Will Larson (Irrational Exuberance)
- [Compound Engineering: the AI coding workflow that actually learns](https://velvetshark.com/compound-engineering-workflow) - Radek Sienkiewicz (VelvetShark)
- [Compound Engineering: The Next Paradigm Shift](https://www.vincirufus.com/en/posts/compound-engineering/) - Vinci Rufus
- [Compound Engineering: Transforming Technical Debt into Technical Assets](https://dev.to/tumf/compound-engineering-transforming-technical-debt-into-technical-assets-with-the-8020-rule-4bdk) - DEV Community
- [Compound Engineering Plugin 해설](https://www.vibesparking.com/en/blog/ai/2026-01-03-compound-engineering-plugin-claude-code/) - Vibe Sparking AI
- [Compound Engineering: AI 네이티브 엔지니어링 철학 (한국어 요약)](https://news.hada.io/topic?id=26560) - GeekNews

### 비교 분석
- [Compound / Harness / Context Engineering 3대 개발 수법 비교 (일본어)](https://qiita.com/emi_ndk/items/e86ce7def46f440385f9) - Qiita
- [What Is Harness Engineering?](https://harness-engineering.ai/blog/what-is-harness-engineering/) - Kai Renner
- [The Emerging "Harness Engineering" Playbook](https://www.ignorance.ai/p/the-emerging-harness-engineering) - Charlie Guo

### Boris Cherny / Claude Code 관련
- [How Boris Uses Claude Code](https://howborisusesclaudecode.com/) - 공식 사이트
- [How the Creator of Claude Code Actually Uses Claude Code](https://getpushtoprod.substack.com/p/how-the-creator-of-claude-code-actually)
- [Boris Cherny's Claude Setup (LinkedIn)](https://www.linkedin.com/posts/stasbel_boris-cherny-claude-code-creator-just-shared-activity-7413977077873438721-6GBx)
- [Building Claude Code with Boris Cherny](https://newsletter.pragmaticengineer.com/p/building-claude-code-with-boris-cherny) - Gergely Orosz (Pragmatic Engineer)

### 한국 관련
- [Team Attention 공식 사이트](https://www.team-attention.com/en) - 정구봉 공동 창립
- [AI Native Camp](https://camp.re-builder.xyz/) - Re:Builder / Delta Society
- [한국 최초 랄프톤 후기: 하네스 엔지니어링 시대](https://briandwjang.substack.com/p/8d3) - 브라이언(장동욱)
- [이웅재 LinkedIn](https://kr.linkedin.com/in/woongjae-lee) - Delta Society
- [정구봉 Goobong Jeong LinkedIn](https://kr.linkedin.com/in/gb-jeong) - Team Attention

### 기타
- [복利工程(Compound Engineering): AI 原生时代의 소프트웨어 개발 신철학](https://tonybai.com/2026/02/21/compound-engineering-ai-native-software-development-philosophy/) - Tony Bai (중국어)
- [Compound Engineering: AI-Assisted Software Development Methodology](https://reading.torqsoftware.com/notes/software/ai-ml/agentic-coding/2026-01-19-compound-engineering-claude-code) - Reading List

---

## 1. Compound Engineering의 정의와 개념

### 1.1 정의

**Compound Engineering(컴파운드 엔지니어링)** 은 AI 에이전트를 활용한 소프트웨어 개발에서, **각 작업 단위(unit of work)가 이후의 작업을 더 쉽게 만드는** 복리형(compounding) 소프트웨어 개발 방법론이다.

> "The core philosophy of compound engineering is that each unit of engineering work should make subsequent units easier -- not harder."
> -- Kieran Klaassen, Every

전통적인 소프트웨어 개발에서는 기능을 추가할수록 복잡성이 증가하여, 10년 후에는 시스템과 싸우는 데 더 많은 시간을 소비하게 된다. Compound Engineering은 이 역학을 뒤집는다:

| 전통적 개발 | Compound Engineering |
|---|---|
| 기능 추가 = 복잡성 증가 | 기능 추가 = 시스템이 새로운 역량을 학습 |
| 시간이 지나면 이해/수정/신뢰가 어려워짐 | 시간이 지나면 이해/수정/신뢰가 쉬워짐 |
| 기술 부채 축적 | 기술 자산(technical asset) 축적 |
| 코드가 주요 산출물 | 코드를 생산하는 시스템이 주요 산출물 |

### 1.2 핵심 철학

Compound Engineering의 핵심은 **"복리(compound interest)"** 의 금융 개념을 소프트웨어 개발에 적용한 것이다:

- **단리(simple interest)**: 매번 같은 노력으로 같은 결과 (전통적 개발)
- **복리(compound interest)**: 이전 작업의 학습이 축적되어 다음 작업의 효율이 기하급수적으로 증가 (Compound Engineering)

이를 위한 실천 원칙:
1. **모든 작업 단위가 후속 작업을 쉽게 만들 것**
2. **취향(taste)을 시스템에 내장할 것** -- 리뷰가 아닌 규칙으로
3. **직접 작업하지 말고 시스템을 가르칠 것**
4. **안전망을 구축할 것** -- 리뷰 프로세스가 아닌 자동화된 가드레일
5. **환경을 에이전트 네이티브로 구조화할 것**
6. **복리적 사고를 모든 곳에 적용할 것**

---

## 2. 기원과 주요 제안자

### 2.1 원조: Every (Dan Shipper & Kieran Klaassen)

Compound Engineering이라는 용어와 체계적 방법론은 **Every** 사의 **Dan Shipper**(CEO/공동 창립자)와 **Kieran Klaassen**(Cora 제너럴 매니저)이 2025년 12월에 처음 공식적으로 제안했다.

- **Dan Shipper**: Every의 CEO이자 공동 창립자. Chain of Thought 칼럼과 AI&I 팟캐스트 진행자
- **Kieran Klaassen**: Every의 AI 이메일 비서 Cora를 처음부터 혼자 구축하면서 이 방법론을 실전에서 발전시킴

Kieran은 Cora를 단독으로 개발하면서 AI와의 협업 패턴을 체계화했고, 이것이 Compound Engineering의 원형이 되었다. Every는 5개 소프트웨어 제품을 각각 1인 엔지니어링 팀으로 운영하면서 이 방법론의 효과를 입증했다.

최초 공개 아티클은 **"Compound Engineering: How Every Codes With Agents"** (2025-12-11)이며, 이후 **"The Definitive Guide"** (2026-02-09)에서 완전한 가이드가 공개되었다.

### 2.2 Boris Cherny와 "Compounding Engineering"

**Boris Cherny**는 Anthropic의 **Claude Code 창시자**이자 현재 Head of Claude Code이다. 그는 Dan Shipper의 Compound Engineering 개념에서 영감을 받아 Anthropic 내부에서 **"Compounding Engineering"** 이라는 유사한 실천 방식을 적용했다.

Boris의 핵심 실천:
- Claude Code 팀은 **하나의 공유 CLAUDE.md** 파일을 git에 체크인하여 사용
- 팀 전체가 **주 수회** CLAUDE.md를 업데이트
- **"Claude가 잘못된 행동을 할 때마다 CLAUDE.md에 추가"** 하여 다음 세션에서 반복하지 않도록 함
- 코드 리뷰 시 **PR에서 @claude를 태그**하여 CLAUDE.md 업데이트를 자동화
- **Claude Code GitHub Action**을 활용하여 자동으로 CLAUDE.md를 커밋

이 접근법은 Compound Engineering의 "Compound" 단계를 극단적으로 자동화한 것으로, 매 PR마다 제도적 지식(institutional knowledge)이 축적되는 구조이다.

### 2.3 한국의 관련 인물들

#### 정구봉 (Goobong Jeong) - Team Attention

**정구봉**은 **Team Attention(팀어텐션)** 의 공동 창립자이자 CTO이다.

- **경력**: Pozalabs 공동 창립자, SpaceY CPO, 10년 경력의 AI 엔지니어
- **Team Attention**: AI 네이티브 엔지니어링 전문 기업. 4명의 창립자(정구봉, 이호연, 박건태, 김창회) 모두 스타트업 창업 경험 보유
- **주요 활동**: Claude Code 전문, AI Agent 개발 및 배포, 워크플로우 재설계
- **커뮤니티**: AI Builders 시리즈(밋업, 해커톤, 스킬톤), Show and Prove 클럽, Zero Shot 모임 등 운영
- **한국 최초 랄프톤(Ralphton) 주최**: 13명의 해커가 참여하여 하네스 엔지니어링을 기반으로 AI 코딩 에이전트가 자율적으로 루프를 돌리는 해커톤 개최

#### 이웅재 (Woongjae Lee) - Delta Society

**이웅재**는 **Delta Society(델타소사이어티)** 소속의 Product Builder이다.

- **역할**: 기획, 프로덕션, 배포를 단독으로 처리하는 1인 개발자
- **AI Native Camp 공동 준비**: 정구봉과 함께 AI Native Camp를 기획/운영
- **핵심 관점**: "비개발자가 AI Native 해지는 데 필요한 건, 더 좋은 AI 도구가 아니라 좋은 프레임워크"
- **접근법**: 도구 사용법보다 AI 변화 자체에 대한 프레임워크를 함께 구축하는 것을 강조

이웅재와 정구봉의 협업은 한국에서 Compound Engineering의 핵심 원리(지식 축적, 복리적 성장, 체계적 워크플로우)를 비개발자에게까지 확장하려는 시도로 해석된다.

---

## 3. KOMPOUND 프레임워크와의 관계

### 3.1 조사 결과

웹 검색과 다양한 소스를 통해 조사한 결과, **"KOMPOUND"라는 이름의 공식적으로 문서화된 독립 프레임워크는 확인되지 않았다.** 다만, 다음과 같은 맥락에서 그 관계를 추론할 수 있다:

1. **AI Native Camp의 커리큘럼**: Re:Builder(이웅재/Delta Society)가 운영하는 AI Native Camp의 4일차 주제가 **"Compound Engineering -- 자동화와 워크플로우 설계"** 로, Every의 Compound Engineering 원리를 비개발자 교육에 적용하고 있다.

2. **한국형 적용 프레임워크**: AI Native Camp의 전체 커리큘럼은 다음 순서를 따른다:
   - 1일차: Claude Code 입문 및 환경 설정
   - 2일차: Context Communication 원칙과 IDE 설정
   - 3일차: **Context Engineering** -- 암묵지를 AI용으로 구조화
   - 4일차: **Compound Engineering** -- 자동화와 워크플로우 설계
   - 5~7일차: AI 기술 변화 대응, 실전 적용, 프로젝트 완성

3. **추정**: "KOMPOUND"라는 명칭은 한국 커뮤니티 내에서 Compound Engineering의 원리를 한국 맥락에 맞게 재구성하거나, "K(Korea) + Compound"의 조합으로 사용된 비공식적 명칭일 가능성이 있다. 또는 Team Attention이나 Delta Society의 내부 워크숍/교육 과정에서 사용되는 프레임워크명일 수 있으나, 공개적으로 문서화된 자료는 발견하지 못했다.

### 3.2 관련 한국 커뮤니티 활동

- **AI Native Camp** (camp.re-builder.xyz): 1주일 집중 프로그램, 30명 규모, Claude Code Max 구독 필요
- **랄프톤(Ralphton)**: 정구봉(Team Attention) 주최, 한국 최초의 AI 코딩 에이전트 해커톤
- **AI Builders**: Team Attention 운영 커뮤니티로 밋업, 해커톤, 스킬톤 등 정기 운영

---

## 4. Context Engineering, Harness Engineering과의 차이점 및 관계

### 4.1 3대 방법론 비교

2026년 AI 에이전트 시대의 3대 개발 방법론은 **경쟁이 아닌 보완 관계**에 있다:

```
+-----------------------------------------------------------+
|           Context Engineering (최광의)                      |
|   "모델이 보는 세계를 설계한다"                                |
|                                                           |
|   +---------------------------------------------------+   |
|   |         Harness Engineering (실행 제어)              |   |
|   |   "에이전트의 행동을 제약/검증/수정한다"                  |   |
|   |                                                   |   |
|   |   +-------------------------------------------+   |   |
|   |   |     Compound Engineering (축적)            |   |   |
|   |   |   "각 작업이 다음 작업을 가속한다"              |   |   |
|   |   +-------------------------------------------+   |   |
|   +---------------------------------------------------+   |
+-----------------------------------------------------------+
```

| 구분 | Context Engineering | Harness Engineering | Compound Engineering |
|---|---|---|---|
| **제안자** | Anthropic / Martin Fowler | OpenAI (Codex팀) | Every (Dan Shipper, Kieran Klaassen) |
| **핵심 질문** | 모델에게 무엇을 보여줄 것인가? | 모델을 어떻게 제어할 것인가? | 학습을 어떻게 축적할 것인가? |
| **초점** | 입력(input)의 설계 | 실행(execution)의 제어 | 지식(knowledge)의 복리 |
| **범위** | 프롬프트, RAG, 메모리, MCP, 상태관리 등 문맥 전체 | 샌드박스, 검증 루프, 비용 제어, 관측성 | Plan-Work-Review-Compound 루프 |
| **시간축** | 단일 세션 내 최적화 | 단일 작업의 안정적 실행 | 세션 간 누적 학습 |
| **핵심 메트릭** | 컨텍스트 윈도우 활용 효율 | 태스크 완료율, 비용 대비 효과 | 작업당 시간 감소율 (복리 곡선) |

### 4.2 각 방법론의 상세 비교

#### Context Engineering
- **정의**: AI 모델이 주어진 상황에 최적화된 응답을 생성하도록 문맥(Context)을 관리하는 기술
- **구성요소**: 시스템 프롬프트, CLAUDE.md, Rules, Skills, MCP Servers, Hooks 등
- **핵심 원칙**: "프롬프트 엔지니어링이 '무엇을 말할까'라면, Context Engineering은 '무엇을 보여줄까'"
- **Compound Engineering과의 관계**: Compound Engineering의 "Plan" 단계에서 Context Engineering이 핵심적으로 활용됨. CLAUDE.md가 두 방법론의 교차점

#### Harness Engineering
- **정의**: AI 에이전트가 장기간 올바른 작업을 일관되게 수행하도록 제약/검증/피드백 시스템을 설계하는 방법론
- **기원**: OpenAI Codex 팀이 3명의 엔지니어로 5개월간 100만 줄 코드를 0줄의 수작업 코드로 생성한 실험에서 유래
- **3대 기둥**: 아키텍처 제약, 골든 프린시플(황금 원칙), 피드백 루프
- **핵심 통찰**: "모델을 바꾸면 출력 품질이 10-15% 변한다. 하네스를 바꾸면 시스템이 작동하는지 자체가 바뀐다"
- **Compound Engineering과의 관계**: Harness Engineering의 "피드백 루프"가 Compound Engineering의 "Compound" 단계와 유사하지만, Harness는 실행 시점의 안정성에 초점을 두고, Compound는 세션 간 지식 축적에 초점을 둠

#### 핵심 차이
```
Context Engineering  = 에이전트에게 올바른 정보를 제공 (입력 최적화)
Harness Engineering  = 에이전트의 행동을 안전하게 제어 (실행 안정화)  
Compound Engineering = 매 작업의 학습을 다음 작업에 반영 (지식 복리화)
```

---

## 5. 핵심 구성요소

### 5.1 메인 루프: Plan -> Work -> Review -> Compound

Compound Engineering의 핵심은 4단계 반복 루프이며, 시간 배분은 **80%가 Plan + Review, 20%가 Work + Compound**이다.

```
+---------+     +---------+     +---------+     +-----------+
|  Plan   | --> |  Work   | --> | Review  | --> | Compound  |
|  (40%)  |     |  (10%)  |     |  (30%)  |     |   (20%)   |
+---------+     +---------+     +---------+     +-----+-----+
                                                      |
                                                      v
                                                다음 루프가
                                                더 빨라진다
```

#### Phase 1: Plan (계획) -- 40%
- 요구사항 이해 (무엇을, 왜, 어떤 제약에서)
- 코드베이스 조사 (기존 패턴, 유사 기능)
- 외부 조사 (프레임워크 문서, 업계 베스트 프랙티스)
- 솔루션 설계 (접근 방식, 변경 대상 파일)
- 계획 검증 (완결성, 정합성)

#### Phase 2: Work (실행) -- 10%
- 격리 환경(Git worktree/branch)에서 작업
- 에이전트가 계획에 따라 단계별 구현
- 변경마다 테스트/린팅/타입 체크 수행

#### Phase 3: Review (리뷰) -- 30%
- **14개 이상의 전문 에이전트**가 병렬로 코드 검토
  - Security Sentinel (보안)
  - Performance Oracle (성능)
  - Architecture Strategist (아키텍처)
  - Code Simplicity Reviewer (복잡도)
  - Data Integrity Guardian (데이터 무결성)
  - 프레임워크별 리뷰어 등
- 발견 사항을 P1(필수)/P2(권장)/P3(개선)으로 분류

#### Phase 4: Compound (복리화) -- 20% (가장 중요한 단계)
- 6개 서브에이전트가 병렬 가동:
  1. **Context Analyzer**: 무엇이 해결되었는지 분석
  2. **Solution Extractor**: 재사용 가능한 패턴 추출
  3. **Category Classifier**: 메타데이터/태그 부여
  4. **Documentation Writer**: `docs/solutions/`에 구조화 문서 생성
  5. **CLAUDE.md Updater**: 새 패턴을 CLAUDE.md에 추가
  6. **Verifier**: "다음에 시스템이 이 문제를 자동 감지하는가?" 검증

### 5.2 SSoT (Single Source of Truth) -- CLAUDE.md

**CLAUDE.md**는 Compound Engineering에서 가장 중요한 파일이다.

- 에이전트가 **매 세션 시작 시** 자동으로 읽는 파일
- 프로젝트의 **선호사항, 패턴, 컨텍스트**를 저장하는 단일 진실의 원천
- 개발자의 "취향(taste)"을 자연어로 표현한 것
  - 왜 guard clause를 nested if보다 선호하는지
  - 네이밍 규칙, 에러 처리 패턴, 테스트 접근 방식 등
- 팀 전체가 공유하며 지속적으로 업데이트

CLAUDE.md를 SSoT로 활용하는 이유:
1. **일관성**: 모든 에이전트 세션이 동일한 컨텍스트를 가짐
2. **자동 전파**: 한 번 기록하면 모든 팀원과 에이전트에 자동 적용
3. **누적 학습**: 매 PR, 매 리뷰에서 발견된 패턴이 추가됨
4. **온보딩 가속**: 신규 입사자도 시니어 엔지니어 수준의 컨텍스트를 즉시 확보

### 5.3 지식 축적 구조

```
프로젝트 루트/
  CLAUDE.md              -- 에이전트가 매 세션 읽는 핵심 파일
  docs/
    solutions/           -- 해결된 문제의 검색 가능한 문서 (제도적 지식)
    brainstorms/         -- brainstorm 커맨드 출력
    plans/               -- plan 커맨드 출력
  todos/                 -- 우선순위/상태별 작업 항목
```

### 5.4 버려야 할 8가지 믿음

Compound Engineering은 전통적 소프트웨어 개발의 8가지 통념을 버릴 것을 요구한다:

| 기존 믿음 | 새로운 관점 |
|---|---|
| 코드는 손으로 작성해야 한다 | 품질이 중요하지, 누가 타이핑하는지는 중요하지 않다 |
| 모든 라인을 수동 리뷰해야 한다 | 자동화 시스템이 동일한 이슈를 감지할 수 있다 |
| 솔루션은 엔지니어에게서 나와야 한다 | 엔지니어의 역할은 "취향(taste)" 추가 |
| 코드가 주요 산출물이다 | 코드를 생산하는 시스템이 더 가치 있다 |
| 코드 작성이 핵심 업무다 | 가치를 전달(ship value)하는 것이 핵심 |
| 첫 시도가 좋아야 한다 | 첫 시도 불량률 95%. 빠른 반복이 핵심 |
| 코드는 자기 표현이다 | 코드는 팀, 제품, 사용자에게 속한다 |
| 더 많이 타이핑해야 더 많이 배운다 | AI 구현 10개를 리뷰하는 것이 직접 2개 타이핑보다 낫다 |

### 5.5 50/50 규칙

- **전통**: 90% 기능 개발 / 10% 개선 --> 기술 부채 축적
- **Compound**: **50% 기능 개발 / 50% 시스템 개선** --> 복리 가속
- 리뷰 에이전트 1시간 투자 = 1년간 10시간의 리뷰 시간 절약

---

## 6. "복리(Compound)"가 AI 개발에 적용되는 방식

### 6.1 금융의 복리 vs AI 개발의 복리

금융에서 복리(compound interest)는 이자에 이자가 붙어 기하급수적으로 성장하는 원리이다. Compound Engineering은 이 개념을 소프트웨어 개발에 정확히 적용한다:

```
금융 복리:
  원금 --> 이자 발생 --> 이자에 또 이자 --> 기하급수적 성장

개발 복리:
  작업 --> 학습 발생 --> 학습이 다음 작업을 가속 --> 기하급수적 생산성 향상
```

### 6.2 복리가 작동하는 구체적 메커니즘

1. **버그 수정의 복리**: 버그를 수정하면, 그 패턴이 `docs/solutions/`에 문서화되고 CLAUDE.md에 규칙으로 추가됨. 다음에 유사한 버그가 발생하면 에이전트가 자동으로 감지/방지

2. **코드 리뷰의 복리**: 리뷰 피드백이 리뷰 에이전트의 규칙으로 변환됨. 같은 피드백을 두 번 줄 필요가 없음

3. **아키텍처 결정의 복리**: 한 번 내린 아키텍처 결정이 문서화되어, 에이전트가 향후 유사한 결정 시 자동으로 참고

4. **팀 지식의 복리**: "Sarah에게 물어봐, auth 잘 알아" 대신, Sarah가 `/compound`를 실행하여 해결책을 문서화 --> 누구나 검색 가능

### 6.3 복리 효과의 실증

- **Vinci Rufus의 분석**: 2025년 바이브 코딩이 30-70% 빠른 개발을 달성했다면, 2026년 Compound Engineering은 **300-700% 빠른 개발**을 달성. 경쟁 우위가 "생성 속도"에서 "피드백 품질"로 이동
- **Every의 실적**: 5개 소프트웨어 제품을 각각 1인 엔지니어링 팀으로 운영. 수천 명의 사용자가 매일 사용하는 프로덕션 서비스
- **VelvetShark 보고**: "과거 1주일 걸리던 기능이 1-3일에 배포"

### 6.4 개발자 성장의 5단계 래더

| 단계 | 이름 | 설명 | 복리 시작 |
|---|---|---|---|
| Stage 0 | 수동 개발 | AI 없이 코드 작성 | X |
| Stage 1 | 채팅 기반 어시스턴스 | ChatGPT/Claude에 질문, 복사/붙여넣기 | X |
| Stage 2 | 에이전틱 도구 + 라인별 리뷰 | Claude Code/Cursor가 직접 변경 | X |
| **Stage 3** | **계획 우선, PR 수준 리뷰** | **Compound Engineering 시작점** | **O** |
| Stage 4 | 아이디어 -> PR (단일 머신) | 결과를 제시하면 에이전트가 모든 것 수행 | O |
| Stage 5 | 병렬 클라우드 실행 (다중 디바이스) | 에이전트 함대를 지휘하는 역할 | O |

---

## 7. 실제 적용 사례

### 7.1 Every -- 원조 적용 사례

- **규모**: 5개 소프트웨어 제품 (Cora, Spiral, Sparkle, Monologue 등)
- **팀 구성**: 각 제품당 1인 엔지니어링 팀 (총 6명의 엔지니어)
- **성과**: 수천 명의 사용자가 매일 사용하는 프로덕션 서비스
- **도구**: 주로 Claude Code 사용, 일부 팀원은 Factory Droid, OpenAI Codex CLI도 활용
- **공개물**: Compound Engineering Plugin (GitHub 12,300+ stars)

### 7.2 Compound Engineering Plugin

GitHub에서 **12,300개 이상의 스타**를 받은 오픈소스 플러그인으로, Every의 내부 워크플로우를 그대로 사용할 수 있다.

**구성**:
- 26개 전문 에이전트 (14개 리뷰, 4개 리서치, 3개 디자인, 5개 워크플로우)
- 20개 커맨드 (`/ce:brainstorm`, `/ce:plan`, `/ce:work`, `/ce:review`, `/ce:compound` 등)
- 14개 스킬
- 1개 MCP 서버 (Context7 -- 100+ 라이브러리의 최신 문서 접근)

**지원 플랫폼**: Claude Code, Cursor, OpenCode, Codex, Factory Droid, Pi, Gemini CLI, GitHub Copilot, Kiro, Windsurf, OpenClaw, Qwen Code

**설치** (Claude Code):
```bash
/plugin marketplace add EveryInc/compound-engineering-plugin
/plugin install compound-engineering
```

### 7.3 AI Native Camp -- 한국 적용

- **운영**: Re:Builder (이웅재, Delta Society) + 정구봉 (Team Attention) 협력
- **기간**: 1주일 집중 프로그램 (2회 오프라인 + 5회 온라인)
- **규모**: 30명 참가자
- **대상**: 비개발자 포함 -- 경영, 전략, 디자인, HR, 연구, 재무, 콘텐츠, 고객 관계 전문가
- **커리큘럼**: Context Communication -> Context Engineering -> **Compound Engineering** -> 실전 적용
- **성과물**: 자동화 시스템 1개, GitHub 리포지토리(개인 스킬/워크플로우), AI 커뮤니케이션 프레임워크

### 7.4 한국 최초 랄프톤 (Ralphton)

- **주최**: 정구봉 (Team Attention)
- **참가**: 13명의 해커
- **방식**: 1일차에 하네스 엔지니어링 완성 -> Ralph 모드로 AI 코딩 에이전트가 수시간 자율 루프 -> 다음날 아침 결과 확인
- **우승팀 성과**: 10만 줄 코드 생성 (70%가 테스트 코드), 133회 소크라테스식 추론 사이클로 모호성 점수를 0.05로 감소

### 7.5 기타 글로벌 적용

| 조직 | 적용 방식 | 성과 |
|---|---|---|
| Vercel | 도구를 15개에서 2개로 축소 (하네스 최적화) | 정확도 80%->100%, 토큰 -37%, 속도 3.5배 |
| Stripe (Minions) | 에이전트 하네스로 코드 변경 | 주 1,000개 이상 PR 머지 |
| OpenAI (Codex) | 샌드박스 + 검증 루프 + 구조화된 도구 접근 | 3명이 5개월간 100만 줄 생성 |
| LangChain | 하네스 엔지니어링 개선 | 태스크 완료율 52.8% -> 66.5% (모델 변경 없이) |

---

## 8. 관련 아티클 및 자료 모음

### 핵심 아티클

| 제목 | 저자 | 날짜 | 링크 |
|---|---|---|---|
| Compound Engineering: How Every Codes With Agents | Dan Shipper, Kieran Klaassen | 2025-12-11 | [Every](https://every.to/chain-of-thought/compound-engineering-how-every-codes-with-agents) |
| Compound Engineering: The Definitive Guide | Kieran Klaassen | 2026-02-09 | [Every](https://every.to/source-code/compound-engineering-the-definitive-guide) |
| Learning from Every's Compound Engineering | Will Larson | 2026-01 | [Irrational Exuberance](https://lethain.com/everyinc-compound-engineering/) |
| The AI coding workflow that actually learns | Radek Sienkiewicz | 2026-01-23 | [VelvetShark](https://velvetshark.com/compound-engineering-workflow) |
| The Next Paradigm Shift in Software Engineering | Vinci Rufus | 2026-01-05 | [vincirufus.com](https://www.vincirufus.com/en/posts/compound-engineering/) |
| Transforming Technical Debt into Technical Assets | tumf | 2026-02-02 | [DEV Community](https://dev.to/tumf/compound-engineering-transforming-technical-debt-into-technical-assets-with-the-8020-rule-4bdk) |
| AI 네이티브 엔지니어링 철학 (한국어 요약) | neo | 2026-02-10 | [GeekNews](https://news.hada.io/topic?id=26560) |

### 비교/분석 아티클

| 제목 | 저자 | 링크 |
|---|---|---|
| Compound/Harness/Context Engineering 3대 비교 | emi_ndk | [Qiita](https://qiita.com/emi_ndk/items/e86ce7def46f440385f9) |
| What Is Harness Engineering? | Kai Renner | [harness-engineering.ai](https://harness-engineering.ai/blog/what-is-harness-engineering/) |
| The Emerging Harness Engineering Playbook | Charlie Guo | [ignorance.ai](https://www.ignorance.ai/p/the-emerging-harness-engineering) |

### Boris Cherny 관련

| 제목 | 링크 |
|---|---|
| How Boris Uses Claude Code | [howborisusesclaudecode.com](https://howborisusesclaudecode.com/) |
| Building Claude Code with Boris Cherny | [Pragmatic Engineer](https://newsletter.pragmaticengineer.com/p/building-claude-code-with-boris-cherny) |
| Head of Claude Code: What happens after coding is solved | [Lenny's Newsletter](https://www.lennysnewsletter.com/p/head-of-claude-code-what-happens) |

### 한국 관련

| 제목 | 저자 | 링크 |
|---|---|---|
| 한국 최초 랄프톤 후기 | 브라이언(장동욱) | [Substack](https://briandwjang.substack.com/p/8d3) |
| Team Attention 공식 | - | [team-attention.com](https://www.team-attention.com/en) |
| AI Native Camp | Re:Builder | [camp.re-builder.xyz](https://camp.re-builder.xyz/) |

### 영상

| 제목 | 채널 | 링크 |
|---|---|---|
| Compound Engineering: Your Questions Answered Live | Every | [YouTube](https://www.youtube.com/watch?v=6r9gDc_sr7k) |
| Compound Engineering Explained | Every | [Recapio](https://recapio.com/digest/compound-engineering-explained-by-every) |

---

## 9. Boris Cherny의 "Compounding Engineering"과 Compound Engineering Plugin의 관계

### 9.1 Boris Cherny의 "Compounding Engineering"

Boris Cherny(Claude Code 창시자)는 Dan Shipper의 Compound Engineering 개념에 영감을 받아 Anthropic 내부에서 **"Compounding Engineering"** 이라는 실천 방식을 독립적으로 발전시켰다.

**핵심 실천**:
1. **공유 CLAUDE.md**: 팀 전체가 하나의 CLAUDE.md를 git에 체크인하여 공유
2. **지속적 업데이트**: Claude가 잘못된 행동을 할 때마다 CLAUDE.md에 규칙 추가
3. **PR 기반 자동화**: 코드 리뷰 시 `@claude`를 태그하여 CLAUDE.md 업데이트를 PR의 일부로 자동 생성
4. **GitHub Action 연동**: Claude Code GitHub Action(`/install-github-action`)으로 자동 커밋

### 9.2 Compound Engineering Plugin

Every Inc.가 개발한 공식 오픈소스 플러그인으로, Boris의 "Compounding Engineering" 사상과 Every의 Compound Engineering 방법론을 **실행 가능한 도구로 구현**한 것이다.

**관계**:
- Boris의 접근법은 **CLAUDE.md를 SSoT로 수동/반자동 업데이트**하는 것에 초점
- Every의 플러그인은 이를 **완전 자동화된 워크플로우** (brainstorm -> plan -> work -> review -> compound)로 확장
- 플러그인의 "Compound" 단계가 Boris의 "CLAUDE.md 자동 업데이트" 개념을 구조화/자동화한 것
- 두 접근법 모두 **"매 작업이 CLAUDE.md를 더 풍부하게 만들어 다음 작업을 가속한다"** 는 동일한 복리 원칙을 공유

### 9.3 핵심 차이

| 구분 | Boris의 Compounding Engineering | Every의 Compound Engineering Plugin |
|---|---|---|
| **범위** | CLAUDE.md 중심의 팀 실천 | 전체 개발 라이프사이클 자동화 |
| **자동화 수준** | 반자동 (PR에서 @claude 태그) | 완전 자동 (6개 서브에이전트가 병렬 처리) |
| **대상** | Anthropic 내부 Claude Code 팀 | 모든 개발자/팀 |
| **산출물** | 업데이트된 CLAUDE.md | docs/solutions/, CLAUDE.md, 리뷰 보고서 등 |
| **도구** | Claude Code + GitHub Action | 26개 에이전트, 20개 커맨드, 14개 스킬, MCP 서버 |

---

## 10. 종합 정리

### Compound Engineering의 핵심 가치

1. **패러다임 전환**: 코드를 작성하는 것에서 **코드를 작성하는 시스템을 설계하는 것**으로 이동
2. **복리의 힘**: 단발성 생산성 향상이 아닌, 시간이 지남에 따라 **기하급수적으로 증가하는 생산성**
3. **지식 민주화**: 시니어 엔지니어의 암묵지가 CLAUDE.md와 docs/solutions/에 코드화되어 **모든 팀원이 즉시 활용** 가능
4. **에이전트 네이티브**: AI 에이전트를 보조 도구가 아닌 **핵심 팀원**으로 대우하는 환경 설계

### 2026년 현재 위치

Compound Engineering은 2025년 12월 첫 공개 이후 불과 4개월 만에:
- GitHub 12,300+ stars (플러그인)
- 글로벌 커뮤니티에서 광범위한 논의와 채택
- 한국, 일본, 중국 등 아시아 시장으로 확산
- Context Engineering, Harness Engineering과 함께 **AI 에이전트 시대의 3대 개발 방법론**으로 자리매김

Will Larson의 예측처럼, 이 패턴들은 결국 Claude Code, Cursor 등의 메인스트림 도구에 흡수되어 개발자들이 의식하지 않는 사이에 사용하게 될 가능성이 높다. 그러나 현재 시점에서 이 방법론을 이해하고 적용하는 것은 AI 시대의 소프트웨어 개발에서 **명확한 경쟁 우위**를 제공한다.

> "2026년 엔지니어의 일은 '코드를 작성하는 것'에서 '코드를 작성하는 시스템을 설계하는 것'으로 바뀌었다."
> -- Qiita, Compound/Harness/Context Engineering 비교 분석
