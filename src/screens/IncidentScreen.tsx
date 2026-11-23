import { useState } from 'react';
import {
  Ban,
  Boxes,
  Clock,
  PackageMinus,
  PackageX,
  ShieldAlert,
  Thermometer,
  TriangleAlert,
  Wrench,
  type LucideIcon,
} from 'lucide-react';
import { Button } from '@/components/Button';
import { Choice } from '@/components/Choice';
import { ScreenHeader } from '@/components/ScreenHeader';
import { ScreenShell } from '@/components/ScreenShell';
import { TextField } from '@/components/TextField';
import { currentTime } from '@/lib/format';
import type { ScreenProps } from '@/lib/types';

interface IncidentType {
  label: string;
  description: string;
  icon: LucideIcon;
}

const INCIDENT_TYPES: IncidentType[] = [
  { label: 'Retard', description: 'Bouchon, attente ou route fermée', icon: Clock },
  { label: 'Panne', description: 'Problème mécanique du camion', icon: Wrench },
  { label: 'Accident', description: 'Collision ou sortie de route', icon: TriangleAlert },
  { label: 'Marchandise endommagée', description: 'Colis ou palettes cassés, abîmés', icon: PackageX },
  { label: 'Marchandise manquante', description: 'Palettes ou colis en moins', icon: PackageMinus },
  { label: 'Mal arrimée', description: 'Le chargement bouge, sangles lâches', icon: Boxes },
  { label: 'Rupture de froid', description: 'Température hors norme (frigo)', icon: Thermometer },
  { label: 'Vol', description: 'Marchandise ou matériel volé', icon: ShieldAlert },
  { label: 'Refus du destinataire', description: 'Le client refuse la livraison', icon: Ban },
];

export function IncidentScreen({ mission, goTo, back, addAlert, updateMission }: ScreenProps) {
  const [type, setType] = useState<string | null>(null);
  const [position, setPosition] = useState(mission.localisation);
  const [blocking, setBlocking] = useState<boolean | null>(null);

  const canSend = type !== null && position.trim() !== '' && blocking !== null;

  const send = () => {
    if (!type) return;
    const incident = {
      id: `inc-${Date.now()}`,
      type,
      position: position.trim(),
      blocking: blocking ?? false,
      heure: currentTime(),
    };
    updateMission({ incidents: [...mission.incidents, incident] });
    addAlert('Incident déclaré', `${type} signalé sur la mission #${mission.id} (${position.trim()}).`);
    goTo('trip');
  };

  return (
    <ScreenShell
      header={<ScreenHeader title="Déclarer un incident" subtitle={`Mission #${mission.id}`} onBack={back} />}
      footer={
        <Button variant="danger-solid" disabled={!canSend} onClick={send}>
          Envoyer la déclaration
        </Button>
      }
    >
      <section className="space-y-2">
        <h2 className="px-1 text-[12px] font-semibold uppercase tracking-[0.06em] text-slate-500">Type d’incident</h2>
        <div className="space-y-2">
          {INCIDENT_TYPES.map((item) => {
            const Icon = item.icon;
            const selected = type === item.label;
            return (
              <button
                key={item.label}
                type="button"
                aria-pressed={selected}
                onClick={() => setType(item.label)}
                className={
                  'flex w-full items-center gap-3 rounded-xl border px-3 py-3 text-left transition duration-150 active:scale-[0.99] ' +
                  (selected
                    ? 'border-danger bg-danger-soft ring-1 ring-danger'
                    : 'border-line bg-white hover:border-slate-300 hover:bg-slate-50')
                }
              >
                <span
                  className={
                    'flex h-10 w-10 shrink-0 items-center justify-center rounded-lg ' +
                    (selected ? 'bg-danger text-white' : 'bg-slate-100 text-slate-700')
                  }
                >
                  <Icon size={20} strokeWidth={2} />
                </span>
                <span className="min-w-0">
                  <span className={'block text-[15px] font-semibold leading-tight ' + (selected ? 'text-danger' : 'text-night')}>
                    {item.label}
                  </span>
                  <span className="mt-0.5 block text-[13px] leading-snug text-slate-500">{item.description}</span>
                </span>
              </button>
            );
          })}
        </div>
      </section>

      <TextField label="Position" value={position} onChange={(event) => setPosition(event.target.value)} />

      <section className="space-y-2">
        <h2 className="px-1 text-[12px] font-semibold uppercase tracking-[0.06em] text-slate-500">Panne bloquante ?</h2>
        <div className="grid grid-cols-2 gap-3">
          <Choice selected={blocking === true} tone="danger" onClick={() => setBlocking(true)}>
            Oui
          </Choice>
          <Choice selected={blocking === false} tone="success" onClick={() => setBlocking(false)}>
            Non
          </Choice>
        </div>
      </section>
    </ScreenShell>
  );
}
