import { useOutletContext } from 'react-router-dom';
import { useLoungeStore } from '../../store/useLoungeStore';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { TrendingUp, Gamepad2, ShoppingCart } from 'lucide-react';
import type { Lang } from '../../store/useLanguageStore';
import type { useTranslation } from '../../i18n/translations';

type OutletCtx = { lang: Lang; tr: ReturnType<typeof useTranslation> };

export default function Reports() {
  const sessions = useLoungeStore(state => state.sessions);
  const { tr, lang } = useOutletContext<OutletCtx>();

  const data = [
    { name: lang === 'ar' ? 'الإثنين' : 'Mon',  gaming: 400, food: 240 },
    { name: lang === 'ar' ? 'الثلاثاء' : 'Tue', gaming: 300, food: 139 },
    { name: lang === 'ar' ? 'الأربعاء' : 'Wed', gaming: 200, food: 980 },
    { name: lang === 'ar' ? 'الخميس' : 'Thu',   gaming: 278, food: 390 },
    { name: lang === 'ar' ? 'الجمعة' : 'Fri',   gaming: 189, food: 480 },
    { name: lang === 'ar' ? 'السبت' : 'Sat',    gaming: 239, food: 380 },
    { name: lang === 'ar' ? 'الأحد' : 'Sun',    gaming: 349, food: 430 },
  ];

  const totalGamingRev = sessions.reduce((sum, s) => sum + s.total_amount, 0) + 1240;
  const totalFoodRev   = sessions.reduce((sum, s) => sum + s.orders.reduce((oSum, o) => oSum + o.price * o.quantity, 0), 0) + 840;

  return (
    <div className="space-y-8 max-w-6xl mx-auto" dir={lang === 'ar' ? 'rtl' : 'ltr'}>
      <div>
        <h1 className="font-headline text-3xl font-bold tracking-tight text-gray-100 uppercase">{tr('reports.title')}</h1>
        <p className="text-muted mt-1 text-sm">{tr('reports.subtitle')}</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="glass-panel p-6 rounded-xl flex flex-col justify-between h-32 border-s-4 border-s-primary-container relative overflow-hidden group">
          <div className="absolute top-0 end-0 p-4 opacity-10"><TrendingUp className="w-16 h-16 text-primary-container" /></div>
          <h2 className="font-headline text-xs tracking-widest text-muted uppercase">{tr('reports.totalRev')}</h2>
          <div className="flex items-baseline gap-2">
            <span className="font-headline text-xl text-muted">$</span>
            <span className="font-headline text-4xl font-bold text-gray-100">{(totalGamingRev + totalFoodRev).toFixed(2)}</span>
          </div>
        </div>

        <div className="glass-panel p-6 rounded-xl flex flex-col justify-between h-32 border-s-4 border-s-secondary relative overflow-hidden">
          <div className="absolute top-0 end-0 p-4 opacity-10"><Gamepad2 className="w-16 h-16 text-secondary" /></div>
          <h2 className="font-headline text-xs tracking-widest text-muted uppercase">{tr('reports.gamingRev')}</h2>
          <div className="flex items-baseline gap-2">
            <span className="font-headline text-xl text-muted">$</span>
            <span className="font-headline text-4xl font-bold text-gray-100">{totalGamingRev.toFixed(2)}</span>
          </div>
        </div>

        <div className="glass-panel p-6 rounded-xl flex flex-col justify-between h-32 border-s-4 border-s-accent relative overflow-hidden">
          <div className="absolute top-0 end-0 p-4 opacity-10"><ShoppingCart className="w-16 h-16 text-accent" /></div>
          <h2 className="font-headline text-xs tracking-widest text-muted uppercase">{tr('reports.foodRev')}</h2>
          <div className="flex items-baseline gap-2">
            <span className="font-headline text-xl text-muted">$</span>
            <span className="font-headline text-4xl font-bold text-gray-100">{totalFoodRev.toFixed(2)}</span>
          </div>
        </div>
      </div>

      <div className="glass-panel p-8 rounded-xl h-[400px]">
        <h2 className="font-headline font-bold text-gray-100 tracking-widest uppercase mb-6">{tr('reports.revSplit')}</h2>
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data}>
            <CartesianGrid strokeDasharray="3 3" stroke="#ffffff10" />
            <XAxis dataKey="name" stroke="#859399" fontSize={12} tickLine={false} />
            <YAxis stroke="#859399" fontSize={12} tickLine={false} axisLine={false} tickFormatter={v => `$${v}`} />
            <Tooltip
              cursor={{ fill: '#ffffff05' }}
              contentStyle={{ backgroundColor: '#1b1b1e', border: '1px solid #ffffff15', borderRadius: '8px' }}
            />
            <Bar dataKey="gaming" stackId="a" fill="#00d1ff" radius={[0, 0, 4, 4]} />
            <Bar dataKey="food"   stackId="a" fill="#d3bbff" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
