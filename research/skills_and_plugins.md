# Claude Code Skills, Plugins, 도구 종합 조사 보고서

> 작성일: 2026-03-31
> 조사 범위: Claude Code 생태계의 주요 Skills, Plugins, MCP 서버, 브라우저 연동 도구, 모니터링 도구

---

## 출처 및 참고 링크

### Oh My Claude Code (OMC)
- GitHub: https://github.com/Yeachan-Heo/oh-my-claudecode
- 공식 사이트: https://ohmyclaudecode.com/
- 레퍼런스 문서: https://github.com/Yeachan-Heo/oh-my-claudecode/blob/main/docs/REFERENCE.md
- 아키텍처 문서: https://github.com/Yeachan-Heo/oh-my-claudecode/blob/main/docs/ARCHITECTURE.md
- npm 패키지: https://www.npmjs.com/package/oh-my-claude-sisyphus
- oh-my-opencode 배경: https://jeongil.dev/en/blog/trends/claude-code-agent-teams/

### Plugins
- claude-mem: https://github.com/thedotmack/claude-mem
- session-wrap / clarify: https://github.com/team-attention/plugins-for-claude-natives
- agent-council: https://github.com/team-attention/plugins-for-claude-natives/tree/main/plugins/agent-council
- Compound Engineering: https://github.com/EveryInc/compound-engineering-plugin

### Skills
- react-best-practices (Vercel): https://vercel.com/blog/introducing-react-best-practices
- supabase-postgres-best-practices: https://github.com/supabase/agent-skills
- ui-skills (ibelick): https://github.com/ibelick/ui-skills / https://www.ui-skills.com/
- BMAD Method: https://github.com/bmad-code-org/BMAD-METHOD / https://docs.bmad-method.org/
- bkit: https://github.com/popup-studio-ai/bkit-claude-code / https://www.bkit.ai/
- Skill Creator (Anthropic 공식): https://github.com/anthropics/skills
- Antigravity Awesome Skills: https://github.com/sickn33/antigravity-awesome-skills

### 브라우저 연동
- agent-browser (Vercel Labs): https://github.com/vercel-labs/agent-browser / https://agent-browser.dev/
- Agentation: https://benji.org/agentation
- Claude in Chrome: https://code.claude.com/docs/en/chrome

### MCP 서버
- Playwright MCP: https://github.com/microsoft/playwright-mcp
- Context7: https://context7.com/
- GitHub MCP: https://github.com/github/github-mcp-server
- Exa MCP: https://exa.ai/mcp / https://github.com/exa-labs/exa-mcp-server
- Sentry MCP: https://github.com/getsentry/sentry-mcp / https://docs.sentry.io/ai/mcp/
- Slack MCP: https://docs.slack.dev/ai/slack-mcp-server/connect-to-claude/

### 모니터링 및 기타
- Claude HUD: https://github.com/jarrodwatts/claude-hud
- Claude Dashboard: https://github.com/uppinote20/claude-dashboard
- Claude Code Usage Monitor: https://github.com/Maciek-roboblog/Claude-Code-Usage-Monitor

---

## 1. Oh My Claude Code (OMC) - 멀티 에이전트 오케스트레이션

### 개요

Oh My Claude Code(OMC)는 Claude Code를 위한 **Teams-first 멀티 에이전트 오케스트레이션 플러그인**이다. 한국인 개발자 Yeachan Heo가 개발했으며, GitHub에서 20.2k stars를 기록하고 Trending 1위에 올랐다. "Don't learn Claude Code. Just use OMC."라는 슬로건처럼 제로 러닝 커브를 지향한다.

### oh-my-opencode에서 oh-my-claudecode로

- **oh-my-opencode**: 원래 OpenCode(오픈소스 Claude Code 대안) 기반으로 만들어진 멀티 에이전트 오케스트레이션 도구
- **2026년 1월 9일**: Anthropic이 Claude Pro/Max 구독을 OpenCode에서 사용하는 것을 기술적으로 차단
- **oh-my-claudecode 탄생**: OpenCode 기반이 아닌 Claude Code의 네이티브 Hooks(셸 스크립트) 기반으로 완전히 재개발. Max 구독과 완전 호환되며 ToS 위반 없음
- oh-my-opencode의 핵심 컨셉(멀티 에이전트, 실행 모드, 스마트 라우팅)을 계승하면서 Claude Code 네이티브 환경에 최적화

### 설치 방법

