# Customize Claude Code with Plugins

- **출처**: Claude 공식 블로그
- **링크**: https://claude.com/blog/claude-code-plugins
- **날짜**: 2025-10-09 (수정: 2025-11-03)
- **카테고리**: Product announcements
- **참고 링크**:
  - 플러그인 레퍼런스 문서: https://docs.claude.com/en/docs/claude-code/plugins-reference
  - 플러그인 빌드 가이드: https://docs.claude.com/en/docs/claude-code/plugins
  - 마켓플레이스 퍼블리싱: https://docs.claude.com/en/docs/claude-code/plugin-marketplaces
  - Dan Avila 마켓플레이스: https://aitmpl.com/plugins
  - Seth Hobson 에이전트 컬렉션: https://github.com/wshobson/agents
  - Anthropic 예제 플러그인: https://github.com/anthropics/claude-code

---

## 개요

Claude Code가 **플러그인(Plugins)**을 공개 베타로 지원한다. 슬래시 커맨드, 에이전트, MCP 서버, 훅(hooks)의 커스텀 컬렉션을 **단일 커맨드로 설치**할 수 있다.

---

## 1. 플러그인이 포함하는 것

| 구성 요소 | 설명 |
|---|---|
| **Slash commands** | 자주 사용하는 작업을 위한 커스텀 단축 명령 |
| **Subagents** | 특화된 개발 태스크를 위한 전용 에이전트 |
| **MCP servers** | Model Context Protocol을 통한 도구 및 데이터 소스 연결 |
| **Hooks** | 핵심 워크플로우 지점에서의 커스터마이제이션 |

설치는 `/plugin` 커맨드를 통해 이루어지며, 시스템 프롬프트 복잡성을 관리하기 위해 **플러그인을 켜고 끌 수 있다**.

---

## 2. 활용 사례

1. **표준 강제(Enforcing standards)**: 엔지니어링 리더가 코드 리뷰 및 테스팅을 위한 특정 훅으로 팀 일관성 유지
2. **사용자 지원(Supporting users)**: 오픈소스 메인테이너가 패키지 사용 안내를 위한 슬래시 커맨드 제공
3. **워크플로우 공유(Sharing workflows)**: 디버깅 셋업, 배포 파이프라인, 테스팅 하네스 배포
4. **도구 연결(Connecting tools)**: 내부 도구와 데이터 소스를 MCP 서버를 통해 연결
5. **커스터마이제이션 번들링(Bundling customizations)**: 프레임워크 작성자가 관련 커스터마이제이션을 패키지화

---

## 3. 플러그인 마켓플레이스

누구나 git 리포지토리, GitHub 리포지토리, 또는 적절한 형식의 `.claude-plugin/marketplace.json` 파일이 있는 URL을 사용하여 **마켓플레이스를 빌드하고 호스팅**할 수 있다.

### 마켓플레이스 추가 커맨드

```bash
/plugin marketplace add user-or-org/repo-name
```

사용자는 `/plugin` 메뉴를 통해 탐색하고 설치할 수 있다.

---

## 4. 커뮤니티 사례

### Dan Avila의 마켓플레이스 (aitmpl.com/plugins)
- DevOps 자동화
- 문서 생성
- 프로젝트 관리
- 테스팅 스위트 플러그인

### Seth Hobson의 GitHub 리포지토리
- **80개 이상의 특화된 서브에이전트** 포함

### Anthropic 공식 예제 플러그인
- PR 리뷰
- 보안 가이던스
- Claude Agent SDK 개발
- 플러그인 생성 자체

---

## 5. 시작하기

터미널과 VS Code에서 `/plugin` 커맨드로 접근 가능하다.

### 설치 예시 워크플로우

```bash
# 1. 마켓플레이스 추가
/plugin marketplace add anthropics/claude-code

# 2. 특정 플러그인 설치
/plugin install feature-dev
```

---

## 핵심 권장사항

- 복잡성을 줄이기 위해 **필요할 때만 플러그인을 활성화**하라
- 커뮤니티 발견 및 조직 배포를 위해 **플러그인 마켓플레이스**를 활용하라
- 플러그인은 앞으로 Claude Code 커스터마이제이션을 공유하는 **표준 방식**이 될 것이다
