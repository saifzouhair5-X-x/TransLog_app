import { useState } from 'react';
import { Button } from '@/components/Button';
import { Card } from '@/components/Card';
import { Choice } from '@/components/Choice';
import { ScreenHeader } from '@/components/ScreenHeader';
import { ScreenShell } from '@/components/ScreenShell';
import { TextField } from '@/components/TextField';
import type { ScreenProps } from '@/lib/types';

const INCIDENT_TYPES = ['Panne mécanique', 'Accident', 'Retard de trafic', 'Contrôle routier', 'Autre'];

export function IncidentScreen({ mission, goTo, back, addAlert }: ScreenProps) {
  const [type, setType] = useState<string | null>(null);
  const [position, setPosition] = useState(mission.localisation);
  const [blocking, setBlocking] = useState<boolean | null>(null);

  const canSend = type !== null && position.trim() !== '' && blocking !== null;

  const send = () => {
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
        <Card className="space-y-2 p-3">
          {INCIDENT_TYPES.map((item) => (
            <Choice key={item} selected={type === item} tone="danger" align="start" onClick={() => setType(item)}>
              {item}
            </Choice>
          ))}
        </Card>
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