```bash
# 방법 1: Claude Code Plugin Marketplace (권장)
/plugin marketplace add https://github.com/Yeachan-Heo/oh-my-claudecode
/plugin install oh-my-claudecode

# 방법 2: NPM 글로벌 설치
npm i -g oh-my-claude-sisyphus@latest

# 설치 후 초기 설정
/omc-setup              # 글로벌 설정 (~/.claude/CLAUDE.md)
/omc-setup --local      # 프로젝트 스코프 설정 (./.claude/CLAUDE.md)
```

### 실행 모드 (Execution Modes)

| 모드 | 설명 | 사용 상황 |
|------|------|----------|
| **Autopilot** | 완전 자율 실행. 아이디어에서 작동하는 코드까지 자동으로 처리 | 엔드투엔드 기능 개발 |
| **Ultrapilot** | 최대 5개 워커 병렬 실행. 3-5배 속도 향상 | 대규모 리팩토링, 풀스택 앱 |
| **Ralph** | Architect 검증이 포함된 지속 루프. 완료될 때까지 반복 | 정확성이 중요한 작업 |
| **Ultrawork** | 최대 병렬성으로 버스트 수정/리팩토링 | 대량 수정 작업 |
| **Team** | 정식 파이프라인 (plan -> prd -> exec -> verify -> fix) | 구조화된 팀 작업 |
| **Pipeline** | 순차적 단계별 처리 | Research -> Design -> Code -> Test |
| **Swarm** | 독립 에이전트들이 하나의 복잡한 목표를 향해 협력 | 복잡한 문제 해결 |
| **Ecomode** | 스마트 라우팅으로 토큰 30-50% 절약 | 비용 효율적 개발 |
| **Deep-interview** | 소크라테스식 질문으로 요구사항 명확화 후 실행 | 모호한 요구사항 정리 |

### 에이전트 카탈로그 (29+ 에이전트)

#### 분석 도메인
| 에이전트 | 모델 | 역할 |
|---------|------|------|
| `architect-low` | Haiku | 경량 아키텍처 분석 |
| `architect-medium` | Sonnet | 중간 수준 분석 |
| `architect` | Opus | 고급 아키텍처 추론 |

#### 실행 도메인
| 에이전트 | 모델 | 역할 |
|---------|------|------|
| `executor-low` | Haiku | 기본 코드 변경 |
| `executor` | Sonnet | 기능 구현 |
| `executor-high` | Opus | 복잡한 리팩토링 |

#### 탐색 도메인
| 에이전트 | 모델 | 역할 |
|---------|------|------|
| `explore` | Haiku | 빠른 파일/패턴 검색 |
| `explore-high` | Opus | 정교한 아키텍처 탐색 |

#### 전문 도메인
| 에이전트 | 모델 | 역할 |
|---------|------|------|
| `planner` | Opus | 전략적 계획 수립 |
| `critic` | Opus | 비판적 분석 |
| `analyst` | Opus | 사전 계획/분석 |
| `designer-low/medium/high` | Haiku/Sonnet/Opus | 프론트엔드 디자인 |
| `code-reviewer` | Opus | 코드 리뷰 |
| `security-reviewer` | Sonnet/Opus | 보안 리뷰 |
| `qa-tester` | Sonnet | QA 테스트 |
| `test-engineer` | Sonnet | TDD 기반 테스트 |
| `debugger` | Sonnet | 디버깅 및 빌드 수정 |
| `writer` | Haiku | 문서 작성 |
| `scientist` / `scientist-high` | Sonnet/Opus | 데이터 과학/분석 |
| `document-specialist` | Sonnet | 외부 문서 조사 |
| `vision` | Sonnet | 시각적 분석 |
| `tracer` | Sonnet | 원인 추적 |

### Skills 목록 (31+ 스킬)

| 슬래시 커맨드 | 설명 |
|-------------|------|
| `/autopilot` | 완전 자율 실행 모드 |
| `/team [count]:[model] "[task]"` | 멀티 에이전트 팀 오케스트레이션 |
| `/ralph` | 검증 포함 지속 루프 |
| `/ultrawork` | 병렬 실행 엔진 |
| `/deep-interview` | 소크라테스식 요구사항 인터뷰 |
| `/deep-dive` | trace -> deep-interview 2단계 파이프라인 |
| `/trace` | 증거 기반 원인 추적 |
| `/ccg` | Claude-Codex-Gemini 트리 모델 오케스트레이션 |
| `/ralplan` | ralph/autopilot 실행 전 합의 기반 계획 |
| `/plan` | 전략적 계획 수립 |
| `/sciomc` | 병렬 과학자 에이전트 오케스트레이션 |
| `/ultraqa` | QA 순환: test -> verify -> fix 반복 |
| `/skill list\|add\|remove\|edit\|search` | 스킬 관리 |
| `/learner` | 대화에서 재사용 가능한 스킬 추출 |
| `/cancel` | 활성 모드 취소 |
| `/omc-setup` | 설치 및 설정 |
| `/omc-doctor` | 문제 진단 및 수정 |
| `/configure-notifications` | 알림 설정 (Telegram, Discord, Slack) |
| `/hud` | HUD 디스플레이 옵션 설정 |
| `/visual-verdict` | 스크린샷 비교 시각적 QA |
| `/ai-slop-cleaner` | AI 생성 코드 정리 |
| `/writer-memory` | 작가용 에이전트 메모리 시스템 |
| `/external-context` | 외부 웹 검색 및 문서 조회 |
| `/deepinit` | 코드베이스 초기화 및 AGENTS.md 문서화 |
| `/ask [provider] "[prompt]"` | Claude/Codex/Gemini 쿼리 |
| `/omc-teams` | tmux 기반 CLI 팀 런타임 |
| `/project-session-manager` | Worktree 기반 개발 환경 관리 |
| `/mcp-setup` | MCP 서버 설정 |

