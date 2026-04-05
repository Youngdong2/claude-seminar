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

### 오해 금지 — 프롬프트 엔지니어링이 끝난 게 아니다

용어가 "컨텍스트 엔지니어링"으로 옮겨갔다고 해서 프롬프트 엔지니어링이 사라진 게 아니다. **프롬프트는 여전히 모든 컨텍스트 엔지니어링의 가장 안쪽 층**이다. CLAUDE.md의 한 줄, Skill의 지시문, Hook의 메시지, 서브에이전트의 시스템 프롬프트 — 전부 프롬프트다.

> "Prompt engineering hasn't died; it has been absorbed. Every good context engineer is still a good prompt engineer." — Phil Schmid

관계를 다시 정리:
- **프롬프트 엔지니어링**은 "모델에게 한 번 말하는 법"
- **컨텍스트 엔지니어링**은 "여러 프롬프트가 모이는 구조를 설계하는 법"
- **하네스 엔지니어링**은 "그 구조 주변의 실행 환경을 짓는 법"

안쪽이 엉성하면 바깥을 아무리 잘 지어도 무너진다. CLAUDE.md 한 줄을 모호하게 쓴 사람은 스킬·훅·서브에이전트를 붙여도 똑같이 모호한 결과를 얻는다.

---

## 여전히 유효한 프롬프트 엔지니어링 원칙

프롬프트를 쓴다는 것은 **모델에게 역할, 과제, 맥락, 제약, 기대 출력을 한 번의 입력으로 전달**하는 일이다. 좋은 프롬프트는 몇 가지 구조적 특성을 공유한다.

### 원칙 1 — 구체성이 모든 것을 이긴다

모델이 못하는 게 아니라 **뭘 원하는지 모른다**. 모호한 프롬프트는 모호한 결과를 만들고, 구체적인 프롬프트는 구체적인 결과를 만든다.

```
나쁨: "로그인 기능 만들어줘"
좋음: "Express 라우터에 POST /auth/login 추가.
       입력: { email, password }
       성공: 200 + { token: JWT }  (exp 1시간)
       실패: 401 + { error: 'INVALID_CREDENTIALS' }
       DB 조회는 기존 users 테이블 재사용, bcrypt 비교"
```

"어떻게"가 아니라 **입력·출력·제약·에러 케이스**를 적는다. 구현 방법은 모델이 알아서 고른다.

### 원칙 2 — 구조화하라 (역할 · 과제 · 맥락 · 제약 · 출력 형식)

긴 프롬프트는 **섹션을 나눠서** 쓴다. Anthropic은 XML 태그를 권장한다 — 모델이 훈련 시 본 구조와 일치하기 때문:

```xml
<role>당신은 시니어 백엔드 엔지니어다.</role>
<task>아래 PR을 리뷰하라.</task>
<context>
  - 스택: Node.js 20, Express, PostgreSQL
  - 팀 규칙: @ref CLAUDE.md
</context>
<constraints>
  - 보안 이슈만 지적. 스타일은 무시.
  - 각 지적에 파일:라인 첨부.
</constraints>
<output_format>
  ## Findings
  - [severity] file:line — 설명
</output_format>
```

구조화된 프롬프트는 **재사용·버전 관리·팀 공유**가 가능하다. 대화창에 한 번 쓰고 버리는 프롬프트는 팀 자산이 되지 못한다.

### 원칙 3 — 예시(Few-Shot)가 설명보다 강하다

"이렇게 해줘"라고 5문단 쓰는 것보다 **예시 2개** 보여주는 게 낫다. 모델은 패턴 매칭 기계다.

```
다음 형식으로 커밋 메시지를 써라:

예시 1:
  입력: "버튼 색상 변경"
  출력: "style(ui): update primary button to brand blue"

예시 2:
  입력: "결제 오류 수정"
  출력: "fix(payment): handle null response from stripe webhook"

이제 이 변경에 대해 써라: {diff}
```

예시는 **암묵적인 스타일·톤·디테일**까지 전달한다 — 글로는 설명하기 힘든 것들.

### 원칙 4 — 생각할 시간을 줘라 (Chain of Thought)

복잡한 판단을 요구할 땐 **"단계별로 생각해보고 답해라"** 한 줄을 붙이는 것만으로 정확도가 오른다. 더 강력하게는 thinking 블록을 명시:

```
먼저 <thinking> 태그 안에서:
1. 요구사항을 정리한다
2. 엣지 케이스를 나열한다
3. 접근 방식을 비교한다
그 다음 <answer> 태그 안에 최종 답을 쓴다.
```

Claude의 extended thinking 모드는 이 원리를 모델 레벨에서 구현한 것이다.

### 원칙 5 — 긍정형으로 써라

"하지 마라"보다 **"해라"**가 잘 먹힌다. 모델은 부정어를 처리하는 비용이 더 크다.

```
나쁨: "마크다운을 쓰지 마라. 이모지도 쓰지 마라."
좋음: "플레인 텍스트로 답하라. 특수문자는 영숫자와 기본 구두점만."
```

### 원칙 6 — 이유(why)를 덧붙여라

규칙만 있으면 예외 상황에서 깨진다. **"왜 이 규칙이 있는지"**를 한 줄 붙이면 모델이 새로운 상황에서도 원칙을 일반화한다.

```
나쁨: "함수는 20줄 이하로 써라."
좋음: "함수는 20줄 이하로 써라. 이유: 단일 책임 원칙 + AI가 한 번에 읽기 좋은 길이.
       예외는 상태 머신처럼 분해가 오히려 복잡도를 키우는 경우."
```

이 원칙은 앞서 본 **Right Altitude** — 지시문의 고도 — 와 같은 이야기다.

### 원칙 7 — 반복과 측정

프롬프트는 한 번에 완성되지 않는다. **같은 프롬프트를 여러 번 돌려서** 실패 케이스를 모으고, 실패가 많은 부분을 고친다. Anthropic의 공식 가이드도 "iterate, don't speculate"를 강조한다.

실전 루틴:
1. 프롬프트 v1 작성 → 10개 샘플 돌림
2. 실패 2~3개 골라 공통 패턴 분석
3. 해당 패턴을 막는 제약 또는 예시를 프롬프트에 추가 → v2
4. 다시 10개 → 반복

### 안티패턴 — 피해야 할 것들

- **"잘 해줘" 류의 형용사** — "깔끔하게", "최선을 다해", "프로페셔널하게": 전부 측정 불가. 모델이 추측한다
- **롤플레이 과잉** — "당신은 10년차 개발자다" 한 줄은 괜찮지만, 페르소나를 3문단 쓰면 오히려 잡음
- **모순된 지시** — "간결하되 자세하게" → 모델이 한쪽을 무시한다
- **컨텍스트 덤핑** — "이 파일 전체 읽고 알아서 해" → Context Confusion 유발
- **마법의 주문 미신** — "take a deep breath", "think step by step"은 도움이 되지만 **마법이 아니다**. 구체성 없이 주문만 외우면 효과 없다

