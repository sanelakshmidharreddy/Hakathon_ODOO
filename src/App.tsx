import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { LandingPage } from './pages/LandingPage';
import { LoginPage } from './pages/LoginPage';
import { AppLayout } from './components/layout/AppLayout';
import { Dashboard } from './pages/Dashboard';
import { Leads } from './pages/Leads';
import { Quotes } from './pages/Quotes';
import { Inventory } from './pages/Inventory';
import { Dispatch } from './pages/Dispatch';
import { Jobs } from './pages/Jobs';
import { Warranties } from './pages/Warranties';
import { Tickets } from './pages/Tickets';
import { SolarInsights } from './pages/SolarInsights';
import { AuditLogPage } from './pages/AuditLog';
import { NotFound } from './pages/NotFound';
import { ErrorBoundary } from './components/common/ErrorBoundary';

export function App() {
  return (
    <BrowserRouter basename={import.meta.env.BASE_URL || '/'}>
      <ErrorBoundary fallbackTitle="Application Routing Interruption">
        <Routes>
          {/* Public Marketing Landing Page */}
          <Route path="/" element={<LandingPage />} />

          {/* Authentication */}
          <Route path="/login" element={<LoginPage />} />

          {/* Primary Operational Platform Workspace (Direct Top-Level Routes) */}
          <Route element={<AppLayout />}>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/leads" element={<Leads />} />
            <Route path="/quotes" element={<Quotes />} />
            <Route path="/inventory" element={<Inventory />} />
            <Route path="/dispatch" element={<Dispatch />} />
            <Route path="/jobs" element={<Jobs />} />
            <Route path="/technician" element={<Jobs />} />
            <Route path="/warranties" element={<Warranties />} />
            <Route path="/tickets" element={<Tickets />} />
            <Route path="/solar-insights" element={<SolarInsights />} />
            <Route path="/analytics" element={<SolarInsights />} />
            <Route path="/audit-log" element={<AuditLogPage />} />
          </Route>

          {/* Backward Compatibility Aliases for Legacy /app/* Paths */}
          <Route path="/app" element={<Navigate to="/dashboard" replace />} />
          <Route path="/app/dashboard" element={<Navigate to="/dashboard" replace />} />
          <Route path="/app/leads" element={<Navigate to="/leads" replace />} />
          <Route path="/app/quotes" element={<Navigate to="/quotes" replace />} />
          <Route path="/app/inventory" element={<Navigate to="/inventory" replace />} />
          <Route path="/app/dispatch" element={<Navigate to="/dispatch" replace />} />
          <Route path="/app/jobs" element={<Navigate to="/jobs" replace />} />
          <Route path="/app/technician" element={<Navigate to="/technician" replace />} />
          <Route path="/app/warranties" element={<Navigate to="/warranties" replace />} />
          <Route path="/app/tickets" element={<Navigate to="/tickets" replace />} />
          <Route path="/app/solar-insights" element={<Navigate to="/solar-insights" replace />} />
          <Route path="/app/analytics" element={<Navigate to="/analytics" replace />} />
          <Route path="/app/audit-log" element={<Navigate to="/audit-log" replace />} />
          <Route path="/app/*" element={<Navigate to="/dashboard" replace />} />

          {/* Catch-all Route for 404 Not Found */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </ErrorBoundary>
    </BrowserRouter>
  );
}

export default App;
