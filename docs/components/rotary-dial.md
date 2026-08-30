---
title: RotaryDial
nav:
  title: RotaryDial
  order: 3
---

# RotaryDial

A standalone or integrated watchmaker-grade rotary arc slider / scrubber with 6 distinct visual design styles.

## 🎛 6 Distinct Dial Design Styles

Switch between the 6 precision dial modes (`watchmaker`, `minimal`, `cyber-segmented`, `neon-glow`, `retro-analog`, `holographic`):

```tsx
import React, { useState } from 'react';
import { RotaryDial, DialStyle } from 'react-rotary-fab';

export default () => {
  const [dialStyle, setDialStyle] = useState<DialStyle>('watchmaker');
  const [value, setValue] = useState(72);

  return (
    <div style={{
      width: '100%',
      display: 'flex',
      flexDirection: 'column',
      background: dialStyle === 'retro-analog' ? '#0d0705' : dialStyle === 'cyber-segmented' ? '#040812' : '#090b12',
      borderRadius: 20,
      border: '1px solid rgba(255,255,255,0.08)',
      overflow: 'hidden',
      transition: 'background 0.3s ease'
    }}>
      {/* Dial Style Header */}
      <div style={{
        padding: '8px 12px',
        background: 'rgba(255, 255, 255, 0.03)',
        borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
        display: 'flex',
        gap: 5,
        flexWrap: 'wrap',
        justifyContent: 'center'
      }}>
        {(['watchmaker', 'minimal', 'cyber-segmented', 'neon-glow', 'retro-analog', 'holographic'] as DialStyle[]).map(s => (
          <button
            key={s}
            onClick={() => setDialStyle(s)}
            style={{
              padding: '4px 10px',
              fontSize: 11,
              borderRadius: 6,
              background: dialStyle === s ? '#38bdf8' : 'rgba(255,255,255,0.06)',
              color: dialStyle === s ? '#000' : '#cbd5e1',
              fontWeight: 600,
              border: 'none',
              cursor: 'pointer'
            }}
          >
            {s}
          </button>
        ))}
      </div>

      {/* Interactive Canvas */}
      <div style={{
        height: 360,
        position: 'relative',
        overflow: 'hidden',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }}>
        <div style={{ textAlign: 'center', color: '#94a3b8', fontFamily: 'monospace', pointerEvents: 'none' }}>
          <div style={{ fontSize: 52, fontWeight: 800, color: '#fff' }}>
            {value}<span style={{ fontSize: 20, color: '#38bdf8' }}>%</span>
          </div>
          <p style={{ fontSize: 13, marginTop: 4 }}>Active Style: {dialStyle}</p>
        </div>

        <RotaryDial
          value={value}
          min={0}
          max={100}
          step={1}
          unit="%"
          dialStyle={dialStyle}
          placement="bottom-left"
          theme="luxury-watch"
          style={{ position: 'absolute' }}
          onChange={setValue}
          showTrack={true}
          showBezel={true}
          showTicks={true}
        />
      </div>
    </div>
  );
};
```

---

## 🧭 Direction-Aware Corner Placements

The arc slider automatically calculates smooth 0% $\rightarrow$ 100% clockwise and counter-clockwise sweeps based on which corner it is anchored to:

```tsx
import React, { useState } from 'react';
import { RotaryDial, FabPlacement } from 'react-rotary-fab';

export default () => {
  const [placement, setPlacement] = useState<FabPlacement>('bottom-right');
  const [temp, setTemp] = useState(21.5);

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

      {/* Interactive Canvas */}
      <div style={{
        height: 340,
        position: 'relative',
        overflow: 'hidden',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }}>
        <div style={{ textAlign: 'center', color: '#94a3b8', fontFamily: 'monospace', pointerEvents: 'none' }}>
          <div style={{ fontSize: 52, fontWeight: 800, color: '#fff' }}>
            {temp.toFixed(1)}<span style={{ fontSize: 20, color: '#38bdf8' }}>°C</span>
          </div>
          <p style={{ fontSize: 13, marginTop: 4 }}>Thermostat Gauge</p>
        </div>

        <RotaryDial
          value={temp}
          min={16}
          max={30}
          step={0.5}
          unit="°C"
          dialStyle="watchmaker"
          placement={placement}
          theme="luxury-watch"
          style={{ position: 'absolute' }}
          onChange={setTemp}
        />
      </div>
    </div>
  );
};
```

---

## 📖 RotaryDial Properties

| Prop | Type | Default | Description |
| :--- | :--- | :--- | :--- |
| `value` | `number` | `0` | Current slider value. |
| `min` | `number` | `0` | Minimum value bound. |
| `max` | `number` | `100` | Maximum value bound. |
| `step` | `number` | `1` | Increment step size. |
| `dialStyle` | `DialStyle` | `'watchmaker'` | Visual dial style (`watchmaker`, `minimal`, `cyber-segmented`, `neon-glow`, `retro-analog`, `holographic`). |
| `unit` | `string` | `''` | Value unit label (e.g. `%`, `°C`, `VOL`). |
| `radius` | `number` | `124` | Pixel radius of the rotary track arc. |
| `showTrack` | `boolean` | `true` | Show the background track groove. |
| `showBezel` | `boolean` | `true` | Show the outer watchmaker bezel ring. |
| `showTicks` | `boolean` | `true` | Show precision celestial tick marks. |
| `showNeedle` | `boolean` | `true` | Render the luminous center-pointing indicator needle. |
| `onChange` | `(value: number) => void` | `undefined` | Real-time change callback fired while scrubbing. |
| `onChangeEnd` | `(value: number) => void` | `undefined` | Callback fired on mouse/touch release. |
