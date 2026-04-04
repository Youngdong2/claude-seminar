# Managing Context on the Claude Developer Platform

- **출처**: Claude 공식 블로그
- **링크**: https://claude.com/blog/context-management
- **날짜**: 2025-09-29 (수정: 2026-01-06)
- **카테고리**: Product announcements
- **참고 링크**:
  - 컨텍스트 편집 문서: https://docs.claude.com/en/docs/build-with-claude/context-editing
  - 메모리 도구 문서: https://docs.claude.com/en/docs/agents-and-tools/tool-use/memory-tool
  - 도구 사용 메모리 쿡북: https://platform.claude.com/cookbook/tool-use-memory-cookbook

---

## 개요

Anthropic이 에이전트 컨텍스트를 관리하기 위한 두 가지 새로운 기능인 **컨텍스트 편집(Context Editing)**과 **메모리 도구(Memory Tool)**를 발표했다. Claude Sonnet 4.5와 함께 작동하며, 긴 태스크를 처리하면서도 컨텍스트 제한에 걸리거나 중요한 정보를 잃지 않는 AI 에이전트를 구축할 수 있게 한다.

---

## 1. 컨텍스트 윈도우의 한계

> "컨텍스트 윈도우에는 한계가 있지만, 실제 작업에는 한계가 없다."

### 1.1 컨텍스트 편집 (Context Editing)

토큰 한계에 접근할 때 **오래된 도구 호출과 결과를 자동으로 제거**한다.

- 에이전트가 태스크를 실행하고 도구 결과를 축적하면, **오래된 콘텐츠가 정리**됨
- **대화 흐름은 보존**하면서 효과적으로 에이전트 런타임을 연장
- 관련 정보에만 집중하여 **모델 성능 향상**

### 1.2 메모리 도구 (Memory Tool)

컨텍스트 윈도우 **외부에서 정보를 저장하고 검색**할 수 있는 파일 기반 시스템.

- 전용 메모리 디렉토리에서 파일을 **생성, 읽기, 업데이트, 삭제**
- **사용자 인프라에 저장**되어 대화 간 지속
- 도구 호출을 통해 완전히 **클라이언트 사이드**에서 동작
- 개발자에게 스토리지 백엔드와 데이터 지속성에 대한 **완전한 제어** 제공

### 1.3 Claude Sonnet 4.5의 내장 컨텍스트 인식

Claude Sonnet 4.5는 대화 전반에 걸쳐 **사용 가능한 토큰을 추적**하여 컨텍스트를 더 효과적으로 관리하는 내장 컨텍스트 인식 기능을 포함한다.

---

## 2. 성능 개선 결과

에이전틱 검색 태스크에 대한 내부 평가 결과:

| 접근법 | 성능 개선 |
|---|---|
| **메모리 도구 + 컨텍스트 편집 조합** | **39% 향상** |
| **컨텍스트 편집 단독** | **29% 향상** |

### 100턴 웹 검색 평가

- 컨텍스트 편집으로 컨텍스트 소진으로 인해 **실패했을 워크플로우가 완료** 가능
- **토큰 소비 84% 감소**

---

## 3. 장기 실행 에이전트 구축

### 3.1 코딩 (Coding)

- **컨텍스트 편집**: 이전 파일 읽기와 테스트 결과 정리
- **메모리**: 디버깅 인사이트와 아키텍처 결정 보존

### 3.2 연구 (Research)

- **메모리**: 핵심 발견사항 저장
- **컨텍스트 편집**: 이전 검색 결과 제거
- 시간이 지남에 따라 성능을 향상시키는 **지식 베이스 구축**

### 3.3 데이터 처리 (Data Processing)

- **메모리**: 중간 결과 저장
- **컨텍스트 편집**: 원시 데이터 정리
- 토큰 한계를 초과하는 **워크플로우 처리 가능**

---

## 4. 시작하기

공개 베타로 Claude Developer Platform에서 사용 가능하며, **Amazon Bedrock**과 **Google Cloud의 Vertex AI**를 통해 네이티브로 제공된다.

### 관련 문서

- [컨텍스트 편집 문서](https://docs.claude.com/en/docs/build-with-claude/context-editing)
- [메모리 도구 문서](https://docs.claude.com/en/docs/agents-and-tools/tool-use/memory-tool)
- [도구 사용 메모리 쿡북](https://platform.claude.com/cookbook/tool-use-memory-cookbook)

---

## 핵심 요약

1. **컨텍스트 편집**은 오래된 도구 호출을 자동 정리하여 에이전트 런타임을 연장
2. **메모리 도구**는 컨텍스트 윈도우 외부에서 정보를 파일 기반으로 지속적 저장
3. 두 기능의 조합으로 **39% 성능 향상**, 컨텍스트 편집만으로도 **29% 향상**
4. 100턴 웹 검색에서 **토큰 소비 84% 감소**
5. 코딩, 연구, 데이터 처리 등 **장기 실행 에이전트** 시나리오에 최적화
