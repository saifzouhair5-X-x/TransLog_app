import type { DocumentId, DocumentsState } from '@/lib/types';

export const DOCUMENTS: { id: DocumentId; label: string }[] = [
  { id: 'cmr', label: 'Lettre de voiture (CMR)' },
  { id: 'facture', label: 'Facture commerciale' },
  { id: 'colisage', label: 'Liste de colisage' },
  { id: 'tir', label: 'Carnet TIR' },
  { id: 'dum', label: 'Déclaration en douane (DUM)' },
  { id: 'eur1', label: 'Certificat d’origine EUR.1' },
];

export function emptyDocuments(): DocumentsState {
  return { cmr: null, facture: null, colisage: null, tir: null, dum: null, eur1: null };
}
