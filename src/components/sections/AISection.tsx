import { useState, useEffect, useRef } from 'react';
import { Container } from '../ui/Container';
import { useInView } from '../../hooks/useInView';
import './DemoSection.css';
import './AISection.css';

type AIStep = 'idle' | 'dragging' | 'analyzing' | 'extracting' | 'portal' | 'analytics' | 'tasks';

const AI_FIELDS = [
  { label: 'Client Name',    value: 'Marcus Delgado'       },
  { label: 'Company',        value: 'Pacific Ventures Inc.' },
  { label: 'Policy Type',    value: 'Commercial Auto'       },
  { label: 'Annual Premium', value: '$38,500'               },
  { label: 'Effective Date', value: 'May 1, 2026'           },
  { label: 'Expiry Date',    value: 'May 1, 2027'           },
  { label: 'Coverage Limit', value: '$2,000,000'            },
];

const AI_ANALYTICS = [
  { label: 'Risk Assessment',        value: 'Low Risk',            detail: 'Score: 82 / 100',       bar: 82,  color: '#16a34a' },
  { label: 'Renewal Likelihood',     value: '87%',                 detail: 'High probability',      bar: 87,  color: '#2563eb' },
  { label: 'Cross-sell Opportunity', value: 'Commercial Property', detail: 'Aegis recommends upsell', bar: null, color: '#7c3aed' },
  { label: 'Premium vs. Market',     value: '3% below avg.',       detail: 'Competitively priced',  bar: null, color: '#0891b2' },
];

const AI_TASKS = [
  { name: 'Policy Review',    detail: 'Aegis analyzes renewal at expiry · May 1, 2027', badge: 'Aegis' },
  { name: 'Renewal Email',    detail: 'Auto-sent 30 days before expiry',                 badge: 'Email' },
  { name: 'SMS Reminder',     detail: 'Text client 7 days before renewal',               badge: 'SMS'   },
  { name: 'Cross-sell Alert', detail: 'Notify when cross-sell score exceeds 70%',        badge: 'Aegis' },
];

const POINTS = [
  'Extracts client, policy, and coverage data in seconds',
  'Injects the new client into your portal with AI insights',
  'Schedules AI-powered follow-up tasks automatically',
];

const STEP_HINT: Record<AIStep, string> = {
  idle:       'Drop a policy PDF to begin',
  dragging:   'Drop to analyze with AI…',
  analyzing:  'Reading document…',
  extracting: 'Extracting fields…',
  portal:     'Client injected into portal',
  analytics:  'Aegis insights generated',
  tasks:      'Aegis tasks configured · replaying in 5s',
};

/* ─── PDF icon (reused in multiple states) ───────────────────────── */
function PdfIcon() {
  return (
    <svg viewBox="0 0 28 36" width="28" height="36" fill="none" aria-hidden="true">
      <rect x="1" y="1" width="26" height="34" rx="3" fill="#fff" stroke="#e2e8f0" strokeWidth="1.5" />
      <path d="M17 1v9h9" fill="none" stroke="#e2e8f0" strokeWidth="1.5" />
      <rect x="5" y="14" width="12" height="2" rx="1" fill="#cbd5e1" />
      <rect x="5" y="19" width="16" height="2" rx="1" fill="#cbd5e1" />
      <rect x="5" y="24" width="10" height="2" rx="1" fill="#cbd5e1" />
      <text x="5" y="12" fontSize="4" fontWeight="700" fill="#ef4444">PDF</text>
    </svg>
  );
}

