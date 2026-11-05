import { useState } from 'react';
import { Button } from '@/components/Button';
import { Card } from '@/components/Card';
import { NotificationBell } from '@/components/NotificationBell';
import { BottomNav } from '@/components/BottomNav';
import { ScreenHeader } from '@/components/ScreenHeader';
import { ScreenShell } from '@/components/ScreenShell';
import { TextField } from '@/components/TextField';
import type { Driver, ScreenId } from '@/lib/types';

interface ProfileScreenProps {
  driver: Driver;
  unread: number;
  goTo: (screen: ScreenId) => void;
  onSave: (driver: Driver) => void;
  notify: (message: string) => void;
}

export function ProfileScreen({ driver, unread, goTo, onSave, notify }: ProfileScreenProps) {
  const [draft, setDraft] = useState<Driver>(driver);
  const isDirty = (Object.keys(draft) as (keyof Driver)[]).some((key) => draft[key] !== driver[key]);
  const isComplete = (Object.values(draft) as string[]).every((value) => value.trim() !== '');

  const update = (key: keyof Driver) => (event: React.ChangeEvent<HTMLInputElement>) =>
    setDraft((prev) => ({ ...prev, [key]: event.target.value }));

  const save = () => {
    onSave({
      prenom: draft.prenom.trim(),
      nom: draft.nom.trim(),
      tracteur: draft.tracteur.trim().toUpperCase(),
      remorque: draft.remorque.trim().toUpperCase(),
    });
    notify('Profil enregistré');
  };

  return (
    <ScreenShell
      header={
        <ScreenHeader
          title="Profil"
          subtitle={`${driver.prenom} ${driver.nom}`}
          trailing={<NotificationBell unread={unread} onClick={() => goTo('notifications')} />}
        />
      }
      footer={<BottomNav active="profile" onSelect={goTo} />}
    >
      <Card className="space-y-4">
        <p className="text-sm font-bold uppercase tracking-wide text-slate-500">Identité</p>
        <TextField label="Prénom" value={draft.prenom} onChange={update('prenom')} autoComplete="given-name" />
        <TextField label="Nom" value={draft.nom} onChange={update('nom')} autoComplete="family-name" />
      </Card>

      <Card className="space-y-4">
        <p className="text-sm font-bold uppercase tracking-wide text-slate-500">Véhicule</p>
        <TextField
          label="Matricule tracteur"
          value={draft.tracteur}
          onChange={update('tracteur')}
          placeholder="ex. 12345-A-6"
        />
        <TextField
          label="Matricule remorque"
          value={draft.remorque}
          onChange={update('remorque')}
          placeholder="ex. 54321-B-7"
        />
      </Card>

      <Button disabled={!isDirty || !isComplete} onClick={save}>
        Enregistrer le profil
      </Button>
    </ScreenShell>
  );
}
