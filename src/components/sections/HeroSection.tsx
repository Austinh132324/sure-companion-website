import { Button } from '../ui/Button';
import { Container } from '../ui/Container';
import { DemoChrome } from './DemoChrome';
import { HERO } from '../../data/siteContent';
import './HeroSection.css';
import './HeroSection.mobile.css';

export function HeroSection() {
  return (
    <section className="ab-hero" aria-labelledby="hero-title">
      <div className="ab-hero__glow ab-hero__glow--1" aria-hidden="true" />
      <div className="ab-hero__glow ab-hero__glow--2" aria-hidden="true" />

      <Container size="wide">
        <div className="ab-hero__grid">
          <div className="ab-hero__content">
            <span className="eyebrow ab-hero__eyebrow">{HERO.eyebrow}</span>
            <h1 id="hero-title" className="ab-hero__title">
              Manage clients and policies with{' '}
              <span className="ab-hero__title-accent">clarity and confidence.</span>
            </h1>
            <p className="ab-hero__subtitle">{HERO.subheadline}</p>
            <div className="ab-hero__ctas">
              <Button to={HERO.primaryCta.to} size="lg">
                {HERO.primaryCta.label}
              </Button>
              <Button to={HERO.secondaryCta.to} variant="secondary" size="lg">
                {HERO.secondaryCta.label}
              </Button>
            </div>
          </div>

          <div className="ab-hero__demo" aria-hidden="true">
            <DemoChrome />
            <p className="ab-hero__demo-hint">Click Dashboard, Clients, or Policies to explore.</p>
          </div>
        </div>
      </Container>
    </section>
  );
}
