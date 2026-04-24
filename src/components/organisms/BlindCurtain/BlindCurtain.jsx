import React from 'react';
import VerticalSlider from '../../molecules/Linear/VerticalSlider/VerticalSlider';
import styles from './BlindCurtain.module.css';

const BlindCurtain = () => {
    return (
        <div className={styles.card}>
            <div className={styles.sliderWrapper}>
                <VerticalSlider 
                    variant="blind"
                    handlePosition="in-top"
                    showIcons={false}
                />
            </div>
        </div>
    );
};

export default BlindCurtain;
