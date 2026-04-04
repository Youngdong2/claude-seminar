# Claude Code 고수들은 이렇게 쓴다: 생산성 극대화 꿀팁 모음

- **출처**: 블로그 (훈스로그)
- **작성자**: 박승훈 (FE Developer)
- **링크**: https://blog.huns.site/posts/ai/claude/claude-code-power-user-tips
- **작성일**: 2026-02-05
- **읽는 시간**: 30분
- **태그**: claude code, CLAUDE.md, multi-agent, skill, plugin, hooks, workflow

---

## 참고 링크 모음

### 공식/핵심 자료
- CLAUDE.md 이렇게 쓰면 정말 편합니다 - 요즘IT
- The Complete Guide to CLAUDE.md - Builder.io
- CLAUDE.md Best Practices from Prompt Learning - Arize
- Using CLAUDE.MD files - Claude Blog
- Write an effective CLAUDE.md - Claude 공식 문서

### 멀티에이전트 / 방법론
- Swarm 가이드 - Kieran Klaassen
- Oh My Claude Code (Oh My OpenCode 후속)
- BMAD Quick Start: `npx bmad-method install`
- BMAD 비추 의견 포스팅: https://www.linkedin.com/posts/sangrok-jung-9ab787311_ai-코딩-에이전트-세팅-activity-7416114356561661952
- bkit: https://www.bkit.ai/ (PDCA 기반 구조화 개발 도구)
- bkit 개념 정리 - tilnote
- bkit 소개 영상: https://www.youtube.com/watch?v=EZwffHVx05U

### Plugin / Skill
- claude-mem: https://github.com/thedotmack/claude-mem
- claude-mem 소개 영상 (황경찬): https://www.youtube.com/watch?v=G25R0-mYcvE
- claude-mem 아키텍처 까보기 - 황경찬 블로그
- react-best-practices: https://vercel.com/blog/introducing-react-best-practices
- supabase-postgres-best-practices: https://github.com/supabase/agent-skills
- session-wrap & clarify: https://github.com/team-attention/plugins-for-claude-natives
- 정구봉 session-wrap 소개: https://www.linkedin.com/posts/gb-jeong_저는-claude-code-세션이-끝날-때마다-wrap-activity-7415878861919379456
- rams.ai (부분 유료): 실시간 디자인 피드백
- ui-skills (무료): https://github.com/ibelick/ui-skills (15종 UI/UX 가이드라인)
- Web Interface Guidelines: 웹 인터페이스 설계 원칙
- design-plugin: UI 변형 생성/비교

