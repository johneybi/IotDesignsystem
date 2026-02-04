import React from 'react';
import styles from './ActionDeviceCard.module.css';
import DeviceInfo from '../../../molecules/Display/DeviceInfo/DeviceInfo';
import Button from '../../../atoms/Button/Button';

const ActionDeviceCard = ({ 
  name, 
  status, 
  isPlaying = false, 
  onAction,
  icon,
  isConnected = true,
  style = {},
  className = ''
}) => {
  
  // Determine Button Variant
  // For Action Card, usually we want the button to look 'pressed' or 'active' when playing
  // Or 'neumorph' state when ready to play.
  
  let buttonVariant = 'neumorph';
  if (!isConnected) {
    buttonVariant = 'ghost';
  } else if (!isPlaying) {
    buttonVariant = 'neumorph-dark';
  }

  // Determine Card Opacity for Offline state
  const offlineStyle = !isConnected ? { opacity: 0.5, pointerEvents: 'none' } : {};

  return (
    <div 
      className={`${styles.card} ${isPlaying && isConnected ? styles.active : ''} ${className}`} 
      style={{ ...offlineStyle, ...style }}
    >
      <div className={styles.infoWrapper}>
        <DeviceInfo 
          name={name} 
          status={status} 
          isOn={isPlaying} // Reuse DeviceInfo's ON state for active text styling if needed
        />
      </div>
      <div className={styles.actionWrapper}>
        <Button 
          active={isPlaying} 
          icon={icon} 
          onClick={onAction}
          variant={buttonVariant}
          disabled={!isConnected}
        />
      </div>
    </div>
  );
};

export default ActionDeviceCard;
