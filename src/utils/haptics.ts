import { HapticType } from '../types';

/**
 * Triggers safe tactile vibration feedback on supported devices.
 * Gracefully ignores non-supported browsers or SSR environments.
 */
export function triggerHaptic(type: HapticType = 'light'): void {
  if (typeof window === 'undefined' || typeof navigator === 'undefined' || !navigator.vibrate) {
    return;
  }

  try {
    if (typeof type === 'number' || Array.isArray(type)) {
      navigator.vibrate(type);
      return;
    }

    switch (type) {
      case 'tick':
        navigator.vibrate(8);
        break;
      case 'light':
        navigator.vibrate(12);
        break;
      case 'click':
        navigator.vibrate(14);
        break;
      case 'medium':
        navigator.vibrate(18);
        break;
      case 'heavy':
        navigator.vibrate(28);
        break;
      case 'boundary':
        navigator.vibrate([15, 35, 25]);
        break;
      case 'toggle':
        navigator.vibrate([12, 30, 15]);
        break;
      case 'danger':
        navigator.vibrate([18, 40, 22]);
        break;
      case 'success':
        navigator.vibrate([10, 20, 15, 20, 25]);
        break;
      default:
        navigator.vibrate(10);
    }
  } catch {
    // Ignore any vibration errors silently
  }
}
