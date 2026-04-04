# 클로드코드 잘 사용하기 — 상세 내용

> 전사 발표 | 2026.04.07 | 약 60분

---

## 1. 코딩은 어디로 가고 있는가

### 핵심 메시지
> "개발자는 더 이상 코드를 짜는 사람이 아닙니다. 마크다운 문서를 작성하는 사람이죠." — CODER X DOX

### 코딩의 추상화 역사

| 시대 | 방식 | 당시 반응 |
|------|------|----------|
| 1950년대 | 기계어/어셈블리 (0과 1) | — |
| C 언어 | `printf("hello")` 한 줄 | "기계를 직접 다루지 않으면 개발자가 아니다" |
| C++/Java | 객체지향, 가비지 컬렉터 | "메모리 직접 관리 안 하면 개발이 아니다" |
| Python | `print("hello")` | "장난감 언어, 실제 개발에 못 쓴다" |
| **현재** | **자연어로 지시** | "이건 진짜 개발이 아니다" **(매번 틀렸음)** |

**패턴**: 추상화 수준이 올라갈 때마다 "이건 진짜 개발이 아니다" 반발 → 결국 더 높은 추상화가 표준이 됨

### 마크다운이 코드를 대체하는 현실

- 프로젝트 폴더에 마크다운 파일 하나로 AI가 프로젝트 전체 맥락을 이해
- 각 도구별 동일한 개념:

| 도구 | 파일명 |
|------|--------|
| Claude Code | CLAUDE.md |
| Cursor | Cursor Rules |
| GitHub Copilot | copilot-instructions.md |
| Windsurf | Windsurf Rules |

### 개발자의 새로운 역할: 컨텍스트 설계자

- **건축가 비유**: 직접 벽돌을 쌓지 않고 설계도를 그림
- **영화 감독 비유**: 직접 연기하지 않고 배우에게 디렉션을 줌
- "코드를 잘 짜는 능력" → "AI가 잘 이해할 수 있게 문서를 잘 쓰는 능력" → **"컨텍스트를 잘 설계하는 능력"**

### 참고 자료
- youtube/youtube_coderxdox_developer_extinction.md
- research/ai_dev_methodologies.md (개요 부분)

---

## 2. 왜 Claude Code인가

### 핵심 메시지
> Claude Code는 AI 코딩 도구 중 가장 에이전틱하고 확장 가능한 개발 파트너다.

### AI 코딩 도구 현황 비교

| 도구 | 특징 | 형태 |
|------|------|------|
| GitHub Copilot | 코드 자동완성 중심 | IDE 플러그인 |
| Cursor | AI 네이티브 에디터 | IDE |
| Windsurf | 에이전틱 IDE | IDE |
| **Claude Code** | **CLI 기반 에이전틱 코딩** | **터미널** |
| Codex (OpenAI) | CLI 기반 에이전틱 코딩 | 터미널 |

### Claude Code의 차별점

1. **CLI 기반** — 터미널에서 바로 실행, IDE에 종속되지 않음
2. **에이전틱** — 단순 자동완성이 아니라 계획 → 실행 → 검증까지
3. **확장성** — Skills, Hooks, MCP, Subagent, Teams 등 레이어 구조
4. **컨텍스트 관리** — CLAUDE.md, Memory 시스템으로 프로젝트 맥락 유지
5. **다양한 접근 경로** — CLI, 데스크톱 앱, 웹(claude.ai/code), VS Code, JetBrains

### Claude Code의 에이전트 루프

```
사용자 입력 → Claude 분석 → 도구 호출(파일 읽기/쓰기, 검색, 실행) → 결과 확인 → 반복
```

- 20개 이상의 내장 도구 (Agent, Edit, Bash, Glob, Grep, Read, Write 등)
- 5가지 도구 카테고리: 파일 관리, 코드 실행, 검색, 커뮤니케이션, 확장

### 참고 자료
- official/core/official_features_overview.md
- official/core/official_how_claude_code_works.md

---

## 3. Claude Code 기본 사용법

### 핵심 메시지
> 설치부터 첫 작업까지, 시작하는 건 어렵지 않다.

### 설치 및 시작

```bash
# 설치
npm install -g @anthropic-ai/claude-code

# 프로젝트에서 실행
cd my-project
claude
```

### 기본 워크플로우

