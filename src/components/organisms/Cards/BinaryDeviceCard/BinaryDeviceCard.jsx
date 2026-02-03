import React from 'react';
import styles from './BinaryDeviceCard.module.css';
import DeviceInfo from '../../../molecules/Display/DeviceInfo/DeviceInfo';
import Button from '../../../atoms/Button/Button';

const BinaryDeviceCard = ({ 
  name, 
  status, 
  isOn, 
  onToggle,
  icon 
}) => {
  return (
    <div className={`${styles.card} ${isOn ? styles.active : ''}`}>
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
        />
      </div>
    </div>
  );
};

export default BinaryDeviceCard;
