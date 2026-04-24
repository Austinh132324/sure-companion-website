import { useEffect } from 'react';
import { Container } from '../../components/ui/Container';
import { SectionHeading } from '../../components/ui/SectionHeading';
import { CallToActionBand } from '../../components/sections/CallToActionBand';
import { FEATURE_CATEGORIES } from '../../data/features';
import type { Feature } from '../../data/features';
import './Features.css';

/* ─── Icon map ───────────────────────────────────────────────────── */

const ICONS: Record<Feature['icon'], JSX.Element> = {
  users: (
    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2M9 7a4 4 0 1 0 8 0 4 4 0 0 0-8 0M23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" />
  ),
  shield: (
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10zM9 12l2 2 4-4" />
  ),
  chart: (
    <path d="M18 20V10M12 20V4M6 20v-6M2 20h20" />
  ),
  workflow: (
    <path d="M9 11l3 3L22 4M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11" />
  ),
  document: (
    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8zM14 2v6h6M16 13H8M16 17H8M10 9H8" />
  ),
  spark: (
    <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />
  ),
  dashboard: (
    <path d="M3 3h7v7H3zM14 3h7v7h-7zM14 14h7v7h-7zM3 14h7v7H3z" />
  ),
  dollar: (
    <path d="M12 1v22M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
  ),
  inbox: (
    <path d="M22 12h-6l-2 3H10l-2-3H2M5.45 5.11L2 12v6a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-6l-3.45-6.89A2 2 0 0 0 16.76 4H7.24a2 2 0 0 0-1.79 1.11z" />
  ),
  scales: (
    <path d="M12 3v18M3 21h18M7 8l-4 8h8l-4-8zM17 8l-4 8h8l-4-8z" />
  ),
  package: (
    <path d="M16.5 9.4l-9-5.2M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16zM3.27 6.96L12 12.01l8.73-5.05M12 22.08V12" />
  ),
  calculator: (
    <path d="M4 2h16a2 2 0 0 1 2 2v16a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2zM8 7h8v4H8zM8 15h2M12 15h2M16 15h2M8 19h2M12 19h2M16 19h2" />
  ),
  brain: (
    <g>
      <circle cx="12" cy="4.5" r="2.5" />
      <circle cx="5"  cy="18.5" r="2.5" />
      <circle cx="19" cy="18.5" r="2.5" />
      <line x1="10.9" y1="6.7"  x2="6.1"  y2="16.3" />
      <line x1="13.1" y1="6.7"  x2="17.9" y2="16.3" />
      <line x1="7.5"  y1="18.5" x2="16.5" y2="18.5" />
    </g>
  ),
};

function CapabilityIcon({ name }: { name: Feature['icon'] }) {
  return (
    <svg
      viewBox="0 0 24 24"
      width="26"
      height="26"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.75"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      {ICONS[name]}
    </svg>
  );
}

export default function Features() {
  useEffect(() => {
    document.title = 'Features | Sure Companion';
  }, []);

  return (
    <>
      <section className="ab-page-header">
        <Container>
          <SectionHeading
            eyebrow="Platform capabilities"
            title="Everything your agency needs — in one platform."
            description="Sure Companion covers the full stack of insurance operations: client and policy management, embedded analytics, workflow automation, underwriting, and accounting."
          />
        </Container>
      </section>

      <div className="ab-feature-categories">
        {FEATURE_CATEGORIES.map((category, catIndex) => (
          <section
            key={category.id}
            className={`ab-feature-category${catIndex % 2 === 1 ? ' ab-feature-category--alt' : ''}`}
          >
            <Container>
              <div className="ab-feature-category__intro">
                <span className="eyebrow">{category.eyebrow}</span>
                <h2>{category.title}</h2>
                <p>{category.description}</p>
              </div>

              <div className="ab-capability-grid">
                {category.features.map((feature) => (
                  <article key={feature.id} className="ab-capability-card">
                    <div className="ab-capability-card__icon">
                      <CapabilityIcon name={feature.icon} />
                    </div>
                    <div className="ab-capability-card__body">
                      <h3 className="ab-capability-card__title">{feature.title}</h3>
                      <p className="ab-capability-card__desc">{feature.description}</p>
                      <ul className="ab-capability-card__bullets">
                        {feature.bullets.map((bullet) => (
                          <li key={bullet}>
                            <svg
                              viewBox="0 0 16 16"
                              width="14"
                              height="14"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              aria-hidden="true"
                            >
                              <path d="M3 8l3.5 3.5L13 4" />
                            </svg>
                            <span>{bullet}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </article>
                ))}
              </div>
            </Container>
          </section>
        ))}
      </div>

      <CallToActionBand />
    </>
  );
}
