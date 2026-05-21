import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '../../store/useAuthStore';
import { useLoungeStore } from '../../store/useLoungeStore';
import { useLanguageStore } from '../../store/useLanguageStore';
import { Calendar, Clock, CreditCard, LogOut, PlusCircle, Globe } from 'lucide-react';
import { signOut } from '../../services/auth';
import { Logo } from '../../components/ui/Logo';

const tx = {
  welcome:        { ar: 'مرحباً،',                      en: 'Welcome,' },
  dashboard:      { ar: 'لوحتي',                        en: 'My Dashboard' },
  dashSub:        { ar: 'أدر جلساتك وحجوزاتك.',         en: 'Manage your sessions and bookings.' },
  newBooking:     { ar: 'حجز جديد',                     en: 'New Booking' },
  activeSessions: { ar: 'الجلسات النشطة',               en: 'Active Sessions' },
  pastSessions:   { ar: 'الجلسات السابقة',              en: 'Past Sessions' },
  wallet:         { ar: 'المحفظة',                      en: 'Wallet' },
  upcoming:       { ar: 'الحجوزات القادمة',             en: 'Upcoming Bookings' },
  noUpcoming:     { ar: 'لا توجد حجوزات قادمة.',        en: 'You have no upcoming bookings.' },
  bookNow:        { ar: 'احجز غرفة الآن',               en: 'Book a room now' },
  room:           { ar: 'غرفة:',                        en: 'Room:' },
  mins:           { ar: 'دقيقة',                        en: 'mins' },
  adminPanel:     { ar: 'لوحة الإدارة',                 en: 'Admin Panel' },
  langSwitch:     { ar: 'English',                      en: 'عربي' },
};

export default function CustomerDashboard() {
  const { user } = useAuthStore();
  const { bookings } = useLoungeStore();
  const { lang, toggleLang } = useLanguageStore();
  const navigate = useNavigate();
  const isRtl = lang === 'ar';
  const tr = (k: keyof typeof tx) => tx[k][lang];

  const myBookings     = bookings.filter(b => b.customer_id === user?.id);
  const activeBookings = myBookings.filter(b => b.status === 'confirmed' && new Date(b.end_time) > new Date());
  const pastBookings   = myBookings.filter(b => b.status === 'completed' || new Date(b.end_time) <= new Date());

  const handleSignOut = async () => {
    await signOut();
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-background" dir={isRtl ? 'rtl' : 'ltr'}>
      {/* ── NAV ── */}
      <nav className="bg-surface border-b border-white/5 p-4 sticky top-0 z-50">
        <div className="container mx-auto flex justify-between items-center">
          <Logo className="scale-75 origin-start" />
          <div className="flex items-center gap-3">
            <span className="text-muted hidden md:inline-block">
              {tr('welcome')} {user?.name}
            </span>
            {/* Language Toggle */}
            <button
              onClick={toggleLang}
              className="flex items-center gap-2 px-3 py-1.5 rounded-lg border border-white/10 text-muted hover:text-gray-100 hover:border-primary/40 transition-all text-xs font-headline"
            >
              <Globe className="w-4 h-4" />
              <span>{tr('langSwitch')}</span>
            </button>
            {user?.role === 'admin' && (
              <button
                onClick={() => navigate('/admin')}
                className="text-primary-container font-bold hover:text-white px-4 transition-colors hidden md:block"
              >
                {tr('adminPanel')}
              </button>
            )}
            <button
              onClick={handleSignOut}
              className="text-muted hover:text-white p-2 transition-colors"
              title="Sign Out"
            >
              <LogOut className="w-5 h-5" />
            </button>
          </div>
        </div>
      </nav>

      <div className="container mx-auto px-4 py-8 max-w-5xl">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
          <div>
            <h2 className="text-3xl font-headline font-bold text-white mb-2">{tr('dashboard')}</h2>
            <p className="text-muted">{tr('dashSub')}</p>
          </div>
          <button
            onClick={() => navigate('/customer/book')}
            className="bg-primary-container text-surface px-6 py-3 rounded-lg font-bold uppercase tracking-widest hover:bg-primary transition-all flex items-center gap-2 shadow-[0_0_20px_rgba(0,240,255,0.4)] hover:shadow-[0_0_30px_rgba(0,240,255,0.6)] hover:scale-105"
          >
            <PlusCircle className="w-5 h-5" />
            {tr('newBooking')}
          </button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <div className="glass-panel p-6 rounded-xl border-t-2 border-t-primary hover:scale-105 transition-transform glow-box">
            <div className="flex items-center gap-4 mb-2">
              <Calendar className="w-8 h-8 text-primary drop-shadow-[0_0_8px_rgba(0,240,255,0.8)]" />
              <h3 className="text-lg font-bold text-white">{tr('activeSessions')}</h3>
            </div>
            <p className="text-3xl font-headline text-transparent bg-clip-text bg-gradient-to-r from-primary to-white">{activeBookings.length}</p>
          </div>
          <div className="glass-panel p-6 rounded-xl border-t-2 border-t-secondary hover:scale-105 transition-transform glow-box">
            <div className="flex items-center gap-4 mb-2">
              <Clock className="w-8 h-8 text-secondary drop-shadow-[0_0_8px_rgba(255,0,85,0.8)]" />
              <h3 className="text-lg font-bold text-white">{tr('pastSessions')}</h3>
            </div>
            <p className="text-3xl font-headline text-transparent bg-clip-text bg-gradient-to-r from-secondary to-white">{pastBookings.length}</p>
          </div>
          <div className="glass-panel p-6 rounded-xl border-t-2 border-t-success hover:scale-105 transition-transform glow-box">
            <div className="flex items-center gap-4 mb-2">
              <CreditCard className="w-8 h-8 text-success drop-shadow-[0_0_8px_rgba(0,255,170,0.8)]" />
              <h3 className="text-lg font-bold text-white">{tr('wallet')}</h3>
            </div>
            <p className="text-3xl font-headline text-transparent bg-clip-text bg-gradient-to-r from-success to-white">EGP 0.00</p>
          </div>
        </div>

        {/* Upcoming bookings */}
        <h3 className="text-2xl font-headline font-bold text-white mb-6">{tr('upcoming')}</h3>
        <div className="space-y-4">
          {activeBookings.length === 0 ? (
            <div className="glass-panel p-8 text-center rounded-xl border-dashed">
              <p className="text-muted mb-4">{tr('noUpcoming')}</p>
              <button
                onClick={() => navigate('/customer/book')}
                className="text-primary hover:text-primary-container font-medium"
              >
                {tr('bookNow')}
              </button>
            </div>
          ) : (
            activeBookings.map(booking => (
              <div key={booking.id} className="glass-panel p-6 rounded-xl flex flex-col md:flex-row justify-between items-center gap-4">
                <div>
                  <h4 className="text-xl font-bold text-white mb-1">{tr('room')} {booking.room_id}</h4>
                  <p className="text-muted text-sm flex items-center gap-2">
                    <Calendar className="w-4 h-4" />
                    {new Date(booking.start_time).toLocaleString(lang === 'ar' ? 'ar-EG' : 'en-US')}
                    <span className="mx-2">•</span>
                    <Clock className="w-4 h-4" />
                    {booking.duration} {tr('mins')}
                  </p>
                </div>
                <div className="text-end">
                  <p className="text-lg font-bold text-primary-container mb-1">EGP {booking.total_price}</p>
                  <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider ${
                    booking.payment_status === 'paid' ? 'bg-success/20 text-success' : 'bg-accent/20 text-accent'
                  }`}>
                    {booking.payment_status}
                  </span>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
