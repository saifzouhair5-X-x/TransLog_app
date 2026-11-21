import { useState } from 'react';
import { Button } from '@/components/Button';
import { Card } from '@/components/Card';
import { Choice } from '@/components/Choice';
import { ScreenHeader } from '@/components/ScreenHeader';
import { ScreenShell } from '@/components/ScreenShell';
import { currentTime } from '@/lib/format';
import type { ScreenProps } from '@/lib/types';

const RESERVES = ['Palettes endommagées', 'Scellé rompu ou absent', 'Quantité différente de la commande'];
const CANCEL_REASONS = ['Marchandise non conforme', 'Chargement impossible', 'Autre motif'];

export function LoadingReservesScreen({ mission, updateMission, goTo, back, addAlert }: ScreenProps) {
  const [reserve, setReserve] = useState<string | null>(null);
  const [cancelReason, setCancelReason] = useState<string | null>(null);

  const authorize = () => {
    updateMission({ chargeAt: currentTime(), etape: 'documents' });
    addAlert('Marchandise en chargement', `Chargement autorisé malgré réserve pour la mission #${mission.id}.`);
    goTo('documents');
  };

  const cancel = () => {
    if (!cancelReason) return;
    updateMission({ statut: 'annulee', motif: cancelReason, etape: 'mission-detail' });
    addAlert('Mission annulée', `Mission #${mission.id} annulée. Motif : ${cancelReason}`);
    goTo('missions');
  };

  return (
    <ScreenShell
      header={<ScreenHeader title="Réserves au chargement" subtitle={`Mission #${mission.id}`} onBack={back} />}
      footer={
        <div className="grid grid-cols-2 gap-3">
          <Button variant="danger-solid" disabled={!cancelReason} onClick={cancel}>
            Mission annulée
          </Button>
          <Button onClick={authorize}>Chargement autorisé</Button>
        </div>
      }
    >
      <section className="space-y-2">
        <h2 className="px-1 text-[12px] font-semibold uppercase tracking-[0.06em] text-slate-500">Réserve constatée</h2>
        {RESERVES.map((item) => (
          <Choice key={item} selected={reserve === item} tone="danger" align="start" onClick={() => setReserve(item)}>
            {item}
          </Choice>
        ))}
      </section>

      <section className="space-y-2">
        <h2 className="px-1 text-[12px] font-semibold uppercase tracking-[0.06em] text-slate-500">Motif d’annulation</h2>
        <Card className="space-y-2 p-3">
          {CANCEL_REASONS.map((item) => (
            <Choice key={item} selected={cancelReason === item} tone="danger" align="start" onClick={() => setCancelReason(item)}>
              {item}
            </Choice>
          ))}
        </Card>
      </section>
    </ScreenShell>
  );
}
