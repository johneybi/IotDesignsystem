import React, { useState, useRef, useEffect } from 'react';
import styles from './Dropdown.module.css';

const Dropdown = ({ 
  options = [], 
  value, 
  onChange, 
  placeholder = 'Select...',
  disabled = false,
  className = '',
  style = {}
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef(null);

  const toggleOpen = () => {
    if (!disabled) {
      setIsOpen(!isOpen);
    }
  };

  const handleSelect = (option) => {
    onChange(option);
    setIsOpen(false);
  };

  // Close when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (containerRef.current && !containerRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  // Find label for current value
  const selectedOption = options.find(opt => opt.value === value);
  const displayLabel = selectedOption ? selectedOption.label : placeholder;

  return (
    <div 
      className={`${styles.container} ${className}`} 
      style={style}
      ref={containerRef}
    >
      <div 
        className={`${styles.trigger} ${isOpen ? styles.isOpen : ''} ${disabled ? styles.disabled : ''}`} 
        onClick={toggleOpen}
      >
        <span>{displayLabel}</span>
        <div className={styles.icon}>
          <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
            <path d="M2.5 4.5L6 8L9.5 4.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </div>
      </div>

      <div className={`${styles.menu} ${isOpen ? styles.isOpen : ''}`}>
        {options.map((option) => (
          <div 
            key={option.value} 
            className={`${styles.item} ${value === option.value ? styles.selected : ''}`}
            onClick={() => handleSelect(option)}
          >
            {option.label}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Dropdown;
