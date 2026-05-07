import React from 'react';
import { getSiteContent } from '../../i18n/siteContent';

const Guardrails = ({ locale = 'ko' }) => {
  const t = getSiteContent(locale).guardrails;

  return (
    <div className="doc-section">
      <h1 className="doc-title">{t.title}</h1>
      <p className="doc-intro">
        {t.intro}
      </p>

      {/* Hierarchy Rules */}
      <section className="guardrail-section">
        <h2 className="guardrail-title">{t.hierarchyTitle}</h2>
        <p className="guardrail-desc">
          {t.hierarchyDesc}
        </p>

        <div className="rule-card">
          <h3>{t.hierarchyStructure}</h3>
          <pre className="code-block">
{t.hierarchyCode}
          </pre>
        </div>

        <div className="rule-card">
          <h3>{t.allowedTitle}</h3>
          <table className="rules-table">
            <thead>
              <tr>
                <th>{t.parent}</th>
                <th>{t.mayContain}</th>
              </tr>
            </thead>
            <tbody>
              {t.hierarchyRows.map(([parent, mayContain]) => (
                <tr key={parent}>
                  <td>{parent}</td>
                  <td>{mayContain}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="rule-card">
          <h3>{t.forbiddenTitle}</h3>
          <table className="rules-table">
            <thead>
              <tr>
                <th>{t.violation}</th>
                <th>{t.example}</th>
                <th>{t.reason}</th>
              </tr>
            </thead>
            <tbody>
              {t.forbiddenRows.map(([violation, example, reason]) => (
                <tr key={violation}>
                  <td>{violation}</td>
                  <td>{example}</td>
                  <td>{reason}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* Pattern Constraints */}
      <section className="guardrail-section">
        <h2 className="guardrail-title">{t.patternTitle}</h2>
        <p className="guardrail-desc">
          {t.patternDesc}
        </p>

        <div className="rule-card">
          <h3>{t.mappingTitle}</h3>
          <table className="rules-table">
            <thead>
              <tr>
                <th>{t.inputType}</th>
                <th>{t.pattern}</th>
                <th>{t.allowedComponents}</th>
                <th>{t.assemblyRule}</th>
              </tr>
            </thead>
            <tbody>
              {t.patternRows.map(([inputType, pattern, components, rule]) => (
                <tr key={inputType}>
                  <td>{inputType}</td>
                  <td>{pattern}</td>
                  <td>{components}</td>
                  <td>{rule}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="rule-card">
          <h3>{t.coreRulesTitle}</h3>
          <ul className="rules-list">
            {t.coreRules.map(([name, body]) => (
              <li key={name}><strong>{name}:</strong> {body}</li>
            ))}
          </ul>
        </div>
      </section>

      {/* Token Enforcement */}
      <section className="guardrail-section">
        <h2 className="guardrail-title">{t.tokenTitle}</h2>
        <p className="guardrail-desc">
          {t.tokenDesc}
        </p>

        <div className="rule-card">
          <h3>{t.allowed}</h3>
          <pre className="code-block">
{t.tokenAllowedExample}
          </pre>
        </div>

        <div className="rule-card">
          <h3>{t.forbidden}</h3>
          <pre className="code-block">
{t.tokenForbiddenExample}
          </pre>
        </div>

        <div className="rule-card">
          <h3>{t.tokenHierarchy}</h3>
          <table className="rules-table">
            <thead>
              <tr>
                <th>{t.tier}</th>
                <th>{t.usage}</th>
                <th>{t.example}</th>
              </tr>
            </thead>
            <tbody>
              {t.tokenRows.map(([tier, usage, example]) => (
                <tr key={tier}>
                  <td><code>{tier}</code></td>
                  <td>{usage}</td>
                  <td><code>{example}</code></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* Value Validation */}
      <section className="guardrail-section">
        <h2 className="guardrail-title">{t.valueTitle}</h2>
        <p className="guardrail-desc">
          {t.valueDesc}
        </p>

        <div className="rule-card">
          <h3>{t.temperatureTitle}</h3>
          <table className="rules-table">
            <thead>
              <tr>
                <th>{t.category}</th>
                <th>{t.range}</th>
                <th>{t.defaultValue}</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Cooling</td>
                <td>16°C ~ 30°C</td>
                <td>24°C</td>
              </tr>
              <tr>
                <td>Heating</td>
                <td>16°C ~ 28°C</td>
                <td>22°C</td>
              </tr>
            </tbody>
          </table>
          <p className="note">{t.invalidTemp}</p>
        </div>

        <div className="rule-card">
          <h3>{t.otherValues}</h3>
          <table className="rules-table">
            <thead>
              <tr>
                <th>{t.controlType}</th>
                <th>{t.range}</th>
                <th>{t.defaultValue}</th>
              </tr>
            </thead>
            <tbody>
              {t.otherValueRows.map(([controlType, range, defaultValue]) => (
                <tr key={controlType}>
                  <td>{controlType}</td>
                  <td>{range}</td>
                  <td>{defaultValue}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* Accessibility */}
      <section className="guardrail-section">
        <h2 className="guardrail-title">{t.accessibilityTitle}</h2>
        <p className="guardrail-desc">
          {t.accessibilityDesc}
        </p>

        <div className="rule-card">
          <h3>{t.contrastTitle}</h3>
          <ul className="rules-list">
            {t.contrastRules.map(([name, body]) => (
              <li key={name}><strong>{name}:</strong> {body}</li>
            ))}
          </ul>
        </div>

        <div className="rule-card">
          <h3>{t.touchTitle}</h3>
          <ul className="rules-list">
            {t.touchRules.map(([name, body]) => (
              <li key={name}><strong>{name}:</strong> {body}</li>
            ))}
          </ul>
        </div>

        <div className="rule-card">
          <h3>{t.statusTitle}</h3>
          <table className="rules-table">
            <thead>
              <tr>
                <th>{t.status}</th>
                <th>{t.color}</th>
                <th>{t.text}</th>
                <th>{t.icon}</th>
              </tr>
            </thead>
            <tbody>
              {t.statusRows.map(([status, color, text, icon]) => (
                <tr key={status}>
                  <td>{status}</td>
                  <td>{color}</td>
                  <td>{text}</td>
                  <td>{icon}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <p className="note">{t.statusNote}</p>
        </div>

        <div className="rule-card">
          <h3>{t.ariaTitle}</h3>
          <pre className="code-block">
{t.ariaExample}
          </pre>
        </div>
      </section>

      {/* Device Compatibility */}
      <section className="guardrail-section">
        <h2 className="guardrail-title">{t.compatibilityTitle}</h2>
        <p className="guardrail-desc">
          {t.compatibilityDesc}
        </p>

        <div className="rule-card">
          <h3>{t.connectionTitle}</h3>
          <table className="rules-table">
            <thead>
              <tr>
                <th>{t.status}</th>
                <th>{t.display}</th>
                <th>{t.control}</th>
                <th>{t.style}</th>
              </tr>
            </thead>
            <tbody>
              {t.connectionRows.map(([status, display, control, style]) => (
                <tr key={status}>
                  <td>{status}</td>
                  <td>{display}</td>
                  <td>{control}</td>
                  <td>{style}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="rule-card">
          <h3>{t.actuatableTitle}</h3>
          <table className="rules-table">
            <thead>
              <tr>
                <th>{t.classification}</th>
                <th>{t.deviceExample}</th>
                <th>{t.uiDisplay}</th>
              </tr>
            </thead>
            <tbody>
              {t.actuatabilityRows.map(([classification, deviceExample, uiDisplay]) => (
                <tr key={classification}>
                  <td>{classification}</td>
                  <td>{deviceExample}</td>
                  <td>{uiDisplay}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="rule-card">
          <h3>{t.supportedOnlyTitle}</h3>
          <p className="note">
            <strong>{t.supportedOnlyPrinciple}</strong>
          </p>
          <ul className="rules-list">
            {t.supportedFeatureRows.map((rule) => (
              <li key={rule}>{rule}</li>
            ))}
          </ul>
        </div>
      </section>

      {/* Styles */}
      <style>{`
        .doc-title {
          font-size: 28px;
          margin-bottom: 8px;
          color: var(--sys-color-text-primary);
        }
        
        .doc-intro {
          font-size: 16px;
          color: var(--sys-color-text-secondary);
          margin-bottom: 40px;
          line-height: 1.5;
        }

        .guardrail-section {
          margin-bottom: 60px;
        }

        .guardrail-title {
          font-size: 20px;
          color: var(--sys-color-text-primary);
          margin-top: 32px;
          margin-bottom: 12px;
          padding-left: 12px;
          border-left: 4px solid var(--ref-palette-blue-500);
        }

        .guardrail-desc {
          font-size: 14px;
          color: var(--sys-color-text-tertiary);
          margin-bottom: 24px;
          line-height: 1.6;
        }

        .rule-card {
          background: var(--sys-color-bg-primary);
          border: 1px solid var(--sys-color-border-primary);
          border-radius: 4px;
          padding: 24px;
          margin-bottom: 20px;
        }

        .rule-card h3 {
          font-size: 16px;
          color: var(--sys-color-text-primary);
          margin: 0 0 16px 0;
          font-weight: 600;
        }

        .code-block {
          background: #F9FAFB;
          border: 1px solid var(--sys-color-border-primary);
          border-radius: 4px;
          padding: 16px;
          font-family: 'Consolas', 'Monaco', monospace;
          font-size: 13px;
          color: var(--sys-color-text-primary);
          overflow-x: auto;
          margin: 0;
          line-height: 1.6;
        }

        .rules-table {
          width: 100%;
          border-collapse: collapse;
          font-size: 14px;
        }

        .rules-table thead {
          background: #F9FAFB;
        }

        .rules-table th {
          padding: 12px;
          text-align: left;
          font-weight: 600;
          color: var(--sys-color-text-primary);
          border-bottom: 2px solid var(--sys-color-border-primary);
        }

        .rules-table td {
          padding: 12px;
          color: var(--sys-color-text-secondary);
          border-bottom: 1px solid var(--sys-color-border-primary);
          line-height: 1.5;
        }

        .rules-table code {
          background: #F9FAFB;
          padding: 2px 6px;
          border-radius: 3px;
          font-family: 'Consolas', 'Monaco', monospace;
          font-size: 12px;
          color: var(--sys-color-text-primary);
        }

        .rules-list {
          margin: 0;
          padding-left: 20px;
          color: var(--sys-color-text-secondary);
          line-height: 1.8;
        }

        .rules-list li {
          margin-bottom: 8px;
        }

        .rules-list strong {
          color: var(--sys-color-text-primary);
        }

        .note {
          margin: 12px 0 0 0;
          padding: 12px;
          background: #F9FAFB;
          border-left: 3px solid var(--ref-palette-blue-500);
          border-radius: 4px;
          font-size: 13px;
          color: var(--sys-color-text-secondary);
          line-height: 1.5;
        }
      `}</style>
    </div>
  );
};

export default Guardrails;
