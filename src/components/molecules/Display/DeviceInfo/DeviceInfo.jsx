import React from 'react';
import styles from './DeviceInfo.module.css';

const DeviceInfo = ({ 
  name, 
  status, 
  isOn = false 
}) => {
  return (
    <div className={styles.container}>
      <h3 className={styles.name}>{name}</h3>
      <span className={`${styles.status} ${isOn ? styles.on : ''}`}>
        {status}
      </span>
    </div>
  );
};

export default DeviceInfo;
