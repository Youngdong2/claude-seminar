# Building Agents with the Claude Agent SDK

- **출처**: Claude 공식 블로그
- **링크**: https://claude.com/blog/building-agents-with-the-claude-agent-sdk
- **날짜**: 2025-09-29
- **카테고리**: Claude Code, Agents
- **참고 링크**:
  - Claude Code 제품 페이지: https://claude.com/product/claude-code
  - 효과적인 에이전트 구축: https://anthropic.com/engineering/building-effective-agents
  - Anthropic 팀의 Claude Code 사용법: https://anthropic.com/news/how-anthropic-teams-use-claude-code
  - Claude Agent SDK 문서: https://docs.claude.com/en/api/agent-sdk/overview
  - 마이그레이션 가이드: https://docs.claude.com/en/docs/claude-code/sdk/migration-guide
  - Model Context Protocol: https://modelcontextprotocol.io/
  - MCP 에코시스템 (GitHub): https://github.com/modelcontextprotocol/servers
  - 에이전트를 위한 효과적인 도구 작성: https://anthropic.com/engineering/writing-tools-for-agents
  - 컨텍스트 검색: https://anthropic.com/news/contextual-retrieval
  - 서브에이전트 문서: https://docs.claude.com/en/api/agent-sdk/subagents
  - SDK 슬래시 커맨드: https://docs.claude.com/en/docs/claude-code/sdk/sdk-slash-commands
  - 커스텀 도구 문서: https://docs.claude.com/en/api/agent-sdk/custom-tools
  - 파일 생성 공지: https://anthropic.com/news/create-files

---

## 개요

Claude Agent SDK는 Claude Code 위에서 강력한 에이전트를 구축하기 위한 도구 모음이다. 원래 Claude Code SDK로 개발되었으나, 코딩 작업을 넘어선 광범위한 적용 가능성을 반영하여 **이름이 변경**되었다.

> "Claude Agent SDK의 핵심 설계 원칙은 에이전트에게 컴퓨터를 제공하여 인간처럼 작업할 수 있게 하는 것이다."

---

## 1. Claude에게 컴퓨터 주기

프로그래머가 매일 사용하는 동일한 도구를 Claude에게 제공한다:
- 파일 찾기, 쓰기, 편집
- 코드 린트, 실행, 디버그 반복

터미널과 bash 명령에 대한 접근 권한을 통해 **비코딩 작업**도 수행 가능:
- CSV 파일 읽기
- 웹 검색
- 시각화 구축
- 메트릭 해석

---

## 2. 새로운 유형의 에이전트 생성

| 에이전트 유형 | 설명 |
|---|---|
| **금융 에이전트** | 투자 평가 및 외부 API 접근 |
| **개인 비서 에이전트** | 여행 및 캘린더 관리 |
| **고객 지원 에이전트** | 데이터 수집을 통한 복잡한 티켓 처리 |
| **심층 연구 에이전트** | 문서 컬렉션 전반에 걸친 포괄적 분석 |

---

## 3. 에이전트 루프 구축

에이전트는 일반적으로 **피드백 사이클**로 동작한다:

```
컨텍스트 수집 -> 행동 실행 -> 작업 검증 -> 반복
```

### 3.1 컨텍스트 수집 (Gather Context)

#### 에이전틱 서치와 파일 시스템

- 파일 시스템 자체가 모델에 끌어올 수 있는 **컨텍스트**
- `grep`, `tail` 같은 bash 스크립트로 대용량 파일을 **선택적으로 로드**

#### 시맨틱 서치 (Semantic Search)

- 에이전틱 서치보다 **빠르지만 정확도는 낮음**
- 콘텐츠를 청크로 나누고 벡터로 임베딩 후 개념을 쿼리
- 권장사항: **에이전틱 서치로 시작**하고, 더 빠른 결과나 더 많은 변형이 필요한 경우에만 시맨틱 서치 추가

#### 서브에이전트 (Subagents)

- **병렬화**와 컨텍스트 관리 가능
- 여러 서브에이전트가 다른 태스크를 동시에 작업
- 관련 정보만 반환

#### 컴팩션 (Compaction)

- 컨텍스트 한계에 도달하면 SDK가 자동으로 **이전 메시지를 요약**
- 확장된 에이전트 작업 중 컨텍스트 소진 방지

### 3.2 행동 실행 (Take Action)

#### 도구 (Tools)

- 실행의 **핵심 구성 요소**
- 에이전트가 수행할 빈번하고 주요한 작업을 대표해야 함

#### Bash & 스크립트

- PDF를 텍스트로 변환하거나 첨부 파일을 검색하는 등 **범용 유연성** 제공

#### 코드 생성 (Code Generation)

> "코드는 정확하고, 조합 가능하며, 무한히 재사용 가능하여 복잡한 작업을 안정적으로 수행해야 하는 에이전트에게 이상적인 출력이다."

#### MCP (Model Context Protocol)

- Slack, GitHub, Google Drive, Asana 등 외부 서비스에 대한 **표준화된 통합**
- 커스텀 통합 코드 없이 **인증을 자동 처리**

### 3.3 작업 검증 (Verify Your Work)

#### 규칙 기반 피드백 (Rules-Based Feedback)

- 출력에 대한 **구체적인 규칙** 정의
- 실패에 대한 명확한 설명
- 코드 린팅은 **여러 계층의 피드백** 제공

#### 시각적 피드백 (Visual Feedback)

시각적 태스크를 위한 스크린샷 또는 렌더링. 확인 사항:

- 레이아웃 위치 및 간격
- 스타일링 (색상, 폰트, 포매팅)
- 콘텐츠 계층 구조 및 강조
- 다양한 뷰포트에서의 반응성

#### LLM as Judge

- 다른 언어 모델을 사용하여 퍼지 규칙에 기반한 에이전트 출력 평가
- 주의: **일반적으로 매우 견고한 방법은 아니며, 지연 시간에 큰 트레이드오프**가 있을 수 있음

---

## 4. 에이전트 테스트 및 개선

에이전트 평가를 위한 핵심 질문:

1. 에이전트가 작업에 **적합한 도구**를 가지고 있는가?
2. 누락된 정보가 **오해를 유발**하고 있는가?
3. 실패를 식별하고 수정하기 위해 **공식적인 규칙**을 추가할 수 있는가?
4. 다른 접근법을 위해 **더 창의적인 도구**가 필요한가?
5. 기능 추가에 따라 성능이 **변동**하는가? (대표적인 테스트 셋 필요)

---

## 핵심 모범 사례

1. 시맨틱 서치 전에 **에이전틱 서치로 시작**
2. 정밀성과 조합 가능성이 필요한 태스크에 **코드 생성** 활용
3. 검증에는 **규칙 기반 피드백** (특히 코드 린팅) 구현
4. UI/포매팅 태스크에 **시각적 피드백** 사용
5. 외부 서비스 통합에 **MCP** 활용
6. 기능 추가 시 에이전트 성능을 **모니터링하고 대표적 테스트 셋** 구축
7. 파일 구조가 **컨텍스트 엔지니어링의 한 형태**가 되는 것을 고려
8. 새 도구 추가 전에 에이전트의 **도구 세트가 적합한지 먼저 평가**
