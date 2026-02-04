import React, { useEffect, useRef, useState } from 'react';
import { motion, useMotionValue, useTransform, useMotionTemplate } from 'framer-motion';
import SliderThumb from '../../../atoms/SliderThumb/SliderThumb';
import { Moon, Sun } from 'lucide-react';
import './AdaptiveLightSliderNew.css';

export default function AdaptiveLightSlider() {
    const constraintsRef = useRef(null);

    // Container dimensions
    // Height: 272px
    // Knob: 81px
    // Drag range: 272 - 81 = 191px roughly.
    // Top (High Intensity): Y = 23px
    // Bottom (Low Intensity): Y = 173px
    const y = useMotionValue(173); // Start at bottom (Low/Off)

    const inputY = [23, 173];
    
    // Background Color
    // Transitions from Deep Dark Navy (Off) to Bright Warm Light (On/Max).
    // Added intermediate point at 170 (~2% on) to make it "slightly brighter" immediately when turned on.
    const bgColor = useTransform(y, [23, 170, 173], [
        "rgb(255, 245, 225)", // High: Bright Warm Ivory
        "rgb(80, 80, 110)",   // Just On: Much brighter visual feedback (Grey-Blue)
        "rgb(20, 20, 35)"     // Off: Deep Dark
    ]);
    
    // Glow Opacity Logic
    // 173 = Off (0%)
    // 170~172 = Just On (1%+)
    // We want a sharp jump.
    const glowOpacity = useTransform(y, [23, 165, 172, 173], [1, 0.8, 0.5, 0]);

    // Icon Opacity
    // Moon visible only at very bottom (effectively off)
    const moonOpacity = useTransform(y, [170, 173], [0, 1]); 
    // Sun visible as soon as we leave bottom
    const sunOpacity = useTransform(y, [170, 173], [1, 0]);
    
    const sliderRef = useRef(null);
    const isDragging = useRef(false);
    const startY = useRef(0);
    const startYValue = useRef(0);

    const handlePointerDown = (e) => {
        isDragging.current = true;
        startY.current = e.clientY;
        startYValue.current = y.get();
        e.currentTarget.setPointerCapture(e.pointerId);
    };

    const handlePointerMove = (e) => {
        if (!isDragging.current) return;
        const deltaY = e.clientY - startY.current;
        const newY = startYValue.current + deltaY;
        // Clamp: Top 23, Bottom 173
        const clampedY = Math.min(Math.max(newY, 23), 173);
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
                background: bgColor,
                cursor: 'grab',
                touchAction: 'none'
            }}
            onPointerDown={handlePointerDown}
            onPointerMove={handlePointerMove}
            onPointerUp={handlePointerUp}
        >
            {/* Glow Effect Layer */}
            <motion.div 
                className="adaptive-slider-glow"
                style={{ opacity: glowOpacity }}
            />

            <div ref={constraintsRef} className="adaptive-slider-constraints" />

            <motion.div
                style={{ y, x: "-50%" }}
                className="adaptive-slider-knob-wrapper-v2" 
            >
                <SliderThumb className="adaptive-slider-thumb-v2">
                    <div className="adaptive-slider-icon-wrapper">
                        {/* Sun Icon */}
                        <motion.div 
                            style={{ opacity: sunOpacity, position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                        >
                            <Sun size={24} color="#333" strokeWidth={2.5} /> 
                        </motion.div>
                        
                        {/* Moon Icon */}
                        <motion.div 
                            style={{ opacity: moonOpacity, position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                        >
                             <Moon size={24} color="#666" strokeWidth={2} />
                        </motion.div>
                    </div>
                </SliderThumb>
            </motion.div>
        </motion.div>
    );
}
