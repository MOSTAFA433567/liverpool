import { create } from 'zustand';
import type { Room, Session, Booking, Product } from '../types';
import { subscribeToRooms, subscribeToSessions, subscribeToBookings, seedRoomsIfEmpty } from '../services/firestore';

interface LoungeState {
  rooms: Room[];
  sessions: Session[];
  bookings: Booking[];
  products: Product[];
  
  isInitialized: boolean;
  init: () => void;
  
  // Setters for syncing with DB
  setRooms: (rooms: Room[]) => void;
  setSessions: (sessions: Session[]) => void;
  setBookings: (bookings: Booking[]) => void;
  setProducts: (products: Product[]) => void;
}

export const useLoungeStore = create<LoungeState>((set, get) => ({
  rooms: [],
  sessions: [],
  bookings: [],
  products: [],
  isInitialized: false,
  
  init: async () => {
    if (get().isInitialized) return;
    set({ isInitialized: true });
    
    // Seed initial data if empty
    await seedRoomsIfEmpty();
    
    subscribeToRooms((rooms) => set({ rooms }));
    subscribeToSessions((sessions) => set({ sessions }));
    subscribeToBookings((bookings) => set({ bookings }));
  },
  
  setRooms: (rooms) => set({ rooms }),
  setSessions: (sessions) => set({ sessions }),
  setBookings: (bookings) => set({ bookings }),
  setProducts: (products) => set({ products }),
}));
