import { useEffect, useRef, useState, type FormEvent } from 'react';
import { Button } from '../ui/Button';
import { AegisSpinner, type SpinnerStatus } from '../ui/AegisSpinner';
import './ContactForm.css';
import './ContactForm.mobile.css';

interface FormState {
  name: string;
  email: string;
  company: string;
  message: string;
}

type Stage = 'idle' | 'sending' | 'done';

const EMPTY: FormState = { name: '', email: '', company: '', message: '' };

const GREEN_PALETTE = {
  navyDark: '#064E3B',
  navyMid:  '#047857',
  blue:     '#10B981',
  blueLt:   '#6EE7B7',
};

export function ContactForm() {
  const [values, setValues] = useState<FormState>(EMPTY);
  const [stage, setStage] = useState<Stage>('idle');
  const [spinnerStatus, setSpinnerStatus] = useState<SpinnerStatus>('loading');
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    return () => { if (timerRef.current) clearTimeout(timerRef.current); };
  }, []);

  const update = (field: keyof FormState) => (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setValues((prev) => ({ ...prev, [field]: event.target.value }));
  };

  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setStage('sending');
    setSpinnerStatus('loading');
    timerRef.current = setTimeout(() => setSpinnerStatus('success'), 5000);
  };

  const reset = () => {
    setValues(EMPTY);
    setSpinnerStatus('loading');
    setStage('idle');
  };

  if (stage === 'sending') {
    return (
      <div
        className="ab-contact-form ab-contact-form--sending"
        role="status"
        aria-live="polite"
        aria-label="Sending message"
      >
        <AegisSpinner
          size={160}
          status={spinnerStatus}
          palette={GREEN_PALETTE}
          onComplete={() => setStage('done')}
        />
        <p className="ab-contact-form__sending-label">
          {spinnerStatus === 'success' ? 'Message sent.' : 'Sending your message…'}
        </p>
      </div>
    );
  }

  if (stage === 'done') {
    return (
      <div className="ab-contact-form ab-contact-form--success" role="status" aria-live="polite">
        <h3>Thanks — we’ll be in touch.</h3>
        <p>
          We received your note. A member of the Sure Companion team will reach out shortly to follow up.
        </p>
        <Button variant="secondary" onClick={reset}>
          Send another message
        </Button>
      </div>
    );
  }

  return (
    <form className="ab-contact-form" onSubmit={onSubmit} noValidate>
      <div className="ab-contact-form__row">
        <div className="ab-contact-form__field">
          <label htmlFor="cf-name">Full name</label>
          <input
            id="cf-name"
            name="name"
            type="text"
            autoComplete="name"
            value={values.name}
            onChange={update('name')}
            required
          />
        </div>
        <div className="ab-contact-form__field">
          <label htmlFor="cf-email">Work email</label>
          <input
            id="cf-email"
            name="email"
            type="email"
            autoComplete="email"
            value={values.email}
            onChange={update('email')}
            required
          />
        </div>
      </div>

      <div className="ab-contact-form__field">
        <label htmlFor="cf-company">Agency / company</label>
        <input
          id="cf-company"
          name="company"
          type="text"
          autoComplete="organization"
          value={values.company}
          onChange={update('company')}
        />
      </div>

      <div className="ab-contact-form__field">
        <label htmlFor="cf-message">How can we help?</label>
        <textarea
          id="cf-message"
          name="message"
          rows={5}
          value={values.message}
          onChange={update('message')}
          required
        />
      </div>

      <div className="ab-contact-form__submit">
        <Button type="submit" size="lg">
          Send message
        </Button>
        <p className="ab-contact-form__fineprint">
          This is a mock form. Submissions are not sent anywhere yet.
        </p>
      </div>
    </form>
  );
}
