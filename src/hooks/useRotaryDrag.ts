import { useState, useRef, useCallback } from 'react';
import { FabPlacement } from '../types';
import { calculatePointerNormalized } from '../utils/geometry';
import { triggerHaptic } from '../utils/haptics';

export interface UseRotaryDragOptions {
  value: number;
  min?: number;
  max?: number;
  step?: number;
  placement?: FabPlacement;
  enableHaptics?: boolean;
  onChange?: (value: number) => void;
  onChangeEnd?: (value: number) => void;
}

export function useRotaryDrag({
  value,
  min = 0,
  max = 100,
  step = 1,
  placement = 'bottom-left',
  enableHaptics = true,
  onChange,
  onChangeEnd
}: UseRotaryDragOptions) {
  const [isDragging, setIsDragging] = useState(false);
  const containerRef = useRef<SVGSVGElement | null>(null);
  const lastStepRef = useRef<number>(Math.round(((value - min) / (max - min)) * 20));

  const clampValue = useCallback(
    (rawVal: number): number => {
      const clamped = Math.max(min, Math.min(max, rawVal));
      if (step <= 0) return clamped;
      const stepped = Math.round((clamped - min) / step) * step + min;
      // Round to prevent floating point inaccuracies
      const decimals = step.toString().split('.')[1]?.length || 0;
      return Number(stepped.toFixed(decimals));
    },
    [min, max, step]
  );

  const handlePointerMove = useCallback(
    (e: React.PointerEvent<SVGSVGElement> | PointerEvent) => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();

      const normalized = calculatePointerNormalized(
        e.clientX,
        e.clientY,
        rect,
        placement
      );

      const rawValue = min + normalized * (max - min);
      const steppedVal = clampValue(rawValue);

      // Haptic tick processing across 20 divisions
      if (enableHaptics) {
        const hapticStep = Math.round(normalized * 20);
        if (hapticStep !== lastStepRef.current) {
          lastStepRef.current = hapticStep;
          if (hapticStep === 0 || hapticStep === 20) {
            triggerHaptic('boundary');
          } else if (hapticStep % 5 === 0) {
            triggerHaptic('medium');
          } else {
            triggerHaptic('tick');
          }
        }
      }

      onChange?.(steppedVal);
    },
    [min, max, placement, enableHaptics, clampValue, onChange]
  );

  const handlePointerDown = useCallback(
    (e: React.PointerEvent<SVGSVGElement>) => {
      setIsDragging(true);
      if (enableHaptics) triggerHaptic('light');

      if (containerRef.current) {
        try {
          containerRef.current.setPointerCapture(e.pointerId);
        } catch {}
      }

      handlePointerMove(e);
    },
    [enableHaptics, handlePointerMove]
  );

  const handlePointerUp = useCallback(
    (e: React.PointerEvent<SVGSVGElement>) => {
      if (!isDragging) return;
      setIsDragging(false);
      if (enableHaptics) triggerHaptic('tick');

      if (containerRef.current) {
        try {
          containerRef.current.releasePointerCapture(e.pointerId);
        } catch {}
      }

      onChangeEnd?.(value);
    },
    [isDragging, enableHaptics, onChangeEnd, value]
  );

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      let delta = 0;
      const stepVal = step || (max - min) / 100;
      const largeStep = stepVal * 5;

      switch (e.key) {
        case 'ArrowUp':
        case 'ArrowRight':
          delta = stepVal;
          break;
        case 'ArrowDown':
        case 'ArrowLeft':
          delta = -stepVal;
          break;
        case 'PageUp':
          delta = largeStep;
          break;
        case 'PageDown':
          delta = -largeStep;
          break;
        case 'Home':
          onChange?.(min);
          if (enableHaptics) triggerHaptic('boundary');
          e.preventDefault();
          return;
        case 'End':
          onChange?.(max);
          if (enableHaptics) triggerHaptic('boundary');
          e.preventDefault();
          return;
        default:
          return;
      }

      e.preventDefault();
      const newVal = clampValue(value + delta);
      if (newVal !== value) {
        if (enableHaptics) triggerHaptic('tick');
        onChange?.(newVal);
      }
    },
    [value, min, max, step, clampValue, enableHaptics, onChange]
  );

  const handleWheel = useCallback(
    (e: React.WheelEvent) => {
      e.preventDefault();
      const stepVal = step || 1;
      const direction = e.deltaY < 0 ? 1 : -1;
      const newVal = clampValue(value + direction * stepVal);
      if (newVal !== value) {
        if (enableHaptics) triggerHaptic('tick');
        onChange?.(newVal);
      }
    },
    [value, step, clampValue, enableHaptics, onChange]
  );

  return {
    containerRef,
    isDragging,
    handlePointerDown,
    handlePointerMove: isDragging ? handlePointerMove : undefined,
    handlePointerUp,
    handleKeyDown,
    handleWheel
  };
}