### 모델 라우팅 규칙

| 작업 특성 | 할당 모델 |
|----------|----------|
| 빠른 조회, 단순 변경 | Haiku (저비용) |
| 표준 기능 개발, 리팩토링 | Sonnet (중간) |
| 복잡한 추론, 아키텍처 결정 | Opus (고성능) |

이 스마트 라우팅으로 **토큰 비용 30-50% 절감**을 달성한다.

### 핵심 장점
- 제로 러닝 커브: 자연어로 모든 것을 제어
- 자동 모델 라우팅으로 비용 최적화
- Auto-resume: API 한도 도달 시 자동 대기 후 재개
- HUD 상태바로 실시간 모니터링
- Discord, Telegram, Slack 알림 통합

### 주의사항
- Claude Max/Pro 구독 또는 ANTHROPIC_API_KEY 필요
- 플러그인 설치 후 반드시 `/omc-setup` 실행 필요
- Team 모드가 v4.1.7부터 정식 오케스트레이션 표면 (기존 swarm 키워드 제거됨)

---

## 2. Plugins (빠르게 도입 가능한 도구들)

### 2.1 claude-mem - 세션 간 기억 저장

**개요**: Claude Code의 모든 세션 활동을 자동 캡처하고, AI로 압축한 뒤, 다음 세션에 관련 컨텍스트를 주입하는 플러그인.

**GitHub Stars**: 38,401 | **현재 버전**: 10.6.2

**핵심 기능**:
- 전용 관찰자 AI가 매 세션을 실시간 모니터링하여 검색 가능한 관찰 기록 생성
- 새 세션 시작 시 이전 세션의 컨텍스트가 자동으로 주입됨
- 경량 인덱스(제목, 타입, 타임스탬프)로 시작하고, LLM이 필요할 때만 전체 관찰 기록을 가져옴
- 토큰 효율적이면서도 필요할 때 깊이 있는 정보 제공

**아키텍처**:
- 5개 라이프사이클 훅: SessionStart -> UserPromptSubmit -> PostToolUse -> Summary -> SessionEnd
- Express API 워커 서비스 (포트 37777)
- SQLite3 데이터베이스: `~/.claude-mem/claude-mem.db`
- React 기반 뷰어 UI

**설치**:
```bash
/plugin marketplace add thedotmack/claude-mem
/plugin install claude-mem
# Claude Code 재시작
```

**추천 상황**: 장기 프로젝트에서 세션 간 컨텍스트 유지가 중요할 때. 특히 여러 날에 걸친 개발 작업에서 "어제 어디까지 했지?" 문제 해결.

---

### 2.2 session-wrap & clarify - 세션 종료 시 핵심 기억 저장

**출처**: team-attention/plugins-for-claude-natives

#### session-wrap
**개요**: 세션 종료 시 5개 전문 에이전트가 다각도로 세션을 분석하는 포괄적 세션 랩업 플러그인.

**핵심 기능**:
- **멀티 에이전트 분석 파이프라인**: 5개 전문 에이전트가 서로 다른 관점에서 세션 분석
- **2단계 아키텍처**: 병렬 분석 후 순차 검증
- **문서 업데이트 제안**: CLAUDE.md 및 context.md에 추가할 내용 식별
- **자동화 발견**: 스킬/커맨드/에이전트로 자동화할 패턴 탐지
- **학습 캡처**: TIL(Today I Learned) 형식으로 인사이트 추출
- **후속 작업 계획**: 우선순위 기반 태스크 리스트 생성
- **중복 방지**: 기존 콘텐츠 대비 제안 검증

**설치**:
```bash
/plugin marketplace add team-attention/plugins-for-claude-natives
# session-wrap 플러그인 선택 설치
```

