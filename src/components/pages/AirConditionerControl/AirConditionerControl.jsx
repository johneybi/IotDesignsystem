import React, { useState } from 'react';
import styles from './AirConditionerControl.module.css';
import TabBar from '../../organisms/Navigation/TabBar/TabBar';
import dashboardBg from '../../../assets/images/dashboard_bg_mono.png';
import { ChevronLeft, Power } from 'lucide-react';
import BinaryDeviceCard from '../../organisms/Cards/BinaryDeviceCard/BinaryDeviceCard';
import TemperatureControl from '../../molecules/Circular/TemperatureControl/TemperatureControl';
import Chip from '../../atoms/Chip/Chip';
import Dropdown from '../../molecules/Selection/Dropdown/Dropdown';

const AirConditionerControl = () => {
    const [navTab, setNavTab] = useState('devices');
    const [isOn, setIsOn] = useState(true);
    const [targetTemp, setTargetTemp] = useState(24);
    const [currentTemp, setCurrentTemp] = useState(26);
    const [activeMode, setActiveMode] = useState('Cooling');
    const [schedule, setSchedule] = useState('none');

    const scheduleOptions = [
        { label: 'No Schedule', value: 'none' },
        { label: 'Turn off in 30 min', value: 'off_30' },
        { label: 'Turn off in 1 hr', value: 'off_60' },
        { label: 'Sleep Mode (8hr)', value: 'sleep_8' },
        { label: 'Wake up at 7:00 AM', value: 'wake_7' },
    ];

    // Determine status text based on state and temperature difference
    const getStatus = () => {
        if (!isOn) return "Off";
        if (targetTemp < currentTemp) return "Cooling";
        if (targetTemp > currentTemp) return "Heating";
        return "Idle";
    };

    return (
        <div className={styles.page}>
            <div className={styles.backgroundLayer}>
                <img src={dashboardBg} alt="" className={styles.backgroundImage} />
                <div className={styles.colorOverlay} />
            </div>

            <div className={styles.content}>
                {/* Header */}
                <div className={styles.header}>
                    <button className={styles.backButton}>
                        <ChevronLeft size={24} />
                    </button>
                    <div className={styles.headerTitle}>
                        <span className={styles.headerSubtitle}>Living Room</span>
                        <span className={styles.headerMainTitle}>Air Conditioner</span>
                    </div>
                </div>
                
                {/* Power Toggle Card */}
                <div className={styles.cardRow}>
                    <BinaryDeviceCard 
                        status={getStatus()}
                        isOn={isOn}
                        onToggle={() => setIsOn(!isOn)}
                        icon={<Power size={24} />}
                        style={{ width: '100%' }}
                        variant="minimal"
                    />
                </div>

                {/* Main Temperature Control Card */}
                <div className={`${styles.mainControlCard} ${!isOn ? styles.controlsDisabled : ''}`}>
                    <div className={styles.readoutContainer}>
                        <span className={styles.readoutValue}>{currentTemp}°C</span>
                        <span className={styles.readoutLabel}>Current Temp</span>
                    </div>
                    
                    <TemperatureControl 
                        targetTemp={targetTemp}
                        currentTemp={currentTemp}
                        onChange={setTargetTemp}
                        min={18}
                        max={30}
                        gradientId="acGradient"
                        gradientColors={[
                          { offset: "0%", color: "var(--sys-color-temp-ac-cool-strong)" }, /* Deep Blue (Low Temp) */
                          { offset: "50%", color: "var(--sys-color-temp-ac-cool-mid)" },
                          { offset: "100%", color: "var(--sys-color-temp-ac-cool-weak)" } /* Gray (High Temp) */
                        ]}
                    />
                </div>

                {/* Mode Selection */}
                <div className={`${styles.sectionRow} ${!isOn ? styles.controlsDisabled : ''}`}>
                    <span className={styles.sectionTitle}>Mode</span>
                    <div className={styles.chipGroup}>
                        <Chip 
                            label="Dehumidify" 
                            variant="translucent"
                            active={activeMode === 'Dehumidify'}
                            onClick={() => setActiveMode('Dehumidify')} 
                        />
                        <Chip 
                            label="Cooling" 
                            variant="translucent"
                            active={activeMode === 'Cooling'}
                            onClick={() => setActiveMode('Cooling')} 
                        />
                        <Chip 
                            label="Auto" 
                            variant="translucent"
                            active={activeMode === 'Auto'}
                            onClick={() => setActiveMode('Auto')} 
                        />
                    </div>
                </div>

                {/* Automation (Schedule) */}
                <div className={`${styles.sectionRow} ${!isOn ? styles.controlsDisabled : ''}`} style={{ paddingBottom: 120 }}>
                    <span className={styles.sectionTitle}>Automation</span>
                    <Dropdown 
                        options={scheduleOptions}
                        value={schedule}
                        onChange={(opt) => setSchedule(opt.value)}
                        placeholder="Select Schedule"
                        style={{ width: '100%' }}
                    />
                </div>

                <TabBar activeTab={navTab} onTabChange={setNavTab} />
            </div>
        </div>
    );
};

export default AirConditionerControl;
