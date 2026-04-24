import React, { useMemo, useState } from 'react';
import { NavArrowLeft, NavArrowRight, Pause, SystemShut } from 'iconoir-react';
import { Blinds } from 'lucide-react';
import { generateBlueprint } from '../../../assembly/generateBlueprint';
import { validateBlueprint } from '../../../assembly/validateBlueprint';
import BinaryDeviceCard from '../../organisms/Cards/BinaryDeviceCard/BinaryDeviceCard';
import HorizontalSlider from '../../molecules/Linear/HorizontalSlider/HorizontalSlider';
import Slider from '../../molecules/Linear/Slider/Slider';
import Chip from '../../atoms/Chip/Chip';
import Button from '../../atoms/Button/Button';
import Readout from '../../molecules/Display/Readout/Readout';
import styles from './AssemblyDemo.module.css';

const sampleDeviceSpec = {
  device: 'Curtain',
  room: 'Living Room',
  capabilities: [
    {
      id: 'openLevel',
      label: 'Openness',
      type: 'range',
      min: 0,
      max: 100,
      unit: '%',
    },
    {
      id: 'open',
      label: 'Open',
      type: 'action',
    },
    {
      id: 'pause',
      label: 'Pause',
      type: 'action',
    },
    {
      id: 'close',
      label: 'Close',
      type: 'action',
    },
  ],
};

const createInitialValues = (blueprint) => {
  const values = {};

  blueprint.capabilities.forEach((capability) => {
    const key = capability.id || capability.name || capability.key;

    if (capability.pattern === 'Linear') {
      values[key] = capability.defaultValue ?? Math.round(((capability.min ?? 0) + (capability.max ?? 100)) / 2);
    } else if (capability.pattern === 'Binary') {
      values[key] = capability.defaultValue ?? true;
    } else if (capability.pattern === 'State') {
      values[key] = capability.defaultValue ?? capability.options?.[0]?.value ?? capability.options?.[0] ?? '';
    } else if (capability.pattern === 'Info') {
      values[key] = capability.defaultValue ?? capability.value ?? '-';
    }
  });

  return values;
};

const parseSpec = (input) => {
  try {
    return {
      value: JSON.parse(input),
      error: null,
    };
  } catch (error) {
    return {
      value: null,
      error: error.message,
    };
  }
};

const AssemblyDemo = () => {
  const [specInput, setSpecInput] = useState(JSON.stringify(sampleDeviceSpec, null, 2));
  const parsedSpec = useMemo(() => parseSpec(specInput), [specInput]);
  const blueprint = useMemo(
    () => (parsedSpec.value ? generateBlueprint(parsedSpec.value) : null),
    [parsedSpec.value],
  );
  const validation = useMemo(
    () => (blueprint ? validateBlueprint(blueprint) : null),
    [blueprint],
  );
  const [values, setValues] = useState(() => createInitialValues(generateBlueprint(sampleDeviceSpec)));
  const [actionLog, setActionLog] = useState([]);

  const updateValue = (key, value) => {
    setValues((prev) => ({ ...prev, [key]: value }));
  };

  const runAction = (label) => {
    setActionLog((prev) => [`${label} action accepted by blueprint`, ...prev].slice(0, 4));

    if (label.toLowerCase() === 'open') updateValue('openLevel', 100);
    if (label.toLowerCase() === 'close') updateValue('openLevel', 0);
  };

  const resetSample = () => {
    setSpecInput(JSON.stringify(sampleDeviceSpec, null, 2));
    setValues(createInitialValues(generateBlueprint(sampleDeviceSpec)));
    setActionLog([]);
  };

  return (
    <div className="doc-section">
      <div className={styles.header}>
        <div>
          <h1 className="doc-title">Assembly Demo</h1>
          <p className="doc-intro">
            AI는 새 컴포넌트를 디자인하지 않고, 기기 명세를 패턴으로 분류한 뒤 등록된 디자인 시스템 컴포넌트만 조립합니다.
          </p>
        </div>
        <button className={styles.resetButton} onClick={resetSample}>
          Reset
        </button>
      </div>

      <div className={styles.pipeline}>
        <span>Device Spec</span>
        <NavArrowRight width={18} height={18} />
        <span>Pattern Classifier</span>
        <NavArrowRight width={18} height={18} />
        <span>Component Registry</span>
        <NavArrowRight width={18} height={18} />
        <span>Blueprint</span>
        <NavArrowRight width={18} height={18} />
        <span>Renderer</span>
      </div>

      <div className={styles.grid}>
        <section className={styles.panel}>
          <div className={styles.panelHeader}>
            <h2>1. Input</h2>
            <span>Device JSON</span>
          </div>
          <textarea
            className={styles.textarea}
            value={specInput}
            onChange={(event) => setSpecInput(event.target.value)}
            spellCheck={false}
          />
          {parsedSpec.error && <div className={styles.error}>JSON parse error: {parsedSpec.error}</div>}
        </section>

        <section className={styles.panel}>
          <div className={styles.panelHeader}>
            <h2>2. Pattern</h2>
            <span>Classifier result</span>
          </div>
          {blueprint ? (
            <div className={styles.patternList}>
              {blueprint.capabilities.map((capability) => (
                <div className={styles.patternRow} key={capability.id || capability.name}>
                  <span>{capability.label || capability.id || capability.name}</span>
                  <strong>{capability.pattern}</strong>
                </div>
              ))}
            </div>
          ) : (
            <div className={styles.empty}>Valid JSON is required.</div>
          )}
        </section>

        <section className={styles.panel}>
          <div className={styles.panelHeader}>
            <h2>3. Blueprint</h2>
            <span>Allowed components only</span>
          </div>
          <pre className={styles.codeBlock}>
            {blueprint ? JSON.stringify(blueprint.sections, null, 2) : '[]'}
          </pre>
        </section>
      </div>

      <div className={styles.outputGrid}>
        <section className={styles.previewPanel}>
          <div className={styles.panelHeader}>
            <h2>4. Assembled UI</h2>
            <span>{blueprint?.device || 'Device'}</span>
          </div>
          {blueprint ? (
            <AssembledPreview
              blueprint={blueprint}
              values={values}
              onChange={updateValue}
              onAction={runAction}
            />
          ) : (
            <div className={styles.empty}>No preview available.</div>
          )}
        </section>

        <section className={styles.panel}>
          <div className={styles.panelHeader}>
            <h2>5. Guardrails</h2>
            <span>{validation?.ok ? 'Passed' : 'Blocked'}</span>
          </div>
          {validation && (
            <div className={styles.validation}>
              <div className={validation.ok ? styles.pass : styles.fail}>
                {validation.ok ? 'Blueprint uses registered components and allowed slots.' : 'Blueprint has blocking issues.'}
              </div>
              {[...validation.errors, ...validation.warnings].map((item, index) => (
                <div className={styles.validationRow} key={`${item.message}-${index}`}>
                  {item.nodeId && <code>{item.nodeId}</code>}
                  <span>{item.message}</span>
                </div>
              ))}
              {actionLog.length > 0 && (
                <div className={styles.actionLog}>
                  {actionLog.map((item) => (
                    <span key={item}>{item}</span>
                  ))}
                </div>
              )}
            </div>
          )}
        </section>
      </div>
    </div>
  );
};