#### clarify
**개요**: 모호한 요구사항을 정확하고 실행 가능한 스펙으로 변환하는 플러그인. 구조화된 인터뷰를 통해 필요한 것을 정확히 추출.

**추천 상황**: 요구사항이 불명확한 프로젝트 시작 시점, 또는 세션마다 학습한 내용을 체계적으로 축적하고 싶을 때.

---

### 2.3 agent-council - 여러 AI Agent 의견 종합

**출처**: team-attention/plugins-for-claude-natives

**개요**: 여러 AI CLI(Codex, Gemini 등)의 의견을 수집하고 Chairman(기본: 호스트 에이전트)이 결론을 종합하는 스킬. Karpathy의 LLM Council에서 영감을 받았으며, 추가 API 비용 없음.

**작동 방식**:
1. 모든 AI 에이전트가 동시에 질문을 받고 독립적으로 응답
2. 각 에이전트의 응답을 수집하고 표시
3. Chairman이 모든 의견을 종합하여 최종 권고안 작성

**유사 도구**:
| 도구 | 특징 |
|------|------|
| agent-tower-plugin | 에이전트 병렬 실행, 질문에 맞는 페르소나 자동 제안 |
| claude-council | Gemini, OpenAI, Grok, Perplexity 동시 쿼리 |
| claude-concilium | MCP 프로토콜로 여러 LLM 병렬 상담, API 키 불필요 |

**추천 상황**: 중요한 아키텍처 결정 시 다양한 AI 모델의 관점을 비교하고 싶을 때.

---

### 2.4 Compound Engineering Plugin - PR에서 CLAUDE.md 자동 업데이트

**출처**: EveryInc/compound-engineering-plugin

**개요**: Every.to가 개발한 "복리 엔지니어링" 플러그인. 에이전트가 실수할 때마다 CLAUDE.md에 메모를 추가하여 매 세션마다 점진적으로 개선되는 시스템을 구축.

**핵심 기능**:
- `/ce:brainstorm`: 인터랙티브 Q&A를 통해 아이디어를 요구사항 계획으로 정제
- `/ce:plan`: 요구사항 문서나 상세 아이디어를 에이전트가 작업할 수 있는 기술 계획으로 변환
- 에이전트의 성공과 실패를 시스템에 피드백하여 다음 루프를 개선

**설치**:
```bash
/plugin marketplace add EveryInc/compound-engineering-plugin
/plugin install compound-engineering
```

**추천 상황**: 장기 프로젝트에서 에이전트가 반복적인 실수를 하지 않도록 학습 시스템을 구축하고 싶을 때. "같은 실수를 두 번 하지 마라" 철학.

---

## 3. Skills (공식 & 커뮤니티)

### 3.1 react-best-practices (Vercel Labs)

**개요**: Vercel이 공식 제공하는 React 베스트 프랙티스 Agent Skill. Claude Code가 cascading useEffect나 무거운 클라이언트 사이드 import를 발견하면 자동으로 더 나은 패턴을 제안.

**핵심 기능** (57개 규칙):
- Compound Components (공유 컨텍스트)
- State Decoupling (인터페이스 기반 상태 분리)
- Explicit Variant Components (boolean 모드 대신 명시적 변형)
- React 19+ 패턴 (forwardRef 건너뛰기 등)
- 성능 최적화 패턴

**설치**:
```bash
npx skills add vercel-labs/agent-skills
```

**추천 상황**: React 프로젝트에서 에이전트가 생성하는 코드의 품질을 높이고 싶을 때. 특히 대규모 React 앱의 리팩토링 시.

---

### 3.2 supabase-postgres-best-practices

**개요**: Supabase가 공식 제공하는 PostgreSQL 최적화 스킬. DB 스키마 설계, 쿼리 최적화, 인덱싱 전략 등을 에이전트에게 가르침.

**설치**:
```bash
npx skills add supabase/agent-skills
```

**추천 상황**: Supabase/PostgreSQL 기반 프로젝트에서 DB 관련 코드의 품질을 보장하고 싶을 때.

---

### 3.3 ui-skills (ibelick)

**개요**: AI 에이전트가 만든 인터페이스를 "polish"하기 위한 UI/UX 스킬 모음. 15종의 opinionated 스킬 제공.

