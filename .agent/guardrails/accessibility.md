# Accessibility Rules

모든 UI는 **접근성 표준(WCAG 2.1 AA)**을 준수해야 합니다.

## 색상 대비

### 최소 대비비

```yaml
일반 텍스트: 4.5:1
큰 텍스트 (18px+ 또는 14px+ bold): 3:1
아이콘/그래픽: 3:1
```

### 현재 토큰 대비

| 조합                                             | 대비비 | 상태           |
| ------------------------------------------------ | ------ | -------------- |
| `--sys-color-text-primary` on `--comp-card-bg`   | 7.2:1  | ✅ 통과        |
| `--sys-color-text-secondary` on `--comp-card-bg` | 4.8:1  | ✅ 통과        |
| `--sys-color-text-tertiary` on `--comp-card-bg`  | 3.2:1  | ⚠️ 큰 텍스트만 |

## 터치 타겟

### 최소 크기

```yaml
버튼: 44x44px 이상
슬라이더 핸들: 44x44px 이상
탭 아이템: 48x48px 이상 (권장)
```

### 금지

```yaml
버튼: 24px 미만 절대 금지
간격: 터치 타겟 간 최소 8px 간격
```

## 상태 표시

### 필수: 다중 표시

```yaml
✅ 올바른 예:
  - ON 상태: 주황색 + "켜짐" 텍스트 + 아이콘 변경
  - 오프라인: 회색 + "연결 끊김" 텍스트 + 점선 테두리

❌ 잘못된 예:
  - 색상만으로 ON/OFF 구분 (색맹 사용자)
```

### 상태별 표시 조합

| 상태     | 색상       | 텍스트      | 아이콘        | 기타          |
| -------- | ---------- | ----------- | ------------- | ------------- |
| Active   | Orange     | "켜짐"      | 채워진 아이콘 | -             |
| Inactive | Gray       | "꺼짐"      | 빈 아이콘     | -             |
| Offline  | Light Gray | "연결 끊김" | -             | ghost variant |
| Error    | Red        | 에러 메시지 | 경고 아이콘   | -             |

## 포커스 표시

### 키보드 네비게이션

```yaml
필수: 모든 인터랙티브 요소에 visible focus ring
스타일: 2px solid, 오프셋 2px
색상: var(--sys-color-status-active) 또는 대비색
```

### 금지

```yaml
❌ outline: none (포커스 링 제거)
❌ 마우스 클릭 시에만 스타일 변경
```

## 모션 접근성

### Reduced Motion

```css
@media (prefers-reduced-motion: reduce) {
  * {
    animation: none !important;
    transition-duration: 0.01ms !important;
  }
}
```

### 애니메이션 규칙

```yaml
지속시간: 최대 5초
깜빡임: 3Hz 이상 금지 (광과민성 발작 위험)
자동재생: 5초 후 정지 또는 제어 버튼 제공
```

## 스크린 리더

### ARIA 라벨

```jsx
// ✅ 올바른 예
<Button aria-label="거실 조명 켜기" />
<Slider aria-label="밝기 조절" aria-valuenow={75} aria-valuemin={0} aria-valuemax={100} />

// ❌ 잘못된 예
<Button /> // aria-label 없음
<div onClick={...} /> // role 없음
```

### 필수 속성

| 컴포넌트 | 필수 ARIA                                                       |
| -------- | --------------------------------------------------------------- |
| Button   | `aria-label`, `aria-pressed` (토글 시)                          |
| Slider   | `aria-label`, `aria-valuenow`, `aria-valuemin`, `aria-valuemax` |
| Toggle   | `role="switch"`, `aria-checked`                                 |
| Card     | `aria-labelledby` (제목 참조)                                   |

## 검증 체크리스트

```yaml
- [ ] 모든 색상 대비 4.5:1 이상
- [ ] 터치 타겟 44x44px 이상
- [ ] 상태 표시 색상 + 텍스트/아이콘 조합
- [ ] 키보드 포커스 표시 존재
- [ ] reduced-motion 쿼리 적용
- [ ] ARIA 라벨 설정
```
