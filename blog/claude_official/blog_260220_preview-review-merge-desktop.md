# Bringing automated preview, review, and merge to Claude Code on desktop

- **출처**: Claude 공식 블로그
- **링크**: https://claude.com/blog/preview-review-and-merge-with-claude-code
- **날짜**: 2026-02-20
- **카테고리**: Claude Code
- **참고 링크**:
  - [Claude Code Desktop 문서](https://code.claude.com/docs/en/desktop) (추정)
  - [Claude Code 다운로드](https://claude.com/download) (추정)

---

## 핵심 요약

Claude Code 데스크톱 앱에 **코드 작성부터 PR 머지까지 전체 개발 루프를 닫는** 업데이트가 출시되었다. 앱 프리뷰, 자동 리뷰, 자동 수정, 자동 머지, 세션 연속성을 제공한다.

---

## 1. 앱 프리뷰: 코드 작성 후 바로 실행 확인

- Claude Code 데스크톱에서 **개발 서버를 시작하고 실행 중인 앱을 미리보기**
- Claude가 웹앱 UI를 확인, **콘솔 로그 읽기**, **에러 감지**, 자동 반복 수정
- 브라우저로 전환하여 수동으로 상태를 설명할 필요 없음
- 프리뷰에서 **시각적 요소를 선택**하여 Claude에게 직접 피드백 전달 가능

---

## 2. 코드 리뷰: 푸시 전 검토

- **"Review code" 버튼**으로 로컬 diff 리뷰 요청
- Claude가 데스크톱 diff 뷰에서 직접 **인라인 코멘트** 제공:
  - 버그 하이라이팅
  - 제안 사항
  - 잠재적 이슈 표시
- Claude에게 인라인 코멘트 대응 및 변경 요청 가능
- 머신을 떠나기 전에 **두 번째 시선(second set of eyes)** 확보

---

## 3. PR 모니터링: 앱을 떠나지 않고 관리

GitHub에서 호스팅되는 코드의 경우:

- PR 상태를 데스크톱 앱에서 직접 모니터링
- **CI 체크 통과/실패** 추적 (GitHub CLI 활용)
- **Auto-fix**: CI 실패 시 Claude가 자동으로 수정 시도
- **Auto-merge**: 모든 체크 통과 시 Claude가 자동 머지 시도

### 워크플로 예시
1. 태스크 A 작업 -> PR 열기
2. 태스크 B로 전환하여 새 작업 시작
3. **백그라운드에서** Claude Code가 태스크 A의 PR 모니터링
4. CI 실패 시 자동 수정
5. 태스크 B에서 돌아오면 태스크 A의 PR이 머지 준비 완료 (또는 자동 머지됨)

---

## 4. 세션 연속성: 어디서든 이어하기

| 전환 방향 | 방법 |
|-----------|------|
| **CLI -> 데스크톱** | CLI에서 `/desktop` 명령 실행 -> 전체 세션 컨텍스트를 데스크톱 앱으로 이동 |
| **데스크톱 -> 웹/모바일** | "Continue with Claude Code on the web" 버튼 -> 클라우드로 세션 이동 |
| **웹 -> 모바일** | Claude 모바일 앱에서 이어서 작업 |

---

## 5. 시작하기

- 모든 사용자에게 즉시 사용 가능
- Claude Code 데스크톱 앱 업데이트 또는 다운로드
