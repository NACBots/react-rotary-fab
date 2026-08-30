---
hero:
  title: react-rotary-fab
  description: A luxury watchmaker-inspired, highly customizable concentric rotary Floating Action Button (FAB) and precision arc dial for React.
  actions:
    - text: Getting Started
      link: /guide
    - text: Interactive Studio
      link: /components/interactive-studio
features:
  - title: ⏱ Concentric Multi-Tier Arcs
    emoji: ⏱
    description: Distribute 4, 10, or 20+ action items across balanced concentric orbital tiers with smooth physics.
  - title: 🧭 4-Corner Smart Trigonometry
    emoji: 🧭
    description: Automatic quadrant coordinate mapping for bottom-left, bottom-right, top-left, top-right, and screen edges.
  - title: 🎛 Precision Rotary Arc Scrubber
    emoji: 🎛
    description: Watchmaker dial with celestial micro-dots, precision tick marks, luminous jewel thumb knob, and needle indicator.
  - title: ⚡ 8 Physics Animation Modes
    emoji: ⚡
    description: Spring, stagger, spiral, fan, scale, elastic, fade, and instant transitions.
  - title: 📳 Tactile Web Haptics
    emoji: 📳
    description: Safe Web Vibration API engine with realistic tactile click, tick, boundary, and danger patterns.
  - title: 🎨 5 Luxury Themes
    emoji: 🎨
    description: OLED Luxury Watch, Glassmorphic frosted blur, Cyberpunk Neon, Minimal Light, and Neon Nebula.
---

## 🎬 Live Interactive Hero Preview

```tsx
import React, { useState } from 'react';
import { RotaryFab, Icons } from 'react-rotary-fab';

export default () => {
  const [isPlaying, setIsPlaying] = useState(true);
  const [isDialMode, setIsDialMode] = useState(false);
  const [volume, setVolume] = useState(75);

  const items = [
    {
      id: 'vol',
      title: 'Precision Volume Dial',
      icon: <Icons.Volume size={18} />,
      onClick: () => setIsDialMode(true),
    },
    {
      id: 'play',
      title: isPlaying ? 'Pause Stream' : 'Play Stream',
      icon: isPlaying ? <Icons.Pause size={18} /> : <Icons.Play size={18} />,
      active: isPlaying,
      onClick: () => setIsPlaying(p => !p),
    },
    {
      id: 'mic',
      title: 'Microphone',
      icon: <Icons.MicOn size={18} />,
    },
    {
      id: 'layers',
      title: 'Layers Panel',
      icon: <Icons.Layers size={18} />,
      hasBadge: 3,
    },
    {
      id: 'brush',
      title: 'Brush Tool',
      icon: <Icons.Brush size={18} />,
    },
    {
      id: 'settings',
      title: 'Settings',
      icon: <Icons.Settings size={18} />,
    },
  ];

  return (
    <div style={{
      height: 380,
      width: '100%',
      position: 'relative',
      background: '#07090e',
      borderRadius: 20,
      border: '1px solid rgba(255, 255, 255, 0.08)',
      overflow: 'hidden',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center'
    }}>
      <div style={{ textAlign: 'center', color: '#94a3b8', fontSize: 13, fontFamily: 'monospace', zIndex: 1, pointerEvents: 'none' }}>
        <p style={{ color: '#fff', fontSize: 18, fontWeight: 700, marginBottom: 4, letterSpacing: -0.5 }}>
          {isDialMode ? `Volume: ${volume}%` : isPlaying ? '▶ Media Playing' : '⏸ Media Paused'}
        </p>
        <p>Click the bottom-left FAB to interact with the rotary arcs</p>
      </div>

      <RotaryFab
        items={items}
        placement="bottom-left"
        theme="luxury-watch"
        animationMode="spring"
        showOrbitLines={true}
        enableHaptics={true}
        style={{ position: 'absolute', zIndex: 20 }}
        dialMode={isDialMode}
        onDialModeChange={setIsDialMode}
        dialProps={{
          value: volume,
          min: 0,
          max: 100,
          step: 1,
          unit: '% VOL',
          onChange: setVolume,
        }}
      />
    </div>
  );
};
```

---

## ⚡ Quick Install

```bash
npm install react-rotary-fab
# or
yarn add react-rotary-fab
# or
pnpm add react-rotary-fab
```
