# Context Engineering (컨텍스트 엔지니어링) 심층 조사 보고서

> 작성일: 2026-03-31
> 목적: Claude 세미나용 Context Engineering 조사 자료

---

## 출처 및 참고 링크

### 핵심 1차 자료
- [Anthropic 공식 블로그 - Effective Context Engineering for AI Agents (2025.09.29)](https://www.anthropic.com/engineering/effective-context-engineering-for-ai-agents)
- [Phil Schmid (Hugging Face) - The New Skill in AI is Not Prompting, It's Context Engineering (2025.06.30)](https://www.philschmid.de/context-engineering)
- [Phil Schmid - Context Engineering for AI Agents: Part 2 (2025.12.04)](https://www.philschmid.de/context-engineering-part-2)
- [Tobi Lutke Twitter/X 원문 (2025.06.19)](https://x.com/tobi/status/1935533422589399127)
- [Andrej Karpathy Twitter/X 원문 (2025.06)](https://x.com/karpathy/status/1937902205765607626)
- [Simon Willison - Context Engineering (2025.06.27)](https://simonwillison.net/2025/jun/27/context-engineering/)

### LangChain 시리즈
- [LangChain - Context Engineering for Agents (2025.07.02)](https://blog.langchain.com/context-engineering-for-agents/)
- [LangChain - The Rise of "Context Engineering"](https://blog.langchain.com/the-rise-of-context-engineering/)
- [LangChain - How Agents Can Use Filesystems for Context Engineering](https://blog.langchain.com/how-agents-can-use-filesystems-for-context-engineering/)
- [LangChain - Context Management for Deep Agents](https://blog.langchain.com/context-management-for-deepagents/)

### 실전 사례 및 심화 자료
- [Manus AI - Context Engineering for AI Agents: Lessons from Building Manus (2025.07.18)](https://manus.im/blog/Context-Engineering-for-AI-Agents-Lessons-from-Building-Manus)
- [Gartner - Context Engineering: Why It's Replacing Prompt Engineering](https://www.gartner.com/en/articles/context-engineering)
- [Anthropic - Introducing the Model Context Protocol](https://www.anthropic.com/news/model-context-protocol)
- [Anthropic - Donating MCP to the Agentic AI Foundation (2025.12)](https://www.anthropic.com/news/donating-the-model-context-protocol-and-establishing-of-the-agentic-ai-foundation)
- [Claude 공식 문서 - Manage Claude's Memory](https://docs.anthropic.com/en/docs/claude-code/memory)
- [Dex Horthy (HumanLayer) - Advanced Context Engineering for Coding Agents](https://github.com/humanlayer/advanced-context-engineering-for-coding-agents)

### 가이드 및 해설
- [Elastic - Context Engineering vs Prompt Engineering](https://www.elastic.co/search-labs/blog/context-engineering-vs-prompt-engineering)
- [Glean - Context Engineering vs. Prompt Engineering: Key Differences Explained](https://www.glean.com/perspectives/context-engineering-vs-prompt-engineering-key-differences-explained)
- [DataCamp - Context Engineering: A Guide With Examples](https://www.datacamp.com/blog/context-engineering)
- [Prompting Guide - Context Engineering Guide](https://www.promptingguide.ai/guides/context-engineering-guide)
- [Claude Code Context Engineering: 6 Pillars Framework](https://claudefa.st/blog/guide/mechanics/context-engineering)
- [Weaviate - Context Engineering: LLM Memory and Retrieval for AI Agents](https://weaviate.io/blog/context-engineering)

---

## 1. Context Engineering의 정의와 개념

### 핵심 정의

**Context Engineering(컨텍스트 엔지니어링)** 은 LLM이 주어진 작업을 성공적으로 수행할 수 있도록, 모델에게 제공되는 **모든 맥락(context)을 체계적으로 설계하고 관리하는 기술 분야**이다.

Phil Schmid(Hugging Face AI 총괄)의 공식 정의:

> "Context Engineering is the discipline of designing and building dynamic systems that provides the right information and tools, in the right format, at the right time, to give a LLM everything it needs to accomplish a task."
>
> (컨텍스트 엔지니어링은 LLM이 작업을 완수하는 데 필요한 모든 것을 제공하기 위해, 적절한 정보와 도구를 적절한 형식으로 적절한 시점에 제공하는 동적 시스템을 설계하고 구축하는 학문이다.)

Andrej Karpathy의 표현:

> "Context engineering is the delicate art and science of filling the context window with just the right information for the next step."
>
> (컨텍스트 엔지니어링은 다음 단계를 위해 컨텍스트 윈도우를 딱 맞는 정보로 채우는 섬세한 예술이자 과학이다.)

### 핵심 비유: LLM은 새로운 운영체제

Andrej Karpathy는 다음과 같은 비유를 제시했다:

- **LLM = CPU** (처리 엔진)
- **Context Window = RAM** (작업 메모리)

마치 운영체제가 CPU에 적절한 데이터를 RAM에 올려서 처리하듯, 컨텍스트 엔지니어링은 LLM의 컨텍스트 윈도우에 적절한 정보를 배치하여 최적의 결과를 이끌어내는 것이다.

### 왜 "Context"인가?

Anthropic 공식 블로그에서 강조한 핵심 통찰:

> "Intelligence is not the bottleneck, context is."
>
> (지능이 병목이 아니라, 맥락이 병목이다.)

모델은 이미 충분히 똑똑하다. 문제는 모델에게 올바른 정보를 제공하느냐에 달려 있다. 모든 조직에는 고유한 워크플로우, 표준, 지식 체계가 있으며, LLM은 이를 본질적으로 알지 못한다. 컨텍스트 엔지니어링은 이 간극을 메우는 기술이다.

---

## 2. 용어의 기원과 주요 제안자

### 용어 발생 타임라인

| 시기 | 인물/조직 | 기여 |
|------|----------|------|
| 2025년 4월 | **Dex Horthy** (HumanLayer CEO) | "Context Engineering"이라는 용어를 처음 사용. 동적 시스템으로서의 컨텍스트 관리 개념 제시 |
| 2025년 6월 19일 | **Tobi Lutke** (Shopify CEO) | Twitter/X에서 "context engineering"이 "prompt engineering"보다 핵심 기술을 더 잘 설명한다고 발언, 용어를 대중화 |
| 2025년 6월 | **Andrej Karpathy** | Twitter/X에서 Tobi Lutke에 "+1" 하며, 산업용 LLM 애플리케이션에서의 컨텍스트 엔지니어링의 중요성 강조 |
| 2025년 6월 27일 | **Simon Willison** | 블로그 포스트를 통해 용어의 부상을 분석하고, "prompt engineering"을 대체할 용어로서의 가능성 논의 |
| 2025년 6월 30일 | **Phil Schmid** (Hugging Face) | 체계적인 프레임워크와 공식 정의 발표. 산업 전반의 사고방식 전환에 기여 |
| 2025년 7월 2일 | **LangChain** | "Context Engineering for Agents" 블로그 시리즈 발표. Write/Select/Compress/Isolate 전략 체계화 |
| 2025년 7월 18일 | **Manus AI** | 실전 AI 에이전트 구축 경험을 바탕으로 컨텍스트 엔지니어링 전략 공유 |
| 2025년 9월 29일 | **Anthropic** | 공식 엔지니어링 블로그에서 "Effective Context Engineering for AI Agents" 발표 |

### 주요 인물 상세

**Tobi Lutke (Shopify CEO)**: 2025년 6월 19일 트윗에서 처음으로 이 용어를 대중화시켰다.

> "I really like the term 'context engineering' over prompt engineering. It describes the core skill better: the art of providing all the context for the task to be plausibly solvable by the LLM."

**Andrej Karpathy (전 Tesla AI 디렉터, OpenAI 공동창업자)**: Lutke의 트윗에 동의하며 확장했다.

> "+1 for 'context engineering' over 'prompt engineering'. People associate prompts with short task descriptions you'd give an LLM in your day-to-day use. When in every industrial-strength LLM app, context engineering is the delicate art and science of filling the context window with just the right information for the next step."

그는 컨텍스트 엔지니어링에 포함되는 요소로 다음을 나열했다:
- Task descriptions and explanations (작업 설명)
- Few-shot examples (퓨샷 예시)
- RAG (검색 증강 생성)
- Related (possibly multimodal) data (관련 데이터)
- Tools (도구)
- State and history (상태 및 이력)
- Compacting (압축)

그리고 핵심 경고를 덧붙였다:

> "Too much or too irrelevant context can cause LLM costs to go up and performance might come down."
> (너무 많거나 관련 없는 컨텍스트는 LLM 비용을 높이고 성능을 떨어뜨릴 수 있다.)

---

## 3. Prompt Engineering과의 차이점

### 비교표

| 항목 | Prompt Engineering | Context Engineering |
|------|-------------------|-------------------|
| **초점** | 모델에게 **어떻게** 질문하는가 (How) | 모델이 **무엇을** 알고 있는가 (What) |
| **범위** | 단일 입력-출력 쌍 | 메모리, 이력, 도구, 시스템 프롬프트 등 모든 것 |
| **설계 대상** | 텍스트 지시문 | 모델의 전체 운영 환경 |
| **성격** | 정적 (Static) | 동적 (Dynamic) |
| **확장성** | 확장 시 edge case 급증 | 처음부터 확장을 고려한 설계 |
| **적용 분야** | 일회성 생성, 데모 | 프로덕션 AI 에이전트, 복합 시스템 |
| **결과** | 수동 조정 필요, 일관성 부족 가능 | 일관성과 재사용성을 위한 설계 |
| **관계** | Context Engineering의 **부분 집합** | Prompt Engineering을 **포함**하는 상위 개념 |

### 핵심 차이 요약

**Prompt Engineering**은 "프롬프트를 잘 쓰는 기술"에 집중한다. 좋은 질문을 하는 법, Chain-of-Thought, Few-shot 같은 기법들이 여기에 해당한다.

**Context Engineering**은 프롬프트를 포함하되, 그 너머의 **전체 시스템 아키텍처**를 설계한다:
- 어떤 데이터를 검색해서 주입할 것인가 (RAG)
- 어떤 도구를 사용 가능하게 할 것인가 (Tools/MCP)
- 대화 이력을 어떻게 관리할 것인가 (Memory)
- 현재 작업 상태를 어떻게 반영할 것인가 (State)
- 컨텍스트 윈도우 한계를 어떻게 극복할 것인가 (Compression)

> LangChain 블로그: "When you use context engineering, you're also using prompt engineering. These approaches complement each other rather than compete."

---

## 4. Context Engineering의 핵심 구성요소

### 4.1 다섯 가지 핵심 구성요소

Anthropic과 주요 문헌들이 제시하는 Context Engineering의 핵심 구성요소:

```
Context = Instructions + Knowledge + Tools + Memory + State
           (지시)       (지식)     (도구)   (기억)   (상태)
```

#### (1) Instructions (지시/시스템 프롬프트)
- 시스템 프롬프트, 규칙, 행동 가이드라인
- CLAUDE.md, AGENTS.md 같은 구성 파일
- 작업별 지시문과 페르소나 설정

#### (2) Knowledge (지식/RAG)
- Retrieval-Augmented Generation을 통한 외부 지식 주입
- 문서, 코드베이스, 데이터베이스에서 관련 정보 검색
- 실시간 데이터 접근

#### (3) Tools (도구)
- 외부 API와 함수 호출 능력
- MCP(Model Context Protocol)를 통한 표준화된 도구 연결
- 도구 설명(description)의 정교한 설계

#### (4) Memory (기억)
- **단기 기억 (Short-term)**: 현재 대화 이력, 작업 중간 상태
- **장기 기억 (Long-term)**: 사용자 선호도, 이전 세션 정보, 학습된 패턴
- 에이전틱 메모리: 에이전트가 스스로 메모를 작성하고 나중에 참조

#### (5) State (상태)
- 사용자의 현재 상태
- 작업의 진행 상황
- 외부 세계의 현재 상태

### 4.2 Claude Code 생태계에서의 구현

#### CLAUDE.md
- Claude Code의 **영구적 지시 파일**
- 프로젝트별, 사용자별, 팀별 설정 가능
- 세션을 걸쳐 일관된 행동을 보장하는 핵심 컨텍스트
- 코딩 표준, 아키텍처 원칙, 워크플로우 규칙 등을 포함
- 계층 구조: `~/.claude/CLAUDE.md` (글로벌) > 프로젝트 루트 `CLAUDE.md` > 하위 디렉토리 `CLAUDE.md`

#### Skills (스킬)
- 지시문, 스크립트, 리소스로 구성된 **"전문 지식 팩"**
- **Progressive Disclosure (점진적 공개)** 패턴 적용:
  - 세션 시작 시 메타데이터만 로드 (스킬당 수십 토큰)
  - 관련 스킬 감지 시 전체 지시문 로드
  - 수많은 스킬을 모델에 과부하 없이 관리 가능
- SKILL.md 파일이 마크다운으로 지시문을 확장하여 대화 컨텍스트에 주입

#### Memory (메모리)
- **자동 메모리**: Claude가 수정 및 선호도를 기반으로 자동 작성
- **수동 메모리**: 사용자가 명시적으로 기억시키는 정보
- 메모리 도구가 컨텍스트 편집과 결합하여 긴 대화 관리
- Just-In-Time 컨텍스트 검색: 모든 정보를 사전 로드하지 않고, 필요할 때 동적 로드

#### MCP (Model Context Protocol)
- Anthropic이 2024년 11월 도입한 **개방형 표준 프로토콜**
- LLM과 외부 데이터 소스/도구를 연결하는 **범용 커넥터**
- 2025년 12월: Linux Foundation 산하 **Agentic AI Foundation(AAIF)** 에 기증
  - 공동 설립: Anthropic, Block, OpenAI
  - 지원: Google, Microsoft, AWS, Cloudflare, Bloomberg
- 2026년 3월 기준: **월간 9,700만 SDK 다운로드**, 10,000+ 활성 서버
- Skills가 "어떻게 사용하는지" 가르친다면, MCP는 "무엇에 접근 가능한지" 제공

---

## 5. 핵심 전략 프레임워크

### 5.1 Write-Select-Compress-Isolate (WSCI) 전략

LangChain이 체계화하고 Anthropic이 확장한 4가지 핵심 전략:

#### Write (쓰기)
컨텍스트 윈도우 **외부**에 정보를 저장하되, 에이전트가 접근 가능하게 유지

- 도구 실행 결과를 메시지 이력 대신 외부 시스템에 저장
- 요약이나 참조만 컨텍스트에 유지
- **Scratchpad 패턴**: 에이전트가 정기적으로 메모를 작성하여 외부에 저장
- Manus AI 사례: 일반적인 작업에서 50회 이상의 도구 호출 발생. 이 결과를 모두 컨텍스트에 누적하면 윈도우가 폭발

#### Select (선택)
컨텍스트에 포함할 정보를 **의도적으로 선별**

- RAG를 통한 의미적 유사도 기반 선택
- 도구 설명에 RAG를 적용하여 관련 도구만 선택 (도구 선택 정확도 3배 향상)
- Few-shot 예시의 동적 선택
- 에이전트의 명시적 추론을 통한 관련 정보 판단

#### Compress (압축)
정보의 **크기를 줄이되 핵심은 보존**

- 대화 이력 요약 (Summarization)
- 도구 결과 필터링 및 압축
- Contextual Compression: 현재 대화 맥락에 맞게 검색된 내용 필터링
- Tool Result Clearing: Anthropic이 Claude Developer Platform에 출시한 기능

#### Isolate (격리)
**다중 에이전트** 아키텍처를 통한 컨텍스트 분리

- 단일 에이전트의 거대한 컨텍스트 대신, 역할별 에이전트에 컨텍스트 분산
- 각 에이전트가 자신의 역할에 집중
- 컨텍스트의 무한 팽창 방지
- 하위 작업으로의 자연스러운 분해

### 5.2 Anthropic의 추가 전략

Anthropic 공식 블로그(2025.09.29)에서 제시한 고급 전략들:

- **컨텍스트는 유한한 자원**: 토큰 하나하나가 비용이고, 최적화 대상
- **Just-In-Time 컨텍스트**: 사전 로드 대신, 경량 식별자를 유지하고 런타임에 동적 로드
- **에이전틱 메모리 (Agentic Memory)**: 에이전트가 주기적으로 메모를 작성하여 컨텍스트 윈도우 밖에 저장, 나중에 다시 꺼내오는 패턴
- **Context Rot 방지**: 컨텍스트 윈도우가 부실하게 관리된 정보로 커질수록 모델 성능 저하 (Context Rot) 발생
- **Mode Collapse 방지**: 일관되지 않는 컨텍스트로 인한 모델 행동 붕괴 방지

---

## 6. 실제 적용 사례와 방법론

### 6.1 Manus AI의 실전 교훈

Manus AI의 Peak Ji(공동창업자)가 공유한 6가지 핵심 교훈:

1. **컨텍스트 엔지니어링에 베팅**: 모델 미세조정 대신 컨텍스트 엔지니어링을 선택. 몇 주 걸리는 개선을 몇 시간 만에 배포 가능
2. **에이전트 프레임워크 4회 재구축**: 더 나은 컨텍스트 구성 방법을 발견할 때마다 전면 재구축
3. **캐싱 전략**: 시스템 지시, 이전 도구 결과 등을 캐싱하여 비용과 지연 시간 감소
4. **일관된 도구 접두사**: `browser_`, `shell_` 등의 접두사로 그룹 기반 마스킹 구현
5. **50회 이상의 도구 호출**: 일반적인 Manus 작업에서 50번 이상 도구 호출 발생, 컨텍스트 관리 없이는 윈도우 포화
6. **모델 직교성**: 컨텍스트 엔지니어링으로 특정 모델에 종속되지 않는 제품 구현

### 6.2 산업별 적용 사례

**고객 서비스 (Telecom)**
- 대형 통신사가 고객 서비스 챗봇에 컨텍스트 엔지니어링 적용
- CRM 및 지원 시스템과의 통합
- 컨텍스트가 풍부해진 챗봇의 해결률 대폭 향상

**리테일/이커머스**
- 브라우징 이력, 재고 상태, 계절성 데이터를 통합한 추천 시스템
- 일반 프롬프트 기반 시스템 대비 전환율 측정 가능한 수준으로 향상
- 개인화된 오퍼 성공률 10배 개선, 장바구니 이탈률 감소

**소프트웨어 개발**
- 프로젝트 이력, 코딩 표준, 문서 컨텍스트 통합
- 신규 엔지니어 온보딩 55% 단축
- 코드 출력 품질 70% 향상

**의료**
- 환자 이력, 증상 데이터베이스, 치료 가이드라인 통합
- 복잡 사례 진단 정확도 56% 향상

**법률**
- 계약 작성 및 리스크 식별에 컨텍스트 인식 AI 도구 활용
- 관련 판례와 법적 프레임워크를 동적으로 가져와 컴플라이언스 리스크 감소

### 6.3 Shopify의 실전 적용

Shopify는 Tobi Lutke의 리더십 하에 컨텍스트 엔지니어링을 조직 전반에 체계적으로 적용:

- AI 에이전트가 GitHub PR, 문서, 댓글, GitHub 이슈, Slack 채널 정보를 자동 수집
- 수집된 컨텍스트를 기반으로 프로젝트 업데이트를 자동 작성
- 프로젝트 챔피언이 리뷰하고 정제하는 워크플로우

---

## 7. Anthropic 공식 입장 및 자료

### 공식 블로그 포스트 (2025.09.29)

**"Effective Context Engineering for AI Agents"** - Anthropic의 공식 엔지니어링 블로그에서 발표된 핵심 문서.

주요 내용:
- **컨텍스트는 AI 에이전트를 위한 결정적이면서도 유한한 자원**
- 수년간의 프롬프트 엔지니어링 이후, 산업이 더 체계적인 접근으로 진화
- 에이전트를 효과적으로 구동하는 컨텍스트를 큐레이션하고 관리하는 전략 제시

### Anthropic의 핵심 메시지

1. **"Claude는 이미 충분히 똑똑하다"**: 지능이 아니라 컨텍스트가 병목
2. **Skills, Agent SDK, MCP, 평가 시스템**을 통한 포괄적 컨텍스트 엔지니어링 체계
3. **Tool Result Clearing**: 가장 안전하고 가벼운 컨텍스트 압축 기법으로 Developer Platform에 출시
4. **Just-In-Time 컨텍스트 전략**: 에이전트가 경량 식별자를 유지하고, 런타임에 도구를 사용해 데이터를 동적으로 로드

### MCP (Model Context Protocol) - Anthropic의 핵심 기여

- 2024년 11월 오픈소스로 공개
- AI 시스템과 외부 데이터/도구를 연결하는 **범용 개방형 표준**
- "USB-C for AI"로 비유됨 - 하나의 프로토콜로 모든 도구/데이터 소스 연결
- 2025년 12월: Linux Foundation 산하 Agentic AI Foundation에 기증
- 2026년 3월: 월간 9,700만 SDK 다운로드 도달, AI 인프라 표준 중 역사상 가장 빠른 채택률

### Claude Code의 컨텍스트 엔지니어링 도구들

| 도구 | 역할 | 컨텍스트 관점 |
|------|------|-------------|
| CLAUDE.md | 영구적 지시문 | 세션 간 일관된 행동 보장 |
| Skills | 동적 지식 팩 | Progressive Disclosure로 효율적 로딩 |
| Memory | 장기/자동 기억 | 세션 간 학습과 선호도 유지 |
| MCP Servers | 외부 도구 연결 | 실시간 데이터/API 접근 |
| Agent SDK | 에이전트 구축 | 다중 에이전트 컨텍스트 격리 |

---

## 8. 업계 인물들의 주요 발언

### Tobi Lutke (Shopify CEO)

트윗 (2025.06.19):
> "I really like the term 'context engineering' over prompt engineering. It describes the core skill better: the art of providing all the context for the task to be plausibly solvable by the LLM."

인터뷰에서:
> "The fundamental skill of using AI well is being able to state a problem with enough context, in such a way that without any additional pieces of information, the task is plausibly solvable."

Shopify 내부 메모:
> "Learning to prompt and load context is important, and getting peers to provide feedback on how this is going will be valuable."

### Andrej Karpathy (전 Tesla AI Director, OpenAI 공동창업자)

트윗 (2025.06):
> "+1 for 'context engineering' over 'prompt engineering'. People associate prompts with short task descriptions you'd give an LLM in your day-to-day use. When in every industrial-strength LLM app, context engineering is the delicate art and science of filling the context window with just the right information for the next step."

> "Doing this right involves: task descriptions and explanations, few shot examples, RAG, related (possibly multimodal) data, tools, state and history, compacting. Too much or too irrelevant context can cause LLM costs to go up and performance might come down."

### Simon Willison (소프트웨어 개발자, 작가)

블로그 (2025.06.27):
> "I think 'context engineering' is going to stick."

"prompt engineering"이라는 용어가 사람들에게 "짧은 작업 설명"이라는 인상을 주는 반면, 프로덕션 애플리케이션에서는 훨씬 정교한 컨텍스트 관리가 필요하다는 점을 강조했다.

### Phil Schmid (Hugging Face AI 총괄)

블로그 (2025.06.30):
> "Context Engineering is the discipline of designing and building dynamic systems that provides the right information and tools, in the right format, at the right time, to give a LLM everything it needs to accomplish a task."

이 정의의 핵심 특성:
- **체계적 (Systematic)**: 임기응변이 아닌 체계적 접근
- **동적 (Dynamic)**: 정적이 아닌 동적 시스템
- **포괄적 (Comprehensive)**: 텍스트 지시에 국한되지 않는 종합적 접근

### Dex Horthy (HumanLayer CEO)

> "Context engineering is building dynamic systems to provide the right information and tools in the right format such that the LLM can plausibly accomplish the task."

2025년 4월에 이 용어를 처음 사용한 것으로 알려져 있으며, 컨텍스트 관리에 "엔지니어링" 접근을 강조했다.

### Gartner

공식 보고서:
> "Context engineering is designing and structuring the relevant data, workflows and environment so AI systems can understand intent, make better decisions and deliver contextual, enterprise-aligned outcomes — without relying on manual prompts."

예측:
- 2026년 말까지 기업 애플리케이션의 **40%가 작업 특화 AI 에이전트** 탑재 (2025년 5% 미만에서)
- 모든 AI 에이전트에 **견고한 컨텍스트 엔지니어링**이 필수

---

## 9. 2026년 현재 상황과 전망

### 현재 트렌드 (2026년 3월 기준)

1. **MCP의 사실상 표준화**: Anthropic, OpenAI, Google, Microsoft 모두 채택. Linux Foundation 산하 거버넌스
2. **Context Rot 대응**: 컨텍스트 윈도우가 부실한 정보로 커질수록 성능 저하되는 문제가 2026년 핵심 과제
3. **LlamaIndex + LangGraph 조합**: 데이터 구조화와 에이전트 오케스트레이션의 표준 패턴
4. **에이전틱 메모리의 성숙**: 에이전트가 스스로 기억을 관리하는 패턴이 보편화
5. **산업 전반 채택 가속**: Gartner 예측대로 기업 AI 애플리케이션에서 컨텍스트 엔지니어링 채택 급증

### 핵심 도전 과제

- **Context Rot**: 관리되지 않는 정보 누적으로 인한 성능 저하
- **Mode Collapse**: 일관되지 않는 컨텍스트로 인한 모델 행동 붕괴
- **비용 최적화**: 토큰 사용량과 성능의 균형
- **보안 및 프라이버시**: 민감한 컨텍스트의 안전한 관리

---

## 10. 핵심 요약

Context Engineering은 단순한 "프롬프트를 잘 쓰는 기술"을 넘어, **LLM이 작업을 수행하는 데 필요한 모든 정보를 체계적으로 설계하고 관리하는 엔지니어링 분야**이다.

```
Prompt Engineering: "어떻게 질문할 것인가"
Context Engineering: "무엇을 알게 할 것인가" (+ 어떻게, 언제, 어떤 형식으로)
```

핵심 공식:
```
Context = Instructions + Knowledge + Tools + Memory + State
전략    = Write + Select + Compress + Isolate
```

이 분야는 2025년 중반 Tobi Lutke와 Andrej Karpathy의 발언으로 대중화되었고, Anthropic, LangChain, Hugging Face 등의 체계적인 문서화를 통해 하나의 독립적인 기술 분야로 자리잡았다. 2026년 현재, MCP의 범용 표준화와 함께 모든 프로덕션 AI 시스템의 핵심 설계 원칙이 되었다.
