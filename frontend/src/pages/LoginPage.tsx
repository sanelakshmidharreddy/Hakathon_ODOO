import React, { useState } from 'react';
import { useNavigate, NavLink } from 'react-router-dom';
import { Sun, Lock, Mail, ArrowRight, UserCheck } from 'lucide-react';
import { useAuthStore } from '../store/useAuthStore';
import { demoUsers } from '../data/demoData';
import { UserRole } from '../types';

export const LoginPage: React.FC = () => {
  const navigate = useNavigate();
  const { login } = useAuthStore();
  const [email, setEmail] = useState('alice.singh@sunpowersolutions.in');
  const [password, setPassword] = useState('demo123');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    login(email);
    navigate('/dashboard');
  };

  const handleSelectRole = (user: typeof demoUsers[0]) => {
    setEmail(user.email);
    login(user.email, user.role as UserRole);
    navigate('/dashboard');
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col justify-center items-center p-6 text-slate-900 selection:bg-amber-500 selection:text-white">
      <div className="w-full max-w-md space-y-6">
        {/* Logo Header */}
        <div className="text-center space-y-2">
          <NavLink to="/" className="inline-flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-lg bg-amber-500 flex items-center justify-center text-white shadow-sm">
              <Sun className="w-6 h-6" />
            </div>
            <div className="text-left">
              <span className="text-xl font-bold tracking-tight text-slate-900 block leading-tight">
                SunPower Solutions
              </span>
              <span className="text-[10px] font-semibold text-amber-700 uppercase tracking-wider">
                Solar Business ERP
              </span>
            </div>
          </NavLink>
          <p className="text-xs text-slate-500">
            Sign in to access leads, quotations, field jobs, and inventory
          </p>
        </div>

        {/* Demo Persona Switcher */}
        <div className="p-4 rounded-lg bg-white border border-slate-200 shadow-sm space-y-2.5">
          <span className="text-[11px] font-semibold text-slate-600 uppercase tracking-wider flex items-center gap-1.5">
            <UserCheck className="w-3.5 h-3.5 text-amber-600" />
            Instant Demo Sign-in:
          </span>
          <div className="grid grid-cols-2 gap-2">
            {demoUsers.slice(0, 6).map((u) => (
              <button
                key={u.id}
                onClick={() => handleSelectRole(u)}
                className="text-left p-2 rounded border border-slate-200 bg-slate-50 hover:bg-amber-50/60 hover:border-amber-300 transition-colors text-xs flex flex-col"
              >
                <span className="font-semibold text-slate-900 truncate">{u.name}</span>
                <span className="text-[10px] text-slate-500 capitalize">{u.role.replace('_', ' ')}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Standard Form */}
        <div className="card p-6 bg-white border border-slate-200 shadow-sm">
          <form onSubmit={handleSubmit} className="space-y-4 text-xs">
            <div>
              <label className="label text-slate-700">Work Email Address</label>
              <div className="relative">
                <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="input pl-9"
                />
              </div>
            </div>

            <div>
              <label className="label text-slate-700">Password</label>
              <div className="relative">
                <Lock className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="input pl-9"
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full btn-accent py-2.5 rounded font-semibold text-sm flex items-center justify-center gap-2 shadow-sm"
            >
              <span>Sign In to Platform</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>
        </div>

        <div className="text-center text-xs text-slate-500">
          <NavLink to="/" className="text-amber-700 font-medium hover:underline">
            ← Return to Marketing Landing Page
          </NavLink>
        </div>
      </div>
    </div>
  );
};
