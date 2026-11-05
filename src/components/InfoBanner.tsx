import { Info } from 'lucide-react';
import type { ReactNode } from 'react';

export function InfoBanner({ children }: { children: ReactNode }) {
  return (
    <div className="flex items-start gap-3 rounded-card bg-slate-200/70 p-3.5 text-[15px] leading-relaxed text-slate-700">
      <Info size={20} className="mt-0.5 shrink-0 text-slate-600" />
      <p>{children}</p>
    </div>
  );
}
