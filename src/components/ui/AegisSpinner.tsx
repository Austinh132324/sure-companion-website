/**
 * AegisSpinner — organic fluid loading spinner that resolves into a shield +
 * checkmark (success) or red shield + X (error).
 *
 * Ported from aegis-spinner.jsx. Requires React 18+.
 */

import { useEffect, useRef, useState } from 'react';

// ─── easing ───────────────────────────────────────────────────────────────────

const ease = {
  inOut: (t: number) => (t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2),
  out:   (t: number) => 1 - Math.pow(1 - t, 3),
  in:    (t: number) => t * t * t,
};
const clamp01 = (x: number) => Math.max(0, Math.min(1, x));
const lerp    = (a: number, b: number, t: number) => a + (b - a) * t;

// ─── shield LUT ───────────────────────────────────────────────────────────────

function buildShieldLUT(n: number): [number, number][] {
  const ctrl: [number, number][] = [];
  ctrl.push([100, 34]);
  ctrl.push([150, 50]);
  ctrl.push([150, 88]);
  for (let i = 1; i < 8; i++) {
    const u = i / 8;
    const p0: [number, number] = [150, 88], p1: [number, number] = [142, 136], p2: [number, number] = [100, 166];
    ctrl.push([
      (1 - u) * (1 - u) * p0[0] + 2 * (1 - u) * u * p1[0] + u * u * p2[0],
      (1 - u) * (1 - u) * p0[1] + 2 * (1 - u) * u * p1[1] + u * u * p2[1],
    ]);
  }
  ctrl.push([100, 166]);
  for (let i = 1; i < 8; i++) {
    const u = i / 8;
    const p0: [number, number] = [100, 166], p1: [number, number] = [58, 136], p2: [number, number] = [50, 88];
    ctrl.push([
      (1 - u) * (1 - u) * p0[0] + 2 * (1 - u) * u * p1[0] + u * u * p2[0],
      (1 - u) * (1 - u) * p0[1] + 2 * (1 - u) * u * p1[1] + u * u * p2[1],
    ]);
  }
  ctrl.push([50, 88]);
  ctrl.push([50, 50]);
  ctrl.push([100, 34]);

  const lens = [0];
  for (let i = 1; i < ctrl.length; i++) {
    const dx = ctrl[i][0] - ctrl[i - 1][0];
    const dy = ctrl[i][1] - ctrl[i - 1][1];
    lens.push(lens[i - 1] + Math.hypot(dx, dy));
  }
  const total = lens[lens.length - 1];
  const lut: [number, number][] = [];
  for (let i = 0; i < n; i++) {
    const target = (((i / n) + 0.25) % 1) * total;
    let j = 1;
    while (j < lens.length && lens[j] < target) j++;
    if (j >= lens.length) j = lens.length - 1;
    const u = (target - lens[j - 1]) / Math.max(1e-6, lens[j] - lens[j - 1]);
    lut.push([
      lerp(ctrl[j - 1][0], ctrl[j][0], u) - 100,
      lerp(ctrl[j - 1][1], ctrl[j][1], u) - 100,
    ]);
  }
  return lut;
}

