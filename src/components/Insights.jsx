import React, { useMemo } from 'react';
import { useApp } from '../context/AppContext';
import { CATEGORY_COLORS } from '../data/transactions';
import { formatINR } from '../utils';
import { monthlyBalanceData } from '../data/transactions';

export default function Insights() {
  const { transactions } = useApp();

  const analysis = useMemo(() => {
    if (!transactions || transactions.length === 0) return null;

    let totalExpense = 0;
    let totalIncome = 0;

    const categoryTotals = {};
    const categoryFrequency = {};

    for (const tx of transactions) {
      if (tx.type === 'expense') {
        totalExpense += tx.amount;

        // accumulate totals
        categoryTotals[tx.category] =
          (categoryTotals[tx.category] || 0) + tx.amount;

        // track frequency
        categoryFrequency[tx.category] =
          (categoryFrequency[tx.category] || 0) + 1;
      } else {
        totalIncome += tx.amount;
      }
    }

    // sort categories
    const sortedCategories = Object.entries(categoryTotals).sort(
      (a, b) => b[1] - a[1]
    );

    const topCategory = sortedCategories[0] || null;

    const mostUsedCategory = Object.entries(categoryFrequency).sort(
      (a, b) => b[1] - a[1]
    )[0];

    // avoid divide-by-zero message
    const savings =
      totalIncome > 0
        ? (((totalIncome - totalExpense) / totalIncome) * 100).toFixed(1)
        : '0';

    return {
      sortedCategories,
      topCategory,
      mostUsedCategory,
      totalExpense,
      totalIncome,
      savings,
    };
  }, [transactions]);

  if (!analysis) {
    return (
      <div className="empty-state" style={{ marginTop: 80 }}>
        <div className="empty-icon">📊</div>
        <p>No data yet — start adding transactions to see insights.</p>
      </div>
    );
  }

  const maxCategoryValue = analysis.sortedCategories[0]?.[1] || 1;

  const maxMonthValue = Math.max(
    ...monthlyBalanceData.map((m) => Math.max(m.income, m.expenses))
  );

  const isGoodSavings = Number(analysis.savings) >= 20;

  return (
    <div className="insights-grid">
      {/* TOP CATEGORY */}
      <div className="insight-card">
        <div className="insight-title">
          <span>🔥</span> Where your money goes
        </div>

        {analysis.topCategory ? (
          <>
            <div
              className="insight-big"
              style={{
                color:
                  CATEGORY_COLORS[analysis.topCategory[0]] ||
                  'var(--accent)',
              }}
            >
              {analysis.topCategory[0]}
            </div>

            <div className="insight-sub" style={{ marginBottom: 18 }}>
              {formatINR(analysis.topCategory[1])} spent ·{' '}
              {(
                (analysis.topCategory[1] / analysis.totalExpense) *
                100
              ).toFixed(1)}
              %
            </div>

            {/* bars */}
            {analysis.sortedCategories.slice(0, 5).map(([cat, value]) => {
              const width = (value / maxCategoryValue) * 100;

              return (
                <div className="bar-row" key={cat}>
                  <div className="bar-label">{cat}</div>

                  <div className="bar-track">
                    <div
                      className="bar-fill"
                      style={{
                        width: `${width}%`,
                        background:
                          CATEGORY_COLORS[cat] || 'var(--accent)',
                      }}
                    />
                  </div>

                  <div className="bar-val">{formatINR(value)}</div>
                </div>
              );
            })}
          </>
        ) : (
          <div className="insight-sub">No expenses tracked</div>
        )}
      </div>

      {/* SAVINGS */}
      <div className="insight-card">
        <div className="insight-title">
          <span>💰</span> Savings health
        </div>

        <div
          className="insight-big"
          style={{
            color: isGoodSavings ? 'var(--green)' : 'var(--red)',
          }}
        >
          {analysis.savings}%
        </div>

        <div className="insight-sub" style={{ marginBottom: 18 }}>
          {isGoodSavings
            ? 'Nice — you’re saving consistently.'
            : 'You might want to cut down some expenses.'}
        </div>

        {/* bars */}
        <div className="bar-row">
          <div className="bar-label">Saved</div>
          <div className="bar-track">
            <div
              className="bar-fill"
              style={{
                width: `${analysis.savings}%`,
                background: 'var(--green)',
              }}
            />
          </div>
          <div className="bar-val">{analysis.savings}%</div>
        </div>

        <div className="bar-row">
          <div className="bar-label">Spent</div>
          <div className="bar-track">
            <div
              className="bar-fill"
              style={{
                width: `${100 - analysis.savings}%`,
                background: 'var(--red)',
              }}
            />
          </div>
          <div className="bar-val">
            {(100 - analysis.savings).toFixed(1)}%
          </div>
        </div>

        <div
          style={{
            marginTop: 14,
            padding: '10px 12px',
            background: 'var(--bg-elevated)',
            borderRadius: 10,
            fontSize: '0.78rem',
          }}
        >
          Income: {formatINR(analysis.totalIncome)} <br />
          Expenses: {formatINR(analysis.totalExpense)}
        </div>
      </div>

{/* MONTHLY */}
<div className="insight-card">
  <div className="insight-title">
    <span>📅</span> Monthly snapshot
  </div>

  <div className="month-compare-row">
    {monthlyBalanceData.map((m) => {
      const incomeHeight = (m.income / maxMonthValue) * 80;
      const expenseHeight = (m.expenses / maxMonthValue) * 80;

      return (
        <div className="month-col" key={m.month}>
          <div className="month-name">{m.month}</div>

          <div className="month-bar-wrap">
            <div
              className="month-bar income"
              style={{ height: `${incomeHeight}px` }}
            />
            <div
              className="month-bar expense"
              style={{ height: `${expenseHeight}px` }}
            />
          </div>

          <div className="month-total">
            <span style={{ color: 'var(--green)' }}>
              +{(m.income / 1000).toFixed(0)}K
            </span>
            {' / '}
            <span style={{ color: 'var(--red)' }}>
              {(m.expenses / 1000).toFixed(0)}K
            </span>
          </div>
        </div>
      );
    })}
  </div>
  <div
    style={{
      display: 'flex',
      alignItems: 'center',
      gap: 16,
      marginTop: 14,
    }}
  >
    <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
      <div
        style={{
          width: 10,
          height: 10,
          background: 'var(--green)',
          borderRadius: 2,
        }}
      />
      Income
    </div>

    <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
      <div
        style={{
          width: 10,
          height: 10,
          background: 'var(--red)',
          borderRadius: 2,
        }}
      />
      Expenses
    </div>
  </div>
</div>

      {/* MOST USED */}
      <div className="insight-card">
        <div className="insight-title">
          <span>📌</span> Most used category
        </div>

        {analysis.mostUsedCategory && (
          <>
            <div
              className="insight-big"
              style={{
                color:
                  CATEGORY_COLORS[analysis.mostUsedCategory[0]] ||
                  'var(--blue)',
              }}
            >
              {analysis.mostUsedCategory[0]}
            </div>

            <div className="insight-sub" style={{ marginBottom: 16 }}>
              {analysis.mostUsedCategory[1]} transactions
            </div>
          </>
        )}

        {/* observations */}
        <div
          style={{
            background: 'var(--bg-elevated)',
            borderRadius: 12,
            padding: '12px 14px',
          }}
        >
          <div
            style={{
              fontSize: '0.72rem',
              fontWeight: 600,
              marginBottom: 10,
            }}
          >
            Notes
          </div>

          {[
            'Rent is your biggest fixed cost.',
            'Freelance work is helping your income.',
            'Investments are giving some passive returns.',
            'Entertainment spend could be optimized.',
          ].map((text, i) => (
            <div
              key={i}
              style={{
                display: 'flex',
                gap: 8,
                marginBottom: 8,
                fontSize: '0.8rem',
              }}
            >
              <span>•</span>
              {text}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}