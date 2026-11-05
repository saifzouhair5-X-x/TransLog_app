import type { ReactNode } from 'react';
import { cn } from '@/lib/cn';

interface CardProps {
  children: ReactNode;
  className?: string;
}

export function Card({ children, className }: CardProps) {
  return (
    <div className={cn('rounded-card border border-slate-200 bg-white p-4 shadow-[0_1px_2px_rgba(31,42,55,0.04)]', className)}>
      {children}
    </div>
  );
}
