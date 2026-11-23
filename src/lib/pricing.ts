import type { Mission } from '@/lib/types';

/**
 * Hypothèses de coût utilisées pour estimer le prix réel d'un trajet.
 *
 * - Gasoil : prix moyen relevé à Casablanca le 16/11/2026 (Le360) : 16,62 MAD/L.
 * - Consommation d'un semi-remorque chargé : 33 L aux 100 km.
 * - Péages : grille ADM, classe 3 (camion de plus de deux essieux).
 */
export const PRIX_GASOIL_MAD = 16.62;
export const CONSO_L_100KM = 33;
export const SOURCE_COUTS = 'Gasoil 16,62 MAD/L (Casablanca, 16/11/2026) · Péages ADM classe 3';

export function fuelCost(distanceKm: number): number {
  return Math.round((distanceKm * CONSO_L_100KM * PRIX_GASOIL_MAD) / 100);
}

export interface TripCost {
  distanceKm: number;
  carburant: number;
  peage: number;
  traversee: number;
  total: number;
}

export function tripCost(mission: Mission): TripCost | null {
  if (mission.distanceKm === undefined) return null;
  const carburant = fuelCost(mission.distanceKm);
  const peage = mission.peage ?? 0;
  const traversee = mission.traversee ?? 0;
  return {
    distanceKm: mission.distanceKm,
    carburant,
    peage,
    traversee,
    total: carburant + peage + traversee,
  };
}
