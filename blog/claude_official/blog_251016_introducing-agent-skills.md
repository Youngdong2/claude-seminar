# Introducing Agent Skills

- **출처**: Claude 공식 블로그
- **링크**: https://claude.com/blog/skills
- **날짜**: 2025-10-16
- **카테고리**: Product announcements
- **참고 링크**:
  - [Developer Documentation](https://docs.claude.com/en/docs/agents-and-tools/agent-skills/overview)
  - [Skills Cookbook](https://platform.claude.com/cookbook/skills-notebooks-01-skills-introduction)
  - [Anthropic Academy](https://www.anthropic.com/learn/build-with-claude)
  - [Engineering Blog - Equipping Agents](https://www.anthropic.com/engineering/equipping-agents-for-the-real-world-with-agent-skills)

---

## 개요

Claude가 **Skills**를 지원하기 시작했다. Skills란 지시사항, 스크립트, 리소스가 담긴 전문화된 폴더로, 작업 수행 능력을 향상시킨다. **"Claude는 작업과 관련이 있을 때만 스킬에 접근한다."**

## 1. Skills 작동 방식

자동 스캐닝과 선택적 로딩을 통해 작동:

| 특성 | 설명 |
|------|------|
| **Composable (조합 가능)** | 복잡한 작업을 위해 다중 스킬이 조율 |
| **Portable (이식 가능)** | Claude 앱, Claude Code, API 전반에서 일관된 형식 |
| **Efficient (효율적)** | 최소한의 정보만 온디맨드 로드 |
| **Powerful (강력)** | 신뢰성을 위한 실행 가능 코드 포함 가능 |

## 2. 제품별 가용성

### Claude Apps
- **대상**: Pro, Max, Team, Enterprise 사용자
- **기본 제공 스킬**: 일반적인 작업을 위한 빌트인 스킬
- **커스텀 스킬 생성**: 인터랙티브 "skill-creator" 스킬 제공
  - 폴더 구조와 포맷팅을 자동 처리
  - 수동 파일 편집 불필요
- **활성화**: Settings에서 Skills 활성화
- **Team/Enterprise**: 관리자가 먼저 조직 전체 접근을 활성화해야 함

### Claude Developer Platform (API)
- Messages API 요청 및 새로운 **`/v1/skills` 엔드포인트**와 통합
- **Code Execution Tool 베타** 필요
- Anthropic 제공 스킬:
  - Excel
  - PowerPoint
  - Word
  - Fillable PDFs
- 특정 사용 사례를 위한 커스텀 스킬 생성 가능
- **Claude Console**을 통한 관리

## 3. 업데이트 사항 (2025-12-18)

- 조직 전체 스킬 관리 기능
- 파트너 빌트 스킬 디렉토리
- **Agent Skills 오픈 스탠다드** 발표
