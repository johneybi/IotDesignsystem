# State Management Strategy

AI가 생성한 컴포넌트의 상태 관리 패턴을 정의합니다.

## State Hierarchy

```
Global State (앱 전체)
  └── Page State (페이지 레벨)
        └── Local State (컴포넌트 내부)
```

---

## Local State (컴포넌트 내부)

### 사용 시기

- UI 전용 상태 (드래그 중, 호버 등)
- 임시 값 (슬라이더 드래그 중 값)
- 애니메이션 상태

### 예시: 슬라이더 드래그

```javascript
function VerticalSlider({ value, onChange }) {
  const [isDragging, setIsDragging] = useState(false);
  const [tempValue, setTempValue] = useState(value);

  const handleDragStart = () => {
    setIsDragging(true);
    setTempValue(value);
  };

  const handleDragMove = (newValue) => {
    setTempValue(newValue);
  };

  const handleDragEnd = () => {
    setIsDragging(false);
    onChange(tempValue); // 최종 값만 부모에 전달
  };

  return (
    <div
      onMouseDown={handleDragStart}
      onMouseMove={isDragging ? handleDragMove : null}
      onMouseUp={handleDragEnd}
    >
      {/* 드래그 중에는 tempValue 표시 */}
      <Readout value={tempValue} />
    </div>
  );
}
```

---

## Parent State (페이지 레벨)

### 사용 시기

- Matter Attribute 값
- 기기 연결 상태
- 페이지 내 여러 컴포넌트가 공유하는 상태

### 예시: Lighting Control Page

```javascript
function LightingControlPage({ deviceData }) {
  // Matter 데이터를 State로 관리
  const [isOn, setIsOn] = useState(
    deviceData.endpoints[0].clusters.find((c) => c.clusterName === "OnOff")
      ?.attributes.onOff || false,
  );
  const [brightness, setBrightness] = useState(
    Math.round(
      ((deviceData.endpoints[0].clusters.find(
        (c) => c.clusterName === "LevelControl",
      )?.attributes.currentLevel || 127) *
        100) /
        254,
    ),
  );

  // Matter Command 전송
  const handleToggle = async () => {
    const newState = !isOn;
    setIsOn(newState);
    await sendMatterCommand("OnOff", newState ? "On" : "Off");
  };

  const handleBrightnessChange = async (newValue) => {
    setBrightness(newValue);
    const matterValue = Math.round((newValue * 254) / 100);
    await sendMatterCommand("LevelControl", "MoveToLevel", matterValue);
  };

  return (
    <div>
      <BinaryDeviceCard isOn={isOn} onToggle={handleToggle} />
      <VerticalSlider
        value={brightness}
        onChange={handleBrightnessChange}
        disabled={!isOn}
      />
      <Readout value={brightness} unit="%" />
    </div>
  );
}
```

---

## Global State (앱 전체)

### 사용 시기

- 여러 페이지에서 공유되는 기기 목록
- 사용자 설정 (다크 모드, 언어 등)
- 인증 상태

### 예시: Device Context

```javascript
// DeviceContext.js
const DeviceContext = createContext();

export function DeviceProvider({ children }) {
  const [devices, setDevices] = useState([]);
  const [selectedDeviceId, setSelectedDeviceId] = useState(null);

  // Matter 기기 목록 로드
  useEffect(() => {
    async function loadDevices() {
      const deviceList = await matterClient.getDevices();
      setDevices(deviceList);
    }
    loadDevices();
  }, []);

  return (
    <DeviceContext.Provider
      value={{
        devices,
        selectedDeviceId,
        setSelectedDeviceId,
      }}
    >
      {children}
    </DeviceContext.Provider>
  );
}

// 사용
function Dashboard() {
  const { devices } = useContext(DeviceContext);

  return (
    <div>
      {devices.map((device) => (
        <BinaryDeviceCard key={device.nodeId} {...device} />
      ))}
    </div>
  );
}
```

---

## State Synchronization

### Matter → UI (읽기)

```javascript
// 주기적 Polling
useEffect(() => {
  const interval = setInterval(async () => {
    const currentState = await matterClient.getAttribute("OnOff", "onOff");
    setIsOn(currentState);
  }, 5000); // 5초마다

  return () => clearInterval(interval);
}, []);
```

### UI → Matter (쓰기)

```javascript
// Debounce 적용 (빠른 변경 방지)
const debouncedUpdate = useMemo(
  () =>
    debounce(async (value) => {
      const matterValue = Math.round((value * 254) / 100);
      await sendMatterCommand("LevelControl", "MoveToLevel", matterValue);
    }, 300),
  [],
);

const handleBrightnessChange = (newValue) => {
  setBrightness(newValue);
  debouncedUpdate(newValue);
};
```

---

## Optimistic Updates

사용자 경험 향상을 위해 UI를 먼저 업데이트하고, Matter 명령은 비동기로 전송

```javascript
const handleToggle = async () => {
  const newState = !isOn;

  // 1. UI 즉시 업데이트 (Optimistic)
  setIsOn(newState);

  try {
    // 2. Matter 명령 전송
    await sendMatterCommand("OnOff", newState ? "On" : "Off");
  } catch (error) {
    // 3. 실패 시 롤백
    setIsOn(!newState);
    showToast("기기 제어 실패", "error");
  }
};
```

---

## Error State

```javascript
function LightingControlPage({ deviceData }) {
  const [isOn, setIsOn] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleToggle = async () => {
    setIsLoading(true);
    setError(null);

    try {
      const newState = !isOn;
      setIsOn(newState);
      await sendMatterCommand("OnOff", newState ? "On" : "Off");
    } catch (err) {
      setError(err.message);
      setIsOn(!isOn); // 롤백
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      <BinaryDeviceCard
        isOn={isOn}
        onToggle={handleToggle}
        disabled={isLoading}
      />
      {error && <ErrorBanner message={error} />}
    </div>
  );
}
```

---

## Loading State

```javascript
function DeviceControl({ deviceId }) {
  const [device, setDevice] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function loadDevice() {
      setIsLoading(true);
      try {
        const data = await matterClient.getDevice(deviceId);
        setDevice(data);
      } catch (error) {
        console.error("기기 로드 실패:", error);
      } finally {
        setIsLoading(false);
      }
    }
    loadDevice();
  }, [deviceId]);

  if (isLoading) return <LoadingSpinner />;
  if (!device) return <ErrorMessage />;

  return <BinaryDeviceCard {...device} />;
}
```

---

## State Persistence

로컬 스토리지에 사용자 설정 저장

```javascript
function usePersistedState(key, defaultValue) {
  const [state, setState] = useState(() => {
    const stored = localStorage.getItem(key);
    return stored ? JSON.parse(stored) : defaultValue;
  });

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(state));
  }, [key, state]);

  return [state, setState];
}

// 사용
function Dashboard() {
  const [viewMode, setViewMode] = usePersistedState("dashboard-view", "grid");
  // 페이지 새로고침 후에도 viewMode 유지
}
```

---

## 체크리스트

상태 관리 구현 시 확인:

- [ ] Local State: UI 전용 상태만
- [ ] Parent State: Matter 데이터
- [ ] Global State: Context API 사용
- [ ] Sync: Polling 또는 Subscription
- [ ] Write: Debounce 적용
- [ ] Optimistic: UI 먼저 업데이트
- [ ] Error: 롤백 로직
- [ ] Loading: 로딩 상태 표시
- [ ] Persistence: 중요 설정 저장
