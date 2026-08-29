import { useCallback } from 'react';
import { HapticType } from '../types';
import { triggerHaptic } from '../utils/haptics';

export function useHaptic(enabled: boolean = true) {
  const haptic = useCallback(
    (type: HapticType = 'light') => {
      if (enabled) {
        triggerHaptic(type);
      }
    },
    [enabled]
  );

  return haptic;
}
