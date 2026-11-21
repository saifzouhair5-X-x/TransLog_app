import { MapPin } from 'lucide-react';
import { Button } from '@/components/Button';
import { Card } from '@/components/Card';
import { ScreenHeader } from '@/components/ScreenHeader';
import { ScreenShell } from '@/components/ScreenShell';
import type { ScreenProps } from '@/lib/types';

export function LoadingArrivalScreen({ mission, updateMission, goTo, back }: ScreenProps) {
  const arrive = () => {
    updateMission({ etape: 'goods-check' });
    goTo('goods-check');
  };

  return (
    <ScreenShell
      header={<ScreenHeader title="Arrivée au chargement" subtitle={`Mission #${mission.id}`} onBack={back} />}
      footer={<Button onClick={arrive}>Je suis arrivé</Button>}
    >
      <Card className="space-y-3">
        <p className="text-[12px] font-semibold uppercase tracking-[0.06em] text-slate-500">Site de chargement</p>
        <p className="text-[20px] font-semibold leading-tight">{mission.loadingSite}</p>
        <p className="flex items-start gap-2 text-[16px] text-slate-600">
          <MapPin size={18} className="mt-0.5 shrink-0" />
          {mission.loadingAddress}
        </p>
      </Card>

      <Card className="divide-y divide-line p-0">
        <div className="flex items-center justify-between gap-4 p-4">
          <span className="text-[15px] text-slate-500">Marchandise</span>
          <span className="text-right text-[17px] font-semibold">{mission.goods}</span>
        </div>
        <div className="flex items-center justify-between gap-4 p-4">
          <span className="text-[15px] text-slate-500">Départ prévu</span>
          <span className="text-right text-[17px] font-semibold">{mission.departPrevu}</span>
        </div>
      </Card>
    </ScreenShell>
  );
}
