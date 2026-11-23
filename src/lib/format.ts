import type { MissionStatus, Stop } from '@/lib/types';

export function formatNumber(value: number): string {
  return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '\u00A0');
}

export function formatTonnes(kg: number): string {
  return `${(kg / 1000).toLocaleString('fr-FR', { maximumFractionDigits: 1 })} t`;
}

export function formatMAD(value: number): string {
  return `${formatNumber(value)} MAD`;
}

export function currentTime(): string {
  return new Date().toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' });
}

export function formatDateTime(date: Date): string {
  const weekday = date.toLocaleDateString('fr-FR', { weekday: 'short' }).replace(/\.$/, '');
  const dd = String(date.getDate()).padStart(2, '0');
  const mm = String(date.getMonth() + 1).padStart(2, '0');
  const yyyy = date.getFullYear();
  const hh = String(date.getHours()).padStart(2, '0');
  const min = String(date.getMinutes()).padStart(2, '0');
  return `${weekday}. ${dd}/${mm}/${yyyy}, ${hh}:${min}`;
}

export function atTime(date: Date, hours: number, minutes = 0): Date {
  return new Date(date.getFullYear(), date.getMonth(), date.getDate(), hours, minutes, 0, 0);
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
