import React, { useState } from 'react';
import { RotaryFab, RotaryFabItem, FabPlacement, FabTheme, AnimationMode, Icons } from 'react-rotary-fab';

interface SmartHomeDialDemoProps {
  placement: FabPlacement;
  theme: FabTheme;
  animationMode?: AnimationMode;
  showOrbitLines?: boolean;
  enableHaptics: boolean;
}

export const SmartHomeDialDemo: React.FC<SmartHomeDialDemoProps> = ({
  placement,
  theme,
  animationMode = 'spring',
  showOrbitLines = true,
  enableHaptics
}) => {
  const [temperature, setTemperature] = useState<number>(22);
  const [isEcoMode, setIsEcoMode] = useState<boolean>(true);
  const [isDialMode, setIsDialMode] = useState(true);

  const items: RotaryFabItem[] = [
    {
      id: 'temp-dial',
      title: 'Climate Arc Dial',
      icon: <Icons.Seek size={18} />,
      onClick: () => setIsDialMode(true)
    },
    {
      id: 'eco',
      title: isEcoMode ? 'Eco Mode Active' : 'Turbo Mode',
      icon: <Icons.Zap size={18} />,
      active: isEcoMode,
      onClick: () => setIsEcoMode(e => !e)
    },
    {
      id: 'settings',
      title: 'Settings',
      icon: <Icons.Settings size={18} />
    }
  ];

  return (
    <div className="relative w-full h-full min-h-0 rounded-3xl bg-[#090b12] border border-white/[0.07] overflow-hidden flex flex-col justify-between p-6 sm:p-8">
      {/* Ambient Climate Radial Glow */}
      <div 
        className="absolute inset-0 transition-opacity duration-700 pointer-events-none"
        style={{
          background: `radial-gradient(circle at 50% 50%, ${temperature > 24 ? 'rgba(239,68,68,0.08)' : temperature < 20 ? 'rgba(56,189,248,0.08)' : 'rgba(16,185,129,0.08)'}, transparent 60%)`
        }}
      />

      {/* Centerpiece Climate Display */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none p-4">
        <div className="text-center space-y-2">
          <div className="text-6xl sm:text-7xl font-extrabold tracking-tighter text-white font-mono flex items-start justify-center">
            {temperature.toFixed(1)}<span className="text-2xl text-cyan-400 ml-1 font-sans">°C</span>
          </div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/[0.04] border border-white/[0.08] text-[11px] font-mono text-slate-300">
            <span>CLIMATE NODE</span>
            <span>•</span>
            <span className={isEcoMode ? 'text-emerald-400' : 'text-amber-400'}>{isEcoMode ? 'ECO' : 'TURBO'}</span>
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
          value: temperature,
          min: 16,
          max: 30,
          step: 0.5,
          unit: '°C TEMP',
          onChange: setTemperature
        }}
      />
    </div>
  );
};
