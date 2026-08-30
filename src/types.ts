import React from 'react';

/**
 * Screen placement for the Rotary FAB.
 * Controls the angle arc, origin, and corner transform.
 */
export type FabPlacement =
  | 'bottom-left'
  | 'bottom-right'
  | 'top-left'
  | 'top-right'
  | 'bottom-center'
  | 'top-center'
  | 'left-center'
  | 'right-center'
  | 'center';

/**
 * Built-in themes or custom string theme.
 */
export type FabTheme =
  | 'luxury-watch'
  | '3d'
  | 'glassmorphic'
  | 'cyberpunk'
  | 'minimal-light'
  | 'neon'
  | (string & {});

/**
 * Animation entrance/exit mode for the rotary items.
 */
export type AnimationMode =
  | 'spring'
  | 'stagger'
  | 'spiral'
  | 'fan'
  | 'scale'
  | 'fade'
  | 'elastic'
  | 'none';

/**
 * Ambient corner glow lighting styles.
 */
export type GlowType =
  | 'radial'
  | 'aurora'
  | 'neon'
  | 'none';

/**
 * Precision rotary arc slider visual styles.
 */
export type DialStyle =
  | 'watchmaker'
  | 'minimal'
  | 'cyber-segmented'
  | 'neon-glow'
  | 'retro-analog'
  | 'holographic';

/**
 * Visual variant / 3D styling for the main Floating Action Button.
 */
export type FabButtonVariant =
  | '3d'
  | 'glass'
  | 'flat'
  | 'neon'
  | 'luxury-chronograph';

/**
 * Safe tactile vibration haptic feedback patterns.
 */
export type HapticType =
  | 'tick'
  | 'light'
  | 'medium'
  | 'heavy'
  | 'click'
  | 'boundary'
  | 'toggle'
  | 'danger'
  | 'success'
  | number
  | number[];

/**
 * Configuration for an individual action item in the rotary wheel.
 */
export interface RotaryFabItem {
  /** Unique key/identifier */
  id: string;
  /** Accessible title and tooltip text */
  title?: string;
  /** Icon element (SVG, React component, etc.) */
  icon?: React.ReactNode;
  /** Custom children rendering instead of default icon */
  children?: React.ReactNode;
  /** Click callback */
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
  /** Whether the item is currently active / selected */
  active?: boolean;
  /** Whether the item represents a danger / destructive action */
  danger?: boolean;
  /** Whether the item is disabled */
  disabled?: boolean;
  /** Indicator badge (true for dot, or number/string for text badge) */
  hasBadge?: boolean | string | number;
  /** Custom badge color */
  badgeColor?: string;
  /** Tooltip placement */
  tooltipPlacement?: 'top' | 'bottom' | 'left' | 'right' | 'auto';
  /** Custom ARIA label */
  ariaLabel?: string;
  /** Custom CSS class */
  className?: string;
  /** Custom inline styles */
  style?: React.CSSProperties;
  /** Explicit concentric tier index override (0 = innermost) */
  tier?: number;
  /** Haptic feedback type on click (default: danger ? 'danger' : 'click') */
  haptic?: HapticType;
}

/**
 * Configuration for concentric arc tiers.
 */
export interface ArcTierConfig {
  /** Maximum number of items in this arc tier */
  maxCount?: number;
  /** Radius from origin in pixels */
  radius: number;
  /** Button diameter in pixels */
  btnSize?: number;
  /** Icon size in pixels */
  iconSize?: number;
  /** Custom start angle in degrees (overrides placement default) */
  startAngleDeg?: number;
  /** Custom end angle in degrees (overrides placement default) */
  endAngleDeg?: number;
}

/**
 * Dial tick mark object for rendering.
 */
export interface DialTick {
  id: string;
  x1: number;
  y1: number;
  x2: number;
  y2: number;
  isMajor: boolean;
  isActive: boolean;
  percent: number;
}

/**
 * Celestial micro-dot object for inner orbit rendering.
 */
export interface DialDot {
  id: string;
  x: number;
  y: number;
  isActive: boolean;
  isMajor: boolean;
  percent: number;
}

/**
 * Props for the precision Rotary Dial / Arc Slider.
 */
