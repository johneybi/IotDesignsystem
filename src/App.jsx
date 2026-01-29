import React, { useState } from 'react';
import { Action } from './components/molecules/Binary'
import { Slider } from './components/molecules/Linear'
import { TemperatureControl } from './components/inputs'
import Button from './components/atoms/Button/Button'
import './App.css'

function App() {
  const [activeSection, setActiveSection] = useState('overview');

  // Existing states for components
  const [targetTemp, setTargetTemp] = useState(24);
  const [currentTemp, setCurrentTemp] = useState(21); 
  const [isPowerOn, setIsPowerOn] = useState(false);
  
  // Slider states
  const [brightness, setBrightness] = useState(50);
  const [stepLevel, setStepLevel] = useState(0);

  // Icons
  const PowerIcon = <svg viewBox="0 0 24 24"><path d="M13 3h-2v10h2V3zm4.83 2.17l-1.42 1.42C17.99 7.86 19 9.81 19 12c0 3.87-3.13 7-7 7s-7-3.13-7-7c0-2.19 1.01-4.14 2.58-5.42L6.17 5.17C4.23 6.82 3 9.26 3 12c0 4.97 4.03 9 9 9s9-4.03 9-9c0-2.74-1.23-5.18-3.17-6.83z"/></svg>;

  const BulbIcon = <svg viewBox="0 0 24 24"><path d="M9 21c0 .55.45 1 1 1h4c.55 0 1-.45 1-1v-1H9v1zm3-19C8.14 2 5 5.14 5 9c0 2.38 1.19 4.47 3 5.74V17c0 .55.45 1 1 1h6c.55 0 1-.45 1-1v-2.26c1.81-1.27 3-3.36 3-5.74 0-3.86-3.14-7-7-7zm2.85 11.1l-.85.6V16h-4v-2.3l-.85-.6C7.8 12.16 7 10.63 7 9c0-2.76 2.24-5 5-5s5 2.24 5 5c0 1.63-.8 3.16-2.15 4.1z"/></svg>;

  const togglePower = () => setIsPowerOn(prev => !prev);

  const renderContent = () => {
    switch(activeSection) {
      case 'overview':
        return (
          <div className="doc-section">
            <h1 className="doc-title">AI Adaptive Design System</h1>
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

            <h3 style={{ margin: '40px 0 20px', color: '#86909c' }}>Molecules</h3>

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
            <p className="doc-intro">Colors, Typography, and Shadows.</p>
            <div className="placeholder-content">
               Content coming soon...
            </div>
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
