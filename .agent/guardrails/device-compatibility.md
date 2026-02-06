# Device Compatibility

기기 상태와 기능에 따른 **UI 호환성 규칙**입니다.

## 연결 상태

### 온라인 (isOnline: true)

```yaml
표시: 정상 컴포넌트
제어: 활성화
스타일: 기본 variant
```

### 오프라인 (isOnline: false)

```yaml
표시: ghost variant
제어: 비활성화 (클릭 무시)
스타일:
  opacity: 0.5
  색상: grayscale
  테두리: 점선
메시지: "연결 끊김" 표시
```

### 예시 코드

```jsx
<BinaryDeviceCard
  name="침실 조명"
  status={isOnline ? (isOn ? "켜짐" : "꺼짐") : "연결 끊김"}
  isOn={isOn}
  isConnected={isOnline}
  isActuatable={isOnline}
  variant={isOnline ? "default" : "ghost"}
  onToggle={isOnline ? handleToggle : undefined}
/>
```

## 제어 가능 여부

### 제어 가능 (isActuatable: true)

```yaml
장치: 조명, 에어컨, 커튼 등
UI: 제어 컴포넌트 활성화
이벤트: onToggle, onChange 등 바인딩
```

### 제어 불가 (isActuatable: false)

```yaml
장치: 센서 (온도, 습도, 움직임)
UI: Readout만 표시 (정보 전용)
이벤트: 없음
금지: Slider, Toggle, Button 등 제어 UI
```

### 예시

```jsx
// 센서 (제어 불가)
<BinaryDeviceCard
  name="거실 온습도"
  status={`${temp}°C / ${humidity}%`}
  isActuatable={false} // 제어 UI 숨김
  icon={<Thermometer />}
/>
```

## 기능 가용성

### 지원 기능만 표시

```yaml
원칙: 기기가 지원하지 않는 기능의 UI는 표시하지 않음

예시:
  - 밝기 조절 없는 조명 → VerticalSlider 숨김
  - 색온도 없는 조명 → ColorTemperatureSlider 숨김
  - 팬 없는 에어컨 → FanModeSelector 숨김
```

### Cluster 기반 UI 결정

```javascript
function getComponentsForDevice(device) {
  const clusters = device.endpoints[0].clusters.map((c) => c.clusterName);
  const components = [];

  if (clusters.includes("OnOff")) {
    components.push("BinaryDeviceCard");
  }

  if (clusters.includes("LevelControl")) {
    components.push("VerticalSlider");
  }

  if (clusters.includes("ColorControl")) {
    components.push("ColorTemperatureSlider");
  }

  if (clusters.includes("Thermostat")) {
    components.push("TemperatureControl");
  }

  if (clusters.includes("FanControl")) {
    components.push("FanModeSelector");
  }

  // 센서 전용
  const isSensorOnly = clusters.every((c) => c.includes("Measurement"));
  if (isSensorOnly) {
    return ["Readout"];
  }

  return components;
}
```

## 에러 상태

### 통신 오류

```yaml
표시: 오류 메시지 + 재시도 버튼
스타일: 경고 색상 (red)
동작: 제어 일시 중단
```

### 값 동기화 실패

```yaml
표시: "동기화 중..." + 스피너
스타일: 반투명 오버레이
동작: 마지막 알려진 값 표시
```

### 예시

```jsx
{
  error && (
    <div className={styles.errorOverlay}>
      <span>연결 오류</span>
      <Button onClick={retry}>재시도</Button>
    </div>
  );
}
```

## 호환성 체크리스트

```yaml
렌더링 전 검증:
  - [ ] isOnline 확인 → ghost variant 적용
  - [ ] isActuatable 확인 → 제어 UI 표시/숨김
  - [ ] clusters 확인 → 지원 컴포넌트만 렌더링
  - [ ] 에러 상태 확인 → 에러 UI 표시
```
