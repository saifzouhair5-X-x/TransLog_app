import type { ReactNode } from 'react';

interface ScreenShellProps {
  header: ReactNode;
  footer?: ReactNode;
  children: ReactNode;
}

export function ScreenShell({ header, footer, children }: ScreenShellProps) {
  return (
    <div className="flex h-full flex-col bg-canvas">
      {header}
      <main className="no-scrollbar min-h-0 flex-1 space-y-4 overflow-y-auto px-4 pb-6 pt-4">{children}</main>
      {footer && <footer className="shrink-0 space-y-3 border-t border-line bg-white/95 px-4 pb-7 pt-4 backdrop-blur">{footer}</footer>}
    </div>
  );
}
