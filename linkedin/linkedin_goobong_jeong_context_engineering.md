# Claude Code/Codex는 엔지니어링, 제품, 디자인을 어떻게 바꾸고 있을까?

- **출처**: LinkedIn
- **작성자**: Goobong Jeong (팔로워 9,793명)
- **링크**: https://www.linkedin.com/posts/gb-jeong_claude-code-codex%EB%8A%94-%EC%97%94%EC%A7%80%EB%8B%88%EC%96%B4%EB%A7%81-%EC%A0%9C%ED%92%88-%EB%94%94%EC%9E%90%EC%9D%B8%EC%9D%84-%EC%96%B4%EB%96%BB%EA%B2%8C-activity-7438346909632626688-LcEY

---

## 핵심 주장 4가지

### 1. 리뷰 병목 해결 - 시스템으로 자동화

- "리뷰를 사람에게 맡기면 병목은 영원히 풀리지 않습니다"
- 사례: Ralphton 대회 우승팀 HouseOps가 'Ouroboros' 하네스로 133라운드 인터뷰를 통해 12.8시간 내 169,553줄을 자동 생성

### 2. PRD는 죽지 않았다 - Skill로 진화

- 기존 Product Requirement Document가 'Skill'로 진화
- 각 Skill = 프로덕트 요구사항 + 실행 로직 + 품질 기준을 하나의 프롬프트로 담은 것
- 작성자는 100개 이상의 Skill을 운영 중

### 3. 새로운 역할: Harness Builder

- Builder, Reviewer 외에 세 번째 역할로 'Harness Builder' 제시
- 에이전트가 일할 수 있는 구조를 설계하는 사람
- 검증 루프를 만들고, 모호성을 제거하고, 에이전트 간 조율 시스템을 설계

### 4. EPD 경계 붕괴와 Context Engineering

- "EPD(Engineering, Product, Design)라는 경계 자체가 무너지고 있다"
- 비개발자 130명을 대상으로 Claude Code 교육 진행
- Anthropic의 knowledge-work-plugins에 53개 스킬 존재
- "마케터가 빌드하고, CFO가 커밋하고, 법무가 계약서 트리아지를 자동화하는 세계"

---

## 결론: Context Engineering 4개 레이어

에이전트 시대의 핵심 역량은 **Context Engineering**이며, 4개 레이어로 구성:

| 레이어 | 역할 |
|--------|------|
| **CLAUDE.md** | 시스템 성격 정의 |
| **Skill** | 실행 로직 구조화 |
| **Memory** | 학습 축적 |
| **MCP** | 외부 도구 연결 |

> "코드를 짜는 사람도, 코드를 읽는 사람도 아닙니다. 맥락을 설계하는 사람이 이깁니다."

- 작성자는 159개의 CLAUDE.md 파일과 100개 이상의 스킬로 실험 중