---

## 프롬프트에서 컨텍스트 엔지니어링으로 — 자연스러운 확장

좋은 프롬프트를 몇 번 쓰고 나면 **공통 패턴**이 보이기 시작한다:
- 매번 같은 역할/제약을 적고 있다 → **CLAUDE.md**로 뽑아낸다
- 매번 같은 워크플로우를 시키고 있다 → **Skill**로 패키징한다
- 매번 같은 검증 커맨드를 돌리고 있다 → **Hook**으로 자동화한다
- 매번 같은 외부 데이터를 붙여넣고 있다 → **MCP**로 연결한다

즉, **컨텍스트 엔지니어링은 "반복되는 프롬프트를 시스템으로 승격시키는 일"**이다. 프롬프트를 잘 쓸 줄 알아야 무엇을 승격시킬지 알 수 있다. 그래서 프롬프트 엔지니어링은 **선행 조건**이지, 대체 대상이 아니다.

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

Anthropic의 공식 정의도 같은 이야기를 한다:

> "Context must be treated as a finite resource with diminishing marginal returns. … the smallest possible set of high-signal tokens that maximize the likelihood of some desired outcome."

컨텍스트는 "attention budget"이다. 예산은 유한하다.

---

## 컨텍스트의 4가지 실패 모드

"컨텍스트 윈도우가 200k니까 많이 넣어도 된다" — 이 상식이 틀렸다는 것을 보여주는 가장 유명한 정리. Drew Breunig가 2025년에 제시한 4가지 실패 모드:

| 실패 모드 | 정의 | 전형적 징후 |
|-----------|------|-------------|
| **Poisoning (중독)** | 환각이 한 번 컨텍스트에 들어오면 이후 계속 참조되며 오류 누적 | 에이전트가 존재하지 않는 함수를 반복 호출 |
| **Distraction (산만)** | 컨텍스트가 쌓이면 모델이 학습 지식보다 히스토리에 과의존, 과거 행동을 반복 | 새 전략을 못 세우고 실패한 액션을 재시도 |
| **Confusion (혼동)** | 무관한 정보가 섞여 있으면 모델이 그것까지 "고려해버린다" | 툴을 30개 이상 노출하면 급격히 선택 실패 |
| **Clash (충돌)** | 컨텍스트 내부에 모순된 정보가 있으면 추론이 무너진다 | 초반에 틀린 답이 들어가면 평균 39% 성능 저하 |

> "If you treat your context like a junk drawer, the junk will influence your response." — Drew Breunig

핵심 전환: **"뭘 넣을까"보다 "뭘 뺄까"**가 더 중요하다. 앞서 본 WSCI 4가지 전략(Write/Select/Compress/Isolate)은 정확히 이 4가지 실패 모드에 대한 처방이다.

---

## Context Rot — 길수록 조용히 썩는다

Chroma Research가 18개 최신 모델(Claude, GPT, Gemini, Qwen 등)을 대상으로 측정한 결과:

- **200k 컨텍스트 모델이 50k에서 이미 유의미하게 열화**된다. 윈도우가 꽉 차야 무너지는 게 아니다
- LongMemEval 비교: ~300토큰 focused 프롬프트 vs ~113k 풀 프롬프트 — **모든 모델에서** focused가 우세
- 방해 문장(distractor) **단 1개**로도 성능 저하, 4개면 급감
- 가장 반직관적 발견: **셔플된 haystack이 논리적으로 구조화된 haystack보다 성능이 좋을 때가 있다**

> "Whether relevant information is present in a model's context is not all that matters; what matters more is *how* that information is presented." — Chroma Research

발표 포인트: **"200k를 쓸 수 있다고 200k를 넣지 마라. 50k부터 이미 썩고 있다."** 컨텍스트는 **길이**가 아니라 **신호 대 잡음비**로 관리해야 한다.

---

## Long-Horizon 태스크를 위한 3가지 기법

오래 실행되는 에이전트(수십 분~수 시간)는 컨텍스트 예산이 곧 바닥난다. Anthropic이 정리한 3가지 기법:

### 1. Compaction (압축)
컨텍스트가 차오르면 **요약본으로 리셋**한다. 아키텍처 결정·핵심 사실은 보존하고, 중복된 도구 출력·탐색 로그는 폐기.

### 2. Structured Note-Taking (구조화된 메모)
에이전트가 `NOTES.md`, `PROGRESS.md` 같은 **외부 파일**에 진행 상황을 기록한다. 컨텍스트 윈도우 밖의 영구 메모리. 세션이 끊겨도 이어서 작업 가능.

### 3. Sub-Agent Architectures (서브에이전트 격리)
전문 서브에이전트가 **자신의 컨텍스트**에서 작업하고, 메인 에이전트에게는 1,000~2,000 토큰짜리 **요약만** 반환한다. 메인 컨텍스트는 오염되지 않는다.

세 기법 모두 공통 원리 — **컨텍스트를 바깥으로 덜어낸다**. Claude Code는 이를 각각 `/compact`, 프로젝트 파일 읽기/쓰기, Task 서브에이전트로 구현한다.

---

## Right Altitude — 지시문의 고도

CLAUDE.md나 프롬프트를 쓸 때 가장 자주 하는 실수는 두 극단:

- **너무 낮음 (over-specified)**: 모든 케이스를 if/else로 박는다 → 예외 상황에서 brittle
- **너무 높음 (under-specified)**: "잘 해줘", "깔끔하게" → 모델이 추측, 세션마다 결과가 다름

올바른 고도:

> "Specific enough to guide behavior effectively, yet flexible enough to provide the model with strong heuristics." — Anthropic

**공식**: 원칙 1줄 + 이유(why) 1줄 + 예시 1~2개. 이게 붙어야 규칙이 새로운 상황에서도 일반화된다.

자가진단 2문항:
- "이 규칙이 내가 의도하지 않은 상황에서도 말이 되는가?" → 되면 OK
- "이 규칙을 아무 세션에 붙여도 아무 행동도 바뀌지 않는가?" → 그러면 너무 높음

---

## Claude Code에서의 구현: 4개 레이어 + 배포 레이어

정구봉(Team Attention)이 제시한 에이전트 시대의 Context Engineering 4개 레이어에, **Plugins**라는 배포 레이어를 얹은 것이 Claude Code의 전체 구조다.

| 레이어 | 역할 | Claude Code 구현 |
|--------|------|-----------------|
| **CLAUDE.md** | 시스템 성격 정의 | 프로젝트 규칙, 컨벤션, 아키텍처 지침 |
| **Skill** | 실행 로직 구조화 | 재사용 가능한 워크플로우, 슬래시 커맨드 |
| **Memory** | 학습 축적 | 자동 메모리 + 수동 메모리 |
| **MCP** | 외부 도구 연결 | Notion, GitHub, Slack 등 100+ 서비스 |
| **Plugins** *(배포 레이어)* | 위 네 레이어 + 훅/서브에이전트/LSP를 **단일 단위로 패키징·배포** | `.claude-plugin/plugin.json` + 마켓플레이스 |

