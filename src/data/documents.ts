import type { DocumentId, DocumentsState, Mission } from '@/lib/types';

export const ALL_DOCUMENTS: { id: DocumentId; label: string }[] = [
  { id: 'cmr', label: 'Lettre de voiture (CMR)' },
  { id: 'bl', label: 'Bon de livraison (BL)' },
  { id: 'facture', label: 'Facture commerciale' },
  { id: 'colisage', label: 'Liste de colisage' },
  { id: 'tir', label: 'Carnet TIR' },
  { id: 'dum', label: 'Déclaration en douane (DUM)' },
  { id: 'eur1', label: 'Certificat d’origine EUR.1' },
  { id: 'phytosanitaire', label: 'Certificat phytosanitaire' },
  { id: 'fumigation', label: 'Certificat de fumigation des palettes' },
];

/** Lettre de voiture : BL pour une mission au Maroc, CMR pour une mission internationale. */
export function lettreDeVoiture(mission: Mission): { id: DocumentId; label: string; detail: string } {
  return mission.type === 'internationale'
    ? { id: 'cmr', label: 'CMR / BL', detail: 'CMR : mission internationale' }
    : { id: 'bl', label: 'CMR / BL', detail: 'BL : mission au Maroc' };
}

export function documentsForMission(
  mission: Mission
): { id: DocumentId; label: string; detail?: string; required: boolean }[] {
  const lettre = lettreDeVoiture(mission);
  const docs: { id: DocumentId; label: string; detail?: string; required: boolean }[] = [
    { id: lettre.id, label: lettre.label, detail: lettre.detail, required: true },
  ];
  const add = (id: DocumentId) => {
    const doc = ALL_DOCUMENTS.find((item) => item.id === id);
    if (doc) docs.push({ ...doc, required: true });
  };

  add('facture');
  add('colisage');
  if (mission.type === 'internationale') {
    add('tir');
    add('dum');
    add('eur1');
  }
  // Certificat phytosanitaire : pour toute marchandise agroalimentaire
  if (mission.agroalimentaire) add('phytosanitaire');
  add('fumigation');

  return docs;
}

export function emptyDocuments(): DocumentsState {
  return {
    cmr: null,
    bl: null,
    facture: null,
    colisage: null,
    tir: null,
    dum: null,
    eur1: null,
    phytosanitaire: null,
    fumigation: null,
  };
}
