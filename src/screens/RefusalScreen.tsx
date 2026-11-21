import { useState } from 'react';
import { Button } from '@/components/Button';
import { Card } from '@/components/Card';
import { Choice } from '@/components/Choice';
import { ScreenHeader } from '@/components/ScreenHeader';
import { ScreenShell } from '@/components/ScreenShell';
import type { ScreenProps } from '@/lib/types';

const REASONS = [
  'Attente trop longue chez le client précédent',
  'Panne ou entretien',
  'Documents expirés',
  'Temps de conduite dépassé',
  'Créneau impossible',
  'Tarif ou distance',
  'Raison personnelle',
];

export function RefusalScreen({ mission, updateMission, goTo, back, addAlert }: ScreenProps) {
  const [reason, setReason] = useState<string | null>(null);
  const [comment, setComment] = useState('');

  const confirm = () => {
    if (!reason) return;
    const motif = comment.trim() ? `${reason} : ${comment.trim()}` : reason;
    updateMission({ statut: 'refusee', motif, etape: 'mission-detail' });
    addAlert('Mission refusée', `Mission #${mission.id} refusée. Motif : ${motif}`);
    goTo('missions');
  };

  return (
    <ScreenShell
      header={<ScreenHeader title="Motif du refus" subtitle={`Mission #${mission.id}`} onBack={back} />}
      footer={
        <div className="grid grid-cols-2 gap-3">
          <Button variant="secondary" onClick={back}>
            Annuler
          </Button>
          <Button variant="danger-solid" disabled={!reason} onClick={confirm}>
            Confirmer le refus
          </Button>
        </div>
      }
    >
      <div className="space-y-2">
        {REASONS.map((item) => (
          <Choice key={item} selected={reason === item} tone="danger" align="start" onClick={() => setReason(item)}>
            {item}
          </Choice>
        ))}
      </div>

      <Card className="space-y-2">
        <label htmlFor="refusal-comment" className="text-sm font-semibold text-slate-600">
          Commentaire (facultatif)
        </label>
        <textarea
          id="refusal-comment"
          rows={3}
          value={comment}
          onChange={(event) => setComment(event.target.value)}
          placeholder="Précisez si nécessaire"
          className="w-full resize-none rounded-[10px] border border-slate-300 bg-white p-3 text-[17px] outline-none transition focus:border-night focus:ring-2 focus:ring-night/20"
        />
      </Card>
    </ScreenShell>
  );
}
