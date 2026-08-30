---
title: Getting Started
nav:
  title: Guide
  order: 1
group:
  title: Fundamentals
  order: 1
---

# Getting Started with React Rotary FAB

`react-rotary-fab` is a luxury watchmaker-grade floating action button and concentric rotary arc action menu component for React.

## 📦 Installation

```bash
npm install react-rotary-fab
# or
yarn add react-rotary-fab
# or
pnpm add react-rotary-fab
```

---

## 🚀 Basic Usage

```tsx | pure
import React from 'react';
import { RotaryFab, Icons } from 'react-rotary-fab';
import 'react-rotary-fab/dist/styles.css'; // Optional if not automatically imported

export default function App() {
  const items = [
    { id: '1', title: 'Speed Turbo', icon: <Icons.Zap size={18} /> },
    { id: '2', title: 'Brush Tool', icon: <Icons.Brush size={18} /> },
    { id: '3', title: 'Layers', icon: <Icons.Layers size={18} /> },
    { id: '4', title: 'Settings', icon: <Icons.Settings size={18} /> },
  ];

  return (
    <RotaryFab
      items={items}
      placement="bottom-left"
      theme="luxury-watch"
    />
  );
}
```

---

## 🧭 Live Quadrant Placement Demo

Test all 4 corner quadrant anchor placements:

```tsx
import React, { useState } from 'react';
import { RotaryFab, FabPlacement, Icons } from 'react-rotary-fab';

export default () => {
  const [placement, setPlacement] = useState<FabPlacement>('bottom-left');

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
      background: '#080a10',
      borderRadius: 16,
      border: '1px solid rgba(255,255,255,0.08)',
      overflow: 'hidden'
    }}>
      {/* Placement Header */}
      <div style={{
        padding: '8px 12px',
        background: 'rgba(255, 255, 255, 0.03)',
        borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
        display: 'flex',
        gap: 6,
        justifyContent: 'center'
      }}>
        {(['bottom-left', 'bottom-right', 'top-left', 'top-right'] as FabPlacement[]).map(p => (
          <button
            key={p}
            onClick={() => setPlacement(p)}
            style={{
              padding: '4px 12px',
              fontSize: 11,
              borderRadius: 6,
              background: placement === p ? '#38bdf8' : 'rgba(255,255,255,0.08)',
              color: placement === p ? '#000' : '#cbd5e1',
              fontWeight: 600,
              border: 'none',
              cursor: 'pointer'
            }}
          >
            {p}
          </button>
        ))}
      </div>

      {/* Interactive Area */}
      <div style={{ height: 340, position: 'relative', overflow: 'hidden' }}>
        <RotaryFab items={items} placement={placement} theme="luxury-watch" showOrbitLines={true} style={{ position: 'absolute' }} />
      </div>
    </div>
  );
};
```
