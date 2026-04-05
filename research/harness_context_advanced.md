# 하네스 & 컨텍스트 엔지니어링 — 심화 보강 자료

> 본 문서는 `harness_engineering.md`, `context_engineering.md`, `compound_engineering.md`에 이미 정리된 내용과 **중복을 피하고**, 2025~2026년 기준 최신·핫한 토픽 중 기존 문서가 다루지 않은 포인트만 수록한다. 각 항목은 "개념 한 줄 → 원문 인용/핵심 → 발표 포인트 → 출처" 구조를 따른다.

---

## 1. 컨텍스트의 4가지 실패 모드 (Drew Breunig, 2025.06)

**개념 한 줄.** 컨텍스트 윈도우가 클수록 안전한 것이 아니라, 오히려 **새로운 실패 모드**가 생긴다 — "더 큰 컨텍스트는 새로운 실패 모드를 만든다(bigger contexts create new failure modes)."

### 1.1 Context Poisoning (컨텍스트 중독)
- **정의**: 환각이나 오류가 컨텍스트에 한 번 들어오면, 이후 모델이 그 잘못된 정보를 반복 참조하며 오류가 누적됨.
- **사례**: Gemini의 포켓몬 플레이 에이전트가 게임 상태를 환각하자, 그 환각이 "goals" 섹션에 들어가 **불가능한 목표를 계속 추구**하는 루프에 빠졌다.
- **Breunig 인용**: "the model can become fixated on achieving impossible or irrelevant goals."

### 1.2 Context Distraction (컨텍스트 산만)
- **정의**: 컨텍스트가 쌓일수록 모델이 **학습된 지식**보다 **현재 히스토리**에 과도하게 의존하며, 새로운 전략 대신 **과거 행동을 반복**한다.
- **사례**: Gemini 2.5 Pro가 컨텍스트 100k 토큰을 넘어서자 새로운 계획을 만들지 않고 과거 액션을 그대로 반복.
- **인용**: "favoring repeating actions from its vast history rather than synthesizing novel plans."

### 1.3 Context Confusion (컨텍스트 혼동)
- **정의**: 불필요한 정보가 컨텍스트에 섞여 있으면 모델은 **그것까지 고려해버린다**. 특히 툴이 많아질 때 치명적.
- **사례**: GeoEngine 벤치마크에서 8B 모델은 **툴 46개 주면 실패, 19개로 줄이면 성공**. 컨텍스트 용량은 남았는데도 그렇다.
- **인용**: "the model *will* take it into account" — 관련 없는 정보라도.

### 1.4 Context Clash (컨텍스트 충돌)
- **정의**: 새로 들어온 정보가 기존 컨텍스트와 **모순**될 때, 모델의 추론이 무너진다.
- **사례**: 멀티턴 대화에서 초기에 모델이 틀린 답을 하면 그게 컨텍스트에 남아 이후 답을 오염시킨다. 한 벤치마크에서 평균 **39% 성능 저하**.
- **인용**: "when LLMs take a wrong turn in a conversation, they get lost and do not recover."

### 발표 포인트
- 청중에게 "컨텍스트는 길수록 좋다"는 상식을 먼저 흔들 수 있는 임팩트 있는 섹션. 4개 모드를 한 슬라이드에 2×2로 배치하면 직관적.
- "쓰레기 서랍(junk drawer)" 은유가 강력하다 — Breunig 본인의 표현.

### 출처
- https://www.dbreunig.com/2025/06/22/how-contexts-fail-and-how-to-fix-them.html

---

## 2. 실패 모드별 처방전 (Drew Breunig, 2025.06)

**개념 한 줄.** 위 4가지 실패 모드를 막는 6가지 구체 기법.

| 기법 | 정의 (한 줄) | 대응 실패 모드 |
|---|---|---|
| **RAG** | 관련 정보만 선택적으로 주입 | Confusion |
| **Tool Loadout** | 태스크에 필요한 툴 정의만 노출 | Confusion |
| **Context Quarantine** | 태스크를 별도 스레드/서브에이전트로 격리 | Distraction |
| **Context Pruning** | 불필요한 정보를 적극 제거 | Distraction, Confusion |
| **Context Summarization** | 누적된 컨텍스트를 요약본으로 압축 | Distraction |
| **Context Offloading** | 컨텍스트 밖 저장소(파일/메모)에 덜어두기 | Distraction |

- **Breunig 인용**: "if you treat your context like a junk drawer, the junk will influence your response."
- **Tool Loadout 임계점**: "selecting the right tools becomes critical when you have more than 30 tools."

