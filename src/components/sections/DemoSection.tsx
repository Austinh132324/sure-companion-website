import { useState } from 'react';
import { Container } from '../ui/Container';
import { useInView } from '../../hooks/useInView';
import './DemoSection.css';

type Tab = 'dashboard' | 'clients' | 'policies';

/* ─── Mock data ──────────────────────────────────────────────────── */

const CLIENTS = [
  { name: 'Sarah Mitchell',  initials: 'SM', company: 'Anchor Freight Co.',     policies: 4, status: 'Active',  renewal: 'May 12' },
  { name: 'James Park',      initials: 'JP', company: 'Summit Retail Group',    policies: 2, status: 'Review',  renewal: 'Apr 30' },
  { name: 'Linda Torres',    initials: 'LT', company: 'Blue Ridge Medical',     policies: 6, status: 'Active',  renewal: 'Jun 8'  },
  { name: 'David Kim',       initials: 'DK', company: 'Coastal Properties LLC', policies: 3, status: 'Active',  renewal: 'May 22' },
  { name: 'Rachel Adams',    initials: 'RA', company: 'Clearview Staffing',     policies: 1, status: 'Pending', renewal: '—'      },
];

const POLICIES = [
  { type: 'Commercial Auto',       company: 'Anchor Freight Co.',     premium: '$42,000', status: 'Active', expiry: 'May 12' },
  { type: 'Business Owners Policy', company: 'Summit Retail Group',   premium: '$18,500', status: 'Review', expiry: 'Apr 30' },
  { type: 'Professional Liability', company: 'Blue Ridge Medical',    premium: '$67,000', status: 'Active', expiry: 'Jun 8'  },
  { type: 'Commercial Property',    company: 'Coastal Properties LLC', premium: '$31,200', status: 'Active', expiry: 'May 22' },
];

const ACTIVITY = [
  { text: 'Policy renewed',    detail: 'Anchor Freight Co.',    time: '2m ago',  dot: 'green' },
  { text: 'New client added',  detail: 'Pacific Ventures Inc.', time: '1h ago',  dot: 'blue'  },
  { text: 'Renewal alert',     detail: 'Summit Retail Group',   time: '3h ago',  dot: 'amber' },
  { text: 'Document uploaded', detail: 'Blue Ridge Medical',    time: '5h ago',  dot: 'muted' },
];

/* ─── Helpers ────────────────────────────────────────────────────── */

function StatusBadge({ status }: { status: string }) {
  return <span className={`dmo-badge dmo-badge--${status.toLowerCase()}`}>{status}</span>;
}

