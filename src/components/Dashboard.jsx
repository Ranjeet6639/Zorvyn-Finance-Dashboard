import React, { useMemo } from 'react';
import { useApp } from '../context/AppContext';
import { CATEGORY_COLORS } from '../data/transactions';
import { formatINR, formatShort } from '../utils';
import { monthlyBalanceData } from '../data/transactions';

/* ── SUMMARY CARDS ─── */
function SummaryCards() {
  const { totalBalance, totalIncome, totalExpenses, transactions } = useApp();

  const incomeCount = transactions.filter(t => t.type === 'income').length;
  const expenseCount = transactions.filter(t => t.type === 'expense').length;

  return (
    <div className="summary-grid">
      <div className="summary-card balance">
        <div className="summary-label">
          <div className="summary-icon">◈</div>
          Net Balance
        </div>

        <div className="summary-amount">{formatINR(totalBalance)}</div>

        <div className="summary-sub">
          {transactions.length} total transactions
        </div>
      </div>

      <div className="summary-card income">
        <div className="summary-label">
          <div className="summary-icon">↑</div>
          Total Income
        </div>

        <div className="summary-amount">{formatINR(totalIncome)}</div>

        <div className="summary-sub">
          {incomeCount} income entries
        </div>
      </div>

      <div className="summary-card expense">
        <div className="summary-label">
          <div className="summary-icon">↓</div>
          Total Expenses
        </div>

        <div className="summary-amount">{formatINR(totalExpenses)}</div>

        <div className="summary-sub">
          {expenseCount} expense entries
        </div>
      </div>
    </div>
  );
}

/* ── LINE CHART ─── */
function LineChart() {
  const data = monthlyBalanceData;

  const W = 500;
  const H = 200;

  const PAD = { top: 20, right: 20, bottom: 30, left: 55 };

  const chartW = W - PAD.left - PAD.right;
  const chartH = H - PAD.top - PAD.bottom;

  // collect all values for scaling
  const allVals = data.flatMap(d => [d.income, d.expenses, d.balance]);

  const minVal = Math.min(...allVals) * 0.85;
  const maxVal = Math.max(...allVals) * 1.1;

  const xScale = (i) =>
    PAD.left + (i / (data.length - 1)) * chartW;

  const yScale = (v) =>
    PAD.top + chartH - ((v - minVal) / (maxVal - minVal)) * chartH;

  const makePath = (key) =>
    data
      .map((d, i) =>
        `${i === 0 ? 'M' : 'L'} ${xScale(i)} ${yScale(d[key])}`
      )
      .join(' ');

  const makeArea = (key) => {
    const top = data
      .map((d, i) => `${xScale(i)},${yScale(d[key])}`)
      .join(' L ');

    const bottom = `${xScale(data.length - 1)},${PAD.top + chartH} ${xScale(0)},${PAD.top + chartH}`;

    return `M ${top} L ${bottom} Z`;
  };

  const yTicks = 4;
  const yStep = (maxVal - minVal) / yTicks;

  return (
    <div className="card" style={{ animationDelay: '0.35s', animation: 'slideUp 0.5s ease both' }}>
      <div className="card-header">
        <span className="card-title">Balance Trend</span>
      </div>

      <div className="line-chart">
        <svg viewBox={`0 0 ${W} ${H}`} preserveAspectRatio="xMidYMid meet">

          {/* grid lines */}
          {Array.from({ length: yTicks + 1 }).map((_, i) => {
            const val = minVal + i * yStep;
            const y = yScale(val);

            return (
              <g key={i}>
                <line
                  x1={PAD.left}
                  x2={PAD.left + chartW}
                  y1={y}
                  y2={y}
                  stroke="var(--border)"
                  strokeWidth="1"
                />
                <text
                  x={PAD.left - 6}
                  y={y}
                  textAnchor="end"
                  dominantBaseline="middle"
                  fill="var(--text-muted)"
                  fontSize="9"
                >
                  {formatShort(val)}
                </text>
              </g>
            );
          })}

          {/* filled areas */}
          <path d={makeArea('income')} fill="var(--green)" className="chart-area" />
          <path d={makeArea('balance')} fill="var(--accent)" className="chart-area" />

          {/* lines */}
          <path d={makePath('income')} className="chart-path income-line" />
          <path d={makePath('expenses')} className="chart-path expense-line" />
          <path d={makePath('balance')} className="chart-path balance-line" />

          {/* dots */}
          {data.map((d, i) => (
            <g key={i}>
              <circle cx={xScale(i)} cy={yScale(d.income)} r={4} fill="var(--green)" />
              <circle cx={xScale(i)} cy={yScale(d.expenses)} r={4} fill="var(--red)" />
              <circle cx={xScale(i)} cy={yScale(d.balance)} r={5} fill="var(--accent)" stroke="var(--bg-surface)" strokeWidth="2" />

              <text
                x={xScale(i)}
                y={H - 8}
                textAnchor="middle"
                fill="var(--text-muted)"
                fontSize="10"
              >
                {d.month}
              </text>
            </g>
          ))}
        </svg>
      </div>

      {/* legend */}
      <div className="chart-legend">
        {[
          ['Income', 'var(--green)'],
          ['Expenses', 'var(--red)'],
          ['Balance', 'var(--accent)'],
        ].map(([label, color]) => (
          <div className="legend-item" key={label}>
            <div className="legend-dot" style={{ background: color }} />
            {label}
          </div>
        ))}
      </div>
    </div>
  );
}