**주요 스킬**:
| 스킬 | 설명 |
|------|------|
| `baseline-ui` | 애니메이션 시간, 타이포그래피 스케일, 컴포넌트 접근성, Tailwind CSS 레이아웃 안티패턴 검증 |
| `web-design-guidelines` | 100+ 규칙 (접근성, 성능, UX) 기반 UI 코드 리뷰 |
| `fixing-accessibility` | ARIA 레이블, 키보드 내비게이션, 포커스 관리, 색상 대비, 폼 에러 |
| `fixing-metadata` | 메타데이터 최적화 |
| `fixing-motion-performance` | 애니메이션 성능 최적화 |
| `12-principles-of-animation` | 애니메이션 12원칙 적용 |
| `canvas-design` | Canvas 기반 디자인 |
| `frontend-design` | 프론트엔드 디자인 가이드라인 |
| `interaction-design` | 인터랙션 디자인 |
| `interface-design` | 인터페이스 디자인 |
| `swiftui-ui-patterns` | SwiftUI UI 패턴 |
| `wcag-audit-patterns` | WCAG 감사 패턴 |

**설치**:
```bash
npx skills add ibelick/ui-skills
```

**추천 상황**: 프론트엔드 개발 시 에이전트가 만든 UI의 접근성, 디자인 품질, UX를 자동으로 검증하고 개선하고 싶을 때.

---

### 3.4 BMAD Method - Agile AI Driven Development

**개요**: "Breakthrough Method for Agile AI-Driven Development". 가장 포괄적인 Agile AI 개발 프레임워크로, 버그 수정부터 엔터프라이즈 시스템까지 규모 적응형 지능을 제공. GitHub 33.4k stars.

**핵심 기능**:
- AI 에이전트 기반 역할 시스템 (PM, Architect, Developer, QA 등)
- 규모 적응형: 작은 버그 수정에서 대규모 엔터프라이즈 시스템까지
- 워크플로우 자동화 및 프롬프트 파일 자동 생성
- 다중 IDE 지원 (Claude Code, Cursor 등)

**설치**:
```bash
npx bmad-method install
# 설치 시 Claude Code를 IDE로 선택
# 워크플로우와 에이전트 활성화 프롬프트 파일이 자동 생성됨
```

**현재 버전**: 6.2.2

**추천 상황**: 구조화된 Agile 개발 프로세스를 AI 에이전트와 함께 수행하고 싶을 때. 특히 팀 단위 프로젝트에서 역할 기반 워크플로우가 필요할 때.

---

### 3.5 bkit - PDCA 기반 체계적 개발

**개요**: Plan-Do-Check-Act(PDCA) 방법론과 9단계 개발 파이프라인을 통한 체계적 AI 소프트웨어 개발 플러그인.

**핵심 기능**:
- **PDCA 사이클**: Plan -> Design -> Do -> Check -> Act
- **핵심 명령어**: plan, design, do, analyze, iterate, report, archive, cleanup, status, next
- **Team Mode**: 16개 에이전트 기반 멀티 에이전트 협업 (CTO-Led)
- **자동 메모리**: `.bkit-memory.json`으로 프로젝트 기억 관리
- **자동 트리거**: "plan", "design", "analyze", "report", "status" 키워드로 자동 활성화

**설치**:
```bash
npx skills add popup-studio-ai/bkit-claude-code
```

**현재 버전**: 1.5.8

**추천 상황**: 체계적인 개발 프로세스(계획 -> 설계 -> 구현 -> 검증 -> 개선)를 AI와 함께 반복하고 싶을 때.

---

### 3.6 Skill Creator - 공식 스킬 테스트/측정/개선 프레임워크

**개요**: Anthropic 공식 메타 스킬. 스킬을 만들고, 테스트하고, 측정하고, 개선하는 도구. 2026년 3월 업데이트로 자동 evals, 벤치마크, 블라인드 A/B 테스트, 트리거 튜닝 기능이 추가됨.

**4가지 모드**:
| 모드 | 설명 |
|------|------|
| **Create** | 인터뷰, 리서치, 초안, 테스트 - 새 스킬 처음부터 제작 |
| **Eval** | 테스트 프롬프트로 스킬 실행, 출력 평가 - 스킬 동작 검증 |
| **Improve** | 실행, 평가, 블라인드 A/B 비교, 분석, 반복 - 스킬 개선 |
| **Benchmark** | 분산 분석이 포함된 다중 실행 - 통계적 영향 측정 |

**핵심 차이점**:
- Skills 1.0 (2025년 10월): 정적 SKILL.md 템플릿
- Skills 2.0 (2026년 3월): 자동 피드백 루프, 자연어 기반 테스트

**설치**: Claude Code에 기본 내장 (별도 설치 불필요)

**추천 상황**: 자체 커스텀 스킬을 만들고 그 효과를 데이터로 검증하고 싶을 때. 엔지니어가 아닌 프로세스 전문가도 사용 가능.

---

### 3.7 Antigravity Awesome Skills - 1,340+ 스킬 라이브러리