export interface RotaryDialProps {
  /** Current controlled value (min to max, default: 0 to 100 or 0 to 1) */
  value?: number;
  /** Default uncontrolled value */
  defaultValue?: number;
  /** Minimum slider value (default: 0) */
  min?: number;
  /** Maximum slider value (default: 100) */
  max?: number;
  /** Step increment (default: 1) */
  step?: number;
  /** Change callback when dragging or scrubbing */
  onChange?: (value: number) => void;
  /** Change callback triggered when user releases pointer */
  onChangeEnd?: (value: number) => void;
  /** Radius of the dial arch in pixels (default: 124) */
  radius?: number;
  /** Screen corner placement (default: 'bottom-left') */
  placement?: FabPlacement;
  /** Label readout formatter or string (e.g. `${val}% VOL`) */
  label?: string | ((value: number) => React.ReactNode);
  /** Suffix unit (default: '% VOL') */
  unit?: string;
  /** Whether to render precision watch tick marks (default: true) */
  showTicks?: boolean;
  /** Number of discrete tick marks (default: 20) */
  tickCount?: number;
  /** Whether to render inner celestial micro-dot orbit (default: true) */
  showMicroDots?: boolean;
  /** Number of micro-dots (default: 12) */
  dotCount?: number;
  /** Whether to render the precision needle on the thumb knob (default: true) */
  showNeedle?: boolean;
  /** Whether to render background track line (default: true) */
  showTrack?: boolean;
  /** Whether to render subtle concentric bezel guidelines (default: true) */
  showBezel?: boolean;
  /** Whether to enable glowing drop-shadow filters (default: true) */
  showGlow?: boolean;
  /** Enable tactile haptics on dial tick steps (default: true) */
  enableHaptics?: boolean;
  /** Precision rotary dial visual style (default: 'watchmaker') */
  dialStyle?: DialStyle;
  /** Theme name or custom theme */
  theme?: FabTheme;
  /** Custom CSS class name */
  className?: string;
  /** Custom inline style */
  style?: React.CSSProperties;
  /** Custom ARIA label for screen readers */
  ariaLabel?: string;
  /** Disabled state */
  disabled?: boolean;
}

/**
 * Props for the main Rotary FAB component.
 */
export interface RotaryFabProps {
  /** Array of menu action items */
  items?: RotaryFabItem[];
  /** Controlled open state */
  open?: boolean;
  /** Default open state (uncontrolled) */
  defaultOpen?: boolean;
  /** Open change callback */
  onOpenChange?: (open: boolean) => void;
  /** Placement quadrant or edge (default: 'bottom-left') */
  placement?: FabPlacement;
  /** Preset theme name (default: 'luxury-watch') */
  theme?: FabTheme;
  /** Animation entrance & exit mode (default: 'spring') */
  animationMode?: AnimationMode;
  /** Visual variant styling for the main FAB button (default: '3d') */
  mainButtonVariant?: FabButtonVariant;
  /** Custom theme CSS variable overrides */
  customTheme?: Record<string, string>;
  /** Concentric arc configurations */
  arcConfigs?: ArcTierConfig[];
  /** Custom main FAB button content or render function */
  mainButton?: React.ReactNode | ((state: { isOpen: boolean; isDialMode: boolean }) => React.ReactNode);
  /** Custom icon when closed */
  mainButtonIcon?: React.ReactNode;
  /** Custom icon when open */
  mainButtonCloseIcon?: React.ReactNode;
  /** Custom icon when dial mode is active */
  mainButtonDialIcon?: React.ReactNode;
  /** Main button diameter in pixels (default: 52) */
  mainButtonSize?: number;
  /** Custom main button className */
  mainButtonClassName?: string;
  /** Custom main button inline style */
  mainButtonStyle?: React.CSSProperties;
  /** Main button accessible ARIA label */
  mainButtonAriaLabel?: string;

  /** Whether the rotary dial/slider mode is currently active */
  dialMode?: boolean;
  /** Default dial mode (uncontrolled) */
  defaultDialMode?: boolean;
  /** Callback when dial mode is toggled */
  onDialModeChange?: (isDialMode: boolean) => void;
  /** Props forwarded to the embedded RotaryDial when dialMode is active */
  dialProps?: Partial<RotaryDialProps>;

  /** Inactivity auto-collapse timer in ms (default: 9500, set to 0 or null to disable) */
  autoCollapseTimeout?: number | null;
  /** Whether clicking an item automatically closes the rotary wheel (default: true) */
  closeOnItemClick?: boolean;
  /** Whether clicking outside closes the rotary wheel (default: true) */
  closeOnOutsideClick?: boolean;
  /** Enable tactile haptic vibration feedback (default: true) */
  enableHaptics?: boolean;
  /** Show concentric dashed SVG orbit lines (default: true) */
  showOrbitLines?: boolean;
  /** Show subtle ambient corner gradient background (default: true) */
  showCornerBackdrop?: boolean;
  /** Show ambient corner glow (alias for showCornerBackdrop, default: true) */
  showGlow?: boolean;
  /** Ambient corner glow style (default: 'radial') */
  glowType?: GlowType;
  /** Custom ambient glow color override (e.g. 'rgba(56, 189, 248, 0.4)' or '#38bdf8') */
  glowColor?: string;
  /** Custom item renderer override */
  renderItem?: (item: RotaryFabItem, index: number, tierIndex: number) => React.ReactNode;
  /** Custom root className */
  className?: string;
  /** Custom root inline style */
  style?: React.CSSProperties;
  /** Custom children (rendered inside the container) */
  children?: React.ReactNode;
}
