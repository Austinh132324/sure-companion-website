import { useEffect, useRef, useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { Button } from '../ui/Button';
import { Container } from '../ui/Container';
import { LogoLockup } from '../ui/LogoLockup';
import { MobileMenu } from './MobileMenu';
import { PRIMARY_NAV } from '../../data/navigation';
import './Header.css';
import './Header.mobile.css';

export function Header() {
  const [open, setOpen]       = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [indicator, setIndicator] = useState({ left: 0, width: 0, visible: false });

  const trackRef   = useRef<HTMLDivElement>(null);
  const navListRef = useRef<HTMLUListElement>(null);
  const location   = useLocation();

  /* Close mobile menu on navigation */
  useEffect(() => { setOpen(false); }, [location.pathname]);

  /* Body scroll lock */
  useEffect(() => {
    document.body.classList.toggle('no-scroll', open);
    return () => document.body.classList.remove('no-scroll');
  }, [open]);

  /* Scroll-aware header shadow */
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16);
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  /* Sliding pill indicator — measure active link within the track */
  useEffect(() => {
    const track = trackRef.current;
    const list  = navListRef.current;
    if (!track || !list) return;

    const t = setTimeout(() => {
      const active = list.querySelector<HTMLElement>('.ab-header__nav-link--active');
      if (!active) { setIndicator(i => ({ ...i, visible: false })); return; }
      const trackBox = track.getBoundingClientRect();
      const linkBox  = active.getBoundingClientRect();
      setIndicator({ left: linkBox.left - trackBox.left, width: linkBox.width, visible: true });
    }, 0);

    return () => clearTimeout(t);
  }, [location.pathname]);

  return (
    <header className={`ab-header${scrolled ? ' ab-header--scrolled' : ''}`}>
      <Container>
        <div className="ab-header__inner">

          <div className="ab-header__brand">
            <LogoLockup size="md" />
          </div>

          <nav className="ab-header__nav" aria-label="Primary">
            <div className="ab-header__nav-track" ref={trackRef}>
              <span
                className="ab-header__nav-indicator"
                aria-hidden="true"
                style={{
                  left:    indicator.left,
                  width:   indicator.width,
                  opacity: indicator.visible ? 1 : 0,
                }}
              />
              <ul className="ab-header__nav-list" ref={navListRef}>
                {PRIMARY_NAV.map((link) => (
                  <li key={link.to}>
                    <NavLink
                      to={link.to}
                      end={link.to === '/'}
                      className={({ isActive }) =>
                        `ab-header__nav-link${isActive ? ' ab-header__nav-link--active' : ''}`
                      }
                    >
                      {link.label}
                    </NavLink>
                  </li>
                ))}
              </ul>
            </div>
          </nav>

          <div className="ab-header__actions">
            <Button to="/login" variant="primary" size="md">
              Login
            </Button>
          </div>

          <button
            type="button"
            className="ab-header__menu-btn"
            aria-label={open ? 'Close menu' : 'Open menu'}
            aria-expanded={open}
            aria-controls="ab-mobile-menu"
            onClick={() => setOpen((v) => !v)}
          >
            <span className={`ab-header__bars${open ? ' ab-header__bars--open' : ''}`} aria-hidden>
              <span /><span /><span />
            </span>
          </button>

        </div>
      </Container>

      <MobileMenu open={open} onClose={() => setOpen(false)} />
    </header>
  );
}
