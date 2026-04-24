import { Button } from '../ui/Button';
import { Container } from '../ui/Container';
import { FeatureCard } from '../ui/FeatureCard';
import { SectionHeading } from '../ui/SectionHeading';
import { useInView } from '../../hooks/useInView';
import { FEATURES_PREVIEW } from '../../data/features';
import './FeaturesPreview.css';
import './FeaturesPreview.mobile.css';

export function FeaturesPreview() {
  const ref = useInView<HTMLElement>();

  return (
    <section ref={ref} className="ab-features-preview" aria-labelledby="features-preview-title">
      <Container>
        <div className="ab-features-preview__header">
          <div className="animate fade-up">
            <SectionHeading
              eyebrow="What you get"
              title={<span id="features-preview-title">The essentials, built the way agents actually work.</span>}
              description="Sure Companion focuses on the flows that matter most: clients, policies, insight, and responsible security."
            />
          </div>
          <div className="animate fade-in delay-2">
            <Button to="/features" variant="secondary">
              See all features
            </Button>
          </div>
        </div>

        <ul className="ab-features-preview__grid">
          {FEATURES_PREVIEW.map((feature, i) => (
            <li key={feature.id} className={`animate fade-up delay-${i + 1}`}>
              <FeatureCard feature={feature} />
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}
