import { useState } from 'react';
import { Button } from '@/components/Button';
import { Card } from '@/components/Card';
import { Choice } from '@/components/Choice';
import { ScreenHeader } from '@/components/ScreenHeader';
import { ScreenShell } from '@/components/ScreenShell';
import { totalPalettes } from '@/lib/missions';
import { currentTime } from '@/lib/format';
import type { ScreenProps } from '@/lib/types';

const GOODS_CHECKS = ['Nombre de palettes conforme', 'Emballages intacts', 'Étiquetage conforme'];

export function GoodsCheckScreen({ mission, updateMission, goTo, back, addAlert }: ScreenProps) {
  const [checked, setChecked] = useState<string[]>([]);

  const toggle = (item: string) =>
    setChecked((prev) => (prev.includes(item) ? prev.filter((value) => value !== item) : [...prev, item]));

  const conforme = () => {
    updateMission({ chargeAt: currentTime(), etape: 'documents' });
    addAlert('Marchandise en chargement', `Chargement terminé pour la mission #${mission.id} (${totalPalettes(mission)} palettes).`);
    goTo('documents');
  };

  const nonConforme = () => {
    updateMission({ etape: 'loading-reserves' });
    goTo('loading-reserves');
  };

  return (
    <ScreenShell
      header={<ScreenHeader title="Contrôle marchandise" subtitle={`${totalPalettes(mission)} palettes · ${mission.goods}`} onBack={back} />}
      footer={
        <div className="grid grid-cols-2 gap-3">
          <Button variant="danger" onClick={nonConforme}>
            Non conforme
          </Button>
          <Button variant="success" onClick={conforme}>
            Conforme
          </Button>
        </div>
      }
    >
      <Card className="space-y-2 p-3">
        {GOODS_CHECKS.map((item) => (
          <Choice key={item} selected={checked.includes(item)} tone="success" align="start" onClick={() => toggle(item)}>
            {item}
          </Choice>
        ))}
      </Card>
    </ScreenShell>
  );
}
