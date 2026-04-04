# 클로드코드 잘쓰기 - 전사 세미나

- **일시**: 2026-04-07
- **대상**: 전사 (개발자 중심, 비개발자 포함)
- **주제**: Claude Code 잘쓰기

---

## 목차

### 1. 용어 퀴즈로 분위기 환기
- Context Engineering, Harness Engineering, Vibe Coding, SDD 등 용어 퀴즈
- 참여형으로 분위기 환기

### 2. 코드 짜는 개발자, 멸종 위기?
- 개발 역사의 패턴: 항상 "덜 짜는 방향"으로 진화 (기계어 → C → Python → 자연어)
- 매번 "이건 진짜 개발이 아니다" 반발 → 매번 틀렸음
- 개발자의 역할 변화: 코드 타이핑 → 컨텍스트 설계자
- 참고: youtube/youtube_coderxdox_developer_extinction.md

### 3. 프롬프트 → 컨텍스트 → 하네스 (개념 진화)
- Prompt Engineering: "어떻게 질문하는가"
- Context Engineering: "무엇을 알게 하는가" (CLAUDE.md, Skills, Memory, MCP)
- Harness Engineering: "에이전트가 일할 수 있는 구조를 설계하는 것"
- 참고: research/context_engineering.md, research/harness_engineering.md

### 4. 하네스의 해부: Claude Code (+ 라이브 데모)
- 에이전트 루프: 컨텍스트 수집 → 작업 수행 → 결과 검증
- 도구 5가지 범주: 파일 작업, 검색, 실행, 웹, 코드 인텔리전스
- 모델 선택: Sonnet(실행), Opus(판단)
- 녹화 데모 영상: CLAUDE.md 작성 → 스킬 호출 → 에이전트 루프 시연
- 참고: official/core/official_how_claude_code_works.md

### 5. 문서 설계의 기술 (CLAUDE.md, Skills, Memory)
- CLAUDE.md 최적화 (Boris: 2.5k 토큰 이내)
- 핵심 원칙: 가볍게 유지, 반복 실수 기록, 컴팩션 지침, 디렉토리별 분산
- 안티패턴: 모든 것을 CLAUDE.md에 넣기, 모호한 지시, Skills와 중복
- Skills = 마크다운 파일 묶음 (요청 시 로드)
- Memory: 세션 간 학습 유지
- Compound Engineering: 잘 쓴 문서 한 줄이 복리로 쌓인다
- 참고: official/extensions/official_memory.md, official/extensions/official_skills.md
- 참고: blog/blog_hunslog_claude_code_power_user_tips.md

### 6. 계획에서 구현까지 (Plan Mode → Spec → 구현)
- Plan Mode: Shift+Tab 두 번 → 읽기 전용으로 코드베이스 분석 → 계획 수립
- Spec-Based Workflow: 세션1(스펙 인터뷰) → 세션2(구현)
- Boris 팁: "코딩 전에 항상 Plan Mode 먼저"
- 구현 전 탐색 → 계획 검토 → 대화로 개선 → 구현 (2단계 접근)
- 참고: official/core/official_common_workflows.md

### 7. 병렬 개발 환경 (tmux, worktree, 이슈 연동, 멀티 에이전트)
- 왜 터미널인가: CLI의 장점, 자동화 친화
- tmux / cmux로 멀티 세션 운용 (Boris: 터미널 5개 + 웹 5~10개)
- Git worktree로 이슈별 독립 작업 디렉토리
- Linear 등 이슈관리 → 이슈 분배 → 각 worktree에서 병렬 구현 → PR
- 멀티 에이전트: Claude Code로 구현 + Codex로 리뷰/피드백 (교차 검증)
- 세션도 병렬, 도구도 병렬
- 참고: linkedin/linkedin_goobong_jeong_agent_teams.md
- 참고: youtube/youtube_builderjosh_delta_society_ai_native.md (트리아지 프로세스)

### 8. AI 시대의 개발 방법론 (SDD, VDD, TDD+AI)
- SDD (Spec-Driven Development): 가장 실무 적용성 높음
- VDD (Vibe Coding): Andrej Karpathy 제안, 화제성 + 한계/경고
- TDD + AI: 인간이 테스트 작성, AI가 구현 — 검증 가능한 개발
- 참고: research/ai_dev_methodologies.md

### 9. 비개발자도 AI 네이티브로
- 멘탈 모델 전환: 도구 → 일하는 동료
- 델타소사이어티 사례: 비개발자도 Product Create 스킬로 프로덕트 생성
- SSoT 기반 문서화로 누구나 AI와 협업
- AI Native Camp: 설치 허들만 넘으면 빠르게 적응
- "마케터가 빌드하고, CFO가 커밋하는 세계"
- 참고: youtube/youtube_builderjosh_delta_society_ai_native.md
- 참고: linkedin/linkedin_goobong_jeong_context_engineering.md

### 10. 유용한 스킬 & 플러그인 (바로 쓸 수 있는 것들)
- claude-mem: 세션 간 기억 저장
- session-wrap & clarify: 세션 종료 시 핵심 기억 저장 / 요구사항 구체화
- react-best-practices (Vercel): 57개 rule
- supabase-postgres-best-practices: DB 최적화
- ui-skills: 15종 UI/UX 가이드라인
- agent-browser / agentation: 브라우저 연동
- CLI 단축키 정리
- 참고: blog/blog_hunslog_claude_code_power_user_tips.md

### 11. 클로징: 기초가 답이다
- AI가 더 많이 해줄수록, 기초를 가진 사람의 경쟁력이 역설적으로 올라감
- "한 번만 제대로 뚫으면" AI가 나머지를 채워줌
- 탑다운만으로는 사용자에 머묾 — 바텀업 한 번이 평생감
- 도구는 바뀌어도 시스템을 이해하는 능력은 변하지 않는다
- "코드를 짜는 사람도, 코드를 읽는 사람도 아닙니다. 맥락을 설계하는 사람이 이깁니다."
- 참고: youtube/youtube_hongjungmo_ai_study_order.md
