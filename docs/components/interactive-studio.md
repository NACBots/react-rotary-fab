---
title: Interactive Studio
nav:
  title: Interactive Studio
  order: 4
---

# Interactive Studio Playground

Experiment with all 6 themes (including 3D Tactile), 1-Arc & 2-Arc concentric menus, 6 dial styles, studio glow, animation physics, and corner placements.

```tsx
import React, { useState } from 'react';
import {
  RotaryFab,
  FabPlacement,
  FabTheme,
  AnimationMode,
  GlowType,
  DialStyle,
  Icons
} from 'react-rotary-fab';

export default () => {
  const [placement, setPlacement] = useState<FabPlacement>('bottom-left');
  const [theme, setTheme] = useState<FabTheme>('luxury-watch');
  const [dialStyle, setDialStyle] = useState<DialStyle>('watchmaker');
  const [animationMode, setAnimationMode] = useState<AnimationMode>('spring');
  const [glowType, setGlowType] = useState<GlowType>('radial');
  const [showGlow, setShowGlow] = useState<boolean>(true);
  const [showOrbitLines, setShowOrbitLines] = useState<boolean>(true);
  const [enableHaptics, setEnableHaptics] = useState<boolean>(true);
  const [arcMode, setArcMode] = useState<'single' | 'dual'>('dual');
  const [volume, setVolume] = useState<number>(75);
  const [isDialMode, setIsDialMode] = useState<boolean>(false);
  const [isPlaying, setIsPlaying] = useState<boolean>(true);

  const singleArcItems = [
    {
      id: 'vol',
      title: 'Volume Scrubber',
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

  const dualArcItems = [
    // Tier 1 (Inner Arc - 4 items)
    {
      id: 'vol',
      title: 'Volume Scrubber',
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

    // Tier 2 (Outer Arc - 5 items)
    {
      id: 'brush',
      title: 'Brush Tool',
      icon: <Icons.Brush size={18} />,
    },
    {
      id: 'layers',
      title: 'Layers Panel',
      icon: <Icons.Layers size={18} />,
      hasBadge: 3,
    },
    {
      id: 'seek',
      title: 'Seek Track',
      icon: <Icons.Seek size={18} />,
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

  const activeItems = arcMode === 'dual' ? dualArcItems : singleArcItems;

  return (
    <div style={{
      width: '100%',
      display: 'flex',
      flexDirection: 'column',
      background: theme === 'minimal-light' ? '#ffffff' : '#07090e',
      borderRadius: 20,
      border: '1px solid rgba(255, 255, 255, 0.1)',
      overflow: 'hidden',
      transition: 'background 0.3s ease'
    }}>
      {/* 1. Dedicated Top Control Header (Never Overlapped) */}
      <div style={{
        padding: '10px 14px',
        background: theme === 'minimal-light' ? '#f8fafc' : 'rgba(255, 255, 255, 0.03)',
        borderBottom: theme === 'minimal-light' ? '1px solid #e2e8f0' : '1px solid rgba(255, 255, 255, 0.08)',
        display: 'flex',
        flexWrap: 'wrap',
        gap: 6,
        alignItems: 'center',
        justifyContent: 'center',
      }}>
        {/* Placement */}
        <select
          value={placement}
          onChange={e => setPlacement(e.target.value as any)}
          style={{
            background: 'rgba(255, 255, 255, 0.08)',
            color: theme === 'minimal-light' ? '#0f172a' : '#fff',
            border: '1px solid rgba(255, 255, 255, 0.15)',
            borderRadius: 6,
            padding: '4px 8px',
            fontSize: 11,
            cursor: 'pointer',
          }}
        >
          <option value="bottom-left">Corner: Bottom-Left</option>
          <option value="bottom-right">Corner: Bottom-Right</option>
          <option value="top-left">Corner: Top-Left</option>
          <option value="top-right">Corner: Top-Right</option>
        </select>

        {/* 6 Themes */}
        <select
          value={theme}
          onChange={e => setTheme(e.target.value as any)}
          style={{
            background: 'rgba(255, 255, 255, 0.08)',
            color: '#38bdf8',
            fontWeight: 700,
            border: '1px solid rgba(56, 189, 248, 0.4)',
            borderRadius: 6,
            padding: '4px 8px',
            fontSize: 11,
            cursor: 'pointer',
          }}
        >
          <option value="luxury-watch">Theme: Luxury Watch</option>
          <option value="3d">Theme: 3D Tactile</option>
          <option value="glassmorphic">Theme: Glassmorphic</option>
          <option value="cyberpunk">Theme: Cyberpunk</option>
          <option value="minimal-light">Theme: Minimal Light</option>
          <option value="neon">Theme: Neon</option>
        </select>

        {/* 1-Arc vs 2-Arc Switcher */}
        <button
          onClick={() => setArcMode(m => m === 'dual' ? 'single' : 'dual')}
          style={{
            background: arcMode === 'dual' ? '#818cf8' : 'rgba(255, 255, 255, 0.08)',
            color: arcMode === 'dual' ? '#000' : theme === 'minimal-light' ? '#0f172a' : '#cbd5e1',
            border: 'none',
            borderRadius: 6,
            padding: '4px 10px',
            fontSize: 11,
            fontWeight: 700,
            cursor: 'pointer',
          }}
        >
          {arcMode === 'dual' ? 'Arcs: 2-ARC (9 items)' : 'Arcs: 1-ARC (4 items)'}
        </button>

        {/* 6 Dial Styles */}
        <select
          value={dialStyle}
          onChange={e => setDialStyle(e.target.value as any)}
          style={{
            background: 'rgba(255, 255, 255, 0.08)',
            color: '#f472b6',
            fontWeight: 600,
            border: '1px solid rgba(244, 114, 182, 0.3)',
            borderRadius: 6,
            padding: '4px 8px',
            fontSize: 11,
            cursor: 'pointer',
          }}
        >
          <option value="watchmaker">Dial: Watchmaker</option>
          <option value="minimal">Dial: Minimal Line</option>
          <option value="cyber-segmented">Dial: Cyber Segmented</option>
          <option value="neon-glow">Dial: Neon Glow</option>
          <option value="retro-analog">Dial: Retro Analog</option>
          <option value="holographic">Dial: Holographic</option>
        </select>

        {/* Animation Mode */}
        <select
          value={animationMode}
          onChange={e => setAnimationMode(e.target.value as any)}
          style={{
            background: 'rgba(255, 255, 255, 0.08)',
            color: theme === 'minimal-light' ? '#0f172a' : '#fff',
            border: '1px solid rgba(255, 255, 255, 0.15)',
            borderRadius: 6,
            padding: '4px 8px',
            fontSize: 11,
            cursor: 'pointer',
          }}
        >
          <option value="spring">Anim: Spring</option>
          <option value="stagger">Anim: Stagger</option>
          <option value="spiral">Anim: Spiral</option>
          <option value="fan">Anim: Fan</option>
          <option value="scale">Anim: Scale</option>
          <option value="elastic">Anim: Elastic</option>
          <option value="fade">Anim: Fade</option>
          <option value="none">Anim: None</option>
        </select>

        {/* Glow Type */}
        <select
          value={glowType}
          onChange={e => setGlowType(e.target.value as any)}
          style={{
            background: 'rgba(255, 255, 255, 0.08)',
            color: '#a78bfa',
            border: '1px solid rgba(167, 139, 250, 0.3)',
            borderRadius: 6,
            padding: '4px 8px',
            fontSize: 11,
            cursor: 'pointer',
          }}
        >
          <option value="radial">Glow: Studio Radial</option>
          <option value="aurora">Glow: Subtle Aurora</option>
          <option value="neon">Glow: Cyber Neon</option>
          <option value="none">Glow: Disabled</option>
        </select>

        {/* Orbit Toggle */}
        <button
          onClick={() => setShowOrbitLines(o => !o)}
          style={{
            background: showOrbitLines ? '#38bdf8' : 'rgba(255, 255, 255, 0.08)',
            color: showOrbitLines ? '#000' : theme === 'minimal-light' ? '#0f172a' : '#cbd5e1',
            border: 'none',
            borderRadius: 6,
            padding: '4px 10px',
            fontSize: 11,
            fontWeight: 600,
            cursor: 'pointer',
          }}
        >
          Orbit: {showOrbitLines ? 'ON' : 'OFF'}
        </button>
      </div>

      {/* 2. Interactive Canvas Area */}
      <div style={{
        height: 420,
        position: 'relative',
        overflow: 'hidden',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}>
        {/* Center Readout Display */}
        <div style={{ textAlign: 'center', color: '#94a3b8', fontFamily: 'monospace', pointerEvents: 'none' }}>
          <div style={{ fontSize: 54, fontWeight: 800, color: theme === 'minimal-light' ? '#0f172a' : '#fff', letterSpacing: -1 }}>
            {isDialMode ? `${volume}%` : isPlaying ? 'PLAYING' : 'PAUSED'}
          </div>
          <p style={{ fontSize: 13, marginTop: 4 }}>
            {isDialMode ? `Dial Style: ${dialStyle}` : `Theme: ${theme.toUpperCase()} | Arcs: ${arcMode === 'dual' ? '2-ARC (9 items)' : '1-ARC (4 items)'}`}
          </p>
        </div>

        {/* RotaryFab Component */}
        <RotaryFab
          items={activeItems}
          placement={placement}
          theme={theme}
          animationMode={animationMode}
          showGlow={showGlow}
          glowType={glowType}
          showOrbitLines={showOrbitLines}
          enableHaptics={enableHaptics}
          style={{ position: 'absolute' }}
          dialMode={isDialMode}
          onDialModeChange={setIsDialMode}
          dialProps={{
            value: volume,
            min: 0,
            max: 100,
            step: 1,
            dialStyle: dialStyle,
            unit: '% VOL',
            onChange: setVolume,
          }}
        />
      </div>
    </div>
  );
};
```
