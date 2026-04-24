import { useEffect, useState, useRef } from 'react';
import { Container } from '../../components/ui/Container';
import { LogoLockup } from '../../components/ui/LogoLockup';
import { Button } from '../../components/ui/Button';
import { AegisSpinner } from '../../components/ui/AegisSpinner';
import type { SpinnerStatus } from '../../components/ui/AegisSpinner';
import './Login.css';
import './Login.mobile.css';

function StatusIndicator() {
  return (
    <div className="ab-status">
      <div className="ab-status__pill">
        <span className="ab-status__led" aria-hidden="true" />
        <span className="ab-status__label">Checking Portal Status</span>
        <span className="ab-status__dots" aria-hidden="true">
          <span className="ab-status__dot" style={{ '--i': 0 } as React.CSSProperties} />
          <span className="ab-status__dot" style={{ '--i': 1 } as React.CSSProperties} />
          <span className="ab-status__dot" style={{ '--i': 2 } as React.CSSProperties} />
        </span>
      </div>
      <div className="ab-status__bar" aria-hidden="true" />
    </div>
  );
}

export default function Login() {
  const [spinnerStatus, setSpinnerStatus] = useState<SpinnerStatus>('loading');
  const [done, setDone] = useState(false);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    document.title = 'Login | Sure Companion';
    timerRef.current = setTimeout(() => setSpinnerStatus('success'), 5000);
    return () => { if (timerRef.current) clearTimeout(timerRef.current); };
  }, []);

  return (
    <section className="ab-login">
      <Container>
        <div className={`ab-login__card${!done ? ' ab-login__card--checking' : ''}`}>

          <div className={`ab-login__logo${done ? ' ab-login__logo--visible' : ''}`}>
            <LogoLockup variant="shield" size="lg" asLink={false} />
          </div>

          {!done ? (
            <div className="ab-login__check-state">
              <AegisSpinner
                size={120}
                status={spinnerStatus}
                onComplete={() => setDone(true)}
              />
              <StatusIndicator />
            </div>
          ) : (
            <div className="ab-login__content">
              <h1 className="ab-login__title">Portal login, coming soon.</h1>
              <p className="ab-login__copy">
                The Sure Companion portal is on its way. In the meantime, if you'd like early access or want to learn more
                about the platform, we'd love to hear from you.
              </p>
              <div className="ab-login__actions">
                <Button to="/contact" size="lg">
                  Request access
                </Button>
                <Button to="/" variant="secondary" size="lg">
                  Back to home
                </Button>
              </div>
              <p className="ab-login__fineprint">
                This placeholder will be replaced with the live portal login when the Sure Companion app is ready.
              </p>
            </div>
          )}

        </div>
      </Container>
    </section>
  );
}
