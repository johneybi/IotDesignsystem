import React, { useState, useRef } from 'react';
import './DualControlSlider.css';

const MoonIcon = () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
);

const SunIcon = () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="12" cy="12" r="5" stroke="currentColor" strokeWidth="2" />
        <path d="M12 1V3" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
        <path d="M12 21V23" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
        <path d="M4.22 4.22L5.64 5.64" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
        <path d="M18.36 18.36L19.78 19.78" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
        <path d="M1 12H3" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
        <path d="M21 12H23" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
        <path d="M4.22 19.78L5.64 18.36" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
        <path d="M18.36 5.64L19.78 4.22" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </svg>
);

const DualControlSlider = () => {
    // leftPos: 0 to 50
    // rightPos: 50 to 100

    const [leftPos, setLeftPos] = useState(25);
    const [rightPos, setRightPos] = useState(75);

    const sliderRef = useRef(null);
    const draggingRef = useRef(null);

    const handlePointerDown = (e, handle) => {
        draggingRef.current = handle;
        e.currentTarget.setPointerCapture(e.pointerId);
        e.stopPropagation();
    };

    const handlePointerMove = (e) => {
        if (!draggingRef.current || !sliderRef.current) return;

        const rect = sliderRef.current.getBoundingClientRect();
        const width = rect.width;
        const left = rect.left;

        let percentage = ((e.clientX - left) / width) * 100;

        if (draggingRef.current === 'left') {
            if (percentage < 0) percentage = 0;
            if (percentage > 50) percentage = 50;
            setLeftPos(percentage);
        } else if (draggingRef.current === 'right') {
            if (percentage < 50) percentage = 50;
            if (percentage > 100) percentage = 100;
            setRightPos(percentage);
        }
    };

    const handlePointerUp = (e) => {
        draggingRef.current = null;
    };

    const GAP = 4;

    // Handle Positioning with Clamping for Visibility
    // Left Handle: max left is 0px (so it stays visible inside).
    // Right Limit: center - gap.
    const leftHandleStyle = {
        left: `max(0px, min(calc(${leftPos}% - 5px), calc(50% - 5px - ${GAP}px)))`
    };

    // Right Handle: max right is 100% - 5px.
    // Left Limit: center + gap.
    const rightHandleStyle = {
        left: `min(calc(100% - 5px), max(${rightPos}%, calc(50% + ${GAP}px)))`
    };

    // --- Icon Styles (Min Opacity 0.2) ---
    const MIN_OPACITY = 0.2;
    const lerpOpacity = (ratio) => MIN_OPACITY + (1 - MIN_OPACITY) * ratio;

    // Left Moon:
    // Visible at Edge (0), Faded at Center (50).
    const leftRatio = (50 - leftPos) / 50; // 1 at 0, 0 at 50
    const leftMoonOpacity = lerpOpacity(leftRatio);
    const leftMoonStyle = { opacity: leftMoonOpacity };

    // Right Moon:
    // Visible at Edge (100), Faded at Center (50).
    const rightRatio = (rightPos - 50) / 50; // 1 at 100, 0 at 50
    const rightMoonOpacity = lerpOpacity(rightRatio);
    const rightMoonStyle = { opacity: rightMoonOpacity };

    // Center Sun:
    // Visible at Center, Faded at Edges.
    // Total Distance from Center (0 to 100)
    const totalDist = (50 - leftPos) + (rightPos - 50);
    const sunRatio = 1 - (totalDist / 100); // 1 at Center, 0 at Extremes
    const sunOpacity = lerpOpacity(sunRatio);
    const sunStyle = { opacity: sunOpacity };

    return (
        <div className="dual-slider-wrapper">
            <div
                className="dual-control-slider"
                ref={sliderRef}
                onPointerMove={handlePointerMove}
                onPointerUp={handlePointerUp}
                onPointerLeave={handlePointerUp}
            >
                {/* Frames */}
                <div
                    className="dual-frame-left"
                    style={{ width: `${leftPos}%` }}
                ></div>

                <div
                    className="dual-frame-right"
                    style={{
                        left: `${rightPos}%`,
                        width: `${100 - rightPos}%`
                    }}
                ></div>

                {/* Icons */}
                <div className="dual-icon left" style={leftMoonStyle}>
                    <MoonIcon />
                </div>

                <div className="dual-icon center" style={sunStyle}>
                    <SunIcon />
                </div>

                <div className="dual-icon right" style={rightMoonStyle}>
                    <MoonIcon />
                </div>

                {/* Handles */}
                <div
                    className="dual-handle-container"
                    style={leftHandleStyle}
                    onPointerDown={(e) => handlePointerDown(e, 'left')}
                >
                    <div className="dual-handle"></div>
                </div>

                <div
                    className="dual-handle-container"
                    style={rightHandleStyle}
                    onPointerDown={(e) => handlePointerDown(e, 'right')}
                >
                    <div className="dual-handle"></div>
                </div>
            </div>

            {/* Value Display */}
            <div className="dual-values">
                <span>Left: {Math.round(leftPos)}%</span>
                <span>Right: {Math.round(rightPos)}%</span>
            </div>
        </div>
    );
};

export default DualControlSlider;
