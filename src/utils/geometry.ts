import { FabPlacement, DialTick, DialDot } from '../types';

export interface AngleSpan {
  startDeg: number;
  endDeg: number;
  totalSpanDeg: number;
}

/**
 * Returns default angle span in degrees for a given placement.
 * 0 deg is positive X (right), 90 deg is negative Y (up on screen),
 * 180 deg is negative X (left), 270 deg is positive Y (down on screen).
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
 * Converts polar coordinates (radius, angle in degrees) to cartesian (x, y)
 * with screen coordinates (Y is inverted: positive Y goes down, negative Y goes up).
 */
export function polarToCartesian(radius: number, angleDeg: number): { x: number; y: number } {
  const angleRad = (angleDeg * Math.PI) / 180;
  // In screen space:
  // angle 0° = right (+x, 0)
  // angle 90° = up (0, -y)
  // angle 180° = left (-x, 0)
  // angle 270° = down (0, +y)
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

  // Determine large-arc-flag
  let diff = Math.abs(endAngleDeg - startAngleDeg);
  if (diff > 360) diff = 360;
  const largeArcFlag = diff <= 180 ? 0 : 1;

  // Sweep flag: clockwise vs counter-clockwise in screen coordinates
  // When angle decreases (e.g. 90 -> 0), it moves clockwise in Cartesian, which is sweep-flag 1 in SVG
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

  const span = getPlacementAngleSpan(placement);

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
    // 0 deg / 360 deg (right) is 0%, 270 deg (bottom) is 100%
    let deg = angleDeg;
    if (deg < 270 && deg > 90) deg = 270;
    if (deg >= 270) {
      return (360 - deg) / 90;
    }
    return 1;
  }

  if (placement === 'top-right') {
    // 180 deg (left) is 0%, 270 deg (bottom) is 100%
    let deg = angleDeg;
    if (deg < 180 || deg > 270) deg = Math.abs(deg - 180) < Math.abs(deg - 270) ? 180 : 270;
    return (deg - 180) / 90;
  }

  // Generic span calculation for other placements
  const diff = span.endDeg - span.startDeg;
  let normalized = (angleDeg - span.startDeg) / diff;
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
  const span = getPlacementAngleSpan(placement);

  for (let i = 0; i <= tickCount; i++) {
    const percent = i / tickCount;
    // Current tick angle
    const angleDeg = span.startDeg + (span.endDeg - span.startDeg) * (1 - percent);
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
  const span = getPlacementAngleSpan(placement);

  for (let i = 0; i <= dotCount; i++) {
    const percent = i / dotCount;
    const angleDeg = span.startDeg + (span.endDeg - span.startDeg) * (1 - percent);
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
