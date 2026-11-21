import type { ButtonHTMLAttributes, ReactNode } from 'react';
import { cn } from '@/lib/cn';

type ChoiceTone = 'neutral' | 'success' | 'danger';

const SELECTED: Record<ChoiceTone, string> = {
  neutral: 'border-sun bg-sun-soft text-sun ring-1 ring-sun',
  success: 'border-success bg-success-soft text-success ring-1 ring-success',
  danger: 'border-danger bg-danger-soft text-danger ring-1 ring-danger',
};

interface ChoiceProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  selected: boolean;
  tone?: ChoiceTone;
  align?: 'center' | 'start';
  children: ReactNode;
}

export function Choice({ selected, tone = 'neutral', align = 'center', className, children, ...props }: ChoiceProps) {
  return (
    <button
      type="button"
      aria-pressed={selected}
      className={cn(
        'flex min-h-btn w-full items-center rounded-xl border px-4 py-3 text-[15px] font-medium leading-snug transition duration-150 active:scale-[0.98]',
        align === 'center' ? 'justify-center text-center' : 'justify-start text-left',
        selected ? SELECTED[tone] : 'border-slate-300 bg-white text-night hover:border-slate-400 hover:bg-slate-50',
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
}
