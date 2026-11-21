import { useEffect } from 'react';
import { Card } from '@/components/Card';
import { ScreenHeader } from '@/components/ScreenHeader';
import { ScreenShell } from '@/components/ScreenShell';
import type { Alert } from '@/lib/types';
import { Bell } from 'lucide-react';

interface NotificationsScreenProps {
  alerts: Alert[];
  onMarkAllRead: () => void;
  back: () => void;
}

export function NotificationsScreen({ alerts, onMarkAllRead, back }: NotificationsScreenProps) {
  useEffect(() => {
    onMarkAllRead();
  }, [onMarkAllRead]);

  return (
    <ScreenShell
      header={<ScreenHeader title="Notifications" subtitle={`${alerts.length} alerte(s)`} onBack={back} />}
    >
      {alerts.length === 0 && (
        <Card className="flex flex-col items-center py-10 text-center">
          <Bell size={32} className="text-slate-400" />
          <p className="mt-3 text-lg font-semibold">Aucune notification</p>
          <p className="mt-1 text-[15px] text-slate-500">Les alertes de vos missions apparaîtront ici.</p>
        </Card>
      )}

      {alerts.map((alert) => (
        <Card
          key={alert.id}
          className={`space-y-1 ${alert.lu ? '' : 'border-l-4 border-l-sun'}`}
        >
          <div className="flex items-center justify-between gap-3">
            <p className="text-[17px] font-semibold">{alert.titre}</p>
            <span className="shrink-0 text-sm text-slate-500">{alert.heure}</span>
          </div>
          <p className="text-[15px] text-slate-600">{alert.texte}</p>
          <p className="text-sm font-semibold text-slate-500">Mission #{alert.missionId}</p>
        </Card>
      ))}
    </ScreenShell>
  );
}
