# Claude Code on the Web

- **출처**: Claude 공식 블로그
- **링크**: https://claude.com/blog/claude-code-on-the-web
- **날짜**: 2025-10-20 (최종 업데이트: 2025-11-12)
- **카테고리**: Product announcements
- **참고 링크**:
  - [Engineering Blog - Claude Code Sandboxing](https://www.anthropic.com/engineering/claude-code-sandboxing)
  - [Sandboxing Documentation](https://docs.claude.com/en/docs/claude-code/sandboxing)
  - [Claude Code on the Web](http://claude.com/code)
  - [Claude Code on the Web Documentation](https://docs.claude.com/en/docs/claude-code/claude-code-on-the-web)

---

## 개요

개발자가 **브라우저에서 직접** 코딩 작업을 위임할 수 있는 Claude Code on the web을 소개한다. Anthropic 관리형 클라우드 인프라에서 실행되며, 버그 백로그 처리, 루틴 수정, 병렬 개발 작업에 적합하다.

**제공 범위**: 베타 리서치 프리뷰로 출시. Pro, Max 사용자뿐 아니라 프리미엄 시트를 보유한 Team 및 Enterprise 사용자에게도 제공.

## 1. 병렬 코딩 작업 실행

### 핵심 기능
- **터미널 열 필요 없이** 코딩 세션 시작
- GitHub 저장소 연결 후 요구사항 기술 -> Claude가 구현 처리
- 각 세션이 **격리된 환경**에서 실행
- **실시간 진행 상황 추적**
- 작업 실행 중 개발자가 Claude의 방향을 적극적으로 안내 가능

### 주요 역량
- **여러 저장소에 걸쳐 단일 인터페이스에서 다중 작업 병렬 실행**
- **자동 PR 생성**과 명확한 변경 요약으로 빠른 출시

## 2. 유연한 워크플로우 지원

### 클라우드 기반 실행이 특히 효과적인 경우
- **프로젝트 구조 파악**: 프로젝트 구조 및 저장소 매핑에 대한 질문 답변
- **버그 수정**: 루틴하고 잘 정의된 작업
- **백엔드 변경**: 테스트 주도 개발(TDD)로 수정 검증 가능한 경우

### 모바일 지원
- 리서치 프리뷰의 일환으로 **iOS에서 Claude Code 사용 가능**
- 초기 프리뷰 단계로 사용자 피드백 기반 개선 예정

## 3. 보안 최우선 클라우드 실행

### 격리 환경
- 모든 Claude Code 작업이 **격리된 샌드박스 환경**에서 실행
- **네트워크 및 파일시스템 제한** 적용
- Git 상호작용은 **보안 프록시 서비스**를 통해 발생
- Claude는 **승인된 저장소에만** 접근 가능
- 워크플로우 전반에 걸쳐 코드와 자격 증명 보호

### 커스텀 네트워크 설정
- Claude Code가 샌드박스에서 연결할 수 있는 **도메인 지정 가능**
- 예시: npm 패키지 다운로드 허용 -> 테스트 실행 및 변경 검증 활성화

## 4. 시작하기

1. [claude.com/code](http://claude.com/code) 방문
2. 첫 저장소 연결
3. 작업 위임 시작

**참고**: 클라우드 기반 세션은 다른 모든 Claude Code 사용량과 **요금 한도를 공유**한다.
