import '@testing-library/jest-dom';

// Mock navigator.vibrate
if (typeof navigator !== 'undefined') {
  Object.defineProperty(navigator, 'vibrate', {
    value: () => true,
    writable: true,
    configurable: true
  });
}

// Mock SVG setPointerCapture and releasePointerCapture
if (typeof window !== 'undefined') {
  Element.prototype.setPointerCapture = () => {};
  Element.prototype.releasePointerCapture = () => {};
}
