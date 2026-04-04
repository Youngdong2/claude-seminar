# Chrome에서 Claude Code 사용하기 - 베타 (공식 문서)

- **출처**: Claude Code 공식 문서
- **링크**: https://code.claude.com/docs/ko/chrome
- **관련 링크**:
  - [Google Chrome 다운로드](https://www.google.com/chrome/)
  - [Claude in Chrome 확장 프로그램](https://chromewebstore.google.com/detail/claude/fcoeoabgfenejglbffodgkkbkcdhcgfn)
  - [Claude Code 빠른 시작](/ko/quickstart#step-1-install-claude-code)
  - [VS Code에서 브라우저 자동화](/ko/vs-code#automate-browser-tasks-with-chrome)
  - [CLI 참조](/ko/cli-reference)
  - [일반적인 워크플로우](/ko/common-workflows)
  - [데이터 및 개인정보](/ko/data-usage)
  - [Chrome에서 Claude 시작하기 (전체 문서)](https://support.claude.com/en/articles/12012173-getting-started-with-claude-in-chrome)

---

## 개요

Claude Code는 Claude in Chrome 브라우저 확장 프로그램과 통합되어 CLI 또는 VS Code 확장 프로그램에서 브라우저 자동화 기능을 제공합니다. 코드를 작성한 후 컨텍스트를 전환하지 않고 브라우저에서 테스트하고 디버깅합니다.

### 핵심 특징

- 브라우저 작업을 위해 **새 탭**을 열고 브라우저의 **로그인 상태를 공유**
- 작업이 **실시간**으로 Chrome 창에서 실행
- 로그인 페이지나 CAPTCHA를 만나면 일시 중지, 수동 처리 요청

> 베타 버전이며 현재 Google Chrome에서만 작동합니다. Brave, Arc 등 기타 Chromium 기반 브라우저 미지원. WSL도 미지원.

---

## 기능

| 기능 | 설명 |
|------|------|
| **라이브 디버깅** | 콘솔 오류/DOM 상태 읽고 코드 수정 |
| **디자인 검증** | Figma 목업에서 UI 빌드 후 브라우저 확인 |
| **웹 앱 테스트** | 양식 유효성 검사, 시각적 회귀, 사용자 흐름 검증 |
| **인증된 웹 앱** | Google Docs, Gmail, Notion 등 로그인한 앱과 상호작용 |
| **데이터 추출** | 웹 페이지에서 구조화된 정보 추출, 로컬 저장 |
| **작업 자동화** | 데이터 입력, 양식 작성, 다중 사이트 워크플로우 자동화 |
| **세션 기록** | 브라우저 상호작용을 GIF로 기록 |

---

## 필수 요구사항

- [Google Chrome](https://www.google.com/chrome/) 브라우저
- [Claude in Chrome 확장 프로그램](https://chromewebstore.google.com/detail/claude/fcoeoabgfenejglbffodgkkbkcdhcgfn) 버전 1.0.36 이상
- [Claude Code](/ko/quickstart#step-1-install-claude-code) 버전 2.0.73 이상
- 직접 Anthropic 플랜 (Pro, Max, Team 또는 Enterprise)

> Chrome 통합은 Amazon Bedrock, Google Cloud Vertex AI, Microsoft Foundry와 같은 타사 제공자를 통해 사용할 수 없습니다.

---

## CLI에서 시작하기

### 1단계: Chrome으로 Claude Code 시작

```bash
claude --chrome
```

기존 세션 내에서는 `/chrome` 실행으로 활성화.

### 2단계: Claude에게 브라우저 사용 요청

```text
code.claude.com/docs로 이동하여 검색 상자를 클릭하고,
"hooks"를 입력한 후 나타나는 결과를 알려주세요.
```

### 연결 상태 확인

언제든지 `/chrome` 실행으로 연결 상태 확인, 권한 관리, 확장 프로그램 재연결.

### VS Code에서 사용

[VS Code에서 브라우저 자동화](/ko/vs-code#automate-browser-tasks-with-chrome) 참조.

---

## 기본적으로 Chrome 활성화

- CLI: `/chrome` 실행 -> "기본적으로 활성화" 선택
- VS Code 확장 프로그램: Chrome 확장 프로그램 설치만 하면 추가 플래그 불필요

> 기본 활성화 시 브라우저 도구가 항상 로드되므로 컨텍스트 사용량이 증가합니다. 필요 시에만 `--chrome` 사용 권장.

### 사이트 권한 관리

Chrome 확장 프로그램 설정에서 Claude가 탐색/클릭/입력할 수 있는 사이트를 제어합니다.

---

## 예제 워크플로우

### 로컬 웹 애플리케이션 테스트

```text
방금 로그인 양식 유효성 검사를 업데이트했습니다. localhost:3000을 열고,
잘못된 데이터로 양식을 제출해 보고, 오류 메시지가 올바르게
나타나는지 확인해 주시겠어요?
```

### 콘솔 로그로 디버깅

```text
대시보드 페이지를 열고 페이지가 로드될 때 콘솔에서 오류를
확인해 주세요.
```

### 양식 작성 자동화

```text
contacts.csv에 고객 연락처 스프레드시트가 있습니다. 각 행에 대해
crm.example.com의 CRM으로 이동하여 "연락처 추가"를 클릭하고
이름, 이메일 및 전화 필드를 작성해 주세요.
```

### Google Docs에서 콘텐츠 작성

```text
최근 커밋을 기반으로 프로젝트 업데이트를 작성하고
docs.google.com/document/d/abc123의 Google Doc에 추가해 주세요.
```

### 웹 페이지에서 데이터 추출

```text
제품 목록 페이지로 이동하여 각 항목의 이름, 가격 및 가용성을
추출합니다. 결과를 CSV 파일로 저장해 주세요.
```

### 다중 사이트 워크플로우

```text
내 캘린더에서 내일의 회의를 확인한 후, 외부 참석자가 있는 각
회의에 대해 해당 회사 웹사이트를 찾아보고 그들이 하는 일에 대한
메모를 추가해 주세요.
```

### 데모 GIF 기록

```text
장바구니에 항목을 추가하는 것부터 확인 페이지까지 체크아웃
흐름을 완료하는 방법을 보여주는 GIF를 기록해 주세요.
```

---

## 문제 해결

### 확장 프로그램이 감지되지 않음

1. `chrome://extensions`에서 확장 프로그램 설치/활성화 확인
2. `claude --version`으로 최신 버전 확인
3. Chrome 실행 중인지 확인
4. `/chrome` -> "확장 프로그램 다시 연결" 선택
5. Claude Code와 Chrome 모두 다시 시작

처음 Chrome 통합 활성화 시 네이티브 메시징 호스트 구성 파일이 설치됩니다. 첫 번째 시도에서 감지 안 되면 Chrome 다시 시작.

**호스트 구성 파일 위치:**

| OS | 경로 |
|----|------|
| **macOS** | `~/Library/Application Support/Google/Chrome/NativeMessagingHosts/com.anthropic.claude_code_browser_extension.json` |
| **Linux** | `~/.config/google-chrome/NativeMessagingHosts/com.anthropic.claude_code_browser_extension.json` |
| **Windows** | 레지스트리: `HKCU\Software\Google\Chrome\NativeMessagingHosts\` |

### 브라우저가 응답하지 않음

1. 모달 대화 상자 (경고, 확인, 프롬프트)가 페이지를 차단하는지 확인 -> 수동으로 닫기
2. Claude에게 새 탭 만들고 다시 시도 요청
3. `chrome://extensions`에서 확장 프로그램 비활성화/재활성화

### 긴 세션 중 연결 끊김

서비스 워커가 유휴 상태가 될 수 있음. `/chrome` -> "확장 프로그램 다시 연결" 선택.

### Windows 관련 문제

- **명명된 파이프 충돌 (EADDRINUSE)**: Claude Code 다시 시작. 다른 Chrome 사용 세션 모두 닫기
- **네이티브 메시징 호스트 오류**: Claude Code 다시 설치하여 호스트 구성 재생성

---

## 일반적인 오류 메시지

| 오류 | 원인 | 해결 방법 |
|------|------|----------|
| "브라우저 확장 프로그램이 연결되지 않음" | 네이티브 메시징 호스트가 확장 프로그램에 도달 불가 | Chrome과 Claude Code 다시 시작 후 `/chrome` 실행 |
| "확장 프로그램이 감지되지 않음" | 확장 프로그램 미설치/비활성화 | `chrome://extensions`에서 설치/활성화 |
| "사용 가능한 탭 없음" | Claude가 탭 준비 전에 작동 시도 | 새 탭 만들고 다시 시도 요청 |
| "수신 끝이 존재하지 않음" | 확장 프로그램 서비스 워커 유휴 상태 | `/chrome` -> "확장 프로그램 다시 연결" |

---

## 참고 항목

- [VS Code에서 Claude Code 사용](/ko/vs-code#automate-browser-tasks-with-chrome)
- [CLI 참조](/ko/cli-reference) (`--chrome` 플래그)
- [일반적인 워크플로우](/ko/common-workflows)
- [데이터 및 개인정보](/ko/data-usage)
- [Chrome에서 Claude 시작하기 (전체 문서)](https://support.claude.com/en/articles/12012173-getting-started-with-claude-in-chrome)
