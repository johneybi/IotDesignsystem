import { CONTROL_PATTERNS } from './componentRegistry';

const linearTypes = new Set(['range', 'number', 'level', 'temperature']);
const binaryTypes = new Set(['boolean', 'binary', 'onOff', 'switch']);
const stateTypes = new Set(['enum', 'state', 'mode']);
const actionTypes = new Set(['action', 'command']);
const infoTypes = new Set(['measurement', 'sensor', 'readOnly', 'readonly', 'info']);

const clusterPatternMap = {
  OnOff: CONTROL_PATTERNS.BINARY,
  LevelControl: CONTROL_PATTERNS.LINEAR,
  ColorControl: CONTROL_PATTERNS.LINEAR,
  WindowCovering: CONTROL_PATTERNS.LINEAR,
  Thermostat: CONTROL_PATTERNS.LINEAR,
  MediaPlayback: CONTROL_PATTERNS.ACTION,
  ModeSelect: CONTROL_PATTERNS.STATE,
  TemperatureMeasurement: CONTROL_PATTERNS.INFO,
};

export const classifyCapability = (capability) => {
  const rawType = capability.type || capability.kind || '';
  const type = String(rawType).trim();

  if (binaryTypes.has(type)) return CONTROL_PATTERNS.BINARY;
  if (linearTypes.has(type)) return CONTROL_PATTERNS.LINEAR;
  if (stateTypes.has(type)) return CONTROL_PATTERNS.STATE;
  if (actionTypes.has(type)) return CONTROL_PATTERNS.ACTION;
  if (infoTypes.has(type)) return CONTROL_PATTERNS.INFO;

  if (Array.isArray(capability.options) || Array.isArray(capability.values)) {
    return CONTROL_PATTERNS.STATE;
  }

  if (
    typeof capability.min === 'number' ||
    typeof capability.max === 'number' ||
    capability.unit
  ) {
    return CONTROL_PATTERNS.LINEAR;
  }

  const cluster = capability.cluster || capability.matterCluster;
  if (cluster && clusterPatternMap[cluster]) {
    return clusterPatternMap[cluster];
  }

  return CONTROL_PATTERNS.INFO;
};

export const classifyCapabilities = (capabilities = []) =>
  capabilities.map((capability) => ({
    ...capability,
    pattern: classifyCapability(capability),
  }));
