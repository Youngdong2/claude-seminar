# claude-seminar.pdf

> 89 slides — OCR via macOS Vision (ko-KR + en-US), source: `claude-seminar.pdf`

## Slide 1

Claude Code
전사 세미나
클로드코드
잘 사용하기
AI와 함께하는 새로운 개발 워크플로우
발표자
일시
AI 1팀 김영동 대리
2026년 4월 7일

## Slide 2

01
코딩은 어디로 가고 있는가
02
왜 Claude Code인가
03
AI 시대의 개발 방법론
04
하네스 & 컨텍스트 엔지니어링
05
이렇게 하면 망한다 - 한계와 실패 패턴
06
멀티 에이전트 활용
07
실전 워크플로우 & 도구 세팅
CLAUDE CODE SEMINAR
08
모두의 이야기
09
AI 시대, 우리는 어떻게 해야 하나
10
마무리 & Q&A
목차

## Slide 3

이 89장의 장표를
한 장도 직접 만들지 않은 방법
한 것은 하나 - 하네스 설계
이것이 오늘의 목적지

## Slide 4

01
코딩은 어디로
가고 있는가

## Slide 5

추상화의 역사 - 1단계
기계어
01001000 01100101
01101100 01101100
01101111 00000000
C 언어
"기계를 직접 다루지 않으면
개발자가 아니다
printf("He110");

## Slide 6

추상화의 역사 - 2단계
C
Java
Pte mathoetoiney
Object obj = new Object() :
나 0 0oe pte .
// ••• use obj ...
£rectpte);
1/ GC handles cleanup
"메모리 직접 관리 안 하면 개발이 아니다"

## Slide 7

추상화의 역사 - 3단계
print ("He110")
"장난감 연어, 실제 개발에 못 쓴다"
Python 》 #1 언어

## Slide 8

추상화의 역사 - 그리고 지금
"이 함수를 리팩토링하고 테스트를 작성해줘"
"이건 진짜 개발이 아니다"

## Slide 9

매번 틀렸다

## Slide 10

SECTION 1
숫자로 보는 변화
~3개월
25%
100%
YC 2025 겨울 배치 중
Meta 엔지니어가 코드를
AI가 짠 코드가 사람의 터치 없이
코드베이스의 95%를 AI로 생성
직접 타이핑하지 않은 기간
PR에 그대로 올라오는 일상
클로드코드 잘 사용하기
10

## Slide 11

SECTION 1
마크다운이 코드를 대체하는 현실
이름은 다르지만 역할은 동일 - 마크다운으로 프로젝트 규칙을 AI에게 전달
Claude Code
Cursor
CLAUDE . md
Cursor Rules
GitHub Copilot
Codex
copilot-instructions.md
AGENTS . ma
클로드코드 잘 사용하기
11

## Slide 12

SECTION 1
개발자의 새로운 역할
코드를 잘 짜는 능력
건축가
벽돌 쌓기 대신 설계도 작성.
정확한 설계도 〉 튼튼한 건물.
문서를 잘 쓰는 능력
오케스트라 지휘자
직접 연주 대신 전체 조율.
CLAUDE.md = 총보
컨텍스트를 설계하는 능력
클로드코드 잘 사용하기
12

## Slide 13

SECTION 1
그래도 기초는 중요하다
"A/가 더 많이 해줄수록,
기초 지식을 가진 사람의 경쟁력이
역설적으로 올라간다"
변하는 것
변하지 않는 것
직접 코드를 타이핑하는 비중
시스템을 이해하는 능력
데모까지는 쉽지만, 실서비스로 만드는 건 전혀 다른 레벨
보안 • 동시접속 • DB 스키마 • 캐싱
기본기 없이는 질문조차 불가
클로드코드 잘 사용하기
13

## Slide 14

02
왜 Claude Code인가

## Slide 15

