import React, { useEffect, useRef } from 'react';

export const AnimatedBackgroundCanvas: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;

    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    handleResize();
    window.addEventListener('resize', handleResize);

    // Particle nodes for neural net & floating medical particles
    const particleCount = 45;
    const particles: { x: number; y: number; vx: number; vy: number; radius: number; alpha: number }[] = [];

    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.6,
        vy: (Math.random() - 0.5) * 0.6,
        radius: Math.random() * 2.5 + 1,
        alpha: Math.random() * 0.5 + 0.3
      });
    }

    let tick = 0;

    const render = () => {
      tick += 0.02;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const width = canvas.width;
      const height = canvas.height;

      // 1. Draw Floating Neural Network Connections
      ctx.lineWidth = 1;
      for (let i = 0; i < particleCount; i++) {
        const p1 = particles[i];
        p1.x += p1.vx;
        p1.y += p1.vy;

        if (p1.x < 0 || p1.x > width) p1.vx *= -1;
        if (p1.y < 0 || p1.y > height) p1.vy *= -1;

        // Draw particle
        ctx.fillStyle = `rgba(20, 184, 166, ${p1.alpha})`;
        ctx.beginPath();
        ctx.arc(p1.x, p1.y, p1.radius, 0, Math.PI * 2);
        ctx.fill();

        // Connect nearby particles
        for (let j = i + 1; j < particleCount; j++) {
          const p2 = particles[j];
          const dist = Math.hypot(p1.x - p2.x, p1.y - p2.y);
          if (dist < 130) {
            ctx.strokeStyle = `rgba(37, 99, 235, ${0.25 * (1 - dist / 130)})`;
            ctx.beginPath();
            ctx.moveTo(p1.x, p1.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.stroke();
          }
        }
      }

      // 2. Draw Floating DNA Helix Wave on Right Side
      const helixCenterX = width * 0.25;
      const helixYStart = 100;
      const helixHeight = height - 200;
      const strandCount = 20;

      for (let i = 0; i < strandCount; i++) {
        const y = helixYStart + (i / strandCount) * helixHeight;
        const phase = tick + i * 0.3;
        const x1 = helixCenterX + Math.sin(phase) * 60;
        const x2 = helixCenterX - Math.sin(phase) * 60;

        // Base pair connecting line
        ctx.strokeStyle = `rgba(20, 184, 166, ${0.15 + Math.cos(phase) * 0.1})`;
        ctx.beginPath();
        ctx.moveTo(x1, y);
        ctx.lineTo(x2, y);
        ctx.stroke();

        // Node 1 (Strand A)
        ctx.fillStyle = '#2563eb';
        ctx.beginPath();
        ctx.arc(x1, y, 3, 0, Math.PI * 2);
        ctx.fill();

        // Node 2 (Strand B)
        ctx.fillStyle = '#14b8a6';
        ctx.beginPath();
        ctx.arc(x2, y, 3, 0, Math.PI * 2);
        ctx.fill();
      }

      // 3. Draw Background ECG Heartbeat Line Trace
      const ecgY = height * 0.85;
      ctx.beginPath();
      ctx.strokeStyle = 'rgba(37, 99, 235, 0.2)';
      ctx.lineWidth = 2;

      for (let x = 0; x < width; x += 3) {
        let y = ecgY;
        const cycle = (x + tick * 80) % 300;
        if (cycle > 140 && cycle < 150) y = ecgY - 25;
        else if (cycle >= 150 && cycle < 160) y = ecgY + 35;
        else if (cycle >= 160 && cycle < 170) y = ecgY - 60;
        else if (cycle >= 170 && cycle < 180) y = ecgY + 15;

        if (x === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      }
      ctx.stroke();

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none z-0"
    />
  );
};
