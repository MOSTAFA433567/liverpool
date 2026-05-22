import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLoungeStore } from '../../store/useLoungeStore';
import { useAuthStore } from '../../store/useAuthStore';
import { useLanguageStore } from '../../store/useLanguageStore';
import { createBooking } from '../../services/firestore';
import { CreditCard, ChevronRight, ChevronLeft, Gamepad2, AlertCircle, ArrowRight, ArrowLeft } from 'lucide-react';
import type { Room } from '../../types';

const tx = {
  backDash:       { ar: '→ العودة للوحتي',              en: '← Back to Dashboard' },
  selectRoom:     { ar: 'اختر الغرفة',                  en: 'Select a Room' },
  selectTime:     { ar: 'اختر التاريخ والوقت',           en: 'Select Date & Time' },
  confirmDetails: { ar: 'تأكيد التفاصيل',               en: 'Confirm Details' },
  date:           { ar: 'التاريخ',                       en: 'Date' },
  startTime:      { ar: 'وقت البداية',                  en: 'Start Time' },
  duration:       { ar: 'المدة (بالساعات)',              en: 'Duration (Hours)' },
  hr1:            { ar: 'ساعة واحدة',                   en: '1 Hour' },
  hr2:            { ar: 'ساعتان',                       en: '2 Hours' },
  hr3:            { ar: '3 ساعات',                      en: '3 Hours' },
  hr4:            { ar: '4 ساعات',                      en: '4 Hours' },
  room:           { ar: 'الغرفة',                       en: 'Room' },
  dateTime:       { ar: 'التاريخ والوقت',               en: 'Date & Time' },
  durationLabel:  { ar: 'المدة',                        en: 'Duration' },
  hours:          { ar: 'ساعة',                         en: 'Hour(s)' },
  total:          { ar: 'الإجمالي',                     en: 'Total' },
  back:           { ar: 'رجوع',                         en: 'Back' },
  continue:       { ar: 'متابعة',                       en: 'Continue' },
  processing:     { ar: 'جارٍ المعالجة...',             en: 'Processing...' },
  confirmPay:     { ar: 'تأكيد والدفع',                 en: 'Confirm & Pay' },
  today:          { ar: 'اليوم',                        en: 'Today' },
  tomorrow:       { ar: 'غداً',                         en: 'Tomorrow' },
  errSelectRoom:  { ar: 'يرجى اختيار غرفة.',           en: 'Please select a room.' },
  errDateTime:    { ar: 'يرجى اختيار التاريخ والوقت.', en: 'Please select both date and time.' },
  errPast:        { ar: 'لا يمكن الحجز في الماضي.',    en: 'Cannot book in the past.' },
  errConflict:    { ar: 'الغرفة محجوزة بالفعل في هذا الوقت.', en: 'This room is already booked for the selected time slot.' },
  errFailed:      { ar: 'فشل إنشاء الحجز. حاول مرة أخرى.', en: 'Failed to create booking. Try again.' },
  hrRate:         { ar: '/ ساعة',                       en: '/ hr' },
};