SECTION 2
Al 코딩 도구의 진화 3단계
1단계
2단계
3단계
자동완성
대화형 채팅
에이전틱 코딩
IDE가 다음 줄을 예측
코드 토론, 버그 설명
목표를 분해하고 독립 실행
반복 패턴에 탁월
스니펫 붙여넣기
전체 코드베이스 이해
한계: 현재 파일로 컨텍스트 제한
한계: 다중 파일 조율이 수동
{ 지금 여기
클로드코드 잘 사용하기
15

## Slide 16

SECTION 2
개발 패러다임 전환
기존 개발
에이전틱 개발
코드 작성
목표 정의
테스트• 오류•수정
에이전트가 실행
반복...
변경 검토 • 승인
인간이 모든 단계를 직접 수행
인간은 의도와 판단에 집중
클로드코드 잘 사용하기
16

## Slide 17

SECTION 2
에이전틱 코딩의 실제 성과
2주
1~2일
복합효과
CTO 추정 4~8개월 프로젝트를
신규 개발자 온보딩
에이전틱 코딩으로 완료
기존 수주~수개월에서 단축
불가능하던 작업 실현
기술 부채 해결 • 즉각 피드백
Augment Code + Vertex AIl
첫날부터 의미 있는 기여 가능
클로드코드 잘 사용하기
17

## Slide 18

SECTION 2
Al 코딩 도구 비교
도구
형태
특징
8
GitHub Copilot
IDE 플러그인
코드 자동완성 중심, 가장 대중적
Cursor
IDE
AI 네이티브 에디터, 에이전틱 기능 내장
Windsurf
IDE
에이전틱 IDE, Cascade 에이전트
Codex (OpenAl)
터미널 CLI
에이전틱, 로컬 실행, 확장 레이어 구조
Claude Code
터미널 CLI
에이전틱, 로컬 실행, 확장 레이어 구조
클로드코드 잘 사용하기
18

## Slide 19

SECTION 2
에이전트 루프
목표만 주면 작업 완료까지 알아서 반복. 언제든 중단하여 방향 수정 가능.
1
2
3
컨텍스트 수집
작업 수행
결과 검증
파일 검색, 코드 구조 파악
파일 편집, 셀 명령 실행
테스트 실행, 빌드 확인
설정 파일 읽기, 의존성 매핑
새 파일 생성
오류 시 1로 복귀
목표 달성까지 반복
클로드코드 잘 사용하기
19

## Slide 20

SECTION 2
내장 도구 - 5가지 범주, 20개+
파일 작업
파일 읽기, 코드 편집, 새 파일 생성, 이름 변경 및 재구성
검색
패턴으로 파일 찾기, 정규식으로 콘텐츠 검색, 코드베이스 탐색
실행
셸 명령 실행, 서버 시작, 테스트 실행, git 사용
웹 검색, 문서 가져오기, 오류 메시지 조회
코드 인텔리전스
타입 오류/경고 확인, 정의로 이동, 참조 찾기
클로드코드 잘 사용하기
20

## Slide 21

SECTION 2
확장 레이어 구조
CLAUDE.md만으로 시작. 필요에 따라 하나씩 추가.
기초
CLAUDE.md
모든 세션에서 로드되는 프로젝트 컨텍스트
Skills
Hooks
자동화
재사용 가능한 워크플로우
이벤트 기반 자동 실행
연결
MCP
외부 서비스 통합- Notion, GitHub, Slack 등 100개+
확장
Subagents
Agent Teams
Plugins
격리된 병렬 작업
독립 세션 협업
패키징 • 배포
클로드코드 잘 사용하기

## Slide 22

SECTION 2
Claude Code 생태계
도구 자체보다 주변 생태계가 더 빠르게 커지는 중.
공식 확장 포인트
오픈소스 커뮤니티
한국 커뮤니티
스킬 • 플러그인 • MCP • 훅
awesome-claude-code
블로그 • 영상 • 세미나
Anthropico 직접 설계한 확장 죽 4종.
GitHub 기반 플러그인•스킬•워크플로우
한글 자료와 실무 사례가 빠르게 누적. 전
공식 문서•마켓 제공.
모음. 레포•디스코드 활발
사 도입에 필수 조건.
클로드코드 잘 사용하기
22

## Slide 23

왜 생태계가 중요한가
도구의 기능 > 시간이 지나면 추격 가능.
커뮤니티가 만든 플러그인•스킬•노하우•교육 자료 - 복제 불가.
문제가 생겼을 때 검색하면 답이 나오는 환경
= 실무 도입의 핵심 조건

## Slide 24

03
AI 시대의
개발 방법론

## Slide 25

SECTION 3
왜 방법론이 필요한가
에이전틱 코딩 등장 > 병목의 이동.
지금의 병복
이전의 병목
AI에게 무엇을 시킬지 정하는 것
코드를 작성하는 것
+ 정말 원하는 대로 했는지 확인하는 것
클로드코드 잘 사용하기
25

## Slide 26

SECTION 3
타임라인
Karpathy, "Vibe Coding" 제시
2025.02
AI 코딩의 대중화, 문화적 전환점
Al 생성 코드의 품질/보안 문제 부각
2025 중반
구조화된 방법론의 필요성 대두
2025 하반기
SDD, 스펙 주도 프레임워크 등장
Vibe Coding의 한계에 대한 업계 대응
2026 초
TDD, Context Engineering 부상
성숙한 AI 개발 워크플로우의 정립
클로드코드 잘 사용하기
26

## Slide 27

SECTION 3
구조화 수준 스펙트럼
자유
엄격
TDD
SDD
테스트 주도
스펙 주도
검증
계획
클로드코드 잘 사용하기
27

## Slide 28

SECTION 3
TDD (Test-Driven Development)
테스트를 먼저 쓰고, 통과하는 코드를 나중에 쓴다. AI 시대에는 인간이 테스트, AI가 구현.
1. 인간이 실패 테스트 작성 (Red)
왜 AI에게 특히 중요한가
AI는 "동작하는 것 같은" 코드를 자신 있게 만듦.
테스트 없으면 맞는지 틀린지 확인 불가.
2. AI가 통과 코드 구현 (Green)
3. 인간이 리뷰 〉 AI가 리팩토링
AI의 치팅에 주의
테스트 삭제 구현 먼저 작성•assert 약화
> 테스트 수정 금지 규칙 필수
버그 40~80% 감소- 2025 DORA
클로드코드 잘 사용하기
28

## Slide 29

SECTION 3
TDD 예시
테스트를 먼저 쓰고, 통과하는 코드를 나중에 - AI 시대에도 원칙은 동일
"사용자가 운동 페이지에서
AI 치팅 3대 패턴
과거 운동 클릭 시 상세 보기를
• 테스트 삭제/skip으로 통과
볼 수 있어야 한다"
• assert 약화 (값> 타입 검증)
• 구현 먼저, 거기 맞춘 테스트
RED - 인간이 실패하는 테스트 작성
CLAUDE.md 필수 규칙
GREEN - AI가 최소 코드로 통과
테스트 수정 금지
RED 실패 확인 전 GREEN 진행 금지
구조 변경과 기능 변경 커밋 분리
REFACTOR - 인간 리뷰 후 AI가 정리
클로드코드 잘 사용하기
29

## Slide 30

SECTION 3
SDD (Spec-Driven Development)
코드가 아닌 스펙이 진실의 원천. 무엇을(WHAT) 먼저 정의하고, 어떻게(HOW)는 AI에게.
1. SPECIFY - 인간이 무엇을" 정의
언제 쓰나
요구사항 • 수용 기준 • 제약조건
• 신규 기능 • 대규모 설계
• 여러 세션에 걸친 작업
2. PLAN -AI가 "어떻게" 제안
• 팀 협업 (스펙= 커뮤니케이션)
기술 스택 • 아키텍처 〉 인간 승인
핵심
3. TASKS - 분해 후 병렬 실행
작업<>요구사항 매핑 유지
각 단계가 파일로 저장•커밋• 참조
+ 컨텍스트 소실 방어의 정석
모호한 부분 [NBEDS CIARIFICATION] 마커로 구현 중단
클로드코드 잘 사용하기
30

## Slide 31

SECTION 3
SDD 실전 - spec-kit 워크플로우
3개 커맨드로 스펙> 계획 태스크 분해. 15분 안에 전체 구조 문서화.
1. SPECIFY
강제되는 원칙
/speckit. specify
• WHAT/WHY와 HOW 명확히 분리
"실시간 채팅 + 메시지 히스토리
+ 온라인 상태"
• 모호한 부분 [NBEDS CLARIFICATION]
• 테스트 가능한 수용 기준 포함 필수
- spec.md 생성 (WHAT/WHY 분리)
• Constitution Check- 조직 원칙 위반 게이트
2. PLAN
/speckit.plan
핵심
"Websocket, PostgresQl, Redis"
모든 산출물이 파일로 저장 • 커밋 • 참조
plan • data-model • contracts 생성
+ 컨텍스트 소실 방어의 정석
3. TASKS
출처: GitHub spec-kit
/speckit.tasks
* 병렬 가능 작업 [P] 마킹
클로드코드 잘 사용하기
31

## Slide 32

SECTION 3
방법론 비교
TDD
SDD
인간의 역할
테스트 작성자
스펙 작성자
검증 방식
자동 테스트
스펙 검증
프로덕션 적합도
높음
높음
최적 장면
기존 코드 수정· 버그 수정
신규 기능•대규모 설계
가장 강력한 조합 - SDD로 정의 + TDD로 검증
클로드코드 잘 사용하기
32

## Slide 33

결론
Spec + TDD
Spec
TDD
"무엇을" 정의
+
"정말 그렇게 됐는지" 검증
의도 명확화
결과를 자동으로 확인
스펙 없는 TDD - 나무는 보되 숲은 놓침
TDD 없는 스펙 - 검증 수단 부재

## Slide 34

이걸 매번 수동으로?
스펙 템플릿
Skills
Hooks
계획 문서로 정착
TDD 워크플로우 패키징
테스트 자동 실행
이 시스템이 곧 하네스 엔지니어링

## Slide 35

04
하네스 &
컨텍스트 엔지니어링

## Slide 36

SECTION 4
엔지니어링의 진화
2023-
2025-
2026-
프롬프트
컨텍스트
하네스
엔지니어링
엔지니어링
엔지니어링
모델에
모델에
모델 주변에
무엇을 말할 것인가
무엇을 보여줄 것인가
무엇을 구축할 것인가
단일 프롬프트 • 정적
입력 파이프라인 전체 • 동적
실행 환경 전체 • 시스템 아키텍처
클로드코드 잘 사용하기
36

## Slide 37

SECTION 4
여전히 살아있는 프롬프트 엔지니어링
용어가 "컨텍스트 엔지니어링"으로 옮겨간 것뿐, 사라진 것이 아님. 기초에는 여전히 프롬프트.
"프롬프트 엔지니어링은 죽지 않았습니다. 흡수되었을 뿐입니다. 좋은 컨텍스트 엔지니어는 여전히 좋은 프롬프트 엔지니어입
니다."
- Phil Schmid, Hugging Face
프롬프트
컨텍스트
하네스
C
C
한 번 말하는 법
모이는 구조
실행 환경 전체
안쪽이 부실하면 바깥도 부실 - 모호한 CLAUDE.md 한 줄은 스킬•훅으로도 메울 수 없음
클로드코드 잘 사용하기
37

## Slide 38

SECTION 4
왜 프롬프트만으로는 부족한가
좋은 프롬프트로도 잔존하는 문제. 에이전트가 여러 단계를 거치는 순간 - 숫자가 불리해짐.
숫자로 보면
재현성 문제
각 단계 성공률 95%
같은 프롬프트에도 다른 결과
20단계 체인이라면?
AI는 비결정적 시스템.
복리로 쌓이는 실패
36%
한 단계 5% 실패율이
0.9520 = 0.358
20단계에선 치명적.
"95% 동작" 에이전트
실제 작업의 2/3에서 실패.
클로드코드 잘 사용하기
38

## Slide 39

SECTION 4
Agent = Model + Harness
AGENT
MODEL
HARNESS
에이전트
텍스트 생성
+
나머지 전부
"모델이 아닌 것은 전부 하네스입니다." - LangChain, Vivek Trivedy
비유 • 마구(배트, horse tack)
고삐 • 안장• 재갈처럼, 강력하지만 예측 불가능한 말(= LLM)을 올바른 방향으로 이끄는 장비 전체가 하네스.
하네스가 결정하는 것- 무엇을 보는지(컨텍스트)• 무엇을 할 수 있는지(도구•권한) • 언제 멈추는지(제약)• 잘못됐을 때(복구)
클로드코드 잘 사용하기
39

## Slide 40

SECTION 4
하네스의 6대 구성 요소
컨텍스트 엔지니어링
2
도구 오케스트레이션
3
상태 및 메모리
각 단계에서 모델이 보는 정보를 설계. 무엇을
어떤 도구가 가용한지, 실행이 어떻게 처리되
수 분~수 시간 실행되는 에이전트의 내구성 있
유지•요약•버릴지 관리
는지 결정
는 상태 관리
검증 루프
5
오류 복구
6
인간 개입 제어
출력 생성 후 행동 실행 전 발동. 스키마•의미적
실패 감지 * 재시도, 다른 접근법, 인간에게
핵심 의사결정에서 일시정지. DB 삭제? 결제?
• 정책 유효성
폴백
> 승인 요구
- Kai Renner, harness-engineering.ai
클로드코드 잘 사용하기
40

## Slide 41

SECTION 4
에이전트 루프 - 하네스의 심장
거의 모든 코딩 에이전트가 반복하는 4단계. 각 단계가 하네스의 설계 지점.
1. GATHER CONTEXT
2. TAKE ACTION
파일 읽기, 검색, 질문
코드 작성, 명령 실행, 툴 호출
무엇을 안 보여줄지를 설계하는 자리. 노이즈 유입 〉 4가지 실패 모드 발동.
가능한 한 되돌릴 수 있는 액션으로. 실패 비용 낮음 〉 과감함 허용.
3. VERIFY WORK
4. REPEAT
테스트, 린트, 타입체크, 리뷰
결과를 다음 루프 컨텍스트로
자동 피드백 부재 + 루프가 환각 강화. 이 단계 막히면 전부 붕괴.
이전 결과가 다음 루프에 주입되는 지점. Compaction Pruning이 필수.
하네스 엔지니어링 =이 4단계의 각 지점을 신뢰성 있게 만드는 작업.
클로드코드 잘 사용하기
41

## Slide 42

SECTION 4
Right Altitude - 지시문의 고도
CLAUDE.md나 프롬프트를 쓸 때 가장 흔한 실수는 두 극단.
너무 낮음 • OVER-SPECIFIED
너무 높음•UNDER-SPECIFIED
모든 케이스를 if/else로 박기
"잘 해줘", "깔끔하게"
* 예외 상황에서 brittle
+ 모델이 추측, 세션마다 결과 다름
올바른 고도 공식
원칙 1줄 + 이유(why) 1줄 + 예시 1~2개
이게 붙어야 새 상황에도 일반화 가능.
자가진단 2문항:
@ 의도하지 않은 상황에서도 유효 > OK
② 아무 세션에 붙여도 행동 불변 〉 너무 높음
클로드코드 잘 사용하기
42

## Slide 43

SECTION 4
하네스를 구성하는 4가지 도구
Claude Code가 제공하는 확장 축. 이 4가지를 조합해 하네스 구축.
CLAUDE.md
Skills
Hooks
Plugins
프로젝트 규칙
재사용 워크플로우
이벤트 기반 자동화
팀 단위 배포 패키지
세션마다 자동 로드
/ 명령 으로 호출
LLM 우회 - 강제 실행
npm install로 공유
강제력 순서: CLAUDE.md(권고)> Skills(호출 시) Hooks(자동 차단)> Plugins(팀 배포)
클로드코드 잘 사용하기
43

## Slide 44

SECTION 4
CLAUDE.md - 프로젝트의 "헌법"
모든 세션이 시작될 때 자동으로 로드되는 지속 컨텍스트. 하네스의 가장 기본적인 레이어.
먼저 짚고 갈 것-"지시가 아니라 컨텍스트"
시스템 프롬프트가 아님 - 사용자 메시지로 주입.
강제가 아닌 권고. 모호하면 Claude가 임의 해석.
~ 검증 가능 • 구체적
※ 모호 • 검증 불가
- 슬라이드 규격: 720pt x 405pt
깔끔한 코드 작성
- 종결어미: 명사형•구 단위만
적절한 에러 핸들링
- 금지: ~합니다 / ~입니다 공손체
좋은 패턴 사용
- 디자인 토큰: bg=#faf8f5
클로드코드 잘 사용하기
44

## Slide 45

SECTION 4
CLAUDE.md 운영 원칙
공식 문서가 느낌표까지 붙여서 경고한 유일한 원칙 - 짧을수록 효과적.
한 줄 삭제 테스트
"한 줄씩 지워보세요. 지워도 Claude가 똑같이 동작하면 - 그 줄은 잡음."
- Claude Code Best Practices
크기 가이드라인
비대해지면 - 모듈화
~60줄 • HumanLayer (엄격파)
epath/to/file -다른 파일을 import (최대 5홉)
A4 약 1.5장· Boris Cherny 팀
•claude/ rules/- 경로별 규칙, 읽을 때만 트리거
200줄 이하• 공식 문서
500줄 이하 • Marconato
/compact 후에도 CLAUDE.md는 재로드
숫자보다 신호 대 잡음비. 같은 신호 〉 짧을수록 우세.
클로드코드 잘 사용하기
45

## Slide 46

SECTION 4
CLAUDE.md는 살아있는 문서 - 현장 사례
한 번 쓰고 끝나는 정적 문서가 아닌, 피드백으로 자라는 유기체처럼 운영.
Boris Cherny
정구봉 (Team Attention)
Claude Code 창시자• Anthropic
규모의 실천
주 수 회 업데이트.
CLAUDE.md 159개 + 스킬 100개+ 동시 운영.
Claude가 실수할 때마다 한 줄 추가.
"파일 하나는 짧게, 대신 파일을 많이."
PR에서 eclaude 태그 > GitHub Action이 자동 커밋.
"버그는 한 번 고치는 게 아니라, CLAUDE.md에 한 줄을 추가하면서 고치는 것이다."
클로드코드 잘 사용하기
46

## Slide 47

SECTION 4
Skills & Hooks - 그게 뭔가
하네스를 구성하는 두 실행 단위. Skill = 부르면 실행되는 워크플로우· Hook = 이벤트에 자동 실행되는 스크립트.
SKILL
HOOK
재사용 워크플로우 패키지
이벤트 기반 자동 스크립트
언제 - 반복되는 작업을 한 번에 호출하고 싶을 때
언제 - 항상 적용해야 하는 규칙•검증•차단
형식 - frontmatter(name• description) + markdown 본문
형식 - 이벤트 타입(PreToolUse...) + 실행 커맨드
호출 -
/skillname 또는 자연어 트리거
실행 - LLM이 아닌 쉘 스크립트 - 반드시 실행
선택 - description 기반 자동 매칭, 토큰 소비 없음 (호출 시 로드)
예: 파일 편집 후 ESLint • 커밋 전 테스트 .env 편집 차단
예: /commit • /review-pr
구분법 - Skill= 내가 부를 때 실행 • Hook = 자동 실행.
클로드코드 잘 사용하기
47

## Slide 48

SECTION 4
Skill은 어떻게 동작하는가
실제 파일 구조
호출 〉 실행 흐름
. claude/skills/commit. md
1 사용자: /commit 또는 "커밋해줘"
name: commit
description: Git 커밋 시 팀 컨벤션
2 Claude가 등록된 skill의 description 스캔
메시지 자동 생성
# 규칙
3 매칭된 Skill 본문을 컨텍스트에 로드
1. 브랜치명에서 PIMS 번호 추출
> 이 시점에서만 토큰 소비 (평소엔 O)
2. 변경사항 분석 - Type 결정
3. #(PIMS} {Type} : {설명}
4 본문의 지시대로 작업 수행
frontmatter의 description이 핵심 - Claude가 이걸 읽고 매칭 결정
Skil = 필요할 때만 꺼내 쓰는 CLAUDE.md
100개 등록해도 호출 전엔 토큰 0
클로드코드 잘 사용하기
48

## Slide 49

SECTION 4
Plugins - 하네스를 포장해서 팀 자산으로
4개 레이어 위에 얹히는 배포 레이어
새 기능이 아니라 포장지
우리 팀 플러그인 설치 (실제)
••• claude -/plugin
이미 존재하는 Skill• Subagent • Hook• MCP • LSP를 단일 단위로 번들링해 팀•
커뮤니티에 배포하는 메커니즘
> /plugin marketplace
add nkia-ai-team/claude-code-
skillS
/ Added marketplace: nkia-ai-marketplace
• 14 skills available
my-plugin/
>/plugin install nkia-ai-toolsenkia-ai-marketplace
.claude-plugin/plugin. json
/ Installing nkia-ai-tools ... done
commands/
agents/
- Added skills: /commit /code-review /kickoff••.
skills/
hooks/
•mcp•json
> /plugin list
nkia-ai-tools o installed
standalone > plugin 전환은 파일 이동 + 매니페스트 1개 수준
개인이 쌓아올린 하네스를 조직 자산으로 전환하는 마지막 한 조각
클로드코드 잘 사용하기
49

## Slide 50

SECTION 4
우리 팀의 스킬 레포
AI 1팀에서 운영 중인 14개 스킬. 반복되는 워크플로우를 / 명령 한 줄로.
코드 품질
프로젝트 관리
Icode-review - PR/MR 자동 리뷰
/linear-issue-creator - 자연어 》 이슈 자동 생성
(OWASP• SOLID • 성능• 테스트)
(DOD• AC• 마감일 • 라벨)
Icommit- PIMS 이슈 번호 포함 • 컨벤션 커밋 자동 생성
/linear-issue-validator - DoD/AC 자동 검증
온보딩 • 전환
워크플로우
/kickoff - 프로젝트 초기 세팅
/submit - 작업 제출 + PR 생성
Ifigma-to-react - Figma React 변환
/wrap-up - 일일 작업 정리• 보고
한 번 만든 스킬 팀 전원이 /commit 한 마디로 호출. 반복 작업의 종결.
클로드코드 잘 사용하기
50

## Slide 51

SECTION 4
도구를 알았으니
조합하는 패턴
Plan-Critic-Build
Ralph Loop
암묵지 추출

## Slide 52

SECTION 4
PlanCritic-Build - 계획과 실행의 분리
에이전트가 가장 많이 실패하는 지점: 계획 없이 바로 코드 작성. 해결책은 단순 - 계획 단계를 쓰기 권한 없는 모드로 분리.
1. PLAN
2. CRITIC
3. BUILD
읽기만 • 쓰기 금지
다른 눈으로 본다
승인 후 실행
파일 읽기•검색•질문만. 결과: 편집 가능한 계획
리뷰 전용 에이전트. 작성자의 blind spot을 드
승인된 계획 링크만 컨텍스트로. 쓰기 권한 개방.
문서.
러내기.
핵심: Planner와 Critic을 같은 컨텍스트에 두지 않기. 자기 계획 자기 비평 시 blind spot 잔존.
Claude Code의 Plan Mode( Shift+Tab Shift+rab )- 1단계를 구조적으로 강제.
"계획과 실행을 분리하는 것이 제가 A/ 코딩에서 하는 가장 중요한 행위이다."- Armin Ronacher
클로드코드 잘 사용하기
52

## Slide 53

SECTION 4
Ralph Loop - 가장 단순한 하네스
PRoMpT.md 하나를 무한 루프로 반복 실행. The Simpsons의 Ralph Wiggum에서 이름을 딴 -"바보처럼 단순한" 루프.
입력
실행
결과
무한 루프
PROMPT . md
Claude Code
파일 수정 · 검증
whille :; do....
실수 발견 >>
PROMPT.md에 규칙 한 줄 추가 〉 다음 루프에서 자동 반영
단순성 = 예측 가능성
새 프로젝트 전용
검증 없으면 환각 누적
클로드코드 잘 사용하기
53

## Slide 54

SECTION 4
암묵지를 파일로 뽑아내라
"뭘 보여줘야 하지?"- 답은 이미 머릿속에.
뷰할 때 말하던 것, 버그 겪고 반사적으로 체크하던 것 > 파일로 추출.
• 결정의 "이유를 쓴다- 결과만 금방 낡음. 이유까지 일반화 가능
® Post-Mortem 규칙- 계획과 구현의 분기점을 한 줄로 승화
• Self-Improving -피드백마다 규칙 한 줄씩 성장
• 취향 > 전용 에이전트 - 글로 쓰기 어려운 판단을 에이전트로 encode
머릿속 판단이 파일로 옮겨지는 순간 하네스가 된다 - 한 줄씩 박제.
경험 > 규칙 〉 재사용. 모호함도 점수화(0~10) 〉 구조화 가능.
클로드코드 잘 사용하기
54

## Slide 55

SECTION 4
Harness Builder - 새로운 역할
Builder
Reviewer
Harness Builder
기능을 구현하고
코드의 품질, 정확성,
에이전트가 일하는
코드를 작성
보안을 검토
환경 자체를 설계
OpenAl Codex 팀 - 5개월간 수동 코드 0줄로 100만 줄 프로덕트
"우리 팀의 주된 업무는 에이전트가 유용한 일을 할 수 있도록 환경을 만드는 것이 되었다."- OpenAl Codex 팀
1리포지토리 지식 체계 설계
2 결정론적 제약 구현 (린터, 테스트)
3 에이전트 가독성 최적화
4 취향과 원칙의 인코딩
클로드코드 잘 사용하기
55

## Slide 56

05
이렇게 하면 망한다
한계와 실패 패턴

## Slide 57

SECTION 5
신뢰성의 수학 - 복리로 쌓이는 실패
각 단계 성공률 95% 가정 〉 다단계 작업의 전체 성공률?
계획 > 탐색> 작성 테스트 수정 커밋 - 20단계만 가도
단계 수
전체 성공률
2/3이 실패
1 단계
95%
5 단계
77%
에이전트를 만드는 건 쉬운 부분 - 프로덕션 신뢰성이 진짜 엔지니어
10 단계
60%
링
20 단계
36응
50 단계
8응
검증 루프 • 재시도 • 체크포인트 - 복합 실패율을 낮추는 건 하네
스뿐
클로드코드 잘 사용하기
57

## Slide 58

SECTION 5
컨텍스트의 4가지 실패 모드
"많이 넣어도 OK"- 사실 아님. Drew Breunig가 정리한 4가지 실패 모드.
POISONING • 중독
DISTRACTION• 산만
환각 1회 >> 이후 오류 누적
히스토리 과의존, 실패한 액션 재시도
초반 오답 1개로 평균 39% 성능 저하
CONFUSION • 혼동
CLASH • 충돌
무관한 정보 과잉 〉 툴 30개+에서 급증
모순된 정보 > 추론 붕괴
"컨텍스트를 잡동사니 서랍처럼 다루면, 그 잡동사니가 답변에 영향을 줍니다."- Drew Breunig
핵심은 뭘 넣을까"보다 뭘 뺄까".
클로드코드 잘 사용하기
58

## Slide 59

SECTION 5
Context Rot - 길수록 조용히 썩는다
Chroma Research가 Claude• GPT• Gemini Qwen 등 18개 최신 모델을 대상으로 측정한 결과.
50k토큰
방해문장 1개
20만 토큰 모델이 이미 열화되는 지점
하나만 섞여도 성능 저하
한국어 약 4만 자. 윈도우가 꽉 차기 훨씬 전부터 성능 하락.
4개면 급감. "많이 넣으면 좋다" 직관 붕괴.
"관련 정보가 컨텍스트에 있느냐가 전부는 아닙니다. 더 중요한 것은 그 정보가 어떻게 제시되느냐입니다."
- Chroma Research
컨텍스트 = 길이가 아닌 신호 대 잡음비. 쓸 수 있는 만큼 다 채울 필요 없음.
클로드코드 잘 사용하기
59

## Slide 60

SECTION 5
실패 패턴 5가지
도구를 잘 쓰는 것만큼 중요한 건, 잘못 쓰는 패턴을 아는 것.
01 컨텍스트 과부하
02 :
불명확한 요구사항
"많이 주면 잘하겠지"- 섹션 4의 Rot • Distraction• Confusion
이거 좀 고쳐줘" LLM은 학습 데이터 기반 추측 구현. 맞아도 재현성 없음
03 검증 없는 자동수락
04긴 세션 드리프트
"AI가 만들었으니 맞겠지"- 가장 위험한 생각. 자기 작업 평가 시 병리적 낙관
시점 편향 • 오류 중첩• Mode Collapse - 초반 규칙을 잊고 방향 상실
주의자
05 권한 과다
"바이패스가 편하니까"- 프롬프트 인젝션 • 토큰 유출 • 프로덕션 사고의 단일 경로
클로드코드 잘 사용하기
60

## Slide 61

SECTION 5
그래도 여전히 중요한 기초
"A/가 다 해주니까 코드 안 배워도 되겠다"
- 가장 위험한 생각
AI의 자신감 있게 틀린 코드 제시 - 기초 없으
추상화 수준만 올라갔을 뿐, 문제 해결 • 시스템
진입장벽은 낮아졌으나, 고품질 역량은 오히려
면 틀림 감지 불가
사고• 디버깅은 여전히 필수
더 구조화
클로드코드 잘 사용하기
61

## Slide 62

06
멀티 에이전트 활용

## Slide 63

SECTION 6
단일 에이전트의 세 가지 벽
하나의 에이전트가 오래 일할수록 필연적으로 맞닥뜨리는 벽 - 쪼개야 할 이유.
01 컨텍스트의 벽
02 역할의 벽
03
신뢰성의 벽
파일 • 테스트• 로그 왕복 〉 쓰레기로 가득한
"쓰고, 구현하고, 리뷰하고, 리팩터하라"를 한
단계별 95% x 20단계 연쇄 = 전체 성공률
컨텍스트
에이전트에게 * 전부 어설프게.
36%.
50K 토큰부터 Context Rot Distraction
Confusion 발동
자기 코드 자기 리뷰 = blind spot 그대로
긴 체인 = 수학적 실패
하나의 에이전트 = 하나의 일.
클로드코드 잘 사용하기
63

## Slide 64

SECTION 6
핵심 패턴 5가지
무엇을, 어떻게 쪼개느냐에 대한 서로 다른 답.
01
02
03
04
05
Sub-Agent
Orchestrator
Parallel
GAN-Style
Agent Teams
Plan
task
M
S
shared repo
Gen
Eval
summary
Exec
EXec
Exec
단방향 심부름
1:N 위임
평면 조직
적대적 루프
양방향 대화
탐색 • 검증· 로그 파싱
계획자 + 실행자들
Git worktree 격리
루브릭으로 수렴
그래프 구조
클로드코드 잘 사용하기
64

## Slide 65

SECTION 6
Subagent vs Agent Team
둘 다 작업 위임 방식 - 규모와 독립성에 따라 선택.
Subagent
Agent Team
구조
구조
메인이 생성한 격리된 워커
여러 독립 세션이 협업
컨텍스트
컨텍스트
자체 윈도우, 요약만 반환
완전히 독립, 각자 별도 윈도우
통신
통신
주 에이전트에게만 보고
팀원끼리 직접 메시지
많은 파일 읽기, 병렬 조사
보안/성능/테스트 동시 검토
클로드코드 잘 사용하기
65

## Slide 66

SECTION 6
Sub-Agent - 가장 자주 쓰는 패턴
일상 작업의 80% - Sub-Agent로 해결.
컨텍스트 격리
파일 50개 뒤져도 메인 오염 없음
격리된 컨텍스트
task
Sub
Main
도구 제한
컨텍스트 = 금
읽기 전용만 허용 〉 사고 원천 차단
summary (1-2k)
50k+ 토큰 읽어도 OK
메인은 오염 안됨
정보 격리 = 치팅 차단
Tester는 구현 못 봄 • mpl은 스펙 못 봄
메인 컨텍스트 = 금 서브에이전트의 산출= 요약
클로드코드 잘 사용하기
66

## Slide 67

SECTION 6
Agent Teams- 양방향 대화가 가능한 팀
Sub-Agent가 "시켜놓고 받는" 구조라면, Teams는 같이 토론하고 합의하는 구조.
동적 팀 구성 예 - 경쟁사 분석
Researcher
Researcher
Researcher
시장
제품
가격
자동 수정 루프
Worker 구현 QA 검증 + Support 수정 QA 재검증
병렬 탐색
Consultant
분석 프레임
공유 컨텍스트 뱅크
양방향
프로젝트 스펙·제약은 중앙에 두고 참조
Editor
최종 리포트
3명까지는 이득• 10명 넘으면 대기 시간 > 작업 시간 -"팀이면 다 좋다'는 환상 경계,
클로드코드 잘 사용하기
67

## Slide 68

SECTION 6
설계 4대 원칙
패턴이 무엇이든 공통으로 지켜야 하는 것 - 쪼갬의 네 축.
컨텍스트 격리
역할 경계 명시
01
02
각 에이전트 = 자기 일에 필요한 것만 • 메인 = 결정과 요약만.
"무엇을 하고 무엇을 안 하는지" 명시• 모호함 〉 중복과 공백.
사전 모호성 제거
검증 주체 분리
03
실행 후 발견+ 이미 늦음. Ralphton 우승팀 - 개발 전 133회
04
생성자 * 검증자. Selfi-review blind spot 잔존.
Q&A.
멀티 에이전트 ="더 많은 AI"가 아니라 "더 좁은 역할의 AI 여럿"
컨텍스트를 쪼갠다• 역할을 쪼갠다 • 검증을 쪼갠다 • 시간을 쪼갠다
클로드코드 잘 사용하기
68

## Slide 69

07
실전 워크플로우 &
도구 세팅

## Slide 70

SECTION 7
두 가지 막다른 길
하네스• 에이전트 • 컨텍스트 방어 • 암묵지 문서화 - 배울 것이 많음.
직접 다 세팅
원리 없이 스킬만
•한 번 세팅해도 업데이트 안 됨
• 이상 동작 시 원인 판단 불가
• 팀에 공유되지 않음
• 같은 실수를 반복
• 시간이 지나면 맥락 휘발
• 디버깅할 수 없음
•> 번아웃
•~ 블랙박스 의존
원리는 이해 구현은 위임 - 잘 만들어진 플러그인 활용.
클로드코드 잘 사용하기
70

## Slide 71

SECTION 7
OMC - 원리를 명령어로
Oh My claude Code- Yeachan Heo(한국) 제작, GitHub Trending 1위. 핵심 - 원리를 사람이 외우지 않고 시스템이 강제
원리
OMC 구현
역할 분리
29+ 에이전트 - architect•critictester ...
모델 라우팅
/model 수동 전환 • 자동 선택 • 토큰 30~50%
Plan-Critic-Build
/ralplan - 계획 비평 〉 합의 후 실행
병렬 실행
/ultrapilot - 최대 5 워커 동시
검증 루프
/ultraga -test fix》 재실행 자동 순환
Worktree 병렬
/project-session-manager + HUD + Slack
핵심 - 사용자는 어떤 작업인지"만 입력. 모드 • 에이전트 • 모델은 OMC 자동 선택.
클로드코드 잘 사용하기
71

## Slide 72

SECTION 7
한 걸음 더 - 단일 모델 탈피
섹션 6이 여러 Claude였다면, 이건 여러 종류의 Al. 모델마다 상이한 훈련 분포•blind spot.
lask [provider]
Iccg - Claude• Codex • Gemini
Claude 답이 불확실할 때 다른 모델에 의견 요청
세 모델 동시 송출 > 합의·불일치•불확실 분리 표시
# 구조 리뷰를 Codex에게
특히 빛나는 순간
/ask codex "이 계획에서 짠 구조
• 아키텍처 결정 (되돌리기 어려움)
리뷰해줘. 빠진 부분 있는지"
• 디버깅이 막혔을 때
# 디자인 자문을 Gemini에게
• 머지 전 코드 리뷰 최종 확인
/ask gemini "이 카드 레이아웃
• 계획 피드백 (다른 시각의 보완)
가독성 어떤지 피드백 줘"
클로드코드 잘 사용하기
72

## Slide 73

SECTION 7
실전 세팅 - 다중 세션 병렬
cmux(AI 전용 터미널) + Git Worktree - 에이전트 3~4개를 동시에 돌리는 물리적 환경
창 1• 메인 작업
창 2• 조사•탐색
현재 이슈 구현·수정
코드베이스 탐색, 문서 검색
Opus 모델 • 핵심 컨텍스트 보호
Explore 서브에이전트 역할
장 3• 감시
창 4• 이슈•PR
테스트•빌드 로그 실시간 확인
Linear 이슈 확인, PR 생성
에이전트 완료 알림 수신
git 상태·브랜치 관리
Git Worktree - 창마다 독립 작업 디렉토리
claude --worktree feature-auth 한줄로 워크트리 + 브랜치 + 세션 동시 생성. 파일 충돌 0, 컨텍스트 오염 0.
핵심 - 메인 컨텍스트를 오염시키지 않는 것. 탐색은 서브 창에서, 결과만 메인에 전달.
클로드코드 잘 사용하기
73

## Slide 74

SECTION 7
이슈 기반 워크플로우 - Linear(PIMS)에서 PR까지
이슈 1개 = 에이전트 세션 1개. 이슈 트래커가 곧 에이전트의 작업 지시서.
Linear(PIMS) 이슈
Worktree 생성
Claude 세션
PR 생성
검증·완료
AI 1팀 스킬 체인
왜 이슈 기반인가
issue-creator 구조화된 이슈 생성
• 채팅 = 휘발. 이슈 = 지속적 컨텍스트
issue-evidence AC별 증거 첨부
• AC가 명확하면 에이전트가 완료 판단 가능
issue-validator DOD•AC 자동 검증
• 이슈 단위 = 컨텍스트 드리프트 차단
Linear- 개발팀 이슈 트래커. MCP 연결로 터미널에서 이슈 코드 〉 PR 〉 검증 전 과정 완결.
클로드코드 잘 사용하기
74

## Slide 75

08
모두의 이야기

## Slide 76

기억하시나요
이 발표를
코드 한 줄 없이 만든 방법
한 것은 하나 - 하네스 설계
지금부터 그 증거

## Slide 77

SECTION 8
이 발표가 만들어진 과정
김영동 + Claude - 마크다운과 규칙 문서만으로 89장 제작
파이프라인 - 3층 + CLAUDE.md 하네스
앞 섹션의 원리 그대로
Spec-first• 하네스• Skill 재사용
research • official blog
수집증
linkedin • youtube
특별한 기술 없음
원자료
마크다운 + HTML + 규칙 문서
sections/XX/README.md
계획층
CLAUDE
•md
서술
규칙
decks/.../slide-xx.html
실행층
slides-grab Skill
앞에서 다룬 원리 - 그대로 적용된 결과물
claude-seminar.pdf
클로드코드 잘 사용하기
77

## Slide 78

SECTION 8
재료 1- 폴더 구조로 박힌 분리
수집층• 계획층 • 실행층이 폴더 경계로 분리. 규칙이 아닌 파일 구조로 강제.
수집층 = 근거의 정박지
claude-seminar/
"이 주장 어디서?" 질문에 > 파일이 답
research/ # 하네스• 컨텍스트 리서치
official/ # Claude Code 공식 문서
b10g/# Anthropic + 한국 커뮤니티
계획층 ＊ 실행층
linkedin/# 실무자 인사이트
sections/에 본분 먼저, decks/는 디자인만 - 섹션 4의 Plan-Critic-Bulld
youtube/# 영상 요약
강제
sections/# 9개 섹션 마크다운 (계획)
근거 없이 작성 * 환각이 장표로 박제
decks/claude-seminar/# 슬라이드 (실행)
- slide-01.html ~ slide-91.html
CLAUDE . md
# 프로젝트 규칙
클로드코드 잘 사용하기
78

## Slide 79

SECTION 8
재료 2- CLAUDE.md가 만든 일관성
디자인 감각•카피 원칙이 문서에 축적 • 새 슬라이드가 자동 추종
초기 CLAUDE.md (v1)
진화 과정
- 슬라이드 규격: 720pt x 405pt
초반: ~합니다 공손체 스캔 불가
- 폰트: Pretendard (CDN)
중반:~다 서술형 > 여전히 읽어야
- 디자인 토큰 6개
결론: 명사형 통일 〉 CLAUDE.md에 고정
현재 CLAUDE.md (피드백 5회 반영)
89장에 걸쳐 카피 톤이 일관된 이유 -
+ 종결어미: 명사형•구 단위만
사람의 89번 검토가 아닌, 한 번 쓴 규칙의 결과
+ 금지 : 공손체•서술형• 명령형
+ 카드 레이아웃 규칙 추가
+ 강조 체계 3단계 정의
+ 피드백 관리 워크플로우
클로드코드 잘 사용하기
79

## Slide 80

SECTION 8
재료 3- slides-grab, Skill 경계로 박힌 분리
slides-grab- 오픈소스 Claude Code용 프레젠테이션 Skill. 아웃라인 HTML 슬라이드 > PDF를 3단으로 분리.
STAGE 1• PLAN
STAGE 2• DESIGN
STAGE 3• EXPORT
slides-grab-plan
slides-grab-design
slides-grab-export
slide-outline.md 생성
승인된 아웃라인
HTML PDF 변환
slide-XX.html 생성•수정
사용자 승인까지 반복
산출물 검증
왜 3단인가 - 단계 사이에 사용자 승인을 물리적으로 강제. Plan에서 방향이 틀어지면 Design•Export 비용 전부 낭비.
Plan Design - Export 사이에 사람의 승인이 물리적으로 끼어듦 - 건너뛸 수 없는 관문.
클로드코드 잘 사용하기
80

## Slide 81

SECTION 8
이 발표가 증거
이 장표 89장 전부 - Claude Code로 제작. HTML 한 줄 직접 작성하지 않음.
사용한 원칙 - 이 발표에서 다룬 것 그대로
실제 워크플로우
Spec-first - sections/README.md에 내용 먼저
1
섹션별 내용을 자연어로 정리
CLAUDE.md - 디자인 토큰• 호흡 규칙 • 카피 원칙 고정
2
CLAUDE.md에 디자인 규칙 명세
검증 분리 - 피드백 pending.md> 검토 후 반영
자동화 - slides-grab으로 HTML PDF 일괄 변환
3
Claude Code가 slide-XX.html 생성
4
피드백 8회 반복 > 최종 PDF
규칙을 하네스로 고정 실행은 에이전트에게 결과를 검수. 이 발표의 제작 과정 자체가 증거.
클로드코드 잘 사용하기
81

## Slide 82

SECTION 8
AI를 잘 쓰는 법 - 결국 하나
코드• 문서 기획• 디자인 - 도메인은 달라도 원칙은 같음.
원하는 것을
규칙을
결과를
글로 먼저
문서로 고정
사람이 검증
이 발표
코딩
업무 전반
섹션 README CLAUDE.md+ 피드백 검수
Spec 하네스 규칙 - 테스트 검증
요구사항 정리 기준 문서 〉 결과 확인
새로 배울 것 없음 - 이미 알고 있는 원칙을 AI 시대에 더 의식적으로
클로드코드 잘 사용하기
82

## Slide 83

09
AI 시대,
우리는 어떻게 해야 하나

## Slide 84

SECTION 9
최전선의 피로 - 똑같이 느끼는 그들
"지식이 쌓이는 속도보다 감가상각되는 속도가 더 빠르다. 나도 지쳤다."
- Simon Wilison, 2025
FOMO-AI•2025 학계 척도
• 뒤처질까 두려움 (backwardness)
논문의 결론
•좋은 도구를 못 쓸까 두려움 (access)
FOMO를 가장 크게 줄이는 것 - 더 많은 정보가 아니라 직접 써보기
• 남만 이득 볼까 두려움 (dividend)
맨 앞의 사람들조차 같은 피로 - 다른 점은 더 빨리 대신 "무엇을 남길지 고르기"에 시간 투자
클로드코드 잘 사용하기
84

## Slide 85

SECTION 9
증폭되는 경험 - 세 개의 증언
50년 넘게 코드를 쓴 사람, 최전선에 있는 사람, 업계의 대부 - 세 사람이 거의 같은 말을 한다.
KENT BECK
SIMON WILLISON
MARTIN FOWLER
TDD 창시자 • 52년
Vibe Engineering
Thoughtworks
"프로그래밍은 여전히 프로그래밍이다. 어떤 면에서
"A/는 기존 전문성을 증폭시킨다. 더 많은 기술과 경
"A/는 주니어의 산출물은 복제할 수 있지만, 시니어
는 훨씬 더 나은 경험이다. 시간당 더 중요한 결정을
험을 가질수록 LLM으로부터 더 빠르고 더 좋은 결
의 경험과 판단은 복제할 수 없다."
내리게 된다."
과를 얻는다."
AI 시대의 경험 - 축소가 아니라 증폭
Spec-first• TDD• Plan-Critic• 검증 분리 - 시니어가 원래 하던 것. A는 그걸 할 줄 아는 사람에게 주는 레버리지
클로드코드 잘 사용하기
85

## Slide 86

SECTION 9
내일부터
글로 먼저
CLAUDE.md 1페이지 작성, 또는 반복 업무 1개를 글로 명세
직접 써보기
터미널 열고 Claude Code 3~4창 - 토큰을 일부러라도 소비
도구
Oh My claude Code 설치 - 원리의 자동화
안 쓰는 것보다 써보는 게 발전. "토큰을 많이 쓰는 사람이 가장 경쟁력 있는 개발자"- 박종천
클로드코드 잘 사용하기
86

## Slide 87

Claude Code
감사합니다
Al 1팀 김영동

## Slide 88

APPENDIX
부록
추천 채널 & 참고 자료

## Slide 89

APPENDIX
추천 채널 & 계정
Al 개발 트렌드를 따라가기 위한 정보 소스
YOUTUBE
빌더 조쉬
하네스 엔지니어링•AI 네이티브 조직 설계
COMMUNITY
GeekNews
Claude Code Community
OpenAl Developers
한국 개발자 뉴스 큐레이션
Discord • 실전 사용 사례 공유
Discord • AI 개발 생태계 전반
LINKEDIN
정구봉 (gb-jeong)
이재영 (jyoung105)
Team Attention• 에이전트 • 컨텍스트 엔지니어링
AI 엔지니어링 • 최신 트렌드 큐레이션
전체 참고 자료 (공식 블로그 24편 • YouTube 12편• 블로그 • LinkedIn)
github.com/Youngdong2/claude-seminar-references
클로드코드 잘 사용하기
89
