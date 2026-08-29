import { FabPlacement, DialTick, DialDot } from '../types';

export interface AngleSpan {
  startDeg: number;
  endDeg: number;
  totalSpanDeg: number;
}

export interface DialAngleSpan {
  zeroDeg: number;
  maxDeg: number;
  totalSpanDeg: number;
}

/**
 * Returns angle span in degrees for the multi-tier rotary action wheel.
 */
export function getPlacementAngleSpan(placement: FabPlacement = 'bottom-left'): AngleSpan {
  switch (placement) {
    case 'bottom-left':
      // From Top (90°) clockwise down to Right (0°)
      return { startDeg: 90, endDeg: 0, totalSpanDeg: 90 };
    case 'bottom-right':
      // From Top (90°) counter-clockwise down to Left (180°)
      return { startDeg: 90, endDeg: 180, totalSpanDeg: 90 };
    case 'top-left':
      // From Bottom (270°) counter-clockwise up to Right (360° / 0°)
      return { startDeg: 270, endDeg: 360, totalSpanDeg: 90 };
    case 'top-right':
      // From Bottom (270°) clockwise up to Left (180°)
      return { startDeg: 270, endDeg: 180, totalSpanDeg: 90 };
    case 'bottom-center':
      // Semi-circle from Left (180°) over Top (90°) to Right (0°)
      return { startDeg: 180, endDeg: 0, totalSpanDeg: 180 };
    case 'top-center':
      // Semi-circle from Left (180°) under Bottom (270°) to Right (360°)
      return { startDeg: 180, endDeg: 360, totalSpanDeg: 180 };
    case 'left-center':
      // Semi-circle from Top (90°) over Right (0°) to Bottom (-90° / 270°)
      return { startDeg: 90, endDeg: -90, totalSpanDeg: 180 };
    case 'right-center':
      // Semi-circle from Top (90°) over Left (180°) to Bottom (270°)
      return { startDeg: 90, endDeg: 270, totalSpanDeg: 180 };
    case 'center':
      return { startDeg: 0, endDeg: 360, totalSpanDeg: 360 };
    default:
      return { startDeg: 90, endDeg: 0, totalSpanDeg: 90 };
  }
}

/**
 * Returns the exact 0% and 100% dial angles for the precision rotary arc slider.
 * Progress flows naturally from 0% (zeroDeg) up to 100% (maxDeg).
 */
export function getDialAngleSpan(placement: FabPlacement = 'bottom-left'): DialAngleSpan {
  switch (placement) {
    case 'bottom-left':
      // 0% at Right (0°), 100% at Top (90°)
      return { zeroDeg: 0, maxDeg: 90, totalSpanDeg: 90 };
    case 'bottom-right':
      // 0% at Left (180°), 100% at Top (90°)
      return { zeroDeg: 180, maxDeg: 90, totalSpanDeg: 90 };
    case 'top-left':
      // 0% at Right (360°/0°), 100% at Bottom (270°)
      return { zeroDeg: 360, maxDeg: 270, totalSpanDeg: 90 };
    case 'top-right':
      // 0% at Left (180°), 100% at Bottom (270°)
      return { zeroDeg: 180, maxDeg: 270, totalSpanDeg: 90 };
    case 'bottom-center':
      return { zeroDeg: 0, maxDeg: 180, totalSpanDeg: 180 };
    case 'top-center':
      return { zeroDeg: 360, maxDeg: 180, totalSpanDeg: 180 };
    default:
      return { zeroDeg: 0, maxDeg: 90, totalSpanDeg: 90 };
  }
}

/**
 * Converts polar coordinates (radius, angle in degrees) to cartesian (x, y)
 * with screen coordinates (Y is inverted: positive Y goes down, negative Y goes up).
 */
export function polarToCartesian(radius: number, angleDeg: number): { x: number; y: number } {
  const angleRad = (angleDeg * Math.PI) / 180;
  let x = Math.round(radius * Math.cos(angleRad) * 1000) / 1000;
  let y = Math.round(-radius * Math.sin(angleRad) * 1000) / 1000;
  if (Object.is(x, -0)) x = 0;
  if (Object.is(y, -0)) y = 0;
  return { x, y };
}

/**
 * Calculates SVG arc path data for given radius and angle range.
 */
export function describeArc(
  radius: number,
  startAngleDeg: number,
  endAngleDeg: number
): string {
  const start = polarToCartesian(radius, startAngleDeg);
  const end = polarToCartesian(radius, endAngleDeg);

  let diff = Math.abs(endAngleDeg - startAngleDeg);
  if (diff > 360) diff = 360;
  const largeArcFlag = diff <= 180 ? 0 : 1;

  // In screen coordinates:
  // Decreasing angle (e.g. 90 -> 0 or 180 -> 90) moves clockwise (sweep-flag 1)
  // Increasing angle (e.g. 0 -> 90 or 180 -> 270) moves counter-clockwise (sweep-flag 0)
  const sweepFlag = endAngleDeg < startAngleDeg ? 1 : 0;

  return `M ${start.x} ${start.y} A ${radius} ${radius} 0 ${largeArcFlag} ${sweepFlag} ${end.x} ${end.y}`;
}

/**
 * Returns SVG viewBox and dimensions based on placement and radius.
 */
