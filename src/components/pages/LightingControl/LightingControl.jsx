import React, { useState } from 'react';
import { ChevronLeft, Zap, BookOpen, Coffee, Sun, Moon } from 'lucide-react';
import styles from './LightingControl.module.css';

import IotLightingBrightnessController from '../../organisms/IotLightingBrightnessController/IotLightingBrightnessController';
import { Slider } from '../../molecules/Linear'; // Use standard Slider
import TabBar from '../../organisms/Navigation/TabBar/TabBar';

const LightingControl = () => {
    const [activeScene, setActiveScene] = useState('Relax');
    const [navTab, setNavTab] = useState('devices');
    const [colorTemp, setColorTemp] = useState(50); // 0 (Warm) - 100 (Cool)

    const scenes = [
        { id: 'Focus', icon: Zap, label: 'Focus' },
        { id: 'Read', icon: BookOpen, label: 'Reading' },
        { id: 'Relax', icon: Coffee, label: 'Relax' },
    ];

    // Helper to visualize simple Color Temp change text
    const getTempLabel = (val) => {
        if (val < 30) return 'Warm White';
        if (val > 70) return 'Cool White';
        return 'Neutral';
    };

    return (
        <div className={styles.page}>
            <header className={styles.header}>
                <button className={styles.backButton}>
                    <ChevronLeft size={24} />
                </button>
                <div className={styles.titleArea}>
                    <span className={styles.roomName}>Living Room</span>
                    <span className={styles.deviceName}>Main Light</span>
                </div>
            </header>

            <main className={styles.mainControl}>
                {/* Visual + Brightness Controller */}
                {/* Scaled wrapper for larger appearance */}
                <div className={styles.responsiveScaler}>
                    <IotLightingBrightnessController />
                </div>
            </main>
            
            <section className={styles.secondaryControls}>
                 <div className={styles.controlHeader}>
                    <label className={styles.controlLabel}>Temperature</label>
                    <span className={styles.valueLabel}>{getTempLabel(colorTemp)}</span>
                 </div>
                 
                 {/* Temperature Slider with Visual Icons */}
                 <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                     <Sun size={20} color="#F59E0B" style={{ opacity: 0.6 }} /> {/* Warm Icon Placeholder */}
                     <div style={{ flex: 1 }} className={styles.tempSliderWrapper}>
                        <Slider 
                            value={colorTemp} 
                            onChange={setColorTemp} 
                            min={0} 
                            max={100} 
                        />
                     </div>
                     <Moon size={20} color="#3B82F6" style={{ opacity: 0.6 }} /> {/* Cool Icon Placeholder */}
                 </div>
            </section>

            <section className={styles.scenesSection}>
                <label className={styles.controlLabel} style={{ display:'block', marginBottom: '20px' }}>Scenes</label>
                <div className={styles.scenesWrapper}>
                    {scenes.map((scene) => {
                        const Icon = scene.icon;
                        const isActive = activeScene === scene.id;
                        return (
                            <button 
                                key={scene.id} 
                                className={`${styles.sceneBtn} ${isActive ? styles.active : ''}`}
                                onClick={() => setActiveScene(scene.id)}
                            >
                                <div className={styles.sceneIcon}>
                                    <Icon size={28} strokeWidth={isActive ? 2.5 : 2} />
                                </div>
                                <span className={styles.sceneName}>{scene.label}</span>
                            </button>
                        )
                    })}
                </div>
            </section>

            <TabBar activeTab={navTab} onTabChange={setNavTab} />
        </div>
    );
};

export default LightingControl;