**중요**: Plugins는 **새로운 기능 유형이 아니다.** 이미 존재하는 Skill·Subagent·Hook·MCP·LSP를 **번들링하고 팀/커뮤니티에 배포하는 메커니즘**이다. 개인이 쌓아올린 하네스를 조직 자산으로 전환하는 마지막 한 조각.

---

### CLAUDE.md — 프로젝트의 "헌법"

4개 레이어 중에서도 **가장 먼저 손대야 하는 레이어**. 모든 세션이 시작될 때 자동으로 로드되는 지속적 컨텍스트이며, 프로젝트의 규칙·컨벤션·아키텍처를 정의한다. Claude 공식 문서는 이 파일을 이렇게 정의한다.

> "CLAUDE.md is a special file that Claude reads at the start of every conversation. Include Bash commands, code style, and workflow rules. This gives Claude persistent context it can't infer from code alone."
> — Claude Code Best Practices

#### 먼저 짚고 갈 것 — "지시가 아니라 컨텍스트다"

많은 사람이 CLAUDE.md를 **시스템 프롬프트**로 오해한다. 사실은 그렇지 않다.

> "CLAUDE.md content is delivered as a user message after the system prompt, not as part of the system prompt itself. Claude reads it and tries to follow it, but there's no guarantee of strict compliance."
> — Claude Code 공식 Memory 문서

시스템 프롬프트 **다음에** 사용자 메시지 형태로 주입된다. 즉, **강제(enforcement)가 아니라 권고(context)**. 이게 왜 중요한가:
- 모호한 지시 → Claude가 **임의로** 해석
- 모순된 지시 → Claude가 **임의로** 하나 선택
- 비대한 파일 → 진짜 중요한 규칙이 **묻힘**

→ **"컨텍스트로 작동한다"**는 사실이 이하의 모든 원칙의 뿌리다.

#### 배치 위치와 우선순위

Claude Code는 5가지 위치에서 CLAUDE.md를 읽는다. 더 구체적인 위치가 우선한다.

| 범위 | 위치 | 용도 | 공유 대상 |
|------|------|------|----------|
| **관리 정책** | `/Library/Application Support/ClaudeCode/CLAUDE.md` (macOS) 등 OS 지정 경로 | 조직 전체 지침 (IT/DevOps 배포) | 조직 모든 사용자 |
| **프로젝트** | `./CLAUDE.md` 또는 `./.claude/CLAUDE.md` | 팀 공유 지침 | git을 통한 팀 |
| **사용자** | `~/.claude/CLAUDE.md` | 개인 선호 (모든 프로젝트 적용) | 본인만 |
| **로컬** | `./CLAUDE.local.md` | 프로젝트별 개인 메모 (**.gitignore 필수**) | 본인만 (현재 프로젝트) |
| **상위 디렉토리** | 작업 디렉토리 위쪽의 모든 CLAUDE.md | 모노레포 상속 | 해당 경로 사용자 |

**로드 방식의 정확한 동작**:
- 작업 디렉토리에서 루트까지 **트리 워킹**하며 발견된 모든 CLAUDE.md를 **전부** concatenate (덮어쓰기 X)
- 하위 디렉토리의 CLAUDE.md는 launch 시가 아니라 **해당 파일을 읽을 때** lazy load
- 같은 디렉토리에서 `CLAUDE.local.md`는 `CLAUDE.md` 뒤에 붙음 → 충돌 시 로컬이 우선
- 블록 수준 HTML 주석(`<!-- ... -->`)은 **토큰 소비 없이** 메모 용도로 쓸 수 있음 (주입 전 제거됨)

#### 무엇을 쓸 것인가 — Include / Exclude

Anthropic 공식 best practices의 포함/제외 기준:

| ✅ 포함 | ❌ 제외 |
|---|---|
| Claude가 추측할 수 없는 Bash 명령 | Claude가 코드만 읽어도 알 수 있는 것 |
| 기본값과 다른 코드 스타일 규칙 | Claude가 이미 아는 표준 언어 컨벤션 |
| 테스트 실행법 / 선호 테스트 러너 | 상세 API 문서 (대신 링크) |
| 저장소 에티켓 (브랜치명, PR 규칙) | 자주 바뀌는 정보 |
| 프로젝트 고유 아키텍처 결정 | 긴 설명/튜토리얼 |
| 개발 환경 특이사항 (필수 env var 등) | 파일 하나하나를 묘사하는 내용 |
| 일반적이지 않은 gotcha | "깨끗하게 작성하라" 같은 자명한 원칙 |

HumanLayer는 여기에 한 가지 원칙을 더 밀고 간다:

> "Never send an LLM to do a linter's job. LLMs are comparably expensive and incredibly slow compared to traditional linters."

→ **코드 스타일 규칙은 린터에 맡겨라.** CLAUDE.md는 린터로 못 잡는 것만.

#### 한 줄 삭제 테스트 — 공식이 제시한 유일한 기준

> "For each line, ask: 'Would removing this cause Claude to make mistakes?' If not, cut it. Bloated CLAUDE.md files cause Claude to ignore your actual instructions!"
> — Claude Code Best Practices

규칙 한 줄 한 줄에 대해 **"이 줄을 지우면 Claude가 실수할까?"**를 묻는다. 아니라면 삭제. 비대한 CLAUDE.md는 진짜 중요한 지시를 묻히게 만든다. 공식 문서가 느낌표까지 붙여서 경고하는 유일한 원칙이다.

#### 크기 가이드라인 — "짧을수록 잘 먹힌다"

현장의 숫자는 출처마다 다르지만 방향은 동일하다.

| 기준 | 출처 |
|------|------|
| **~60줄 (엄격파)** | HumanLayer — "frontier LLM은 150-200 지시문까지만 일관되게 따른다. 시스템 프롬프트에 이미 ~50개 있으니 사용자 CLAUDE.md는 60줄 이하가 이상적" |
| **2.5k 토큰 이내** | Boris Cherny (Claude Code 창시자) 팀의 기준. Hunslog가 한국어 커뮤니티에서 소개 |
| **200줄 이하** | Claude Code 공식 문서 |
| **500줄 이하** | Riccardo Marconato — Context + Task + Expectations + References + Checklist 포함 |

**핵심**: 숫자가 아니라 **신호 대 잡음비**. 200줄짜리 알찬 CLAUDE.md는 50줄짜리 쓰레기 CLAUDE.md보다 낫다. 하지만 같은 신호라면 짧을수록 낫다.

#### 구체성 — 검증 가능한 수준으로

```
❌ "코드를 제대로 포맷하세요"      → ✅ "2-space indentation 사용"
❌ "변경 사항을 테스트하세요"      → ✅ "커밋 전 `pnpm test` 실행"
❌ "파일을 잘 정리하세요"          → ✅ "API 핸들러는 src/api/handlers/에 위치"
❌ "코드를 잘 작성해주세요"        → ✅ "TypeScript strict mode, any 타입 금지"
```