### 브라우저 연동
- agentation: 요소 선택 → CSS 선택자 자동 캡처 (제로초 유튜브 쇼츠: https://www.youtube.com/shorts/ZxwgDcGJExs)
- agent-browser: https://agent-browser.dev/ (Vercel Labs, CLI 기반)
- Playwright MCP와 비교 영상: https://www.youtube.com/watch?v=7aEQnTsI6zs

### 기타 팁
- ykdojo의 40+ Tips
- DataCamp Hooks 튜토리얼
- Butler's Log 블로그 Hooks 활용
- LLM 시점 편향 극복: https://lucylog.tistory.com/26
- 생산성 10배 높이는 20가지 CLI 명령어 - Apidog
- 단축키 Top 7 - 송범근 LinkedIn
- Boris의 Claude Code 활용 팁 - LinkedIn 정리 글

### 관련 포스트 (같은 블로그)
- Skill이 발동되지 않는 문제, subagent로 해결하기 (26.02.07)
- Command, Skill, Subagent, Hooks 알아보기 (26.02.03)
- 토큰 사용량 확인: claude-dashboard & claude-ultimate-hud (26.01.30)
- 커뮤니티를 집어삼킨 Claude Code, 정식 지원 기능들 (26.03.09)

---

## 1. 기본 주축의 개선

### 1-1. Spec-Based Workflow (ykdojo)

| 단계 | 내용 |
|------|------|
| **세션 1** | 최소한의 스펙 작성 → Claude가 AskUserQuestion으로 요구사항 인터뷰 → 스펙 문서 완성 |
| **세션 2** | 완성된 스펙 기반으로 새 세션에서 구현 |

핵심: 컨텍스트를 분리하여 구현 세션에서는 코드 작성에만 집중

### 1-2. Hooks 활용 실전

| Hook | 용도 | 설명 |
|------|------|------|
| `PostToolUse` | 자동 포매팅 | `Edit\|Write` 매처로 Prettier/ESLint 자동 실행 |
| `PreToolUse` | 보안 검증 | 위험한 명령어 차단 (exit code 2로 블록) |
| `Stop` | 데스크톱 알림 | macOS `osascript`로 작업 완료 알림 |
| `PreToolUse` + `PostToolUse` | 세션별 Git 관리 | 세션별 독립 Git 인덱스 생성, 변경 파일만 스테이징 |

> Commands, Skills, Subagents = "무엇을 하는가" / Hooks = "언제 자동으로 동작하는가"

### 1-3. CLAUDE.md 최적화

#### 핵심 원칙

**1) 가볍게 유지 (2.5k 토큰 이내)**
- Boris Cherny (Claude Code 창시자) 팀의 기준
- 각 줄마다 "이걸 지우면 Claude가 실수하나?" 자문 → 아니면 삭제
- 상세 가이드는 Skills로 이동, CLAUDE.md에는 핵심만

```markdown
# Good: 핵심만 기록
## Skill 실행
1. skill-manager 에이전트 호출
2. summary.json의 skill_eval에서 activate: true인 skill의 SKILL.md 읽고 실행

# Bad: 수십 줄의 상세 규칙을 CLAUDE.md에 직접 기록
```

**2) 반복 실수를 기록**
- PR에 `@.claude` 태그 → 학습 내용을 CLAUDE.md에 반영
- 주 수회 업데이트

```markdown
## 주의사항
- Push 승인 필수: 커밋 목록 보여주고 명시적 허락 후 푸시
- Node.js >= 20 필수 (19 이하는 빌드 실패)
- 환경변수는 .env.local에 저장 (.env 사용 금지)
```

**3) 컴팩션 지침 포함**

```markdown
## 컴팩션 규칙
- 컴팩션 시 수정된 파일 목록을 항상 보존하라
- 테스트 명령어와 실행 결과를 보존하라
- summary.json의 skill_eval은 절대 삭제하지 마라
```

**4) 디렉토리별 분산**

```
/
├── CLAUDE.md              (전체 프로젝트 규칙)
├── apps/web/CLAUDE.md     (웹 앱 전용 규칙)
└── packages/ui/
```

#### 추가 팁
- 몇 주에 한 번 Claude에게 CLAUDE.md 자체를 리뷰시키기
- "IMPORTANT", "YOU MUST" 같은 강조 표현으로 준수율 높이기
- CLAUDE.md를 코드처럼 관리: 리뷰, 정리, 행동 변화 관찰

#### 안티패턴
- 모든 것을 CLAUDE.md에 넣기 (토큰 소모 주범)
- 모호한 지시 ("잘 작성하라", "효율적으로 하라")
- Skills와 내용 중복
- 디렉토리별 규칙 충돌

### 1-4. Reliable Skill Activation (스킬 발동률 개선)

- 문제: Skill 발동률이 낮음 (20%)
- 해결: `UserPromptSubmit` Hook으로 매 요청마다 Skill Manager 호출
- Subagent가 각 Skill 발동 여부를 이유와 함께 판단

```json
{
  "skill_eval": {
    "post-management": { "activate": true, "reason": "..." },
    "git-workflow": { "activate": false, "reason": "..." }
  }
}
```

- 참고: 송범근 - Claude Skill 발동률 20% → 84% 만드는 방법
- 참고: Scott Spence - How to make Claude Code skills activate reliably

---

## 2. Multi-Agent Orchestration

