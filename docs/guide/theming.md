---
title: Theming & Customization
nav:
  title: Guide
  order: 1
group:
  title: Fundamentals
  order: 2
---

# Theming & Customization

`react-rotary-fab` comes equipped with **6 handcrafted theme presets** and allows total custom style overrides via CSS variables.

## 🎨 6 Built-in Theme Presets

| Theme Preset | Visual Character |
| :--- | :--- |
| **`luxury-watch`** (Default) | Horology-inspired obsidian dials, celestial indices, luminous hands, and ambient OLED backdrop. |
| **`3d`** | Tactile skeuomorphic push buttons with realistic physical depth, metallic rim bevels, and micro highlights. |
| **`glassmorphic`** | Translucent frosted glass crystal with ambient sky-blue backdrop lighting and blur filters. |
| **`cyberpunk`** | High-contrast laser cyan & electric yellow HUD telemetry interface with saturated neon flares. |
| **`minimal-light`** | Clean porcelain white aesthetic with subtle gray shadows for light UI dashboards. |
| **`neon`** | Ultraviolet dark nebula aesthetic with electric purple glow and vivid neon accents. |

---

## 🕹️ Live Theme Switcher

```tsx
import React, { useState } from 'react';
import { RotaryFab, FabTheme, Icons } from 'react-rotary-fab';

export default () => {
  const [theme, setTheme] = useState<FabTheme>('3d');

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

      {/* Interactive Canvas */}
      <div style={{ height: 340, position: 'relative', overflow: 'hidden' }}>
        <RotaryFab items={items} placement="bottom-left" theme={theme} showOrbitLines={true} style={{ position: 'absolute' }} />
      </div>
    </div>
  );
};
```

---

## 🛠️ Custom CSS Variable Tokens

You can override any theme tokens either in CSS or via the `customTheme` prop:

```tsx | pure
import { RotaryFab } from 'react-rotary-fab';

<RotaryFab
  items={items}
  customTheme={{
    '--rf-bg-main': 'linear-gradient(135deg, #1e1b4b 0%, #0f172a 100%)',
    '--rf-accent': '#38bdf8',
    '--rf-accent-glow': 'rgba(56, 189, 248, 0.8)',
    '--rf-border': 'rgba(56, 189, 248, 0.3)',
  }}
/>
```
