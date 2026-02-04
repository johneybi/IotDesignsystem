import React from 'react';
import styles from './BinaryDeviceCard.module.css';
import DeviceInfo from '../../../molecules/Display/DeviceInfo/DeviceInfo';
import Button from '../../../atoms/Button/Button';

const BinaryDeviceCard = ({ 
  name, 
  status, 
  isOn, 
  onToggle,
  icon,
  isActuatable = true, // true: Toggle (Neumorph), false: Static Info (Filled)
  isConnected = true,   // true: Online, false: Offline (Ghost)
  style = {},
  className = ''
}) => {
  
  // Determine Button Variant
  let buttonVariant = 'neumorph';
  if (!isConnected) {
    buttonVariant = 'ghost';
  } else if (!isActuatable) {
    buttonVariant = 'filled';
  }

  // Determine Card Opacity for Offline state
  const offlineStyle = !isConnected ? { opacity: 0.5, pointerEvents: 'none' } : {};

  return (
    <div className={`${styles.card} ${isOn && isConnected ? styles.active : ''}`} style={{ ...offlineStyle, ...style }}>
      <div className={styles.infoWrapper}>
        <DeviceInfo 
          name={name} 
          status={status} 
          isOn={isOn} 
        />
      </div>
      <div className={styles.actionWrapper}>
        <Button 
          active={isOn} 
          icon={icon} 
          onClick={onToggle}
          variant={buttonVariant}
          disabled={!isConnected} // Disable button interaction if offline
        />
      </div>
    </div>
  );
};

export default BinaryDeviceCard;
