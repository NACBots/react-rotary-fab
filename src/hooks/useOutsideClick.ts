import { useEffect, RefObject } from 'react';

/**
 * Detects clicks outside the specified element ref and invokes the handler callback.
 */
export function useOutsideClick(
  ref: RefObject<HTMLElement | null>,
  handler: (event: PointerEvent | MouseEvent | TouchEvent) => void,
  enabled: boolean = true
): void {
  useEffect(() => {
    if (!enabled) return;

    const listener = (event: PointerEvent) => {
      const target = event.target as Node | null;
      if (!target || !ref.current) return;
      if (ref.current.contains(target)) return;

      handler(event);
    };

    document.addEventListener('pointerdown', listener);
    return () => {
      document.removeEventListener('pointerdown', listener);
    };
  }, [ref, handler, enabled]);
}
