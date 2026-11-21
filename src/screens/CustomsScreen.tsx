import { Check, X } from 'lucide-react';
import type { ReactNode } from 'react';
import { BottomNav } from '@/components/BottomNav';
import { Card } from '@/components/Card';
import { NotificationBell } from '@/components/NotificationBell';
import { ScreenHeader } from '@/components/ScreenHeader';
import { ScreenShell } from '@/components/ScreenShell';
import { cn } from '@/lib/cn';
import { CUSTOMS_STEPS } from '@/data/customs';
import type { CustomsCheck, CustomsStepId, Mission, ScreenId } from '@/lib/types';

interface CustomsScreenProps {
  missions: Mission[];
  unread: number;
  goTo: (screen: ScreenId) => void;
  onUpdate: (missionId: string, patch: Partial<Mission>) => void;
  onAddAlert: (missionId: string, titre: string, texte: string) => void;
}

const CUSTOMS_MISSION_STATUSES: Mission['statut'][] = ['acceptee', 'en_cours', 'livree', 'cloturee'];

export function CustomsScreen({ missions, unread, goTo, onUpdate, onAddAlert }: CustomsScreenProps) {
  const customsMissions = missions.filter((mission) => CUSTOMS_MISSION_STATUSES.includes(mission.statut));

  const setCheck = (mission: Mission, step: CustomsStepId, value: Exclude<CustomsCheck, null>) => {
    const next: CustomsCheck = mission.customs[step] === value ? null : value;
    onUpdate(mission.id, { customs: { ...mission.customs, [step]: next } });
    if (step === 'douane_arrivee' && next === 'ok') {
      onAddAlert(mission.id, 'Passage en douane', `Mission #${mission.id} : douane d’arrivée validée.`);
    }
  };

  return (
    <ScreenShell
      header={
        <ScreenHeader
          title="Douane"
          subtitle="Check-list par mission"
          trailing={<NotificationBell unread={unread} onClick={() => goTo('notifications')} />}
        />
      }
      footer={<BottomNav active="customs" onSelect={goTo} />}
    >
      {customsMissions.length === 0 && (
        <Card className="py-10 text-center">
          <p className="text-lg font-semibold">Aucune mission en douane</p>
          <p className="mt-1 text-[15px] text-slate-500">Les missions acceptées apparaîtront ici.</p>
        </Card>
      )}

      {customsMissions.map((mission) => {
        const done = CUSTOMS_STEPS.filter((step) => mission.customs[step.id] === 'ok').length;
        return (
          <Card key={mission.id} className="space-y-3 p-4">
            <div className="flex items-center justify-between gap-3">
              <div className="min-w-0">
                <p className="text-sm font-semibold text-slate-500">Mission #{mission.id}</p>
                <p className="truncate text-[18px] font-semibold">
                  {mission.origin} → {mission.destination}
                </p>
              </div>
              <span className="shrink-0 rounded-full bg-slate-100 px-3 py-1 text-sm font-semibold text-slate-700">
                {done} / {CUSTOMS_STEPS.length}
              </span>
            </div>

            <ul className="divide-y divide-line">
              {CUSTOMS_STEPS.map((step) => {
                const value = mission.customs[step.id];
                return (
                  <li key={step.id} className="flex items-center justify-between gap-3 py-2.5">
                    <span className={cn('text-[16px]', value === 'ko' ? 'text-danger' : 'text-night')}>{step.label}</span>
                    <div className="flex shrink-0 gap-2">
                      <CheckButton
                        label={`${step.label} validé`}
                        active={value === 'ok'}
                        tone="success"
                        onClick={() => setCheck(mission, step.id, 'ok')}
                      >
                        <Check size={18} strokeWidth={2.6} />
                      </CheckButton>
                      <CheckButton
                        label={`${step.label} en échec`}
                        active={value === 'ko'}
                        tone="danger"
                        onClick={() => setCheck(mission, step.id, 'ko')}
                      >
                        <X size={18} strokeWidth={2.6} />
                      </CheckButton>
                    </div>
                  </li>
                );
              })}
            </ul>
          </Card>
        );
      })}
    </ScreenShell>
  );
}

function CheckButton({
  label,
  active,
  tone,
  onClick,
  children,
}: {
  label: string;
  active: boolean;
  tone: 'success' | 'danger';
  onClick: () => void;
  children: ReactNode;
}) {
  return (
    <button
      type="button"
      aria-label={label}
      aria-pressed={active}
      onClick={onClick}
      className={cn(
        'flex h-9 w-9 items-center justify-center rounded-full border-2 transition duration-150 active:scale-90',
        active && tone === 'success' && 'border-success bg-success text-white',
        active && tone === 'danger' && 'border-danger bg-danger text-white',
        !active && 'border-slate-300 text-slate-400 hover:border-night hover:text-night'
      )}
    >
      {children}
    </button>
  );
}
