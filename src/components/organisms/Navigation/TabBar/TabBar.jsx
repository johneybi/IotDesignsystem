import React from 'react';
import { HomeSimple, StatsReport, Settings, SystemRestart } from 'iconoir-react'; 
import styles from './TabBar.module.css';

const TabBar = ({ activeTab = 'home', onTabChange }) => {
    const tabs = [
        { id: 'home', icon: HomeSimple, label: 'Home' },
        { id: 'devices', icon: SystemRestart, label: 'Devices' }, // Temporary mapping for Devices
        { id: 'stats', icon: StatsReport, label: 'Stats' },
        { id: 'settings', icon: Settings, label: 'Settings' },
    ];

    return (
        <div className={styles.tabBarWrapper}>
            <nav className={styles.tabBar}>
                {tabs.map((tab) => {
                    const Icon = tab.icon;
                    const isActive = activeTab === tab.id;
                    
                    return (
                        <button 
                            key={tab.id}
                            className={`${styles.tabItem} ${isActive ? styles.active : ''}`}
                            onClick={() => onTabChange && onTabChange(tab.id)}
                            aria-label={tab.label}
                        >
                            <Icon 
                                width={26}
                                height={26} 
                                strokeWidth={isActive ? 2.5 : 2} 
                            />
                        </button>
                    );
                })}
            </nav>
        </div>
    );
};

export default TabBar;