export default function BookingFlow() {
  const { rooms, bookings } = useLoungeStore();
  const { user } = useAuthStore();
  const { lang } = useLanguageStore();
  const navigate = useNavigate();
  const isRtl = lang === 'ar';
  const tr = (k: keyof typeof tx) => tx[k][lang];

  const generateDates = () => {
    const dates = [];
    const today = new Date();
    for (let i = 0; i < 7; i++) {
      const d = new Date(today);
      d.setDate(today.getDate() + i);
      dates.push({
        value: d.toISOString().split('T')[0],
        label: i === 0 ? tr('today') : i === 1 ? tr('tomorrow') :
          d.toLocaleDateString(lang === 'ar' ? 'ar-EG' : 'en-US', { weekday: 'short', month: 'short', day: 'numeric' })
      });
    }
    return dates;
  };

  const generateTimes = () => {
    const times = [];
    for (let h = 10; h <= 23; h++) {
      times.push(`${h.toString().padStart(2, '0')}:00`);
      times.push(`${h.toString().padStart(2, '0')}:30`);
    }
    return times;
  };

  const [step, setStep] = useState(1);
  const [selectedRoom, setSelectedRoom] = useState<Room | null>(null);
  const [date, setDate]     = useState(generateDates()[0].value);
  const [time, setTime]     = useState('14:00');
  const [duration, setDuration] = useState(60);
  const [loading, setLoading]   = useState(false);
  const [error, setError]       = useState('');

  const handleNext = () => {
    setError('');
    if (step === 1 && !selectedRoom) { setError(tr('errSelectRoom')); return; }
    if (step === 2 && (!date || !time)) { setError(tr('errDateTime')); return; }

    if (step === 2) {
      const proposedStart = new Date(`${date}T${time}`);
      const proposedEnd   = new Date(proposedStart.getTime() + duration * 60000);
      if (proposedStart < new Date()) { setError(tr('errPast')); return; }
      const hasConflict = bookings.some(b => {
        if (b.room_id !== selectedRoom?.id || b.status === 'cancelled') return false;
        const bStart = new Date(b.start_time);
        const bEnd   = new Date(b.end_time);
        return proposedStart < bEnd && proposedEnd > bStart;
      });
      if (hasConflict) { setError(tr('errConflict')); return; }
    }
    if (step < 3) setStep(step + 1);
  };

  const handleConfirm = async () => {
    if (!user || !selectedRoom) return;
    setLoading(true);
    const start_time  = new Date(`${date}T${time}`).toISOString();
    const end_time    = new Date(new Date(start_time).getTime() + duration * 60000).toISOString();
    const total_price = (duration / 60) * selectedRoom.hourly_price;
    try {
      const bookingId = await createBooking({
        room_id: selectedRoom.id,
        customer_id: user.id,
        customer_name: user.name,
        start_time,
        end_time,
        duration,
        total_price,
        status: 'pending',
        payment_status: 'pending'
      });
      navigate(`/customer/checkout/${bookingId}`);
    } catch {
      setError(tr('errFailed'));
      setLoading(false);
    }
  };

  const ChevronNext = isRtl ? ChevronLeft  : ChevronRight;
  const BackArrow   = isRtl ? ArrowRight   : ArrowLeft;

  return (
    <div className="min-h-screen bg-background py-8 px-4" dir={isRtl ? 'rtl' : 'ltr'}>
      <div className="max-w-4xl mx-auto">
        <button
          onClick={() => navigate('/customer')}
          className="flex items-center gap-2 text-primary hover:text-white mb-6 transition-colors"
        >
          <BackArrow className="w-4 h-4" />
          {tr('backDash')}
        </button>

        {/* Step indicators */}
        <div className="flex items-center justify-between mb-8 relative">
          {[1, 2, 3].map(s => (
            <div key={s} className="flex items-center flex-1 last:flex-none">
              <div className={`w-10 h-10 shrink-0 rounded-full flex items-center justify-center font-bold transition-all duration-500 z-10 ${
                step >= s ? 'bg-primary text-surface shadow-[0_0_15px_rgba(0,240,255,0.6)] scale-110' : 'bg-surface text-muted border border-white/10'
              }`}>
                {s}
              </div>
              {s < 3 && (
                <div className="flex-1 h-1 mx-2 rounded-full overflow-hidden bg-surface relative">
                  <div className={`absolute top-0 start-0 h-full w-full bg-gradient-to-r from-primary to-secondary transition-transform duration-700 ease-out origin-start ${step > s ? 'scale-x-100' : 'scale-x-0'}`} />
                </div>
              )}
            </div>
          ))}
        </div>

        {error && (
          <div className="bg-error-container/20 text-error p-4 rounded-lg flex items-center gap-2 mb-6">
            <AlertCircle className="w-5 h-5 flex-shrink-0" /> {error}
          </div>
        )}

        <div className="glass-panel p-8 rounded-xl">
          {/* STEP 1 – Room Selection */}
          {step === 1 && (
            <div>
              <h2 className="text-2xl font-headline font-bold text-white mb-6">{tr('selectRoom')}</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {rooms.map(room => (
                  <div
                    key={room.id}
                    onClick={() => { setSelectedRoom(room); setStep(2); setError(''); }}
                    className={`p-6 rounded-xl border cursor-pointer transition-all duration-300 transform ${
                      selectedRoom?.id === room.id
                        ? 'border-primary bg-primary/10 shadow-[0_0_30px_rgba(0,240,255,0.3)] scale-105'
                        : 'border-white/10 hover:border-primary/50 hover:bg-surface-highlight hover:scale-105 hover:shadow-[0_0_20px_rgba(0,240,255,0.1)]'
                    }`}
                  >
                    <Gamepad2 className={`w-8 h-8 mb-4 ${selectedRoom?.id === room.id ? 'text-primary' : 'text-muted'}`} />
                    <h3 className="font-bold text-lg text-white">{room.name}</h3>
                    <p className="text-muted text-sm capitalize">{room.type}</p>
                    <div className="mt-4 flex flex-wrap gap-2">
                      <span className="text-[10px] bg-white/5 px-2 py-1 rounded border border-white/10 text-muted">PS5 Console</span>
                      <span className="text-[10px] bg-white/5 px-2 py-1 rounded border border-white/10 text-muted">65" OLED</span>
                    </div>
                    <p className="mt-4 font-bold text-primary-container">EGP {room.hourly_price} {tr('hrRate')}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* STEP 2 – Date & Time */}
          {step === 2 && (
            <div>
              <h2 className="text-2xl font-headline font-bold text-white mb-6">{tr('selectTime')}</h2>
              <div className="space-y-6 max-w-md">
                <div>
                  <label className="block text-sm font-bold text-muted uppercase tracking-widest mb-2">{tr('date')}</label>
                  <select
                    value={date}
                    onChange={e => setDate(e.target.value)}
                    className="w-full bg-surface border border-white/10 rounded-lg p-3 text-white focus:outline-none focus:border-primary"
                  >
                    {generateDates().map(d => (
                      <option key={d.value} value={d.value}>{d.label}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-bold text-muted uppercase tracking-widest mb-2">{tr('startTime')}</label>
                  <select
                    value={time}
                    onChange={e => setTime(e.target.value)}
                    className="w-full bg-surface border border-white/10 rounded-lg p-3 text-white focus:outline-none focus:border-primary"
                  >
                    {generateTimes().map(t => <option key={t} value={t}>{t}</option>)}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-bold text-muted uppercase tracking-widest mb-2">{tr('duration')}</label>
                  <select
                    value={duration}
                    onChange={e => setDuration(Number(e.target.value))}
                    className="w-full bg-surface border border-white/10 rounded-lg p-3 text-white focus:outline-none focus:border-primary"
                  >
                    <option value={60}>{tr('hr1')}</option>
                    <option value={120}>{tr('hr2')}</option>
                    <option value={180}>{tr('hr3')}</option>
                    <option value={240}>{tr('hr4')}</option>
                  </select>
                </div>
              </div>
            </div>
          )}

          {/* STEP 3 – Confirm */}
          {step === 3 && selectedRoom && (
            <div>
              <h2 className="text-2xl font-headline font-bold text-white mb-6">{tr('confirmDetails')}</h2>
              <div className={`bg-surface rounded-xl p-6 mb-6 transition-all ${loading ? 'animate-pulse opacity-50' : ''}`}>
                <div className="flex justify-between border-b border-white/10 pb-4 mb-4">
                  <span className="text-muted">{tr('room')}</span>
                  <span className="text-white font-bold">{selectedRoom.name}</span>
                </div>
                <div className="flex justify-between border-b border-white/10 pb-4 mb-4">
                  <span className="text-muted">{tr('dateTime')}</span>
                  <span className="text-white font-bold">
                    {new Date(`${date}T${time}`).toLocaleString(lang === 'ar' ? 'ar-EG' : 'en-US', { dateStyle: 'medium', timeStyle: 'short' })}
                  </span>
                </div>
                <div className="flex justify-between border-b border-white/10 pb-4 mb-4">
                  <span className="text-muted">{tr('durationLabel')}</span>
                  <span className="text-white font-bold">{duration / 60} {tr('hours')}</span>
                </div>
                <div className="flex justify-between text-xl font-headline font-bold">
                  <span className="text-primary-container">{tr('total')}</span>
                  <span className="text-primary-container">EGP {(duration / 60) * selectedRoom.hourly_price}</span>
                </div>
              </div>
            </div>
          )}

          {/* Footer buttons */}
          <div className="mt-8 flex justify-end gap-4">
            {step > 1 && (
              <button onClick={() => setStep(step - 1)} className="px-6 py-3 rounded-lg text-white hover:bg-surface transition-colors">
                {tr('back')}
              </button>
            )}
            {step === 2 && (
              <button onClick={handleNext} className="px-8 py-3 bg-primary-container text-surface font-bold uppercase rounded-lg hover:bg-primary transition-colors flex items-center gap-2">
                {tr('continue')} <ChevronNext className="w-5 h-5" />
              </button>
            )}
            {step === 3 && (
              <button
                disabled={loading}
                onClick={handleConfirm}
                className="px-8 py-3 bg-success text-white font-bold uppercase rounded-lg hover:bg-success/80 transition-colors flex items-center gap-2 disabled:opacity-50"
              >
                {loading ? tr('processing') : tr('confirmPay')}
                <CreditCard className="w-5 h-5" />
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
