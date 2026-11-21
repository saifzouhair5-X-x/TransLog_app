import {
  Banknote,
  CalendarDays,
  ChartColumnBig,
  CircleCheck,
  Clock3,
  PackageX,
  Receipt,
  Route,
  TrendingDown,
  XCircle,
} from 'lucide-react';
import { BottomNav } from '@/components/BottomNav';
import { Card } from '@/components/Card';
import { NotificationBell } from '@/components/NotificationBell';
import { ScreenHeader } from '@/components/ScreenHeader';
import { ScreenShell } from '@/components/ScreenShell';
import { formatMAD, formatNumber } from '@/lib/format';
import { cn } from '@/lib/cn';
import type { Driver, Mission, ScreenId } from '@/lib/types';

interface DashboardScreenProps {
  missions: Mission[];
  driver: Driver;
  unread: number;
  goTo: (screen: ScreenId) => void;
}

export function DashboardScreen({ missions, driver, unread, goTo }: DashboardScreenProps) {
  const planifiees = missions.filter((m) => m.statut === 'a_accepter' || m.statut === 'acceptee').length;
  const enCours = missions.filter((m) => m.statut === 'en_cours' || m.statut === 'livree').length;
  const effectuees = missions.filter((m) => m.statut === 'cloturee').length;
  const annulees = missions.filter((m) => m.statut === 'annulee' || m.statut === 'refusee').length;
  const total = missions.length;
  const tauxAnnulation = total > 0 ? Math.round((annulees / total) * 100) : 0;

  const kmParcourus = missions
    .filter((m) => m.kmParcourus !== null)
    .reduce((sum, m) => sum + (m.kmParcourus ?? 0), 0);

  const incidentsCount = missions.reduce((sum, m) => sum + m.incidents.length, 0);

  // Most frequent cancellation reasons
  const motifCounts = new Map<string, number>();
  missions
    .filter((m) => m.motif)
    .forEach((m) => {
      const motif = m.motif!;
      motifCounts.set(motif, (motifCounts.get(motif) ?? 0) + 1);
    });
  const topMotifs = [...motifCounts.entries()].sort((a, b) => b[1] - a[1]).slice(0, 3);

  const monthLabel = new Date().toLocaleDateString('fr-FR', { month: 'long', year: 'numeric' });

  const isIndependant = driver.type === 'independant';
  const chiffreAffaires = missions
    .filter((m) => m.statut === 'cloturee')
    .reduce((sum, m) => sum + (isIndependant ? m.prix : 0) + (isIndependant ? 0 : 0), 0);
  const totalFraisRemboursables = missions
    .filter((m) => m.statut === 'cloturee')
    .reduce((sum, m) => sum + m.expenses.reduce((s, e) => s + e.amount, 0), 0);

  return (
    <ScreenShell
      header={
        <ScreenHeader
          title="Tableau de bord"
          subtitle={monthLabel.charAt(0).toUpperCase() + monthLabel.slice(1)}
          trailing={<NotificationBell unread={unread} onClick={() => goTo('notifications')} />}
        />
      }
      footer={<BottomNav active="dashboard" onSelect={goTo} />}
    >
      <div className="grid grid-cols-2 gap-3">
        <StatBox
          icon={<CalendarDays size={17} />}
          label="Planifiées"
          value={planifiees}
          tone="neutral"
        />
        <StatBox
          icon={<Clock3 size={17} />}
          label="En cours"
          value={enCours}
          tone="active"
        />
        <StatBox
          icon={<CircleCheck size={17} />}
          label="Effectuées"
          value={effectuees}
          tone="success"
        />
        <StatBox
          icon={<XCircle size={17} />}
          label="Annulées"
          value={annulees}
          tone="danger"
        />
      </div>

      {isIndependant && (
        <Card className="space-y-1 border-night bg-night text-white">
          <div className="flex items-center gap-2 text-[12px] font-semibold uppercase tracking-[0.06em] text-slate-400">
            <Banknote size={16} />
            Chiffre d'affaires du mois
          </div>
          <p className="text-[32px] font-semibold leading-tight tracking-[-0.03em] tabular-nums text-white">{formatMAD(chiffreAffaires)}</p>
          <p className="text-sm text-slate-400">{effectuees} mission(s) livrée(s) ce mois</p>
        </Card>
      )}

      {!isIndependant && (
        <Card className="space-y-1">
          <div className="flex items-center gap-2 text-[12px] font-semibold uppercase tracking-[0.06em] text-slate-500">
            <Receipt size={16} />
            Frais remboursables (mois)
          </div>
          <p className="text-[24px] font-semibold leading-tight tracking-[-0.03em] tabular-nums">{formatMAD(totalFraisRemboursables)}</p>
          <p className="text-sm text-slate-500">Péage, carburant — missions livrées</p>
        </Card>
      )}

      <div className="grid grid-cols-2 gap-3">
        <Card className="space-y-1">
          <div className="flex items-center gap-2 text-[12px] font-semibold uppercase tracking-[0.06em] text-slate-500">
            <Route size={16} />
            km parcourus
          </div>
          <p className="text-[24px] font-semibold leading-tight tracking-[-0.03em] tabular-nums">{formatNumber(kmParcourus)}</p>
          <p className="text-sm text-slate-500">kilomètres ce mois</p>
        </Card>

        <Card className="space-y-1">
          <div className="flex items-center gap-2 text-[12px] font-semibold uppercase tracking-[0.06em] text-slate-500">
            <PackageX size={16} />
            Incidents
          </div>
          <p className="text-[24px] font-semibold leading-tight tracking-[-0.03em] tabular-nums">{incidentsCount}</p>
          <p className="text-sm text-slate-500">déclarés ce mois</p>
        </Card>
      </div>

      <Card className="space-y-3">
        <div className="flex items-center gap-2 text-[12px] font-semibold uppercase tracking-[0.06em] text-slate-500">
          <TrendingDown size={16} />
          Taux d'annulation
        </div>
        <div className="flex items-end gap-3">
          <p className="text-[32px] font-semibold leading-none text-danger">{tauxAnnulation}%</p>
          <p className="pb-1 text-sm text-slate-500">
            {annulees} / {total} missions
          </p>
        </div>
        <div className="h-2 overflow-hidden rounded-full bg-slate-100">
          <div
            className="h-full rounded-full bg-danger transition-all duration-500"
            style={{ width: `${tauxAnnulation}%` }}
          />
        </div>
      </Card>

      <Card className="space-y-3">
        <div className="flex items-center gap-2 text-[12px] font-semibold uppercase tracking-[0.06em] text-slate-500">
          <ChartColumnBig size={16} />
          Motifs d'annulation les plus fréquents
        </div>
        {topMotifs.length === 0 ? (
          <p className="text-[15px] text-slate-500">Aucune annulation ce mois.</p>
        ) : (
          <ul className="space-y-2">
            {topMotifs.map(([motif, count], index) => (
              <li key={motif} className="flex items-center justify-between gap-3">
                <div className="flex items-center gap-2">
                  <span className="flex h-6 w-6 items-center justify-center rounded-full bg-slate-200 text-xs font-semibold text-slate-700">
                    {index + 1}
                  </span>
                  <span className="text-[15px] font-semibold">{motif}</span>
                </div>
                <span className="shrink-0 rounded-full bg-danger-soft px-2.5 py-0.5 text-sm font-semibold text-danger">
                  {count}x
                </span>
              </li>
            ))}
          </ul>
        )}
      </Card>
    </ScreenShell>
  );
}

function StatBox({
  icon,
  label,
  value,
  tone,
}: {
  icon: React.ReactNode;
  label: string;
  value: number;
  tone: 'neutral' | 'active' | 'success' | 'danger';
}) {
  const toneClasses = {
    neutral: 'bg-slate-100 text-slate-600',
    active: 'bg-sun-soft text-sun',
    success: 'bg-success-soft text-success',
    danger: 'bg-danger-soft text-danger',
  };
  return (
    <div className="flex flex-col gap-3 rounded-xl border border-line bg-white p-3.5">
      <span className={cn('flex h-8 w-8 items-center justify-center rounded-lg', toneClasses[tone])}>{icon}</span>
      <div>
        <p className="text-[24px] font-semibold leading-none tracking-[-0.03em] tabular-nums text-night">{value}</p>
        <p className="mt-1 text-[13px] font-medium text-slate-500">{label}</p>
      </div>
    </div>
  );
}
