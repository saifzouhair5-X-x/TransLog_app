import { Camera, CircleCheck, CircleDashed, Download, Phone, User } from 'lucide-react';
import { useRef } from 'react';
import { Button } from '@/components/Button';
import { Card } from '@/components/Card';
import { ScreenHeader } from '@/components/ScreenHeader';
import { ScreenShell } from '@/components/ScreenShell';
import { currentStop, isGroupage } from '@/lib/missions';
import { currentTime, isWithinWindow } from '@/lib/format';
import type { ScreenProps } from '@/lib/types';

export function DeliveryArrivalScreen({ mission, updateMission, goTo, back, addAlert, notify }: ScreenProps) {
  const stop = currentStop(mission);
  const inWindow = isWithinWindow(new Date().toTimeString().slice(0, 5), stop.window);
  const inputRef = useRef<HTMLInputElement>(null);

  const docLabel = mission.type === 'nationale' ? 'Bon de livraison (BL)' : 'Lettre de voiture (CMR)';
  const docKey = mission.type === 'nationale' ? 'bl' : 'cmr';
  const isScanned = mission.documents[docKey] !== null;

  const present = () => {
    if (!isScanned) {
      notify(`${docLabel} signé et cacheté obligatoire`);
      return;
    }
    updateMission({ etape: 'unloading' });
    goTo('unloading');
  };

  const absent = () => {
    updateMission({ echec: true, etape: 'delivery-arrival' });
    addAlert('Livraison en échec', `Destinataire absent à ${stop.ville} pour la mission #${mission.id}.`);
    goTo('missions');
  };

  const scanDoc = () => {
    updateMission({ documents: { ...mission.documents, [docKey]: currentTime() } });
    notify(`${docLabel} scanné`);
  };

  const downloadPdf = () => {
    notify('Téléchargement de la CMR (PDF) en cours…');
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
          <Button onClick={present} disabled={!isScanned}>
            Présent
          </Button>
        </div>
      }
    >
      <Card className="space-y-3">
        <p className="text-[12px] font-semibold uppercase tracking-[0.06em] text-slate-500">Destinataire</p>
        <p className="text-[20px] font-semibold leading-tight">{stop.recipient}</p>
        <a href={`tel:${stop.recipientPhone.replace(/\s/g, '')}`} className="flex items-center gap-2 text-[16px] font-semibold text-night underline-offset-4 hover:underline">
          <Phone size={17} />
          {stop.recipientPhone}
        </a>
        <p className="flex items-center gap-2 text-[15px] text-slate-600">
          <User size={17} />
          {stop.site}, {stop.adresse}
        </p>
      </Card>

      <Card className="divide-y divide-line p-0">
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
        <p className="rounded-card bg-warn-soft px-4 py-3 text-[14px] font-semibold text-warn-ink">
          Vous êtes hors du créneau de livraison prévu.
        </p>
      )}

      <Card className="space-y-3">
        <p className="text-[12px] font-semibold uppercase tracking-[0.06em] text-slate-500">
          {docLabel} signé et cacheté
        </p>
        <div className="flex items-center justify-between gap-3">
          <div className="flex min-w-0 items-center gap-3">
            {isScanned ? (
              <CircleCheck size={22} className="shrink-0 text-success" />
            ) : (
              <CircleDashed size={22} className="shrink-0 text-danger" />
            )}
            <div className="min-w-0">
              <p className="text-[16px] font-semibold leading-snug">Scan obligatoire</p>
              <p className={isScanned ? 'text-sm text-success' : 'text-sm text-danger'}>
                {isScanned ? `Scanné à ${mission.documents[docKey]}` : 'En attente de scan'}
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={() => inputRef.current?.click()}
            className="flex shrink-0 items-center gap-1.5 rounded-full bg-sun px-3 py-2 text-sm font-semibold text-white transition duration-150 hover:bg-sun-hover active:scale-95"
          >
            <Camera size={16} />
            Scanner
          </button>
          <input
            ref={inputRef}
            type="file"
            accept="image/*"
            capture="environment"
            className="hidden"
            onChange={(event) => {
              const file = event.target.files?.[0];
              if (file) scanDoc();
              event.target.value = '';
            }}
          />
        </div>
        <Button variant="secondary" onClick={downloadPdf}>
          <Download size={18} />
          Télécharger la CMR (PDF)
        </Button>
      </Card>
    </ScreenShell>
  );
}
