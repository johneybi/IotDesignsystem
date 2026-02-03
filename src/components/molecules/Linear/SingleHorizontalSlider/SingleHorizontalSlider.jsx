import React, { useState, useRef, useEffect } from 'react';
import { motion, useMotionValue, useTransform } from 'framer-motion';
import './SingleHorizontalSlider.css';

const SunIcon = ({ color }) => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="12" cy="12" r="5" stroke={color} strokeWidth="2" />
        <path d="M12 1V3" stroke={color} strokeWidth="2" strokeLinecap="round" />
        <path d="M12 21V23" stroke={color} strokeWidth="2" strokeLinecap="round" />
        <path d="M4.22 4.22L5.64 5.64" stroke={color} strokeWidth="2" strokeLinecap="round" />
        <path d="M18.36 18.36L19.78 19.78" stroke={color} strokeWidth="2" strokeLinecap="round" />
        <path d="M1 12H3" stroke={color} strokeWidth="2" strokeLinecap="round" />
        <path d="M21 12H23" stroke={color} strokeWidth="2" strokeLinecap="round" />
        <path d="M4.22 19.78L5.64 18.36" stroke={color} strokeWidth="2" strokeLinecap="round" />
        <path d="M18.36 5.64L19.78 4.22" stroke={color} strokeWidth="2" strokeLinecap="round" />
    </svg>
);

const MoonIcon = ({ color }) => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79Z" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
);

const SingleHorizontalSlider = () => {
    const [value, setValue] = useState(0);
    const sliderRef = useRef(null);
    const dragging = useRef(false);

    // --- MOON (Right Icon) ---
    // Max -> Mid: Center -> Right.
    // Use Percentage ranges for transforms to be responsive.
    // X is 0 to 100%.
    // sunCenterOffset = 100px? This works for 272px width.
    // If width is dynamic, offsets should be dynamic.
    // But we are using `x` which WAS pixels.
    // We switched CSS to responsive width, so `maxDrag` must be calculated on measure.
    // However, JS still has `const sliderWidth = 272;`.
    // I need to use `sliderRef` to get width on mount/resize.
    
    // For now, to solve immediate token refactor request and simple responsiveness:
    // I will use % for X.

    const x = useMotionValue(0); 
    const [sliderWidth, setSliderWidth] = useState(272);
    
    useEffect(() => {
        if(sliderRef.current) {
            setSliderWidth(sliderRef.current.offsetWidth);
        }
        // Resize observer could be added here for full robustness
    }, []);

    const handleWidth = 5;
    const maxDrag = sliderWidth - handleWidth;
    
    const returnThreshold = maxDrag * 0.2; 
    
    const fillWidth = useTransform(x, (v) => v + 4);

    const sunX = useTransform(x, [0, returnThreshold], [maxDrag/2 - 24, 0]);
    const sunOpacity = useTransform(x, [maxDrag - returnThreshold, maxDrag], [1, 0]);
    const sunColor = useTransform(x, [0, returnThreshold], ["#515151", "#FFFFFF"]);

    const moonX = useTransform(x, [maxDrag - returnThreshold, maxDrag], [0, -(maxDrag/2 - 24)]);
    const moonOpacity = useTransform(x, [0, returnThreshold], [0, 1]);
    const moonColor = useTransform(x, [maxDrag - returnThreshold, maxDrag], ["#515151", "#FFFFFF"]);

    const DynamicSun = () => <SunIcon color="currentColor" />;
    const DynamicMoon = () => <MoonIcon color="currentColor" />;

    const handlePointerDown = (e) => {
        dragging.current = true;
        e.currentTarget.setPointerCapture(e.pointerId);
        updatePosition(e);
    };

    const handlePointerMove = (e) => {
        if (!dragging.current) return;
        updatePosition(e);
    };

    const handlePointerUp = (e) => {
        dragging.current = false;
    };

    const updatePosition = (e) => {
        if (!sliderRef.current) return;
        const rect = sliderRef.current.getBoundingClientRect();
        let newX = e.clientX - rect.left;

        if (newX < 0) newX = 0;
        if (newX > maxDrag) newX = maxDrag;

        x.set(newX);
        const pct = Math.round((newX / maxDrag) * 100);
        setValue(pct);
    };

    return (
        <div className="single-slider-wrapper">
            <div
                className="single-horizontal-slider"
                ref={sliderRef}
                onPointerDown={handlePointerDown}
                onPointerMove={handlePointerMove}
                onPointerUp={handlePointerUp}
                onPointerLeave={handlePointerUp}
            >
                {/* 
                   Fill Area 
                   Using fillWidth (x + 4) to tuck under handle
                */}
                <motion.div
                    className="single-slider-fill"
                    style={{ width: fillWidth }}
                />

                {/* Sun Icon (Left) */}
                <motion.div
                    className="single-icon left"
                    style={{ x: sunX, opacity: sunOpacity, color: sunColor }}
                >
                    <DynamicSun />
                </motion.div>

                {/* Moon Icon (Right) */}
                <motion.div
                    className="single-icon right"
                    style={{ x: moonX, opacity: moonOpacity, color: moonColor }}
                >
                    <DynamicMoon />
                </motion.div>

                {/* Handle */}
                <motion.div
                    className="single-handle-container"
                    style={{ x: x }}
                >
                    <div className="single-handle"></div>
                </motion.div>
            </div>

            <div className="dual-values">
                <span>Value: {value}%</span>
            </div>
        </div>
    );
};

export default SingleHorizontalSlider;
