import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { ArrowLeft, ArrowRight, Globe, Gamepad2 } from 'lucide-react';
import { useAuthStore } from '../../store/useAuthStore';
import { useLanguageStore } from '../../store/useLanguageStore';
import { Logo } from '../../components/ui/Logo';

const homeText = {
  tagline:    { ar: 'تجربة الألعاب الجيل القادم', en: 'Next-Gen Gaming Experience' },
  sub:        { ar: 'احجز غرفتك الخاصة لـ PS5، جرّب طاولات البلياردو، أو انضم إلى بطولاتنا. الملاذ الأمثل للاعبين.', en: 'Book your private PS5 room, hit the billiards tables, or join our tournaments. The ultimate vault for gamers.' },
  book:       { ar: 'احجز جلستك الآن', en: 'Book Your Session' },
  dashboard:  { ar: 'لوحة التحكم', en: 'Dashboard' },
  login:      { ar: 'تسجيل الدخول / إنشاء حساب', en: 'Login / Register' },
  langSwitch: { ar: 'English', en: 'عربي' },
  loginHint:  { ar: '⚡ يتطلب حساباً — سجّل دخولك لتكمل الحجز', en: '⚡ Requires account — sign in to complete booking' },
};

export default function Home() {
  const navigate = useNavigate();
  const { user } = useAuthStore();
  const { lang, toggleLang } = useLanguageStore();
  const isRtl = lang === 'ar';

  const [typedText, setTypedText] = useState('');
  const fullText = homeText.tagline[lang];

  // re-run typing animation whenever lang changes
  useEffect(() => {
    setTypedText('');
    let i = 0;
    const typing = setInterval(() => {
      setTypedText(fullText.slice(0, i + 1));
      i++;
      if (i === fullText.length) clearInterval(typing);
    }, 80);
    return () => clearInterval(typing);
  }, [fullText]);

  const ArrowIcon = isRtl ? ArrowLeft : ArrowRight;

  // If guest clicks Book → send to login with redirect back to booking
  const handleBookClick = () => {
    if (user) {
      navigate('/customer/book');
    } else {
      navigate('/login?redirect=%2Fcustomer%2Fbook');
    }
  };

  return (
    <div
      className="min-h-screen bg-background relative overflow-hidden"
      dir={isRtl ? 'rtl' : 'ltr'}
    >
      {/* Ambient glows */}
      <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-primary/20 rounded-full blur-[120px] pointer-events-none animate-pulse" />
      <div className="absolute bottom-1/4 right-1/4 w-[600px] h-[600px] bg-secondary/10 rounded-full blur-[150px] pointer-events-none animate-[pulse_4s_ease-in-out_infinite]" />

      {/* ── NAV ── */}
      <nav className="p-6 flex justify-between items-center relative z-10">
        <Logo />
        <div className="flex items-center gap-3">
          {/* Language Toggle */}
          <button
            onClick={toggleLang}
            className="flex items-center gap-2 px-3 py-2 rounded-lg border border-white/10 text-muted hover:text-gray-100 hover:border-primary/40 transition-all text-xs font-headline"
          >
            <Globe className="w-4 h-4" />
            <span>{homeText.langSwitch[lang]}</span>
          </button>

          {/* Auth Button — always visible */}
          {user ? (
            <button
              onClick={() => navigate(user.role === 'customer' ? '/customer' : '/admin')}
              className="px-6 py-2 bg-primary-container text-surface font-bold uppercase tracking-widest rounded-lg hover:bg-primary transition-colors"
            >
              {homeText.dashboard[lang]}
            </button>
          ) : (
            <button
              id="nav-login-btn"
              onClick={() => navigate('/login')}
              className="flex items-center gap-2 px-6 py-2 bg-primary-container text-surface font-bold uppercase tracking-widest rounded-lg hover:bg-primary transition-all shadow-[0_0_15px_rgba(0,240,255,0.3)] hover:shadow-[0_0_25px_rgba(0,240,255,0.5)] hover:scale-105"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4"/>
                <polyline points="10 17 15 12 10 7"/>
                <line x1="15" y1="12" x2="3" y2="12"/>
              </svg>
              {homeText.login[lang]}
            </button>
          )}
        </div>
      </nav>

      {/* ── HERO ── */}
      <main className="container mx-auto px-6 pt-20 pb-32 text-center relative z-10 flex flex-col items-center justify-center min-h-[80vh]">
        <div className="flex items-center justify-center gap-3 mb-6">
          <Gamepad2 className="w-8 h-8 text-primary-container" />
          <span className="text-primary-container font-headline uppercase tracking-widest text-sm">Stitch Lounge</span>
        </div>

        <h1 className="text-5xl md:text-7xl font-headline font-bold text-white mb-6 uppercase tracking-wider min-h-[140px] md:min-h-[160px]">
          {typedText}
          <span className="animate-[ping_1s_infinite] ml-1 rtl:ml-0 rtl:mr-1">|</span>
        </h1>

        <p className="text-xl text-muted mb-10 max-w-2xl mx-auto leading-relaxed">
          {homeText.sub[lang]}
        </p>

        <button
          id="hero-book-btn"
          onClick={handleBookClick}
          className="px-8 py-4 bg-primary-container text-surface font-headline font-bold text-lg uppercase tracking-widest rounded-xl hover:bg-primary transition-all flex items-center gap-3 shadow-[0_0_20px_rgba(0,240,255,0.4)] hover:shadow-[0_0_40px_rgba(0,240,255,0.6)] hover:scale-105"
        >
          {homeText.book[lang]}
          <ArrowIcon className="w-6 h-6" />
        </button>

        {/* Subtle hint for guests */}
        {!user && (
          <p className="mt-4 text-xs text-muted/60 animate-pulse">
            {homeText.loginHint[lang]}
          </p>
        )}
      </main>
    </div>
  );
}
