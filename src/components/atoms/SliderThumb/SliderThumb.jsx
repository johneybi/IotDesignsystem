import React from 'react';
import styles from './SliderThumb.module.css';

/**
 * SliderThumb Atom
 * 
 * Visual component representing the draggable handle.
 */
const SliderThumb = ({ 
  isActive = false,
  className = '',
  style = {},
  ...props 
}) => {
  return (
    <div 
      className={`${styles.thumb} ${isActive ? styles.active : ''} ${className}`} 
      style={style}
      {...props}
    />
  );
};

export default SliderThumb;
