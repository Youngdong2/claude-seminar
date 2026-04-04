# Building Agents with Skills: Equipping Agents for Specialized Work

- **출처**: Claude 공식 블로그
- **링크**: https://claude.com/blog/building-agents-with-skills-equipping-agents-for-specialized-work
- **날짜**: 2026-01-22
- **카테고리**: Agents, Claude Code
- **참고 링크**:
  - [Claude Code Launch Announcement](https://www.anthropic.com/news/claude-3-7-sonnet)
  - [Claude Agent SDK](https://www.anthropic.com/engineering/building-agents-with-the-claude-agent-sdk)
  - [Agent Skills Engineering Post](https://www.anthropic.com/engineering/equipping-agents-for-the-real-world-with-agent-skills)
  - [Public Skills Repository](https://github.com/anthropics/skills/tree/main/skills/public)
  - [K-Dense Scientific Skills](https://github.com/K-Dense-AI/claude-scientific-skills)
  - [Browserbase Agent Browse](https://github.com/browserbase/agent-browse)
  - [Notion Skills for Claude](https://www.notion.so/notiondevs/Notion-Skills-for-Claude-28da4445d27180c7af1df7d8615723d0)
  - [Skills and MCP Blog Post](https://claude.com/blog/extending-claude-capabilities-with-skills-mcp-servers)
  - [Financial Services Announcement](https://www.anthropic.com/news/claude-for-financial-services)
  - [Healthcare Life Sciences Announcement](https://www.anthropic.com/news/healthcare-life-sciences)
  - [YouTube: Don't Build Agents, Build Skills Instead](https://youtu.be/CEvIs9y1uog?si=yhYQH-ZTX0DfNdtm)
  - [Skills Documentation](https://platform.claude.com/docs/en/agents-and-tools/agent-skills/overview)
  - [Skills Cookbook](https://platform.claude.com/cookbook/skills-notebooks-01-skills-introduction)
  - [Using Skills in Claude](https://support.claude.com/en/articles/12512180-using-skills-in-claude)
  - [Skills API Quickstart](https://platform.claude.com/docs/en/build-with-claude/skills-guide)
  - [Skills Best Practices](https://platform.claude.com/docs/en/agents-and-tools/agent-skills/best-practices)
  - [AgentSkills.io (Open Standard)](https://agentskills.io)

---

## 개요

Skills는 도메인 전문 지식을 조직화된 파일 컬렉션으로 패키징하여, 범용 에이전트를 실제 업무를 위한 전문가 에이전트로 변환하는 접근 방식이다.

## 1. 새로운 패러다임: Code as Interface

- 업계는 초기에 도메인별 에이전트(코딩, 리서치, 금융, 마케팅 등)를 각각 구축하려 했으나, 모델 지능이 향상되면서 **수렴(convergence)** 현상이 발생
- **"Claude Code is a coding agent, but also a general-purpose agent that happens to work through code."**
- 코드를 범용 인터페이스로 사용하면 API 호출, 파일시스템 데이터 저장, Python 분석, 인사이트 종합 등 모든 디지털 작업이 가능

## 2. 누락된 조각: 도메인 전문성

- 에이전트는 뛰어난 추론 능력을 보유하지만, 축적된 전문 지식이 부족
- **세금 신고 비유**: "세금 신고를 맡기고 싶은 사람은? 원리부터 파악하는 수학 천재 vs. 수천 건을 처리한 경험 있는 세무 전문가?"
- Skills는 절차적 지식(procedural knowledge)을 에이전트가 점진적으로 접근하고 적용할 수 있는 형식으로 패키징

## 3. Agent Skills 구조

### 기본 디렉토리 구조

```
anthropic_brand/
├── SKILL.md
├── docs.md
├── slide-decks.md
└── apply_template.py
```

### Progressive Disclosure (점진적 공개)

Skills는 컨텍스트 윈도우를 효율적으로 관리하기 위해 점진적 공개 방식을 사용:

| 단계 | 내용 | 토큰 사용량 |
|------|------|-------------|
| **런타임 초기** | 메타데이터만 노출 (YAML frontmatter의 name, description) | ~50 토큰 |
| **필요 시** | 전체 SKILL.md 읽기 | ~500 토큰 |
| **상세 필요 시** | 참조 파일 온디맨드 로드 | 2,000+ 토큰 |

## 4. 세 가지 Skill 카테고리

### Foundational Skills (기초 스킬)
- 모든 사용자가 필요로 하는 핵심 역량
- 문서, 스프레드시트, 프레젠테이션 조작 및 모범 사례

### Partner Skills (파트너 스킬)
- 기업들이 자사 서비스를 에이전트 접근 가능하게 만드는 스킬
- **K-Dense**: 과학 연구 스킬
- **Browserbase**: 에이전트 브라우징
- **Notion**: 노션 통합 스킬

### Enterprise Skills (기업 스킬)
- 조직 내부 프로세스, 컴플라이언스 요구사항, 기관 지식을 인코딩하는 독자적 스킬

## 5. Scripts as Tools (스크립트를 도구로)

전통적인 도구 지침 대신, Skills는 실행 가능한 스크립트를 포함한다:

```python
# anthropic/brand_styling/apply_template.py
import sys
from pptx import Presentation

if len(sys.argv) != 2:
    print("USAGE: apply_template.py <pptx>")
    sys.exit(1)

prs = Presentation(sys.argv[1])
for slide in prs.slides:
    ...
```

## 6. 주요 트렌드

### 복잡성 증가
- Skills 진화: 단순 문서(~100줄) -> 정교한 워크플로우(2,500+줄)로 발전
- 다중 도구를 조율하는 수준까지 발전

### Skills와 MCP 통합
- Skills와 MCP 서버가 자연스럽게 함께 작동
- 웹 검색, 내부 데이터베이스, 메시징 이력, 문서 협업을 결합

### 비개발자 채택
- 프로덕트 매니저, 분석가, 도메인 전문가가 인터랙티브 도구를 사용해 스킬 생성
- **첫 스킬을 30분 이내에 구축 가능**

## 7. 완전한 에이전트 아키텍처

4계층 아키텍처:

```
┌─────────────────────────────┐
│  1. Agent Loop              │  핵심 추론 시스템 (다음 행동 결정)
├─────────────────────────────┤
│  2. Agent Runtime           │  실행 환경 (코드, 파일시스템)
├─────────────────────────────┤
│  3. MCP Servers             │  외부 도구 및 데이터 소스 연결
├─────────────────────────────┤
│  4. Skills Library          │  도메인 전문성 및 절차적 지식
└─────────────────────────────┘
```

## 8. 도메인별 배포 사례

### 금융 서비스 Skills
- DCF 모델 빌더 (WACC 계산 포함)
- 비교 기업 분석 (멀티플 기반)
- 실적 분석 (분기별)
- 커버리지 개시 리서치 보고서
- M&A 실사(Due Diligence) 분석
- 고객 프레젠테이션용 피치 자료

### 헬스케어 & 생명과학 Skills
- 생물정보학 번들 (scVI-tools, Nextflow)
- 임상시험 프로토콜 생성
- 과학적 문제 선택 보조
- FHIR 개발 (의료 상호운용성)
- 사전 승인(Prior Authorization) 검토

## 9. 표준화

- Agent Skills는 MCP와 유사하게 **오픈 스탠다드**로 발표
- **"동일한 스킬이 Claude든 다른 AI 플랫폼이든 작동해야 한다"** - 다양한 AI 시스템 간 이식성(portability) 확보
- 표준 사이트: [agentskills.io](https://agentskills.io)

---

*작성자: Barry Zhang, Mahesh Murag, Keith Lazuka, Ryan Whitehead*
