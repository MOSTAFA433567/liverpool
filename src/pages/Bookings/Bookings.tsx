import { useOutletContext } from 'react-router-dom';
import { useLoungeStore } from '../../store/useLoungeStore';
import { CalendarDays, Clock, User } from 'lucide-react';
import { format, isSameDay, parseISO } from 'date-fns';
import type { Lang } from '../../store/useLanguageStore';
import type { useTranslation } from '../../i18n/translations';

type OutletCtx = { lang: Lang; tr: ReturnType<typeof useTranslation> };

export default function Bookings() {
  const bookings = useLoungeStore(state => state.bookings);
  const rooms    = useLoungeStore(state => state.rooms);
  const { tr, lang } = useOutletContext<OutletCtx>();

  const today = new Date();
  const upcomingBookings = bookings
    .filter(b => b.status === 'confirmed')
    .sort((a, b) => new Date(a.start_time).getTime() - new Date(b.start_time).getTime());

  return (
    <div className="space-y-8 max-w-6xl mx-auto" dir={lang === 'ar' ? 'rtl' : 'ltr'}>
      <div className="flex justify-between items-end">
        <div>
          <h1 className="font-headline text-3xl font-bold tracking-tight text-gray-100 uppercase">
            {tr('bookings.title')}
          </h1>
          <p className="text-muted mt-1 text-sm">{tr('bookings.subtitle')}</p>
        </div>
        <button className="bg-primary-container text-surface font-headline font-bold uppercase tracking-widest px-6 py-2.5 rounded-lg hover:bg-primary transition-colors text-sm">
          {tr('bookings.newBooking')}
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {upcomingBookings.map(booking => {
          const room = rooms.find(r => r.id === booking.room_id);
          const startTime = parseISO(booking.start_time);
          const isToday = isSameDay(startTime, today);

          return (
            <div key={booking.id} className="glass-panel p-6 rounded-xl border-s-4 border-s-accent relative overflow-hidden group">
              <div className="absolute top-0 end-0 p-4 opacity-5">
                <CalendarDays className="w-24 h-24 text-accent" />
              </div>
              <div className="relative z-10 space-y-4">
                <div className="flex justify-between items-start">
                  <span className="inline-flex items-center gap-1.5 px-2 py-1 rounded text-[10px] font-bold uppercase tracking-widest bg-accent/20 text-accent">
                    <div className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" />
                    {isToday ? tr('bookings.today') : format(startTime, 'MMM dd')}
                  </span>
                  <span className="font-headline font-bold text-gray-100">#{booking.id}</span>
                </div>

                <div>
                  <h3 className="font-headline text-xl font-bold text-gray-100 mb-1">
                    {room?.name || 'Unknown Room'}
                  </h3>
                  <div className="flex items-center gap-2 text-sm text-muted">
                    <Clock className="w-4 h-4" />
                    {format(startTime, 'h:mm a')} • {booking.duration} mins
                  </div>
                </div>

                <div className="pt-4 border-t border-white/5 flex items-center gap-3">
                  <div className="w-8 h-8 rounded bg-surface-highlight flex items-center justify-center text-muted flex-shrink-0">
                    <User className="w-4 h-4" />
                  </div>
                  <div>
                    <p className="text-sm font-bold text-gray-100">{booking.customer_name}</p>
                    <p className="text-xs text-muted uppercase tracking-widest">{tr('bookings.customer')}</p>
                  </div>
                </div>
              </div>
            </div>
          );
        })}

        {upcomingBookings.length === 0 && (
          <div className="col-span-full py-16 flex flex-col items-center justify-center glass-panel rounded-xl text-muted">
            <CalendarDays className="w-14 h-14 mb-4 opacity-30" />
            <p className="font-headline uppercase tracking-widest text-sm">{tr('bookings.noUpcoming')}</p>
          </div>
        )}
      </div>
    </div>
  );
}
