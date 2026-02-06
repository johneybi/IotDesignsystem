---
description: Flowthing Design System - AI Integration Guide for Smart Home UI Auto-Generation
---

# Flowthing Design System

## 1. 시스템 개요

**Matter 규격** 기반 스마트홈 기기 데이터를 입력받아 **표준화된 UI 컴포넌트를 자동 생성**하는 데이터 드리븐 디자인 시스템입니다.

### 핵심 가치

- **14일 → 10분**: UI 개발 시간 99% 단축
- **기술 장벽 제거**: 제조사는 Matter 규격 데이터만 제공
- **일관된 UX**: 표준화된 패턴으로 통일된 사용자 경험

### 디자인 원칙

| 원칙               | 설명                           |
| ------------------ | ------------------------------ |
| Tactile & Soft     | Neumorphism 기반 물리적 피드백 |
| Natural Motion     | 스프링 기반 부드러운 전환      |
| Functional Clarity | 활성/비활성 상태 명확히 구분   |

---

## 2. Matter 규격 개요

Matter는 CSA(Connectivity Standards Alliance)에서 개발한 스마트홈 통합 프로토콜입니다.

### Matter 데이터 구조

```
Node (기기)
  └── Endpoint (기능 단위, 0-65534)
        └── Cluster (기능 그룹)
              ├── Attributes (상태값)
              └── Commands (명령어)
```

### 주요 Device Type

| Device Type ID | 이름                    | 패턴     |
| -------------- | ----------------------- | -------- |
| 256            | On/Off Light            | Binary   |
| 257            | Dimmable Light          | Range    |
| 268            | Color Temperature Light | Range    |
| 769            | Thermostat              | Circular |
| 114            | Room Air Conditioner    | Circular |
| 514            | Window Covering         | Range    |
| 770            | Temperature Sensor      | Info     |

### 주요 Cluster

| Cluster ID | 이름                        | 기능               | UI 매핑                  |
| ---------- | --------------------------- | ------------------ | ------------------------ |
| 6          | OnOff                       | 전원 제어          | `BinaryDeviceCard.isOn`  |
| 8          | LevelControl                | 밝기/레벨 조절     | `Slider.value`           |
| 258        | WindowCovering              | 커튼/블라인드 위치 | `HorizontalSlider.value` |
| 513        | Thermostat                  | 온도 설정          | `TemperatureControl`     |
| 514        | FanControl                  | 팬 속도            | `FanModeSelector`        |
| 768        | ColorControl                | 색상/색온도        | `ColorTemperatureSlider` |
| 1026       | TemperatureMeasurement      | 온도 측정          | `Readout (info)`         |
| 1029       | RelativeHumidityMeasurement | 습도 측정          | `Readout (info)`         |

---

## 3. 디자인 패턴 분류 (4가지)

Matter Cluster를 분석하여 다음 패턴 중 하나로 매핑됩니다:

| 패턴         | Cluster 조합         | Device Type 예시                | 컴포넌트              |
| ------------ | -------------------- | ------------------------------- | --------------------- |
| **Binary**   | OnOff만              | On/Off Light, Plug              | `BinaryDeviceCard`    |
| **Range**    | OnOff + LevelControl | Dimmable Light, Window Covering | `Slider` + `Readout`  |
| **Circular** | Thermostat           | Thermostat, Air Conditioner     | `TemperatureControl`  |
| **Info**     | Measurement 클러스터 | Sensor (제어 불가)              | `Readout` (표시 전용) |

---

## 4. Atomic Design 구조

```
Pages (Dashboard, LightingControl, AirConditionerControl)
  └── Organisms (BinaryDeviceCard, SpeakerVolumeControl)
        └── Molecules (ToggleBtn, Slider, Readout)
              └── Atoms (Button, SliderThumb, Chip)
```

### Atoms

| 이름           | 용도            | Props                                   |
| -------------- | --------------- | --------------------------------------- | -------- |
| `Button`       | 아이콘 버튼     | `active`, `disabled`, `variant`, `icon` |
| `SliderThumb`  | 드래그 핸들     | -                                       |
| `Chip`         | 필터/탭         | `label`, `active`, `variant`            |
| `IndicatorDot` | 원형 인디케이터 | `variant: target                        | current` |

### Molecules

| 이름                     | 용도            | Matter Cluster   |
| ------------------------ | --------------- | ---------------- |
| `ToggleBtn`              | 토글 스위치     | OnOff            |
| `VerticalSlider`         | 수직 슬라이더   | LevelControl     |
| `HorizontalSlider`       | 수평 슬라이더   | WindowCovering   |
| `TemperatureControl`     | 온도 다이얼     | Thermostat       |
| `ColorTemperatureSlider` | 색온도 슬라이더 | ColorControl     |
| `Readout`                | 값 표시         | 모든 Measurement |

### Organisms

