import React, { useState } from 'react';
import styles from './Dashboard.module.css';
import Chip from '../../atoms/Chip/Chip';
import BinaryDeviceCard from '../../organisms/Cards/BinaryDeviceCard/BinaryDeviceCard';
import ActionDeviceCard from '../../organisms/Cards/ActionDeviceCard/ActionDeviceCard';
import TabBar from '../../organisms/Navigation/TabBar/TabBar';
import dashboardBg from '../../../assets/images/dashboard_bg_mono.png';
import { Sun, Moon, LogOut } from 'lucide-react';

const Dashboard = ({ onNavigate }) => { // Accepting onNavigate prop for App-level routing shim (since App.jsx handles 'pages' via state)
    const [activeTab, setActiveTab] = useState('All');
    const [navTab, setNavTab] = useState('home');

    // Room Colors for Dynamic Overlay
    const roomColors = {
        'All': 'rgba(242, 243, 245, 0.40)', // Neutral (Restored)
        'Living Room': 'rgba(255, 204, 0, 0.15)', // Warm Yellow (Updated)
        'Bedroom': 'rgba(33, 150, 243, 0.15)', // Cool Blue (Unchanged)
        'Kitchen': 'rgba(110, 231, 183, 0.15)' // Teal (Updated)
    };

    const currentOverlayColor = roomColors[activeTab] || roomColors['All'];

    // Mock Date
    const today = new Date();
    const dateOptions = { weekday: 'long', month: 'long', day: 'numeric' };
    const dateString = today.toLocaleDateString('en-US', dateOptions);

    // Initial Device Data with Room Property and Navigation Target
    const [devices, setDevices] = useState([
        { id: 'light1', name: 'Main Light', type: 'binary', room: 'Living Room', isOn: true, status: '88%', icon: 'bulb', targetPage: 'lighting', span: 2 },
        { id: 'ac1', name: 'Air Conditioner', type: 'binary', room: 'Living Room', isOn: true, status: '23°C', icon: 'ac', targetPage: 'airconditioner', span: 2 }, 
        { id: 'speaker', name: 'Speaker', type: 'action', room: 'Living Room', isPlaying: false, status: 'Paused', icon: 'speaker', span: 1 }, 
        { id: 'light2', name: 'Bedroom Light', type: 'binary', room: 'Bedroom', isOn: false, status: 'Off', icon: 'bulb', targetPage: 'lighting', span: 1 },
        { id: 'light3', name: 'Kitchen Light', type: 'binary', room: 'Kitchen', isOn: false, status: 'Disconnected', icon: 'bulb', isConnected: false, span: 1 },
        { id: 'master', name: 'Master Switch', type: 'binary', room: 'All', isOn: true, status: 'All On', icon: 'bulb', span: 1 }
    ]);

    const toggleDevice = (id) => {
        setDevices(prev => prev.map(d => {
            if (d.id === id) {
                if (d.type === 'action') {
                     return { ...d, isPlaying: !d.isPlaying, status: !d.isPlaying ? "Playing" : "Paused" };
                }
                return { ...d, isOn: !d.isOn, status: !d.isOn ? 'On' : 'Off' };
            }
            return d;
        }));
    };

    // Filter Devices
    const filteredDevices = activeTab === 'All' 
        ? devices 
        : devices.filter(d => d.room === activeTab || d.room === 'All');

    // Device Icons (Inline SVGs for specific devices)
    const BulbIcon = <svg viewBox="0 0 24 24" fill="currentColor"><path d="M9 21c0 .55.45 1 1 1h4c.55 0 1-.45 1-1v-1H9v1zm3-19C8.14 2 5 5.14 5 9c0 2.38 1.19 4.47 3 5.74V17c0 .55.45 1 1 1h6c.55 0 1-.45 1-1v-2.26c1.81-1.27 3-3.36 3-5.74 0-3.86-3.14-7-7-7zm2.85 11.1l-.85.6V16h-4v-2.3l-.85-.6C7.8 12.16 7 10.63 7 9c0-2.76 2.24-5 5-5s5 2.24 5 5c0 1.63-.8 3.16-2.15 4.1z"/></svg>;
    const PlayIcon = <svg viewBox="0 0 24 24"><path d="M8 5v14l11-7z" fill="currentColor"/></svg>;
    const PauseIcon = <svg viewBox="0 0 24 24"><path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z" fill="currentColor"/></svg>;
    const ACIcon = <svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 2c-4.97 0-9 4.03-9 9 0 4.97 4.03 9 9 9s9-4.03 9-9c0-4.97-4.03-9-9-9zm0 16c-3.87 0-7-3.13-7-7s3.13-7 7-7 7 3.13 7 7-3.13 7-7 7zm1-10h-2v4h-2v2h2v4h2v-4h2v-2h-2V8z"/></svg>; // Temp placeholder

    // Tabs
    const tabs = ['All', 'Living Room', 'Bedroom', 'Kitchen'];

    return (
        <div className={styles.dashboard}>
            <div className={styles.backgroundLayer}>
                <img src={dashboardBg} alt="" className={styles.backgroundImage} />
                <div 
                    className={styles.colorOverlay} 
                    style={{ 
                        background: `linear-gradient(180deg, ${currentOverlayColor} 0%, rgba(242, 243, 245, 0.95) 100%)` 
                    }} 
                />
            </div>
            
            <div className={styles.content}>
                {/* Header */}
                <div className={styles.header}>
                    <div className={styles.greetingBlock}>
                        <span className={styles.date}>{dateString}</span>
                        <h1 className={styles.greeting}>Good Morning, <br/>Flowthing</h1>
                    </div>
                    <div className={styles.profileIcon} />
                </div>

                {/* Scenes - Horizontal Scroll */}
                <div className={styles.scenesSection}>
                    <h2 className={styles.sectionTitle}>Scenes</h2>
                    <div className={styles.sceneScroll}>
                        <div className={styles.sceneCard}>
                            <div className={`${styles.sceneIcon} ${styles.morning}`}>
                                <Sun size={20} color="#FFF" />
                            </div>
                            <span className={styles.sceneLabel}>Morning</span>
                        </div>
                        <div className={styles.sceneCard}>
                            <div className={`${styles.sceneIcon} ${styles.night}`}>
                                <Moon size={20} color="#FFF" />
                            </div>
                            <span className={styles.sceneLabel}>Night</span>
                        </div>
                        <div className={styles.sceneCard}>
                            <div className={`${styles.sceneIcon} ${styles.away}`}>
                                <LogOut size={20} color="#FFF" />
                            </div>
                            <span className={styles.sceneLabel}>Away</span>
                        </div>
                    </div>
                </div>

                {/* Devices */}
                <div className={styles.section}>
                    <div className={styles.deviceHeader}>
                         <h2 className={styles.sectionTitle}>Devices</h2>
                    </div>
                    
                    <div className={styles.tabs}>
                        {tabs.map(tab => (
                            <Chip 
                                key={tab}
                                label={tab} 
                                variant={activeTab === tab ? 'solid' : 'translucent'} 
                                active={activeTab === tab} 
                                onClick={() => setActiveTab(tab)}
                            />
                        ))}
                    </div>

                    <div className={styles.grid}>
                        {filteredDevices.map(device => {
                            // Icon Selection
                            let icon = BulbIcon;
                            if (device.icon === 'speaker') icon = device.isPlaying ? PauseIcon : PlayIcon;
                            if (device.icon === 'ac') icon = ACIcon;

                            const isFullWidth = device.span === 2;

                            if (device.type === 'action') {
                                return (
                                    <ActionDeviceCard
                                        key={device.id}
                                        name={device.name}
                                        status={device.status}
                                        isPlaying={device.isPlaying}
                                        onAction={() => toggleDevice(device.id)}
                                        icon={icon}
                                        className={device.span === 2 ? styles.span2 : ''}
                                        onClick={() => onNavigate && onNavigate(device.id)} 
                                        isFullWidth={isFullWidth}
                                    />
                                );
                            }
                            return (
                                <BinaryDeviceCard 
                                    key={device.id}
                                    name={device.name}
                                    status={device.status}
                                    isOn={device.isOn}
                                    onToggle={() => toggleDevice(device.id)}
                                    icon={icon}
                                    isConnected={device.isConnected !== false}
                                    className={device.span === 2 ? styles.span2 : ''}
                                    style={device.span === 2 ? { width: '100%' } : {}}
                                    onClick={() => device.targetPage && onNavigate && onNavigate(device.targetPage)}
                                    isFullWidth={isFullWidth}
                                />
                            );
                        })}
                    </div>
                </div>
            </div>

            {/* Tab Bar - Moved Outside Content */}
            <TabBar activeTab={navTab} onTabChange={setNavTab} />
        </div>
    );
};

export default Dashboard;
