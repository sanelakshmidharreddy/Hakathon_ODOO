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

export function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public Marketing Landing Page */}
        <Route path="/" element={<LandingPage />} />

        {/* Authentication */}
        <Route path="/login" element={<LoginPage />} />

        {/* Protected Application Workspace */}
        <Route path="/app" element={<AppLayout />}>
          <Route index element={<Navigate to="/app/dashboard" replace />} />
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="leads" element={<Leads />} />
          <Route path="quotes" element={<Quotes />} />
          <Route path="inventory" element={<Inventory />} />
          <Route path="dispatch" element={<Dispatch />} />
          <Route path="jobs" element={<Jobs />} />
          <Route path="warranties" element={<Warranties />} />
          <Route path="tickets" element={<Tickets />} />
          <Route path="solar-insights" element={<SolarInsights />} />
          <Route path="audit-log" element={<AuditLogPage />} />
        </Route>

        {/* 404 Catch-all */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
