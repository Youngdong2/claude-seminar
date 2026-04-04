# Claude Code 확장하기 (공식 문서)

- **출처**: Claude Code 공식 문서
- **링크**: https://code.claude.com/docs/ko/features-overview
- **관련 링크**:
  - [Claude Code 작동 방식](https://code.claude.com/docs/ko/how-claude-code-works)
  - [내장 도구](https://code.claude.com/docs/ko/how-claude-code-works#tools)
  - [CLAUDE.md (메모리)](https://code.claude.com/docs/ko/memory)
  - [Skills](https://code.claude.com/docs/ko/skills)
  - [MCP](https://code.claude.com/docs/ko/mcp)
  - [Subagents](https://code.claude.com/docs/ko/sub-agents)
  - [Agent Teams](https://code.claude.com/docs/ko/agent-teams)
  - [Hooks](https://code.claude.com/docs/ko/hooks)
  - [Hooks 가이드](https://code.claude.com/docs/ko/hooks-guide)
  - [Plugins](https://code.claude.com/docs/ko/plugins)
  - [Plugin Marketplaces](https://code.claude.com/docs/ko/plugin-marketplaces)
  - [CLAUDE.md 파일 로드 방식](https://code.claude.com/docs/ko/memory#how-claudemd-files-load)
  - [.claude/rules/](https://code.claude.com/docs/ko/memory#organize-rules-with-clauderules)
  - [Skill 검색](https://code.claude.com/docs/ko/skills#where-skills-live)
  - [Subagent 범위](https://code.claude.com/docs/ko/sub-agents#choose-the-subagent-scope)
  - [MCP 범위](https://code.claude.com/docs/ko/mcp#scope-hierarchy-and-precedence)
  - [Plugins 네임스페이스](https://code.claude.com/docs/ko/plugins#add-skills-to-your-plugin)
  - [설정](https://code.claude.com/docs/ko/settings#settings-files)
  - [모범 사례](https://code.claude.com/docs/ko/best-practices)

---

## 개요

Claude Code는 코드를 추론하는 모델과 파일 작업, 검색, 실행 및 웹 접근을 위한 **내장 도구**를 결합합니다. 이 문서는 기본 제공 도구 위에 추가하는 **확장 계층**을 다룹니다.

### 확장 계층

| 확장 | 역할 |
|------|------|
| **CLAUDE.md** | 모든 세션에서 로드되는 지속적인 컨텍스트 |
| **Skills** | 재사용 가능한 지식과 호출 가능한 워크플로우 |
| **MCP** | 외부 서비스 및 도구 연결 |
| **Subagents** | 격리된 컨텍스트에서 자신의 루프를 실행하고 요약 반환 |
| **Agent Teams** | 공유 작업 및 피어 투 피어 메시징으로 여러 독립 세션 조정 |
| **Hooks** | 결정론적 스크립트로 루프 외부에서 실행 |
| **Plugins & Marketplaces** | 기능 패키징 및 배포 |

> **처음 사용자**: 프로젝트 규칙을 위해 CLAUDE.md로 시작하세요. 필요에 따라 다른 확장을 추가하세요.

---

## 기능을 목표에 맞추기

| 기능 | 수행 작업 | 사용 시기 | 예시 |
|------|----------|----------|------|
| **CLAUDE.md** | 모든 대화에서 로드되는 지속적 컨텍스트 | 프로젝트 규칙, "항상 X를 수행" 규칙 | "npm이 아닌 pnpm을 사용하세요" |
| **Skill** | 지침, 지식, 워크플로우 | 재사용 가능한 콘텐츠, 반복 가능한 작업 | `/deploy` 배포 체크리스트 |
| **Subagent** | 격리된 실행 컨텍스트 | 컨텍스트 격리, 병렬 작업 | 많은 파일을 읽고 주요 결과만 반환하는 연구 작업 |
| **Agent Teams** | 여러 독립 세션 조정 | 병렬 연구, 경쟁 가설 디버깅 | 보안/성능/테스트 동시 검토 |
| **MCP** | 외부 서비스 연결 | 외부 데이터 또는 작업 | DB 쿼리, Slack 게시, 브라우저 제어 |
| **Hook** | 이벤트에서 실행되는 결정론적 스크립트 | 예측 가능한 자동화 (LLM 없음) | 모든 파일 편집 후 ESLint 실행 |

---

## 유사한 기능 비교

### Skill vs Subagent

| 측면 | Skill | Subagent |
|------|-------|----------|
| **정의** | 재사용 가능한 지침, 지식, 워크플로우 | 자신의 컨텍스트를 가진 격리된 워커 |
| **주요 이점** | 컨텍스트 간 콘텐츠 공유 | 컨텍스트 격리, 요약만 반환 |
| **최적 용도** | 참조 자료, 호출 가능한 워크플로우 | 많은 파일 읽기, 병렬 작업 |

- **결합 가능**: Subagent가 특정 skill을 미리 로드(`skills:` 필드), Skill이 `context: fork`로 격리 실행 가능

### CLAUDE.md vs Skill

| 측면 | CLAUDE.md | Skill |
|------|-----------|-------|
| **로드** | 모든 세션, 자동 | 온디맨드 |
| **파일 포함** | `@path` 가져오기 | `@path` 가져오기 |
| **워크플로우 트리거** | 불가 | `/<name>` 사용 |
| **최적 용도** | "항상 X를 수행" 규칙 | 참조 자료, 호출 가능한 워크플로우 |

> **경험 법칙**: CLAUDE.md를 200줄 이하로 유지. 증가하면 참조 콘텐츠를 skill이나 `.claude/rules/`로 분할.

### CLAUDE.md vs Rules vs Skills

| 측면 | CLAUDE.md | `.claude/rules/` | Skill |
|------|-----------|-------------------|-------|
| **로드** | 모든 세션 | 모든 세션 또는 파일 일치 시 | 온디맨드 |
| **범위** | 전체 프로젝트 | 파일 경로로 범위 지정 가능 | 작업별 |
| **최적 용도** | 핵심 규칙, 빌드 명령 | 언어별/디렉토리별 가이드라인 | 참조 자료, 반복 가능한 워크플로우 |

### Subagent vs Agent Team

| 측면 | Subagent | Agent Team |
|------|----------|------------|
| **컨텍스트** | 자신의 윈도우; 결과는 호출자에게 반환 | 자신의 윈도우; 완전히 독립적 |
| **통신** | 주 에이전트에게만 보고 | 팀원이 서로 직접 메시지 |
| **조정** | 주 에이전트가 관리 | 공유 작업 목록 + 자체 조정 |
| **토큰 비용** | 낮음 (요약됨) | 높음 (각각 별도 인스턴스) |

### MCP vs Skill

| 측면 | MCP | Skill |
|------|-----|-------|
| **정의** | 외부 서비스 연결 프로토콜 | 지식, 워크플로우, 참조 자료 |
| **제공** | 도구 및 데이터 접근 | 지식, 워크플로우, 참조 자료 |
| **예시** | Slack, DB 쿼리, 브라우저 제어 | 코드 검토 체크리스트, 배포 워크플로우 |

> MCP는 **능력**, Skill은 **지식**을 제공. 함께 잘 작동합니다.

---

## 기능 계층화

- **CLAUDE.md 파일**: 추가적 (모든 수준이 동시에 콘텐츠 제공)
- **Skill/Subagent**: 이름으로 재정의 (우선순위: 관리 > 사용자 > 프로젝트)
- **MCP 서버**: 이름으로 재정의 (로컬 > 프로젝트 > 사용자)
- **Hooks**: 병합 (모든 등록된 hook이 이벤트에서 실행)

---

## 기능 결합 패턴

| 패턴 | 작동 방식 | 예시 |
|------|----------|------|
| **Skill + MCP** | MCP가 연결, skill이 사용법 교육 | MCP=DB 연결, skill=스키마/쿼리 패턴 |
| **Skill + Subagent** | Skill이 병렬 subagent 생성 | `/audit`이 보안/성능/스타일 subagent 시작 |
| **CLAUDE.md + Skill** | CLAUDE.md=항상 켜진 규칙, skill=온디맨드 참조 | CLAUDE.md "API 규칙 따르세요", skill=API 스타일 가이드 |
| **Hook + MCP** | Hook이 MCP로 외부 작업 트리거 | 편집 후 Slack 알림 전송 |

---

## 컨텍스트 비용 이해하기

### 기능별 컨텍스트 비용

| 기능 | 로드 시기 | 로드되는 내용 | 컨텍스트 비용 |
|------|---------|------------|------------|
| **CLAUDE.md** | 세션 시작 | 전체 콘텐츠 | 모든 요청 |
| **Skill** | 시작 시 설명, 사용 시 전체 | 설명 + 전체 콘텐츠 | 낮음 (사용 전까지) |
| **MCP 서버** | 세션 시작 | 모든 도구 정의 + 스키마 | 모든 요청 |
| **Subagent** | 생성 시 | 지정된 skill의 신선한 컨텍스트 | 주 세션에서 격리 |
| **Hooks** | 트리거 시 | 없음 (외부 실행) | 0 |

### 로딩 시점 상세

- **CLAUDE.md**: 세션 시작 시 전체 로드. 약 500줄 이하 권장.
- **Skills**: 기본적으로 설명만 시작 시 로드, 전체 콘텐츠는 사용 시. `disable-model-invocation: true`로 0 비용 가능.
- **MCP**: 세션 시작 시 모든 도구 정의 로드. Tool Search로 컨텍스트 10%까지 제한. `/mcp`로 서버당 토큰 비용 확인.
- **Subagent**: 주 세션에서 격리. CLAUDE.md 및 git 상태 상속, 대화 기록은 상속하지 않음.
- **Hooks**: 기본적으로 컨텍스트 0. 외부 스크립트로 실행.
