import './AegisMascot.css';

interface AegisMascotProps {
  size?: number;
}

export function AegisMascot({ size = 180 }: AegisMascotProps) {
  const h = Math.round(size * (240 / 200));

  return (
    <div className="aegis-mascot-wrap">
      <svg
        viewBox="0 0 200 240"
        width={size}
        height={h}
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="aegis-mascot-svg"
        aria-label="Aegis — Sure Companion AI assistant"
        role="img"
      >
        <defs>
          {/* Shield body — deep premium navy */}
          <linearGradient id="ag-body" x1="100" y1="16" x2="100" y2="220" gradientUnits="userSpaceOnUse">
            <stop offset="0%"   stopColor="#1e3566" />
            <stop offset="45%"  stopColor="#0d1f48" />
            <stop offset="100%" stopColor="#050b1e" />
          </linearGradient>

          {/* Face panel */}
          <linearGradient id="ag-face" x1="100" y1="56" x2="100" y2="170" gradientUnits="userSpaceOnUse">
            <stop offset="0%"   stopColor="#142040" />
            <stop offset="100%" stopColor="#080e26" />
          </linearGradient>

          {/* Left eye glow */}
          <radialGradient id="ag-eye-l" cx="74" cy="105" r="18" gradientUnits="userSpaceOnUse">
            <stop offset="0%"   stopColor="#dbeafe" />
            <stop offset="28%"  stopColor="#60a5fa" />
            <stop offset="65%"  stopColor="#2563eb" />
            <stop offset="100%" stopColor="#1e40af" stopOpacity="0" />
          </radialGradient>

          {/* Right eye glow */}
          <radialGradient id="ag-eye-r" cx="126" cy="105" r="18" gradientUnits="userSpaceOnUse">
            <stop offset="0%"   stopColor="#dbeafe" />
            <stop offset="28%"  stopColor="#60a5fa" />
            <stop offset="65%"  stopColor="#2563eb" />
            <stop offset="100%" stopColor="#1e40af" stopOpacity="0" />
          </radialGradient>

          {/* Ambient aura */}
          <radialGradient id="ag-aura" cx="100" cy="122" r="95" gradientUnits="userSpaceOnUse">
            <stop offset="0%"   stopColor="#2563eb" stopOpacity="0.22" />
            <stop offset="100%" stopColor="#2563eb" stopOpacity="0" />
          </radialGradient>

          {/* Top rim light — bright at peak, fades to sides */}
          <linearGradient id="ag-rim" x1="26" y1="0" x2="174" y2="0" gradientUnits="userSpaceOnUse">
            <stop offset="0%"   stopColor="rgba(147,197,253,0)" />
            <stop offset="38%"  stopColor="rgba(147,197,253,0.7)" />
            <stop offset="62%"  stopColor="rgba(147,197,253,0.7)" />
            <stop offset="100%" stopColor="rgba(147,197,253,0)" />
          </linearGradient>

          {/* Shield clip */}
          <clipPath id="ag-shield-clip">
            <path d="M100 16 L174 42 V108 C174 156 100 220 100 220 C100 220 26 156 26 108 V42 Z" />
          </clipPath>

          {/* Dot texture for face panel */}
          <pattern id="ag-dots" x="0" y="0" width="10" height="10" patternUnits="userSpaceOnUse">
            <circle cx="5" cy="5" r="0.65" fill="rgba(96,165,250,0.18)" />
          </pattern>
        </defs>

        {/* ── Ambient aura ───────────────────────────── */}
        <ellipse cx="100" cy="124" rx="80" ry="74" fill="url(#ag-aura)" className="aegis-aura-1" />
        <ellipse cx="100" cy="124" rx="93" ry="87" fill="url(#ag-aura)" className="aegis-aura-2" />

        {/* ── Shield body ────────────────────────────── */}
        <path
          d="M100 16 L174 42 V108 C174 156 100 220 100 220 C100 220 26 156 26 108 V42 Z"
          fill="url(#ag-body)"
        />

        {/* Shield outer border */}
        <path
          d="M100 16 L174 42 V108 C174 156 100 220 100 220 C100 220 26 156 26 108 V42 Z"
          fill="none"
          stroke="rgba(96,165,250,0.5)"
          strokeWidth="1.5"
        />

        {/* Inner bevel */}
        <path
          d="M100 23 L167 48 V108 C167 152 100 212 100 212 C100 212 33 152 33 108 V48 Z"
          fill="none"
          stroke="rgba(96,165,250,0.1)"
          strokeWidth="0.75"
        />

        {/* Top rim highlight */}
        <path
          d="M26 42 L100 16 L174 42"
          fill="none"
          stroke="url(#ag-rim)"
          strokeWidth="1.5"
        />

        {/* Subtle grid lines */}
        <g clipPath="url(#ag-shield-clip)" stroke="rgba(96,165,250,0.05)" strokeWidth="0.5">
          <line x1="26"  y1="82"  x2="174" y2="82"  />
          <line x1="26"  y1="162" x2="174" y2="162" />
          <line x1="100" y1="16"  x2="100" y2="220" />
          <line x1="63"  y1="16"  x2="63"  y2="220" />
          <line x1="137" y1="16"  x2="137" y2="220" />
        </g>

        {/* ── Face panel ─────────────────────────────── */}
        <path
          d="M100 56 L155 72 V108 C155 138 100 169 100 169 C100 169 45 138 45 108 V72 Z"
          fill="url(#ag-face)"
          stroke="rgba(96,165,250,0.15)"
          strokeWidth="0.75"
        />

        {/* Dot texture overlay */}
        <path
          d="M100 56 L155 72 V108 C155 138 100 169 100 169 C100 169 45 138 45 108 V72 Z"
          fill="url(#ag-dots)"
        />

        {/* Face corner accent dots */}
        <circle cx="45"  cy="72" r="2.5" fill="#2563eb" opacity="0.75" />
        <circle cx="155" cy="72" r="2.5" fill="#2563eb" opacity="0.75" />

        {/* ── Scan line ──────────────────────────────── */}
        <rect
          x="26" y="56" width="148" height="4"
          fill="rgba(96,165,250,0.3)"
          clipPath="url(#ag-shield-clip)"
          className="aegis-scan"
        />

        {/* ── Left eye ───────────────────────────────── */}
        <g className="aegis-eye-l" style={{ transformOrigin: '74px 105px' }}>
          <circle cx="74" cy="105" r="17" fill="url(#ag-eye-l)" className="aegis-eye-glow" opacity="0.6" />
          <circle cx="74" cy="105" r="11" fill="#060c22" />
          <circle cx="74" cy="105" r="9"  fill="none" stroke="#2563eb" strokeWidth="1.5" />
          <circle cx="74" cy="105" r="7"  fill="#1840c4" />
          <circle cx="74" cy="105" r="4"  fill="#60a5fa" />
          <circle cx="74" cy="105" r="1.8" fill="#dbeafe" />
          <circle cx="72" cy="103" r="1.1" fill="white" opacity="0.9" />
        </g>

        {/* ── Right eye ──────────────────────────────── */}
        <g className="aegis-eye-r" style={{ transformOrigin: '126px 105px' }}>
          <circle cx="126" cy="105" r="17" fill="url(#ag-eye-r)" className="aegis-eye-glow" opacity="0.6" />
          <circle cx="126" cy="105" r="11" fill="#060c22" />
          <circle cx="126" cy="105" r="9"  fill="none" stroke="#2563eb" strokeWidth="1.5" />
          <circle cx="126" cy="105" r="7"  fill="#1840c4" />
          <circle cx="126" cy="105" r="4"  fill="#60a5fa" />
          <circle cx="126" cy="105" r="1.8" fill="#dbeafe" />
          <circle cx="124" cy="103" r="1.1" fill="white" opacity="0.9" />
        </g>

        {/* ── Brows — angular, determined ─────────────── */}
        <line x1="57" y1="90" x2="86" y2="86" stroke="#60a5fa" strokeWidth="2"   strokeLinecap="round" opacity="0.75" />
        <line x1="114" y1="86" x2="143" y2="90" stroke="#60a5fa" strokeWidth="2" strokeLinecap="round" opacity="0.75" />

        {/* ── Speaker grill ──────────────────────────── */}
        <line x1="83"  y1="135" x2="117" y2="135" stroke="rgba(96,165,250,0.6)"  strokeWidth="1.5" strokeLinecap="round" />
        <line x1="87"  y1="142" x2="113" y2="142" stroke="rgba(96,165,250,0.38)" strokeWidth="1.5" strokeLinecap="round" />
        <line x1="91"  y1="149" x2="109" y2="149" stroke="rgba(96,165,250,0.2)"  strokeWidth="1.5" strokeLinecap="round" />

        {/* ── Side status LEDs ───────────────────────── */}
        <circle cx="36"  cy="88" r="2.5" fill="#3b82f6" className="aegis-eye-glow" />
        <circle cx="36"  cy="98" r="1.5" fill="#60a5fa" opacity="0.4" />
        <circle cx="164" cy="88" r="2.5" fill="#3b82f6" className="aegis-eye-glow" />
        <circle cx="164" cy="98" r="1.5" fill="#60a5fa" opacity="0.4" />

        {/* ── Top emblem (double ring) ────────────────── */}
        <circle cx="100" cy="36" r="11"  fill="rgba(10,20,56,0.85)"   stroke="rgba(96,165,250,0.6)"  strokeWidth="1.25" />
        <circle cx="100" cy="36" r="7.5" fill="rgba(37,99,235,0.3)"   stroke="rgba(96,165,250,0.28)" strokeWidth="0.75" />
        <text x="100" y="39.5" textAnchor="middle" fontSize="7" fontWeight="800"
          fill="rgba(147,197,253,0.95)" letterSpacing="-0.5">SC</text>

        {/* ── Bottom label ───────────────────────────── */}
        <rect x="72" y="192" width="56" height="15" rx="7.5"
          fill="rgba(37,99,235,0.18)"
          stroke="rgba(96,165,250,0.42)"
          strokeWidth="0.75"
        />
        <text x="100" y="203.5" textAnchor="middle" fontSize="7" fontWeight="800"
          fill="rgba(147,197,253,0.9)" letterSpacing="2">AEGIS</text>
      </svg>

      <div className="aegis-name-badge">
        <span className="aegis-name-badge__dot" />
        <span className="aegis-name-badge__text">Aegis</span>
        <span className="aegis-name-badge__sub">AI Assistant</span>
      </div>
    </div>
  );
}
