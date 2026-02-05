import React from 'react';
import styles from './DeviceInfo.module.css';

const DeviceInfo = ({ 
  name, 
  status, 
  isOn = false,
  location
}) => {
  return (
    <div className={styles.container}>
      <div className={styles.nameRow}>
          {name && <h3 className={styles.name}>{name}</h3>}
          <div className={styles.statusContainer}>
             <span className={styles.caption}>Status</span>
             <span className={`${styles.status} ${isOn ? styles.on : ''}`}>{status}</span>
          </div>
      </div>
    </div>
  );
};

export default DeviceInfo;
