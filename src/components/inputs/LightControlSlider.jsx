import React, { useState, useRef } from 'react';
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

        // Position 0% (Top) to 100% (Bottom)
        const percentage = Math.round((relativeY / height) * 100);
        setSliderPos(percentage);
    };

    // Logic per User Request:
    // 0% (Top) = Dark. 
    // 100% (Bottom) = Bright.
    const displayValue = sliderPos;

    // Icon Animations
    // Center Top Offset = 124px
    // Default Padding = 24px

    // Moon (Top Icon) Logic:
    // At 0% (Dark/Top): Opacity 0 (Disappears).
    // At 100% (Bright/Bottom): Centered (Suggests darkening).

    const getMoonStyle = () => {
        let top = '24px';
        let opacity = 1;

        if (sliderPos <= 50) {
            // 0 to 50: Moon fades IN. Position Fixed at 24px.
            // At 0: Opacity 0.
            // At 50: Opacity 1.
            opacity = sliderPos / 50;
            top = '24px';
        } else {
            // 50 to 100: Moon moves DOWN to Center. Opacity 1.
            // At 50: Top 24px.
            // At 100: Top 124px.
            const ratio = (sliderPos - 50) / 50;
            const px = 24 + (100 * ratio); // 24 + 100 = 124
            top = `${px}px`;
            opacity = 1;
        }
        return { top, opacity };
    };

    // Sun (Bottom Icon) Logic:
    // At 0% (Dark/Top): Centered (Suggests brightening). 
    // At 100% (Bright/Bottom): Opacity 0 (Disappears).

    const getSunStyle = () => {
        let bottom = '24px';
        let opacity = 1;

        if (sliderPos <= 50) {
            // 0 to 50: Sun moves DOWN from Center to Bottom. Opacity 1.
            // At 0: Bottom 124px.
            // At 50: Bottom 24px.
            // ratio: increases as sliderPos increases
            const ratio = sliderPos / 50; // 0 -> 1
            // We want 124 -> 24.
            // 124 - (100 * ratio)
            const px = 124 - (100 * ratio);
            bottom = `${px}px`;
            opacity = 1;
        } else {
            // 50 to 100: Sun is at Bottom. Fades OUT.
            // At 50: Opacity 1.
            // At 100: Opacity 0.
            const ratio = (sliderPos - 50) / 50; // 0 -> 1
            opacity = 1 - ratio;
            bottom = '24px';
        }
        return { bottom, opacity };
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
                <div
                    className="slider-frame-top"
                    style={{ height: `${sliderPos}%` }}
                />

                <div
                    className="slider-frame-bottom"
                    style={{ height: `${100 - sliderPos}%` }}
                />

                {/* Icons */}
                <div className="slider-icon top" style={getMoonStyle()}>
                    <MoonIcon />
                </div>
                <div className="slider-icon bottom" style={getSunStyle()}>
                    <SunIcon />
                </div>

                {/* Handle */}
                <div
                    className="slider-handle-container"
                    style={{
                        top: `calc(${sliderPos}% - 2.5px)`
                    }}
                >
                    <div className="slider-handle"></div>
                </div>

            </div>

            <div className="slider-value">
                {displayValue}%
            </div>
        </div>
    );
};

export default LightControlSlider;
