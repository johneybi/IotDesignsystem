import { getRegistryEntry, CONTROL_PATTERNS } from './componentRegistry';

const getAllNodes = (blueprint) => blueprint.sections.flatMap((section) => section.nodes);

export const validateBlueprint = (blueprint) => {
  const errors = [];
  const warnings = [];
  const nodes = getAllNodes(blueprint);

  nodes.forEach((node) => {
    const registryEntry = getRegistryEntry(node.component);

    if (!registryEntry) {
      errors.push({
        nodeId: node.id,
        message: `${node.component} is not registered in the design system.`,
      });
      return;
    }

    if (registryEntry.pattern !== node.pattern) {
      errors.push({
        nodeId: node.id,
        message: `${node.component} is registered for ${registryEntry.pattern}, not ${node.pattern}.`,
      });
    }

    if (!registryEntry.slots.includes(node.slot)) {
      errors.push({
        nodeId: node.id,
        message: `${node.component} is not allowed in the ${node.slot} slot.`,
      });
    }

    registryEntry.requiredProps.forEach((propName) => {
      if (node.props[propName] === undefined || node.props[propName] === '') {
        errors.push({
          nodeId: node.id,
          message: `${node.component} requires ${propName}.`,
        });
      }
    });

    if (node.pattern === CONTROL_PATTERNS.LINEAR) {
      if (typeof node.props.min !== 'number' || typeof node.props.max !== 'number') {
        errors.push({
          nodeId: node.id,
          message: 'Linear controls must define numeric min and max values.',
        });
      }

      if (node.props.min >= node.props.max) {
        errors.push({
          nodeId: node.id,
          message: 'Linear controls must have min lower than max.',
        });
      }
    }

    if (node.pattern === CONTROL_PATTERNS.ACTION && node.slot !== 'actions') {
      errors.push({
        nodeId: node.id,
        message: 'Action controls must be separated into the actions slot.',
      });
    }
  });

  if (!nodes.some((node) => node.slot === 'primaryControl')) {
    warnings.push({
      message: 'No primary control was generated. This device may be read-only or underspecified.',
    });
  }

  return {
    ok: errors.length === 0,
    errors,
    warnings,
  };
};
