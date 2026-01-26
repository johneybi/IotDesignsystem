import { useState } from 'react'
import './App.css'
import { TemperatureControl } from './components/inputs'

function App() {
  const [temperature, setTemperature] = useState(24)

  return (
    <div className="app-container">
      <h1>IoT Components Test</h1>
      
      <div className="component-showcase">
        <h2>Temperature Control</h2>
        <TemperatureControl 
          value={temperature} 
          onChange={setTemperature}
          min={18}
          max={30}
        />
        <p style={{ marginTop: '20px', color: '#666' }}>Current: {temperature}°C</p>
      </div>
    </div>
  )
}

export default App
