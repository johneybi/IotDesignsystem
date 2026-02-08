# Component Composition Guide

AI가 Matter 데이터를 받았을 때 **어떤 순서로, 어떻게 조합**할지 단계별 프로세스를 제공합니다.

## 생성 프로세스

### STEP 1: Cluster 분석

```javascript
입력: Matter Device Data
↓
Clusters 추출 → [OnOff, LevelControl]
↓
Pattern 결정 → "Range"
```

**구체적 절차:**

```javascript
function analyzeDevice(matterData) {
  const clusters = matterData.endpoints[0].clusters.map((c) => c.clusterName);

  // Pattern 결정 규칙
  if (clusters.includes("Thermostat")) return "Circular";
  if (clusters.includes("WindowCovering")) return "Range";
  if (clusters.includes("LevelControl")) return "Range";
  if (clusters.every((c) => c.includes("Measurement"))) return "Info";
  return "Binary";
}
```

---

### STEP 2: Component Selection

```javascript
Pattern = "Range"
↓
필수 컴포넌트:
  - BinaryDeviceCard (OnOff 제어)
  - VerticalSlider (LevelControl 제어)
  - Readout (현재값 표시)
```

**매핑 테이블:**

| Pattern         | 필수 컴포넌트                     | 선택 컴포넌트          |
| --------------- | --------------------------------- | ---------------------- |
| Binary          | BinaryDeviceCard                  | -                      |
| Range (Light)   | BinaryDeviceCard, VerticalSlider  | ColorTemperatureSlider |
| Range (Curtain) | HorizontalSlider, BlindCurtain    | -                      |
| Circular        | TemperatureControl, CircularGauge | FanModeSelector        |
| Info            | Readout                           | -                      |

---

### STEP 3: Layout Structure

```jsx
<{Pattern}ControlPage>
  <BinaryDeviceCard name="거실 조명" isOn={...} />
  <VerticalSlider value={...} onChange={...} />
  <Readout value={...} unit="%" />
</{Pattern}ControlPage>
```

**레이아웃 규칙:**

```yaml
수직 배치:
  - BinaryDeviceCard (최상단)
  - 제어 컴포넌트 (중앙)
  - Readout (하단)

간격:
  - 카드 간: 24px
  - 컴포넌트 간: 16px
```

---

### STEP 4: Props Mapping

```yaml
Matter Attribute → Component Prop: OnOff.onOff → BinaryDeviceCard.isOn
  LevelControl.currentLevel → VerticalSlider.value (0-254 → 0-100% 변환)
```

**변환 공식 참조:**

| Cluster Attribute                              | 변환 공식           | UI 단위 |
| ---------------------------------------------- | ------------------- | ------- |
| `LevelControl.currentLevel`                    | `value × 100 ÷ 254` | %       |
| `Thermostat.localTemperature`                  | `value ÷ 100`       | °C      |
| `ColorControl.colorTemperatureMireds`          | `1000000 ÷ value`   | K       |
| `WindowCovering.currentPositionLiftPercentage` | 직접 사용           | %       |

---

### STEP 5: Event Handling

```javascript
onChange={(newValue) => {
  const matterValue = Math.round((newValue * 254) / 100);
  sendCommand('MoveToLevel', matterValue);
}}
```

**이벤트 매핑:**

| UI Event                 | Matter Command           | 매개변수 변환            |
| ------------------------ | ------------------------ | ------------------------ |
| `onToggle`               | `On` / `Off`             | 불리언 → 명령어          |
| `onChange` (Slider)      | `MoveToLevel`            | 0-100% → 0-254           |
| `onChange` (Temperature) | `SetpointRaiseLower`     | °C → centidegrees (×100) |
| `onChange` (ColorTemp)   | `MoveToColorTemperature` | K → mireds (1000000÷K)   |

---

## 완전한 예시: Dimmable Light

### 1. 입력 데이터

```json
{
  "deviceType": { "id": 257, "name": "Dimmable Light" },
  "deviceName": "거실 조명",
  "endpoints": [
    {
      "clusters": [
        { "clusterName": "OnOff", "attributes": { "onOff": true } },
        { "clusterName": "LevelControl", "attributes": { "currentLevel": 191 } }
      ]
    }
  ]
}
```

### 2. 분석 결과

```javascript
Clusters: [OnOff, LevelControl];
Pattern: Range;
Components: [BinaryDeviceCard, VerticalSlider, Readout];
```

### 3. 생성 코드

```jsx
import React, { useState } from "react";
import BinaryDeviceCard from "@/components/organisms/BinaryDeviceCard";
import VerticalSlider from "@/components/molecules/VerticalSlider";
import Readout from "@/components/molecules/Readout";
import styles from "./LightingControl.module.css";

export default function LightingControl({ deviceData }) {
  const [isOn, setIsOn] = useState(
    deviceData.endpoints[0].clusters[0].attributes.onOff,
  );
  const [brightness, setBrightness] = useState(
    Math.round(
      (deviceData.endpoints[0].clusters[1].attributes.currentLevel * 100) / 254,
    ),
  );

  const handleToggle = () => {
    setIsOn(!isOn);
    // Matter Command: On/Off
  };

  const handleBrightnessChange = (newValue) => {
    setBrightness(newValue);
    const matterValue = Math.round((newValue * 254) / 100);
    // Matter Command: MoveToLevel(matterValue)
  };

  return (
    <div className={styles.container}>
      <BinaryDeviceCard
        name={deviceData.deviceName}
        isOn={isOn}
        onToggle={handleToggle}
      />
      <VerticalSlider
        value={brightness}
        onChange={handleBrightnessChange}
        disabled={!isOn}
      />
      <Readout value={brightness} unit="%" label="밝기" />
    </div>
  );
}
```

---

## 체크리스트

생성 전 확인:

- [ ] Cluster 분석 완료
- [ ] Pattern 결정 완료
- [ ] 모든 필수 컴포넌트 포함
- [ ] Props 매핑 정확
- [ ] 값 변환 공식 적용
- [ ] Event 핸들링 구현
- [ ] Guardrails 준수 확인
