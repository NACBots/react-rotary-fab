import React, { useState } from 'react';
import { RotaryFab, RotaryFabItem, FabPlacement, FabTheme, AnimationMode, Icons } from 'react-rotary-fab';

interface MediaPlayerDemoProps {
  placement: FabPlacement;
  theme: FabTheme;
  animationMode?: AnimationMode;
  showOrbitLines?: boolean;
  enableHaptics: boolean;
}

export const MediaPlayerDemo: React.FC<MediaPlayerDemoProps> = ({
  placement,
  theme,
  animationMode = 'spring',
  showOrbitLines = true,
  enableHaptics
}) => {
  const [isPlaying, setIsPlaying] = useState(true);
  const [volume, setVolume] = useState(72);
  const [isMuted, setIsMuted] = useState(false);
  const [videoActive, setVideoActive] = useState(true);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isHold, setIsHold] = useState(false);
  const [isDialOpen, setIsDialOpen] = useState(false);

  const items: RotaryFabItem[] = [
    {
      id: 'volume',
      title: 'Precision Volume Dial',
      icon: isMuted || volume === 0 ? <Icons.VolumeMute size={18} /> : <Icons.Volume size={18} />,
      onClick: () => setIsDialOpen(true)
    },
    {
      id: 'play',
      title: isPlaying ? 'Pause' : 'Play',
      icon: isPlaying ? <Icons.Pause size={18} /> : <Icons.Play size={18} />,
      active: isPlaying,
      onClick: () => setIsPlaying(p => !p)
    },
    {
      id: 'mic',
      title: isMuted ? 'Unmute Mic' : 'Mute Mic',
      icon: isMuted ? <Icons.MicOff size={18} /> : <Icons.MicOn size={18} />,
      danger: isMuted,
      active: isMuted,
      onClick: () => setIsMuted(m => !m)
    },
    {
      id: 'camera',
      title: videoActive ? 'Disable Video' : 'Enable Video',
      icon: videoActive ? <Icons.VideoOn size={18} /> : <Icons.VideoOff size={18} />,
      onClick: () => setVideoActive(v => !v)
    },
    {
      id: 'seek',
      title: 'Seek Position',
      icon: <Icons.Seek size={17} />
    },
    {
      id: 'hold',
      title: isHold ? 'Release Hold' : 'Hold Sync',
      icon: <Icons.Hold size={17} />,
      active: isHold,
      onClick: () => setIsHold(h => !h)
    },
    {
      id: 'layout',
      title: 'Theater Mode',
      icon: <Icons.Layout size={17} />
    },
    {
      id: 'fullscreen',
      title: isFullscreen ? 'Exit Fullscreen' : 'Fullscreen',
      icon: isFullscreen ? <Icons.FullscreenExit size={17} /> : <Icons.Fullscreen size={17} />,
      active: isFullscreen,
      onClick: () => setIsFullscreen(f => !f)
    },
    {
      id: 'settings',
      title: 'Settings',
      icon: <Icons.Settings size={17} />,
      hasBadge: true
    }
  ];

  return (
    <div className="relative w-full h-full min-h-0 rounded-3xl bg-[#090b12] border border-white/[0.07] overflow-hidden flex flex-col justify-between p-6 sm:p-8">
      {/* Background Ambient Glow */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_40%,rgba(56,189,248,0.06),transparent_60%)] pointer-events-none" />

      {/* Centerpiece Display (Clean Luxury Media Card) */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none p-4">
        <div className="text-center space-y-4 max-w-sm">
          {/* Animated Vinyl / Artwork Disk */}
          <div className="relative mx-auto w-24 h-24 sm:w-28 sm:h-28 rounded-full border border-white/10 bg-gradient-to-tr from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center shadow-2xl shadow-cyan-500/10">
            <div className={`w-10 h-10 rounded-full border border-cyan-500/30 bg-cyan-500/10 flex items-center justify-center ${isPlaying ? 'animate-spin' : ''}`} style={{ animationDuration: '8s' }}>
              <div className="w-3 h-3 rounded-full bg-cyan-400" />
            </div>
            {/* Pulsing ring when playing */}
            {isPlaying && (
              <span className="absolute inset-0 rounded-full border border-cyan-500/20 animate-ping opacity-40" />
            )}
          </div>

          <div className="space-y-1">
            <h3 className="text-sm sm:text-base font-semibold text-white tracking-tight">
              Chrono Symphony in D-Minor
            </h3>
            <p className="text-xs text-slate-400 font-mono">
              Lossless 24-bit • {isPlaying ? 'Playing' : 'Paused'}
            </p>
          </div>

          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/[0.04] border border-white/[0.08] text-[11px] font-mono text-slate-300">
            <span className="text-cyan-400">VOL {volume}%</span>
            <span>•</span>
            <span>{isMuted ? 'MIC OFF' : 'MIC ON'}</span>
          </div>
        </div>
      </div>

      {/* Embedded Rotary FAB Component */}
      <RotaryFab
        items={items}
        placement={placement}
        theme={theme}
        animationMode={animationMode}
        showOrbitLines={showOrbitLines}
        style={{ position: 'absolute' }}
        enableHaptics={enableHaptics}
        dialMode={isDialOpen}
        onDialModeChange={setIsDialOpen}
        dialProps={{
          value: volume,
          min: 0,
          max: 100,
          step: 1,
          unit: '% VOL',
          onChange: (val: number) => {
            setVolume(val);
            if (isMuted && val > 0) setIsMuted(false);
          }
        }}
      />
    </div>
  );
};
