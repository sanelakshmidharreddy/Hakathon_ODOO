import React, { createContext, useContext, useEffect, useState } from 'react';
import { useAuthStore } from '../store/useAuthStore';
import { User, UserRole } from '../types';

interface AuthContextType {
  currentUser: User | null;
  isAuthenticated: boolean;
  login: (email: string, role?: UserRole) => boolean;
  logout: () => void;
  switchRole: (role: UserRole) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { currentUser, isAuthenticated: storeAuth, login: storeLogin, logout: storeLogout, switchRole: storeSwitchRole } = useAuthStore();
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(storeAuth);

  useEffect(() => {
    setIsAuthenticated(Boolean(currentUser));
  }, [currentUser]);

  const login = (email: string, role?: UserRole) => {
    return storeLogin(email, role);
  };

  const logout = () => {
    storeLogout();
  };

  const switchRole = (role: UserRole) => {
    storeSwitchRole(role);
  };

  return (
    <AuthContext.Provider value={{ currentUser, isAuthenticated, login, logout, switchRole }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
