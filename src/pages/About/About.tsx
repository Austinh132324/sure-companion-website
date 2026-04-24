import { useEffect } from 'react';
import { Container } from '../../components/ui/Container';
import { SectionHeading } from '../../components/ui/SectionHeading';
import { CallToActionBand } from '../../components/sections/CallToActionBand';
import './About.css';

const VALUES = [
  {
    title: 'Clarity over complexity',
    body: 'Insurance already has enough noise. Our job is to make the work easier to see and easier to do.',
  },
  {
    title: 'Responsibility with data',
    body: 'Agency and client data is sensitive. We design the platform like we know it — with restraint and respect.',
  },
  {
    title: 'Built alongside agents',
    body: 'The best tools come from working with the people who will use them. That shapes every feature we ship.',
  },
  {
    title: 'Room to grow',
    body: 'We build for today and plan for tomorrow so agencies can trust the direction of the platform.',
  },
];

export default function About() {
  useEffect(() => {
    document.title = 'About | Sure Companion';
  }, []);

  return (
    <>
      <section className="ab-page-header">
        <Container>
          <SectionHeading
            eyebrow="About"
            title="A platform with a point of view."
            description="Sure Companion exists because the people who run insurance agencies deserve tools that match the care and precision they bring to their clients."
          />
        </Container>
      </section>

      <section className="ab-about">
        <Container>
          <div className="ab-about__grid">
            <article>
              <h2>Our mission</h2>
              <p>
                Help insurance professionals protect the people and businesses they serve — with a platform that
                respects the craft of agency work and the trust that underlies every policy.
              </p>
            </article>
            <article>
              <h2>Why Sure Companion exists</h2>
              <p>
                Agencies juggle disjointed tools, manual reports, and lost context. Sure Companion brings the work
                together so producers can focus on the conversation that matters instead of fighting the stack.
              </p>
            </article>
            <article>
              <h2>Who we serve</h2>
              <p>
                Independent agencies, producing teams, and agency leaders who want a modern, focused home base for
                the relationships they’ve built.
              </p>
            </article>
          </div>
        </Container>
      </section>

      <section className="ab-about-values">
        <Container>
          <SectionHeading
            eyebrow="Brand values"
            title="What we bring to every decision."
            description="These are the principles that shape how we design, build, and support the platform."
          />
          <ul className="ab-about-values__grid">
            {VALUES.map((value) => (
              <li key={value.title} className="ab-about-values__card">
                <h3>{value.title}</h3>
                <p>{value.body}</p>
              </li>
            ))}
          </ul>
        </Container>
      </section>

      <CallToActionBand />
    </>
  );
}