### 발표 포인트
- "컨텍스트를 많이 넣는 것"이 아니라 "뭘 **뺄지**"가 핵심이라는 프레임 전환.
- Claude Code의 `/compact`, 서브에이전트, 스킬의 Progressive Disclosure, CLAUDE.md 프루닝 등이 전부 이 6가지의 한국어 번역이라고 설명 가능.

### 출처
- https://www.dbreunig.com/2025/06/26/how-to-fix-your-context.html

---

## 3. Anthropic — Effective Context Engineering for AI Agents (2025.09.29)

**개념 한 줄.** 컨텍스트는 **유한한 자원**이며, 쌓을수록 **한계 수확 체감**이 온다.

### 핵심 인용
- **"Context, therefore, must be treated as a finite resource with diminishing marginal returns."**
- **"As models become more capable, the challenge isn't just crafting the perfect prompt — it's thoughtfully curating what information enters the model's limited attention budget at each step."**
- **핵심 원칙**: "the smallest possible set of high-signal tokens that maximize the likelihood of some desired outcome."

### 3.1 프롬프트 엔지니어링 vs 컨텍스트 엔지니어링
- **프롬프트 엔지니어링**: 단일 지시문을 최적화.
- **컨텍스트 엔지니어링**: **추론 시점에 모델의 컨텍스트 전체(시스템 프롬프트·툴·외부 데이터·대화 히스토리)를 전략적으로 큐레이팅**.
- 멀티턴 에이전트 시대에는 후자가 본질.

### 3.2 "Right Altitude" — 지시문의 고도
시스템 프롬프트는 두 극단 사이의 **골디락스 존**에 있어야 한다.
- **너무 낮음 (hardcoded)**: 모든 케이스를 if/else로 박아넣어 취약해짐.
- **너무 높음 (vague)**: "잘 해줘" 수준의 모호함.
- **올바른 고도**: "specific enough to guide behavior effectively, yet flexible enough to provide the model with strong heuristics."

### 3.3 Long-Horizon 태스크용 3가지 기법
1. **Compaction (압축)** — 컨텍스트 윈도우를 요약 후 리셋. 아키텍처 결정 같은 **핵심은 보존**, 중복 출력은 폐기.
2. **Structured Note-Taking (구조화된 메모)** — 에이전트가 `NOTES.md` 같은 외부 파일에 진행 상황을 기록. 컨텍스트 밖 영구 메모리.
3. **Sub-Agent Architectures** — 전문 서브에이전트가 각자의 컨텍스트에서 작업 후, **1,000~2,000 토큰짜리 요약**만 조정자에게 반환.

### 발표 포인트
- 이 글은 본 섹션의 **핵심 교과서**. "attention budget"이라는 표현이 비개발자에게도 직관적.
- Compaction/Notes/Sub-agents 3가지는 Claude Code의 `/compact`, CLAUDE.md, Task 서브에이전트에 정확히 매핑된다 — 이론과 도구가 1:1로 맞아떨어지는 것을 보여주면 설득력 ↑.

### 출처
- https://www.anthropic.com/engineering/effective-context-engineering-for-ai-agents

---

## 4. Agent Loop — 일반 패턴

**개념 한 줄.** 거의 모든 코딩 에이전트는 **Gather Context → Take Action → Verify Work → Repeat** 네 단계를 돈다.

### 각 단계와 신뢰성의 관계
1. **Gather Context** — 파일을 읽고, 검색하고, 질문한다. 여기서 노이즈가 들어오면 1·2·3번 실패 모드가 전부 발동.
2. **Take Action** — 코드 작성, 명령 실행, 툴 호출. 가능한 한 **되돌릴 수 있는(reversible)** 액션으로 설계해야 실패 비용이 낮다.
3. **Verify Work** — 테스트 실행, 린트, 타입체크, 스스로 리뷰. **자동화된 피드백이 없으면 루프는 환각을 강화한다**.
4. **Repeat** — 이전 루프의 결과를 다음 루프의 컨텍스트로 주입. 이 지점에서 Compaction/Pruning이 반드시 필요.

### 발표 포인트
- "하네스 엔지니어링 = 이 4단계의 각 지점을 **신뢰성 있게** 만드는 작업"이라고 정의하면 섹션 전체 구조가 잡힌다.
- Verify 단계가 빠지면 Ralph 루프든 Compound든 전부 무너진다 — **검증이 곧 하네스의 심장**.

