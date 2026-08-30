---
title: RotaryFab
nav:
  title: RotaryFab
  order: 2
---

# RotaryFab

The primary floating action button component that expands into single or multi-tier concentric orbital action arcs.

## 🎨 6 Built-in Themes Showcase

Switch between the 6 built-in themes (`luxury-watch`, `3d`, `glassmorphic`, `cyberpunk`, `minimal-light`, `neon`):

```tsx
import React, { useState } from 'react';
import { RotaryFab, FabTheme, Icons } from 'react-rotary-fab';

export default () => {
  const [theme, setTheme] = useState<FabTheme>('luxury-watch');

  const items = [
    { id: '1', title: 'Speed Turbo', icon: <Icons.Zap size={18} /> },
    { id: '2', title: 'Brush Tool', icon: <Icons.Brush size={18} /> },
    { id: '3', title: 'Layers', icon: <Icons.Layers size={18} /> },
    { id: '4', title: 'Settings', icon: <Icons.Settings size={18} /> },
  ];

  return (
    <div style={{
      width: '100%',
      display: 'flex',
      flexDirection: 'column',
      background: theme === 'minimal-light' ? '#ffffff' : '#080a10',
      borderRadius: 16,
      border: '1px solid rgba(255,255,255,0.08)',
      overflow: 'hidden',
      transition: 'background 0.3s ease'
    }}>
      {/* Control Header */}
      <div style={{
        padding: '8px 12px',
        background: theme === 'minimal-light' ? '#f8fafc' : 'rgba(255, 255, 255, 0.03)',
        borderBottom: theme === 'minimal-light' ? '1px solid #e2e8f0' : '1px solid rgba(255, 255, 255, 0.08)',
        display: 'flex',
        gap: 6,
        flexWrap: 'wrap',
        justifyContent: 'center'
      }}>
        {(['luxury-watch', '3d', 'glassmorphic', 'cyberpunk', 'minimal-light', 'neon'] as FabTheme[]).map(t => (
          <button
            key={t}
            onClick={() => setTheme(t)}
            style={{
              padding: '4px 10px',
              fontSize: 11,
              borderRadius: 6,
              background: theme === t ? '#38bdf8' : 'rgba(255,255,255,0.06)',
              color: theme === t ? '#000' : theme === 'minimal-light' ? '#0f172a' : '#cbd5e1',
              fontWeight: 600,
              border: 'none',
              cursor: 'pointer'
            }}
          >
            {t}
          </button>
        ))}
      </div>

      {/* Interactive Area */}
      <div style={{ height: 340, position: 'relative', overflow: 'hidden' }}>
        <RotaryFab
          items={items}
          placement="bottom-left"
          theme={theme}
          showOrbitLines={true}
          style={{ position: 'absolute' }}
        />
      </div>
    </div>
  );
};
```

---

## ⏱ Multi-Tier Concentric Dual Arcs (2-Arc Menu)

Distribute 8 or more action items automatically across **2 concentric orbital arcs** (Tier 1: inner orbit, Tier 2: outer orbit):

