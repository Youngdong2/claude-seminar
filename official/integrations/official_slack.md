# Slack의 Claude Code (공식 문서)

- **출처**: Claude Code 공식 문서
- **링크**: https://code.claude.com/docs/ko/slack
- **관련 링크**:
  - [Slack 앱 마켓플레이스](https://slack.com/marketplace/A08SF47R6P4)
  - [claude.ai/code](https://claude.ai/code)
  - [웹의 Claude Code](/ko/claude-code-on-the-web)
  - [Slack용 Claude](https://claude.com/claude-and-slack)
  - [Claude 도움말 센터](https://support.claude.com)

---

## 개요

Slack의 Claude Code는 Claude Code의 강력한 기능을 Slack 워크스페이스에 직접 가져옵니다. `@Claude`를 언급하여 코딩 작업을 요청하면, Claude가 자동으로 의도를 감지하고 웹에서 Claude Code 세션을 생성합니다.

기존 Slack용 Claude 앱 위에 코딩 관련 요청에 대한 웹의 Claude Code 지능형 라우팅을 추가합니다.

---

## 사용 사례

- **버그 조사 및 수정**: Slack 채널에서 보고된 버그를 조사/수정 요청
- **빠른 코드 검토 및 수정**: 팀 피드백 기반 기능 구현/리팩토링
- **협업 디버깅**: 팀 토론의 컨텍스트를 활용한 디버깅
- **병렬 작업 실행**: Slack에서 코딩 작업 시작, 완료 시 알림 수신

---

## 필수 조건

| 요구 사항 | 세부 정보 |
|----------|----------|
| Claude 플랜 | Pro, Max, Team 또는 Enterprise (프리미엄 시트) |
| 웹의 Claude Code | [웹의 Claude Code](/ko/claude-code-on-the-web) 액세스 활성화 필요 |
| GitHub 계정 | 웹의 Claude Code에 연결, 최소 하나의 저장소 인증 |
| Slack 인증 | Claude 앱을 통해 Claude 계정에 연결된 Slack 계정 |

---

## 설정 방법

### 1단계: Slack에 Claude 앱 설치

워크스페이스 관리자가 [Slack 앱 마켓플레이스](https://slack.com/marketplace/A08SF47R6P4)에서 Claude 앱 설치.

### 2단계: Claude 계정 연결

1. Slack 앱 섹션에서 "Claude" 클릭
2. 앱 홈 탭으로 이동
3. "연결" 클릭 -> Slack 계정을 Claude 계정과 연결
4. 브라우저에서 인증 흐름 완료

### 3단계: 웹의 Claude Code 구성

- [claude.ai/code](https://claude.ai/code) 방문, Slack에 연결한 동일한 계정으로 로그인
- GitHub 계정 연결 (미연결 시)
- 최소 하나의 저장소 인증

### 4단계: 라우팅 모드 선택

Slack의 Claude 앱 홈에서 **라우팅 모드** 설정:

| 모드 | 동작 |
|------|------|
| **코드만** | 모든 @mentions을 Claude Code 세션으로 라우팅. 개발 전용 팀에 적합 |
| **코드 + 채팅** | 메시지 분석 후 Claude Code (코딩) / Claude Chat (작성, 분석, 일반 질문) 간 지능형 라우팅 |

> 코드 + 채팅 모드에서 잘못 라우팅되면 "코드로 다시 시도" 또는 "채팅으로 전환" 가능.

---

## 작동 방식

### 자동 감지

@Claude를 언급하면 메시지를 분석하여 코딩 작업 여부 결정. 코딩 의도 감지 시 웹의 Claude Code로 라우팅.

> Slack의 Claude Code는 채널 (공개/비공개)에서만 작동합니다. DM에서는 작동하지 않습니다.

### 컨텍스트 수집

- **스레드에서**: 해당 스레드의 모든 메시지에서 컨텍스트 수집
- **채널에서**: 최근 채널 메시지에서 관련 컨텍스트 확인

> **주의**: Claude는 대화 컨텍스트의 다른 메시지 지시를 따를 수 있으므로, 신뢰할 수 있는 Slack 대화에서만 사용해야 합니다.

### 세션 흐름

1. **시작**: @Claude를 코딩 요청과 함께 언급
2. **감지**: 메시지 분석, 코딩 의도 감지
3. **세션 생성**: claude.ai/code에서 새 Claude Code 세션 생성
4. **진행 상황 업데이트**: Slack 스레드에 상태 업데이트 게시
5. **완료**: 요약 및 작업 버튼과 함께 @mentions
6. **검토**: "세션 보기" 또는 "PR 생성" 클릭

---

## 사용자 인터페이스 요소

### 앱 홈

연결 상태 표시, Claude 계정 연결/해제.

### 메시지 작업

| 작업 | 설명 |
|------|------|
| **세션 보기** | 브라우저에서 전체 Claude Code 세션 열기 |
| **PR 생성** | 세션 변경 사항에서 풀 요청 생성 |
| **코드로 다시 시도** | 채팅 응답 대신 Claude Code 작업으로 재시도 |
| **저장소 변경** | Claude가 잘못 선택한 저장소 변경 |

### 저장소 선택

Claude가 대화 컨텍스트 기반으로 자동 선택. 여러 저장소 적용 가능 시 드롭다운 표시.

---

## 액세스 및 권한

### 사용자 수준 액세스

| 액세스 유형 | 요구 사항 |
|-----------|----------|
| Claude Code 세션 | 각 사용자는 자신의 Claude 계정에서 세션 실행 |
| 사용량/속도 제한 | 개별 사용자 플랜 제한에 계산 |
| 저장소 액세스 | 개인적으로 연결한 저장소에만 액세스 |
| 세션 기록 | claude.ai/code의 Claude Code 기록에 표시 |

### 워크스페이스 관리자 권한

관리자가 Claude 앱 설치 여부 제어. 개별 사용자는 자신의 Claude 계정으로 인증.

---

## 모범 사례

### 효과적인 요청 작성

- **구체적으로**: 파일 이름, 함수 이름, 오류 메시지 포함
- **컨텍스트 제공**: 저장소/프로젝트 언급
- **성공 정의**: 테스트 작성, 문서 업데이트, PR 생성 등 "완료" 기준 설명
- **스레드 사용**: 버그/기능 논의 시 스레드에서 회신하여 전체 컨텍스트 제공

### Slack vs 웹 사용 시기

**Slack 사용**:
- 컨텍스트가 이미 Slack 토론에 있을 때
- 비동기적 작업 시작
- 팀원과 가시성 필요한 협업

**웹 직접 사용**:
- 파일 업로드 필요
- 실시간 상호 작용
- 더 길고 복잡한 작업

---

## 문제 해결

### 세션이 시작되지 않음

1. Claude 앱 홈에서 계정 연결 확인
2. 웹의 Claude Code 액세스 활성화 확인
3. GitHub 저장소 최소 하나 연결 확인

### 저장소가 표시되지 않음

1. [claude.ai/code](https://claude.ai/code)에서 저장소 연결
2. GitHub 권한 확인
3. GitHub 계정 연결 해제/재연결

### 잘못된 저장소 선택됨

1. "저장소 변경" 버튼으로 다른 저장소 선택
2. 요청에 저장소 이름 명시

### 인증 오류

1. 앱 홈에서 계정 연결 해제/재연결
2. 브라우저에서 올바른 Claude 계정 로그인 확인
3. Claude 플랜에 Code 액세스 포함 확인

### 세션 만료

- [claude.ai/code](https://claude.ai/code)에서 과거 세션 계속/참조 가능

---

## 현재 제한 사항

- **GitHub만**: 현재 GitHub 저장소만 지원
- **한 번에 하나의 PR**: 각 세션은 하나의 풀 요청 생성 가능
- **속도 제한 적용**: 개별 Claude 플랜의 속도 제한 사용
- **웹 액세스 필요**: 웹의 Claude Code 액세스가 없으면 표준 채팅 응답만 수신

---

## 관련 리소스

- [웹의 Claude Code](/ko/claude-code-on-the-web)
- [Slack용 Claude](https://claude.com/claude-and-slack)
- [Slack 앱 마켓플레이스](https://slack.com/marketplace/A08SF47R6P4)
- [Claude 도움말 센터](https://support.claude.com)
