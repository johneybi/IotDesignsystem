# Atomic Hierarchy Rules

AI가 컴포넌트를 조합할 때 **Atomic Design 계층**을 준수해야 합니다.

## 계층 구조

```
Pages
  └── Organisms (복합 컴포넌트)
        └── Molecules (기능 단위)
              └── Atoms (기본 단위)
```

## 필수 규칙

### ✅ 허용되는 조합

| 상위 계층 | 포함 가능                |
| --------- | ------------------------ |
| Page      | Organism, Molecule, Atom |
| Organism  | Molecule, Atom           |
| Molecule  | Atom                     |
| Atom      | 없음 (최하위)            |

### ❌ 금지되는 조합

| 위반                 | 예시                         | 이유                  |
| -------------------- | ---------------------------- | --------------------- |
| Atom → Organism 포함 | Button 안에 BinaryDeviceCard | 하위가 상위 포함 불가 |
| Page → Atom만 사용   | Dashboard에 Button만         | 구조적 복잡성 부족    |
| Molecule 건너뛰기    | Organism → Atom 직접         | 중간 계층 필수        |

## 컴포넌트별 필수 구성

```yaml
BinaryDeviceCard (Organism):
  필수: [Button (Atom)]
  선택: [DeviceInfo (Molecule)]

VerticalSlider (Molecule):
  필수: [SliderThumb (Atom), SliderTrack (Atom)]

TemperatureControl (Molecule):
  필수: [CircularGauge (Molecule), IndicatorDot (Atom)]

BlindCurtain (Organism):
  필수: [HorizontalSlider (Molecule), Readout (Molecule)]
```

## 검증 로직

```javascript
function validateHierarchy(component) {
  const hierarchy = { Page: 4, Organism: 3, Molecule: 2, Atom: 1 };

  for (const child of component.children) {
    if (hierarchy[child.type] >= hierarchy[component.type]) {
      throw new Error(
        `${child.type}은 ${component.type} 내부에 포함될 수 없습니다`,
      );
    }
  }
  return true;
}
```
