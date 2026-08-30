---
title: AI Agent Integration
nav:
  title: Guide
  order: 1
group:
  title: Guides
  order: 4
---

# AI Agent Integration Guide 🤖

A structured guide for AI Coding Assistants (Cursor, Claude Code, GitHub Copilot, Antigravity, ChatGPT, LLMs) to generate and configure `react-rotary-fab`.

---

## ⚡ Quick Reference for LLMs

```tsx | pure
import { RotaryFab, RotaryDial, Icons } from 'react-rotary-fab';
import 'react-rotary-fab/styles.css'; // Always import styles!
```

### Installation Commands

```bash
npm install react-rotary-fab
# or
pnpm add react-rotary-fab
# or
yarn add react-rotary-fab
```

---

## 🧩 Component Schema & APIs

### `<RotaryFab />` Properties

| Prop | Type | Default | Description |
| :--- | :--- | :--- | :--- |
| `items` | `RotaryFabItem[]` | `[]` | Array of action items to display on the concentric arcs. |
| `placement` | `'bottom-left' \| 'bottom-right' \| 'top-left' \| 'top-right'` | `'bottom-left'` | Corner quadrant anchor. |
| `theme` | `'luxury-watch' \| '3d' \| 'glassmorphic' \| 'cyberpunk' \| 'minimal-light' \| 'neon'` | `'luxury-watch'` | Built-in theme preset name. |
| `animationMode` | `'spring' \| 'stagger' \| 'spiral' \| 'fan' \| 'scale' \| 'elastic' \| 'fade' \| 'none'` | `'spring'` | Entrance physics transition style. |
| `showOrbitLines` | `boolean` | `true` | Show subtle concentric orbital track guide lines. |
| `showGlow` | `boolean` | `true` | Show studio ambient corner backlight glow. |
| `glowType` | `'radial' \| 'aurora' \| 'neon' \| 'none'` | `'radial'` | Ambient glow mode. |
| `enableHaptics` | `boolean` | `true` | Enable Web Vibration tactile feedback on mobile. |
| `dialMode` | `boolean` | `false` | Switch from action menu wheel into rotary dial mode. |
| `onDialModeChange` | `(isDial: boolean) => void` | `undefined` | Callback fired on dial mode toggle. |
| `dialProps` | `RotaryDialProps` | `{}` | Configuration for the rotary dial scrubber. |

---

## 🎯 Production Code Templates

### 1. Dual-Arc Media Controller with Precision Volume Scrubber

```tsx
import React, { useState } from 'react';
import { RotaryFab, Icons } from 'react-rotary-fab';

export default () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(70);
  const [isDialMode, setIsDialMode] = useState(false);

  const items = [
    // Tier 1 (Inner Arc)
    {
      id: 'vol',
      title: `Volume: ${volume}%`,
      icon: <Icons.Volume size={18} />,
      onClick: () => setIsDialMode(true),
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
      title: 'Mute Mic',
      icon: <Icons.MicOn size={18} />,
    },
    {
      id: 'cam',
      title: 'Video Camera',
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
      title: 'Queue',
      icon: <Icons.Layers size={18} />,
      hasBadge: 3,
    },
    {
      id: 'fs',
      title: 'Fullscreen',
      icon: <Icons.Fullscreen size={18} />,
    },
    {
      id: 'settings',
      title: 'Settings',
      icon: <Icons.Settings size={18} />,
    },
  ];

  return (
    <div style={{ height: 420, position: 'relative', background: '#07090e', borderRadius: 20, overflow: 'hidden' }}>
      <RotaryFab
        items={items}
        placement="bottom-left"
        theme="luxury-watch"
        animationMode="spring"
        showOrbitLines={true}
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
};
```

---

## 📋 Markdown Instruction File: `AGENTS.md`

You can also read the full standalone guide directly at [`AGENTS.md`](https://github.com/nikhileashy/react-rotary-fab/blob/main/AGENTS.md) in the project repository root.
