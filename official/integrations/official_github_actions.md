# Claude Code GitHub Actions (공식 문서)

- **출처**: Claude Code 공식 문서
- **링크**: [https://code.claude.com/docs/ko/github-actions](https://code.claude.com/docs/ko/github-actions)
- **관련 링크**:
  - [Claude Code Action 저장소](https://github.com/anthropics/claude-code-action)
  - [Claude Code Action 보안 설명서](https://github.com/anthropics/claude-code-action/blob/main/docs/security.md)
  - [Claude Code Action 문서](https://github.com/anthropics/claude-code-action/blob/main/docs)
  - [예제 워크플로우 디렉토리](https://github.com/anthropics/claude-code-action/tree/main/examples)
  - [예제 claude.yml](https://github.com/anthropics/claude-code-action/blob/main/examples/claude.yml)
  - [Claude GitHub 앱 설치](https://github.com/apps/claude)
  - [Claude Agent SDK (Anthropic)](https://platform.claude.com/docs/en/agent-sdk/overview)
  - [GitHub Code Review](https://code.claude.com/docs/ko/code-review)
  - [Skills](https://code.claude.com/docs/ko/skills)
  - [Memory (CLAUDE.md)](https://code.claude.com/docs/ko/memory)
  - [설정](https://code.claude.com/docs/ko/settings)
  - [GitHub Actions 시크릿 사용법](https://docs.github.com/en/actions/security-guides/using-secrets-in-github-actions)
  - [GitHub Actions 청구](https://docs.github.com/en/billing/managing-billing-for-your-products/managing-billing-for-github-actions/about-billing-for-github-actions)
  - [Claude 가격 책정](https://claude.com/platform/api)
  - [AWS OIDC 설정](https://docs.aws.amazon.com/IAM/latest/UserGuide/id_roles_providers_create_oidc.html)
  - [Google Cloud Workload Identity Federation](https://cloud.google.com/iam/docs/workload-identity-federation)
  - [actions/create-github-app-token](https://github.com/actions/create-github-app-token)
  - [GitHub 앱 생성](https://github.com/settings/apps/new)

---

## 개요

Claude Code GitHub Actions는 GitHub 워크플로우에 AI 기반 자동화를 제공한다. PR이나 이슈에서 `@claude` 멘션으로 Claude가 코드를 분석하고, PR을 생성하고, 기능을 구현하고, 버그를 수정한다.

**주요 기능:**
- 즉시 PR 생성
- 자동화된 코드 구현 (이슈 -> 작동 코드)
- CLAUDE.md 지침 및 기존 코드 패턴 준수
- 간단한 설정 (설치 프로그램 + API 키)
- 기본적으로 안전 (코드는 GitHub 러너에 유지)

> 기본 모델: Sonnet. Opus 4.6 사용 시 [모델 파라미터](#작업-파라미터)에서 `claude-opus-4-6` 설정.

---

## 빠른 설정

```text
/install-github-app
```

터미널에서 Claude Code를 통해 설정하는 것이 가장 쉬운 방법이다.

> GitHub 앱 설치/시크릿 추가에는 저장소 관리자 권한 필요. Contents, Issues, Pull requests에 대한 읽기/쓰기 권한 요청.

---

## 수동 설정

1. **Claude GitHub 앱 설치**: [https://github.com/apps/claude](https://github.com/apps/claude)
   - Contents: 읽기 및 쓰기
   - Issues: 읽기 및 쓰기
   - Pull requests: 읽기 및 쓰기
2. **ANTHROPIC_API_KEY를 저장소 시크릿에 추가**
3. **워크플로우 파일 복사**: [examples/claude.yml](https://github.com/anthropics/claude-code-action/blob/main/examples/claude.yml) -> `.github/workflows/`

---

## 베타에서 업그레이드 (v1.0)

### 필수 변경 사항

| 이전 베타 입력 | 새 v1.0 입력 |
|:-------------|:------------|
| `mode` | 제거됨 (자동 감지) |
| `direct_prompt` | `prompt` |
| `override_prompt` | GitHub 변수가 있는 `prompt` |
| `custom_instructions` | `claude_args: --append-system-prompt` |
| `max_turns` | `claude_args: --max-turns` |
| `model` | `claude_args: --model` |
| `allowed_tools` | `claude_args: --allowedTools` |
| `disallowed_tools` | `claude_args: --disallowedTools` |
| `claude_env` | `settings` JSON 형식 |

### 이전/이후 예제

**베타:**
```yaml
- uses: anthropics/claude-code-action@beta
  with:
    mode: "tag"
    direct_prompt: "Review this PR for security issues"
    anthropic_api_key: ${{ secrets.ANTHROPIC_API_KEY }}
    custom_instructions: "Follow our coding standards"
    max_turns: "10"
    model: "claude-sonnet-4-6"
```

**GA (v1.0):**
```yaml
- uses: anthropics/claude-code-action@v1
  with:
    prompt: "Review this PR for security issues"
    anthropic_api_key: ${{ secrets.ANTHROPIC_API_KEY }}
    claude_args: |
      --append-system-prompt "Follow our coding standards"
      --max-turns 10
      --model claude-sonnet-4-6
```

---

## 예제 사용 사례

### 기본 워크플로우 (@claude 멘션 응답)

```yaml
name: Claude Code
on:
  issue_comment:
    types: [created]
  pull_request_review_comment:
    types: [created]
jobs:
  claude:
    runs-on: ubuntu-latest
    steps:
      - uses: anthropics/claude-code-action@v1
        with:
          anthropic_api_key: ${{ secrets.ANTHROPIC_API_KEY }}
```

### 코드 리뷰 (PR 열림/업데이트 시)

```yaml
name: Code Review
on:
  pull_request:
    types: [opened, synchronize]
jobs:
  review:
    runs-on: ubuntu-latest
    steps:
      - uses: anthropics/claude-code-action@v1
        with:
          anthropic_api_key: ${{ secrets.ANTHROPIC_API_KEY }}
          prompt: "Review this pull request for code quality, correctness, and security."
          claude_args: "--max-turns 5"
```

### 일일 리포트 (스케줄)

```yaml
name: Daily Report
on:
  schedule:
    - cron: "0 9 * * *"
jobs:
  report:
    runs-on: ubuntu-latest
    steps:
      - uses: anthropics/claude-code-action@v1
        with:
          anthropic_api_key: ${{ secrets.ANTHROPIC_API_KEY }}
          prompt: "Generate a summary of yesterday's commits and open issues"
          claude_args: "--model opus"
```

### 일반적인 @claude 사용

```text
@claude implement this feature based on the issue description
@claude how should I implement user authentication for this endpoint?
@claude fix the TypeError in the user dashboard component
```

---

## 작업 파라미터

| 파라미터 | 설명 | 필수 |
|:--------|:-----|:-----|
| `prompt` | Claude에 대한 지침 (텍스트 또는 skill 이름) | 아니오* |
| `claude_args` | Claude Code CLI 인수 | 아니오 |
| `anthropic_api_key` | Claude API 키 | 예** |
| `github_token` | GitHub 토큰 | 아니오 |
| `trigger_phrase` | 사용자 정의 트리거 (기본: "@claude") | 아니오 |
| `use_bedrock` | AWS Bedrock 사용 | 아니오 |
| `use_vertex` | Google Vertex AI 사용 | 아니오 |

\* 이슈/PR 댓글에서 생략 시 트리거 구문에 응답
\*\* 직접 API에 필수, Bedrock/Vertex에는 불필요

### 주요 CLI 인수 (`claude_args`)

```yaml
claude_args: "--max-turns 5 --model claude-sonnet-4-6 --mcp-config /path/to/config.json"
```

- `--max-turns`: 최대 대화 턴 (기본: 10)
- `--model`: 사용할 모델
- `--mcp-config`: MCP 구성 경로
- `--allowed-tools`: 허용 도구 목록
- `--debug`: 디버그 출력

---

## AWS Bedrock & Google Vertex AI 사용

### 필수 조건

**Google Cloud Vertex AI:**
1. Vertex AI 활성화된 GCP 프로젝트
2. Workload Identity Federation 구성
3. 필요 권한의 서비스 계정
4. GitHub 앱 (권장)

**AWS Bedrock:**
1. Bedrock 활성화된 AWS 계정
2. GitHub OIDC Identity Provider 구성
3. Bedrock 권한의 IAM 역할
4. GitHub 앱 (권장)

### AWS Bedrock 워크플로우

필수 GitHub 시크릿: `AWS_ROLE_TO_ASSUME`, `APP_ID`, `APP_PRIVATE_KEY`

```yaml
name: Claude PR Action
permissions:
  contents: write
  pull-requests: write
  issues: write
  id-token: write
on:
  issue_comment:
    types: [created]
  pull_request_review_comment:
    types: [created]
  issues:
    types: [opened, assigned]
jobs:
  claude-pr:
    if: |
      (github.event_name == 'issue_comment' && contains(github.event.comment.body, '@claude')) ||
      (github.event_name == 'pull_request_review_comment' && contains(github.event.comment.body, '@claude')) ||
      (github.event_name == 'issues' && contains(github.event.issue.body, '@claude'))
    runs-on: ubuntu-latest
    env:
      AWS_REGION: us-west-2
    steps:
      - name: Checkout repository
        uses: actions/checkout@v4
      - name: Generate GitHub App token
        id: app-token
        uses: actions/create-github-app-token@v2
        with:
          app-id: ${{ secrets.APP_ID }}
          private-key: ${{ secrets.APP_PRIVATE_KEY }}
      - name: Configure AWS Credentials (OIDC)
        uses: aws-actions/configure-aws-credentials@v4
        with:
          role-to-assume: ${{ secrets.AWS_ROLE_TO_ASSUME }}
          aws-region: us-west-2
      - uses: anthropics/claude-code-action@v1
        with:
          github_token: ${{ steps.app-token.outputs.token }}
          use_bedrock: "true"
          claude_args: '--model us.anthropic.claude-sonnet-4-6 --max-turns 10'
```

### Google Vertex AI 워크플로우

필수 GitHub 시크릿: `GCP_WORKLOAD_IDENTITY_PROVIDER`, `GCP_SERVICE_ACCOUNT`, `APP_ID`, `APP_PRIVATE_KEY`

```yaml
name: Claude PR Action
permissions:
  contents: write
  pull-requests: write
  issues: write
  id-token: write
on:
  issue_comment:
    types: [created]
  pull_request_review_comment:
    types: [created]
  issues:
    types: [opened, assigned]
jobs:
  claude-pr:
    if: |
      (github.event_name == 'issue_comment' && contains(github.event.comment.body, '@claude')) ||
      (github.event_name == 'pull_request_review_comment' && contains(github.event.comment.body, '@claude')) ||
      (github.event_name == 'issues' && contains(github.event.issue.body, '@claude'))
    runs-on: ubuntu-latest
    steps:
      - name: Checkout repository
        uses: actions/checkout@v4
      - name: Generate GitHub App token
        id: app-token
        uses: actions/create-github-app-token@v2
        with:
          app-id: ${{ secrets.APP_ID }}
          private-key: ${{ secrets.APP_PRIVATE_KEY }}
      - name: Authenticate to Google Cloud
        id: auth
        uses: google-github-actions/auth@v2
        with:
          workload_identity_provider: ${{ secrets.GCP_WORKLOAD_IDENTITY_PROVIDER }}
          service_account: ${{ secrets.GCP_SERVICE_ACCOUNT }}
      - uses: anthropics/claude-code-action@v1
        with:
          github_token: ${{ steps.app-token.outputs.token }}
          trigger_phrase: "@claude"
          use_vertex: "true"
          claude_args: '--model claude-sonnet-4@20250514 --max-turns 10'
        env:
          ANTHROPIC_VERTEX_PROJECT_ID: ${{ steps.auth.outputs.project_id }}
          CLOUD_ML_REGION: us-east5
          VERTEX_REGION_CLAUDE_3_7_SONNET: us-east5
```

---

## 모범 사례

### CLAUDE.md 구성

저장소 루트에 `CLAUDE.md` 파일을 생성하여 코드 스타일, 리뷰 기준, 프로젝트별 규칙 정의.

### 보안 고려 사항

- **API 키를 저장소에 직접 커밋하지 않기**
- 항상 GitHub Secrets 사용: `${{ secrets.ANTHROPIC_API_KEY }}`
- 작업 권한을 필요 최소한으로 제한
- 병합 전 Claude 제안 검토

### 성능 최적화

- 이슈 템플릿으로 컨텍스트 제공
- CLAUDE.md를 간결하게 유지
- 적절한 타임아웃 구성

### CI 비용

**GitHub Actions 비용:**
- GitHub 호스팅 러너에서 실행 -> Actions 분 소비
- [GitHub 청구 문서](https://docs.github.com/en/billing/managing-billing-for-your-products/managing-billing-for-github-actions/about-billing-for-github-actions) 참조

**API 비용:**
- 프롬프트/응답 길이에 따라 토큰 소비
- [Claude 가격 책정](https://claude.com/platform/api) 참조

**비용 최적화 팁:**
- 특정 `@claude` 명령 사용
- 적절한 `--max-turns` 설정
- 워크플로우 수준 타임아웃 설정
- GitHub 동시성 제어로 병렬 실행 제한

---

## 문제 해결

| 문제 | 확인 사항 |
|:-----|:---------|
| @claude 무응답 | GitHub 앱 설치, 워크플로우 활성화, API 키 시크릿 설정, `@claude` 사용 확인 |
| Claude 커밋에서 CI 미실행 | GitHub 앱 사용 확인, 워크플로우 트리거 확인, 앱 권한 확인 |
| 인증 오류 | API 키 유효성, Bedrock/Vertex 자격 증명, 시크릿 이름 확인 |

---

## Claude 동작 사용자 정의

1. **CLAUDE.md**: 코딩 표준, 리뷰 기준, 프로젝트 규칙
2. **사용자 정의 프롬프트**: 워크플로우 파일의 `prompt` 파라미터
