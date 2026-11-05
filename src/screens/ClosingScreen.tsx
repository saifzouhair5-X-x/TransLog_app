import { Plus, Receipt } from 'lucide-react';
import { useState } from 'react';
import { AddExpenseSheet } from '@/components/AddExpenseSheet';
import { Button } from '@/components/Button';
import { Card } from '@/components/Card';
import { ScreenHeader } from '@/components/ScreenHeader';
import { ScreenShell } from '@/components/ScreenShell';
import { TextField } from '@/components/TextField';
import { formatMAD } from '@/lib/format';
import type { Expense, ScreenProps } from '@/lib/types';

export function ClosingScreen({ mission, updateMission, goTo, back }: ScreenProps) {
  const [km, setKm] = useState('');
  const [sheetOpen, setSheetOpen] = useState(false);

  const total = mission.expenses.reduce((sum, expense) => sum + expense.amount, 0);
  const canClose = /^\d+$/.test(km.trim());

  const addExpense = (expense: Omit<Expense, 'id'>) => {
    updateMission({ expenses: [...mission.expenses, { ...expense, id: `${Date.now()}` }] });
    setSheetOpen(false);
  };

  const close = () => {
    updateMission({ kmArrivee: Number(km), statut: 'cloturee', etape: 'mission-end' });
    goTo('mission-end');
  };

  return (
    <>
      <ScreenShell
        header={<ScreenHeader title="Clôture" subtitle={`Mission #${mission.id}`} onBack={back} />}
        footer={
          <Button disabled={!canClose} onClick={close}>
            Clôturer la mission
          </Button>
        }
      >
        <TextField
          label="Kilométrage à l’arrivée"
          suffix="km"
          inputMode="numeric"
          placeholder="ex. 128930"
          value={km}
          onChange={(event) => setKm(event.target.value)}
        />

        <section className="space-y-2">
          <div className="flex items-center justify-between px-1">
            <h2 className="text-sm font-bold uppercase tracking-wide text-slate-500">Frais de mission</h2>
            <button
              type="button"
              onClick={() => setSheetOpen(true)}
              className="flex items-center gap-1 text-sm font-bold text-night transition hover:text-slate-600"
            >
              <Plus size={16} />
              Ajouter
            </button>
          </div>
          <Card className="divide-y divide-slate-200 p-0">
            {mission.expenses.length === 0 && <p className="p-4 text-[15px] text-slate-500">Aucun frais déclaré</p>}
            {mission.expenses.map((expense) => (
              <div key={expense.id} className="flex items-center justify-between gap-3 p-4">
                <span className="flex items-center gap-2 text-[16px]">
                  <Receipt size={17} className="text-slate-400" />
                  {expense.label}
                </span>
                <span className="font-semibold">{formatMAD(expense.amount)}</span>
              </div>
            ))}
            <div className="flex items-center justify-between gap-3 p-4">
              <span className="font-bold">Total</span>
              <span className="text-[18px] font-bold">{formatMAD(total)}</span>
            </div>
          </Card>
        </section>
      </ScreenShell>

      {sheetOpen && <AddExpenseSheet onAdd={addExpense} onClose={() => setSheetOpen(false)} />}
    </>
  );
}