/* ── DONUT CHART ─── */
function DonutChart() {
  const { transactions } = useApp();

  const categoryTotals = useMemo(() => {
    const map = {};

    transactions
      .filter(t => t.type === 'expense')
      .forEach(t => {
        map[t.category] = (map[t.category] || 0) + t.amount;
      });

    return Object.entries(map)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 6);
  }, [transactions]);

  const total = categoryTotals.reduce((s, [, v]) => s + v, 0);

  const cx = 90, cy = 90;
  const r = 70, innerR = 48;

  let startAngle = -Math.PI / 2;

  const slices = categoryTotals.map(([cat, val]) => {
    const angle = (val / total) * 2 * Math.PI;

    const x1 = cx + r * Math.cos(startAngle);
    const y1 = cy + r * Math.sin(startAngle);

    const x2 = cx + r * Math.cos(startAngle + angle);
    const y2 = cy + r * Math.sin(startAngle + angle);

    const xi1 = cx + innerR * Math.cos(startAngle + angle);
    const yi1 = cy + innerR * Math.sin(startAngle + angle);

    const xi2 = cx + innerR * Math.cos(startAngle);
    const yi2 = cy + innerR * Math.sin(startAngle);

    const large = angle > Math.PI ? 1 : 0;

    const d = `M ${x1} ${y1}
               A ${r} ${r} 0 ${large} 1 ${x2} ${y2}
               L ${xi1} ${yi1}
               A ${innerR} ${innerR} 0 ${large} 0 ${xi2} ${yi2}
               Z`;

    const slice = {
      cat,
      val,
      d,
      color: CATEGORY_COLORS[cat] || '#6b7280',
      pct: ((val / total) * 100).toFixed(1),
    };

    startAngle += angle;
    return slice;
  });

  return (
    <div className="card" style={{ animationDelay: '0.45s', animation: 'slideUp 0.5s ease both' }}>
      <div className="card-header">
        <span className="card-title">Spending Breakdown</span>
      </div>

      <div className="donut-wrapper">
        <svg className="donut-svg" viewBox="0 0 180 180">
          {slices.map((s, i) => (
            <path key={i} d={s.d} fill={s.color} opacity="0.9">
              <title>{s.cat}: {formatINR(s.val)}</title>
            </path>
          ))}

          <text x={cx} y={cy - 8} textAnchor="middle" fontSize="9">
            Total
          </text>

          <text x={cx} y={cy + 8} textAnchor="middle" fontSize="13" fontWeight="600">
            {formatShort(total)}
          </text>
        </svg>

        <div className="donut-legend">
          {slices.map((s, i) => (
            <div className="donut-legend-item" key={i}>
              <div className="donut-legend-left">
                <div className="donut-legend-dot" style={{ background: s.color }} />
                <span>{s.cat}</span>
              </div>
              <span className="donut-legend-val">{s.pct}%</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ── RECENT TRANSACTIONS ─── */
function RecentTransactions() {
  const { transactions, setActiveTab } = useApp();

  const recent = [...transactions]
    .sort((a, b) => new Date(b.date) - new Date(a.date))
    .slice(0, 5);

  return (
    <div className="card" style={{ animationDelay: '0.5s', animation: 'slideUp 0.5s ease both' }}>
      <div className="card-header">
        <span className="card-title">Recent Transactions</span>

        <button
          className="btn btn-ghost"
          style={{ padding: '6px 12px', fontSize: '0.75rem' }}
          onClick={() => setActiveTab('transactions')}
        >
          View All →
        </button>
      </div>

      {recent.length === 0 ? (
        <div className="empty-state">
          <div className="empty-icon">📭</div>
          <p>No transactions yet</p>
        </div>
      ) : (
        <div>
          {recent.map((tx, i) => (
            <div
              key={tx.id}
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '10px 0',
                borderBottom:
                  i < recent.length - 1 ? '1px solid var(--border)' : 'none',
                animation: `slideUp 0.3s ease ${i * 0.05}s both`,
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                <div
                  style={{
                    width: 36,
                    height: 36,
                    borderRadius: 10,
                    background:
                      tx.type === 'income'
                        ? 'var(--green-dim)'
                        : 'var(--red-dim)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  {tx.type === 'income' ? '↑' : '↓'}
                </div>

                <div>
                  <div style={{ fontWeight: 500 }}>
                    {tx.description}
                  </div>
                  <div style={{ fontSize: '0.72rem' }}>
                    {tx.category} ·{' '}
                    {new Date(tx.date).toLocaleDateString('en-IN', {
                      day: '2-digit',
                      month: 'short',
                    })}
                  </div>
                </div>
              </div>

              <div className={`tx-amount ${tx.type}`}>
                {tx.type === 'income' ? '+' : '-'}
                {formatINR(tx.amount)}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

/* ── DASHBOARD ─── */
export default function Dashboard() {
  return (
    <div>
      <SummaryCards />

      <div className="charts-grid">
        <LineChart />
        <DonutChart />
      </div>

      <RecentTransactions />
    </div>
  );
}