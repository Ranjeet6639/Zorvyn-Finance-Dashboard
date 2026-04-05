import React, { useState, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import { CATEGORIES } from '../data/transactions';

const defaultForm = {
  description: '',
  amount: '',
  category: 'Food & Dining',
  type: 'expense',
  date: new Date().toISOString().split('T')[0],
};

export default function TransactionModal({ tx, onClose }) {
  const { addTransaction, editTransaction } = useApp();

  const [form, setForm] = useState(
    tx ? { ...tx, amount: String(tx.amount) } : defaultForm
  );

  const [errors, setErrors] = useState({});

  const updateField = (key, value) => {
    setForm(prev => ({
      ...prev,
      [key]: value,
    }));
  };

  const validate = () => {
    const nextErrors = {};

    if (!form.description.trim()) {
      nextErrors.description = 'Required';
    }

    if (!form.amount || isNaN(form.amount) || Number(form.amount) <= 0) {
      nextErrors.amount = 'Enter a valid amount';
    }

    if (!form.date) {
      nextErrors.date = 'Required';
    }

    setErrors(nextErrors);

    return Object.keys(nextErrors).length === 0;
  };

  const handleSubmit = () => {
    if (!validate()) return;

    if (tx) {
      editTransaction(tx.id, form);
    } else {
      addTransaction(form);
    }

    onClose();
  };

  useEffect(() => {
    const handleKey = (e) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    window.addEventListener('keydown', handleKey);

    return () => {
      window.removeEventListener('keydown', handleKey);
    };
  }, [onClose]);

  return (
    <div
      className="modal-overlay"
      onClick={(e) => {
        if (e.target === e.currentTarget) {
          onClose();
        }
      }}
    >
      <div className="modal">
        <div className="modal-title">
          {tx ? 'Edit Transaction' : 'Add Transaction'}
        </div>

        {/* DESCRIPTION */}
        <div className="form-group">
          <label className="form-label">Description</label>

          <input
            className="form-input"
            value={form.description}
            onChange={(e) =>
              updateField('description', e.target.value)
            }
            placeholder="e.g. Grocery Store"
            autoFocus
          />

          {errors.description && (
            <div
              style={{
                color: 'var(--red)',
                fontSize: '0.72rem',
                marginTop: 4,
              }}
            >
              {errors.description}
            </div>
          )}
        </div>

        {/* AMOUNT + DATE */}
        <div className="form-row">
          <div className="form-group">
            <label className="form-label">Amount (₹)</label>

            <input
              className="form-input"
              type="number"
              value={form.amount}
              onChange={(e) =>
                updateField('amount', e.target.value)
              }
              placeholder="0"
              min="0"
            />

            {errors.amount && (
              <div style={{ color: 'var(--red)', fontSize: '0.72rem', marginTop: 4 }}>
                {errors.amount}
              </div>
            )}
          </div>

          <div className="form-group">
            <label className="form-label">Date</label>

            <input
              className="form-input"
              type="date"
              value={form.date}
              onChange={(e) =>
                updateField('date', e.target.value)
              }
            />

            {errors.date && (
              <div style={{ color: 'var(--red)', fontSize: '0.72rem', marginTop: 4 }}>
                {errors.date}
              </div>
            )}
          </div>
        </div>

        {/* TYPE + CATEGORY */}
        <div className="form-row">
          <div className="form-group">
            <label className="form-label">Type</label>

            <select
              className="form-select"
              value={form.type}
              onChange={(e) =>
                updateField('type', e.target.value)
              }
            >
              <option value="expense">Expense</option>
              <option value="income">Income</option>
            </select>
          </div>

          <div className="form-group">
            <label className="form-label">Category</label>

            <select
              className="form-select"
              value={form.category}
              onChange={(e) =>
                updateField('category', e.target.value)
              }
            >
              {CATEGORIES.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* ACTIONS */}
        <div className="modal-actions">
          <button
            className="btn btn-ghost"
            onClick={onClose}
          >
            Cancel
          </button>

          <button
            className="btn btn-primary"
            onClick={handleSubmit}
          >
            {tx ? 'Save Changes' : 'Add Transaction'}
          </button>
        </div>
      </div>
    </div>
  );
}