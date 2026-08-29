import React, { useState } from 'react';
import { FabPlacement, FabTheme, AnimationMode } from 'react-rotary-fab';
import { MediaPlayerDemo } from './recipes/MediaPlayerDemo';
import { CreativeStudioDemo } from './recipes/CreativeStudioDemo';
import { SmartHomeDialDemo } from './recipes/SmartHomeDialDemo';
import { MinimalCornerDemo } from './recipes/MinimalCornerDemo';
import { Copy, Check, Github, Terminal, Sparkles, Layers, Sliders, Smartphone, ShieldCheck, Orbit, Play } from 'lucide-react';

export default function App() {
  const [placement, setPlacement] = useState<FabPlacement>('bottom-left');
  const [theme, setTheme] = useState<FabTheme>('luxury-watch');
  const [animationMode, setAnimationMode] = useState<AnimationMode>('spring');
  const [showOrbitLines, setShowOrbitLines] = useState<boolean>(true);
  const [enableHaptics, setEnableHaptics] = useState(true);
  const [activeTab, setActiveTab] = useState<'media' | 'studio' | 'climate' | 'minimal'>('media');
  const [copied, setCopied] = useState(false);
  const [copiedInstall, setCopiedInstall] = useState(false);

  const copyInstall = () => {
    navigator.clipboard.writeText('npm install react-rotary-fab');
    setCopiedInstall(true);
    setTimeout(() => setCopiedInstall(false), 2000);
  };

  const getCodeSnippet = () => {
    return `import React, { useState } from 'react';
import { RotaryFab, Icons } from 'react-rotary-fab';
import 'react-rotary-fab/styles.css';

export default function MyComponent() {
  const [volume, setVolume] = useState(75);
  const [isDialMode, setIsDialMode] = useState(false);

  const items = [
    {
      id: 'vol',
      title: 'Precision Volume Dial',
      icon: <Icons.Volume />,
      onClick: () => setIsDialMode(true)
    },
    {
      id: 'play',
      title: 'Play / Pause',
      icon: <Icons.Play />,
      active: true,
      onClick: () => console.log('Toggled Play')
    },
    {
      id: 'mic',
      title: 'Mute Mic',
      icon: <Icons.MicOn />,
      danger: false
    },
    {
      id: 'settings',
      title: 'Settings',
      icon: <Icons.Settings />,
      hasBadge: true
    }
  ];

  return (
    <RotaryFab
      items={items}
      placement="${placement}"
      theme="${theme}"
      animationMode="${animationMode}"
      showOrbitLines={${showOrbitLines}}
      enableHaptics={${enableHaptics}}
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
  );
}`;
  };

  const copyCode = () => {
    navigator.clipboard.writeText(getCodeSnippet());
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="min-h-screen pb-24">
      {/* Top Navigation */}
      <header className="border-b border-slate-800/80 bg-slate-950/60 backdrop-blur-xl sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-cyan-500 to-indigo-600 flex items-center justify-center shadow-lg shadow-cyan-500/20">
              <span className="font-mono font-bold text-white text-sm">RF</span>
            </div>
            <div>
              <span className="font-extrabold text-lg text-white tracking-tight">react-rotary-fab</span>
              <span className="ml-2 px-2 py-0.5 text-[10px] font-mono bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 rounded-full">v1.0.0</span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={copyInstall}
              className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-700/60 hover:border-cyan-500/40 text-xs font-mono text-slate-300 transition"
            >
              <Terminal size={14} className="text-cyan-400" />
              <span>npm i react-rotary-fab</span>
              {copiedInstall ? <Check size={14} className="text-emerald-400" /> : <Copy size={14} className="text-slate-400" />}
            </button>

            <a
              href="https://github.com/nikhileashy/react-rotary-fab"
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-2 px-3.5 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-white text-xs font-semibold transition shadow-sm"
            >
              <Github size={15} />
              <span>GitHub</span>
            </a>
          </div>
        </div>
      </header>

      {/* Hero Header */}
      <section className="max-w-5xl mx-auto px-4 pt-12 pb-8 text-center space-y-4">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-xs font-semibold tracking-wide">
          <Sparkles size={13} />
          <span>Precision Watchmaker Inspired UI Component</span>
        </div>
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight text-white leading-tight">
          Concentric Rotary FAB & <br className="hidden sm:block" />
          <span className="bg-gradient-to-r from-cyan-400 via-sky-300 to-indigo-400 bg-clip-text text-transparent">
            Precision Arc Dial for React
          </span>
        </h1>
        <p className="max-w-2xl mx-auto text-slate-400 text-sm sm:text-base leading-relaxed">
          A luxury timepiece aesthetic Floating Action Button with multi-tier concentric orbital arcs, 4-corner trigonometry, celestial micro-dots, tactile haptics, and zero external heavy UI dependencies.
        </p>
      </section>

      {/* Main Interactive Stage */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left: Interactive Controls & Configuration */}
        <div className="lg:col-span-4 space-y-6">
          {/* Preset Selector */}
          <div className="bg-slate-900/70 border border-slate-800 rounded-2xl p-5 backdrop-blur-md space-y-4">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center gap-2">
              <Layers size={14} className="text-cyan-400" />
              <span>Showcase Presets</span>
            </h3>
            <div className="grid grid-cols-2 gap-2">
              {[
                { id: 'media', name: 'Media Stream' },
                { id: 'studio', name: 'Design Studio' },
                { id: 'climate', name: 'Climate Node' },
                { id: 'minimal', name: 'Minimal 4-Arc' }
              ].map(tab => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as any)}
                  className={`px-3 py-2 text-xs font-semibold rounded-xl text-left transition border ${
                    activeTab === tab.id
                      ? 'bg-cyan-500/10 border-cyan-500/40 text-cyan-300 shadow-sm shadow-cyan-500/10'
                      : 'bg-slate-800/40 border-slate-800 text-slate-400 hover:text-slate-200 hover:bg-slate-800'
                  }`}
                >
                  {tab.name}
                </button>
              ))}
            </div>
          </div>

          {/* Placement & Theme & Animation Controls */}
          <div className="bg-slate-900/70 border border-slate-800 rounded-2xl p-5 backdrop-blur-md space-y-5">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center gap-2">
              <Sliders size={14} className="text-cyan-400" />
              <span>Interactive Controls</span>
            </h3>

            {/* Corner Placement */}
            <div className="space-y-2">
              <label className="text-xs font-medium text-slate-300">Corner Placement</label>
              <div className="grid grid-cols-2 gap-2">
                {(['bottom-left', 'bottom-right', 'top-left', 'top-right'] as FabPlacement[]).map(pos => (
                  <button
                    key={pos}
                    onClick={() => setPlacement(pos)}
                    className={`px-2.5 py-1.5 text-xs font-mono rounded-lg transition border ${
                      placement === pos
                        ? 'bg-indigo-500/20 border-indigo-500/50 text-indigo-300 font-semibold'
                        : 'bg-slate-800/30 border-slate-800 text-slate-400 hover:text-slate-200'
                    }`}
                  >
                    {pos}
                  </button>
                ))}
              </div>
            </div>

            {/* Animation Modes */}
            <div className="space-y-2">
              <label className="text-xs font-medium text-slate-300 flex items-center gap-1.5">
                <Play size={12} className="text-cyan-400" />
                <span>Animation Mode</span>
              </label>
              <div className="grid grid-cols-3 gap-1.5">
                {(['spring', 'stagger', 'spiral', 'fan', 'scale', 'elastic', 'fade', 'none'] as AnimationMode[]).map(mode => (
                  <button
                    key={mode}
                    onClick={() => setAnimationMode(mode)}
                    className={`px-2 py-1.5 text-[11px] font-mono capitalize rounded-lg transition border ${
                      animationMode === mode
                        ? 'bg-cyan-500/20 border-cyan-500/60 text-cyan-300 font-semibold'
                        : 'bg-slate-800/30 border-slate-800 text-slate-400 hover:text-slate-200'
                    }`}
                  >
                    {mode}
                  </button>
                ))}
              </div>
            </div>

            {/* Themes */}
            <div className="space-y-2">
              <label className="text-xs font-medium text-slate-300">Theme Preset</label>
              <div className="grid grid-cols-1 gap-2">
                {[
                  { id: 'luxury-watch', name: 'Luxury Watchmaker (Obsidian & Jewels)' },
                  { id: 'glassmorphic', name: 'Glassmorphic (Frosted Translucent)' },
                  { id: 'cyberpunk', name: 'Cyberpunk 2077 (Neon Cyan & Yellow)' },
                  { id: 'minimal-light', name: 'Minimal Light (Porcelain White)' },
                  { id: 'neon', name: 'Neon Nebula (Ultra Violet & Magenta)' }
                ].map(t => (
                  <button
                    key={t.id}
                    onClick={() => setTheme(t.id as FabTheme)}
                    className={`px-3 py-2 text-xs text-left rounded-xl transition border ${
                      theme === t.id
                        ? 'bg-cyan-500/10 border-cyan-500/40 text-cyan-300 font-semibold'
                        : 'bg-slate-800/30 border-slate-800 text-slate-400 hover:text-slate-200'
                    }`}
                  >
                    {t.name}
                  </button>
                ))}
              </div>
            </div>

            {/* Toggles: Orbit Lines & Haptics */}
            <div className="space-y-3 pt-2 border-t border-slate-800/60">
              {/* Show Orbit Lines Toggle */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Orbit size={15} className="text-slate-400" />
                  <span className="text-xs text-slate-300 font-medium">Show Orbit Outline</span>
                </div>
                <button
                  onClick={() => setShowOrbitLines(o => !o)}
                  className={`relative inline-flex h-5 w-9 items-center rounded-full transition ${
                    showOrbitLines ? 'bg-cyan-500' : 'bg-slate-700'
                  }`}
                >
                  <span
                    className={`inline-block h-3.5 w-3.5 transform rounded-full bg-white transition ${
                      showOrbitLines ? 'translate-x-4.5' : 'translate-x-1'
                    }`}
                  />
                </button>
              </div>

              {/* Haptics Toggle */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Smartphone size={15} className="text-slate-400" />
                  <span className="text-xs text-slate-300 font-medium">Tactile Vibration Haptics</span>
                </div>
                <button
                  onClick={() => setEnableHaptics(h => !h)}
                  className={`relative inline-flex h-5 w-9 items-center rounded-full transition ${
                    enableHaptics ? 'bg-cyan-500' : 'bg-slate-700'
                  }`}
                >
                  <span
                    className={`inline-block h-3.5 w-3.5 transform rounded-full bg-white transition ${
                      enableHaptics ? 'translate-x-4.5' : 'translate-x-1'
                    }`}
                  />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Right: Live Interactive Sandbox & Code Snippet */}
        <div className="lg:col-span-8 space-y-6">
          {/* Active Canvas Showcase */}
          {activeTab === 'media' && (
            <MediaPlayerDemo
              placement={placement}
              theme={theme}
              animationMode={animationMode}
              showOrbitLines={showOrbitLines}
              enableHaptics={enableHaptics}
            />
          )}
          {activeTab === 'studio' && (
            <CreativeStudioDemo
              placement={placement}
              theme={theme}
              animationMode={animationMode}
              showOrbitLines={showOrbitLines}
              enableHaptics={enableHaptics}
            />
          )}
          {activeTab === 'climate' && (
            <SmartHomeDialDemo
              placement={placement}
              theme={theme}
              animationMode={animationMode}
              showOrbitLines={showOrbitLines}
              enableHaptics={enableHaptics}
            />
          )}
          {activeTab === 'minimal' && (
            <MinimalCornerDemo
              placement={placement}
              theme={theme}
              animationMode={animationMode}
              showOrbitLines={showOrbitLines}
              enableHaptics={enableHaptics}
            />
          )}

          {/* Live Generated Code Snippet */}
          <div className="bg-[#090b10] border border-slate-800/90 rounded-2xl overflow-hidden shadow-2xl">
            <div className="flex items-center justify-between px-5 py-3 bg-slate-900/60 border-b border-slate-800">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-red-500/80" />
                <span className="w-2.5 h-2.5 rounded-full bg-yellow-500/80" />
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/80" />
                <span className="text-xs font-mono text-slate-400 ml-2">RotaryFabExample.tsx</span>
              </div>
              <button
                onClick={copyCode}
                className="flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-slate-800 hover:bg-slate-700 text-xs font-mono text-slate-300 transition"
              >
                {copied ? <Check size={13} className="text-emerald-400" /> : <Copy size={13} />}
                <span>{copied ? 'Copied' : 'Copy JSX'}</span>
              </button>
            </div>
            <pre className="p-5 font-mono text-xs text-slate-300 overflow-x-auto leading-relaxed selection:bg-cyan-500/20">
              <code>{getCodeSnippet()}</code>
            </pre>
          </div>
        </div>
      </main>

      {/* Feature Highlights Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 pt-16 grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-slate-900/40 border border-slate-800 rounded-2xl p-6 space-y-3">
          <div className="w-10 h-10 rounded-xl bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center text-cyan-400">
            <Sparkles size={20} />
          </div>
          <h3 className="font-bold text-white text-base">Concentric Multi-Tier Arcs</h3>
          <p className="text-slate-400 text-xs leading-relaxed">
            Organize actions across concentric tiers with 8 animation modes: Spring, Stagger, Spiral, Fan, Scale, Elastic, Fade, or None.
          </p>
        </div>

        <div className="bg-slate-900/40 border border-slate-800 rounded-2xl p-6 space-y-3">
          <div className="w-10 h-10 rounded-xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center text-indigo-400">
            <Sliders size={20} />
          </div>
          <h3 className="font-bold text-white text-base">Watchmaker Precision Dial</h3>
          <p className="text-slate-400 text-xs leading-relaxed">
            Synchronized progress direction, celestial micro-dots, precision tick marks, luminous jewel thumb knob, and keyboard/wheel support.
          </p>
        </div>

        <div className="bg-slate-900/40 border border-slate-800 rounded-2xl p-6 space-y-3">
          <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400">
            <ShieldCheck size={20} />
          </div>
          <h3 className="font-bold text-white text-base">Zero Heavy Dependencies</h3>
          <p className="text-slate-400 text-xs leading-relaxed">
            Pure React with zero heavy UI libraries. Includes toggleable orbit outlines, safe Web Vibration haptics, and complete TypeScript definitions.
          </p>
        </div>
      </section>
    </div>
  );
}
