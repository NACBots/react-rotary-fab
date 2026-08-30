---
title: Tactile Web Haptics
nav:
  title: Guide
  order: 1
group:
  title: Fundamentals
  order: 3
---

# Tactile Web Haptics

`react-rotary-fab` integrates a safe, browser-compatible **Web Vibration API** engine (`navigator.vibrate`) to provide realistic tactile feedback on mobile devices when rotating dials or opening menus.

## 📳 Built-in Haptic Feedback Patterns

| Pattern | Vibration Duration | Description |
| :--- | :--- | :--- |
| `tick` | 8ms | Ultra-crisp micro-pulse triggered on every dial step increment. |
| `light` | 15ms | Subtle physical tap for button hover or regular clicks. |
| `medium` | 25ms | Standard button activation click. |
| `boundary` | `[15, 30, 20]` | Double bump when scrubbing past minimum or maximum slider bounds. |
| `danger` | `[40, 50, 40]` | Warning vibration pattern for destructive actions (`danger: true`). |
| `toggle` | `[10, 20, 15]` | Smooth state change confirmation. |

---

## 📱 Live Haptics Test

```tsx
import React, { useState } from 'react';
import { RotaryFab, Icons } from 'react-rotary-fab';

export default () => {
  const [hapticsEnabled, setHapticsEnabled] = useState(true);

  const items = [
    { id: '1', title: 'Tap Action', icon: <Icons.Zap size={18} /> },
    { id: '2', title: 'Brush Tool', icon: <Icons.Brush size={18} /> },
    { id: '3', title: 'Settings', icon: <Icons.Settings size={18} /> },
  ];

  return (
    <div style={{ height: 280, position: 'relative', background: '#090b12', borderRadius: 16, border: '1px solid rgba(255,255,255,0.08)', overflow: 'hidden' }}>
      <div style={{ position: 'absolute', top: 12, left: '50%', transform: 'translateX(-50%)', zIndex: 20 }}>
        <button
          onClick={() => setHapticsEnabled(h => !h)}
          style={{
            padding: '4px 12px',
            fontSize: 11,
            borderRadius: 6,
            background: hapticsEnabled ? '#10b981' : 'rgba(255,255,255,0.08)',
            color: hapticsEnabled ? '#000' : '#cbd5e1',
            fontWeight: 600,
            border: 'none',
            cursor: 'pointer'
          }}
        >
          Web Haptics: {hapticsEnabled ? 'ENABLED' : 'DISABLED'}
        </button>
      </div>

      <RotaryFab items={items} placement="bottom-left" theme="luxury-watch" enableHaptics={hapticsEnabled} style={{ position: 'absolute', zIndex: 20 }} />
    </div>
  );
};
```

---

## ⚙️ Enabling / Disabling Haptics

Haptics are enabled by default on supported devices:

```tsx | pure
import { RotaryFab } from 'react-rotary-fab';

<RotaryFab
  items={items}
  enableHaptics={true} // Set to false to disable
/>
```
