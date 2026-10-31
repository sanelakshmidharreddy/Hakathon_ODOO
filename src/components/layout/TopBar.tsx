import React, { useState } from 'react';
import {
  Bell,
  Search,
  Moon,
  Sun,
  Shield,
  ExternalLink,
  CheckCircle2,
  AlertTriangle,
  Clock,
} from 'lucide-react';
import { useAuthStore } from '../../store/useAuthStore';
import { useThemeStore } from '../../store/useThemeStore';
import { useStore } from '../../store/useStore';
import { NavLink } from 'react-router-dom';

export const TopBar: React.FC = () => {
  const { currentUser } = useAuthStore();
  const { isDarkMode, toggleDarkMode } = useThemeStore();
  const { notifications, markNotificationAsRead, markAllNotificationsAsRead } = useStore();
  const [showNotifications, setShowNotifications] = useState(false);

  const unreadCount = notifications.filter((n) => !n.isRead).length;

  return (
    <header className="h-16 border-b border-slate-200 dark:border-slate-800 bg-white/80 dark:bg-slate-900/80 backdrop-blur-md sticky top-0 z-30 flex items-center justify-between px-6">
      {/* Search Bar / Global Context */}
      <div className="flex items-center gap-4 flex-1 max-w-md">
        <div className="relative w-full">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search leads, serials (e.g. PAN12345, INV54321), jobs..."
            className="w-full pl-10 pr-4 py-2 text-xs rounded-xl bg-slate-100 dark:bg-slate-800/80 border-none focus:ring-2 focus:ring-amber-500 text-slate-800 dark:text-slate-200 placeholder-slate-400"
          />
        </div>
      </div>

      {/* Right Action Icons */}
      <div className="flex items-center gap-3">
        {/* Live Weather / Solar Irradiance Indicator */}
        <div className="hidden lg:flex items-center gap-2 px-3 py-1.5 rounded-xl bg-amber-50 dark:bg-amber-950/40 border border-amber-200/60 dark:border-amber-900/40 text-xs">
          <Sun className="w-4 h-4 text-amber-500 animate-spin-slow" />
          <div className="flex flex-col text-left">
            <span className="font-semibold text-amber-900 dark:text-amber-200 text-[11px] leading-tight">
              5.42 kWh/m² Live GHI
            </span>
            <span className="text-[10px] text-amber-700 dark:text-amber-400 leading-tight">
              NASA POWER • 31.4°C Clear
            </span>
          </div>
        </div>

        {/* Dark Mode Toggle */}
        <button
          onClick={toggleDarkMode}
          className="p-2 rounded-xl text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
          title="Toggle Dark Mode"
        >
          {isDarkMode ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4" />}
        </button>

        {/* Notifications Dropdown */}
        <div className="relative">
          <button
            onClick={() => setShowNotifications(!showNotifications)}
            className="p-2 rounded-xl text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors relative"
            title="Notifications"
          >
            <Bell className="w-4 h-4" />
            {unreadCount > 0 && (
              <span className="absolute top-1 right-1 w-2 h-2 rounded-full bg-rose-500 ring-2 ring-white dark:ring-slate-900" />
            )}
          </button>

          {showNotifications && (
            <div className="absolute right-0 mt-2 w-80 sm:w-96 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-2xl py-3 z-50 animate-slide-up">
              <div className="flex items-center justify-between px-4 pb-2 border-b border-slate-100 dark:border-slate-800">
                <span className="text-xs font-semibold text-slate-800 dark:text-white uppercase tracking-wider">
                  Platform Alerts ({unreadCount})
                </span>
                {unreadCount > 0 && (
                  <button
                    onClick={markAllNotificationsAsRead}
                    className="text-xs text-amber-600 dark:text-amber-400 hover:underline"
                  >
                    Mark all read
                  </button>
                )}
              </div>
              <div className="max-h-80 overflow-y-auto divide-y divide-slate-100 dark:divide-slate-800">
                {notifications.length === 0 ? (
                  <div className="p-4 text-center text-xs text-slate-400">No notifications</div>
                ) : (
                  notifications.map((n) => (
                    <div
                      key={n.id}
                      onClick={() => markNotificationAsRead(n.id)}
                      className={`p-3.5 hover:bg-slate-50 dark:hover:bg-slate-800/50 cursor-pointer transition-colors ${
                        !n.isRead ? 'bg-amber-50/40 dark:bg-amber-950/20' : ''
                      }`}
                    >
                      <div className="flex items-start gap-2.5">
                        <div className="mt-0.5">
                          {n.type === 'success' && <CheckCircle2 className="w-4 h-4 text-emerald-500" />}
                          {n.type === 'warning' && <AlertTriangle className="w-4 h-4 text-amber-500" />}
                          {n.type === 'error' && <AlertTriangle className="w-4 h-4 text-rose-500" />}
                          {n.type === 'info' && <Clock className="w-4 h-4 text-sky-500" />}
                        </div>
                        <div className="flex-1 space-y-0.5">
                          <p className="text-xs font-semibold text-slate-900 dark:text-white">
                            {n.title}
                          </p>
                          <p className="text-xs text-slate-500 dark:text-slate-400">{n.message}</p>
                          <p className="text-[10px] text-slate-400 dark:text-slate-500">
                            {new Date(n.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          )}
        </div>

        {/* User Profile Info */}
        <div className="flex items-center gap-3 pl-3 border-l border-slate-200 dark:border-slate-800">
          <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-amber-400 to-amber-600 flex items-center justify-center text-slate-950 font-bold text-xs ring-2 ring-amber-400/30">
            {currentUser?.name.charAt(0) || 'U'}
          </div>
          <div className="hidden sm:flex flex-col text-left">
            <span className="text-xs font-semibold text-slate-900 dark:text-white leading-tight">
              {currentUser?.name}
            </span>
            <span className="text-[10px] text-slate-500 dark:text-slate-400 capitalize">
              {currentUser?.role.replace('_', ' ')}
            </span>
          </div>
        </div>
      </div>
    </header>
  );
};
