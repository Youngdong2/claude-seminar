# How Anthropic Teams Use Claude Code

- **출처**: Claude 공식 블로그
- **링크**: https://claude.com/blog/how-anthropic-teams-use-claude-code
- **날짜**: 2025-07-24
- **카테고리**: Enterprise AI
- **참고 링크**:
  - Claude Code 제품 페이지: https://claude.com/product/claude-code
  - Claude 제품 개요: https://claude.com/product/overview
  - 영업 문의: https://claude.com/contact-sales

---

## 개요

Anthropic 내부 팀들이 Claude Code를 다양한 워크플로우에 어떻게 활용하는지 소개하는 포스트. 핵심 인사이트는 다음과 같다:

> "에이전틱 코딩은 단순히 전통적인 개발을 가속화하는 것이 아니라, **기술적 작업과 비기술적 작업 간의 경계를 해소**하고 있다."

가장 성공적인 구현은 Claude Code를 "코드 생성기가 아닌 **사고 파트너(thought partner)**"로 취급한다.

---

## 1. 코드베이스 탐색 및 이해 (Codebase Navigation and Understanding)

- 데이터 사이언티스트가 전체 코드베이스를 Claude Code에 제공하여 **빠른 온보딩**
- CLAUDE.md 파일을 읽고 **파이프라인 의존성 설명**
- Product Engineering 팀이 프로그래밍 작업의 **첫 번째 진입점(first stop)**으로 사용

---

## 2. 테스팅 및 코드 리뷰 (Testing and Code Review)

- Product Design 팀이 **GitHub Actions를 통한 PR 코멘트 자동화**
- Security Engineering 팀이 워크플로우를 혁신:
  - 기존: "설계 문서 -> 조잡한 코드 -> 리팩터 -> 포기"
  - 변경 후: **테스트 주도 개발(TDD)**
- Inference 팀이 **Rust 같은 익숙하지 않은 언어** 간 테스트 번역에 Claude 활용

---

## 3. 디버깅 및 트러블슈팅 (Debugging and Troubleshooting)

- Security Engineering: 진단 시간을 10~15분에서 **3배 빠르게** 단축
- Data Infrastructure 팀: 대시보드 스크린샷을 사용하여 **Kubernetes 파드 스케줄링 실패 진단**
- 시스템 장애 시 정확한 CLI 명령을 제공하여 **20분 절약**

---

## 4. 프로토타이핑 및 기능 개발 (Prototyping and Feature Development)

- Product Design 팀: Figma 파일을 Claude Code에 제공하여 **자율적 기능 구축**
- 데이터 사이언티스트: TypeScript 경험 없이도 **RL 모델 시각화를 위한 React 애플리케이션** 구축
- 설계 단계에서 에러 상태와 로직 플로우를 매핑하여 **엣지 케이스 식별**

---

## 5. 문서화 및 지식 관리 (Documentation and Knowledge Management)

- Inference 팀: ML 연구 시간을 **1시간에서 10~20분으로 단축** (80% 감소)
- Security Engineering: 여러 문서 소스에서 **마크다운 런북 생성**

---

## 6. 자동화 및 워크플로우 최적화 (Automation and Workflow Optimization)

- **Growth Marketing**: 수백 개의 광고가 포함된 CSV 파일을 처리하는 워크플로우 구축
- **Figma 플러그인** 개발: 카피를 교체하여 **최대 100개의 광고 변형 생성**
- **법무 팀**: 적절한 변호사와 연결하기 위한 프로토타입 **"전화 트리" 시스템** 생성

---

## 팀별 활용 요약

| 팀 | 주요 활용 |
|---|---|
| Product Engineering | 프로그래밍 작업의 첫 진입점 |
| Product Design | GitHub Actions PR 자동화, Figma 기반 기능 구축 |
| Security Engineering | TDD 도입, 디버깅 가속, 런북 생성 |
| Inference | 크로스 언어 테스트 번역, ML 연구 시간 단축 |
| Data Infrastructure | K8s 장애 진단, CLI 명령 생성 |
| Data Science | 코드베이스 온보딩, React 앱 구축 |
| Growth Marketing | 광고 CSV 처리, Figma 플러그인 개발 |
| Legal | 전화 트리 시스템 프로토타입 |

---

## 핵심 요약

1. Claude Code는 **코드 생성기가 아니라 사고 파트너**로 취급할 때 가장 효과적
2. **기술적/비기술적 작업의 경계가 해소**되고 있음
3. 다양한 부서(엔지니어링, 디자인, 마케팅, 법무)에서 **각자의 방식으로 활용**
4. 테스팅, 디버깅, 프로토타이핑에서 **의미 있는 시간 절약** 달성
5. 협업적 탐색과 빠른 프로토타이핑을 **강조하는 접근법이 성공적**