export function getSvgViewBox(
  radius: number,
  padding: number = 20,
  placement: FabPlacement = 'bottom-left'
): { viewBox: string; width: number; height: number; originX: number; originY: number } {
  const dim = radius + padding;

  switch (placement) {
    case 'bottom-left':
      return {
        viewBox: `0 -${dim} ${dim} ${dim}`,
        width: dim,
        height: dim,
        originX: 0,
        originY: 0
      };
    case 'bottom-right':
      return {
        viewBox: `-${dim} -${dim} ${dim} ${dim}`,
        width: dim,
        height: dim,
        originX: 0,
        originY: 0
      };
    case 'top-left':
      return {
        viewBox: `0 0 ${dim} ${dim}`,
        width: dim,
        height: dim,
        originX: 0,
        originY: 0
      };
    case 'top-right':
      return {
        viewBox: `-${dim} 0 ${dim} ${dim}`,
        width: dim,
        height: dim,
        originX: 0,
        originY: 0
      };
    case 'bottom-center':
      return {
        viewBox: `-${dim} -${dim} ${dim * 2} ${dim}`,
        width: dim * 2,
        height: dim,
        originX: 0,
        originY: 0
      };
    case 'top-center':
      return {
        viewBox: `-${dim} 0 ${dim * 2} ${dim}`,
        width: dim * 2,
        height: dim,
        originX: 0,
        originY: 0
      };
    default:
      return {
        viewBox: `-${dim} -${dim} ${dim * 2} ${dim * 2}`,
        width: dim * 2,
        height: dim * 2,
        originX: 0,
        originY: 0
      };
  }
}

/**
 * Computes normalized progress (0.0 to 1.0) from pointer event and origin coordinates.
 */
export function calculatePointerNormalized(
  clientX: number,
  clientY: number,
  originX: number,
  originY: number,
  placement: FabPlacement = 'bottom-left'
): number {
  const dx = clientX - originX;
  const dy = clientY - originY;

  // In screen space, dy < 0 is upwards, dy > 0 is downwards
  // Math.atan2(-dy, dx) gives angle in radians from horizontal right (0 rad) upwards (π/2 rad)
  let angleRad = Math.atan2(-dy, dx);
  if (angleRad < 0) {
    angleRad += 2 * Math.PI;
  }
  const angleDeg = (angleRad * 180) / Math.PI;

  if (placement === 'bottom-left') {
    // 0 deg (right) is 0%, 90 deg (top) is 100%
    const clampedDeg = Math.max(0, Math.min(90, angleDeg));
    return clampedDeg / 90;
  }

  if (placement === 'bottom-right') {
    // 180 deg (left) is 0%, 90 deg (top) is 100%
    let deg = angleDeg;
    if (deg < 90) deg = 90;
    if (deg > 180) deg = 180;
    return (180 - deg) / 90;
  }

  if (placement === 'top-left') {
    // 360 deg / 0 deg (right) is 0%, 270 deg (bottom) is 100%
    let deg = angleDeg;
    if (deg < 270 && deg > 90) deg = 270;
    if (deg >= 270) {
      return (360 - deg) / 90;
    }
    return 0;
  }

  if (placement === 'top-right') {
    // 180 deg (left) is 0%, 270 deg (bottom) is 100%
    let deg = angleDeg;
    if (deg < 180) deg = 180;
    if (deg > 270) deg = 270;
    return (deg - 180) / 90;
  }

  const span = getDialAngleSpan(placement);
  const diff = span.maxDeg - span.zeroDeg;
  let normalized = (angleDeg - span.zeroDeg) / diff;
  return Math.max(0, Math.min(1, normalized));
}

/**
 * Generates precision watch dial ticks across the arc.
 */
export function generateWatchDialTicks(
  radius: number,
  normalizedValue: number,
  tickCount: number = 20,
  placement: FabPlacement = 'bottom-left'
): DialTick[] {
  const ticks: DialTick[] = [];
  const span = getDialAngleSpan(placement);

  for (let i = 0; i <= tickCount; i++) {
    const percent = i / tickCount;
    // Current tick angle from 0% (zeroDeg) to 100% (maxDeg)
    const angleDeg = span.zeroDeg + percent * (span.maxDeg - span.zeroDeg);
    const isMajor = i % 5 === 0;
    const isActive = percent <= normalizedValue + 0.005;

    const rInner = isMajor ? radius - 8 : radius - 4;
    const rOuter = isMajor ? radius + 8 : radius + 4;

    const p1 = polarToCartesian(rInner, angleDeg);
    const p2 = polarToCartesian(rOuter, angleDeg);

    ticks.push({
      id: `tick-${i}`,
      x1: p1.x,
      y1: p1.y,
      x2: p2.x,
      y2: p2.y,
      isMajor,
      isActive,
      percent
    });
  }

  return ticks;
}

/**
 * Generates celestial micro-dots along an inner orbit track.
 */
export function generateCelestialDots(
  radius: number,
  normalizedValue: number,
  dotCount: number = 12,
  placement: FabPlacement = 'bottom-left'
): DialDot[] {
  const dots: DialDot[] = [];
  const span = getDialAngleSpan(placement);

  for (let i = 0; i <= dotCount; i++) {
    const percent = i / dotCount;
    const angleDeg = span.zeroDeg + percent * (span.maxDeg - span.zeroDeg);
    const isActive = percent <= normalizedValue + 0.02;
    const isMajor = i % 3 === 0;

    const pos = polarToCartesian(radius, angleDeg);

    dots.push({
      id: `dot-${i}`,
      x: pos.x,
      y: pos.y,
      isActive,
      isMajor,
      percent
    });
  }

  return dots;
}
