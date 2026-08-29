<p align="center">
  <img src="assets/banner.png" alt="react-rotary-fab banner" width="100%" style="border-radius: 12px;" />
</p>

# react-rotary-fab ⏱✨

[![npm version](https://img.shields.io/npm/v/react-rotary-fab.svg?color=38bdf8)](https://www.npmjs.com/package/react-rotary-fab)
[![Live Demo](https://img.shields.io/badge/Demo-rotary--fab.nacbots.com-38bdf8?logo=vercel)](https://rotary-fab.nacbots.com)
[![license](https://img.shields.io/npm/l/react-rotary-fab.svg?color=10b981)](https://github.com/nikhileashy/react-rotary-fab/blob/main/LICENSE)
[![bundle size](https://img.shields.io/bundlephobia/minzip/react-rotary-fab?color=8b5cf6)](https://bundlephobia.com/package/react-rotary-fab)
[![TypeScript](https://img.shields.io/badge/TypeScript-Ready-blue.svg)](https://www.typescriptlang.org/)

> A luxury watchmaker-inspired, highly customizable concentric rotary **Floating Action Button (FAB)** and precision **Rotary Arc Dial / Slider** for React.

---

## 🎬 Video Preview

<div align="center">
  <video src="assets/demo.mp4" controls width="100%" style="max-height: 480px; border-radius: 12px;"></video>
</div>

---

## 🌟 Highlights

- ⏱ **Concentric Multi-Tier Orbital Arcs**: Distribute 4, 10, or 20+ action items across balanced concentric arc tiers with smooth staggered entrance physics.
- 🧭 **4-Corner & Edge Quadrant Math**: Automatic trigonometric coordinate mapping for `bottom-left`, `bottom-right`, `top-left`, `top-right`, `bottom-center`, `top-center`, and `center`.
- 🎛 **Precision Watchmaker Rotary Dial / Slider**: Integrated or standalone rotary arc scrubber with celestial micro-dots, precision tick marks, luminous jewel thumb knob, and needle indicator.
- 📳 **Tactile Haptic Feedback Engine**: Safe Web Vibration API engine with realistic tactile patterns (`tick`, `light`, `medium`, `boundary`, `danger`, `toggle`).
- 🎨 **5 Built-in Luxury Themes**: `luxury-watch` (OLED obsidian & jewels), `glassmorphic` (frosted blur), `cyberpunk` (neon cyan & yellow), `minimal-light` (porcelain), and `neon` (ultra-violet).
- 💅 **Full CSS Variable Customization**: Customize colors, glows, blur, backdrop, and sizes with CSS variables or Tailwind.
- 🛡 **Zero Heavy UI Dependencies**: Completely standalone — includes built-in accessible tooltips, badge counts, and notifications with zero bundle bloat.
- ♿ **Full Accessibility**: Keyboard arrow controls (`ArrowUp/Down/Left/Right`, `PageUp/Down`, `Home/End`), mouse wheel support, and WCAG-compliant ARIA attributes.
- 📦 **100% TypeScript**: Comprehensive type definitions and JSDoc annotations.

---

## 📦 Installation

```bash
npm install react-rotary-fab
# or
yarn add react-rotary-fab
# or
pnpm add react-rotary-fab
```

Import the stylesheet in your root entry file (`App.tsx` or `index.tsx`):

```tsx
import 'react-rotary-fab/styles.css';
```

---

## 🚀 Quick Start

```tsx
import React, { useState } from 'react';
import { RotaryFab, Icons } from 'react-rotary-fab';
import 'react-rotary-fab/styles.css';

export default function App() {
  const [volume, setVolume] = useState(70);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isDialMode, setIsDialMode] = useState(false);

  const items = [
    // Tier 0: Quick Actions
    {
      id: 'vol',
      title: 'Precision Volume Dial',
      icon: <Icons.Volume />,
      onClick: () => setIsDialMode(true)
    },
    {
      id: 'play',
      title: isPlaying ? 'Pause' : 'Play',
      icon: isPlaying ? <Icons.Pause /> : <Icons.Play />,
      active: isPlaying,
      onClick: () => setIsPlaying(p => !p)
    },
    {
      id: 'mic',
      title: 'Microphone',
      icon: <Icons.MicOn />,
      danger: false
    },
    {
      id: 'settings',
      title: 'Settings',
      icon: <Icons.Settings />,
      hasBadge: true,
      onClick: () => console.log('Opened settings')
    }
  ];

  return (
    <div className="app-container">
      <RotaryFab
        items={items}
        placement="bottom-left"
        theme="luxury-watch"
        enableHaptics={true}
        dialMode={isDialMode}
        onDialModeChange={setIsDialMode}
        dialProps={{
          value: volume,
          min: 0,
          max: 100,
          step: 1,
          unit: '% VOL',
          onChange: setVolume
        }}
      />
    </div>
  );
}
```

---

## 🎛 Using the Standalone `RotaryDial`

You can also use the high-precision rotary arc slider anywhere as an independent component:

```tsx
import React, { useState } from 'react';
import { RotaryDial } from 'react-rotary-fab';

export function BrightnessControl() {
  const [brightness, setBrightness] = useState(80);

  return (
    <RotaryDial
      value={brightness}
      min={0}
      max={100}
      step={1}
      radius={130}
      placement="bottom-left"
      unit="% LUX"
      onChange={setBrightness}
      showTicks={true}
      showMicroDots={true}
      showNeedle={true}
      showGlow={true}
      enableHaptics={true}
    />
  );
}
```

---

## 📖 API Reference

### `<RotaryFab />` Props

| Prop | Type | Default | Description |
| :--- | :--- | :--- | :--- |
| `items` | `RotaryFabItem[]` | `[]` | Array of action menu items distributed across concentric arcs. |
| `placement` | `FabPlacement` | `'bottom-left'` | Corner or edge placement (`'bottom-left'`, `'bottom-right'`, `'top-left'`, `'top-right'`, `'bottom-center'`, `'top-center'`, `'center'`). |
| `theme` | `FabTheme` | `'luxury-watch'` | Preset theme (`'luxury-watch'`, `'glassmorphic'`, `'cyberpunk'`, `'minimal-light'`, `'neon'`). |
| `animationMode` | `AnimationMode` | `'spring'` | Animation mode: `'spring'`, `'stagger'`, `'spiral'`, `'fan'`, `'scale'`, `'elastic'`, `'fade'`, `'none'`. |
| `customTheme` | `Record<string, string>` | `undefined` | Custom CSS variable overrides. |
| `open` | `boolean` | `undefined` | Controlled open/expanded state. |
| `defaultOpen` | `boolean` | `false` | Uncontrolled default open state. |
| `onOpenChange` | `(open: boolean) => void` | `undefined` | Callback fired when open state changes. |
| `dialMode` | `boolean` | `undefined` | Controlled rotary dial/slider mode state. |
| `defaultDialMode` | `boolean` | `false` | Uncontrolled default dial mode state. |
| `onDialModeChange` | `(isDial: boolean) => void` | `undefined` | Callback fired when dial mode is toggled. |
| `dialProps` | `Partial<RotaryDialProps>` | `{}` | Options passed to the embedded rotary dial. |
| `arcConfigs` | `ArcTierConfig[]` | `[tier0, tier1, tier2]` | Custom radii and button sizes for concentric tiers. |
| `mainButtonSize` | `number` | `52` | Diameter of the main floating action button in pixels. |
| `mainButton` | `ReactNode \| ((state) => ReactNode)` | `undefined` | Custom render for the main FAB button. |
| `mainButtonIcon` | `ReactNode` | `<Icons.Menu />` | Custom closed icon. |
| `mainButtonCloseIcon`| `ReactNode` | `<Icons.Close />` | Custom open/expanded icon. |
| `mainButtonDialIcon` | `ReactNode` | `<Icons.Back />` | Custom dial mode active icon. |
| `autoCollapseTimeout`| `number \| null` | `9500` | Inactivity timer (in ms) to auto-collapse the menu. Set to `null` to disable. |
| `closeOnItemClick` | `boolean` | `true` | Auto-close menu when an item is clicked. |
| `closeOnOutsideClick`| `boolean` | `true` | Auto-close when clicking outside. |
| `enableHaptics` | `boolean` | `true` | Enable safe tactile vibration on supported devices. |
| `showOrbitLines` | `boolean` | `true` | Enable or disable concentric dashed SVG orbit guidelines. |
| `showCornerBackdrop`| `boolean` | `true` | Show ambient radial gradient corner backdrop. |
| `renderItem` | `(item, index, tier) => ReactNode` | `undefined` | Custom item renderer function. |

---

### `RotaryFabItem` Interface

```ts
interface RotaryFabItem {
  id: string;                                          // Unique identifier
  title?: string;                                      // Tooltip and accessible title
  icon?: React.ReactNode;                              // Icon element
  children?: React.ReactNode;                          // Custom button inner content
  onClick?: (event: React.MouseEvent) => void;         // Click handler
  active?: boolean;                                    // Active / highlighted state
  danger?: boolean;                                    // Danger / destructive action styling
  disabled?: boolean;                                  // Disabled state
  hasBadge?: boolean | string | number;                // Indicator dot or numerical count badge
  badgeColor?: string;                                 // Custom badge color
  tooltipPlacement?: 'top' | 'bottom' | 'left' | 'right' | 'auto'; // Tooltip direction
  ariaLabel?: string;                                  // Accessible ARIA label
  className?: string;                                  // Custom CSS class
  style?: React.CSSProperties;                         // Custom inline styles
  tier?: number;                                       // Explicit tier override (0 = innermost)
  haptic?: HapticType;                                 // Custom haptic pattern on click
}
```

---

### `<RotaryDial />` Props

| Prop | Type | Default | Description |
| :--- | :--- | :--- | :--- |
| `value` | `number` | `undefined` | Controlled value. |
| `defaultValue` | `number` | `50` | Uncontrolled default value. |
| `min` | `number` | `0` | Minimum value. |
| `max` | `number` | `100` | Maximum value. |
| `step` | `number` | `1` | Increment step. |
| `radius` | `number` | `124` | Radius of the dial arc in pixels. |
| `placement` | `FabPlacement` | `'bottom-left'` | Corner placement. |
| `unit` | `string` | `'% VOL'` | Unit suffix displayed in the chrono readout badge. |
| `label` | `string \| ((val) => ReactNode)` | `undefined` | Custom readout formatter. |
| `showTicks` | `boolean` | `true` | Render precision watch tick marks. |
| `tickCount` | `number` | `20` | Number of discrete tick marks. |
| `showMicroDots` | `boolean` | `true` | Render inner celestial micro-dot orbit. |
| `showNeedle` | `boolean` | `true` | Render watch dial needle on thumb. |
| `showGlow` | `boolean` | `true` | Enable glowing drop-shadow filters. |
| `enableHaptics` | `boolean` | `true` | Enable physical step haptics while dragging. |
| `onChange` | `(value: number) => void` | `undefined` | Callback fired on continuous dragging/scrubbing. |
| `onChangeEnd` | `(value: number) => void` | `undefined` | Callback fired when user releases pointer. |

---

## 🎨 Theming & CSS Variables

You can customize every aspect of the FAB using CSS variables:

```css
:root {
  --rf-bg-main: linear-gradient(135deg, #18191c 0%, #0d0e11 100%);
  --rf-bg-item: rgba(24, 25, 29, 0.88);
  --rf-bg-item-hover: rgba(42, 44, 52, 0.96);
  --rf-bg-item-active: #ffffff;
  --rf-border: rgba(255, 255, 255, 0.18);
  --rf-text: #ffffff;
  --rf-text-muted: rgba(255, 255, 255, 0.55);
  --rf-accent: #38bdf8;
  --rf-accent-glow: rgba(56, 189, 248, 0.75);
  --rf-danger: #ef4444;
  --rf-danger-glow: rgba(239, 68, 68, 0.7);
  --rf-track: rgba(255, 255, 255, 0.15);
  --rf-fill: #38bdf8;
  --rf-shadow: 0 8px 32px rgba(0, 0, 0, 0.65);
  --rf-tooltip-bg: #0f1013;
  --rf-tooltip-text: #ffffff;
}
```

Or pass `customTheme` directly to the component:

```tsx
<RotaryFab
  items={items}
  customTheme={{
    '--rf-accent': '#10b981',
    '--rf-accent-glow': 'rgba(16, 185, 129, 0.8)'
  }}
/>
```

---

## ⌨️ Accessibility & Controls

| Input | Action |
| :--- | :--- |
| `Pointer / Touch Drag` | Smooth circular scrubbing with physical step snapping |
| `ArrowUp` / `ArrowRight` | Increment value by `step` |
| `ArrowDown` / `ArrowLeft`| Decrement value by `step` |
| `PageUp` / `PageDown` | Increment / decrement by large step (`5 * step`) |
| `Home` / `End` | Snap directly to `min` / `max` |
| `Mouse Wheel` | Increment / decrement when hovering dial |
| `Space` / `Enter` | Toggle button activation |

---

## 👥 Contributors

<table>
  <tr>
    <td align="center">
      <a href="https://github.com/nikhileashy">
        <img src="https://github.com/nikhileashy.png?size=100" width="100px;" alt="nikhileashy" style="border-radius: 50%;" /><br />
        <sub><b>Nikhil Eashy</b></sub>
      </a><br />
      <sub>💻 Code, Architecture & Development</sub>
    </td>
    <td align="center">
      <a href="https://github.com/neehanazer">
        <img src="https://github.com/neehanazer.png?size=100" width="100px;" alt="neehanazer" style="border-radius: 50%;" /><br />
        <sub><b>Neeha Nazer</b></sub>
      </a><br />
      <sub>🎨 Design, Aesthetics & Concept Contribution</sub>
    </td>
  </tr>
</table>

---

## 🤝 Contributing

Contributions are welcome! Please check out [CONTRIBUTING.md](CONTRIBUTING.md) for details on setting up the development environment, running tests, and opening pull requests.

---

## 📄 License

MIT © [Nikhil Eashy](LICENSE)
