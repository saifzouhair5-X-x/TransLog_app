import { Bell } from 'lucide-react';

interface NotificationBellProps {
  unread: number;
  onClick: () => void;
}

export function NotificationBell({ unread, onClick }: NotificationBellProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={`Notifications, ${unread} non lue(s)`}
      className="relative flex h-10 w-10 items-center justify-center rounded-full border border-line bg-white text-night transition hover:bg-slate-50 active:scale-95"
    >
      <Bell size={19} />
      {unread > 0 && (
        <span className="absolute -right-0.5 -top-0.5 flex h-5 min-w-5 items-center justify-center rounded-full bg-danger px-1 text-[11px] font-bold text-white ring-2 ring-white">
          {unread}
        </span>
      )}
    </button>
  );
}
