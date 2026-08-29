import React, { useState } from 'react';
import { RotaryFab, RotaryFabItem, FabPlacement, FabTheme, AnimationMode, Icons } from 'react-rotary-fab';

interface CreativeStudioDemoProps {
  placement: FabPlacement;
  theme: FabTheme;
  animationMode?: AnimationMode;
  showOrbitLines?: boolean;
  enableHaptics: boolean;
}

export const CreativeStudioDemo: React.FC<CreativeStudioDemoProps> = ({
  placement,
  theme,
  animationMode = 'spring',
  showOrbitLines = true,
  enableHaptics
}) => {
  const [activeTool, setActiveTool] = useState<string>('brush');
  const [zoomLevel, setZoomLevel] = useState<number>(100);
  const [isDialMode, setIsDialMode] = useState<boolean>(false);

  const items: RotaryFabItem[] = [
    {
      id: 'zoom',
      title: 'Canvas Zoom Dial',
      icon: <Icons.Seek size={18} />,
      onClick: () => setIsDialMode(true)
    },
    {
      id: 'brush',
      title: 'Brush Tool',
      icon: <Icons.Brush size={18} />,
      active: activeTool === 'brush',
      onClick: () => setActiveTool('brush')
    },
    {
      id: 'layers',
      title: 'Layers Panel',
      icon: <Icons.Layers size={18} />,
      hasBadge: 3,
      onClick: () => setActiveTool('layers')
    },
    {
      id: 'effects',
      title: 'Shader Filters',
      icon: <Icons.Zap size={18} />,
      onClick: () => setActiveTool('effects')
    }
  ];

  return (
    <div className="relative w-full h-full min-h-0 rounded-3xl bg-[#090b12] border border-white/[0.07] overflow-hidden flex flex-col justify-between p-6 sm:p-8">
      {/* Studio Dot Grid Background */}
      <div className="absolute inset-0 bg-dot-grid opacity-30 pointer-events-none" />

      {/* Centerpiece Display (Minimal Vector Artboard) */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none p-4">
        <div 
          className="w-56 h-56 sm:w-64 sm:h-64 border border-white/[0.12] bg-white/[0.02] rounded-2xl flex items-center justify-center backdrop-blur-sm transition-transform duration-300 shadow-2xl shadow-black/60"
          style={{ transform: `scale(${zoomLevel / 100})` }}
        >
          <div className="text-center space-y-2">
            <span className="text-3xl">✦</span>
            <p className="text-white text-sm font-medium tracking-tight">Artboard Canvas</p>
            <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-white/[0.06] text-[11px] font-mono text-slate-400">
              <span>{zoomLevel}%</span>
              <span>•</span>
              <span className="text-cyan-400 uppercase">{activeTool}</span>
            </div>
          </div>
        </div>
      </div>

      <RotaryFab
        items={items}
        placement={placement}
        theme={theme}
        animationMode={animationMode}
        showOrbitLines={showOrbitLines}
        style={{ position: 'absolute' }}
        enableHaptics={enableHaptics}
        dialMode={isDialMode}
        onDialModeChange={setIsDialMode}
        dialProps={{
          value: zoomLevel,
          min: 25,
          max: 200,
          step: 5,
          unit: '% ZOOM',
          onChange: setZoomLevel
        }}
      />
    </div>
  );
};
