import { useEffect, useRef, useState, type PointerEvent } from 'react';
import { currentTime } from '@/lib/format';

interface SignaturePadProps {
  label: string;
  caption: string;
  onChange: (signed: boolean) => void;
}

export function SignaturePad({ label, caption, onChange }: SignaturePadProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const drawing = useRef(false);
  const lastPoint = useRef<{ x: number; y: number } | null>(null);
  const [signed, setSigned] = useState(false);
  const [signedAt, setSignedAt] = useState<string | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ratio = window.devicePixelRatio || 1;
    const { width, height } = canvas.getBoundingClientRect();
    canvas.width = width * ratio;
    canvas.height = height * ratio;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    ctx.setTransform(ratio, 0, 0, ratio, 0, 0);
    ctx.lineWidth = 2.5;
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';
    ctx.strokeStyle = '#1F2A37';
  }, []);

  const pointFromEvent = (event: PointerEvent<HTMLCanvasElement>) => {
    const rect = event.currentTarget.getBoundingClientRect();
    return { x: event.clientX - rect.left, y: event.clientY - rect.top };
  };

  const handlePointerDown = (event: PointerEvent<HTMLCanvasElement>) => {
    event.currentTarget.setPointerCapture(event.pointerId);
    drawing.current = true;
    lastPoint.current = pointFromEvent(event);
    if (!signed) {
      setSigned(true);
      setSignedAt(currentTime());
      onChange(true);
    }
  };

  const handlePointerMove = (event: PointerEvent<HTMLCanvasElement>) => {
    if (!drawing.current || !lastPoint.current) return;
    const ctx = event.currentTarget.getContext('2d');
    const point = pointFromEvent(event);
    if (!ctx) return;
    ctx.beginPath();
    ctx.moveTo(lastPoint.current.x, lastPoint.current.y);
    ctx.lineTo(point.x, point.y);
    ctx.stroke();
    lastPoint.current = point;
  };

  const endStroke = () => {
    drawing.current = false;
    lastPoint.current = null;
  };

  const clear = () => {
    const canvas = canvasRef.current;
    canvas?.getContext('2d')?.clearRect(0, 0, canvas.width, canvas.height);
    setSigned(false);
    setSignedAt(null);
    onChange(false);
  };

  return (
    <div>
      <div className="mb-2 flex items-center justify-between">
        <h2 className="text-base font-bold">{label}</h2>
        {signed && (
          <button type="button" onClick={clear} className="text-[15px] font-semibold text-[#1F5FA8] transition hover:underline">
            Effacer
          </button>
        )}
      </div>
      <div className="relative rounded-card border-2 border-dashed border-slate-300 bg-white">
        <canvas
          ref={canvasRef}
          aria-label={label}
          className="h-40 w-full touch-none"
          onPointerDown={handlePointerDown}
          onPointerMove={handlePointerMove}
          onPointerUp={endStroke}
          onPointerCancel={endStroke}
        />
        {!signed && (
          <p className="pointer-events-none absolute inset-x-0 top-1/2 -translate-y-1/2 text-center text-[15px] text-slate-400">
            Signez avec le doigt ou la souris
          </p>
        )}
        <div className="pointer-events-none absolute inset-x-4 bottom-3 flex items-center justify-between border-t border-slate-200 pt-2 text-sm text-slate-500">
          <span>{caption}</span>
          {signedAt && <span className="font-semibold text-night">{signedAt}</span>}
        </div>
      </div>
    </div>
  );
}
