import { useState } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { Globe, Gamepad2 } from 'lucide-react';
import { loginWithEmail, registerWithEmail, loginWithGoogle, loginWithFacebook } from '../../services/auth';
import { Logo } from '../../components/ui/Logo';
import { useLanguageStore } from '../../store/useLanguageStore';

const tx = {
  login:          { ar: 'تسجيل الدخول',              en: 'Sign In' },
  register:       { ar: 'حساب جديد',                 en: 'Register' },
  tagline:        { ar: 'وجهتك المثالية لتجارب الألعاب المميزة. احجز جلستك، خذ وجبتك، وارتقِ للمستوى التالي.', en: 'Your ultimate destination for premium gaming. Book your session, grab your snacks, and level up.' },
  fullName:       { ar: 'الاسم الكامل',               en: 'Full Name' },
  namePlaceholder:{ ar: 'محمد أحمد',                  en: 'John Doe' },
  email:          { ar: 'البريد الإلكتروني',          en: 'Email Address' },
  emailPlaceholder:{ ar: 'player@example.com',        en: 'player@example.com' },
  password:       { ar: 'كلمة المرور',                en: 'Password' },
  secureLogin:    { ar: 'تسجيل الدخول بأمان',         en: 'Secure Sign In' },
  createBtn:      { ar: 'إنشاء الحساب',               en: 'Create Account' },
  orContinue:     { ar: 'أو تابع عبر',                en: 'Or continue with' },
  langSwitch:     { ar: 'English',                    en: 'عربي' },
  authFailed:     { ar: 'فشل تسجيل الدخول. تحقق من بياناتك.', en: 'Authentication failed. Please check your credentials.' },
  welcomeBack:    { ar: 'مرحباً بعودتك 👾',           en: 'Welcome Back 👾' },
  joinUs:         { ar: 'انضم للعبة 🎮',              en: 'Join the Game 🎮' },
  subWelcome:     { ar: 'سجل دخولك واستمر في رحلتك',  en: 'Sign in to continue your journey' },
  subJoin:        { ar: 'أنشئ حسابك وابدأ اللعب',    en: 'Create your account and start playing' },
};

