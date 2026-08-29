import React, { useState } from 'react';
import { RotaryFab, RotaryFabItem, FabPlacement, FabTheme, Icons } from 'react-rotary-fab';

interface CreativeStudioDemoProps {
  placement: FabPlacement;
  theme: FabTheme;
  enableHaptics: boolean;
}

export const CreativeStudioDemo: React.FC<CreativeStudioDemoProps> = ({
  placement,
  theme,
  enableHaptics
}) => {
  const [activeTool, setActiveTool] = useState<string>('brush');
  const [zoomLevel, setZoomLevel] = useState<number>(100);
  const [brushSize, setBrushSize] = useState<number>(14);
  const [isDialMode, setIsDialMode] = useState(false);
  const [dialTarget, setDialTarget] = useState<'zoom' | 'brush'>('zoom');

  const items: RotaryFabItem[] = [
    {
      id: 'zoom-dial',
      title: 'Canvas Zoom Dial',
      icon: <Icons.ZoomIn size={18} />,
      onClick: () => {
        setDialTarget('zoom');
        setIsDialMode(true);
      }
    },
    {
      id: 'brush',
      title: 'Precision Brush Tool',
      icon: <Icons.Palette size={18} />,
      active: activeTool === 'brush',
      onClick: () => setActiveTool('brush')
    },
    {
      id: 'layers',
      title: 'Layer Stack Inspector',
      icon: <Icons.Layers size={18} />,
      hasBadge: 3,
      onClick: () => setActiveTool('layers')
    },
    {
      id: 'effects',
      title: 'Shader Effects & Filters',
      icon: <Icons.Zap size={18} />,
      onClick: () => setActiveTool('effects')
    }
  ];

  return (
    <div className="relative w-full h-[520px] rounded-2xl bg-[#0e1017] border border-slate-800 overflow-hidden shadow-2xl flex flex-col justify-between p-6">
      {/* Studio Canvas Grid Background */}
      <div 
        className="absolute inset-0 bg-[linear-gradient(to_right,#1e293b18_1px,transparent_1px),linear-gradient(to_bottom,#1e293b18_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none flex items-center justify-center"
      >
        <div 
          className="w-72 h-72 border border-slate-700/60 bg-slate-900/40 rounded-xl flex items-center justify-center backdrop-blur-sm transition-transform duration-300"
          style={{ transform: `scale(${zoomLevel / 100})` }}
        >
          <div className="text-center space-y-2">
            <span className="text-4xl">🎨</span>
            <p className="text-slate-300 text-sm font-semibold">Creative Canvas</p>
            <p className="text-slate-500 text-xs font-mono">Zoom: {zoomLevel}% • Tool: {activeTool.toUpperCase()}</p>
          </div>
        </div>
      </div>

      <div className="relative z-10 flex justify-between items-center">
        <span className="text-xs font-bold uppercase tracking-wider text-purple-400">Design Studio Pro</span>
        <span className="text-xs font-mono text-slate-400 bg-slate-800/80 px-2.5 py-1 rounded border border-slate-700">
          Scale: {zoomLevel}%
        </span>
      </div>

      <RotaryFab
        items={items}
        placement={placement}
        theme={theme}
        style={{ position: 'absolute' }}
        enableHaptics={enableHaptics}
        dialMode={isDialMode}
        onDialModeChange={setIsDialMode}
        dialProps={{
          value: zoomLevel,
          min: 25,
          max: 300,
          step: 5,
          unit: '% ZOOM',
          onChange: setZoomLevel
        }}
      />
    </div>
  );
};
