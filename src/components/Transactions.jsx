import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { CATEGORIES, CATEGORY_COLORS } from '../data/transactions';
import { formatINR, formatDate } from '../utils';
import TransactionModal from './TransactionModal';

export default function Transactions() {
  const {
    role,
    filteredTransactions,
    filters,
    setFilters,
    deleteTransaction,
    totalIncome,
    totalExpenses,
  } = useApp();

  const [modal, setModal] = useState(null); // null | 'add' | tx object

  const updateFilter = (key, value) => {
    setFilters(prev => ({
      ...prev,
      [key]: value,
    }));
  };

  const handleSort = (col) => {
    setFilters(prev => ({
      ...prev,
      sortBy: col,
      sortDir:
        prev.sortBy === col && prev.sortDir === 'desc'
          ? 'asc'
          : 'desc',
    }));
  };

  const getSortArrow = (col) => {
    if (filters.sortBy !== col) {
      return <span className="sort-arrow">↕</span>;
    }

    return (
      <span className="sort-arrow active">
        {filters.sortDir === 'desc' ? '↓' : '↑'}
      </span>
    );
  };

  const getCategoryStyle = (cat) => {
    const color = CATEGORY_COLORS[cat];

    return {
      background: color + '22',
      color: color || 'var(--text-secondary)',
      border: `1px solid ${color}44`,
    };
  };

  const count = filteredTransactions.length;

  return (
    <div>
      {/* viewer mode banner */}
      {role === 'viewer' && (
        <div className="viewer-banner">
          👁 You are in
          <strong style={{ marginLeft: 4 }}> Viewer</strong>
          {' '}mode — switch to Admin to edit transactions.
        </div>
      )}

      <div className="card">
        <div className="card-header">
          <span className="card-title">All Transactions</span>

          {role === 'admin' && (
            <button
              className="btn btn-primary"
              onClick={() => setModal('add')}
            >
              + Add Transaction
            </button>
          )}
        </div>

        {/* filters */}
        <div className="filter-bar">
          <div className="search-input-wrap">
            <span className="search-icon">⊙</span>

            <input
              className="search-input"
              placeholder="Search by name or category..."
              value={filters.search}
              onChange={(e) =>
                updateFilter('search', e.target.value)
              }
            />
          </div>

          <select
            className="filter-select"
            value={filters.type}
            onChange={(e) =>
              updateFilter('type', e.target.value)
            }
          >
            <option value="all">All Types</option>
            <option value="income">Income</option>
            <option value="expense">Expense</option>
          </select>

          <select
            className="filter-select"
            value={filters.category}
            onChange={(e) =>
              updateFilter('category', e.target.value)
            }
          >
            <option value="all">All Categories</option>
            {CATEGORIES.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>
        </div>

        {/* meta info */}
        <div className="tx-meta">
          <span>
            {count} transaction{count !== 1 ? 's' : ''}
          </span>

          <span>
            Income:{' '}
            <strong style={{ color: 'var(--green)', marginRight: 12 }}>
              {formatINR(totalIncome)}
            </strong>

            Expenses:{' '}
            <strong style={{ color: 'var(--red)' }}>
              {formatINR(totalExpenses)}
            </strong>
          </span>
        </div>

        {count === 0 ? (
          <div className="empty-state">
            <div className="empty-icon">🔍</div>
            <p>No transactions match your filters</p>
          </div>
        ) : (
          <div className="tx-table-wrap">
            <table className="tx-table">
              <thead>
                <tr>
                  <th onClick={() => handleSort('date')}>
                    Date {getSortArrow('date')}
                  </th>

                  <th>Description</th>
                  <th>Category</th>
                  <th>Type</th>

                  <th
                    onClick={() => handleSort('amount')}
                    style={{ textAlign: 'right' }}
                  >
                    Amount {getSortArrow('amount')}
                  </th>

                  {role === 'admin' && (
                    <th style={{ textAlign: 'center' }}>
                      Actions
                    </th>
                  )}
                </tr>
              </thead>

              <tbody>
                {filteredTransactions.map((tx, i) => {
                  const isIncome = tx.type === 'income';

                  return (
                    <tr
                      key={tx.id}
                      style={{ animationDelay: `${i * 0.025}s` }}
                    >
                      <td>
                        <span className="tx-date">
                          {formatDate(tx.date)}
                        </span>
                      </td>

                      <td>
                        <span className="tx-desc">
                          {tx.description}
                        </span>
                      </td>

                      <td>
                        <span
                          className="badge"
                          style={getCategoryStyle(tx.category)}
                        >
                          {tx.category}
                        </span>
                      </td>

                      <td>
                        <span
                          className="badge"
                          style={{
                            background: isIncome
                              ? 'var(--green-dim)'
                              : 'var(--red-dim)',
                            color: isIncome
                              ? 'var(--green)'
                              : 'var(--red)',
                            border: `1px solid ${
                              isIncome
                                ? 'rgba(16,185,129,0.2)'
                                : 'rgba(239,68,68,0.2)'
                            }`,
                          }}
                        >
                          {isIncome ? '↑' : '↓'} {tx.type}
                        </span>
                      </td>

                      <td style={{ textAlign: 'right' }}>
                        <span className={`tx-amount ${tx.type}`}>
                          {isIncome ? '+' : '-'}
                          {formatINR(tx.amount)}
                        </span>
                      </td>

                      {role === 'admin' && (
                        <td>
                          <div
                            className="tx-actions"
                            style={{ justifyContent: 'center' }}
                          >
                            <button
                              className="btn-icon"
                              title="Edit"
                              onClick={() => setModal(tx)}
                            >
                              ✎
                            </button>

                            <button
                              className="btn-icon delete"
                              title="Delete"
                              onClick={() => deleteTransaction(tx.id)}
                            >
                              ✕
                            </button>
                          </div>
                        </td>
                      )}
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* modal */}
      {modal && (
        <TransactionModal
          tx={modal === 'add' ? null : modal}
          onClose={() => setModal(null)}
        />
      )}
    </div>
  );
}