import { TriangleAlert } from 'lucide-react';
import { useState } from 'react';
import { Button } from '@/components/Button';
import { Card } from '@/components/Card';
import { NotificationBell } from '@/components/NotificationBell';
import { BottomNav } from '@/components/BottomNav';
import { ScreenHeader } from '@/components/ScreenHeader';
import { ScreenShell } from '@/components/ScreenShell';
import { TextField } from '@/components/TextField';
import { cn } from '@/lib/cn';
import type { Driver, ScreenId } from '@/lib/types';

interface ProfileScreenProps {
  driver: Driver;
  unread: number;
  goTo: (screen: ScreenId) => void;
  onSave: (driver: Driver) => void;
  notify: (message: string) => void;
}

const MS_PER_DAY = 86_400_000;

function daysUntil(dateStr: string): number {
  const target = new Date(dateStr).getTime();
  return Math.ceil((target - Date.now()) / MS_PER_DAY);
}

function formatDate(dateStr: string): string {
  if (!dateStr) return '—';
  const [y, m, d] = dateStr.split('-');
  return `${d}/${m}/${y}`;
}

export function ProfileScreen({ driver, unread, goTo, onSave, notify }: ProfileScreenProps) {
  const [draft, setDraft] = useState<Driver>(driver);
  const isDirty = (Object.keys(draft) as (keyof Driver)[]).some((key) => draft[key] !== driver[key]);
  const isComplete = (Object.values(draft) as string[]).every((value) => value.trim() !== '');

  const update = (key: keyof Driver) => (event: React.ChangeEvent<HTMLInputElement>) =>
    setDraft((prev) => ({ ...prev, [key]: event.target.value }));

  const permitDays = daysUntil(draft.permisExpiry);
  const visaDays = daysUntil(draft.visaExpiry);
  const permitExpiring = permitDays < 30;
  const visaExpiring = visaDays < 30;

  const save = () => {
    onSave({
      ...draft,
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
      <Card className="space-y-3">
        <div className="flex items-center justify-between gap-3">
          <p className="text-sm font-bold uppercase tracking-wide text-slate-500">Type de chauffeur</p>
          <span
            className={cn(
              'inline-flex items-center rounded-full px-3 py-1 text-sm font-semibold ring-1 ring-inset',
              driver.type === 'salarie'
                ? 'bg-slate-100 text-slate-700 ring-slate-300'
                : 'bg-sun-soft text-[#7A5600] ring-sun/50'
            )}
          >
            {driver.type === 'salarie' ? 'Salarié' : 'Indépendant'}
          </span>
        </div>
        {driver.type === 'salarie' && driver.transporteur && (
          <p className="text-[15px] text-slate-600">
            Employé par <span className="font-semibold text-night">{driver.transporteur}</span>
          </p>
        )}
        {driver.type === 'independant' && (
          <p className="text-[15px] text-slate-600">Propriétaire de son camion, missions au choix.</p>
        )}
      </Card>

      <Card className="space-y-4">
        <p className="text-sm font-bold uppercase tracking-wide text-slate-500">Identité</p>
        <TextField label="Prénom" value={draft.prenom} onChange={update('prenom')} autoComplete="given-name" />
        <TextField label="Nom" value={draft.nom} onChange={update('nom')} autoComplete="family-name" />
        <TextField
          label="Numéro de téléphone"
          value={draft.telephone}
          onChange={update('telephone')}
          placeholder="+212 6 12 34 56 78"
          inputMode="tel"
        />
        <TextField
          label="N° de CIN"
          value={draft.cin}
          onChange={update('cin')}
          placeholder="AB123456"
        />
      </Card>

      <Card className="space-y-4">
        <p className="text-sm font-bold uppercase tracking-wide text-slate-500">Permis de conduire</p>
        <TextField
          label="N° de permis"
          value={draft.permis}
          onChange={update('permis')}
          placeholder="MA-1234567"
        />
        <TextField
          label="Date d'expiration"
          value={draft.permisExpiry}
          onChange={update('permisExpiry')}
          placeholder="AAAA-MM-JJ"
        />
        <p className="text-sm text-slate-500">Expire le {formatDate(draft.permisExpiry)}</p>
        {permitExpiring && (
          <div className="flex items-center gap-2 rounded-card bg-sun-soft px-3 py-2.5 text-[15px] font-semibold text-[#7A5600]">
            <TriangleAlert size={18} />
            {permitDays < 0
              ? 'Permis expiré !'
              : `Permis expire dans ${permitDays} jour${permitDays > 1 ? 's' : ''}`}
          </div>
        )}
      </Card>

      <Card className="space-y-4">
        <p className="text-sm font-bold uppercase tracking-wide text-slate-500">Visa / Séjour</p>
        <TextField
          label="N° de visa"
          value={draft.visa}
          onChange={update('visa')}
          placeholder="V-2025-00000"
        />
        <TextField
          label="Date d'expiration"
          value={draft.visaExpiry}
          onChange={update('visaExpiry')}
          placeholder="AAAA-MM-JJ"
        />
        <p className="text-sm text-slate-500">Expire le {formatDate(draft.visaExpiry)}</p>
        {visaExpiring && (
          <div className="flex items-center gap-2 rounded-card bg-sun-soft px-3 py-2.5 text-[15px] font-semibold text-[#7A5600]">
            <TriangleAlert size={18} />
            {visaDays < 0
              ? 'Visa expiré !'
              : `Visa expire dans ${visaDays} jour${visaDays > 1 ? 's' : ''}`}
          </div>
        )}
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
