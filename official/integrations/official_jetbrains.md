# JetBrains IDEs에서 Claude Code 사용하기 (공식 문서)

- **출처**: Claude Code 공식 문서
- **링크**: https://code.claude.com/docs/ko/jetbrains
- **관련 링크**:
  - [JetBrains 마켓플레이스 - Claude Code 플러그인](https://plugins.jetbrains.com/plugin/27310-claude-code-beta-)
  - [빠른 시작 가이드](/ko/quickstart)
  - [문제 해결 가이드](/ko/troubleshooting)
  - [WSL 문제 해결](/ko/troubleshooting#jetbrains-ide-not-detected-on-wsl2)

---

## 개요

Claude Code는 전용 플러그인을 통해 JetBrains IDE와 통합되며, 대화형 diff 보기, 선택 영역 컨텍스트 공유 등의 기능을 제공합니다.

---

## 지원되는 IDE

- IntelliJ IDEA
- PyCharm
- Android Studio
- WebStorm
- PhpStorm
- GoLand

---

## 기능

| 기능 | 설명 | 단축키 |
|------|------|--------|
| **빠른 실행** | 편집기에서 직접 Claude Code 열기 | `Cmd+Esc` (Mac) / `Ctrl+Esc` (Windows/Linux) |
| **Diff 보기** | 코드 변경 사항을 IDE diff 뷰어에 직접 표시 | - |
| **선택 영역 컨텍스트** | 현재 선택 영역/탭이 Claude Code와 자동 공유 | - |
| **파일 참조 바로가기** | 파일 참조 삽입 (예: @File#L1-99) | `Cmd+Option+K` (Mac) / `Alt+Ctrl+K` (Linux/Windows) |
| **진단 공유** | IDE의 진단 오류 (lint, 구문 등) 자동 공유 | - |

---

## 설치

### 마켓플레이스 설치

1. JetBrains 마켓플레이스에서 [Claude Code 플러그인](https://plugins.jetbrains.com/plugin/27310-claude-code-beta-) 설치
2. IDE 완전히 다시 시작

Claude Code를 아직 설치하지 않았다면 [빠른 시작 가이드](/ko/quickstart)를 참조하세요.

> 플러그인 설치 후 IDE를 완전히 다시 시작해야 적용될 수 있습니다.

---

## 사용법

### IDE에서

IDE의 통합 터미널에서 `claude`를 실행하면 모든 통합 기능이 활성화됩니다.

### 외부 터미널에서

```bash
claude
```

```text
/ide
```

> Claude가 IDE와 동일한 파일에 액세스하도록 하려면, IDE 프로젝트 루트와 동일한 디렉터리에서 Claude Code를 시작합니다.

---

## 구성

### Claude Code 설정

1. `claude` 실행
2. `/config` 명령 입력
3. diff 도구를 `auto`로 설정하여 자동 IDE 감지

### 플러그인 설정

**설정 -> 도구 -> Claude Code [Beta]**에서 구성:

#### 일반 설정

| 설정 | 설명 |
|------|------|
| **Claude 명령** | 사용자 정의 명령 지정 (예: `claude`, `/usr/local/bin/claude`, `npx @anthropic/claude`) |
| **알림 표시 안 함** | Claude 명령을 찾을 수 없다는 알림 건너뛰기 |
| **다중 줄 프롬프트에 Option+Enter 사용** (macOS만) | Option+Enter로 새 줄 삽입 활성화 |
| **자동 업데이트 활성화** | 플러그인 업데이트 자동 확인 및 설치 |

> **WSL 사용자**: Claude 명령으로 `wsl -d Ubuntu -- bash -lic "claude"`를 설정합니다 (`Ubuntu`를 WSL 배포판 이름으로 변경).

---

## ESC 키 구성

ESC 키가 Claude Code 작업을 중단하지 않는 경우:

1. **설정 -> 도구 -> 터미널**로 이동
2. 다음 중 하나 수행:
   - "Escape로 편집기에 포커스 이동" 선택 해제
   - "터미널 키 바인딩 구성"에서 "편집기로 포커스 전환" 바로가기 삭제
3. 변경 사항 적용

---

## 특수 구성

### 원격 개발

> **중요**: JetBrains 원격 개발 시 **설정 -> 플러그인 (호스트)**를 통해 원격 호스트에 플러그인을 설치해야 합니다. 로컬 클라이언트 머신이 아닌 원격 호스트에 설치합니다.

### WSL 구성

WSL 사용자는 추가 구성이 필요할 수 있습니다:
- 적절한 터미널 구성
- 네트워킹 모드 조정
- 방화벽 설정 업데이트

자세한 내용은 [WSL 문제 해결 가이드](/ko/troubleshooting#jetbrains-ide-not-detected-on-wsl2)를 참조하세요.

---

## 문제 해결

### 플러그인이 작동하지 않음

- 프로젝트 루트 디렉터리에서 Claude Code를 실행 중인지 확인
- JetBrains 플러그인이 IDE 설정에서 활성화되어 있는지 확인
- IDE를 완전히 다시 시작 (여러 번 수행 필요할 수 있음)
- 원격 개발의 경우 플러그인이 원격 호스트에 설치되어 있는지 확인

### IDE가 감지되지 않음

- 플러그인 설치 및 활성화 확인
- IDE 완전히 다시 시작
- 통합 터미널에서 Claude Code 실행 중인지 확인
- WSL 사용자는 [WSL 문제 해결 가이드](/ko/troubleshooting#jetbrains-ide-not-detected-on-wsl2) 참조

### 명령을 찾을 수 없음

Claude 아이콘 클릭 시 "명령을 찾을 수 없음" 표시:

1. Claude Code 설치 확인: `npm list -g @anthropic-ai/claude-code`
2. 플러그인 설정에서 Claude 명령 경로 구성
3. WSL 사용자는 WSL 명령 형식 사용

---

## 보안 고려 사항

Claude Code가 자동 편집 권한이 활성화된 JetBrains IDE에서 실행될 때:
- IDE 구성 파일을 수정할 수 있음
- bash 실행에 대한 권한 프롬프트를 우회할 수 있음

권장 사항:
- 편집에 대한 **수동 승인 모드** 사용
- Claude가 신뢰할 수 있는 프롬프트로만 사용되도록 주의
- Claude Code가 수정할 수 있는 파일 인식

추가 도움말은 [문제 해결 가이드](/ko/troubleshooting)를 참조하세요.
