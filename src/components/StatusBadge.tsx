import { cn } from '@/lib/cn';
import { STATUS_LABELS } from '@/lib/format';
import type { MissionStatus } from '@/lib/types';

const STATUS_STYLES: Record<MissionStatus, string> = {
  a_accepter: 'bg-sun-soft text-[#7A5600] ring-sun/50',
  acceptee: 'bg-slate-100 text-slate-700 ring-slate-300',
  en_cours: 'bg-night text-white ring-night',
  livree: 'bg-success-soft text-success ring-success/30',
  cloturee: 'bg-success text-white ring-success',
  refusee: 'bg-danger-soft text-danger ring-danger/30',
  annulee: 'bg-danger-soft text-danger ring-danger/30',
};

export function StatusBadge({ status, className }: { status: MissionStatus; className?: string }) {
  return (
    <span
      className={cn(
        'inline-flex items-center rounded-full px-3 py-1 text-sm font-semibold ring-1 ring-inset',
        STATUS_STYLES[status],
        className
      )}
    >
      {STATUS_LABELS[status]}
    </span>
  );
}
