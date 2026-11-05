import { useId, type InputHTMLAttributes } from 'react';

interface TextFieldProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  suffix?: string;
}

export function TextField({ label, suffix, id, className, ...props }: TextFieldProps) {
  const generatedId = useId();
  const inputId = id ?? generatedId;

  return (
    <div>
      <label htmlFor={inputId} className="mb-2 block text-base font-bold">
        {label}
      </label>
      <div className="flex h-btn items-center gap-2 rounded-card border-2 border-slate-300 bg-white px-4 transition focus-within:border-night">
        <input
          id={inputId}
          className={`min-w-0 flex-1 bg-transparent text-[18px] font-semibold text-night outline-none placeholder:font-normal placeholder:text-slate-400 ${className ?? ''}`}
          {...props}
        />
        {suffix && <span className="shrink-0 text-[16px] text-slate-500">{suffix}</span>}
      </div>
    </div>
  );
}
