import { Container } from '../ui/Container';
import { useInView } from '../../hooks/useInView';
import { TRUST_BAR } from '../../data/siteContent';
import './TrustBar.css';

const TRUST_ICONS = [
  /* Unified client view — grid/layout */
  <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <rect x="3" y="3" width="7" height="7" rx="1" />
    <rect x="14" y="3" width="7" height="7" rx="1" />
    <rect x="3" y="14" width="7" height="7" rx="1" />
    <rect x="14" y="14" width="7" height="7" rx="1" />
  </svg>,
  /* Workflow clarity — zap */
  <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
  </svg>,
  /* Security-first — shield */
  <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
    <path d="M9 12l2 2 4-4" />
  </svg>,
  /* Insight — trending up */
  <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <polyline points="23 6 13.5 15.5 8.5 10.5 1 18" />
    <polyline points="17 6 23 6 23 12" />
  </svg>,
];

export function TrustBar() {
  const ref = useInView<HTMLElement>();

  return (
    <section ref={ref} className="ab-trust" aria-label={TRUST_BAR.eyebrow}>
      <Container>
        <ul className="ab-trust__list">
          {TRUST_BAR.items.map((item, i) => (
            <li key={item.title} className={`ab-trust__item animate fade-up delay-${i + 1}`}>
              <div className="ab-trust__icon" aria-hidden="true">
                {TRUST_ICONS[i]}
              </div>
              <div className="ab-trust__text">
                <h3 className="ab-trust__title">{item.title}</h3>
                <p className="ab-trust__detail">{item.detail}</p>
              </div>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}
