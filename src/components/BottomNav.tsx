import { ClipboardList, Landmark, LayoutDashboard, UserRound } from 'lucide-react';
import { cn } from '@/lib/cn';
import type { ScreenId } from '@/lib/types';

export type TabScreen = Extract<ScreenId, 'missions' | 'dashboard' | 'customs' | 'profile'>;

const TABS: { id: TabScreen; label: string; icon: typeof ClipboardList }[] = [
  { id: 'missions', label: 'Missions', icon: ClipboardList },
  { id: 'dashboard', label: 'Tableau de bord', icon: LayoutDashboard },
  { id: 'customs', label: 'Douane', icon: Landmark },
  { id: 'profile', label: 'Profil', icon: UserRound },
];

interface BottomNavProps {
  active: TabScreen;
  onSelect: (tab: TabScreen) => void;
}

export function BottomNav({ active, onSelect }: BottomNavProps) {
  return (
    <nav aria-label="Navigation principale" className="grid grid-cols-4 gap-1">
      {TABS.map(({ id, label, icon: Icon }) => {
        const isActive = id === active;
        return (
          <button
            key={id}
            type="button"
            onClick={() => onSelect(id)}
            aria-current={isActive ? 'page' : undefined}
            className={cn(
              'flex flex-col items-center gap-1 rounded-card py-1.5 text-xs font-semibold transition duration-200 active:scale-95',
              isActive ? 'text-night' : 'text-slate-500 hover:text-night'
            )}
          >
            <span
              className={cn(
                'flex h-8 w-12 items-center justify-center rounded-full transition duration-200',
                isActive ? 'bg-sun text-night' : 'bg-transparent'
              )}
            >
              <Icon size={22} strokeWidth={2.2} />
            </span>
            {label}
          </button>
        );
      })}
    </nav>
  );
}