export default function Login() {
  const { lang, toggleLang } = useLanguageStore();
  const isRtl = lang === 'ar';
  const tr = (key: keyof typeof tx) => tx[key][lang];

  const [isRegistering, setIsRegistering] = useState(false);
  const [email, setEmail]       = useState('');
  const [password, setPassword] = useState('');
  const [name, setName]         = useState('');
  const [error, setError]       = useState('');
  const [loading, setLoading]   = useState(false);

  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const redirectTo = searchParams.get('redirect') || '/';

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      if (isRegistering) {
        await registerWithEmail(email, password, name);
      } else {
        await loginWithEmail(email, password);
      }
      navigate(redirectTo);
    } catch (err: any) {
      setError(err.message || tr('authFailed'));
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    try { await loginWithGoogle(); navigate(redirectTo); }
    catch (err: any) { setError(err.message); }
  };

  const handleFacebookLogin = async () => {
    try { await loginWithFacebook(); navigate(redirectTo); }
    catch (err: any) { setError(err.message); }
  };

  const switchMode = (registering: boolean) => {
    setIsRegistering(registering);
    setError('');
    setEmail('');
    setPassword('');
    setName('');
  };

  const inputClass =
    'w-full bg-background border border-white/10 rounded-xl px-4 py-3.5 text-gray-100 placeholder-white/20 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all text-sm';
  const labelClass = 'block text-xs font-bold text-muted uppercase tracking-widest mb-2';

  return (
    <div
      className="min-h-screen bg-background flex flex-col md:flex-row relative overflow-hidden"
      dir={isRtl ? 'rtl' : 'ltr'}
    >
      {/* Ambient glows */}
      <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-primary/20 rounded-full blur-[120px] pointer-events-none animate-pulse" />
      <div className="absolute bottom-1/4 right-1/4 w-[600px] h-[600px] bg-secondary/10 rounded-full blur-[150px] pointer-events-none animate-[pulse_4s_ease-in-out_infinite]" />

      {/* ── LEFT PANEL (brand) — Desktop only ── */}
      <div className="hidden md:flex w-full md:w-1/2 flex-col items-center justify-center p-8 z-10 border-e border-white/5 bg-surface/30 backdrop-blur-sm">
        <div className="max-w-md text-center flex flex-col items-center gap-6">
          <Logo className="scale-150 mb-4" />
          <div className="flex items-center gap-2 text-primary/60">
            <Gamepad2 className="w-5 h-5" />
            <span className="text-xs uppercase tracking-widest font-headline">Stitch Lounge</span>
            <Gamepad2 className="w-5 h-5" />
          </div>
          <p className="text-muted text-base leading-relaxed">{tr('tagline')}</p>

          {/* Decorative stat pills */}
          <div className="flex gap-3 mt-4 flex-wrap justify-center">
            {[
              { label: isRtl ? 'غرف VIP' : 'VIP Rooms',    value: '12+' },
              { label: isRtl ? 'لاعب نشط' : 'Active Players', value: '500+' },
              { label: isRtl ? 'ساعات لعب' : 'Hours Played',  value: '10K+' },
            ].map(stat => (
              <div key={stat.label} className="glass-panel px-4 py-2 rounded-xl text-center border border-white/10">
                <div className="text-primary font-headline font-bold text-lg">{stat.value}</div>
                <div className="text-muted text-xs">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── RIGHT PANEL (form) ── */}
      <div className="w-full md:w-1/2 flex items-center justify-center p-4 py-8 z-10 relative min-h-screen md:min-h-0">
        <div className="w-full max-w-md">

          {/* Mobile: Logo + branding */}
          <div className="flex flex-col items-center mb-6 md:hidden">
            <Logo className="mb-3" />
            <p className="text-muted text-xs text-center px-4">{tr('tagline')}</p>
          </div>

          {/* Card */}
          <div className="glass-panel rounded-2xl glow-box overflow-hidden">

            {/* ── TAB BAR ── */}
            <div className="flex border-b border-white/10">
              <button
                onClick={() => switchMode(false)}
                className={`flex-1 py-4 text-sm font-headline font-bold uppercase tracking-widest transition-all ${
                  !isRegistering
                    ? 'bg-primary/15 text-primary border-b-2 border-primary'
                    : 'text-muted hover:text-gray-300 hover:bg-white/5'
                }`}
              >
                {tr('login')}
              </button>
              <button
                onClick={() => switchMode(true)}
                className={`flex-1 py-4 text-sm font-headline font-bold uppercase tracking-widest transition-all ${
                  isRegistering
                    ? 'bg-primary/15 text-primary border-b-2 border-primary'
                    : 'text-muted hover:text-gray-300 hover:bg-white/5'
                }`}
              >
                {tr('register')}
              </button>
            </div>

            {/* Form body */}
            <div className="p-6 sm:p-8">

              {/* Header */}
              <div className="mb-6">
                <h2 className="text-xl font-headline font-bold text-white">
                  {isRegistering ? tr('joinUs') : tr('welcomeBack')}
                </h2>
                <p className="text-muted text-sm mt-1">
                  {isRegistering ? tr('subJoin') : tr('subWelcome')}
                </p>
              </div>

              {/* Language toggle */}
              <div className={`flex mb-5 ${isRtl ? 'justify-start' : 'justify-end'}`}>
                <button
                  onClick={toggleLang}
                  className="flex items-center gap-2 px-3 py-1.5 rounded-lg border border-white/10 text-muted hover:text-gray-100 hover:border-primary/40 transition-all text-xs font-headline"
                >
                  <Globe className="w-3.5 h-3.5" />
                  <span>{tr('langSwitch')}</span>
                </button>
              </div>

              {/* Error message */}
              {error && (
                <div className="bg-red-900/20 border border-red-500/40 text-red-400 px-4 py-3 rounded-xl mb-5 text-sm text-center">
                  {error}
                </div>
              )}

              {/* Form */}
              <form onSubmit={handleSubmit} className="space-y-4">
                {isRegistering && (
                  <div>
                    <label className={labelClass}>{tr('fullName')}</label>
                    <input
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className={inputClass}
                      placeholder={tr('namePlaceholder')}
                      required
                    />
                  </div>
                )}

                <div>
                  <label className={labelClass}>{tr('email')}</label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className={inputClass}
                    placeholder={tr('emailPlaceholder')}
                    required
                  />
                </div>

                <div>
                  <label className={labelClass}>{tr('password')}</label>
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className={inputClass}
                    placeholder="••••••••"
                    required
                  />
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-primary-container text-surface font-headline font-bold uppercase tracking-widest py-3.5 rounded-xl hover:bg-primary transition-all flex items-center justify-center gap-2 mt-2 disabled:opacity-50 active:scale-95"
                >
                  {loading ? (
                    <div className="w-5 h-5 border-2 border-surface border-t-transparent rounded-full animate-spin" />
                  ) : isRegistering ? (
                    <span>{tr('createBtn')}</span>
                  ) : (
                    <span>{tr('secureLogin')}</span>
                  )}
                </button>
              </form>

              {/* Divider */}
              <div className="relative my-6">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-white/10" />
                </div>
                <div className="relative flex justify-center text-xs">
                  <span className="px-3 bg-surface text-muted">{tr('orContinue')}</span>
                </div>
              </div>

              {/* Social Login — stacked on mobile, side by side on sm+ */}
              <div className="flex flex-col sm:flex-row gap-3">
                <button
                  onClick={handleGoogleLogin}
                  type="button"
                  className="flex-1 inline-flex justify-center items-center py-3 px-4 border border-white/10 rounded-xl bg-background text-sm font-medium text-gray-300 hover:bg-surface-highlight hover:border-white/20 transition-all gap-2 active:scale-95"
                >
                  <svg className="h-5 w-5 shrink-0" aria-hidden="true" viewBox="0 0 24 24">
                    <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                    <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                    <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                    <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
                    <path fill="none" d="M1 1h22v22H1z" />
                  </svg>
                  Google
                </button>

                <button
                  onClick={handleFacebookLogin}
                  type="button"
                  className="flex-1 inline-flex justify-center items-center py-3 px-4 border border-[#1877F2]/40 rounded-xl bg-[#1877F2]/10 text-sm font-medium text-[#60a5fa] hover:bg-[#1877F2]/20 hover:border-[#1877F2]/60 transition-all gap-2 active:scale-95"
                >
                  <svg className="h-5 w-5 shrink-0" fill="#1877F2" viewBox="0 0 24 24" aria-hidden="true">
                    <path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd" />
                  </svg>
                  Facebook
                </button>
              </div>

            </div>{/* end card body */}
          </div>{/* end card */}
        </div>
      </div>
    </div>
  );
}

