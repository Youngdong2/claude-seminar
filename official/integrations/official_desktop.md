# Claude Code Desktop 사용하기 (공식 문서)

- **출처**: Claude Code 공식 문서
- **링크**: https://code.claude.com/docs/ko/desktop
- **관련 링크**:
  - [시작하기 (Desktop Quickstart)](/ko/desktop-quickstart)
  - [일반적인 워크플로우](/ko/common-workflows)
  - [먼저 탐색, 그 다음 계획, 그 다음 코드](/ko/best-practices#explore-first-then-plan-then-code)
  - [권한 모드](/ko/permission-modes)
  - [Auto 모드](/ko/permission-modes#eliminate-prompts-with-auto-mode)
  - [웹의 Claude Code](/ko/claude-code-on-the-web)
  - [Claude Code on the Web - 클라우드 환경](/ko/claude-code-on-the-web#cloud-environment)
  - [Git worktrees 병렬 세션](/ko/common-workflows#run-parallel-claude-code-sessions-with-git-worktrees)
  - [Chrome에서 Claude Code](/ko/chrome)
  - [MCP 서버](/ko/mcp)
  - [MCP 구성](/ko/mcp#installing-mcp-servers)
  - [사용자 정의 커넥터](https://support.claude.com/en/articles/11175166-getting-started-with-custom-connectors-using-remote-mcp)
  - [Skills](/ko/skills)
  - [Skills 생성](/ko/skills#create-custom-skills)
  - [내장 명령](/ko/commands)
  - [Plugins](/ko/plugins)
  - [플러그인 마켓플레이스](/ko/plugin-marketplaces)
  - [Hooks](/ko/hooks)
  - [Settings](/ko/settings)
  - [CLAUDE.md (Memory)](/ko/memory)
  - [모델 설정](/ko/model-config#available-models)
  - [확장 사고](/ko/common-workflows#use-extended-thinking-thinking-mode)
  - [환경 변수](/ko/env-vars)
  - [비용](/ko/costs)
  - [컨텍스트 윈도우](/ko/how-claude-code-works#the-context-window)
  - [Headless/Agent SDK](/ko/headless)
  - [Agent Teams](/ko/agent-teams)
  - [CLI 참조](/ko/cli-reference)
  - [인증](/ko/authentication)
  - [SSO 설정](https://support.claude.com/en/articles/13132885-setting-up-single-sign-on-sso)
  - [데이터 처리](/ko/data-usage)
  - [보안](/ko/security)
  - [네트워크 구성](/ko/network-config)
  - [관리 전용 설정](/ko/permissions#managed-only-settings)
  - [Auto mode 분류기 구성](/ko/permissions#configure-the-auto-mode-classifier)
  - [엔터프라이즈 구성 가이드](https://support.claude.com/en/articles/12622667-enterprise-configuration)
  - [Windows용 Claude Desktop 배포](https://support.claude.com/en/articles/12622703-deploy-claude-desktop-for-windows)
  - [타사 공급자 통합](/ko/third-party-integrations)
  - [예약된 작업](/ko/scheduled-tasks)
  - [클라우드 예약된 작업](/ko/web-scheduled-tasks)
  - [채널](/ko/channels)
  - [채널 참조](/ko/channels-reference)
  - [Slack 통합](/ko/slack)
  - [Remote Control](/ko/remote-control)
  - [Dispatch 도움말](https://support.claude.com/en/articles/13947068)
  - [Cowork](https://claude.com/product/cowork#dispatch-and-computer-use)
  - [컴퓨터 사용 안전 가이드](https://support.claude.com/en/articles/14128542)
  - [샌드박싱](/ko/sandboxing)
  - [GitHub auto-merge 설정](https://docs.github.com/en/repositories/configuring-branches-and-merges-in-your-repository/configuring-pull-request-merges/managing-auto-merge-for-pull-requests-in-your-repository)
  - [GitHub CLI (`gh`)](https://cli.github.com/)
  - [Git 다운로드](https://git-scm.com/downloads)
  - [Windows용 Git 다운로드](https://git-scm.com/downloads/win)
  - [Git LFS](https://git-lfs.com/)
  - [claude.ai/code](https://claude.ai/code)
  - [Claude iOS 앱](https://apps.apple.com/us/app/claude-by-anthropic/id6473753684)
  - [Claude Android 앱](https://play.google.com/store/apps/details?id=com.anthropic.claude)
  - [관리 설정 콘솔](https://claude.ai/admin-settings/claude-code)
  - [Claude 지원 센터](https://support.claude.com/)
  - [GitHub Issues](https://github.com/anthropics/claude-code/issues)
  - [플랫폼 및 통합](/ko/platforms#work-when-you-are-away-from-your-terminal)

---

## 개요

Claude Desktop 앱 내의 Code 탭을 사용하면 터미널 대신 그래픽 인터페이스를 통해 Claude Code를 사용할 수 있습니다.

### Desktop 전용 기능

- **시각적 diff 검토** (인라인 댓글 포함)
- **라이브 앱 미리보기** (개발 서버 포함)
- **컴퓨터 사용** (macOS에서 앱을 열고 화면 제어)
- **GitHub PR 모니터링** (자동 수정 및 자동 병합)
- **병렬 세션** (자동 Git worktree 격리)
- **Dispatch 통합**: 휴대폰에서 작업 전송, Desktop에서 세션 수신
- **예약된 작업** (Claude를 반복 일정으로 실행)
- **커넥터** (GitHub, Slack, Linear 등)
- 로컬, SSH, 클라우드 환경 지원

---

## 세션 시작하기

메시지를 보내기 전에 구성할 4가지:

1. **환경**: Local / Remote / SSH 연결 선택
2. **프로젝트 폴더**: 작업할 폴더 또는 저장소
3. **모델**: 전송 버튼 옆의 드롭다운에서 선택 (세션 시작 후 잠김)
4. **권한 모드**: 모드 선택기에서 자율성 수준 선택

---

## 코드 작업하기

### 권한 모드

| 모드 | 설정 키 | 동작 |
|------|---------|------|
| **권한 요청** | `default` | 파일 편집/명령 실행 전 요청. 새 사용자에게 권장 |
| **자동 수락 편집** | `acceptEdits` | 파일 편집 자동 수락, 명령 실행은 요청 |
| **Plan mode** | `plan` | 코드 분석 및 계획만 생성, 수정/실행 없음 |
| **Auto** | `auto` | 백그라운드 안전 검사와 함께 모든 작업 실행. Team 플랜, Sonnet 4.6/Opus 4.6 필요 |
| **권한 무시** | `bypassPermissions` | CLI의 `--dangerously-skip-permissions`와 동일. 샌드박스에서만 사용 |

> `dontAsk` 권한 모드는 CLI에서만 사용 가능합니다.

### 앱 미리보기

Claude가 개발 서버를 시작하고 임베드된 브라우저에서 변경 사항 확인 가능. 프론트엔드와 백엔드 서버 모두 지원.

미리보기 패널 기능:
- 임베드된 브라우저에서 앱과 직접 상호작용
- 자동 변경 사항 확인 (스크린샷, DOM 검사, 클릭, 양식 채우기)
- 서버 시작/중지
- 세션 데이터 유지 (쿠키, 로컬 스토리지)

### diff 보기로 변경 사항 검토

- 파일별 수정 사항 확인
- diff 줄 클릭으로 댓글 추가
- **macOS**: `Cmd+Enter`, **Windows**: `Ctrl+Enter`로 모든 댓글 제출

### 코드 검토

diff 보기에서 **Review code** 클릭 -> Claude가 diff에 직접 댓글.
- 컴파일 오류, 명확한 논리 오류, 보안 취약점, 명백한 버그에 집중
- 스타일, 형식, 기존 문제는 플래그하지 않음

### PR 상태 모니터링

- **자동 수정**: 실패한 CI 확인을 자동으로 수정 시도
- **자동 병합**: 모든 확인 통과 시 squash 방식으로 PR 병합

> PR 모니터링에는 [GitHub CLI (`gh`)](https://cli.github.com/)가 필요합니다.

---

## 컴퓨터 사용

Claude가 앱을 열고, 화면을 제어하고, 머신에서 직접 작업 가능. macOS 전용, Pro 또는 Max 플랜 필요.

### 활성화

**Settings > Desktop app > General** -> **Computer use** 켜기

필요한 macOS 권한:
- **Accessibility**: 클릭, 입력, 스크롤
- **Screen Recording**: 화면 내용 확인

### 앱 권한 계층

| 계층 | 할 수 있는 것 | 적용 대상 |
|------|-------------|----------|
| 보기 전용 | 스크린샷에서 앱 보기 | 브라우저, 거래 플랫폼 |
| 클릭 전용 | 클릭, 스크롤 (입력/키보드 불가) | 터미널, IDE |
| 전체 제어 | 클릭, 입력, 드래그, 키보드 단축키 | 기타 모든 것 |

### 도구 우선순위

1. 커넥터 (서비스에 커넥터가 있으면)
2. Bash (셸 명령)
3. Claude in Chrome (브라우저 작업)
4. 컴퓨터 사용 (위의 어느 것도 해당 안 되면)

---

## 세션 관리

### 병렬 세션

**+ New session** 클릭으로 여러 작업 병렬 실행. Git worktrees를 사용하여 격리.

- Worktree 기본 위치: `<project-root>/.claude/worktrees/`
- Settings -> Claude Code에서 사용자 정의 위치 및 브랜치 접두사 설정 가능

> Git이 필요합니다. Mac에는 기본 포함. Windows에서는 [Git 다운로드](https://git-scm.com/downloads/win) 필요.

### 원격으로 장기 실행 작업

**Remote** 선택으로 Anthropic 클라우드 인프라에서 실행. 앱 종료/컴퓨터 종료해도 계속.
- 여러 저장소 지원 (+버튼으로 추가)
- [claude.ai/code](https://claude.ai/code) 또는 Claude iOS 앱에서 모니터링 가능

### 다른 표면에서 계속하기

**Continue in** 메뉴:
- **Claude Code on the Web**: 로컬 세션을 원격으로 계속
- **Your IDE**: 지원되는 IDE에서 프로젝트 열기

### Dispatch에서 세션

[Dispatch](https://support.claude.com/en/articles/13947068)를 통해 휴대폰에서 작업을 메시지하면 Desktop에서 Code 세션 생성. Pro 또는 Max 플랜 필요.

---

## Claude Code 확장하기

### 외부 도구 연결 (커넥터)

**+** 버튼 > **Connectors**에서 Google Calendar, Slack, GitHub, Linear, Notion 등 추가.

### Skills 사용

프롬프트 상자에서 `/` 입력 또는 **+** > **Slash commands**로 사용 가능한 스킬 탐색.

### 플러그인 설치

**+** > **Plugins**에서 설치된 플러그인 확인 및 새 플러그인 추가.

### 미리보기 서버 구성

`.claude/launch.json`에서 구성:

```json
{
  "version": "0.0.1",
  "configurations": [
    {
      "name": "my-app",
      "runtimeExecutable": "npm",
      "runtimeArgs": ["run", "dev"],
      "port": 3000
    }
  ]
}
```

#### 구성 필드

| 필드 | 유형 | 설명 |
|------|------|------|
| `name` | string | 서버 고유 식별자 |
| `runtimeExecutable` | string | 실행할 명령 (예: `npm`, `yarn`, `node`) |
| `runtimeArgs` | string[] | 인수 (예: `["run", "dev"]`) |
| `port` | number | 서버 포트 (기본 3000) |
| `cwd` | string | 작업 디렉토리 (프로젝트 루트 기준) |
| `env` | object | 추가 환경 변수 |
| `autoPort` | boolean | 포트 충돌 처리 방법 |
| `program` | string | `node`로 실행할 스크립트 |
| `args` | string[] | `program`에 전달 인수 |

#### 자동 변경 사항 확인 (autoVerify)

기본적으로 켜져 있음. 비활성화하려면:

```json
{
  "version": "0.0.1",
  "autoVerify": false,
  "configurations": [...]
}
```

#### 여러 서버 예시

```json
{
  "version": "0.0.1",
  "configurations": [
    {
      "name": "frontend",
      "runtimeExecutable": "npm",
      "runtimeArgs": ["run", "dev"],
      "cwd": "apps/web",
      "port": 3000,
      "autoPort": true
    },
    {
      "name": "api",
      "runtimeExecutable": "npm",
      "runtimeArgs": ["run", "start"],
      "cwd": "server",
      "port": 8080,
      "env": { "NODE_ENV": "development" },
      "autoPort": false
    }
  ]
}
```

---

## 반복 작업 예약

### 예약 옵션 비교

| | Cloud | Desktop | `/loop` |
|---|---|---|---|
| 실행 위치 | Anthropic 클라우드 | 사용자 머신 | 사용자 머신 |
| 머신 필요 | 아니요 | 예 | 예 |
| 열린 세션 필요 | 아니요 | 아니요 | 예 |
| 재시작 후 유지 | 예 | 예 | 아니요 (세션 범위) |
| 로컬 파일 접근 | 아니요 (새 클론) | 예 | 예 |
| 최소 간격 | 1시간 | 1분 | 1분 |

### 빈도 옵션

- **Manual**: Run now 클릭 시만 실행
- **Hourly**: 매시간 (최대 10분 오프셋)
- **Daily**: 기본 오전 9:00 현지 시간
- **Weekdays**: 토/일 건너뜀
- **Weekly**: 요일 및 시간 선택

### 놓친 실행

앱 시작/컴퓨터 깨어남 시 지난 7일간 놓친 실행 확인. 가장 최근 놓친 시간에 대해 1회 따라잡기 실행.

### 예약된 작업 관리

- **Run now**: 즉시 실행
- **Toggle repeats**: 일시 중지/재개
- **Edit**: 프롬프트, 빈도, 폴더 등 변경
- **Review history**: 모든 과거 실행 확인
- **Review allowed permissions**: 저장된 도구 승인 확인
- **Delete**: 작업 제거

디스크에서 프롬프트 편집: `~/.claude/scheduled-tasks/<task-name>/SKILL.md`

---

## 환경 구성

### 로컬 세션

셸 프로필에서 환경 변수 상속. Extended thinking 기본 활성화.
- 비활성화: `MAX_THINKING_TOKENS=0` 설정

### 원격 세션

앱 종료해도 백그라운드 계속 실행. 사용자 정의 클라우드 환경 생성 가능.

### SSH 세션

원격 머신에서 Claude Code 실행. 설정:
- **Name**: 연결의 친화적 레이블
- **SSH Host**: `user@hostname` 또는 `~/.ssh/config` 호스트
- **SSH Port**: 기본 22
- **Identity File**: 개인 키 경로

---

## 엔터프라이즈 구성

### 관리 콘솔 컨트롤

- **데스크톱의 Code**: Code 탭 액세스 제어
- **웹의 Code**: 웹 세션 활성화/비활성화
- **Remote Control**: Remote Control 활성화/비활성화
- **권한 무시 모드 비활성화**: 사용자가 권한 무시 모드 사용 방지

### 관리 설정 키

| 키 | 설명 |
|---|------|
| `permissions.disableBypassPermissionsMode` | 권한 무시 모드 비활성화 |
| `disableAutoMode` | Auto 모드 비활성화 |
| `autoMode` | auto mode 분류기 사용자 정의 |

### 장치 관리

- **macOS**: MDM (Jamf, Kandji), `com.anthropic.Claude` 기본 설정 도메인
- **Windows**: 레지스트리 `SOFTWARE\Policies\Claude`

---

## CLI에서 오셨나요?

Desktop과 CLI는 동일한 기본 엔진 사용. 동시 실행 가능. CLI에서 `/desktop` 실행으로 세션 이동.

### CLI 플래그 -> Desktop 동등물

| CLI | Desktop |
|-----|---------|
| `--model sonnet` | 모델 드롭다운 |
| `--resume`, `--continue` | 사이드바에서 세션 클릭 |
| `--permission-mode` | 모드 선택기 |
| `--dangerously-skip-permissions` | Settings에서 권한 무시 모드 활성화 |
| `--add-dir` | 원격 세션에서 + 버튼 |

### 기능 비교

| 기능 | CLI | Desktop |
|------|-----|---------|
| 권한 모드 | `dontAsk` 포함 모두 | 권한 요청, 자동 수락, Plan, Auto, 권한 무시 |
| 타사 공급자 | Bedrock, Vertex, Foundry | 사용 불가 |
| 컴퓨터 사용 | 사용 불가 | macOS에서 사용 가능 |
| 스크립팅/자동화 | `--print`, Agent SDK | 사용 불가 |
| 세션 격리 | `--worktree` 플래그 | 자동 worktrees |
| 파일 첨부 | 사용 불가 | 이미지, PDF |
| 반복 작업 | cron, CI 파이프라인 | 예약된 작업 |

---

## 문제 해결

### Code 탭의 403 또는 인증 오류
1. 로그아웃 후 다시 로그인
2. 활성 유료 구독 확인 (Pro, Max, Teams, Enterprise)
3. 앱 완전 종료 후 다시 열기
4. 네트워크/프록시 확인

### "Failed to load session"
- 선택한 폴더 존재 확인
- Git LFS 설치 확인
- 파일 권한 확인

### 세션이 설치된 도구를 찾지 못함
- 일반 터미널에서 도구 작동 확인
- 셸 프로필 PATH 설정 확인
- 앱 다시 시작

### Git 및 Git LFS 오류
- Windows: [Git 다운로드](https://git-scm.com/downloads/win) 설치
- Git LFS: [git-lfs.com](https://git-lfs.com/)에서 설치, `git lfs install` 실행

### 문제 제출
- [GitHub Issues](https://github.com/anthropics/claude-code/issues)
- [Claude 지원 센터](https://support.claude.com/)
