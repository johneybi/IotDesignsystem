# Flowthing Component Reference

## Pattern → Component 매핑

### Binary Pattern

```
┌─────────────────────────────────────┐
│  BinaryDeviceCard                   │
│  ┌────────┐                         │
│  │ Button │  DeviceName             │
│  │ (icon) │  Status Text            │
│  └────────┘                         │
└─────────────────────────────────────┘
```

**파일**: `organisms/Cards/BinaryDeviceCard/`
**용도**: on/off 제어 기기

---

### Range Pattern (Vertical)

```
┌──────────────────┐
│   VerticalSlider │
│   ┌──────────┐   │
│   │░░░░░░░░░░│   │
│   │░░░░░░░░░░│   │
│   │▓▓▓▓▓▓▓▓▓▓│   │ ← SliderHandle
│   │▓▓▓▓▓▓▓▓▓▓│   │
│   └──────────┘   │
│                  │
│   Readout: 75%   │
└──────────────────┘
```

**파일**: `molecules/Linear/VerticalSlider/`
**용도**: 밝기, 볼륨 등 연속값

---

### Range Pattern (Horizontal)

```
┌───────────────────────────────────────────┐
│ Icon ▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓░░░░○░░░░░░░░░ Icon  │
│      └─ fill ─────────┘    └─ track ──┘   │
└───────────────────────────────────────────┘
```

**파일**: `molecules/Linear/HorizontalSlider/`
**용도**: 커튼 위치, 수평 조절

---

### Circular Pattern

```
       ╭───────────────╮
      ╱     24°C        ╲
     │   ┌─────────┐     │
     │   │ Target  │     │ ← CircularGauge
     │   │  Temp   │     │
     │   └─────────┘     │
      ╲   Current: 21°  ╱
       ╰──────●────────╯
              └─ IndicatorDot
```

**파일**: `molecules/Circular/TemperatureControl/`
**용도**: 에어컨, 온도조절기

---

### Action Pattern

```
┌─────────────────────────────────────┐
│  ActionDeviceCard                   │
│  ┌────────┐                         │
│  │ Action │  DeviceName             │
│  │ (play) │  Status Text            │
│  └────────┘                         │
└─────────────────────────────────────┘
```

**파일**: `organisms/Cards/ActionDeviceCard/`
**용도**: 스피커, 일회성 트리거

---

## Import 경로

```javascript
// Atoms
import Button from "@/components/atoms/Button/Button";
import Chip from "@/components/atoms/Chip/Chip";
import SliderThumb from "@/components/atoms/SliderThumb/SliderThumb";

// Molecules
import ToggleBtn from "@/components/molecules/ToggleBtn/ToggleBtn";
import VerticalSlider from "@/components/molecules/Linear/VerticalSlider/VerticalSlider";
import HorizontalSlider from "@/components/molecules/Linear/HorizontalSlider/HorizontalSlider";
import TemperatureControl from "@/components/molecules/Circular/TemperatureControl/TemperatureControl";
import Readout from "@/components/molecules/Display/Readout/Readout";

// Organisms
import BinaryDeviceCard from "@/components/organisms/Cards/BinaryDeviceCard/BinaryDeviceCard";
import ActionDeviceCard from "@/components/organisms/Cards/ActionDeviceCard/ActionDeviceCard";
import BlindCurtain from "@/components/organisms/BlindCurtain/BlindCurtain";
import SpeakerVolumeControl from "@/components/organisms/SpeakerVolumeControl/SpeakerVolumeControl";
```

---

## State 관리 패턴

```javascript
// Binary
const [isOn, setIsOn] = useState(deviceState.power);
const handleToggle = () => setIsOn(!isOn);

// Range
const [value, setValue] = useState(deviceState.brightness);
const handleChange = (newValue) => setValue(newValue);

// Circular
const [targetTemp, setTargetTemp] = useState(deviceState.targetTemperature);
const currentTemp = deviceState.temperature;

// Action
const [isPlaying, setIsPlaying] = useState(deviceState.isPlaying);
const handleAction = () => setIsPlaying(!isPlaying);
```