function blobToShieldPath(
  cx: number, cy: number, r: number, phase: number, points: number,
  amp: number, shieldLUT: [number, number][], shieldMix: number, rot = 0,
): string {
  const pts: [number, number][] = [];
  for (let i = 0; i < points; i++) {
    const t = (i / points) * Math.PI * 2;
    const circleX = Math.cos(t) * r;
    const circleY = Math.sin(t) * r;
    const sOff = shieldLUT[i];
    const baseX = lerp(circleX, sOff[0], shieldMix);
    const baseY = lerp(circleY, sOff[1], shieldMix);
    const n =
      Math.sin(t * 3 + phase * 2) * amp +
      Math.sin(t * 2 - phase * 1) * amp * 0.6 +
      Math.cos(t * 5 + phase * 1) * amp * 0.35;
    const nx = Math.cos(t) * n * r;
    const ny = Math.sin(t) * n * r;
    const x0 = baseX + nx;
    const y0 = baseY + ny;
    pts.push([
      x0 * Math.cos(rot) - y0 * Math.sin(rot) + cx,
      x0 * Math.sin(rot) + y0 * Math.cos(rot) + cy,
    ]);
  }
  let d = '';
  const count = pts.length;
  for (let i = 0; i < count; i++) {
    const p0 = pts[(i - 1 + count) % count];
    const p1 = pts[i];
    const p2 = pts[(i + 1) % count];
    const p3 = pts[(i + 2) % count];
    if (i === 0) d += `M ${p1[0].toFixed(2)} ${p1[1].toFixed(2)} `;
    const tension = lerp(6, 9, shieldMix);
    const c1x = p1[0] + (p2[0] - p0[0]) / tension;
    const c1y = p1[1] + (p2[1] - p0[1]) / tension;
    const c2x = p2[0] - (p3[0] - p1[0]) / tension;
    const c2y = p2[1] - (p3[1] - p1[1]) / tension;
    d += `C ${c1x.toFixed(2)} ${c1y.toFixed(2)}, ${c2x.toFixed(2)} ${c2y.toFixed(2)}, ${p2[0].toFixed(2)} ${p2[1].toFixed(2)} `;
  }
  return d + 'Z';
}

const SHIELD_LUT_32 = buildShieldLUT(32);
const SHIELD_LUT_16 = buildShieldLUT(16);

const T = {
  fluidFree:  0.420,
  fluidOne:   0.540,
  toShield:   0.720,
  shieldHold: 0.810,
  checkDraw:  0.870,
  holdEnd:    1.000,
};

const CHECK_STROKE = 'M 52 102 L 92 142 L 158 66';
const CHECK_LEN    = 170.7;
const X_STROKE_A   = 'M 60 60 L 140 140';
const X_STROKE_B   = 'M 140 60 L 60 140';
const X_LEN        = Math.hypot(80, 80);

let _uid = 0;
function useUID() {
  const ref = useRef<string | null>(null);
  if (ref.current === null) { _uid += 1; ref.current = `aegis-${_uid}`; }
  return ref.current;
}

// ─── types ────────────────────────────────────────────────────────────────────

export type SpinnerStatus = 'loading' | 'success' | 'error' | 'loop';

interface Palette {
  navyDark: string;
  navyMid:  string;
  blue:     string;
  blueLt:   string;
}

interface AegisSpinnerProps {
  size?:       number;
  speed?:      number;
  palette?:    Palette;
  status?:     SpinnerStatus;
  onComplete?: (mode: 'success' | 'error') => void;
}

// ─── component ────────────────────────────────────────────────────────────────