**개요**: Claude Code, Cursor, Codex CLI, Gemini CLI 등에 호환되는 1,340개 이상의 에이전트 스킬 라이브러리. GitHub 29k+ stars.

**설치**:
```bash
# 전체 라이브러리 설치
npx antigravity-awesome-skills

# Claude Code 전용 설치
npx antigravity-awesome-skills --claude

# 다른 도구 전용
npx antigravity-awesome-skills --codex
npx antigravity-awesome-skills --cursor
npx antigravity-awesome-skills --gemini
```

**카테고리**: 개발, 테스팅, 보안, 인프라, 프로덕트, 마케팅 전반을 커버.

**추천 상황**: 다양한 분야의 스킬을 한 번에 대량으로 설치하고 싶을 때. 탐색용으로도 좋음.

---

## 4. 브라우저 연동

### 4.1 agent-browser (Vercel Labs) - CLI 기반 브라우저 자동화

**개요**: AI 에이전트를 위한 브라우저 자동화 CLI. Playwright MCP 대비 **93% 컨텍스트 절감** (200-400 토큰 vs 3,000-5,000 토큰).

**아키텍처**: CLI 명령 -> Rust 바이너리 (JSON 변환) -> Node.js 데몬 -> Chromium (Playwright)

**핵심 워크플로우**:
```bash
# 1. 페이지 열기
agent-browser open https://example.com

# 2. 인터랙티브 요소 스냅샷 (각 요소에 @e1, @e2 같은 ref 부여)
agent-browser snapshot -i

# 3. 요소와 상호작용
agent-browser click @e1
agent-browser fill @e2 "search text"
```

**호환 도구**: Claude Code, Cursor, GitHub Copilot, OpenAI Codex, Google Gemini, opencode 등

**설치**:
```bash
npx skills add vercel-labs/agent-browser
```

**장점**:
- 컨텍스트 효율성이 압도적 (접근성 트리 기반)
- 세션 관리 및 타임아웃 처리 내장
- standalone CLI로 Claude Code에서 bash로 직접 호출

**단점**:
- 시각적 확인이 어려움 (접근성 트리 기반이므로)
- 복잡한 SPA에서 일부 제한

**추천 상황**: 에이전트가 웹 페이지와 상호작용해야 할 때 (테스트, 스크래핑, 폼 입력 등). Playwright MCP보다 토큰 효율이 중요할 때.

---

### 4.2 Agentation - 요소 선택 -> CSS 선택자 자동 캡처

**개요**: 화면의 아무 요소나 클릭하면 CSS 선택자와 위치 정보를 자동 추출하는 시각적 피드백 도구. Coinbase Base의 디자인 헤드 Benji Taylor가 개발. 170K+ npm 다운로드.

**출력 모드 4가지**:
| 모드 | 내용 |
|------|------|
| Compact | 선택자 + 메모만 |
| Standard | 위치, 선택된 텍스트 추가 |
| Detailed | 바운딩 박스, 주변 컨텍스트 포함 |
| Forensic | computed styles까지 전체 캡처 |

**사용법**: React 컴포넌트로 레이아웃에 추가 -> 코너에 툴바 표시 -> 클릭으로 어노테이션 -> 출력을 복사해서 에이전트에 붙여넣기

**출력 형식**: 마크다운 (Claude Code, Cursor 등 어디서든 호환)

**추천 상황**: 에이전트에게 "이 버튼의 색상을 바꿔줘"처럼 시각적 UI 수정을 지시할 때. 에이전트가 정확한 CSS 선택자를 알 수 있어 자율적 UI 수정이 가능.

---

### 4.3 Claude in Chrome - 브라우저 확장

**개요**: Anthropic 공식 Chrome 확장. AI 어시스턴트가 브라우저에서 직접 작동하며, 웹사이트 탐색, 폼 입력, 데이터 추출, 멀티스텝 워크플로우를 자연어 대화로 수행.

**핵심 기능**:
- Claude Code 연동: build-test-fix 루프 원활 작동
- 워크플로우 녹화 기능
- 예약 작업 (스케줄에 따라 자동 실행)
- Planning Mode: 계획 한 번 승인하면 독립 실행
- 멀티탭 워크플로우: 여러 탭에서 동시 작업

**요구사항**:
- Claude Code v2.0.73+
- Chrome 확장 v1.0.36+
- 유료 Anthropic 구독 (Pro, Max, Teams, Enterprise)

**추천 상황**: 웹 앱 테스트, 디버깅(콘솔 로그 확인), 폼 자동 입력, 웹 데이터 추출이 필요할 때.

---

## 5. MCP 서버 (Model Context Protocol)

### 5.1 Playwright MCP (Microsoft)

