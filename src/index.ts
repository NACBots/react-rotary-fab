// Import default styles for sideEffects bundlers if needed
import './styles/rotary-fab.css';

// Components
export { RotaryFab } from './RotaryFab';
export { RotaryDial } from './RotaryDial';
export { RotaryItem } from './RotaryItem';
export { OrbitTracks } from './OrbitTracks';

// Icons
export { Icons } from './icons';

// Hooks
export { useRotaryDrag } from './hooks/useRotaryDrag';
export { useHaptic } from './hooks/useHaptic';
export { useOutsideClick } from './hooks/useOutsideClick';
export { useInactivityTimer } from './hooks/useInactivityTimer';

// Utilities
export {
  polarToCartesian,
  describeArc,
  getPlacementAngleSpan,
  getSvgViewBox,
  calculatePointerNormalized,
  generateWatchDialTicks,
  generateCelestialDots
} from './utils/geometry';
export { triggerHaptic } from './utils/haptics';
export { THEMES, getThemeStyle } from './utils/themes';

// Types
export type {
  FabPlacement,
  FabTheme,
  AnimationMode,
  GlowType,
  DialStyle,
  FabButtonVariant,
  HapticType,
  RotaryFabItem,
  ArcTierConfig,
  RotaryDialProps,
  RotaryFabProps,
  DialTick,
  DialDot
} from './types';
export type { ThemeConfig } from './utils/themes';
export type { RotaryItemProps } from './RotaryItem';
export type { OrbitTracksProps } from './OrbitTracks';
export type { UseRotaryDragOptions } from './hooks/useRotaryDrag';
export type { UseHapticReturn } from './hooks/useHaptic';
export type { IconProps } from './icons';
