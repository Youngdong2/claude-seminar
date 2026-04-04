# Claude Code Agent Teams - Subagent를 넘어 팀으로

- **출처**: LinkedIn
- **작성자**: Goobong Jeong
- **링크**: https://www.linkedin.com/posts/gb-jeong_claude-code%EC%97%90-agent-teams-%EA%B8%B0%EB%8A%A5%EC%9D%B4-%EC%9E%88%EB%8A%94-%EA%B1%B8-%EC%95%8C%EB%A9%B4%EC%84%9C%EB%8F%84-subagent%EB%A7%8C-activity-7434353100255059968-YHY5
- **참고 자료**: https://lnkd.in/gsiUQyxD (teammate-assemble 플러그인)
- **반응**: 좋아요 647개, 댓글 19개

---

## Subagent vs Agent Teams

| 구분 | Subagent | Agent Teams |
|------|----------|-------------|
| 구조 | 시켜놓고 결과만 받음 | 여러 에이전트가 서로 메시지를 주고받으며 팀으로 일함 |
| 협업 | 단방향 | 양방향 대화 |

---

## 기존 Agent Teams의 문제점

- Research preview 상태라 Settings에서 직접 활성화 필요
- 어떤 역할로 팀을 짜야 할지 불명확
- 기본 에이전트는 개발 위주로만 사전 정의됨

---

## teammate-assemble 플러그인

"팀으로 해줘"라고 말하면 작업을 분석하고 **동적으로 팀메이트를 구성**.

### 구성 예시

**경쟁사 분석 작업:**
- Researcher 3명이 병렬 탐색
- Consultant가 분석 기준 수립
- Editor가 리포트 작성

**콘텐츠 작업:**
- 작업 성격에 맞는 다른 조합 자동 구성

---

## 핵심 특징

- **Teammate 간 대화**: Researcher 정보 → Director 전략 수립
- **자동 수정 루프**: Worker 구현 → QA 검증 → Support 자동 수정
- **모델별 역할 배분**: Opus(판단), Sonnet(실행), Haiku(탐색)
- **비용 예측 가능**

---

## 주목할 댓글

- **임근영** (원티드랩): 오케스트레이터 방식 vs 팀 방식 효율성 질문
- **Taewoo Kim** (네오사피엔스): Claude Code + Codex CLI 멀티 CLI 오케스트레이션 활용 경험 공유 (에이전트 10개 이상 병렬 탐색)
- **Jae Heo** (Toss): 핵심은 에이전트 방식보다 **프로세스의 경계, 책임, 역할 분리**가 중요
- **Chris Han**: Claude Code 경험 후 오픈소스보다 직접 구현 권장
- **이지훈**: 에이전트 간 대화 내역을 Slack 등 협업툴로 확인 가능 여부 질문
