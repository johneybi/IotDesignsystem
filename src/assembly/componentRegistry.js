export const CONTROL_PATTERNS = {
  BINARY: 'Binary',
  LINEAR: 'Linear',
  STATE: 'State',
  ACTION: 'Action',
  INFO: 'Info',
};

export const componentRegistry = {
  BinaryDeviceCard: {
    id: 'BinaryDeviceCard',
    pattern: CONTROL_PATTERNS.BINARY,
    slots: ['summary', 'primaryControl'],
    suitableFor: ['power', 'onOff', 'switch'],
    requiredProps: ['statusKey', 'valueKey'],
    description: 'Shows current on/off state and exposes one toggle action.',
  },
  HorizontalSlider: {
    id: 'HorizontalSlider',
    pattern: CONTROL_PATTERNS.LINEAR,
    slots: ['primaryControl'],
    suitableFor: ['openLevel', 'position', 'openness', 'curtain'],
    requiredProps: ['valueKey', 'min', 'max', 'unit'],
    description: 'Represents spatial position or openness on a horizontal axis.',
  },
  LinearSlider: {
    id: 'LinearSlider',
    pattern: CONTROL_PATTERNS.LINEAR,
    slots: ['primaryControl', 'secondaryControl'],
    suitableFor: ['brightness', 'volume', 'temperature', 'level'],
    requiredProps: ['valueKey', 'min', 'max', 'unit'],
    description: 'Represents a continuous or stepped numeric control.',
  },
  ChipGroup: {
    id: 'ChipGroup',
    pattern: CONTROL_PATTERNS.STATE,
    slots: ['secondaryControl'],
    suitableFor: ['mode', 'fanMode', 'temperatureMode'],
    requiredProps: ['valueKey', 'options'],
    description: 'Represents mutually exclusive states.',
  },
  ActionButton: {
    id: 'ActionButton',
    pattern: CONTROL_PATTERNS.ACTION,
    slots: ['actions'],
    suitableFor: ['open', 'close', 'pause', 'start', 'stop', 'reset'],
    requiredProps: ['actionKey', 'label'],
    description: 'Runs one immediate command separated from state display.',
  },
  Readout: {
    id: 'Readout',
    pattern: CONTROL_PATTERNS.INFO,
    slots: ['status'],
    suitableFor: ['measurement', 'sensor', 'currentTemperature'],
    requiredProps: ['valueKey', 'unit'],
    description: 'Displays measured or read-only device information.',
  },
};

export const registryByPattern = Object.values(componentRegistry).reduce((acc, entry) => {
  acc[entry.pattern] = acc[entry.pattern] || [];
  acc[entry.pattern].push(entry);
  return acc;
}, {});

export const getRegistryEntry = (componentId) => componentRegistry[componentId];
