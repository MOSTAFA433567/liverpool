import { useState, useEffect } from 'react';
import { useParams, useNavigate, useSearchParams } from 'react-router-dom';
import { useLoungeStore } from '../../store/useLoungeStore';
import { useLanguageStore } from '../../store/useLanguageStore';
import { initiatePayment } from '../../services/paymob';
import { CreditCard, Smartphone, CheckCircle, XCircle } from 'lucide-react';
import { updateBookingStatus } from '../../services/firestore';

const tx = {
  title:          { ar: 'إتمام الدفع',                         en: 'Complete Payment' },
  orderSummary:   { ar: 'ملخص الطلب',                          en: 'Order Summary' },
  bookingRef:     { ar: 'رقم الحجز',                           en: 'Booking Reference' },
  duration:       { ar: 'المدة',                               en: 'Duration' },
  hours:          { ar: 'ساعة',                                en: 'Hour(s)' },
  total:          { ar: 'الإجمالي',                            en: 'Total' },
  payMethod:      { ar: 'طريقة الدفع',                        en: 'Payment Method' },
  creditCard:     { ar: 'بطاقة ائتمانية',                     en: 'Credit Card' },
  vodafone:       { ar: 'فودافون كاش',                        en: 'Vodafone Cash' },
  vodafoneNum:    { ar: 'رقم فودافون كاش',                    en: 'Vodafone Cash Number' },
  connecting:     { ar: 'جارٍ الاتصال بباي موب...',           en: 'Connecting to Paymob...' },
  pay:            { ar: 'ادفع',                                en: 'Pay' },
  loading:        { ar: 'جارٍ تحميل تفاصيل الحجز...',         en: 'Loading booking details...' },
  successTitle:   { ar: 'تمّ الدفع بنجاح!',                   en: 'Payment Successful!' },
  successMsg:     { ar: 'تم تأكيد حجزك. استعد للعب!',         en: 'Your booking is confirmed. Get ready to game.' },
  toDashboard:    { ar: 'الذهاب للوحتي',                      en: 'Go to Dashboard' },
  failedTitle:    { ar: 'فشل الدفع',                          en: 'Payment Failed' },
  failedMsg:      { ar: 'لم نتمكن من معالجة دفعتك. حاول مرة أخرى أو استخدم طريقة دفع أخرى.', en: "We couldn't process your payment. Please try again or use another method." },
  tryAgain:       { ar: 'حاول مرة أخرى',                      en: 'Try Again' },
};

