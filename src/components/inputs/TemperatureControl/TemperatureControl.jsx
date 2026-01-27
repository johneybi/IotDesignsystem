import React from 'react';
import styles from './TemperatureControl.module.css';
import Button from '../Button/Button';
import { Minus, Plus } from 'lucide-react';

const TemperatureControl = ({ 
  targetTemp = 24, 
  currentTemp = 24,
  onChange, 
  min = 18, 
  max = 30 
}) => {
  // Constants
  const size = 300;
  const strokeWidth = 24;
  const radius = (size - strokeWidth) / 2;
  const center = size / 2;
  const circumference = 2 * Math.PI * radius;
  
  // Angle configuration (135 to 405 degrees)
  const startAngle = 135;
  const endAngle = 405;
  const totalAngle = endAngle - startAngle;

  // Helpers
  const polarToCartesian = (centerX, centerY, r, angleInDegrees) => {
    const angleInRadians = (angleInDegrees * Math.PI) / 180.0;
    return {
      x: centerX + (r * Math.cos(angleInRadians)),
      y: centerY + (r * Math.sin(angleInRadians))
    };
  };

  const mapTempToAngle = (temp) => {
    const clamped = Math.min(Math.max(temp, min), max);
    const ratio = (clamped - min) / (max - min);
    return startAngle + (ratio * totalAngle);
  };

  // 1. Calculate Angles
  const currentAngle = mapTempToAngle(currentTemp);
  const targetAngle = mapTempToAngle(targetTemp);

  // 2. Determine Range for Arc
  const rangeStartAngle = Math.min(currentAngle, targetAngle);
  const rangeEndAngle = Math.max(currentAngle, targetAngle);
  
  // 3. Calculate Arc Length for DashArray
  const rangeAngleSpan = rangeEndAngle - rangeStartAngle;
  const segmentLength = (rangeAngleSpan / 360) * circumference;

  // 4. Calculate Offset for Position
  // How far is the start of the segment from the global start (135deg)?
  const angleFromStart = rangeStartAngle - startAngle;
  const offsetLength = (angleFromStart / 360) * circumference;
  
  // 5. Calculate Dot Positions
  const currentPos = polarToCartesian(center, center, radius, currentAngle);
  const targetPos = polarToCartesian(center, center, radius, targetAngle);

  // Handlers
  const handleIncrease = () => {
    if (targetTemp < max) onChange(targetTemp + 1);
  };

  const handleDecrease = () => {
    if (targetTemp > min) onChange(targetTemp - 1);
  };

  return (
    <div className={styles.container}>
      <svg className={styles.gaugeSvg} viewBox={`0 0 ${size} ${size}`}>
        <defs>
          <linearGradient 
            id="tempGradient" 
            gradientUnits="userSpaceOnUse"
            x1="0" y1="300" x2="300" y2="300"
          >
            <stop offset="0%" stopColor="#FB8C6F" />   
            <stop offset="50%" stopColor="#E6D378" />  
            <stop offset="100%" stopColor="#6EE7B7" /> 
          </linearGradient>
        </defs>
        
        {/* Track (Gray Rail) - Fixed rotation at startAngle */}
        <circle
          className={styles.track}
          cx={center}
          cy={center}
          r={radius}
          transform={`rotate(${startAngle} ${center} ${center})`}
          strokeDasharray={`${(totalAngle / 360) * circumference} ${circumference}`}
          strokeDashoffset={0}
        />

        {/* Range (Colored Arc) - Fixed Rotation, Variable Offset */}
        {segmentLength > 0 && (
          <circle
            className={styles.progress}
            cx={center}
            cy={center}
            r={radius}
            // Fix the circle rotation to the global start angle (135)
            transform={`rotate(${startAngle} ${center} ${center})`}
            // Dasharray: [Length of segment, Rest of circle]
            strokeDasharray={`${segmentLength} ${circumference}`}
            // Dashoffset: Negative value shifts the start point 'forward' (clockwise)
            strokeDashoffset={-offsetLength}
          />
        )}
      </svg>

      {/* Indicators */}
      <div 
        className={styles.indicatorWrapper} 
        style={{ 
          left: currentPos.x, 
          top: currentPos.y 
        }}
      >
        <div className={styles.currentDot} />
      </div>

      <div 
        className={styles.indicatorWrapper} 
        style={{ 
          left: targetPos.x, 
          top: targetPos.y 
        }}
      >
        <div className={styles.targetDot} />
      </div>

      {/* Controls */}
      <div className={styles.controls}>
        <Button
          onClick={handleDecrease}
          disabled={targetTemp <= min}
          aria-label="Decrease temperature"
          icon={<Minus size={24} />}
        />

        <div className={styles.display}>
          <span className={styles.temperature}>{targetTemp}°</span>
          <span className={styles.label}>설정 온도</span>
        </div>

        <Button
          onClick={handleIncrease}
          disabled={targetTemp >= max}
          aria-label="Increase temperature"
          icon={<Plus size={24} />}
        />
      </div>
    </div>
  );
};

export default TemperatureControl;
