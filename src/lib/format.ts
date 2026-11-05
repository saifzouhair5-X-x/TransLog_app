import type { MissionStatus, Stop } from '@/lib/types';

export function formatNumber(value: number): string {
  return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '\u00A0');
}

export function formatMAD(value: number): string {
  return `${formatNumber(value)} MAD`;
}

export function currentTime(): string {
  return new Date().toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' });
}

function toMinutes(time: string): number {
  const [hours, minutes] = time.split(':').map(Number);
  return hours * 60 + minutes;
}

export function isWithinWindow(time: string, window: Stop['window']): boolean {
  const current = toMinutes(time);
  return current >= toMinutes(window.start) && current <= toMinutes(window.end);
}

export const STATUS_LABELS: Record<MissionStatus, string> = {
  a_accepter: 'À accepter',
  acceptee: 'Acceptée',
  en_cours: 'En cours',
  livree: 'Livrée',
  cloturee: 'Clôturée',
  refusee: 'Refusée',
  annulee: 'Annulée',
};
