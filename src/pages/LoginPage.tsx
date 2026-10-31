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
    <div className="min-h-screen bg-slate-950 flex flex-col justify-center items-center p-6 text-white selection:bg-amber-500 selection:text-slate-950">
      <div className="w-full max-w-md space-y-8 animate-fade-in">
        {/* Logo Header */}
        <div className="text-center space-y-2">
          <NavLink to="/" className="inline-flex items-center gap-3 group">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-amber-500 to-orange-400 flex items-center justify-center text-slate-950 shadow-xl shadow-amber-500/25 group-hover:scale-105 transition-transform">
              <Sun className="w-7 h-7 fill-current" />
            </div>
            <div className="text-left">
              <span className="text-2xl font-black tracking-tight text-white block">
                SunPower Solutions
              </span>
              <span className="text-[10px] font-bold text-amber-400 uppercase tracking-widest">
                India Solar ERP
              </span>
            </div>
          </NavLink>
          <p className="text-xs text-slate-400 pt-2">
            Secure Role-Based Access for Solar EPC & Operations
          </p>
        </div>

        {/* Demo Fast-Login Pill Tray */}
        <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 space-y-3">
          <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
            <UserCheck className="w-3.5 h-3.5 text-amber-400" />
            Instant Demo Sign-in by Persona:
          </span>
          <div className="grid grid-cols-2 gap-2">
            {demoUsers.slice(0, 6).map((u) => (
              <button
                key={u.id}
                onClick={() => handleSelectRole(u)}
                className="text-left p-2 rounded-xl bg-slate-950 hover:bg-slate-800 border border-slate-850 hover:border-amber-500/50 transition-colors text-xs flex flex-col"
              >
                <span className="font-bold text-white truncate">{u.name}</span>
                <span className="text-[10px] text-amber-400 capitalize">{u.role.replace('_', ' ')}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Standard Form */}
        <div className="card p-6 bg-slate-900 border border-slate-800">
          <form onSubmit={handleSubmit} className="space-y-4 text-xs">
            <div>
              <label className="label text-slate-300">Work Email Address</label>
              <div className="relative">
                <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="input pl-9 bg-slate-950 border-slate-800 text-white"
                />
              </div>
            </div>

            <div>
              <label className="label text-slate-300">Password</label>
              <div className="relative">
                <Lock className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="input pl-9 bg-slate-950 border-slate-800 text-white"
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full btn-accent py-3 rounded-xl font-bold text-sm flex items-center justify-center gap-2 mt-2 shadow-lg shadow-amber-500/20"
            >
              <span>Sign In to Platform</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>
        </div>

        <div className="text-center text-xs text-slate-500">
          <NavLink to="/" className="text-amber-400 hover:underline">
            ← Return to Marketing Landing Page
          </NavLink>
        </div>
      </div>
    </div>
  );
};
