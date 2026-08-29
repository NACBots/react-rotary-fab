import React from 'react';
import { RotaryFab, RotaryFabItem, FabPlacement, FabTheme, AnimationMode, Icons } from 'react-rotary-fab';

interface MinimalCornerDemoProps {
  placement: FabPlacement;
  theme: FabTheme;
  animationMode?: AnimationMode;
  showOrbitLines?: boolean;
  enableHaptics: boolean;
}

export const MinimalCornerDemo: React.FC<MinimalCornerDemoProps> = ({
  placement,
  theme,
  animationMode = 'spring',
  showOrbitLines = true,
  enableHaptics
}) => {
  const items: RotaryFabItem[] = [
    { id: '1', title: 'Action 1', icon: <Icons.Zap size={18} /> },
    { id: '2', title: 'Action 2', icon: <Icons.Palette size={18} /> },
    { id: '3', title: 'Action 3', icon: <Icons.Layers size={18} /> },
    { id: '4', title: 'Action 4', icon: <Icons.Settings size={18} /> }
  ];

  return (
    <div className="relative w-full h-full min-h-0 rounded-3xl bg-[#090b12] border border-white/[0.07] overflow-hidden flex flex-col justify-between p-6 sm:p-8">
      {/* Centerpiece Minimal Hint */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none p-4">
        <div className="text-center space-y-2">
          <div className="w-12 h-12 rounded-full border border-white/[0.1] bg-white/[0.03] flex items-center justify-center mx-auto text-slate-400">
            <Icons.Layers size={20} />
          </div>
          <p className="text-xs font-mono text-slate-400">Single 4-Action Tier Arc</p>
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
        arcConfigs={[{ maxCount: 4, radius: 96, btnSize: 40, iconSize: 18 }]}
      />
    </div>
  );
};
