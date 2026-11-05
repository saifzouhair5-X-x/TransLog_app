import { X } from 'lucide-react';
import { useEffect } from 'react';

interface ToastProps {
  message: string;
  onDismiss: () => void;
}

export function Toast({ message, onDismiss }: ToastProps) {
  useEffect(() => {
    const timer = window.setTimeout(onDismiss, 2800);
    return () => window.clearTimeout(timer);
  }, [onDismiss]);

  return (
    <div
      role="status"
      aria-live="polite"
      className="absolute inset-x-4 bottom-28 z-50 flex animate-toast-in items-center gap-3 rounded-card bg-night px-4 py-3 text-[15px] font-semibold text-white shadow-lg"
    >
      <span className="flex-1">{message}</span>
      <button
        type="button"
        onClick={onDismiss}
        aria-label="Fermer"
        className="rounded-full p-1 text-slate-300 transition hover:text-white"
      >
        <X size={18} />
      </button>
    </div>
  );
}
