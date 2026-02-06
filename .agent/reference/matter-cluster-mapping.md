# Matter Cluster → UI Component 매핑 참조

## 빠른 참조표

| Cluster ID | Cluster Name                | UI Pattern | Primary Component        |
| ---------- | --------------------------- | ---------- | ------------------------ |
| 6          | OnOff                       | Binary     | `BinaryDeviceCard`       |
| 8          | LevelControl                | Range      | `VerticalSlider`         |
| 258        | WindowCovering              | Range      | `HorizontalSlider`       |
| 513        | Thermostat                  | Circular   | `TemperatureControl`     |
| 514        | FanControl                  | Range      | `FanModeSelector`        |
| 768        | ColorControl                | Range      | `ColorTemperatureSlider` |
| 1026       | TemperatureMeasurement      | Info       | `Readout`                |
| 1029       | RelativeHumidityMeasurement | Info       | `Readout`                |

---

## Cluster별 상세 매핑

### OnOff (Cluster 6)

```
Attributes:
  onOff: boolean → BinaryDeviceCard.isOn

Commands:
  On()   → 전원 켜기
  Off()  → 전원 끄기
  Toggle() → 토글
```

### LevelControl (Cluster 8)

```
Attributes:
  currentLevel: 0-254 → Slider.value (0-100% 변환)
  minLevel: number
  maxLevel: number

Commands:
  MoveToLevel(level, transitionTime)
  Move(moveMode, rate)
  Step(stepMode, stepSize, transitionTime)
  Stop()
```

### WindowCovering (Cluster 258)

```
Attributes:
  currentPositionLiftPercentage: 0-100 → HorizontalSlider.value
  targetPositionLiftPercentage: 0-100
  operationalStatus: 0=Stopped, 1=Opening, 2=Closing

Commands:
  UpOrOpen()
  DownOrClose()
  StopMotion()
  GoToLiftPercentage(percentageValue)
```

### Thermostat (Cluster 513)

```
Attributes:
  localTemperature: centidegrees → currentTemp (÷100)
  occupiedCoolingSetpoint: centidegrees → targetTemp (÷100)
  occupiedHeatingSetpoint: centidegrees → targetTemp (÷100)
  systemMode: 0=Off, 1=Auto, 3=Cool, 4=Heat, 5=EmergencyHeat

Commands:
  SetpointRaiseLower(mode, amount)
```

### ColorControl (Cluster 768)

```
Attributes:
  colorTemperatureMireds: 153-500 → Kelvin (1000000÷mireds)
  colorTempPhysicalMinMireds: 최소값 (≈6500K)
  colorTempPhysicalMaxMireds: 최대값 (≈2000K)

Commands:
  MoveToColorTemperature(colorTemperatureMireds, transitionTime)
```

### FanControl (Cluster 514)

```
Attributes:
  fanMode: 0=Off, 1=Low, 2=Medium, 3=High, 4=On, 5=Auto, 6=Smart
  percentCurrent: 0-100

Commands:
  (속성 직접 설정)
```

---

## Device Type → Cluster 조합

| Device Type              | Clusters                          | UI 조합                            |
| ------------------------ | --------------------------------- | ---------------------------------- |
| On/Off Light (256)       | OnOff                             | BinaryDeviceCard                   |
| Dimmable Light (257)     | OnOff, LevelControl               | BinaryDeviceCard + VerticalSlider  |
| Color Temp Light (268)   | OnOff, LevelControl, ColorControl | + ColorTemperatureSlider           |
| Thermostat (769)         | Thermostat                        | TemperatureControl + CircularGauge |
| Room AC (114)            | OnOff, Thermostat, FanControl     | + FanModeSelector                  |
| Window Covering (514)    | WindowCovering                    | HorizontalSlider + BlindCurtain    |
| Temperature Sensor (770) | TemperatureMeasurement            | Readout (info-only)                |

---

## 값 변환 유틸리티

```javascript
// Matter → UI 값 변환
const conversions = {
  // LevelControl: 0-254 → 0-100%
  levelToPercent: (level) => Math.round((level * 100) / 254),
  percentToLevel: (percent) => Math.round((percent * 254) / 100),

  // Temperature: centidegrees → degrees
  centiToDegrees: (centi) => centi / 100,
  degreesToCenti: (deg) => deg * 100,

  // ColorControl: Mireds → Kelvin
  miredsToKelvin: (mireds) => Math.round(1000000 / mireds),
  kelvinToMireds: (kelvin) => Math.round(1000000 / kelvin),

  // Humidity: centipercent → percent
  centiToPercent: (centi) => centi / 100,
};
```
