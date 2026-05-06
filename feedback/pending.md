# 미반영 피드백

슬라이드·섹션 내용에 대한 피드백을 쌓아두는 곳. 검토 후 반영하면 체크 표시하고 `resolved.md`로 이관.

## 형식
- `- [ ] (slide-XX / 섹션명) 피드백 내용 — 검토 포인트`

## 목록

### 2026-04-05 1차 피드백
- [x] (slide-04) 어셈블리 → C언어로 가는 맥락인데 장표에 "어셈블리" 용어가 명시되면 좋겠음
- [x] (slide-04~06) "추상화의 역사" 문구 위치 통일 필요 — 선호: 가운데 정렬
- [x] (slide-12) 배치 검토 완료 — 6차 피드백에서 "현재 3단 스택 적절, 유지" 확정
- [x] (slide-14) 카드 중간 여백이 과도하게 큼 — 레이아웃 조정
- [x] (slide-24) 페이지 자체 삭제 검토 — 삭제 대신 "Claude Code 생태계" 브리지로 재작성
- [x] (slide-25) "왜 생태계가 중요한가"로 갑자기 전개됨 — slide-24가 브리지 역할
- [x] (slide-29~30) 바이브코딩 관련 내용 삭제 — slide-29 VDD 카드 제거, slide-30 파일 삭제(시프트)
- [x] (slide-31~34) 예시 위치(레이아웃) 통일 필요 — slide-31 flip (코드 예시를 오른쪽으로)
- [x] (slide-31~34 주변) TDD, PDD, SDD 약자 풀이 최소 한 번 언급 필요 — h2에 영문명 추가
- [x] (slide-33) 인용구 한국어로 변경 — 시프트 후 new slide-32
- [x] (slide-36) 바이브코딩 내용 삭제 — Vibe 열 제거, 시프트 후 new slide-35
- [x] (slide-40) 카드 등 여백 과도 — 축소, 시프트 후 new slide-39
- [x] (slide-41) 맨 아래 문구 어색함 — 문장 다듬기, 시프트 후 new slide-40

### 2026-04-05 2차 피드백 — 섹션 8~9 종결어미 전수 검토 (반영 완료)
> 모든 항목 반영 완료. 상세 내역은 resolved.md 참조.

### 2026-04-05 3차 피드백 (반영 완료)
> slide-49(4개 레이어) 삭제로 인해 이후 슬라이드 시프트. 모든 항목 반영 완료. 상세 내역은 resolved.md 참조.

### 2026-04-05 4차 피드백 (반영 완료)
> slide-61, 62, 66, 78, 79 삭제 + 이후 슬라이드 시프트. 페이지 번호 푸터 전부 갱신. 모든 항목 반영 완료. 상세 내역은 resolved.md 참조.

### 2026-04-06 5차 피드백 (반영 완료)
> slide-83(글쓰기가 새로운 코딩), slide-84(시작하는 사람에게) 삭제 → slide-85~93 시프트, 총 91장. 모든 항목 반영 완료. 상세 내역은 resolved.md 참조.

### 2026-04-06 디자인 품질 감사 — CSS 규칙 위반 (반영 완료)
> padding 28건, border-radius 148건 일괄 수정 완료. 상세: padding `32pt 48pt 56pt`/`48pt 64pt`→`40pt 48pt`, normal 카드 8pt→6pt, attention 카드 4pt→6pt, dark 결론카드 6pt/10pt→8pt.

### 2026-04-06 디자인 품질 감사 — 시각적 이슈 (검토 후 반영)

#### REDESIGN 후보 — 반영 완료
- [x] (slide-16) 개발 패러다임 전환 — 2열 비교로 재설계, #3d3a36 제거
- [x] (slide-22) 확장 레이어 구조 — 4티어 구조로 재설계
- [x] (slide-30) 구조화 수준 스펙트럼 — 그라데이션 축 + SDD 다크카드 강조
- [x] (slide-36) 방법론 비교 — 3행 핵심 + 다크 결론카드
- [x] (slide-56) Ralph Loop — 2-column 카드 제거, 다이어그램+3카드 요약

