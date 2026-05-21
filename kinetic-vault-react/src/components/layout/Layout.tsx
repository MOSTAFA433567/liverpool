import { Link, Outlet, useLocation, useNavigate } from 'react-router-dom';
import {
  LayoutDashboard, Gamepad2, CalendarDays, ShoppingCart,
  BarChart3, Settings, LogOut, User, Users, Zap, Globe,
  ChevronLeft, ChevronRight,
} from 'lucide-react';
import { useAuthStore } from '../../store/useAuthStore';
import { useLanguageStore } from '../../store/useLanguageStore';
import { useTranslation } from '../../i18n/translations';
import clsx from 'clsx';
import { useEffect } from 'react';
import { db } from '../../services/db';
import { useLoungeStore } from '../../store/useLoungeStore';
import { Logo } from '../ui/Logo';

export function Layout() {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const { user, logout } = useAuthStore();
  const { lang, toggleLang } = useLanguageStore();
  const tr = useTranslation(lang);
  const isRtl = lang === 'ar';

  const setRooms    = useLoungeStore(state => state.setRooms);
  const setSessions = useLoungeStore(state => state.setSessions);
  const setBookings = useLoungeStore(state => state.setBookings);
  const setProducts = useLoungeStore(state => state.setProducts);

  useEffect(() => {
    const unsubRooms    = db.subscribeToRooms(setRooms);
    const unsubSessions = db.subscribeToSessions(setSessions);
    const unsubBookings = db.subscribeToBookings(setBookings);
    const unsubProducts = db.subscribeToProducts(setProducts);
    return () => { unsubRooms(); unsubSessions(); unsubBookings(); unsubProducts(); };
  }, [setRooms, setSessions, setBookings, setProducts]);

  const navItems = [
    { key: 'nav.dashboard', path: '/admin',          icon: LayoutDashboard,  exact: true },
    { key: 'nav.rooms',     path: '/admin/rooms',    icon: Gamepad2 },
    { key: 'nav.bookings',  path: '/admin/bookings', icon: CalendarDays },
    { key: 'nav.pos',       path: '/admin/pos',      icon: ShoppingCart },
    { key: 'nav.reports',   path: '/admin/reports',  icon: BarChart3 },
    { key: 'nav.settings',  path: '/admin/settings', icon: Settings },
    { key: 'nav.customer',  path: '/customer',       icon: Users },
  ];

  // Top 3 quick-launch items (Rooms, Bookings, POS)
  const quickItems = navItems.slice(1, 4);

  const isActive = (item: typeof navItems[0]) =>
    item.exact ? pathname === item.path : pathname.startsWith(item.path);

  // Page title from current route
  const currentNav = navItems.find(n => isActive(n));
  const pageTitle = currentNav ? tr(currentNav.key) : '';

  return (
    <div
      className={clsx('flex h-screen bg-surface overflow-hidden', isRtl ? 'rtl' : 'ltr')}
      dir={isRtl ? 'rtl' : 'ltr'}
    >
      {/* ════════════ SIDEBAR ════════════ */}
      <aside
        className={clsx(
          'w-72 bg-background/95 backdrop-blur-2xl border-white/5 flex-col z-40 hidden md:flex flex-shrink-0',
          isRtl ? 'border-l' : 'border-r'
        )}
      >
        {/* Logo + Brand */}
        <div className="px-6 pt-6 pb-4 flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary-container/30 to-primary/10 flex items-center justify-center border border-primary/30 shadow-[0_0_12px_rgba(0,240,255,0.2)]">
            <Zap className="text-primary-container w-5 h-5" />
          </div>
          <div>
            <h1 className="font-headline font-black text-gray-100 tracking-tight text-sm uppercase">Stitch Lounge</h1>
            <p className="text-[10px] text-primary-container/70 tracking-widest uppercase">Gaming Hub</p>
          </div>
        </div>

        {/* User Profile Card */}
        <div className="mx-4 mb-4 p-4 rounded-xl bg-surface-highlight/60 border border-white/5 flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center border border-primary/30 flex-shrink-0">
            <User className="text-primary w-5 h-5" />
          </div>
          <div className="flex-1 min-w-0">
            <h2 className="font-headline font-bold text-gray-100 tracking-tight text-sm truncate">{user?.name || 'ADMIN'}</h2>
            <p className="text-[10px] text-muted">{tr('sidebar.clearance')}</p>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 px-3 space-y-1 overflow-y-auto scrollbar-hide">
          {navItems.map((item) => {
            const Icon = item.icon;
            const active = isActive(item);
            return (
              <Link
                key={item.path}
                to={item.path}
                className={clsx(
                  'flex items-center gap-3 px-4 py-3 rounded-xl font-headline text-sm tracking-wide transition-all duration-200 group',
                  active
                    ? 'text-primary-container bg-primary-container/10 shadow-[inset_0_0_0_1px_rgba(0,229,255,0.2)] glow-box'
                    : 'text-muted hover:text-gray-100 hover:bg-surface-highlight/60'
                )}
              >
                <Icon className={clsx('w-5 h-5 flex-shrink-0 transition-colors', active ? 'text-primary-container' : 'group-hover:text-gray-100')} />
                <span className={clsx(isRtl && 'text-right')}>{tr(item.key)}</span>
                {active && (
                  <div className={clsx('ms-auto w-1.5 h-1.5 rounded-full bg-primary-container animate-glow-pulse')} />
                )}
              </Link>
            );
          })}
        </nav>

        {/* Bottom: Language + Logout */}
        <div className="p-3 border-t border-white/5 space-y-1">
          {/* Language Toggle */}
          <button
            onClick={toggleLang}
            className="flex items-center gap-3 px-4 py-3 w-full rounded-xl text-muted hover:text-gray-100 hover:bg-surface-highlight/60 transition-all duration-200 font-headline text-sm"
          >
            <Globe className="w-5 h-5 flex-shrink-0" />
            <span>{tr('lang.switch')}</span>
            <span className={clsx(
              'ms-auto px-2 py-0.5 rounded-full text-[10px] font-bold border',
              'border-primary/30 text-primary-container bg-primary/10'
            )}>
              {lang.toUpperCase()}
            </span>
          </button>

          {/* Logout */}
          <button
            onClick={() => logout()}
            className="flex items-center gap-3 px-4 py-3 w-full rounded-xl text-error hover:bg-error/10 transition-all duration-200 font-headline text-sm"
          >
            <LogOut className="w-5 h-5 flex-shrink-0" />
            <span>{tr('nav.logout')}</span>
          </button>
        </div>
      </aside>

      {/* ════════════ MAIN AREA ════════════ */}
      <div className="flex-1 flex flex-col relative z-10 min-w-0">

        {/* ── TOP HEADER (Desktop) ── */}
        <header className="hidden md:flex h-16 border-b border-white/5 bg-background/70 backdrop-blur-md items-center px-8 justify-between flex-shrink-0">
          {/* Page Title */}
          <div className="flex items-center gap-3">
            {isRtl
              ? <ChevronLeft className="w-4 h-4 text-muted" />
              : <ChevronRight className="w-4 h-4 text-muted" />
            }
            <h2 className="font-headline font-bold text-gray-100 tracking-tight">{pageTitle}</h2>
          </div>

          {/* Quick Access — Top 3 Nav Tabs */}
          <div className="flex items-center gap-1 bg-surface-highlight/40 p-1 rounded-xl border border-white/5">
            {quickItems.map(item => {
              const Icon = item.icon;
              const active = isActive(item);
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className={clsx(
                    'flex items-center gap-2 px-4 py-2 rounded-lg font-headline text-xs tracking-widest uppercase transition-all duration-200',
                    active
                      ? 'bg-primary-container/15 text-primary-container shadow-[inset_0_0_0_1px_rgba(0,229,255,0.25)]'
                      : 'text-muted hover:text-gray-100 hover:bg-white/5'
                  )}
                >
                  <Icon className="w-4 h-4" />
                  <span>{tr(item.key)}</span>
                </Link>
              );
            })}
          </div>

          {/* Right: Lang toggle pill */}
          <button
            onClick={toggleLang}
            className="flex items-center gap-2 px-3 py-1.5 rounded-lg border border-white/10 text-muted hover:text-gray-100 hover:border-primary/30 transition-all text-xs font-headline"
          >
            <Globe className="w-4 h-4" />
            <span>{tr('lang.switch')}</span>
          </button>
        </header>

        {/* ── TOP HEADER (Mobile) ── */}
        <header className="md:hidden h-16 border-b border-white/5 bg-background/80 backdrop-blur-md flex items-center px-4 justify-between flex-shrink-0">
          <Logo className="scale-75 origin-left" />
          <div className="flex items-center gap-3">
            <button onClick={toggleLang} className="text-xs text-muted border border-white/10 px-2 py-1 rounded font-headline">
              {tr('lang.switch')}
            </button>
            <User className="w-6 h-6 text-muted" />
          </div>
        </header>

        {/* ── MAIN CONTENT ── */}
        <main className="flex-1 overflow-y-auto relative scrollbar-hide">
          {/* Ambient glows */}
          <div className="fixed top-[-10%] right-[-5%] w-[40vw] h-[40vw] bg-primary-container/5 rounded-full blur-[120px] pointer-events-none z-0" />
          <div className="fixed bottom-[-10%] left-[-5%] w-[30vw] h-[30vw] bg-secondary/5 rounded-full blur-[100px] pointer-events-none z-0" />

          <div className="relative z-10 p-4 md:p-8">
            <Outlet context={{ lang, tr }} />
          </div>
        </main>

        {/* ── MOBILE NAV ── */}
        <nav
          className="md:hidden bg-background/90 backdrop-blur-xl border-t border-white/5 flex justify-around p-3 z-50"
          dir={isRtl ? 'rtl' : 'ltr'}
        >
          {navItems.slice(0, 5).map((item) => {
            const Icon = item.icon;
            const active = isActive(item);
            return (
              <Link
                key={item.path}
                to={item.path}
                className={clsx(
                  'flex flex-col items-center gap-1',
                  active ? 'text-primary-container drop-shadow-[0_0_8px_rgba(0,209,255,0.6)]' : 'text-muted'
                )}
              >
                <Icon className="w-5 h-5" />
                <span className="text-[10px] font-bold uppercase">{tr(item.key)}</span>
              </Link>
            );
          })}
        </nav>
      </div>
    </div>
  );
}