---

## 5. Context Rot — 실측 데이터 (Chroma Research, 2025.07)

**개념 한 줄.** 긴 컨텍스트는 "동작하느냐"의 문제가 아니라 "**얼마나 조용히 썩느냐**"의 문제다.

### 핵심 결과
- **테스트 범위**: 18개 최신 모델 (Claude Opus 4 / Sonnet 4 / 3.7 / 3.5 / Haiku 3.5, GPT-4.1 / 4o / 4 Turbo, Gemini 2.5 Pro/Flash, Qwen3 등).
- **핵심 발견**: "LLMs do not maintain consistent performance across input lengths. Even on tasks as simple as non-lexical retrieval or text replication, we see increasing non-uniformity in performance as input length grows."
- **200k 컨텍스트 모델이 50k에서 이미 유의미하게 열화**된다. 윈도우가 꽉 차야 무너지는 게 아니다.
- **LongMemEval**: ~300토큰 focused 프롬프트 vs ~113k 풀 프롬프트 — **모든 모델 패밀리에서** focused가 유의미하게 우세.
- **Distractors**: 방해 문장 **단 1개**로도 성능 저하, 4개면 급감.

### 가장 반직관적인 발견
- **셔플된 haystack이 논리적으로 구조화된 haystack보다 성능이 좋다.**
- 인용: "Whether relevant information is present in a model's context is not all that matters; what matters more is *how that information is presented*."
- 즉, "잘 쓴 긴 문서"가 오히려 함정이 될 수 있음.

### 발표 포인트
- Breunig가 이론이라면, Chroma는 **측정치**. 두 개를 연달아 보여주면 "컨텍스트 쓰레기 서랍" 주장이 정량적으로 뒷받침된다.
- "200k 쓸 수 있다고 200k 넣지 마세요. 50k부터 이미 썩고 있어요." — 청중에 꽂힐 한 줄.

### 출처
- https://research.trychroma.com/context-rot
- https://github.com/chroma-core/context-rot

---

## 6. Ralph Loop의 철학 (Geoffrey Huntley)

> 기존 `harness_engineering.md`·`compound_engineering.md`에는 Ralphton·Ouroboros 중심으로 정리되어 있으므로, **여기서는 Huntley 본인이 말한 "왜 단순한 while 루프가 이기는가"의 철학과 인용**만 보강한다.

**개념 한 줄.** `while :; do cat PROMPT.md | claude-code; done` — 이 한 줄이 고급 멀티 에이전트 프레임워크보다 자주 이긴다.

### Huntley 본인의 논리
- **복잡성 거부**: "Consider microservices and all the complexities that come with them. Now, consider what microservices would look like if the microservices (agents) themselves are non-deterministic — a red hot mess." → 멀티 에이전트는 **비결정적 마이크로서비스**라는 독설.
- **Ralph의 본질**: "monolithic. Ralph works autonomously in a single repository as a single process."
- **루프당 하나의 일만**: PROMPT.md는 반드시 "Only one thing" 을 요청해야 한다. 루프가 돌면서 매번 "가장 중요한 것 하나"를 선택하게 한다.

### Ralph Wiggum 은유 (발표용 서사)
- Huntley는 에이전트를 심슨의 Ralph Wiggum(살짝 모자란 아이)에 비유한다.
- **튜닝 철학**: "Each time Ralph does something bad, Ralph gets tuned — like a guitar." 에이전트가 실수하면 도구를 탓하지 말고 **프롬프트를 고쳐라.**
- **놀이터 비유**: Ralph가 미끄럼틀에서 뛰어내려 다치면, "SLIDE DOWN, DON'T JUMP"라는 표지판을 놀이터에 세운다. (= 규칙을 CLAUDE.md에 추가.)
- **세 가지 상태**: "Ralph has three states. Under baked, baked, or baked with unspecified latent behaviours (which are sometimes quite nice!)"

### 중요 경고 (발표에 꼭 인용)
- **컨텍스트 규율**: "The more you use the context window, the worse the outcomes you'll get." → 5번 Chroma 데이터와 정확히 일치.
- **엔지니어 무용론 비판**: "Anyone claiming that engineers are no longer required and a tool can do 100% of the work without an engineer is peddling horseshit."
- **적용 범위의 한계**: "There's no way in heck would I use Ralph in an existing code base." → **Greenfield 한정**. 레거시에는 다른 전략이 필요.
- **플레이스홀더 금지 문구**: "DO NOT IMPLEMENT PLACEHOLDER OR SIMPLE IMPLEMENTATIONS. WE WANT FULL IMPLEMENTATIONS." — 프롬프트 작성 실전 팁.