### 2-1. Swarm 패턴

| 패턴 | 설명 | 활용 예시 |
|------|------|----------|
| **Fan-Out** | 작업을 여러 Agent에게 분배 | 대규모 코드 리뷰 |
| **Pipeline** | 순차적 체인 | 보안 감사 → 수정 → 검증 |
| **Map-Reduce** | 병렬 처리 후 집계 | 파일별 분석 → 종합 보고 |

- Oh My Claude Code 실행 모드: Autopilot(자율), Ultrapilot(3~5배 병렬), Swarm(협업), Pipeline(순차), Ecomode(토큰 절약)

### 2-2. BMAD (Breakthrough Method for Agile AI Driven Development)

- GitHub Star: 33.4k
- 9개 전문 Skill이 순차 협업

```
Business Analyst → Product Manager → System Architect
        → Scrum Master → Developer → UX Designer
```

- 각 Agent가 산출물(PRD, 유저 스토리, 아키텍처 문서) 생성 → 다음 단계로 전달
- 토큰 효율 70~85% 개선
- 설치: `npx bmad-method install`
- **주의**: BMAD 비추 의견도 있음 → Boris 방식 또는 Oh My Claude Code 추천하는 견해

### 2-3. bkit

- https://www.bkit.ai/
- PDCA(Plan-Do-Check-Act) 사이클 + Anthropic의 Evaluator-Optimizer 패턴 결합
- "AI에게 부탁하는 개발" → "구조화된 프로세스를 가진 개발"
- 한글 대표 페이지 제공, bkit-starter로 초보자 도입 지원

---

## 3. 100초 도입 Skill & Plugin 모음

### 3-1. claude-mem (세션 간 기억 저장)

```bash
/plugin marketplace add thedotmack/claude-mem
/plugin install claude-mem
```

- 세션 간 대화를 저장하고 찾아올 수 있음
- "일기를 쓰고 필요할 때 다시 찾아보는" 방식

### 3-2. react-best-practices (Vercel)

```bash
npx skills add vercel-labs/agent-skills
```

- 8개 카테고리, 57개 rule
- Priority별 분류: Eliminating Waterfalls(CRITICAL) → Bundle Size(CRITICAL) → Server-Side(HIGH) → ... → Advanced Patterns(LOW)
- React/Next.js 학습에도 활용 가능

### 3-3. supabase-postgres-best-practices

```bash
# npx
npx skills add supabase/agent-skills

# claude code plugin
/plugin marketplace add supabase/agent-skills
/plugin install postgres-best-practices@supabase-agent-skills
```

- 쿼리 성능, 보안(RLS), 스키마 설계 등 8개 범주
- 수십만 프로젝트에서 반복 발생한 오류 기반 해결 가이드

### 3-4. session-wrap & clarify (정구봉 / team-attention)

```bash
/plugin marketplace add team-attention/plugins-for-claude-natives
/plugin install session-wrap
```

- **session-wrap**: 세션 종료 시 `/wrap`으로 핵심 내용을 장기 기억으로 저장
- **clarify**: AI의 질문으로 모호한 요구사항을 구체적 명세로 변환
- **agent-council**: 여러 AI Agent 의견 종합
- **kakaotalk**: macOS에서 카카오톡 메시지 발송

### 3-5. UI 관련 Skill

```bash
# ui-skills (무료, 15종 UI/UX 가이드라인)
npx skills add ibelick/ui-skills
```

- **rams.ai** (부분 유료): 실시간 디자인 피드백, 접근성, AI Slop 방지
- **ui-skills** (무료): 15종 UI/UX 디자인 가이드라인

---

## 4. CLI 단축키

