import { Camera, CircleCheck, CircleDashed } from 'lucide-react';
import { useRef } from 'react';
import { Button } from '@/components/Button';
import { Card } from '@/components/Card';
import { InfoBanner } from '@/components/InfoBanner';
import { ScreenHeader } from '@/components/ScreenHeader';
import { ScreenShell } from '@/components/ScreenShell';
import { DOCUMENTS } from '@/data/documents';
import { currentTime } from '@/lib/format';
import type { DocumentId, ScreenProps } from '@/lib/types';

export function DocumentsScreen({ mission, updateMission, goTo, back, notify, addAlert }: ScreenProps) {
  const scannedCount = DOCUMENTS.filter((doc) => mission.documents[doc.id] !== null).length;
  const canValidate = mission.documents.cmr !== null;

  const scan = (id: DocumentId, fileName: string) => {
    updateMission({ documents: { ...mission.documents, [id]: fileName } });
    notify('Document scanné');
  };

  const validate = () => {
    updateMission({ documentsAt: currentTime(), etape: 'trip' });
    addAlert('Documents scannés', `${scannedCount} / ${DOCUMENTS.length} document(s) scanné(s) pour la mission #${mission.id}.`);
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
      <InfoBanner>Scannez les documents reçus du chargeur ou du transporteur. Le CMR est obligatoire.</InfoBanner>

      <Card className="divide-y divide-slate-200 p-0">
        {DOCUMENTS.map((doc) => (
          <DocumentRow key={doc.id} label={doc.label} fileName={mission.documents[doc.id]} onScan={(name) => scan(doc.id, name)} />
        ))}
      </Card>

      <p className="rounded-card bg-white px-4 py-3 text-center text-[15px] font-semibold text-slate-600">
        Copie CMR conservée par le chauffeur
      </p>
    </ScreenShell>
  );
}

function DocumentRow({ label, fileName, onScan }: { label: string; fileName: string | null; onScan: (name: string) => void }) {
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
          <p className="text-[17px] font-semibold leading-snug">{label}</p>
          <p className={scanned ? 'text-sm text-success' : 'text-sm text-danger'}>
            {scanned ? `Scanné : ${fileName}` : 'Manquant'}
          </p>
        </div>
      </div>

      <button
        type="button"
        onClick={() => inputRef.current?.click()}
        className="flex shrink-0 items-center gap-1.5 rounded-full bg-sun px-3 py-2 text-sm font-bold text-night transition duration-150 hover:bg-sun-hover active:scale-95"
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
          if (file) onScan(file.name);
          event.target.value = '';
        }}
      />
    </div>
  );
}
