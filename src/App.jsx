import { useState } from 'react'
import { TemperatureControl, Button } from './components/inputs'
import './App.css'

function App() {
  const [targetTemp, setTargetTemp] = useState(24);
  const [currentTemp, setCurrentTemp] = useState(21); 
  
  // Power State for Toggle Button
  const [isPowerOn, setIsPowerOn] = useState(false);

  // Icons
  const PowerIcon = <svg viewBox="0 0 24 24"><path d="M13 3h-2v10h2V3zm4.83 2.17l-1.42 1.42C17.99 7.86 19 9.81 19 12c0 3.87-3.13 7-7 7s-7-3.13-7-7c0-2.19 1.01-4.14 2.58-5.42L6.17 5.17C4.23 6.82 3 9.26 3 12c0 4.97 4.03 9 9 9s9-4.03 9-9c0-2.74-1.23-5.18-3.17-6.83z"/></svg>;
  
  const BulbIcon = <svg viewBox="0 0 24 24"><path d="M9 21c0 .55.45 1 1 1h4c.55 0 1-.45 1-1v-1H9v1zm3-19C8.14 2 5 5.14 5 9c0 2.38 1.19 4.47 3 5.74V17c0 .55.45 1 1 1h6c.55 0 1-.45 1-1v-2.26c1.81-1.27 3-3.36 3-5.74 0-3.86-3.14-7-7-7zm2.85 11.1l-.85.6V16h-4v-2.3l-.85-.6C7.8 12.16 7 10.63 7 9c0-2.76 2.24-5 5-5s5 2.24 5 5c0 1.63-.8 3.16-2.15 4.1z"/></svg>;

  // Toggle Handler
  const togglePower = () => setIsPowerOn(prev => !prev);

  return (
    <div style={{
      minHeight: '100vh',
      background: '#f0f0f3',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      gap: '50px',
      padding: '50px'
    }}>
      {/* Section 1: Temperature Control */}
      <section style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '20px' }}>
        <h2 style={{ color: '#555', fontFamily: 'sans-serif' }}>Temperature Control</h2>
        <TemperatureControl 
          targetTemp={targetTemp} 
          currentTemp={currentTemp} 
          onChange={setTargetTemp} 
        />
      </section>

      {/* Section 2: Toggle Buttons */}
      <section style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '20px' }}>
        <h2 style={{ color: '#555', fontFamily: 'sans-serif' }}>Toggle Buttons</h2>
        
        <div style={{ display: 'flex', gap: '40px', alignItems: 'flex-start' }}>
          
          {/* Interactive Toggle */}
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '10px' }}>
            <Button 
              active={isPowerOn} 
              icon={PowerIcon} 
              onClick={togglePower} 
            />
            <span style={{ color: '#888', fontSize: '12px' }}>
              {isPowerOn ? 'Active (Concave)' : 'Default (Convex)'}
            </span>
          </div>

          {/* Disabled State */}
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '10px' }}>
            <Button 
              disabled={true} 
              icon={PowerIcon} 
              onClick={() => alert("Can't click")} 
            />
             <span style={{ color: '#888', fontSize: '12px' }}>Disabled</span>
          </div>

        </div>
        
        {/* Visual variants */}
        <div style={{ display: 'flex', gap: '20px', marginTop: '20px', alignItems: 'center' }}>
           <span style={{ color: '#888', fontSize: '12px' }}>Static Variants:</span>
           <Button active={false} icon={BulbIcon} />
           <Button active={true} icon={BulbIcon} />
        </div>

      </section>
    </div>
  )
}

export default App
