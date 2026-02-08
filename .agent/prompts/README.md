# AI 프롬프트 가이드

이 디렉토리는 Flowthing 디자인 시스템에서 AI가 스마트홈 UI를 자동 생성할 때 참조하는 가이드를 포함합니다.

## 📁 구조

```
prompts/
├── README.md                    # 이 파일
├── prompt-strategy.md           # 전체 전략 가이드 (사용자용 참고)
├── composition-guide.md         # AI용: 컴포넌트 조합 프로세스
├── visual-rules.md              # AI용: 시각적 일관성 규칙
├── layout-spacing.md            # AI용: 레이아웃 & 간격 시스템
├── error-handling.md            # AI용: 예외 처리 가이드
├── localization.md              # AI용: 다국어 & 문자열 처리
└── state-management.md          # AI용: 상태 관리 패턴
```

## 🎯 가드레일 vs 프롬프트

| 구분           | 위치                 | 목적                                   | 예시                       |
| -------------- | -------------------- | -------------------------------------- | -------------------------- |
| **Guardrails** | `.agent/guardrails/` | ❌ **제약**: 무엇을 하지 말아야 하는가 | "색상 하드코딩 금지"       |
| **Prompts**    | `.agent/prompts/`    | ✅ **방법**: 어떻게 해야 하는가        | "온도 컴포넌트 생성 5단계" |

## 📖 AI 사용 가이드

AI가 UI를 생성할 때는 다음 순서로 문서를 참조하세요:

1. **`composition-guide.md`** - Matter 데이터 → UI 변환 프로세스
2. **Guardrails** (`.agent/guardrails/`) - 제약 규칙 확인
3. **`visual-rules.md`** - Neumorphic 스타일 적용
4. **`layout-spacing.md`** - 레이아웃 구조화
5. **`error-handling.md`** - 예외 상황 처리
6. **`state-management.md`** - 상태 관리 패턴 적용

## 👤 사용자 참고 자료

- **`prompt-strategy.md`**: 사용자가 AI에게 요청할 때 사용할 프롬프트 템플릿 포함

## 🔄 업데이트 이력

- 2026-02-09: 초기 프롬프트 시스템 구축
