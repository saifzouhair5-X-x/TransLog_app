import { CheckCircle2 } from 'lucide-react';
import { Button } from '@/components/Button';
import { Card } from '@/components/Card';
import { ScreenHeader } from '@/components/ScreenHeader';
import { ScreenShell } from '@/components/ScreenShell';
import { formatMAD } from '@/lib/format';
import { deliverySummary, totalPalettes } from '@/lib/missions';
import type { ScreenProps } from '@/lib/types';

export function MissionEndScreen({ mission, goTo }: ScreenProps) {
  const summary = deliverySummary(mission);
  const distance = mission.kmDepart !== null && mission.kmArrivee !== null ? mission.kmArrivee - mission.kmDepart : null;
  const total = mission.expenses.reduce((sum, expense) => sum + expense.amount, 0);

  return (
    <ScreenShell
      header={<ScreenHeader title="Mission terminée" subtitle={`Mission #${mission.id}`} />}
      footer={<Button onClick={() => goTo('missions')}>Retour à mes missions</Button>}
    >
      <div className="flex flex-col items-center py-4 text-center">
        <span className="flex h-16 w-16 items-center justify-center rounded-full bg-success-soft text-success">
          <CheckCircle2 size={36} />
        </span>
        <p className="mt-4 text-[22px] font-bold">Mission clôturée</p>
        <p className="text-[16px] text-slate-500">
          {mission.origin} → {mission.stops.map((stop) => stop.ville).join(' → ')}
        </p>
      </div>

      <Card className="divide-y divide-slate-200 p-0">
        <SummaryRow label="Arrêts livrés" value={`${mission.stops.length} / ${mission.stops.length}`} />
        <SummaryRow label="Palettes" value={String(totalPalettes(mission))} />
        <SummaryRow label="Dernière livraison" value={summary.heure ?? '-'} />
        <SummaryRow label="Réserves" value={summary.reserve ? 'Oui' : 'Aucune'} />
        <SummaryRow label="Kilomètres" value={distance !== null ? `${distance} km` : '-'} />
        <SummaryRow label="Frais" value={formatMAD(total)} />
      </Card>
    </ScreenShell>
  );
}

function SummaryRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between gap-4 p-4">
      <span className="text-[15px] text-slate-500">{label}</span>
      <span className="text-right text-[17px] font-semibold">{value}</span>
    </div>
  );
}
