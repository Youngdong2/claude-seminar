# 권한 구성 (공식 문서)

- **출처**: Claude Code 공식 문서
- **링크**: [https://code.claude.com/docs/ko/permissions](https://code.claude.com/docs/ko/permissions)
- **관련 링크**:
  - [권한 모드](https://code.claude.com/docs/ko/permission-modes)
  - [설정 파일](https://code.claude.com/docs/ko/settings)
  - [설정 - 권한 설정 테이블](https://code.claude.com/docs/ko/settings#permission-settings)
  - [설정 우선순위](https://code.claude.com/docs/ko/settings#settings-precedence)
  - [설정 - Hook 구성](https://code.claude.com/docs/ko/settings#hook-configuration)
  - [샌드박싱](https://code.claude.com/docs/ko/sandboxing)
  - [인증](https://code.claude.com/docs/ko/authentication)
  - [보안](https://code.claude.com/docs/ko/security)
  - [Hooks 가이드](https://code.claude.com/docs/ko/hooks-guide)
  - [Hooks - 보호된 파일 편집 차단](https://code.claude.com/docs/ko/hooks-guide#block-edits-to-protected-files)
  - [Subagents](https://code.claude.com/docs/ko/sub-agents)
  - [MCP](https://code.claude.com/docs/ko/mcp)
  - [MCP - 관리형 MCP 구성](https://code.claude.com/docs/ko/mcp#managed-mcp-configuration)
  - [플러그인 마켓플레이스 - 관리형 제한](https://code.claude.com/docs/ko/plugin-marketplaces#managed-marketplace-restrictions)
  - [서버 관리형 설정](https://code.claude.com/docs/ko/server-managed-settings)
  - [Remote Control](https://code.claude.com/docs/ko/remote-control)
  - [Claude Code 웹 세션](https://code.claude.com/docs/ko/claude-code-on-the-web)
  - [Claude Code 관리자 설정](https://claude.ai/admin-settings/claude-code)
  - [예시 설정 구성 (GitHub)](https://github.com/anthropics/claude-code/tree/main/examples/settings)
  - [gitignore 사양](https://git-scm.com/docs/gitignore)
  - [GitHub Actions 시크릿 사용](https://docs.github.com/en/actions/security-guides/using-secrets-in-github-actions)

---

## 권한 시스템

Claude Code는 계층화된 권한 시스템을 사용한다:

| 도구 유형 | 예시 | 승인 필요 | "예, 다시 묻지 않기" 동작 |
|:---------|:-----|:---------|:---------------------|
| 읽기 전용 | 파일 읽기, Grep | 아니오 | 해당 없음 |
| Bash 명령 | 셸 실행 | 예 | 프로젝트 디렉토리 및 명령당 영구적 |
| 파일 수정 | Edit/Write 파일 | 예 | 세션 종료까지 |

---

## 권한 관리

`/permissions`로 도구 권한을 관리한다.

- **Allow** 규칙: 수동 승인 없이 도구 사용 허용
- **Ask** 규칙: 사용 시마다 확인 요청
- **Deny** 규칙: 도구 사용 방지

**평가 순서**: deny -> ask -> allow (첫 번째 일치 규칙 우선, deny가 항상 최우선)

---

## 권한 모드

| 모드 | 설명 |
|:-----|:-----|
| `default` | 각 도구 처음 사용 시 권한 요청 |
| `acceptEdits` | 파일 편집 권한 자동 수락 |
| `plan` | 분석만 가능, 수정/명령 실행 불가 |
| `auto` | 배경 안전 검사로 도구 호출 자동 승인 (연구 미리보기) |
| `dontAsk` | 사전 승인 외 도구 자동 거부 |
| `bypassPermissions` | 보호 디렉토리 외 모든 권한 프롬프트 건너뛰기 |

> **주의**: `bypassPermissions`는 격리된 환경(컨테이너, VM)에서만 사용. `.git`, `.claude`, `.vscode`, `.idea` 쓰기는 여전히 확인 요청.

---

## 권한 규칙 구문

### 기본 형식

`Tool` 또는 `Tool(specifier)` 형식:

| 규칙 | 효과 |
|:-----|:-----|
| `Bash` | 모든 Bash 명령 일치 |
| `Bash(npm run build)` | 정확한 명령 일치 |
| `Bash(npm run *)` | npm run으로 시작하는 모든 명령 |
| `Read(./.env)` | 현재 디렉토리의 .env 파일 |
| `WebFetch(domain:example.com)` | 특정 도메인 가져오기 |

### 와일드카드 패턴

```json
{
  "permissions": {
    "allow": [
      "Bash(npm run *)",
      "Bash(git commit *)",
      "Bash(* --version)"
    ],
    "deny": [
      "Bash(git push *)"
    ]
  }
}
```

> `Bash(ls *)`는 `ls -la`와 일치하지만 `lsof`와는 불일치. `Bash(ls*)`는 둘 다 일치.

---

## 도구별 권한 규칙

### Bash

- `Bash(npm run build)` - 정확한 명령
- `Bash(npm run test *)` - 접두사 일치
- `Bash(* install)` - 접미사 일치
- `Bash(git * main)` - 중간 와일드카드
- 셸 연산자(`&&`) 인식: `Bash(safe-cmd *)`는 `safe-cmd && other-cmd` 실행 불허

### Read 및 Edit

gitignore 사양을 따르는 4가지 패턴 유형:

| 패턴 | 의미 | 예시 |
|:-----|:-----|:-----|
| `//path` | 파일 시스템 루트 절대 경로 | `Read(//Users/alice/secrets/**)` |
| `~/path` | 홈 디렉토리 경로 | `Read(~/Documents/*.pdf)` |
| `/path` | 프로젝트 루트 상대 경로 | `Edit(/src/**/*.ts)` |
| `path` / `./path` | 현재 디렉토리 상대 경로 | `Read(*.env)` |

> **주의**: Read/Edit deny 규칙은 기본 도구에만 적용. `cat .env` 같은 Bash 명령은 차단 불가. OS 수준 보호는 [샌드박싱](https://code.claude.com/docs/ko/sandboxing)을 사용.

### WebFetch

- `WebFetch(domain:example.com)` - 특정 도메인 가져오기

### MCP

- `mcp__puppeteer` - 서버의 모든 도구
- `mcp__puppeteer__puppeteer_navigate` - 특정 도구

### Agent (Subagents)

- `Agent(Explore)` - Explore subagent
- `Agent(my-custom-agent)` - 사용자 정의 subagent

```json
{
  "permissions": {
    "deny": ["Agent(Explore)"]
  }
}
```

---

## Hooks으로 권한 확장

PreToolUse hook으로 런타임 권한 평가:

- Hook `"allow"` 반환 후에도 deny/ask 규칙은 여전히 평가됨
- 종료 코드 2로 종료하는 hook은 allow 규칙보다 우선하여 도구 호출 차단

---

## 작업 디렉토리

기본 접근 범위 확장 방법:
- **시작 중**: `--add-dir <path>`
- **세션 중**: `/add-dir`
- **영구 구성**: 설정 파일의 `additionalDirectories`

---

## 권한과 샌드박싱 상호 작용

| 계층 | 대상 | 범위 |
|:-----|:-----|:-----|
| **권한** | Claude Code 도구 (Bash, Read, Edit, WebFetch, MCP 등) | 모든 도구 |
| **샌드박싱** | Bash 명령의 파일 시스템/네트워크 | Bash 명령 및 자식 프로세스만 |

심층 방어를 위해 둘 다 사용 권장.

---

## 관리형 설정

사용자/프로젝트 설정으로 재정의할 수 없는 관리형 설정:

| 설정 | 설명 |
|:-----|:-----|
| `allowManagedPermissionRulesOnly` | 관리형 설정의 권한 규칙만 적용 |
| `allowManagedHooksOnly` | 관리형/SDK hooks만 허용 |
| `allowManagedMcpServersOnly` | 관리형 MCP 서버만 허용 |
| `blockedMarketplaces` | 마켓플레이스 소스 차단 |
| `sandbox.network.allowManagedDomainsOnly` | 관리형 도메인만 허용 |
| `sandbox.filesystem.allowManagedReadPathsOnly` | 관리형 읽기 경로만 허용 |
| `strictKnownMarketplaces` | 플러그인 마켓플레이스 제한 |

---

## 자동 모드 분류기 구성

### 신뢰할 수 있는 인프라 정의 (`autoMode.environment`)

```json
{
  "autoMode": {
    "environment": [
      "Source control: github.example.com/acme-corp and all repos under it",
      "Trusted cloud buckets: s3://acme-build-artifacts, gs://acme-ml-datasets",
      "Trusted internal domains: *.corp.example.com",
      "Key internal services: Jenkins at ci.example.com"
    ]
  }
}
```

### 차단/허용 규칙 재정의

```json
{
  "autoMode": {
    "environment": ["..."],
    "allow": ["Deploying to staging namespace is allowed..."],
    "soft_deny": ["Never run database migrations outside the migrations CLI..."]
  }
}
```

> **위험**: `allow` 또는 `soft_deny` 설정 시 해당 섹션의 전체 기본 목록이 대체됨. `claude auto-mode defaults`로 기본값을 먼저 확인.

### CLI 검사 명령

```bash
claude auto-mode defaults   # 기본 제공 규칙 확인
claude auto-mode config     # 효과적인 구성 확인
claude auto-mode critique   # 사용자 정의 규칙 리뷰
```

---

## 설정 우선순위

1. **관리형 설정** (최고 우선순위, 재정의 불가)
2. **명령줄 인수**
3. **로컬 프로젝트 설정** (`.claude/settings.local.json`)
4. **공유 프로젝트 설정** (`.claude/settings.json`)
5. **사용자 설정** (`~/.claude/settings.json`)

> 도구가 어느 수준에서든 거부되면 다른 수준에서 허용 불가.
