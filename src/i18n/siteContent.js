export const siteContent = {
  ko: {
    languageName: '한국어',
    switchLabel: '언어',
    nav: {
      guide: 'Guide',
      pages: 'Pages',
      pagesTitle: 'View all pages',
      overview: 'Overview',
      atomic: 'Atomic Design',
      foundations: 'Foundations',
      guardrails: 'AI Guardrails',
      assembly: 'Assembly Demo',
      dashboard: 'Dashboard',
      lighting: 'Lighting Control',
      airconditioner: 'Air Conditioner',
      curtain: 'Smart Curtain',
      speaker: 'Speaker Control',
      washer: 'Washer',
      refrigerator: 'Refrigerator',
    },
    overview: {
      title: 'Flowthing Assembly Design System',
      intro:
        'Flowthing은 AI가 UI를 새로 디자인하는 방식이 아니라, Device Spec을 해석해 Control Pattern으로 분류하고 사전에 정의된 Design System Component를 조합하는 Assembly System입니다. 생성 결과는 Component Registry와 Guardrail을 통과한 Blueprint만 Renderer로 전달됩니다.',
      principlesTitle: 'Assembly Principles',
      principles: [
        {
          title: 'Component Registry',
          body: 'AI의 선택지는 사전에 등록된 Component, Variant, Token으로 제한됩니다. 새로운 Control이나 임의의 Visual Style을 생성하지 않습니다.',
        },
        {
          title: 'Pattern-first Mapping',
          body: 'Device Capability를 Binary, Linear, State, Action, Info Pattern으로 먼저 분류한 뒤 Component Mapping을 수행합니다.',
        },
        {
          title: 'Guardrail-based Output',
          body: 'Blueprint는 Slot, Required Props, Token, Interaction Rule 검증을 통과해야 실제 UI로 Rendering됩니다.',
        },
      ],
      pipelineTitle: 'Assembly Pipeline',
      pipeline: ['Device Spec', 'Capability Classifier', 'Component Registry', 'UI Blueprint', 'Guardrail Validator', 'React Renderer'],
      structureTitle: 'System Structure',
      structure: [
        ['Assembly', 'Component Registry, Classifier, Blueprint Generator, Validator, Renderer로 이어지는 UI Assembly Layer입니다.'],
        ['Foundations', 'Color, Typography, Shadow, Spacing을 Semantic Token으로 관리하는 Foundation Layer입니다.'],
        ['Atoms', 'Button, Slider, Chip처럼 Interaction과 Visual State의 최소 단위를 정의합니다.'],
        ['Molecules', 'Binary, Linear, State, Action, Info Pattern을 표현하는 Functional Unit입니다.'],
        ['Organisms', 'Device Card, Control Panel처럼 Device Context를 포함한 완성형 Control Unit입니다.'],
      ],
    },
    guardrails: {
      title: 'AI Guardrails',
      intro:
        'AI가 새로운 UI를 디자인하지 않고, 사전에 정의된 Design System Component를 조립할 때 적용되는 Constraint Set입니다. Output은 Component Registry, Token, Slot, Required Props 규칙을 통과한 Blueprint만 허용합니다.',
      hierarchyTitle: '1. Atomic Hierarchy Rules',
      hierarchyDesc: 'Component Assembly는 Atomic Design Hierarchy를 기준으로 계층 간 포함 관계를 제한합니다.',
      hierarchyStructure: 'Hierarchy',
      allowedTitle: 'Allowed Composition',
      forbiddenTitle: 'Forbidden Composition',
      parent: 'Parent Layer',
      mayContain: 'May Contain',
      violation: 'Violation',
      example: 'Example',
      reason: 'Reason',
      hierarchyRows: [
        ['Page', 'Organism, Molecule, Atom'],
        ['Organism', 'Molecule, Atom'],
        ['Molecule', 'Atom'],
        ['Atom', 'None (lowest layer)'],
      ],
      forbiddenRows: [
        ['Atom contains Organism', 'BinaryDeviceCard inside Button', '하위 Layer가 상위 Layer를 포함할 수 없습니다.'],
        ['Page uses only Atoms', 'Dashboard composed only with Buttons', 'Page 수준의 Information Architecture가 형성되지 않습니다.'],
        ['Skipping Molecules', 'Organism to Atom directly', 'Reusable Functional Unit을 거치지 않아 Assembly Consistency가 낮아집니다.'],
      ],
      patternTitle: '2. Pattern Constraints',
      patternDesc: 'Device Capability 조합에 따라 허용되는 Control Pattern과 Component Mapping이 결정됩니다.',
      mappingTitle: 'Capability → Pattern → Component Mapping',
      inputType: 'Input Type',
      pattern: 'Pattern',
      allowedComponents: 'Allowed Component',
      assemblyRule: 'Assembly Rule',
      patternRows: [
        ['boolean / OnOff', 'Binary', 'BinaryDeviceCard', '현재 State와 Toggle Action을 같은 Surface에서 노출합니다.'],
        ['range / number', 'Linear', 'HorizontalSlider, LinearSlider', 'min, max, unit, current value가 함께 정의된 Range Control만 허용합니다.'],
        ['enum / mode', 'State', 'ChipGroup, Dropdown', '상호 배타적인 Option Set을 명확한 Selection UI로 표현합니다.'],
        ['action / command', 'Action', 'ActionButton', 'Immediate Action은 Status Display와 분리된 Action Slot에 배치합니다.'],
        ['measurement / readOnly', 'Info', 'Readout', 'Sensor Data는 Readout으로만 표시하고 Control Component를 노출하지 않습니다.'],
      ],
      coreRulesTitle: 'Core Constraint Rules',
      coreRules: [
        ['Binary Pattern', 'On/Off Device에는 Slider 같은 Continuous Control을 배치하지 않습니다.'],
        ['Linear Pattern', 'min, max, unit이 없는 Range Control은 생성하지 않습니다.'],
        ['State Pattern', 'Option Set이 정의되지 않은 Selection UI는 생성하지 않습니다.'],
        ['Action Pattern', 'Immediate Action은 Status Display와 분리된 Action Slot에 배치합니다.'],
        ['Info Pattern', 'Sensor Data는 Readout으로만 표시하고 Control Component를 노출하지 않습니다.'],
      ],
      tokenTitle: '3. Token Enforcement',
      tokenDesc: 'Style 값은 W3C Design Token 체계를 통해 참조합니다.',
      allowed: 'Allowed',
      forbidden: 'Forbidden',
      tokenHierarchy: 'Token Hierarchy',
      tier: 'Tier',
      usage: 'Usage',
      tokenRows: [
        ['--ref-palette-*', 'Raw Color Value', '--ref-palette-orange-500'],
        ['--sys-color-*', 'Semantic Color', '--sys-color-status-active'],
        ['--comp-*', 'Component-specific Token', '--comp-card-bg'],
      ],
      valueTitle: '4. Value Validation',
      valueDesc: 'Device Control Value는 Capability Schema가 정의한 Safe Range 안에서만 허용됩니다.',
      temperatureTitle: 'Temperature (Thermostat)',
      category: 'Category',
      range: 'Range',
      defaultValue: 'Default',
      invalidTemp: 'Forbidden: negative temperature, 40°C or higher',
      otherValues: 'Other Control Values',
      controlType: 'Control Type',
      accessibilityTitle: '5. Accessibility Rules',
      accessibilityDesc: '모든 Interactive UI는 WCAG 2.1 AA 기준을 전제로 설계합니다.',
      contrastTitle: 'Color Contrast',
      touchTitle: 'Minimum Touch Target',
      statusTitle: 'State Display (multiple cues required)',
      status: 'State',
      color: 'Color',
      text: 'Text',
      icon: 'Icon',
      ariaTitle: 'ARIA Label (required)',
      compatibilityTitle: '6. Device Compatibility',
      compatibilityDesc: 'Device State와 Capability 지원 여부에 따라 Component 노출 범위를 제한합니다.',
      connectionTitle: 'Display by Connection State',
      display: 'Display',
      control: 'Control',
      style: 'Style',
      actuatableTitle: 'Actuatability',
      classification: 'Classification',
      deviceExample: 'Device Example',
      uiDisplay: 'UI Display',
      supportedOnlyTitle: 'Only Show Supported Features',
      supportedOnlyPrinciple: 'Principle: Device가 지원하지 않는 Capability의 UI는 노출하지 않습니다.',
      hierarchyCode: `Pages
  └── Organisms (composite component)
        └── Molecules (functional unit)
              └── Atoms (primitive unit)`,
      tokenAllowedExample: `/* Token reference */
color: var(--sys-color-text-primary);
background: var(--comp-card-bg);
border-radius: var(--comp-card-radius);`,
      tokenForbiddenExample: `/* Hard-coded value */
color: #ffffff;
color: #1a1a1a;
background: rgba(255, 255, 255, 0.65);
border-radius: 24px;`,
      otherValueRows: [
        ['Brightness (LevelControl)', '0% ~ 100%', '50%'],
        ['Color Temperature (ColorControl)', '2700K ~ 6500K', '4000K'],
        ['Curtain / Blind Position', '0% (closed) ~ 100% (open)', '50%'],
        ['Volume', '0% (mute) ~ 100%', '30%'],
      ],
      contrastRules: [
        ['Body Text', '4.5:1 이상'],
        ['Large Text', '3:1 이상 (18px+ 또는 14px+ bold)'],
        ['Icon / Graphic', '3:1 이상'],
      ],
      touchRules: [
        ['Button', '44x44px 이상'],
        ['Slider Handle', '44x44px 이상'],
        ['Tab Item', '48x48px 이상 권장'],
        ['Minimum', '24px 미만의 Interactive Target은 허용하지 않습니다.'],
      ],
      statusRows: [
        ['Active', 'Orange', '"On"', 'Filled icon'],
        ['Inactive', 'Gray', '"Off"', 'Outline icon'],
        ['Offline', 'Light Gray', '"Offline"', 'Ghost variant'],
      ],
      statusNote: 'Invalid Example: Color만으로 ON/OFF State를 구분하지 않습니다.',
      ariaExample: `// Valid example
<Button aria-label="Turn on living room light" />
<Slider
  aria-label="Adjust brightness"
  aria-valuenow={75}
  aria-valuemin={0}
  aria-valuemax={100}
/>

// Invalid example
<Button /> // missing aria-label
<div onClick={...} /> // missing role`,
      connectionRows: [
        ['Online', 'Default Component', 'Enabled', 'Default variant'],
        ['Offline', 'Ghost variant', 'Disabled', 'opacity: 0.5, dashed border'],
      ],
      actuatabilityRows: [
        ['Controllable (isActuatable: true)', 'Light, Air Conditioner, Curtain', 'Control Component enabled (Toggle, Slider, etc.)'],
        ['Read-only (isActuatable: false)', 'Temperature Sensor, Humidity Sensor, Motion Sensor', 'Readout only; Control UI is not allowed'],
      ],
      supportedFeatureRows: [
        'Light without Brightness Capability → hide VerticalSlider',
        'Light without Color Temperature Capability → hide ColorTemperatureSlider',
        'Air Conditioner without Fan Capability → hide FanModeSelector',
      ],
    },
    assembly: {
      title: 'Assembly Demo',
      intro: 'Device Spec이 Pattern Classification과 Component Mapping을 거쳐 UI Blueprint로 조립되는 과정을 확인하는 Demo입니다. AI는 Component를 새로 디자인하지 않고 Registry에 등록된 Component만 선택합니다.',
      reset: 'Reset',
      pipeline: ['Device Spec', 'Pattern Classifier', 'Component Registry', 'UI Blueprint', 'Guardrail Validator', 'React Renderer'],
      inputTitle: '1. Input',
      inputSubtitle: 'Device JSON',
      patternTitle: '2. Pattern',
      patternSubtitle: 'Classifier Result',
      blueprintTitle: '3. Blueprint',
      blueprintSubtitle: 'Allowed Components Only',
      previewTitle: '4. Assembled UI',
      guardrailsTitle: '5. Guardrails',
      passed: 'Passed',
      blocked: 'Blocked',
      validJsonRequired: '유효한 JSON이 필요합니다.',
      noPreview: 'Preview를 생성할 수 없습니다.',
      parseError: 'JSON Parse Error',
      validationPass: 'Blueprint가 등록된 Component와 허용된 Slot만 사용합니다.',
      validationFail: 'Blueprint에 Blocker가 있습니다.',
      actionAccepted: 'Action이 Blueprint Rule에 따라 허용되었습니다.',
    },
  },
  en: {
    languageName: 'English',
    switchLabel: 'Language',
    nav: {
      guide: 'Guide',
      pages: 'Pages',
      pagesTitle: 'Click to view all pages',
      overview: 'Overview',
      atomic: 'Atomic Design',
      foundations: 'Foundations',
      guardrails: 'AI Guardrails',
      assembly: 'Assembly Demo',
      dashboard: 'Dashboard',
      lighting: 'Lighting Control',
      airconditioner: 'Air Conditioner',
      curtain: 'Smart Curtain',
      speaker: 'Speaker Control',
      washer: 'Washer',
      refrigerator: 'Refrigerator',
    },
    overview: {
      title: 'Flowthing Assembly Design System',
      intro:
        'Flowthing is not a system where AI freely designs new UI. It is an assembly structure where AI reads device capabilities, classifies them into control patterns, and composes only pre-defined design system components.',
      principlesTitle: 'Assembly Principles',
      principles: [
        {
          title: 'Pre-defined Components',
          body: 'AI cannot invent new controls, colors, or layouts. It selects from the registered component library and design tokens.',
        },
        {
          title: 'Pattern-first Mapping',
          body: 'Device capabilities are classified into Binary, Linear, State, Action, or Info before any UI component is chosen.',
        },
        {
          title: 'Guarded Assembly',
          body: 'A blueprint is validated against slot, prop, token, and interaction rules before it becomes a rendered interface.',
        },
      ],
      pipelineTitle: 'Assembly Pipeline',
      pipeline: ['Device Spec', 'Capability Classifier', 'Component Registry', 'UI Blueprint', 'Guardrail Validator', 'React Renderer'],
      structureTitle: 'System Structure',
      structure: [
        ['Assembly', 'Registry, classifier, blueprint generator, validator, and renderer flow.'],
        ['Foundations', 'Colors, typography, shadows, and spacing.'],
        ['Atoms', 'Visual minimum units. Basic building blocks like buttons, sliders, and chips.'],
        ['Molecules', 'Functional pattern units for Binary, Linear, State, Action, and Info controls.'],
        ['Organisms', 'Context-aware control units like device cards and control panels.'],
      ],
    },
    guardrails: {
      title: 'AI Guardrails',
      intro:
        'These are the rules AI must follow when assembling pre-defined design system components instead of designing new UI. They keep generated results inside registered components, tokens, and slot structures.',
      hierarchyTitle: '1. Atomic Hierarchy Rules',
      hierarchyDesc: 'AI must follow the Atomic Design hierarchy when composing components.',
      hierarchyStructure: 'Hierarchy',
      allowedTitle: 'Allowed Compositions',
      forbiddenTitle: 'Forbidden Compositions',
      parent: 'Parent',
      mayContain: 'May contain',
      violation: 'Violation',
      example: 'Example',
      reason: 'Reason',
      hierarchyRows: [
        ['Page', 'Organism, Molecule, Atom'],
        ['Organism', 'Molecule, Atom'],
        ['Molecule', 'Atom'],
        ['Atom', 'None (lowest level)'],
      ],
      forbiddenRows: [
        ['Atom contains Organism', 'BinaryDeviceCard inside Button', 'Lower levels cannot contain higher levels'],
        ['Page uses only Atoms', 'Dashboard made only with Buttons', 'Not enough structural complexity'],
        ['Skipping Molecules', 'Organism → Atom directly', 'The middle layer is required'],
      ],
      patternTitle: '2. Pattern Constraints',
      patternDesc: 'Allowed UI patterns and components are constrained by device capability combinations.',
      mappingTitle: 'Capability → Pattern → Component Mapping',
      inputType: 'Input type',
      pattern: 'Pattern',
      allowedComponents: 'Allowed components',
      assemblyRule: 'Assembly rule',
      patternRows: [
        ['boolean / OnOff', 'Binary', 'BinaryDeviceCard', 'Show current state and immediate toggle together'],
        ['range / number', 'Linear', 'HorizontalSlider, LinearSlider', 'Show range, unit, and current value together'],
        ['enum / mode', 'State', 'ChipGroup, Dropdown', 'Clearly separate mutually exclusive states'],
        ['action / command', 'Action', 'ActionButton', 'Place actions separately from state display'],
        ['measurement / readOnly', 'Info', 'Readout (non-controllable)', 'Display measured values instead of controls'],
      ],
      coreRulesTitle: 'Core Constraint Rules',
      coreRules: [
        ['Binary pattern', 'Do not use continuous controls such as sliders for simple on/off devices'],
        ['Linear pattern', 'Do not generate continuous controls without min, max, and unit'],
        ['State pattern', 'Do not generate selection UI without state options'],
        ['Action pattern', 'Separate risky or immediate actions from state display'],
        ['Info pattern', 'Sensors are read-only and must not expose control components'],
      ],
      tokenTitle: '3. Token Enforcement',
      tokenDesc: 'All style values must use W3C design tokens.',
      allowed: 'Allowed',
      forbidden: 'Forbidden',
      tokenHierarchy: 'Token Hierarchy',
      tier: 'Tier',
      usage: 'Usage',
      tokenRows: [
        ['--ref-palette-*', 'Raw color values', '--ref-palette-orange-500'],
        ['--sys-color-*', 'Semantic colors', '--sys-color-status-active'],
        ['--comp-*', 'Component-specific values', '--comp-card-bg'],
      ],
      valueTitle: '4. Value Validation',
      valueDesc: 'Device control values are allowed only inside safe ranges.',
      temperatureTitle: 'Temperature (Thermostat)',
      category: 'Category',
      range: 'Range',
      defaultValue: 'Default',
      invalidTemp: 'Forbidden: negative temperatures or 40°C+ values',
      otherValues: 'Other Control Values',
      controlType: 'Control type',
      accessibilityTitle: '5. Accessibility Rules',
      accessibilityDesc: 'Every UI must follow WCAG 2.1 AA accessibility standards.',
      contrastTitle: 'Color Contrast',
      touchTitle: 'Minimum Touch Target',
      statusTitle: 'State Display (multiple cues required)',
      status: 'State',
      color: 'Color',
      text: 'Text',
      icon: 'Icon',
      ariaTitle: 'ARIA Labels (required)',
      compatibilityTitle: '6. Device Compatibility',
      compatibilityDesc: 'UI compatibility rules based on device state and capabilities.',
      connectionTitle: 'Display by Connection State',
      display: 'Display',
      control: 'Control',
      style: 'Style',
      actuatableTitle: 'Actuatability',
      classification: 'Classification',
      deviceExample: 'Device example',
      uiDisplay: 'UI display',
      supportedOnlyTitle: 'Only Show Supported Features',
      supportedOnlyPrinciple: 'Principle: do not show UI for features the device does not support',
      hierarchyCode: `Pages
  └── Organisms (composite components)
        └── Molecules (functional units)
              └── Atoms (primitive units)`,
      tokenAllowedExample: `/* Token reference */
color: var(--sys-color-text-primary);
background: var(--comp-card-bg);
border-radius: var(--comp-card-radius);`,
      tokenForbiddenExample: `/* Hard-coded value */
color: #ffffff;
color: #1a1a1a;
background: rgba(255, 255, 255, 0.65);
border-radius: 24px;`,
      otherValueRows: [
        ['Brightness (LevelControl)', '0% ~ 100%', '50%'],
        ['Color Temperature (ColorControl)', '2700K ~ 6500K', '4000K'],
        ['Curtain / Blind Position', '0% (closed) ~ 100% (open)', '50%'],
        ['Volume', '0% (mute) ~ 100%', '30%'],
      ],
      contrastRules: [
        ['Body Text', '4.5:1 or higher'],
        ['Large Text', '3:1 or higher (18px+ or 14px+ bold)'],
        ['Icon / Graphic', '3:1 or higher'],
      ],
      touchRules: [
        ['Button', '44x44px or larger'],
        ['Slider Handle', '44x44px or larger'],
        ['Tab Item', '48x48px or larger recommended'],
        ['Minimum', 'Interactive targets smaller than 24px are not allowed.'],
      ],
      statusRows: [
        ['Active', 'Orange', '"On"', 'Filled icon'],
        ['Inactive', 'Gray', '"Off"', 'Outline icon'],
        ['Offline', 'Light Gray', '"Offline"', 'Ghost variant'],
      ],
      statusNote: 'Invalid example: do not distinguish ON/OFF state by color alone.',
      ariaExample: `// Valid example
<Button aria-label="Turn on living room light" />
<Slider
  aria-label="Adjust brightness"
  aria-valuenow={75}
  aria-valuemin={0}
  aria-valuemax={100}
/>

// Invalid example
<Button /> // missing aria-label
<div onClick={...} /> // missing role`,
      connectionRows: [
        ['Online', 'Default Component', 'Enabled', 'Default variant'],
        ['Offline', 'Ghost variant', 'Disabled', 'opacity: 0.5, dashed border'],
      ],
      actuatabilityRows: [
        ['Controllable (isActuatable: true)', 'Light, Air Conditioner, Curtain', 'Control Component enabled (Toggle, Slider, etc.)'],
        ['Read-only (isActuatable: false)', 'Temperature Sensor, Humidity Sensor, Motion Sensor', 'Readout only; Control UI is not allowed'],
      ],
      supportedFeatureRows: [
        'Light without Brightness Capability → hide VerticalSlider',
        'Light without Color Temperature Capability → hide ColorTemperatureSlider',
        'Air Conditioner without Fan Capability → hide FanModeSelector',
      ],
    },
    assembly: {
      title: 'Assembly Demo',
      intro: 'AI does not design new components. It classifies device specs into patterns and assembles registered design system components only.',
      reset: 'Reset',
      pipeline: ['Device Spec', 'Pattern Classifier', 'Component Registry', 'Blueprint', 'Renderer'],
      inputTitle: '1. Input',
      inputSubtitle: 'Device JSON',
      patternTitle: '2. Pattern',
      patternSubtitle: 'Classifier result',
      blueprintTitle: '3. Blueprint',
      blueprintSubtitle: 'Allowed components only',
      previewTitle: '4. Assembled UI',
      guardrailsTitle: '5. Guardrails',
      passed: 'Passed',
      blocked: 'Blocked',
      validJsonRequired: 'Valid JSON is required.',
      noPreview: 'No preview available.',
      parseError: 'JSON parse error',
      validationPass: 'Blueprint uses registered components and allowed slots.',
      validationFail: 'Blueprint has blocking issues.',
      actionAccepted: 'action accepted by blueprint',
    },
  },
};

export const getSiteContent = (locale) => siteContent[locale] || siteContent.ko;
