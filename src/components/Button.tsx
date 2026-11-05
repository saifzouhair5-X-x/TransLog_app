import type { ButtonHTMLAttributes } from 'react';
import { cn } from '@/lib/cn';

type ButtonVariant = 'primary' | 'secondary' | 'danger' | 'danger-solid' | 'success';

const VARIANTS: Record<ButtonVariant, string> = {
  primary: 'bg-sun text-night shadow-sm hover:bg-sun-hover',
  secondary: 'border-2 border-slate-300 bg-white text-night hover:border-night',
  danger: 'border-2 border-danger bg-white text-danger hover:bg-danger-soft',
  'danger-solid': 'bg-danger text-white hover:bg-[#961F18]',
  success: 'bg-success text-white hover:bg-[#185a31]',
};

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
}

export function Button({ variant = 'primary', className, type = 'button', ...props }: ButtonProps) {
  return (
    <button
      type={type}
      className={cn(
        'flex h-btn w-full items-center justify-center gap-2 rounded-card px-4 text-[18px] font-bold transition duration-150 active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-40 disabled:active:scale-100',
        VARIANTS[variant],
        className
      )}
      {...props}
    />
  );
}
