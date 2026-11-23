import { ArrowRight, Banknote, Clock, TriangleAlert } from 'lucide-react';
import { useState } from 'react';
import { BottomNav } from '@/components/BottomNav';
import { Card } from '@/components/Card';
import { NotificationBell } from '@/components/NotificationBell';
import { ScreenHeader } from '@/components/ScreenHeader';
import { ScreenShell } from '@/components/ScreenShell';
import { StatusBadge } from '@/components/StatusBadge';
import { formatMAD, formatTonnes } from '@/lib/format';
import { isGroupage, totalPalettes } from '@/lib/missions';
import { cn } from '@/lib/cn';
import type { Driver, Mission, MissionStatus, ScreenId } from '@/lib/types';

type MissionTab = 'planifier' | 'en_cours' | 'effectuees' | 'annulees';

const TABS: { id: MissionTab; label: string; statuts: MissionStatus[]; empty: string }[] = [
  { id: 'planifier', label: 'À planifier', statuts: ['a_accepter', 'acceptee'], empty: 'Aucune mission à planifier' },
  { id: 'en_cours', label: 'En cours', statuts: ['en_cours', 'livree'], empty: 'Aucune mission en cours' },
  { id: 'effectuees', label: 'Effectuées', statuts: ['cloturee'], empty: 'Aucune mission effectuée' },
  { id: 'annulees', label: 'Annulées', statuts: ['refusee', 'annulee'], empty: 'Aucune mission annulée' },
];

interface MissionsScreenProps {
  missions: Mission[];
  driver: Driver;
  unread: number;
  onSelect: (mission: Mission) => void;
  goTo: (screen: ScreenId) => void;
}

export function MissionsScreen({ missions, driver, unread, onSelect, goTo }: MissionsScreenProps) {
  const [tab, setTab] = useState<MissionTab>('planifier');
  const activeTab = TABS.find((item) => item.id === tab) ?? TABS[0];
  const visible = missions.filter((mission) => activeTab.statuts.includes(mission.statut));

  return (
    <ScreenShell
      header={
        <ScreenHeader
          title="Mes missions"
          subtitle={`Bonjour ${driver.prenom}, ${missions.length} mission(s) suivie(s)`}
          trailing={<NotificationBell unread={unread} onClick={() => goTo('notifications')} />}
        />
      }
      footer={<BottomNav active="missions" onSelect={goTo} />}
    >
      <div role="tablist" className="grid grid-cols-4 gap-1 rounded-xl border border-line bg-slate-100 p-1">
        {TABS.map((item) => {
          const count = missions.filter((mission) => item.statuts.includes(mission.statut)).length;
          const selected = item.id === tab;
          return (
            <button
              key={item.id}
              type="button"
              role="tab"
              aria-selected={selected}
              onClick={() => setTab(item.id)}
              className={cn(
                'flex flex-col items-center rounded-[10px] px-1 py-2 text-[12px] font-semibold leading-tight transition duration-200',
                selected ? 'bg-white text-night shadow-card ring-1 ring-line' : 'text-slate-500 hover:text-night'
              )}
            >
              {item.label}
              <span className={cn('mt-1 min-w-5 rounded-full px-1.5 text-[11px] leading-[18px]', selected ? 'bg-sun-soft text-sun' : 'bg-slate-200/80 text-slate-500')}>{count}</span>
            </button>
          );
        })}
      </div>

      {visible.length === 0 && (
        <Card className="py-10 text-center">
          <p className="text-[16px] font-semibold">{activeTab.empty}</p>
          <p className="mt-1 text-[14px] text-slate-500">Les missions apparaîtront ici selon leur avancement.</p>
        </Card>
      )}

      {visible.map((mission, index) => (
        <MissionCard key={mission.id} mission={mission} index={index} onSelect={onSelect} />
      ))}
    </ScreenShell>
  );
}

function MissionCard({ mission, index, onSelect }: { mission: Mission; index: number; onSelect: (mission: Mission) => void }) {
  const route = [mission.origin, ...mission.stops.map((stop) => stop.ville)];
  const cancelled = mission.statut === 'refusee' || mission.statut === 'annulee';

  return (
    <button
      type="button"
      onClick={() => onSelect(mission)}
      style={{ animationDelay: `${index * 80}ms` }}
      className="group block w-full animate-fade-up rounded-card border border-line bg-white p-4 text-left shadow-card transition duration-200 hover:-translate-y-0.5 hover:border-slate-300 hover:shadow-raised active:scale-[0.99]"
    >
      <div className="flex items-center justify-between gap-3">
        <p className="flex items-center text-[13px] font-medium tabular-nums text-slate-500">
          Mission #{mission.id}
          {isGroupage(mission) && <span className="ml-2 rounded-md bg-slate-100 px-1.5 py-0.5 text-[11px] font-semibold text-slate-600 ring-1 ring-inset ring-line">Groupage</span>}
        </p>
        <StatusBadge status={mission.statut} />
      </div>

      <div className="mt-2.5 flex flex-wrap items-center gap-x-2 gap-y-1 text-[18px] font-semibold leading-tight tracking-[-0.02em]">
        {route.map((city, i) => (
          <span key={`${city}-${i}`} className="flex items-center gap-2">
            {i > 0 && <ArrowRight size={15} className="text-slate-300" />}
            {city}
          </span>
        ))}
      </div>

      {mission.categorie && (
        <p className="mt-2 text-[13px] font-medium text-slate-700">
          {mission.categorie} · {formatTonnes(mission.poids)}
        </p>
      )}

      <p className="mt-1.5 flex items-center gap-1.5 text-[13px] text-slate-500">
        <Clock size={14} />
        Départ prévu {mission.departPrevu}
      </p>

      {mission.echec && (
        <p className="mt-3 inline-flex items-center gap-1.5 rounded-full bg-danger-soft px-2.5 py-1 text-[12px] font-semibold text-danger">
          <TriangleAlert size={15} />
          Livraison en échec
        </p>
      )}

      {cancelled && (
        <div className="mt-3 rounded-[10px] bg-danger-soft px-3 py-2.5 text-[13px] text-danger">
          <span className="font-semibold">Motif : </span>
          {mission.motif ?? 'non précisé'}
        </div>
      )}

      <div className="mt-3.5 flex items-center justify-between border-t border-line pt-3 text-[13px] text-slate-500">
        <span>
          {totalPalettes(mission)} palettes{mission.typePalette ? ` ${mission.typePalette.startsWith('Palette Europe') ? 'Europe' : 'industrielles'}` : ''} · {mission.stops.length} livraison(s)
        </span>
        <span className="flex items-center gap-1.5 text-[15px] font-semibold tabular-nums text-night">
          <Banknote size={16} className="text-slate-400" />
          {formatMAD(mission.prix)}
        </span>
      </div>
    </button>
  );
}
