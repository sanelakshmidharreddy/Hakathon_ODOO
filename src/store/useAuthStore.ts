import { create } from 'zustand';
import { User, UserRole } from '../types';
import { demoUsers } from '../data/demoData';

interface AuthState {
  currentUser: User | null;
  token: string | null;
  isAuthenticated: boolean;
  login: (email: string, role?: UserRole) => boolean;
  logout: () => void;
  switchRole: (role: UserRole) => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  // Default to Director for seamless demo exploration
  currentUser: demoUsers[0],
  token: 'demo-jwt-token-active-session',
  isAuthenticated: true,

  login: (email: string, role?: UserRole) => {
    let matched = demoUsers.find((u) => u.email.toLowerCase() === email.toLowerCase());
    if (!matched && role) {
      matched = demoUsers.find((u) => u.role === role);
    }
    if (matched) {
      set({
        currentUser: matched,
        token: `jwt-token-${matched.id}-${Date.now()}`,
        isAuthenticated: true,
      });
      return true;
    }
    return false;
  },

  logout: () => {
    set({
      currentUser: null,
      token: null,
      isAuthenticated: false,
    });
  },

  switchRole: (role: UserRole) => {
    const userForRole = demoUsers.find((u) => u.role === role) || demoUsers[0];
    set({
      currentUser: userForRole,
      token: `jwt-token-${userForRole.id}-${Date.now()}`,
      isAuthenticated: true,
    });
  },
}));