#### 정보 밀도 과다 — 반영 완료
- [x] (slide-41) 프롬프트 엔지니어링 — 3열→포함관계 인라인
- [x] (slide-43) Agent = Model + Harness — 4열 그리드→1줄 텍스트
- [x] (slide-46) 컨텍스트 4가지 실패 모드 — 서브타이틀 축소, POISONING 다크카드 강조
- [x] (slide-51) CLAUDE.md 운영 원칙 — 자가진단 5문항 삭제
- [x] (slide-52) CLAUDE.md 현장 사례 — 4개→2개 대표 사례
- [x] (slide-81) 안전 감각 — 4개→2개 카드 통합

#### 시각적 위계 부재 — 반영 완료
- [x] (slide-19) CLI 기반 — 슬라이드 삭제됨
- [x] (slide-21) 내장 도구 — "실행" 행 다크카드 강조
- [x] (slide-44) 하네스 6대 구성 — ①컨텍스트 ④검증 다크카드 강조
- [x] (slide-57) 암묵지를 파일로 — 번호 리스트로 전환
- [x] (slide-65) 핵심 패턴 5가지 — Sub-Agent 다크배경 강조
- [x] (slide-72) OMC — 다크 결론카드 추가
- [x] (slide-80) 원칙은 그대로 — 4행 축소 + 다크결론카드

#### 코드 블록 가독성 — 반영 완료
- [x] (slide-32) TDD — 8.5pt→9.5pt
- [x] (slide-34) SDD — 8pt→9pt
- [x] (slide-73) 단일 모델 탈피 — 7.5pt→9pt
- [x] (slide-76) 폴더 구조 — 8pt→9pt
- [x] (slide-77) CLAUDE.md 일관성 — 7pt/7.5pt→9pt

#### 다크카드 대비 — 반영 완료
- [x] (slide-24) 모델 선택 — #6b6560→#a09a94
- [x] (slide-55) Plan-Critic-Build — 이미 #a09a94
- [x] (slide-86) 세 개의 증언 — #6b6560→#a09a94

