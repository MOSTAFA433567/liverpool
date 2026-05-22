import { useParams, useNavigate } from 'react-router-dom';
import { useLoungeStore } from '../../store/useLoungeStore';
import { ArrowLeft, CheckCircle2, Receipt } from 'lucide-react';

export default function Invoice() {
  const { sessionId } = useParams();
  const navigate = useNavigate();
  const session = useLoungeStore(state => state.sessions.find(s => s.id === sessionId));
  const room = useLoungeStore(state => state.rooms.find(r => r.id === session?.room_id));

  if (!session || !room) return <div className="p-8 text-muted">Invoice not found.</div>;

  const start = new Date(session.start_time);
  const end = session.end_time ? new Date(session.end_time) : new Date();
  const diffMinutes = Math.floor((end.getTime() - start.getTime()) / 60000);
  
  const currentCost = (diffMinutes / 60) * room.hourly_price;
  const foodTotal = session.orders.reduce((sum, order) => sum + (order.price * order.quantity), 0);
  const totalDue = currentCost + foodTotal;

  return (
    <div className="max-w-2xl mx-auto space-y-8">
      <button 
        onClick={() => navigate('/')}
        className="flex items-center gap-2 text-muted hover:text-gray-100 transition-colors"
      >
        <ArrowLeft className="w-4 h-4" /> Return to Dashboard
      </button>

      <div className="glass-panel p-8 rounded-xl relative overflow-hidden border-t-4 border-t-success">
        <div className="absolute top-0 right-0 p-8 opacity-10">
          <CheckCircle2 className="w-32 h-32 text-success" />
        </div>

        <div className="relative z-10 flex flex-col items-center mb-8 text-center border-b border-white/10 pb-8">
          <Receipt className="w-12 h-12 text-success mb-4" />
          <h1 className="font-headline text-3xl font-bold tracking-tight text-gray-100 uppercase">Session Complete</h1>
          <p className="text-muted mt-2">Invoice #{session.id.toUpperCase()}</p>
        </div>

        <div className="space-y-6 relative z-10">
          <div className="flex justify-between items-end border-b border-white/5 pb-4">
            <div>
              <p className="text-muted text-xs uppercase tracking-widest mb-1">Room</p>
              <p className="font-bold text-lg">{room.name}</p>
            </div>
            <div className="text-right">
              <p className="text-muted text-xs uppercase tracking-widest mb-1">Duration</p>
              <p className="font-bold">{Math.floor(diffMinutes / 60)}h {diffMinutes % 60}m</p>
            </div>
          </div>

          <div className="space-y-3">
            <h3 className="text-muted text-xs uppercase tracking-widest mb-2 border-b border-white/5 pb-2">Charges</h3>
            
            <div className="flex justify-between items-center text-sm">
              <span className="text-gray-100">Gaming Session (${room.hourly_price}/hr)</span>
              <span className="font-bold">${currentCost.toFixed(2)}</span>
            </div>

            {session.orders.map((order, idx) => (
              <div key={idx} className="flex justify-between items-center text-sm">
                <span className="text-gray-100">{order.quantity}x {order.name}</span>
                <span className="font-bold">${(order.quantity * order.price).toFixed(2)}</span>
              </div>
            ))}
          </div>

          <div className="pt-6 border-t border-white/20 flex justify-between items-end bg-success/5 p-4 rounded-lg">
            <span className="font-headline font-bold text-success uppercase tracking-widest text-sm">Total Paid</span>
            <span className="font-headline text-4xl font-black text-success glow-text">${totalDue.toFixed(2)}</span>
          </div>

          <button 
            className="w-full bg-surface-highlight text-gray-100 font-headline font-bold uppercase tracking-widest py-3 rounded-lg hover:bg-success hover:text-surface transition-colors mt-8 border border-white/10"
            onClick={() => window.print()}
          >
            Print Receipt
          </button>
        </div>
      </div>
    </div>
  );
}