export function AegisSpinner({
  size       = 280,
  speed      = 1,
  palette,
  status     = 'loading',
  onComplete,
}: AegisSpinnerProps) {
  const uid        = useUID();
  const [tick, setTick] = useState(0);
  const startRef        = useRef(performance.now());
  const resolveAtRef    = useRef<number | null>(null);
  const resolveFromRef  = useRef(0);
  const resolveModeRef  = useRef<'success' | 'error' | null>(null);
  const completedRef    = useRef(false);

  useEffect(() => {
    let raf: number;
    const loop = () => { setTick(performance.now()); raf = requestAnimationFrame(loop); };
    raf = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(raf);
  }, []);

  const organicDur = (8400 * T.fluidFree) / speed;
  const fullDur    = 8400 / speed;

  useEffect(() => {
    if ((status === 'success' || status === 'error') && resolveAtRef.current === null) {
      const elapsed = performance.now() - startRef.current;
      resolveFromRef.current = ((elapsed % organicDur) / organicDur) * T.fluidFree;
      resolveAtRef.current   = performance.now();
      resolveModeRef.current = status;
      completedRef.current   = false;
    }
    if (status === 'loading' || status === 'loop') {
      resolveAtRef.current   = null;
      resolveFromRef.current = 0;
      resolveModeRef.current = null;
      completedRef.current   = false;
    }
  }, [status, organicDur]);

  const FINALE_MS   = 1500;
  const isResolving = resolveAtRef.current !== null;
  const resolveMode = resolveModeRef.current;
  const isError     = resolveMode === 'error';

  let p: number;
  if (status === 'loop') {
    p = ((tick - startRef.current) % fullDur) / fullDur;
  } else if (isResolving) {
    const sinceResolve = tick - resolveAtRef.current!;
    const startP       = resolveFromRef.current;
    const u            = clamp01(sinceResolve / FINALE_MS);
    p = startP + (1 - startP) * u;
    if (p >= 1 && !completedRef.current && onComplete) {
      completedRef.current = true;
      setTimeout(() => onComplete(resolveMode!), 50);
    }
  } else {
    p = ((tick - startRef.current) % organicDur) / organicDur * T.fluidFree;
  }

  const defaultPal: Palette = { navyDark: '#0a1e3f', navyMid: '#15397a', blue: '#1e56c8', blueLt: '#5c8ef0' };
  const errorPal:   Palette = { navyDark: '#3a0a14', navyMid: '#7a1522', blue: '#c81e38', blueLt: '#f05c7a' };
  const basePal = palette ?? defaultPal;

  const mixHex = (a: string, b: string, t: number) => {
    const pa = parseInt(a.slice(1), 16);
    const pb = parseInt(b.slice(1), 16);
    const r  = Math.round(((pa >> 16) & 255) * (1 - t) + ((pb >> 16) & 255) * t);
    const g  = Math.round(((pa >> 8) & 255) * (1 - t) + ((pb >> 8) & 255) * t);
    const bl = Math.round((pa & 255) * (1 - t) + (pb & 255) * t);
    return '#' + ((r << 16) | (g << 8) | bl).toString(16).padStart(6, '0');
  };

  const freeT  = clamp01(p / T.fluidFree);
  const loopA  = freeT * Math.PI * 2;
  const mergeT = clamp01((p - T.fluidFree) / (T.fluidOne - T.fluidFree));
  const mergeE = ease.inOut(mergeT);
  const shapeT = clamp01((p - T.fluidOne) / (T.toShield - T.fluidOne));
  const shapeE = ease.inOut(shapeT);
  const errorMix = isError ? shapeE : 0;
  const pal: Palette = errorMix > 0
    ? {
        navyDark: mixHex(basePal.navyDark, errorPal.navyDark, errorMix),
        navyMid:  mixHex(basePal.navyMid,  errorPal.navyMid,  errorMix),
        blue:     mixHex(basePal.blue,     errorPal.blue,     errorMix),
        blueLt:   mixHex(basePal.blueLt,   errorPal.blueLt,   errorMix),
      }
    : basePal;

  const monoT      = clamp01((p - T.toShield)   / (T.shieldHold - T.toShield));
  const checkT     = clamp01((p - T.shieldHold)  / (T.checkDraw  - T.shieldHold));
  const checkE     = ease.out(checkT);
  const shieldExit = checkT;
  const finalHold  = clamp01((p - T.checkDraw)   / (T.holdEnd    - T.checkDraw));

  const sepBase = 20 * (1 - mergeE);
  const sepOsc  = 10 * Math.sin(loopA * 2) * (1 - mergeE);
  const sep     = sepBase * (1 - mergeE * 0.1) + sepOsc;

  const driftR = 14 * (1 - mergeE);
  const gcx = 100 + (Math.cos(loopA) * driftR + Math.sin(loopA * 2) * 4) * (1 - mergeE);
  const gcy = 100 + Math.sin(loopA) * driftR * 0.8 * (1 - mergeE);

  const orbitA = loopA * 2;
  const ax = gcx + Math.cos(orbitA) * sep;
  const ay = gcy + Math.sin(orbitA) * sep * 0.9;
  const bx = gcx - Math.cos(orbitA) * sep;
  const by = gcy - Math.sin(orbitA) * sep * 0.9;

  const rSmall = lerp(26, 44, mergeE);
  const rA = rSmall + Math.sin(loopA * 3) * 1.8 * (1 - mergeE);
  const rB = rSmall + Math.cos(loopA * 3) * 1.6 * (1 - mergeE);

  const ampFree      = lerp(0.12, 0.04, mergeE);
  const ampShapeFade = lerp(ampFree, 0.005, shapeE);
  const shieldMix    = shapeE;

  const drawTwoBodies = p < T.fluidOne - 0.005;
  const surfA = loopA * 4;
  const mainPath = blobToShieldPath(
    drawTwoBodies ? ax : 100,
    drawTwoBodies ? ay : 100,
    drawTwoBodies ? rA : 44,
    surfA, 32, ampShapeFade, SHIELD_LUT_32, shieldMix,
  );
  const sidePath = drawTwoBodies
    ? blobToShieldPath(bx, by, rB, surfA + 2.1, 32, ampFree, SHIELD_LUT_32, 0)
    : null;

  const dropletVis = Math.sin(freeT * Math.PI) * (1 - mergeE);
  const dropAng    = loopA * 3;
  const dropR      = 34 * dropletVis + 4;
  const drop1 = blobToShieldPath(
    gcx + Math.cos(dropAng) * dropR, gcy + Math.sin(dropAng) * dropR * 0.85,
    5.5 * dropletVis + 2, surfA * 1.25, 16, 0.10, SHIELD_LUT_16, 0, dropAng,
  );
  const drop2 = blobToShieldPath(
    gcx - Math.cos(dropAng * 0.8) * dropR * 0.85, gcy - Math.sin(dropAng * 0.8) * dropR * 0.7,
    4 * dropletVis + 2, surfA * 1.15, 16, 0.09, SHIELD_LUT_16, 0, -dropAng,
  );

  const hiX = drawTwoBodies ? (ax + bx) / 2 : 100;
  const hiY = drawTwoBodies ? (ay + by) / 2 : 100;
  const hiR = (rA + rB) / 2;

  const gooStd      = lerp(4.2, 0.6, shapeE);
  const gooMat      = lerp(26, 8, shapeE);
  const gooOff      = lerp(-13, -2, shapeE);
  const fillOpacity = lerp(1, 0.0, clamp01((shapeE - 0.75) / 0.25));
  const strokeOpacity = lerp(0, 1, clamp01((shapeE - 0.5) / 0.5));
  const groupOpacity  = 1 - shieldExit;

  const checkScale = lerp(0.8, 1.0, ease.out(checkT)) * lerp(1.0, 1.04, Math.sin(finalHold * Math.PI));
  const showFluid  = p < T.checkDraw;
  const showCheck  = p >= T.shieldHold - 0.005;

  const idGoo       = `${uid}-goo`;
  const idBlobGrad  = `${uid}-blob`;
  const idShieldGrad = `${uid}-shield`;
  const idCheckGrad  = `${uid}-check`;
  const idHiGrad     = `${uid}-hi`;

  return (
    <svg
      width={size} height={size}
      viewBox="0 0 200 200"
      role="img"
      aria-label={isError ? 'Error' : status === 'success' ? 'Success' : 'Loading'}
      style={{ display: 'block', overflow: 'visible' }}
    >
      <defs>
        <filter id={idGoo}>
          <feGaussianBlur in="SourceGraphic" stdDeviation={gooStd} result="blur" />
          <feColorMatrix in="blur" mode="matrix"
            values={`1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 ${gooMat} ${gooOff}`}
            result="goo"
          />
          <feComposite in="goo" in2="SourceGraphic" operator="atop" />
        </filter>
        <radialGradient id={idBlobGrad} cx="35%" cy="30%" r="80%">
          <stop offset="0%"   stopColor={pal.blueLt} />
          <stop offset="45%"  stopColor={pal.blue}   />
          <stop offset="100%" stopColor={pal.navyDark} />
        </radialGradient>
        <linearGradient id={idShieldGrad} x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%"   stopColor={pal.navyDark} />
          <stop offset="55%"  stopColor={pal.navyMid}  />
          <stop offset="100%" stopColor={pal.blue}     />
        </linearGradient>
        <linearGradient id={idCheckGrad} x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%"   stopColor={pal.navyDark} />
          <stop offset="100%" stopColor={pal.navyMid}  />
        </linearGradient>
        <radialGradient id={idHiGrad} cx="30%" cy="25%" r="40%">
          <stop offset="0%"   stopColor="white" stopOpacity="0.55" />
          <stop offset="100%" stopColor="white" stopOpacity="0"    />
        </radialGradient>
      </defs>

      {showFluid && (
        <g style={{ opacity: groupOpacity }}>
          <g filter={`url(#${idGoo})`}>
            <path
              d={mainPath}
              fill={`url(#${idBlobGrad})`}
              fillOpacity={fillOpacity}
              stroke={`url(#${idShieldGrad})`}
              strokeOpacity={strokeOpacity}
              strokeWidth={lerp(0, 8, strokeOpacity)}
              strokeLinejoin="round"
              strokeLinecap="round"
            />
            {sidePath && <path d={sidePath} fill={`url(#${idBlobGrad})`} />}
            {dropletVis > 0.08 && (
              <>
                <path d={drop1} fill={`url(#${idBlobGrad})`} />
                <path d={drop2} fill={`url(#${idBlobGrad})`} />
              </>
            )}
          </g>
          <ellipse
            cx={hiX - hiR * 0.2} cy={hiY - hiR * 0.3}
            rx={hiR * 0.55} ry={hiR * 0.32}
            fill={`url(#${idHiGrad})`}
            style={{ mixBlendMode: 'screen', opacity: 1 - shapeE }}
          />
          <g style={{ opacity: ease.out(monoT), transformOrigin: '100px 100px' }}>
            <text
              x="100" y="108" textAnchor="middle"
              fontFamily="'Arial Black', 'Helvetica Neue', system-ui, sans-serif"
              fontWeight="900" fontSize="46" letterSpacing="-2"
              fill={`url(#${idShieldGrad})`}
            >
              SC
            </text>
            <path d="M 84 118 L 116 118 L 119 126 L 81 126 Z" fill={`url(#${idShieldGrad})`} />
          </g>
        </g>
      )}

      {showCheck && (
        <g style={{ transformOrigin: '100px 100px', transform: `scale(${checkScale})`, opacity: ease.out(checkT) }}>
          <circle cx="100" cy="100" r={lerp(0, 78, ease.out(checkT))}
            fill="none" stroke={pal.navyDark}
            strokeOpacity={0.08 * ease.out(checkT)} strokeWidth="1.5"
          />
          {isError ? (
            <>
              <path d={X_STROKE_A} fill="none" stroke={`url(#${idCheckGrad})`}
                strokeWidth="14" strokeLinecap="round"
                strokeDasharray={X_LEN}
                strokeDashoffset={X_LEN * (1 - clamp01(checkE * 2))}
              />
              <path d={X_STROKE_B} fill="none" stroke={`url(#${idCheckGrad})`}
                strokeWidth="14" strokeLinecap="round"
                strokeDasharray={X_LEN}
                strokeDashoffset={X_LEN * (1 - clamp01(checkE * 2 - 1))}
              />
            </>
          ) : (
            <path d={CHECK_STROKE} fill="none" stroke={`url(#${idCheckGrad})`}
              strokeWidth="14" strokeLinecap="round" strokeLinejoin="round"
              strokeDasharray={CHECK_LEN}
              strokeDashoffset={CHECK_LEN * (1 - checkE)}
            />
          )}
        </g>
      )}
    </svg>
  );
}