#### 내러티브/구조 — 반영 완료
- [x] (slide-05) 인용문 강조 상향 (13pt, #2d2a26)
- [x] (slide-58) OpenAI 인용문 포맷 + 출처 추가
- [x] (slide-61) 카드05 다크카드로 전환 (클라이맥스 시각화)
- [x] (slide-67) "팀이면 다 좋다" em 적용
- [x] (slide-80) 떠다니는 하단 문단 → 다크결론카드 전환

### 2026-04-06 6차 피드백

#### 앵커·섹션1
- [x] (slide-03) "오늘 발표의 결론을 먼저" 문구 삭제, "컨텍스트 설계" → "하네스 설계"로 변경
- [x] (slide-05) 어셈블리 문구 삭제, 이진수/기계언어 느낌으로 변경
- [x] (slide-13/그래도 기초는 중요하다) 섹션 제목 — 현재 유지로 확정

#### 섹션2
- [x] (slide-19) 삭제 완료 + 시프트
- [x] (slide-23, 24) 섹션2에 적합 확인 — 유지

#### 섹션3
- [x] (slide-31) TDD 재작성 — 설명 명확화 + 치팅 내용 통합
- [x] (slide-32) TDD 치팅 슬라이드 삭제
- [x] (slide-33) SDD 재작성 — SDD 실전 내용 통합
- [x] (slide-34) SDD 실전 슬라이드 삭제

#### 섹션4
- [x] (slide-40) 연도 정보 수정 — 2023→, 2025→, 2026→
- [x] (slide-41) "가장 안쪽 층" → "기초에는" 변경
- [x] (slide-45) 에이전트 루프 — 이미 신뢰성 강조 반영됨
- [x] (slide-44, 45, 47) 섹션4→섹션5 이동 — 현재 위치 유지로 확정
- [x] (slide-48) Long-Horizon 삭제 완료
- [x] (slide-50) 다크카드 호흡 줄바꿈 + 예시를 실제 CLAUDE.md 내용으로 교체
- [x] (slide-51) "한 줄 삭제 테스트" 문구 개선 + 공식문서 톤 반영
- [x] (slide-51, 52) "2.5k 토큰" → "A4 약 1.5장" 환산
- [x] (slide-49) 스킬 설명 보강 — 선택 로직(description 기반 매칭), 토큰 소비(호출 시 로드)
- [x] (slide-54) "2025.10 공개 배타" 삭제
- [x] (slide-51) 팀 스킬 레포 캡처 슬라이드 추가 (Playwright 캡처)
- [x] (slide-52~53) 팁 전환 미니 브릿지 — 추가 후 원복 (불필요 판단)
- [x] (slide-53) 심슨 Ralph 사진 추가
- [x] (slide-56) 상단 설명 호흡 개선

#### 섹션6
- [x] 섹션6 재논의 완료 — Subagent vs Agent Team 이동(→slide-63), 나머지 유지

#### 섹션7
- [x] (slide-71) "원리 없이 플러그인만" → "원리 없이 스킬만"

#### 섹션8
- [x] (slide-72) 앵커 슬라이드 재삽입 ("기억하시나요")
- [x] (slide-75) "발표자 1인" → "김영동"
- [x] (slide-76) CLAUDE.md "(하네스)" → "(프로젝트 규칙)"
- [x] (slide-75) CLAUDE.md 일관성 — 초기→현재 진화 구조로 재작성
- [x] (slide-76) slides-grab 오픈소스 명시 + 하단 문구 재작성
- [x] (slide-79) "git reset" → "되돌리기"

#### 섹션9
- [x] 섹션9 전체 재설계 완료 — 7장 내러티브 (1956년→피로→정체성→증언→취향→관점→내일부터)
- [x] (slide-88) "딸깍쇼" → "남의 요약본을 보고 또 요약하지 마라"
- [x] (slide-89) "내일부터" + 토큰 소비 + 박종천 인용

#### 다크카드 + 레드보더 이중 시그널 (선택적 정리)
- [x] (slide-48, 50, 55, 62, 64) 다크 배경에서 레드보더 제거 완료

#### 섹션 디바이더 타이틀 크기 비일관
- [x] (slide-39/70/74/82) 40pt/48pt → 44pt 통일 완료

#### 기타 시각 이슈
- [x] (slide-02) 목차 — 섹션4 '하네스' 항목 강조 (bold + accent color)
- [x] (slide-10) 숫자로 보는 변화 — 100% 카드에 레드보더 추가로 구분
- [x] (slide-12) 개발자의 새로운 역할 — 현재 3단 스택으로 적절, 유지
- [x] (slide-13) 인용문 줄바꿈 3행 균형으로 조정 완료

### 2026-04-06 8차 피드백

#### 섹션3
- [x] (slide-29) "TDD 실전 — 서브에이전트 격리" → "TDD 예시"로 변경. 서브에이전트 표현 제거, AI 치팅 3대 패턴 + CLAUDE.md 필수 규칙으로 교체
- [x] (slide-30) SDD 정보 밀도 완화 — TDD 비교 섹션 제거, "언제 쓰나" + "핵심" 2카드로 단순화
- [x] (slide-31↔32) SDD 실전(spec-kit)을 방법론 비교 앞으로 이동 — slide-31과 32 순서 교체
- [x] (slide-34) 브릿지 리디자인 — 세로 카드 → 가로 3카드 레이아웃, 공백 제거

#### 섹션4
- [x] (slide-40) 하네스 6대 구성 — 카드①④ 다크 → 라이트로 통일 (6개 동일 스타일)
- [x] (slide-42~43→55~56) 실패 모드·Context Rot → 섹션5로 이동. SECTION 배지 5로 변경. 섹션5 흐름: 54(신뢰성) → 55(실패 모드) → 56(Context Rot) → 57(5가지 패턴) → 58(기초)
- [x] (slide-43, was 45) "4개 레이어" → "하네스의 가장 기본적인 레이어"로 변경
- [x] (slide-43, was 45) 나쁜 예시 교체 — "깔끔한 코드 작성" · "적절한 에러 핸들링" · "좋은 패턴 사용"
- [x] (slide-43, was 45) "결정적 차이" 문장 삭제
- [x] (slide-43 NEW) 4가지 도구 개요 슬라이드 추가 — CLAUDE.md · Skills · Hooks · Plugins + 강제력 순서
- [x] (slide-50 NEW) 고급 팁 전환 슬라이드 추가 — Plan–Critic–Build · Ralph Loop · 암묵지 추출
- [x] (slide-48 NEW) 스킬 상세 슬라이드 추가 — 실제 파일 구조(frontmatter + markdown) + 호출→매칭→로드→실행 4단계 흐름. "필요할 때만 꺼내 쓰는 CLAUDE.md"
- [x] (slide-48, was 49) 플러그인 등록 예시 → nkia-ai-team 설치로 변경
- [x] (slide-49, was 50) 실제 스킬 14개 소개 — code-review · commit · linear-issue-creator · linear-issue-validator · kickoff · figma-to-react · submit · wrap-up 등

### 2026-04-06 9차 피드백

#### 섹션2
- [x] (slide-18) 연한 카드 아이콘에 `filter: brightness(0)` 적용 — 4개 아이콘 다크 처리, Claude Code 행은 유지
- [x] (slide-19) SVG viewBox 확장(36→44pt), 곡선과 텍스트 분리(y=38), 화살촉 크기 조정(8→6)

#### 섹션4
- [x] (slide-50) 코드 품질·프로젝트 관리 다크카드 → 라이트(#f0ebe3) 통일. /commit 문구 "PIMS 이슈 번호 포함 · 컨벤션 커밋 자동 생성"으로 명확화
- [x] (slide-54) 암묵지 다크카드에 "모호함도 점수화(0~10) → 구조화 가능" 추가

#### 섹션5
- [x] (slide-61) "번역기의 비유" 하단 카드 삭제 + 다크카드 margin 14→10pt 축소

#### 섹션6
- [x] (slide-64) Sub-Agent 카드 #2d2a26 → #f0ebe3 통일 + SVG·텍스트 색상 반전
- [x] (slide-65) border-left 카드 padding-left 12→16pt 확대 (6개 전체)
- [x] (slide-66) "가장 과소평가된 패턴" 삭제 → "일상 작업의 80% — Sub-Agent로 해결"

#### 섹션7
- [x] (slide-70, was 70) 카드 padding 12→10pt, gap 12→10pt, margin-top 14→10pt 축소
- [x] (slide-71) 모델 라우팅 삭제 완료. 핵심 정보(/model 수동 전환)를 OMC 슬라이드 모델 라우팅 행에 흡수
- [x] (slide-75, was 76) "전사 이슈 관리: PIMS" 삭제 → "Linear — 개발팀 이슈 트래커"로 단순화

#### 섹션9
- [x] (slide-85) 1956년 역사 — 삭제 완료 + 이후 슬라이드 시프트
- [x] (slide-83, was 86) 최전선의 피로 — grid 0.9fr:1.1fr 밸런스 조정
- [x] (slide-87) 두려움의 정체 — 삭제 완료 + 이후 슬라이드 시프트
- [x] (slide-86, was 89) 내일부터 — 팀 스킬 설치 삭제, OMC 설치를 레드보더 카드로 승격 ("Oh My Claude Code 설치 — 원리의 자동화")

> 총 3장 삭제 (71, 85, 87) → 91장에서 88장으로. 페이지 번호 전체 갱신 완료. PDF 재생성 완료.

#### 섹션6
- [x] (slide-67→65) Subagent vs Agent Team을 Sub-Agent 상세 앞으로 순서 교체 완료 (65: 비교, 66: Sub-Agent, 67: Agent Teams)
- [x] (slide-65, was 67) 카드 줄 간격 개선 — gap 12→14pt, line-height 1.55 추가
- [x] (slide-68) 5분 에이전트 철학 — 삭제 완료 + 이후 슬라이드 시프트

#### 섹션7
- [x] (slide-71, was 72) 모델 선택 → "모델 라우팅 — 작업별 최적 선택"으로 재작성. Haiku/Sonnet/Opus 3열 + 수동전환·서브에이전트·자동라우팅 실전 가이드
- [x] (slide-72, was 73) OMC "말한다" → "입력" 명사형 수정. 핵심 철학 추가: "원리를 사람이 외우지 않고 시스템이 강제"
- [x] (slide-73, was 74) "빛나는 순간"에 "계획 피드백 (다른 시각의 보완)" 항목 추가
- [x] (slide-74, was 75) "나의 작업 환경" → "실전 세팅" 제목 변경. 카드 gap 10→8pt, margin 12→8pt 축소
- [x] (slide-75, was 76) Linear(PIMS) 표기 추가 (제목·파이프라인·다크카드). 하단에 "전사 이슈 관리: PIMS" 소개

#### 섹션8
- [x] (slide-82, was 83) "이 발표가 증거"로 재작성 — 91장 전부 Claude Code 제작, 사용 원칙 + 실제 워크플로우 4단계
- [x] (slide-83, was 84) "AI를 잘 쓰는 법 — 결국 하나"로 재작성 — 3단계 원칙 (글로 먼저→문서 고정→검증) + 이 발표/코딩/업무 적용 예시
- [x] (slide-85) 안전 감각 — 삭제 완료 + 이후 슬라이드 시프트

#### 섹션9
- [x] (slide-87, was 89) "실업이 아니라 정체성" → "두려움의 정체 — 정체성 위기". "빼앗을까" → "대체할까", "진짜 질문" → "더 나은 질문" 톤 완화
- [x] (slide-91~92) 취향이 자본 + 관점 전환 — 삭제 완료 + 이후 슬라이드 시프트
- [x] (slide-89, was 93) 내일부터 — 카드 padding 14→12pt, gap 10→8pt 축소. OMC 설치 + 팀 스킬 설치 명령어 카드 추가

> 총 4장 삭제 (68, 85, 91, 92) → 95장에서 91장으로. 페이지 번호 전체 갱신 완료. PDF 재생성 완료.

### 2026-04-06 7차 피드백

- [x] (slide-03) "코드 한 줄 없이 만든 방법" → "한 장도 직접 만들지 않은 방법"으로 변경
- [x] (slide-03) "이 감각이 오늘의 목적지" → "이것이 오늘의 목적지"로 변경
- [x] (slide-10) 100% 카드 레드보더 제거 — 3장 모두 보더 없이 통일
- [x] (slide-12) 영화 감독 → 오케스트라 지휘자 (직접 연주 대신 전체 조율, CLAUDE.md = 총보)
- [x] (slide-13) 오른쪽 카드 "보안 · 동시접속 · DB 스키마 · 캐싱" 줄바꿈 추가
- [x] (slide-18) Codex 특징 수정 — "클라우드 샌드박스 실행" → "로컬 실행, 확장 레이어 구조"로 통일, Claude Code 다크카드 시각 구분 유지
- [x] (slide-18) 도구 이름 왼쪽에 아이콘 복원 (githubcopilot/cursor/globe/openai/claude.svg)
- [x] (slide-19) 에이전트 루프 — SVG 곡선 화살표로 3→1 복귀 시각화 추가
- [x] (slide-20) "실행" 행 다크카드 → 일반 카드(#f0ebe3)로 변경
- [x] (slide-22→63) Subagent vs Agent Team — 섹션6으로 이동 (Agent Teams 뒤). SECTION 배지 6으로 변경, 페이지 번호 갱신
- [x] (slide-23→68) 모델 선택 — 섹션7로 이동 (두 가지 막다른 길 뒤, OMC 앞). SECTION 배지 7로 변경, 페이지 번호 갱신
- [x] (섹션3) PDD 삭제 — slide-28(PDD) 삭제 + slide-27 스펙트럼 TDD↔SDD 2카드로 단순화 + slide-30(was 33) 비교표 2열 축소 + 최적장면 행 추가. 결론: "SDD로 정의 + TDD로 검증"
- [x] (slide-29 NEW) TDD 실전 프롬프트 — alexop.dev 서브에이전트 격리 패턴 (Red/Green/Refactor 3단계 자동 강제)
- [x] (slide-32 NEW) SDD 실전 프롬프트 — GitHub spec-kit 3커맨드 워크플로우 (specify/plan/tasks)
- [x] (slide-34, was 35) 브릿지 카드 높이 축소 — padding 12→10pt, gap 10→8pt, margin-bottom 28→20pt

### 2026-04-06 10차 피드백

- [x] (slide-86) 내일부터 — 개발자/비개발자 카드 분리 제거, "글로 먼저" · "직접 써보기" · "도구" 3카드로 통합
- [x] (slide-87) 마무리 & Q&A 섹션 디바이더 — 삭제. 감사합니다 페이지에서 자연스럽게 Q&A 전환
- [x] (slide-88, was 감사합니다) "Q&A · 질문 환영" → "AI 1팀 김영동"으로 변경. 슬라이드 번호 87로 시프트
- [x] (slide-92~93 부록) 슬라이드 번호 88~89로 시프트

### 2026-04-06 11차 피드백 — Claude+Codex 리뷰 (즉시 반영)
- [x] (slide-03) "95장" → "89장" 숫자 수정
- [x] (slide-77) "91장 제작" → "89장 제작" 숫자 수정
- [x] (slide-81) "91장 전부" → "89장 전부" 숫자 수정
- [x] (slide-60) 첫 번째 카드 번호 "60" → "01" 오기재 수정
- [x] (slide-02/75) 섹션8 제목 "모두의 이야기"로 통일 (TOC + 디바이더)

### 2026-04-06 11차 피드백 — Claude+Codex 리뷰 (검토 후 반영)
- [ ] (섹션4) 21장 과중 — 12~14장 압축 또는 중간 브레이크 슬라이드 삽입 검토
- [ ] (섹션7+8) 체감 겹침 — 통합 또는 7="개발팀 운영"/8="비개발자 적용" 대비 강화 검토
- [ ] (전체) 60분에 89장 페이스 — 55~65장 압축 또는 "스킵/플래시" 운영 전략 수립
- [ ] (섹션4~7) 비개발자 접근성 — S4 시작 또는 S6 시작에 "비개발자용 takeaway" 브리지 1장 검토
- [ ] (카피) 종결어미 규칙 예외 정책 — "제목=명사형, 보조문=짧은 서술 허용" 문서화 또는 예외 슬라이드 정리
- [x] (slide-10) flex: 1 메인 콘텐츠 영역 사용 — CLAUDE.md 디자인 규칙 위반 → 제거 완료
- [ ] (slide-60) 첫 번째 카드 opacity: 0.7 — 의도적 디자인인지 확인

### 2026-05-05 12차 피드백 — 디자인 법칙 ①~⑥ 전수 감사 (반영 완료)

> CLAUDE.md "정보 유형별 디자인 매핑" ①~⑥ 기준 92장 전수 점검. 옵션 C(HIGH 4 + MEDIUM 17) 진행.
> 재평가 결과 다수 슬라이드는 이미 적절한 위계 보유 — 실제 위반 슬라이드만 타겟 수정.

#### HIGH 우선순위 — 반영 완료
- [x] (slide-31) SDD spec-kit 3커맨드 — 다크카드 3개 → 라이트 시퀀스(STEP 1/2/3) + 우측 다크 "핵심"만 메인. 메인 1개 보장
- [x] (slide-38) 재평가 — 이미 `36%` 다크카드가 명확한 메인. 수정 불필요(감사 오인)
- [x] (slide-76) Vision OCR vs Upstage — `min-height: 130pt` 제거, opacity·다크/라이트 대비로 승자 명확화 (✗/✓ 표식)
- [x] (slide-92) References — 이질적 행 레이아웃(1/3/2명) → 균일 3×2 카드 그리드 + 다크 GitHub 메인

#### MEDIUM 우선순위 — 타겟 반영
- [x] (slide-12) 컨텍스트 능력 다크카드 비중 상향(13→16pt) + 우측 비유 약화로 강약 분리
- [x] (slide-15) 메인 콘텐츠 영역 `flex: 1` 제거 — CLAUDE.md 규칙 준수
- [x] (slide-26) 타임라인 — 이전 3개 이벤트 컴팩트(padding·font 축소), 마지막 "2026 초" 다크카드 확대
- [x] (slide-28) TDD 사이클 — Red 다크카드 → 라이트 + accent border-left. 우측 "치팅" 다크와 중복 제거
- [x] (slide-32) TDD vs SDD 표 — 자명한 "프로덕션 적합도" 행 삭제, "최적 장면" 행 accent border-left + 폰트 강조
- [x] (slide-75) Claude vs Upstage A/B — Upstage 다크카드 + box-shadow로 메인 승격, 좌측 라이트 약화
- [x] (slide-80) 메인 콘텐츠 `flex: 1` 제거 + 우측 다크 결론 카드 `flex: 1` 제거 — 자연 높이로

#### MEDIUM — 재평가 후 SKIP (이미 적절)
- (slide-11) 4개 마크다운 도구 카드 — 진짜 병렬 카테고리 비교 (모두가 동일 패턴 사용 = 메시지 자체)
- (slide-14) 섹션 디바이더 — 면제
- (slide-37) 프롬프트 ⊂ 컨텍스트 ⊂ 하네스 — 다크 인용 카드가 명확한 메인
- (slide-39) Agent = Model + Harness — 다크 HARNESS 박스가 명확한 메인
- (slide-44) 헌법 — 상단 다크 callout이 메인
- (slide-45) 운영 원칙 — 다크 "한 줄 삭제 테스트" 인용이 메인
- (slide-64) 5 패턴 — SVG가 카드 정체성, 진짜 카테고리 비교
- (slide-72) /ask vs /ccg — 두 도구 동등 비중 의도적
- (slide-77) OCR 파이프라인 — 다크 결론 카드가 명확한 메인
- (slide-85) AI 잘 쓰는 법 — 3단계 시퀀스 + 다크 결론 카드

### 2026-05-05 13차 피드백 — Red border-left 희소성 규칙 신설 (반영 완료)

> **사용자 통찰**: red border-left가 "강조"가 아니라 "기본 장식"이 됨 — AI 시그니처. CLAUDE.md에 희소성 규칙 추가 + 22장 일괄 정리.

#### CLAUDE.md 규칙 추가
- [x] "강조 체계 (3단계)" 아래에 **Red border-left 희소성 원칙** 신설:
  - 슬라이드당 최대 1개
  - N분할 동일 카테고리에는 절대 적용 금지
  - 메인이 다크 카드일 때는 다른 곳에 red border 사용 금지
  - 다크 카드 자체에 red border 추가 금지 (이중 시그널)
  - mirror 카드 양쪽 동시 적용 금지

#### 22장 정리 (border-left 인스턴스 83 → 23)
- [x] (slide-28) Red 스텝 + DORA stat — 모두 제거 (우측 다크 "치팅" 메인)
- [x] (slide-31) STEP 1/2/3 시퀀스 카드 — 3개 모두 제거
- [x] (slide-33) Spec + TDD mirror — 모두 제거 (`+` 자체가 동등 파트너십)
- [x] (slide-38) 재현성·복리 카드 — 2개 제거 (다크 36% 메인)
- [x] (slide-41) VERIFY 다크+red, 푸터 red — 모두 제거 (4-step 균일 리스트)
- [x] (slide-46) Boris vs 정구봉 mirror — 모두 제거 (다크 인용 메인)
- [x] (slide-47) Skill/Hook mirror — 모두 제거 (다크 "구분법" 메인)
- [x] (slide-52) PLAN/CRITIC red, 푸터 red — 모두 제거 (BUILD 다크 메인)
- [x] (slide-57) 2 인사이트 red — 모두 제거 (다크 메인)
- [x] (slide-60) 3 패턴 red — 모두 제거 (#01 dim + #05 dark 위계 유지)
- [x] (slide-65) 카드 내부 6 dividers red — 단순 padding-left 4pt로 치환
- [x] (slide-66) 3 benefits + dark+red — 모두 제거 (다크 메인)
- [x] (slide-67) 2 chars + dark+red — 모두 제거 (다크 메인)
- [x] (slide-72) /ask vs /ccg — /ask red 제거, /ccg만 유지 (확장 패턴 강조)
- [x] (slide-73) 4창 identical red — 모두 제거 (동등 역할)
- [x] (slide-80) 2 right + dark+red — 모두 제거 (다크 메인)
- [x] (slide-81) 2 principles + dark — 모두 제거 (다크 메인)
- [x] (slide-83) 3 STAGES + 푸터 red — 모두 제거 (다크 메인)
- [x] (slide-85) 3 화살표 카드 — 모두 제거 (다크 결론 메인)
- [x] (slide-87) Simon 다크+red, 결론 light+red — Simon 다크 red 제거, 결론 red 유지 (단일 강조)
- [x] (slide-88) 3 증언 + dark — 모두 제거 (다크 "증폭" 메인)
- [x] (slide-89) 3 행동 + dark — 모두 제거 (다크 박종천 인용 메인)

### 2026-05-06 15차 피드백 — Upstage 섹션 강화 (반영 완료)

> 2026-05-08 Upstage 발표 대비. 카드 단위 Upstage 브랜드 컬러 적용 + 섹션 5장으로 확장 + 실제 추출 데이터 사용.

#### 카드 디자인 — Upstage 브랜드 적용 (slide-75/76/77 → 76/77/78)
- [x] (slide-76, was 75) 우측 Upstage 카드: 다크 → JP 50 (`#ECF0FF`) + Ups Purple 보더 + box-shadow
- [x] (slide-77, was 76) 우측 Upstage 카드: 동일 패턴 + 내부 마크다운 표 화이트 배경
- [x] (slide-78, was 77) 중앙 Upstage 파이프라인: JP 50 + Ups Purple. ★ Layout 분석 step → Ups Purple, 분류 step → JP 950 (`#1E1650`)

#### 섹션 확장 — 3장 → 5장
- [x] (slide-75 NEW) **"Upstage = 모델 + 입력 계약화"** — Solar(LLM) + Skills(API) 두 축. solar-pro3/mini · document-parse/info-extract/ocr/classification 카드. 다크 결론(JP 950) "한국어 컨텍스트 = 모델 + Skills 양쪽"
- [x] (slide-77, was 76 데이터 강화) AI 도구 비교표 generic 데이터 → **실제 발표 PDF의 slide-2 (목차) 추출 비교 데이터**. parse-default.md vs parse-upstage.md 실측. self-referential 임팩트
- [x] (slide-79 NEW) **"Solar 위임 — Claude는 두뇌, Solar는 글쟁이"** — solar-delegation 스킬 위임 흐름 5단계. 우측 다크(JP 950)에 큰 숫자 **"1/42"** (Output 토큰 비용 vs Opus). 5천자 시나리오 $0.10 → $0.0024

#### 페이지 시프트 + 데이터 검증
- [x] 92장 → 94장 (slide-78~92 +2 시프트, slide-75~77 +1 시프트)
- [x] 페이지 푸터 번호 일괄 갱신
- [x] "89장" 레퍼런스(slide-3/76/77/82/84/86)는 historical 실험 데이터로 유지

> Sources: Upstage Pricing (upstage.ai/pricing), Anthropic API Pricing (claude.com/pricing#api). 비교 기준 2026-05-06.

### 2026-05-06 14차 피드백 — 종결어미 ~다 검수 (반영 완료)

> CLAUDE.md "종결어미 규칙" 기준 92장 전수 검수. 인용문/코드블록/다크 슬로건 예외 제외, 본문 서술형 7건 발견 → 명사형 변환.

- [x] (slide-09) 큰 슬로건 "매번 틀렸다" → "**매번 빗나감**" (슬로건 임팩트 유지)
- [x] (slide-13) h2 "그래도 기초는 중요하다" → "**여전히 남는 기초**"
- [x] (slide-28) 서브타이틀 "테스트를 먼저 쓰고, 통과하는 코드를 나중에 쓴다." → "**테스트가 먼저, 코드가 나중.**"
- [x] (slide-52) 카드 "다른 눈으로 본다" → "**다른 눈의 시각**"
- [x] (slide-54) 카드 "결정의 '이유'를 쓴다" → "**결정의 '이유'까지 기록**"
- [x] (slide-59) h2 "Context Rot — 길수록 조용히 썩는다" → "**Context Rot — 길수록 조용한 부패**"
- [x] (slide-88) 서브타이틀 "세 사람이 거의 같은 말을 한다." → "**세 사람의 거의 같은 메시지.**"

> SKIP — 의도된 리듬: slide-68 "쪼갠다 × 4" (사용자 결정 — 리듬 유지).
> SKIP — 예외 조항: 인용문 내부 (Phil Schmid·Armin·Simon·Drew·Kent·OpenAI 등), code 블록 내부 (slide-44/82 메타 콘텐츠), 다크 슬로건 (slide-54 "하네스가 된다", slide-56 "이렇게 하면 망한다", slide-90 "감사합니다").
