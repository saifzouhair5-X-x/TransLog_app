import { ChevronLeft } from 'lucide-react';
import type { ReactNode } from 'react';
import { cn } from '@/lib/cn';

interface ScreenHeaderProps {
  title: string;
  subtitle?: string;
  onBack?: () => void;
  trailing?: ReactNode;
}

export function StatusBar({ tone }: { tone: 'light' | 'dark' }) {
  return (
    <div
      className={cn(
        'flex h-11 shrink-0 items-center justify-between px-6 text-[15px] font-bold',
        tone === 'dark' ? 'text-white' : 'text-night'
      )}
    >
      <span>9:41</span>
      <svg width="25" height="12" viewBox="0 0 25 12" aria-hidden="true">
        <rect x="0.5" y="0.5" width="21" height="11" rx="3" stroke="currentColor" fill="none" opacity="0.4" />
        <rect x="2" y="2" width="18" height="8" rx="1.5" fill="currentColor" />
        <rect x="23" y="4" width="1.5" height="4" rx="0.75" fill="currentColor" opacity="0.4" />
      </svg>
    </div>
  );
}

export function ScreenHeader({ title, subtitle, onBack, trailing }: ScreenHeaderProps) {
  return (
    <header className="shrink-0 bg-night px-5 pb-5 text-white">
      <StatusBar tone="dark" />
      <div className="mt-3 flex items-start justify-between gap-3">
        <div className="flex min-w-0 items-start gap-2">
          {onBack && (
            <button
              type="button"
              onClick={onBack}
              aria-label="Retour"
              className="-ml-2 flex h-10 w-10 shrink-0 items-center justify-center rounded-full transition hover:bg-white/10 active:scale-95"
            >
              <ChevronLeft size={26} strokeWidth={2.4} />
            </button>
          )}
          <div className="min-w-0 pt-1">
            <h1 className="text-[26px] font-bold leading-[1.2]">{title}</h1>
            {subtitle && <p className="mt-0.5 text-sm text-slate-300">{subtitle}</p>}
          </div>
        </div>
        {trailing && <div className="shrink-0 pt-1">{trailing}</div>}
      </div>
    </header>
  );
}