"사람이 지킬 수 있는 수준"이 아니라 **"나중에 체크리스트로 검증할 수 있는 수준"**이 기준이다.

#### 공식 예시 (Claude Code 공식 문서 발췌)

```markdown
# Code style
- Use ES modules (import/export) syntax, not CommonJS (require)
- Destructure imports when possible (eg. import { foo } from 'bar')

# Workflow
- Be sure to typecheck when you're done making a series of code changes
- Prefer running single tests, and not the whole test suite, for performance
```

공식 문서가 들고 나온 예시의 특징:
- **10줄 미만**
- 규칙이 **구체적** — "ES modules"지 "모던 JS"가 아님
- **이유 없이도 작동** — 규칙 자체가 모호하지 않아서 why가 필수는 아님
- **사람이 읽기 편한** 마크다운

#### 강조 표현 — "IMPORTANT" / "YOU MUST"

> "You can tune instructions by adding emphasis (e.g., 'IMPORTANT' or 'YOU MUST') to improve adherence."

공식이 공식적으로 인정한 튜닝 기법. 단, 모든 규칙에 붙이면 강조가 무의미해진다. **진짜 중요한 것에만** 쓴다.

#### `@path` import — 파일을 쪼개되 하나처럼 로드

CLAUDE.md가 커지면 `@path/to/file` 문법으로 다른 파일을 import한다. import된 파일은 launch 시 함께 로드된다.

```markdown
See @README for project overview and @package.json for available npm commands.

# Additional Instructions
- Git workflow: @docs/git-instructions.md
- Personal overrides: @~/.claude/my-project-instructions.md
```

- **상대/절대 경로 모두** 허용 (상대는 "import하는 파일 기준"으로 해석 — 작업 디렉토리 X)
- **최대 5홉** 재귀 가능
- **첫 외부 import 시 승인 다이얼로그** — 거부하면 해당 import는 비활성화 유지

#### `.claude/rules/` — 규칙을 모듈화

CLAUDE.md가 비대해지면 `.claude/rules/` 디렉토리로 쪼갠다.

```text
your-project/
├── .claude/
│   ├── CLAUDE.md           # 주 지침 (간결)
│   └── rules/
│       ├── code-style.md
│       ├── testing.md
│       └── security.md
```

**경로별 규칙(Path-specific Rules)**: YAML frontmatter의 `paths` 필드로 특정 파일 패턴에만 적용. Claude가 매칭되는 파일을 **읽을 때만** 트리거된다 → 전체 컨텍스트에 상주하지 않음.

```markdown
---
paths:
  - "src/api/**/*.ts"
---

# API Development Rules
- 모든 API 엔드포인트는 입력 검증을 포함해야 합니다
- 표준 오류 응답 형식을 사용합니다
```

**Rules vs Skills**:
- **Rules**: "항상" 또는 "특정 파일 읽을 때마다" — 컨텍스트 상주
- **Skills**: 필요할 때만 호출 — Progressive Disclosure

#### AGENTS.md 연동 — 다른 에이전트와 공존

> "Claude Code reads `CLAUDE.md`, not `AGENTS.md`."

Claude Code는 AGENTS.md를 **읽지 않는다**. 다른 코딩 에이전트와 지침을 공유하려면 CLAUDE.md에서 import한다.

```markdown
# CLAUDE.md
@AGENTS.md

## Claude Code
Use plan mode for changes under `src/billing/`.
```

#### 비대한 CLAUDE.md를 디버깅하는 2가지 휴리스틱

공식 문서가 제시하는 진단:

1. **규칙이 있는데도 지키지 않는다** → 파일이 너무 길어서 그 규칙이 묻혔다
   → 한 줄 삭제 테스트로 가지치기

2. **CLAUDE.md에 있는 내용을 Claude가 되묻는다** → 표현이 모호하다
   → 구체성 원칙으로 다시 쓰기

#### `/compact` 후에도 CLAUDE.md는 살아남는다

> "CLAUDE.md fully survives compaction. After `/compact`, Claude re-reads your CLAUDE.md from disk and re-injects it fresh into the session."

많은 사람이 `/compact` 후 "지침이 사라진 것 같다"고 오해한다. 실제로는 **CLAUDE.md는 디스크에서 다시 읽혀 재주입**된다. 압축 후 사라지는 것은 **대화에서만 주어진 지침**이다. 영속화하려면 CLAUDE.md에 넣어야 한다.

#### CLAUDE.md를 "코드처럼" 관리하기

> "Treat CLAUDE.md like code: review it when things go wrong, prune it regularly, and test changes by observing whether Claude's behavior actually shifts."

공식 권장 3원칙:
1. **뭔가 잘못되면 리뷰** — 버그가 나면 CLAUDE.md부터 의심
2. **정기적으로 가지치기** — 오래된 규칙, 중복, 모순 제거
3. **Claude 동작으로 테스트** — 규칙 추가/삭제 후 실제 행동이 바뀌는지 관찰

→ `/memory` 명령어로 현재 세션에 **어느 CLAUDE.md들이 로드됐는지** 확인할 수 있다. Claude가 CLAUDE.md를 "보지 못한다면" 이 명령부터 돌린다.

#### 살아있는 사례 — 이렇게 쓰고 있다

**Boris Cherny (Claude Code 창시자)** — Anthropic Claude Code 팀
- 하나의 공유 CLAUDE.md를 git에 체크인, 팀 전체 공유
- **주 수 회** 업데이트 — "한 번 쓰고 끝"이 아니라 **살아있는 문서**
- **Claude가 실수할 때마다 CLAUDE.md에 한 줄 추가** — 같은 실수 반복 차단
- PR에서 `@claude` 태그 → GitHub Action이 CLAUDE.md 자동 커밋

**Kieran Klaassen** — Self-Improving Harness
> "Every time I indicate 'I don't like this' or 'Good catch,' the system gets smarter."
- 사용자의 "마음에 안 드네" 한 마디가 곧 새 규칙 한 줄
- **실제 사례**: 백그라운드 잡에서 외부 API rate limit 버그 한 번 → 리뷰 에이전트에 "백그라운드 잡이 외부 API 호출 시 rate limit / retry / partial state 모두 체크" 한 줄 추가 → **같은 버그 재발 0건**

**Dan Shipper (Every)** — Compound Engineering 파이프라인
- CLAUDE.md는 **학습 파이프라인의 최종 산출물**
- 6단계 서브에이전트 파이프라인 중 하나가 **"CLAUDE.md Updater"** — 새 패턴을 자동으로 CLAUDE.md에 반영
- 버그 수정 → 패턴 추출 → CLAUDE.md 한 줄 추가 → 다음 세션 자동 방지

