# 섹션 9 웹 리서치 검증본 (2024-2026)

목적: 섹션 9 재설계를 위해, `실행보다 설계/판단`, `taste(취향/안목)`, `전문성의 외부화`를 뒷받침하는 2024-2026 자료를 검증해 정리했다.

원칙:
- 가능한 한 1차 또는 원출처에 가까운 자료를 우선했다.
- 직접 인용은 짧게만 넣었다. 길고 강한 해석은 내 요약/추론으로 분리했다.
- 날짜가 명시된 경우 절대 날짜를 적었다. 문서형 자료는 `accessed 2026-04-06`으로 표기했다.

## 1. "실행"보다 "설계/판단"이 중요해진다는 근거

### 1) Kent Beck: 레버리지는 문법보다 비전과 설계 관리로 이동
- 날짜: 2025-06-22
- 출처 성격: Simon Willison이 Gergely Orosz 인터뷰에서 Beck 발언을 짧게 인용한 페이지
- 짧은 직접 인용: `"having a vision"` / `"keeping track of a design"`
- 왜 중요한가:
  Kent Beck는 AI가 치환한 것이 타이핑과 문법이지, 비전 수립과 복잡도 통제는 아니라고 본다. 발표에서는 "무엇을 만들지, 어느 수준의 복잡도를 허용할지 정하는 능력"이 더 비싸진다는 근거로 쓰기 좋다.
- 출처:
  - https://simonwillison.net/2025/Jun/22/kent-beck/

### 2) Simon Willison: AI는 시니어 엔지니어링 습관을 보상한다
- 날짜: 2025-10-07
- 짧은 직접 인용: `"AI tools amplify existing expertise."`
- 왜 중요한가:
  이 글의 핵심은 "AI가 대신하는 것은 구현 노동이지만, 인간이 맡아야 하는 것은 더 상위 레벨로 이동한다"는 점이다. Willison은 좋은 결과를 내려면 인간이 아키텍처, 명세, 성공 기준, QA, 코드 리뷰를 직접 책임져야 한다고 적는다.
- 발표용 해석:
  섹션 9에서는 "실행의 자동화는 인간 역할의 소멸이 아니라 상향 이동"이라는 문장으로 압축 가능하다.
- 출처:
  - https://simonwillison.net/2025/Oct/7/vibe-engineering/

### 3) Microsoft Work Trend Index 2025: 조직 설계도 자체가 "AI-operated but human-led"로 이동
- 날짜: 2025-04-23
- 짧은 직접 인용: `"AI-operated but human-led"`
- 왜 중요한가:
  Microsoft는 31개국 31,000명 설문과 Microsoft 365 생산성 신호를 바탕으로, 미래 조직을 인간-에이전트 팀으로 본다. 여기서 인간은 단순 실행자가 아니라 방향 설정자이며, Microsoft는 인간을 `creativity, judgment, connection-building`에 강점이 있는 층으로 규정한다.
- 발표용 해석:
  "앞으로 중요한 사람은 많이 실행한 사람이 아니라, 사람과 에이전트의 비율과 기준을 설계하는 사람"이라는 메시지로 연결된다.
- 출처:
  - https://www.microsoft.com/en-us/worklab/work-trend-index/2025-the-year-the-frontier-firm-is-born
  - https://blogs.microsoft.com/blog/2025/04/23/the-2025-annual-work-trend-index-the-frontier-firm-is-born/

### 4) Microsoft Research + Carnegie Mellon (CHI 2025): 실행은 줄고, 검증/통합/감독이 남는다
- 날짜: 2025-04-26 to 2025-05-01 conference publication
- 짧은 직접 인용: `"higher confidence in GenAI is associated with less critical thinking"`
- 왜 중요한가:
  이 논문은 지식노동자 319명, 936개 실제 사례를 분석했다. 핵심 결론은 AI 사용이 비판적 사고를 없애는지가 아니라, 그 성격을 바꾼다는 점이다. 저자들은 AI 사용 후 인간의 사고가 `information verification, response integration, and task stewardship` 쪽으로 이동한다고 정리한다.
- 발표용 해석:
  "실행을 덜 하게 되면 판단이 덜 중요해지는 게 아니라, 더 위험하고 더 중요해진다"는 연구 근거다.
- 출처:
  - https://www.microsoft.com/en-us/research/publication/the-impact-of-generative-ai-on-critical-thinking-self-reported-reductions-in-cognitive-effort-and-confidence-effects-from-a-survey-of-knowledge-workers-2/bibtex/
  - https://advait.org/files/lee_2025_ai_critical_thinking_survey.pdf
  - https://doi.org/10.1145/3706598.3713778

## 2. "`taste`가 새로운 기술력"이라는 주장에 대한 근거

