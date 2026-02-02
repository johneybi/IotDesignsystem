import { useState } from 'react'
import './App.css'
import LightControlSlider from './components/inputs/LightControlSlider'
import AdaptiveLightSlider from './components/inputs/AdaptiveLightSlider'
import DualControlSlider from './components/inputs/DualControlSlider'
import SingleHorizontalSlider from './components/inputs/SingleHorizontalSlider'

function App() {
  return (
    <div className="app-container">
      <h1 style={{ marginBottom: '2rem' }}>IoT Design System Demo</h1>
      <div style={{ display: 'flex', gap: '2rem', justifyContent: 'center', alignItems: 'center' }}>
        <LightControlSlider />
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.5rem' }}>
          <AdaptiveLightSlider />
          <span style={{ fontSize: '0.8rem', opacity: 0.7 }}>Adaptive Slider</span>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.5rem' }}>
          <DualControlSlider />
          <span style={{ fontSize: '0.8rem', opacity: 0.7 }}>Dual Control Slider</span>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.5rem' }}>
          <SingleHorizontalSlider />
        </div>
      </div>
    </div>
  )
}

export default App
