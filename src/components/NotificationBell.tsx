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
      className="relative flex h-11 w-11 items-center justify-center rounded-full bg-white/10 transition hover:bg-white/20 active:scale-95"
    >
      <Bell size={21} />
      {unread > 0 && (
        <span className="absolute -right-0.5 -top-0.5 flex h-5 min-w-5 items-center justify-center rounded-full bg-sun px-1 text-xs font-bold text-night ring-2 ring-night">
          {unread}
        </span>
      )}
    </button>
  );
}
