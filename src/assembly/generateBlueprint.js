import { classifyCapabilities } from './classifyCapabilities';
import { CONTROL_PATTERNS } from './componentRegistry';

const includesAny = (source = '', keywords = []) => {
  const normalized = source.toLowerCase();
  return keywords.some((keyword) => normalized.includes(keyword));
};

const getCapabilityKey = (capability) => capability.id || capability.name || capability.key;

const getLinearComponent = (deviceSpec, capability) => {
  const key = getCapabilityKey(capability) || '';
  const deviceName = deviceSpec.device || deviceSpec.deviceType || '';

  if (includesAny(`${deviceName} ${key}`, ['curtain', 'blind', 'cover', 'openlevel', 'openness', 'position'])) {
    return 'HorizontalSlider';
  }

  return 'LinearSlider';
};

const mapCapabilityToNode = (deviceSpec, capability) => {
  const key = getCapabilityKey(capability);
  const label = capability.label || capability.name || capability.id || capability.action || 'Capability';

  if (capability.pattern === CONTROL_PATTERNS.BINARY) {
    return {
      id: `${key}-binary`,
      slot: 'summary',
      pattern: CONTROL_PATTERNS.BINARY,
      component: 'BinaryDeviceCard',
      props: {
        valueKey: key,
        statusKey: key,
        label,
      },
      sourceCapability: key,
    };
  }

  if (capability.pattern === CONTROL_PATTERNS.LINEAR) {
    return {
      id: `${key}-linear`,
      slot: 'primaryControl',
      pattern: CONTROL_PATTERNS.LINEAR,
      component: getLinearComponent(deviceSpec, capability),
      props: {
        valueKey: key,
        label,
        min: capability.min ?? 0,
        max: capability.max ?? 100,
        unit: capability.unit || '',
      },
      sourceCapability: key,
    };
  }

  if (capability.pattern === CONTROL_PATTERNS.STATE) {
    return {
      id: `${key}-state`,
      slot: 'secondaryControl',
      pattern: CONTROL_PATTERNS.STATE,
      component: 'ChipGroup',
      props: {
        valueKey: key,
        label,
        options: capability.options || capability.values || [],
      },
      sourceCapability: key,
    };
  }

  if (capability.pattern === CONTROL_PATTERNS.ACTION) {
    return {
      id: `${key}-action`,
      slot: 'actions',
      pattern: CONTROL_PATTERNS.ACTION,
      component: 'ActionButton',
      props: {
        actionKey: key,
        label,
      },
      sourceCapability: key,
    };
  }

  return {
    id: `${key}-info`,
    slot: 'status',
    pattern: CONTROL_PATTERNS.INFO,
    component: 'Readout',
    props: {
      valueKey: key,
      label,
      unit: capability.unit || '',
    },
    sourceCapability: key,
  };
};

export const generateBlueprint = (deviceSpec) => {
  const capabilities = classifyCapabilities(deviceSpec.capabilities || []);
  const nodes = capabilities.map((capability) => mapCapabilityToNode(deviceSpec, capability));

  return {
    schemaVersion: 'flowthing.blueprint.v1',
    generator: 'rule-based-assembly',
    device: deviceSpec.device || deviceSpec.deviceType || 'Device',
    room: deviceSpec.room || 'Unassigned',
    capabilities,
    sections: [
      {
        id: 'summary',
        title: 'Summary',
        nodes: nodes.filter((node) => node.slot === 'summary'),
      },
      {
        id: 'primaryControl',
        title: 'Primary Control',
        nodes: nodes.filter((node) => node.slot === 'primaryControl'),
      },
      {
        id: 'secondaryControl',
        title: 'State Controls',
        nodes: nodes.filter((node) => node.slot === 'secondaryControl'),
      },
      {
        id: 'actions',
        title: 'Actions',
        nodes: nodes.filter((node) => node.slot === 'actions'),
      },
      {
        id: 'status',
        title: 'Status',
        nodes: nodes.filter((node) => node.slot === 'status'),
      },
    ].filter((section) => section.nodes.length > 0),
  };
};
