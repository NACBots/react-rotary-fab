import React from 'react';
import { RotaryFab, RotaryFabItem, FabPlacement, FabTheme, Icons } from 'react-rotary-fab';

interface MinimalCornerDemoProps {
  placement: FabPlacement;
  theme: FabTheme;
  enableHaptics: boolean;
}

export const MinimalCornerDemo: React.FC<MinimalCornerDemoProps> = ({
  placement,
  theme,
  enableHaptics
}) => {
  const items: RotaryFabItem[] = [
    { id: '1', title: 'Action 1', icon: <Icons.Zap size={18} /> },
    { id: '2', title: 'Action 2', icon: <Icons.Palette size={18} /> },
    { id: '3', title: 'Action 3', icon: <Icons.Layers size={18} /> },
    { id: '4', title: 'Action 4', icon: <Icons.Settings size={18} /> }
  ];

  return (
    <div className="relative w-full h-[520px] rounded-2xl bg-[#090b10] border border-slate-800/80 overflow-hidden shadow-2xl flex flex-col justify-between p-6">
      <div className="relative z-10 flex justify-between items-center">
        <span className="text-xs font-bold uppercase tracking-wider text-slate-400">Minimal Single-Arc Quadrant</span>
        <span className="text-xs font-mono text-slate-400 bg-slate-800/40 px-2.5 py-1 rounded border border-slate-700/50">
          Tier: 1 (4 items)
        </span>
      </div>

      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <p className="text-slate-500 text-sm">Click the floating button in the corner to toggle the menu.</p>
      </div>

      <RotaryFab
        items={items}
        placement={placement}
        theme={theme}
        style={{ position: 'absolute' }}
        enableHaptics={enableHaptics}
        arcConfigs={[{ maxCount: 4, radius: 92, btnSize: 40, iconSize: 18 }]}
      />
    </div>
  );
};
