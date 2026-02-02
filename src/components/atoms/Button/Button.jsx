import React from 'react';
import styles from './Button.module.css';

/**
 * Button Component (Atom)
 * 
 * Represents a button with simplified states:
 * - Active (Binary: On)
 * - Default (Binary: Off)
 * - Disabled (Interactive State)
 * 
 * Maps to Figma properties: 
 * - Binary = On | Off
 * - Disabled = true | false
 */
const Button = ({ 
  active = false, // Functionally maps to "Binary = On/Off"
  disabled = false, // Functionally maps to "Disabled" state
  onClick, 
  icon, 
  className = '',
  ...props 
}) => {
  // Determine variant class
  let variantClass = styles.off; // Default
  
  if (disabled) {
    variantClass = styles.disabled;
  } else if (active) {
    variantClass = styles.on;
  }

  return (
    <button
      className={`${styles.root} ${variantClass} ${className}`}
      onClick={!disabled ? onClick : undefined}
      disabled={disabled}
      aria-pressed={active}
      aria-disabled={disabled}
      {...props}
    >
      {icon && <div className={styles.icon}>{icon}</div>}
    </button>
  );
};

export default Button;
