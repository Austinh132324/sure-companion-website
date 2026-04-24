import { Link } from 'react-router-dom';
import shieldUrl from '../../assets/logo/sure-companion-shield.png';
import './LogoLockup.css';

interface LogoLockupProps {
  variant?: 'full' | 'shield';
  size?: 'sm' | 'md' | 'lg';
  asLink?: boolean;
  to?: string;
}

export function LogoLockup({
  variant = 'full',
  size = 'md',
  asLink = true,
  to = '/',
}: LogoLockupProps) {
  const content =
    variant === 'shield' ? (
      <img
        src={shieldUrl}
        alt="Sure Companion"
        className={`ab-logo__shield-only ab-logo__shield-only--${size}`}
      />
    ) : (
      <div className={`ab-logo ab-logo--${size}`}>
        <img src={shieldUrl} alt="" className="ab-logo__icon" aria-hidden="true" />
        <span className="ab-logo__wordmark" aria-label="Sure Companion">
          <span className="ab-logo__word">Sure</span>
          <span className="ab-logo__word ab-logo__word--accent">Companion</span>
        </span>
      </div>
    );

  if (!asLink) return content;

  return (
    <Link to={to} className="ab-logo-link" aria-label="Sure Companion — home">
      {content}
    </Link>
  );
}