1. **코드베이스 이해하기**
   ```
   give me an overview of this codebase
   explain the main architecture patterns used here
   ```

2. **코드 생성/편집**
   ```
   create a new API endpoint for user profile
   update user.ts to add the null check you suggested
   ```

3. **버그 수정**
   ```
   I'm seeing an error when I run npm test
   suggest a few ways to fix the @ts-ignore in user.ts
   ```

4. **커밋 & PR**
   ```
   commit these changes
   create a PR for this feature
   ```

### 권한 모드

| 모드 | 설명 |
|------|------|
| 기본 모드 | 매번 승인 요청 |
| 자동 모드 | 읽기 작업은 자동 허용 |
| 바이패스 모드 | 모든 작업 자동 허용 (주의 필요) |

### MCP (Model Context Protocol) 간단 소개

- AI가 외부 도구와 통신하는 표준 규격 (USB-C 같은 것)
- 100개 이상의 MCP 서버 활용 가능: Notion, GitHub, Slack, Jira 등
- 설치 예시: `claude mcp add github -- npx @anthropic-ai/github-mcp`

### 참고 자료
- official/core/official_common_workflows.md
- official/core/official_tools_reference.md
- official/extensions/official_mcp.md

---

## 4. AI 시대의 개발 방법론

### 핵심 메시지
> AI 에이전틱 코딩의 등장으로 다양한 방법론이 생겨났고, 공통점은 "자연어와 문서가 개발의 출발점"이라는 것이다.

### 왜 방법론이 필요한가

2025년 이전: AI = "고급 자동완성(fancy autocomplete)"
→ 에이전틱 코딩 등장: AI가 계획 → 다단계 실행 → 전체 기능 작성
→ 병목이 바뀜: **코드를 작성하는 것이 아니라, AI에게 무엇을 어떻게 시킬지**가 어려움

| 시기 | 사건 | 영향 |
|------|------|------|
| 2025.02 | Karpathy "Vibe Coding" 명명 | AI 코딩의 대중화 |
| 2025 중반 | AI 생성 코드의 품질/보안 문제 | 구조화된 방법론 필요성 대두 |
| 2025 하반기 | SDD, BMAD 등 프레임워크 등장 | Vibe Coding 한계에 대한 업계 대응 |
| 2026 초 | TDD + AI, Context Engineering 부상 | 성숙한 AI 개발 워크플로우 정립 |

### 방법론 지형도

| 방법론 | 핵심 아이디어 | 특징 |
|--------|-------------|------|
| **TDD** | 테스트 먼저, AI가 구현 | Red-Green-Refactor + AI. 검증 가능성 높음 |
| **SDD** | 스펙이 곧 실행 가능한 진실 | 마크다운 스펙 → AI가 구현 → 스펙과 대조 검증 |
| **PDD** | 프롬프트가 개발의 출발점 | "추측 금지" 선언, 의도를 명확히 표현 |
| **VDD** | 바이브 코딩 | Karpathy 제안. 빠른 프로토타이핑에 적합 |
| **ADD** | AI 에이전트 워크플로우 | 에이전트가 계획-실행-검증 전체를 수행 |
| **BMAD** | 애자일 + AI 드리븐 | 역할 기반 AI 협업 프레임워크 |

### 공통점

모든 방법론이 공유하는 핵심:
1. **자연어와 문서가 개발의 출발점**이다
2. 개발자의 역할은 **의도를 명확히 전달하고 결과를 검증**하는 것
3. **구조화된 컨텍스트 제공**이 결과 품질을 결정한다

→ 그래서 중요해진 역량: **문서 설계, 하네스, 컨텍스트 관리**

### 참고 자료
- research/ai_dev_methodologies.md

---

## 5. 컨텍스트는 주는 게 아니라 설계하는 것이다 — 하네스 & 컨텍스트 엔지니어링

### 핵심 메시지
> "좋은 사용자는 잘 시키는 사람이 아니라 잘 설계하는 사람이다."
> "Intelligence is not the bottleneck, context is." — Anthropic

### 프롬프트 → 컨텍스트 → 하네스 엔지니어링의 진화

| 구분 | 프롬프트 엔지니어링 | 컨텍스트 엔지니어링 | 하네스 엔지니어링 |
|------|-------------------|-------------------|-------------------|
| 초점 | 모델에 무엇을 말할 것인가 | 모델에 무엇을 보여줄 것인가 | 모델 주변에 무엇을 구축할 것인가 |
| 범위 | 단일 프롬프트 | 입력 파이프라인 전체 | 실행 환경 전체 |
| 시대 | 2023-2024 | 2024-2025 | 2025-2026 |

