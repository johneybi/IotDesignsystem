# Visual Consistency Rules

디자인 원칙(Tactile & Soft, Natural Motion)을 **실제 CSS**로 변환하는 규칙입니다.

## Neumorphic Shadow Standards

### Elevated (기본 상태 - 누름 전)

```css
box-shadow:
  6px 6px 12px rgba(0, 0, 0, 0.1),
  -6px -6px 12px rgba(255, 255, 255, 0.9);
```

**적용 대상:**

- `Button` (default)
- `BinaryDeviceCard` (default)
- `SliderThumb` (드래그 전)

---

### Pressed (활성 상태 - 누름 후)

```css
box-shadow:
  inset 3px 3px 6px rgba(0, 0, 0, 0.1),
  inset -3px -3px 6px rgba(255, 255, 255, 0.9);
```

**적용 대상:**

- `Button` (active)
- `BinaryDeviceCard` (isOn: true)
- `SliderThumb` (드래그 중)

---

### Ghost (비활성/오프라인)

```css
box-shadow: none;
opacity: 0.5;
filter: grayscale(100%);
border: 2px dashed var(--sys-color-border-ghost);
```

**적용 대상:**

- `BinaryDeviceCard` (isOnline: false)
- `Button` (disabled: true)

---

## Motion Standards

### Spring Animation (권장)

```css
transition: all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
```

**용도:**

- 버튼 클릭
- 카드 상태 전환
- 슬라이더 애니메이션

**이유:** 부드럽고 자연스러운 반동 효과

---

### Ease-out (빠른 시작, 느린 끝)

```css
transition: all 0.2s ease-out;
```

**용도:**

- 드래그 릴리스
- 모달 열기

---

### Linear Animation (금지)

```css
/* ❌ 사용 금지 */
transition: all 0.3s linear;
```

**이유:** 기계적이고 부자연스러움

---

## Color Gradient Standards

### Temperature Control (온도 조절)

```css
background: linear-gradient(
  90deg,
  #ffcd94 0%,
  /* Warm (따뜻함) */ #fff3e0 50%,
  /* Neutral (중립) */ #daf0ff 100% /* Cool (시원함) */
);
```

**토큰 사용:**

```css
background: var(--comp-slider-gradient-temperature);
```

---

### Air Conditioner (에어컨 전용)

```css
background: linear-gradient(
  180deg,
  #a8d8ff 0%,
  /* 시원한 파랑 */ #e8f4ff 100% /* 연한 파랑 */
);
```

**토큰 사용:**

```css
background: var(--sys-gradient-ac-cool);
```

---

### Light Brightness (조명 밝기)

```css
background: linear-gradient(
  180deg,
  var(--sys-color-status-active) 0%,
  var(--sys-color-status-inactive) 100%
);
```

---

## Border Radius Standards

```css
/* 카드 */
border-radius: var(--comp-card-radius); /* 24px */

/* 버튼 */
border-radius: var(--comp-button-radius); /* 16px */

/* 슬라이더 트랙 */
border-radius: 999px; /* 완전 둥글게 */

/* 입력 필드 */
border-radius: 12px;
```

---

## Typography Standards

### 디바이스 이름

```css
font-family: var(--sys-font-family-primary);
font-size: 18px;
font-weight: 600;
color: var(--sys-color-text-primary);
```

### 상태 텍스트

```css
font-size: 14px;
font-weight: 400;
color: var(--sys-color-text-secondary);
```

### 값 표시 (Readout)

```css
font-size: 32px;
font-weight: 700;
color: var(--sys-color-text-primary);
```

### 단위 표시

```css
font-size: 16px;
font-weight: 400;
color: var(--sys-color-text-tertiary);
```

---

## Opacity Standards

| 상태      | Opacity | 예시                       |
| --------- | ------- | -------------------------- |
| 활성      | 1.0     | `Button (active)`          |
| 비활성    | 0.4     | `Button (disabled)`        |
| 오프라인  | 0.5     | `BinaryDeviceCard (ghost)` |
| 호버      | 0.8     | `Chip (hover)`             |
| 드래그 중 | 0.9     | `SliderThumb (dragging)`   |

---

## 체크리스트

스타일 적용 시 확인:

- [ ] Neumorphic shadow 정확히 적용
- [ ] Spring animation 사용 (linear 금지)
- [ ] 그라데이션: 토큰 사용 또는 정의된 값 사용
- [ ] Border radius: 디자인 토큰 참조
- [ ] Typography: 토큰 기반 폰트 크기/굵기
- [ ] Opacity: 표준 값 사용
