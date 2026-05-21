import type { User, Role } from '../types';
import { useAuthStore } from '../store/useAuthStore';

/**
 * Mock Firestore sync since Firebase keys are not configured
 */
export async function syncUserToFirestore(firebaseUser: any, role: Role = 'customer'): Promise<User> {
  return {
    id: firebaseUser.uid || 'mock-id-' + Date.now(),
    email: firebaseUser.email || '',
    name: firebaseUser.displayName || firebaseUser.email?.split('@')[0] || 'Unknown User',
    role: role,
    createdAt: new Date().toISOString()
  };
}

export async function loginWithGoogle() {
  const mockUser: User = {
    id: 'google-mock-' + Date.now(),
    email: 'google_user@example.com',
    name: 'Google Gamer',
    role: 'admin',
    createdAt: new Date().toISOString()
  };
  useAuthStore.getState().setUser(mockUser);
  return mockUser;
}

export async function loginWithFacebook() {
  const mockUser: User = {
    id: 'fb-mock-' + Date.now(),
    email: 'fb_user@example.com',
    name: 'Facebook Gamer',
    role: 'admin',
    createdAt: new Date().toISOString()
  };
  useAuthStore.getState().setUser(mockUser);
  return mockUser;
}

export async function loginWithEmail(email: string, pass: string) {
  let role: Role = 'customer';
  
  if (email === 'admin@liverpool.com' && pass === 'admin123') {
    role = 'admin';
  } else if (email === 'admin@liverpool.com') {
    throw new Error('Invalid admin password');
  }

  const mockUser: User = {
    id: 'email-mock-' + Date.now(),
    email: email,
    name: email.split('@')[0],
    role: role,
    createdAt: new Date().toISOString()
  };
  useAuthStore.getState().setUser(mockUser);
  return mockUser;
}

export async function registerWithEmail(email: string, _pass: string, name: string) {
  const mockUser: User = {
    id: 'new-mock-' + Date.now(),
    email: email,
    name: name || email.split('@')[0],
    role: 'admin',
    createdAt: new Date().toISOString()
  };
  useAuthStore.getState().setUser(mockUser);
  return mockUser;
}

export async function signOut() {
  useAuthStore.getState().setUser(null);
  return Promise.resolve();
}
