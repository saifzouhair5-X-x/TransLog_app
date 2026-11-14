import { useState } from 'react';
import {
  Clock,
  Wrench,
  CarFront,
  PackageX,
  PackageMinus,
  Anchor,
  Snowflake,
  ShieldAlert,
  Banknote,
  type LucideIcon,
} from 'lucide-react';
import { Button } from '@/components/Button';
import { Card } from '@/components/Card';
import { Choice } from '@/components/Choice';
import { ScreenHeader } from '@/components/ScreenHeader';
import { ScreenShell } from '@/components/ScreenShell';
import { TextField } from '@/components/TextField';
import { currentTime } from '@/lib/format';
import type { ScreenProps } from '@/lib/types';

interface IncidentType {
  label: string;
  icon: LucideIcon;
}

const INCIDENT_TYPES: IncidentType[] = [
  { label: 'Retard', icon: Clock },
  { label: 'Panne', icon: Wrench },
  { label: 'Accident', icon: CarFront },
  { label: 'Marchandise endommagée', icon: PackageX },
  { label: 'Marchandise manquante', icon: PackageMinus },
  { label: 'Mal arrimée', icon: Anchor },
  { label: 'Rupture de froid', icon: Snowflake },
  { label: 'Vol', icon: ShieldAlert },
  { label: 'Refus du destinataire', icon: Banknote },
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
        <h2 className="px-1 text-sm font-bold uppercase tracking-wide text-slate-500">Type d’incident</h2>
        <div className="grid grid-cols-3 gap-2">
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
                  'flex flex-col items-center gap-2 rounded-card border-2 px-2 py-4 text-center transition duration-150 active:scale-[0.97] ' +
                  (selected
                    ? 'border-danger bg-danger-soft text-danger'
                    : 'border-slate-300 bg-white text-night hover:border-slate-400')
                }
              >
                <Icon size={28} strokeWidth={2.2} />
                <span className="text-[13px] font-semibold leading-tight">{item.label}</span>
              </button>
            );
          })}
        </div>
      </section>

      <TextField label="Position" value={position} onChange={(event) => setPosition(event.target.value)} />

      <section className="space-y-2">
        <h2 className="px-1 text-sm font-bold uppercase tracking-wide text-slate-500">Panne bloquante ?</h2>
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
