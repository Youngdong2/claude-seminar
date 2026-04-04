# Claude Code의 작동 방식 (공식 문서)

- **출처**: Claude Code 공식 문서
- **링크**: https://code.claude.com/docs/ko/how-claude-code-works
- **관련 문서**:
  - 일반적인 워크플로우: https://code.claude.com/docs/ko/common-workflows
  - Claude Code 확장: https://code.claude.com/docs/ko/features-overview
  - 도구 레퍼런스: https://code.claude.com/docs/ko/tools-reference
  - 메모리 (CLAUDE.md): https://code.claude.com/docs/ko/memory
  - Skills: https://code.claude.com/docs/ko/skills
  - MCP: https://code.claude.com/docs/ko/mcp
  - Hooks: https://code.claude.com/docs/ko/hooks
  - Subagents: https://code.claude.com/docs/ko/sub-agents
  - 권한: https://code.claude.com/docs/ko/permissions
  - 모델 설정: https://code.claude.com/docs/ko/model-config
  - 비용 관리: https://code.claude.com/docs/ko/costs
  - GitHub Actions: https://code.claude.com/docs/ko/github-actions
  - VS Code: https://code.claude.com/docs/ko/vs-code
  - JetBrains: https://code.claude.com/docs/ko/jetbrains
  - 데스크톱 앱: https://code.claude.com/docs/ko/desktop
  - 원격 제어: https://code.claude.com/docs/ko/remote-control
  - Slack: https://code.claude.com/docs/ko/slack
  - Chrome 확장: https://code.claude.com/docs/ko/chrome

---

## 에이전트 루프

Claude에게 작업을 주면 세 가지 단계를 거침:

1. **컨텍스트 수집** - 파일 검색, 코드 이해
2. **작업 수행** - 편집, 실행
3. **결과 검증** - 테스트 실행, 확인

이 단계들이 작업 완료될 때까지 반복되며, 사용자가 언제든지 중단하여 방향 수정 가능.

### 모델

- **Sonnet**: 대부분의 코딩 작업에 적합
- **Opus**: 복잡한 아키텍처 결정을 위한 강력한 추론
- 세션 중 `/model`로 전환 가능, `claude --model <name>`으로 시작 가능

### 도구 (5가지 범주)

| 범주 | 할 수 있는 것 |
|------|-------------|
| **파일 작업** | 파일 읽기, 코드 편집, 새 파일 생성, 이름 변경 및 재구성 |
| **검색** | 패턴으로 파일 찾기, 정규식으로 콘텐츠 검색, 코드베이스 탐색 |
| **실행** | 셸 명령 실행, 서버 시작, 테스트 실행, git 사용 |
| **웹** | 웹 검색, 문서 가져오기, 오류 메시지 조회 |
| **코드 인텔리전스** | 타입 오류/경고 확인, 정의로 이동, 참조 찾기 |

---

## Claude가 접근할 수 있는 것

- **프로젝트**: 디렉토리 및 하위 디렉토리의 파일
- **터미널**: 빌드 도구, git, 패키지 관리자 등 모든 명령
- **git 상태**: 현재 브랜치, 커밋되지 않은 변경 사항, 최근 커밋 기록
- **CLAUDE.md**: 프로젝트별 지침, 규칙, 컨텍스트
- **자동 메모리**: 프로젝트 패턴 및 사용자 선호도 자동 저장
- **확장**: MCP servers, skills, subagents, Chrome 확장

---

## 실행 환경

| 환경 | 코드 실행 위치 | 사용 사례 |
|------|-------------|----------|
| **로컬** | 사용자 머신 | 기본값. 파일, 도구, 환경에 대한 전체 접근 |
| **클라우드** | Anthropic 관리 VM | 작업 오프로드, 로컬에 없는 리포지토리에서 작업 |
| **원격 제어** | 사용자 머신, 브라우저에서 제어 | 웹 UI 사용하면서 모든 것을 로컬로 유지 |

---

## 세션으로 작업

- **세션은 독립적**: 각 새 세션은 이전 대화 기록 없이 새 컨텍스트 윈도우로 시작
- **세션 간 학습 유지**: 자동 메모리, CLAUDE.md 활용
- **세션 재개**: `claude --continue` 또는 `claude --resume`
- **세션 포크**: `claude --continue --fork-session` (원본에 영향 없이 다른 접근 시도)
- **병렬 작업**: git worktrees로 별도 디렉토리에서 병렬 Claude 세션 실행

### 컨텍스트 윈도우

- 대화 기록, 파일 콘텐츠, 명령 출력, CLAUDE.md, 자동 메모리, skills, 시스템 지침 포함
- 한계 접근 시 자동 압축 (이전 도구 출력 지우기 → 대화 요약)
- `/context`로 공간 사용 현황 확인
- `/compact`로 포커스와 함께 압축 가능

### Skills & Subagents로 컨텍스트 관리

- **Skills**: 요청 시 로드 (설명만 먼저 로드, 전체 콘텐츠는 사용 시 로드)
- **Subagents**: 별도 컨텍스트 윈도우에서 작업 → 메인 컨텍스트 부풀리지 않음

---

## 안전 메커니즘

### 체크포인트

- 모든 파일 편집은 되돌릴 수 있음
- `Esc` 두 번 눌러 이전 상태로 복원 가능
- 파일 변경만 다룸 (원격 시스템 작업은 체크포인트 불가)

### 권한 모드 (`Shift+Tab`으로 순환)

| 모드 | 동작 |
|------|------|
| **기본값** | 파일 편집 및 셸 명령 전에 요청 |
| **자동 수락 편집** | 파일 편집은 자동, 명령은 요청 |
| **계획 모드** | 읽기 전용 도구만 사용, 승인할 계획 생성 |
| **자동 모드** | 백그라운드 안전 검사로 모든 작업 평가 (연구 미리보기) |

---

## 효과적인 사용 팁

### 1. Claude Code에 도움 요청
- `/init` → CLAUDE.md 생성 안내
- `/agents` → 커스텀 subagents 구성
- `/doctor` → 설치 문제 진단

### 2. 대화형으로 사용
- 완벽한 프롬프트 불필요, 시작 후 반복 개선
- 언제든지 중단하고 방향 수정 가능

### 3. 처음부터 구체적으로
- 특정 파일 참조, 제약 조건 언급, 예제 패턴 지적
- 모호한 프롬프트 → 더 많은 조종 시간 소비

### 4. 검증 가능한 것 제공
- 테스트 케이스 포함
- 예상 UI 스크린샷 붙여넣기
- 원하는 출력 정의

### 5. 구현 전 탐색
- 계획 모드(`Shift+Tab` 두 번)로 먼저 코드베이스 분석
- 계획 검토 → 대화로 개선 → 구현 (2단계 접근)

### 6. 지시하지 말고 위임
- 컨텍스트와 방향 제공 → Claude가 세부 사항 파악
- 읽을 파일이나 실행할 명령 지정 불필요
