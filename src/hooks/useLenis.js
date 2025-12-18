import { useEffect, useRef } from 'react';
import Lenis from '@studio-freight/lenis';

/**
 * React hook for Lenis smooth scrolling
 * Lenis is a lightweight, robust, and performant smooth scroll library
 * Used by award-winning websites like Awwwards winners
 * 
 * @param {Object} options - Lenis configuration options
 * @param {number} options.duration - Animation duration. Default: 1.2
 * @param {string} options.easing - Easing function. Default: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t))
 * @param {string} options.direction - Scroll direction: 'vertical' or 'horizontal'. Default: 'vertical'
 * @param {boolean} options.gestureDirection - Gesture direction: 'vertical' or 'horizontal'. Default: 'vertical'
 * @param {boolean} options.smooth - Enable smooth scrolling. Default: true
 * @param {number} options.smoothTouch - Enable smooth scrolling on touch devices. Default: false
 * @param {number} options.touchMultiplier - Touch scroll multiplier. Default: 2
 * @param {number} options.wheelMultiplier - Wheel scroll multiplier. Default: 1
 * @param {boolean} options.infinite - Enable infinite scroll. Default: false
 */
export const useLenis = (options = {}) => {
    const lenisRef = useRef(null);
    const rafRef = useRef(null);

    useEffect(() => {
        // Initialize Lenis
        const lenis = new Lenis({
            duration: options.duration || 1.2,
            easing: options.easing || ((t) => Math.min(1, 1.001 - Math.pow(2, -10 * t))),
            direction: options.direction || 'vertical',
            gestureDirection: options.gestureDirection || 'vertical',
            smooth: options.smooth !== undefined ? options.smooth : true,
            smoothTouch: options.smoothTouch || false,
            touchMultiplier: options.touchMultiplier || 2,
            wheelMultiplier: options.wheelMultiplier || 1,
            infinite: options.infinite || false,
        });

        lenisRef.current = lenis;

        // Animation loop
        const raf = (time) => {
            lenis.raf(time);
            rafRef.current = requestAnimationFrame(raf);
        };

        rafRef.current = requestAnimationFrame(raf);

        // Cleanup
        return () => {
            if (rafRef.current) {
                cancelAnimationFrame(rafRef.current);
            }
            lenis.destroy();
        };
    }, [
        options.duration,
        options.easing,
        options.direction,
        options.gestureDirection,
        options.smooth,
        options.smoothTouch,
        options.touchMultiplier,
        options.wheelMultiplier,
        options.infinite,
    ]);

    return lenisRef.current;
};

export default useLenis;
