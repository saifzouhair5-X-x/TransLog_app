import { Camera, CircleCheck, CircleDashed } from 'lucide-react';
import { useRef } from 'react';
import { Button } from '@/components/Button';
import { Card } from '@/components/Card';
import { InfoBanner } from '@/components/InfoBanner';
import { ScreenHeader } from '@/components/ScreenHeader';
import { ScreenShell } from '@/components/ScreenShell';
import { documentsForMission, lettreDeVoiture } from '@/data/documents';
import { currentTime } from '@/lib/format';
import type { DocumentId, ScreenProps } from '@/lib/types';

export function DocumentsScreen({ mission, updateMission, goTo, back, notify, addAlert }: ScreenProps) {
  const docs = documentsForMission(mission);
  const scannedCount = docs.filter((doc) => mission.documents[doc.id] !== null).length;
  const lettre = lettreDeVoiture(mission);
  const canValidate = mission.documents[lettre.id] !== null;

  const scan = (id: DocumentId) => {
    updateMission({ documents: { ...mission.documents, [id]: currentTime() } });
    notify('Document scanné');
  };

  const validate = () => {
    updateMission({ documentsAt: currentTime(), etape: 'trip' });
    addAlert('Documents scannés', `${scannedCount} / ${docs.length} document(s) scanné(s) pour la mission #${mission.id}.`);
    goTo('trip');
  };

  return (
    <ScreenShell
      header={<ScreenHeader title="Documents" subtitle={`Mission #${mission.id}, scan des pièces`} onBack={back} />}
      footer={
        <Button disabled={!canValidate} onClick={validate}>
          Valider les documents
        </Button>
      }
    >
      <InfoBanner>
        {mission.type === 'internationale'
          ? 'Mission internationale : la CMR est obligatoire, avec le carnet TIR, la DUM et l’EUR.1 pour la douane.'
          : 'Mission au Maroc : le bon de livraison (BL) est obligatoire.'}
        {mission.agroalimentaire && ' Marchandise agroalimentaire : certificat phytosanitaire demandé.'}
      </InfoBanner>

      <Card className="divide-y divide-line p-0">
        {docs.map((doc) => (
          <DocumentRow
            key={doc.id}
            label={doc.label}
            detail={doc.detail}
            fileName={mission.documents[doc.id]}
            onScan={() => scan(doc.id)}
          />
        ))}
      </Card>

      <p className="rounded-card border border-line bg-white px-4 py-3 text-center text-[14px] font-medium text-slate-600">
        {mission.type === 'internationale' ? 'Copie de la CMR conservée par le chauffeur' : 'Copie du BL conservée par le chauffeur'}
      </p>
    </ScreenShell>
  );
}

function DocumentRow({
  label,
  detail,
  fileName,
  onScan,
}: {
  label: string;
  detail?: string;
  fileName: string | null;
  onScan: () => void;
}) {
  const inputRef = useRef<HTMLInputElement>(null);
  const scanned = fileName !== null;

  return (
    <div className="flex items-center justify-between gap-3 p-4">
      <div className="flex min-w-0 items-center gap-3">
        {scanned ? (
          <CircleCheck size={22} className="shrink-0 text-success" />
        ) : (
          <CircleDashed size={22} className="shrink-0 text-danger" />
        )}
        <div className="min-w-0">
          <p className="text-[16px] font-semibold leading-snug">{label}</p>
          {detail && <p className="text-[13px] font-medium text-sun">{detail}</p>}
          <p className={scanned ? 'text-sm text-success' : 'text-sm text-danger'}>
            {scanned ? `Scanné à ${fileName}` : 'Manquant'}
          </p>
        </div>
      </div>

      <button
        type="button"
        onClick={() => inputRef.current?.click()}
        className="flex shrink-0 items-center gap-1.5 rounded-full bg-sun px-3 py-2 text-sm font-semibold text-white transition duration-150 hover:bg-sun-hover active:scale-95"
      >
        <Camera size={16} />
        Scanner
      </button>
      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        capture="environment"
        className="hidden"
        onChange={(event) => {
          const file = event.target.files?.[0];
          if (file) onScan();
          event.target.value = '';
        }}
      />
    </div>
  );
}
