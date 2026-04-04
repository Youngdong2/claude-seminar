# Skill Creator 테스트 프레임워크 - Test, Measure, and Improve

- **출처**: LinkedIn
- **작성자**: Goobong Jeong
- **링크**: https://www.linkedin.com/posts/gb-jeong_improving-skill-creator-test-measure-and-activity-7435085433027469313-NzXf
- **참고 자료**: https://claude.com/blog/improving-skill-creator-test-measure-and-refine-agent-skills

---

## 스킬의 두 가지 분류

| 분류 | 설명 | 수명 |
|------|------|------|
| **Capability Uplift** | 모델이 못 하는 것을 보완하는 스킬 | 모델 발전 시 소멸 |
| **Encoded Preference** | 팀의 작업 방식을 담은 스킬 | 모델 발전과 무관하게 유지 |

---

## 문제 인식

- 작성자는 30개 이상의 스킬을 매일 사용 (LinkedIn 글쓰기, 캘린더 관리, Slack 동기화, 미팅록 정리 등)
- 모델 업데이트 시 테스트 없이 스킬이 깨지는 문제 발생
- "되는 것 같다"가 아니라 "된다고 증명할 수 있다"로 전환 필요

---

## 평가 프레임워크 구조

```
skill-creator/
├── SKILL.md
├── scripts/
│   ├── run_eval.py
│   ├── run_loop.py
│   └── aggregate_benchmark.py
├── agents/
│   ├── analyzer.md
│   ├── comparator.md
│   └── grader.md
├── references/
└── eval-viewer/
```

---

## 동작 방식

1. `run_eval.py`가 스킬 설명을 등록
2. 쿼리별로 Claude 실행
3. 스킬 트리거 여부를 실시간 모니터링
4. 각 쿼리당 **3회씩 병렬 10개 프로세스**로 실행
5. 트리거율 산출

---

## 성과

- 공개 문서 생성 스킬 6개 중 5개의 트리거링 개선
- PDF 스킬의 텍스트 좌표 배치 버그 발견

---

## 핵심 메시지

> 스킬이 **코드에서 스펙으로** 진화하고 있다.
> "되는 것 같다"에서 "된다고 증명할 수 있다"로의 전환.