**개요**: Microsoft 공식 브라우저 자동화 MCP 서버. 구조화된 접근성 트리로 페이지와 상호작용하여 스크린샷 의존보다 빠르고 가볍고 안정적.

**핵심 기능**: 네비게이션, 클릭, 폼 입력, 스크린샷, E2E 테스트

**설치**:
```bash
claude mcp add playwright -- npx @anthropic-ai/playwright-mcp
```

**장점**: 안정적, 브라우저 자동화의 사실상 표준
**단점**: 컨텍스트 토큰 소비가 큼 (agent-browser 대비)

---

### 5.2 Context7 - 라이브러리 문서 실시간 조회

**개요**: 모든 라이브러리/프레임워크의 최신 버전별 문서를 실시간으로 가져와 LLM 컨텍스트에 주입. API 키 불필요, 즉시 사용 가능.

**핵심 기능**:
- 현재 라이브러리 문서를 해결하고 대화에 주입
- 버전별 문서 제공
- "안다고 생각해도 사용하라" - 학습 데이터에 최신 변경사항이 반영되지 않았을 수 있음

**설치**:
```bash
claude mcp add context7 -- npx @anthropic-ai/context7-mcp
```

**추천 상황**: 라이브러리 API 구문, 설정, 버전 마이그레이션, 디버깅 등 모든 라이브러리 관련 작업. 웹 검색보다 정확하고 빠름.

---

### 5.3 GitHub MCP (GitHub 공식)

**개요**: GitHub 공식 MCP 서버. 풀 레포 관리 기능과 제로 셋업 리모트 엔드포인트를 제공하는 가장 필수적인 MCP 서버.

**설치**:
```bash
# HTTP Transport (OAuth 기반, 권장)
claude mcp add github --transport http https://api.github.com/mcp

# NPX 방식 (PAT 기반)
claude mcp add github -- npx @anthropic-ai/github-mcp --token YOUR_PAT
```

**핵심 기능**: Issue 관리, PR 생성/리뷰, 코드 검색, 레포 관리, 브랜치 작업

---

### 5.4 Exa MCP - AI 네이티브 웹 검색

**개요**: Claude Code에 실시간 웹 검색 기능을 추가하는 MCP 서버. GitHub 코드, Stack Overflow, 공식 문서에서 작동하는 코드 예제를 검색.

**핵심 기능**:
- `web_search_exa`: 일반 웹 검색
- `get_code_context_exa`: GitHub repos, Stack Overflow, 공식 문서에서 코드 검색
- `crawling_exa`: 웹 크롤링
- 날짜 필터 지원 (최근 몇 시간/일의 결과만)

**설치**:
```bash
# HTTP 기반 (권장)
claude mcp add exa --transport http https://mcp.exa.ai/mcp
```

**추천 상황**: 최신 API 변경사항 확인, 라이브러리 사용 예제 검색, 현재 이벤트/뉴스 조회.

---

### 5.5 Sentry MCP - 에러 모니터링

**개요**: Sentry 호스팅 리모트 MCP 서버. OAuth 인증 기반으로 설치 불필요.

**핵심 기능**:
- 에러 검색 (파일/프로젝트 횡단)
- 상세 이슈 조사
- Seer 통합: AI 기반 근본 원인 분석 및 코드 수정 추천

**설치**:
```bash
claude mcp add --transport http sentry https://mcp.sentry.dev/mcp
# 또는 플러그인으로
claude plugin marketplace add getsentry/sentry-mcp
```

---

### 5.6 Slack MCP - 팀 커뮤니케이션 연동

**개요**: Slack 워크스페이스와 Claude Code를 연결. 채널 읽기, 메시지 전송, 대화 이력 검색 가능.

**설치**: 플러그인 로드 시 자동 설정, OAuth로 인증

**추천 상황**: 팀 컨텍스트가 Slack에 있을 때. 에이전트가 관련 스레드를 참고하거나 작업 완료 시 알림 전송.

---

### MCP 서버 요약 비교

| 서버 | 설정 난이도 | 토큰 사용량 | API 키 필요 | 주요 용도 |
|------|-----------|-----------|-----------|----------|
| Playwright | 쉬움 | 높음 | 불필요 | 브라우저 자동화 |
| Context7 | 쉬움 | 낮음 | 불필요 | 라이브러리 문서 |
| GitHub | 쉬움 | 중간 | OAuth/PAT | 코드 관리 |
| Exa | 쉬움 | 중간 | 불필요 | 웹 검색 |
| Sentry | 쉬움 | 중간 | OAuth | 에러 모니터링 |
| Slack | 중간 | 중간 | Bot Token | 팀 커뮤니케이션 |

---

## 6. 모니터링 및 기타 도구

