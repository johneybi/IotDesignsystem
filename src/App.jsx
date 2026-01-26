import { useState } from 'react'
import './App.css'
import { TemperatureControl } from './components/inputs'

function App() {
  const [targetTemp, setTargetTemp] = useState(27)
  const currentTemp = 24 // Simulated sensor data

  return (
    <div className="app-container">
      <h1>IoT Components Test</h1>
      
      <div className="component-showcase">
        <h2>Temperature Control</h2>
        <div style={{ position: 'relative' }}>
          <TemperatureControl 
            targetTemp={targetTemp}
            currentTemp={currentTemp} 
            onChange={setTargetTemp}
            min={18}
            max={30}
          />
          <div style={{ 
            marginTop: '30px', 
            textAlign: 'center', 
            color: '#666',
            fontSize: '14px' 
          }}>
            <p>🔥 현재 온도 (Simulated): <strong>{currentTemp}°</strong></p>
            <p>🎯 설정 온도 (Target): <strong>{targetTemp}°</strong></p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default App
