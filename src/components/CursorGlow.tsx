import { useEffect, useState, useRef } from 'react';

export default function CursorGlow() {
  const [position, setPosition] = useState({ x: -1000, y: -1000 });
  const [isVisible, setIsVisible] = useState(false);
  const requestRef = useRef<number>();
  const targetPos = useRef({ x: -1000, y: -1000 });

  useEffect(() => {
    // Ignore on touch devices
    if (window.matchMedia('(hover: none) and (pointer: coarse)').matches) return;

    const handleMouseMove = (e: MouseEvent) => {
      targetPos.current = { x: e.clientX, y: e.clientY };
      if (!isVisible) setIsVisible(true);
    };

    const handleMouseLeave = () => {
      setIsVisible(false);
    };

    const animate = () => {
      setPosition((prev) => {
        // Easing factor determines the "drag" or "lag" of the glow (0.1 = smooth, 1.0 = instant)
        const easing = 0.15;
        const dx = targetPos.current.x - prev.x;
        const dy = targetPos.current.y - prev.y;
        
        if (Math.abs(dx) > 0.1 || Math.abs(dy) > 0.1) {
          return {
            x: prev.x + dx * easing,
            y: prev.y + dy * easing
          };
        }
        return prev;
      });
      requestRef.current = requestAnimationFrame(animate);
    };

    window.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseleave', handleMouseLeave);
    requestRef.current = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
      if (requestRef.current) cancelAnimationFrame(requestRef.current);
    };
  }, [isVisible]);

  return (
    <>
      <div 
        className={`cursor-glow ${isVisible ? 'visible' : ''}`}
        style={{
          transform: `translate(${position.x}px, ${position.y}px)`
        }}
        aria-hidden="true"
      />
      
      <style>{`
        .cursor-glow {
          position: fixed;
          /* Offset by half width/height so the cursor is exactly in the center */
          top: -300px;
          left: -300px;
          width: 600px;
          height: 600px;
          background: radial-gradient(
            circle,
            rgba(99, 102, 241, 0.12) 0%,
            rgba(16, 185, 129, 0.05) 30%,
            rgba(34, 211, 238, 0.02) 50%,
            transparent 70%
          );
          border-radius: 50%;
          pointer-events: none;
          z-index: 0;
          opacity: 0;
          transition: opacity 0.5s ease;
          will-change: transform;
          filter: blur(50px);
        }
        
        .cursor-glow.visible {
          opacity: 1;
        }

        /* Hide entirely on tablets and mobile devices */
        @media (max-width: 1024px) {
          .cursor-glow {
            display: none !important;
          }
        }
      `}</style>
    </>
  );
}
