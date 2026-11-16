export type ScreenId =
  | 'login'
  | 'missions'
  | 'customs'
  | 'profile'
  | 'dashboard'
  | 'notifications'
  | 'mission-detail'
  | 'refusal'
  | 'vehicle-check'
  | 'loading-arrival'
  | 'goods-check'
  | 'loading-reserves'
  | 'documents'
  | 'trip'
  | 'incident'
  | 'delivery-arrival'
  | 'unloading'
  | 'closing'
  | 'mission-end';

export type DriverType = 'salarie' | 'independant';

export type MissionStatus = 'a_accepter' | 'acceptee' | 'en_cours' | 'livree' | 'cloturee' | 'refusee' | 'annulee';

export type MissionType = 'nationale' | 'internationale';

export interface Expense {
  id: string;
  label: string;
  amount: number;
  justificatif?: string;
}

export interface Delivery {
  heure: string;
  reserve: boolean;
}

export interface Stop {
  id: string;
  ville: string;
  site: string;
  adresse: string;
  recipient: string;
  recipientPhone: string;
  window: { start: string; end: string };
  arriveePrevue: string;
  palettes: number;
  poids: number;
  livraison: Delivery | null;
}

export type DocumentId =
  | 'cmr'
  | 'bl'
  | 'facture'
  | 'colisage'
  | 'tir'
  | 'dum'
  | 'eur1'
  | 'phytosanitaire'
  | 'fumigation';
export type DocumentsState = Record<DocumentId, string | null>;

export type CustomsStepId =
  | 'documents'
  | 'dum'
  | 'tir'
  | 'port'
  | 'embarquement'
  | 'douane_arrivee'
  | 'sanitaire'
  | 'phytosanitaire'
  | 'accomplie';
export type CustomsCheck = 'ok' | 'ko' | null;
export type CustomsState = Record<CustomsStepId, CustomsCheck>;

export interface Mission {
  id: string;
  origin: string;
  destination: string;
  loadingSite: string;
  loadingAddress: string;
  goods: string;
  type: MissionType;
  agroalimentaire: boolean;
  poids: number;
  tracteur: string;
  remorque: string;
  proposeeLe: string;
  departPrevu: string;
  delai: string;
  localisation: string;
  stops: Stop[];
  statut: MissionStatus;
  etape: ScreenId;
  echec: boolean;
  motif: string | null;
  kmDepart: number | null;
  kmArrivee: number | null;
  kmParcourus: number | null;
  acceptedAt: string | null;
  departAt: string | null;
  chargeAt: string | null;
  documentsAt: string | null;
  documents: DocumentsState;
  customs: CustomsState;
  prix: number;
  contreProposition: number | null;
  expenses: Expense[];
  incidents: IncidentReport[];
}

export interface IncidentReport {
  id: string;
  type: string;
  position: string;
  blocking: boolean;
  heure: string;
}

export interface Driver {
  prenom: string;
  nom: string;
  telephone: string;
  cin: string;
  permis: string;
  permisExpiry: string;
  visa: string;
  visaExpiry: string;
  tracteur: string;
  remorque: string;
  type: DriverType;
  transporteur: string | null;
}

export interface Alert {
  id: string;
  missionId: string;
  titre: string;
  texte: string;
  heure: string;
  lu: boolean;
}

export interface ScreenProps {
  mission: Mission;
  updateMission: (patch: Partial<Mission>) => void;
  goTo: (screen: ScreenId) => void;
  back: () => void;
  notify: (message: string) => void;
  addAlert: (titre: string, texte: string) => void;
}
