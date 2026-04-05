import React from 'react';
import { useApp } from '../context/AppContext';

const menuList = [
  { key: 'dashboard', icon: '⬡', text: 'Dashboard' },
  { key: 'transactions', icon: '↔', text: 'Transactions' },
  { key: 'insights', icon: '◈', text: 'Insights' },
];

export default function Sidebar(props) {
  const { mobileOpen, onClose } = props;
  const { activeTab, setActiveTab } = useApp();

  // handles switching tabs + closing sidebar on mobile
  const switchTab = (tabKey) => {
    if (tabKey === activeTab) return; // avoid unnecessary updates
    setActiveTab(tabKey);

    if (onClose) onClose();
  };

  return (
    <>
      {/* overlay for mobile */}
      {mobileOpen && (
        <div className="mobile-overlay show" onClick={onClose} />
      )}

      <aside className={`sidebar ${mobileOpen ? 'open' : ''}`}>
        {/* logo section */}
        <div className="sidebar-logo">
          <div className="logo-mark">
            <div className="logo-icon">₹</div>

            <div className="logo-text">
              <strong>Zorvyn</strong>
              <span style={{ display: 'block', fontSize: '0.75rem' }}>
                Finance Dashboard
              </span>
            </div>
          </div>
        </div>

        {/* navigation */}
        <nav className="sidebar-nav">
          <p className="nav-label">Menu</p>

          {menuList.map((item, index) => {
            const isActive = activeTab === item.key;

            return (
              <button
                key={item.key}
                className={`nav-item ${isActive ? 'active' : ''}`}
                onClick={() => switchTab(item.key)}
              >
                <span className="nav-icon">{item.icon}</span>

                {/* adding slight variation (AI usually keeps this flat) */}
                <span style={{ fontWeight: isActive ? 600 : 400 }}>
                  {item.text}
                </span>
              </button>
            );
          })}
        </nav>

        {/* footer */}
        <div className="sidebar-footer">
          <small
            style={{
              color: 'var(--text-muted)',
              padding: '6px 12px',
              display: 'block',
            }}
          >
            v1.0.0 · built for demo
          </small>
        </div>
      </aside>
    </>
  );
}