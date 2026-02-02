import React from 'react';
import styles from './CircularGauge.module.css';

/**
 * CircularGauge Molecule
 * 
 * Renders a circular track and a colored progress arc.
 * Pure presentation component - layout and logic should be handled by parent.
 */
const CircularGauge = ({ 
  size = 300,
  radius,
  strokeWidth = 24,
  center,
  startAngle = 135,
  totalAngle,
  circumference,
  segmentLength,
  offsetLength,
  gradientId = "tempGradient"
}) => {
  return (
    <svg className={styles.gaugeSvg} viewBox={`0 0 ${size} ${size}`}>
      <defs>
        <linearGradient 
          id={gradientId}
          gradientUnits="userSpaceOnUse"
          x1="0" y1={size} x2={size} y2={size}
        >
          <stop offset="0%" stopColor="var(--color-temp-warm)" />   
          <stop offset="50%" stopColor="var(--color-temp-neutral)" />  
          <stop offset="100%" stopColor="var(--color-temp-cool)" /> 
        </linearGradient>
      </defs>
      
      {/* Track (Gray Rail) */}
      <circle
        className={styles.track}
        cx={center}
        cy={center}
        r={radius}
        strokeWidth={strokeWidth}
        transform={`rotate(${startAngle} ${center} ${center})`}
        strokeDasharray={`${(totalAngle / 360) * circumference} ${circumference}`}
        strokeDashoffset={0}
      />

      {/* Range (Colored Arc) */}
      {segmentLength > 0 && (
        <circle
          className={styles.progress}
          cx={center}
          cy={center}
          r={radius}
          strokeWidth={strokeWidth}
          transform={`rotate(${startAngle} ${center} ${center})`}
          strokeDasharray={`${segmentLength} ${circumference}`}
          strokeDashoffset={-offsetLength}
          style={{ stroke: `url(#${gradientId})` }}
        />
      )}
    </svg>
  );
};

export default CircularGauge;
