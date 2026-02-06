# Token Enforcement

모든 스타일 값은 **W3C 디자인 토큰**을 사용해야 합니다.

## 필수 규칙

### ✅ 허용

```css
/* 토큰 참조 */
color: var(--sys-color-text-primary);
background: var(--comp-card-bg);
border-radius: var(--comp-card-radius);
```

### ❌ 금지

```css
/* 하드코딩 금지 */
color: #ffffff;
color: #1a1a1a;
background: rgba(255, 255, 255, 0.65);
border-radius: 24px;
```

## 토큰 계층

```
Reference (ref-) → System (sys-) → Component (comp-)
```

| 계층              | 용도          | 예시                        |
| ----------------- | ------------- | --------------------------- |
| `--ref-palette-*` | 원시 색상값   | `--ref-palette-orange-500`  |
| `--sys-color-*`   | 의미론적 색상 | `--sys-color-status-active` |
| `--comp-*`        | 컴포넌트 특화 | `--comp-card-bg`            |

## 새 색상 추가 절차

```
1. design-tokens.css에 토큰 정의
2. 적절한 계층에 배치 (ref → sys → comp)
3. 컴포넌트에서 토큰 참조
```

**예시:**

```css
/* 1. design-tokens.css */
--ref-palette-blue-500: #007aff;
--sys-color-status-cool: var(--ref-palette-blue-500);
--comp-ac-indicator-cool: var(--sys-color-status-cool);

/* 2. component.css */
.coolMode {
  color: var(--comp-ac-indicator-cool);
}
```

## 허용되는 예외

| 상황               | 허용                   | 이유                       |
| ------------------ | ---------------------- | -------------------------- |
| 투명도             | `rgba(0, 0, 0, 0.1)`   | 토큰에 alpha 추가 어려움   |
| 그라데이션 내 색상 | `linear-gradient(...)` | 토큰으로 정의 후 사용 권장 |
| SVG stroke         | `currentColor`         | 부모 색상 상속             |

## 검증 로직

```javascript
const FORBIDDEN_PATTERNS = [
  /#[0-9A-Fa-f]{3,8}/g, // hex colors
  /rgb\s*\([^)]+\)/g, // rgb()
  /rgba\s*\([^)]+\)/g, // rgba() - 예외 처리 필요
  /hsl\s*\([^)]+\)/g, // hsl()
];

function validateTokenUsage(cssContent) {
  const errors = [];

  for (const pattern of FORBIDDEN_PATTERNS) {
    const matches = cssContent.match(pattern);
    if (matches) {
      matches.forEach((match) => {
        // 예외: 투명도 관련 rgba(0,0,0,*) 허용
        if (!match.includes("0, 0, 0") && !match.includes("255, 255, 255")) {
          errors.push(`하드코딩 색상 발견: ${match}`);
        }
      });
    }
  }

  return errors;
}
```
