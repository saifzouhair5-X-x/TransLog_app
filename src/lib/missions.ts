import type { Mission, Stop } from '@/lib/types';

export function currentStop(mission: Mission): Stop {
  return mission.stops.find((stop) => stop.livraison === null) ?? mission.stops[mission.stops.length - 1];
}

export function totalPalettes(mission: Mission): number {
  return mission.stops.reduce((sum, stop) => sum + stop.palettes, 0);
}

export function isGroupage(mission: Mission): boolean {
  return mission.stops.length > 1;
}

export function deliverySummary(mission: Mission): { reserve: boolean; heure: string | null } {
  const delivered = mission.stops.filter((stop) => stop.livraison !== null);
  const last = delivered[delivered.length - 1];
  return {
    reserve: delivered.some((stop) => stop.livraison?.reserve === true),
    heure: last?.livraison?.heure ?? null,
  };
}
