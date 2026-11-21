import type { ButtonHTMLAttributes } from 'react';
import { cn } from '@/lib/cn';

type ButtonVariant = 'primary' | 'secondary' | 'danger' | 'danger-solid' | 'success';

const VARIANTS: Record<ButtonVariant, string> = {
  primary: 'bg-sun text-white shadow-raised hover:bg-sun-hover',
  secondary: 'border border-slate-300 bg-white text-night hover:border-slate-400 hover:bg-slate-50',
  danger: 'border border-danger/40 bg-white text-danger hover:bg-danger-soft',
  'danger-solid': 'bg-danger text-white hover:bg-[#991B1B]',
  success: 'bg-success text-white hover:bg-[#166534]',
};

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
}

export function Button({ variant = 'primary', className, type = 'button', ...props }: ButtonProps) {
  return (
    <button
      type={type}
      className={cn(
        'flex h-btn w-full items-center justify-center gap-2 rounded-xl px-4 text-[16px] font-semibold tracking-[-0.01em] transition duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sun/40 focus-visible:ring-offset-2 active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-40 disabled:shadow-none disabled:active:scale-100',
        VARIANTS[variant],
        className
      )}
      {...props}
    />
  );
}
