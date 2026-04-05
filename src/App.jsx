import React, { useState } from 'react';
import { AppProvider, useApp } from './context/AppContext';
import Sidebar from './components/Sidebar';
import Topbar from './components/Topbar';
import Dashboard from './components/Dashboard';
import Transactions from './components/Transactions';
import Insights from './components/Insights';
import './styles/main.css';

function AppContent() {
  const { activeTab } = useApp();
  const [mobileOpen, setMobileOpen] = useState(false);

  const renderPage = () => {
    if (activeTab === 'dashboard') return <Dashboard />;
    if (activeTab === 'transactions') return <Transactions />;
    if (activeTab === 'insights') return <Insights />;
  };

  return (
    <div className="app-layout">
      <Sidebar mobileOpen={mobileOpen} onClose={() => setMobileOpen(false)} />
      <div className="main-content">
        <Topbar onMenuClick={() => setMobileOpen(o => !o)} />
        <main className="page-content">
          {renderPage()}
        </main>
      </div>
    </div>
  );
}

export default function App() {
  return (
    <AppProvider>
      <AppContent />
    </AppProvider>
  );
}
