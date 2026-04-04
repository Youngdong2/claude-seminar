# MCP를 통해 Claude Code를 도구에 연결하기 (공식 문서)

- **출처**: Claude Code 공식 문서
- **링크**: https://code.claude.com/docs/ko/mcp
- **관련 링크**:
  - [Model Context Protocol 공식](https://modelcontextprotocol.io/introduction)
  - [MCP SDK (서버 구축)](https://modelcontextprotocol.io/quickstart/server)
  - [MCP 리소스 요청 사양](https://modelcontextprotocol.io/docs/learn/client-concepts#elicitation)
  - [GitHub MCP 서버 저장소](https://github.com/modelcontextprotocol/servers)
  - [Anthropic MCP 레지스트리 API](https://api.anthropic.com/mcp-registry/docs)
  - [채널](https://code.claude.com/docs/ko/channels)
  - [채널 참조](https://code.claude.com/docs/ko/channels-reference)
  - [Plugins](https://code.claude.com/docs/ko/plugins)
  - [플러그인 구성 요소 참조 - MCP 서버](https://code.claude.com/docs/ko/plugins-reference#mcp-servers)
  - [플러그인 지속적 상태](https://code.claude.com/docs/ko/plugins-reference#persistent-data-directory)
  - [설정](https://code.claude.com/docs/ko/settings)
  - [설정 파일](https://code.claude.com/docs/ko/settings#settings-files)
  - [설정 env 필드](https://code.claude.com/docs/ko/settings#available-settings)
  - [관리되는 설정](https://code.claude.com/docs/ko/permissions#managed-settings)
  - [Hooks - Elicitation](https://code.claude.com/docs/ko/hooks#Elicitation)
  - [Skills](https://code.claude.com/docs/ko/skills)
  - [claude.ai 커넥터 설정](https://claude.ai/settings/connectors)

---

## 개요

Claude Code는 [Model Context Protocol (MCP)](https://modelcontextprotocol.io/introduction)를 통해 수백 개의 외부 도구 및 데이터 소스에 연결할 수 있습니다.

### MCP로 할 수 있는 것

- 이슈 추적기에서 기능 구현 (JIRA -> GitHub PR)
- 모니터링 데이터 분석 (Sentry, Statsig)
- 데이터베이스 쿼리 (PostgreSQL 등)
- 디자인 통합 (Figma -> 코드)
- 워크플로우 자동화 (Gmail 초안 생성)
- 외부 이벤트에 반응 (Telegram, Discord, webhook)

---

## MCP 서버 설치

### 옵션 1: 원격 HTTP 서버 (권장)

```bash
# 기본 구문
claude mcp add --transport http <name> <url>

# 예: Notion
claude mcp add --transport http notion https://mcp.notion.com/mcp

# Bearer 토큰
claude mcp add --transport http secure-api https://api.example.com/mcp \
  --header "Authorization: Bearer your-token"
```

### 옵션 2: 원격 SSE 서버 (deprecated)

```bash
claude mcp add --transport sse <name> <url>

# 예: Asana
claude mcp add --transport sse asana https://mcp.asana.com/sse
```

### 옵션 3: 로컬 stdio 서버

```bash
claude mcp add [options] <name> -- <command> [args...]

# 예: Airtable
claude mcp add --transport stdio --env AIRTABLE_API_KEY=YOUR_KEY airtable \
  -- npx -y airtable-mcp-server
```

> **중요**: 모든 옵션(`--transport`, `--env`, `--scope`, `--header`)은 서버 이름 **앞에**, `--`는 서버 이름과 명령 사이에 위치.

### 서버 관리 명령

```bash
claude mcp list                 # 모든 서버 나열
claude mcp get github           # 특정 서버 세부 정보
claude mcp remove github        # 서버 제거
/mcp                            # Claude Code 내에서 상태 확인
```

### 동적 도구 업데이트

MCP `list_changed` 알림 지원 -> 서버가 사용 가능한 도구를 동적으로 업데이트 가능 (재연결 불필요).

### 채널을 사용한 메시지 푸시

MCP 서버가 `claude/channel` 기능 선언 -> `--channels` 플래그로 옵트인 -> 세션에 메시지 직접 푸시.

---

## 설치 범위

### 범위 종류

| 범위 | 저장 위치 | 설명 |
|------|---------|------|
| **로컬** (기본값) | `~/.claude.json` (프로젝트 경로 아래) | 현재 프로젝트에서만 사용자에게만 |
| **프로젝트** | `.mcp.json` (프로젝트 루트) | 팀 공유, 버전 제어에 체크인 |
| **사용자** | `~/.claude.json` | 모든 프로젝트에서 사용자에게만 |

```bash
# 로컬 (기본값)
claude mcp add --transport http stripe https://mcp.stripe.com

# 프로젝트
claude mcp add --transport http paypal --scope project https://mcp.paypal.com/mcp

# 사용자
claude mcp add --transport http hubspot --scope user https://mcp.hubspot.com/anthropic
```

### 우선순위

로컬 > 프로젝트 > 사용자

### `.mcp.json` 형식

```json
{
  "mcpServers": {
    "shared-server": {
      "command": "/path/to/server",
      "args": [],
      "env": {}
    }
  }
}
```

### 환경 변수 확장

```json
{
  "mcpServers": {
    "api-server": {
      "type": "http",
      "url": "${API_BASE_URL:-https://api.example.com}/mcp",
      "headers": {
        "Authorization": "Bearer ${API_KEY}"
      }
    }
  }
}
```

- `${VAR}`: 환경 변수 값으로 확장
- `${VAR:-default}`: 설정되면 확장, 아니면 default 사용
- 확장 위치: `command`, `args`, `env`, `url`, `headers`

---

## 실제 예시

### Sentry 오류 모니터링

```bash
claude mcp add --transport http sentry https://mcp.sentry.dev/mcp
```

```text
/mcp   # 인증
지난 24시간 동안 가장 일반적인 오류는 무엇입니까?
```

### GitHub 코드 검토

```bash
claude mcp add --transport http github https://api.githubcopilot.com/mcp/
```

```text
PR #456을 검토하고 개선 사항을 제안하세요
나에게 할당된 모든 열린 PR을 보여주세요
```

### PostgreSQL 데이터베이스 쿼리

```bash
claude mcp add --transport stdio db -- npx -y @bytebase/dbhub \
  --dsn "postgresql://readonly:pass@prod.db.com:5432/analytics"
```

```text
이번 달 총 수익은 얼마입니까?
주문 테이블의 스키마를 보여주세요
```

---

## 원격 MCP 서버 인증

### OAuth 2.0

```bash
claude mcp add --transport http sentry https://mcp.sentry.dev/mcp
/mcp   # 브라우저에서 로그인
```

### 고정 OAuth 콜백 포트

```bash
claude mcp add --transport http \
  --callback-port 8080 \
  my-server https://mcp.example.com/mcp
```

### 사전 구성된 OAuth 자격 증명

```bash
# claude mcp add
claude mcp add --transport http \
  --client-id your-client-id --client-secret --callback-port 8080 \
  my-server https://mcp.example.com/mcp

# JSON 구성
claude mcp add-json my-server \
  '{"type":"http","url":"https://mcp.example.com/mcp","oauth":{"clientId":"your-client-id","callbackPort":8080}}' \
  --client-secret

# CI / 환경 변수
MCP_CLIENT_SECRET=your-secret claude mcp add --transport http \
  --client-id your-client-id --client-secret --callback-port 8080 \
  my-server https://mcp.example.com/mcp
```

### OAuth 메타데이터 검색 재정의

```json
{
  "mcpServers": {
    "my-server": {
      "type": "http",
      "url": "https://mcp.example.com/mcp",
      "oauth": {
        "authServerMetadataUrl": "https://auth.example.com/.well-known/openid-configuration"
      }
    }
  }
}
```

### 사용자 정의 헤더를 사용한 동적 인증 (`headersHelper`)

```json
{
  "mcpServers": {
    "internal-api": {
      "type": "http",
      "url": "https://mcp.internal.example.com",
      "headersHelper": "/opt/bin/get-mcp-auth-headers.sh"
    }
  }
}
```

- 명령은 JSON 객체를 stdout에 출력해야 함
- 10초 시간 초과
- 동적 헤더가 동일 이름의 정적 `headers`를 재정의

---

## JSON 구성에서 MCP 서버 추가

```bash
# HTTP 서버
claude mcp add-json weather-api '{"type":"http","url":"https://api.weather.com/mcp","headers":{"Authorization":"Bearer token"}}'

# stdio 서버
claude mcp add-json local-weather '{"type":"stdio","command":"/path/to/weather-cli","args":["--api-key","abc123"],"env":{"CACHE_DIR":"/tmp"}}'
```

---

## Claude Desktop에서 MCP 서버 가져오기

```bash
claude mcp add-from-claude-desktop    # 대화형 선택
claude mcp list                        # 확인
```

> macOS 및 WSL에서만 작동

---

## Claude.ai에서 MCP 서버 사용

[claude.ai/settings/connectors](https://claude.ai/settings/connectors)에서 추가한 MCP 서버가 Claude Code에서 자동 사용 가능.

비활성화: `ENABLE_CLAUDEAI_MCP_SERVERS=false claude`

---

## Claude Code를 MCP 서버로 사용

```bash
claude mcp serve
```

Claude Desktop에서 사용:

```json
{
  "mcpServers": {
    "claude-code": {
      "type": "stdio",
      "command": "claude",
      "args": ["mcp", "serve"],
      "env": {}
    }
  }
}
```

---

## MCP 출력 제한

- **경고 임계값**: 10,000 토큰
- **기본 최대값**: 25,000 토큰
- **구성**: `MAX_MCP_OUTPUT_TOKENS` 환경 변수

```bash
export MAX_MCP_OUTPUT_TOKENS=50000
claude
```

---

## MCP 리소스 사용

### `@` 멘션으로 참조

```text
@github:issue://123을 분석하고 수정 사항을 제안하세요
@postgres:schema://users와 @docs:file://database/user-model을 비교하세요
```

---

## MCP Tool Search

MCP 도구가 컨텍스트 윈도우의 10% 이상 차지 시 자동 활성화. 필요에 따라 동적으로 도구를 로드합니다.

### 구성 (`ENABLE_TOOL_SEARCH`)

| 값 | 동작 |
|----|------|
| (미설정) | 기본 활성화. 비 자사 `ANTHROPIC_BASE_URL` 시 비활성화 |
| `true` | 항상 활성화 |
| `auto` | MCP 도구가 컨텍스트 10% 초과 시 활성화 |
| `auto:<N>` | 사용자 정의 임계값 (예: `auto:5` = 5%) |
| `false` | 비활성화, 모든 MCP 도구 미리 로드 |

```bash
ENABLE_TOOL_SEARCH=auto:5 claude    # 5% 임계값
ENABLE_TOOL_SEARCH=false claude      # 비활성화
```

> Sonnet 4 이상 또는 Opus 4 이상 필요. Haiku 미지원.

---

## MCP 프롬프트를 명령으로 사용

```text
/mcp__github__list_prs
/mcp__github__pr_review 456
/mcp__jira__create_issue "버그 제목" high
```

---

## 관리되는 MCP 구성

### 옵션 1: `managed-mcp.json` (독점 제어)

시스템 전체 디렉토리에 배포:
- macOS: `/Library/Application Support/ClaudeCode/managed-mcp.json`
- Linux/WSL: `/etc/claude-code/managed-mcp.json`
- Windows: `C:\Program Files\ClaudeCode\managed-mcp.json`

```json
{
  "mcpServers": {
    "github": {
      "type": "http",
      "url": "https://api.githubcopilot.com/mcp/"
    },
    "company-internal": {
      "type": "stdio",
      "command": "/usr/local/bin/company-mcp-server",
      "args": ["--config", "/etc/company/mcp-config.json"]
    }
  }
}
```

> 사용자가 MCP 서버를 추가/수정/사용 불가

### 옵션 2: 허용 목록/거부 목록 (정책 기반)

관리되는 설정 파일에서 `allowedMcpServers` / `deniedMcpServers` 사용:

```json
{
  "allowedMcpServers": [
    { "serverName": "github" },
    { "serverCommand": ["npx", "-y", "@modelcontextprotocol/server-filesystem"] },
    { "serverUrl": "https://mcp.company.com/*" }
  ],
  "deniedMcpServers": [
    { "serverName": "dangerous-server" },
    { "serverUrl": "https://*.untrusted.com/*" }
  ]
}
```

### 제한 유형

| 제한 | 설명 |
|------|------|
| `serverName` | 서버 구성 이름과 일치 |
| `serverCommand` | stdio 서버의 정확한 명령 + 인수 일치 |
| `serverUrl` | URL 패턴 일치 (`*` 와일드카드 지원) |

### 허용 목록 동작

- `undefined`: 제한 없음
- 빈 배열 `[]`: 완전 잠금
- 항목 목록: 일치하는 서버만 허용

### 거부 목록 동작

- **거부 목록이 절대 우선순위** (허용 목록에 있어도 차단)
- `undefined`: 차단 없음
- 항목 목록: 지정된 서버 차단

### URL 와일드카드 예

- `https://mcp.company.com/*`: 특정 도메인의 모든 경로
- `https://*.example.com/*`: 모든 하위 도메인
- `http://localhost:*/*`: 모든 포트

### 플러그인 제공 MCP 서버

플러그인이 MCP 서버를 번들로 제공 가능. 플러그인 활성화 시 자동 시작.

플러그인 루트의 `.mcp.json`:
```json
{
  "mcpServers": {
    "database-tools": {
      "command": "${CLAUDE_PLUGIN_ROOT}/servers/db-server",
      "args": ["--config", "${CLAUDE_PLUGIN_ROOT}/config.json"],
      "env": {
        "DB_URL": "${DB_URL}"
      }
    }
  }
}
```

또는 `plugin.json`에 인라인:
```json
{
  "name": "my-plugin",
  "mcpServers": {
    "plugin-api": {
      "command": "${CLAUDE_PLUGIN_ROOT}/servers/api-server",
      "args": ["--port", "8080"]
    }
  }
}
```

- **`${CLAUDE_PLUGIN_ROOT}`**: 번들된 파일 참조
- **`${CLAUDE_PLUGIN_DATA}`**: 지속적 상태 디렉토리
- `/reload-plugins`로 MCP 서버 연결/해제
