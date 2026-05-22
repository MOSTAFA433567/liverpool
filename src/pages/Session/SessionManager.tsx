import { useParams, useNavigate } from 'react-router-dom';
import { useLoungeStore } from '../../store/useLoungeStore';
import { useEffect, useState } from 'react';
import { db } from '../../services/db';
import { ArrowLeft, Timer, StopCircle, ShoppingCart } from 'lucide-react';

export default function SessionManager() {
  const { sessionId } = useParams();
  const navigate = useNavigate();
  const session = useLoungeStore(state => state.sessions.find(s => s.id === sessionId));
  const room = useLoungeStore(state => state.rooms.find(r => r.id === session?.room_id));
  
  const [elapsedMinutes, setElapsedMinutes] = useState(0);

  useEffect(() => {
    if (!session || session.status !== 'active') return;

    const start = new Date(session.start_time).getTime();
    
    const updateTimer = () => {
      const now = new Date().getTime();
      const diff = Math.floor((now - start) / 60000); // minutes
      setElapsedMinutes(diff);
    };

    updateTimer();
    const interval = setInterval(updateTimer, 60000);
    return () => clearInterval(interval);
  }, [session]);

  if (!session || !room) {
    return <div className="p-8 text-muted">Session not found.</div>;
  }

  const hours = Math.floor(elapsedMinutes / 60);
  const minutes = elapsedMinutes % 60;
  
  const currentCost = (elapsedMinutes / 60) * room.hourly_price;
  const foodTotal = session.orders.reduce((sum, order) => sum + (order.price * order.quantity), 0);
  const totalDue = currentCost + foodTotal;

  const handleEndSession = async () => {
    if (window.confirm('Are you sure you want to end this session?')) {
      await db.endSession(session.id);
      navigate('/checkout/' + session.id);
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <button 
        onClick={() => navigate(-1)}
        className="flex items-center gap-2 text-muted hover:text-gray-100 transition-colors"
      >
        <ArrowLeft className="w-4 h-4" /> Back
      </button>

      <div className="flex justify-between items-end">
        <div>
          <h1 className="font-headline text-3xl font-bold tracking-tight text-gray-100 uppercase">Session Controls</h1>
          <p className="text-primary-container mt-1 font-bold">{room.name} • {room.type}</p>
        </div>
        <button 
          onClick={handleEndSession}
          className="bg-error/20 text-error border border-error/50 hover:bg-error hover:text-surface transition-colors px-6 py-2 rounded-lg font-headline font-bold uppercase tracking-widest flex items-center gap-2"
        >
          <StopCircle className="w-5 h-5" />
          End Session
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2 space-y-6">
          {/* Live Timer */}
          <div className="glass-panel p-8 rounded-xl flex flex-col items-center justify-center glow-box">
            <Timer className="w-12 h-12 text-primary-container mb-4" />
            <div className="font-headline text-6xl font-black text-gray-100 tracking-tighter tabular-nums drop-shadow-[0_0_15px_rgba(0,209,255,0.4)]">
              {hours.toString().padStart(2, '0')}:{minutes.toString().padStart(2, '0')}
            </div>
            <p className="text-muted text-sm tracking-widest uppercase mt-4">Elapsed Time</p>
          </div>

          {/* Orders */}
          <div className="glass-panel p-6 rounded-xl">
            <div className="flex justify-between items-center mb-6">
              <h2 className="font-headline font-bold text-gray-100 tracking-widest uppercase flex items-center gap-2">
                <ShoppingCart className="w-5 h-5 text-primary" /> F&B Orders
              </h2>
              <button 
                onClick={() => navigate('/pos?session=' + session.id)}
                className="text-xs text-primary-container uppercase tracking-widest hover:text-primary transition-colors"
              >
                + Add Items
              </button>
            </div>
            
            {session.orders.length === 0 ? (
              <p className="text-muted text-sm text-center py-4">No orders placed yet.</p>
            ) : (
              <div className="space-y-3">
                {session.orders.map((order, idx) => (
                  <div key={idx} className="flex justify-between items-center bg-background/50 p-3 rounded">
                    <div>
                      <p className="text-gray-100 font-bold text-sm">{order.name}</p>
                      <p className="text-xs text-muted">Qty: {order.quantity} x ${order.price.toFixed(2)}</p>
                    </div>
                    <p className="text-primary-container font-bold">${(order.quantity * order.price).toFixed(2)}</p>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Live Billing Summary */}
        <div className="glass-panel p-6 rounded-xl h-fit border-t-4 border-t-primary-container">
          <h2 className="font-headline font-bold text-gray-100 tracking-widest uppercase mb-6">Live Billing</h2>
          
          <div className="space-y-4 font-body text-sm">
            <div className="flex justify-between items-center">
              <span className="text-muted">Room Rate</span>
              <span className="text-gray-100">${room.hourly_price.toFixed(2)}/hr</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-muted">Session Cost</span>
              <span className="text-gray-100">${currentCost.toFixed(2)}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-muted">F&B Total</span>
              <span className="text-gray-100">${foodTotal.toFixed(2)}</span>
            </div>
            
            <div className="pt-4 border-t border-white/10 flex justify-between items-end">
              <span className="font-headline font-bold text-muted uppercase tracking-widest text-xs">Total Due</span>
              <span className="font-headline text-3xl font-black text-primary-container glow-text">${totalDue.toFixed(2)}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
