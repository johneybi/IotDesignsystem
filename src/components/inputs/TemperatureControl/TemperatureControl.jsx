import React, { useMemo } from "react";
import styles from "./TemperatureControl.module.css";

const TemperatureControl = ({ value = 24, onChange, min = 18, max = 30 }) => {
  // Constants for SVG
  const size = 300;
  const strokeWidth = 24;
  const radius = (size - strokeWidth * 2) / 2; // Adjust radius to fit
  const center = size / 2;
  const circumference = 2 * Math.PI * radius;
  const arcDegree = 270; // Open gap is 90 degrees
  const arcLength = (circumference * arcDegree) / 360; // Visible length of the arc

  // handlers
  const handleIncrease = () => {
    if (value < max) onChange(value + 1);
  };

  const handleDecrease = () => {
    if (value > min) onChange(value - 1);
  };

  // Calculate progress
  const percentage = Math.min(Math.max((value - min) / (max - min), 0), 1);
  // strokeDashoffset: The offset starts at 'arcLength' (empty) and goes to 0 (full) relative to the dasharray
  // However, we set dasharray to [arcLength, circumference - arcLength]
  // In the rotated SVG context:
  // We want the stroke to "grow".
  // Standard way: strokeDasharray = circumference
  // strokeDashoffset = circumference - (percent * circumference)
  // For partial arc:
  // strokeDasharray = `${arcLength} ${circumference}`
  // strokeDashoffset = arcLength * (1 - percentage) + (circumference - arcLength)? No, simpler:

  const dashOffset = arcLength * (1 - percentage);

  return (
    <div className={styles.container}>
      {/* Background Arc & Progress Arc */}
      <svg className={styles.gaugeSvg} viewBox={`0 0 ${size} ${size}`}>
        <defs>
          <linearGradient id="tempGradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#FB8C6F" />
            <stop offset="50%" stopColor="#E6D378" />
            <stop offset="100%" stopColor="#6EE7B7" />
          </linearGradient>
        </defs>

        {/* Track */}
        <circle
          className={styles.track}
          cx={center}
          cy={center}
          r={radius}
          strokeDasharray={`${arcLength} ${circumference}`}
          strokeDashoffset={0}
        />

        {/* Progress */}
        <circle
          className={styles.progress}
          cx={center}
          cy={center}
          r={radius}
          strokeDasharray={`${arcLength} ${circumference}`}
          strokeDashoffset={dashOffset}
        />
      </svg>

      {/* Controls */}
      <div className={styles.controls}>
        <button
          className={styles.button}
          onClick={handleDecrease}
          disabled={value <= min}
          aria-label="Decrease temperature"
        >
          <svg viewBox="0 0 24 24">
            <path d="M19 13H5v-2h14v2z" />
          </svg>
        </button>

        <div className={styles.display}>
          <span className={styles.temperature}>{value}°</span>
          <span className={styles.label}>설정 온도</span>
        </div>

        <button
          className={styles.button}
          onClick={handleIncrease}
          disabled={value >= max}
          aria-label="Increase temperature"
        >
          <svg viewBox="0 0 24 24">
            <path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z" />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default TemperatureControl;