### 결과 인용
- 1명이 **$50k 계약물 MVP를 $297 비용**으로 납품.
- Y Combinator 해커톤 하룻밤에 **6개 레포 출하**.
- 학습 데이터에 **없는 새 프로그래밍 언어(CURSED)** 를 Ralph로 구현.

### 발표 포인트
- Ralph는 "도구가 아니라 **철학**"이라는 것을 Huntley 본인의 인용으로 증명 가능.
- Greenfield 한정이라는 솔직한 경고가 특히 가치 있음 — 발표의 "이렇게 하면 망한다" 섹션과 연결된다.

### 출처
- https://ghuntley.com/ralph/

---

## 7. Plan Mode & Planner–Critic–Builder 루프

**개념 한 줄.** "**쓰고, 비평하고, 실행한다**" — 계획과 실행을 분리하고 그 사이에 **비평 단계**를 끼워 넣으면 실패율이 급감한다.

### 7.1 Claude Code Plan Mode (2025 공식)
- `Shift+Tab Shift+Tab`으로 진입하는 **읽기 전용 모드**. 파일 읽기·검색·질문만 가능, 편집·쉘·쓰기 전부 차단.
- 사용자는 계획을 **편집/거부/승인** 가능. 승인 후에만 실행 권한이 열린다.
- Armin Ronacher(pocoo) 등 다수 프로덕션 사용자가 "planning and execution을 분리하는 것이 **내가 하는 가장 중요한 행위**"라고 평가.

### 7.2 Plan-Critique 패턴 (역방향)
- 커뮤니티 플러그인 `claude-code-plan-critique`는 정반대로 뒤집는다: **사용자가 계획을 쓰고, Claude가 N회 비평하고, 사용자가 피드백을 수용할지 결정**.
- 핵심 아이디어: "계획 작성자"와 "계획 비평자"를 **같은 맥락에 두지 않는다**. 서로 다른 롤/세션이 비평해야 blind spot이 드러난다.

### 7.3 Compound Engineering의 Planner → Critic → Builder
(기존 `compound_engineering.md`의 Every/Kieran 사례와 맞물리는 부분)
- **Planner**: 사양을 읽고 계획을 씀.
- **Critic** (전문 리뷰 에이전트): Simplification agent, Security agent, Style agent 등이 계획을 **동시 병렬로 비평**.
- **Builder**: 비평이 반영된 계획만 실행.
- Kieran Klaassen의 프로덕션 사례: Rails 리뷰어 에이전트에 "백그라운드 잡이 외부 API를 부를 때 rate limit / retry / partial state를 다 체크하는가?" 같은 **체크리스트가 누적**된다.

### 발표 포인트
- "Plan 먼저" 규칙을 60분 발표에서 **한 번은 강조**해야 한다. 청중의 95%가 안 쓰고 있을 것.
- 비평 단계는 **Context Quarantine**(Breunig)의 실천이기도 하다 — 서로 다른 컨텍스트에서 본다는 점에서.

### 출처
- https://code.claude.com/docs/en/common-workflows
- https://lucumr.pocoo.org/2025/12/17/what-is-plan-mode/
- https://github.com/serbanghita/claude-code-plan-critique

---

## 8. 암묵지(Tacit Knowledge) 명시화 기법

**개념 한 줄.** **"내가 머릿속으로 판단하던 것"을 AI가 읽을 수 있는 파일로 뽑아내는 것**이 하네스 엔지니어의 가장 어려운, 그리고 가장 가치 있는 일이다.

### 8.1 Taste Files / Preference Docs
- CLAUDE.md에 **결정의 이유(why)** 까지 쓴다. 결정 결과(what)만 쓰면 금방 낡는다.
- Klaassen의 실제 패턴: *"When doing X type of work, remember to check Y"*, *"I prefer approach A over approach B because of reason C."*

### 8.2 Post-Mortem → Rule 변환
- 기능 출하 직후 질문: *"Where did you diverge from the plan? Why? What would have made the plan better?"*
- 답을 **한 줄 규칙으로 승화**하여 CLAUDE.md에 추가. 다음 세션의 에이전트는 이 규칙을 무조건 읽는다.
- 실제 사례: 백그라운드 잡 버그 한 번 겪고 나서 Rails 리뷰 에이전트에 체크리스트 항목 1줄 추가 → 같은 버그 재발 0.