```tsx
import React, { useState } from 'react';
import { RotaryFab, FabTheme, Icons } from 'react-rotary-fab';

export default () => {
  const [theme, setTheme] = useState<FabTheme>('luxury-watch');

  const items = [
    // Tier 1 (Inner Arc - 4 items)
    { id: '1', title: 'Play / Pause', icon: <Icons.Play size={18} /> },
    { id: '2', title: 'Volume Scrubber', icon: <Icons.Volume size={18} /> },
    { id: '3', title: 'Microphone', icon: <Icons.MicOn size={18} /> },
    { id: '4', title: 'Video Camera', icon: <Icons.VideoOn size={18} /> },

    // Tier 2 (Outer Arc - 5 items)
    { id: '5', title: 'Seek Track', icon: <Icons.Seek size={18} /> },
    { id: '6', title: 'Hold Call', icon: <Icons.Hold size={18} /> },
    { id: '7', title: 'Layers Panel', icon: <Icons.Layers size={18} />, hasBadge: 4 },
    { id: '8', title: 'Fullscreen', icon: <Icons.Fullscreen size={18} /> },
    { id: '9', title: 'Settings', icon: <Icons.Settings size={18} /> },
  ];

  return (
    <div style={{
      width: '100%',
      display: 'flex',
      flexDirection: 'column',
      background: theme === 'minimal-light' ? '#ffffff' : '#07090e',
      borderRadius: 20,
      border: '1px solid rgba(255,255,255,0.08)',
      overflow: 'hidden',
      transition: 'background 0.3s ease'
    }}>
      {/* Control Header */}
      <div style={{
        padding: '8px 12px',
        background: theme === 'minimal-light' ? '#f8fafc' : 'rgba(255, 255, 255, 0.03)',
        borderBottom: theme === 'minimal-light' ? '1px solid #e2e8f0' : '1px solid rgba(255, 255, 255, 0.08)',
        display: 'flex',
        gap: 6,
        flexWrap: 'wrap',
        justifyContent: 'center'
      }}>
        {(['luxury-watch', '3d', 'glassmorphic', 'cyberpunk', 'minimal-light', 'neon'] as FabTheme[]).map(t => (
          <button
            key={t}
            onClick={() => setTheme(t)}
            style={{
              padding: '4px 10px',
              fontSize: 11,
              borderRadius: 6,
              background: theme === t ? '#38bdf8' : 'rgba(255,255,255,0.06)',
              color: theme === t ? '#000' : theme === 'minimal-light' ? '#0f172a' : '#cbd5e1',
              fontWeight: 600,
              border: 'none',
              cursor: 'pointer'
            }}
          >
            {t}
          </button>
        ))}
      </div>

      {/* Interactive Area */}
      <div style={{ height: 420, position: 'relative', overflow: 'hidden' }}>
        <RotaryFab
          items={items}
          placement="bottom-left"
          theme={theme}
          animationMode="spring"
          showOrbitLines={true}
          style={{ position: 'absolute' }}
        />
      </div>
    </div>
  );
};
```

---

## 🌌 Corner Ambient Glow Modes

Control the ambient corner backlight with 3 studio-grade glow styles (`radial`, `aurora`, `neon`):

```tsx
import React, { useState } from 'react';
import { RotaryFab, GlowType, Icons } from 'react-rotary-fab';

export default () => {
  const [glowType, setGlowType] = useState<GlowType>('radial');
  const [showGlow, setShowGlow] = useState(true);

  const items = [
    { id: '1', title: 'Action 1', icon: <Icons.Zap size={18} /> },
    { id: '2', title: 'Action 2', icon: <Icons.Brush size={18} /> },
    { id: '3', title: 'Action 3', icon: <Icons.Settings size={18} /> },
  ];

  return (
    <div style={{
      width: '100%',
      display: 'flex',
      flexDirection: 'column',
      background: '#05070c',
      borderRadius: 16,
      border: '1px solid rgba(255,255,255,0.08)',
      overflow: 'hidden'
    }}>
      {/* Control Header */}
      <div style={{
        padding: '8px 12px',
        background: 'rgba(255, 255, 255, 0.03)',
        borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
        display: 'flex',
        gap: 6,
        justifyContent: 'center',
        alignItems: 'center'
      }}>
        {(['radial', 'aurora', 'neon'] as GlowType[]).map(g => (
          <button
            key={g}
            onClick={() => setGlowType(g)}
            style={{
              padding: '4px 10px',
              fontSize: 11,
              borderRadius: 6,
              background: glowType === g ? '#38bdf8' : 'rgba(255,255,255,0.06)',
              color: glowType === g ? '#000' : '#cbd5e1',
              fontWeight: 600,
              border: 'none',
              cursor: 'pointer'
            }}
          >
            {g}
          </button>
        ))}
        <button
          onClick={() => setShowGlow(g => !g)}
          style={{
            padding: '4px 10px',
            fontSize: 11,
            borderRadius: 6,
            background: showGlow ? '#10b981' : 'rgba(255,255,255,0.06)',
            color: showGlow ? '#000' : '#cbd5e1',
            fontWeight: 600,
            border: 'none',
            cursor: 'pointer'
          }}
        >
          Glow: {showGlow ? 'ON' : 'OFF'}
        </button>
      </div>

      {/* Interactive Area */}
      <div style={{ height: 320, position: 'relative', overflow: 'hidden' }}>
        <RotaryFab
          items={items}
          showGlow={showGlow}
          glowType={glowType}
          placement="bottom-left"
          theme="luxury-watch"
          style={{ position: 'absolute' }}
        />
      </div>
    </div>
  );
};
```

