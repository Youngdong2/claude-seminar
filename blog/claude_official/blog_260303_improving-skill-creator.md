# Improving skill-creator: Test, measure, and refine Agent Skills

- **출처**: Claude 공식 블로그
- **링크**: https://claude.com/blog/improving-skill-creator-test-measure-and-refine-agent-skills
- **날짜**: 2026-03-03
- **카테고리**: Claude Code
- **참고 링크**:
  - [Skills 소개 블로그](https://claude.com/blog/skills)
  - [Skills 공식 리포지토리](https://github.com/anthropics/skills/tree/main/skills)
  - [Skill-creator 플러그인](https://github.com/anthropics/claude-plugins-official/tree/main/plugins/skill-creator)
  - [Skill-creator 스킬](https://github.com/anthropics/skills/tree/main/skills/skill-creator)

---

## 핵심 요약

Skill-creator에 **테스트, 벤치마킹, 개선** 도구가 추가되었다. 코딩 전문 지식 없이도 Agent Skills를 평가하고 반복 개선할 수 있다. Claude.ai, Cowork, Claude Code 플러그인, 공식 리포지토리에서 사용 가능하다.

---

## 1. Agent Skills의 2가지 카테고리

### 1.1 역량 향상 스킬 (Capability Uplift Skills)
- Claude의 기본 능력을 **기법과 패턴**으로 향상
- 출력 일관성 개선
- 예시: 문서 생성 스킬

### 1.2 인코딩된 선호도 스킬 (Encoded Preference Skills)
- Claude의 기존 기능을 **팀별 워크플로**에 맞춰 시퀀싱
- 예시: NDA 리뷰 프로세스, 구조화된 업데이트 작성

---

## 2. Evals(평가)를 통한 테스트

- Skill-creator가 스킬 기능 검증을 위한 **평가 작성** 지원
- **PDF 스킬 예시**: evals로 비채울 양식(non-fillable forms) 실패를 격리 -> 텍스트 좌표 앵커링 수정
- Evals의 2가지 핵심 목적:
  1. 모델 진화 시 **품질 회귀 감지**
  2. 기본 모델 역량이 스킬 필요성을 **넘어서는 시점** 식별

---

## 3. 벤치마크 모드 (Benchmark Mode)

- 표준화된 평가 도구로 추적:
  - **eval 통과율**
  - **소요 시간**
  - **토큰 사용량**
- 결과는 사용자가 로컬 저장 또는 CI 시스템 통합 제어

---

## 4. 멀티에이전트 지원

- 독립 에이전트가 **클린 컨텍스트에서 병렬로** evals 실행
- 테스트 간 **컨텍스트 오염(context bleed)** 방지
- 개별 토큰/타이밍 메트릭 제공

---

## 5. 비교기 에이전트 (Comparator Agents)

- **A/B 테스트** 지원:
  - 스킬 버전 간 비교
  - 스킬 사용 vs 미사용 비교
- **블라인드 저징(blind judging)**으로 편향 방지

---

## 6. 스킬 설명 최적화

- 샘플 프롬프트 대비 설명을 분석하고 개선 제안
- 거짓 양성(false positive) 및 거짓 음성(false negative) 감소
- 공개 문서 생성 스킬 테스트: **6개 중 5개** 스킬의 트리거링 개선

---

## 7. 향후 방향

- "스킬"과 "스펙"의 경계가 모델 발전에 따라 **흐려질 수 있음**
- 현재 `SKILL.md` 파일은 **구현 계획** 역할
- 미래에는 "무엇(what)" 설명만으로 충분하고, 모델이 "어떻게(how)"를 결정하는 방향

---

## 8. 시작하기

| 플랫폼 | 방법 |
|--------|------|
| **Claude.ai / Cowork** | Claude에게 skill-creator 사용 요청 |
| **Claude Code** | 플러그인 설치 또는 공식 리포지토리에서 다운로드 |
