import { Truck } from 'lucide-react';
import { useState, type FormEvent } from 'react';
import { Button } from '@/components/Button';
import { Choice } from '@/components/Choice';
import { StatusBar } from '@/components/ScreenHeader';
import { TextField } from '@/components/TextField';
import type { DriverType, ScreenId } from '@/lib/types';
import { cn } from '@/lib/cn';

interface LoginScreenProps {
  goTo: (screen: ScreenId) => void;
  driverType: DriverType;
  onSelectType: (type: DriverType) => void;
}

export function LoginScreen({ goTo, driverType, onSelectType }: LoginScreenProps) {
  const [identifiant, setIdentifiant] = useState('');
  const [motDePasse, setMotDePasse] = useState('');
  const canSubmit = identifiant.trim() !== '' && motDePasse !== '';

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (canSubmit) goTo('missions');
  };

  return (
    <div className="flex h-full flex-col bg-canvas">
      <header className="shrink-0 bg-night px-6 pb-12 pt-3 text-white">
        <StatusBar tone="dark" />
        <div className="mt-8 flex flex-col items-start gap-5 animate-fade-up">
          <div className="flex h-16 w-16 items-center justify-center rounded-card bg-sun text-night shadow-lg">
            <Truck size={34} strokeWidth={2.2} />
          </div>
          <div>
            <p className="text-[34px] font-bold leading-none tracking-tight">TransLog</p>
            <p className="mt-2 text-lg text-slate-300">Espace chauffeur</p>
          </div>
        </div>
      </header>

      <form onSubmit={handleSubmit} className="flex flex-1 flex-col px-6 pt-8 animate-fade-up overflow-y-auto no-scrollbar">
        <div className="space-y-3">
          <p className="text-sm font-bold uppercase tracking-wide text-slate-500">Type de chauffeur (démo)</p>
          <div className="grid grid-cols-2 gap-3">
            <Choice
              selected={driverType === 'salarie'}
              align="start"
              onClick={() => onSelectType('salarie')}
            >
              <span className="flex flex-col gap-0.5">
                <span className="text-[16px] font-bold">Salarié</span>
                <span className={cn('text-xs font-normal', driverType === 'salarie' ? 'text-[#7A5600]' : 'text-slate-500')}>
                  Employé par un transporteur
                </span>
              </span>
            </Choice>
            <Choice
              selected={driverType === 'independant'}
              align="start"
              onClick={() => onSelectType('independant')}
            >
              <span className="flex flex-col gap-0.5">
                <span className="text-[16px] font-bold">Indépendant</span>
                <span className={cn('text-xs font-normal', driverType === 'independant' ? 'text-[#7A5600]' : 'text-slate-500')}>
                  Propre camion, missions au choix
                </span>
              </span>
            </Choice>
          </div>
        </div>

        <div className="mt-6 space-y-5">
          <TextField
            label="Identifiant chauffeur"
            placeholder={driverType === 'salarie' ? 'ex. K.BENALI' : 'ex. Y.MANSOURI'}
            autoComplete="username"
            value={identifiant}
            onChange={(event) => setIdentifiant(event.target.value)}
          />
          <TextField
            label="Mot de passe"
            type="password"
            placeholder="••••••••"
            autoComplete="current-password"
            value={motDePasse}
            onChange={(event) => setMotDePasse(event.target.value)}
          />
        </div>

        <div className="mt-8">
          <Button type="submit" disabled={!canSubmit}>
            Se connecter
          </Button>
        </div>

        <p className="mt-auto pb-8 pt-6 text-center text-[15px] text-slate-500">
          Un problème de connexion ? Contactez votre exploitant.
        </p>
      </form>
    </div>
  );
}
