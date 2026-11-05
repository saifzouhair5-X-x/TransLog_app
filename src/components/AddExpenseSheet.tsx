import { Paperclip, X } from 'lucide-react';
import { useState, type FormEvent } from 'react';
import { Button } from '@/components/Button';
import { Choice } from '@/components/Choice';
import { TextField } from '@/components/TextField';
import type { Expense } from '@/lib/types';

const EXPENSE_TYPES = ['Péage', 'Carburant', 'Repas', 'Hébergement', 'Autre'] as const;

interface AddExpenseSheetProps {
  onAdd: (expense: Omit<Expense, 'id'>) => void;
  onClose: () => void;
}

export function AddExpenseSheet({ onAdd, onClose }: AddExpenseSheetProps) {
  const [label, setLabel] = useState<string | null>(null);
  const [amount, setAmount] = useState('');
  const [justificatif, setJustificatif] = useState<string | null>(null);

  const amountValue = Number(amount);
  const canSubmit = label !== null && amount.trim() !== '' && amountValue > 0 && justificatif !== null;

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!canSubmit || label === null || justificatif === null) return;
    onAdd({ label, amount: amountValue, justificatif });
    onClose();
  };

  return (
    <div className="absolute inset-0 z-40 flex items-end bg-night/50 animate-fade-up" onClick={onClose}>
      <form
        onSubmit={handleSubmit}
        onClick={(event) => event.stopPropagation()}
        className="max-h-[90%] w-full overflow-y-auto rounded-t-[20px] bg-white px-5 pb-7 pt-5 shadow-2xl"
      >
        <div className="mb-5 flex items-center justify-between">
          <h2 className="text-[22px] font-bold">Ajouter un frais</h2>
          <button type="button" onClick={onClose} aria-label="Fermer" className="rounded-full p-1.5 text-slate-500 transition hover:bg-slate-100">
            <X size={22} />
          </button>
        </div>

        <div className="space-y-5">
          <div>
            <p className="mb-2 text-base font-bold">Nature du frais</p>
            <div className="grid grid-cols-2 gap-2.5">
              {EXPENSE_TYPES.map((option) => (
                <Choice key={option} selected={label === option} onClick={() => setLabel(option)}>
                  {option}
                </Choice>
              ))}
            </div>
          </div>

          <TextField
            label="Montant"
            suffix="MAD"
            inputMode="numeric"
            placeholder="ex. 120"
            value={amount}
            onChange={(event) => setAmount(event.target.value.replace(/[^\d]/g, ''))}
          />

          <div>
            <p className="mb-2 text-base font-bold">Justificatif</p>
            <label className="flex min-h-[58px] cursor-pointer items-center gap-3 rounded-card border-2 border-dashed border-slate-400 px-4 py-3 transition hover:border-night">
              <Paperclip size={20} className="shrink-0 text-slate-600" />
              <span className="min-w-0 flex-1 truncate text-[16px] font-semibold text-night">
                {justificatif ?? 'Joindre une photo ou un PDF'}
              </span>
              <input
                type="file"
                accept="image/*,application/pdf"
                className="sr-only"
                onChange={(event) => setJustificatif(event.target.files?.[0]?.name ?? null)}
              />
            </label>
          </div>
        </div>

        <div className="mt-7">
          <Button type="submit" disabled={!canSubmit}>
            Ajouter le frais
          </Button>
        </div>
      </form>
    </div>
  );
}
