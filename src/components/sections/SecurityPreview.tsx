import { Button } from '../ui/Button';
import { Container } from '../ui/Container';
import { SectionHeading } from '../ui/SectionHeading';
import { useInView } from '../../hooks/useInView';
import './SecurityPreview.css';

const POINTS = [
  'HTTPS everywhere with modern TLS defaults.',
  'Role-aware access so producers see what they should.',
  'Thoughtful data retention and responsible third parties.',
  'A published roadmap for the controls agencies ask for next.',
];

export function SecurityPreview() {
  const ref = useInView<HTMLElement>();

  return (
    <section ref={ref} className="ab-security-preview" aria-labelledby="security-preview-title">
      <Container>
        <div className="ab-security-preview__grid">
          <div className="ab-security-preview__content animate slide-left">
            <SectionHeading
              eyebrow="Security"
              title={<span id="security-preview-title">Trust belongs in the platform, not the appendix.</span>}
              description="Sure Companion is built around responsible access, responsible data handling, and a clear direction for the controls agencies need as they grow."
            />
            <div className="ab-security-preview__ctas">
              <Button to="/security" variant="primary">
                See our approach
              </Button>
              <Button to="/contact" variant="ghost">
                Talk to us
              </Button>
            </div>
          </div>

          <aside className="ab-security-preview__card animate slide-right" aria-label="Security highlights">
            <h3>How we think about security</h3>
            <ul>
              {POINTS.map((item, i) => (
                <li key={item} className={`animate fade-up delay-${i + 1}`}>
                  <svg
                    viewBox="0 0 24 24"
                    width="20"
                    height="20"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.25"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    aria-hidden="true"
                  >
                    <path d="M5 12l5 5L20 7" />
                  </svg>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </aside>
        </div>
      </Container>
    </section>
  );
}
