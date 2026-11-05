import type { Mission } from '@/lib/types';
import { deliverySummary } from '@/lib/missions';

export type TimelineState = 'done' | 'current' | 'pending' | 'ko';

export interface TimelineStep {
  id: string;
  label: string;
  state: TimelineState;
  detail: string;
}

export function buildTimeline(mission: Mission): TimelineStep[] {
  const refused = mission.statut === 'refusee';
  const cancelled = mission.statut === 'annulee';
  const delivered = deliverySummary(mission);
  const allDelivered = mission.stops.every((stop) => stop.livraison !== null);
  const customsArrival = mission.customs.douane_arrivee;

  const steps: TimelineStep[] = [
    { id: 'proposee', label: 'Mission proposée', state: 'done', detail: mission.proposeeLe },
    refused
      ? { id: 'decision', label: 'Refusée par le transporteur', state: 'ko', detail: mission.motif ?? 'Motif non précisé' }
      : {
          id: 'decision',
          label: 'Acceptée par le transporteur',
          state: mission.acceptedAt ? 'done' : 'pending',
          detail: mission.acceptedAt ? `Acceptée le ${mission.acceptedAt}` : 'En attente de votre réponse',
        },
    {
      id: 'depart',
      label: 'Départ',
      state: mission.departAt ? 'done' : 'pending',
      detail: mission.departAt ? `Parti à ${mission.departAt}` : `Prévu le ${mission.departPrevu}`,
    },
    {
      id: 'chargement',
      label: 'Chargement',
      state: mission.chargeAt ? 'done' : 'pending',
      detail: mission.chargeAt ? `Chargé à ${mission.chargeAt}` : mission.loadingSite,
    },
    {
      id: 'documents',
      label: 'Documents scannés',
      state: mission.documentsAt ? 'done' : 'pending',
      detail: mission.documentsAt ? `Scannés à ${mission.documentsAt}` : 'CMR et pièces douanières à scanner',
    },
    {
      id: 'douane',
      label: 'Douane',
      state: customsArrival === 'ok' ? 'done' : customsArrival === 'ko' ? 'ko' : 'pending',
      detail:
        customsArrival === 'ok'
          ? 'Douane d’arrivée validée'
          : customsArrival === 'ko'
            ? 'Problème signalé à la douane d’arrivée'
            : 'En attente de la douane d’arrivée',
    },
    {
      id: 'livraison',
      label: 'Livraison',
      state: allDelivered ? 'done' : 'pending',
      detail: allDelivered
        ? `${mission.stops.length > 1 ? 'Tous les arrêts livrés' : 'Livrée'}${delivered.heure ? ` à ${delivered.heure}` : ''}`
        : `${mission.stops.filter((stop) => stop.livraison !== null).length} / ${mission.stops.length} arrêt(s) livré(s)`,
    },
  ];

  if (cancelled) {
    steps.push({ id: 'annulation', label: 'Mission annulée', state: 'ko', detail: mission.motif ?? 'Motif non précisé' });
  }

  if (refused || cancelled) {
    return steps;
  }

  const firstPending = steps.find((step) => step.state === 'pending');
  return steps.map((step) => (step === firstPending ? { ...step, state: 'current' } : step));
}
