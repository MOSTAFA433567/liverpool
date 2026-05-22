import { useState } from 'react';
import { useOutletContext } from 'react-router-dom';
import { useLoungeStore } from '../../store/useLoungeStore';
import { useToastStore } from '../../store/useToastStore';
import { ShoppingCart, Plus, Minus } from 'lucide-react';
import { useSearchParams } from 'react-router-dom';
import { db } from '../../services/db';
import type { Lang } from '../../store/useLanguageStore';
import type { useTranslation } from '../../i18n/translations';

type OutletCtx = { lang: Lang; tr: ReturnType<typeof useTranslation> };

export default function POS() {
  const products = useLoungeStore(state => state.products);
  const sessions = useLoungeStore(state => state.sessions);
  const rooms    = useLoungeStore(state => state.rooms);
  const { tr, lang } = useOutletContext<OutletCtx>();

  const [searchParams]     = useSearchParams();
  const initialSessionId   = searchParams.get('session');
  const [selectedSessionId, setSelectedSessionId] = useState<string>(initialSessionId || '');
  const [cart, setCart]    = useState<{ product: any; qty: number }[]>([]);
  const [categoryFilter, setCategoryFilter] = useState<string>('All');
  const [isBouncing, setIsBouncing] = useState(false);
  const { addToast }       = useToastStore();

  const categories       = ['All', ...new Set(products.map(p => p.category))];
  const filteredProducts = products.filter(p => categoryFilter === 'All' || p.category === categoryFilter);
  const activeSessions   = sessions.filter(s => s.status === 'active');
  const cartTotal        = cart.reduce((sum, item) => sum + item.product.price * item.qty, 0);

  const addToCart = (product: any) => {
    setCart(prev => {
      const existing = prev.find(item => item.product.id === product.id);
      if (existing) return prev.map(item => item.product.id === product.id ? { ...item, qty: item.qty + 1 } : item);
      return [...prev, { product, qty: 1 }];
    });
    setIsBouncing(true);
    setTimeout(() => setIsBouncing(false), 300);
    addToast(`${product.name} ${lang === 'ar' ? 'أضيف للسلة' : 'added to cart'}`, 'success');
  };

  const updateQty = (productId: string, delta: number) => {
    setCart(prev =>
      prev.map(item => item.product.id === productId ? { ...item, qty: Math.max(0, item.qty + delta) } : item)
          .filter(item => item.qty > 0)
    );
  };

  const handleCheckout = async () => {
    if (cart.length === 0) return;
    if (selectedSessionId) {
      const session = sessions.find(s => s.id === selectedSessionId);
      if (session) {
        const newOrders = cart.map(c => ({ product_id: c.product.id, name: c.product.name, price: c.product.price, quantity: c.qty }));
        await db.updateSession(session.id, { orders: [...session.orders, ...newOrders] });
        addToast(lang === 'ar' ? 'تمت الإضافة للجلسة بنجاح!' : 'Added to session tab successfully!', 'success');
        setCart([]);
      }
    } else {
      addToast(lang === 'ar' ? `تمت معالجة الطلب! الإجمالي: $${cartTotal.toFixed(2)}` : `Walk-in order processed! Total: $${cartTotal.toFixed(2)}`, 'success');
      setCart([]);
    }
  };

  return (
    <div className="flex flex-col lg:flex-row gap-8 h-[calc(100vh-8rem)]" dir={lang === 'ar' ? 'rtl' : 'ltr'}>
      {/* Products */}
      <div className="flex-1 flex flex-col space-y-6">
        <div>
          <h1 className="font-headline text-3xl font-bold tracking-tight text-gray-100 uppercase">{tr('pos.title')}</h1>
          <p className="text-muted mt-1 text-sm">{tr('pos.subtitle')}</p>
        </div>

        {/* Categories */}
        <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setCategoryFilter(cat)}
              className={`px-4 py-2 rounded-full font-headline text-sm tracking-widest uppercase transition-colors whitespace-nowrap ${
                categoryFilter === cat
                  ? 'bg-primary-container text-surface font-bold shadow-[0_0_10px_rgba(0,209,255,0.4)]'
                  : 'bg-surface-highlight text-muted hover:text-gray-100'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 overflow-y-auto pb-8">
          {filteredProducts.map(product => (
            <button
              key={product.id}
              onClick={() => addToCart(product)}
              className="glass-panel p-4 rounded-xl text-start hover:scale-105 hover:border-primary-container/50 transition-all group flex flex-col justify-between aspect-square"
            >
              <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                <span className="text-primary font-bold">{product.name[0]}</span>
              </div>
              <div>
                <h3 className="font-headline font-bold text-gray-100 leading-tight mb-1">{product.name}</h3>
                <p className="text-primary-container font-bold">${product.price.toFixed(2)}</p>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Cart */}
      <div className="w-full lg:w-96 glass-panel rounded-xl flex flex-col h-full border-t-4 border-t-secondary">
        <div className="p-6 border-b border-white/10">
          <h2 className="font-headline font-bold text-gray-100 tracking-widest uppercase flex items-center gap-2">
            <ShoppingCart className="w-5 h-5 text-secondary" />
            {tr('pos.cart')}
          </h2>
        </div>

        <div className="flex-1 overflow-y-auto p-6 space-y-4">
          {cart.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-muted opacity-50">
              <ShoppingCart className="w-12 h-12 mb-4" />
              <p className="font-headline tracking-widest uppercase text-sm">{tr('pos.empty')}</p>
            </div>
          ) : (
            cart.map(item => (
              <div key={item.product.id} className="flex justify-between items-center bg-background/50 p-3 rounded-lg border border-white/5">
                <div>
                  <p className="font-bold text-gray-100 text-sm">{item.product.name}</p>
                  <p className="text-secondary font-bold text-sm">${(item.product.price * item.qty).toFixed(2)}</p>
                </div>
                <div className="flex items-center gap-3 bg-surface-highlight rounded-lg px-2 py-1">
                  <button onClick={() => updateQty(item.product.id, -1)} className="text-muted hover:text-gray-100"><Minus className="w-4 h-4" /></button>
                  <span className="font-bold w-4 text-center">{item.qty}</span>
                  <button onClick={() => updateQty(item.product.id, 1)} className="text-muted hover:text-gray-100"><Plus className="w-4 h-4" /></button>
                </div>
              </div>
            ))
          )}
        </div>

        <div className="p-6 bg-surface-highlight/50 border-t border-white/10 space-y-4">
          <div className="flex justify-between items-center">
            <span className="text-muted uppercase tracking-widest text-xs font-bold">{tr('pos.total')}</span>
            <span className={`font-headline text-3xl font-black text-secondary glow-text transition-transform ${isBouncing ? 'scale-125' : 'scale-100'}`}>
              ${cartTotal.toFixed(2)}
            </span>
          </div>

          <div className="space-y-2">
            <label className="block text-xs font-bold text-muted uppercase tracking-widest">{tr('pos.linkSession')}</label>
            <select
              value={selectedSessionId}
              onChange={e => setSelectedSessionId(e.target.value)}
              className="w-full bg-background border border-white/10 rounded-lg px-4 py-3 text-gray-100 focus:outline-none focus:border-secondary focus:ring-1 focus:ring-secondary transition-all"
            >
              <option value="">{tr('pos.walkin')}</option>
              {activeSessions.map(session => {
                const room = rooms.find(r => r.id === session.room_id);
                return (
                  <option key={session.id} value={session.id}>
                    {room?.name} (Session {session.id.slice(-4)})
                  </option>
                );
              })}
            </select>
          </div>

          <button
            onClick={handleCheckout}
            disabled={cart.length === 0}
            className="w-full bg-secondary text-surface font-headline font-bold uppercase tracking-widest py-3 rounded-lg hover:bg-secondary/80 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {selectedSessionId ? tr('pos.addTab') : tr('pos.processPayment')}
          </button>
        </div>
      </div>
    </div>
  );
}
