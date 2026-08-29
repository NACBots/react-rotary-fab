import React, { useMemo, useState, useEffect } from 'react';
import { RotaryDialProps } from './types';
import {
  describeArc,
  getPlacementAngleSpan,
  polarToCartesian,
  getSvgViewBox,
  generateWatchDialTicks,
  generateCelestialDots
} from './utils/geometry';
import { useRotaryDrag } from './hooks/useRotaryDrag';

export const RotaryDial: React.FC<RotaryDialProps> = ({
  value: controlledValue,
  defaultValue = 50,
  min = 0,
  max = 100,
  step = 1,
  onChange,
  onChangeEnd,
  radius = 124,
  placement = 'bottom-left',
  label,
  unit = '% VOL',
  showTicks = true,
  tickCount = 20,
  showMicroDots = true,
  dotCount = 12,
  showNeedle = true,
  showBezel = true,
  showGlow = true,
  enableHaptics = true,
  className = '',
  style,
  ariaLabel = 'Rotary Dial Slider',
  disabled = false
}) => {
  const isControlled = controlledValue !== undefined;
  const [internalValue, setInternalValue] = useState<number>(
    isControlled ? (controlledValue as number) : defaultValue
  );

  useEffect(() => {
    if (isControlled) {
      setInternalValue(controlledValue as number);
    }
  }, [isControlled, controlledValue]);

  const currentValue = isControlled ? (controlledValue as number) : internalValue;

  const handleValueChange = (newVal: number) => {
    if (disabled) return;
    if (!isControlled) {
      setInternalValue(newVal);
    }
    onChange?.(newVal);
  };

  const {
    containerRef,
    isDragging,
    handlePointerDown,
    handlePointerMove,
    handlePointerUp,
    handleKeyDown,
    handleWheel
  } = useRotaryDrag({
    value: currentValue,
    min,
    max,
    step,
    placement,
    enableHaptics: enableHaptics && !disabled,
    onChange: handleValueChange,
    onChangeEnd
  });

  const span = getPlacementAngleSpan(placement);
  const normalizedValue = Math.max(0, Math.min(1, (currentValue - min) / (max - min || 1)));

  // SVG dimensions
  const svgInfo = getSvgViewBox(radius, 24, placement);

  // Math for stroke dash offset
  const arcLength = (Math.abs(span.totalSpanDeg) * Math.PI * radius) / 180;
  const strokeOffset = arcLength * (1 - normalizedValue);

  // Thumb position and needle angle
  const currentAngleDeg = span.startDeg + (span.endDeg - span.startDeg) * (1 - normalizedValue);
  const thumbPos = polarToCartesian(radius, currentAngleDeg);
  const needleP1 = polarToCartesian(radius - 10, currentAngleDeg);
  const needleP2 = polarToCartesian(radius + 10, currentAngleDeg);

  // Inner celestial dot orbit radius
  const innerDotRadius = radius - 56;

  const ticks = useMemo(() => {
    if (!showTicks) return [];
    return generateWatchDialTicks(radius, normalizedValue, tickCount, placement);
  }, [radius, normalizedValue, tickCount, placement, showTicks]);

  const dots = useMemo(() => {
    if (!showMicroDots) return [];
    return generateCelestialDots(innerDotRadius, normalizedValue, dotCount, placement);
  }, [innerDotRadius, normalizedValue, dotCount, placement, showMicroDots]);

  // Render Label Readout
  const renderReadout = () => {
    if (typeof label === 'function') {
      return label(currentValue);
    }
    if (typeof label === 'string') {
      return <span>{label}</span>;
    }
    return (
      <>
        <span className="rf-chrono-val">{Math.round(currentValue)}</span>
        {unit && <span className="rf-chrono-unit">{unit}</span>}
      </>
    );
  };

  return (
    <div
      className={`rf-dial-container ${isDragging ? 'rf-dial-dragging' : ''} ${
        disabled ? 'rf-dial-disabled' : ''
      } ${className}`}
      style={style}
      tabIndex={disabled ? -1 : 0}
      role="slider"
      aria-label={ariaLabel}
      aria-valuemin={min}
      aria-valuemax={max}
      aria-valuenow={currentValue}
      aria-disabled={disabled}
      onKeyDown={disabled ? undefined : handleKeyDown}
      onWheel={disabled ? undefined : handleWheel}
    >
      <svg
        ref={containerRef}
        width={svgInfo.width}
        height={svgInfo.height}
        viewBox={svgInfo.viewBox}
        className="rf-dial-svg"
        onPointerDown={disabled ? undefined : handlePointerDown}
        onPointerMove={disabled ? undefined : handlePointerMove}
        onPointerUp={disabled ? undefined : handlePointerUp}
        onPointerCancel={disabled ? undefined : handlePointerUp}
      >
        {/* Inner Dotted Celestial Orbit Guideline */}
        {showMicroDots && (
          <path
            d={describeArc(innerDotRadius, span.startDeg, span.endDeg)}
            fill="none"
            stroke="var(--rf-track, rgba(255, 255, 255, 0.12))"
            strokeWidth="0.8"
            strokeDasharray="1.5 3.5"
          />
        )}

        {/* Celestial Micro-Dots */}
        {showMicroDots &&
          dots.map(dot => (
            <circle
              key={dot.id}
              cx={dot.x}
              cy={dot.y}
              r={dot.isActive ? (dot.isMajor ? 2.2 : 1.5) : dot.isMajor ? 1.6 : 1.0}
              fill={dot.isActive ? 'var(--rf-fill, #ffffff)' : 'var(--rf-text-muted, rgba(255, 255, 255, 0.2))'}
              style={{
                transition: 'fill 0.15s ease, r 0.15s ease',
                filter:
                  showGlow && dot.isActive
                    ? 'drop-shadow(0 0 2px var(--rf-accent-glow, rgba(255, 255, 255, 0.7)))'
                    : 'none'
              }}
            />
          ))}

        {/* Subtle Outer Bezel Guideline */}
        {showBezel && (
          <path
            d={describeArc(radius + 8, span.startDeg, span.endDeg)}
            fill="none"
            stroke="var(--rf-track, rgba(255, 255, 255, 0.08))"
            strokeWidth="1"
          />
        )}

        {/* Subtle Inner Bezel Guideline */}
        {showBezel && (
          <path
            d={describeArc(radius - 8, span.startDeg, span.endDeg)}
            fill="none"
            stroke="var(--rf-track, rgba(255, 255, 255, 0.08))"
            strokeWidth="1"
          />
        )}

        {/* Background Track Arc */}
        <path
          className="rf-dial-track"
          d={describeArc(radius, span.startDeg, span.endDeg)}
          fill="none"
          stroke="var(--rf-track, rgba(255, 255, 255, 0.14))"
          strokeWidth="1.5"
        />

        {/* Active Illuminated Fill Arc */}
        <path
          className="rf-dial-fill"
          d={describeArc(radius, span.startDeg, span.endDeg)}
          fill="none"
          stroke="var(--rf-fill, #ffffff)"
          strokeWidth="2"
          strokeLinecap="round"
          style={{
            strokeDasharray: arcLength,
            strokeDashoffset: strokeOffset,
            filter: showGlow ? 'drop-shadow(0 0 4px var(--rf-accent-glow, rgba(255, 255, 255, 0.6)))' : 'none'
          }}
        />

        {/* Precision Watch Line Dial Ticks */}
        {showTicks &&
          ticks.map(tick => (
            <line
              key={tick.id}
              x1={tick.x1}
              y1={tick.y1}
              x2={tick.x2}
              y2={tick.y2}
              stroke={tick.isActive ? 'var(--rf-fill, #ffffff)' : 'var(--rf-track, rgba(255, 255, 255, 0.22))'}
              strokeWidth={tick.isMajor ? 2 : 1.2}
              strokeLinecap="round"
              style={{
                transition: 'stroke 0.15s ease',
                filter:
                  showGlow && tick.isActive
                    ? 'drop-shadow(0 0 3px var(--rf-accent-glow, rgba(255, 255, 255, 0.7)))'
                    : 'none'
              }}
            />
          ))}

        {/* Precision Watch Needle Line on Thumb */}
        {showNeedle && (
          <line
            x1={needleP1.x}
            y1={needleP1.y}
            x2={needleP2.x}
            y2={needleP2.y}
            stroke="var(--rf-fill, #ffffff)"
            strokeWidth="2.5"
            strokeLinecap="round"
            style={{
              filter: showGlow ? 'drop-shadow(0 0 5px var(--rf-accent-glow, rgba(255, 255, 255, 0.9)))' : 'none'
            }}
          />
        )}

        {/* Glowing Jewel Dial Pip / Thumb Knob */}
        <circle
          className="rf-dial-thumb"
          cx={thumbPos.x}
          cy={thumbPos.y}
          r="4"
          fill="var(--rf-fill, #ffffff)"
          stroke="var(--rf-bg-main, #0d0d0e)"
          strokeWidth="1.5"
        />
      </svg>

      {/* Chrono Watch Readout Badge */}
      <div className="rf-chrono-badge">{renderReadout()}</div>
    </div>
  );
};
