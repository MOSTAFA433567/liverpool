import { create } from 'zustand';
import type { User } from '../types';

interface AuthState {
  user: User | null;
  isLoading: boolean;
  isInitialized: boolean;
  login: (user: User) => void;
  logout: () => void;
  init: () => void;
  setUser: (user: User | null) => void;
}

export const useAuthStore = create<AuthState>((set, get) => ({
  user: null,
  isLoading: true,
  isInitialized: false,
  login: (user) => set({ user, isLoading: false }),
  logout: () => set({ user: null, isLoading: false }),
  setUser: (user) => {
    if (user) {
      localStorage.setItem('kv_user', JSON.stringify(user));
    } else {
      localStorage.removeItem('kv_user');
    }
    set({ user, isLoading: false });
  },
  init: () => {
    if (get().isInitialized) return;
    
    set({ isInitialized: true, isLoading: true });
    
    const stored = localStorage.getItem('kv_user');
    if (stored) {
      try {
        const user = JSON.parse(stored);
        set({ user, isLoading: false });
      } catch {
        set({ user: null, isLoading: false });
      }
    } else {
      set({ user: null, isLoading: false });
    }
  }
}));
