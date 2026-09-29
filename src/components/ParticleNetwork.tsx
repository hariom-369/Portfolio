import { useEffect, useRef } from 'react';

export default function ParticleNetwork() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let particles: Particle[] = [];
    
    // Mouse position
    const mouse = {
      x: -1000,
      y: -1000,
      radius: 180
    };

    const handleMouseMove = (e: MouseEvent) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
    };
    
    const handleMouseLeave = () => {
      mouse.x = -1000;
      mouse.y = -1000;
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseleave', handleMouseLeave);

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      initParticles();
    };

    window.addEventListener('resize', resize);

    class Particle {
      x: number;
      y: number;
      size: number;
      speedX: number;
      speedY: number;
      color: string;
      baseAlpha: number;

      constructor(canvasWidth: number, canvasHeight: number) {
        this.x = Math.random() * canvasWidth;
        this.y = Math.random() * canvasHeight;
        this.size = Math.random() * 2.5 + 0.5;
        // Slower, elegant movement
        this.speedX = (Math.random() - 0.5) * 0.6;
        this.speedY = (Math.random() - 0.5) * 0.6;
        
        // Randomly assign cyan or indigo color
        const isCyan = Math.random() > 0.5;
        this.baseAlpha = Math.random() * 0.5 + 0.2;
        this.color = isCyan ? `rgba(34, 211, 238, ${this.baseAlpha})` : `rgba(99, 102, 241, ${this.baseAlpha})`;
      }

      update(canvasWidth: number, canvasHeight: number) {
        this.x += this.speedX;
        this.y += this.speedY;

        // Wrap around edges smoothly
        if (this.x > canvasWidth) this.x = 0;
        else if (this.x < 0) this.x = canvasWidth;
        
        if (this.y > canvasHeight) this.y = 0;
        else if (this.y < 0) this.y = canvasHeight;
      }

      draw(context: CanvasRenderingContext2D) {
        context.beginPath();
        context.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        context.fillStyle = this.color;
        context.fill();
        
        // Subtle glow for dots
        context.shadowBlur = 8;
        context.shadowColor = this.color;
      }
    }

    const initParticles = () => {
      const currentCanvas = canvasRef.current;
      if (!currentCanvas) return;
      particles = [];
      // Adjust density for performance and aesthetics (max 120 particles)
      const numberOfParticles = Math.min(Math.floor((currentCanvas.width * currentCanvas.height) / 10000), 120);
      for (let i = 0; i < numberOfParticles; i++) {
        particles.push(new Particle(currentCanvas.width, currentCanvas.height));
      }
    };

    const connect = (context: CanvasRenderingContext2D) => {
      // Reset shadow for lines to avoid performance hit
      context.shadowBlur = 0;
      
      for (let a = 0; a < particles.length; a++) {
        for (let b = a; b < particles.length; b++) {
          const dx = particles[a].x - particles[b].x;
          const dy = particles[a].y - particles[b].y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < 130) {
            const opacity = 1 - (distance / 130);
            context.strokeStyle = `rgba(99, 102, 241, ${opacity * 0.25})`;
            context.lineWidth = 0.8;
            context.beginPath();
            context.moveTo(particles[a].x, particles[a].y);
            context.lineTo(particles[b].x, particles[b].y);
            context.stroke();
          }
        }
        
        // Connect to mouse with stronger cyan glow
        const dxMouse = particles[a].x - mouse.x;
        const dyMouse = particles[a].y - mouse.y;
        const distanceMouse = Math.sqrt(dxMouse * dxMouse + dyMouse * dyMouse);
        
        if (distanceMouse < mouse.radius) {
          const opacity = 1 - (distanceMouse / mouse.radius);
          context.strokeStyle = `rgba(34, 211, 238, ${opacity * 0.5})`;
          context.lineWidth = 1.2;
          context.beginPath();
          context.moveTo(particles[a].x, particles[a].y);
          context.lineTo(mouse.x, mouse.y);
          context.stroke();
        }
      }
    };

    const animate = () => {
      const currentCanvas = canvasRef.current;
      if (!currentCanvas) return;
      const context = currentCanvas.getContext('2d');
      if (!context) return;

      context.clearRect(0, 0, currentCanvas.width, currentCanvas.height);
      
      for (let i = 0; i < particles.length; i++) {
        particles[i].update(currentCanvas.width, currentCanvas.height);
        particles[i].draw(context);
      }
      
      connect(context);
      
      animationFrameId = requestAnimationFrame(animate);
    };

    resize();
    animate();

    return () => {
      window.removeEventListener('resize', resize);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseleave', handleMouseLeave);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <>
      <canvas
        ref={canvasRef}
        className="particle-network"
        aria-hidden="true"
      />
      <style>{`
        .particle-network {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          z-index: 1; /* Sits above CursorGlow but below content */
          pointer-events: none;
          opacity: 0.8;
          mix-blend-mode: screen;
        }

        @media (max-width: 768px) {
          .particle-network {
            opacity: 0.4; /* Softer on mobile */
          }
        }
      `}</style>
    </>
  );
}
