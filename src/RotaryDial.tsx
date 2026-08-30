import React, { useState, useRef, useEffect, useCallback } from 'react';
import { RotaryDialProps } from './types';
import {
  describeArc,
  getDialAngleSpan,
  getSvgViewBox,
  calculatePointerNormalized,
  generateWatchDialTicks,
  generateCelestialDots,
  polarToCartesian
} from './utils/geometry';
import { useHaptic } from './hooks/useHaptic';

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
  dialStyle = 'watchmaker',
  theme = 'luxury-watch',
  label,
  unit = '% VOL',
  showTrack = true,
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

  const handleValueChange = useCallback(
    (newVal: number) => {
      if (disabled) return;
      if (!isControlled) {
        setInternalValue(newVal);
      }
      onChange?.(newVal);
    },
    [disabled, isControlled, onChange]
  );

  const span = getDialAngleSpan(placement);
  const normalized = Math.max(0, Math.min(1, (currentValue - min) / (max - min || 1)));
  const currentAngleDeg = span.zeroDeg + normalized * (span.maxDeg - span.zeroDeg);
  const totalAngleDiff = Math.abs(span.maxDeg - span.zeroDeg);
  const arcLength = (Math.PI * radius * totalAngleDiff) / 180;
  const strokeOffset = arcLength * (1 - normalized);
  const thumbPos = polarToCartesian(radius, currentAngleDeg);

  const containerRef = useRef<SVGSVGElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const haptic = useHaptic(enableHaptics);
  const prevTickRef = useRef<number>(Math.round(currentValue / (step || 1)));

  // Trigger haptics on step increments
  useEffect(() => {
    const currentStepIndex = Math.round(currentValue / (step || 1));
    if (currentStepIndex !== prevTickRef.current) {
      prevTickRef.current = currentStepIndex;
      if (currentValue === min || currentValue === max) {
        haptic('boundary');
      } else {
        haptic('tick');
      }
    }
  }, [currentValue, min, max, step, haptic]);

  const updatePointerPosition = useCallback(
    (clientX: number, clientY: number) => {
      if (!containerRef.current || disabled) return;
      const rect = containerRef.current.getBoundingClientRect();
      const normalizedPercent = calculatePointerNormalized(clientX, clientY, rect, placement);

      const rawValue = min + normalizedPercent * (max - min);
      const steppedValue = Math.round(rawValue / step) * step;
      const clampedValue = Math.max(min, Math.min(max, steppedValue));

      handleValueChange(Number(clampedValue.toFixed(4)));
    },
    [placement, min, max, step, disabled, handleValueChange]
  );

  const handlePointerDown = (e: React.PointerEvent<SVGSVGElement>) => {
    if (disabled) return;
    e.preventDefault();
    try {
      (e.currentTarget as Element).setPointerCapture(e.pointerId);
    } catch {}
    setIsDragging(true);
    updatePointerPosition(e.clientX, e.clientY);
  };

  const handlePointerMove = (e: React.PointerEvent<SVGSVGElement>) => {
    if (!isDragging || disabled) return;
    e.preventDefault();
    updatePointerPosition(e.clientX, e.clientY);
  };

  const handlePointerUp = (e: React.PointerEvent<SVGSVGElement>) => {
    if (isDragging) {
      setIsDragging(false);
      try {
        (e.currentTarget as Element).releasePointerCapture(e.pointerId);
      } catch {}
      onChangeEnd?.(currentValue);
    }
  };

  // Global pointer listeners to ensure buttery smooth tracking even outside bounds
  useEffect(() => {
    if (!isDragging) return;

    const handleGlobalMove = (e: PointerEvent) => {
      updatePointerPosition(e.clientX, e.clientY);
    };

    const handleGlobalUp = () => {
      setIsDragging(false);
      onChangeEnd?.(currentValue);
    };

    window.addEventListener('pointermove', handleGlobalMove, { passive: true });
    window.addEventListener('pointerup', handleGlobalUp, { passive: true });
    window.addEventListener('pointercancel', handleGlobalUp, { passive: true });

    return () => {
      window.removeEventListener('pointermove', handleGlobalMove);
      window.removeEventListener('pointerup', handleGlobalUp);
      window.removeEventListener('pointercancel', handleGlobalUp);
    };
  }, [isDragging, updatePointerPosition, onChangeEnd, currentValue]);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (disabled) return;
    let nextVal = currentValue;
    if (e.key === 'ArrowUp' || e.key === 'ArrowRight') {
      nextVal = Math.min(max, currentValue + step);
    } else if (e.key === 'ArrowDown' || e.key === 'ArrowLeft') {
      nextVal = Math.max(min, currentValue - step);
    } else if (e.key === 'PageUp') {
      nextVal = Math.min(max, currentValue + step * 5);
    } else if (e.key === 'PageDown') {
      nextVal = Math.max(min, currentValue - step * 5);
    } else if (e.key === 'Home') {
      nextVal = min;
    } else if (e.key === 'End') {
      nextVal = max;
    } else {
      return;
    }
    e.preventDefault();
    handleValueChange(nextVal);
  };

  const handleWheel = (e: React.WheelEvent) => {
    if (disabled) return;
    e.preventDefault();
    const delta = e.deltaY < 0 ? step : -step;
    const nextVal = Math.max(min, Math.min(max, currentValue + delta));
    handleValueChange(nextVal);
  };

  const svgInfo = getSvgViewBox(radius + 24, 20, placement);
  const ticks = generateWatchDialTicks(radius, normalized, tickCount, placement);
  const innerDotRadius = radius - 18;
  const dots = generateCelestialDots(innerDotRadius, normalized, dotCount, placement);

  const needleP1 = polarToCartesian(radius - 10, currentAngleDeg);
  const needleP2 = polarToCartesian(radius + 10, currentAngleDeg);

  const renderReadout = () => {
    if (typeof label === 'function') {
      return label(currentValue);
    }
    if (label) {
      return label;
    }
    return (
      <>
        <span className="rf-chrono-val">{currentValue}</span>
        {unit && <span className="rf-chrono-unit">{unit}</span>}
      </>
    );
  };

  const getPlacementStyle = (): React.CSSProperties => {
    switch (placement) {
      case 'bottom-left':
        return { bottom: 0, left: 0 };
      case 'bottom-right':
        return { bottom: 0, right: 0 };
      case 'top-left':
        return { top: 0, left: 0 };
      case 'top-right':
        return { top: 0, right: 0 };
      default:
        return { bottom: 0, left: 0 };
    }
  };

  // Dial Style Specific Adjustments
  const isMinimal = dialStyle === 'minimal';
  const isCyber = dialStyle === 'cyber-segmented';
  const isHolo = dialStyle === 'holographic';
  const isRetro = dialStyle === 'retro-analog';
  const isNeonGlow = dialStyle === 'neon-glow';

  const shouldRenderTicks = showTicks && !isMinimal;
  const shouldRenderMicroDots = showMicroDots && !isMinimal && !isRetro;
  const shouldRenderBezel = showBezel && !isMinimal;

  return (
    <div
      className={`rf-dial-container rf-placement-${placement} rf-dial-style-${dialStyle} rf-theme-${theme} ${
        isDragging ? 'rf-dial-dragging' : ''
      } ${disabled ? 'rf-dial-disabled' : ''} ${className}`}
      style={{
        ...getPlacementStyle(),
        touchAction: 'none',
        userSelect: 'none',
        WebkitUserSelect: 'none',
        ...style
      }}
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
        style={{
          overflow: 'visible',
          touchAction: 'none'
        }}
        onPointerDown={disabled ? undefined : handlePointerDown}
        onPointerMove={disabled ? undefined : handlePointerMove}
        onPointerUp={disabled ? undefined : handlePointerUp}
        onPointerCancel={disabled ? undefined : handlePointerUp}
      >
        <defs>
          {/* Holographic Prismatic Gradient */}
          <linearGradient id="rf-holo-grad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#38bdf8" />
            <stop offset="33%" stopColor="#a855f7" />
            <stop offset="66%" stopColor="#ec4899" />
            <stop offset="100%" stopColor="#f59e0b" />
          </linearGradient>

          {/* Neon Glow Gradient */}
          <linearGradient id="rf-neon-grad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#06b6d4" />
            <stop offset="100%" stopColor="#ec4899" />
          </linearGradient>
        </defs>

        {/* Inner Dotted Celestial Orbit Guideline */}
        {shouldRenderMicroDots && (
          <path
            d={describeArc(innerDotRadius, span.zeroDeg, span.maxDeg)}
            fill="none"
            stroke="var(--rf-track, rgba(255, 255, 255, 0.12))"
            strokeWidth="0.8"
            strokeDasharray="1.5 3.5"
          />
        )}

        {/* Celestial Micro-Dots */}
        {shouldRenderMicroDots &&
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
        {shouldRenderBezel && (
          <path
            d={describeArc(radius + 8, span.zeroDeg, span.maxDeg)}
            fill="none"
            stroke="var(--rf-track, rgba(255, 255, 255, 0.08))"
            strokeWidth="1"
          />
        )}

        {/* Subtle Inner Bezel Guideline */}
        {shouldRenderBezel && (
          <path
            d={describeArc(radius - 8, span.zeroDeg, span.maxDeg)}
            fill="none"
            stroke="var(--rf-track, rgba(255, 255, 255, 0.08))"
            strokeWidth="1"
          />
        )}

        {/* Background Track Arc */}
        {showTrack && (
          <path
            className="rf-dial-track"
            d={describeArc(radius, span.zeroDeg, span.maxDeg)}
            fill="none"
            stroke="var(--rf-track, rgba(255, 255, 255, 0.14))"
            strokeWidth={isMinimal ? '1.5' : isCyber ? '3' : '1.5'}
            strokeDasharray={isCyber ? '4 4' : undefined}
          />
        )}

        {/* Active Illuminated Fill Arc */}
        <path
          className="rf-dial-fill"
          d={describeArc(radius, span.zeroDeg, span.maxDeg)}
          fill="none"
          stroke={
            isHolo
              ? 'url(#rf-holo-grad)'
              : isNeonGlow
              ? 'url(#rf-neon-grad)'
              : isRetro
              ? '#f97316'
              : 'var(--rf-fill, #ffffff)'
          }
          strokeWidth={isMinimal ? '2' : isCyber ? '3.5' : isNeonGlow ? '3' : '2'}
          strokeLinecap={isCyber ? 'butt' : 'round'}
          style={{
            strokeDasharray: isCyber ? '6 3' : `${arcLength} ${arcLength}`,
            strokeDashoffset: isCyber ? undefined : `${strokeOffset}`,
            filter: showGlow
              ? isNeonGlow
                ? 'drop-shadow(0 0 6px #06b6d4) drop-shadow(0 0 12px #ec4899)'
                : isHolo
                ? 'drop-shadow(0 0 5px rgba(168, 85, 247, 0.8))'
                : isRetro
                ? 'drop-shadow(0 0 4px rgba(249, 115, 22, 0.8))'
                : 'drop-shadow(0 0 4px var(--rf-accent-glow, rgba(255, 255, 255, 0.6)))'
              : 'none'
          }}
        />

        {/* Precision Watch Line Dial Ticks */}
        {shouldRenderTicks &&
          ticks.map(tick => (
            <line
              key={tick.id}
              x1={tick.x1}
              y1={tick.y1}
              x2={tick.x2}
              y2={tick.y2}
              stroke={
                tick.isActive
                  ? isRetro
                    ? '#fb923c'
                    : 'var(--rf-fill, #ffffff)'
                  : 'var(--rf-track, rgba(255, 255, 255, 0.22))'
              }
              strokeWidth={tick.isMajor ? (isCyber ? 2.5 : 2) : 1.2}
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
        {showNeedle && !isMinimal && (
          <line
            x1={needleP1.x}
            y1={needleP1.y}
            x2={needleP2.x}
            y2={needleP2.y}
            stroke={isRetro ? '#ea580c' : isHolo ? '#c084fc' : 'var(--rf-fill, #ffffff)'}
            strokeWidth={isRetro ? '3' : '2.5'}
            strokeLinecap="round"
            style={{
              filter: showGlow
                ? isRetro
                  ? 'drop-shadow(0 0 6px #ea580c)'
                  : 'drop-shadow(0 0 5px var(--rf-accent-glow, rgba(255, 255, 255, 0.9)))'
                : 'none'
            }}
          />
        )}

        {/* Glowing Jewel Dial Pip / Thumb Knob */}
        <circle
          className="rf-dial-thumb"
          cx={thumbPos.x}
          cy={thumbPos.y}
          r={isMinimal ? '3.5' : isCyber ? '5' : '4'}
          fill={isHolo ? '#ec4899' : isRetro ? '#f97316' : 'var(--rf-fill, #ffffff)'}
          stroke={isRetro ? '#431407' : 'var(--rf-bg-main, #0d0d0e)'}
          strokeWidth={isMinimal ? '1' : '1.5'}
          style={{
            filter: showGlow
              ? isHolo
                ? 'drop-shadow(0 0 6px #ec4899)'
                : isRetro
                ? 'drop-shadow(0 0 6px #f97316)'
                : 'drop-shadow(0 0 4px var(--rf-accent-glow, #ffffff))'
              : 'none'
          }}
        />
      </svg>

      {/* Chrono Watch Readout Badge */}
      <div className="rf-chrono-badge">{renderReadout()}</div>
    </div>
  );
};
