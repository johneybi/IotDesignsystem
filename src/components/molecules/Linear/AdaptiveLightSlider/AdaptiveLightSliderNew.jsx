import React, { useEffect, useRef, useState } from 'react';
import { motion, useMotionValue, useTransform, useMotionTemplate } from 'framer-motion';
import moonIcon from '../../../../assets/icon-moon.svg';
import sunIcon from '../../../../assets/icon-sun.svg';
import SliderThumb from '../../../atoms/SliderThumb/SliderThumb';
import './AdaptiveLightSliderNew.css';

export default function AdaptiveLightSlider() {
    console.log("DEBUG: AdaptiveLightSlider Rendered (V3 - Highlight Removed)");
    const constraintsRef = useRef(null);

    // Container dimensions
    // Height: 272px
    // Knob: 81px
    // Drag range: 272 - 81 = 191px roughly, minus padding
    // Let's assume the draggable area is the full height minus the knob height.

    // Motion value for Y position
    // Figma Coordinates:
    // Top (High Intensity): Y = 23px
    // Bottom (Low Intensity): Y = 173px
    const y = useMotionValue(173); // Start at bottom (Low)

    // Input range for transforms
    // Top (23) -> Mid (98) -> Bottom (173)
    const inputY = [23, 98, 173];

    // Background Gradients/Colors
    // Top: Bright/High (Ivory/Yellow)
    // Mid: Warm (Beige/Brown)
    // Bottom: Low (Dark Navy/Purple)

    // We'll interpolate the background color/gradient. 
    // Since CSS gradients are complex to interpolate directly with basic colors, 
    // we can interpolate the primary background color and use an overlay or straightforward hex interpolation.
    // The user requested:
    // Low: Dark Navy/Purple
    // Mid: Warm Brown/Beige
    // High: Bright Ivory/Yellow

    // Colors for Gradient Interpolation
    // Top Color
    const topColor = useTransform(y, inputY, [
        "rgba(255, 253, 220, 1)", // High: Bright Ivory
        "rgba(210, 190, 160, 1)", // Mid: Warm Beige
        "rgba(10, 10, 50, 1)"     // Low: Dark Navy
    ]);

    // Bottom Color
    const bottomColor = useTransform(y, inputY, [
        "rgba(255, 215, 100, 1)", // High: Yellow/Gold
        "rgba(180, 140, 100, 1)", // Mid: Brownish
        "rgba(30, 30, 80, 1)"     // Low: Lighter Navy/Purple
    ]);

    const background = useMotionTemplate`linear-gradient(to bottom, ${topColor}, ${bottomColor})`;

    // Gradient Overlay opacity or specific gradient stops could be cleaner, 
    // but let's try a direct background approach or a pseudo-element.
    // For better visual "Gaze" effect, we can layer gradients. 
    // But let's stick to the user's color request primarily.

    // Icon Opacity / Transformation
    const moonOpacity = useTransform(y, [98, 173], [0, 1]);
    const sunOpacity = useTransform(y, [23, 98], [1, 0]);

    // Knob Shadow - Constant based on Figma
    // shadow-[0px_32.4px_32.4px_0px_rgba(0,0,0,0.25)]


    // Drag Logic using Pointer Events (Relative Drag)
    // Replaces Framer Motion's drag="y" to allow dragging from anywhere in the container.
    
    const sliderRef = useRef(null);
    const isDragging = useRef(false);
    const startY = useRef(0);
    const startYValue = useRef(0);

    const handlePointerDown = (e) => {
        isDragging.current = true;
        startY.current = e.clientY;
        startYValue.current = y.get();
        
        // Capture pointer to ensure we receive move events even if cursor leaves container
        e.currentTarget.setPointerCapture(e.pointerId);
    };

    const handlePointerMove = (e) => {
        if (!isDragging.current) return;

        const deltaY = e.clientY - startY.current;
        const newY = startYValue.current + deltaY;

        // Clamp values to constraints [23, 173]
        let clampedY = newY;
        if (clampedY < 23) clampedY = 23;
        if (clampedY > 173) clampedY = 173;

        y.set(clampedY);
    };

    const handlePointerUp = (e) => {
        isDragging.current = false;
        e.currentTarget.releasePointerCapture(e.pointerId);
    };

    return (
        <motion.div
            className="adaptive-slider-container"
            ref={sliderRef}
            style={{
                background: background,
                cursor: 'grab',
                touchAction: 'none' // Important for preventing scroll while dragging
            }}
            onPointerDown={handlePointerDown}
            onPointerMove={handlePointerMove}
            onPointerUp={handlePointerUp}
        >
            {/* Constraints Container - Visual Helper or Layout guide, can remain */}
            <div
                ref={constraintsRef}
                className="adaptive-slider-constraints"
            />

            <motion.div
                // Removed drag="y" and dragConstraints related props
                // Position is now controlled solely by 'y' motion value updated via pointer events
                style={{ y, x: "-50%" }}
                className="adaptive-slider-knob-wrapper-v2" 
            >
                {/* 
                    Using SliderThumb as the visual knob. 
                    We pass the custom class 'adaptive-slider-thumb' to override default atom styles (size, gradient).
                */}
                <SliderThumb className="adaptive-slider-thumb-v2">


                    {/* Icons */}
                    <div className="adaptive-slider-icon-wrapper">
                        <motion.img
                            src={sunIcon}
                            className="adaptive-slider-icon"
                            name="sun"
                            draggable="false"
                            onDragStart={(e) => e.preventDefault()}
                            style={{ 
                                opacity: sunOpacity, 
                                pointerEvents: 'none', 
                                userSelect: 'none', 
                                WebkitUserDrag: 'none' 
                            }}
                            alt="Sun"
                        />
                        <motion.img
                            src={moonIcon}
                            className="adaptive-slider-icon"
                            name="moon"
                            draggable="false"
                            onDragStart={(e) => e.preventDefault()}
                            style={{ 
                                opacity: moonOpacity, 
                                pointerEvents: 'none', 
                                userSelect: 'none', 
                                WebkitUserDrag: 'none' 
                            }}
                            alt="Moon"
                        />
                    </div>
                </SliderThumb>
            </motion.div>
        </motion.div>
    );
}