**정구봉 (Team Attention)** — 규모의 실천
- **159개의 CLAUDE.md** 파일 + 100개 이상의 스킬 동시 운영
- 공식 원칙("짧게")을 **"파일 하나는 짧게, 대신 파일을 많이"** 방향으로 확장
- 프레임: "Skill이 '무엇을 할 줄 아는가'라면 CLAUDE.md는 '누구로서 행동하는가'"

**한국 커뮤니티 (Hunslog)** — 미니멀 스타일
```markdown
## 주의사항
- Push 승인 필수: 커밋 목록 보여주고 명시적 허락 후 푸시
- Node.js >= 20 필수 (19 이하는 빌드 실패)
- 환경변수는 .env.local에 저장 (.env 사용 금지)
```
- 2.5k 토큰 이내, 반복 실수만 기록
- 몇 주에 한 번 **Claude에게 CLAUDE.md 자체를 리뷰시키기** — 메타 운영

#### 좋은 예 vs 나쁜 예

**좋음** (검증 가능, 이유 포함, 구체적):
```markdown
## 코드 스타일
- TypeScript strict mode 사용
- 함수명은 camelCase, 타입명은 PascalCase
- 커밋 전 `pnpm lint && pnpm test` 실행 필수

## 금지사항
- any 타입 사용 금지
- console.log 커밋 금지
- .env 파일 수정 금지

## 주의사항
- Node.js >= 20 필수 (19 이하는 빌드 실패)
- 세션 저장은 Redis. 이유: TTL 30분, PostgreSQL vacuum 부담 회피
```

**나쁨** (모호, 자명, 검증 불가):
```markdown
코드를 잘 작성해주세요.
테스트를 해주세요.
좋은 코드를 만들어주세요.
효율적으로 만들어주세요.
```

**두 예시의 결정적 차이**: 나쁜 예는 **지우면 행동이 바뀌지 않는다** — 한 줄 삭제 테스트를 통과 못 한다.

#### CLAUDE.md 자가진단 체크리스트 (발표용)

현재 팀의 CLAUDE.md를 그 자리에서 진단해볼 수 있는 5문항:

1. **"한 줄 삭제 테스트"** — 각 줄을 지우면 Claude가 실수할까? 아니라면 삭제
2. **"린터 테스트"** — 린터로 잡을 수 있는 규칙이 있나? 있다면 린터로 이동
3. **"`/compact` 테스트"** — 압축 후 사라질 지침이 있나? 있다면 CLAUDE.md에 이미 있는지 확인
4. **"모순 테스트"** — 두 줄이 충돌하나? 하나는 지우거나 우선순위 명시
5. **"되묻기 테스트"** — Claude가 CLAUDE.md에 있는 내용을 되묻는가? 표현이 모호한 것

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

### Plugins — 하네스를 포장해서 팀 자산으로 만드는 마지막 레이어

지금까지의 4개 레이어(CLAUDE.md·Skill·Memory·MCP)는 **개인이 쌓아올린 하네스**다. 문제는 이 개인 세팅이 **팀에 전파되지 않는다**는 것. 옆자리 동료가 "그거 나한테도 줘"라고 해도 수동으로 복사·설명·조정해야 한다. 이 마찰이 **하네스 확산의 병목**이다.

Plugins는 바로 이 병목을 푸는 **배포 레이어**다. 2025년 10월 9일 Anthropic이 공개 베타로 발표하며 이렇게 정의했다.

> "슬래시 커맨드, 에이전트, MCP 서버, 훅의 커스텀 컬렉션을 **단일 커맨드로 설치**할 수 있다."
> — Claude Code Plugins 공식 블로그 (2025-10-09)

> "Plugins will be the standard way to share Claude Code customizations going forward."

#### 플러그인이 포함하는 것

하나의 플러그인은 다음을 **단일 단위로** 번들링한다.

