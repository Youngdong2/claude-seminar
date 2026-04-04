# VS Code에서 Claude Code 사용하기 (공식 문서)

- **출처**: Claude Code 공식 문서
- **링크**: https://code.claude.com/docs/ko/vs-code
- **관련 링크**:
  - [VS Code Marketplace](https://marketplace.visualstudio.com/items?itemName=anthropic.claude-code)
  - [VS Code용 설치](vscode:extension/anthropic.claude-code)
  - [Cursor용 설치](cursor:extension/anthropic.claude-code)
  - [일반적인 워크플로우](/ko/common-workflows)
  - [확장 사고](/ko/common-workflows#use-extended-thinking-thinking-mode)
  - [권한 모드](/ko/permission-modes)
  - [Remote Control](/ko/remote-control)
  - [세션 재개](/ko/common-workflows#resume-previous-conversations)
  - [웹에서 Claude Code](/ko/claude-code-on-the-web)
  - [타사 공급자 사용 - Amazon Bedrock](/ko/amazon-bedrock)
  - [타사 공급자 사용 - Google Vertex AI](/ko/google-vertex-ai)
  - [타사 공급자 사용 - Microsoft Foundry](/ko/microsoft-foundry)
  - [Chrome에서 Claude Code 사용](/ko/chrome)
  - [Chrome 확장 프로그램](https://chromewebstore.google.com/detail/claude/fcoeoabgfenejglbffodgkkbkcdhcgfn)
  - [설정](/ko/settings)
  - [플러그인](/ko/plugins)
  - [플러그인 마켓플레이스](/ko/plugin-marketplaces)
  - [MCP 문서](/ko/mcp)
  - [명령어 목록](/ko/commands)
  - [Checkpointing](/ko/checkpointing)
  - [대화 계속 (Headless)](/ko/headless#continue-conversations)
  - [데이터 및 개인 정보 보호](/ko/data-usage)
  - [VS Code 제한 모드](https://code.visualstudio.com/docs/editor/workspace-trust#_restricted-mode)
  - [문제 해결 가이드](/ko/troubleshooting)
  - [Git worktrees로 병렬 세션](/ko/common-workflows#run-parallel-claude-code-sessions-with-git-worktrees)
  - [빠른 시작 가이드](/ko/quickstart)
  - [GitHub Issues](https://github.com/anthropics/claude-code/issues)
  - [JSON Schema](https://json.schemastore.org/claude-code-settings.json)

---

## 개요

VS Code 확장 프로그램은 Claude Code를 위한 기본 그래픽 인터페이스를 제공하며, IDE에 직접 통합됩니다. 이것이 VS Code에서 Claude Code를 사용하는 권장 방법입니다.

### 주요 기능
- Claude의 계획을 수락하기 전에 검토하고 편집
- 편집이 이루어질 때 자동으로 수락
- 선택 항목에서 특정 줄 범위가 있는 파일을 @-멘션으로 표시
- 대화 기록에 액세스
- 별도의 탭이나 창에서 여러 대화 열기

---

## 필수 조건

- **VS Code 1.98.0 이상**
- **Anthropic 계정** (확장 프로그램을 처음 열 때 로그인). 타사 공급자(Amazon Bedrock, Google Vertex AI 등)를 사용하는 경우 별도 설정 필요.

> 확장 프로그램에는 CLI(명령줄 인터페이스)가 포함되어 있으며, VS Code의 통합 터미널에서 고급 기능에 액세스할 수 있습니다.

---

## 확장 프로그램 설치

- [VS Code용 설치](vscode:extension/anthropic.claude-code)
- [Cursor용 설치](cursor:extension/anthropic.claude-code)

또는 VS Code에서 `Cmd+Shift+X`(Mac) / `Ctrl+Shift+X`(Windows/Linux) -> "Claude Code" 검색 -> **설치** 클릭

> 설치 후 확장 프로그램이 나타나지 않으면 VS Code를 다시 시작하거나 명령 팔레트에서 "Developer: Reload Window"를 실행합니다.

---

## 시작하기

### 1단계: Claude Code 패널 열기

Spark 아이콘으로 Claude Code를 여는 방법:

- **편집기 도구 모음**: 편집기 오른쪽 위 모서리의 Spark 아이콘 클릭 (파일을 열었을 때만 표시)
- **활동 표시줄**: 왼쪽 사이드바의 Spark 아이콘 클릭
- **명령 팔레트**: `Cmd+Shift+P` / `Ctrl+Shift+P` -> "Claude Code" 입력
- **상태 표시줄**: 오른쪽 아래 "✱ Claude Code" 클릭

### 2단계: 프롬프트 보내기

Claude에게 코드나 파일을 도와달라고 요청합니다.

> **팁**: Claude는 자동으로 선택한 텍스트를 봅니다. `Option+K`(Mac) / `Alt+K`(Windows/Linux)를 눌러 @-멘션 참조를 삽입합니다.

### 3단계: 변경 사항 검토

Claude가 파일을 편집하려고 할 때, 원본과 제안된 변경 사항을 나란히 비교하고 권한을 요청합니다. 수락/거부/대안 지시 가능.

---

## 프롬프트 상자 사용

### 권한 모드

프롬프트 상자 하단의 모드 표시기를 클릭하여 전환:

| 모드 | 동작 |
|------|------|
| **일반 모드** | 각 작업 전에 권한 요청 |
| **Plan Mode** | 수행할 작업을 설명하고 승인을 기다림. 마크다운 문서로 열어 인라인 주석 가능 |
| **자동 수락 모드** | 요청 없이 편집 수행 |

기본값 설정: VS Code 설정의 `claudeCode.initialPermissionMode`

### 명령 메뉴

`/`를 입력하여 열기. 파일 첨부, 모델 전환, 확장 사고 토글, `/usage`, `/remote-control` 등 사용 가능.

### 컨텍스트 표시기

Claude의 context window 사용량을 표시. 필요시 자동 압축 또는 `/compact` 수동 실행.

### 확장 사고

복잡한 문제에 대해 추론에 더 많은 시간을 소비. 명령 메뉴(`/`)를 통해 활성화.

### 여러 줄 입력

`Shift+Enter`를 눌러 보내지 않고 새 줄 추가.

---

## 파일 및 폴더 참조 (@-멘션)

`@` 다음에 파일 또는 폴더 이름을 입력하여 컨텍스트 제공. Fuzzy matching 지원.

```text
> Explain the logic in @auth (fuzzy matches auth.js, AuthService.ts, etc.)
> What's in @src/components/ (include a trailing slash for folders)
```

- 큰 PDF의 경우 특정 페이지 읽기 가능 (단일 페이지, 범위, 개방형 범위)
- 편집기에서 텍스트 선택 시 자동으로 Claude가 인식
- `Option+K`(Mac) / `Alt+K`(Windows/Linux)로 @-멘션 삽입 (예: `@app.ts#5-10`)
- 프롬프트 상자에 `Shift`를 누른 채 파일 드래그하여 첨부

---

## 과거 대화 재개

Claude Code 패널 상단 드롭다운에서 대화 기록 액세스. 키워드 검색 또는 시간별 탐색 가능 (오늘, 어제, 지난 7일 등).

### Claude.ai에서 원격 세션 재개

**Claude.ai Subscription**으로 로그인 필요. **과거 대화** 드롭다운 > **원격** 탭에서 세션 재개.

> 원격 탭에는 GitHub 저장소로 시작된 웹 세션만 나타납니다. 재개하면 대화 기록이 로컬로 로드되며, 변경 사항은 claude.ai로 다시 동기화되지 않습니다.

---

## 워크플로우 사용자 정의

### Claude 패널 위치

드래그하여 어느 곳이든 재배치 가능:
- **보조 사이드바**: 창의 오른쪽 (코딩하며 표시 유지)
- **기본 사이드바**: 탐색기, 검색 등의 왼쪽 사이드바
- **편집기 영역**: 파일과 함께 탭으로 열기

### 여러 대화 실행

명령 팔레트에서 **새 탭에서 열기** 또는 **새 창에서 열기**로 추가 대화 시작. 각 대화는 자체 기록 및 컨텍스트 유지.

- 파란색 점: 권한 요청 보류 중
- 주황색 점: 탭이 숨겨진 동안 Claude 완료

### 터미널 모드로 전환

[Use Terminal 설정](vscode://settings/claudeCode.useTerminal)을 열고 상자를 선택하여 CLI 스타일 인터페이스 사용.

---

## 플러그인 관리

프롬프트 상자에 `/plugins`를 입력하여 관리 인터페이스 열기.

### 설치 범위
- **사용자용 설치**: 모든 프로젝트에서 사용 가능
- **이 프로젝트용 설치**: 프로젝트 협력자와 공유
- **로컬로 설치**: 이 저장소에서만 사용

### 마켓플레이스 관리

**마켓플레이스** 탭에서 GitHub 저장소, URL 또는 로컬 경로를 입력하여 새 마켓플레이스 추가 가능.

---

## Chrome으로 브라우저 작업 자동화

[Claude in Chrome 확장 프로그램](https://chromewebstore.google.com/detail/claude/fcoeoabgfenejglbffodgkkbkcdhcgfn) 버전 1.0.36 이상 필요.

프롬프트 상자에 `@browser` 입력 후 작업 지시:

```text
@browser go to localhost:3000 and check the console for errors
```

---

## VS Code 명령 및 단축키

| 명령 | 단축키 | 설명 |
|------|--------|------|
| Focus Input | `Cmd+Esc` / `Ctrl+Esc` | 편집기와 Claude 사이 포커스 전환 |
| Open in Side Bar | - | 왼쪽 사이드바에서 Claude 열기 |
| Open in Terminal | - | 터미널 모드에서 Claude 열기 |
| Open in New Tab | `Cmd+Shift+Esc` / `Ctrl+Shift+Esc` | 편집기 탭으로 새 대화 열기 |
| Open in New Window | - | 별도 창에서 새 대화 열기 |
| New Conversation | `Cmd+N` / `Ctrl+N` | 새 대화 시작 (Claude 포커스 시) |
| Insert @-Mention Reference | `Option+K` / `Alt+K` | 현재 파일 및 선택에 대한 참조 삽입 |
| Show Logs | - | 확장 프로그램 디버그 로그 보기 |
| Logout | - | Anthropic 계정에서 로그아웃 |

### 다른 도구에서 VS Code 탭 시작 (URI 핸들러)

```bash
# macOS
open "vscode://anthropic.claude-code/open"

# Linux
xdg-open "vscode://anthropic.claude-code/open"

# Windows
start "vscode://anthropic.claude-code/open"
```

**쿼리 매개변수:**

| 매개변수 | 설명 |
|---------|------|
| `prompt` | 프롬프트 상자에 미리 채울 텍스트 (URL 인코딩 필요) |
| `session` | 재개할 세션 ID (현재 작업 공간에 속해야 함) |

예시:
```text
vscode://anthropic.claude-code/open?prompt=review%20my%20changes
```

---

## 설정 구성

### 두 가지 유형의 설정

1. **확장 프로그램 설정** (VS Code 내): `Cmd+,` / `Ctrl+,` -> 확장 프로그램 -> Claude Code
2. **Claude Code 설정** (`~/.claude/settings.json`): 확장 프로그램과 CLI 간 공유

> `"$schema": "https://json.schemastore.org/claude-code-settings.json"`을 `settings.json`에 추가하면 자동 완성 및 인라인 유효성 검사를 받을 수 있습니다.

### 확장 프로그램 설정 목록

| 설정 | 기본값 | 설명 |
|------|--------|------|
| `selectedModel` | `default` | 새 대화를 위한 모델 |
| `useTerminal` | `false` | 터미널 모드에서 Claude 시작 |
| `initialPermissionMode` | `default` | 새 대화 승인 제어: `default`, `plan`, `acceptEdits`, `auto`, `bypassPermissions` |
| `preferredLocation` | `panel` | Claude 열림 위치: `sidebar` 또는 `panel` |
| `autosave` | `true` | Claude가 파일을 읽거나 쓰기 전에 자동 저장 |
| `useCtrlEnterToSend` | `false` | Ctrl/Cmd+Enter로 프롬프트 보내기 |
| `enableNewConversationShortcut` | `true` | Cmd/Ctrl+N으로 새 대화 시작 |
| `hideOnboarding` | `false` | 온보딩 체크리스트 숨기기 |
| `respectGitIgnore` | `true` | .gitignore 패턴 제외 |
| `environmentVariables` | `[]` | Claude 프로세스 환경 변수 |
| `disableLoginPrompt` | `false` | 인증 프롬프트 건너뛰기 |
| `allowDangerouslySkipPermissions` | `false` | Auto 및 Bypass 권한 모드 추가 |
| `claudeProcessWrapper` | - | Claude 프로세스 실행 파일 경로 |

---

## VS Code 확장 프로그램 vs. Claude Code CLI

| 기능 | CLI | VS Code 확장 프로그램 |
|------|-----|---------------------|
| 명령 및 skills | 모두 | 부분 집합 (`/`로 확인) |
| MCP 서버 구성 | 예 | 부분 (CLI로 추가, `/mcp`로 관리) |
| Checkpoints | 예 | 예 |
| `!` bash 단축키 | 예 | 아니요 |
| Tab 완성 | 예 | 아니요 |

### Checkpoints로 되감기

메시지 위에 마우스를 올려 되감기 버튼 표시:
- **여기서 대화 분기**: 코드 변경 사항 유지하며 새 대화 분기
- **여기로 코드 되감기**: 대화 기록 유지하며 파일 변경 사항 되돌리기
- **대화 분기 및 코드 되감기**: 새 분기 + 파일 변경 되돌리기

### VS Code에서 CLI 실행

통합 터미널(`Ctrl+\`` / `Cmd+\``)을 열고 `claude` 실행. 외부 터미널에서는 `/ide`로 VS Code에 연결.

### 프롬프트에 터미널 출력 포함

`@terminal:name`으로 터미널 출력 참조 (name = 터미널 제목).

---

## MCP를 사용하여 외부 도구에 연결

```bash
claude mcp add --transport http github https://api.githubcopilot.com/mcp/
```

채팅 패널에 `/mcp` 입력으로 MCP 서버 관리 (활성화/비활성화, 재연결, OAuth 인증 관리).

---

## git으로 작업

### 커밋 및 풀 요청 생성

```text
> commit my changes with a descriptive message
> create a pr for this feature
> summarize the changes I've made to the auth module
```

### 병렬 작업을 위해 git worktrees 사용

```bash
claude --worktree feature-auth
```

---

## 타사 공급자 사용

1. [로그인 프롬프트 비활성화 설정](vscode://settings/claudeCode.disableLoginPrompt) 열고 체크
2. 공급자별 설정 가이드 따르기:
   - [Amazon Bedrock의 Claude Code](/ko/amazon-bedrock)
   - [Google Vertex AI의 Claude Code](/ko/google-vertex-ai)
   - [Microsoft Foundry의 Claude Code](/ko/microsoft-foundry)

---

## 기본 제공 IDE MCP 서버

확장 프로그램은 `ide`라는 로컬 MCP 서버를 실행. `127.0.0.1`에 바인드, 임의의 높은 포트 사용.

**모델에 노출된 도구:**

| 도구 이름 | 수행하는 작업 | 쓰기? |
|----------|------------|-------|
| `mcp__ide__getDiagnostics` | 언어 서버 진단 반환 (VS Code 문제 패널 오류/경고) | 아니요 |
| `mcp__ide__executeCode` | Jupyter 노트북 커널에서 Python 코드 실행 | 예 |

---

## 보안 및 개인 정보 보호

- 코드는 비공개로 유지되며 모델 학습에 사용하지 않음
- 자동 편집 권한 활성화 시 VS Code 구성 파일 수정 가능
- 신뢰할 수 없는 작업 공간에는 [VS Code 제한 모드](https://code.visualstudio.com/docs/editor/workspace-trust#_restricted-mode) 활성화 권장

---

## 일반적인 문제 해결

### 확장 프로그램이 설치되지 않음
- VS Code 1.98.0 이상 확인
- [VS Code Marketplace](https://marketplace.visualstudio.com/items?itemName=anthropic.claude-code)에서 직접 설치 시도

### Spark 아이콘이 표시되지 않음
1. 파일 열기 (폴더만으로는 불충분)
2. VS Code 1.98.0 이상 확인
3. "Developer: Reload Window" 실행
4. 충돌하는 AI 확장 프로그램 (Cline, Continue 등) 일시 비활성화
5. 작업 공간 신뢰 확인

### Claude Code가 응답하지 않음
1. 인터넷 연결 확인
2. 새 대화 시작
3. 터미널에서 `claude` 실행하여 상세 오류 확인

문제 지속 시 [GitHub Issues](https://github.com/anthropics/claude-code/issues)에 문제 제출.

---

## 확장 프로그램 제거

1. 확장 프로그램 보기 -> "Claude Code" 검색 -> **제거** 클릭
2. 데이터 완전 제거:

```bash
rm -rf ~/.vscode/globalStorage/anthropic.claude-code
```

---

## 다음 단계

- [일반적인 워크플로우 탐색](/ko/common-workflows)
- [MCP 서버 설정](/ko/mcp)
- [Claude Code 설정 구성](/ko/settings)