const AssembledPreview = ({ blueprint, values, onChange, onAction }) => (
  <div className={styles.devicePreview}>
    <div className={styles.deviceTitle}>
      <span>{blueprint.room}</span>
      <strong>{blueprint.device}</strong>
    </div>
    {blueprint.sections.map((section) => (
      <div className={styles.previewSection} key={section.id}>
        <span className={styles.previewSectionTitle}>{section.title}</span>
        {section.nodes.map((node) => (
          <RegistryNode
            key={node.id}
            node={node}
            deviceName={blueprint.device}
            values={values}
            onChange={onChange}
            onAction={onAction}
          />
        ))}
      </div>
    ))}
  </div>
);

const RegistryNode = ({ node, deviceName, values, onChange, onAction }) => {
  const valueKey = node.props.valueKey;
  const currentValue = values[valueKey];

  if (node.component === 'BinaryDeviceCard') {
    return (
      <BinaryDeviceCard
        name={deviceName}
        status={currentValue ? 'On' : 'Off'}
        isOn={Boolean(currentValue)}
        onToggle={() => onChange(valueKey, !currentValue)}
        icon={<SystemShut width={24} height={24} />}
        variant="minimal"
      />
    );
  }

  if (node.component === 'HorizontalSlider') {
    return (
      <div className={styles.controlBlock}>
        <Readout value={Math.round(currentValue ?? 0)} unit={node.props.unit} label={node.props.label} />
        <HorizontalSlider
          min={node.props.min}
          max={node.props.max}
          value={currentValue ?? 0}
          onChange={(nextValue) => onChange(valueKey, Math.round(nextValue))}
          leftIcon={<Blinds size={24} color="#515151" />}
          rightIcon={null}
          iconFade={false}
          showValue={false}
        />
      </div>
    );
  }

  if (node.component === 'LinearSlider') {
    return (
      <div className={styles.controlBlock}>
        <Readout value={Math.round(currentValue ?? 0)} unit={node.props.unit} label={node.props.label} />
        <Slider
          min={node.props.min}
          max={node.props.max}
          value={currentValue ?? 0}
          onChange={(nextValue) => onChange(valueKey, Math.round(nextValue))}
        />
      </div>
    );
  }

  if (node.component === 'ChipGroup') {
    return (
      <div className={styles.chipGroup}>
        {node.props.options.map((option) => {
          const optionValue = option.value ?? option;
          const optionLabel = option.label ?? option;

          return (
            <Chip
              key={optionValue}
              label={optionLabel}
              variant="ghost"
              active={currentValue === optionValue}
              onClick={() => onChange(valueKey, optionValue)}
            />
          );
        })}
      </div>
    );
  }

  if (node.component === 'ActionButton') {
    const iconMap = {
      close: <NavArrowLeft width={24} height={24} />,
      pause: <Pause width={24} height={24} />,
      open: <NavArrowRight width={24} height={24} />,
    };

    return (
      <div className={styles.actionButton}>
        <Button
          icon={iconMap[node.props.actionKey] || <SystemShut width={24} height={24} />}
          onClick={() => onAction(node.props.label)}
        />
        <span>{node.props.label}</span>
      </div>
    );
  }

  if (node.component === 'Readout') {
    return <Readout value={currentValue} unit={node.props.unit} label={node.props.label} />;
  }

  return <div className={styles.error}>Unregistered component: {node.component}</div>;
};

export default AssemblyDemo;
