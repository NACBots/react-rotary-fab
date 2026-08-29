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
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(70);
  const [isMuted, setIsMuted] = useState(false);
  const [videoActive, setVideoActive] = useState(true);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isHold, setIsHold] = useState(false);
  const [statusMsg, setStatusMsg] = useState<string>('Ready');
  const [isDialOpen, setIsDialOpen] = useState(false);

  const items: RotaryFabItem[] = [
    // Tier 0: Core Quick Controls
    {
      id: 'volume',
      title: 'Precision Volume Dial',
      icon: isMuted || volume === 0 ? <Icons.VolumeMute size={18} /> : <Icons.Volume size={18} />,
      onClick: () => {
        setIsDialOpen(true);
        setStatusMsg('Adjusting Volume Dial');
      }
    },
    {
      id: 'play',
      title: isPlaying ? 'Pause Video' : 'Play Video',
      icon: isPlaying ? <Icons.Pause size={18} /> : <Icons.Play size={18} />,
      active: isPlaying,
      onClick: () => {
        setIsPlaying(p => !p);
        setStatusMsg(!isPlaying ? 'Playing Video' : 'Paused Video');
      }
    },
    {
      id: 'mic',
      title: isMuted ? 'Unmute Microphone' : 'Mute Microphone',
      icon: isMuted ? <Icons.MicOff size={18} /> : <Icons.MicOn size={18} />,
      danger: isMuted,
      active: isMuted,
      onClick: () => {
        setIsMuted(m => !m);
        setStatusMsg(isMuted ? 'Microphone Active' : 'Microphone Muted');
      }
    },
    {
      id: 'video',
      title: videoActive ? 'Turn Off Camera' : 'Turn On Camera',
      icon: videoActive ? <Icons.VideoOn size={18} /> : <Icons.VideoOff size={18} />,
      danger: !videoActive,
      active: !videoActive,
      onClick: () => {
        setVideoActive(v => !v);
        setStatusMsg(videoActive ? 'Camera Off' : 'Camera On');
      }
    },

    // Tier 1: Extended Player Controls
    {
      id: 'subtitle',
      title: 'Subtitles & Captions',
      icon: <Icons.Subtitle size={17} />,
      onClick: () => setStatusMsg('Subtitles dialog opened')
    },
    {
      id: 'seek',
      title: 'Seek Time Position',
      icon: <Icons.Seek size={17} />,
      onClick: () => setStatusMsg('Seek position scrubber opened')
    },
    {
      id: 'hold',
      title: isHold ? 'Release Hold' : 'Hold Sync Position',
      icon: <Icons.Hold size={17} />,
      active: isHold,
      onClick: () => {
        setIsHold(h => !h);
        setStatusMsg(isHold ? 'Sync released' : 'Video sync held');
      }
    },
    {
      id: 'layout',
      title: 'Toggle Theater / Floating View',
      icon: <Icons.Layout size={17} />,
      onClick: () => setStatusMsg('Switched player layout mode')
    },
    {
      id: 'fullscreen',
      title: isFullscreen ? 'Exit Fullscreen' : 'Enter Fullscreen',
      icon: isFullscreen ? <Icons.FullscreenExit size={17} /> : <Icons.Fullscreen size={17} />,
      active: isFullscreen,
      onClick: () => {
        setIsFullscreen(f => !f);
        setStatusMsg(isFullscreen ? 'Exited fullscreen' : 'Entered fullscreen');
      }
    },
    {
      id: 'settings',
      title: 'Audio / Video Settings',
      icon: <Icons.Settings size={17} />,
      hasBadge: true,
      onClick: () => setStatusMsg('Control panel opened')
    }
  ];

  return (
    <div className="relative w-full h-[520px] rounded-2xl bg-gradient-to-br from-slate-900 via-[#0d1117] to-black border border-slate-800/80 overflow-hidden shadow-2xl flex flex-col justify-between p-6">
      {/* Video Simulation Canvas */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-blue-900/20 via-slate-950/60 to-black z-0 flex items-center justify-center pointer-events-none">
        <div className="text-center space-y-3">
          <div className="w-20 h-20 rounded-full border border-cyan-500/30 bg-cyan-500/10 flex items-center justify-center mx-auto backdrop-blur-md">
            {isPlaying ? <Icons.Play size={32} className="text-cyan-400 animate-pulse ml-1" /> : <Icons.Pause size={32} className="text-slate-400" />}
          </div>
          <p className="text-slate-400 text-sm font-medium tracking-wide">
            {isPlaying ? 'PLAYING: Interstellar - 4K Dolby Atmos' : 'PAUSED'}
          </p>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-800/60 border border-slate-700/60 text-xs text-slate-300 font-mono">
            <span>VOL: {volume}%</span>
            <span>•</span>
            <span>MIC: {isMuted ? 'MUTED' : 'ON'}</span>
            <span>•</span>
            <span>CAM: {videoActive ? 'LIVE' : 'OFF'}</span>
          </div>
        </div>
      </div>

      {/* Top HUD */}
      <div className="relative z-10 flex justify-between items-center">
        <div className="flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-ping" />
          <span className="text-xs font-semibold tracking-wider uppercase text-emerald-400">Media Master Stream</span>
        </div>
        <div className="text-xs font-mono text-slate-400 bg-slate-800/50 px-2.5 py-1 rounded-md border border-slate-700/40">
          Last Action: <span className="text-cyan-300 font-semibold">{statusMsg}</span>
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
          onChange: val => {
            setVolume(val);
            if (isMuted && val > 0) setIsMuted(false);
          }
        }}
      />
    </div>
  );
};
