# Common workflow patterns for AI agents -- and when to use them

- **출처**: Claude 공식 블로그
- **링크**: https://claude.com/blog/common-workflow-patterns-for-ai-agents-and-when-to-use-them
- **날짜**: 2026-03-05
- **카테고리**: Agents
- **참고 링크**:
  - [Building Effective Agents 연구](https://www.anthropic.com/research/building-effective-agents)
  - [White Paper: Building effective AI agents (PDF)](https://resources.anthropic.com/ty-building-effective-ai-agents)
  - [Claude Developer Platform](https://claude.com/platform/api)

---

## 핵심 요약

AI 에이전트 태스크를 구조화하기 위한 **3가지 주요 워크플로 패턴**에 대한 가이드. 핵심 원칙: **"워크플로는 에이전트 자율성을 대체하지 않는다; 에이전트가 자율성을 어디서, 어떻게 적용하는지를 형성한다."**

---

## 1. 순차 워크플로 (Sequential Workflows)

### 특징
- 미리 정해진 순서로 태스크 실행
- 명확한 의존성이 있는 경우 적합
- 각 단계가 이전 출력을 필요로 함

### 트레이드오프
- **장점**: 정확도 향상
- **단점**: 지연 시간(latency) 증가

### 사용 사례
- 마케팅 카피 생성 -> 번역
- 데이터 추출 -> 검증 -> 로딩 파이프라인

---

## 2. 병렬 워크플로 (Parallel Workflows)

### 특징
- 독립적인 태스크를 **여러 에이전트에 동시 분배**
- 분산 시스템의 **Fan-out/Fan-in** 패턴과 유사

### 핵심 고려사항
> "병렬 에이전트를 구현하기 전에 **집계(aggregation) 전략을 먼저 설계**하라"

### 사용 사례
- 취약점 카테고리별 코드 리뷰
- 동시 추출을 통한 문서 분석
- 동일 문제에 대한 다중 관점 평가

---

## 3. 평가자-최적화 워크플로 (Evaluator-Optimizer Workflows)

### 특징
- 두 에이전트를 **반복 순환(iterative cycle)**으로 결합
  - **생성기(Generator)**: 콘텐츠 생성
  - **평가자(Evaluator)**: 기준에 따라 평가
- **명확하고 측정 가능한 품질 기준**이 있을 때 적합

### 트레이드오프
- **장점**: 반복적 개선으로 품질 향상
- **단점**: 토큰 사용량과 반복 시간 **배증**

### 사용 사례
- API 문서 작성
- 고객 커뮤니케이션
- SQL 쿼리 생성

---

## 4. 패턴 선택 가이드

### 의사결정 기준

```
1. 단일 에이전트가 효과적으로 처리할 수 있는가?
   -> Yes: 단일 에이전트 사용
   
2. 태스크에 순차적 의존성이 있는가?
   -> Yes: 순차 워크플로
   
3. 하위 태스크를 독립적으로 처리할 수 있는가?
   -> Yes: 병렬 워크플로
   
4. 반복적 개선으로 품질이 의미 있게 향상되는가?
   -> Yes: 평가자-최적화 워크플로
```

### 핵심 권장 사항

> **"문제를 해결하는 가장 단순한 패턴으로 시작하라. 기본값은 순차(sequential)이다."**

---

## 5. 설계 시 고려사항

| 항목 | 설명 |
|------|------|
| **실패 처리 및 재시도 로직** | 각 패턴에 맞는 에러 핸들링 |
| **지연 시간 및 비용 제약** | 패턴별 비용/속도 특성 |
| **기준선 대비 개선 측정** | 패턴 도입 효과 정량화 |
| **중첩/결합** | 복잡도가 요구하면 패턴 중첩 가능 |

---

## 6. 다이어그램

포스트에 포함된 3가지 시각화:

1. **Figure 1**: 순차 워크플로 시각화 (단계 간 화살표)
2. **Figure 2**: 병렬 워크플로 (Fan-out/Fan-in) 시각화
3. **Figure 3**: 평가자-최적화 반복 순환 시각화
