# Claude Seminar 프로젝트

## 프로젝트 개요
2026.04.07 전사 발표 "클로드코드 잘 사용하기" (약 60분) 준비 프로젝트.
발표자: AI 1팀 김영동 대리. 청중: 개발자 + 비개발자 혼합 전사 대상.

## 핵심 메시지
코딩이 자연어 수준으로 추상화됨 → 문서/하네스 엔지니어링이 핵심 역량 → Claude Code로 실천.
"컨텍스트를 설계하는 사람이 이긴다."

## 디렉토리 구조

### 자료 수집
- `research/` — 심층 리서치 (하네스, 컨텍스트, 컴파운드 엔지니어링, AI 개발 방법론, 스킬/플러그인, 비개발자 사례)
- `official/` — Claude Code 공식 문서 (core, extensions, integrations, settings)
- `blog/` — Anthropic 공식 블로그 + 한국 블로거 자료
- `linkedin/` — 정구봉(Team Attention) LinkedIn 포스트
- `youtube/` — 유튜브 영상 요약 자료

### 발표 준비
- `presentation_outline.md` — 전체 목차 (10개 섹션)
- `presentation_detail.md` — 전체 섹션 상세 내용 (초기 버전, sections/가 최신)
- `sections/` — 섹션별 상세 내용 (최신, 장표 제작 시 참고)
- `decks/claude-seminar/` — 실제 장표 (HTML → PDF)
  - `slide-XX.html` — 개별 슬라이드 (720pt × 405pt, 16:9)
  - `export-pdf.mjs` — Puppeteer 기반 PDF 변환 스크립트
  - `claude-seminar.pdf` — 최종 PDF 출력물

## 발표 목차 (9개 섹션, "기본 사용법" 섹션은 섹션 2에 흡수되어 제거됨)
1. 코딩은 어디로 가고 있는가
2. 왜 Claude Code인가 (기본 사용법 + 권한/안전장치 + 커뮤니티 포함)
3. AI 시대의 개발 방법론
4. 하네스 & 컨텍스트 엔지니어링 (핵심)
5. 이렇게 하면 망한다 — 한계와 실패 패턴
6. 멀티 에이전트 활용
7. 실전 워크플로우 & 도구 세팅
8. 비개발자도 할 수 있다
9. AI 시대, 우리는 어떻게 해야 하나
10. 마무리 & Q&A

## 슬라이드 디자인 규칙
- 디자인 토큰: bg=#faf8f5, card=#f0ebe3, dark=#2d2a26, accent=#c45a3b, text=#2d2a26/#6b6560
- 폰트: Pretendard (CDN), 슬라이드 규격: 720pt × 405pt (16:9)
- 섹션 디바이더: 다크 배경, 섹션 번호 + 큰 제목
- 콘텐츠 슬라이드: 라이트 배경, SECTION 뱃지 + h2 + 푸터(제목/페이지)
- 강조 체계 (3단계):
  - 배경 정보: 라이트 카드 (#f0ebe3)
  - 주목 포인트: 라이트 + 좌측 레드 보더 3pt
  - 결론: 다크 카드 (#2d2a26), 슬라이드당 최대 1개

## 섹션 문서 규칙
- `sections/XX_섹션명/README.md` 형식으로 각 섹션 상세 내용 정리
- 장표 단위로 쪼개지 않고, 주제별로 내용을 구체적으로 정리
- 디자인 관련 내용(비주얼, 레이아웃 등)은 문서에 포함하지 않음
- 수집된 자료(`research/`, `official/`, `blog/`, `linkedin/`, `youtube/`) 기반으로 작성
- 참고 자료 출처를 문서 하단에 명시
- 각 섹션 문서의 구성: 핵심 메시지 → 본문 내용 → 전환 멘트 → 참고 자료

## 슬라이드 제작 워크플로우

### 새 섹션 슬라이드 만들기 (다른 세션에서 이어서 작업할 때)
1. `sections/XX_섹션명/README.md` 읽기 — 콘텐츠 소스
2. 현재 슬라이드 구조 확인: `ls decks/claude-seminar/slide-*.html | wc -l`
3. 해당 섹션 디바이더 위치 찾기: `grep -l "섹션제목" decks/claude-seminar/slide-*.html`
4. 디바이더 다음 슬라이드부터 콘텐츠 삽입할 공간 확보 (뒤 슬라이드를 밀기)
5. 콘텐츠 슬라이드 생성 (디자인 규칙 준수)
6. 페이지 번호 업데이트 (푸터에 있는 슬라이드만)
7. PDF 재생성: `node decks/claude-seminar/export-pdf.mjs`

### 슬라이드 삽입/삭제
- 삽입: `for i in $(seq [마지막] -1 [삽입위치]); do mv slide-$(printf %02d $i).html slide-$(printf %02d $((i+N))).html; done`
- 삭제: `rm slide-XX.html` 후 뒤 슬라이드를 당기기
- 페이지 번호가 있는 슬라이드 확인: `grep -n 'color: #6b6560;">[0-9]' decks/claude-seminar/slide-*.html`

### 아이콘
- `decks/claude-seminar/assets/`에 SVG 아이콘 저장
- 사용 가능: claude.svg, cursor.svg, githubcopilot.svg, openai.svg, vscode.svg, jetbrains.svg, chrome.svg, terminal.svg, apple.svg, globe.svg
- 슬라이드에서 참조: `<img src="./assets/파일명.svg" style="width: 20pt; height: 20pt;">`

### 작업 규칙
- 섹션 문서 작성 시 장표 단위로 쪼개지 않고, 주제별로 내용을 구체적으로 정리
- 디자인 관련 내용(비주얼, 레이아웃 등)은 문서에 포함하지 않음
- 수집된 자료 기반으로 작성하고, 참고 자료 출처를 문서 하단에 명시
- 발표 멘트는 포함 가능