/* ─── AIDemo component ───────────────────────────────────────────── */
function AIDemo() {
  const [step, setStep]               = useState<AIStep>('idle');
  const [fieldsVisible, setFieldsVisible] = useState(0);
  const timers  = useRef<ReturnType<typeof setTimeout>[]>([]);
  const started = useRef(false);
  const rootRef = useRef<HTMLDivElement>(null);

  function clearAll() {
    timers.current.forEach(clearTimeout);
    timers.current = [];
  }

  function schedule(fn: () => void, ms: number) {
    timers.current.push(setTimeout(fn, ms));
  }

  function runDemo() {
    clearAll();
    setStep('idle');
    setFieldsVisible(0);

    // ── Phase 1: drag PDF in ──────────────────────────────────────
    schedule(() => setStep('dragging'),   700);
    // ── Phase 2: AI reads the document ───────────────────────────
    schedule(() => setStep('analyzing'),  2000);
    // ── Phase 3: extract fields one-by-one (380ms apart) ─────────
    schedule(() => { setStep('extracting'); setFieldsVisible(0); }, 3600);
    AI_FIELDS.forEach((_, i) => {
      schedule(() => setFieldsVisible(i + 1), 3600 + (i + 1) * 380);
    });
    const allFieldsDone = 3600 + AI_FIELDS.length * 380;
    // ── Phase 4: inject into portal ───────────────────────────────
    schedule(() => setStep('portal'),    allFieldsDone + 1400);
    // ── Phase 5: show AI analytics ────────────────────────────────
    const analyticsAt = allFieldsDone + 1400 + 3500;
    schedule(() => setStep('analytics'), analyticsAt);
    // ── Phase 6: AI powered tasks wizard ──────────────────────────
    const tasksAt = analyticsAt + 4000;
    schedule(() => setStep('tasks'), tasksAt);
    // ── Auto-rerun after 5s on the tasks screen ───────────────────
    schedule(runDemo, tasksAt + 5000);
  }

  useEffect(() => {
    const el = rootRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started.current) {
          started.current = true;
          setTimeout(runDemo, 400);
          obs.disconnect();
        }
      },
      { threshold: 0.2 },
    );
    obs.observe(el);
    return () => { obs.disconnect(); clearAll(); };
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <div ref={rootRef} className="ab-ai-demo">

      {/* ── Panel header ── */}
      <div className="ab-ai-demo__head">
        <div className="dmo-ai-badge">
          <svg viewBox="0 0 12 12" width="10" height="10" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <path d="M6 1l1.1 3.4H10L7.5 6.3l.9 3.2L6 7.8 3.6 9.5l.9-3.2L2 4.4h2.9L6 1z" />
          </svg>
          Aegis
        </div>
        <span className="ab-ai-demo__head-title">{STEP_HINT[step]}</span>
        {step === 'tasks' && (
          <button className="dmo-btn-outline dmo-ai-reset" onClick={runDemo}>↺ Run again</button>
        )}
      </div>

      {/* ── Panel body ── */}
      <div className="ab-ai-demo__body">

        {/* Idle / dragging */}
        {(step === 'idle' || step === 'dragging') && (
          <div className={`dmo-ai-drop${step === 'dragging' ? ' dmo-ai-drop--active' : ''}`}>
            {step === 'dragging' && (
              <div className="dmo-ai-floating-pdf" aria-hidden="true">
                <PdfIcon />
                <span>policy_2026.pdf</span>
              </div>
            )}
            <div className="dmo-ai-drop-icon" aria-hidden="true">
              <svg viewBox="0 0 40 40" width="40" height="40" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M24 4H10a3 3 0 0 0-3 3v26a3 3 0 0 0 3 3h20a3 3 0 0 0 3-3V14z" />
                <polyline points="24,4 24,14 34,14" />
                <line x1="14" y1="22" x2="26" y2="22" />
                <line x1="14" y1="27" x2="22" y2="27" />
              </svg>
            </div>
            <p className="dmo-ai-drop-text">
              {step === 'idle' ? 'Drop a policy PDF here' : 'Release to analyze with AI…'}
            </p>
            {step === 'idle' && <span className="dmo-ai-drop-sub">Supports any standard policy document</span>}
          </div>
        )}

        {/* Analyzing */}
        {step === 'analyzing' && (
          <div className="dmo-ai-analyzing">
            <div className="dmo-ai-pdf-preview" aria-hidden="true">
              <div className="dmo-ai-scan-line" />
              <div className="dmo-ai-pdf-lines">
                {[80, 60, 70, 45, 65, 55, 75, 50].map((w, i) => (
                  <div key={i} className="dmo-ai-pdf-line" style={{ width: `${w}%` }} />
                ))}
              </div>
              <div className="dmo-ai-pdf-label">policy_2026.pdf</div>
            </div>
            <div className="dmo-ai-status">
              <div className="dmo-ai-spinner" aria-hidden="true" />
              <div>
                <div className="dmo-ai-status-title">
                  Aegis is reading your document
                  <span className="dmo-ai-dots"><span>.</span><span>.</span><span>.</span></span>
                </div>
                <div className="dmo-ai-status-sub">Extracting client, policy, and coverage details</div>
              </div>
            </div>
          </div>
        )}

        {/* Extracting */}
        {step === 'extracting' && (
          <div className="dmo-ai-result">
            <div className="dmo-ai-result-pdf" aria-hidden="true">
              <div className="dmo-ai-result-pdf-icon">
                <PdfIcon />
                <span>policy_2026.pdf</span>
              </div>
            </div>
            <div className="dmo-ai-fields">
              <div className="dmo-ai-fields-title">Extracting fields…</div>
              <div className="dmo-ai-field-list">
                {AI_FIELDS.map((f, i) => (
                  <div key={f.label} className={`dmo-ai-field${i < fieldsVisible ? ' dmo-ai-field--visible' : ''}`}>
                    <span className="dmo-ai-field-label">{f.label}</span>
                    <span className="dmo-ai-field-value">{f.value}</span>
                    {i < fieldsVisible && (
                      <svg viewBox="0 0 12 12" width="11" height="11" fill="none" stroke="#16a34a" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                        <path d="M2 6l3 3 5-5" />
                      </svg>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Portal — client injected + inline AI chips */}
        {step === 'portal' && (
          <div className="dmo-ai-portal">
            <div className="dmo-ai-success">
              <svg viewBox="0 0 16 16" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <circle cx="8" cy="8" r="7" /><path d="M5 8l2 2 4-4" />
              </svg>
              <span><strong>Pacific Ventures Inc.</strong> added · PDF tagged and attached to client record</span>
            </div>

            <div className="dmo-ai-portal-header">
              <span className="dmo-ai-portal-label">New client · Sure Companion portal</span>
              <div className="dmo-ai-live-badge">
                <span className="dmo-ai-live-dot" aria-hidden="true" />
                Live
              </div>
            </div>

            <div className="dmo-ai-client-card">
              <div className="dmo-ai-client-avatar">MD</div>
              <div className="dmo-ai-client-info">
                <div className="dmo-ai-client-name">Marcus Delgado</div>
                <div className="dmo-ai-client-company">Pacific Ventures Inc.</div>
              </div>
              <span className="dmo-badge dmo-badge--active">Active</span>
            </div>

            <div className="dmo-ai-client-meta">
              {[
                { k: 'Policy Type',    v: 'Commercial Auto' },
                { k: 'Annual Premium', v: '$38,500 / yr'    },
                { k: 'Coverage Limit', v: '$2,000,000'      },
                { k: 'Renewal Date',   v: 'May 1, 2027'     },
              ].map(({ k, v }) => (
                <div key={k} className="dmo-ai-client-meta-item">
                  <span>{k}</span><span>{v}</span>
                </div>
              ))}
            </div>

            {/* AI insight chips */}
            <div className="dmo-ai-portal-insights">
              <div className="dmo-ai-portal-insights-label">
                <svg viewBox="0 0 12 12" width="10" height="10" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M6 1l1.1 3.4H10L7.5 6.3l.9 3.2L6 7.8 3.6 9.5l.9-3.2L2 4.4h2.9L6 1z" />
                </svg>
                Aegis Insights
              </div>
              <div className="dmo-ai-portal-chips">
                {[
                  { label: 'Risk Score',    value: 'Low · 82/100',           color: '#16a34a', bg: '#dcfce7' },
                  { label: 'Renewal',       value: '87% likelihood',          color: '#1d4ed8', bg: '#dbeafe' },
                  { label: 'Cross-sell',    value: 'Commercial Property',     color: '#7c3aed', bg: '#ede9fe' },
                  { label: 'Vs. Market',    value: '3% below avg.',           color: '#0891b2', bg: '#cffafe' },
                ].map((chip, i) => (
                  <div
                    key={chip.label}
                    className="dmo-ai-portal-chip"
                    style={{ animationDelay: `${0.25 + i * 0.08}s` }}
                  >
                    <span className="dmo-ai-portal-chip-label">{chip.label}</span>
                    <span
                      className="dmo-ai-portal-chip-value"
                      style={{ color: chip.color, background: chip.bg }}
                    >
                      {chip.value}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Analytics — AI insights */}
        {step === 'analytics' && (
          <div className="dmo-ai-analytics">
            <div className="dmo-ai-analytics-header">
              <div className="dmo-ai-badge">
                <svg viewBox="0 0 12 12" width="10" height="10" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M6 1l1.1 3.4H10L7.5 6.3l.9 3.2L6 7.8 3.6 9.5l.9-3.2L2 4.4h2.9L6 1z" />
                </svg>
                Aegis Insights
              </div>
              <span className="dmo-ai-analytics-sub">Marcus Delgado · Pacific Ventures Inc.</span>
            </div>

            <div className="dmo-ai-analytics-grid">
              {AI_ANALYTICS.map((a, i) => (
                <div key={a.label} className={`dmo-ai-analytic-card dmo-ai-analytic-card--delay-${i}`}>
                  <div className="dmo-ai-analytic-label">{a.label}</div>
                  <div className="dmo-ai-analytic-value" style={{ color: a.color }}>{a.value}</div>
                  {a.bar !== null && (
                    <div className="dmo-ai-risk-bar">
                      <div className="dmo-ai-risk-fill" style={{ width: `${a.bar}%`, background: a.color }} />
                    </div>
                  )}
                  <div className="dmo-ai-analytic-detail">{a.detail}</div>
                </div>
              ))}
            </div>

            <div className="dmo-ai-analytics-footer">
              <svg viewBox="0 0 14 14" width="12" height="12" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <circle cx="7" cy="7" r="6" /><path d="M7 4v3l2 2" />
              </svg>
              Analysis complete · Client profile live in portal
            </div>
          </div>
        )}

        {/* AI Powered Tasks */}
        {step === 'tasks' && (
          <div className="dmo-ai-tasks">
            <div className="dmo-ai-tasks-header">
              <div className="dmo-ai-tasks-title">
                <svg viewBox="0 0 14 14" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M7 1v2M7 11v2M1 7h2M11 7h2M3 3l1.4 1.4M9.6 9.6L11 11M3 11l1.4-1.4M9.6 4.4L11 3" />
                  <circle cx="7" cy="7" r="2.5" fill="currentColor" stroke="none" opacity="0.3" />
                </svg>
                Aegis Tasks
              </div>
              <div className="dmo-ai-tasks-sub">Automations configured for Marcus Delgado</div>
            </div>

            <div className="dmo-ai-tasks-list">
              {AI_TASKS.map((task, i) => (
                <div
                  key={task.name}
                  className="dmo-ai-task-item"
                  style={{ animationDelay: `${i * 0.1}s` }}
                >
                  <div className="dmo-ai-task-check">✓</div>
                  <div className="dmo-ai-task-info">
                    <div className="dmo-ai-task-name">{task.name}</div>
                    <div className="dmo-ai-task-detail">{task.detail}</div>
                  </div>
                  <span className={`dmo-ai-task-badge dmo-ai-task-badge--${task.badge.toLowerCase()}`}>
                    {task.badge}
                  </span>
                </div>
              ))}
            </div>

            <div className="dmo-ai-tasks-footer">
              <span>4 tasks scheduled</span>
              <div className="dmo-ai-live-badge">
                <span className="dmo-ai-live-dot" aria-hidden="true" />
                Active
              </div>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}

/* ─── Section ────────────────────────────────────────────────────── */

export function AISection() {
  const sectionRef = useInView<HTMLElement>();

  return (
    <section ref={sectionRef} className="ab-ai-section" aria-labelledby="ai-title">
      <div className="ab-ai-section__orb ab-ai-section__orb--1" aria-hidden="true" />
      <div className="ab-ai-section__orb ab-ai-section__orb--2" aria-hidden="true" />

      <Container size="wide">
        <div className="ab-ai-section__grid">

          <div className="ab-ai-section__content animate slide-left">
            <span className="ab-ai-section__eyebrow">Meet Aegis</span>
            <span className="ab-ai-section__pronunciation" aria-label="Pronounced ee-jis">
              pronounced <em>EE-jis</em>
            </span>
            <p className="ab-ai-section__availability">
              *Available only in the Sure Companion Portal
            </p>
            <h2 id="ai-title" className="ab-ai-section__title">
              Drop a PDF.<br />
              <span className="ab-ai-section__title-accent">Aegis handles the rest.</span>
            </h2>
            <p className="ab-ai-section__desc">
              Aegis reads any standard policy document, extracts every field, injects the client into your portal, generates AI risk analytics, and schedules follow-up tasks — all from a single drop.
            </p>
            <ul className="ab-ai-section__points">
              {POINTS.map((p, i) => (
                <li key={p} className={`animate fade-up delay-${i + 1}`}>
                  <svg viewBox="0 0 16 16" width="18" height="18" fill="none" aria-hidden="true">
                    <circle cx="8" cy="8" r="8" fill="rgba(124,58,237,0.18)" />
                    <path d="M5 8l2 2 4-4" stroke="#a78bfa" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                  {p}
                </li>
              ))}
            </ul>
          </div>

          <div className="ab-ai-section__demo animate slide-right">
            <AIDemo />
          </div>

        </div>
      </Container>
    </section>
  );
}
