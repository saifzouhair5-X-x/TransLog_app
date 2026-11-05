import { useState } from 'react';
import { Check } from 'lucide-react';
import { Button } from '@/components/Button';
import { Card } from '@/components/Card';
import { ScreenHeader } from '@/components/ScreenHeader';
import { ScreenShell } from '@/components/ScreenShell';
import { TextField } from '@/components/TextField';
import { currentTime } from '@/lib/format';
import type { ScreenProps } from '@/lib/types';

const CHECKS = ['Pneumatiques', 'Éclairage et feux', 'Freins', 'Niveaux (huile, AdBlue)', 'Triangle et gilet', 'Extincteur'];

export function VehicleCheckScreen({ mission, updateMission, goTo, back, addAlert }: ScreenProps) {
  const [checked, setChecked] = useState<string[]>([]);
  const [km, setKm] = useState('');

  const allChecked = checked.length === CHECKS.length;
  const kmValid = /^\d+$/.test(km.trim());
  const canLeave = allChecked && kmValid;

  const toggle = (item: string) =>
    setChecked((prev) => (prev.includes(item) ? prev.filter((value) => value !== item) : [...prev, item]));

  const leave = () => {
    updateMission({ statut: 'en_cours', kmDepart: Number(km), departAt: currentTime(), etape: 'loading-arrival' });
    addAlert('Départ', `Le camion a quitté le dépôt pour la mission #${mission.id}.`);
    goTo('loading-arrival');
  };

  return (
    <ScreenShell
      header={<ScreenHeader title="Contrôle du véhicule" subtitle={`Mission #${mission.id}`} onBack={back} />}
      footer={
        <Button disabled={!canLeave} onClick={leave}>
          Valider et partir
        </Button>
      }
    >
      <Card className="divide-y divide-slate-200 p-0">
        {CHECKS.map((item) => {
          const isChecked = checked.includes(item);
          return (
            <button
              key={item}
              type="button"
              role="checkbox"
              aria-checked={isChecked}
              onClick={() => toggle(item)}
              className="flex w-full items-center justify-between gap-3 p-4 text-left transition duration-150 hover:bg-slate-50 active:scale-[0.99]"
            >
              <span className="text-[17px] font-semibold">{item}</span>
              <span
                className={
                  isChecked
                    ? 'flex h-7 w-7 items-center justify-center rounded-full bg-success text-white'
                    : 'h-7 w-7 rounded-full border-2 border-slate-300'
                }
              >
                {isChecked && <Check size={16} strokeWidth={3} />}
              </span>
            </button>
          );
        })}
      </Card>

      <TextField
        label="Kilométrage au départ"
        suffix="km"
        inputMode="numeric"
        placeholder="ex. 128450"
        value={km}
        onChange={(event) => setKm(event.target.value)}
      />
    </ScreenShell>
  );
}
