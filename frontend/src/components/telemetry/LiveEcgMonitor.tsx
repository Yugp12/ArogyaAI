import React, { useEffect, useRef, useState } from 'react';
import { Activity, Heart, Wind, Gauge } from 'lucide-react';

interface LiveEcgMonitorProps {
  patientName?: string;
  heartRate?: number;
  spO2?: number;
  bp?: string;
}

export const LiveEcgMonitor: React.FC<LiveEcgMonitorProps> = ({
  patientName = 'Rajesh Kumar (PT-9941)',
  heartRate = 128,
  spO2 = 82,
  bp = '165/102',
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [pulseBeating, setPulseBeating] = useState(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let x = 0;
    const height = canvas.height;
    const width = canvas.width;

    const step = 2;
    const gridSpacing = 20;

    const points: number[] = new Array(width).fill(height / 2);

    const drawGrid = () => {
      ctx.strokeStyle = 'rgba(20, 184, 166, 0.08)';
      ctx.lineWidth = 1;

      for (let gx = 0; gx < width; gx += gridSpacing) {
        ctx.beginPath();
        ctx.moveTo(gx, 0);
        ctx.lineTo(gx, height);
        ctx.stroke();
      }

      for (let gy = 0; gy < height; gy += gridSpacing) {
        ctx.beginPath();
        ctx.moveTo(0, gy);
        ctx.lineTo(width, gy);
        ctx.stroke();
      }
    };

    let tick = 0;

    const render = () => {
      tick++;

      const cycle = tick % 60;
      let y = height / 2;

      if (cycle === 10) y = height / 2 - 8;
      else if (cycle === 12) y = height / 2;
      else if (cycle === 20) y = height / 2 + 6;
      else if (cycle === 22) {
        y = height / 2 - 45;
        setPulseBeating(true);
        setTimeout(() => setPulseBeating(false), 150);
      } else if (cycle === 24) y = height / 2 + 18;
      else if (cycle === 32) y = height / 2 - 14;
      else if (cycle === 36) y = height / 2;
      else y = height / 2 + (Math.sin(tick / 5) * 1.5);

      points[x] = y;

      ctx.clearRect(0, 0, width, height);

      drawGrid();

      ctx.beginPath();
      ctx.strokeStyle = '#14b8a6';
      ctx.lineWidth = 2;
      ctx.shadowColor = '#14b8a6';
      ctx.shadowBlur = 8;

      for (let i = 0; i < width; i++) {
        if (i === 0) {
          ctx.moveTo(i, points[i]);
        } else {
          ctx.lineTo(i, points[i]);
        }
      }
      ctx.stroke();
      ctx.shadowBlur = 0;

      ctx.fillStyle = '#2dd4bf';
      ctx.beginPath();
      ctx.arc(x, points[x], 4, 0, Math.PI * 2);
      ctx.fill();

      x = (x + step) % width;
      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <div className="rounded-2xl p-4 border border-slate-800 light:border-slate-200 bg-slate-950/90 light:bg-slate-900 text-white shadow-2xl overflow-hidden relative font-sans">
      <div className="flex items-center justify-between pb-3 border-b border-slate-800">
        <div className="flex items-center gap-2">
          <Activity className="w-5 h-5 text-teal-400 animate-pulse" />
          <span className="text-xs font-mono font-bold tracking-wider text-slate-300">
            TELE-ICU LEAD II TELEMETRY • {patientName}
          </span>
        </div>
        <div className="flex items-center gap-2">
          <span className="flex h-2 w-2 rounded-full bg-emerald-400 animate-ping" />
          <span className="text-[10px] font-mono font-bold text-emerald-400 uppercase tracking-widest">
            REAL-TIME STREAM
          </span>
        </div>
      </div>

      <div className="mt-3 grid grid-cols-1 lg:grid-cols-4 gap-4 items-center">
        <div className="lg:col-span-3 relative h-36 bg-slate-900/90 rounded-xl overflow-hidden border border-teal-500/20">
          <canvas
            ref={canvasRef}
            width={600}
            height={144}
            className="w-full h-full block"
          />
          <div className="absolute top-2 left-3 text-[10px] font-mono text-teal-400/70">
            GAIN: 10mm/mV | SPEED: 25mm/s | FILTER: 0.05-150Hz
          </div>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-1 gap-2">
          <div className="p-2.5 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Heart
                className={`w-5 h-5 text-rose-500 ${pulseBeating ? 'scale-125 transition-transform duration-100' : 'scale-100'}`}
              />
              <span className="text-[11px] font-mono font-semibold text-slate-400">HR (BPM)</span>
            </div>
            <span className="text-xl font-extrabold font-mono text-rose-400">{heartRate}</span>
          </div>

          <div className="p-2.5 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Wind className="w-5 h-5 text-cyan-400" />
              <span className="text-[11px] font-mono font-semibold text-slate-400">SpO2 (%)</span>
            </div>
            <span className={`text-xl font-extrabold font-mono ${spO2 < 90 ? 'text-amber-400 animate-pulse' : 'text-cyan-400'}`}>
              {spO2}%
            </span>
          </div>

          <div className="p-2.5 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Gauge className="w-5 h-5 text-emerald-400" />
              <span className="text-[11px] font-mono font-semibold text-slate-400">NIBP (mmHg)</span>
            </div>
            <span className="text-base font-extrabold font-mono text-emerald-400">{bp}</span>
          </div>
        </div>
      </div>
    </div>
  );
};
