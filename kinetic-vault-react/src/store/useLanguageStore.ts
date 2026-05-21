import { create } from 'zustand';

export type Lang = 'ar' | 'en';

interface LanguageState {
  lang: Lang;
  setLang: (lang: Lang) => void;
  toggleLang: () => void;
}

export const useLanguageStore = create<LanguageState>((set, get) => ({
  lang: (localStorage.getItem('kv_lang') as Lang) || 'ar',
  setLang: (lang) => {
    localStorage.setItem('kv_lang', lang);
    document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';
    document.documentElement.lang = lang;
    set({ lang });
  },
  toggleLang: () => {
    const next: Lang = get().lang === 'ar' ? 'en' : 'ar';
    get().setLang(next);
  },
}));

// Apply on initial load
const savedLang = (localStorage.getItem('kv_lang') as Lang) || 'ar';
document.documentElement.dir = savedLang === 'ar' ? 'rtl' : 'ltr';
document.documentElement.lang = savedLang;
