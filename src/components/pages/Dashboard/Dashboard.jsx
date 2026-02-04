import React, { useState } from 'react';
import styles from './Dashboard.module.css';
import Chip from '../../atoms/Chip/Chip';
import BinaryDeviceCard from '../../organisms/Cards/BinaryDeviceCard/BinaryDeviceCard';
import ActionDeviceCard from '../../organisms/Cards/ActionDeviceCard/ActionDeviceCard';
import TabBar from '../../organisms/Navigation/TabBar/TabBar';

const Dashboard = () => {
    const [activeTab, setActiveTab] = useState('All');
    const [navTab, setNavTab] = useState('home'); // Bottom Navigation State

    const [devices, setDevices] = useState({
        light1: true,
        light2: false,
        light3: true,
        plug1: false,
        speaker: false,
    });


    const toggle = (id) => {
        setDevices(prev => ({ ...prev, [id]: !prev[id] }));
    };

    const BulbIcon = <svg viewBox="0 0 24 24"><path d="M9 21c0 .55.45 1 1 1h4c.55 0 1-.45 1-1v-1H9v1zm3-19C8.14 2 5 5.14 5 9c0 2.38 1.19 4.47 3 5.74V17c0 .55.45 1 1 1h6c.55 0 1-.45 1-1v-2.26c1.81-1.27 3-3.36 3-5.74 0-3.86-3.14-7-7-7zm2.85 11.1l-.85.6V16h-4v-2.3l-.85-.6C7.8 12.16 7 10.63 7 9c0-2.76 2.24-5 5-5s5 2.24 5 5c0 1.63-.8 3.16-2.15 4.1z"/></svg>;
    const PlugIcon = <svg viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8-8zm-1-14h2v6h-2zm0 8h2v2h-2z" fill="currentColor"/></svg>; // Placeholder plug
    
    // Speaker Icons
    const PlayIcon = <svg viewBox="0 0 24 24"><path d="M8 5v14l11-7z" fill="currentColor"/></svg>;
    const PauseIcon = <svg viewBox="0 0 24 24"><path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z" fill="currentColor"/></svg>;

    // Tabs
    const tabs = ['All', 'Living room', 'Bedroom', 'Kitchen'];

    return (
        <div className={styles.dashboard}>
            <div className={styles.header}>
                <h1 className={styles.title}>House</h1>
                
                <div className={styles.tabs}>
                    {tabs.map(tab => (
                        <Chip 
                            key={tab}
                            label={tab} 
                            active={activeTab === tab} 
                            onClick={() => setActiveTab(tab)}
                        />
                    ))}
                </div>
            </div>

            <div className={styles.section}>
                <h2 className={styles.sectionTitle}>Devices</h2>
                <div className={styles.grid}>
                    {/* Light 01 - On */}
                    <BinaryDeviceCard 
                        name="Light 01"
                        status="88%"
                        isOn={devices.light1}
                        onToggle={() => toggle('light1')}
                        icon={BulbIcon}
                    />

                    {/* Radio - Action Card - Span 1 or 2? Let's keep 1 for density or 2 for emphasis. 
                        Image shows wide cards. Let's try regular size first.
                    */}
                    <ActionDeviceCard 
                         name="Radio 01"
                         status={devices.speaker ? "Playing" : "Paused"}
                         isPlaying={devices.speaker}
                         onAction={() => toggle('speaker')}
                         icon={devices.speaker ? PauseIcon : PlayIcon}
                    />

                     {/* Light 02 - Off */}
                     <BinaryDeviceCard 
                        name="Light 02"
                        status="Off"
                        isOn={devices.light2}
                        onToggle={() => toggle('light2')}
                        icon={BulbIcon}
                        isActuatable={true}
                    />

                    {/* Offline Device */}
                     <BinaryDeviceCard 
                        name="Light 03"
                        status="Disconnected"
                        isOn={false}
                        onToggle={() => {}}
                        icon={BulbIcon}
                        isConnected={false}
                    />

                    {/* Wide Card example? */}
                    <div className={styles.span2}>
                        <BinaryDeviceCard 
                            name="Master Light"
                            status={devices.light3 ? "All Bright" : "All Dim"}
                            isOn={devices.light3}
                            onToggle={() => toggle('light3')}
                            icon={BulbIcon}
                            style={{ width: '100%', maxWidth: '100%' }}
                        />
                    </div>
                </div>
            </div>
            
            <TabBar activeTab={navTab} onTabChange={setNavTab} />
        </div>
    );
};


export default Dashboard;
