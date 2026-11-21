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
      <label htmlFor={inputId} className="mb-1.5 block text-[13px] font-semibold text-slate-700">
        {label}
      </label>
      <div className="flex h-btn items-center gap-2 rounded-xl border border-slate-300 bg-white px-4 transition focus-within:border-sun focus-within:ring-4 focus-within:ring-sun/10">
        <input
          id={inputId}
          className={`min-w-0 flex-1 bg-transparent text-[16px] font-medium text-night outline-none placeholder:font-normal placeholder:text-slate-400 ${className ?? ''}`}
          {...props}
        />
        {suffix && <span className="shrink-0 text-[14px] font-medium text-slate-500">{suffix}</span>}
      </div>
    </div>
  );
}
