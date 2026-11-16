import type { Driver, DriverType } from '@/lib/types';

export const driverSalarie: Driver = {
  prenom: 'Karim',
  nom: 'Benali',
  telephone: '+212 6 61 23 45 67',
  cin: 'AB456789',
  permis: 'MA-9988776',
  permisExpiry: '2026-12-10',
  visa: 'V-2025-04412',
  visaExpiry: '2026-12-02',
  tracteur: '12345-A-6',
  remorque: '54321-B-7',
  type: 'salarie',
  transporteur: 'Atlas Transport SARL',
};

export const driverIndependant: Driver = {
  prenom: 'Youssef',
  nom: 'Mansouri',
  telephone: '+212 6 62 98 76 54',
  cin: 'CD987654',
  permis: 'MA-4455667',
  permisExpiry: '2027-03-18',
  visa: 'V-2025-07788',
  visaExpiry: '2027-01-22',
  tracteur: '67890-C-3',
  remorque: '09876-D-4',
  type: 'independant',
  transporteur: null,
};

export function driverForType(type: DriverType): Driver {
  return type === 'salarie' ? driverSalarie : driverIndependant;
}

export const initialDriver: Driver = driverSalarie;
