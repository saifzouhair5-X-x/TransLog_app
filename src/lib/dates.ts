import { atTime, formatDateTime } from '@/lib/format';

export function addDays(date: Date, days: number): Date {
  const next = new Date(date.getFullYear(), date.getMonth(), date.getDate(), date.getHours(), date.getMinutes());
  next.setDate(next.getDate() + days);
  return next;
}

export interface DateRange {
  depart: Date;
  arrivee: Date;
  proposee: Date;
}

export function rangeForPlanifiee(base: Date, offsetDays: number, departHour: number, arriveHour: number): DateRange {
  const depart = atTime(addDays(base, offsetDays), departHour, 0);
  const arrivee = atTime(addDays(depart, 1), arriveHour, 0);
  const proposee = atTime(base, 17, 45);
  return { depart, arrivee, proposee };
}

export function rangeForEnCours(base: Date, departHour: number, arriveHour: number): DateRange {
  const depart = atTime(base, departHour, 0);
  const arrivee = atTime(base, arriveHour, 0);
  const proposee = atTime(addDays(base, -1), 17, 45);
  return { depart, arrivee, proposee };
}

export function rangeForPasse(base: Date, agoDays: number, departHour: number, arriveHour: number): DateRange {
  const depart = atTime(addDays(base, -agoDays), departHour, 0);
  const arrivee = atTime(addDays(depart, 1), arriveHour, 0);
  const proposee = atTime(addDays(depart, -2), 14, 0);
  return { depart, arrivee, proposee };
}

export function fmt(date: Date): string {
  return formatDateTime(date);
}

export function delaiText(arrivee: Date): string {
  return `Livraison avant ${String(arrivee.getHours()).padStart(2, '0')}:${String(arrivee.getMinutes()).padStart(2, '0')} le ${String(arrivee.getDate()).padStart(2, '0')}/${String(arrivee.getMonth() + 1).padStart(2, '0')}/${arrivee.getFullYear()}`;
}
