# Flowthing (IoT Design System)

IoT 대시보드 및 컨트롤 패널 구축을 위한 React 기반 디자인 시스템이자 assembly prototype입니다.
AI가 새 UI를 자유롭게 디자인하는 것이 아니라, 기기 명세를 해석해 사전에 정의된 컴포넌트와 토큰 안에서 화면을 조립하는 구조를 검증합니다.

## 🚀 시작하기 (Getting Started)

### 설치 (Installation)

```bash
npm install
```

### 개발 서버 실행 (Run Dev Server)

```bash
npm run dev
```

브라우저에서 `http://localhost:5173`으로 접속하여 확인할 수 있습니다.

---

## 📐 Atomic Design Classification (아토믹 계층 정의)

이 시스템은 사용자 경험(UX)과 기능적 복잡도를 기준으로 **Atom**, **Molecule**, **Organism**을 재정의하여 설계되었습니다.
Flowthing에서 AI의 역할은 새 컴포넌트를 디자인하는 것이 아니라, 사전에 정의된 디자인 시스템 컴포넌트를 기기 명세에 맞게 선택하고 조립하는 것입니다.

```text
Device Spec
  → Capability Classifier
  → Component Registry
  → UI Blueprint
  → Guardrail Validator
  → React Renderer
```

### 1. Atom (시각적 최소 단위)

디자인의 **'심미적 규칙'**을 아톰으로 설계했습니다.

- **정의**: 더 이상 쪼갤 수 없는 시각적 요소이자 디자인 토큰의 집합체.
- **구성**: 버튼의 상태(Default, Pressed, Disabled), 크기, 색상, 아이콘 그 자체.
- **역할**: 기능보다는 스타일과 상태 표현에 집중합니다.

### 2. Molecule (기능적 최소 단위)

아톰들을 모아 사용자의 **'핵심 행동(Pattern)'**을 수행하는 모듈입니다.
IoT 환경의 **4대 행동 패턴**을 기반으로 기능 로직이 주입된 상태입니다.

- **Binary Molecule**:
  - 아톰 버튼에 '켜고 끄는 로직(Toggle/Trigger)'이 붙은 상태.
  - 예: 전원 스위치, 동작 트리거.
- **Linear Molecule**:
  - 슬라이더/다이얼 아톰에 '수치 조절 로직'이 붙은 상태.
  - 예: 온도 조절 다이얼, 밝기 슬라이더.
- **State Molecule**:
  - 여러 상태 중 하나를 선택하는 로직이 붙은 상태.
  - 예: 모드 선택, 풍량 선택.
- **Action Molecule**:
  - 상태 표시와 분리된 즉시 실행 명령.
  - 예: 열기, 닫기, 일시정지, 시작.

### 3. Organism (맥락 적응형 컨트롤러)

단순히 모듈을 배치하는 것이 아니라, **"무엇(What)"을 제어할지 판단하는 주체**입니다.

- **정의**: "온도", "조명"과 같은 도메인 맥락(Context)을 이해하는 완성된 제어 카드.
- **역할**: 주입된 데이터(맥락)에 따라 가장 적절한 Molecule(Binary vs Linear 등)을 선택하여 사용자에게 제시합니다.

---

## 🎨 W3C Design Tokens

이 시스템은 **W3C Design Tokens**의 표준 개념을 바탕으로 스타일을 관리합니다.
하드코딩된 값 대신 의미론적(Semantic) 토큰을 사용하여 유지보수성과 확장성을 확보했습니다.

- **Token Format**: `--comp-[component]-[property]-[state]`
- **Example**:
  - `--comp-button-bg-enabled`
  - `--comp-button-radius`

---

## 📂 Implementation Structure (구현 구조)

위의 아토믹 개념을 실제 코드베이스에서는 다음과 같은 폴더 구조로 관리합니다.

### `src/components/`

#### 1. `atoms/` & `foundations/`

시각적 원자(Atom)와 디자인 토큰을 관리합니다.

- **Colors, Typography, Icons**
- **Base Components**: `Button` (Visual only)

#### 2. `molecules/`

기능적 패턴(Binary, Linear, State, Action, Info)을 구현합니다.

- **Binary/**: `Action` (Trigger/Toggle logic)
- **Linear/**: `Slider`, `HorizontalSlider`, `VerticalSlider`, `AdaptiveLightSlider`
- **Circular/**: `TemperatureControl`, `CircularGauge`
- **Selection/**: `Dropdown`, `Chip` 기반 상태 선택
- **Display/**: `Readout`, `DeviceInfo`

#### 3. `assembly/`

기기 명세를 UI blueprint로 바꾸는 조립 흐름을 관리합니다.

- **componentRegistry**: AI가 선택할 수 있는 컴포넌트 목록과 허용 패턴
- **classifyCapabilities**: capability를 Binary / Linear / State / Action / Info로 분류
- **generateBlueprint**: 분류 결과를 화면 section과 component node로 변환
- **validateBlueprint**: 등록되지 않은 컴포넌트, 잘못된 slot, 누락 prop을 차단

#### 4. `pages/` (Evidence Screens)

각종 제어 화면과 조립 증거 화면을 제공합니다.

- **Assembly Demo**: Device Spec → Pattern → Blueprint → Assembled UI → Guardrails 흐름 확인
- **AI Guardrails**: 조립 규칙과 금지 규칙 문서화
- **Device Pages**: Dashboard, Lighting, Air Conditioner, Curtain, Speaker, Washer, Refrigerator

#### 5. `navigation/` & shared organisms

화면 구성과 흐름을 담당하는 컨테이너 요소들입니다.

---

## 🛠 기술 스택 (Tech Stack)

- **Core**: React, Vite
- **Language**: JavaScript (ES6+)
- **Styling**: Vanilla CSS (CSS Modules & W3C Design Tokens)