---

## ⚡ 8 Animation Physics Modes

Test the 8 entrance animations (`spring`, `stagger`, `spiral`, `fan`, `scale`, `elastic`, `fade`, `none`):

```tsx
import React, { useState } from 'react';
import { RotaryFab, AnimationMode, Icons } from 'react-rotary-fab';

export default () => {
  const [anim, setAnim] = useState<AnimationMode>('spiral');

  const items = [
    { id: '1', title: 'Action 1', icon: <Icons.Zap size={18} /> },
    { id: '2', title: 'Action 2', icon: <Icons.Brush size={18} /> },
    { id: '3', title: 'Action 3', icon: <Icons.Layers size={18} /> },
    { id: '4', title: 'Action 4', icon: <Icons.Settings size={18} /> },
  ];

  return (
    <div style={{
      width: '100%',
      display: 'flex',
      flexDirection: 'column',
      background: '#090b12',
      borderRadius: 16,
      border: '1px solid rgba(255,255,255,0.08)',
      overflow: 'hidden'
    }}>
      {/* Control Header */}
      <div style={{
        padding: '8px 12px',
        background: 'rgba(255, 255, 255, 0.03)',
        borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
        display: 'flex',
        gap: 5,
        flexWrap: 'wrap',
        justifyContent: 'center'
      }}>
        {(['spring', 'stagger', 'spiral', 'fan', 'scale', 'elastic', 'fade', 'none'] as AnimationMode[]).map(mode => (
          <button
            key={mode}
            onClick={() => setAnim(mode)}
            style={{
              padding: '3px 8px',
              fontSize: 10,
              borderRadius: 6,
              background: anim === mode ? '#38bdf8' : 'rgba(255,255,255,0.06)',
              color: anim === mode ? '#000' : '#cbd5e1',
              fontWeight: 600,
              border: 'none',
              cursor: 'pointer'
            }}
          >
            {mode}
          </button>
        ))}
      </div>

      {/* Interactive Area */}
      <div style={{ height: 340, position: 'relative', overflow: 'hidden' }}>
        <RotaryFab
          items={items}
          animationMode={anim}
          placement="bottom-left"
          theme="luxury-watch"
          showOrbitLines={true}
          style={{ position: 'absolute' }}
        />
      </div>
    </div>
  );
};
```

---

## 📖 Component Properties

| Prop | Type | Default | Description |
| :--- | :--- | :--- | :--- |
| `items` | `RotaryFabItem[]` | `[]` | Array of action items to display on the concentric arcs. |
| `placement` | `FabPlacement` | `'bottom-left'` | Corner or edge anchor quadrant. |
| `theme` | `FabTheme` | `'luxury-watch'` | Built-in theme preset name (`luxury-watch`, `3d`, `glassmorphic`, `cyberpunk`, `minimal-light`, `neon`). |
| `animationMode` | `AnimationMode` | `'spring'` | Entrance physics transition style. |
| `arcConfigs` | `ArcTierConfig[]` | `undefined` | Custom radius, button size, and item distribution for multi-tier arcs. |
| `showGlow` | `boolean` | `true` | Show ambient corner backlight glow. |
| `glowType` | `GlowType` | `'radial'` | Ambient glow mode (`radial`, `aurora`, `neon`, `none`). |
| `glowColor` | `string` | `undefined` | Custom CSS color override for corner glow. |
| `showOrbitLines` | `boolean` | `true` | Show subtle concentric orbital track guide lines. |
| `enableHaptics` | `boolean` | `true` | Enable Web Vibration tactile feedback on mobile. |
| `open` | `boolean` | `undefined` | Controlled open state. |
| `onOpenChange` | `(open: boolean) => void` | `undefined` | Callback fired on open/close. |
| `dialMode` | `boolean` | `undefined` | Toggle precision rotary arc dial mode. |
| `dialProps` | `RotaryDialProps` | `undefined` | Configuration for the precision scrubber dial. |
