import type { CustomsState, CustomsStepId } from '@/lib/types';

export const CUSTOMS_STEPS: { id: CustomsStepId; label: string }[] = [
  { id: 'documents', label: 'Documents scannés' },
  { id: 'dum', label: 'Déclaration DUM' },
  { id: 'tir', label: 'Carnet TIR' },
  { id: 'port', label: 'Contrôle au port (Tanger Med)' },
  { id: 'embarquement', label: 'Embarquement' },
  { id: 'douane_arrivee', label: 'Douane d’arrivée' },
  { id: 'sanitaire', label: 'Certificat sanitaire' },
  { id: 'phytosanitaire', label: 'Certificat phytosanitaire' },
  { id: 'accomplie', label: 'Mission accomplie' },
];

export function emptyCustoms(): CustomsState {
  return {
    documents: null,
    dum: null,
    tir: null,
    port: null,
    embarquement: null,
    douane_arrivee: null,
    sanitaire: null,
    phytosanitaire: null,
    accomplie: null,
  };
}