| 단축키 | 기능 |
|--------|------|
| `Ctrl+Z` | Claude를 백그라운드로 보내고 터미널 사용, `fg`로 복귀 |
| `!` | 입력창에서 바로 터미널 명령어 실행 |
| `Ctrl+G` | 멀티라인 편집기 열기 (긴 프롬프트 작성 시) |
| `Ctrl+S` | 프롬프트 임시 저장(Stash) / 복원 |
| `Esc+Esc` | 코드 + 대화 함께 롤백 (rewind) |
| `Ctrl+W` | 단어 단위 삭제 |
| `Ctrl+A` / `Ctrl+E` | 줄 처음 / 끝으로 이동 |
| `Ctrl+U` / `Ctrl+K` | 커서 이전 / 이후 전체 삭제 |
| `Ctrl+J` | 개행 |

---

## 5. LLM 시점 편향 극복하기

### Claude Code가 "산으로 가는" 5가지 원인

1. **시점 편향 (Recency Bias)**: 초반 중요 규칙보다 직전 사소한 요청에 강하게 반응
2. **오류 중첩 (Error Cascading)**: 버그 수정 → 새 에러 → 기존 기능 파괴 연쇄
3. **스펙 모호성**: 모호한 지시 → 학습 데이터에서 확률 높은 방식으로 추측 구현
4. **Lost in the Middle**: 긴 코드 중간 부분 인식률 급락
5. **컨텍스트 포화**: 대화 길어지면 초기 규칙 망각

### 개선 방법

1. **세션 리프레시**: 핵심 코드와 진행 상황만 요약 → 새 대화 시작 (`/clear`)
2. **불필요한 로그 차단**: 필요한 부분만 잘라서 보여주기
3. **체크포인트 활용**: 중요 지점마다 요약 → 새 세션 (session-wrap 활용)
4. **CLAUDE.md 작성**: 프로젝트 개요, 기술 스택, 스타일 가이드, 제약 조건

---

## 6. Boris (Claude Code 창시자)의 활용 팁 12가지

| # | 팁 | 설명 |
|---|-----|------|
| 1 | 병렬 세션 | 터미널 5개 + 웹 5~10개 동시 운용 |
| 2 | Opus 4.5 사용 | 느리지만 도구 사용 능력 우수 → 결과적으로 빠름 |
| 3 | CLAUDE.md 팀 공용 | 실수마다 규칙 추가, Git 관리 |
| 4 | PR에서 자동 업데이트 | `@claude` 태그로 학습 반영 (Compounding Engineering Plugin) |
| 5 | Plan Mode 우선 | `Shift+Tab` 두 번 → 계획 모드 → 계획 확정 후 코딩 |
| 6 | 슬래시 커맨드 | `/commit-push-pr` 등 `.claude/commands/`에 저장 |
| 7 | Sub-Agent 전문화 | `code-simplifier`, `verify-app` 등 목적별 분리 |
| 8 | PostToolUse 훅 | 코드 생성 직후 포매팅 자동 실행 |
| 9 | 보안 권한 관리 | `--dangerously-skip-permissions` 대신 `settings.json`에 안전 명령어 등록 |
| 10 | MCP 외부 연동 | Slack, BigQuery, Sentry 등 `.mcp.json`으로 연동 |
| 11 | 백그라운드 Agent | 긴 작업은 백그라운드 실행 |
| 12 | 검증 수단 제공 | Claude Chrome 확장으로 스스로 검증하는 피드백 루프 구성 |

---

## 7. 브라우저 연동 도구

### agentation
- 요소 클릭 → CSS 선택자/클래스명 자동 캡처
- 텍스트, 요소, 영역 등 다양한 범위 선택
- npm 또는 Claude Code Skill로 설치

### agent-browser (Vercel Labs)
- https://agent-browser.dev/
- CLI 기반, bash 있으면 어디서든 사용
- Playwright MCP 대비 최대 93% 컨텍스트 절감

| 비교 | agent-browser | Playwright MCP |
|------|--------------|----------------|
| 기반 | CLI | MCP 프로토콜 서버 |
| 장점 | 다양한 환경, 비용 최적화 | MCP 생태계 표준 |
| 토큰 | 긴 플로우에서 유리 | 짧은 시나리오 차이 없음 |
