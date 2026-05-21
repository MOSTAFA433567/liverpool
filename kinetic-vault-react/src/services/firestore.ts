import type { Room, Session, Booking, OrderItem } from '../types';

// Storage Helper
function load<T>(key: string, fallback: T): T {
  try {
    const data = localStorage.getItem('liverpool_' + key);
    return data ? JSON.parse(data) : fallback;
  } catch {
    return fallback;
  }
}

function save(key: string, data: any) {
  localStorage.setItem('liverpool_' + key, JSON.stringify(data));
}

let mockRooms: Room[] = load('rooms', [
  { id: 'r1', name: 'VIP PS5 Alpha', type: 'PS5', hourly_price: 50, status: 'available', current_session_id: null },
  { id: 'r2', name: 'PS4 Classic 1', type: 'PS4', hourly_price: 30, status: 'available', current_session_id: null },
  { id: 'r3', name: 'Table Tennis', type: 'Tennis', hourly_price: 40, status: 'available', current_session_id: null }
]);
let mockBookings: Booking[] = load('bookings', []);
let mockSessions: Session[] = load('sessions', []);

type Listener<T> = (data: T) => void;
const listeners = {
  rooms: new Set<Listener<Room[]>>(),
  sessions: new Set<Listener<Session[]>>(),
  bookings: new Set<Listener<Booking[]>>()
};

function emit<K extends keyof typeof listeners>(collection: K, data: any) {
  save(collection, data);
  listeners[collection].forEach(fn => fn(data));
}

export async function seedRoomsIfEmpty() {}

export function subscribeToRooms(callback: (rooms: Room[]) => void) {
  listeners.rooms.add(callback);
  callback([...mockRooms]);
  return () => listeners.rooms.delete(callback);
}

export function subscribeToSessions(callback: (sessions: Session[]) => void) {
  listeners.sessions.add(callback);
  callback([...mockSessions]);
  return () => listeners.sessions.delete(callback);
}

export function subscribeToBookings(callback: (bookings: Booking[]) => void) {
  listeners.bookings.add(callback);
  callback([...mockBookings]);
  return () => listeners.bookings.delete(callback);
}

export async function startSession(room_id: string, customer_id?: string, booking_id?: string) {
  const newSession: Session = {
    id: 'session-' + Date.now(),
    room_id,
    customer_id,
    booking_id,
    start_time: new Date().toISOString(),
    end_time: null,
    status: 'active',
    total_amount: 0,
    orders: []
  };
  mockSessions.push(newSession);
  emit('sessions', [...mockSessions]);

  const room = mockRooms.find(r => r.id === room_id);
  if (room) {
    room.status = 'in_use';
    room.current_session_id = newSession.id;
    emit('rooms', [...mockRooms]);
  }
  return newSession.id;
}

export async function endSession(session_id: string, room_id: string, final_amount: number) {
  const session = mockSessions.find(s => s.id === session_id);
  if (session) {
    session.status = 'completed';
    session.end_time = new Date().toISOString();
    session.total_amount = final_amount;
    emit('sessions', [...mockSessions]);
  }

  const room = mockRooms.find(r => r.id === room_id);
  if (room) {
    room.status = 'available';
    room.current_session_id = null;
    emit('rooms', [...mockRooms]);
  }
}

export async function addOrderToSession(session_id: string, order: OrderItem) {
  const session = mockSessions.find(s => s.id === session_id);
  if (session) {
    const existing = session.orders.find(o => o.product_id === order.product_id);
    if (existing) {
      existing.quantity += order.quantity;
    } else {
      session.orders.push(order);
    }
    emit('sessions', [...mockSessions]);
  }
}

export async function createBooking(booking: Omit<Booking, 'id' | 'createdAt'>) {
  // Simulate network delay
  await new Promise(r => setTimeout(r, 800));
  const newBooking: Booking = {
    ...booking,
    id: 'booking-' + Date.now(),
    createdAt: new Date().toISOString()
  };
  mockBookings.push(newBooking);
  emit('bookings', [...mockBookings]);
  return newBooking.id;
}

export async function updateBookingStatus(booking_id: string, status: Booking['status'], extraDetails?: any) {
  const booking = mockBookings.find(b => b.id === booking_id);
  if (booking) {
    booking.status = status;
    if (extraDetails) {
      Object.assign(booking, extraDetails);
    }
    emit('bookings', [...mockBookings]);
  }
}