### 1) Kieran Klaassen: 인간의 기여는 "taste, judgment, and context"
- 날짜: 2026-01-29, updated 2026-03-18
- 짧은 직접 인용: `"taste, judgment, and context"`
- 왜 중요한가:
  Kieran의 글은 AI 시대 인간 기여를 매우 선명하게 정의한다. 병렬 리서치와 계획 수립은 에이전트가 할 수 있지만, "무엇이 우리 제품과 사용자에게 중요한가"를 고르는 일은 인간의 몫이라는 주장이다.
- 발표용 해석:
  "이제 실력은 빠르게 만드는 능력만이 아니라, 무엇을 만들지/빼야 할지 고르는 안목"이라는 메시지에 가장 직접적인 근거다.
- 출처:
  - https://every.to/source-code/teach-your-ai-to-think-like-a-senior-engineer-789ba7ca-ca7c-45a1-91fa-4178f59f226f

### 2) Harvard Chan essay: taste는 선택 능력이다
- 날짜: 2025-10-28
- 짧은 직접 인용: `"taste helps us choose"`
- 왜 중요한가:
  이 에세이는 taste를 단순 미감이 아니라, "무엇이 지금/이 사람들/이 상황에 맞는가"를 고르는 능력으로 정의한다. AI가 옵션을 늘릴수록, 무엇이 fitting한지 판단하는 인간 역량이 더 중요해진다는 논리다.
- 발표용 해석:
  섹션 9에서 taste를 "예쁜 것 고르는 취향"이 아니라 "상황에 맞는 해법을 고르는 분별력"으로 재정의할 때 유용하다.
- 출처:
  - https://hsph.harvard.edu/news/essay-intuition-and-taste-in-the-age-of-ai/

### 3) Kieran Klaassen: taste는 실제로 시스템이 학습하는 자산이 될 수 있다
- 날짜: 2026-01-27, updated 2026-02-12
- 짧은 직접 인용: `"picked up my tastes"`
- 왜 중요한가:
  같은 저자의 compounding engineering 사례에서는 Claude Code가 3개월간의 코드 리뷰 피드백을 흡수해, 사용자가 열기 전부터 그 기준을 반영한 리뷰를 남긴다. 여기서 taste는 추상 개념이 아니라 반복 가능한 운영 기준이 된다.
- 발표용 해석:
  "취향은 말뿐인 감각이 아니라, 반복 피드백이 쌓이면 에이전트가 따라 하는 기술 자산"이라는 주장으로 연결된다.
- 출처:
  - https://every.to/source-code/my-ai-had-already-fixed-the-code-before-i-saw-it-f4a29a07-ea95-409f-bcb2-487a970bed4a

## 3. 전문성을 AI와 공유 가능한 형태로 꺼내는 것의 가치: 실제 사례

### 1) Anthropic 공식 메모리 문서: `CLAUDE.md`는 개인 메모가 아니라 팀 공유 규칙 레이어
- 날짜: 문서형, accessed 2026-04-06
- 짧은 직접 인용: `"Team-shared instructions for the project"`
- 왜 중요한가:
  Anthropic 공식 문서는 `CLAUDE.md`를 프로젝트 아키텍처, 코딩 표준, 공통 워크플로를 담는 팀 공유 지식층으로 설명한다. 즉 "전문성을 AI가 읽을 수 있게 외부화"하는 방식이 제품 차원에서 이미 표준화되어 있다.
- 발표용 해석:
  "내 노하우를 파일로 빼내는 행위는 개인 습관이 아니라, 이미 도구가 전제하는 운영 방식"이라는 근거.
- 출처:
  - https://code.claude.com/docs/en/memory
  - https://code.claude.com/docs/en/github-actions

### 2) Anthropic Product Design 팀: 비개발자도 디자인 감각을 코드로 직접 반영
- 날짜: Anthropic PDF, accessed 2026-04-06
- 짧은 직접 인용: `"2-3x faster execution"`
- 실제 사례:
  Anthropic의 Product Design 팀은 Claude Code로 시각적 polish, 상태 관리 변경, 목업 기반 프로토타이핑, 엣지 케이스 탐색을 직접 수행한다. PDF는 디자이너가 기존의 긴 handoff 대신 직접 품질 기준을 구현하고, 반복 속도가 `2-3x` 빨라졌다고 적는다.
- 왜 중요한가:
  이것은 "전문성이 코드 작성 능력과 같지 않아도 된다"는 강한 사례다. 디자인 팀의 전문성이 AI를 통해 바로 실행 계층으로 내려간다.
- 출처:
  - https://www-cdn.anthropic.com/58284b19e702b49db9302d5b6f135ad8871e7658.pdf