export default function Checkout() {
  const { bookingId } = useParams<{ bookingId: string }>();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { bookings } = useLoungeStore();
  const { lang } = useLanguageStore();
  const isRtl = lang === 'ar';
  const tr = (k: keyof typeof tx) => tx[k][lang];

  const [paymentMethod, setPaymentMethod] = useState<'card' | 'wallet' | null>(null);
  const [mobileNumber, setMobileNumber]   = useState('');
  const [loading, setLoading]             = useState(false);
  const [paymentStatus, setPaymentStatus] = useState<'pending' | 'success' | 'failed'>('pending');

  const booking = bookings.find(b => b.id === bookingId);

  useEffect(() => {
    const success = searchParams.get('success');
    if (success === 'true' && bookingId) {
      setPaymentStatus('success');
      handlePaymentSuccess(bookingId);
    } else if (success === 'false') {
      setPaymentStatus('failed');
    }
  }, [searchParams, bookingId]);

  const handlePaymentSuccess = async (id: string) => {
    try {
      await updateBookingStatus(id, 'confirmed', {
        payment_status: 'paid',
        payment_method: searchParams.get('method') || 'visa',
        transaction_id: searchParams.get('transaction_id') || 'txn_demo'
      });
    } catch (e) {
      console.error(e);
    }
  };

  const handlePay = async () => {
    if (!booking || !paymentMethod) return;
    if (paymentMethod === 'wallet' && !mobileNumber) return alert(lang === 'ar' ? 'أدخل رقم فودافون كاش' : 'Enter Vodafone Cash number');
    setLoading(true);
    try {
      const names = booking.customer_name.split(' ');
      const redirectUrl = await initiatePayment(
        paymentMethod,
        booking.total_price,
        booking.id,
        {
          first_name: names[0] || 'Gamer',
          last_name: names[1] || 'Player',
          email: `${booking.customer_id}@example.com`,
          phone_number: mobileNumber || '01000000000'
        },
        paymentMethod === 'wallet' ? mobileNumber : undefined
      );
      window.location.href = redirectUrl;
    } catch (err) {
      console.error(err);
      alert(lang === 'ar' ? 'فشل تهيئة الدفع. حاول مرة أخرى.' : 'Payment initialization failed. Please try again.');
      setLoading(false);
    }
  };

  if (paymentStatus === 'success') {
    return (
      <div className="min-h-[80vh] flex items-center justify-center bg-background p-4" dir={isRtl ? 'rtl' : 'ltr'}>
        <div className="glass-panel p-8 text-center rounded-2xl max-w-md w-full">
          <div className="w-20 h-20 bg-success/20 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle className="w-12 h-12 text-success" />
          </div>
          <h2 className="text-3xl font-headline font-bold text-white mb-2">{tr('successTitle')}</h2>
          <p className="text-muted mb-8">{tr('successMsg')}</p>
          <button
            onClick={() => navigate('/customer')}
            className="w-full py-3 bg-primary-container text-surface font-bold uppercase rounded-lg hover:bg-primary"
          >
            {tr('toDashboard')}
          </button>
        </div>
      </div>
    );
  }

  if (paymentStatus === 'failed') {
    return (
      <div className="min-h-[80vh] flex items-center justify-center bg-background p-4" dir={isRtl ? 'rtl' : 'ltr'}>
        <div className="glass-panel p-8 text-center rounded-2xl max-w-md w-full border-error/50">
          <div className="w-20 h-20 bg-error/20 rounded-full flex items-center justify-center mx-auto mb-6">
            <XCircle className="w-12 h-12 text-error" />
          </div>
          <h2 className="text-3xl font-headline font-bold text-white mb-2">{tr('failedTitle')}</h2>
          <p className="text-muted mb-8">{tr('failedMsg')}</p>
          <button
            onClick={() => setPaymentStatus('pending')}
            className="w-full py-3 bg-surface border border-white/20 text-white font-bold uppercase rounded-lg hover:bg-white/5"
          >
            {tr('tryAgain')}
          </button>
        </div>
      </div>
    );
  }

  if (!booking) return (
    <div className="text-white p-8" dir={isRtl ? 'rtl' : 'ltr'}>{tr('loading')}</div>
  );

  return (
    <div className="min-h-screen bg-background py-8 px-4" dir={isRtl ? 'rtl' : 'ltr'}>
      <div className="max-w-xl mx-auto">
        <h2 className="text-3xl font-headline font-bold text-white mb-8 text-center">{tr('title')}</h2>

        {/* Order Summary */}
        <div className="bg-surface rounded-xl p-6 mb-8 border border-white/10">
          <h3 className="text-lg font-bold text-white mb-4">{tr('orderSummary')}</h3>
          <div className="flex justify-between mb-2">
            <span className="text-muted">{tr('bookingRef')}</span>
            <span className="text-white font-mono text-sm">{booking.id.substring(0, 8)}</span>
          </div>
          <div className="flex justify-between mb-2">
            <span className="text-muted">{tr('duration')}</span>
            <span className="text-white">{booking.duration / 60} {tr('hours')}</span>
          </div>
          <div className="border-t border-white/10 mt-4 pt-4 flex justify-between text-xl font-bold">
            <span className="text-white">{tr('total')}</span>
            <span className="text-primary-container">EGP {booking.total_price}</span>
          </div>
        </div>

        {/* Payment Method */}
        <h3 className="text-lg font-bold text-white mb-4">{tr('payMethod')}</h3>
        <div className="grid grid-cols-2 gap-4 mb-8">
          <button
            onClick={() => setPaymentMethod('card')}
            className={`p-6 rounded-xl border flex flex-col items-center gap-4 transition-all ${paymentMethod === 'card' ? 'border-primary bg-primary/10' : 'border-white/10 bg-surface'}`}
          >
            <CreditCard className={`w-8 h-8 ${paymentMethod === 'card' ? 'text-primary' : 'text-muted'}`} />
            <span className="font-bold text-white">{tr('creditCard')}</span>
          </button>
          <button
            onClick={() => setPaymentMethod('wallet')}
            className={`p-6 rounded-xl border flex flex-col items-center gap-4 transition-all ${paymentMethod === 'wallet' ? 'border-primary bg-primary/10' : 'border-white/10 bg-surface'}`}
          >
            <Smartphone className={`w-8 h-8 ${paymentMethod === 'wallet' ? 'text-primary' : 'text-muted'}`} />
            <span className="font-bold text-white">{tr('vodafone')}</span>
          </button>
        </div>

        {paymentMethod === 'wallet' && (
          <div className="mb-8">
            <label className="block text-sm font-bold text-muted uppercase tracking-widest mb-2">{tr('vodafoneNum')}</label>
            <input
              type="tel"
              placeholder="010XXXXXXXX"
              value={mobileNumber}
              onChange={e => setMobileNumber(e.target.value)}
              className="w-full bg-surface border border-white/10 rounded-lg p-4 text-white focus:outline-none focus:border-primary"
            />
          </div>
        )}

        <button
          disabled={!paymentMethod || loading}
          onClick={handlePay}
          className="w-full py-4 bg-success text-white font-bold uppercase tracking-widest rounded-lg hover:bg-success/80 transition-colors disabled:opacity-50"
        >
          {loading ? tr('connecting') : `${tr('pay')} EGP ${booking.total_price}`}
        </button>
      </div>
    </div>
  );
}
