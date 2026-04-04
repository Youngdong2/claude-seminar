# Product Management on the AI Exponential

- **출처**: Claude 공식 블로그
- **링크**: https://claude.com/blog/product-management-on-the-ai-exponential
- **날짜**: 2026-03-19
- **카테고리**: Claude Code
- **작성자**: Cat Wu, Head of Product for Claude Code at Anthropic
- **참고 링크**:
  - [Claude Sonnet 3.5 출시](https://www.anthropic.com/news/3-5-models-and-computer-use)
  - [Opus 4 발표](https://www.anthropic.com/news/claude-4)
  - [Opus 4.6 출시](https://www.anthropic.com/news/claude-opus-4-6)
  - [Claude 4 런칭 데모 (YouTube)](https://www.youtube.com/live/EvtPBaaykdo?t=3478s)
  - [Claude Code Desktop 문서](https://code.claude.com/docs/en/desktop)
  - [AskUserQuestion 도구](https://platform.claude.com/docs/en/agent-sdk/user-input)
  - [Todo 추적](https://platform.claude.com/docs/en/agent-sdk/todo-tracking)
  - [플러그인 문서](https://code.claude.com/docs/en/plugins)
  - [에이전트 팀](https://code.claude.com/docs/en/agent-teams)
  - [Claude Code with Chrome](https://code.claude.com/docs/en/chrome)
  - [Claude Code 개요](https://code.claude.com/docs/en/overview)
  - [Cowork 웨비나](https://www.anthropic.com/webinars/future-of-ai-at-work-introducing-cowork)
  - [METR 태스크 완료 시간 연구](https://metr.org/time-horizons/)
  - [금융 서비스 유즈케이스 웨비나](https://www.anthropic.com/webinars/claude-code-financial-services)
  - [법무팀 전환 (YouTube)](https://www.youtube.com/watch?v=tJP6SKfo49c)
  - [디자인팀 전환 (YouTube)](https://www.youtube.com/watch?v=vLIDHi-1PVU)
  - [Cat Wu X/Twitter](https://x.com/_catwu)
  - [Cat Wu LinkedIn](https://www.linkedin.com/in/cat-wu/)

---

## 핵심 요약

전통적 PM 방법론은 프로젝트 수명 주기 동안 기술적 제약이 안정적이라고 가정한다. 하지만 **기하급수적으로 개선되는 AI 모델**은 이 가정을 무너뜨리며, **빠른 실험, 일관된 출시, 효과적인 것에 배팅**하는 접근이 필요하다.

---

## 1. 배경: 16개월간의 41배 도약

- **2024년 10월** (Claude Sonnet 3.5): 테스트 태스크 실패
- **Opus 4.6 출시 시점**: 라이브 데모 수준까지 성공
- METR 연구 기준: Opus 4.6은 인간이 **거의 12시간** 걸리는 태스크 완료 (Sonnet 3.5의 21분 기준선 대비 **41배 점프**)

---

## 2. 저자의 3가지 도구 워크플로

| 도구 | 용도 |
|------|------|
| **Claude.ai** | 전략적 사고, 아이디어 발상 |
| **Claude Code** | 프로토타입, 평가(evals), 스크립트 작성 |
| **Cowork** | 지식 작업 (이메일 인박스, 할일, 프레젠테이션, 여행) |

> 수백 시간 동안 Claude Code를 사용하면서 직접 코드를 작성하지 않음

---

## 3. 4가지 전략적 변화

### 3.1 짧은 스프린트로 계획하라 (Plan in Short Sprints)

- 장기 로드맵을 **"사이드 퀘스트" (자기 주도 실험)**으로 대체
- 예시 기능: Claude Code on Desktop, AskUserQuestion 도구, 할일 목록

### 3.2 문서보다 데모를 우선하라 (Prioritize Demos Over Documentation)

- 문서 우선 -> **프로토타입 우선** 사고로 전환
- Evals(평가)로 기능 검증
- 예시: 에이전트 팀 기능은 수작업으로 만든 evals로 검증

### 3.3 새 모델로 기능을 재방문하라 (Revisit Features with New Models)

- 각 모델 릴리스가 기존 기능 강화의 기회를 제공
- 예시: 사용자들이 수동으로 도구를 전환하던 패턴에서 **Claude Code with Chrome** 탄생

### 3.4 단순함을 포용하라 (Embrace Simplicity)

- 모델 개선으로 불필요해질 우회 방법을 피하라
- 예시:
  - 모델 프롬프팅을 위한 할일 목록 리마인더 -> Opus 4.6에서 불필요해짐
  - 최신 릴리스에서 **시스템 프롬프트 20% 감소**

---

## 4. 주요 통계

| 지표 | 수치 |
|------|------|
| Opus 4.6 성능 향상 | 16개월간 약 **41배** |
| 시스템 프롬프트 감소 | Opus 4.6에서 **20%** |
| METR 태스크 완료 시간 | 인간 기준 약 **12시간** 태스크 자동 완료 |

---

## 5. 업계 파트너 인사이트

- **Bihan Jiang** (Decagon, Director of Product): 프로토타이핑 타임라인이 수 주에서 수 시간으로 단축
- **Kai Xin Tai** (Datadog, Senior PM): PM 역할이 "사전 확실성 정의에서 발견 가속화"로 변화
