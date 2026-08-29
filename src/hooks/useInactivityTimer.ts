import { useEffect, useRef } from 'react';

/**
 * Automatically calls onTimeout after a specified duration of inactivity (mouse, touch, key).
 */
export function useInactivityTimer(
  isActive: boolean,
  onTimeout: () => void,
  timeoutMs: number | null = 9500,
  preventTimeout: boolean = false
): void {
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    if (!isActive || !timeoutMs || timeoutMs <= 0) return;

    const resetTimer = () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
      if (!preventTimeout) {
        timeoutRef.current = setTimeout(() => {
          onTimeout();
        }, timeoutMs);
      }
    };

    resetTimer();

    const events = ['mousemove', 'touchstart', 'touchmove', 'keydown', 'wheel'];
    events.forEach(event => {
      window.addEventListener(event, resetTimer, { passive: true });
    });

    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
      events.forEach(event => {
        window.removeEventListener(event, resetTimer);
      });
    };
  }, [isActive, onTimeout, timeoutMs, preventTimeout]);
}
