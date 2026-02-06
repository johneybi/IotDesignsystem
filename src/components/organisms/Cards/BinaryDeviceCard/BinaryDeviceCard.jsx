import React from 'react';
import styles from './BinaryDeviceCard.module.css';
import DeviceInfo from '../../../molecules/Display/DeviceInfo/DeviceInfo';
import Button from '../../../atoms/Button/Button';

const BinaryDeviceCard = ({ 
  name,
  location, 
  status, 
  isOn, 
  onToggle,
  icon,
  onClick, /* New Prop for Navigation */
  isActuatable = true,
  isConnected = true,
  variant = 'default',
  style = {},
  className = '',
  isFullWidth = true /* Default to true if not specified */
}) => {
  
  // Determine Button Variant
  let buttonVariant = 'neumorph';
  if (!isConnected) {
    buttonVariant = 'ghost';
  } else if (!isActuatable) {
    buttonVariant = 'filled';
  } else if (!isOn) {
    buttonVariant = 'neumorph-dark';
  }

  // Determine Card Opacity for Offline state
  const offlineStyle = !isConnected ? { opacity: 0.5, pointerEvents: 'none' } : {};

  const handleToggle = (e) => {
    e.stopPropagation(); // Prevent card click
    onToggle && onToggle();
  };

  return (
    <div 
      className={`
        ${styles.card} 
        ${variant === 'minimal' ? styles.cardMinimal : ''} 
        ${isOn && isConnected ? styles.active : ''} 
        ${!isFullWidth ? styles.compact : ''} 
        ${className}
      `} 
      style={{ ...offlineStyle, ...style, cursor: onClick ? 'pointer' : 'default' }}
      onClick={onClick}
    >
      <div className={`${styles.infoWrapper} ${variant === 'minimal' ? styles.infoWrapperMinimal : ''}`}>
        <DeviceInfo 
          name={name} 
          location={location}
          status={status}
          isOn={isOn} 
          variant={variant}
        />
      </div>
      <div className={styles.actionWrapper}>
        <Button 
          active={isOn} 
          icon={icon} 
          onClick={handleToggle}
          variant={buttonVariant}
          disabled={!isConnected}
        />
      </div>
    </div>
  );
};

export default BinaryDeviceCard;