| 이름                   | 용도             | Device Type        |
| ---------------------- | ---------------- | ------------------ |
| `BinaryDeviceCard`     | on/off 기기 카드 | On/Off Light, Plug |
| `BlindCurtain`         | 커튼 제어        | Window Covering    |
| `SpeakerVolumeControl` | 볼륨 제어        | Speaker            |

---

## 5. Matter → UI 변환 규칙 (Guardrails)

### 입력: Matter Device Data

```json
{
  "nodeId": "0000000000000001",
  "deviceType": { "id": 257, "name": "Dimmable Light" },
  "deviceName": "거실 조명",
  "endpoints": [
    {
      "endpointId": 1,
      "clusters": [
        {
          "clusterId": 6,
          "clusterName": "OnOff",
          "attributes": { "onOff": true }
        },
        {
          "clusterId": 8,
          "clusterName": "LevelControl",
          "attributes": { "currentLevel": 191 }
        }
      ]
    }
  ]
}
```

### 변환 규칙

```
RULE 1: clusters에 OnOff만 존재
  → Pattern: Binary
  → Component: BinaryDeviceCard

RULE 2: clusters에 OnOff + LevelControl 존재
  → Pattern: Range
  → Component: BinaryDeviceCard + VerticalSlider

RULE 3: clusters에 ColorControl 존재
  → ColorTemperatureSlider 추가
  → Mireds → Kelvin 변환 (1000000 ÷ mireds)

RULE 4: clusters에 Thermostat 존재
  → Pattern: Circular
  → Component: TemperatureControl + CircularGauge
  → 온도값 ÷ 100 (centidegrees → degrees)

RULE 5: clusters에 WindowCovering 존재
  → Pattern: Range
  → Component: HorizontalSlider + BlindCurtain

RULE 6: Measurement 클러스터만 존재 (센서)
  → Pattern: Info
  → Component: BinaryDeviceCard (isActuatable: false)
```

### 값 변환 규칙

| Cluster Attribute                              | 변환 공식         | UI 단위 |
| ---------------------------------------------- | ----------------- | ------- |
| `LevelControl.currentLevel`                    | value × 100 ÷ 254 | %       |
| `Thermostat.localTemperature`                  | value ÷ 100       | °C      |
| `ColorControl.colorTemperatureMireds`          | 1000000 ÷ value   | K       |
| `WindowCovering.currentPositionLiftPercentage` | 직접 사용         | %       |
| `TemperatureMeasurement.measuredValue`         | value ÷ 100       | °C      |
| `RelativeHumidityMeasurement.measuredValue`    | value ÷ 100       | %       |

---

## 6. W3C 디자인 토큰

### 토큰 계층

```
Reference Tokens (불변)
  → System Tokens (의미)
    → Component Tokens (컴포넌트)
```

### 주요 토큰

```css
/* 상태 색상 */
--sys-color-status-active: var(--ref-palette-orange-500);
--sys-color-status-inactive: var(--ref-palette-neutral-400);

/* 컴포넌트 */
--comp-card-bg: rgba(255, 255, 255, 0.65);
--comp-button-bg-enabled: linear-gradient(...);
--comp-slider-gradient-temperature: linear-gradient(
  90deg,
  #ffcd94,
  #fff3e0,
  #daf0ff
);

/* 온도 그라데이션 (AC용) */
--sys-gradient-ac-cool: linear-gradient(180deg, #a8d8ff 0%, #e8f4ff 100%);
```

---

## 7. 파일 구조

```
src/
├── components/
│   ├── atoms/          # Button, Chip, SliderThumb, etc.
│   ├── molecules/      # ToggleBtn, Slider, TemperatureControl
│   ├── organisms/      # DeviceCards, Controllers
│   └── pages/          # Dashboard, LightingControl, etc.
└── styles/
    └── design-tokens.css  # W3C 토큰 정의
```

---

## 8. AI 생성 프롬프트 템플릿

```
당신은 Flowthing Design System을 사용하는 스마트홈 UI 생성 AI입니다.

[Matter Device Data]
{matterDeviceData}

[변환 프로세스]
1. Device Type ID와 Cluster 목록 분석
2. Cluster → Pattern 매핑 (위 규칙 참조)
3. Pattern → Component 조합
4. Attribute 값 → UI Props 변환 (단위 변환 적용)

[출력 형식]
- Device Type: {deviceType.name}
- 포함된 Clusters: {clusters}
- 선택된 Pattern: {pattern}
- 조합된 Components: {components}
- 값 변환: {conversions}
- 생성된 코드: {code}
```

---

## 9. 참조 파일

| 파일                                     | 설명                           |
| ---------------------------------------- | ------------------------------ |
| `.agent/schemas/device-data.schema.json` | Matter 기기 데이터 JSON 스키마 |
| `.agent/examples/device-examples.json`   | 6가지 Matter 기기 예제         |
| `.agent/reference/component-mapping.md`  | 컴포넌트 매핑 다이어그램       |
| `.agent/QUICKSTART.md`                   | 빠른 시작 가이드               |
| `src/styles/design-tokens.css`           | W3C 디자인 토큰 정의           |
