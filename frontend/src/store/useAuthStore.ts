import { create } from 'zustand';
import { User, UserRole } from '../types';
import { demoUsers } from '../data/demoData';
import { api } from '../lib/api';

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
  token: localStorage.getItem('auth_token') || 'demo-jwt-token-active-session',
  isAuthenticated: true,

  login: (email: string, role?: UserRole) => {
    let matched = demoUsers.find((u) => u.email.toLowerCase() === email.toLowerCase());
    if (!matched && role) {
      matched = demoUsers.find((u) => u.role === role);
    }
    const token = `jwt-token-${matched?.id || 'demo'}-${Date.now()}`;
    localStorage.setItem('auth_token', token);

    // Call Render backend auth login endpoint
    api
      .post('/api/auth/login', { email, role: role || matched?.role || 'director' })
      .then((res) => {
        if (res.data?.token) {
          localStorage.setItem('auth_token', res.data.token);
        }
      })
      .catch((err) => {
        console.log('Backend auth offline/fallback active:', err.message);
      });

    if (matched) {
      set({
        currentUser: matched,
        token,
        isAuthenticated: true,
      });
      return true;
    }

    const customUser: User = {
      id: `usr-${Date.now()}`,
      name: email.split('@')[0],
      email,
      role: role || 'sales_rep',
      isActive: true,
    };

    set({
      currentUser: customUser,
      token,
      isAuthenticated: true,
    });
    return true;
  },

  logout: () => {
    localStorage.removeItem('auth_token');
    set({
      currentUser: null,
      token: null,
      isAuthenticated: false,
    });
  },

  switchRole: (role: UserRole) => {
    const userForRole = demoUsers.find((u) => u.role === role) || demoUsers[0];
    const token = `jwt-token-${userForRole.id}-${Date.now()}`;
    localStorage.setItem('auth_token', token);
    set({
      currentUser: userForRole,
      token,
      isAuthenticated: true,
    });
  },
}));
