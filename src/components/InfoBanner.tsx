import { Info } from 'lucide-react';
import type { ReactNode } from 'react';

export function InfoBanner({ children }: { children: ReactNode }) {
  return (
    <div className="flex items-start gap-3 rounded-card border border-line bg-slate-50 p-3.5 text-[14px] leading-relaxed text-slate-600">
      <Info size={18} className="mt-0.5 shrink-0 text-sun" />
      <p>{children}</p>
    </div>
  );
}
