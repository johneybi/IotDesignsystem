import React from 'react';
import AdaptiveLightSlider from '../../molecules/Linear/AdaptiveLightSlider/AdaptiveLightSliderNew';
import styles from './IotLightingBrightnessController.module.css';

/**
 * IotLightingBrightnessController
 * An organism that wraps the AdaptiveLightSlider to control lighting brightness.
 * It provides a card-like container with a title and optional status.
 * 
 * @param {string} title - The name of the light being controlled (e.g., "Living Room")
 * @param {string} subtitle - Optional status text (e.g., "Brightness")
 */
const IotLightingBrightnessController = () => {
  return (
    <div style={{ display: 'flex', justifyContent: 'center', width: '100%' }}>
        <AdaptiveLightSlider />
    </div>
  );
};

export default IotLightingBrightnessController;
