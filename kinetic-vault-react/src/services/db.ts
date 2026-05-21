import type { Room, Session, Booking, Product } from '../types';

// Initial Mock Data
let rooms: Room[] = [
  { id: 'r1', name: 'PS5 Pro - VIP 1', type: 'PS5', hourly_price: 15, status: 'available', current_session_id: null },
  { id: 'r2', name: 'PS5 Pro - VIP 2', type: 'PS5', hourly_price: 15, status: 'available', current_session_id: null },
  { id: 'r3', name: 'PS4 - Standard 1', type: 'PS4', hourly_price: 8, status: 'in_use', current_session_id: 's1' },
  { id: 'r4', name: 'Billiard Table 1', type: 'Billiard', hourly_price: 12, status: 'reserved', current_session_id: null },
  { id: 'r5', name: 'Table Tennis', type: 'Tennis', hourly_price: 10, status: 'available', current_session_id: null },
];

let sessions: Session[] = [
  {
    id: 's1',
    room_id: 'r3',
    start_time: new Date(Date.now() - 3600000).toISOString(), // 1 hour ago
    end_time: null,
    status: 'active',
    total_amount: 8,
    orders: [],
  }
];

let products: Product[] = [
  { id: 'p1', name: 'Coca Cola', category: 'Cold Drinks', price: 2.5, stock: 50 },
  { id: 'p2', name: 'Espresso', category: 'Hot Drinks', price: 3.0, stock: 100 },
  { id: 'p3', name: 'Nachos', category: 'Snacks', price: 6.0, stock: 20 },
];

let bookings: Booking[] = [
  { 
    id: 'b1', 
    room_id: 'r4', 
    customer_id: 'c1',
    start_time: new Date(Date.now() + 7200000).toISOString(), 
    end_time: new Date(Date.now() + 14400000).toISOString(),
    duration: 120, 
    total_price: 24,
    status: 'confirmed', 
    payment_status: 'paid',
    customer_name: 'John Doe',
    createdAt: new Date().toISOString()
  }
];

// Mock event emitters to simulate Firestore onSnapshot
type Listener<T> = (data: T) => void;
const listeners = {
  rooms: new Set<Listener<Room[]>>(),
  sessions: new Set<Listener<Session[]>>(),
  products: new Set<Listener<Product[]>>(),
  bookings: new Set<Listener<Booking[]>>(),
};

function emit<K extends keyof typeof listeners>(collection: K, data: any) {
  listeners[collection].forEach(fn => fn(data));
}

// Simulating Firestore API
export const db = {
  // Subscriptions
  subscribeToRooms: (callback: Listener<Room[]>) => {
    listeners.rooms.add(callback);
    callback([...rooms]);
    return () => listeners.rooms.delete(callback);
  },
  subscribeToSessions: (callback: Listener<Session[]>) => {
    listeners.sessions.add(callback);
    callback([...sessions]);
    return () => listeners.sessions.delete(callback);
  },
  subscribeToProducts: (callback: Listener<Product[]>) => {
    listeners.products.add(callback);
    callback([...products]);
    return () => listeners.products.delete(callback);
  },
  subscribeToBookings: (callback: Listener<Booking[]>) => {
    listeners.bookings.add(callback);
    callback([...bookings]);
    return () => listeners.bookings.delete(callback);
  },

  // Mutations
  updateRoom: async (roomId: string, updates: Partial<Room>) => {
    rooms = rooms.map(r => r.id === roomId ? { ...r, ...updates } : r);
    emit('rooms', [...rooms]);
  },
  
  createSession: async (session: Session) => {
    sessions = [...sessions, session];
    emit('sessions', [...sessions]);
    // Also update room status
    await db.updateRoom(session.room_id, { status: 'in_use', current_session_id: session.id });
  },

  updateSession: async (sessionId: string, updates: Partial<Session>) => {
    sessions = sessions.map(s => s.id === sessionId ? { ...s, ...updates } : s);
    emit('sessions', [...sessions]);
  },

  endSession: async (sessionId: string) => {
    const session = sessions.find(s => s.id === sessionId);
    if (!session) return;
    
    const updatedSession = { ...session, status: 'completed' as const, end_time: new Date().toISOString() };
    await db.updateSession(sessionId, updatedSession);
    await db.updateRoom(session.room_id, { status: 'available', current_session_id: null });
  }
};
