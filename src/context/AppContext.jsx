import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { initialTransactions } from '../data/transactions';

const AppContext = createContext();

const STORAGE_KEY = 'financeapp_v1';

export function AppProvider({ children }) {
  const [darkMode, setDarkMode] = useState(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    return saved ? JSON.parse(saved).darkMode ?? true : true;
  });

  const [role, setRole] = useState(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    return saved ? JSON.parse(saved).role ?? 'viewer' : 'viewer';
  });

  const [transactions, setTransactions] = useState(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    return saved ? JSON.parse(saved).transactions ?? initialTransactions : initialTransactions;
  });

  const [filters, setFilters] = useState({ search: '', type: 'all', category: 'all', sortBy: 'date', sortDir: 'desc' });
  const [activeTab, setActiveTab] = useState('dashboard');

  // Persist to localStorage
  useEffect(() => {
    const data = { darkMode, role, transactions };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  }, [darkMode, role, transactions]);

  // Apply dark mode class
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', darkMode ? 'dark' : 'light');
  }, [darkMode]);

  const addTransaction = useCallback((tx) => {
    const newTx = { ...tx, id: Date.now(), amount: parseFloat(tx.amount) };
    setTransactions(prev => [newTx, ...prev]);
  }, []);

  const editTransaction = useCallback((id, updated) => {
    setTransactions(prev => prev.map(tx => tx.id === id ? { ...tx, ...updated, amount: parseFloat(updated.amount) } : tx));
  }, []);

  const deleteTransaction = useCallback((id) => {
    setTransactions(prev => prev.filter(tx => tx.id !== id));
  }, []);

  const filteredTransactions = transactions
    .filter(tx => {
      const matchSearch = tx.description.toLowerCase().includes(filters.search.toLowerCase()) ||
        tx.category.toLowerCase().includes(filters.search.toLowerCase());
      const matchType = filters.type === 'all' || tx.type === filters.type;
      const matchCat = filters.category === 'all' || tx.category === filters.category;
      return matchSearch && matchType && matchCat;
    })
    .sort((a, b) => {
      if (filters.sortBy === 'date') {
        return filters.sortDir === 'desc'
          ? new Date(b.date) - new Date(a.date)
          : new Date(a.date) - new Date(b.date);
      }
      if (filters.sortBy === 'amount') {
        return filters.sortDir === 'desc' ? b.amount - a.amount : a.amount - b.amount;
      }
      return 0;
    });

  const totalIncome = transactions.filter(t => t.type === 'income').reduce((s, t) => s + t.amount, 0);
  const totalExpenses = transactions.filter(t => t.type === 'expense').reduce((s, t) => s + t.amount, 0);
  const totalBalance = totalIncome - totalExpenses;

  return (
    <AppContext.Provider value={{
      darkMode, setDarkMode,
      role, setRole,
      transactions, filteredTransactions,
      addTransaction, editTransaction, deleteTransaction,
      filters, setFilters,
      activeTab, setActiveTab,
      totalIncome, totalExpenses, totalBalance,
    }}>
      {children}
    </AppContext.Provider>
  );
}

export const useApp = () => useContext(AppContext);