### 왜 프롬프트만으로는 부족한가

- 단발 프롬프트는 **재현성이 낮다** — 같은 질문에 다른 결과
- 하네스는 **품질을 안정화**한다 — 환경으로 일관성 확보
- 더 좋은 모델이 나와도 하네스는 **더 중요해진다** (능력 확장 → 더 많은 실패 모드)

### 핵심 공식: Agent = Model + Harness

> "If you're not the model, you're the harness." — Vivek Trivedy, LangChain

- **모델은 CPU, 하네스는 운영체제(OS)** — Phil Schmid
- OS 없는 CPU는 발열체에 불과하듯, 하네스 없는 모델은 데모에 불과하다
- **"The model is commodity. The harness is moat."**

### 하네스의 핵심 비유: 마구(horse tack)

고삐, 안장, 재갈 등 강력하지만 예측 불가능한 동물(= LLM)을 올바른 방향으로 이끄는 장비 전체

### 신뢰성의 수학

- 멀티스텝 에이전트에서 각 단계 성공률 95%
- 20단계 체인 → 전체 성공률 **36%**
- 하네스가 검증 루프, 재시도, 체크포인트를 추가해야 허용 가능한 수준으로

### CLAUDE.md — 프로젝트의 "헌법"

**배치 위치와 범위:**

| 범위 | 위치 | 목적 |
|------|------|------|
| 관리 정책 | `/Library/Application Support/ClaudeCode/CLAUDE.md` | 조직 전체 지침 |
| 프로젝트 | `./CLAUDE.md` 또는 `./.claude/CLAUDE.md` | 팀 공유 지침 |
| 개인 | `~/.claude/CLAUDE.md` | 개인 선호도 |

**효과적인 작성법:**
- 200줄 이하 유지
- 마크다운 헤더와 글머리 기호로 구조화
- 검증 가능한 수준으로 구체적 작성
  - "2칸 들여쓰기 사용" (O) vs "코드를 제대로 포맷합니다" (X)
  - "커밋하기 전에 `npm test` 실행" (O) vs "변경 사항을 테스트합니다" (X)
- `@path`로 외부 파일 가져오기 가능 (최대 5홉 깊이)

**좋은 예 vs 나쁜 예:**

```markdown
# 좋은 예
## 코드 스타일
- TypeScript strict mode 사용
- 함수명은 camelCase, 타입명은 PascalCase
- 커밋 전 `pnpm lint && pnpm test` 실행 필수

## 금지사항
- any 타입 사용 금지
- console.log 커밋 금지
```

```markdown
# 나쁜 예
코드를 잘 작성해주세요.
테스트를 해주세요.
좋은 코드를 만들어주세요.
```

### 커스텀 슬래시 커맨드 & Hooks

**슬래시 커맨드 (Skills):**
- `.claude/commands/` 폴더에 마크다운 파일로 정의
- 반복적인 워크플로우를 패키징
- 예: `/review`, `/deploy`, `/test` 등

**Hooks:**
- 특정 이벤트에 자동 실행되는 셸 명령
- 12+ 이벤트 타입: SessionStart, PreToolUse, PostToolUse 등
- 예: 파일 저장 후 자동 린트, 커밋 전 테스트 실행

### 컨텍스트 엔지니어링의 4개 레이어 (정구봉)

| 레이어 | 역할 |
|--------|------|
| **CLAUDE.md** | 시스템 성격 정의 |
| **Skill** | 실행 로직 구조화 |
| **Memory** | 학습 축적 |
| **MCP** | 외부 도구 연결 |

> "코드를 짜는 사람도, 코드를 읽는 사람도 아닙니다. 맥락을 설계하는 사람이 이깁니다." — 정구봉

### 새로운 역할: Harness Builder

기존 Builder, Reviewer 외에 세 번째 역할:
- 에이전트가 일할 수 있는 **구조를 설계**하는 사람
- 검증 루프를 만들고, 모호성을 제거하고, 에이전트 간 조율 시스템을 설계

