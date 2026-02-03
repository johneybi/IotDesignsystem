import React, { useState, useRef } from 'react';
import SliderHandle from '../../../atoms/SliderHandle/SliderHandle';
import './LightControlSlider.css';

const MoonIcon = () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79Z" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
);

const SunIcon = () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="12" cy="12" r="5" stroke="white" strokeWidth="2" />
        <path d="M12 1V3" stroke="white" strokeWidth="2" strokeLinecap="round" />
        <path d="M12 21V23" stroke="white" strokeWidth="2" strokeLinecap="round" />
        <path d="M4.22 4.22L5.64 5.64" stroke="white" strokeWidth="2" strokeLinecap="round" />
        <path d="M18.36 18.36L19.78 19.78" stroke="white" strokeWidth="2" strokeLinecap="round" />
        <path d="M1 12H3" stroke="white" strokeWidth="2" strokeLinecap="round" />
        <path d="M21 12H23" stroke="white" strokeWidth="2" strokeLinecap="round" />
        <path d="M4.22 19.78L5.64 18.36" stroke="white" strokeWidth="2" strokeLinecap="round" />
        <path d="M18.36 5.64L19.78 4.22" stroke="white" strokeWidth="2" strokeLinecap="round" />
    </svg>
);

const LightControlSlider = () => {
    // sliderPos: 0 (Top/Dark) to 100 (Bottom/Bright)
    const [sliderPos, setSliderPos] = useState(50);
    const sliderRef = useRef(null);
    const isDragging = useRef(false);

    const handlePointerDown = (e) => {
        isDragging.current = true;
        updatePosition(e.clientY);
        e.currentTarget.setPointerCapture(e.pointerId);
    };

    const handlePointerMove = (e) => {
        if (!isDragging.current) return;
        updatePosition(e.clientY);
    };

    const handlePointerUp = (e) => {
        isDragging.current = false;
        e.currentTarget.releasePointerCapture(e.pointerId);
    };

    const updatePosition = (clientY) => {
        if (!sliderRef.current) return;

        const rect = sliderRef.current.getBoundingClientRect();
        const height = rect.height;
        const top = rect.top;

        let relativeY = clientY - top;

        if (relativeY < 0) relativeY = 0;
        if (relativeY > height) relativeY = height;

        // Position 100% (Top) to 0% (Bottom)
        // Drag UP -> Value Increases -> Brightness Increases
        const percentage = Math.round(((height - relativeY) / height) * 100);
        setSliderPos(percentage);
    };

    const displayValue = sliderPos;

    // Icons: Attached to Handle (Move with slider).
    // Logic matches Reference 'knob':
    // Moon (Dark/Low): Visible 0 -> 50%
    // Sun (Bright/High): Visible 50 -> 100%

    const getMoonStyle = () => {
        let opacity = 1;
        // Visible 0 - 50.
        if (sliderPos > 50) {
             opacity = 0;
        } else {
             // 0 -> 50 Fade out? Or just stay visible?
             // Ref: 98 -> 173 (Low half) -> 0 to 1.
             // So at 50 (Mid) it is 0. At 0 (Low) it is 1.
             opacity = 1 - (sliderPos / 50);
        }
        return { opacity, position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)' };
    };

    const getSunStyle = () => {
        let opacity = 1;
        // Visible 50 - 100.
        if (sliderPos < 50) {
            opacity = 0;
        } else {
            // 50 -> 100 Fade in.
            // At 50 (Mid) it is 0. At 100 (High) it is 1.
            opacity = (sliderPos - 50) / 50;
        }
        return { opacity, position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)' };
    };

    return (
        <div className="slider-wrapper">
            <div
                className="light-control-slider"
                ref={sliderRef}
                onPointerDown={handlePointerDown}
                onPointerMove={handlePointerMove}
                onPointerUp={handlePointerUp}
            >
                {/* Frames */}
                {/* Up = Bright (100). Down = Dark (0). */}
                
                {/* Dark Frame (Empty) - Attached Top */}
                <div
                    className="slider-frame-top" 
                    style={{ 
                        top: 0,
                        bottom: 'auto',
                        height: `${100 - sliderPos}%` 
                    }}
                />

                {/* White Frame (Fill) - Attached Bottom */}
                <div
                    className="slider-frame-bottom"
                    style={{ 
                        top: 'auto',
                        bottom: 0,
                        height: `${sliderPos}%` 
                    }}
                />

                {/* Handle contains Icons now */}
                <div
                    className="slider-handle-container"
                    style={{
                        // Handle moves 0% (Bottom) to 100% (Top).
                        top: `calc(${100 - sliderPos}% - 2.5px)` 
                    }}
                >
                    <SliderHandle />
                    
                    {/* Icons move with Handle */}
                    <div className="slider-icon top" style={getSunStyle()}>
                        <SunIcon />
                    </div>
                    <div className="slider-icon bottom" style={getMoonStyle()}>
                        <MoonIcon />
                    </div>
                </div>
            </div>

            <div className="slider-value">
                {displayValue}%
            </div>
        </div>
    );
};

export default LightControlSlider;
