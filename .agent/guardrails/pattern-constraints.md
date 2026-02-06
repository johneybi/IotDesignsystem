# Pattern Constraints

Matter Cluster 조합에 따라 **허용되는 UI 패턴과 컴포넌트**가 제한됩니다.

## Cluster → Pattern 매핑

| Cluster 조합         | 패턴     | 허용 컴포넌트                  |
| -------------------- | -------- | ------------------------------ |
| OnOff만              | Binary   | BinaryDeviceCard               |
| OnOff + LevelControl | Range    | + VerticalSlider               |
| OnOff + ColorControl | Range    | + ColorTemperatureSlider       |
| Thermostat           | Circular | TemperatureControl             |
| WindowCovering       | Range    | HorizontalSlider, BlindCurtain |
| Measurement만        | Info     | Readout (제어 불가)            |

## 필수 제약 규칙

### RULE 1: Binary 패턴

```yaml
조건: clusters = [OnOff]
필수: BinaryDeviceCard
금지: [Slider, TemperatureControl, ColorTemperatureSlider]
이유: 단순 on/off 기기에 연속값 컴포넌트 불필요
```

### RULE 2: Range 패턴 (밝기)

```yaml
조건: clusters = [OnOff, LevelControl]
필수: [BinaryDeviceCard, VerticalSlider]
금지: [TemperatureControl, HorizontalSlider]
이유: 밝기는 수직 슬라이더로 표현 (직관적 UX)
```

### RULE 3: Range 패턴 (커튼)

```yaml
조건: clusters = [WindowCovering]
필수: [HorizontalSlider, BlindCurtain]
금지: [VerticalSlider, TemperatureControl]
이유: 커튼 위치는 수평 슬라이더로 표현
```

### RULE 4: Circular 패턴

```yaml
조건: clusters contains Thermostat
필수: [TemperatureControl, CircularGauge]
금지: [VerticalSlider, HorizontalSlider]
이유: 온도 조절은 다이얼 UI가 직관적
```

### RULE 5: Info 패턴 (센서)

```yaml
조건: clusters = [TemperatureMeasurement | RelativeHumidityMeasurement]
필수: [Readout]
금지: 모든 제어 컴포넌트
속성: isActuatable = false
이유: 센서는 정보 표시만 가능, 제어 불가
```

## 검증 로직

```javascript
function validatePattern(device, selectedComponents) {
  const clusters = device.endpoints[0].clusters.map((c) => c.clusterName);

  // RULE 5: 센서 검증
  const isSensorOnly = clusters.every((c) => c.includes("Measurement"));
  if (isSensorOnly) {
    const hasControlComponent = selectedComponents.some((c) =>
      ["Slider", "ToggleBtn", "TemperatureControl"].includes(c),
    );
    if (hasControlComponent) {
      throw new Error("센서 기기에 제어 컴포넌트 사용 불가");
    }
  }

  // RULE 4: Thermostat 검증
  if (clusters.includes("Thermostat")) {
    if (!selectedComponents.includes("TemperatureControl")) {
      throw new Error("Thermostat 기기에는 TemperatureControl 필수");
    }
    if (selectedComponents.includes("VerticalSlider")) {
      throw new Error("Thermostat에 VerticalSlider 사용 금지");
    }
  }

  return true;
}
```
