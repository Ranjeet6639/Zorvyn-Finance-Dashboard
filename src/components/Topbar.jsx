import React from 'react';
import { useApp } from '../context/AppContext';

const pageTitles = {
  dashboard: { title: 'Dashboard', sub: 'Your financial overview' },
  transactions: { title: 'Transactions', sub: 'All your activity' },
  insights: { title: 'Insights', sub: 'Patterns & observations' },
};

export default function Topbar({ onMenuClick }) {
  const { darkMode, setDarkMode, role, setRole, activeTab } = useApp();

  const page = pageTitles[activeTab] || {
    title: 'Dashboard',
    sub: '',
  };

  const toggleTheme = () => {
    setDarkMode(prev => !prev);
  };

  const handleRoleChange = (e) => {
    setRole(e.target.value);
  };

  return (
    <header className="topbar">
      {/* left section */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
        <button
          className="hamburger"
          onClick={onMenuClick}
          style={{ display: 'flex' }}
        >
          ☰
        </button>

        <div className="topbar-left">
          <h1 style={{ marginBottom: 2 }}>{page.title}</h1>
          <p>{page.sub}</p>
        </div>
      </div>

      {/* right section */}
      <div className="topbar-right">
        <select
          className="role-select"
          value={role}
          onChange={handleRoleChange}
          title="Switch role"
        >
          <option value="viewer">👁 Viewer</option>
          <option value="admin">⚡ Admin</option>
        </select>

        <button
          className="theme-toggle"
          onClick={toggleTheme}
          title="Toggle theme"
        >
          {darkMode ? '☀' : '☾'}
        </button>
      </div>
    </header>
  );
}