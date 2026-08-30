import { useCallback } from 'react';
import { HapticType } from '../types';
import { triggerHaptic } from '../utils/haptics';

export interface UseHapticReturn {
  (type?: HapticType): void;
  tick: () => void;
  boundary: () => void;
  light: () => void;
  medium: () => void;
  heavy: () => void;
  click: () => void;
  toggle: () => void;
  danger: () => void;
  success: () => void;
}

export function useHaptic(enabled: boolean = true): UseHapticReturn {
  const trigger = useCallback(
    (type: HapticType = 'light') => {
      if (enabled) {
        triggerHaptic(type);
      }
    },
    [enabled]
  );

  const hapticFn = ((type: HapticType = 'light') => {
    trigger(type);
  }) as UseHapticReturn;

  hapticFn.tick = () => trigger('tick');
  hapticFn.boundary = () => trigger('boundary');
  hapticFn.light = () => trigger('light');
  hapticFn.medium = () => trigger('medium');
  hapticFn.heavy = () => trigger('heavy');
  hapticFn.click = () => trigger('click');
  hapticFn.toggle = () => trigger('toggle');
  hapticFn.danger = () => trigger('danger');
  hapticFn.success = () => trigger('success');

  return hapticFn;
}
