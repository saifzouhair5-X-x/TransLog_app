import { useState } from 'react';
import { Check } from 'lucide-react';
import { Button } from '@/components/Button';
import { Card } from '@/components/Card';
import { ScreenHeader } from '@/components/ScreenHeader';
import { ScreenShell } from '@/components/ScreenShell';
import { TextField } from '@/components/TextField';
import { currentTime } from '@/lib/format';
import type { ScreenProps } from '@/lib/types';

const SIMPLE_CHECKS = ['Pneumatiques', 'Éclairage et feux', 'Freins', 'Niveaux (huile, AdBlue)', 'Triangle et gilet', 'Extincteur'];

export function VehicleCheckScreen({ mission, updateMission, goTo, back, addAlert }: ScreenProps) {
  const [checked, setChecked] = useState<string[]>([]);
  const [km, setKm] = useState('');
  const [vidange, setVidange] = useState(false);
  const [visiteTechnique, setVisiteTechnique] = useState(false);
  const [visiteDate, setVisiteDate] = useState('');

  const allChecked = checked.length === SIMPLE_CHECKS.length && vidange && visiteTechnique;
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
      <Card className="divide-y divide-line p-0">
        {SIMPLE_CHECKS.map((item) => {
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

      <Card className="space-y-3">
        <CheckRow label="Vidange à jour" checked={vidange} onToggle={() => setVidange((v) => !v)} />
      </Card>

      <Card className="space-y-3">
        <CheckRow label="Visite technique valide" checked={visiteTechnique} onToggle={() => setVisiteTechnique((v) => !v)} />
        <TextField
          label="Date de la visite technique"
          value={visiteDate}
          onChange={(event) => setVisiteDate(event.target.value)}
          placeholder="ex. 15/01/2027"
        />
        {visiteTechnique && visiteDate.trim() && (
          <p className="text-sm font-semibold text-success">Valide jusqu'au {visiteDate.trim()}</p>
        )}
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

function CheckRow({ label, checked, onToggle }: { label: string; checked: boolean; onToggle: () => void }) {
  return (
    <button
      type="button"
      role="checkbox"
      aria-checked={checked}
      onClick={onToggle}
      className="flex w-full items-center justify-between gap-3 text-left transition duration-150 active:scale-[0.99]"
    >
      <span className="text-[17px] font-semibold">{label}</span>
      <span
        className={
          checked
            ? 'flex h-7 w-7 items-center justify-center rounded-full bg-success text-white'
            : 'h-7 w-7 rounded-full border-2 border-slate-300'
        }
      >
        {checked && <Check size={16} strokeWidth={3} />}
      </span>
    </button>
  );
}
