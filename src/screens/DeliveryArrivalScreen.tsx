import { Phone, User } from 'lucide-react';
import { Button } from '@/components/Button';
import { Card } from '@/components/Card';
import { ScreenHeader } from '@/components/ScreenHeader';
import { ScreenShell } from '@/components/ScreenShell';
import { currentStop, isGroupage } from '@/lib/missions';
import { isWithinWindow } from '@/lib/format';
import type { ScreenProps } from '@/lib/types';

export function DeliveryArrivalScreen({ mission, updateMission, goTo, back, addAlert }: ScreenProps) {
  const stop = currentStop(mission);
  const inWindow = isWithinWindow(new Date().toTimeString().slice(0, 5), stop.window);

  const present = () => {
    updateMission({ etape: 'unloading' });
    goTo('unloading');
  };

  const absent = () => {
    updateMission({ echec: true, etape: 'delivery-arrival' });
    addAlert('Livraison en échec', `Destinataire absent à ${stop.ville} pour la mission #${mission.id}.`);
    goTo('missions');
  };

  return (
    <ScreenShell
      header={
        <ScreenHeader
          title="Arrivée livraison"
          subtitle={isGroupage(mission) ? `Arrêt ${mission.stops.indexOf(stop) + 1} / ${mission.stops.length}` : `Mission #${mission.id}`}
          onBack={back}
        />
      }
      footer={
        <div className="grid grid-cols-2 gap-3">
          <Button variant="danger" onClick={absent}>
            Absent
          </Button>
          <Button onClick={present}>Présent</Button>
        </div>
      }
    >
      <Card className="space-y-3">
        <p className="text-sm font-bold uppercase tracking-wide text-slate-500">Destinataire</p>
        <p className="text-[20px] font-bold leading-tight">{stop.recipient}</p>
        <a href={`tel:${stop.recipientPhone.replace(/\s/g, '')}`} className="flex items-center gap-2 text-[16px] font-semibold text-night underline-offset-4 hover:underline">
          <Phone size={17} />
          {stop.recipientPhone}
        </a>
        <p className="flex items-center gap-2 text-[15px] text-slate-600">
          <User size={17} />
          {stop.site}, {stop.adresse}
        </p>
      </Card>

      <Card className="divide-y divide-slate-200 p-0">
        <div className="flex items-center justify-between gap-4 p-4">
          <span className="text-[15px] text-slate-500">Créneau</span>
          <span className="text-right text-[17px] font-semibold">
            {stop.window.start} – {stop.window.end}
          </span>
        </div>
        <div className="flex items-center justify-between gap-4 p-4">
          <span className="text-[15px] text-slate-500">Palettes à livrer</span>
          <span className="text-right text-[17px] font-semibold">{stop.palettes}</span>
        </div>
      </Card>

      {!inWindow && (
        <p className="rounded-card bg-sun-soft px-4 py-3 text-[15px] font-semibold text-[#7A5600]">
          Vous êtes hors du créneau de livraison prévu.
        </p>
      )}
    </ScreenShell>
  );
}
