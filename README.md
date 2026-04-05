# Zorvyn – Finance Dashboard

A clean, interactive personal finance dashboard built with **React** and **CSS**. Built as an internship assignment to demonstrate frontend development skills including component design, state management, role-based UI, and data visualization.

---

## 🚀 Getting Started

### Prerequisites
- Node.js v16+
- npm

### Setup

```bash
# Clone / unzip the project
cd Zorvyn-Finance-Dashboard-main

# Install dependencies
npm install

# Start the dev server
npm start
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 📋 Features

### ✅ Dashboard Overview
- **Summary Cards** – Net Balance, Total Income, Total Expenses with live counts
- **Line Chart** – SVG-based balance trend across 3 months (Income / Expenses / Net Balance)
- **Donut Chart** – Spending breakdown by category with percentage labels
- **Recent Transactions** – Top 5 latest activity with quick-link to full table

### ✅ Transactions Section
- Sortable table by **Date** or **Amount** 
- **Search** by description or category
- **Filter** by type (Income / Expense) and category
- Transaction count + totals summary bar
- **Admin only**: Add, Edit, Delete transactions via modal form

### ✅ Role-Based UI
Switch roles using the dropdown in the top-right corner:
| Role       | Access                         |
| ---------- | ------------------------------ |
| **Viewer** | Can only view data             |
| **Admin**  | Full control (add/edit/delete) |


No backend is used — roles are simulated using React Context.

### ✅ Insights Section
- **Top Spending Category** – Ranked bar chart of top 5 expense categories
- **Savings Rate** – Percentage of income saved vs spent
- **Monthly Comparison** – Side-by-side bar chart for Jan / Feb / Mar
- **Most Active Category** – Most frequently logged expense type
- **Key Observations** – Smart auto-generated insights from data patterns

### ✅ State Management
- Built with React Context API (`AppContext`)
- Manages: transactions, filters, active role, dark mode, active tab
- All state changes are reactive and reflected across all components

### ✅ Persistence
- Data is stored in `localStorage`
- Saves:
   - transactions
   - role
   - theme preference
- Everything stays after refresh

### ✅ Dark / Light Mode
- Toggle via the ☀/☾ button in the top-right
- Uses CSS variables for instant theme switch
- Preference is saved in localStorage

### ✅ Animations
- Cards slide in on load
- Line chart animates when rendered
- Donut chart loads smoothly
- Modal has fade + scale effect
- Table rows animate in sequentially

### ✅ Responsive Design
- Desktop → full layout with sidebar
- Mobile → sidebar becomes drawer (hamburger menu)
- Layout adapts (cards stack, charts go vertical)

---

## 🗂 Project Structure

```
src/
├── components/
│   ├── Sidebar.jsx           # Navigation sidebar
│   ├── Topbar.jsx            # Header with role switcher & theme toggle
│   ├── Dashboard.jsx         # Summary cards, charts, recent transactions
│   ├── Transactions.jsx      # Full transaction table with filters
│   ├── Insights.jsx          # Analytics and observations
│   └── TransactionModal.jsx  # Add/edit transaction form
├── context/
│   └── AppContext.jsx        # Global state (Context API)
├── data/
│   └── transactions.js       # Mock data, categories, colors
├── styles/
│   └── main.css              # All styles (CSS variables, layout, components)
├── utils.js                  # Format helpers (INR, date, shorthand)
├── App.jsx                   # Root layout
└── index.js                  # Entry point
```

---

## 🎨 Design Decisions

- **Fonts**
DM Serif Display (headings) + DM Sans (body) + JetBrains Mono (numbers)
→ gives a clean fintech-style look
- **Colors**
Dark navy base + gold/amber accents
→ inspired by finance apps (trust + premium feel)
- **Charts**
Built using raw SVG instead of libraries
→ more control + no extra dependencies
- **CSS Variables**
Makes theme switching easier and scalable
- **Component structure**
Each page is separated for clarity and maintainability

---

## 🔧 Tech Stack

| Tech         | Purpose          |
| ------------ | ---------------- |
| React 18     | UI               |
| Context API  | State management |
| Plain CSS    | Styling          |
| SVG          | Charts           |
| localStorage | Persistence      |
| Google Fonts | Typography       |


---

## 💡 Assumptions Made

- Currency is Indian Rupees (₹) since the data is in INR range
- Monthly data is pre-defined (mock data)
- No authentication system
- Transactions persist in localStorage only (no backend)

---

## 🙏 Notes

This project was built for evaluation purposes.

The main focus was:

- clean UI
- simple but effective UX
- structured components
- readable code

Not production-level backend or scalability
