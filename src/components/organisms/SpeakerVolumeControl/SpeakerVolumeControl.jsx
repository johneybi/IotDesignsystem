import React, { useState, useRef } from 'react';
import { Volume2, VolumeX } from 'lucide-react';
import SliderHandle from '../../atoms/SliderHandle/SliderHandle';
import styles from './SpeakerVolumeControl.module.css';

const SpeakerVolumeControl = ({ 
  deviceName = "Speaker", 
  initialVolume = 50 
}) => {
    // sliderPos: 0 (Top/Max Vol) to 100 (Bottom/Min Vol)
    // Inverted logic: Volume 100 = 0% Top Offset. Volume 0 = 100% Top Offset.
    const [sliderPos, setSliderPos] = useState(100 - initialVolume);
    const sliderRef = useRef(null);
    const isDragging = useRef(false);
    const startY = useRef(0);
    const startSliderPos = useRef(0);

    const handlePointerDown = (e) => {
        isDragging.current = true;
        startY.current = e.clientY;
        startSliderPos.current = sliderPos;
        e.currentTarget.setPointerCapture(e.pointerId);
    };

    const handlePointerMove = (e) => {
        if (!isDragging.current || !sliderRef.current) return;

        const deltaY = e.clientY - startY.current;
        const height = sliderRef.current.getBoundingClientRect().height;
        const deltaPercentage = (deltaY / height) * 100;
        
        let newPos = startSliderPos.current + deltaPercentage;

        // Clamp betweeen 0 and 100
        if (newPos < 0) newPos = 0;
        if (newPos > 100) newPos = 100;

        setSliderPos(newPos);
    };

    const handlePointerUp = (e) => {
        isDragging.current = false;
        e.currentTarget.releasePointerCapture(e.pointerId);
    };

    // Derived Volume Value (0-100)
    const volume = Math.round(100 - sliderPos);

    // Icon Logic
    
    // Top Icon (Max Vol): 
    // Always visible at top.
    // Color: Black if background is Light (Top Frame). White if background is Black (Bottom Frame).
    // Top Frame is at Top. Bottom Frame is at Bottom.
    // Icon is at Top 24px.
    // If Split < 24px (High Vol), Split is ABOVE icon. Icon is on Bottom Frame (Black). -> Icon White.
    // If Split > 24px (Lower Vol), Split is BELOW icon. Icon is on Top Frame (Light). -> Icon Black.
    // Note: 24px in % depends on height (300px). 24px is 8%.
    const splitPercent = sliderPos;
    const topIconIsOnBlack = splitPercent < 8; // Top icon on filled black part

    const getTopIconStyle = () => {
        return {
             top: '24px',
             color: topIconIsOnBlack ? '#FFFFFF' : '#1d2129',
             transform: 'translateX(-50%)', // Centering is handled by class but let's be safe
             opacity: 1
        };
    };

    // Bottom Icon (Mute):
    // Only emphasized when Volume is 0 (sliderPos ~ 100).
    // Position: Bottom 24px.
    // If Split > 92 (Vol approx 0), Split is BELOW icon (Top Frame covers it? No).
    // Top Frame pushes down. Bottom Frame shrinks.
    // At Pos 100, Bottom Frame is 0. Icon is on Top Frame (Light).
    // At Pos 90, Bottom Frame is 10%. 
    // User wants: "Emphasized only when volume is 0".
    // "Emphasized" means distinct color/opacity. Otherwise Gray?
    
    const isMuted = volume === 0;

    const getBottomIconStyle = () => {
        return {
            bottom: '24px',
            color: isMuted ? '#FF4D4F' : '#86909c', // Red (Active) or specific color when muted, Gray otherwise
            opacity: isMuted ? 1 : 0.5,
            transform: 'translateX(-50%)'
        };
    };

    // Handle Style
    // 6px BELOW the split line.
    // With handleContainer being flex centered, we just need `top` updated.
    // `transform` for vertical offset only.
    const getHandleStyle = () => {
        return {
            top: `${sliderPos}%`,
            transform: 'translateY(6px)' 
        };
    };

    return (
        <div className={styles.container}>
            <div className={styles.header}>
                <span className={styles.title}>{deviceName}</span>
                <span className={styles.status}>{volume}%</span>
            </div>
            
            <div className={styles.sliderWrapper}>
                <div 
                    className={styles.sliderContainer}
                    ref={sliderRef}
                    onPointerDown={handlePointerDown}
                    onPointerMove={handlePointerMove}
                    onPointerUp={handlePointerUp}
                >
                    {/* Top Frame (Empty/Inactive) */}
                    <div 
                        className={styles.frameTop} 
                        style={{ height: `${sliderPos}%` }}
                    />

                    {/* Bottom Frame (Filled/Active) */}
                    <div 
                        className={styles.frameBottom}
                        style={{ height: `${100 - sliderPos}%` }}
                    />

                    {/* Icons */}
                    <div className={styles.icon} style={getTopIconStyle()}>
                        <Volume2 size={24} /> 
                    </div>
                    
                    <div className={styles.icon} style={getBottomIconStyle()}>
                        <VolumeX size={24} />
                    </div>

                    {/* Handle */}
                    <div className={styles.handleContainer} style={getHandleStyle()}>
                        <SliderHandle style={{ width: '60px' }} /> {/* Slightly wider handle for scale */}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SpeakerVolumeControl;
