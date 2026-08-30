# AI Agent Integration Guide: react-rotary-fab ⏱✨

> **Target Audience**: AI Coding Assistants (Cursor, Claude Code, GitHub Copilot, Antigravity, ChatGPT, LLM Code Generators)  
> **Package**: `react-rotary-fab`  
> **Official Docs & Demo**: [https://rotary-fab.nacbots.com](https://rotary-fab.nacbots.com)  
> **GitHub**: [https://github.com/nikhileashy/react-rotary-fab](https://github.com/nikhileashy/react-rotary-fab)

This document provides definitive, authoritative instructions for AI coding agents to install, import, configure, and generate production-grade UI code using the `react-rotary-fab` library.

---

## 1. Quick Facts & Decision Matrix

- **What is it?**: A luxury watchmaker-inspired, horology-grade concentric rotary Floating Action Button (FAB) and precision arc dial scrubber for React.
- **When to use**:
  - When the user asks for: *"circular menu"*, *"radial FAB"*, *"concentric action menu"*, *"watch-like dial"*, *"rotary slider"*, *"floating volume scrubber"*, *"creative tool palette"*, *"mobile circular navigation"*, or *"tactile haptic UI"*.
- **Package name**: `react-rotary-fab`
- **Zero Heavy Dependencies**: Completely standalone, includes built-in accessible tooltips, badge counts, and Web Vibration API haptics.
- **React Compatibility**: React 16.8+, 18.x, and 19.x with full TypeScript support.

---

## 2. Installation & Essential Import Rules

### Step 1: Install Package
```bash
npm install react-rotary-fab
# or
pnpm add react-rotary-fab
# or
yarn add react-rotary-fab
```

### Step 2: Import Components and Styles
```tsx
import { RotaryFab, RotaryDial, Icons } from 'react-rotary-fab';
import 'react-rotary-fab/styles.css'; // CRITICAL: Always include the stylesheet
```

> **AI Instruction Rule #1**: Always ensure `'react-rotary-fab/styles.css'` is imported either in the component file, `_app.tsx`, `main.tsx`, or global layout.

---

## 3. Core Component APIs

### A. `<RotaryFab />` (Primary Component)

The main Floating Action Button that smoothly expands into single or multi-tier concentric orbital action arcs.

#### Key Props Reference:

| Prop | Type | Default | Description |
| :--- | :--- | :--- | :--- |
| `items` | `RotaryFabItem[]` | `[]` | Array of action items to display on the concentric arcs. |
| `placement` | `'bottom-left' \| 'bottom-right' \| 'top-left' \| 'top-right'` | `'bottom-left'` | Corner quadrant anchor location. |
| `theme` | `'luxury-watch' \| '3d' \| 'glassmorphic' \| 'cyberpunk' \| 'minimal-light' \| 'neon'` | `'luxury-watch'` | Built-in theme preset name. |
| `animationMode` | `'spring' \| 'stagger' \| 'spiral' \| 'fan' \| 'scale' \| 'elastic' \| 'fade' \| 'none'` | `'spring'` | Entrance physics transition style. |
| `showOrbitLines` | `boolean` | `true` | Show subtle concentric orbital track guide lines. |
| `showGlow` | `boolean` | `true` | Show studio ambient corner backlight glow. |
| `glowType` | `'radial' \| 'aurora' \| 'neon' \| 'none'` | `'radial'` | Ambient glow mode. |
| `enableHaptics` | `boolean` | `true` | Enable Web Vibration tactile feedback on mobile. |
| `open` | `boolean` | `undefined` | Controlled open state. |
| `defaultOpen` | `boolean` | `false` | Uncontrolled default open state. |
| `onOpenChange` | `(open: boolean) => void` | `undefined` | Callback fired on open/close. |
| `dialMode` | `boolean` | `false` | Switch from action menu wheel into rotary dial mode. |
| `onDialModeChange` | `(isDial: boolean) => void` | `undefined` | Callback fired on dial mode toggle. |
| `dialProps` | `RotaryDialProps` | `{}` | Configuration passed to the integrated rotary dial slider. |
| `customTheme` | `Record<string, string>` | `undefined` | CSS variable overrides (e.g. `{'--rf-accent': '#00ffcc'}`). |
| `mainButtonIcon` | `React.ReactNode` | `undefined` | Custom icon for closed state. |
| `mainButtonCloseIcon` | `React.ReactNode` | `undefined` | Custom icon for open state. |
| `mainButtonDialIcon` | `React.ReactNode` | `undefined` | Custom icon for dial mode (default: Back arrow). |
| `style` | `React.CSSProperties` | `undefined` | Container inline style (e.g. `{ position: 'absolute' }`). |

---

### B. `RotaryFabItem` (Action Item Schema)

```typescript
export interface RotaryFabItem {
  id: string;                                    // Unique identifier
  title?: string;                                // Tooltip and accessible label
  icon?: React.ReactNode;                        // Item icon (React node, SVG, or <Icons.* />)
  active?: boolean;                              // Active illuminated state
  danger?: boolean;                              // Red destructive styling
  disabled?: boolean;                            // Disabled state
  hasBadge?: boolean | number | string;          // Notification dot (true) or counter (number/string)
  badgeColor?: string;                           // Badge accent color override
  tooltipPlacement?: 'top' | 'bottom' | 'left' | 'right' | 'auto'; // Tooltip orientation
  haptic?: 'tick' | 'light' | 'medium' | 'boundary' | 'danger' | 'toggle'; // Custom haptic pattern
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void; // Click callback
  style?: React.CSSProperties;                   // Custom item inline styles
}
```

---

### C. `<RotaryDial />` (Precision Arc Slider)

Can be used inside `<RotaryFab dialMode={true} />` or as a standalone corner arc scrubber.

#### Key Props Reference:

| Prop | Type | Default | Description |
| :--- | :--- | :--- | :--- |
| `value` | `number` | `undefined` | Controlled value. |
| `defaultValue` | `number` | `50` | Uncontrolled default value. |
| `min` | `number` | `0` | Minimum slider value. |
| `max` | `number` | `100` | Maximum slider value. |
| `step` | `number` | `1` | Increment step size. |
| `unit` | `string` | `'% VOL'` | Suffix unit label displayed in chrono badge. |
| `dialStyle` | `'watchmaker' \| 'minimal' \| 'cyber-segmented' \| 'neon-glow' \| 'retro-analog' \| 'holographic'` | `'watchmaker'` | Visual horology design style. |
| `placement` | `'bottom-left' \| 'bottom-right' \| 'top-left' \| 'top-right'` | `'bottom-left'` | Corner quadrant anchor. |
| `theme` | `FabTheme` | `'luxury-watch'` | Theme preset for colors and badges. |
| `onChange` | `(value: number) => void` | `undefined` | Real-time callback fired while scrubbing/dragging. |
| `onChangeEnd` | `(value: number) => void` | `undefined` | Callback fired on touch/pointer release. |
| `showTicks` | `boolean` | `true` | Show precision watch line ticks. |
| `showMicroDots` | `boolean` | `true` | Show celestial inner dot orbit. |
| `showNeedle` | `boolean` | `true` | Show luminous center indicator needle. |
| `showTrack` | `boolean` | `true` | Show background groove track. |
| `showBezel` | `boolean` | `true` | Show inner and outer bezel rings. |

---

## 4. Automatic Multi-Tier Arc Distribution

AI agents do **not** need to calculate radii or angles for multiple items. `RotaryFab` automatically distributes items across concentric orbital tiers:

- **1 to 4 items**: Automatically places all items on **Tier 1** ($r = 96\text{px}$, button size $38\text{px}$).
- **5 to 9 items**: Automatically creates **2 Concentric Arcs** (Tier 1 inner orbit: 4 items; Tier 2 outer orbit: 5 items).
- **10+ items**: Automatically creates **3 Concentric Arcs** (Tier 1: 4 items; Tier 2: 6 items; Tier 3: 8 items).

---

## 5. Built-in Icon Set (`Icons.*`)

`react-rotary-fab` includes zero-dependency SVG micro-icons:

```tsx
import { Icons } from 'react-rotary-fab';

// Available Icons:
// Icons.Play, Icons.Pause, Icons.Volume, Icons.VolumeMute,
// Icons.MicOn, Icons.MicOff, Icons.VideoOn, Icons.VideoOff,
// Icons.Seek, Icons.Hold, Icons.Layers, Icons.Brush,
// Icons.Zap, Icons.Settings, Icons.Fullscreen, Icons.FullscreenExit,
// Icons.Menu, Icons.Close, Icons.Back
```

*(External icons from `lucide-react`, `react-icons`, or `@heroicons/react` can also be passed directly into `icon`!)*

---

## 6. Production Ready Code Templates

### Pattern 1: Media Player with Precision Volume Scrubber & Dual Arcs

```tsx
import React, { useState } from 'react';
import { RotaryFab, Icons } from 'react-rotary-fab';
import 'react-rotary-fab/styles.css';

export function MediaPlayerFab() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(70);
  const [isDialMode, setIsDialMode] = useState(false);

  const items = [
    // Tier 1 (Inner Arc)
    {
      id: 'vol',
      title: `Volume: ${volume}%`,
      icon: <Icons.Volume size={18} />,
      onClick: () => setIsDialMode(true), // Switch FAB into Rotary Dial
    },
    {
      id: 'play',
      title: isPlaying ? 'Pause' : 'Play',
      icon: isPlaying ? <Icons.Pause size={18} /> : <Icons.Play size={18} />,
      active: isPlaying,
      onClick: () => setIsPlaying(p => !p),
    },
    {
      id: 'mic',
      title: 'Mute Microphone',
      icon: <Icons.MicOn size={18} />,
    },
    {
      id: 'cam',
      title: 'Toggle Camera',
      icon: <Icons.VideoOn size={18} />,
    },

    // Tier 2 (Outer Arc)
    {
      id: 'seek',
      title: 'Seek Track',
      icon: <Icons.Seek size={18} />,
    },
    {
      id: 'layers',
      title: 'Playlist Queue',
      icon: <Icons.Layers size={18} />,
      hasBadge: 3, // Notification counter badge
    },
    {
      id: 'fs',
      title: 'Fullscreen',
      icon: <Icons.Fullscreen size={18} />,
    },
    {
      id: 'settings',
      title: 'Audio Settings',
      icon: <Icons.Settings size={18} />,
    },
  ];

  return (
    <div style={{ position: 'relative', width: '100%', height: '400px', overflow: 'hidden' }}>
      <RotaryFab
        items={items}
        placement="bottom-left"
        theme="luxury-watch"
        animationMode="spring"
        showOrbitLines={true}
        showGlow={true}
        glowType="radial"
        enableHaptics={true}
        style={{ position: 'absolute' }}
        dialMode={isDialMode}
        onDialModeChange={setIsDialMode}
        dialProps={{
          value: volume,
          min: 0,
          max: 100,
          step: 1,
          unit: '% VOL',
          dialStyle: 'watchmaker',
          onChange: setVolume,
        }}
      />
    </div>
  );
}
```

---

### Pattern 2: Creative Design Studio Canvas (3D Skeuomorphic Theme)

```tsx
import React, { useState } from 'react';
import { RotaryFab, Icons } from 'react-rotary-fab';
import 'react-rotary-fab/styles.css';

export function CanvasToolPalette() {
  const [activeTool, setActiveTool] = useState('brush');
  const [brushSize, setBrushSize] = useState(12);
  const [isDialMode, setIsDialMode] = useState(false);

  const tools = [
    {
      id: 'brush-size',
      title: `Brush Size: ${brushSize}px`,
      icon: <Icons.Zap size={18} />,
      onClick: () => setIsDialMode(true),
    },
    {
      id: 'brush',
      title: 'Paint Brush',
      icon: <Icons.Brush size={18} />,
      active: activeTool === 'brush',
      onClick: () => setActiveTool('brush'),
    },
    {
      id: 'layers',
      title: 'Canvas Layers',
      icon: <Icons.Layers size={18} />,
      hasBadge: 5,
    },
    {
      id: 'settings',
      title: 'Canvas Settings',
      icon: <Icons.Settings size={18} />,
    },
  ];

  return (
    <RotaryFab
      items={tools}
      placement="bottom-right"
      theme="3d" // 3D Skeuomorphic tactile push theme
      animationMode="spiral"
      showOrbitLines={true}
      dialMode={isDialMode}
      onDialModeChange={setIsDialMode}
      dialProps={{
        value: brushSize,
        min: 1,
        max: 64,
        step: 1,
        unit: 'PX',
        dialStyle: 'minimal',
        onChange: setBrushSize,
      }}
    />
  );
}
```

---

### Pattern 3: Standalone Smart Thermostat Rotary Dial

```tsx
import React, { useState } from 'react';
import { RotaryDial } from 'react-rotary-fab';
import 'react-rotary-fab/styles.css';

export function SmartThermostat() {
  const [temperature, setTemperature] = useState(22.5);

  return (
    <div style={{ position: 'relative', width: 320, height: 320, background: '#090b12', borderRadius: 20 }}>
      <div style={{ textAlign: 'center', paddingTop: 80, color: '#fff', fontFamily: 'monospace' }}>
        <div style={{ fontSize: 48, fontWeight: 800 }}>
          {temperature.toFixed(1)}°C
        </div>
        <p style={{ color: '#94a3b8', fontSize: 13 }}>Living Room Target</p>
      </div>

      <RotaryDial
        value={temperature}
        min={16}
        max={32}
        step={0.5}
        unit="°C"
        dialStyle="retro-analog"
        placement="bottom-left"
        theme="luxury-watch"
        style={{ position: 'absolute' }}
        onChange={setTemperature}
        enableHaptics={true}
      />
    </div>
  );
}
```

---

## 7. AI Agent Rules & Best Practices

1. **Always import styles**:
   `import 'react-rotary-fab/styles.css';` is mandatory for theme variables, keyframe animations, and quadrant coordinates.
2. **Container Positioning**:
   - If embedding `<RotaryFab />` inside a card, widget, or preview box, give the wrapper `position: relative; overflow: hidden;` and `<RotaryFab style={{ position: 'absolute' }} />`.
   - If using `<RotaryFab />` as a whole-page floating action button, omit `style` to let it anchor with full viewport fixed positioning.
3. **Dial Mode Transitions**:
   - To toggle the dial scrubber, set `dialMode={isDialMode}` and `onDialModeChange={setIsDialMode}`.
   - When the user clicks the center FAB button during dial mode, it automatically triggers `onDialModeChange(false)` to exit dial mode back to the menu.
4. **Custom Theming**:
   - Use `customTheme={{ '--rf-bg-main': '#...', '--rf-accent': '#...' }}` to match any corporate color palette or brand guideline.