### 6.1 Claude HUD - 실시간 컨텍스트 모니터링

**개요**: Claude Code에 실시간 컨텍스트 추적, 도구 모니터링, 에이전트 가시성을 추가하는 무료 오픈소스 플러그인.

**핵심 기능**:
- 토큰 소비량 실시간 추적 (네이티브 토큰 데이터 사용, 근사치 아님)
- 실시간 세션 비용 모니터링
- 색상 코드 컨텍스트 바: 초록(70% 미만), 노랑(70-85%), 빨강(85% 이상)
- 활성 도구 및 에이전트 모니터링

**설치**:
```bash
/plugin marketplace add jarrodwatts/claude-hud
/plugin install claude-hud
```

---

### 6.2 Claude Dashboard - 종합 상태바

**개요**: 모델 정보, 컨텍스트 프로그레스 바, 비용, 레이트 리밋, 고갈 시간, 도구/에이전트 상태, 캐시 히트, 성능 뱃지 등을 표시하는 종합 상태 라인 플러그인.

**설치**:
```bash
/plugin marketplace add uppinote20/claude-dashboard
/plugin install claude-dashboard
```

---

### 6.3 Claude Code Usage Monitor - 터미널 모니터링

**개요**: 실시간 터미널 모니터링 도구. 토큰 소비량, 번 레이트, 비용 분석, 세션 한도 예측.

**GitHub**: https://github.com/Maciek-roboblog/Claude-Code-Usage-Monitor

---

### 6.4 Skill Creator (Anthropic 공식)

위 3.6 항목 참고. 스킬 테스트/측정/개선을 위한 공식 메타 스킬.

---

## 종합 추천: 상황별 도구 선택 가이드

### 즉시 도입 추천 (필수급)
| 도구 | 이유 |
|------|------|
| **Oh My Claude Code** | 멀티 에이전트 오케스트레이션의 사실상 표준. 비용 최적화 + 생산성 3-5배 |
| **claude-mem** | 세션 간 기억 유지의 핵심. 장기 프로젝트 필수 |
| **Context7 MCP** | 라이브러리 문서 조회. API 키 불필요, 즉시 사용 |
| **GitHub MCP** | 코드 관리 자동화. 필수 |

### 프론트엔드 개발자
| 도구 | 이유 |
|------|------|
| **react-best-practices** | React 코드 품질 자동 향상 |
| **ui-skills** | UI/UX 가이드라인 자동 적용 |
| **agent-browser** | 브라우저 기반 테스트/검증 |
| **Agentation** | 시각적 UI 수정 지시 |

### 팀 프로젝트
| 도구 | 이유 |
|------|------|
| **BMAD Method** | 구조화된 Agile AI 개발 |
| **session-wrap** | 세션 종료 시 학습 축적 |
| **Compound Engineering** | 점진적 시스템 개선 |
| **Slack MCP** | 팀 커뮤니케이션 연동 |

### 디버깅/모니터링
| 도구 | 이유 |
|------|------|
| **Sentry MCP** | 에러 추적 및 AI 기반 수정 |
| **Claude HUD** | 토큰/비용 실시간 모니터링 |
| **Exa MCP** | 최신 솔루션 웹 검색 |

---

## 부록: 빠른 설치 명령어 모음

```bash
# === Oh My Claude Code ===
/plugin marketplace add https://github.com/Yeachan-Heo/oh-my-claudecode
/plugin install oh-my-claudecode
/omc-setup

# === Plugins ===
/plugin marketplace add thedotmack/claude-mem
/plugin marketplace add team-attention/plugins-for-claude-natives
/plugin marketplace add EveryInc/compound-engineering-plugin

# === Skills ===
npx skills add vercel-labs/agent-skills          # React Best Practices
npx skills add supabase/agent-skills             # Supabase Postgres
npx skills add ibelick/ui-skills                 # UI/UX Skills
npx skills add vercel-labs/agent-browser          # Browser Automation
npx skills add popup-studio-ai/bkit-claude-code   # bkit PDCA
npx bmad-method install                           # BMAD Method
npx antigravity-awesome-skills --claude           # 1,340+ Skills

# === MCP Servers ===
claude mcp add playwright -- npx @anthropic-ai/playwright-mcp
claude mcp add context7 -- npx @anthropic-ai/context7-mcp
claude mcp add github --transport http https://api.github.com/mcp
claude mcp add exa --transport http https://mcp.exa.ai/mcp
claude mcp add --transport http sentry https://mcp.sentry.dev/mcp

# === Monitoring ===
/plugin marketplace add jarrodwatts/claude-hud
/plugin marketplace add uppinote20/claude-dashboard
```
