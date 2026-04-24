import { useEffect } from 'react';
import { Container } from '../../components/ui/Container';
import { SectionHeading } from '../../components/ui/SectionHeading';
import { HeroSection } from '../../components/sections/HeroSection';
import { TrustBar } from '../../components/sections/TrustBar';
import { AISection } from '../../components/sections/AISection';
import { FeaturesPreview } from '../../components/sections/FeaturesPreview';
import { SecurityPreview } from '../../components/sections/SecurityPreview';
import { CallToActionBand } from '../../components/sections/CallToActionBand';
import { useInView } from '../../hooks/useInView';
import { WHY_BLOCK } from '../../data/siteContent';
import './Home.css';

export default function Home() {
  const whyRef = useInView<HTMLElement>();

  useEffect(() => {
    document.title = 'Sure Companion | Modern Insurance Agent Platform';
  }, []);

  return (
    <>
      <HeroSection />
      <TrustBar />
      <AISection />
      <FeaturesPreview />

      <section ref={whyRef} className="ab-why" aria-labelledby="why-title">
        <Container>
          <div className="ab-why__grid">
            <div className="animate slide-left">
              <SectionHeading
                eyebrow={WHY_BLOCK.eyebrow}
                title={<span id="why-title">{WHY_BLOCK.headline}</span>}
                description={WHY_BLOCK.copy}
              />
            </div>
            <ul className="ab-why__list">
              {WHY_BLOCK.points.map((point, i) => (
                <li key={point} className={`animate fade-up delay-${i + 1}`}>
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
                  <span>{point}</span>
                </li>
              ))}
            </ul>
          </div>
        </Container>
      </section>

      <SecurityPreview />
      <CallToActionBand />
    </>
  );
}
