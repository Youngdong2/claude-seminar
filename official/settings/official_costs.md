# 비용을 효과적으로 관리하기 (공식 문서)

- **출처**: Claude Code 공식 문서
- **링크**: [https://code.claude.com/docs/ko/costs](https://code.claude.com/docs/ko/costs)
- **관련 링크**:
  - [워크스페이스 지출 한도 설정 (Anthropic)](https://platform.claude.com/docs/ko/build-with-claude/workspaces#workspace-limits)
  - [비용 및 사용량 보고서 (Anthropic)](https://platform.claude.com/docs/ko/build-with-claude/workspaces#usage-and-cost-tracking)
  - [Claude 가격 책정](https://claude.com/platform/api)
  - [Console 계정](https://platform.claude.com/login)
  - [LiteLLM - 키별 지출 추적](https://docs.litellm.ai/docs/proxy/virtual_keys#tracking-spend)
  - [LLM Gateway - LiteLLM 구성](https://code.claude.com/docs/ko/llm-gateway#litellm-configuration)
  - [에이전트 팀](https://code.claude.com/docs/ko/agent-teams)
  - [에이전트 팀 활성화](https://code.claude.com/docs/ko/agent-teams#enable-agent-teams)
  - [Subagents - 대량 작업 격리](https://code.claude.com/docs/ko/sub-agents#isolate-high-volume-operations)
  - [Subagents - 모델 선택](https://code.claude.com/docs/ko/sub-agents#choose-a-model)
  - [모델 구성](https://code.claude.com/docs/ko/model-config)
  - [노력 수준](https://code.claude.com/docs/ko/model-config#adjust-effort-level)
  - [MCP - 도구 검색](https://code.claude.com/docs/ko/mcp#scale-with-mcp-tool-search)
  - [Hooks](https://code.claude.com/docs/ko/hooks)
  - [Skills](https://code.claude.com/docs/ko/skills)
  - [CLAUDE.md (메모리)](https://code.claude.com/docs/ko/memory)
  - [설정](https://code.claude.com/docs/ko/settings)
  - [상태 줄 구성](https://code.claude.com/docs/ko/statusline#context-window-usage)
  - [Plan Mode](https://code.claude.com/docs/ko/common-workflows#use-plan-mode-for-safe-code-analysis)
  - [환경 변수](https://code.claude.com/docs/ko/env-vars)
  - [코드 인텔리전스 플러그인](https://code.claude.com/docs/ko/discover-plugins#code-intelligence)

---

## 비용 개요

- **평균 비용**: 개발자당 하루 $6
- **90% 사용자**: 일일 비용 $12 이하
- **팀 사용 (Sonnet 4.6)**: 개발자당 월 약 $100-200

비용은 코드베이스 크기, 쿼리 복잡도, 대화 길이에 따라 달라진다.

---

## 비용 추적

### `/cost` 명령

> `/cost`는 **API 토큰 사용량**을 표시하며 API 사용자를 위한 것. Claude Max/Pro 구독자는 `/stats`를 사용.

```text
Total cost:            $0.55
Total duration (API):  6m 19.7s
Total duration (wall): 6h 33m 10.2s
Total code changes:    0 lines added, 0 lines removed
```

---

## 팀 비용 관리

### 워크스페이스 지출 한도

- [워크스페이스 지출 한도 설정](https://platform.claude.com/docs/ko/build-with-claude/workspaces#workspace-limits)으로 전체 지출 제어
- Console에서 [비용 및 사용량 보고서](https://platform.claude.com/docs/ko/build-with-claude/workspaces#usage-and-cost-tracking) 확인

> Claude Code 첫 인증 시 "Claude Code" 워크스페이스가 자동 생성됨.

### Bedrock/Vertex/Foundry의 비용 추적

클라우드에서 메트릭을 전송하지 않음. [LiteLLM](https://docs.litellm.ai/docs/proxy/virtual_keys#tracking-spend)을 사용하여 키별 지출 추적 가능.

### 속도 제한 권장사항

| 팀 규모 | 사용자당 TPM | 사용자당 RPM |
|:--------|:-----------|:-----------|
| 1-5 사용자 | 200k-300k | 5-7 |
| 5-20 사용자 | 100k-150k | 2.5-3.5 |
| 20-50 사용자 | 50k-75k | 1.25-1.75 |
| 50-100 사용자 | 25k-35k | 0.62-0.87 |
| 100-500 사용자 | 15k-20k | 0.37-0.47 |
| 500+ 사용자 | 10k-15k | 0.25-0.35 |

> 팀 규모가 커질수록 동시 사용률이 낮아져 사용자당 TPM 감소.

### 에이전트 팀 토큰 비용

- 팀원에게 Sonnet 사용 권장
- 팀을 작게 유지 (토큰은 팀 규모에 비례)
- spawn 프롬프트를 집중적으로 유지
- 완료 후 팀 정리
- `CLAUDE_CODE_EXPERIMENTAL_AGENT_TEAMS=1`로 활성화

---

## 토큰 사용량 감소 전략

### 1. 컨텍스트를 사전에 관리하기

- `/cost`로 토큰 사용량 확인, [상태 줄](https://code.claude.com/docs/ko/statusline#context-window-usage)에 지속 표시
- **작업 간 `/clear` 사용**: 오래된 컨텍스트가 토큰 낭비
- **사용자 정의 compaction 지침**: `/compact Focus on code samples and API usage`

CLAUDE.md에서 compaction 동작 사용자 정의:

```markdown
# Compact instructions
When you are using compact, please focus on test output and code changes
```

### 2. 올바른 모델 선택

- **Sonnet**: 대부분의 코딩 작업 (Opus보다 저렴)
- **Opus**: 복잡한 아키텍처 결정, 다단계 추론
- **Haiku**: 간단한 subagent 작업 (`model: haiku`)
- `/model`로 세션 중 전환, `/config`에서 기본값 설정

### 3. MCP 서버 오버헤드 감소

- **CLI 도구 선호**: `gh`, `aws`, `gcloud` 등은 MCP보다 컨텍스트 효율적
- **미사용 서버 비활성화**: `/mcp`로 확인 후 비활성화
- **도구 검색 자동**: MCP 도구가 컨텍스트 10% 초과 시 자동 연기. `ENABLE_TOOL_SEARCH=auto:<N>`으로 임계값 조정

### 4. 코드 인텔리전스 플러그인 설치

[코드 인텔리전스 플러그인](https://code.claude.com/docs/ko/discover-plugins#code-intelligence)으로 정확한 기호 탐색 제공. 불필요한 파일 읽기를 줄여 토큰 절약.

### 5. Hooks와 Skills로 처리 오프로드

**Hook으로 데이터 전처리** (10,000줄 로그 -> 오류 줄만):

```json
{
  "hooks": {
    "PreToolUse": [
      {
        "matcher": "Bash",
        "hooks": [
          {
            "type": "command",
            "command": "~/.claude/hooks/filter-test-output.sh"
          }
        ]
      }
    ]
  }
}
```

```bash
#!/bin/bash
input=$(cat)
cmd=$(echo "$input" | jq -r '.tool_input.command')

if [[ "$cmd" =~ ^(npm test|pytest|go test) ]]; then
  filtered_cmd="$cmd 2>&1 | grep -A 5 -E '(FAIL|ERROR|error:)' | head -100"
  echo "{\"hookSpecificOutput\":{\"hookEventName\":\"PreToolUse\",\"permissionDecision\":\"allow\",\"updatedInput\":{\"command\":\"$filtered_cmd\"}}}"
else
  echo "{}"
fi
```

**Skill로 도메인 지식 제공**: 호출 시에만 로드되어 기본 컨텍스트를 작게 유지.

### 6. CLAUDE.md에서 Skills로 지침 이동

CLAUDE.md를 **필수 항목만 포함하여 약 500줄 이하**로 유지. 특화된 지침은 Skills로 이동.

### 7. 확장 사고 조정

- 기본 예산: 31,999 토큰 (사고 토큰은 출력 토큰으로 청구)
- `/effort`로 노력 수준 낮추기
- `/config`에서 사고 비활성화
- `MAX_THINKING_TOKENS=8000`으로 예산 축소

### 8. 자세한 작업을 Subagents에 위임

테스트 실행, 문서 가져오기, 로그 처리를 [subagents](https://code.claude.com/docs/ko/sub-agents#isolate-high-volume-operations)에 위임하여 요약만 반환.

### 9. 에이전트 팀 비용 관리

에이전트 팀은 plan mode에서 표준 세션보다 **약 7배** 더 많은 토큰 사용.

### 10. 구체적인 프롬프트 작성

- 나쁜 예: "이 코드베이스 개선" (광범위한 스캔)
- 좋은 예: "auth.ts의 로그인 함수에 입력 검증 추가" (최소 파일 읽기)

### 11. 복잡한 작업을 효율적으로 수행

- **Plan Mode 사용**: Shift+Tab으로 구현 전 계획
- **조기 방향 수정**: Escape으로 중지, `/rewind`로 복원
- **검증 대상 제공**: 테스트 케이스, 스크린샷, 예상 출력
- **증분적 테스트**: 한 파일 작성 -> 테스트 -> 계속

---

## 백그라운드 토큰 사용량

유휴 상태에서도 일부 토큰 사용:
- **대화 요약**: `claude --resume` 기능을 위한 백그라운드 작업
- **명령 처리**: `/cost` 같은 명령의 상태 확인

일반적으로 세션당 **$0.04 미만**.

---

## 버전 및 업데이트

- `claude --version`으로 현재 버전 확인
- 청구 질문: [Console 계정](https://platform.claude.com/login)을 통해 Anthropic 지원 문의
- 팀 배포: 작은 파일럿 그룹으로 시작하여 사용 패턴 설정
