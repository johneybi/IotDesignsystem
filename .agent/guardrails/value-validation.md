# Value Validation

기기 제어값은 **안전한 범위** 내에서만 허용됩니다.

## 범위 규칙

### 온도 (Thermostat)

```yaml
구분: cooling
범위: 16°C ~ 30°C
Matter: 1600 ~ 3000 (centidegrees)
기본값: 24°C

구분: heating
범위: 16°C ~ 28°C
Matter: 1600 ~ 2800 (centidegrees)
기본값: 22°C

금지: 음수 온도, 40°C 이상
```

### 밝기 (LevelControl)

```yaml
범위: 0% ~ 100%
Matter: 0 ~ 254
기본값: 50%

금지: 음수, 100% 초과
특이사항: 0 = 최소 밝기 (완전 꺼짐 아님), Off는 OnOff 클러스터 사용
```

### 색온도 (ColorControl)

```yaml
범위: 2700K ~ 6500K
Matter: 153 ~ 370 mireds
기본값: 4000K (250 mireds)

변환: Kelvin = 1000000 ÷ mireds
금지: 2000K 미만, 7000K 이상
```

### 커튼/블라인드 위치

```yaml
범위: 0% (완전 닫힘) ~ 100% (완전 열림)
Matter: 0 ~ 100
기본값: 50%

금지: 음수, 100% 초과
```

### 볼륨

```yaml
범위: 0% (음소거) ~ 100% (최대)
기본값: 30%

금지: 음수, 100% 초과
```

### 팬 속도 (FanControl)

```yaml
허용값: [0, 1, 2, 3, 4, 5, 6]
의미:
  0: Off
  1: Low
  2: Medium
  3: High
  4: On
  5: Auto
  6: Smart

금지: 7 이상, 음수
```

## UI 제한 규칙

```yaml
Slider 단계:
  밝기: 1% 단위 또는 5% 단위
  온도: 0.5°C 또는 1°C 단위
  커튼: 10% 단위

TemperatureControl:
  터치 영역: 전체 원형
  드래그 해상도: 0.5°C
```

## 검증 로직

```javascript
const VALIDATION_RULES = {
  temperature: { min: 16, max: 30, unit: "°C" },
  brightness: { min: 0, max: 100, unit: "%" },
  colorTemp: { min: 2700, max: 6500, unit: "K" },
  position: { min: 0, max: 100, unit: "%" },
  volume: { min: 0, max: 100, unit: "%" },
  fanMode: { allowed: [0, 1, 2, 3, 4, 5, 6] },
};

function validateValue(type, value) {
  const rule = VALIDATION_RULES[type];

  if (rule.allowed) {
    return rule.allowed.includes(value);
  }

  if (value < rule.min || value > rule.max) {
    throw new Error(
      `${type} 값 ${value}${rule.unit}은 허용 범위(${rule.min}-${rule.max}) 벗어남`,
    );
  }

  return true;
}
```

## 에러 처리

```yaml
범위 초과 시:
  동작: 가장 가까운 허용값으로 클램핑
  UI: 경고 토스트 표시
  로그: 원래 값과 클램핑된 값 기록
```