### 참고 자료
- research/harness_engineering.md
- research/context_engineering.md
- linkedin/linkedin_goobong_jeong_context_engineering.md
- official/extensions/official_memory.md
- official/extensions/official_skills.md
- official/extensions/official_hooks.md

---

## 6. 이렇게 하면 망한다 — 한계와 실패 패턴

### 핵심 메시지
> 도구를 잘 쓰는 것만큼 중요한 건, 잘못 쓰는 패턴을 아는 것이다.

### 실패 패턴 5가지

**1. 컨텍스트 과부하**
- 너무 많은 정보를 한번에 주면 핵심을 놓침
- 대안: 점진적으로 정보 제공, 관련 파일만 참조

**2. 불명확한 요구사항**
- "이거 좀 고쳐줘" vs "user.ts 42번 줄의 null check 추가해줘"
- 모호한 지시 = 예측 불가능한 결과
- 대안: 구체적이고 검증 가능한 지시

**3. 검증 없는 자동수락**
- AI 출력을 diff 확인 없이 그대로 수락
- "AI가 만들었으니 맞겠지" → 버그, 보안 취약점 유입
- 대안: 항상 diff 리뷰, 테스트 실행 후 수락

**4. 긴 세션 드리프트**
- 세션이 길어지면 초기 맥락이 흐려짐
- 컨텍스트 윈도우 한계 → 이전 지시를 잊음
- 대안: 작업 단위로 세션 분리, CLAUDE.md로 핵심 맥락 고정

**5. 권한 과다**
- 필요 이상의 권한 부여 (바이패스 모드 남용)
- 의도치 않은 파일 삭제, 설정 변경 등
- 대안: 기본 모드에서 시작, 필요시에만 권한 확대

### 검증과 품질 관리

하네스만 강조하면 "프롬프트 잘 쓰면 된다"로 오해할 수 있다.
실제로 중요한 것:

- **테스트**: AI가 생성한 코드에 대한 테스트 작성/실행
- **Diff 리뷰**: 변경사항을 직접 확인
- **체크리스트**: 코드 스타일, 보안, 성능 기준 확인
- **승인 게이트**: 중요 작업은 반드시 사람의 승인 필요

> "진입장벽은 낮아졌지만, 고품질 결과를 만드는 역량은 오히려 구조화된다"

### 그래도 기초는 중요하다

- "코드 안 배워도 되겠다" → **위험한 생각**
- AI가 생성한 코드를 **평가할 수 있는 기초 지식**은 필수
- 기초가 없으면 AI의 실수를 발견할 수 없음

### 참고 자료
- youtube/youtube_coderxdox_developer_extinction.md (기초의 중요성)
- research/harness_engineering.md (신뢰성의 수학)

---

## 7. 멀티 에이전트 활용

### 핵심 메시지
> Claude Code 하나가 아니라, 여러 에이전트가 역할을 나눠 협업할 수 있다.

### 서브에이전트 (Subagent)

Claude Code 내장 서브에이전트:

| 타입 | 역할 | 사용 시점 |
|------|------|----------|
| **Explore** | 코드베이스 탐색 | 파일 검색, 코드 구조 파악 |
| **Plan** | 구현 계획 수립 | 복잡한 작업의 전략 설계 |
| **Code** | 코드 작성 | 독립적인 구현 작업 |

- 컨텍스트 격리: 각 서브에이전트는 독립된 컨텍스트로 작업
- 메인 에이전트의 컨텍스트 윈도우 보호

### 에이전트 팀 (Agent Teams)

- 여러 에이전트가 공유 태스크 리스트로 협업
- 각 에이전트에 역할 부여 (Opus = 설계, Sonnet = 구현, Haiku = 검색)
- 크로스 에이전트 메시징으로 조율

### 실전 사례: C 컴파일러 구축 (Anthropic Nicholas Carlini)

- 16개 에이전트 팀으로 C 컴파일러를 구축
- 각 에이전트가 컴파일러의 다른 모듈 담당
- 병렬 작업으로 속도와 품질 동시 달성

### Ralphton 대회 사례

- 우승팀 HouseOps의 'Ouroboros' 하네스
- 133라운드 인터뷰를 통해 12.8시간 내 169,553줄 자동 생성
- 에이전트가 밤새 코딩하고, 사람은 아침에 리뷰

### 참고 자료
- official/extensions/official_sub_agents.md
- linkedin/linkedin_goobong_jeong_agent_teams.md
- research/harness_engineering.md (Ralphton, Ouroboros)