function Sparkline({ pts, color = '#2563eb' }: { pts: string; color?: string }) {
  const id = `dsg-${color.replace('#', '')}`;
  return (
    <svg viewBox="0 0 80 32" width="72" height="28" fill="none" aria-hidden="true" className="dmo-sparkline">
      <defs>
        <linearGradient id={id} x1="0" x2="0" y1="0" y2="1">
          <stop offset="0%" stopColor={color} stopOpacity="0.28" />
          <stop offset="100%" stopColor={color} stopOpacity="0" />
        </linearGradient>
      </defs>
      <polygon points={`${pts} 80,32 0,32`} fill={`url(#${id})`} />
      <polyline points={pts} stroke={color} strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function Av({ s }: { s: string }) {
  return <div className="dmo-av">{s}</div>;
}

/* ─── Sidebar icons ──────────────────────────────────────────────── */

const NAV_ITEMS = [
  { id: 'dashboard' as Tab, label: 'Dashboard', icon: (
    <svg viewBox="0 0 16 16" width="15" height="15" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <rect x="1" y="1" width="6" height="6" rx="1" /><rect x="9" y="1" width="6" height="6" rx="1" />
      <rect x="1" y="9" width="6" height="6" rx="1" /><rect x="9" y="9" width="6" height="6" rx="1" />
    </svg>
  )},
  { id: 'clients' as Tab, label: 'Clients', icon: (
    <svg viewBox="0 0 16 16" width="15" height="15" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <circle cx="6" cy="5" r="2.5" />
      <path d="M1 14c0-2.8 2.2-5 5-5s5 2.2 5 5" />
      <path d="M11 2.5c1.4 0 2.5 1.1 2.5 2.5S12.4 7.5 11 7.5" />
      <path d="M15 14c0-2.3-1.5-4.3-3.7-4.9" />
    </svg>
  )},
  { id: 'policies' as Tab, label: 'Policies', icon: (
    <svg viewBox="0 0 16 16" width="15" height="15" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M9 1H3a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h10a1 1 0 0 0 1-1V6z" />
      <polyline points="9,1 9,6 14,6" />
      <line x1="5" y1="9" x2="11" y2="9" /><line x1="5" y1="12" x2="9" y2="12" />
    </svg>
  )},
];

const STATIC_NAV = [
  { id: 'reports', label: 'Reports', icon: (
    <svg viewBox="0 0 16 16" width="15" height="15" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <line x1="2" y1="15" x2="2" y2="8" /><line x1="6" y1="15" x2="6" y2="3" />
      <line x1="10" y1="15" x2="10" y2="6" /><line x1="14" y1="15" x2="14" y2="1" />
    </svg>
  )},
  { id: 'settings', label: 'Settings', icon: (
    <svg viewBox="0 0 16 16" width="15" height="15" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <circle cx="8" cy="8" r="2.2" />
      <path d="M8 1v1.5M8 13.5V15M1 8h1.5M13.5 8H15M2.9 2.9l1 1M12.1 12.1l1 1M2.9 13.1l1-1M12.1 3.9l1-1" />
    </svg>
  )},
];

/* ─── Dashboard view ─────────────────────────────────────────────── */

function DashboardView() {
  return (
    <div className="dmo-view">
      <div className="dmo-stats">
        {[
          { label: 'Active Clients', value: '247',  trend: '↑ 12 this month', up: true,  pts: '0,26 11,22 22,20 34,16 45,14 56,10 68,7 80,5',  color: '#2563eb' },
          { label: 'Expiring (30d)',  value: '18',   trend: '3 need action',   up: false, pts: '0,16 11,12 22,20 34,14 45,22 56,16 68,18 80,20', color: '#f59e0b' },
          { label: 'Book Value',      value: '$4.2M', trend: '↑ 8.3%',          up: true,  pts: '0,28 11,24 22,20 34,17 45,13 56,9 68,6 80,4',   color: '#2563eb' },
          { label: 'Renewal Rate',    value: '94%',  trend: '↑ 2% YoY',         up: true,  pts: '0,14 11,12 22,16 34,10 45,14 56,9 68,7 80,5',   color: '#10b981' },
        ].map((s) => (
          <div key={s.label} className="dmo-stat">
            <div className="dmo-stat-top">
              <span className="dmo-stat-label">{s.label}</span>
              <Sparkline pts={s.pts} color={s.color} />
            </div>
            <div className="dmo-stat-value">{s.value}</div>
            <div className={`dmo-stat-trend ${s.up ? 'up' : 'warn'}`}>{s.trend}</div>
          </div>
        ))}
      </div>

      <div className="dmo-panels">
        <div className="dmo-panel dmo-panel--grow">
          <div className="dmo-panel-head">
            <span>Recent Clients</span>
            <span className="dmo-link">View all →</span>
          </div>
          <table className="dmo-table">
            <thead><tr><th>Client</th><th>Policies</th><th>Status</th><th>Renewal</th></tr></thead>
            <tbody>
              {CLIENTS.slice(0, 3).map((c) => (
                <tr key={c.name}>
                  <td>
                    <div className="dmo-client-cell">
                      <Av s={c.initials} />
                      <div>
                        <div className="dmo-name">{c.name}</div>
                        <div className="dmo-co">{c.company}</div>
                      </div>
                    </div>
                  </td>
                  <td>{c.policies}</td>
                  <td><StatusBadge status={c.status} /></td>
                  <td className="dmo-date">{c.renewal}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="dmo-panel dmo-panel--narrow">
          <div className="dmo-panel-head"><span>Activity</span></div>
          <ul className="dmo-activity">
            {ACTIVITY.map((a, i) => (
              <li key={i} className="dmo-activity-item">
                <div className={`dmo-dot dmo-dot--${a.dot}`} />
                <div>
                  <div className="dmo-activity-text">{a.text}</div>
                  <div className="dmo-activity-meta">{a.detail} · {a.time}</div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

/* ─── Clients view ───────────────────────────────────────────────── */

function ClientsView() {
  return (
    <div className="dmo-view">
      <div className="dmo-toolbar">
        <div className="dmo-search">
          <svg viewBox="0 0 14 14" width="12" height="12" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
            <circle cx="5.5" cy="5.5" r="4.5" /><path d="M9.5 9.5L13 13" strokeLinecap="round" />
          </svg>
          Search clients...
        </div>
        <div className="dmo-toolbar-actions">
          <button className="dmo-btn-outline">Filter</button>
          <button className="dmo-btn-primary">+ Add Client</button>
        </div>
      </div>
      <div className="dmo-panel">
        <table className="dmo-table dmo-table--full">
          <thead><tr><th>Name</th><th>Company</th><th>Policies</th><th>Status</th><th>Next Renewal</th><th /></tr></thead>
          <tbody>
            {CLIENTS.map((c) => (
              <tr key={c.name}>
                <td>
                  <div className="dmo-client-cell">
                    <Av s={c.initials} />
                    <span className="dmo-name">{c.name}</span>
                  </div>
                </td>
                <td className="dmo-co">{c.company}</td>
                <td>{c.policies}</td>
                <td><StatusBadge status={c.status} /></td>
                <td className="dmo-date">{c.renewal}</td>
                <td><button className="dmo-row-btn">View →</button></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

/* ─── Policies view ──────────────────────────────────────────────── */

function PoliciesView() {
  return (
    <div className="dmo-view">
      <div className="dmo-filter-bar">
        {['All', 'Active', 'Expiring', 'Needs Review'].map((f, i) => (
          <button key={f} className={`dmo-filter-tab${i === 0 ? ' dmo-filter-tab--active' : ''}`}>{f}</button>
        ))}
      </div>
      <div className="dmo-policy-grid">
        {POLICIES.map((p) => (
          <div key={p.type} className="dmo-policy-card">
            <div className="dmo-policy-head">
              <div className="dmo-policy-icon">
                <svg viewBox="0 0 14 14" width="13" height="13" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M8 1H3a1 1 0 0 0-1 1v10a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1V5z" />
                  <polyline points="8,1 8,5 13,5" />
                  <line x1="4" y1="8" x2="10" y2="8" /><line x1="4" y1="11" x2="7" y2="11" />
                </svg>
              </div>
              <StatusBadge status={p.status} />
            </div>
            <div className="dmo-policy-type">{p.type}</div>
            <div className="dmo-policy-company">{p.company}</div>
            <div className="dmo-policy-footer">
              <span className="dmo-policy-premium">{p.premium}<span>/yr</span></span>
              <span className="dmo-policy-expiry">Exp. {p.expiry}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ─── Main export ────────────────────────────────────────────────── */

export function DemoSection() {
  const [tab, setTab] = useState<Tab>('dashboard');
  const ref = useInView<HTMLElement>();

  return (
    <section ref={ref} className="ab-demo" aria-labelledby="demo-title">
      <div className="ab-demo__orb ab-demo__orb--1" aria-hidden="true" />
      <div className="ab-demo__orb ab-demo__orb--2" aria-hidden="true" />
      <div className="ab-demo__orb ab-demo__orb--3" aria-hidden="true" />

      <Container>
        <div className="ab-demo__intro animate fade-up">
          <span className="ab-demo__eyebrow">Interactive Preview</span>
          <h2 id="demo-title" className="ab-demo__title">See Sure Companion in action.</h2>
          <p className="ab-demo__desc">
            A look at how insurance teams manage clients, track policies, and stay on top of renewals — all in one place.
          </p>
        </div>

        <div className="ab-demo__chrome-wrap animate scale-up delay-2">
          <div className="ab-demo__chrome">
            {/* Browser top bar */}
            <div className="ab-demo__bar">
              <div className="ab-demo__traffic">
                <span className="ab-demo__td ab-demo__td--red" />
                <span className="ab-demo__td ab-demo__td--yellow" />
                <span className="ab-demo__td ab-demo__td--green" />
              </div>
              <div className="ab-demo__url">
                <svg viewBox="0 0 12 12" width="10" height="10" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <rect x="2" y="5" width="8" height="6" rx="1" />
                  <path d="M4 5V3.5a2 2 0 0 1 4 0V5" />
                </svg>
                app.surecompanion.com/dashboard
              </div>
              <div className="ab-demo__bar-spacer" />
            </div>

            {/* App */}
            <div className="ab-demo__app">
              {/* Sidebar */}
              <aside className="ab-demo__sidebar">
                <div className="ab-demo__sb-brand">
                  <div className="ab-demo__sb-mark">AB</div>
                  <span className="ab-demo__sb-name">Sure Companion</span>
                </div>

                <nav className="ab-demo__sb-nav" aria-label="Demo navigation">
                  {NAV_ITEMS.map((item) => (
                    <button
                      key={item.id}
                      className={`ab-demo__sb-btn${tab === item.id ? ' ab-demo__sb-btn--active' : ''}`}
                      onClick={() => setTab(item.id)}
                    >
                      {item.icon}
                      <span>{item.label}</span>
                    </button>
                  ))}
                  <div className="ab-demo__sb-divider" />
                  {STATIC_NAV.map((item) => (
                    <div key={item.id} className="ab-demo__sb-btn ab-demo__sb-btn--static">
                      {item.icon}
                      <span>{item.label}</span>
                    </div>
                  ))}
                </nav>

                <div className="ab-demo__sb-user">
                  <div className="ab-demo__sb-avatar">JD</div>
                  <div className="ab-demo__sb-user-info">
                    <div className="ab-demo__sb-uname">Jane Doe</div>
                    <div className="ab-demo__sb-urole">Producer</div>
                  </div>
                </div>
              </aside>

              {/* Main content */}
              <div className="ab-demo__main">
                <div className="ab-demo__topbar">
                  <span className="ab-demo__topbar-title">
                    {[...NAV_ITEMS, ...STATIC_NAV].find((n) => n.id === tab)?.label ?? 'Dashboard'}
                  </span>
                  <div className="ab-demo__topbar-right">
                    <div className="ab-demo__search-mini">
                      <svg viewBox="0 0 14 14" width="12" height="12" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
                        <circle cx="5.5" cy="5.5" r="4.5" /><path d="M9.5 9.5L13 13" strokeLinecap="round" />
                      </svg>
                      Search...
                    </div>
                    <div className="ab-demo__tb-avatar">JD</div>
                  </div>
                </div>

                <div className="ab-demo__content">
                  {tab === 'dashboard' && <DashboardView />}
                  {tab === 'clients'   && <ClientsView />}
                  {tab === 'policies'  && <PoliciesView />}
                </div>
              </div>
            </div>
          </div>

          <p className="ab-demo__hint">Click Dashboard, Clients, or Policies to explore.</p>
        </div>
      </Container>
    </section>
  );
}
