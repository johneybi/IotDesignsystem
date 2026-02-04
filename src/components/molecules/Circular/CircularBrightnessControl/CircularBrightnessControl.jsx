import React, { useState, useRef, useEffect } from 'react';
import styles from './CircularBrightnessControl.module.css';
import IndicatorDot from '../../../atoms/IndicatorDot/IndicatorDot';
import CircularGauge from '../Gauge/CircularGauge';
import Readout from '../../Display/Readout/Readout';

const CircularBrightnessControl = ({ 
  value = 50, 
  onChange, 
  min = 0, 
  max = 100 
}) => {
  // Constants
  const size = 260;
  const strokeWidth = 24;
  const radius = (size - strokeWidth) / 2;
  const center = size / 2;
  const circumference = 2 * Math.PI * radius;
  
  // Angle configuration (135 to 405 degrees)
  const startAngle = 135;
  const endAngle = 405;
  const totalAngle = endAngle - startAngle;

  const containerRef = useRef(null);
  const [isDragging, setIsDragging] = useState(false);

  // Helpers
  const polarToCartesian = (centerX, centerY, r, angleInDegrees) => {
    const angleInRadians = (angleInDegrees - 90) * Math.PI / 180.0;
    return {
      x: centerX + (r * Math.cos(angleInRadians)),
      y: centerY + (r * Math.sin(angleInRadians))
    };
  };

  const mapValueToAngle = (val) => {
    const clamped = Math.min(Math.max(val, min), max);
    const ratio = (clamped - min) / (max - min);
    return startAngle + (ratio * totalAngle);
  };

  const mapAngleToValue = (angle) => {
    // Normalize angle to 0-totalAngle range relative to startAngle
    let relativeAngle = angle - startAngle;
    if (relativeAngle < 0) relativeAngle += 360;
    
    const ratio = Math.max(0, Math.min(1, relativeAngle / totalAngle));
    return Math.round(min + (ratio * (max - min)));
  };

  const calculateAngleFromEvent = (clientX, clientY) => {
      if (!containerRef.current) return startAngle;
      const rect = containerRef.current.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      
      const x = clientX - centerX;
      const y = clientY - centerY;
      
      // Atan2 returns -PI to PI. Convert to 0-360 starting from 12 o'clock (roughly)
      // Actually standard is 3 o'clock. 
      // Let's us degrees + 90 to match standard visual rotation
      let angle = Math.atan2(y, x) * 180 / Math.PI;
      angle += 90; // Adjust for 12 o'clock 0
      if (angle < 0) angle += 360;

      // Clamp to our interactive arc (135 -> 405)
      // Visual range is 135 (bottom left) to 405 (bottom right)
      // In 0-360 terms: 135 is 135. 405 is 45.
      // So dead zone is 45 to 135 (bottom area).
      if (angle > 45 && angle < 135) {
          // Snap to closest end
          if (Math.abs(angle - 45) < Math.abs(angle - 135)) return endAngle; // 405
          return startAngle; // 135
      }
      
      // Fix wrap around
      if (angle <= 45) angle += 360; // Treat 0-45 as 360-405 range
      
      return angle;
  };

  const handleInteraction = (clientX, clientY) => {
      const angle = calculateAngleFromEvent(clientX, clientY);
      const newValue = mapAngleToValue(angle);
      if (onChange) onChange(newValue);
  };

  const handleMouseDown = (e) => {
      setIsDragging(true);
      handleInteraction(e.clientX, e.clientY);
  };

  useEffect(() => {
    const handleMouseMove = (e) => {
        if (isDragging) handleInteraction(e.clientX, e.clientY);
    };
    const handleMouseUp = () => setIsDragging(false);

    if (isDragging) {
        window.addEventListener('mousemove', handleMouseMove);
        window.addEventListener('mouseup', handleMouseUp);
    }
    return () => {
        window.removeEventListener('mousemove', handleMouseMove);
        window.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isDragging]);

  // Derived Values
  const currentAngle = mapValueToAngle(value);
  
  // Segment (Arc) from Start to Current
  const segmentLength = ((currentAngle - startAngle) / 360) * circumference;
  const offsetLength = 0; // Starts from 0 (startAngle)
  
  // Dot Position
  const dotPos = polarToCartesian(center, center, radius, currentAngle);

  return (
    <div 
        className={styles.container} 
        style={{ width: size, height: size }}
        ref={containerRef}
        onMouseDown={handleMouseDown}
    >
      {/* Molecule: Circular Gauge */}
      {/* 
          Note: CircularGauge expects standard props. 
          We use it purely visually.
      */}
      <CircularGauge
        size={size}
        radius={radius}
        center={center}
        strokeWidth={strokeWidth}
        startAngle={startAngle}
        totalAngle={totalAngle}
        circumference={circumference}
        segmentLength={segmentLength}
        offsetLength={offsetLength}
      />

      {/* Indicator Dot */}
      <div 
        className={styles.indicatorWrapper} 
        style={{ left: dotPos.x, top: dotPos.y }}
      >
        <IndicatorDot variant="target" />
      </div>

      {/* Center Readout */}
      <div className={styles.centerText}>
        <span className={styles.value}>{Math.round(value)}%</span>
        <span className={styles.label}>Brightness</span>
      </div>
    </div>
  );
};

export default CircularBrightnessControl;
