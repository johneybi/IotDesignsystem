import React, { useState } from 'react';
import styles from './LightingControl.module.css';
import TabBar from '../../organisms/Navigation/TabBar/TabBar';
import dashboardBg from '../../../assets/images/dashboard_bg_mono.png';
import { ChevronLeft, Power } from 'lucide-react';
import BinaryDeviceCard from '../../organisms/Cards/BinaryDeviceCard/BinaryDeviceCard';
import AdaptiveLightSlider from '../../molecules/Linear/AdaptiveLightSlider/AdaptiveLightSliderNew';
import Readout from '../../molecules/Display/Readout/Readout';
import ColorTemperatureSlider from '../../molecules/Linear/ColorTemperatureSlider/ColorTemperatureSlider';
import Chip from '../../atoms/Chip/Chip';

const LightingControl = () => {
    const [navTab, setNavTab] = useState('devices');
    const [isLightOn, setIsLightOn] = useState(true);
    const [brightness, setBrightness] = useState(0);
    const [colorTemp, setColorTemp] = useState(4500);

    return (
        <div className={styles.page}>
            <div className={styles.backgroundLayer}>
                <img src={dashboardBg} alt="" className={styles.backgroundImage} />
                <div className={styles.colorOverlay} />
            </div>

            <div className={styles.content}>
                <div className={styles.header}>
                    <button className={styles.backButton}>
                        <ChevronLeft size={24} />
                    </button>
                    <div className={styles.headerTitle}>
                        <span className={styles.headerSubtitle}>Living Room</span>
                        <span className={styles.headerMainTitle}>Main Light</span>
                    </div>
                </div>
                
                <div className={styles.cardRow}>
                    <BinaryDeviceCard 
                        status={isLightOn ? "On" : "Off"}
                        isOn={isLightOn}
                        onToggle={() => setIsLightOn(!isLightOn)}
                        icon={<Power size={24} />}
                        style={{ width: '100%' }}
                    />
                </div>

                <div className={styles.controlRow}>
                    <Readout value={brightness} unit="%" label="Brightness" />
                    <div className={styles.sliderGroup}>
                        <span className={styles.sliderLabel}>Light</span>
                        <AdaptiveLightSlider onChange={setBrightness} />
                        <span className={styles.sliderLabel}>Dark</span>
                    </div>
                </div>

                <div className={styles.tempControlRow}>
                    <div className={styles.tempHeader}>
                        <span className={styles.sectionTitle}>Color Temperature</span>
                        <span className={styles.tempValue}>{colorTemp}K</span>
                    </div>
                    <ColorTemperatureSlider value={colorTemp} onChange={setColorTemp} />
                </div>

                <div className={styles.modeRow}>
                    <span className={styles.sectionTitle}>Mode</span>
                    <div className={styles.chipGroup}>
                        <Chip 
                            label="Relax" 
                            variant="translucent"
                            active={colorTemp === 3000}
                            onClick={() => setColorTemp(3000)} 
                        />
                         <Chip 
                            label="Reading" 
                            variant="translucent"
                            active={colorTemp === 4200}
                            onClick={() => setColorTemp(4200)} 
                        />
                        <Chip 
                            label="Activity" 
                            variant="translucent"
                            active={colorTemp === 6000}
                            onClick={() => setColorTemp(6000)} 
                        />
                    </div>
                </div>
                
                <TabBar activeTab={navTab} onTabChange={setNavTab} />
            </div>
        </div>
    );
};

export default LightingControl;
