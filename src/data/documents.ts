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

export function documentsForMission(mission: Mission): { id: DocumentId; label: string; required: boolean }[] {
  const required = new Set<DocumentId>();

  // CMR et BL : toujours présents, pour toutes les missions
  required.add('cmr');
  required.add('bl');

  if (mission.type === 'internationale') {
    required.add('tir');
    required.add('dum');
    required.add('eur1');
    if (mission.agroalimentaire) {
      required.add('phytosanitaire');
    }
  }

  // Common documents
  required.add('facture');
  required.add('colisage');
  required.add('fumigation');

  return ALL_DOCUMENTS.filter((doc) => required.has(doc.id)).map((doc) => ({
    ...doc,
    required: true,
  }));
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
