import React, { useState } from 'react';
import VerticalSlider from '../../molecules/Linear/VerticalSlider/VerticalSlider';
import styles from './BlindCurtain.module.css';

const BlindCurtain = ({ title = "Living Room" }) => {
    // State to track opening percentage (0-100)
    // 0 = Closed (Dark), 100 = Open (Bright)
    const [openPercent, setOpenPercent] = useState(50);

    return (
        <div className={styles.card}>
            <div className={styles.header}>
                <span className={styles.title}>{title}</span>
                <span className={styles.subtitle}>Blind Curtain</span>
            </div>
            
            <div className={styles.sliderWrapper}>
                <VerticalSlider 
                    variant="blind"
                    handlePosition="in-top"
                    showIcons={false}
                />
            </div>
            
            <div className={styles.status}>
                {/* Placeholder for status text or value if we lift state */}
                <span>Control Height</span>
            </div>
        </div>
    );
};

export default BlindCurtain;
