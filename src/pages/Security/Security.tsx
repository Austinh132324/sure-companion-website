import { useEffect } from 'react';
import { Container } from '../../components/ui/Container';
import { SectionHeading } from '../../components/ui/SectionHeading';
import { CallToActionBand } from '../../components/sections/CallToActionBand';
import { SECURITY_INTRO, SECURITY_SECTIONS } from '../../data/security';
import './Security.css';

export default function Security() {
  useEffect(() => {
    document.title = 'Security | Sure Companion';
  }, []);

  return (
    <>
      <section className="ab-page-header">
        <Container>
          <SectionHeading
            eyebrow={SECURITY_INTRO.eyebrow}
            title={SECURITY_INTRO.title}
            description={SECURITY_INTRO.description}
          />
        </Container>
      </section>

      <section className="ab-security-sections">
        <Container>
          <div className="ab-security-sections__stack">
            {SECURITY_SECTIONS.map((section) => (
              <article key={section.id} className="ab-security-section">
                <header className="ab-security-section__head">
                  <h2>{section.title}</h2>
                  <p>{section.description}</p>
                </header>
                <ul className="ab-security-section__cards">
                  {section.points.map((point) => (
                    <li key={point.title} className="ab-security-section__card">
                      <div className="ab-security-section__card-icon" aria-hidden="true">
                        <svg
                          viewBox="0 0 24 24"
                          width="20"
                          height="20"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2.25"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <path d="M12 2l8 4v6c0 5-3.5 8.5-8 10-4.5-1.5-8-5-8-10V6l8-4z" />
                          <path d="M9 12l2 2 4-4" />
                        </svg>
                      </div>
                      <h3>{point.title}</h3>
                      <p>{point.description}</p>
                    </li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
        </Container>
      </section>

      <CallToActionBand />
    </>
  );
}
