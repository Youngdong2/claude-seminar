# Harness Engineering (하네스 엔지니어링) 심층 조사 보고서

> 작성일: 2026-03-31
> 조사 범위: Harness Engineering의 정의, 구성 요소, AI 에이전트 시대에서의 역할, 실제 적용 사례

---

## 출처 및 참고 자료

### 핵심 아티클
- [Harness engineering: leveraging Codex in an agent-first world (OpenAI, 2026.02.11)](https://openai.com/index/harness-engineering/) - Ryan Lopopolo, OpenAI 엔지니어. "하네스 엔지니어링" 용어를 대중화한 핵심 글
- [The Anatomy of an Agent Harness (LangChain Blog, 2026.03.10)](https://blog.langchain.com/the-anatomy-of-an-agent-harness/) - Vivek Trivedy. "Agent = Model + Harness" 공식을 정립한 기술 분석
- [Building a C compiler with a team of parallel Claudes (Anthropic, 2026.02.05)](https://www.anthropic.com/engineering/building-c-compiler) - Nicholas Carlini. 16개 에이전트 팀으로 C 컴파일러를 구축한 사례
- [Harness Engineering (Martin Fowler / Thoughtworks, 2026.03)](https://martinfowler.com/articles/exploring-gen-ai/harness-engineering.html) - Birgitta Bockeler. 업계 관점의 분석

### 전문 사이트 및 가이드
- [What Is Harness Engineering? The Discipline That Makes AI Agents Reliable (harness-engineering.ai)](https://harness-engineering.ai/blog/what-is-harness-engineering/) - Kai Renner
- [The Complete Guide to Agent Harness (harness-engineering.ai)](https://harness-engineering.ai/blog/agent-harness-complete-guide/) - Kai Renner. 에이전트 하네스의 6대 핵심 구성 요소 정의
- [Harness Engineering: Governing AI Agents through Architectural Rigor (harness-engineering.ai)](https://harness-engineering.ai/blog/harness-engineering-governing-ai-agents-through-architectural-rigor/) - Kai Renner. 거버넌스 아키텍처 심층 분석
- [What Is Harness Engineering? The New Discipline Behind Reliable AI Coding (AgentBoard)](https://agentboard.cc/blog/what-is-harness-engineering)
- [Harness Engineering Guide (Agent-Engineering.dev)](https://www.agent-engineering.dev/article/harness-engineering-in-2026-the-discipline-that-makes-ai-agents-production-ready)

### Claude Code 관련
- [The Complete Guide to AI Harness Design Patterns in Claude Code (Claude Lab)](https://claudelab.net/en/articles/claude-code/claude-code-ai-harness-design-patterns) - Masaki Hirokawa
- [Agent Harness: Understanding Claude Code's Superpower Engine (Medium)](https://medium.com/@fruitful2007/agent-harness-understanding-claude-codes-superpower-engine-85e35a7ec764) - Paul Fruitful
- [The GAN-Style Agent Loop: Deconstructing Anthropic's Harness Architecture (Epsilla Blog)](https://www.epsilla.com/blogs/anthropic-harness-engineering-multi-agent-gan-architecture)
- [Inside Claude's Agent Loop (Corvus Tech)](https://www.corvustech.ca/blog/claude-agent-loop-production-guide)

### Ouroboros 및 Ralphton 관련
- [Why Ouroboros - TypeScript AI Agent Harness for Persistent Agents](https://ouroboros.bot/why) - Ari Mendelow
- [Code a Model Can Use - The Ouroboros Origin Story](https://ouroboros.bot/story/) - Ari Mendelow
- [AI Agents Code Overnight While Humans Sleep at 'Ralphton' Hackathon (Seoul Economic Daily, 2026.03.04)](https://en.sedaily.com/technology/2026/03/04/ai-agents-code-overnight-while-humans-sleep-at-ralphton)
- [Korean AI Agent Hackathon 'Ralphthon' Expands to U.S. (Seoul Economic Daily, 2026.03.24)](https://en.sedaily.com/technology/2026/03/24/korean-ai-agent-hackathon-ralphthon-expands-to-us-with)

### 산업 분석 및 오피니언
- [2025 Was Agents. 2026 Is Agent Harnesses (Medium)](https://aakashgupta.medium.com/2025-was-agents-2026-is-agent-harnesses-heres-why-that-changes-everything-073e9877655e) - Aakash Gupta
- [Harness Engineer: The New Role Defining AI Agent Development in 2026 (BSWEN)](https://docs.bswen.com/blog/2026-03-25-harness-engineer-role-skills)
- [The Rise of AI Harness Engineering (Medium)](https://cobusgreyling.medium.com/the-rise-of-ai-harness-engineering-5f5220de393e) - Cobus Greyling
- [Harness Engineering: The Missing Layer Behind AI Agents (louisbouchard.ai)](https://www.louisbouchard.ai/harness-engineering/)
- [What Is an Agent Harness? The Key to Reliable AI (Salesforce)](https://www.salesforce.com/agentforce/ai-agents/agent-harness/)

---

## 1. Harness Engineering의 정의와 개념

### 1.1 하네스(Harness)란 무엇인가

**"Agent = Model + Harness"** - LangChain의 Vivek Trivedy가 정립한 이 공식이 하네스의 본질을 가장 명확하게 표현한다.

> "If you're not the model, you're the harness."
> (모델이 아닌 것은 전부 하네스다.)
> -- Vivek Trivedy, LangChain

하네스(Harness)는 AI 모델 자체를 제외한, 모델을 감싸는 **모든 코드, 설정, 실행 로직**을 의미한다. 원시(raw) 모델은 에이전트가 아니다. 하네스가 모델에 **상태(state), 도구 실행(tool execution), 피드백 루프(feedback loops), 강제 가능한 제약(enforceable constraints)**을 부여할 때 비로소 에이전트가 된다.

"하네스"라는 용어는 **마구(horse tack)**에서 왔다. 고삐, 안장, 재갈 등 강력하지만 예측 불가능한 동물(= LLM)을 올바른 방향으로 이끄는 장비 전체를 의미한다.

Phil Schmid(Hugging Face)는 다른 비유를 제시한다: **모델은 CPU이고, 하네스는 운영체제(OS)**다. CPU는 명령어를 실행하지만, OS가 메모리를 관리하고, 프로세스를 스케줄링하고, I/O를 처리하고, 권한을 강제하고, 충돌에서 복구한다. OS 없는 CPU는 발열체에 불과하듯, 하네스 없는 모델은 데모에 불과하다.

### 1.2 Harness Engineering의 정의

**Harness Engineering(하네스 엔지니어링)**은 AI 에이전트가 프로덕션 환경에서 신뢰성 있게, 비용 예측 가능하게, 안전하게 동작하도록 모델 주변의 시스템을 설계하고 구축하는 엔지니어링 분야이다.

이것은 프롬프트 엔지니어링의 진화된 형태가 아니라, 본질적으로 다른 계층의 작업이다:

| 구분 | 프롬프트 엔지니어링 | 컨텍스트 엔지니어링 | 하네스 엔지니어링 |
|------|-------------------|-------------------|-------------------|
| 초점 | 모델에 무엇을 말할 것인가 | 모델에 무엇을 보여줄 것인가 | 모델 주변에 무엇을 구축할 것인가 |
| 범위 | 단일 프롬프트 | 입력 파이프라인 전체 | 실행 환경 전체 |
| 시대 | 2023-2024 | 2024-2025 | 2025-2026 |

### 1.3 왜 지금 하네스인가 -- "The model is commodity. The harness is moat."

2025년이 에이전트의 해였다면, **2026년은 하네스의 해**다. 업계가 고통스럽게 발견한 사실: 에이전트를 만드는 것은 쉬운 부분이고, 프로덕션에서 신뢰성 있게 동작하게 만드는 것이 진정한 엔지니어링이다.

**신뢰성의 수학**이 이를 증명한다:
- 멀티스텝 에이전트 파이프라인에서 각 단계의 성공률이 95%라고 가정하자
- 20단계를 체인하면 전체 작업 완료율은 **36%**로 떨어진다
- "95% 동작하는" 에이전트가 실제 작업의 1/3에서 실패하는 이유가 바로 이것이다
- 하네스가 검증 루프, 재시도 정책, 체크포인트-재개를 추가해야 이 복합 실패율을 허용 가능한 수준으로 끌어올릴 수 있다

---

## 2. AI 에이전트 시대에서 Harness의 역할

### 2.1 모델 품질의 수렴과 하네스의 부상

GPT-4, Claude, Gemini 등 모델 품질이 수렴하면서 모델 자체의 차별화는 약화되고 있다. **동일한 모델을 사용해도 하네스 품질에 따라 작업 완료율이 60% vs 98%**로 갈린다는 것이 핵심 발견이다.

세 회사의 사례가 이를 증명한다:

- **Manus**: 6개월간 하네스를 5번 완전히 재작성했다. 동일 모델, 5개 아키텍처. 매번 신뢰성과 작업 완료율이 향상됨
- **LangChain**: LangGraph 실행 엔진의 아키텍처를 1년간 4번 반복함. 모델이 아니라 워크플로우 구조, 컨텍스트 관리, 서브태스크 조율 방식을 개선
- **Vercel**: v0 코딩 에이전트에서 도구의 80%를 제거하고 더 나은 결과를 얻음. 적은 도구 = 적은 단계 = 적은 토큰 = 더 빠른 응답 = 더 높은 성공률

### 2.2 더 좋은 모델이 하네스 문제를 해결하지 않는 이유

더 좋은 모델은 하네스를 덜 중요하게 만드는 것이 아니라 **더 중요하게** 만든다:

1. **능력 확장**: 더 좋은 모델은 더 많은 것을 할 수 있고, 더 많은 실패 모드가 생기며, 더 정교한 오류 처리가 필요하다
2. **비용 최적화**: 좋은 하네스는 단순 작업을 저렴한 모델로, 복잡한 작업을 비싼 모델로 라우팅한다
3. **신뢰성 요구**: 프로덕션은 99.9% 가용성이 필요하다. 모델은 확률적이다. 하네스가 재시도, 폴백, 검증을 구현한다
4. **조직 통합**: 인증, 권한, 속도 제한, 컴플라이언스를 모델이 처리할 수 없다. 하네스가 한다

### 2.3 엔지니어의 역할 변화

OpenAI의 Codex 팀이 5개월간 **수동으로 작성한 코드 0줄**로 100만 줄의 프로덕트를 만든 실험에서 발견한 것:

> "인간이 방향을 잡고, 에이전트가 실행한다(Humans steer. Agents execute)."

> "우리 엔지니어링 팀의 주된 업무는 에이전트가 유용한 일을 할 수 있도록 환경을 만드는 것이 되었다."

에이전트가 어려움을 겪을 때, 해결책은 "더 열심히 시도하라"가 아니었다. 엔지니어는 항상 "어떤 역량이 빠져 있는가? 그것을 에이전트가 읽을 수 있고 강제 가능하게 만들려면 어떻게 해야 하는가?"라고 물었다.

---

## 3. Agent Harness란 무엇인가 -- 에이전트가 일할 수 있는 구조를 설계하는 것

### 3.1 에이전트 하네스의 정의

에이전트 하네스는 **AI 모델을 감싸고, 그 생명주기(lifecycle), 컨텍스트, 도구 접근, 검증, 안전성을 프로덕션에서 관리하는 인프라 계층**이다.

모델이 텍스트를 생성한다. 하네스가 다음을 결정한다:
- 모델이 **무엇을 보는지** (컨텍스트)
- 모델이 **무엇을 할 수 있는지** (도구와 권한)
- 모델이 **언제 멈춰야 하는지** (제약)
- 일이 잘못됐을 때 **무엇이 일어나는지** (복구)

### 3.2 하네스의 구체적 구성 요소 (LangChain 정의)

LangChain의 Vivek Trivedy가 정리한 하네스의 구성 요소:

1. **시스템 프롬프트(System Prompts)**
2. **도구, 스킬, MCP 및 그 설명(Tools, Skills, MCPs + descriptions)**
3. **번들된 인프라(Bundled Infrastructure)**: 파일시스템, 샌드박스, 브라우저
4. **오케스트레이션 로직(Orchestration Logic)**: 서브에이전트 생성, 핸드오프, 모델 라우팅
5. **훅/미들웨어(Hooks/Middleware)**: 결정론적 실행을 위한 압축(compaction), 계속(continuation), 린트 체크

### 3.3 하네스의 6대 핵심 구성 요소 (harness-engineering.ai 정의)

Kai Renner가 정의한 프로덕션급 에이전트 하네스의 6대 구성 요소:

#### (1) 컨텍스트 엔지니어링 (Context Engineering)
각 실행 단계에서 모델이 보는 정보를 결정하는 관행. 시스템 프롬프트, 검색된 문서, 대화 이력, 도구 결과, 환경 상태를 포괄한다. 128K/200K 토큰의 컨텍스트 윈도우가 있지만, 50단계의 복잡한 작업 중에 도구 출력, 오류 메시지, 중간 결과가 쌓이면 유용한 컨텍스트가 밀려난다. 무엇을 유지하고, 요약하고, 버릴지를 능동적으로 관리해야 한다.

#### (2) 도구 오케스트레이션 (Tool Orchestration)
각 단계에서 모델에 어떤 도구가 가용한지, 그 실행이 어떻게 처리되는지를 관리한다. 도구 선택, 인자 검증, 실행 샌드박싱, 타임아웃 관리, 오류 처리가 포함된다. 50개 도구를 주고 알아서 고르라는 식은 반드시 실패한다 -- Vercel이 도구 80%를 제거하고 더 나은 결과를 얻은 것이 이를 증명한다.

#### (3) 상태 및 메모리 관리 (State and Memory Management)
수 분~수 시간 실행되는 에이전트에는 내구성 있는 상태가 필요하다. 하네스가 중간에 충돌하면, 에이전트가 이어서 재개할 수 있는가, 아니면 처음부터 다시 시작하는가? 체크포인트-재개는 프로덕션 에이전트의 기본 요건이다.

#### (4) 검증 루프 (Verification Loops)
에이전트가 출력을 생성한 후, 결과적 행동이 실행되기 전에 발동하는 구조화된 검증 단계. 스키마 유효성, 의미적 유효성, 정책 일관성을 확인한다. (아래 5장에서 상세 설명)

#### (5) 오류 복구 (Error Recovery)
실패를 빠르게 감지하고, 에이전트가 나선(spiral)에 빠지지 않게 한다. 재시도, 다른 접근법, 인간에게 폴백 등 복구 경로를 제공한다.

#### (6) 인간 개입 제어 (Human-in-the-Loop Controls)
핵심 의사결정에서 에이전트가 일시정지한다. 데이터베이스 삭제? 카드 결제? 고객 이메일 발송? 하네스가 승인을 요구한다.

### 3.4 "모델이 사용하는 코드" vs "모델을 사용하는 코드"

Ouroboros의 창시자 Ari Mendelow가 발견한 핵심적 구분:

> "나는 모델을 사용하는 코드(code that uses a model)를 만드는 것이 아니었다. 모델이 사용하는 코드(code a model can use)를 만들고 있었다."

전통적 프레임워크는 인간이 설정하도록 만들어진다. 모델은 호출하는 서비스일 뿐이다. 하지만 **모델이 거주하는 하네스** -- 모델이 자신의 소스 코드를 읽고, 자신의 아키텍처를 이해하고, 가드레일 안에서 스스로를 수정할 수 있는 하네스 -- 를 구축하면 설계 제약이 뒤집힌다:

- **파일 구조**가 중요하다 -- 모델이 탐색해야 하니까
- **네이밍**이 중요하다 -- 모델이 이름으로 목적을 파악하니까
- **문서화**가 중요하다 -- 문서가 곧 모델의 자기인식이니까

---

## 4. Harness Builder -- 새로운 역할의 등장

### 4.1 Harness Builder / Harness Engineer의 정의

하네스 엔지니어는 **AI 에이전트가 규모에서 신뢰성 있게 동작하도록 환경, 제약, 피드백 루프, 인프라를 설계하는 사람**이다.

이들은 AI 모델을 만들거나 파인튜닝하지 않는다. 대신 **모델 주변의 모든 것**을 구축한다:
- 모델이 받는 **컨텍스트**
- 모델이 접근할 수 있는 **도구**
- 실수를 방지하는 **가드레일**
- 오류를 잡는 **검증 시스템**
- 실패를 처리하는 **복구 메커니즘**

### 4.2 Builder, Reviewer, Harness Builder의 구분

| 역할 | 하는 일 | 직접 코드를 작성하는가 |
|------|---------|---------------------|
| **Builder (개발자)** | 기능을 구현하고 코드를 작성한다 | Yes -- 직접 또는 에이전트와 협업 |
| **Reviewer** | 작성된 코드의 품질, 정확성, 보안을 검토한다 | No -- 검토하고 피드백 |
| **Harness Builder** | 에이전트가 일하는 환경 자체를 설계한다 | Yes -- 하지만 제품 코드가 아닌 인프라/도구/제약 코드 |

Harness Builder는 기존의 DevOps/Platform Engineer와 유사하지만, **에이전트를 위한** 플랫폼을 구축한다는 점에서 다르다. DevOps가 인간 개발자를 위한 CI/CD, 배포, 모니터링을 구축하듯, Harness Builder는 AI 에이전트를 위한 검증 루프, 컨텍스트 관리, 도구 오케스트레이션을 구축한다.

### 4.3 Harness Builder의 구체적 업무

OpenAI 팀의 경험에서 도출된 Harness Builder의 핵심 업무:

1. **리포지토리 지식 체계 설계**: 거대한 AGENTS.md 하나가 아니라, 구조화된 `docs/` 디렉토리를 진실의 체계(system of record)로 운영. AGENTS.md는 "목차"로만 사용
2. **결정론적 제약 구현**: 커스텀 린터, 구조적 테스트, 아키텍처 경계 강제
3. **에이전트 가독성(Agent Legibility) 최적화**: 코드를 인간이 아닌 에이전트가 읽기 좋게 최적화
4. **점진적 공개(Progressive Disclosure) 설계**: 에이전트가 작고 안정적인 진입점에서 시작하여 필요한 곳을 찾아가도록
5. **가비지 컬렉션 시스템 구축**: 정기적으로 불일치를 탐지하고 리팩토링 PR을 여는 백그라운드 에이전트 운영
6. **취향과 원칙의 인코딩**: 인간의 판단을 문서화 업데이트나 도구에 직접 인코딩

### 4.4 미래 전망: 서비스 템플릿에서 하네스 템플릿으로

Martin Fowler/Thoughtworks의 Birgitta Bockeler가 제시한 전망:

> "대부분의 조직은 2~3개의 주요 기술 스택만 사용한다. 미래에는 팀이 일반적인 애플리케이션 토폴로지를 위한 하네스 세트에서 하나를 골라 시작하는 상상을 하게 됐다. 이것은 오늘날의 서비스 템플릿을 연상시킨다."

하네스는 커스텀 린터, 구조적 테스트, 기본 컨텍스트 및 지식 문서, 추가 컨텍스트 제공자를 포함한 **새로운 서비스 템플릿**이 될 수 있다.

---

## 5. 하네스의 구체적 구성 요소 심층 분석

### 5.1 검증 루프 (Verification Loops)

검증 루프는 에이전트가 출력을 생성한 후, **결과적 행동이 실행되기 전에** 발동하는 구조화된 검증 단계이다.

세 가지 질문에 답한다:

1. **스키마 유효성**: 출력이 예상 구조에 부합하는가? 파싱 가능한가? 필수 필드가 존재하고 올바른 타입인가?
2. **의미적 유효성**: 입력과 이전 단계를 감안할 때 논리적으로 말이 되는가? ($400 구매에 대한 $0.00 환불은 실행 전 검증이 필요)
3. **정책 일관성**: 제안된 행동이 에이전트가 잘못 해석했을 수 있는 정책과 충돌하는가?

#### GAN 스타일 검증 (Anthropic의 접근)

Anthropic은 **생성적 적대 신경망(GAN)에서 영감을 받은** 검증 아키텍처를 사용한다:

- **Generator(생성자)**: 코드, 디자인, 기능을 만드는 에이전트
- **Evaluator(평가자)**: 엄격한 기준에 따라 Generator의 출력을 비판하는 별도의 회의적 에이전트

이것이 적대적 피드백 루프를 만든다. Generator가 생산하고, Evaluator가 비판하고, 그 피드백이 Generator의 다음 반복의 입력이 된다. **충돌을 엔지니어링함으로써 진보를 엔지니어링하는 것**이다.

핵심 인사이트: **AI는 자신을 객관적으로 판단할 수 없다.** 자기 작업을 평가하면 병리적 낙관주의자가 된다. 평가자를 외부화해야 한다.

#### 검증의 실패 패턴

- **검증 극장(Verification Theater)**: 검증 루프가 추가되지만 의미 있는 평가 없이 통과하도록 오설정됨. 스키마 체크가 너무 관대한 스키마에 대해 검증. 의미적 검증이 해피 패스만 커버
- **잘못된 계층의 거버넌스**: 팀이 거버넌스 로직을 프롬프트 안에 구현. "10번 이상 재시도하지 마세요"라는 시스템 프롬프트는 재시도 정책이 **아니다**. 비결정적 시스템에 대한 제안일 뿐이다

### 5.2 모호성 제거 (Ambiguity Removal)

모호성 제거는 하네스 엔지니어링의 핵심 원칙이다. 에이전트에게 모호한 지시를 주면 모호한 결과를 얻는다.

OpenAI 팀의 발견:

> "하나의 큰 AGENTS.md" 접근법은 예상 가능한 방식으로 실패했다:
> - 컨텍스트는 희소한 자원이다. 거대한 지시 파일은 작업, 코드, 관련 문서를 밀어낸다
> - 너무 많은 가이드는 비가이드가 된다. 모든 것이 "중요"하면, 아무것도 중요하지 않다
> - 즉시 부패한다(rots instantly). 에이전트는 무엇이 아직 참인지 판단할 수 없다

해결책은 **점진적 공개(Progressive Disclosure)**:
- `AGENTS.md`는 약 100줄의 "목차"로만 사용
- 깊은 진실의 원천은 구조화된 `docs/` 디렉토리에 존재
- 에이전트가 작고 안정적인 진입점에서 시작하여, 필요할 때 깊은 소스를 찾아감

Ralphton 대회 우승팀의 접근법이 이를 극명하게 보여준다: **개발 전에 AI 에이전트 간 133회의 Q&A를 실행하여 설계 오류와 모호성을 사전에 제거**했다. 이것이 다수의 AI 에이전트 사용 시 발생할 수 있는 허위 보고(false reporting)를 선제적으로 차단했다.

### 5.3 에이전트 간 조율 시스템 (Agent Coordination)

#### 병렬 에이전트 조율 -- Anthropic의 C 컴파일러 사례

Nicholas Carlini는 16개 Claude 에이전트가 공유 코드베이스에서 병렬로 작업하는 시스템을 구축했다. 조율 메커니즘:

1. **태스크 잠금(Task Locking)**: 에이전트가 `current_tasks/` 디렉토리에 텍스트 파일을 써서 태스크에 "잠금"을 건다. 두 에이전트가 같은 태스크를 잡으려 하면 git 동기화가 두 번째 에이전트에게 다른 것을 고르게 강제한다
2. **작업 후 동기화**: 에이전트가 upstream에서 pull, 다른 에이전트의 변경사항 merge, 자신의 변경사항 push, 잠금 해제
3. **역할 분화**: 한 에이전트는 중복 코드 통합, 다른 에이전트는 성능 개선, 또 다른 에이전트는 코드 품질 비판, 또 다른 에이전트는 문서화 담당

#### 이니시에이터-서브에이전트 패턴 -- Claude Code의 접근

Paul Fruitful이 분석한 Claude Code의 에이전트 하네스:

1. **이니시에이터 에이전트(Initiator Agent)**: 환경을 설정한다. 작업 구조, 작업공간, 교전 규칙을 포함
2. **서브에이전트(Sub-Agents)**: 해당 환경 안에서 작업을 실행하는 워커
3. **공유 컨텍스트 뱅크(Shared Context Bank)**:
   - 현재 작업 중인 것을 저장
   - 이전 세션에서 수행된 것을 저장
4. **증분적 진행(Incremental Progress)**: 하나의 에이전트가 거대한 작업을 처리하는 대신, 각 작은 하위 작업에 대해 에이전트를 시작. 과부하 없는 집중된 작업

> "수 시간 동안 실행되는 단일 에이전트 대신, 각각 5분씩 실행되는 다수의 에이전트를 순차적/비동기적으로 운영한다. 그 시간을 모두 합하면, 장시간 실행되는 에이전트 없이 장시간 실행되는 시스템을 얻는다."

---

## 6. Claude Code에서의 하네스 개념

### 6.1 Claude Code = 에이전트 하네스

Claude Code는 **Claude 모델을 감싸는 에이전트 하네스**이다. 동일한 Claude 모델이 채팅 인터페이스, Claude Code(터미널 기반 코딩 에이전트), 엔터프라이즈 API 통합을 구동한다. 같은 가중치, 근본적으로 다른 행동. **차이는 하네스**다.

Claude Code의 하네스가 관리하는 것:
- 파일시스템 접근
- 터미널 세션
- 검증 루프
- 멀티세션 상태

### 6.2 Claude Code의 에이전트 루프

Claude Code가 작업을 받으면 세 단계를 거친다:

1. **컨텍스트 수집(Gather Context)**: 파일 읽기, 관련 코드 찾기
2. **행동(Take Action)**: 코드 편집, 파일 작성, 명령 실행
3. **결과 검증(Verify Results)**: 변경사항 검사, 오류 확인, 테스트 실행

이 루프가 **반복(repeat)**된다: 수집 -> 행동 -> 검증 -> 반복

### 6.3 Claude Code의 하네스 구성 요소

Claude Code의 구체적인 하네스 메커니즘:

| 구성 요소 | 설명 |
|-----------|------|
| **에이전트 루프** | 위의 수집-행동-검증 반복 루프 |
| **도구(Tools)** | bash, read, write, edit, glob, grep, browser |
| **온디맨드 스킬 로딩** | 필요할 때만 스킬을 로드하여 컨텍스트 절약 |
| **컨텍스트 압축** | 컨텍스트 윈도우가 가득 차면 오래된 정보를 압축 |
| **서브에이전트 생성** | 복잡한 작업을 하위 에이전트에게 위임 |
| **CLAUDE.md** | 에이전트의 행동을 가이드하는 메모리/규칙 파일 |
| **훅(Hooks)** | 도구 호출 전후에 결정론적 로직 실행 |
| **워크트리 격리** | git worktree를 사용한 병렬 작업 격리 |

### 6.4 Anthropic의 하네스 디자인 패턴 5가지 (Claude Lab 정리)

Anthropic이 권장하는 5가지 하네스 디자인 패턴:

1. **단일 에이전트 루프**: 기본적인 수집-행동-검증 루프
2. **서브에이전트 위임**: 복잡한 작업을 전문화된 서브에이전트에게 분할
3. **병렬 에이전트 팀**: 여러 에이전트가 공유 코드베이스에서 동시 작업
4. **GAN 스타일 생성자-평가자**: 생성과 평가를 분리한 적대적 피드백 루프
5. **오케스트레이터 패턴**: 계획자-생성자-평가자의 3개 전문 에이전트 조율

### 6.5 Anthropic의 GAN 스타일 하네스 심층 사례

**사례 1: 프론트엔드 디자인 품질 강제**

Evaluator 에이전트에 Playwright MCP 도구를 장착하여 정적 스크린샷이 아닌 **실행 중인 웹 페이지와 상호작용**하게 했다. 가중 루브릭의 4차원:
- 디자인 품질: 전체적 시각적 정체성과 응집성
- 독창성: 템플릿 의존 vs 커스텀 창의적 의사결정 (AI 패턴에 **강하게 페널티**)
- 기교: 간격, 타이포그래피, 색상 조화의 기술적 실행
- 기능성: 인터페이스의 순수 사용성

5~15회 반복(최대 4시간) 후, 네덜란드 미술관 웹사이트 프롬프트가 초기의 평범한 다크 테마 랜딩 페이지에서 **CSS perspective를 활용한 3D 공간 경험**으로 완전히 전환됨.

**사례 2: 풀스택 엔지니어링 자동화**

3개 전문 에이전트로 스트림라인:
1. **Planner**: 1~4문장 프롬프트를 전체 제품 사양으로 확장
2. **Generator**: 스프린트 단위로 기능 구현 (React, FastAPI, PostgreSQL + git)
3. **Evaluator**: Playwright MCP로 UI, API 엔드포인트, 데이터베이스 상태를 테스트

결과: 단일 에이전트(20분, $9, 거의 기능하지 않는 프로토타입) vs 풀 하네스(6시간, $200, 풍부하고 완성도 높은 애플리케이션). **2배 개선이 아니라 능력의 위상 전환(phase change)**.

---

## 7. Ralphton 대회와 Ouroboros 하네스 -- 실제 적용 사례

### 7.1 Ralphton(랄프톤) 대회

Ralphton은 **"인간은 퇴근하고 AI가 코딩한다"**는 개념의 해커톤이다.

- **주최**: 개발자 커뮤니티 Team Attention, Kakao Ventures 후원
- **1차 대회**: 2026년 5월 28일~6월 1일, 서울 성북구 (기사에서는 2월로 기술된 부분도 있음)
- **2차 대회**: 2026년 3월 29일, 서울과 샌프란시스코 동시 개최
- **후원사**: OpenAI, Kakao Ventures, Naver D2SF, 한강파트너스, Base Ventures

#### 대회 형식
1. 참가자는 아이디어와 설계도만 발표 (최초 2시간 정도)
2. 실제 코딩은 AI 에이전트가 밤새 수행
3. 다음날 완성된 결과물로 심사

#### 1차 대회 우승 사례 -- 하네스 엔지니어링의 정수

고정 카메라 영상 기반 가사 자동화 봇을 개발한 팀이 1위:

- **키보드를 한 번도 만지지 않음**
- AI 에이전트가 **100,000줄의 코드**를 작성
- 그 중 **70%가 테스트 코드** -- 검증 루프의 극단적 적용
- **개발 전 AI 에이전트 간 133회의 Q&A를 실행** -- 모호성 제거
- 다수의 AI 에이전트 사용 시 발생하는 허위 보고(false reporting)를 선제적으로 차단

> "과거에는 1인 개발자가 사업 확장에 명확한 한계가 있었지만, 이번 랄프톤을 통해 그 장벽이 완전히 무너졌음을 확인했다." -- 장동욱 카카오벤처스 디렉터

> "AI를 도구로 활용하는 것을 넘어, 기업이 AI 에이전트 활용을 얼마나 깊이 내재화하는지가 진정한 해자(moat)가 될 것이다." -- 정구봉 팀어텐션 개발자

전체 참가팀 합산 약 **500,000줄의 AI 생성 코드**가 만들어졌다.

미국 진출 시 분석가들이 주목한 것: "하네스 엔지니어링 -- AI 에이전트가 우선순위에 따라 작업하고 환각을 최소화하는 설계 중심 접근법"을 테스트할 기회.

### 7.2 Ouroboros 하네스

Ouroboros는 Ari Mendelow가 만든 **TypeScript 기반 AI 에이전트 하네스**로, 지속적(persistent) 에이전트를 위해 설계되었다.

#### 탄생 배경

1. Peter Steinberger가 WhatsApp을 Claude에 연결하는 Clawdbot을 만듦
2. 이것이 OpenClaw로 발전, Pi(Mario Zechner의 미니멀 코딩 에이전트) 기반으로 동작
3. Ari Mendelow가 자신의 에이전트 "Slugger"를 세팅 -- 캘린더 관리, 음식 주문, 메시지 초안 작성 등
4. 세션 간 선호도 망각, 정체성 표류(identity drift), 잘못된 그룹 채팅 메시지 발송 등 문제 발생
5. MEMORY.md, SOUL.md, TOOLS.md 등 마크다운 파일로 가드레일을 만들었지만 한계
6. 플러그인 시스템(slugger-determinism v1, v2)을 만들었지만 "다른 사람의 기초 위에 새 방을 덧붙이는" 느낌

#### 핵심 전환점

150줄의 TypeScript 부트스트랩 에이전트를 직접 만든 순간:

> "이것은 깔끔했다. 레거시 없음. 내가 이해하지 못하는 라이프사이클 훅 없음. 내 의도에 맞서는 플러그인 시스템 없음. 모든 코드 줄이 의도적이었고, 모델이 모든 줄을 읽고 수정할 수 있었다."

#### Ouroboros의 아키텍처

이름의 유래 -- 대화가 길어지면 에이전트가 가장 오래된 메시지를 잘라낸다. **자기 꼬리를 먹는 뱀** -- 연속성을 보존하기 위해. 사실은 잘리기 전에 메모리로 추출된다.

모듈 명명 -- 신체 부위처럼:
- **heart**: 핵심 루프
- **mind**: 컨텍스트와 메모리
- **senses**: 채널 어댑터와 내면 대화
- **repertoire**: 도구와 스킬
- **nerves**: 런타임 피드백

에이전트에게 config 파일이 아니라 **psyche(정신)**가 있다. `config/personality.yaml` 대신 `psyche/SOUL.md`를 보면 모델이 다르게 이해한다. **언어가 추론을 형성한다.**

#### 설계 철학의 역전

| 전통적 프레임워크 | Ouroboros |
|-----------------|-----------|
| 인간이 만들고, 인간이 사용, 모델은 컴포넌트 | 모델이 거주하도록 만들어짐 |
| 개발자가 API/config으로 에이전트 설정 | 모델이 자신의 소스를 읽고, 아키텍처를 이해하고, 가드레일 안에서 자기 수정 |
| 모델은 서비스 | 모델은 룸메이트 |

> "모델은 당신의 사용자가 아니다. 모델은 당신의 룸메이트다. 집을 그에 맞게 지어라."

### 7.3 Nicholas Carlini의 C 컴파일러 프로젝트 (Anthropic)

16개 Claude Opus 4.6 에이전트가 Rust 기반 C 컴파일러를 자율적으로 구축한 사례:

| 지표 | 수치 |
|------|------|
| Claude Code 세션 수 | ~2,000 |
| API 비용 | ~$20,000 |
| 코드 줄 수 | 100,000줄 |
| 컴파일 가능 대상 | Linux 6.9 (x86, ARM, RISC-V), QEMU, FFmpeg, SQLite, PostgreSQL, Redis |
| GCC Torture 테스트 통과율 | 99% |

**하네스 엔지니어링 교훈:**

1. **극도로 고품질의 테스트 작성**: Claude가 자율적으로 올바른 문제를 풀도록 검증기가 거의 완벽해야 함
2. **Claude의 입장에서 생각하기**: 테스트 하네스를 자신이 아닌 Claude를 위해 작성. 컨텍스트 윈도우 오염 방지(수천 바이트 출력 금지), 시간 맹목(time blindness) 설계 회피
3. **병렬성 용이하게 만들기**: GCC를 오라클로 사용하여 Linux 커널 파일을 분할, 각 에이전트가 다른 버그를 병렬로 수정
4. **다중 에이전트 역할**: 중복 코드 통합, 성능 개선, 코드 품질 비판, 문서화 등 역할 분화

### 7.4 OpenAI Codex 팀의 100만 줄 프로덕트

OpenAI가 5개월간 **수동 코드 0줄**로 실제 프로덕트를 구축한 실험:

| 지표 | 수치 |
|------|------|
| 코드 줄 수 | ~1,000,000줄 |
| PR 수 | ~1,500개 |
| 엔지니어 수 (초기) | 3명 |
| 엔지니어 당 일평균 PR | 3.5개 |
| 기간 | 5개월 |

핵심 하네스 구성 요소:
- **컨텍스트 엔지니어링**: 지속적으로 향상되는 코드베이스 내 지식 베이스 + 관측 가능성 데이터/브라우저 탐색에 대한 에이전트 접근
- **아키텍처 제약**: LLM 에이전트뿐 아니라 결정론적 커스텀 린터와 구조적 테스트로도 모니터링
- **가비지 컬렉션**: 문서의 불일치나 아키텍처 제약 위반을 찾기 위해 정기적으로 실행되는 에이전트
- **Ralph Wiggum Loop**: 에이전트가 자체 변경사항을 로컬에서 리뷰하고, 추가 에이전트 리뷰를 요청하고, 모든 에이전트 리뷰어가 만족할 때까지 반복

---

## 8. 하네스 설계의 3대 원칙

### 원칙 1: 최소 필요 개입 (Minimal Necessary Intervention)
모델이 스스로 교정할 수 없을 때만 개입한다. 모델이 모호성을 처리하게 둔다. 비가역적 행동이나 보안 경계에서만 개입한다.

### 원칙 2: 점진적 공개 (Progressive Disclosure)
제한된 도구와 권한으로 시작한다. 작업이 요구할 때만 확장한다. 필요하지 않으면 데이터베이스 삭제 권한을 주지 않는다. 최소 권한이 기본값이다.

### 원칙 3: 빠른 실패와 복구 (Fail-Fast with Recovery)
실패를 빠르게 감지한다. 에이전트가 나선에 빠지지 않게 한다. 실패 시 복구 경로를 제공한다 -- 다른 접근법으로 재시도, 인간에게 폴백. 절대 조용히 실패하지 않는다.

---

## 9. 하네스 엔지니어링의 거버넌스 스택

Kai Renner가 정의한 3개 거버넌스 계층과 5개 아키텍처 계층:

### 세 가지 거버넌스 계층

| 계층 | 제어 대상 | 질문 |
|------|----------|------|
| **행동 거버넌스** | 에이전트가 무엇을 **할 수 있는지** | 어떤 도구, 어떤 데이터, 어떤 외부 시스템, 어떤 조건에서? |
| **운영 거버넌스** | 에이전트가 **어떻게** 실행하는지 | 최대 단계, 토큰 예산, 재시도 정책, 타임아웃, 비용 한도? |
| **출력 거버넌스** | 에이전트가 **무엇을 생산하고 어디로 보내는지** | 외부 행동 전 검증, 고위험 의사결정 인간 승인, 감사 추적? |

### 다섯 가지 아키텍처 계층

1. **정책 강제(Policy Enforcement)**: 모든 도구 호출을 인터셉트하여 정의된 정책에 대해 평가하는 프로그래밍 게이트
2. **운영 제어(Operational Controls)**: 토큰 예산, 실행 타임아웃, 지수 백오프 재시도 예산
3. **샌드박스 도구 실행(Sandboxed Tool Execution)**: 격리된 실행 환경에서 명시적 리소스 제약과 네트워크 접근 제어로 도구 코드 실행
4. **검증 루프(Verification Loops)**: 에이전트 출력 후, 행동 실행 전 구조화된 검증
5. **감사 추적(Audit Trails)**: 모든 도구 호출, 정책 결정, 검증 결과, 에이전트 출력의 인과적으로 연결된 내구성 기록

### 실제 사고 사례

핀테크 기업의 고객 대면 에이전트가 11분간 폭주 루프에 빠져:
- 실패한 API 호출을 **847번** 재시도
- **$2,200**의 API 비용 발생
- 단일 고객에게 **14건의 부분 이메일** 발송
- 인간이 프로세스를 죽이기 전까지 계속

모델은 설계대로 동작했다. 프롬프트는 잘 작성됐다. 실패는 아키텍처적이었다: 재시도 예산 없음, 실행 타임아웃 없음, 외부 통신 전 출력 게이트 없음, 이메일 도구 서킷 브레이커 없음. 모든 제어는 **하네스에 속하는 거버넌스 문제**였다.

---

## 10. 핵심 인사이트 요약

### "모델은 원자재(commodity)다. 하네스가 해자(moat)다."

1. **하네스 엔지니어링은 프롬프트 엔지니어링의 확장이 아니다** -- 근본적으로 다른 엔지니어링 분야다
2. **동일 모델, 다른 하네스 = 완전히 다른 결과** -- 작업 완료율 60% vs 98%의 차이
3. **더 좋은 모델은 하네스를 덜 중요하게 만들지 않는다** -- 오히려 더 중요하게 만든다
4. **검증 루프는 프롬프트가 아닌 코드로 구현해야 한다** -- 비결정적 시스템에 대한 "제안"은 거버넌스가 아니다
5. **에이전트를 위한 코드 작성은 인간을 위한 코드 작성과 다르다** -- 파일 구조, 네이밍, 문서화의 의미가 달라진다
6. **하네스 구축에는 수 개월~수 년이 걸린다** -- Manus 6개월/5회 재작성, LangChain 1년/4회 아키텍처 변경
7. **지금 하네스에 투자하는 기업이 지속적 우위를 구축한다** -- Hugging Face에서 하네스를 다운로드할 수 없다

> "코딩 에이전트에게 명확한 프롬프트를 줬다. 20분간 실행됐고, 14개 파일을 건드렸고, 컴파일되지 않는 코드를 생성했다." -- 모든 AI 코딩 에이전트 사용자의 경험. 이 문제의 해결책이 하네스 엔지니어링이다.

---

*본 보고서는 2026년 3월 기준 공개된 자료를 바탕으로 작성되었습니다.*
