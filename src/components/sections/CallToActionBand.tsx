import { Button } from '../ui/Button';
import { Container } from '../ui/Container';
import { useInView } from '../../hooks/useInView';
import { CTA_BAND } from '../../data/siteContent';
import './CallToActionBand.css';
import './CallToActionBand.mobile.css';

export function CallToActionBand() {
  const ref = useInView<HTMLElement>();

  return (
    <section ref={ref} className="ab-cta-band" aria-labelledby="cta-band-title">
      <Container>
        <div className="ab-cta-band__inner animate scale-up">
          <div className="ab-cta-band__copy">
            <span className="eyebrow ab-cta-band__eyebrow">{CTA_BAND.eyebrow}</span>
            <h2 id="cta-band-title" className="ab-cta-band__title">{CTA_BAND.headline}</h2>
            <p className="ab-cta-band__description">{CTA_BAND.copy}</p>
          </div>
          <div className="ab-cta-band__actions">
            <Button to={CTA_BAND.primaryCta.to} size="lg">
              {CTA_BAND.primaryCta.label}
            </Button>
            <Button to={CTA_BAND.secondaryCta.to} variant="ghost" size="lg">
              {CTA_BAND.secondaryCta.label}
            </Button>
          </div>
        </div>
      </Container>
    </section>
  );
}
