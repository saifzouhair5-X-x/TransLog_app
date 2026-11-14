import { Clock, MapPin, Navigation, Truck, TriangleAlert } from 'lucide-react';
import { Button } from '@/components/Button';
import { Card } from '@/components/Card';
import { ScreenHeader } from '@/components/ScreenHeader';
import { ScreenShell } from '@/components/ScreenShell';
import { currentStop, deliverySummary, totalPalettes, totalWeight } from '@/lib/missions';
import { formatNumber } from '@/lib/format';
import type { ScreenProps } from '@/lib/types';

export function TripScreen({ mission, goTo, back, updateMission }: ScreenProps) {
  const stop = currentStop(mission);
  const delivered = mission.stops.filter((item) => item.livraison !== null).length;
  const summary = deliverySummary(mission);
  const weight = totalWeight(mission);
  const palettes = totalPalettes(mission);

  const arrive = () => {
    updateMission({ etape: 'delivery-arrival' });
    goTo('delivery-arrival');
  };

  return (
    <ScreenShell
      header={
        <ScreenHeader
          title="Trajet en cours"
          subtitle={`Mission #${mission.id} · ${delivered} / ${mission.stops.length} arrêt(s) livré(s)`}
          onBack={back}
        />
      }
      footer={
        <div className="grid grid-cols-2 gap-3">
          <Button variant="secondary" onClick={() => goTo('incident')}>
            <TriangleAlert size={18} />
            Déclarer un incident
          </Button>
          <Button onClick={arrive}>Je suis arrivé</Button>
        </div>
      }
    >
      <div className="relative h-56 overflow-hidden rounded-card border border-slate-200 bg-[#E8EEF2]">
        <svg viewBox="0 0 360 224" className="absolute inset-0 h-full w-full" aria-hidden="true">
          <path d="M-10 170 C 80 120, 120 200, 200 130 S 320 60, 380 90" fill="none" stroke="#FFFFFF" strokeWidth="14" />
          <path d="M-10 170 C 80 120, 120 200, 200 130 S 320 60, 380 90" fill="none" stroke="#1F2A37" strokeWidth="3" strokeDasharray="8 8" />
          <path d="M40 30 H 320 M 60 200 V 40" stroke="#FFFFFF" strokeWidth="6" />
          <circle cx="200" cy="130" r="9" fill="#F2A900" stroke="#1F2A37" strokeWidth="3" />
        </svg>
        <div className="absolute bottom-3 left-3 flex items-center gap-2 rounded-full bg-night px-3 py-1.5 text-sm font-semibold text-white">
          <Navigation size={15} />
          GPS actif
        </div>
      </div>

      <Card className="space-y-2">
        <p className="text-sm font-bold uppercase tracking-wide text-slate-500">Prochain arrêt</p>
        <p className="text-[22px] font-bold leading-tight">{stop.ville}</p>
        <p className="text-[16px] text-slate-600">{stop.site}</p>
        <p className="flex items-start gap-2 text-[15px] text-slate-600">
          <MapPin size={17} className="mt-0.5 shrink-0" />
          {stop.adresse}
        </p>
        <p className="text-[15px] text-slate-500">
          Créneau {stop.window.start} – {stop.window.end} · {stop.palettes} palettes
        </p>
        {summary.reserve && <p className="text-sm font-semibold text-danger">Réserve signalée sur une livraison précédente</p>}
      </Card>

      <Card className="divide-y divide-slate-200 p-0">
        <div className="flex items-center gap-2 p-4 text-sm font-bold uppercase tracking-wide text-slate-500">
          <Truck size={16} />
          Véhicule & marchandise
        </div>
        <InfoRow label="Poids chargé" value={`${formatNumber(weight)} kg`} />
        <InfoRow label="Matricule tracteur" value={mission.tracteur} />
        <InfoRow label="Matricule remorque" value={mission.remorque} />
        <InfoRow label="Total palettes" value={`${palettes}`} />
      </Card>

      <section className="space-y-2">
        <h2 className="px-1 text-sm font-bold uppercase tracking-wide text-slate-500">
          Arrêts prévus ({mission.stops.length})
        </h2>
        <Card className="divide-y divide-slate-200 p-0">
          {mission.stops.map((s, index) => {
            const isDone = s.livraison !== null;
            const isCurrent = s.id === stop.id && !isDone;
            return (
              <div key={s.id} className="flex items-center gap-3 p-4">
                <span
                  className={
                    'flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-sm font-bold ' +
                    (isDone
                      ? 'bg-success text-white'
                      : isCurrent
                        ? 'bg-sun text-night'
                        : 'bg-slate-200 text-slate-600')
                  }
                >
                  {index + 1}
                </span>
                <div className="min-w-0 flex-1">
                  <p className="text-[16px] font-bold leading-tight">{s.ville}</p>
                  <p className="truncate text-sm text-slate-500">{s.site}</p>
                </div>
                <div className="shrink-0 text-right">
                  <p className="flex items-center justify-end gap-1 text-sm font-semibold text-night">
                    <Clock size={14} />
                    {s.arriveePrevue.split(' ').pop()}
                  </p>
                  <p className="text-xs text-slate-400">{isDone ? 'Livré' : isCurrent ? 'En cours' : 'À venir'}</p>
                </div>
              </div>
            );
          })}
        </Card>
      </section>
    </ScreenShell>
  );
}

function InfoRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between gap-4 p-4">
      <span className="text-[15px] text-slate-500">{label}</span>
      <span className="text-right text-[17px] font-semibold leading-snug">{value}</span>
    </div>
  );
}
