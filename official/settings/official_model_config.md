# 모델 구성 (공식 문서)

- **출처**: Claude Code 공식 문서
- **링크**: [https://code.claude.com/docs/ko/model-config](https://code.claude.com/docs/ko/model-config)
- **관련 링크**:
  - [모델 개요 (Anthropic)](https://platform.claude.com/docs/ko/about-claude/models/overview)
  - [100만 토큰 컨텍스트 윈도우](https://platform.claude.com/docs/ko/build-with-claude/context-windows#1m-token-context-window)
  - [노력 수준 (Anthropic)](https://platform.claude.com/docs/ko/build-with-claude/effort)
  - [Prompt Caching (Anthropic)](https://platform.claude.com/docs/ko/build-with-claude/prompt-caching)
  - [추가 사용 (Claude Plans)](https://support.claude.com/en/articles/12429409-extra-usage-for-paid-claude-plans)
  - [환경 변수](https://code.claude.com/docs/ko/env-vars)
  - [설정 파일](https://code.claude.com/docs/ko/settings)
  - [설정 우선순위](https://code.claude.com/docs/ko/settings#settings-precedence)
  - [Subagents](https://code.claude.com/docs/ko/sub-agents)
  - [Subagent - 모델 선택](https://code.claude.com/docs/ko/sub-agents#supported-frontmatter-fields)
  - [Skills](https://code.claude.com/docs/ko/skills)
  - [Skills - Frontmatter 참조](https://code.claude.com/docs/ko/skills#frontmatter-reference)
  - [비용 관리 - 백그라운드 토큰](https://code.claude.com/docs/ko/costs#background-token-usage)
  - [상태 줄](https://code.claude.com/docs/ko/statusline)
  - [Amazon Bedrock](https://code.claude.com/docs/ko/amazon-bedrock)
  - [Google Vertex AI](https://code.claude.com/docs/ko/google-vertex-ai)
  - [Microsoft Foundry](https://code.claude.com/docs/ko/microsoft-foundry)
  - [LLM Gateway - LiteLLM](https://code.claude.com/docs/ko/llm-gateway#litellm-configuration)

---

## 사용 가능한 모델

Claude Code의 `model` 설정에서 **모델 별칭** 또는 **모델 이름**을 구성할 수 있다.

### 모델 별칭

| 별칭 | 동작 |
|:-----|:-----|
| **`default`** | 계정 유형에 따른 권장 모델 |
| **`sonnet`** | 최신 Sonnet 모델 (현재 Sonnet 4.6) - 일일 코딩 작업 |
| **`opus`** | 최신 Opus 모델 (현재 Opus 4.6) - 복잡한 추론 |
| **`haiku`** | 빠르고 효율적인 Haiku 모델 - 간단한 작업 |
| **`sonnet[1m]`** | 100만 토큰 컨텍스트의 Sonnet |
| **`opus[1m]`** | 100만 토큰 컨텍스트의 Opus |
| **`opusplan`** | Plan Mode에서 opus, 실행 시 sonnet 자동 전환 |

별칭은 항상 최신 버전을 가리킨다. 특정 버전 고정은 전체 모델 이름(예: `claude-opus-4-6`)을 사용한다.

---

## 모델 설정 방법 (우선순위 순)

1. **세션 중**: `/model <alias|name>`
2. **시작 시**: `claude --model <alias|name>`
3. **환경 변수**: `ANTHROPIC_MODEL=<alias|name>`
4. **설정 파일**: `model` 필드

```bash
# Opus로 시작
claude --model opus

# 세션 중 Sonnet으로 전환
/model sonnet
```

설정 파일:

```json
{
  "permissions": {},
  "model": "opus"
}
```

---

## 모델 선택 제한 (엔터프라이즈)

`availableModels`로 사용자가 선택할 수 있는 모델을 제한:

```json
{
  "availableModels": ["sonnet", "haiku"]
}
```

- Default 옵션은 `availableModels`에 영향받지 않음 (항상 사용 가능)
- `availableModels: []`인 경우에도 기본 모델 사용 가능

### 사용자 실행 모델 완전 제어

```json
{
  "model": "sonnet",
  "availableModels": ["sonnet", "haiku"]
}
```

### 병합 동작

여러 수준에서 `availableModels` 설정 시 배열이 병합/중복 제거됨. 엄격한 허용 목록은 관리형/정책 설정에서 설정.

---

## 특수 모델 동작

### `default` 모델

| 계정 유형 | 기본 모델 |
|:---------|:---------|
| Max 및 Team Premium | Opus 4.6 |
| Pro 및 Team Standard | Sonnet 4.6 |
| Enterprise | Opus 4.6 사용 가능하지만 기본값 아님 |

Opus 사용 임계값 도달 시 자동으로 Sonnet으로 폴백 가능.

### `opusplan` 모델

- **Plan Mode에서**: 복잡한 추론/아키텍처 결정에 `opus` 사용
- **실행 모드에서**: 코드 생성/구현에 자동으로 `sonnet` 전환
- 두 가지 장점을 결합: Opus의 추론 + Sonnet의 효율성

---

## 노력 수준 조정

적응형 추론을 제어하며, 작업 복잡도에 따라 동적으로 사고를 할당한다.

| 수준 | 특성 |
|:-----|:-----|
| **low** | 간단한 작업, 빠르고 저렴 |
| **medium** | 기본값 (Opus 4.6, Sonnet 4.6). 대부분의 코딩 작업 권장 |
| **high** | 복잡한 문제에 깊은 추론 |
| **max** | 가장 깊은 추론 (Opus 4.6만, 세션 유지 안 됨) |

### 노력 수준 설정 방법

- **`/effort`**: `/effort low`, `/effort medium`, `/effort high`, `/effort max`, `/effort auto`
- **`/model`**: 모델 선택 시 좌우 화살표로 노력 슬라이더 조정
- **`--effort` 플래그**: `claude --effort high`
- **환경 변수**: `CLAUDE_CODE_EFFORT_LEVEL=high`
- **설정 파일**: `effortLevel: "high"`
- **Skill/Subagent frontmatter**: `effort` 필드

우선순위: 환경 변수 > 구성된 수준 > 모델 기본값

일회성 깊은 추론: 프롬프트에 **"ultrathink"** 포함 시 해당 턴에 높은 노력 트리거.

적응형 추론 비활성화: `CLAUDE_CODE_DISABLE_ADAPTIVE_THINKING=1`

---

## 확장 컨텍스트 (100만 토큰)

Opus 4.6 및 Sonnet 4.6에서 100만 토큰 컨텍스트 윈도우 지원.

### 플랜별 가용성

| 플랜 | Opus 4.6 1M | Sonnet 4.6 1M |
|:-----|:------------|:--------------|
| Max, Team, Enterprise | 구독 포함 | 추가 사용 필요 |
| Pro | 추가 사용 필요 | 추가 사용 필요 |
| API 및 종량제 | 전체 액세스 | 전체 액세스 |

### 사용 방법

```bash
/model opus[1m]
/model sonnet[1m]
/model claude-opus-4-6[1m]
```

비활성화: `CLAUDE_CODE_DISABLE_1M_CONTEXT=1`

---

## 현재 모델 확인

1. [상태 줄](https://code.claude.com/docs/ko/statusline) (구성된 경우)
2. `/status` (계정 정보 포함)

---

## 사용자 정의 모델 옵션 추가

`ANTHROPIC_CUSTOM_MODEL_OPTION`으로 `/model` 선택기에 사용자 정의 항목 추가:

```bash
export ANTHROPIC_CUSTOM_MODEL_OPTION="my-gateway/claude-opus-4-6"
export ANTHROPIC_CUSTOM_MODEL_OPTION_NAME="Opus via Gateway"
export ANTHROPIC_CUSTOM_MODEL_OPTION_DESCRIPTION="Custom deployment routed through the internal LLM gateway"
```

---

## 환경 변수

| 환경 변수 | 설명 |
|:---------|:-----|
| `ANTHROPIC_DEFAULT_OPUS_MODEL` | `opus` 또는 Plan Mode의 `opusplan`에 사용할 모델 |
| `ANTHROPIC_DEFAULT_SONNET_MODEL` | `sonnet` 또는 실행 모드의 `opusplan`에 사용할 모델 |
| `ANTHROPIC_DEFAULT_HAIKU_MODEL` | `haiku` 또는 백그라운드 기능에 사용할 모델 |
| `CLAUDE_CODE_SUBAGENT_MODEL` | subagents에 사용할 모델 |

### 타사 배포를 위한 모델 고정

Bedrock, Vertex AI, Foundry를 통해 배포 시 **반드시** 모델 버전을 고정해야 한다:

```bash
# Bedrock 예시
export ANTHROPIC_DEFAULT_OPUS_MODEL='us.anthropic.claude-opus-4-6-v1'
# Vertex AI 예시
export ANTHROPIC_DEFAULT_OPUS_MODEL='claude-opus-4-6'
```

> 고정하지 않으면 Claude Code 업데이트로 사용자가 중단될 수 있음.

확장 컨텍스트 활성화:

```bash
export ANTHROPIC_DEFAULT_OPUS_MODEL='claude-opus-4-6[1m]'
```

### 버전별 모델 ID 재정의 (`modelOverrides`)

개별 모델 ID를 제공자별 문자열에 매핑:

```json
{
  "modelOverrides": {
    "claude-opus-4-6": "arn:aws:bedrock:us-east-2:123456789012:application-inference-profile/opus-prod",
    "claude-sonnet-4-6": "arn:aws:bedrock:us-east-2:123456789012:application-inference-profile/sonnet-prod"
  }
}
```

---

## Prompt Caching 구성

Claude Code는 자동으로 prompt caching을 사용한다. 비활성화 옵션:

| 환경 변수 | 설명 |
|:---------|:-----|
| `DISABLE_PROMPT_CACHING` | 모든 모델에 대해 비활성화 (모델별 설정보다 우선) |
| `DISABLE_PROMPT_CACHING_HAIKU` | Haiku 모델만 비활성화 |
| `DISABLE_PROMPT_CACHING_SONNET` | Sonnet 모델만 비활성화 |
| `DISABLE_PROMPT_CACHING_OPUS` | Opus 모델만 비활성화 |
