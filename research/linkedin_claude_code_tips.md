# LinkedIn Claude Code Tips, Skills, Plugins, Workflows 조사 보고서

> 조사일: 2026-03-31
> 조사 범위: LinkedIn 포스팅 중심, 2026년 1월 이후 최신 자료 위주
> 검색 키워드: Claude Code skill, plugin, tips, workflow, oh-my-claudecode, CLAUDE.md, MCP, 클로드 코드 스킬 등

---

## 목차

1. [한국 인플루언서 포스팅](#1-한국-인플루언서-포스팅)
2. [해외 주요 포스팅 - Skills 관련](#2-해외-주요-포스팅---skills-관련)
3. [해외 주요 포스팅 - Plugins 관련](#3-해외-주요-포스팅---plugins-관련)
4. [해외 주요 포스팅 - Workflow & Best Practices](#4-해외-주요-포스팅---workflow--best-practices)
5. [해외 주요 포스팅 - Multi-Agent Orchestration](#5-해외-주요-포스팅---multi-agent-orchestration)
6. [해외 주요 포스팅 - CLAUDE.md & Context Engineering](#6-해외-주요-포스팅---claudemd--context-engineering)
7. [주요 도구/플러그인/스킬 종합 리스트](#7-주요-도구플러그인스킬-종합-리스트)

---

## 1. 한국 인플루언서 포스팅

### 1-1. 정구봉 (Goobong Jeong) - Team Attention 대표

#### 포스팅 A: "팀어텐션은 Claude Code를 더 잘 쓰기 위한 제품을 직접 만들어서 쓰고 있습니다"
- **날짜**: 2026-02-04
- **링크**: https://kr.linkedin.com/posts/gb-jeong_%ED%8C%80%EC%96%B4%ED%85%90%EC%85%98%EC%9D%80-claude-code-%EB%A5%BC-%EB%8D%94-%EC%9E%98-%EC%93%B0%EA%B8%B0-%EC%9C%84%ED%95%9C-%EC%A0%9C%ED%92%88%EC%9D%84-%EC%A7%81%EC%A0%91-%EB%A7%8C%EB%93%A4%EC%96%B4%EC%84%9C-activity-7424820533206130688-tHEA
- **핵심 내용**:
  - Team Attention에서 직접 만들어 사용 중인 오픈소스 도구 5가지 소개
  - "도구에 맞추지 않고 워크플로우에 맞는 도구를 만든다"는 철학
- **소개된 도구**:
  1. **cops** - Claude Code 사용량 통합/시각화 대시보드. `~/.claude` 디렉토리를 실시간 감시, 세션별 토큰 소비량/채팅 기록/에이전트 워크플로우를 대시보드로 표시. CLI로 프로젝트 등록하면 Daemon이 백그라운드에서 JSONL 로그 파싱 후 API 서버로 전송
     - 링크: https://lnkd.in/gEfciiRJ
  2. **nobs whisper** - Whisper 모델을 로컬에서 구동하는 음성인식 도구. Apple Silicon Metal 가속, 글로벌 핫키, 한/영/일/중 지원, 커스텀 어휘 등록 가능. wispr flow 대체
     - 링크: https://lnkd.in/guAq5qXV
  3. **nobs editor** - 터미널에서 노션 스타일로 파일을 볼 수 있는 경량 에디터. Markdown, JSON, YAML, TOML, XML, CSV 등 13가지 형식 지원. Tauri 기반
     - 링크: https://lnkd.in/gNVJs9k3
  4. **contents hub** - X, YouTube, RSS 등 다양한 채널의 콘텐츠를 구독/요약. AI 클러스터링으로 1-page 다이제스트 생성. MCP로 Claude Code 연결 가능
     - 링크: (포스팅 내 참조)

#### 포스팅 B: "Skillthon에서 8개의 Claude Code 플러그인이 만들어졌습니다"
- **날짜**: 2026-01-24
- **링크**: https://kr.linkedin.com/posts/gb-jeong_skillthon%EC%97%90%EC%84%9C-8%EA%B0%9C%EC%9D%98-claude-code-%ED%94%8C%EB%9F%AC%EA%B7%B8%EC%9D%B8%EC%9D%B4-%EB%A7%8C%EB%93%A4%EC%96%B4%EC%A1%8C%EC%8A%B5%EB%8B%88%EB%8B%A4-activity-7420974941359185920-L3Tq
- **핵심 내용**:
  - Team Attention x Anthropic 공동 주최 **Skillthon** (스킬 + 해커톤) 결과 발표
  - 3시간 동안 8개의 Claude Code 플러그인 제작
  - Anthropic에서 Claude Credit 즉석 지급
- **Skillthon에서 만들어진 8개 플러그인**:
  1. **두바이쫀득쿠키 리서치** (우승) - ElevenLabs AI 전화로 매장 재고 자동 확인
     - https://lnkd.in/gJcw4fMV
  2. **Skill-Up** (인기상) - 스킬 사용 통계를 RPG 캐릭터 시트(등급 SSS~F, 레벨, 직업 칭호)로 시각화 + TDD 기반 스킬 품질 자동 개선 (토스 송범근님 제작)
     - https://lnkd.in/geNkGp73
  3. **서브웨이 주문 봇** - Claude Code가 서브웨이 직원이 되어 주문을 받고 GitHub Issue로 취합. 3가지 성격 모드, 6가지 주문 모드
     - https://lnkd.in/g_4qzaYZ
  4. **Task List Manager** - Task 생성/관리 + Git 추적으로 팀 공유
     - https://lnkd.in/gATfC3yQ
  5. **Visual Workflow Builder** - 노드 기반 비주얼 멀티에이전트 워크플로우 설계 도구
     - https://lnkd.in/gFew7i2R
  6. **Video Editing Skills** - FFmpeg 무음 감지 + SRT 자막 분석으로 영상 편집 자동화
     - https://lnkd.in/g-6-FRVS
  7. **Auto Check-in** - 브라우저 자동화로 출석체크 대행. 자연어 기반 요소 탐색, 자가 회복(self-healing) 방식
     - https://lnkd.in/g24Ufenu
  8. **Short Video Generator** - Story->Image+TTS(병렬)->Review->Video 4단계 파이프라인으로 숏폼 영상 자동 생성
     - https://lnkd.in/gQsaPzxw

---

### 1-2. 박승훈 (훈스로그)

#### 포스팅: "Claude Code 고수들은 이렇게 쓴다: 생산성 극대화 꿀팁 모음"
- **날짜**: 2026-02-04
- **링크**: https://kr.linkedin.com/posts/huns_claude-code-고수들은-이렇게-쓴다-생산성-극대화-꿀팁-모음-activity-7424964857919283200-C-Pt
- **블로그 전체 글**: https://blog.huns.site/blog/posts/ai/claude/claude-code-power-user-tips
- **핵심 내용**: LinkedIn, Threads, GitHub에서 수집한 Claude Code 핵심 팁 종합 정리
- **주요 카테고리별 요약**:

  **1) 기본 주축 개선**
  - Spec-Based Workflow: 스펙 작성과 구현을 세션 분리하여 컨텍스트 오염 방지
  - Hooks 활용 실전: 자동 포매팅, 보안 검증, 데스크톱 알림, 세션별 Git 관리
  - CLAUDE.md 최적화: 2.5k 토큰 이내 유지, 반복 실수 기록, 컴팩션 지침 포함
  - **Reliable Skill Activation: 스킬 발동률 20% -> 84%로 끌어올리는 구조** (송범근님 관련)

  **2) Multi-Agent Orchestration**
  - Swarm: Fan-Out, Pipeline, Map-Reduce 패턴
  - Oh My Claude Code: Autopilot, Ultrapilot, Ecomode 등 실행 모드
  - BMAD: 9개 전문 Agent 파이프라인
  - bkit: PDCA 사이클 기반 구조화된 AI 개발 프로세스

  **3) 100초 도입 Skill & Plugin 모음**
  - **claude-mem**: 세션 간 대화 저장/검색 기억 확장 Plugin
  - **react-best-practices**: Vercel 공개 57개 React/Next.js 최적화 rule
  - **supabase-postgres-best-practices**: Postgres 가이드
  - **session-wrap & clarify**: 세션 종료 시 장기 기억 저장, 모호한 요구사항 명세화
  - **rams.ai & ui-skills**: AI에게 UI 센스를 심어주는 디자인 피드백 도구

  **4) Tips**
  - CLI 단축키: Ctrl+Z(백그라운드), !(터미널 명령), Ctrl+G(멀티라인) 등 Top 7
  - LLM 시점 편향 극복: 시점 편향, 오류 중첩, 컨텍스트 포화 등 5가지 원인과 해결법
  - Boris의 활용 팁: 병렬 세션 운용, Plan Mode 우선, Sub-Agent 전문화 등 12가지
  - Browser with Agent: agentation(요소 선택 피드백), agent-browser(93% 컨텍스트 절감)

---

### 1-3. 송범근 (토스)

#### Skillthon 참가 - Skill-Up 플러그인 개발
- **날짜**: 2026-01-24 (Skillthon 당일, 서인근님 후기에서 언급)
- **핵심 내용**:
  - 스킬 사용 통계를 RPG 스타일 캐릭터로 시각화하는 **Skill-Up** 플러그인 개발
  - 스킬 사용 현황을 게임처럼 표현하여 활용을 유도
  - 스킬 강화 기능(TDD 기반 압박 테스트로 스킬 품질 자동 개선)이 특히 인상적
  - Skillthon 인기상 수상
- **도구**: Skill-Up (https://lnkd.in/geNkGp73)

#### 스킬 발동률 관련 (박승훈 훈스로그에서 인용)
- **핵심 내용**: 스킬 발동률을 20%에서 84%로 끌어올리는 구조적 방법론 공유
  - 스킬의 description 필드를 AI가 판단하기 쉽게 "언제 실행할지" 중심으로 작성
  - 스킬 폴더 구조와 네이밍 최적화

---

### 1-4. 서인근

#### 포스팅: "팀 어텐션 x 앤트로픽의 스킬톤 참가 후기"
- **날짜**: 2026-01-25
- **링크**: https://kr.linkedin.com/posts/inkeun_팀-어텐션-x-앤트로픽의-스킬톤-스킬-해커톤-skillthon에-activity-7421134747357175808-BX8B
- **핵심 내용**:
  - Skillthon 참가 상세 후기
  - **ZEP JAEGYU LEE님 강연**: 비개발자 포함 전원이 클로드 기반 워크플로우를 활용하는 방안으로 **Zuede** 소개 (측정, 자동화, 제안을 지속하는 도구)
  - **오프라이트 홍남호님**: 조직 지식베이스 생산성 극대화 툴 **CONCLAVE** 개발
  - **토스 송범근님**: Skill-Up (스킬 사용 통계 RPG 시각화 + 스킬 강화 기능)
  - **Jongwon Choi님**: 클로드코드 단축키 꿀팁 공유
  - **YeonGyu Kim님**: oh-my-opencode 개발기 공유
  - 비개발자를 위한 노드 UI 기반 워크플로우 제작 스킬 개발

---

### 1-5. Hyungho Byun (변형호)

#### 포스팅: "다른 고수분들은 클로드 스킬로 뭘 자동화 하고 있을까"
- **날짜**: 2026-01-27
- **링크**: https://kr.linkedin.com/posts/hyungho-byun-6b2588224_다른-고수분들은-클로드-스킬로-뭘-자동화-하고-있을까-activity-7422042278522961920-0yOP
- **핵심 내용**:
  - Team Attention 주최 Claude Code Skillthon 참가기
  - FFmpeg + Whisper 자막을 이용한 영상 편집 자동화 스킬 개발
  - 영상 볼륨 분포 기반 무음 구간 자동 제거 스킬 구현
  - "코드는 한 세 줄 봤다" - Claude Code의 자동화 능력에 대한 감탄
  - 유튜브 후기 영상: https://www.youtube.com/watch?v=gl0_6oCfSOw

---

### 1-6. Seungpil Lee (이승필)

#### 포스팅: "클로드 스킬 꿀팁 꼭 읽으세요"
- **날짜**: 2026-03-19
- **링크**: https://kr.linkedin.com/posts/seungpil_클로드-스킬-꿀팁-꼭-읽으세요-anthropic-claude-code-팀의-activity-7440532562331992064-qIb7
- **핵심 내용**: Anthropic Claude Code 팀의 **Thariq Shihipar**가 내부에서 수백 개의 스킬을 운영하며 얻은 교훈 정리
- **Anthropic 내부 스킬 9가지 유형 분류**:
  1. API 레퍼런스 - 라이브러리 사용 시 실수 방지
  2. 제품 검증 - 가입/결제 등 헤드리스 브라우저 자동 테스트
  3. 데이터 수집/분석 - 모니터링 대시보드, 코호트 비교, 퍼널 분석
  4. 반복 업무 자동화 - 스탠드업 작성, 티켓 생성, 주간 리캡
  5. 코드 템플릿 - 팀 규칙에 맞는 뼈대 자동 생성
  6. 코드 품질/리뷰 - 서브에이전트가 코드 비판/수정 반복
  7. CI/CD & 배포 - PR 감시, 테스트 재시도, 점진적 롤아웃, 자동 롤백
  8. 장애 대응 런북 - 에러 증상 기반 로그 수집 및 보고서 작성
  9. 인프라 운영 - 고아 리소스 탐색, 의존성 관리, 비용 분석
- **좋은 스킬을 만드는 핵심 팁**:
  - "함정 목록" 반드시 포함 (AI가 자주 틀리는 부분 사전 기록)
  - 정보를 한꺼번에 주지 말고 파일로 분리 (점진적 공개, Progressive Disclosure)
  - 너무 세세하게 지시하지 않기 (유연성 확보)
  - Description은 AI를 위해 쓰기 ("뭘 하는가"가 아니라 "언제 실행할지")
  - 이전 실행 결과를 로그 파일로 저장하면 AI가 변화만 파악 가능
- **배포 방식**: Anthropic 내부에서는 GitHub 샌드박스 폴더에 올리고 Slack에서 공유, 검증된 스킬만 마켓플레이스로 승격

---

### 1-7. Yeachan Heo (허예찬) - oh-my-claudecode 개발자

#### 포스팅 A: "자동화 끝판왕 oh my claude code 제대로 써먹기"
- **날짜**: 2026-01-25
- **링크**: https://kr.linkedin.com/posts/yeachan-heo-225b02219_자동화-끝판왕-oh-my-claude-code-제대로-써먹기프롬프트-꿀팁-activity-7421348169025794048-rcwh
- **핵심 내용**: oh-my-claudecode 프롬프트 꿀팁 및 GitHub 소스코드 공개

#### 포스팅 B: "oh-my-claude-sisyphus" (Sisyphus 포팅)
- **날짜**: 2026-01-08
- **링크**: https://www.linkedin.com/posts/yeachan-heo-225b02219_github-yeachan-heooh-my-claude-sisyphus-activity-7415240410614120448-ooVz
- **핵심 내용**: Oh My Opencode의 Sisyphus를 Claude Code SDK로 포팅
- **도구**: oh-my-claude-sisyphus (https://github.com/Yeachan-Heo/oh-my-claude-sisyphus)

#### 포스팅 C: RALPLAN-DR (헤겔 변증법 기반 AI 코드 플래닝)
- **날짜**: 2026-02-26
- **링크**: https://www.linkedin.com/posts/yeachan-heo-225b02219_applying-hegelian-dialectics-to-ai-code-planning-activity-7432667561382797312-Lwbr
- **핵심 내용**: 헤겔 변증법을 AI 코드 플래닝에 적용한 RALPLAN-DR 소개

---

### 1-8. Jeongmin Lee (이정민)

#### 포스팅: "어제 공개된 클로드 전문가의 클로드 코드 완전판 세팅, 저도 다 바꿨습니다"
- **날짜**: 2026-01-19
- **링크**: https://kr.linkedin.com/posts/jyoung105_어제-공개된-클로드-전문가의-클로드-코드-완전판-세팅-저도-다-바꿨습니다-activity-7419142685543882752-KXud
- **핵심 내용**:
  - Anthropic 해커톤 우승자 affaan(@affaanmustafa)의 클로드 코드 세팅 가이드 소개
  - 10개월간 매일 클로드 코드를 사용한 완전판 세팅

---

### 1-9. 최훈민

#### 포스팅: "3회의 Claude Meetup이 한국에 찾아옵니다!"
- **날짜**: 2026-03-26
- **링크**: https://kr.linkedin.com/posts/xavierchoi_3회의-claude-meetup이-한국에-찾아옵니다-이에-연사자를-activity-7442764556646674432-ow_4
- **핵심 내용**:
  - 2026년 상반기 Claude Meetup 3회 개최 예고 (서울, 판교, 대전)
  - 연사자 공개 모집
  - 지난 12월 #2 Claude Code Meetup 이후 후속 이벤트

---

### 1-10. Yaechan Lee

#### 포스팅: "비개발자가 Claude Code 해커톤에 갔다 온 이야기"
- **날짜**: 2026-01-24
- **링크**: https://kr.linkedin.com/posts/yaechan-lee_비개발자가-claude-code-해커톤에-갔다-온-이야기-1-어제-activity-7420867158911541248-DOsH
- **핵심 내용**:
  - 전략기획 직무 비개발자의 Skillthon 참가기
  - 개발 대화의 70%를 못 알아들었지만 Claude Code에 실시간 질문하며 참여
  - "팀원들이 하는 저 말이 도대체 무슨 말이냐, 비개발자인 내가 알아듣기 쉽게 설명해줘"

---

### 1-11. Sigrid Jin (Jin Hyung Park, 박진형)

#### 포스팅 A: "Meet this amazing builder from South Korea, 정구봉"
- **날짜**: 2026-03-17
- **링크**: https://www.linkedin.com/posts/sigridjineth_meet-this-amazing-builder-from-south-korea-activity-7439858791526969344-WE0J
- **핵심 내용**: Team Attention 정구봉님 소개, AI Native Camp 기획

#### 포스팅 B: oh-my-codex 활용 실험
- **날짜**: 2026-03-21
- **링크**: https://www.linkedin.com/posts/sigridjineth_using-oh-my-codex-plugin-built-by-yeachan-activity-7440940122264621056-hPmT
- **핵심 내용**: Yeachan Heo가 만든 oh-my-codex 플러그인으로 deep interview 수행 및 OpenAI parameter golf 대회 실험

---

### 1-12. Keon Kim (김건)

#### 포스팅: oh-my-claudecode 소개
- **날짜**: 2026-03-09
- **링크**: https://www.linkedin.com/posts/keon_github-yeachan-heooh-my-claudecode-teams-first-activity-7436787182545158144-OLk0
- **핵심 내용**:
  - "이 프로젝트는 ralph, multi agent, MCPs, skills, parallel execution 같은 최신 기법을 한 번의 명령으로 설정할 수 있게 해준다"
  - oh-my-claudecode by Yeachan Heo 소개
  - 링크: https://github.com/Yeachan-Heo/oh-my-claudecode

---

## 2. 해외 주요 포스팅 - Skills 관련

### 2-1. Richard I. - "Optimizing Claude Code: rules vs skills"
- **날짜**: 2026-03-04
- **링크**: https://www.linkedin.com/posts/richardigbinoba_claudecode-aiengineering-developerproductivity-activity-7434756327383384065-VRpk
- **핵심 내용**:
  - **가장 비싼 실수**: 모든 것을 `.claude/rules/`에 넣은 것
  - Rules는 매 세션 자동 로드, 매 메시지마다 전체 rules 디렉토리가 컨텍스트로 포함
  - 2,000줄 이상의 rules를 가지고 있었으나 대부분 주 1회 사용하는 워크플로우
  - **해결책 - rules/ vs skills/ 분리**:
    - **Rules** (항상 로드): 스코프 경계, 비즈니스 컨텍스트, 행동 가드레일 -> 모든 결정에 영향
    - **Skills** (온디맨드 로드): 멀티스텝 워크플로우, 템플릿, 배치 작업 -> `/skill-name`으로 호출
  - **결과**: 메시지당 토큰 비용 감소 + 응답 품질 향상 (컨텍스트 희석 감소)
  - **경험칙**: 모든 결정에 영향 -> rules / 특정 워크플로우 -> skills / 50줄 이상 -> 아마도 skill

### 2-2. Carl Vellotti - "Mastering Claude Code: 10 Essential Skills Rules"
- **날짜**: 2026-02-18
- **링크**: https://www.linkedin.com/posts/carlvellotti_skills-are-claude-codes-most-powerful-feature-activity-7429946350034747392-rxRN
- **핵심 내용**: Skills가 Claude Code의 가장 강력한 기능임을 강조, 10가지 필수 스킬 규칙 소개

### 2-3. Steven (Jieli) Wu - "6 Claude Code Plugins That Will 10x Your AI Workflow"
- **날짜**: 2026-03-05
- **링크**: https://www.linkedin.com/posts/jieliwu_ai-claudecode-aiengineering-activity-7435368562346577920-Dbd8
- **핵심 내용** - 6개 필수 플러그인:
  1. **obra/superpowers** (65K+ stars) - 20+ 검증된 스킬로 구조화된 워크플로우 강제. `/brainstorm`, `/write-plan`, `/execute-plan` 명령어. 코드 리뷰까지 자동화
  2. **DeepWiki Plugin** - GitHub 리포를 검색 가능한 지식 베이스로 변환. 인증 불필요
  3. **Claudeception** - 매 세션에서 학습. 디버깅 기법 발견 -> 새 스킬로 저장 -> 다음 세션 자동 로드
  4. **Playground by Thariq (Anthropic)** - 인터랙티브 HTML 도구 생성 (슬라이더, 컬러 피커, 라이브 프리뷰)
  5. **LLM Council Skill** - Claude, ChatGPT, Gemini가 프롬프트를 토론 후 최적 답변 합성
  6. **Evals Skills by Hamel Husain** - AI 평가를 위한 6가지 필수 스킬 (4,000+ 학생, 50+ 기업 경험 기반)
- **링크들**:
  - superpowers: https://github.com/obra/superpowers
  - DeepWiki: https://github.com/qazi0/claude-plugins/tree/main/deepwiki
  - Claudeception: https://github.com/terpjwu1/Claudeception
  - LLM Council: https://github.com/gcpdev/llm-council-skill
  - Evals Skills: https://hamel.dev/blog/posts/evals-skills/

### 2-4. Paul Bakaus - "Skills, Sub-agents, Commands, Hooks 개념 정리"
- **날짜**: 2026-01-16
- **링크**: https://www.linkedin.com/posts/paulbakaus_confused-about-skills-sub-agents-commands-activity-7418125388574339073-v5gD
- **핵심 내용 - 멘탈 모델**:
  - **Skills**: LLM에게 지식이나 새로운 능력을 온디맨드로 부여. 단독으로는 동작하지 않음
  - **Commands**: 긴 프롬프트 입력을 피하기 위한 프롬프트 단축키. 항상 어떤 액션을 수행
  - **Sub-agents**: 격리된 LLM 세션. 태스크를 받아 작업 후 메인 에이전트에 보고. 자체 컨텍스트(토큰 한도) 보유
  - **Hooks**: 스레드에서 특정 이벤트 발생 시 실행되는 코드 (프롬프트 후, 도구 실행 전 등)
  - Commands는 skills와 agents를 사용 가능. Agents는 skills와 commands를 사용 가능. Skills는 agents나 tools를 사용 불가하나 번들된 스크립트 실행 가능

---

## 3. 해외 주요 포스팅 - Plugins 관련

### 3-1. Brandon Guerrero - "I thought Claude Code plugins were pointless. I was wrong."
- **날짜**: 2026-02-16
- **링크**: https://www.linkedin.com/posts/bmguerrero_i-thought-claude-code-plugins-were-pointless-activity-7429173599502127104-xcS2
- **핵심 내용**:
  - MCP vs Plugin의 핵심 차이:
    - **MCP**: Claude를 외부 도구에 연결하는 통합 레이어. "Claude가 무엇에 접근할 수 있나?" 
    - **Plugin**: MCP 서버 + skills(자동 트리거) + hooks(이벤트 발생 시 실행) + slash commands + 내장 프롬프트를 번들링. "Claude가 접근한 것을 얼마나 잘 사용할 수 있나?"
  - "MCP를 만드는 것은 파워 도구를 건네주는 것. Plugin을 만드는 것은 도구와 프로젝트 계획서를 함께 건네주는 것"
  - **팀에서의 장점**: Plugin 하나로 모든 팀원에게 동일한 셋업 제공. MCP 서버, skills, hooks, commands 모두 버전 관리
  - Plugin 내 skills는 컨텍스트 기반으로 자동 호출 가능 - 사용자가 프롬프트하지 않아도 Claude가 스킬 설명을 읽고 활성화 여부 판단

### 3-2. claude-mem 관련 (다수 포스팅)
- **날짜**: 2026-01-28 (Oni Harnantyo), 2026-02-08 (Nayan L.) 외
- **핵심 내용**:
  - **claude-mem**: Claude Code 세션 중 수행하는 모든 작업을 자동 캡처, AI로 압축(Claude agent-sdk 사용), 향후 세션에 관련 컨텍스트 자동 주입
  - 세션 간 영속적 메모리를 제공하는 플러그인
  - 링크: https://github.com/thedotmack/claude-mem

---

## 4. 해외 주요 포스팅 - Workflow & Best Practices

### 4-1. Andrew Stephen - "10 Claude best practices in 50 characters or fewer"
- **날짜**: 2026-02-14
- **링크**: https://www.linkedin.com/posts/andrew-stephen-ai-architect-aa82675b_claude-agent-hooks-activity-7428379896642449408-GN7S
- **10가지 베스트 프랙티스**:
  1. Right-Size Your Setup
  2. Point, Don't Dump
  3. Master Hooks, Skills, Slash Commands
  4. Leverage Plugins
  5. Resurrect Past Context
  6. (이하 포스팅 전문 참조)

### 4-2. Ivan Nardini - "Improving Claude Code Efficiency with 40+ Tips"
- **날짜**: 2026-03-05
- **링크**: https://www.linkedin.com/posts/ivan-nardini_i-use-claude-code-daily-on-vertex-ai-without-activity-7435369257552617472-aTx7
- **핵심 내용**:
  - Vertex AI에서 Claude Code 일일 사용
  - **Multi-Instance Cascade**: 3-4개 Claude 세션을 터미널 탭에서 운용. 컨텍스트 열화 시 새 세션 생성 후 HANDOFF.md로 상태 전달
  - **System Prompt Patching**: 스크립트로 minified JS 번들에서 장황한 지시를 제거. 세션당 약 50% 오버헤드 감소

### 4-3. Ronak Nathani - "Optimizing Claude Code Workflows for Efficiency"
- **날짜**: 2026-03-02
- **링크**: https://www.linkedin.com/posts/ronaknnathani_a-couple-of-workflows-i-find-myself-using-activity-7434424869045432320-uQfl
- **핵심 내용**: 자주 사용하는 워크플로우 패턴 공유

### 4-4. Paolo Perrone - "The best agentic coding workflow I've seen this year"
- **날짜**: 2026-03-23
- **링크**: https://www.linkedin.com/posts/paoloperrone_the-best-agentic-coding-workflow-ive-seen-activity-7441680994891444224-IfrS
- **핵심 내용**:
  - **Day Shift / Night Shift 패턴**: 낮에는 요구사항 수집/스펙 작성/사고, 밤에는 Claude Code가 구현
  - 인간은 설계/검토, AI는 실행 담당

### 4-5. Josh Fonseca - "Claude Code 창시자가 공개한 개발 워크플로우"
- **날짜**: 2026-01-07
- **링크**: https://www.linkedin.com/posts/josh-fonseca-08bab1143_the-creator-of-claude-code-just-posted-his-activity-7414800797038915587-aVMg
- **핵심 내용**: Claude Code 창시자(Boris Cherny)의 워크플로우 팁 정리

### 4-6. Cole Medin - "Simple Workflow for Efficient Projects"
- **날짜**: 2026-02-23
- **링크**: https://www.linkedin.com/posts/cole-medin-727752184_there-are-a-lot-of-seriously-over-engineered-activity-7431754329612783616-mt-a
- **핵심 내용**: 지나치게 복잡한 워크플로우에 대한 반론. 단순하고 효율적인 워크플로우 제안

### 4-7. Riccardo Marconato - "CLAUDE.md 500줄 이내 최적화"
- **날짜**: 2026-03-04
- **링크**: https://www.linkedin.com/posts/riccardo-marconato-581b59122_the-best-way-to-use-claude-code-is-by-giving-activity-7434870876568772608-1HOI
- **핵심 내용**: CLAUDE.md에 context, task, expectations, references, end-of-session checklist를 모두 포함하되 500줄 이내로 유지

### 4-8. Abhishek Ray - "Optimize Claude Code with a concise CLAUDE.md"
- **날짜**: 2026-03-16
- **링크**: https://www.linkedin.com/posts/abhishekray00_one-of-the-most-practical-claudemd-tips-activity-7439349344912265219-URhV
- **핵심 내용**: 간결한 CLAUDE.md 작성의 중요성 강조

### 4-9. Ran Isenberg - "Claude Code Best Practices: What I Learned Shipping Real Projects"
- **날짜**: 2026-03-24
- **링크**: https://www.linkedin.com/pulse/claude-code-best-practices-what-i-learned-shipping-ran-isenberg-z4egf
- **핵심 내용**: 실제 프로덕션 프로젝트 배포 경험에서 얻은 Best Practices

### 4-10. Brij kishore Pandey - "Claude Code Cheatsheet"
- **날짜**: 2026-03-14
- **링크**: https://www.linkedin.com/posts/brijpandeyji_quick-correction-on-mondays-claude-code-activity-7438594890705326080-hFPA
- **핵심 내용**: Claude Code 치트시트 (Setup & Best Practices)

---

## 5. 해외 주요 포스팅 - Multi-Agent Orchestration

### 5-1. Jihoo Kim (김지후, Toss) - "How to Use Claude Code 100x More Effectively"
- **날짜**: 2026-01-23
- **링크**: https://www.linkedin.com/posts/jihoo-kim_claudecode-aiengineering-agenticai-activity-7420467768044740608-5o10
- **핵심 내용**: 오픈소스 프로젝트 큐레이션으로 "next-level Claude Code 사용법" 정리
- **소개된 프로젝트 8개**:
  1. **Superpowers** (obra) - agentic skills 프레임워크 & SW 개발 방법론
     - https://github.com/obra/superpowers
  2. **agents** (wshobson) - 지능형 자동화 및 멀티에이전트 오케스트레이션
     - https://github.com/wshobson/agents
  3. **claude-mem** (thedotmack) - 세션 캡처/압축/주입 플러그인
     - https://github.com/thedotmack/claude-mem
  4. **claude-flow** (ruvnet) - 프로덕션 레디 멀티에이전트 AI 오케스트레이션
     - https://github.com/ruvnet/claude-flow
  5. **planning-with-files** (OthmanAdi) - Manus 스타일 영속적 마크다운 플래닝
     - https://github.com/OthmanAdi/planning-with-files
  6. **claude-scientific-skills** (K-Dense-AI) - 140개 과학 분야 스킬 컬렉션
     - https://github.com/K-Dense-AI/claude-scientific-skills
  7. **claude-code-guide** (zebbern) - Claude Code 마스터 가이드
     - https://github.com/zebbern/claude-code-guide
  8. **oh-my-claudecode** (Yeachan-Heo) - 멀티에이전트 오케스트레이션. 28개 에이전트, 28개 스킬, delegation-first 아키텍처
     - https://github.com/Yeachan-Heo/oh-my-claudecode

### 5-2. Benjamin Brink Allsopp - "Skills, Subagents, Hooks 차이점"
- **날짜**: 2026-03-18
- **링크**: https://www.linkedin.com/posts/brink_many-advanced-claude-code-users-often-wonder-activity-7439915678486339584-hGpC
- **핵심 내용**: 파일로서의 차이가 아닌 호출 방식의 차이. 같은 .md 파일이지만 invoke 방식과 작업 범위가 다름

### 5-3. Dharmesh Shah - "YOLO Option for Individual Prompts"
- **날짜**: 2026-03-27
- **링크**: https://www.linkedin.com/posts/dharmesh_i-wish-claude-code-had-a-yolo-option-for-activity-7443352570707881984-_hRl
- **핵심 내용**: 개별 프롬프트에 대한 YOLO(You Only Live Once) 옵션 요청 - 특정 프롬프트만 자동 승인 모드로 실행

---

## 6. 해외 주요 포스팅 - CLAUDE.md & Context Engineering

### 6-1. Allan Guo - "Most Useful Repo for Claude Code"
- **날짜**: 2026-03-17
- **링크**: https://www.linkedin.com/posts/allan-guo_i-just-found-the-most-useful-repo-for-claude-activity-7439728515002015744-1d26
- **핵심 내용**: Claude Code 창시자의 best practices 기반, 16.1K stars 리포 소개. 지속적 업데이트 중

### 6-2. How to Prompt - "How to turn any article into a Claude reference file"
- **날짜**: 2026-03-07
- **링크**: https://www.linkedin.com/posts/how-to-prompt_how-to-turn-any-article-into-a-claude-reference-activity-7436041290586304512-7xaV
- **핵심 내용**: 어떤 아티클이든 Claude 레퍼런스 .md 파일로 변환하는 프롬프트 제공

### 6-3. CJ Hess - "5 Underhyped Claude Code Tips for Better Context Quality"
- **날짜**: 2026-01-12
- **링크**: https://www.linkedin.com/posts/cj-hess-connexwork_claude-code-has-gotten-a-lot-of-hype-lately-activity-7416492752357707777-BWGN
- **핵심 내용**: 컨텍스트 품질 향상을 위한 5가지 저평가된 팁

### 6-4. Santiago Valdarrama - "5 Claude Code Tips for Efficient Development"
- **날짜**: 2026-02-03
- **링크**: https://www.linkedin.com/posts/svpino_claude-code-tips-that-have-made-my-life-easier-activity-7424447835586330624-wqrz
- **핵심 내용**: 실제 생활에서 효율을 높인 5가지 Claude Code 팁

### 6-5. Shoaib Iqbal - "Fixing Claude Code's Knowledge Cutoff with MCP Servers"
- **날짜**: 2026-02-06
- **링크**: https://www.linkedin.com/posts/shoaibiqbal_how-to-use-mcp-servers-with-claude-code-in-activity-7425693533967228929-2Gj-
- **핵심 내용**: MCP 서버를 활용하여 Claude Code의 지식 한계(knowledge cutoff) 극복 방법

### 6-6. Brenden Parker - "Boost Claude Code Efficiency with Simple Documentation"
- **날짜**: 2026-03-04
- **링크**: https://www.linkedin.com/posts/brenden-parker_your-claude-code-agent-is-operating-at-maybe-activity-7434991118015950849-4grk
- **핵심 내용**: 간단한 문서화만으로 Claude Code 효율을 극대화하는 방법

---

## 7. 주요 도구/플러그인/스킬 종합 리스트

### Multi-Agent Orchestration
| 도구명 | 설명 | 링크 |
|--------|------|------|
| oh-my-claudecode | Teams-first 멀티에이전트 오케스트레이션. 28개 에이전트, 28개 스킬 | https://github.com/Yeachan-Heo/oh-my-claudecode |
| Superpowers (obra) | Agentic skills 프레임워크, 20+ 검증된 스킬 | https://github.com/obra/superpowers |
| claude-flow | 프로덕션 레디 멀티에이전트 AI 오케스트레이션 | https://github.com/ruvnet/claude-flow |
| agents (wshobson) | 지능형 자동화 및 멀티에이전트 오케스트레이션 | https://github.com/wshobson/agents |

### Memory & Context
| 도구명 | 설명 | 링크 |
|--------|------|------|
| claude-mem | 세션 간 대화 캡처/압축/주입 플러그인 | https://github.com/thedotmack/claude-mem |
| Claudeception | 매 세션에서 학습, 디버깅 기법을 새 스킬로 자동 저장 | https://github.com/terpjwu1/Claudeception |
| session-wrap & clarify | 세션 종료 시 장기 기억 저장, 모호한 요구사항 명세화 | (훈스로그 참조) |

### Planning & Workflow
| 도구명 | 설명 | 링크 |
|--------|------|------|
| planning-with-files | Manus 스타일 영속적 마크다운 플래닝 | https://github.com/OthmanAdi/planning-with-files |
| bkit | PDCA 사이클 기반 구조화된 AI 개발 프로세스 | (훈스로그 참조) |
| BMAD | 9개 전문 Agent 파이프라인 | (훈스로그 참조) |

### Coding & Quality
| 도구명 | 설명 | 링크 |
|--------|------|------|
| Evals Skills | AI 평가용 6가지 스킬 (Hamel Husain) | https://hamel.dev/blog/posts/evals-skills/ |
| react-best-practices | Vercel 공개 57개 React/Next.js 최적화 rule | (훈스로그 참조) |
| supabase-postgres-best-practices | 수십만 프로젝트 오류 기반 Postgres 가이드 | (훈스로그 참조) |
| claude-scientific-skills | 140개 과학 분야 스킬 컬렉션 | https://github.com/K-Dense-AI/claude-scientific-skills |

### Design & UI
| 도구명 | 설명 | 링크 |
|--------|------|------|
| Playground (Thariq) | 인터랙티브 HTML 도구 생성 | (Anthropic 내부) |
| rams.ai & ui-skills | AI에게 UI 센스를 심어주는 디자인 피드백 도구 | (훈스로그 참조) |

### Research & Knowledge
| 도구명 | 설명 | 링크 |
|--------|------|------|
| DeepWiki Plugin | GitHub 리포를 검색 가능한 지식 베이스로 변환 | https://github.com/qazi0/claude-plugins/tree/main/deepwiki |
| LLM Council Skill | Claude + ChatGPT + Gemini 토론 후 최적 답변 합성 | https://github.com/gcpdev/llm-council-skill |
| claude-code-guide | Claude Code 마스터 가이드 | https://github.com/zebbern/claude-code-guide |

### Team Attention 오픈소스 도구
| 도구명 | 설명 | 링크 |
|--------|------|------|
| cops | Claude Code 사용량 통합/시각화 대시보드 | https://lnkd.in/gEfciiRJ |
| nobs whisper | 로컬 Whisper 음성인식 | https://lnkd.in/guAq5qXV |
| nobs editor | 터미널용 노션 스타일 경량 에디터 | https://lnkd.in/gNVJs9k3 |
| contents hub | 멀티소스 콘텐츠 구독/요약 | (Team Attention) |

### Skillthon 결과물
| 도구명 | 설명 | 링크 |
|--------|------|------|
| Skill-Up | 스킬 통계 RPG 시각화 + TDD 품질 자동 개선 (송범근) | https://lnkd.in/geNkGp73 |
| Visual Workflow Builder | 노드 기반 비주얼 멀티에이전트 워크플로우 | https://lnkd.in/gFew7i2R |
| Video Editing Skills | FFmpeg + SRT 기반 영상 편집 자동화 | https://lnkd.in/g-6-FRVS |
| Auto Check-in | 자연어 기반 자가 회복 출석체크 자동화 | https://lnkd.in/g24Ufenu |
| Short Video Generator | 4단계 파이프라인 숏폼 영상 자동 생성 | https://lnkd.in/gQsaPzxw |

---

## 핵심 인사이트 요약

### 1. Skills가 Claude Code 생태계의 핵심으로 부상
- Anthropic 내부에서 수백 개의 스킬을 운영 중
- rules vs skills 분리로 토큰 비용 절감 + 품질 향상
- 스킬 발동률 최적화 (description을 AI가 판단하기 쉽게 작성)

### 2. Plugin이 MCP의 상위 개념으로 자리매김
- MCP = 통합 레이어 (무엇에 접근할 수 있나)
- Plugin = MCP + Skills + Hooks + Commands 번들 (얼마나 잘 사용할 수 있나)
- 팀 단위 일관된 환경 제공에 핵심적

### 3. 한국 커뮤니티가 글로벌 리더로 부상
- Team Attention x Anthropic 공동 Skillthon 개최
- oh-my-claudecode (Yeachan Heo)가 글로벌 주목
- 서울/판교/대전에서 Claude Meetup 시리즈 진행

### 4. Multi-Agent가 차세대 패러다임
- 단일 에이전트에서 멀티에이전트 오케스트레이션으로 진화
- Superpowers, oh-my-claudecode, claude-flow 등 프레임워크 등장
- Agent Teams로 병렬 작업 수행 (Backend/Frontend/Test/Docs 분리)

### 5. CLAUDE.md 최적화의 중요성
- 500줄, 2.5k 토큰 이내 권장
- 반복 실수 기록, 컴팩션 지침 포함
- rules는 최소한으로, 나머지는 skills로 분리

### 6. Context Engineering이 새로운 핵심 역량
- HANDOFF.md로 세션 간 상태 전달
- 점진적 공개(Progressive Disclosure)로 AI 혼란 방지
- Spec-Based Workflow로 컨텍스트 오염 방지
