import { useState } from 'react';
import { Button } from '@/components/Button';
import { Card } from '@/components/Card';
import { Choice } from '@/components/Choice';
import { ScreenHeader } from '@/components/ScreenHeader';
import { ScreenShell } from '@/components/ScreenShell';
import { SignaturePad } from '@/components/SignaturePad';
import { TextField } from '@/components/TextField';
import { currentTime } from '@/lib/format';
import { currentStop } from '@/lib/missions';
import type { ScreenProps } from '@/lib/types';

export function UnloadingScreen({ mission, updateMission, goTo, back, addAlert }: ScreenProps) {
  const stop = currentStop(mission);
  const [withReserve, setWithReserve] = useState<boolean | null>(null);
  const [reserveText, setReserveText] = useState('');
  const [signed, setSigned] = useState(false);

  const canValidate = withReserve !== null && signed && (!withReserve || reserveText.trim() !== '');

  const validate = () => {
    if (withReserve === null) return;
    const stops = mission.stops.map((item) =>
      item.id === stop.id ? { ...item, livraison: { heure: currentTime(), reserve: withReserve } } : item
    );
    const allDelivered = stops.every((item) => item.livraison !== null);
    const detail = withReserve ? ` avec réserve : ${reserveText.trim()}` : ' sans réserve';
    addAlert('Livraison', `Livraison effectuée à ${stop.ville}${detail}.`);

    if (allDelivered) {
      updateMission({ stops, statut: 'livree', etape: 'closing' });
      goTo('closing');
      return;
    }
    updateMission({ stops, statut: 'en_cours', etape: 'trip' });
    goTo('trip');
  };

  return (
    <ScreenShell
      header={<ScreenHeader title="Déchargement" subtitle={`${stop.ville} · ${stop.palettes} palettes`} onBack={back} />}
      footer={
        <Button disabled={!canValidate} onClick={validate}>
          Valider la livraison
        </Button>
      }
    >
      <section className="space-y-2">
        <h2 className="px-1 text-[12px] font-semibold uppercase tracking-[0.06em] text-slate-500">État de la livraison</h2>
        <div className="grid grid-cols-2 gap-3">
          <Choice selected={withReserve === false} tone="success" onClick={() => setWithReserve(false)}>
            Sans réserve
          </Choice>
          <Choice selected={withReserve === true} tone="danger" onClick={() => setWithReserve(true)}>
            Avec réserves
          </Choice>
        </div>
      </section>

      {withReserve && (
        <TextField
          label="Détail des réserves"
          placeholder="ex. 2 palettes endommagées"
          value={reserveText}
          onChange={(event) => setReserveText(event.target.value)}
        />
      )}

      <Card>
        <SignaturePad label="Signature du destinataire (POD)" caption={stop.recipient} onChange={setSigned} />
      </Card>
    </ScreenShell>
  );
}
