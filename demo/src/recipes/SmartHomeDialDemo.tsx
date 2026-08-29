import React, { useState } from 'react';
import { RotaryFab, RotaryFabItem, FabPlacement, FabTheme, Icons } from 'react-rotary-fab';

interface SmartHomeDialDemoProps {
  placement: FabPlacement;
  theme: FabTheme;
  enableHaptics: boolean;
}

export const SmartHomeDialDemo: React.FC<SmartHomeDialDemoProps> = ({
  placement,
  theme,
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
      title: isEcoMode ? 'Eco Mode Active (Energy Saver)' : 'Turbo AC Mode',
      icon: <Icons.Zap size={18} />,
      active: isEcoMode,
      onClick: () => setIsEcoMode(e => !e)
    },
    {
      id: 'settings',
      title: 'Thermostat Schedules',
      icon: <Icons.Settings size={18} />
    }
  ];

  return (
    <div className="relative w-full h-[520px] rounded-2xl bg-gradient-to-tr from-[#0b101e] via-[#111827] to-[#030712] border border-slate-800 overflow-hidden shadow-2xl flex flex-col justify-between p-6">
      <div className="relative z-10 flex justify-between items-center">
        <span className="text-xs font-bold uppercase tracking-wider text-cyan-400">Smart Thermostat Node</span>
        <span className="text-xs font-mono text-cyan-300 bg-cyan-950/60 px-2.5 py-1 rounded-md border border-cyan-800/60">
          Target: {temperature}°C ({isEcoMode ? 'ECO' : 'TURBO'})
        </span>
      </div>

      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="text-center">
          <div className="text-6xl font-extrabold tracking-tighter text-white font-mono flex items-start justify-center">
            {temperature}<span className="text-2xl text-cyan-400 ml-1">°C</span>
          </div>
          <p className="text-xs uppercase tracking-widest text-slate-400 font-semibold mt-2">Living Room Climate</p>
        </div>
      </div>

      <RotaryFab
        items={items}
        placement={placement}
        theme={theme}
        enableHaptics={enableHaptics}
        dialMode={isDialMode}
        onDialModeChange={setIsDialMode}
        dialProps={{
          value: temperature,
          min: 16,
          max: 32,
          step: 0.5,
          unit: '°C TEMP',
          onChange: setTemperature
        }}
      />
    </div>
  );
};
