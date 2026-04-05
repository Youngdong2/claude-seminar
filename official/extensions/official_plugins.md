# Plugins — 공식 심층 가이드

- **1차 출처**: Claude Code 공식 문서 — Create plugins (https://code.claude.com/docs/en/plugins)
- **2차 출처**: Claude Code 공식 문서 — Create and distribute a plugin marketplace (https://code.claude.com/docs/en/plugin-marketplaces)
- **3차 출처**: Claude Code 공식 문서 — Discover and install plugins (https://code.claude.com/docs/en/discover-plugins)
- **블로그**: https://claude.com/blog/claude-code-plugins (2025-10-09 공개 베타), https://claude.com/blog/cowork-plugins-across-enterprise (2026-02-24 엔터프라이즈)
- **수집일**: 2026-04-05
- **용도**: 섹션 4 "하네스 & 컨텍스트 엔지니어링"의 Claude Code 구현 레이어에서 플러그인 파트 보강

---

## 1. 플러그인이란 무엇인가

> "Plugins let you extend Claude Code with custom functionality that can be shared across projects and teams."
> — Claude Code Plugins 공식 문서

플러그인은 Claude Code를 확장하는 **재사용 가능한 기능 패키지**다. 하나의 플러그인은 다음을 **단일 단위로** 번들링한다.

| 구성 요소 | 설명 |
|---|---|
| **Slash commands** | 자주 사용하는 작업을 위한 커스텀 단축 명령 (`.claude/commands/` 또는 플러그인 내 `commands/`) |
| **Skills** | Agent Skills — 모델 호출형, 지시문/워크플로우 패키지 (`skills/`) |
| **Subagents** | 특화된 개발 태스크를 위한 전용 서브에이전트 (`agents/`) |
| **Hooks** | 이벤트 기반 결정론적 훅 (`hooks/hooks.json`) |
| **MCP servers** | Model Context Protocol 외부 도구/데이터 연결 (`.mcp.json`) |
| **LSP servers** | Language Server Protocol 코드 인텔리전스 (`.lsp.json`) |
| **settings.json** | 플러그인 활성화 시 적용되는 기본 설정 (현재 `agent` 키만 지원) |
| **bin/** | 플러그인 활성화 시 Bash 도구의 PATH에 추가되는 실행 파일 |

**핵심 포인트**: 플러그인은 **새로운 기능 유형이 아니라**, 기존 확장(Skill/Subagent/Hook/MCP/LSP)을 **번들링하고 배포하는 방식**이다. 섹션 4에서 다룬 CLAUDE.md·Skill·Hook·MCP 레이어 위에 얹히는 **"배포 레이어"**로 이해하면 된다.

### 1.1 2025년 10월 공개 베타로 출시

- 2025-10-09 Anthropic이 공식 블로그로 플러그인을 **공개 베타**로 발표
- 슬로건: *"슬래시 커맨드, 에이전트, MCP 서버, 훅의 커스텀 컬렉션을 **단일 커맨드로 설치**"*
- 2026-02-24 엔터프라이즈 확장 — 프라이빗 마켓플레이스, 10개 사전 빌드 템플릿
- 2026년 현재 Claude Code 커스터마이제이션을 공유하는 **표준 방식**으로 자리 잡음

---

## 2. Standalone vs Plugin — 언제 어느 쪽을 쓰나

공식 문서가 제시하는 선택 기준:

| 방식 | 스킬 이름 | 언제 쓰나 |
|:---|:---|:---|
| **Standalone** (`.claude/` 디렉토리) | `/hello` | 개인 워크플로우, 프로젝트별 커스터마이제이션, 빠른 실험 |
| **Plugin** (`.claude-plugin/plugin.json` 포함 디렉토리) | `/plugin-name:hello` | 팀원/커뮤니티 공유, 버전 관리, 여러 프로젝트에서 재사용, 마켓플레이스 배포 |

### Standalone을 쓰는 경우
- 단일 프로젝트용 커스터마이제이션
- 개인 전용, 공유 불필요
- 스킬/훅 실험 단계
- 짧은 스킬 이름 선호 (`/hello`, `/deploy`)

### Plugin을 쓰는 경우
- 팀/커뮤니티와 기능 공유
- 여러 프로젝트에서 같은 스킬/에이전트 재사용
- 확장 버전 관리·쉬운 업데이트
- 마켓플레이스 배포
- **네임스페이스된 스킬 이름을 허용**할 수 있는 경우 (`/my-plugin:hello`) — 네임스페이싱이 플러그인 간 충돌 방지

> "Start with standalone configuration in `.claude/` for quick iteration, then convert to a plugin when you're ready to share."
> — 공식 Tip

---

## 3. 플러그인 구조 (Directory Layout)

```
my-plugin/
├── .claude-plugin/
│   └── plugin.json          # 매니페스트 (필수)
├── commands/                # 슬래시 커맨드 (Markdown 파일)
├── agents/                  # 서브에이전트 정의
├── skills/                  # Agent Skills (각 스킬은 SKILL.md 포함 폴더)
│   └── hello/
│       └── SKILL.md
├── hooks/
│   └── hooks.json           # 이벤트 훅
├── .mcp.json                # MCP 서버 설정
├── .lsp.json                # LSP 서버 설정
├── bin/                     # 실행 파일 (PATH에 추가됨)
└── settings.json            # 플러그인 활성화 시 기본 설정
```

> ⚠️ **흔한 실수**: `commands/`, `agents/`, `skills/`, `hooks/`를 `.claude-plugin/` **안에** 넣지 말 것. `plugin.json`만 `.claude-plugin/`에 들어가고, 나머지는 전부 **플러그인 루트 레벨**에 위치해야 한다.

### 3.1 매니페스트 (`plugin.json`)

```json
{
  "name": "my-first-plugin",
  "description": "A greeting plugin to learn the basics",
  "version": "1.0.0",
  "author": {
    "name": "Your Name"
  }
}
```

| 필드 | 용도 |
|:---|:---|
| `name` | 고유 식별자 겸 **스킬 네임스페이스**. 스킬은 이 이름으로 prefix됨 (`/my-first-plugin:hello`) |
| `description` | 플러그인 매니저에서 탐색/설치 시 노출 |
| `version` | 시맨틱 버저닝 (semver) 권장 |
| `author` | 선택. 기여자 표기용 |
| `homepage`, `repository`, `license` 등 | 선택. 추가 메타데이터 |

---

## 4. 첫 플러그인 만들기 (Quickstart)

공식 문서의 5단계 워크플로우:

```bash
# 1. 디렉토리 생성
mkdir my-first-plugin
mkdir my-first-plugin/.claude-plugin

# 2. plugin.json 작성 (위 예시)

# 3. 스킬 추가
mkdir -p my-first-plugin/skills/hello
# SKILL.md 작성

# 4. 로컬에서 테스트 (설치 없이)
claude --plugin-dir ./my-first-plugin

# 5. 세션 내에서 호출
/my-first-plugin:hello
```

**SKILL.md 예시** (`$ARGUMENTS`로 동적 입력 받기):

```markdown
---
description: Greet the user with a personalized message
---

# Hello Skill

Greet the user named "$ARGUMENTS" warmly and ask how you can help them today.
```

**개발 중 재로드**: 파일 수정 후 `/reload-plugins`로 재시작 없이 변경사항 반영. 재로드하면 플러그인/스킬/에이전트/훅/MCP/LSP 서버 수를 다시 보고해준다.

---

## 5. 마켓플레이스 — 플러그인을 배포하는 카탈로그

> "A plugin marketplace is a catalog that lets you distribute plugins to others. Marketplaces provide centralized discovery, version tracking, automatic updates, and support for multiple source types."

마켓플레이스는 **여러 플러그인을 하나의 카탈로그로 묶는** 메커니즘이다.

### 5.1 마켓플레이스 파일 (`marketplace.json`)

저장소 루트의 `.claude-plugin/marketplace.json`에 정의:

```json
{
  "name": "company-tools",
  "owner": {
    "name": "DevTools Team",
    "email": "devtools@example.com"
  },
  "plugins": [
    {
      "name": "code-formatter",
      "source": "./plugins/formatter",
      "description": "Automatic code formatting on save",
      "version": "2.1.0"
    },
    {
      "name": "deployment-tools",
      "source": {
        "source": "github",
        "repo": "company/deploy-plugin"
      },
      "description": "Deployment automation tools"
    }
  ]
}
```

### 5.2 플러그인 소스 — 5가지 방식

| 소스 타입 | 지정 방식 | 용도 |
|:---|:---|:---|
| **Relative path** | `"./plugins/my-plugin"` | 같은 저장소 내 플러그인 (경로는 **마켓플레이스 루트** 기준) |
| **GitHub** | `{"source": "github", "repo": "owner/repo", "ref": "v2.0.0", "sha": "a1b2..."}` | GitHub 저장소 (branch/tag/commit 핀 가능) |
| **Git URL** | `{"source": "url", "url": "https://gitlab.com/team/plugin.git"}` | GitLab/Bitbucket/셀프호스팅 등 |
| **Git subdir** | `{"source": "git-subdir", "url": "...", "path": "tools/claude-plugin"}` | 모노레포 내 서브디렉토리 (sparse clone으로 대역폭 절약) |
| **npm** | `{"source": "npm", "package": "@acme/claude-plugin", "version": "^2.0.0"}` | npm 패키지 (공개/프라이빗 레지스트리) |

### 5.3 마켓플레이스 소스 vs 플러그인 소스 (혼동 주의)

- **마켓플레이스 소스**: `marketplace.json` 카탈로그 **자체**를 어디서 가져올지. 사용자가 `/plugin marketplace add` 할 때 지정.
- **플러그인 소스**: 카탈로그 안에서 **각 플러그인**을 어디서 가져올지. `marketplace.json` 내부의 `source` 필드.
- 서로 다른 저장소 가능. 예: 카탈로그는 `acme-corp/plugin-catalog`, 실제 플러그인은 `acme-corp/code-formatter`에서.

### 5.4 호스팅 방법

- **GitHub (권장)**: 저장소 루트에 `.claude-plugin/marketplace.json` 두고 공유
- **Git 호스트 (GitLab/Bitbucket/셀프호스팅)**: 전체 URL로 추가
- **프라이빗 저장소**: `GITHUB_TOKEN`, `GITLAB_TOKEN`, `BITBUCKET_TOKEN` 환경 변수로 백그라운드 자동 업데이트 가능

### 5.5 공식 Anthropic 마켓플레이스 (`claude-plugins-official`)

Claude Code 시작 시 **자동으로 사용 가능**. 별도 추가 불필요.

```bash
# 예: GitHub 통합 설치
/plugin install github@claude-plugins-official
```

카탈로그: https://claude.com/plugins

---

## 6. 플러그인 발견·설치·관리 — 사용자 워크플로우

### 6.1 핵심 명령어

```bash
# 마켓플레이스 추가
/plugin marketplace add anthropics/claude-code
/plugin marketplace add https://gitlab.com/company/plugins.git
/plugin marketplace add ./my-local-marketplace

# 플러그인 설치 (기본은 user 스코프)
/plugin install plugin-name@marketplace-name

# 관리
/plugin                    # 대화형 UI — Discover/Installed/Marketplaces/Errors 4개 탭
/plugin disable plugin@mk  # 비활성화 (언인스톨 X)
/plugin enable plugin@mk   # 재활성화
/plugin uninstall plugin@mk
/plugin marketplace list
/plugin marketplace update marketplace-name
/plugin marketplace remove marketplace-name
/reload-plugins            # 변경사항 재로드 (세션 재시작 없이)
/plugin validate .         # 마켓플레이스/플러그인 유효성 검사
```

### 6.2 `/plugin` 대화형 UI — 4개 탭

- **Discover**: 추가된 모든 마켓플레이스에서 플러그인 탐색
- **Installed**: 설치된 플러그인 조회/관리 (스코프별 그룹)
- **Marketplaces**: 마켓플레이스 추가/제거/업데이트
- **Errors**: 플러그인 로딩 에러 확인

Tab 키로 탭 순환, Shift+Tab으로 역순.

### 6.3 설치 스코프 (4가지)

| 스코프 | 적용 범위 | 저장 위치 |
|:---|:---|:---|
| **User** (기본) | 본인의 모든 프로젝트 | `~/.claude/settings.json` |
| **Project** | 저장소 협업자 전원 | `.claude/settings.json` |
| **Local** | 현재 저장소의 본인만 | `.claude/settings.local.json` |
| **Managed** | 관리자가 배포, 수정 불가 | managed settings |

### 6.4 네임스페이싱 — 충돌 방지 메커니즘

플러그인 스킬은 **항상** 네임스페이스된다:

```
/plugin-name:skill-name
```

→ 여러 플러그인이 같은 이름의 스킬을 가져도 충돌하지 않음. `plugin.json`의 `name` 필드를 바꾸면 네임스페이스도 바뀐다.

---

## 7. 팀/조직 차원의 플러그인 관리

### 7.1 팀 마켓플레이스 자동 등록 (`extraKnownMarketplaces`)

`.claude/settings.json`에 추가하면 팀원이 저장소 폴더를 신뢰할 때 **자동으로 마켓플레이스 설치 프롬프트**가 뜬다.

```json
{
  "extraKnownMarketplaces": {
    "my-team-tools": {
      "source": {
        "source": "github",
        "repo": "your-org/claude-plugins"
      }
    }
  }
}
```

### 7.2 기본 활성화 플러그인 (`enabledPlugins`)

```json
{
  "enabledPlugins": {
    "code-formatter@company-tools": true,
    "deployment-tools@company-tools": true
  }
}
```

### 7.3 관리 마켓플레이스 제한 (`strictKnownMarketplaces`)

조직이 허용한 마켓플레이스만 사용하도록 강제할 수 있다. `managed-settings.json`에 설정하면 개인 설정으로 우회 불가.

```json
{
  "strictKnownMarketplaces": [
    {
      "source": "github",
      "repo": "acme-corp/approved-plugins"
    },
    {
      "source": "hostPattern",
      "hostPattern": "^github\\.example\\.com$"
    }
  ]
}
```

- `[]` (빈 배열) → **완전 락다운**. 어떤 마켓플레이스도 추가 불가
- 지정 목록 → 허용목록에 정확히 일치하는 것만 허용
- 정규식 호스트 패턴 → GitHub Enterprise, 셀프호스팅 GitLab 지원

### 7.4 시드 디렉토리 (`CLAUDE_CODE_PLUGIN_SEED_DIR`) — 컨테이너/CI 환경

컨테이너 이미지 빌드 시점에 플러그인을 미리 설치해두고, 런타임에 네트워크 없이 사용할 수 있다.

```bash
# 빌드 시
CLAUDE_CODE_PLUGIN_CACHE_DIR=/opt/claude-seed claude plugin marketplace add your-org/plugins
CLAUDE_CODE_PLUGIN_CACHE_DIR=/opt/claude-seed claude plugin install my-tool@your-plugins

# 런타임
export CLAUDE_CODE_PLUGIN_SEED_DIR=/opt/claude-seed
```

- 시드 디렉토리는 **읽기 전용** — 자동 업데이트 불가
- 시드 엔트리가 사용자 설정을 덮어씀
- airgapped 환경에서 유용

### 7.5 릴리스 채널 (stable/latest)

같은 저장소의 서로 다른 ref/sha를 가리키는 마켓플레이스 두 개를 만들어 사용자 그룹별 할당:

```json
// stable-tools
{"plugins": [{"source": {"source": "github", "repo": "acme/code-formatter", "ref": "stable"}}]}

// latest-tools
{"plugins": [{"source": {"source": "github", "repo": "acme/code-formatter", "ref": "latest"}}]}
```

> ⚠️ 주의: 각 ref의 `plugin.json`이 **서로 다른 version**을 선언해야 Claude Code가 업데이트를 인식한다.

---

## 8. 활용 사례 5가지 (공식 블로그)

Claude 공식 블로그 "Customize Claude Code with Plugins"(2025-10-09)에서 제시한 대표 사례:

1. **표준 강제 (Enforcing standards)**
   엔지니어링 리더가 코드 리뷰·테스팅 훅을 플러그인으로 배포 → 팀 일관성 유지
2. **사용자 지원 (Supporting users)**
   오픈소스 메인테이너가 패키지 사용 안내용 슬래시 커맨드 제공
3. **워크플로우 공유 (Sharing workflows)**
   디버깅 셋업, 배포 파이프라인, 테스팅 하네스 배포
4. **도구 연결 (Connecting tools)**
   내부 도구/데이터 소스를 MCP 서버로 연결
5. **커스터마이제이션 번들링 (Bundling customizations)**
   프레임워크 작성자가 관련 커스터마이제이션 패키지화

> "Plugins will be the standard way to share Claude Code customizations going forward."
> — 공식 블로그 결론

---

## 9. 공식 Anthropic 마켓플레이스 카테고리

`claude-plugins-official`에 포함된 플러그인 카테고리:

### 9.1 Code Intelligence (LSP 플러그인)

언어 서버를 붙여 Claude에게 **실시간 코드 인텔리전스** 제공. 파일 편집 후 자동으로 타입 에러/경고를 받고, 같은 턴에 수정 가능.

| 언어 | 플러그인 | 필요 바이너리 |
|:---|:---|:---|
| C/C++ | `clangd-lsp` | `clangd` |
| C# | `csharp-lsp` | `csharp-ls` |
| Go | `gopls-lsp` | `gopls` |
| Java | `jdtls-lsp` | `jdtls` |
| Kotlin | `kotlin-lsp` | `kotlin-language-server` |
| Lua | `lua-lsp` | `lua-language-server` |
| PHP | `php-lsp` | `intelephense` |
| Python | `pyright-lsp` | `pyright-langserver` |
| Rust | `rust-analyzer-lsp` | `rust-analyzer` |
| Swift | `swift-lsp` | `sourcekit-lsp` |
| TypeScript | `typescript-lsp` | `typescript-language-server` |

**Claude가 얻는 2가지 능력**:
- **Automatic diagnostics**: 매 편집 후 자동으로 에러/경고 받음 → 같은 턴에 수정
- **Code navigation**: 정의로 이동, 레퍼런스 찾기, 타입 조회, 심볼 나열, 콜 하이어라키 — grep 기반 검색보다 정확

### 9.2 External Integrations (MCP 번들)

- 소스 관리: `github`, `gitlab`
- 프로젝트 관리: `atlassian` (Jira/Confluence), `asana`, `linear`, `notion`
- 디자인: `figma`
- 인프라: `vercel`, `firebase`, `supabase`
- 커뮤니케이션: `slack`
- 모니터링: `sentry`

### 9.3 Development Workflows

- `commit-commands` — Git 커밋 워크플로우 (commit, push, PR 생성)
- `pr-review-toolkit` — PR 리뷰 전문 에이전트
- `agent-sdk-dev` — Claude Agent SDK 개발 툴킷
- `plugin-dev` — 플러그인 제작 툴킷

### 9.4 Output Styles

- `explanatory-output-style` — 구현 선택에 대한 교육적 인사이트
- `learning-output-style` — 기술 학습용 인터랙티브 모드

---

## 10. 엔터프라이즈 플러그인 (2026-02-24 발표)

Anthropic이 Claude Cowork 확장과 함께 발표한 엔터프라이즈 기능:

### 10.1 10개 사전 빌드 템플릿

| 역할 | 주요 기능 |
|:---|:---|
| **HR** | 제안서, 온보딩, 성과 리뷰, 보상 관리 |
| **디자인** | UX 워크플로, 비판 프레임워크, 접근성 감사, 리서치 계획 |
| **엔지니어링** | 스탠드업 요약, 인시던트 대응, 배포 체크리스트 |
| **운영** | 문서화, 벤더 평가, 런북 |
| **브랜드 보이스** (Tribe AI) | 보이스 가이드라인 추출/적용 |
| **재무 분석** | 리서치, 모델링, PowerPoint 품질 확인 |
| **투자 은행** | 거래 리뷰, 비교 분석, 피치 자료 |
| **주식 리서치** | 실적 파싱, 재무 모델, 리서치 노트 |
| **사모펀드** | 딜 소싱, 실사, 시나리오 모델링 |
| **자산 관리** | 포트폴리오 분석, 드리프트 식별, 리밸런싱 |

### 10.2 조직 기능

- **프라이빗 GitHub 저장소 마켓플레이스** (비공개 베타)
- **사용자별 자동 프로비저닝**
- **통합 "Customize" 메뉴** — 플러그인/스킬/커넥터 한 곳에서 관리
- **OpenTelemetry 지원** — 사용량/비용/도구 활동 추적

### 10.3 플러그인 파트너

- Slack by Salesforce
- LSEG, S&P Global
- Common Room, Tribe AI

---

## 11. 스트릭트 모드 (Strict Mode) — 마켓플레이스 재정의 제어

`marketplace.json`의 플러그인 엔트리에 `strict` 필드로 제어:

| 값 | 동작 |
|:---|:---|
| `true` (기본) | `plugin.json`이 권위. 마켓플레이스 엔트리는 보완 가능 (병합) |
| `false` | 마켓플레이스 엔트리가 **전체 정의**. 플러그인 저장소에 `plugin.json`이 컴포넌트 선언 시 충돌 → 로드 실패 |

**언제 `strict: false`를 쓰나**: 마켓플레이스 운영자가 플러그인 저장소를 **재구성/큐레이션**하고 싶을 때. 플러그인 저장소는 raw 파일만 제공하고, 마켓플레이스가 노출 범위를 결정.

---

## 12. `${CLAUDE_PLUGIN_ROOT}` 변수 — 플러그인 내부 경로 참조

플러그인은 설치 시 **캐시 위치로 복사**된다. 따라서 상대 경로로 외부 파일을 참조할 수 없다 (`../shared-utils` 불가). 플러그인 내부 파일을 가리키려면 `${CLAUDE_PLUGIN_ROOT}` 환경 변수를 사용한다.

```json
{
  "hooks": {
    "PostToolUse": [
      {
        "matcher": "Write|Edit",
        "hooks": [
          {
            "type": "command",
            "command": "${CLAUDE_PLUGIN_ROOT}/scripts/validate.sh"
          }
        ]
      }
    ]
  },
  "mcpServers": {
    "enterprise-db": {
      "command": "${CLAUDE_PLUGIN_ROOT}/servers/db-server",
      "args": ["--config", "${CLAUDE_PLUGIN_ROOT}/config.json"]
    }
  }
}
```

- 업데이트 간에 살아남아야 하는 의존성/상태는 `${CLAUDE_PLUGIN_DATA}` 사용
- 여러 플러그인이 파일 공유 필요 시 → 심볼릭 링크 (복사 시 따라감)

---

## 13. 보안 경고

> "Plugins and marketplaces are highly trusted components that can execute arbitrary code on your machine with your user privileges. Only install plugins and add marketplaces from sources you trust."

- 플러그인은 **임의 코드 실행 권한**을 가진다 — 사용자 권한으로
- **신뢰하는 소스**에서만 설치
- Anthropic은 서드파티 플러그인이 포함한 MCP 서버/파일/소프트웨어를 검증하지 않음
- 각 플러그인의 homepage 확인 필수
- 조직은 `strictKnownMarketplaces`로 허용 범위 제한

---

## 14. 표준 설정 → 플러그인 마이그레이션

기존 `.claude/` 디렉토리의 standalone 설정을 플러그인으로 변환하는 공식 4단계:

```bash
# 1. 플러그인 구조 생성
mkdir -p my-plugin/.claude-plugin

# 2. plugin.json 작성 (위 예시)

# 3. 기존 파일 복사
cp -r .claude/commands my-plugin/
cp -r .claude/agents my-plugin/
cp -r .claude/skills my-plugin/

# 4. hooks 마이그레이션 (형식은 동일, 위치만 이동)
mkdir my-plugin/hooks
# .claude/settings.json의 hooks 객체를 my-plugin/hooks/hooks.json으로 복사
```

**마이그레이션 전후 차이**:

| 기존 (`.claude/`) | 플러그인 |
|:---|:---|
| 한 프로젝트에서만 사용 | 마켓플레이스로 공유 가능 |
| `.claude/commands/`의 파일 | `plugin-name/commands/`의 파일 |
| `settings.json`의 훅 | `hooks/hooks.json`의 훅 |
| 공유 시 수동 복사 | `/plugin install`로 설치 |

---

## 15. 섹션 4 발표용 핵심 인용구

1. **정의**: *"Plugins let you extend Claude Code with custom functionality that can be shared across projects and teams."*
2. **번들 대상**: *"skills, agents, hooks, and MCP servers ... installed with a single command"* (2025-10-09 블로그)
3. **표준화**: *"Plugins will be the standard way to share Claude Code customizations going forward."*
4. **마켓플레이스**: *"A catalog that lets you distribute plugins to others. Marketplaces provide centralized discovery, version tracking, automatic updates."*
5. **보안**: *"Plugins ... can execute arbitrary code on your machine with your user privileges. Only install plugins and add marketplaces from sources you trust."*
6. **네임스페이싱**: *"Plugin skills are always namespaced (like `/my-first-plugin:hello`) to prevent conflicts."*

---

## 16. 이 문서와 다른 프로젝트 자료의 관계

- `blog/claude_official/blog_251009_claude-code-plugins.md` — 2025-10-09 공개 베타 발표 (99줄)
- `blog/claude_official/blog_260224_cowork-plugins-enterprise.md` — 2026-02-24 엔터프라이즈 (106줄)
- `blog/claude_official/blog_260303_improving-skill-creator.md` — skill-creator 플러그인 개선
- `research/skills_and_plugins.md` — 생태계 전체 조사 (Oh My Claude Code, Compound Engineering Plugin, claude-mem 등 커뮤니티 플러그인 758줄)

이 문서는 **공식 문서 3개(plugins, plugin-marketplaces, discover-plugins)의 통합 번역·요약본**이다. 커뮤니티 플러그인 사례는 `research/skills_and_plugins.md`가, 세미나 활용 서사는 섹션 4 README.md가 담당한다.
