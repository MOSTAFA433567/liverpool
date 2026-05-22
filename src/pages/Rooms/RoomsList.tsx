import { useOutletContext } from 'react-router-dom';
import { useLoungeStore } from '../../store/useLoungeStore';
import { Gamepad2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import clsx from 'clsx';
import { db } from '../../services/db';
import type { Lang } from '../../store/useLanguageStore';
import type { useTranslation } from '../../i18n/translations';

type OutletCtx = { lang: Lang; tr: ReturnType<typeof useTranslation> };

export default function RoomsList() {
  const rooms = useLoungeStore(state => state.rooms);
  const { tr, lang } = useOutletContext<OutletCtx>();

  const handleStartSession = async (roomId: string) => {
    const sessionId = 's' + Date.now();
    await db.createSession({
      id: sessionId,
      room_id: roomId,
      start_time: new Date().toISOString(),
      end_time: null,
      status: 'active',
      total_amount: 0,
      orders: [],
    });
  };

  const statusLabel = (s: string) => {
    const map: Record<string, string> = {
      in_use:      tr('status.in_use'),
      available:   tr('status.available'),
      reserved:    tr('status.reserved'),
      maintenance: tr('status.maintenance'),
    };
    return map[s] ?? s;
  };

  return (
    <div className="space-y-8" dir={lang === 'ar' ? 'rtl' : 'ltr'}>
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
        <div>
          <h1 className="font-headline text-3xl font-bold tracking-tight text-gray-100 uppercase">
            {tr('rooms.title')}
          </h1>
          <p className="text-muted mt-1 text-sm">{tr('rooms.subtitle')}</p>
        </div>
        <button className="self-start sm:self-auto text-xs bg-primary-container text-surface font-headline font-bold uppercase tracking-widest px-5 py-2.5 rounded-lg hover:bg-primary transition-colors">
          {tr('rooms.addRoom')}
        </button>
      </div>

      {/* Rooms Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {rooms.map(room => (
          <div
            key={room.id}
            className={clsx(
              'glass-panel p-6 rounded-xl relative overflow-hidden transition-all duration-300 hover:scale-[1.02]',
              room.status === 'in_use'      && 'border-primary-container/50 glow-box bg-primary-container/10',
              room.status === 'available'   && 'border-success/30 hover:border-success/50',
              room.status === 'reserved'    && 'border-accent/50',
              room.status === 'maintenance' && 'opacity-50 grayscale'
            )}
          >
            <div className="flex justify-between items-start mb-6">
              <Gamepad2 className={clsx('w-6 h-6', room.status === 'in_use' ? 'text-primary-container' : 'text-muted')} />
              <div className={clsx(
                'px-2 py-1 rounded text-[10px] font-bold uppercase tracking-widest flex items-center gap-1.5',
                room.status === 'in_use'      && 'bg-primary-container/20 text-primary-container',
                room.status === 'available'   && 'bg-success/20 text-success',
                room.status === 'reserved'    && 'bg-accent/20 text-accent',
                room.status === 'maintenance' && 'bg-gray-500/20 text-gray-400'
              )}>
                <div className={clsx(
                  'w-1.5 h-1.5 rounded-full',
                  room.status === 'in_use'      && 'bg-primary-container animate-glow-pulse',
                  room.status === 'available'   && 'bg-success',
                  room.status === 'reserved'    && 'bg-accent',
                  room.status === 'maintenance' && 'bg-gray-400'
                )} />
                {statusLabel(room.status)}
              </div>
            </div>

            <div>
              <h3 className="font-headline text-xl font-bold text-gray-100 mb-1">{room.name}</h3>
              <p className="text-xs text-muted mb-4">{room.type}</p>

              <div className="flex justify-between items-end pt-4 border-t border-white/5">
                <div>
                  <p className="text-[10px] uppercase tracking-widest text-muted mb-1">{tr('rooms.rate')}</p>
                  <p className="font-headline font-bold">
                    ${room.hourly_price}
                    <span className="text-xs text-muted font-normal">{tr('rooms.perHour')}</span>
                  </p>
                </div>
                {room.status === 'in_use' && (
                  <Link
                    to={`/admin/session/${room.current_session_id}`}
                    className="text-xs bg-primary-container text-surface px-3 py-1.5 rounded font-bold uppercase tracking-widest hover:bg-primary transition-colors"
                  >
                    {tr('rooms.manage')}
                  </Link>
                )}
                {room.status === 'available' && (
                  <button
                    onClick={() => handleStartSession(room.id)}
                    className="text-xs bg-surface-highlight text-gray-100 px-3 py-1.5 rounded font-bold uppercase tracking-widest hover:bg-success hover:text-surface transition-colors"
                  >
                    {tr('rooms.start')}
                  </button>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
