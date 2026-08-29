import React, { useState } from 'react';
import { FabPlacement, FabTheme, AnimationMode } from 'react-rotary-fab';
import { MediaPlayerDemo } from './recipes/MediaPlayerDemo';
import { CreativeStudioDemo } from './recipes/CreativeStudioDemo';
import { SmartHomeDialDemo } from './recipes/SmartHomeDialDemo';
import { MinimalCornerDemo } from './recipes/MinimalCornerDemo';
import {
  Copy,
  Check,
  Github,
  Terminal,
  Code2,
  X,
  Orbit,
  Smartphone,
  ChevronDown
} from 'lucide-react';

export default function App() {
  const [placement, setPlacement] = useState<FabPlacement>('bottom-left');
  const [theme, setTheme] = useState<FabTheme>('luxury-watch');
  const [animationMode, setAnimationMode] = useState<AnimationMode>('spring');
  const [showOrbitLines, setShowOrbitLines] = useState<boolean>(true);
  const [enableHaptics, setEnableHaptics] = useState(true);
  const [activeTab, setActiveTab] = useState<'media' | 'studio' | 'climate' | 'minimal'>('media');
  const [showCodeModal, setShowCodeModal] = useState(false);
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
      title: 'Volume Dial',
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
      icon: <Icons.MicOn />
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

  const themesList: { id: FabTheme; name: string; dot: string }[] = [
    { id: 'luxury-watch', name: 'Luxury Watch', dot: 'bg-amber-400' },
    { id: 'glassmorphic', name: 'Glassmorphic', dot: 'bg-sky-400' },
    { id: 'cyberpunk', name: 'Cyberpunk', dot: 'bg-yellow-400' },
    { id: 'minimal-light', name: 'Minimal Light', dot: 'bg-white' },
    { id: 'neon', name: 'Neon Nebula', dot: 'bg-fuchsia-400' }
  ];

  const animationModes: AnimationMode[] = [
    'spring',
    'stagger',
    'spiral',
    'fan',
    'scale',
    'elastic',
    'fade',
    'none'
  ];

  return (
    <div className="h-screen w-screen overflow-hidden bg-[#050609] text-slate-100 flex flex-col select-none">
      {/* Minimal Top Navigation */}
      <header className="h-13 border-b border-white/[0.06] bg-black/40 backdrop-blur-xl px-4 sm:px-6 flex items-center justify-between flex-shrink-0 z-30">
        {/* Brand */}
        <div className="flex items-center gap-3">
          <div className="w-6 h-6 rounded-md bg-white text-black flex items-center justify-center font-mono font-black text-[11px] shadow-sm">
            RF
          </div>
          <span className="font-semibold text-sm tracking-tight text-white">react-rotary-fab</span>
          <span className="hidden sm:inline text-[10px] font-mono text-zinc-400 px-1.5 py-0.5 rounded bg-white/[0.04] border border-white/[0.06]">
            v1.0.0
          </span>
        </div>

        {/* Center: Clean Segmented Presets */}
        <div className="flex items-center gap-1 bg-white/[0.03] p-1 rounded-xl border border-white/[0.06]">
          {[
            { id: 'media', label: 'Media' },
            { id: 'studio', label: 'Studio' },
            { id: 'climate', label: 'Climate' },
            { id: 'minimal', label: 'Minimal' }
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`px-3 py-1 text-xs font-medium rounded-lg transition ${
                activeTab === tab.id
                  ? 'bg-white text-black font-semibold shadow-sm'
                  : 'text-zinc-400 hover:text-white hover:bg-white/[0.04]'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Right Actions */}
        <div className="flex items-center gap-2">
          <button
            onClick={copyInstall}
            className="hidden md:flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-white/[0.03] hover:bg-white/[0.07] border border-white/[0.08] text-xs font-mono text-zinc-300 transition"
          >
            <Terminal size={12} className="text-zinc-400" />
            <span>npm i react-rotary-fab</span>
            {copiedInstall ? <Check size={12} className="text-emerald-400" /> : <Copy size={12} className="text-zinc-400" />}
          </button>

          <button
            onClick={() => setShowCodeModal(true)}
            className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-white/[0.04] hover:bg-white/[0.08] border border-white/[0.08] text-xs font-medium text-zinc-300 hover:text-white transition"
          >
            <Code2 size={13} />
            <span className="hidden sm:inline">Code</span>
          </button>

          <a
            href="https://github.com/nikhileashy/react-rotary-fab"
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-white/[0.08] hover:bg-white/[0.14] text-white text-xs font-medium transition"
          >
            <Github size={13} />
            <span className="hidden sm:inline">GitHub</span>
          </a>
        </div>
      </header>

      {/* Main Interactive Stage with Floating Island Toolbar */}
      <main className="flex-1 p-3 sm:p-5 relative flex flex-col min-h-0 overflow-hidden">
        {/* Floating Glassmorphic Control Island (Pinned Top-Center) */}
        <div className="absolute top-6 sm:top-8 left-1/2 -translate-x-1/2 z-20 max-w-[94vw] overflow-x-auto no-scrollbar">
          <div className="flex items-center gap-2 sm:gap-3 bg-black/70 backdrop-blur-2xl border border-white/[0.12] rounded-full px-3 sm:px-4 py-1.5 shadow-2xl shadow-black/80">
            {/* Placement 4-Corner Selector */}
            <div className="flex items-center gap-0.5 bg-white/[0.05] p-0.5 rounded-full border border-white/[0.08]">
              {[
                { id: 'bottom-left', label: 'BL' },
                { id: 'bottom-right', label: 'BR' },
                { id: 'top-left', label: 'TL' },
                { id: 'top-right', label: 'TR' }
              ].map(p => (
                <button
                  key={p.id}
                  onClick={() => setPlacement(p.id as FabPlacement)}
                  className={`px-2 py-0.5 text-[10px] font-mono rounded-full transition ${
                    placement === p.id
                      ? 'bg-white text-black font-bold'
                      : 'text-zinc-400 hover:text-white'
                  }`}
                  title={p.id}
                >
                  {p.label}
                </button>
              ))}
            </div>

            <span className="w-px h-3.5 bg-white/[0.12]" />

            {/* Animation Mode Dropdown */}
            <div className="relative flex items-center">
              <select
                value={animationMode}
                onChange={e => setAnimationMode(e.target.value as AnimationMode)}
                className="appearance-none bg-white/[0.05] hover:bg-white/[0.08] border border-white/[0.08] rounded-full px-2.5 py-1 pr-6 text-[11px] font-mono text-zinc-200 focus:outline-none cursor-pointer capitalize transition"
              >
                {animationModes.map(mode => (
                  <option key={mode} value={mode} className="bg-zinc-900 text-white">
                    {mode}
                  </option>
                ))}
              </select>
              <ChevronDown size={10} className="absolute right-2 pointer-events-none text-zinc-400" />
            </div>

            {/* Theme Dropdown */}
            <div className="relative flex items-center">
              <select
                value={theme}
                onChange={e => setTheme(e.target.value as FabTheme)}
                className="appearance-none bg-white/[0.05] hover:bg-white/[0.08] border border-white/[0.08] rounded-full px-2.5 py-1 pr-6 text-[11px] font-medium text-zinc-200 focus:outline-none cursor-pointer transition"
              >
                {themesList.map(t => (
                  <option key={t.id} value={t.id} className="bg-zinc-900 text-white">
                    {t.name}
                  </option>
                ))}
              </select>
              <ChevronDown size={10} className="absolute right-2 pointer-events-none text-zinc-400" />
            </div>

            <span className="w-px h-3.5 bg-white/[0.12]" />

            {/* Orbit Outline Toggle */}
            <button
              onClick={() => setShowOrbitLines(o => !o)}
              className={`flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-medium transition border ${
                showOrbitLines
                  ? 'bg-white/[0.12] border-white/[0.2] text-white'
                  : 'bg-transparent border-transparent text-zinc-500 hover:text-zinc-300'
              }`}
              title="Toggle Concentric Orbit Lines"
            >
              <Orbit size={12} className={showOrbitLines ? 'text-cyan-400' : 'text-zinc-500'} />
              <span className="hidden sm:inline">Orbit</span>
            </button>

            {/* Haptics Toggle */}
            <button
              onClick={() => setEnableHaptics(h => !h)}
              className={`flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-medium transition border ${
                enableHaptics
                  ? 'bg-white/[0.12] border-white/[0.2] text-white'
                  : 'bg-transparent border-transparent text-zinc-500 hover:text-zinc-300'
              }`}
              title="Toggle Tactile Haptics"
            >
              <Smartphone size={12} className={enableHaptics ? 'text-emerald-400' : 'text-zinc-500'} />
              <span className="hidden sm:inline">Haptics</span>
            </button>
          </div>
        </div>

        {/* Live Interactive Stage Canvas */}
        <div className="flex-1 w-full h-full min-h-0 relative rounded-3xl overflow-hidden border border-white/[0.06] shadow-2xl">
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
        </div>
      </main>

      {/* Code Snippet Modal */}
      {showCodeModal && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-md z-50 flex items-center justify-center p-4">
          <div className="bg-[#090b10] border border-white/[0.1] rounded-2xl w-full max-w-2xl overflow-hidden shadow-2xl animate-in fade-in zoom-in-95 duration-200">
            <div className="flex items-center justify-between px-5 py-3.5 bg-white/[0.02] border-b border-white/[0.08]">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-red-500/80" />
                <span className="w-2.5 h-2.5 rounded-full bg-yellow-500/80" />
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/80" />
                <span className="text-xs font-mono text-zinc-300 ml-2">RotaryFabExample.tsx</span>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={copyCode}
                  className="flex items-center gap-1.5 px-3 py-1 rounded-lg bg-white/[0.08] hover:bg-white/[0.15] text-white text-xs font-mono transition"
                >
                  {copied ? <Check size={13} className="text-emerald-400" /> : <Copy size={13} />}
                  <span>{copied ? 'Copied' : 'Copy JSX'}</span>
                </button>
                <button
                  onClick={() => setShowCodeModal(false)}
                  className="p-1 rounded-lg hover:bg-white/[0.08] text-zinc-400 hover:text-white transition"
                >
                  <X size={16} />
                </button>
              </div>
            </div>
            <pre className="p-5 font-mono text-xs text-zinc-300 overflow-x-auto max-h-[60vh] leading-relaxed selection:bg-cyan-500/20">
              <code>{getCodeSnippet()}</code>
            </pre>
          </div>
        </div>
      )}
    </div>
  );
}
