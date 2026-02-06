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
  onClick, /* New Prop */
  isConnected = true,
  style = {},
  className = '',
  isFullWidth = true
}) => {
  
  let buttonVariant = 'neumorph';
  if (!isConnected) {
    buttonVariant = 'ghost';
  } else if (!isPlaying) {
    buttonVariant = 'neumorph-dark';
  }

  const offlineStyle = !isConnected ? { opacity: 0.5, pointerEvents: 'none' } : {};

  const handleAction = (e) => {
    e.stopPropagation();
    onAction && onAction();
  };

  return (
    <div 
      className={`
        ${styles.card} 
        ${isPlaying && isConnected ? styles.active : ''} 
        ${!isFullWidth ? styles.compact : ''}
        ${className}
      `} 
      style={{ ...offlineStyle, ...style, cursor: onClick ? 'pointer' : 'default' }}
      onClick={onClick}
    >
      <div className={styles.infoWrapper}>
        <DeviceInfo 
          name={name} 
          status={status} 
          isOn={isPlaying} 
        />
      </div>
      <div className={styles.actionWrapper}>
        <Button 
          active={isPlaying} 
          icon={icon} 
          onClick={handleAction}
          variant={buttonVariant}
          disabled={!isConnected}
        />
      </div>
    </div>
  );
};

export default ActionDeviceCard;
