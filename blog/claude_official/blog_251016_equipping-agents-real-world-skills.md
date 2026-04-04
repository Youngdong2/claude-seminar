# Equipping Agents for the Real World with Agent Skills

- **출처**: Claude 공식 블로그 (Engineering)
- **링크**: https://claude.com/blog/equipping-agents-for-the-real-world-with-agent-skills
- **날짜**: 2025-10-16
- **카테고리**: Claude Code, Agents
- **참고 링크**:
  - [Agent Skills Documentation](https://docs.claude.com/en/docs/agents-and-tools/agent-skills/overview)
  - [Claude Cookbooks - Skills](https://github.com/anthropics/claude-cookbooks/tree/main/skills)
  - [GitHub Skills Repository - PDF Skill Example](https://github.com/anthropics/skills/tree/main/document-skills/pdf)
  - [AgentSkills.io (Open Standard)](https://agentskills.io/)
  - [Model Context Protocol](https://modelcontextprotocol.io/)
  - [Claude's Document Editing Abilities](https://www.anthropic.com/news/create-files)
  - [Agent Skills Announcement](https://www.anthropic.com/news/skills)

---

## 개요

Agent Skills는 지시사항, 스크립트, 리소스를 포함하는 **조직화된 폴더**를 통해 전문화된 AI 에이전트를 구축하는 새로운 접근 방식이다. 에이전트가 동적으로 발견하고 로드할 수 있으며, 범용 에이전트를 도메인 특화 도구로 변환한다. 절차적 지식을 조합 가능하고 재사용 가능한 리소스로 패키징한다.

## 1. Agent Skills란?

- Skill = **`SKILL.md` 파일을 포함하는 디렉토리**
- 지시사항, 스크립트, 리소스를 번들링
- 신입 직원용 온보딩 가이드를 만드는 것에 비유
- 각 사용 사례마다 완전히 새로운 커스텀 시스템을 구축할 필요 없이 에이전트를 전문화

## 2. Skill의 구조 (Anatomy of a Skill)

### SKILL.md 파일 구성

모든 Skill은 **YAML frontmatter**로 시작하는 `SKILL.md` 파일이 필수:

```yaml
---
name: "skill-name"
description: "What this skill does"
---
```

### 필수 메타데이터
- `name`: 스킬 식별자
- `description`: 스킬 기능 설명

## 3. Progressive Disclosure (점진적 공개) 원칙

잘 조직된 매뉴얼과 유사: 목차 -> 특정 장(chapter) -> 상세 부록(appendix)

### 3단계 공개 구조

| 단계 | 내용 | 로드 시점 |
|------|------|-----------|
| **1단계 (메타데이터)** | name, description (YAML frontmatter) | 시스템 프롬프트에 시작 시 로드 |
| **2단계 (SKILL.md 본문)** | 스킬의 핵심 지시사항 | Claude가 관련성을 판단했을 때 |
| **3단계+ (번들 파일)** | 추가 참조 파일 | 필요할 때만 선택적 접근 |

**핵심 장점**: 파일시스템과 코드 실행 역량을 가진 에이전트는 특정 작업 수행 시 스킬 전체를 컨텍스트 윈도우에 넣을 필요 없음. 따라서 **스킬 크기는 사실상 무제한**.

## 4. 컨텍스트 윈도우 통합 흐름

```
1. 컨텍스트 윈도우 초기화
   ├── 핵심 시스템 프롬프트
   ├── 설치된 스킬 메타데이터
   └── 사용자 메시지
       ↓
2. Claude가 관련 스킬 트리거
   └── 도구 호출로 SKILL.md 내용 읽기
       ↓
3. Claude가 번들 파일 선택적 읽기
   └── 필요한 추가 파일만 로드
       ↓
4. 로드된 스킬 지시사항으로 작업 수행
```

## 5. Skills 내 코드 실행

- Skills에 **Claude가 재량에 따라 실행할 수 있는 코드** 포함 가능
- LLM이 많은 작업에 뛰어나지만, 특정 작업은 전통적 코드 실행이 더 적합
  - 예: 리스트 정렬을 프로그래밍으로 수행하면 토큰 기반 생성보다 **비용이 훨씬 적음**

### PDF Skill 예시
- 사전 작성된 Python 스크립트로 PDF 양식 필드 추출
- Claude가 스크립트나 PDF를 컨텍스트에 로드하지 않고 실행
- **일관되고, 반복 가능하며, 결정론적인** 워크플로우 보장

## 6. 개발 및 평가 가이드라인

### 시작점
- **격차 식별**: 대표적 작업에서 에이전트를 실행하고, 어려움을 겪거나 추가 컨텍스트가 필요한 부분 관찰
- **점진적 구축**: 반복적 스킬 개발로 부족한 부분 해결

### 구조적 모범 사례

| 원칙 | 설명 |
|------|------|
| **규모 관리** | SKILL.md가 다루기 어려워지면, 별도 파일로 분리하고 명확한 참조 추가 |
| **상호 배타성 고려** | 드물게 결합되는 컨텍스트는 분리하여 토큰 사용 감소 |
| **전략적 코드 활용** | 코드는 실행 도구와 문서의 이중 역할 - Claude가 실행할지 참조로 읽을지 명확히 구분 |

### 반복적 개발

| 단계 | 내용 |
|------|------|
| **실제 사용 모니터링** | Claude가 스킬을 실제로 어떻게 사용하는지 관찰. 예상치 못한 궤적이나 특정 컨텍스트 과의존 주목 |
| **메타데이터 개선** | name과 description 필드에 특별히 주의 - Claude가 스킬 활성화 여부 결정에 사용 |
| **자기 성찰** | Claude에게 성공적 접근법과 일반적 실수를 재사용 가능한 컨텍스트와 코드로 포착하도록 요청 |

## 7. 보안 고려사항

Skills는 지시사항과 코드를 통해 Claude의 역량을 확장하지만, 악의적 스킬은 취약점 도입, 데이터 유출, 의도치 않은 행동을 유발할 수 있다.

### 권장 사항
- **신뢰할 수 있는 출처**의 스킬만 설치
- 신뢰도가 낮은 스킬은 사용 전 **철저히 감사**
- 번들 파일 내용을 검토하여 기능 이해
- 코드 의존성과 **외부 리소스에 특별히 주의**
- 신뢰할 수 없는 외부 네트워크 소스에 연결하도록 지시하는 내용 검토

## 8. 현재 지원 및 향후 방향

### 현재 지원 플랫폼
- Claude.ai
- Claude Code
- Claude Agent SDK
- Claude Developer Platform

### 향후 로드맵

| 영역 | 계획 |
|------|------|
| **스킬 라이프사이클** | 생성, 편집, 발견, 공유, 사용의 전체 라이프사이클 지원 확대 |
| **MCP 통합** | MCP 서버와의 통합으로 외부 도구/소프트웨어 관련 복잡한 워크플로우 학습 가능 |
| **자율 스킬 생성** | 에이전트가 자율적으로 Skills를 생성, 편집, 평가. 자체 행동 패턴을 재사용 가능한 역량으로 코드화 |

### 오픈 스탠다드 (2025-12-18 업데이트)
- Agent Skills가 **크로스 플랫폼 이식성**을 위한 오픈 스탠다드로 발표
- 사이트: [agentskills.io](https://agentskills.io/)

---

*작성자: Barry Zhang, Keith Lazuka, Mahesh Murag*