### 3) Anthropic Data Infrastructure 팀: 비개발자도 평문 워크플로로 자동화를 실행
- 날짜: Anthropic PDF, accessed 2026-04-06
- 실제 사례:
  같은 Anthropic PDF에 따르면, 데이터 인프라 팀은 재무팀 구성원에게 plain-text workflow 파일을 쓰게 한 뒤 Claude Code로 실행하게 했다. 코딩 경험이 없는 사람도 "대시보드 조회 -> 질의 실행 -> 엑셀 출력" 같은 절차를 글로 적으면 자동화가 돌아갔다.
- 왜 중요한가:
  전문성이 "구현 문법"이 아니라 "업무 절차와 판단 흐름을 언어로 꺼내는 능력"일 때, 비개발자까지 AI 시스템의 사용자에서 설계자로 이동한다.
- 출처:
  - https://www-cdn.anthropic.com/58284b19e702b49db9302d5b6f135ad8871e7658.pdf

### 4) Kieran Klaassen의 Cora 사례: 한번 문서화한 판단은 다음 작업의 기본값이 된다
- 날짜: 2026-01-27, updated 2026-02-12
- 짧은 직접 인용: `"The system already knows what to do."`
- 실제 사례:
  Cora 팀은 frustration detector를 만들면서, 테스트 작성 -> 프롬프트 반복 개선 -> 검증 절차를 `CLAUDE.md`에 기록했다. 다음번 유사 작업에서는 처음부터 다시 설명하지 않고 이전 워크플로를 호출한다.
- 왜 중요한가:
  문서화는 기록이 아니라 "미래 작업의 기본값"이 된다. 이게 섹션 9에서 말하려는 "취향/경험의 자본화"를 가장 잘 보여준다.
- 출처:
  - https://every.to/source-code/my-ai-had-already-fixed-the-code-before-i-saw-it-f4a29a07-ea95-409f-bcb2-487a970bed4a

### 5) P&G 현장실험: AI는 개인이 팀 수준의 전문성에 접근하게 만든다
- 날짜: 2025-04
- 짧은 직접 인용: `"AI breaks down functional silos"`
- 실제 사례:
  `The Cybernetic Teammate`는 P&G 전문가 776명을 대상으로 한 현장실험이다. 핵심 결과는 AI를 쓴 개인이 AI 없는 팀 수준의 성과를 냈고, R&D와 상업 부문 간의 기능적 편향도 줄었다는 점이다.
- 왜 중요한가:
  이 연구는 "전문성이 AI와 결합하면 개인 단위에서 재조합된다"는 점을 보여준다. 즉 지식의 외부화와 AI 보조는 단순 생산성 개선이 아니라 협업 구조 재편이다.
- 출처:
  - https://www.nber.org/papers/w33641

## 4. 섹션 9에 바로 쓸 수 있는 결론

### 핵심 논지 1
AI가 싸게 만드는 것은 `실행`이다. 그래서 인간의 비교우위는 더 아래가 아니라 더 위로 올라간다.

### 핵심 논지 2
그 위쪽 역량의 이름은 프롬프트 꼼수가 아니라 `비전`, `판단`, `taste`, `성공 기준`, `예외 처리 감각`이다.

### 핵심 논지 3
이 역량은 이제 머릿속에만 있지 않아도 된다. `CLAUDE.md`, 리뷰 규칙, 리서치 에이전트, 워크플로 문서로 빼내면 팀과 시스템이 재사용한다.

### 발표용 한 문장 제안
`AI 시대에 사라지는 것은 실행의 희소성이고, 더 비싸지는 것은 설계와 판단, 그리고 그것을 시스템이 읽을 수 있게 꺼내는 능력이다.`

## 5. 슬라이드 메시지 후보

### 후보 A
`이제 중요한 것은 더 빨리 만드는 능력이 아니라, 무엇을 만들지와 무엇을 버릴지를 고르는 능력이다.`

### 후보 B
`AI는 당신의 일을 빼앗기 전에, 당신의 취향과 판단을 복제 가능한 자산으로 만들 기회를 먼저 준다.`

### 후보 C
`도구를 잘 쓰는 사람이 아니라, 자기 전문성을 문서와 규칙으로 꺼내는 사람이 이긴다.`

## 6. 메모: 발표에서 특히 강한 조합

- Beck + Simon Willison + Microsoft WTI
  - 실행 자동화 이후 인간 역할이 설계/판단/운영 감독으로 이동한다는 축을 만들기 좋다.
- Kieran + Anthropic Product Design
  - `taste`가 추상어가 아니라 실제 성과와 워크플로 변화로 이어진다는 사례 축이다.
- Anthropic docs + Kieran compounding + Cybernetic Teammate
  - 전문성의 외부화가 왜 팀 단위 레버리지가 되는지 설명하는 구조로 좋다.
