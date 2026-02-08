import React, { useState, useRef } from 'react';
import { SoundHigh, SoundOff } from 'iconoir-react';
import SliderHandle from '../../atoms/SliderHandle/SliderHandle';
import styles from './SpeakerVolumeControl.module.css';

const SpeakerVolumeControl = ({ 
  initialVolume = 50,
  onChange // 볼륨 변경 콜백
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
        
        // onChange 콜백 호출
        if (onChange) {
            const newVolume = Math.round(100 - newPos);
            onChange(newVolume);
        }
    };

    const handlePointerUp = (e) => {
        isDragging.current = false;
        e.currentTarget.releasePointerCapture(e.pointerId);
    };

    // Derived Volume Value (0-100)
    const volume = Math.round(100 - sliderPos);

    // Icon Logic
    const splitPercent = sliderPos;
    const topIconIsOnBlack = splitPercent < 8; // Top icon on filled black part

    const getTopIconStyle = () => {
        return {
             top: '24px',
             color: topIconIsOnBlack ? 'var(--comp-slider-icon-color-light)' : 'var(--comp-slider-icon-color-dark)',
             transform: 'translateX(-50%)',
             opacity: 1
        };
    };

    // Bottom Icon (Mute) - fill과 겹칠 때도 보이도록 개선
    const isMuted = volume === 0;
    const bottomIconIsOnFill = sliderPos < 92; // 하단 아이콘이 fill 영역과 겹침

    const getBottomIconStyle = () => {
        // fill과 겹칠 때는 밝은 색상, 아닐 때는 어두운 색상
        let color;
        let opacity;
        
        if (isMuted) {
            // 뮤트 상태: 항상 위험 색상으로 강조
            color = 'var(--sys-color-status-danger)';
            opacity = 1;
        } else if (bottomIconIsOnFill) {
            // fill과 겹침: 밝은 회색으로 낮은 위계 표시
            color = 'var(--comp-slider-icon-color-light)';
            opacity = 0.4;
        } else {
            // fill과 안겹침: 어두운 회색
            color = 'var(--sys-color-text-tertiary)';
            opacity = 0.5;
        }
        
        return {
            bottom: '24px',
            color: color,
            opacity: opacity,
            transform: 'translateX(-50%)'
        };
    };

    // Handle Style
    const getHandleStyle = () => {
        return {
            top: `${sliderPos}%`,
            transform: 'translateY(6px)' 
        };
    };

    return (
        <div className={styles.container}>
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
                        <SoundHigh width={24} height={24} /> 
                    </div>
                    
                    <div className={styles.icon} style={getBottomIconStyle()}>
                        <SoundOff width={24} height={24} />
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
