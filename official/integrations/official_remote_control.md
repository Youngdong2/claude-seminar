# 모든 기기에서 로컬 세션 계속하기 - Remote Control (공식 문서)

- **출처**: Claude Code 공식 문서
- **링크**: https://code.claude.com/docs/ko/remote-control
- **관련 링크**:
  - [claude.ai/code](https://claude.ai/code)
  - [Claude iOS 앱](https://apps.apple.com/us/app/claude-by-anthropic/id6473753684)
  - [Claude Android 앱](https://play.google.com/store/apps/details?id=com.anthropic.claude)
  - [Claude Code 관리자 설정](https://claude.ai/admin-settings/claude-code)
  - [웹의 Claude Code](/ko/claude-code-on-the-web)
  - [MCP 서버](/ko/mcp)
  - [Git worktrees 병렬 세션](/ko/common-workflows#run-parallel-claude-code-sessions-with-git-worktrees)
  - [샌드박싱](/ko/sandboxing)
  - [인증](/ko/authentication)
  - [CLI 참조](/ko/cli-reference)
  - [보안](/ko/security)
  - [데이터 사용](/ko/data-usage)
  - [채널](/ko/channels)
  - [채널 참조](/ko/channels-reference)
  - [채널 퀵스타트](/ko/channels#quickstart)
  - [Dispatch (Desktop)](/ko/desktop#sessions-from-dispatch)
  - [Slack 통합](/ko/slack)
  - [예약된 작업](/ko/scheduled-tasks)
  - [Desktop 예약된 작업](/ko/desktop#schedule-recurring-tasks)
  - [클라우드 예약된 작업](/ko/web-scheduled-tasks)
  - [Slack 앱 설치](/ko/slack#setting-up-claude-code-in-slack)
  - [관리 전용 설정](/ko/permissions#managed-only-settings)
  - [플랫폼 및 통합](/ko/platforms#work-when-you-are-away-from-your-terminal)
  - [Dispatch 도움말](https://support.claude.com/en/articles/13947068)

---

## 개요

Remote Control은 [claude.ai/code](https://claude.ai/code) 또는 Claude 모바일 앱을 컴퓨터에서 실행 중인 Claude Code 세션에 연결합니다. 책상에서 작업을 시작한 다음 소파의 휴대폰이나 다른 컴퓨터의 브라우저에서 계속할 수 있습니다.

### 핵심 특징

- **전체 로컬 환경을 원격으로 사용**: 파일 시스템, MCP 서버, 도구 및 프로젝트 구성 모두 사용 가능
- **두 표면에서 동시 작업**: 대화가 모든 연결된 기기에서 동기화
- **중단 극복**: 노트북 절전/네트워크 끊김 시 자동 재연결

> 클라우드에서 실행되는 웹의 Claude Code와 달리, Remote Control 세션은 컴퓨터에서 직접 실행되며 로컬 파일 시스템과 상호 작용합니다.

### 요금제

- 모든 요금제에서 사용 가능 (Pro, Max, Team, Enterprise)
- Team/Enterprise의 경우 관리자가 [Claude Code 관리자 설정](https://claude.ai/admin-settings/claude-code)에서 Remote Control 토글 활성화 필요
- Claude Code v2.1.51 이상 필요 (`claude --version`으로 확인)

---

## 요구 사항

- **구독**: Pro, Max, Team, Enterprise (API 키 미지원)
- **인증**: claude.ai를 통해 로그인 (`/login`)
- **작업 공간 신뢰**: 프로젝트 디렉토리에서 최소 한 번 `claude` 실행하여 신뢰 대화 수락

---

## Remote Control 세션 시작

### 방법 1: 서버 모드

```bash
claude remote-control
```

터미널에서 서버 모드로 계속 실행. 세션 URL 표시, 스페이스바로 QR 코드 표시 전환.

**사용 가능한 플래그:**

| 플래그 | 설명 |
|--------|------|
| `--name "My Project"` | 사용자 정의 세션 제목 설정 |
| `--spawn <mode>` | 동시 세션 생성 방식. `same-dir` (기본) 또는 `worktree` (git worktree 격리) |
| `--capacity <N>` | 최대 동시 세션 수 (기본 32) |
| `--verbose` | 자세한 연결/세션 로그 표시 |
| `--sandbox` / `--no-sandbox` | 파일 시스템/네트워크 격리용 샌드박싱 활성화/비활성화 |

### 방법 2: 대화형 세션

```bash
claude --remote-control
```

또는 이름 지정:

```bash
claude --remote-control "My Project"
```

터미널에서 전체 대화형 세션 + claude.ai/Claude 앱에서도 제어 가능.

### 방법 3: 기존 세션에서

```text
/remote-control
```

또는 이름 지정:

```text
/remote-control My Project
```

현재 대화 기록을 이어받는 Remote Control 세션 시작.

---

## 다른 기기에서 연결

- **세션 URL 열기**: 모든 브라우저에서 URL 열기 -> [claude.ai/code](https://claude.ai/code)로 이동
- **QR 코드 스캔**: Claude 앱에서 직접 열기
- **claude.ai/code 또는 Claude 앱**: 세션 목록에서 이름으로 찾기 (녹색 상태 점 = 온라인)

### 원격 세션 제목 우선순위

1. `--name`, `--remote-control`, `/remote-control`에 전달한 이름
2. `/rename`으로 설정한 제목
3. 기존 대화 기록의 마지막 의미 있는 메시지
4. 메시지를 보낸 후 첫 번째 프롬프트

### 모든 세션에 대해 Remote Control 활성화

`/config` 실행 -> **모든 세션에 대해 Remote Control 활성화** -> `true` 설정

> 이 설정이 켜지면 각 대화형 Claude Code 프로세스가 하나의 원격 세션을 등록합니다.

### Claude 모바일 앱 다운로드

Claude Code 내에서 `/mobile` 명령으로 다운로드 QR 코드 표시:
- [iOS](https://apps.apple.com/us/app/claude-by-anthropic/id6473753684)
- [Android](https://play.google.com/store/apps/details?id=com.anthropic.claude)

---

## 연결 및 보안

- 로컬 Claude Code 세션은 **아웃바운드 HTTPS 요청만** 수행
- 인바운드 포트를 열지 않음
- 모든 트래픽은 TLS를 통해 Anthropic API를 통해 이동
- 여러 단기 자격 증명 사용 (각각 단일 목적, 독립적 만료)

---

## Remote Control vs 웹의 Claude Code 비교

| 항목 | Remote Control | 웹의 Claude Code |
|------|---------------|-----------------|
| 실행 위치 | 사용자 컴퓨터 | Anthropic 클라우드 |
| 로컬 MCP/도구 | 사용 가능 | 사용 불가 |
| 파일 시스템 | 로컬 | 클라우드 |
| 사용 시기 | 로컬 작업 중 다른 기기에서 계속 | 로컬 설정 없이 작업, 미복제 저장소, 병렬 작업 |

---

## 올바른 접근 방식 선택 (비교표)

| 방식 | 트리거 | 실행 위치 | 최적 용도 |
|------|--------|----------|----------|
| **Dispatch** | Claude 모바일 앱에서 작업 메시지 | 사용자 머신 (Desktop) | 부재중 작업 위임 |
| **Remote Control** | claude.ai/code 또는 Claude 모바일 앱 | 사용자 머신 (CLI/VS Code) | 다른 기기에서 진행 중인 작업 조종 |
| **Channels** | Telegram/Discord 또는 자체 서버 이벤트 | 사용자 머신 (CLI) | CI 실패, 채팅 메시지 등 외부 이벤트 반응 |
| **Slack** | 팀 채널에서 `@Claude` 멘션 | Anthropic 클라우드 | 팀 채팅에서 PR/리뷰 |
| **예약된 작업** | 일정 설정 | CLI/Desktop/클라우드 | 일일 리뷰 등 반복 자동화 |

---

## 제한 사항

- **대화형 프로세스당 하나의 원격 세션** (서버 모드 외)
- **터미널은 열려 있어야 함**: 터미널 닫기/프로세스 중지 시 세션 종료
- **장시간 네트워크 중단**: 약 10분 이상 네트워크 도달 불가 시 세션 시간 초과 및 프로세스 종료

---

## 문제 해결

### "Remote Control이 아직 계정에 대해 활성화되지 않았습니다"

특정 환경 변수가 적격성 확인을 실패시킬 수 있음:
- `CLAUDE_CODE_DISABLE_NONESSENTIAL_TRAFFIC` 또는 `DISABLE_TELEMETRY`: 해제 후 재시도
- `CLAUDE_CODE_USE_BEDROCK`, `CLAUDE_CODE_USE_VERTEX`, `CLAUDE_CODE_USE_FOUNDRY`: 타사 제공자와 미작동
- 해당 없으면 `/logout` -> `/login` 실행

### "Remote Control이 조직의 정책에 의해 비활성화되었습니다"

세 가지 원인:
1. **API 키/Console 계정으로 인증**: claude.ai OAuth 필요. `/login`으로 claude.ai 옵션 선택
2. **Team/Enterprise 관리자 미활성화**: [관리자 설정](https://claude.ai/admin-settings/claude-code)에서 Remote Control 토글 켜기
3. **관리자 토글 회색 표시**: 호환되지 않는 데이터 보존/규정 준수 구성. Anthropic 지원팀 문의

### "원격 자격 증명 가져오기 실패"

```bash
claude remote-control --verbose
```

일반적인 원인:
- 로그인 안 됨: `/login`으로 claude.ai 계정 인증
- 네트워크/프록시 문제: 포트 443의 Anthropic API 액세스 필요
- 세션 생성 실패: 구독 활성 상태 확인

---

## 관련 리소스

- [웹의 Claude Code](/ko/claude-code-on-the-web)
- [채널](/ko/channels)
- [Dispatch](/ko/desktop#sessions-from-dispatch)
- [인증](/ko/authentication)
- [CLI 참조](/ko/cli-reference)
- [보안](/ko/security)
- [데이터 사용](/ko/data-usage)
