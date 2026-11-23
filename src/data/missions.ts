import { emptyCustoms } from '@/data/customs';
import { emptyDocuments } from '@/data/documents';
import { addDays, delaiText, fmt, rangeForPasse, rangeForPlanifiee } from '@/lib/dates';
import { atTime } from '@/lib/format';
import { fuelCost } from '@/lib/pricing';
import type { Mission } from '@/lib/types';

const today = new Date();

function buildMissions(): Mission[] {
  const missions: Mission[] = [];

  // --- À planifier (1 à 7 prochains jours) ---
  const m1024 = rangeForPlanifiee(today, 2, 8, 12);
  missions.push({
    id: '1024',
    origin: 'Casablanca',
    destination: 'Rabat',
    loadingSite: 'Entrepôt Atlas Logistique',
    loadingAddress: 'Casablanca, zone industrielle Ain Sebaa, quai 4',
    goods: 'Produits alimentaires secs, palettes filmées',
    type: 'nationale',
    agroalimentaire: true,
    poids: 8400,
    tracteur: '12345-A-6',
    remorque: '54321-B-7',
    proposeeLe: fmt(m1024.proposee),
    departPrevu: fmt(m1024.depart),
    delai: delaiText(m1024.arrivee),
    localisation: 'Entrepôt Atlas Logistique, Casablanca',
    stops: [
      {
        id: '1024-1',
        ville: 'Rabat',
        site: 'Magasin Central, Hay Riad',
        adresse: 'Rabat, quai de réception',
        recipient: 'Mme Alaoui, réception',
        recipientPhone: '+212 5 37 00 12 34',
        window: { start: '12:30', end: '14:00' },
        arriveePrevue: fmt(m1024.arrivee),
        palettes: 12,
        poids: 8400,
        livraison: null,
      },
    ],
    statut: 'a_accepter',
    etape: 'mission-detail',
    echec: false,
    motif: null,
    kmDepart: 184520,
    kmArrivee: null,
    kmParcourus: null,
    acceptedAt: null,
    departAt: null,
    chargeAt: null,
    documentsAt: null,
    documents: emptyDocuments(),
    customs: emptyCustoms(),
    prix: 3500,
    contreProposition: null,
    expenses: [
      { id: 'peage-1024', label: 'Péage', amount: 46 },
      { id: 'carburant-1024', label: 'Carburant', amount: 520 },
    ],
    incidents: [],
  });

  const m1025 = rangeForPlanifiee(today, 3, 6, 14);
  missions.push({
    id: '1025',
    origin: 'Casablanca',
    destination: 'Marrakech',
    loadingSite: 'Plateforme Sud Distribution',
    loadingAddress: 'Casablanca, Bouskoura, quai 2',
    goods: 'Pièces détachées automobiles en cartons',
    type: 'nationale',
    agroalimentaire: false,
    poids: 6200,
    tracteur: '12345-A-6',
    remorque: '54321-B-7',
    proposeeLe: fmt(m1025.proposee),
    departPrevu: fmt(m1025.depart),
    delai: `Dernier arrêt avant ${fmt(addDays(m1025.arrivee, 1))}`,
    localisation: 'Dépôt Bouskoura, Casablanca',
    stops: [
      {
        id: '1025-1',
        ville: 'Rabat',
        site: 'Dépôt Rabat Agdal',
        adresse: 'Rabat, avenue Fal Ould Oumeir',
        recipient: 'Mme Bennani, magasinier',
        recipientPhone: '+212 5 37 00 56 78',
        window: { start: '14:00', end: '16:00' },
        arriveePrevue: fmt(m1025.arrivee),
        palettes: 5,
        poids: 3100,
        livraison: null,
      },
      {
        id: '1025-2',
        ville: 'Marrakech',
        site: 'Entrepôt Sud Marrakech',
        adresse: 'Marrakech, zone Sidi Ghanem',
        recipient: 'M. Tazi, réception',
        recipientPhone: '+212 5 24 00 90 12',
        window: { start: '09:00', end: '12:00' },
        arriveePrevue: fmt(addDays(m1025.arrivee, 1)),
        palettes: 3,
        poids: 3100,
        livraison: null,
      },
    ],
    statut: 'a_accepter',
    etape: 'mission-detail',
    echec: false,
    motif: null,
    kmDepart: null,
    kmArrivee: null,
    kmParcourus: null,
    acceptedAt: null,
    departAt: null,
    chargeAt: null,
    documentsAt: null,
    documents: emptyDocuments(),
    customs: emptyCustoms(),
    prix: 5200,
    contreProposition: null,
    expenses: [],
    incidents: [],
  });

  const m1026 = rangeForPlanifiee(today, 5, 5, 9);
  missions.push({
    id: '1026',
    origin: 'Tanger',
    destination: 'Fès',
    loadingSite: 'Port Tanger Med, entrepôt B',
    loadingAddress: 'Tanger Med, zone franche, quai 9',
    goods: 'Boissons en bouteilles, palettes filmées',
    type: 'nationale',
    agroalimentaire: true,
    poids: 12500,
    tracteur: '12345-A-6',
    remorque: '54321-B-7',
    proposeeLe: fmt(m1026.proposee),
    departPrevu: fmt(m1026.depart),
    delai: delaiText(m1026.arrivee),
    localisation: 'Port Tanger Med, Tanger',
    stops: [
      {
        id: '1026-1',
        ville: 'Fès',
        site: 'Supermarché Bab Fès',
        adresse: 'Fès, avenue Mohammed V',
        recipient: 'Mme Idrissi, réception',
        recipientPhone: '+212 5 35 00 90 12',
        window: { start: '09:00', end: '11:00' },
        arriveePrevue: fmt(m1026.arrivee),
        palettes: 6,
        poids: 12500,
        livraison: null,
      },
    ],
    statut: 'a_accepter',
    etape: 'mission-detail',
    echec: false,
    motif: null,
    kmDepart: null,
    kmArrivee: null,
    kmParcourus: null,
    acceptedAt: null,
    departAt: null,
    chargeAt: null,
    documentsAt: null,
    documents: emptyDocuments(),
    customs: emptyCustoms(),
    prix: 6800,
    contreProposition: null,
    expenses: [],
    incidents: [],
  });

  // --- Effectuées (1 à 10 derniers jours) ---
  const m1018 = rangeForPasse(today, 5, 6, 15);
  missions.push({
    id: '1018',
    origin: 'Casablanca',
    destination: 'Agadir',
    loadingSite: 'Entrepôt Sud Logistique',
    loadingAddress: 'Casablanca, zone industrielle Sidi Maarouf',
    goods: 'Matériel électronique en cartons',
    type: 'nationale',
    agroalimentaire: false,
    poids: 5200,
    tracteur: '12345-A-6',
    remorque: '54321-B-7',
    proposeeLe: fmt(m1018.proposee),
    departPrevu: fmt(m1018.depart),
    delai: delaiText(m1018.arrivee),
    localisation: 'Agadir',
    stops: [
      {
        id: '1018-1',
        ville: 'Agadir',
        site: 'Centre de distribution Agadir',
        adresse: 'Agadir, zone industrielle Dakhla',
        recipient: 'M. Ouaali, réception',
        recipientPhone: '+212 5 28 00 11 22',
        window: { start: '15:00', end: '18:00' },
        arriveePrevue: fmt(m1018.arrivee),
        palettes: 8,
        poids: 5200,
        livraison: { heure: '16:20', reserve: false },
      },
    ],
    statut: 'cloturee',
    etape: 'mission-end',
    echec: false,
    motif: null,
    kmDepart: 182100,
    kmArrivee: 183950,
    kmParcourus: 1850,
    acceptedAt: fmt(addDays(m1018.proposee, 0)),
    departAt: '06:15',
    chargeAt: '07:45',
    documentsAt: '08:10',
    documents: emptyDocuments(),
    customs: emptyCustoms(),
    prix: 7200,
    contreProposition: null,
    expenses: [
      { id: 'peage-1018', label: 'Péage', amount: 120 },
      { id: 'carburant-1018', label: 'Carburant', amount: 850 },
    ],
    incidents: [],
  });

  const m1019 = rangeForPasse(today, 8, 4, 17);
  missions.push({
    id: '1019',
    origin: 'Tanger',
    destination: 'Marrakech',
    loadingSite: 'Port Tanger Med, entrepôt A',
    loadingAddress: 'Tanger Med, zone franche, quai 3',
    goods: 'Textile en balles',
    type: 'nationale',
    agroalimentaire: false,
    poids: 7800,
    tracteur: '12345-A-6',
    remorque: '54321-B-7',
    proposeeLe: fmt(m1019.proposee),
    departPrevu: fmt(m1019.depart),
    delai: delaiText(m1019.arrivee),
    localisation: 'Marrakech',
    stops: [
      {
        id: '1019-1',
        ville: 'Marrakech',
        site: 'Entrepôt Textile Marrakech',
        adresse: 'Marrakech, zone Sidi Ghanem',
        recipient: 'Mme Chraibi, réception',
        recipientPhone: '+212 5 24 00 33 44',
        window: { start: '17:00', end: '20:00' },
        arriveePrevue: fmt(m1019.arrivee),
        palettes: 10,
        poids: 7800,
        livraison: { heure: '18:05', reserve: false },
      },
    ],
    statut: 'cloturee',
    etape: 'mission-end',
    echec: false,
    motif: null,
    kmDepart: 180000,
    kmArrivee: 182100,
    kmParcourus: 2100,
    acceptedAt: fmt(addDays(m1019.proposee, 0)),
    departAt: '04:45',
    chargeAt: '06:00',
    documentsAt: '06:30',
    documents: emptyDocuments(),
    customs: emptyCustoms(),
    prix: 9100,
    contreProposition: null,
    expenses: [
      { id: 'peage-1019', label: 'Péage', amount: 80 },
      { id: 'carburant-1019', label: 'Carburant', amount: 680 },
    ],
    incidents: [
      { id: 'inc-1019-1', type: 'Retard de trafic', position: 'Autoroute A2, km 140', blocking: false, heure: '12:30' },
    ],
  });

  const m1020 = rangeForPasse(today, 3, 7, 13);
  missions.push({
    id: '1020',
    origin: 'Casablanca',
    destination: 'Meknès',
    loadingSite: 'Entrepôt Atlas Logistique',
    loadingAddress: 'Casablanca, zone industrielle Ain Sebaa, quai 2',
    goods: 'Conserves alimentaires, cartons sur palettes',
    type: 'nationale',
    agroalimentaire: true,
    poids: 9600,
    tracteur: '12345-A-6',
    remorque: '54321-B-7',
    proposeeLe: fmt(m1020.proposee),
    departPrevu: fmt(m1020.depart),
    delai: delaiText(m1020.arrivee),
    localisation: 'Meknès',
    stops: [
      {
        id: '1020-1',
        ville: 'Meknès',
        site: 'Dépôt Meknès Centre',
        adresse: 'Meknès, route de Fès',
        recipient: 'M. Sebti, réception',
        recipientPhone: '+212 5 35 00 77 88',
        window: { start: '13:00', end: '16:00' },
        arriveePrevue: fmt(m1020.arrivee),
        palettes: 14,
        poids: 9600,
        livraison: { heure: '14:10', reserve: false },
      },
    ],
    statut: 'cloturee',
    etape: 'mission-end',
    echec: false,
    motif: null,
    kmDepart: 178300,
    kmArrivee: 180000,
    kmParcourus: 1700,
    acceptedAt: fmt(addDays(m1020.proposee, 0)),
    departAt: '07:10',
    chargeAt: '08:30',
    documentsAt: '09:00',
    documents: emptyDocuments(),
    customs: emptyCustoms(),
    prix: 4800,
    contreProposition: null,
    expenses: [
      { id: 'peage-1020', label: 'Péage', amount: 60 },
      { id: 'carburant-1020', label: 'Carburant', amount: 580 },
    ],
    incidents: [],
  });

  // --- Annulées (1 à 10 derniers jours) ---
  const m1015 = rangeForPasse(today, 2, 6, 12);
  missions.push({
    id: '1015',
    origin: 'Casablanca',
    destination: 'Tanger',
    loadingSite: 'Entrepôt Nord Logistique',
    loadingAddress: 'Casablanca, zone industrielle Ain Sebaa, quai 1',
    goods: 'Mobilier en kit, cartons',
    type: 'nationale',
    agroalimentaire: false,
    poids: 4500,
    tracteur: '12345-A-6',
    remorque: '54321-B-7',
    proposeeLe: fmt(m1015.proposee),
    departPrevu: fmt(m1015.depart),
    delai: delaiText(m1015.arrivee),
    localisation: 'Casablanca',
    stops: [
      {
        id: '1015-1',
        ville: 'Tanger',
        site: 'Entrepôt Nord Tanger',
        adresse: 'Tanger, zone portuaire',
        recipient: 'M. El Fassi, réception',
        recipientPhone: '+212 5 39 00 55 66',
        window: { start: '12:00', end: '14:00' },
        arriveePrevue: fmt(m1015.arrivee),
        palettes: 7,
        poids: 4500,
        livraison: null,
      },
    ],
    statut: 'annulee',
    etape: 'mission-detail',
    echec: false,
    motif: 'Attente trop longue chez le client précédent',
    kmDepart: null,
    kmArrivee: null,
    kmParcourus: null,
    acceptedAt: fmt(addDays(m1015.proposee, 0)),
    departAt: null,
    chargeAt: null,
    documentsAt: null,
    documents: emptyDocuments(),
    customs: emptyCustoms(),
    prix: 4200,
    contreProposition: null,
    expenses: [],
    incidents: [],
  });

  const m1016 = rangeForPasse(today, 6, 4, 18);
  missions.push({
    id: '1016',
    origin: 'Rabat',
    destination: 'Oujda',
    loadingSite: 'Plateforme Est Distribution',
    loadingAddress: 'Rabat, zone industrielle Salé',
    goods: 'Produits chimiques en fûts',
    type: 'nationale',
    agroalimentaire: false,
    poids: 11200,
    tracteur: '12345-A-6',
    remorque: '54321-B-7',
    proposeeLe: fmt(m1016.proposee),
    departPrevu: fmt(m1016.depart),
    delai: delaiText(m1016.arrivee),
    localisation: 'Rabat',
    stops: [
      {
        id: '1016-1',
        ville: 'Oujda',
        site: 'Dépôt Oujda Est',
        adresse: 'Oujda, route de Nador',
        recipient: 'M. Berrada, réception',
        recipientPhone: '+212 5 36 00 22 33',
        window: { start: '18:00', end: '22:00' },
        arriveePrevue: fmt(m1016.arrivee),
        palettes: 9,
        poids: 11200,
        livraison: null,
      },
    ],
    statut: 'annulee',
    etape: 'mission-detail',
    echec: false,
    motif: 'Panne ou entretien',
    kmDepart: null,
    kmArrivee: null,
    kmParcourus: null,
    acceptedAt: fmt(addDays(m1016.proposee, 0)),
    departAt: null,
    chargeAt: null,
    documentsAt: null,
    documents: emptyDocuments(),
    customs: emptyCustoms(),
    prix: 11500,
    contreProposition: null,
    expenses: [],
    incidents: [],
  });

  const m1017 = rangeForPasse(today, 9, 7, 13);
  missions.push({
    id: '1017',
    origin: 'Casablanca',
    destination: 'Fès',
    loadingSite: 'Entrepôt Atlas Logistique',
    loadingAddress: 'Casablanca, zone industrielle Ain Sebaa, quai 5',
    goods: 'Médicaments, cartons thermorégulés',
    type: 'nationale',
    agroalimentaire: false,
    poids: 3800,
    tracteur: '12345-A-6',
    remorque: '54321-B-7',
    proposeeLe: fmt(m1017.proposee),
    departPrevu: fmt(m1017.depart),
    delai: delaiText(m1017.arrivee),
    localisation: 'Casablanca',
    stops: [
      {
        id: '1017-1',
        ville: 'Fès',
        site: 'Pharmacie Centrale Fès',
        adresse: 'Fès, avenue Hassan II',
        recipient: 'Mme Lamrani, réception',
        recipientPhone: '+212 5 35 00 44 55',
        window: { start: '13:00', end: '15:00' },
        arriveePrevue: fmt(m1017.arrivee),
        palettes: 4,
        poids: 3800,
        livraison: null,
      },
    ],
    statut: 'annulee',
    etape: 'mission-detail',
    echec: false,
    motif: 'Documents expirés',
    kmDepart: null,
    kmArrivee: null,
    kmParcourus: null,
    acceptedAt: fmt(addDays(m1017.proposee, 0)),
    departAt: null,
    chargeAt: null,
    documentsAt: null,
    documents: emptyDocuments(),
    customs: emptyCustoms(),
    prix: 3900,
    contreProposition: null,
    expenses: [],
    incidents: [],
  });

  const m1021 = rangeForPasse(today, 10, 5, 14);
  missions.push({
    id: '1021',
    origin: 'Marrakech',
    destination: 'Casablanca',
    loadingSite: 'Entrepôt Sud Marrakech',
    loadingAddress: 'Marrakech, zone Sidi Ghanem',
    goods: 'Matériaux de construction en sacs',
    type: 'nationale',
    agroalimentaire: false,
    poids: 14000,
    tracteur: '12345-A-6',
    remorque: '54321-B-7',
    proposeeLe: fmt(m1021.proposee),
    departPrevu: fmt(m1021.depart),
    delai: delaiText(m1021.arrivee),
    localisation: 'Marrakech',
    stops: [
      {
        id: '1021-1',
        ville: 'Casablanca',
        site: 'Plateforme Centre Casablanca',
        adresse: 'Casablanca, zone Sidi Maarouf',
        recipient: 'M. Kabbaj, réception',
        recipientPhone: '+212 5 22 00 66 77',
        window: { start: '14:00', end: '17:00' },
        arriveePrevue: fmt(m1021.arrivee),
        palettes: 11,
        poids: 14000,
        livraison: null,
      },
    ],
    statut: 'annulee',
    etape: 'mission-detail',
    echec: false,
    motif: 'Temps de conduite dépassé',
    kmDepart: null,
    kmArrivee: null,
    kmParcourus: null,
    acceptedAt: fmt(addDays(m1021.proposee, 0)),
    departAt: null,
    chargeAt: null,
    documentsAt: null,
    documents: emptyDocuments(),
    customs: emptyCustoms(),
    prix: 5600,
    contreProposition: null,
    expenses: [],
    incidents: [],
  });

  // --- Mission internationale (export) : Agadir → Perpignan via Tanger Med ---
  const d1027 = atTime(addDays(today, 2), 6, 0);
  const a1027 = atTime(addDays(d1027, 3), 8, 0);
  missions.push({
    id: '1027',
    origin: 'Agadir',
    destination: 'Perpignan',
    loadingSite: 'Station de conditionnement Souss Primeurs',
    loadingAddress: 'Aït Melloul, Agadir, quai frigorifique 3',
    goods: 'Tomates fraîches en colis, transport frigorifique à 8 °C',
    type: 'internationale',
    agroalimentaire: true,
    poids: 22000,
    tracteur: '12345-A-6',
    remorque: '67890-F-7 (frigorifique)',
    proposeeLe: fmt(atTime(today, 9, 30)),
    departPrevu: fmt(d1027),
    delai: delaiText(a1027),
    localisation: 'Aït Melloul, Agadir',
    stops: [
      {
        id: '1027-1',
        ville: 'Perpignan',
        site: 'Marché international Saint-Charles',
        adresse: 'Perpignan (France), avenue de Milan',
        recipient: 'M. Garcia, réception import',
        recipientPhone: '+33 4 68 00 12 34',
        window: { start: '06:00', end: '10:00' },
        arriveePrevue: fmt(a1027),
        palettes: 33,
        poids: 22000,
        livraison: null,
      },
    ],
    statut: 'a_accepter',
    etape: 'mission-detail',
    echec: false,
    motif: null,
    kmDepart: 184520,
    kmArrivee: null,
    kmParcourus: null,
    acceptedAt: null,
    departAt: null,
    chargeAt: null,
    documentsAt: null,
    documents: emptyDocuments(),
    customs: emptyCustoms(),
    prix: 38000,
    contreProposition: null,
    expenses: [
      { id: 'peage-1027', label: 'Péage', amount: 0 },
      { id: 'carburant-1027', label: 'Carburant', amount: 0 },
      { id: 'traversee-1027', label: 'Traversée Tanger Med – Algésiras', amount: 7500 },
    ],
    incidents: [],
  });

  // --- Prix réels : distance routière, péages ADM classe 3, gasoil à 16,62 MAD/L ---
  const PRIX_REELS: Record<string, { distanceKm: number; peage: number; prix: number; traversee?: number }> = {
    '1024': { distanceKm: 87, peage: 43, prix: 1800 }, // Casablanca – Rabat
    '1025': { distanceKm: 412, peage: 247, prix: 4900 }, // Casablanca – Rabat – Marrakech (groupage)
    '1026': { distanceKm: 320, peage: 245, prix: 3800 }, // Tanger Med – Fès
    '1027': { distanceKm: 2025, peage: 566, prix: 38000, traversee: 7500 }, // Agadir – Tanger Med – Perpignan
    '1018': { distanceKm: 460, peage: 348, prix: 5200 }, // Casablanca – Agadir
    '1019': { distanceKm: 625, peage: 379, prix: 6600 }, // Tanger Med – Marrakech
    '1020': { distanceKm: 230, peage: 113, prix: 2900 }, // Casablanca – Meknès
    '1015': { distanceKm: 340, peage: 218, prix: 3900 }, // Casablanca – Tanger
    '1016': { distanceKm: 530, peage: 216, prix: 6500 }, // Rabat – Oujda (produits chimiques)
    '1017': { distanceKm: 290, peage: 138, prix: 3600 }, // Casablanca – Fès (température dirigée)
    '1021': { distanceKm: 240, peage: 161, prix: 2700 }, // Marrakech – Casablanca
  };

  // Compteurs kilométriques cohérents avec les distances réelles
  const KM_EFFECTUES: Record<string, [number, number]> = {
    '1019': [182000, 182625],
    '1018': [182625, 183085],
    '1020': [183085, 183315],
  };

  for (const mission of missions) {
    const reel = PRIX_REELS[mission.id];
    if (reel) {
      mission.distanceKm = reel.distanceKm;
      mission.peage = reel.peage;
      mission.traversee = reel.traversee;
      mission.prix = reel.prix;
      mission.expenses = mission.expenses.map((expense) => {
        if (expense.label === 'Péage') return { ...expense, amount: reel.peage };
        if (expense.label === 'Carburant') return { ...expense, amount: fuelCost(reel.distanceKm) };
        return expense;
      });
    }
    const km = KM_EFFECTUES[mission.id];
    if (km) {
      mission.kmDepart = km[0];
      mission.kmArrivee = km[1];
      mission.kmParcourus = km[1] - km[0];
    }
  }

  return missions;
}

export const initialMissions: Mission[] = buildMissions();
