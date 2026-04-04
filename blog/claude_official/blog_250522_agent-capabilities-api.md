# New Capabilities for Building Agents on the Anthropic API

- **출처**: Claude 공식 블로그
- **링크**: https://claude.com/blog/agent-capabilities-api
- **날짜**: 2025-05-22
- **카테고리**: Product announcements
- **참고 링크**:
  - Anthropic API 문서: https://docs.anthropic.com/en/docs/overview
  - 코드 실행 도구: https://docs.anthropic.com/en/docs/agents-and-tools/tool-use/code-execution-tool
  - MCP 커넥터: https://docs.anthropic.com/en/docs/agents-and-tools/mcp-connector
  - 원격 MCP 서버: https://docs.anthropic.com/en/docs/agents-and-tools/remote-mcp-servers
  - Files API: https://docs.anthropic.com/en/docs/build-with-claude/files
  - 프롬프트 캐싱: https://docs.anthropic.com/en/docs/build-with-claude/prompt-caching
  - 프롬프트 캐싱 가격: https://docs.claude.com/en/docs/build-with-claude/prompt-caching#pricing
  - Zapier MCP: https://zapier.com/mcp
  - Asana MCP: https://developers.asana.com/docs/using-asasons-model-control-protocol-mcp-server
  - 개발자 컨퍼런스 키노트: https://www.youtube.com/live/EvtPBaaykdo

---

## 개요

Anthropic API에서 에이전트를 구축하기 위한 4가지 새로운 베타 기능이 Claude Opus 4 및 Sonnet 4와 함께 출시되었다:

1. **코드 실행 도구 (Code Execution Tool)**
2. **MCP 커넥터 (MCP Connector)**
3. **Files API**
4. **확장 프롬프트 캐싱 (Extended Prompt Caching)**

> 예시: "프로젝트 관리 AI 에이전트가 MCP 커넥터로 Asana에 연결하여 태스크를 참조하고 업무를 할당하며, Files API로 관련 보고서를 업로드하고, 코드 실행 도구로 진행 상황과 리스크를 분석하며, 확장 프롬프트 캐싱으로 비용을 절감하면서 전체 컨텍스트를 유지할 수 있다."

---

## 1. 코드 실행 도구 (Code Execution Tool)

### 설명

Anthropic API에서 Claude가 **샌드박스 환경**에서 Python 코드를 실행하여 계산 결과와 데이터 시각화를 생성할 수 있다. 이를 통해 Claude는 코드 어시스턴트에서 **데이터 분석가**로 변환된다.

### 기능

- 데이터셋 로드
- 탐색적 차트 생성
- 패턴 식별
- 실행 결과에 기반한 반복적 출력 개선
- 복잡한 분석 태스크 엔드투엔드 처리

### 주요 사용 사례

| 분야 | 활용 |
|---|---|
| **금융 모델링** | 예측, 포트폴리오 분석, 금융 메트릭 |
| **과학 컴퓨팅** | 시뮬레이션, 실험 데이터, 연구 데이터셋 |
| **비즈니스 인텔리전스** | 자동화 보고서, 매출 분석, 성과 대시보드 |
| **문서 처리** | 데이터 추출, 보고서 생성, 워크플로우 자동화 |
| **통계 분석** | 회귀, 가설 검정, 예측 모델링 |

### 가격

- 조직당 하루 **50시간 무료** 사용
- 추가 사용 시 컨테이너당 시간당 **$0.05**

---

## 2. MCP 커넥터 (MCP Connector)

### 설명

> "Anthropic API의 MCP 커넥터는 개발자가 클라이언트 코드를 작성하지 않고도 Claude를 모든 원격 Model Context Protocol (MCP) 서버에 연결할 수 있게 한다."

기존에는 MCP 연결에 커스텀 클라이언트 하네스가 필요했으나, 이제 Anthropic API가 **모든 연결 관리, 도구 발견, 오류 처리를 자동으로** 처리한다.

### 자동 처리 기능

MCP 서버가 설정되면 Claude가 자동으로:

1. 지정된 MCP 서버에 **연결**
2. 사용 가능한 **도구 검색**
3. 어떤 도구를 어떤 인수로 호출할지 **추론**
4. 충분한 결과가 달성될 때까지 **에이전틱하게 도구 호출 실행**
5. **인증과 오류 처리** 관리
6. 통합된 데이터와 함께 **향상된 응답 반환**

### 에코시스템 통합

- Zapier: https://zapier.com/mcp
- Asana: https://developers.asana.com/docs/using-asasons-model-control-protocol-mcp-server

---

## 3. Files API

### 설명

> "Files API는 개발자가 Claude로 구축할 때 문서를 저장하고 접근하는 방식을 간소화한다. 매 요청마다 파일 업로드를 관리하는 대신, 한 번 업로드하고 여러 대화에서 반복적으로 참조할 수 있다."

### 이점

- 개발 워크플로우 간소화
- 대규모 문서 세트가 필요한 애플리케이션에 특히 유용
- 지식 베이스, 기술 문서, 데이터셋 지원

### 향후 통합 계획

Files API가 코드 실행 도구와 통합되어 Claude가:

- 코드 실행 중 업로드된 파일을 **직접 접근 및 처리**
- 응답의 일부로 파일(차트, 그래프) **생성**
- 다시 업로드하지 않고 여러 세션에 걸쳐 **데이터셋 분석**

---

## 4. 확장 프롬프트 캐싱 (Extended Prompt Caching)

### 옵션

| 캐싱 타입 | TTL | 비고 |
|---|---|---|
| **표준** | 5분 | 기존 방식 |
| **확장 (베타)** | 1시간 | 추가 비용, 표준 대비 **12배 개선** |

### 장기 실행 워크플로우의 이점

확장 캐싱으로 고객은:

- 광범위한 배경 지식과 예시 제공 가능
- **비용 최대 90% 절감**
- 긴 프롬프트에 대한 **지연 시간 최대 85% 단축**

### 사용 사례

- 멀티스텝 워크플로우
- 복잡한 문서 분석
- 시스템 조정
- 이전에는 비용이 과도했던 장기 실행 에이전트 애플리케이션

---

## 시작하기

모든 기능은 **공개 베타**로 사용 가능하다.

- 전체 문서: https://docs.anthropic.com/en/docs/overview
- 개발자 컨퍼런스 키노트: https://www.youtube.com/live/EvtPBaaykdo

---

## 핵심 요약

1. **코드 실행 도구**: 샌드박스에서 Python 실행, 하루 50시간 무료, 이후 $0.05/시간
2. **MCP 커넥터**: 클라이언트 코드 없이 원격 MCP 서버 연결, 자동 도구 발견 및 실행
3. **Files API**: 한 번 업로드, 여러 대화에서 반복 참조, 향후 코드 실행 도구와 통합 예정
4. **확장 프롬프트 캐싱**: 5분에서 1시간으로 TTL 12배 확장, 비용 90% / 지연 시간 85% 절감
5. 4가지 기능을 조합하면 **종합적인 에이전트 구축 툴킷** 완성
