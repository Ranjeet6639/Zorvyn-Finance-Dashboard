export const CATEGORIES = [
  'Housing', 'Food & Dining', 'Transport', 'Entertainment',
  'Healthcare', 'Shopping', 'Utilities', 'Education', 'Travel', 'Salary', 'Freelance', 'Investment'
];

export const CATEGORY_COLORS = {
  'Housing': '#f59e0b',
  'Food & Dining': '#ef4444',
  'Transport': '#3b82f6',
  'Entertainment': '#8b5cf6',
  'Healthcare': '#10b981',
  'Shopping': '#f97316',
  'Utilities': '#6b7280',
  'Education': '#06b6d4',
  'Travel': '#ec4899',
  'Salary': '#22c55e',
  'Freelance': '#84cc16',
  'Investment': '#a855f7',
};

export const initialTransactions = [
  { id: 1, date: '2024-01-05', description: 'Monthly Rent', amount: 15000, category: 'Housing', type: 'expense' },
  { id: 2, date: '2024-01-07', description: 'Salary Credit', amount: 75000, category: 'Salary', type: 'income' },
  { id: 3, date: '2024-01-09', description: 'Grocery Store', amount: 2800, category: 'Food & Dining', type: 'expense' },
  { id: 4, date: '2024-01-11', description: 'Uber Rides', amount: 650, category: 'Transport', type: 'expense' },
  { id: 5, date: '2024-01-13', description: 'Netflix Subscription', amount: 649, category: 'Entertainment', type: 'expense' },
  { id: 6, date: '2024-01-15', description: 'Freelance Project', amount: 18000, category: 'Freelance', type: 'income' },
  { id: 7, date: '2024-01-17', description: 'Medical Checkup', amount: 1200, category: 'Healthcare', type: 'expense' },
  { id: 8, date: '2024-01-18', description: 'Amazon Shopping', amount: 3400, category: 'Shopping', type: 'expense' },
  { id: 9, date: '2024-01-20', description: 'Electricity Bill', amount: 1800, category: 'Utilities', type: 'expense' },
  { id: 10, date: '2024-01-22', description: 'Online Course', amount: 2999, category: 'Education', type: 'expense' },
  { id: 11, date: '2024-01-25', description: 'Restaurant Dinner', amount: 1850, category: 'Food & Dining', type: 'expense' },
  { id: 12, date: '2024-01-28', description: 'Stock Dividend', amount: 4200, category: 'Investment', type: 'income' },
  { id: 13, date: '2024-02-01', description: 'Monthly Rent', amount: 15000, category: 'Housing', type: 'expense' },
  { id: 14, date: '2024-02-05', description: 'Salary Credit', amount: 75000, category: 'Salary', type: 'income' },
  { id: 15, date: '2024-02-08', description: 'Grocery Store', amount: 3100, category: 'Food & Dining', type: 'expense' },
  { id: 16, date: '2024-02-10', description: 'Flight Tickets', amount: 12000, category: 'Travel', type: 'expense' },
  { id: 17, date: '2024-02-12', description: 'Petrol', amount: 2200, category: 'Transport', type: 'expense' },
  { id: 18, date: '2024-02-14', description: 'Movie Night', amount: 800, category: 'Entertainment', type: 'expense' },
  { id: 19, date: '2024-02-18', description: 'Freelance Payment', amount: 22000, category: 'Freelance', type: 'income' },
  { id: 20, date: '2024-02-20', description: 'Pharmacy', amount: 950, category: 'Healthcare', type: 'expense' },
  { id: 21, date: '2024-02-22', description: 'Water Bill', amount: 400, category: 'Utilities', type: 'expense' },
  { id: 22, date: '2024-02-25', description: 'Clothes Shopping', amount: 4500, category: 'Shopping', type: 'expense' },
  { id: 23, date: '2024-02-27', description: 'Investment Return', amount: 8000, category: 'Investment', type: 'income' },
  { id: 24, date: '2024-03-01', description: 'Monthly Rent', amount: 15000, category: 'Housing', type: 'expense' },
  { id: 25, date: '2024-03-05', description: 'Salary Credit', amount: 75000, category: 'Salary', type: 'income' },
  { id: 26, date: '2024-03-07', description: 'Grocery Store', amount: 2600, category: 'Food & Dining', type: 'expense' },
  { id: 27, date: '2024-03-09', description: 'Auto Repair', amount: 5500, category: 'Transport', type: 'expense' },
  { id: 28, date: '2024-03-12', description: 'Spotify Premium', amount: 119, category: 'Entertainment', type: 'expense' },
  { id: 29, date: '2024-03-15', description: 'Freelance Project', amount: 30000, category: 'Freelance', type: 'income' },
  { id: 30, date: '2024-03-18', description: 'Gym Membership', amount: 1500, category: 'Healthcare', type: 'expense' },
  { id: 31, date: '2024-03-20', description: 'Book Purchase', amount: 799, category: 'Education', type: 'expense' },
  { id: 32, date: '2024-03-22', description: 'Hotel Stay', amount: 8500, category: 'Travel', type: 'expense' },
  { id: 33, date: '2024-03-25', description: 'Internet Bill', amount: 999, category: 'Utilities', type: 'expense' },
  { id: 34, date: '2024-03-28', description: 'Electronics', amount: 18000, category: 'Shopping', type: 'expense' },
  { id: 35, date: '2024-03-30', description: 'Dividend Income', amount: 5500, category: 'Investment', type: 'income' },
];

export const monthlyBalanceData = [
  { month: 'Jan', income: 97200, expenses: 30347, balance: 66853 },
  { month: 'Feb', income: 105000, expenses: 39950, balance: 65050 },
  { month: 'Mar', income: 110500, expenses: 52017, balance: 58483 },
];
