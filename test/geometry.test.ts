import { describe, it, expect } from 'vitest';
import {
  polarToCartesian,
  describeArc,
  getPlacementAngleSpan,
  getDialAngleSpan,
  getSvgViewBox,
  calculatePointerNormalized,
  generateWatchDialTicks,
  generateCelestialDots
} from '../src/utils/geometry';

describe('Geometry Utils', () => {
  it('calculates polarToCartesian correctly for screen coordinates', () => {
    // 0 deg = right (+100, 0)
    const right = polarToCartesian(100, 0);
    expect(right.x).toBe(100);
    expect(right.y).toBe(0);

    // 90 deg = top (0, -100)
    const top = polarToCartesian(100, 90);
    expect(top.x).toBe(0);
    expect(top.y).toBe(-100);

    // 180 deg = left (-100, 0)
    const left = polarToCartesian(100, 180);
    expect(left.x).toBe(-100);
    expect(left.y).toBe(0);

    // 270 deg = bottom (0, +100)
    const bottom = polarToCartesian(100, 270);
    expect(bottom.x).toBe(0);
    expect(bottom.y).toBe(100);
  });

  it('returns appropriate angle spans for all 4 quadrants', () => {
    expect(getPlacementAngleSpan('bottom-left')).toEqual({ startDeg: 90, endDeg: 0, totalSpanDeg: 90 });
    expect(getPlacementAngleSpan('bottom-right')).toEqual({ startDeg: 90, endDeg: 180, totalSpanDeg: 90 });
    expect(getPlacementAngleSpan('top-left')).toEqual({ startDeg: 270, endDeg: 360, totalSpanDeg: 90 });
    expect(getPlacementAngleSpan('top-right')).toEqual({ startDeg: 270, endDeg: 180, totalSpanDeg: 90 });
  });

  it('returns synchronized dial angle spans with 0% to 100% direction', () => {
    expect(getDialAngleSpan('bottom-left')).toEqual({ zeroDeg: 0, maxDeg: 90, totalSpanDeg: 90 });
    expect(getDialAngleSpan('bottom-right')).toEqual({ zeroDeg: 180, maxDeg: 90, totalSpanDeg: 90 });
    expect(getDialAngleSpan('top-left')).toEqual({ zeroDeg: 360, maxDeg: 270, totalSpanDeg: 90 });
    expect(getDialAngleSpan('top-right')).toEqual({ zeroDeg: 180, maxDeg: 270, totalSpanDeg: 90 });
  });

  it('generates valid SVG arc path string', () => {
    const arc = describeArc(100, 90, 0);
    expect(arc).toContain('M');
    expect(arc).toContain('A 100 100');
  });

  it('generates correct viewBox per placement', () => {
    const bl = getSvgViewBox(100, 20, 'bottom-left');
    expect(bl.viewBox).toBe('0 -120 120 120');

    const br = getSvgViewBox(100, 20, 'bottom-right');
    expect(br.viewBox).toBe('-120 -120 120 120');
  });

  it('calculates pointer normalization correctly for bottom-left', () => {
    // Origin at (0, 0), pointer at (100, 0) -> angle 0 deg -> 0%
    const norm0 = calculatePointerNormalized(100, 0, 0, 0, 'bottom-left');
    expect(norm0).toBe(0);

    // Pointer at (0, -100) -> angle 90 deg -> 100%
    const norm1 = calculatePointerNormalized(0, -100, 0, 0, 'bottom-left');
    expect(norm1).toBe(1);
  });

  it('generates expected number of dial ticks and celestial dots', () => {
    const ticks = generateWatchDialTicks(120, 0.5, 20, 'bottom-left');
    expect(ticks.length).toBe(21);
    expect(ticks[0].isMajor).toBe(true);

    const dots = generateCelestialDots(80, 0.5, 12, 'bottom-left');
    expect(dots.length).toBe(13);
  });
});
