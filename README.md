# IoT Design System

IoT 대시보드 및 컨트롤 패널 구축을 위한 React 기반 디자인 시스템입니다.
물리적 장치 제어와 실시간 상태 모니터링에 최적화된 컴포넌트 라이브러리를 효율적으로 관리하고 생산하기 위한 템플릿입니다.

## 🚀 시작하기 (Getting Started)

프로젝트를 로컬 환경에서 실행하려면 다음 단계를 따르세요.

### 설치 (Installation)

의존성 패키지를 설치합니다.

```bash
npm install
```

### 개발 서버 실행 (Run Dev Server)

로컬 개발 서버를 실행합니다.

```bash
npm run dev
```

브라우저에서 `http://localhost:5173`으로 접속하여 확인할 수 있습니다.

---

## 📂 아키텍처 및 폴더 구조 (Architecture)

이 프로젝트는 IoT 애플리케이션의 특성(Device Control & Monitoring)을 반영하여 직관적이고 확장 가능한 구조로 설계되었습니다. 각 디렉토리는 명확한 역할과 책임을 가집니다.

### 컴포넌트 구조 (`src/components`)

컴포넌트는 역할에 따라 7가지 카테고리로 분류됩니다.

#### 1. 🎨 `foundations/` (기반 요소)

시스템의 가장 기초가 되는 "원자(Atom)" 단위입니다.

- **역할**: 컬러, 타이포그래피, 아이콘, 쉐도우 등 디자인 토큰 관리.
- **목적**: 브랜드 일관성 유지 및 테마(Dark/Light) 확장의 용이성 확보.
- **주요 요소**: Colors, Typography, Radius, Shadows, Icons

#### 2. 🎛 `inputs/` (입력 및 제어)

사용자가 물리적 장치에 명령을 내리는 인터페이스입니다.

- **역할**: 스위치, 슬라이더, 노브 등 직관적인 조작 요소 제공.
- **목적**: IoT 특유의 물리적 조작감(Feedback)을 디지털 UI로 구현.
- **주요 요소**: Switch, Slider, Knob, Button, TextField

#### 3. 📊 `data-display/` (데이터 표시)

센서 값과 장치 상태를 시각화합니다.

- **역할**: 수치 데이터, 그래프, 상태 배지 등 정보 전달.
- **목적**: 복잡한 센서 데이터를 사용자가 한눈에 파악할 수 있도록 가독성 최적화.
- **주요 요소**: SensorCard, StatusBadge, Chart, List, Avatar

#### 4. 🔔 `feedback/` (피드백 및 알림)

사용자 동작에 대한 시스템의 응답을 보여줍니다.

- **역할**: 로딩 상태, 성공/실패 메시지, 경고 알림 등.
- **목적**: 네트워크 지연이 잦은 IoT 환경에서 사용자의 불안감(명령이 전송되었는지 등) 해소.
- **주요 요소**: Spinner(Loading), Toast, Alert, Progress

#### 5. 📐 `layout/` (레이아웃)

화면의 전체적인 구조와 배치를 담당합니다.

- **역할**: 그리드 시스템, 스택, 컨테이너 등.
- **목적**: 다양한 디바이스(모바일, 태블릿, 월패드)에 대응하는 반응형 구조 제공.
- **주요 요소**: Grid, Stack, Container, Box, Divider

#### 6. 🧭 `navigation/` (네비게이션)

앱 내의 이동과 탐색을 돕습니다.

- **역할**: 사이드바, 탭, 헤더 등 메뉴 구조.
- **목적**: 집 > 방 > 기기 > 설정으로 이어지는 계층 구조를 쉽게 탐색하도록 지원.
- **주요 요소**: Sidebar, Tabs, Breadcrumbs, BottomNav

#### 7. 📑 `overlay/` (오버레이)

현재 화면 위에 뜨는 보조 화면입니다.

- **역할**: 모달, 드로어, 툴팁 등.
- **목적**: 사용자 컨텍스트를 유지하면서 빠른 설정 변경이나 상세 정보 확인 지원.
- **주요 요소**: Modal, Drawer, Tooltip, Popover

---

### 기타 디렉토리 (`src/`)

- **`styles/`**: 전역 스타일(Reset CSS), 테마 변수(Variables), 공통 믹스인 등을 관리합니다.
- **`hooks/`**: `useDeviceStatus`, `useMqtt` 등 IoT 통신 및 상태 관리 로직을 재사용 가능한 형태로 관리합니다.
- **`utils/`**: 날짜 포맷팅, 단위 변환(C↔F) 등 순수 헬퍼 함수들을 모아둡니다.

## 🛠 기술 스택 (Tech Stack)

- **Core**: React, Vite
- **Language**: JavaScript (ES6+)
- **Styling**: Vanilla CSS (with CSS Modules & Variables)
