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

import BlindCurtain from './components/organisms/BlindCurtain/BlindCurtain';
import IotLightingBrightnessController from './components/organisms/IotLightingBrightnessController/IotLightingBrightnessController';
import AdaptiveLightSlider from './components/molecules/Linear/AdaptiveLightSlider/AdaptiveLightSliderNew'
import VerticalSlider from './components/molecules/Linear/VerticalSlider/VerticalSlider'


import TemperatureControl from './components/molecules/Circular/TemperatureControl/TemperatureControl'
import ToggleBtn from './components/molecules/ToggleBtn/ToggleBtn';
import Foundations from './components/pages/Foundations';
import Dropdown from './components/molecules/Selection/Dropdown/Dropdown';

import Chip from './components/atoms/Chip/Chip';

import ActionDeviceCard from './components/organisms/Cards/ActionDeviceCard/ActionDeviceCard';
import SpeakerVolumeControl from './components/organisms/SpeakerVolumeControl/SpeakerVolumeControl';

function App() {
  const [activeSection, setActiveSection] = useState('overview');

  // Existing states for components
  const [targetTemp, setTargetTemp] = useState(24);
  const [currentTemp, setCurrentTemp] = useState(21); 
  const [isPowerOn, setIsPowerOn] = useState(false);
  
  // Action state
  const [isPlaying, setIsPlaying] = useState(false);
  
  // Slider states
  const [brightness, setBrightness] = useState(50);
  const [stepLevel, setStepLevel] = useState(0);

  // ToggleBtn verify state
  const [isToggled, setIsToggled] = useState(false);

  // Dropdown state
  const [selectedRoom, setSelectedRoom] = useState('living_room');

  // Chip state
  const [activeChip, setActiveChip] = useState('all');

  // Dropdown Options
  const roomOptions = [
    { value: 'living_room', label: 'Living Room' },
    { value: 'bedroom_master', label: 'Master Bedroom' },
    { value: 'kitchen', label: 'Kitchen' },
    { value: 'bathroom', label: 'Bathroom' },
  ];

  // Constants

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
                <h2>Atom: Chip</h2>
                <p>Compact elements that represent an input, attribute, or action. Used for filters and tabs.</p>
              </div>
              <div className="showcase-demo row">
                 <div className="demo-item">
                    <div style={{ display: 'flex', gap: '8px' }}>
                      <Chip 
                        label="All" 
                        active={activeChip === 'all'} 
                        onClick={() => setActiveChip('all')} 
                      />
                      <Chip 
                        label="Lights" 
                        active={activeChip === 'lights'} 
                        onClick={() => setActiveChip('lights')} 
                      />
                      <Chip 
                        label="Sensors" 
                        active={activeChip === 'sensors'} 
                        onClick={() => setActiveChip('sensors')} 
                      />
                    </div>
                    <label>Solid (Tab/Filter)</label>
                 </div>

                 <div className="demo-item">
                    <div style={{ display: 'flex', gap: '8px' }}>
                      <Chip 
                        variant="ghost"
                        label="Overview" 
                        active={activeChip === 'all'} 
                        onClick={() => setActiveChip('all')} 
                      />
                      <Chip 
                        variant="ghost"
                        label="Details" 
                        active={activeChip === 'lights'} 
                        onClick={() => setActiveChip('lights')} 
                      />
                    </div>
                    <label>Ghost (Minimal Tab)</label>
                 </div>
              </div>
            </div>

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

                  <div className="demo-separator" style={{ width: '1px', height: '60px', background: '#eee', margin: '0 20px' }}></div>

                  {/* Variants */}
                  <div className="demo-item">
                     <Button variant="filled" icon={BulbIcon} />
                     <label>Variant: Filled<br/>(Static)</label>
                  </div>
                  <div className="demo-item">
                     <Button variant="ghost" icon={BulbIcon} />
                     <label>Variant: Ghost<br/>(Offline)</label>
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
                <h2>Molecule: Selection/Dropdown</h2>
                <p>A neumorphic selector for choosing from a list of options.</p>
              </div>
              <div className="showcase-demo row">
                <div className="demo-item">
                  <Dropdown 
                    options={roomOptions} 
                    value={selectedRoom} 
                    onChange={(opt) => setSelectedRoom(opt.value)} 
                  />
                  <label>Default</label>
                </div>
                <div className="demo-item">
                  <Dropdown 
                    options={roomOptions} 
                    value={null} 
                    onChange={() => {}} 
                    placeholder="Choose Room"
                  />
                  <label>Placeholder</label>
                </div>
                 <div className="demo-item">
                  <Dropdown 
                    options={roomOptions} 
                    value="living_room" 
                    onChange={() => {}} 
                    disabled={true}
                  />
                  <label>Disabled</label>
                </div>
              </div>
            </div>

            <div className="component-showcase">
              <div className="showcase-header">
                <h2>Molecule: Toggle Button</h2>
                <p>Binary switch with specific styling using SliderThumb.</p>
              </div>
              <div className="showcase-demo row">
                <div className="demo-item">
                  <ToggleBtn 
                    isOn={isToggled} 
                    onToggle={() => setIsToggled(!isToggled)} 
                  />
                  <label>State: {isToggled ? 'On' : 'Off'}</label>
                </div>
                 <div className="demo-item">
                  <ToggleBtn 
                    isOn={true} 
                    onToggle={() => {}} 
                  />
                  <label>Fixed On</label>
                </div>
                 <div className="demo-item">
                  <ToggleBtn 
                    isOn={false} 
                    onToggle={() => {}} 
                  />
                  <label>Fixed Off</label>
                </div>
              </div>
            </div>


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
                    <VerticalSlider handlePosition="in-bottom" />
                     <label>Vertical (in-bottom)</label>
                 </div>
                 <div className="demo-item">
                    <VerticalSlider handlePosition="in-top" />
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
              <div className="showcase-demo" style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', gap: '40px' }}> {/* Vertical stack */ }
                 
                 {/* 1. Interactable */}
                 <div className="demo-item">
                    <BinaryDeviceCard 
                       name="Light 01"
                       status={isPowerOn ? "조명 켜짐" : "조명 꺼짐"}
                       isOn={isPowerOn}
                       onToggle={togglePower}
                       icon={BulbIcon}
                       isActuatable={true}
                       isConnected={true}
                    />
                    <label>Interactable (Toggle)</label>
                 </div>

                 {/* 2. Static / Info */}
                 <div className="demo-item">
                    <BinaryDeviceCard 
                       name="Refrigerator"
                       status="냉장 3°C | 냉동 -18°C"
                       isOn={true}
                       onToggle={() => {}}
                       icon={<svg viewBox="0 0 24 24"><path d="M17 1H7c-1.1 0-2 .9-2 2v18c0 1.1.9 2 2 2h10c1.1 0 2-.9 2-2V3c0-1.1-.9-2-2-2zm0 18H7v-6h10v6zm0-8H7V3h10v8z" fill="currentColor"/></svg>}
                       isActuatable={false}
                       isConnected={true}
                       style={{ 
                          '--comp-button-filled-color': 'var(--color-status-cool)',
                          '--comp-device-status-color-on': 'var(--color-status-cool)'
                       }}
                    />
                    <label>Information (Static)</label>
                 </div>

                 {/* 3. Offline */}
                 <div className="demo-item">
                    <BinaryDeviceCard 
                       name="Bedroom Light"
                       status="연결 끊김"
                       isOn={false}
                       onToggle={() => {}}
                       icon={<svg viewBox="0 0 24 24"><path d="M19.35 10.04C18.67 6.59 15.64 4 12 4 9.11 4 6.6 5.64 5.35 8.04 2.34 8.36 0 10.91 0 14c0 3.31 2.69 6 6 6h13c2.76 0 5-2.24 5-5 0-2.64-2.05-4.78-4.65-4.96zM19 18H6c-2.21 0-4-1.79-4-4 0-2.05 1.53-3.76 3.56-3.97l1.07-.11.5-.95C8.08 7.14 9.94 6 12 6c3.04 0 5.5 2.46 5.5 5.5v.5h1.5c1.66 0 3 1.34 3 3 0 1.66-1.34 3-3 3z" fill="currentColor"/><line x1="2" y1="2" x2="22" y2="22" stroke="currentColor" strokeWidth="2" /></svg>}
                       isActuatable={true}
                       isConnected={false}
                    />
                    <label>Offline (Ghost)</label>
                 </div>

              </div>
            </div>

            <div className="component-showcase">
              <div className="showcase-header">
                <h2>Organism: Action Device Card</h2>
                <p>Card optimized for devices with a primary action (e.g., Play, Lock, Run).</p>
              </div>
              <div className="showcase-demo">
                  <ActionDeviceCard 
                    name="Marshall Speaker"
                    status={isPlaying ? "재생 중 - lofi beats" : "대기 중"}
                    isPlaying={isPlaying}
                    onAction={() => setIsPlaying(!isPlaying)}
                    icon={isPlaying ? <svg viewBox="0 0 24 24"><path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z" fill="currentColor"/></svg> : <svg viewBox="0 0 24 24"><path d="M8 5v14l11-7z" fill="currentColor"/></svg>}
                  />
              </div>
            </div>

            <div className="component-showcase">
              <div className="showcase-header">
                <h2>Organism: Speaker Volume Control</h2>
                <p>Vertical slider for intuitive volume adjustment.</p>
              </div>
              <div className="showcase-demo">
                 <SpeakerVolumeControl deviceName="Living Room Speaker" initialVolume={45} />
              </div>
            </div>

            <div className="component-showcase">
              <div className="showcase-header">
                <h2>Organism: Blind Curtain</h2>
                <p>Vertical slider controller for window blinds or curtains.</p>
              </div>
              <div className="showcase-demo">
                 <BlindCurtain />
              </div>
            </div>

            <div className="component-showcase">
              <div className="showcase-header">
                <h2>Organism: Lighting Controller</h2>
                <p>Adaptive brightness controller with dynamic lighting feedback.</p>
              </div>
              <div className="showcase-demo">
                <IotLightingBrightnessController />
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
        return <Foundations />;
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