---

## 8. 실전 워크플로우 & 도구 세팅

### 핵심 메시지
> 도구를 잘 조합하면 개발 생산성이 극적으로 올라간다.

### 업무 관리: 이슈 관리 도구 연동

**이슈 기반 개발 흐름:**
```
Linear/Jira 이슈 → Git 브랜치 생성 → Claude Code로 구현 → PR 생성 → 리뷰 → 머지
```

- MCP로 Linear/Jira 직접 연동 가능
- 이슈 내용을 Claude Code에 전달하면 맥락 파악 → 구현까지

### 병렬 작업: Git Worktree

**문제**: 하나의 레포에서 여러 작업을 하려면 브랜치 전환이 번거로움
**해결**: Git Worktree로 동일 레포의 여러 작업 디렉토리를 동시에 운영

```bash
# 워크트리 생성
git worktree add ../feature-a feature-a
git worktree add ../bugfix-b bugfix-b

# 각 워크트리에서 독립적으로 Claude Code 실행
cd ../feature-a && claude
cd ../bugfix-b && claude
```

- 각 워크트리에서 독립된 Claude Code 세션 운영
- 작업 간 간섭 없이 병렬 진행

### 세션 관리: tmux

**왜 tmux인가:**
- 여러 Claude Code 세션을 하나의 터미널에서 관리
- 세션 분리: feature-a, bugfix-b, review 등 작업별
- 백그라운드 실행: 터미널을 닫아도 세션 유지
- 세션 간 빠른 전환

```bash
# 세션 생성
tmux new -s feature-a
tmux new -s bugfix-b

# 세션 전환
tmux switch -t feature-a

# 세션 목록
tmux ls
```

### 터미널 추천: Cmux

- 여러 Claude Code 세션을 효율적으로 관리하는 터미널 도구
- tmux 기반이지만 Claude Code에 최적화된 UX

### 자주 쓰는 패턴들

**코드 리뷰:**
```
review this PR and point out potential issues
```

**디버깅:**
```
I'm getting this error: [에러 메시지]. Help me debug it.
```

**PR 생성:**
```
create a PR for the changes on this branch
```

**테스트 작성:**
```
write tests for the user service module
```

### 참고 자료
- official/core/official_common_workflows.md
- research/skills_and_plugins.md

---

## 9. 비개발자도 할 수 있다

### 핵심 메시지
> "PM이 '무엇을'과 '왜'를 이해하고, AI로 '어떻게'까지 소유할 수 있는 시대" — Builder.io

### 실제 사례

**1. Anthropic Austin Lau — 마케터 1명이 전체 마케팅 운영**
- 비개발자 그로스 마케터가 10개월간 유료 검색, 소셜, 앱스토어, 이메일, SEO 전체 혼자 운영
- Google Ads 카피: 광고당 30분 → 30초
- Figma 플러그인으로 0.5초에 광고 100개 변형 생성

**2. Teresa Torres — PM 전문가의 Claude Code 시스템**
- 『Continuous Discovery Habits』 저자 (비개발자)
- `/today` 커맨드로 Obsidian 기반 맞춤형 태스크 매니저 구축 (Trello 대체)
- 병렬 에이전트로 경쟁사 분석 15개 동시 처리
- "가장 강력한 AI 활용법은 기성 제품이 아니라 스스로 만든 맞춤 시스템"

**3. 리텐션 Simpson — 외주비 99.6% 절감**
- 그로스 컨설턴트 (비개발자)
- Google Meridian MMM 라이브러리를 Claude Code로 직접 구현
- 외주 예상 500만원/3주 → 15시간/$20

**4. 마케터 '와니' — 콘텐츠 자동화**
- 블로그 URL → 인스타그램 카드뉴스 자동 생성 파이프라인
- 토큰 비용 92% 절감 (6만 → 5천 토큰)
- 핵심: "API가 있는 반복 작업을 찾아라"

**5. Team Attention — 비개발자 130명 교육**
- EPD(Engineering, Product, Design) 경계 붕괴
- "마케터가 빌드하고, CFO가 커밋하고, 법무가 계약서 트리아지를 자동화하는 세계"

### 비개발자가 시작하기 좋은 영역

