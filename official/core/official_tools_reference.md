# 도구 참조 (공식 문서)

- **출처**: Claude Code 공식 문서
- **링크**: https://code.claude.com/docs/ko/tools-reference
- **관련 링크**:
  - [권한 규칙](https://code.claude.com/docs/ko/permissions#tool-specific-permission-rules)
  - [권한 설정](https://code.claude.com/docs/ko/settings#available-settings)
  - [Subagents](https://code.claude.com/docs/ko/sub-agents)
  - [Hooks 가이드](https://code.claude.com/docs/ko/hooks-guide)
  - [Hooks](https://code.claude.com/docs/ko/hooks)
  - [MCP 서버](https://code.claude.com/docs/ko/mcp)
  - [Skills](https://code.claude.com/docs/ko/skills#control-who-invokes-a-skill)
  - [예약된 작업](https://code.claude.com/docs/ko/scheduled-tasks)
  - [Git Worktree](https://code.claude.com/docs/ko/common-workflows#run-parallel-claude-code-sessions-with-git-worktrees)
  - [코드 인텔리전스 플러그인](https://code.claude.com/docs/ko/discover-plugins#code-intelligence)
  - [헤드리스 모드 / Agent SDK](https://code.claude.com/docs/ko/headless)
  - [MCP Tool Search](https://code.claude.com/docs/ko/mcp#scale-with-mcp-tool-search)
  - [권한](https://code.claude.com/docs/ko/permissions)
  - [환경 변수 - CLAUDE_ENV_FILE](https://code.claude.com/docs/ko/env-vars)
  - [SessionStart hook](https://code.claude.com/docs/ko/hooks#persist-environment-variables)

---

## 도구 목록

아래 도구 이름은 권한 규칙, subagent 도구 목록, hook 매처에서 사용하는 **정확한 문자열**입니다.

| 도구 | 설명 | 권한 필요 |
|------|------|----------|
| `Agent` | 자체 context window를 가진 subagent 생성 | 아니오 |
| `AskUserQuestion` | 요구사항 수집/모호함 명확히 하기 위한 객관식 질문 | 아니오 |
| `Bash` | 환경에서 shell 명령 실행 | **예** |
| `CronCreate` | 세션 내에서 반복/일회성 프롬프트 예약 (세션 종료 시 사라짐) | 아니오 |
| `CronDelete` | ID로 예약된 작업 취소 | 아니오 |
| `CronList` | 세션의 모든 예약된 작업 나열 | 아니오 |
| `Edit` | 특정 파일에 대한 대상 편집 | **예** |
| `EnterPlanMode` | Plan Mode로 전환 | 아니오 |
| `EnterWorktree` | 격리된 git worktree 생성 및 전환 | 아니오 |
| `ExitPlanMode` | 승인을 위한 계획 제시, Plan Mode 종료 | **예** |
| `ExitWorktree` | worktree 세션 종료, 원래 디렉토리로 복귀 | 아니오 |
| `Glob` | 패턴 매칭 기반 파일 찾기 | 아니오 |
| `Grep` | 파일 내용에서 패턴 검색 | 아니오 |
| `ListMcpResourcesTool` | MCP 서버에서 노출된 리소스 나열 | 아니오 |
| `LSP` | 언어 서버를 통한 코드 인텔리전스 (정의로 이동, 참조 찾기, 타입 정보 등) | 아니오 |
| `NotebookEdit` | Jupyter 노트북 셀 수정 | **예** |
| `Read` | 파일 내용 읽기 | 아니오 |
| `ReadMcpResourceTool` | URI로 특정 MCP 리소스 읽기 | 아니오 |
| `Skill` | 주 대화 내에서 skill 실행 | **예** |
| `TaskCreate` | 작업 목록에 새 작업 생성 | 아니오 |
| `TaskGet` | 특정 작업의 전체 세부 정보 검색 | 아니오 |
| `TaskList` | 현재 상태와 함께 모든 작업 나열 | 아니오 |
| `TaskOutput` | *(더 이상 사용되지 않음)* 백그라운드 작업 출력 검색. `Read` 사용 권장 | 아니오 |
| `TaskStop` | ID로 실행 중인 백그라운드 작업 종료 | 아니오 |
| `TaskUpdate` | 작업 상태, 종속성, 세부 정보 업데이트 또는 삭제 | 아니오 |
| `TodoWrite` | 세션 작업 체크리스트 관리. 비대화형 모드/Agent SDK에서 사용. 대화형 세션은 Task* 사용 | 아니오 |
| `ToolSearch` | Tool Search 활성화 시 지연된 도구 검색/로드 | 아니오 |
| `WebFetch` | 지정된 URL에서 콘텐츠 가져오기 | **예** |
| `WebSearch` | 웹 검색 수행 | **예** |
| `Write` | 파일 생성 또는 덮어쓰기 | **예** |

---

## Bash 도구 동작

Bash 도구는 각 명령을 **별도의 프로세스**에서 실행합니다.

### 지속성 동작

- **작업 디렉토리**: 명령 전체에서 지속
  - `CLAUDE_BASH_MAINTAIN_PROJECT_WORKING_DIR=1` 설정 시 각 명령 후 프로젝트 디렉토리로 재설정
- **환경 변수**: 지속되지 않음
  - 한 명령의 `export`는 다음 명령에서 사용 불가

### 환경 설정 방법

1. Claude Code 시작 전에 virtualenv 또는 conda 환경 활성화
2. `CLAUDE_ENV_FILE` 환경 변수를 shell 스크립트로 설정
3. `SessionStart` hook을 사용하여 동적으로 채우기

---

## 참고 항목

- [권한](https://code.claude.com/docs/ko/permissions): 권한 시스템, 규칙 구문, 도구별 패턴
- [Subagents](https://code.claude.com/docs/ko/sub-agents): subagent에 대한 도구 접근 구성
- [Hooks](https://code.claude.com/docs/ko/hooks-guide): 도구 실행 전후에 사용자 정의 명령 실행
