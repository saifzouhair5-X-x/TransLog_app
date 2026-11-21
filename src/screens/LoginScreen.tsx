import { ShieldCheck, Truck } from 'lucide-react';
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
    <div className="flex h-full flex-col bg-white">
      <header className="shrink-0 px-6 pt-3">
        <StatusBar tone="light" />
        <div className="mt-6 flex items-center gap-2.5 animate-fade-up">
          <div className="flex h-9 w-9 items-center justify-center rounded-[10px] bg-night text-white">
            <Truck size={19} strokeWidth={2.2} />
          </div>
          <p className="text-[17px] font-semibold tracking-[-0.02em]">TransLog</p>
          <span className="rounded-full bg-slate-100 px-2 py-0.5 text-[11px] font-semibold text-slate-600">Chauffeur</span>
        </div>
      </header>

      <form onSubmit={handleSubmit} className="no-scrollbar flex flex-1 flex-col overflow-y-auto px-6 pt-10 animate-fade-up">
        <div>
          <h1 className="text-[30px] font-semibold leading-tight tracking-[-0.03em]">Bienvenue</h1>
          <p className="mt-2 text-[15px] leading-relaxed text-slate-500">
            Connectez-vous pour voir vos missions, vos documents et vos alertes.
          </p>
        </div>

        <div className="mt-8 space-y-2.5">
          <p className="text-[13px] font-semibold text-slate-700">Profil (démo)</p>
          <div className="grid grid-cols-2 gap-2.5">
            <Choice selected={driverType === 'salarie'} align="start" onClick={() => onSelectType('salarie')}>
              <span className="flex flex-col gap-0.5">
                <span className="text-[15px] font-semibold">Salarié</span>
                <span className={cn('text-[12px] font-normal', driverType === 'salarie' ? 'text-sun' : 'text-slate-500')}>
                  Employé par un transporteur
                </span>
              </span>
            </Choice>
            <Choice selected={driverType === 'independant'} align="start" onClick={() => onSelectType('independant')}>
              <span className="flex flex-col gap-0.5">
                <span className="text-[15px] font-semibold">Indépendant</span>
                <span className={cn('text-[12px] font-normal', driverType === 'independant' ? 'text-sun' : 'text-slate-500')}>
                  Propre camion, missions au choix
                </span>
              </span>
            </Choice>
          </div>
        </div>

        <div className="mt-6 space-y-4">
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

        <p className="mt-auto flex items-center justify-center gap-1.5 pb-8 pt-6 text-center text-[13px] text-slate-500">
          <ShieldCheck size={15} className="shrink-0 text-slate-400" />
          Un problème de connexion ? Contactez votre exploitant.
        </p>
      </form>
    </div>
  );
}
