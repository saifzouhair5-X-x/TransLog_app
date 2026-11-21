import { cn } from '@/lib/cn';
import { STATUS_LABELS } from '@/lib/format';
import type { MissionStatus } from '@/lib/types';

const STATUS_STYLES: Record<MissionStatus, string> = {
  a_accepter: 'bg-warn-soft text-warn-ink ring-warn/30',
  acceptee: 'bg-sun-soft text-sun ring-sun/25',
  en_cours: 'bg-sun text-white ring-sun',
  livree: 'bg-success-soft text-success ring-success/30',
  cloturee: 'bg-slate-100 text-slate-700 ring-slate-300',
  refusee: 'bg-danger-soft text-danger ring-danger/30',
  annulee: 'bg-danger-soft text-danger ring-danger/30',
};

export function StatusBadge({ status, className }: { status: MissionStatus; className?: string }) {
  return (
    <span
      className={cn(
        'inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[12px] font-semibold ring-1 ring-inset',
        STATUS_STYLES[status],
        className
      )}
    >
      {STATUS_LABELS[status]}
    </span>
  );
}
