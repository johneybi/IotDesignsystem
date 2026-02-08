# Error Handling & Edge Cases

예외 상황에서 AI가 어떻게 대응할지 명시합니다.

## Missing Cluster

### 시나리오

```json
{
  "clusters": [
    { "clusterName": "OnOff" }
    // LevelControl 없음
  ]
}
```

### 대응

```javascript
// ✅ BinaryDeviceCard만 생성
<BinaryDeviceCard name="침실 조명" isOn={true} />

// ❌ VerticalSlider는 생성하지 않음
```

**설명:** 기기가 지원하지 않는 기능의 UI는 표시하지 않습니다.

---

## Out-of-Range Values

### 시나리오

```json
{
  "currentLevel": 300 // 유효 범위: 0-254
}
```

### 대응

```javascript
const clampedValue = Math.min(Math.max(value, 0), 254);
console.warn(`값 ${value}가 범위를 벗어나 ${clampedValue}로 클램핑됨`);
```

---

## Offline Device

### 시나리오

```json
{
  "isOnline": false
}
```

### 대응

```jsx
<BinaryDeviceCard
  name="침실 조명"
  status="연결 끊김"
  variant="ghost"
  isActuatable={false}
  opacity={0.5}
/>
```

**스타일:**

```css
.ghost {
  opacity: 0.5;
  filter: grayscale(100%);
  border: 2px dashed var(--sys-color-border-ghost);
  pointer-events: none;
}
```

---

## Unsupported Device Type

### 시나리오

```json
{
  "deviceType": { "id": 999 } // 지원하지 않는 타입
}
```

### 대응

```javascript
const SUPPORTED_TYPES = {
  256: "Binary",
  257: "Range",
  268: "Range",
  769: "Circular",
  // ...
};

const pattern = SUPPORTED_TYPES[deviceTypeId] || "Binary";
console.warn(`미지원 Device Type ${deviceTypeId}, Binary 패턴 적용`);
```

---

## Missing Required Attributes

### 시나리오

```json
{
  "clusterName": "LevelControl",
  "attributes": {} // currentLevel 없음
}
```

### 대응

```javascript
const defaultValues = {
  "OnOff.onOff": false,
  "LevelControl.currentLevel": 127,
  "Thermostat.localTemperature": 2200,
};

const value =
  attributes.currentLevel ?? defaultValues["LevelControl.currentLevel"];
```

---

## Null or Undefined Device Name

### 시나리오

```json
{
  "deviceName": null
}
```

### 대응

```javascript
const displayName = deviceName || `${deviceType.name} ${nodeId.slice(-4)}`;
// 예: "Dimmable Light 0001"
```

---

## Cluster Order Mismatch

### 시나리오

Cluster가 예상과 다른 순서로 배열되어 있음

### 대응

```javascript
// ❌ 순서 의존적 코드
const onOffCluster = clusters[0];

// ✅ 이름 기반 검색
const onOffCluster = clusters.find((c) => c.clusterName === "OnOff");
```

---

## Network Timeout

### 시나리오

Matter 명령어 전송 후 응답 없음

### 대응

```javascript
async function sendCommand(command, timeout = 5000) {
  try {
    const response = await Promise.race([
      matterClient.send(command),
      new Promise((_, reject) =>
        setTimeout(() => reject(new Error("timeout")), timeout),
      ),
    ]);
    return response;
  } catch (error) {
    console.error("명령어 전송 실패:", error);
    // UI에 에러 표시
    showToast("기기 응답 없음", "error");
  }
}
```

**UI 표시:**

```jsx
{
  error && (
    <div className={styles.errorBanner}>
      <span>⚠️ 기기와 통신할 수 없습니다</span>
      <Button onClick={retry}>재시도</Button>
    </div>
  );
}
```

---

## Incomplete Matter Data

### 시나리오

필수 필드가 누락된 데이터

### 대응

```javascript
function validateMatterData(data) {
  const required = ["nodeId", "deviceType", "endpoints"];
  const missing = required.filter((field) => !(field in data));

  if (missing.length > 0) {
    throw new Error(`필수 필드 누락: ${missing.join(", ")}`);
  }

  if (!data.endpoints || data.endpoints.length === 0) {
    throw new Error("Endpoints가 비어있습니다");
  }

  return true;
}
```

---

## Multiple Endpoints

### 시나리오

```json
{
  "endpoints": [
    {"endpointId": 1, "clusters": [...]},
    {"endpointId": 2, "clusters": [...]}
  ]
}
```

### 대응

```javascript
// 기본적으로 첫 번째 Endpoint 사용
const primaryEndpoint = endpoints[0];

// 또는 특정 Endpoint 선택
const targetEndpoint =
  endpoints.find((ep) => ep.endpointId === targetId) || endpoints[0];
```

---

## 체크리스트

에러 처리 구현 시 확인:

- [ ] Missing Cluster: UI 컴포넌트 조건부 렌더링
- [ ] Out-of-Range: 값 클램핑 적용
- [ ] Offline: ghost variant 및 비활성화
- [ ] Unsupported Type: Binary 패턴 fallback
- [ ] Missing Attributes: 기본값 제공
- [ ] Null Device Name: 자동 생성
- [ ] Cluster 검색: 이름 기반
- [ ] Network Error: 재시도 UI 제공
- [ ] Validation: 필수 필드 검증
- [ ] Multiple Endpoints: 첫 번째 사용