### 8.3 Self-Improving Harness
- "I don't like this" / "Good catch" 같은 피드백이 들어올 때마다 규칙이 한 줄씩 추가되는 구조.
- Klaassen 인용: **"Every time I indicate 'I don't like this' or 'Good catch,' the system gets smarter."**
- 즉, CLAUDE.md는 정적 문서가 아니라 **피드백으로 자라는 유기체**.

### 8.4 Synthesis with Options (역질문 대체 기법)
- "AI에게 나를 인터뷰하게 시켜라"는 말은 직관적이지만, Klaassen은 다른 방식을 쓴다:
- 에이전트가 **2~3개의 해결책을 트레이드오프와 함께** 병렬로 제시 → 사용자가 30초 안에 선택.
- **사용자의 선택 자체가 선호를 드러낸다** (속도 vs 청결함, 선투자 vs 유지보수 비용).
- 인용: *"Your contribution to the process is taste, judgment, and context about what matters for your product and users."*

### 8.5 Specialized Review Agents as Taste Capture
- 취향을 **글이 아니라 전용 에이전트**로 encode한다.
  - Simplification agent — 과설계 적발
  - Security agent — 취약점
  - Style agent ("Kieran-style") — 개인 선호 ("Kieran prefers simple queries. Consider denormalizing.")
- 취향이 애초에 글로 쓰기 어려울 때는 **사례와 함께 에이전트가 기억**하게 만든다.

### 발표 포인트 (이 섹션이 이 문서의 클라이맥스)
- 핵심 프레임: **"AI 시대의 시니어리티 = 본인의 암묵지를 문서로 뽑아낼 수 있는 능력"**.
- 한 문장 요약: "버그는 한 번 고치는 게 아니라, **CLAUDE.md에 한 줄을 추가하면서 고치는 것**."
- 비개발자에게도 통하는 메시지: "당신이 일을 어떻게 잘하는지 설명하는 글쓰기 능력이, AI 시대의 새로운 코딩이다."

### 출처
- https://every.to/source-code/teach-your-ai-to-think-like-a-senior-engineer-789ba7ca-ca7c-45a1-91fa-4178f59f226f
- https://every.to/source-code/compound-engineering-the-definitive-guide

---

## 9. Right Altitude — 지시문의 고도 (심화)

**개념 한 줄.** 프롬프트/CLAUDE.md의 규칙은 **구체성과 일반성 사이의 골디락스 존**에 놓여야 한다.

### 안티패턴 2종
- **너무 낮음 (over-specified)**: 모든 케이스를 if/else로 박는다. → 새로운 상황에 **brittle**. 예외 케이스에서 바로 깨진다.
- **너무 높음 (under-specified)**: "잘 해줘", "깔끔하게 해줘" → 모델이 **추측**한다. 결과가 세션마다 달라진다.

### 올바른 고도 — Anthropic 가이드라인
- "specific enough to guide behavior effectively, yet flexible enough to provide the model with strong heuristics."
- 즉 **휴리스틱으로 동작하는 규칙**: 예시 1~2개 + 원칙 1줄 + "왜" 1줄.

### 실전 체크
- "이 규칙이 내가 의도하지 않은 상황에서도 말이 되는가?" → 되면 right altitude.
- "이 규칙이 너무 추상적이어서 아무 세션에나 붙여도 아무 행동도 바꾸지 못하는가?" → 그러면 너무 높음.

### 발표 포인트
- 청중이 CLAUDE.md를 직접 써볼 때 가장 많이 하는 실수가 이 양극단이다. **"지시문의 고도"라는 이름표 하나만 줘도** 바로 자가진단이 된다.

### 출처
- https://www.anthropic.com/engineering/effective-context-engineering-for-ai-agents

---

## 종합 — 이 문서를 한 장 슬라이드로 요약한다면

> **"컨텍스트는 유한하다. 많이 넣는 게 아니라 **정확히** 넣어야 한다. 그리고 그 '정확히'의 기준은 당신의 암묵지에서 나온다 — 그래서 지금 가장 중요한 개발 능력은 **글쓰기**다."**

- 이론: Breunig의 4가지 실패 모드 → Anthropic의 컨텍스트 엔지니어링 원칙
- 측정: Chroma의 Context Rot 실험 데이터
- 실천: Ralph Loop (단순성) + Plan-Critique (비평) + CLAUDE.md 진화 (암묵지 명시화)
- 철학: "컨텍스트를 설계하는 사람이 이긴다."
