# Layout & Spacing System

컴포넌트 간 간격, 정렬, 그리드 규칙을 정의합니다.

## Card Layout

### Single Device Card

```css
.card {
  padding: var(--comp-card-padding); /* 24px */
  gap: 16px; /* 내부 요소 간 간격 */
  display: flex;
  flex-direction: column;
}
```

**적용 예시:**

```jsx
<BinaryDeviceCard>
  {/* 내부 요소들 사이 gap: 16px 자동 적용 */}
  <DeviceInfo />
  <Button />
</BinaryDeviceCard>
```

---

### Dashboard Grid

```css
.dashboard {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 24px;
  padding: 32px;
}
```

**반응형 규칙:**

- 최소 카드 너비: 300px
- 카드 간 간격: 24px
- 외부 여백: 32px

---

## Control Component Sizing

| 컴포넌트               | 너비  | 높이  | 비고                      |
| ---------------------- | ----- | ----- | ------------------------- |
| BinaryDeviceCard       | 100%  | auto  | 부모 컨테이너 기준        |
| VerticalSlider         | 60px  | 300px | 고정 크기                 |
| HorizontalSlider       | 100%  | 60px  | 너비 유동                 |
| TemperatureControl     | 280px | 280px | 정사각형                  |
| ColorTemperatureSlider | 100%  | 48px  | 너비 유동                 |
| Readout                | auto  | auto  | 컨텐츠 기준               |
| Button                 | 60px  | 60px  | 정사각형 (아이콘 버튼)    |
| Chip                   | auto  | 36px  | 너비 유동, 최소 높이 36px |

---

## Spacing Scale

```css
/* 8px 기반 스케일 */
--spacing-xs: 4px;
--spacing-sm: 8px;
--spacing-md: 16px;
--spacing-lg: 24px;
--spacing-xl: 32px;
--spacing-2xl: 48px;
```

**사용 규칙:**

| 간격  | 값   | 용도                 |
| ----- | ---- | -------------------- |
| `xs`  | 4px  | 라벨과 값 사이       |
| `sm`  | 8px  | 아이콘과 텍스트 사이 |
| `md`  | 16px | 카드 내부 요소 간    |
| `lg`  | 24px | 카드 간, 카드 패딩   |
| `xl`  | 32px | 페이지 패딩          |
| `2xl` | 48px | 섹션 간              |

---

## Touch Target Minimum

```yaml
Button: 44px × 44px (최소)
SliderThumb: 44px × 44px (최소)
Chip: 48px × 36px (최소 높이 36px)
Toggle: 48px × 28px
```

**접근성 규칙:**

- 모든 인터랙티브 요소는 최소 44px × 44px
- 터치 타겟 간 최소 8px 간격

---

## Alignment Rules

### 수직 정렬

```css
/* 카드 내 요소들 */
.card {
  display: flex;
  flex-direction: column;
  align-items: flex-start; /* 왼쪽 정렬 */
}

/* 버튼 그룹 */
.buttonGroup {
  display: flex;
  justify-content: flex-end; /* 오른쪽 정렬 */
  gap: 8px;
}
```

---

### 수평 정렬

```css
/* 디바이스 정보 행 */
.deviceInfo {
  display: flex;
  justify-content: space-between; /* 양쪽 정렬 */
  align-items: center; /* 세로 중앙 */
}

/* 슬라이더 컨테이너 */
.sliderContainer {
  display: flex;
  justify-content: center; /* 가로 중앙 */
}
```

---

## Page Layout

### Control Page Structure

```jsx
<div className={styles.page}>
  <header className={styles.header}>{/* 페이지 제목 */}</header>

  <main className={styles.content}>
    <BinaryDeviceCard />
    <div className={styles.controls}>
      <VerticalSlider />
      <Readout />
    </div>
  </main>
</div>
```

```css
.page {
  padding: var(--spacing-xl); /* 32px */
  max-width: 1200px;
  margin: 0 auto;
}

.header {
  margin-bottom: var(--spacing-lg); /* 24px */
}

.content {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-lg); /* 24px */
}

.controls {
  display: flex;
  gap: var(--spacing-md); /* 16px */
  align-items: center;
}
```

---

## Responsive Breakpoints

```css
/* Mobile */
@media (max-width: 640px) {
  .dashboard {
    grid-template-columns: 1fr;
    padding: 16px;
  }
}

/* Tablet */
@media (min-width: 641px) and (max-width: 1024px) {
  .dashboard {
    grid-template-columns: repeat(2, 1fr);
  }
}

/* Desktop */
@media (min-width: 1025px) {
  .dashboard {
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  }
}
```

---

## Z-Index Scale

```css
--z-base: 0;
--z-dropdown: 10;
--z-sticky: 20;
--z-modal: 30;
--z-tooltip: 40;
--z-toast: 50;
```

---

## 체크리스트

레이아웃 구성 시 확인:

- [ ] 카드 패딩: 24px
- [ ] 요소 간 gap: 16px
- [ ] 페이지 패딩: 32px
- [ ] 터치 타겟: 최소 44px × 44px
- [ ] 간격: 8px 기반 스케일 사용
- [ ] 반응형: 640px, 1024px 브레이크포인트
