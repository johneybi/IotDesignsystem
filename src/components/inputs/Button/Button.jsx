import React from 'react';
import styles from './Button.module.css';

const Button = ({ 
  active = false,
  pressed = false, // Alias for active/on state
  disabled = false,
  onClick, 
  icon, 
  className = '',
  ...props 
}) => {
  // Determine final state
  const isOn = active || pressed;

  let variantClass = styles.off; // Default
  
  if (disabled) {
    variantClass = styles.disabled;
  } else if (isOn) {
    variantClass = styles.on;
  }

  return (
    <button
      className={`${styles.button} ${variantClass} ${className}`}
      onClick={!disabled ? onClick : undefined}
      disabled={disabled}
      aria-pressed={isOn}
      aria-disabled={disabled}
      {...props}
    >
      {icon && <div className={styles.icon}>{icon}</div>}
    </button>
  );
};

export default Button;
