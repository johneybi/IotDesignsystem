# Quick Start: AI UI Generation

## 1단계: 기기 데이터 준비

```json
{
  "deviceType": "light",
  "deviceName": "거실 조명",
  "capabilities": ["on_off", "brightness"],
  "currentState": { "power": true, "brightness": 75 }
}
```

## 2단계: 패턴 결정

| capabilities                | 패턴     |
| --------------------------- | -------- |
| `["on_off"]`                | Binary   |
| `["on_off", "brightness"]`  | Range    |
| `["on_off", "temperature"]` | Circular |
| `["play_pause", "volume"]`  | Action   |

## 3단계: 컴포넌트 조합

**Range 패턴 예시:**

```jsx
// Dashboard 카드
<BinaryDeviceCard
  name="거실 조명"
  status={isOn ? `${brightness}%` : "꺼짐"}
  isOn={isOn}
  onToggle={() => setIsOn(!isOn)}
  icon={<LightBulb />}
/>

// 상세 페이지
<VerticalSlider
  value={brightness}
  onChange={setBrightness}
/>
<Readout value={brightness} unit="%" label="밝기" />
```

## 4단계: 토큰 적용

```css
.card {
  background: var(--comp-card-bg);
  border-radius: var(--comp-card-radius);
}

.activeState {
  color: var(--sys-color-status-active);
}
```

## 참조 파일

- 📋 전체 가이드: `.agent/workflows/design-system-guide.md`
- 🤖 AI 프롬프트: `.agent/prompts/prompt-strategy.md`
- 🛡️ 제약 규칙: `.agent/guardrails/`
- 📐 데이터 스키마: `.agent/schemas/device-data.schema.json`
- 📦 예제 데이터: `.agent/examples/device-examples.json`
- 🧩 컴포넌트 참조: `.agent/reference/component-mapping.md`