| 구성 요소 | 내용 |
|---|---|
| **Slash commands** | 커스텀 단축 명령 |
| **Skills** | 모델 호출형 워크플로우 패키지 |
| **Subagents** | 특화된 전용 에이전트 |
| **Hooks** | 이벤트 기반 결정론적 자동화 |
| **MCP servers** | 외부 도구/데이터 연결 |
| **LSP servers** | 언어 서버 (코드 인텔리전스) |
| **Settings + bin/** | 플러그인 활성화 시 기본 설정, PATH 확장 |

→ **새로운 기능이 아니라, 이미 있는 확장들을 "한 덩어리"로 만드는 포장지.**

#### Standalone vs Plugin — 언제 어느 쪽인가

Claude Code는 확장을 두 가지 방식으로 관리한다. 공식 문서가 제시하는 선택 기준:

| 방식 | 스킬 이름 | 쓰는 경우 |
|:---|:---|:---|
| **Standalone** (`.claude/` 디렉토리) | `/hello` | 개인 워크플로우, 프로젝트 전용, 빠른 실험 |
| **Plugin** (`.claude-plugin/plugin.json` 포함) | `/my-plugin:hello` | 팀·커뮤니티 공유, 버전 관리, 재사용, 마켓플레이스 배포 |

> "Start with standalone configuration in `.claude/` for quick iteration, then convert to a plugin when you're ready to share."
> — 공식 Tip

**실전 동선**: 개인 세팅으로 `.claude/`에 쌓다가, 동료에게 보여주고 싶어지는 순간 플러그인으로 전환. 변환 자체는 거의 **파일 이동 + 매니페스트 1개** 수준.

#### 플러그인 구조 (최소 단위)

```
my-plugin/
├── .claude-plugin/
│   └── plugin.json      ← 매니페스트 (필수)
├── commands/            ← 슬래시 커맨드
├── skills/              ← Agent Skills
│   └── hello/
│       └── SKILL.md
├── agents/              ← 서브에이전트
├── hooks/hooks.json     ← 이벤트 훅
├── .mcp.json            ← MCP 서버
└── .lsp.json            ← LSP 서버
```

**매니페스트 예시**:

```json
{
  "name": "my-first-plugin",
  "description": "A greeting plugin to learn the basics",
  "version": "1.0.0",
  "author": { "name": "Your Name" }
}
```

`name` 필드가 **스킬 네임스페이스**가 된다. 이 플러그인의 `hello` 스킬은 세션 내에서 `/my-first-plugin:hello`로 호출된다 → 여러 플러그인이 같은 스킬명을 가져도 **충돌하지 않음**.

> ⚠️ **흔한 실수**: `commands/`, `agents/`, `skills/`, `hooks/`를 `.claude-plugin/` **안에** 넣는 것. `plugin.json`만 `.claude-plugin/`에 들어가고 나머지는 전부 **플러그인 루트**에 위치해야 한다.

#### 마켓플레이스 — 여러 플러그인의 카탈로그

하나의 플러그인을 만들었다면 그것을 어떻게 배포할까? → **마켓플레이스**다.

마켓플레이스는 `.claude-plugin/marketplace.json`에 여러 플러그인을 카탈로그로 묶는 메커니즘. 사용자 입장에서는 **"마켓플레이스 추가 → 플러그인 설치"**의 2단계.

```json
{
  "name": "company-tools",
  "owner": { "name": "DevTools Team" },
  "plugins": [
    {
      "name": "code-formatter",
      "source": "./plugins/formatter",
      "version": "2.1.0"
    },
    {
      "name": "deployment-tools",
      "source": { "source": "github", "repo": "company/deploy-plugin" }
    }
  ]
}
```

**플러그인 소스 5가지**:
- **Relative path** — 같은 저장소 내
- **GitHub** — `owner/repo` + `ref`/`sha`로 핀
- **Git URL** — GitLab, Bitbucket, 셀프호스팅
- **Git subdir** — 모노레포 내 서브디렉토리 (sparse clone)
- **npm** — npm 패키지 (공개/프라이빗 레지스트리)

**공식 Anthropic 마켓플레이스** (`claude-plugins-official`)는 Claude Code 시작 시 **자동으로** 사용 가능. 추가 설정 없이 `/plugin install github@claude-plugins-official` 같은 식으로 바로 설치.

#### 사용자 명령어 — 설치와 관리

```bash
# 마켓플레이스 추가
/plugin marketplace add anthropics/claude-code
/plugin marketplace add https://gitlab.com/company/plugins.git
/plugin marketplace add ./my-local-marketplace

# 플러그인 설치
/plugin install plugin-name@marketplace-name

# 대화형 UI — Discover/Installed/Marketplaces/Errors 4개 탭
/plugin

# 관리
/plugin disable plugin@mk
/plugin enable plugin@mk
/plugin uninstall plugin@mk
/plugin marketplace list
/plugin marketplace update marketplace-name
/reload-plugins          # 세션 재시작 없이 변경사항 반영
/plugin validate .       # 구조·스키마 유효성 검사
```

개발 중에는 `claude --plugin-dir ./my-plugin`으로 **설치 없이 로컬 테스트** 가능. 파일 수정 후 `/reload-plugins` 한 번으로 재로드.

#### 설치 스코프 4가지

| 스코프 | 적용 범위 |
|:---|:---|
| **User** (기본) | 본인의 모든 프로젝트 |
| **Project** | 저장소 협업자 전원 (git으로 공유) |
| **Local** | 현재 저장소의 본인만 |
| **Managed** | 관리자가 배포, 개인 수정 불가 |

#### 팀 차원의 자동 배포 — 세 가지 장치

**1. `extraKnownMarketplaces`** — `.claude/settings.json`에 선언하면 팀원이 저장소 폴더를 신뢰할 때 **자동으로 설치 프롬프트**가 뜬다.

```json
{
  "extraKnownMarketplaces": {
    "my-team-tools": {
      "source": { "source": "github", "repo": "your-org/claude-plugins" }
    }
  }
}
```

**2. `enabledPlugins`** — 기본 활성화 플러그인 지정

```json
{
  "enabledPlugins": {
    "code-formatter@company-tools": true
  }
}
```

**3. `strictKnownMarketplaces`** — 관리 설정으로 **허용된 마켓플레이스만** 사용 강제. 빈 배열이면 완전 락다운. 정규식 호스트 패턴으로 GitHub Enterprise·셀프호스팅 지원. 개인 설정으로 우회 불가.

→ 섹션 2에서 다룬 **"권한·안전장치"** 원칙이 플러그인 레이어에도 그대로 적용된다. 관리자가 기술적으로 enforce, 사용자는 그 안에서 자유롭게.

#### 공식 마켓플레이스 카테고리 4가지

1. **Code Intelligence (LSP)**: `typescript-lsp`, `pyright-lsp`, `rust-analyzer-lsp`, `gopls-lsp` 등 11개 언어. 파일 편집 후 **자동 diagnostics** → Claude가 타입 에러/누락 import를 같은 턴에 수정. grep보다 정확한 코드 네비게이션(정의로 이동, 참조 찾기, 콜 하이어라키).
2. **External Integrations**: `github`, `gitlab`, `atlassian`(Jira/Confluence), `linear`, `notion`, `figma`, `vercel`, `supabase`, `slack`, `sentry` 등. MCP 서버를 미리 설정해둬서 **한 번의 설치로** 외부 서비스 연결.
3. **Development Workflows**: `commit-commands`, `pr-review-toolkit`, `agent-sdk-dev`, `plugin-dev` 등 에이전트+커맨드 번들.
4. **Output Styles**: `explanatory-output-style`, `learning-output-style` — Claude의 응답 스타일 자체를 커스터마이즈.

#### 엔터프라이즈 — 2026년 2월 확장

2026-02-24 Anthropic이 발표한 엔터프라이즈 기능:
- **프라이빗 GitHub 저장소 마켓플레이스** (비공개 베타)
- **10개 사전 빌드 템플릿** — HR, 디자인, 엔지니어링, 운영, 재무 분석, 투자 은행, 주식 리서치, 사모펀드, 자산 관리, 브랜드 보이스
- **사용자별 자동 프로비저닝**
- **통합 "Customize" 메뉴** — 플러그인/스킬/커넥터 한 곳에서
- **OpenTelemetry** 지원 — 사용량/비용/도구 활동 추적
- 플러그인 파트너: Slack by Salesforce, LSEG, S&P Global, Common Room, Tribe AI

→ **개발자 도구에서 전사 도구로 확장**되는 시점. 섹션 8(비개발자도 할 수 있다)에서 다시 다룰 포인트.

#### 커뮤니티 사례 — 이렇게 쓰고 있다

**Oh My Claude Code (OMC)** — Yeachan Heo
- GitHub 20.2k stars, Trending 1위
- 멀티 에이전트 오케스트레이션 플러그인 (Autopilot, Ultrapilot, Ralph, Team, Swarm 등 9개 실행 모드)
- 29개 이상의 서브에이전트 카탈로그
- 설치: `/plugin marketplace add https://github.com/Yeachan-Heo/oh-my-claudecode` → `/plugin install oh-my-claudecode`

**Compound Engineering Plugin** — Every Inc.
- GitHub 12.3k stars
- 6단계 서브에이전트 파이프라인 (Investigator → Solution Extractor → Classifier → Doc Writer → **CLAUDE.md Updater** → Verifier)
- 매 PR의 학습을 CLAUDE.md에 자동 반영 — 앞서 본 "복리 구조"의 자동화

**Anthropic 공식 예제 플러그인**
- PR 리뷰, 보안 가이던스, Claude Agent SDK 개발, 플러그인 제작 자체
- `anthropics/claude-code` 마켓플레이스에서 설치

**Dan Avila 마켓플레이스** (aitmpl.com/plugins)
- DevOps 자동화, 문서 생성, 프로젝트 관리, 테스팅 스위트

**Seth Hobson 컬렉션**
- **80개 이상의 특화된 서브에이전트** 번들

#### 보안 경고

> "Plugins and marketplaces are highly trusted components that can execute arbitrary code on your machine with your user privileges. Only install plugins and add marketplaces from sources you trust."
> — 공식 문서

- 플러그인은 **사용자 권한으로 임의 코드 실행** 가능
- Anthropic은 서드파티 플러그인 내용을 **검증하지 않음**
- 설치 전 homepage 확인 필수
- 조직 차원의 통제는 `strictKnownMarketplaces`

#### 발표 포인트 — 플러그인이 바꾸는 것

1. **"하네스를 자산화한다"** — 개인이 쌓은 세팅이 팀·커뮤니티 자산으로 전환. 섹션 4 전체의 주장("컨텍스트를 설계하는 사람이 이긴다")이 **"그 컨텍스트를 배포할 수 있는 사람이 이긴다"**로 한 단계 더 간다.
2. **"새 기능이 아니라 포장지"** — 플러그인은 Skill·Hook·MCP·Subagent를 포장할 뿐이다. 즉, **4개 레이어를 잘 쌓은 사람만** 의미 있는 플러그인을 만들 수 있다. 포장할 내용이 없는데 포장법만 배우는 건 무의미.
3. **"조직 도입의 마지막 한 조각"** — 섹션 2에서 다룬 권한·안전장치 + 섹션 4의 4개 레이어 + **플러그인 배포** = Claude Code가 **엔터프라이즈 도구**로 완성되는 구조.

---

## 에이전트 루프 — 하네스의 심장

거의 모든 코딩 에이전트는 다음 4단계를 반복한다:

```
┌─────────────────────────────────────────────────┐
│  1. Gather Context  →  파일 읽기, 검색, 질문       │
│  2. Take Action     →  코드 작성, 명령 실행, 툴 호출 │
│  3. Verify Work     →  테스트, 린트, 타입체크, 리뷰  │
│  4. Repeat          →  결과를 다음 루프의 컨텍스트로  │
└─────────────────────────────────────────────────┘
```

**각 단계가 하네스의 설계 지점**:
- **Gather** — 노이즈가 들어오면 앞서 본 4가지 실패 모드가 전부 발동. 여기서 무엇을 **안 보여줄지**를 설계한다
- **Act** — 가능한 한 **되돌릴 수 있는(reversible)** 액션으로 설계. 실패 비용이 낮으면 과감해질 수 있다
- **Verify** — **자동화된 피드백이 없으면 루프는 환각을 강화한다**. Verify가 빠진 에이전트는 자기 실수를 복리로 쌓는다
- **Repeat** — 이전 결과가 다음 루프에 주입되는 지점. Compaction/Pruning이 필수

> **하네스 엔지니어링 = 이 4단계의 각 지점을 신뢰성 있게 만드는 작업.**

Verify가 **심장**이다. 테스트·린트·타입체크 같은 자동 검증이 붙어 있어야 루프가 수렴한다. 검증이 없으면 Ralph 루프든 Compound Engineering이든 전부 무너진다.

---

## Plan-Critic-Build — 계획과 실행을 분리하라

에이전트가 가장 많이 실패하는 지점: **계획을 세우지 않고 바로 코드를 쓴다.** 해결책은 단순하다 — 계획 단계를 **쓰기 권한 없는 모드**로 분리한다.

### 3단계 루프

```
1. PLAN    — 파일 읽기·검색·질문만 가능. 쓰기·실행 권한 없음.
             결과: 편집 가능한 계획 문서.
             ↓ (인간 또는 다른 에이전트가 검토·승인)
2. CRITIC  — 계획을 "다른 눈"으로 본다. 리뷰 전용 에이전트/세션.
             목적: 작성자가 못 본 blind spot 드러내기.
             ↓
3. BUILD   — 승인된 계획에 따라 실행. 쓰기·실행 권한 개방.
```

핵심은 **Planner와 Critic을 같은 컨텍스트에 두지 않는 것**. 자기 계획을 자기가 비평하면 blind spot이 그대로 남는다. 서로 다른 세션이 봐야 드러난다. (앞서 본 Context Quarantine의 실천이기도 하다.)

실전 팁:
- Claude Code의 **Plan Mode** (`Shift+Tab Shift+Tab`)가 1단계를 구조적으로 강제한다
- Critic은 "단순화 담당", "보안 담당", "스타일 담당" 등 **역할별로 쪼개면** 더 강력해진다
- Builder는 **승인된 계획의 링크만** 컨텍스트로 받는다 — 계획 작성 과정의 수다는 버린다

> "Planning과 execution을 분리하는 것이 내가 AI 코딩에서 하는 가장 중요한 행위다." — Armin Ronacher

---

## Ralph Loop — 가장 단순한 하네스

복잡한 멀티 에이전트 프레임워크 없이 **`while true; do ... done`** 한 줄이 이기는 사례가 있다. Geoffrey Huntley가 정식화한 Ralph 루프:

```bash
while :; do
  cat PROMPT.md | claude-code
done
```

### 왜 이게 동작하는가
- **PROMPT.md에는 "가장 중요한 일 하나"만 쓴다** — 루프가 돌 때마다 에이전트가 현재 상태에서 다음 한 걸음을 고른다
- **에이전트가 실수하면 도구를 탓하지 말고 PROMPT.md에 규칙을 추가한다** — Huntley의 표현: *"놀이터에서 아이가 미끄럼틀 위에서 뛰어내려 다치면, 'SLIDE DOWN, DON'T JUMP' 표지판을 세운다"*
- **단순성이 예측 가능성을 만든다** — 멀티 에이전트는 "비결정적 마이크로서비스"의 지옥

### 한계 (솔직한 경고)
- **Greenfield 전용**. 레거시 코드베이스에는 부적합
- 검증(테스트/린트)이 루프 안에 없으면 환각을 쌓는다
- "엔지니어가 필요 없다"는 소리는 무시해도 된다. 루프를 튜닝하고 PROMPT.md를 수정하는 사람이 여전히 필요

### 발표 포인트
Ralph 루프는 **도구가 아니라 철학**이다 — 하네스는 꼭 복잡할 필요가 없다. **"단순한 루프 + 잘 쓴 문서 + 검증"**의 조합이 과설계된 프레임워크를 이긴다는 것을 보여준다.

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

## 암묵지 명시화 — 이 섹션의 핵심

여기까지 온 질문 하나: **"AI에게 뭘 보여줘야 할지를 어떻게 알지?"**

답은 당신의 머릿속에 있다. 지금까지 선배가 후배에게 설명하던 것, 리뷰에서 "이건 이렇게 하는 게 낫다"고 말하던 것, 버그를 한 번 겪고 다음엔 반사적으로 체크하게 된 것 — 그 **암묵지(tacit knowledge)**를 AI가 읽을 수 있는 **파일**로 뽑아내는 것이 하네스 엔지니어의 가장 어렵고 가장 가치 있는 일이다.

### 기법 1 — 결정의 "이유(why)"를 쓴다

CLAUDE.md에 결정 결과(what)만 쓰면 금방 낡는다. **왜 그 결정을 했는지**를 쓰면 AI가 새로운 상황에서도 일반화한다.

```markdown
# 나쁨
- Redis 쓴다

# 좋음
- 세션 저장은 Redis. 이유: 평균 TTL 30분, PostgreSQL에 쓰면 vacuum 부담.
  새 기능도 TTL 1시간 이하 + read-heavy면 Redis 고려.
```

### 기법 2 — Post-Mortem을 규칙으로 승화시킨다

기능을 출하한 직후 AI에게 질문한다:
> "계획과 실제 구현이 어디서 갈라졌나? 왜 갈라졌나? 계획을 어떻게 썼으면 이 차이가 없었을까?"

답을 **한 줄 규칙으로** 승화시켜 CLAUDE.md에 추가한다. 다음 세션의 에이전트는 이 규칙을 무조건 읽는다. **같은 실수를 두 번 하지 않는 시스템**이 된다.

> "버그는 한 번 고치는 게 아니라, **CLAUDE.md에 한 줄을 추가하면서 고치는 것**이다."

실제 사례: 백그라운드 잡에서 외부 API rate limit 버그 한 번 → 리뷰 에이전트에 "백그라운드 잡이 외부 API를 호출할 때 rate limit / retry / partial state를 모두 체크하라" 한 줄 추가 → 같은 종류의 버그 재발 0건.

### 기법 3 — Self-Improving Harness

"마음에 안 드네", "좋은 지적이다" 같은 피드백이 들어올 때마다 규칙이 한 줄씩 자라는 구조.

> "Every time I indicate 'I don't like this' or 'Good catch,' the system gets smarter." — Kieran Klaassen

CLAUDE.md는 한 번 쓰고 끝나는 정적 문서가 아니라 **피드백으로 자라는 유기체**다.

### 기법 4 — 취향을 전용 에이전트로 인코드한다

글로 쓰기 어려운 취향은 **전용 리뷰 에이전트**로 encode한다:
- **Simplification agent** — 과설계 적발
- **Security agent** — 취약점 점검
- **Style agent** — 개인/팀 선호 ("단순 쿼리 선호, 필요하면 비정규화 고려")

취향이 글로는 모호해도 **사례가 쌓이면 에이전트는 기억한다**. "문서"가 아니라 "심사관"의 형태로 취향을 보존한다.

### 기법 5 — Synthesis with Options (역질문 대체)

"AI가 나를 인터뷰하게 만들어라"보다 효과적인 기법:
- 에이전트가 **2~3개 해결책을 트레이드오프와 함께 동시에** 제시
- 사용자가 30초 안에 하나를 고른다
- **선택 자체가 선호를 드러낸다** (속도 vs 청결함, 선투자 vs 유지보수)

이 선택들이 쌓이면 당신의 판단 기준이 데이터로 남는다. 그 데이터가 다음 세션의 CLAUDE.md 업데이트 재료다.

### 프레임 전환 — AI 시대의 시니어리티

**"당신이 일을 어떻게 잘하는지 설명하는 글쓰기 능력"**이 AI 시대의 새로운 코딩이다.

- 주니어: 코드를 짠다
- 시니어: 주니어에게 코드 쓰는 법을 설명한다
- **AI 시대의 시니어**: 자신의 암묵지를 파일로 뽑아내 AI가 읽고 실행할 수 있게 만든다

비개발자에게도 그대로 통한다. 마케터·디자이너·기획자 모두 자기 영역의 판단 기준을 글로 뽑아낼 수 있다면, 그 순간부터 AI는 그들의 **팀원**이 된다.

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
| research/harness_context_advanced.md | 컨텍스트 4가지 실패 모드(Breunig), Context Rot 실측치(Chroma), Anthropic long-horizon 3기법, Agent Loop 4단계, Right Altitude, Ralph Loop 철학, Plan-Critic-Build, 암묵지 명시화 5기법 |
| research/compound_engineering.md | Boris Cherny의 CLAUDE.md 실천, Every의 Compound Engineering 6단계 파이프라인, SSoT로서의 CLAUDE.md |
| **research/claude_md_in_practice.md** | **CLAUDE.md 현장 사례 — Boris, Klaassen, Shipper, 정구봉, Hunslog, HumanLayer 통합** |
| linkedin/linkedin_goobong_jeong_context_engineering.md | 4개 레이어, Harness Builder 역할, PRD→Skill 진화, 159개 CLAUDE.md |
| official/extensions/official_memory.md | CLAUDE.md 배치/범위 (한국어 공식 문서), 효과적 작성법, 자동 메모리 |
| **official/extensions/official_claude_md_guide.md** | **CLAUDE.md 공식 심층 가이드 — Best Practices + Memory 영문 문서 통합 (전달 방식, Include/Exclude, 한 줄 삭제 테스트, `/compact` 생존 등)** |
| official/extensions/official_skills.md | Skill 생성법, 번들 Skills, 점진적 공개 |
| official/extensions/official_hooks.md | Hook 이벤트 타입, 활용 예시 |
| official/extensions/official_mcp.md | MCP 정의, 설치, 활용 |
| **official/extensions/official_plugins.md** | **Plugins 공식 심층 가이드 — plugin.json 스키마, 마켓플레이스, 5가지 플러그인 소스, 설치 스코프, `extraKnownMarketplaces`/`strictKnownMarketplaces`, 공식 카테고리, 엔터프라이즈 기능** |
| research/skills_and_plugins.md | Oh My Claude Code, Compound Engineering Plugin, claude-mem 등 커뮤니티 플러그인 생태계 |
| blog/claude_official/blog_251009_claude-code-plugins.md | 2025-10-09 Plugins 공개 베타 발표, 활용 사례 5가지 |
| blog/claude_official/blog_260224_cowork-plugins-enterprise.md | 2026-02-24 엔터프라이즈 확장, 10개 사전 빌드 템플릿, 프라이빗 마켓플레이스 |
| blog/blog_hunslog_claude_code_power_user_tips.md | 2.5k 토큰 기준, 계층적 CLAUDE.md, 안티패턴, Boris 12가지 팁 |
| blog/claude_official/blog_250724_how-anthropic-teams-use-claude-code.md | Anthropic 내부 팀 CLAUDE.md 활용 패턴, 데이터 사이언스 팀 사례 |
| https://www.humanlayer.dev/blog/writing-a-good-claude-md | 150-200 지시문 예산, "린터가 할 일을 LLM에 시키지 말라" (2026-04-05 WebFetch) |
| https://code.claude.com/docs/en/plugins | Plugins 공식 문서 (2026-04-05 WebFetch) |
| https://code.claude.com/docs/en/plugin-marketplaces | Plugin Marketplaces 공식 문서 (2026-04-05 WebFetch) |
| https://code.claude.com/docs/en/discover-plugins | Discover and install plugins 공식 문서 (2026-04-05 WebFetch) |
