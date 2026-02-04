import React from 'react';

const Foundations = () => {
  const tempGradientColors = [
    { label: 'Warm', var: '--color-temp-warm', hex: '#FB8C6F' },
    { label: 'Neutral', var: '--color-temp-neutral', hex: '#E6D378' },
    { label: 'Cool', var: '--color-temp-cool', hex: '#6EE7B7' },
  ];

  return (
    <div className="doc-section">
      <h1 className="doc-title">Foundations</h1>
      <p className="doc-intro">The core visual elements that establish the system's identity.</p>
      
      <h3 style={{ margin: '32px 0 16px', color: '#86909c' }}>Colors</h3>
      <div style={{ display: 'flex', gap: '20px', flexWrap: 'wrap', marginBottom: '40px' }}>
        <div className="color-swatch-group">
          <h4>Text</h4>
          <div style={{ display: 'flex', gap: '10px' }}>
            <div className="swatch" style={{ background: 'var(--color-text-1)' }}>Text 1</div>
            <div className="swatch" style={{ background: 'var(--color-text-2)' }}>Text 2</div>
            <div className="swatch" style={{ background: 'var(--color-text-3)' }}>Text 3</div>
          </div>
        </div>
        <div className="color-swatch-group">
           <h4>Values (Slider Gradient)</h4>
           <div className="swatch wide" style={{ background: 'var(--comp-slider-fill-bg)' }}>Slider Fill</div>
        </div>
        <div className="color-swatch-group">
           <h4>Status</h4>
           <div style={{ display: 'flex', gap: '10px' }}>
              <div className="swatch" style={{ background: 'var(--color-status-active)' }}>Active</div>
              <div className="swatch" style={{ background: 'var(--color-status-warm)' }}>Warm</div>
              <div className="swatch" style={{ background: 'var(--color-status-cool)' }}>Cool</div>
           </div>
        </div>
        <div className="color-swatch-group">
           <h4>Surfaces</h4>
           <div style={{ display: 'flex', gap: '10px' }}>
             <div className="swatch" style={{ background: 'var(--comp-card-bg)', color: '#000' }}>Card On</div>
             <div className="swatch" style={{ background: 'var(--comp-card-bg-off)', color: '#fff' }}>Card Off</div>
           </div>
        </div>
      </div>
      
      <h3 style={{ margin: '32px 0 16px', color: '#86909c' }}>Temperature Scale</h3>
      <div style={{ display: 'flex', gap: '20px', flexWrap: 'wrap', marginBottom: '40px' }}>
        <div style={{ display: 'flex', gap: '0', borderRadius: '8px', overflow: 'hidden', boxShadow: '0 2px 4px rgba(0,0,0,0.1)' }}>
          {tempGradientColors.map((color) => (
            <div key={color.label} style={{ width: '80px', height: '80px', background: `var(${color.var})`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '12px', color: '#fff', flexDirection: 'column' }}>
              <span>{color.label}</span>
              <span style={{ fontSize: '10px', opacity: 0.8 }}>{color.hex}</span>
            </div>
          ))}
        </div>
        <div style={{ width: '240px', height: '80px', background: 'linear-gradient(90deg, var(--color-temp-warm) 0%, var(--color-temp-neutral) 50%, var(--color-temp-cool) 100%)', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', textShadow: '0 1px 2px rgba(0,0,0,0.2)' }}>
          Gradient
        </div>
      </div>

      <h3 style={{ margin: '32px 0 16px', color: '#86909c' }}>Shadows</h3>
      <div style={{ display: 'flex', gap: '40px', flexWrap: 'wrap', padding: '20px', background: '#f4f6f8', borderRadius: '8px' }}>
         <div style={{ 
            width: '100px', height: '100px', borderRadius: '16px', background: '#f0f0f3',
            boxShadow: '9px 9px 18px #d1d1d4,-9px -9px 18px #ffffff',
            display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#86909c', fontSize: '12px'
         }}>
            Neumorph
         </div>
         <div style={{ 
            width: '100px', height: '100px', borderRadius: '50%', background: 'linear-gradient(145deg, #e6e6e6, #ffffff)',
            boxShadow: 'var(--comp-slider-thumb-shadow)',
            display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#86909c', fontSize: '12px', textAlign: 'center'
         }}>
            Slider Thumb
         </div>
          <div style={{ 
            width: '100px', height: '100px', borderRadius: '50%', background: '#e6e6e6',
            boxShadow: 'var(--comp-slider-thumb-shadow-active)',
            display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#86909c', fontSize: '12px', textAlign: 'center'
         }}>
            Pressed
         </div>
      </div>

      <h3 style={{ margin: '32px 0 16px', color: '#86909c' }}>Typography</h3>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
         <div style={{ fontSize: '36px', fontWeight: '600', color: 'var(--color-text-1)' }}>Heading 1 (36px, 600)</div>
         <div style={{ fontSize: '24px', fontWeight: '600', color: 'var(--color-text-1)' }}>Heading 2 (24px, 600)</div>
         <div style={{ fontSize: '18px', fontWeight: '500', color: 'var(--color-text-1)' }}>Heading 3 (18px, 500)</div>
         <div style={{ fontSize: '16px', color: 'var(--color-text-2)' }}>Body Text (16px, Regular) - Allows for easy reading of content.</div>
         <div style={{ fontSize: '12px', color: 'var(--color-text-3)' }}>Caption / Label (12px, Regular)</div>
      </div>

      <style>{`
        .swatch {
          width: 80px; height: 80px;
          border-radius: 8px;
          display: flex; align-items: center; justify-content: center; /* Fixed alignment */
          font-size: 12px; color: #fff;
          box-shadow: 0 2px 4px rgba(0,0,0,0.1);
          text-shadow: 0 1px 2px rgba(0,0,0,0.3);
        }

        .swatch.wide { width: 160px; }
        .color-swatch-group h4 { margin: 0 0 8px 0; font-size: 14px; font-weight: 500; color: var(--color-text-2); }
      `}</style>
    </div>
  );
};

export default Foundations;
