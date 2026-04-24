import { useEffect } from 'react';
import { Container } from '../../components/ui/Container';
import { SectionHeading } from '../../components/ui/SectionHeading';
import { ContactForm } from '../../components/sections/ContactForm';
import './Contact.css';

export default function Contact() {
  useEffect(() => {
    document.title = 'Contact | Sure Companion';
  }, []);

  return (
    <>
      <section className="ab-page-header">
        <Container>
          <SectionHeading
            eyebrow="Contact"
            title="Let’s talk about what your agency needs."
            description="Tell us a little about your team and what you’re looking for. We’ll be in touch with next steps."
          />
        </Container>
      </section>

      <section className="ab-contact">
        <Container>
          <div className="ab-contact__grid">
            <aside className="ab-contact__sidebar">
              <h2>How we can help</h2>
              <p>
                Whether you’re exploring a switch or want to see the platform in context, we’re happy to walk you
                through what Sure Companion can do today and where it’s headed next.
              </p>
              <ul>
                <li>Product demos for agency leaders and producers.</li>
                <li>Fit conversations for independent agencies.</li>
                <li>General questions from the industry.</li>
              </ul>
              <div className="ab-contact__contact-line">
                <span className="eyebrow">Prefer email?</span>
                <a href="mailto:hello@surecompanion.com">hello@surecompanion.com</a>
              </div>
            </aside>
            <div className="ab-contact__form">
              <ContactForm />
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
