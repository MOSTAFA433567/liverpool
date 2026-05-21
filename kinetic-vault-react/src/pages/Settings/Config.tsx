import { useState } from 'react';
import { useOutletContext } from 'react-router-dom';
import { Save, Gamepad2, Coffee } from 'lucide-react';
import type { Lang } from '../../store/useLanguageStore';
import type { useTranslation } from '../../i18n/translations';

type OutletCtx = { lang: Lang; tr: ReturnType<typeof useTranslation> };

export default function Settings() {
  const [ps5Rate,      setPs5Rate]      = useState(15);
  const [ps4Rate,      setPs4Rate]      = useState(8);
  const [billiardRate, setBilliardRate] = useState(12);
  const { tr, lang } = useOutletContext<OutletCtx>();

  return (
    <div className="space-y-8 max-w-4xl mx-auto" dir={lang === 'ar' ? 'rtl' : 'ltr'}>
      <div>
        <h1 className="font-headline text-3xl font-bold tracking-tight text-gray-100 uppercase">{tr('settings.title')}</h1>
        <p className="text-muted mt-1 text-sm">{tr('settings.subtitle')}</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="space-y-8">
          <div className="glass-panel p-6 rounded-xl">
            <h2 className="font-headline font-bold text-gray-100 tracking-widest uppercase flex items-center gap-2 mb-6">
              <Gamepad2 className="w-5 h-5 text-primary-container" /> {tr('settings.roomRates')}
            </h2>

            <div className="space-y-4">
              {[
                { label: tr('settings.ps5Rate'),  value: ps5Rate,      setter: setPs5Rate },
                { label: tr('settings.ps4Rate'),  value: ps4Rate,      setter: setPs4Rate },
                { label: tr('settings.billiard'), value: billiardRate, setter: setBilliardRate },
              ].map(({ label, value, setter }) => (
                <div key={label}>
                  <label className="block text-xs font-bold text-muted uppercase tracking-widest mb-2">{label}</label>
                  <div className="relative">
                    <span className={`absolute ${lang === 'ar' ? 'end-4' : 'start-4'} top-3 text-muted`}>$</span>
                    <input
                      type="number"
                      value={value}
                      onChange={e => setter(Number(e.target.value))}
                      className={`w-full bg-background border border-white/10 rounded-lg ${lang === 'ar' ? 'pe-8 ps-4' : 'ps-8 pe-4'} py-3 text-gray-100 focus:outline-none focus:border-primary-container focus:ring-1 focus:ring-primary-container transition-all`}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          <button className="w-full bg-primary-container text-surface font-headline font-bold uppercase tracking-widest py-3 rounded-lg hover:bg-primary transition-colors flex items-center justify-center gap-2">
            <Save className="w-5 h-5" />
            {tr('settings.save')}
          </button>
        </div>

        <div className="space-y-8">
          <div className="glass-panel p-6 rounded-xl">
            <h2 className="font-headline font-bold text-gray-100 tracking-widest uppercase flex items-center gap-2 mb-6">
              <Coffee className="w-5 h-5 text-accent" /> {tr('settings.sysPrefs')}
            </h2>

            <div className="space-y-6">
              {[
                { label: tr('settings.darkMode'),    desc: tr('settings.darkModeDesc'),    on: true },
                { label: tr('settings.autoBilling'), desc: tr('settings.autoBillingDesc'), on: true },
                { label: tr('settings.soundAlerts'), desc: tr('settings.soundAlertsDesc'), on: false },
              ].map(({ label, desc, on }) => (
                <div key={label} className="flex items-center justify-between">
                  <div>
                    <p className="font-bold text-gray-100">{label}</p>
                    <p className="text-xs text-muted">{desc}</p>
                  </div>
                  <div className={`w-12 h-6 ${on ? 'bg-primary-container' : 'bg-surface-highlight'} rounded-full relative cursor-pointer flex-shrink-0`}>
                    <div className={`absolute ${on ? 'end-1' : 'start-1'} top-1 w-4 h-4 rounded-full ${on ? 'bg-surface' : 'bg-muted'} transition-all`} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
