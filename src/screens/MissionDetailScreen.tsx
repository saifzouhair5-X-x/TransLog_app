import { Banknote, Check, Circle, CircleDot, HandCoins, MapPin, Truck, X } from 'lucide-react';
import { useState } from 'react';
import { Button } from '@/components/Button';
import { Card } from '@/components/Card';
import { ScreenHeader } from '@/components/ScreenHeader';
import { ScreenShell } from '@/components/ScreenShell';
import { StatusBadge } from '@/components/StatusBadge';
import { cn } from '@/lib/cn';
import { currentTime, formatMAD } from '@/lib/format';
import { isGroupage, totalPalettes } from '@/lib/missions';
import { buildTimeline, type TimelineState } from '@/lib/timeline';
import type { Driver, ScreenProps } from '@/lib/types';

interface MissionDetailScreenProps extends ScreenProps {
  driver: Driver;
}

export function MissionDetailScreen({ mission, updateMission, goTo, back, addAlert, notify, driver }: MissionDetailScreenProps) {
  const lastStop = mission.stops[mission.stops.length - 1];
  const timeline = buildTimeline(mission);
  const pending = mission.statut === 'a_accepter';
  const isIndependant = driver.type === 'independant';

  const [contreMontant, setContreMontant] = useState<string>(
    mission.contreProposition !== null ? String(mission.contreProposition) : ''
  );
  const [showContre, setShowContre] = useState(false);

  const accept = () => {
    updateMission({ statut: 'acceptee', acceptedAt: currentTime(), etape: 'vehicle-check' });
    addAlert('Mission acceptée', `Vous avez accepté la mission #${mission.id} (${mission.origin} → ${mission.destination}).`);
    goTo('vehicle-check');
  };

  const sendContre = () => {
    const montant = Number(contreMontant);
    if (!montant || montant <= 0) return;
    updateMission({ contreProposition: montant });
    addAlert('Contre-proposition envoyée', `Mission #${mission.id} : vous proposez ${formatMAD(montant)} (prix initial ${formatMAD(mission.prix)}).`);
    notify('Contre-proposition envoyée');
  };

  const totalFrais = mission.expenses.reduce((sum, e) => sum + e.amount, 0);

  return (
    <ScreenShell
      header={<ScreenHeader title={`Mission #${mission.id}`} subtitle={`${mission.origin} → ${mission.destination}`} onBack={back} />}
      footer={
        pending ? (
          <div className="space-y-3">
            {isIndependant && showContre && (
              <div className="flex items-center gap-2">
                <input
                  type="number"
                  inputMode="numeric"
                  value={contreMontant}
                  onChange={(event) => setContreMontant(event.target.value)}
                  placeholder={String(mission.prix)}
                  className="min-w-0 flex-1 rounded-xl border border-slate-300 bg-white px-3 py-3 text-[16px] font-medium tabular-nums outline-none transition focus:border-sun focus:ring-4 focus:ring-sun/10"
                />
                <span className="shrink-0 text-sm font-semibold text-slate-500">MAD</span>
                <Button onClick={sendContre} disabled={!contreMontant || Number(contreMontant) <= 0} className="shrink-0">
                  Proposer ce prix
                </Button>
              </div>
            )}
            <div className="grid grid-cols-2 gap-3">
              <Button variant="danger" onClick={() => goTo('refusal')}>
                Refuser
              </Button>
              {isIndependant && !showContre ? (
                <Button variant="secondary" onClick={() => setShowContre(true)}>
                  <HandCoins size={18} />
                  Contre-proposition
                </Button>
              ) : (
                <Button onClick={accept}>Accepter</Button>
              )}
            </div>
          </div>
        ) : undefined
      }
    >
      <div className="flex items-center justify-between gap-3">
        <StatusBadge status={mission.statut} />
        {isGroupage(mission) && (
          <span className="rounded-full bg-slate-100 px-2.5 py-1 text-[12px] font-semibold text-slate-600 ring-1 ring-inset ring-line">Groupage</span>
        )}
      </div>

      <Card className="space-y-2">
        <p className="flex items-center gap-2 text-[12px] font-semibold uppercase tracking-[0.06em] text-slate-500">
          <Banknote size={16} />
          Prix de la mission
        </p>
        <p className="text-[30px] font-semibold leading-tight tracking-[-0.03em] tabular-nums text-night">{formatMAD(mission.prix)}</p>
        {mission.contreProposition !== null && (
          <p className="text-sm font-semibold text-sun">
            Votre contre-proposition : {formatMAD(mission.contreProposition)}
          </p>
        )}
        {!isIndependant && (
          <p className="text-sm text-slate-500">
            Frais remboursables : {formatMAD(totalFrais)}
            {mission.expenses.length > 0 && (
              <span className="ml-1 text-slate-400">
                ({mission.expenses.map((e) => `${e.label} ${formatMAD(e.amount)}`).join(' · ')})
              </span>
            )}
          </p>
        )}
      </Card>

      <Card className="divide-y divide-line p-0">
        <InfoRow label="Départ prévu" value={mission.departPrevu} />
        <InfoRow label="Arrivée prévue" value={lastStop.arriveePrevue} />
        <InfoRow label="Délai" value={mission.delai} />
        <InfoRow label="Localisation" value={mission.localisation} />
        <InfoRow label="Marchandise" value={`${mission.goods} · ${totalPalettes(mission)} palettes`} />
      </Card>

      <Card className="divide-y divide-line p-0">
        <div className="flex items-center gap-2 p-4 text-[12px] font-semibold uppercase tracking-[0.06em] text-slate-500">
          <Truck size={16} />
          Matricules
        </div>
        <InfoRow label="Tracteur" value={driver.tracteur} />
        <InfoRow label="Remorque" value={driver.remorque} />
      </Card>

      <section className="space-y-3">
        <h2 className="px-1 text-[12px] font-semibold uppercase tracking-[0.06em] text-slate-500">
          Points de livraison ({mission.stops.length})
        </h2>
        {mission.stops.map((stop, index) => (
          <Card key={stop.id} className="flex gap-3 p-4">
            <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-sun-soft text-sm font-semibold text-sun ring-1 ring-inset ring-sun/20">
              {index + 1}
            </span>
            <div className="min-w-0 flex-1 space-y-1">
              <p className="text-[17px] font-semibold leading-tight tracking-[-0.01em]">{stop.ville}</p>
              <p className="text-[14px] text-slate-600">{stop.site}</p>
              <p className="flex items-start gap-1.5 text-sm text-slate-500">
                <MapPin size={15} className="mt-0.5 shrink-0" />
                {stop.adresse}
              </p>
              <p className="text-sm text-slate-500">
                Créneau {stop.window.start} – {stop.window.end} · {stop.palettes} palettes
              </p>
            </div>
          </Card>
        ))}
      </section>

      <section className="space-y-3">
        <h2 className="px-1 text-[12px] font-semibold uppercase tracking-[0.06em] text-slate-500">Suivi de la mission</h2>
        <Card>
          <ol>
            {timeline.map((step, index) => (
              <li key={step.id} className="flex gap-3">
                <div className="flex flex-col items-center">
                  <TimelineIcon state={step.state} />
                  {index < timeline.length - 1 && <span className="my-1 w-px flex-1 bg-line" />}
                </div>
                <div className={cn('min-w-0 pb-4', step.state === 'pending' && 'opacity-60')}>
                  <p className={cn('text-[15px] font-semibold leading-tight', step.state === 'ko' && 'text-danger')}>
                    {step.label}
                  </p>
                  <p className="text-sm text-slate-500">{step.detail}</p>
                </div>
              </li>
            ))}
          </ol>
        </Card>
      </section>
    </ScreenShell>
  );
}

function InfoRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-start justify-between gap-4 p-4">
      <span className="shrink-0 text-[14px] text-slate-500">{label}</span>
      <span className="text-right text-[15px] font-medium leading-snug text-night">{value}</span>
    </div>
  );
}

function TimelineIcon({ state }: { state: TimelineState }) {
  const base = 'flex h-6 w-6 shrink-0 items-center justify-center rounded-full';
  if (state === 'done') return <span className={cn(base, 'bg-success text-white')}><Check size={15} strokeWidth={3} /></span>;
  if (state === 'ko') return <span className={cn(base, 'bg-danger text-white')}><X size={15} strokeWidth={3} /></span>;
  if (state === 'current') return <span className={cn(base, 'bg-sun text-white')}><CircleDot size={15} /></span>;
  return <span className={cn(base, 'border-2 border-slate-300 text-slate-400')}><Circle size={11} /></span>;
}
