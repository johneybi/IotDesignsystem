import React from 'react';
import styles from './Button.module.css';

const Button = ({ 
  active = false,
  disabled = false,
  onClick, 
  icon, 
  className = '',
  ...props 
}) => {
  // Determine the styling class based on state
  let variantClass = styles.default; // Default (Off)
  
  if (disabled) {
    variantClass = styles.inactive;
  } else if (active) {
    variantClass = styles.active; // Active (On)
  }

  return (
    <button
      className={`${styles.button} ${variantClass} ${className}`}
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
