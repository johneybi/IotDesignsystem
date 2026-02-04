import React from 'react';
import { Home, BarChart2, Settings, Smartphone } from 'lucide-react';
import styles from './TabBar.module.css';

const TabBar = ({ activeTab = 'home', onTabChange }) => {
    const tabs = [
        { id: 'home', icon: Home, label: 'Home' },
        { id: 'devices', icon: Smartphone, label: 'Devices' },
        { id: 'stats', icon: BarChart2, label: 'Stats' },
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
                                size={26} 
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