| 영역 | 예시 | 난이도 |
|------|------|--------|
| 반복 업무 자동화 | 이메일 분류, 데이터 정리, 리포트 생성 | 낮음 |
| 콘텐츠 제작 | 블로그 → 카드뉴스, 광고 카피 대량 생성 | 낮음 |
| 문서 작성 | PRD → Jira 티켓, 회의록 → 액션 아이템 | 낮음 |
| 데이터 분석 | 캠페인 대시보드, A/B 테스트 통계 | 중간 |
| 리서치 자동화 | 경쟁사 분석, 논문 요약 | 중간 |
| MVP/프로토타입 | 아이디어 → 작동하는 웹서비스 | 중간 |

### 균형 잡기

> "진입장벽은 낮아졌지만, 고품질 결과를 만드는 역량은 오히려 구조화된다"

- "이제 누구나 개발 가능" ≠ "개발자가 필요 없다"
- 비개발자: 반복 업무 자동화, 프로토타이핑에서 큰 가치
- 개발자: 하네스 설계, 품질 관리, 아키텍처에서 더 중요해짐

### 참고 자료
- research/non_developer_cases.md
- linkedin/linkedin_goobong_jeong_context_engineering.md

---

## 10. AI 시대, 우리는 어떻게 해야 하나

### 핵심 메시지
> FOMO에 휘둘리지 말고, 체계적으로 따라가고, 직접 써보자.

### AI FOMO 해소법 (까칠한AI 황현트 기반)

**3단계 프레임워크: 정보 접근 → 선별 → 직접 적용**

**1단계: 소식 접하기 (채널 우선순위)**

| 우선순위 | 채널 | 특징 |
|----------|------|------|
| 1 | X (트위터) | 가장 빠르고 비교적 진실됨 |
| 2 | 뉴스레터 | 독특한 해석과 깊은 인사이트 |
| 3 | 유튜브 | 대중적, 딸깍쇼가 많음 |
| 4 | 링크드인 | 요즘 잘 안 보게 됨 |

**추천 X 계정:**
- 루카스 (소식 빠름)
- Geek News (필수 구독)
- Claude, OpenAI, Google AI (공식)
- Journey (분석적 인사이트)

**추천 뉴스레터:**
- Lenny's Newsletter (정보량 많음)
- Ali Afridi / Sandhill (깊은 해석)
- Chamath (시장 소식)

**2단계: 선별과 클리핑**
- 모든 정보를 다 따라가려 하지 말 것
- 본인 업무와 관련된 것 위주로 선별
- 클리핑 → 나중에 검증

**3단계: 직접 써보기**
> "딸깍쇼를 보고 딸깍쇼를 찍으면 안 된다"
- 인플루언서 데모를 보고 따라하는 것 ≠ 실제 업무에 적용
- **가장 인사이트 있는 사람이 직접 써봐야** 한다
- 리더의 책임: 대충 본 AI 트렌드 하나로 조직 전체를 흔들지 말 것

### 개발자로서의 마인드셋 변화

- **코드 작성자 → 컨텍스트 설계자**
- **혼자 코딩 → 에이전트 팀 관리자**
- **도구 사용자 → 환경 설계자 (Harness Builder)**

### 내일부터 시작하기: 수준별 가이드

| 수준 | 시작 행동 |
|------|----------|
| **입문자** | Claude Code 설치 → 간단한 질문 → 첫 파일 편집 |
| **실무자** | CLAUDE.md 작성 → 슬래시 커맨드 만들기 → 워크플로우 구축 |
| **파워유저** | 하네스 전체 설계 → 멀티 에이전트 → 팀 도입 → Skills 운영 |

### 참고 자료
- youtube/youtube_까칠한AI_ai_fomo_해소법.md
- youtube/youtube_까칠한AI_리더_ai_번아웃.md

---

## 11. 마무리 & Q&A

### 핵심 메시지 정리

1. **코딩은 자연어 수준으로 추상화되었다** — 매번 "이건 진짜 개발이 아니다" 했지만 항상 틀렸다
2. **문서와 하네스 설계가 핵심 역량이다** — 잘 시키는 게 아니라 잘 설계하는 사람이 이긴다
3. **Claude Code로 지금 바로 실천할 수 있다** — 개발자도, 비개발자도
4. **FOMO 대신 체계적으로** — 정보 접근 → 선별 → 직접 적용

### 한 줄 요약
> **"컨텍스트를 설계하는 사람이 이깁니다."**
