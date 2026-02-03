import React, { useState } from 'react';
import { Action } from './components/molecules/Binary'
import { Slider } from './components/molecules/Linear'

import Button from './components/atoms/Button/Button'
import SliderTrack from './components/atoms/SliderTrack/SliderTrack'
import SliderThumb from './components/atoms/SliderThumb/SliderThumb'
import IndicatorDot from './components/atoms/IndicatorDot/IndicatorDot'
import CircularGauge from './components/molecules/Circular/Gauge/CircularGauge'
import Readout from './components/molecules/Display/Readout/Readout'
import BinaryDeviceCard from './components/organisms/Cards/BinaryDeviceCard/BinaryDeviceCard'
import './App.css'

import AdaptiveLightSlider from './components/molecules/Linear/AdaptiveLightSlider/AdaptiveLightSliderNew'
import VerticalLightSlider from './components/molecules/Linear/VerticalLightSlider/VerticalLightSlider'


import TemperatureControl from './components/molecules/Circular/TemperatureControl/TemperatureControl'

function App() {
  const [activeSection, setActiveSection] = useState('overview');

  // Existing states for components
  const [targetTemp, setTargetTemp] = useState(24);
  const [currentTemp, setCurrentTemp] = useState(21); 
  const [isPowerOn, setIsPowerOn] = useState(false);
  
  // Slider states
  const [brightness, setBrightness] = useState(50);
  const [stepLevel, setStepLevel] = useState(0);

  // Constants
  const tempGradientColors = [
    { label: 'Warm', var: '--color-temp-warm', hex: '#FB8C6F' },
    { label: 'Neutral', var: '--color-temp-neutral', hex: '#E6D378' },
    { label: 'Cool', var: '--color-temp-cool', hex: '#6EE7B7' },
  ];

  // Icons
  const PowerIcon = <svg viewBox="0 0 24 24"><path d="M13 3h-2v10h2V3zm4.83 2.17l-1.42 1.42C17.99 7.86 19 9.81 19 12c0 3.87-3.13 7-7 7s-7-3.13-7-7c0-2.19 1.01-4.14 2.58-5.42L6.17 5.17C4.23 6.82 3 9.26 3 12c0 4.97 4.03 9 9 9s9-4.03 9-9c0-2.74-1.23-5.18-3.17-6.83z"/></svg>;

  const BulbIcon = <svg viewBox="0 0 24 24"><path d="M9 21c0 .55.45 1 1 1h4c.55 0 1-.45 1-1v-1H9v1zm3-19C8.14 2 5 5.14 5 9c0 2.38 1.19 4.47 3 5.74V17c0 .55.45 1 1 1h6c.55 0 1-.45 1-1v-2.26c1.81-1.27 3-3.36 3-5.74 0-3.86-3.14-7-7-7zm2.85 11.1l-.85.6V16h-4v-2.3l-.85-.6C7.8 12.16 7 10.63 7 9c0-2.76 2.24-5 5-5s5 2.24 5 5c0 1.63-.8 3.16-2.15 4.1z"/></svg>;

  const togglePower = () => setIsPowerOn(prev => !prev);

  const renderContent = () => {
    switch(activeSection) {
      case 'overview':
        return (
          <div className="doc-section">
            <h1 className="doc-title" style={{color: 'red'}}>AI Adaptive Design System - DEBUG MODE</h1>
            <p className="doc-intro">
              Welcome to the Design System for the Open Smart Home Project. 
              This system utilizes AI-driven adaptive interfaces to provide a seamless user experience.
            </p>
            <div className="doc-cards">
              <div className="doc-card">
                <h3>Design Principles</h3>
                <p>Minimal, Matte, Interactive, Adaptive.</p>
              </div>
              <div className="doc-card">
                <h3>Target Audience</h3>
                <p>Smart Home users needing intuitive control.</p>
              </div>
            </div>
          </div>
        );
      case 'atomic':
        return (
          <div className="doc-section">
            <h1 className="doc-title">Atomic Design</h1>
            <p className="doc-intro">The fundamental building blocks and their combinations.</p>
            
            <h3 style={{ margin: '40px 0 20px', color: '#86909c' }}>Atoms</h3>

            <div className="component-showcase">
               <div className="showcase-header">
                <h2>Atom: Button</h2>
                <p>A versatile foundation component supporting icons and neumorphic depth. Defines the core interactive pattern with "Binary" toggle states.</p>
              </div>
              <div className="showcase-demo row">
                 <div className="demo-item">
                    {/* Interactive Pattern */}
                    <Button 
                      active={isPowerOn} 
                      icon={PowerIcon} 
                      onClick={togglePower} 
                    />
                    <label>Interactive</label>
                 </div>
                 
                 <div className="demo-separator" style={{ width: '1px', height: '60px', background: '#eee', margin: '0 20px' }}></div>

                 {/* Explicit States */}
                 <div className="demo-item">
                    <Button active={false} icon={BulbIcon} />
                    <label>State: Off</label>
                 </div>
                 <div className="demo-item">
                    <Button active={true} icon={BulbIcon} />
                    <label>State: On</label>
                 </div>
                 <div className="demo-item">
                    <Button 
                      disabled={true} 
                      icon={PowerIcon} 
                      onClick={() => {}} 
                    />
                    <label>State: Disabled</label>
                 </div>
              </div>
            </div>

            <div className="component-showcase">
               <div className="showcase-header">
                <h2>Atom: SliderTrack</h2>
                <p>The visual background track for sliders. Defines the bounds and scale of movement.</p>
              </div>
              <div className="showcase-demo">
                 <div style={{ width: '100%', maxWidth: '300px' }}>
                    <SliderTrack />
                 </div>
              </div>
            </div>

            <div className="component-showcase">
               <div className="showcase-header">
                <h2>Atom: SliderThumb</h2>
                <p>The draggable handle of the slider. Represents the user's point of interaction.</p>
              </div>
              <div className="showcase-demo">
                 <div style={{ position: 'relative', height: '40px', width: '100%' }}>
                    <SliderThumb style={{ left: '50%', transform: 'translateX(-50%)' }} />
                 </div>
              </div>
            </div>

            <div className="component-showcase">
               <div className="showcase-header">
                <h2>Atom: IndicatorDot</h2>
                <p>Specific thumb for circular gauges. Comes in Target (solid) and Current (glass) variants.</p>
              </div>
              <div className="showcase-demo row">
                 <div className="demo-item">
                    <div style={{ position: 'relative', width: '60px', height: '60px', background: '#eee', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                       <IndicatorDot variant="target" style={{ position: 'relative', transform: 'none' }} />
                    </div>
                    <label>Target (Solid)</label>
                 </div>
                 <div className="demo-item">
                    <div style={{ position: 'relative', width: '60px', height: '60px', background: '#ccc', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                       <IndicatorDot variant="current" style={{ position: 'relative', transform: 'none' }} />
                    </div>
                    <label>Current (Glass)</label>
                 </div>
              </div>
            </div>

            <h3 style={{ margin: '40px 0 20px', color: '#86909c' }}>Molecules</h3>

            <div className="component-showcase">
               <div className="showcase-header">
                <h2>Molecule: Circular/Gauge</h2>
                <p>Pure SVG visualization of a circular track and progress arc.</p>
              </div>
              <div className="showcase-demo">
                 <div style={{ position: 'relative', width: '200px', height: '200px' }}>
                    <CircularGauge 
                      size={200}
                      radius={88}
                      center={100}
                      strokeWidth={16}
                      startAngle={135}
                      totalAngle={270}
                      circumference={2 * Math.PI * 88}
                      segmentLength={(200 / 360) * (2 * Math.PI * 88)}
                      offsetLength={0}
                    />
                 </div>
              </div>
            </div>

            <div className="component-showcase">
               <div className="showcase-header">
                <h2>Molecule: Display/Readout</h2>
                <p>Standardized typography for presenting sensor values.</p>
              </div>
              <div className="showcase-demo">
                 <Readout value="24" label="Current Temp" />
              </div>
            </div>

            <div className="component-showcase">
              <div className="showcase-header">
                <h2>Molecule: Binary/Action</h2>
                <p>Momentary trigger component. Visual feedback on press, action on release.</p>
              </div>
              <div className="showcase-demo row">
                <div className="demo-item">
                  <Action 
                    onClick={() => console.log('Action Triggered')}
                    icon={<svg viewBox="0 0 24 24"><path d="M8 5v14l11-7z" fill="currentColor"/></svg>}
                  />
                  <label>Trigger Button<br/>(Momentary)</label>
                </div>
              </div>
            </div>

            <div className="component-showcase">
              <div className="showcase-header">
                <h2>Molecule: Linear/Slider</h2>
                <p>Combines Track and Thumb atoms. Supports continuous dragging and step snapping.</p>
              </div>
              <div className="showcase-demo row" style={{ flexDirection: 'column', gap: '30px', alignItems: 'stretch' }}>
                <div className="demo-item" style={{ width: '100%', maxWidth: '400px' }}>
                  <Slider 
                    value={brightness} 
                    onChange={setBrightness} 
                    min={0} 
                    max={100}
                  />
                  <label>Continuous (Brightness: {Math.round(brightness)}%)</label>
                </div>

                <div className="demo-item" style={{ width: '100%', maxWidth: '400px' }}>
                  <Slider 
                    value={stepLevel} 
                    onChange={setStepLevel} 
                    min={0} 
                    max={5} 
                    step={1}
                  />
                  <label>Step Slider (Level: {stepLevel})</label>
                </div>
              </div>
            </div>

            <div className="component-showcase">
              <div className="showcase-header">
                <h2>Molecule: Light Control Sliders</h2>
                <p>Specialized linear sliders for light intensity and warmth control.</p>
              </div>
              <div className="showcase-demo row" style={{ flexDirection: 'column', gap: '40px', alignItems: 'flex-start' }}>

                 <div className="demo-item">
                    <AdaptiveLightSlider />
                    <label>Adaptive Light (Gradient)</label>
                 </div>
                <div className="demo-item">
                    <VerticalLightSlider handlePosition="in-bottom" />
                     <label>Vertical (in-bottom)</label>
                 </div>
                 <div className="demo-item">
                    <VerticalLightSlider handlePosition="in-top" />
                     <label>Vertical (in-top)</label>
                 </div>

              </div>
            </div>

            <div className="component-showcase">
              <div className="showcase-header">
                <h2>Molecule: Circular/Temperature Control</h2>
                <p>A circular dial for adjusting temperature with haptic-like visual feedback.</p>
              </div>
              <div className="showcase-demo">
                <TemperatureControl 
                  targetTemp={targetTemp} 
                  currentTemp={currentTemp} 
                  onChange={setTargetTemp} 
                />
              </div>
            </div>

            <h3 style={{ margin: '40px 0 20px', color: '#86909c' }}>Organisms</h3>

            <div className="component-showcase">
              <div className="showcase-header">
                <h2>Organism: Binary Device Card</h2>
                <p>Standard dashboard card for toggling binary devices (Lights, Plugs).</p>
              </div>
              <div className="showcase-demo" style={{ background: '#f4f6f8' }}> {/* App BG color to see card contrast */}
                <BinaryDeviceCard 
                   name="Light 01"
                   status={isPowerOn ? "조명 켜짐" : "조명 꺼짐"}
                   isOn={isPowerOn}
                   onToggle={togglePower}
                   icon={BulbIcon}
                />
              </div>
            </div>
          </div>
        );


      case 'inputs':
        return (
          <div className="doc-section">
            <h1 className="doc-title">Inputs</h1>
            <p className="doc-intro">Interactive controls for user input.</p>
            
            <div className="component-showcase">
              <div className="showcase-header">
                <h2>Temperature Control</h2>
                <p>A circular dial for adjusting temperature with haptic-like visual feedback.</p>
              </div>
              <div className="showcase-demo">
                <TemperatureControl 
                  targetTemp={targetTemp} 
                  currentTemp={currentTemp} 
                  onChange={setTargetTemp} 
                />
              </div>
            </div>
          </div>
        );
      case 'foundations':
        return (
          <div className="doc-section">
            <h1 className="doc-title">Foundations</h1>
            <p className="doc-intro">The core visual elements that establish the system's identity.</p>
            
            <h3 style={{ margin: '32px 0 16px', color: '#86909c' }}>Colors</h3>
            <div style={{ display: 'flex', gap: '20px', flexWrap: 'wrap', marginBottom: '40px' }}>
              <div className="color-swatch-group">
                <h4>Primary</h4>
                <div style={{ display: 'flex', gap: '10px' }}>
                  <div className="swatch" style={{ background: 'var(--color-primary)' }}>Primary</div>
                  <div className="swatch light" style={{ background: 'var(--color-primary-light)', color: 'var(--color-primary)' }}>Light</div>
                </div>
              </div>
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
                 <div className="swatch" style={{ background: 'var(--color-status-active)' }}>Active</div>
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
              }
              .swatch.light { border: 1px solid var(--color-primary); }
              .swatch.wide { width: 160px; }
              .color-swatch-group h4 { margin: 0 0 8px 0; font-size: 14px; font-weight: 500; color: var(--color-text-2); }
            `}</style>
          </div>
        );
      default:
        return <div>Select a section</div>;
    }
  };

  return (
    <div className="ds-layout">
      {/* Sidebar */}
      <aside className="ds-sidebar">
        <div className="brand">
          <div className="logo-circle"></div>
          <span>Flowthing</span>
        </div>
        <nav className="ds-nav">
          <div className="nav-group">
            <div className="nav-label">Guide</div>
            <button 
              className={`nav-item ${activeSection === 'overview' ? 'active' : ''}`}
              onClick={() => setActiveSection('overview')}
            >
              Overview
            </button>
            <button 
              className={`nav-item ${activeSection === 'atomic' ? 'active' : ''}`}
              onClick={() => setActiveSection('atomic')}
            >
              Atomic Design
            </button>
            <button 
              className={`nav-item ${activeSection === 'foundations' ? 'active' : ''}`}
              onClick={() => setActiveSection('foundations')}
            >
              Foundations
            </button>
          </div>
          <div className="nav-group">
            <div className="nav-label">Components</div>
            <button 
              className={`nav-item ${activeSection === 'inputs' ? 'active' : ''}`}
              onClick={() => setActiveSection('inputs')}
            >
              Inputs
            </button>
            <button className="nav-item disabled">Feedback</button>
            <button className="nav-item disabled">Data Display</button>
          </div>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="ds-main">
        <header className="ds-header">
          <span className="current-path">Design System / {activeSection.charAt(0).toUpperCase() + activeSection.slice(1)}</span>
        </header>
        <div className="content-scroll">
          {renderContent()}
        </div>
      </main>
    </div>
  )
}

export default App
