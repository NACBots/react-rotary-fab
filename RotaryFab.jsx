import React, { useRef, useState, useEffect, useCallback, useMemo } from 'react';
import { Tooltip, message } from 'antd';

// Safe tactile haptic feedback engine
const triggerHaptic = (type = 'light') => {
    if (typeof window === 'undefined' || typeof navigator === 'undefined' || !navigator.vibrate) return;
    try {
        switch (type) {
            case 'tick':
                navigator.vibrate(8);
                break;
            case 'light':
                navigator.vibrate(12);
                break;
            case 'medium':
                navigator.vibrate(18);
                break;
            case 'click':
                navigator.vibrate(14);
                break;
            case 'toggle':
                navigator.vibrate([12, 30, 15]);
                break;
            case 'boundary':
                navigator.vibrate([15, 35, 25]);
                break;
            case 'danger':
                navigator.vibrate([18, 40, 22]);
                break;
            default:
                navigator.vibrate(10);
        }
    } catch {}
};

const RotaryFab = ({
    isPlaying,
    togglePlayPause,
    volume,
    onVolumeChange,
    audioEnabled,
    toggleAudio,
    videoEnabled,
    toggleVideo,
    isHoldMode,
    enterHoldMode,
    exitHoldMode,
    isFullscreen,
    toggleFullscreen,
    layoutMode,
    onLayoutChange,
    onOpenSettings,
    onOpenTimeModal,
    subtitleName,
    subtitleOffset,
    onSubtitleLoad,
    onSubtitleOffsetChange,
    onRemoveSubtitle,
    hasActiveCall,
    isEmergencyMode,
    isLandscape,
    isMobile,
    onOpenChange,
    isAutohidden
}) => {
    const [isOpen, setIsOpen] = useState(false);
    const [isVolumeMode, setIsVolumeMode] = useState(false);
    const [isDraggingVolume, setIsDraggingVolume] = useState(false);

    const anchorRef = useRef(null);
    const sliderSvgRef = useRef(null);
    const subtitleInputRef = useRef(null);

    // Notify parent about FAB open/active state
    useEffect(() => {
        onOpenChange?.(isOpen || isVolumeMode);
    }, [isOpen, isVolumeMode, onOpenChange]);

    // Auto-close open wheel and volume mode when autohidden
    useEffect(() => {
        if (isAutohidden) {
            setIsOpen(false);
            setIsVolumeMode(false);
        }
    }, [isAutohidden]);

    // Auto-collapse open rotary wheel after inactivity
    useEffect(() => {
        if (!isOpen && !isVolumeMode) return;

        let collapseTimer;
        const resetCollapseTimer = () => {
            clearTimeout(collapseTimer);
            collapseTimer = setTimeout(() => {
                if (!isDraggingVolume) {
                    setIsOpen(false);
                    setIsVolumeMode(false);
                }
            }, 9500);
        };

        resetCollapseTimer();

        window.addEventListener('mousemove', resetCollapseTimer, { passive: true });
        window.addEventListener('touchstart', resetCollapseTimer, { passive: true });
        window.addEventListener('touchmove', resetCollapseTimer, { passive: true });
        window.addEventListener('keydown', resetCollapseTimer, { passive: true });

        return () => {
            clearTimeout(collapseTimer);
            window.removeEventListener('mousemove', resetCollapseTimer);
            window.removeEventListener('touchstart', resetCollapseTimer);
            window.removeEventListener('touchmove', resetCollapseTimer);
            window.removeEventListener('keydown', resetCollapseTimer);
        };
    }, [isOpen, isVolumeMode, isDraggingVolume]);

    // Close when clicking outside
    useEffect(() => {
        const handleClickOutside = (e) => {
            if (anchorRef.current && !anchorRef.current.contains(e.target)) {
                setIsOpen(false);
                setTimeout(() => setIsVolumeMode(false), 400);
            }
        };
        document.addEventListener('pointerdown', handleClickOutside);
        return () => document.removeEventListener('pointerdown', handleClickOutside);
    }, []);

    // Handle direct subtitle file selection from the CC icon
    const handleSubtitleFileSelect = (e) => {
        const file = e.target.files?.[0];
        if (!file) return;
        const reader = new FileReader();
        reader.onload = (event) => {
            const content = event.target?.result;
            if (content && onSubtitleLoad) {
                onSubtitleLoad(content, file.name, true);
                message.success(`Loaded subtitles: ${file.name}`);
            }
        };
        reader.readAsText(file);
        e.target.value = '';
    };

    // Minimal Watch-Inspired Icons
    const icons = {
        volume: (
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
                <path d="M15.5 8.5a5 5 0 0 1 0 7" strokeWidth="1.8" />
                <path d="M19 5a9.5 9.5 0 0 1 0 14" strokeWidth="1.8" strokeDasharray="1.5 3" />
            </svg>
        ),
        volumeMute: (
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
                <line x1="23" y1="9" x2="17" y2="15" />
                <line x1="17" y1="9" x2="23" y2="15" />
            </svg>
        ),
        play: (
            <svg viewBox="0 0 24 24" fill="currentColor">
                <polygon points="6 4 20 12 6 20 6 4" />
            </svg>
        ),
        pause: (
            <svg viewBox="0 0 24 24" fill="currentColor">
                <rect x="6" y="4" width="4" height="16" />
                <rect x="14" y="4" width="4" height="16" />
            </svg>
        ),
        micOn: (
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z" />
                <path d="M19 10v2a7 7 0 0 1-14 0v-2" />
                <line x1="12" y1="19" x2="12" y2="23" />
                <line x1="8" y1="23" x2="16" y2="23" />
            </svg>
        ),
        micOff: (
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="1" y1="1" x2="23" y2="23" />
                <path d="M9 9v3a3 3 0 0 0 5.12 2.12M15 9.34V4a3 3 0 0 0-5.94-.6" />
                <path d="M17 16.95A7 7 0 0 1 5 12v-2m14 0v2a7 7 0 0 1-.11 1.23" />
                <line x1="12" y1="19" x2="12" y2="23" />
                <line x1="8" y1="23" x2="16" y2="23" />
            </svg>
        ),
        videoOn: (
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polygon points="23 7 16 12 23 17 23 7" />
                <rect x="1" y="5" width="15" height="14" rx="2" ry="2" />
            </svg>
        ),
        videoOff: (
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M16 16v1a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V7a2 2 0 0 1 2-2h2m5.66 0H14a2 2 0 0 1 2 2v3.34l1 1L23 7v10" />
                <line x1="1" y1="1" x2="23" y2="23" />
            </svg>
        ),
        subtitle: (
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="2" y="4" width="20" height="16" rx="2" ry="2" />
                <line x1="6" y1="15" x2="10" y2="15" />
                <line x1="6" y1="11" x2="10" y2="11" />
                <line x1="14" y1="15" x2="18" y2="15" />
                <line x1="14" y1="11" x2="18" y2="11" />
            </svg>
        ),
        seek: (
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="10" />
                <polyline points="12 6 12 12 16 14" />
            </svg>
        ),
        hold: (
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="12" y1="17" x2="12" y2="22" />
                <path d="M5 17h14v-1.76a2 2 0 0 0-1.11-1.79l-1.78-.9A2 2 0 0 1 15 10.76V6h1a1 1 0 0 0 0-2H8a1 1 0 0 0 0 2h1v4.76a2 2 0 0 1-1.11 1.79l-1.78.9A2 2 0 0 0 5 15.24V17z" />
            </svg>
        ),
        layout: (
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
                <line x1="3" y1="9" x2="21" y2="9" />
                <line x1="9" y1="21" x2="9" y2="9" />
            </svg>
        ),
        fullscreen: (
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="15 3 21 3 21 9" />
                <polyline points="9 21 3 21 3 15" />
                <polyline points="21 15 21 21 15 21" />
                <polyline points="3 9 3 3 9 3" />
            </svg>
        ),
        fullscreenExit: (
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="4 14 10 14 10 20" />
                <polyline points="20 10 14 10 14 4" />
                <polyline points="14 20 14 14 20 14" />
                <polyline points="10 4 10 10 4 10" />
            </svg>
        ),
        settings: (
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="3" />
                <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z" />
            </svg>
        )
    };

    // 10 Balanced Menu Items across 2 Concentric Arcs (4 inner, 6 outer)
    const menuItems = [
        // --- Tier 0: 4 Inner Ring Items (Radius 94-102px) ---
        {
            id: 'volume',
            title: '', // Tooltip removed to prevent overlapping the main FAB
            icon: (volume ?? 1) === 0 ? icons.volumeMute : icons.volume,
            active: false,
            onClick: () => {
                setIsVolumeMode(true);
            }
        },
        {
            id: 'play',
            title: isPlaying ? 'Pause (Space)' : 'Play (Space)',
            icon: isPlaying ? icons.pause : icons.play,
            active: isPlaying,
            onClick: () => {
                togglePlayPause();
                setIsOpen(false);
            }
        },
        {
            id: 'mute',
            title: audioEnabled ? 'Mute Mic' : 'Unmute Mic',
            icon: audioEnabled ? icons.micOn : icons.micOff,
            danger: !audioEnabled,
            active: !audioEnabled,
            onClick: () => {
                toggleAudio();
                setIsOpen(false);
            }
        },
        {
            id: 'video',
            title: videoEnabled ? 'Turn Off Camera' : 'Turn On Camera',
            icon: videoEnabled ? icons.videoOn : icons.videoOff,
            danger: !videoEnabled,
            active: !videoEnabled,
            onClick: () => {
                toggleVideo();
                setIsOpen(false);
            }
        },

        // --- Tier 1: 6 Outer Ring Items (Radius 138px) ---
        {
            id: 'subtitle',
            title: subtitleName
                ? `Subtitles: ${subtitleName} (${subtitleOffset === 0 ? 'Synced' : `${subtitleOffset > 0 ? '+' : ''}${subtitleOffset.toFixed(1)}s`})`
                : 'Add Subtitles (.VTT / .SRT)',
            icon: icons.subtitle,
            active: !!subtitleName,
            onClick: () => {
                if (subtitleInputRef.current) {
                    subtitleInputRef.current.click();
                }
                setIsOpen(false);
            }
        },
        {
            id: 'seek',
            title: 'Seek Position',
            icon: icons.seek,
            active: false,
            onClick: () => {
                onOpenTimeModal();
                setIsOpen(false);
            }
        },
        {
            id: 'hold',
            title: isHoldMode ? 'Release Hold Mode' : 'Hold Video Sync (P)',
            icon: icons.hold,
            active: isHoldMode,
            onClick: () => {
                if (isHoldMode) exitHoldMode();
                else enterHoldMode('pause');
                setIsOpen(false);
            }
        },
        {
            id: 'layout',
            title: layoutMode === 'cinema' ? 'Floating View' : 'Cinema View',
            icon: icons.layout,
            active: layoutMode === 'cinema',
            onClick: () => {
                onLayoutChange(layoutMode === 'cinema' ? 'floating' : 'cinema');
                setIsOpen(false);
            }
        },
        {
            id: 'fullscreen',
            title: isFullscreen ? 'Exit Fullscreen' : 'Fullscreen',
            icon: isFullscreen ? icons.fullscreenExit : icons.fullscreen,
            active: isFullscreen,
            onClick: () => {
                toggleFullscreen();
                setIsOpen(false);
            }
        },
        {
            id: 'settings',
            title: 'Control Panel & Friends',
            icon: icons.settings,
            hasBadge: !hasActiveCall,
            active: false,
            onClick: () => {
                onOpenSettings();
                setIsOpen(false);
            }
        }
    ];

    // Screen-Safe, Snug Corner Radii with Generous Spacing
    const arcConfigs = [
        { maxCount: 4, radius: isMobile ? 102 : 94, btnSize: isMobile ? 42 : 38, iconSize: isMobile ? 19 : 17 },
        { maxCount: 6, radius: isMobile ? 166 : 152, btnSize: isMobile ? 38 : 36, iconSize: isMobile ? 18 : 16 }
    ];

    // -------------------------------------------------------------
    // MINIMAL WATCH LINE DIAL ARCH (Bottom-Left Corner)
    // -------------------------------------------------------------
    const sliderRadius = isMobile ? 134 : 124;
    const safeVolume = Math.max(0, Math.min(1, volume ?? 1));
    const maxDashOffset = (Math.PI * sliderRadius) / 2;
    const strokeOffset = maxDashOffset - safeVolume * maxDashOffset;
    
    // Angle in radians (0 to π/2)
    const angle = safeVolume * (Math.PI / 2);
    const thumbCx = sliderRadius * Math.cos(angle);
    const thumbCy = -sliderRadius * Math.sin(angle);
    const needleX1 = (sliderRadius - 10) * Math.cos(angle);
    const needleY1 = -(sliderRadius - 10) * Math.sin(angle);
    const needleX2 = (sliderRadius + 10) * Math.cos(angle);
    const needleY2 = -(sliderRadius + 10) * Math.sin(angle);

    // Generate precision watch dial ticks (21 ticks: major every 25%, minor intermediate)
    const watchDialTicks = useMemo(() => {
        const ticks = [];
        const tickCount = 20; // 0 to 20 = 21 tick marks (every 5%)
        for (let i = 0; i <= tickCount; i++) {
            const t = i / tickCount; // 0.0 to 1.0
            const tickAngle = t * (Math.PI / 2);
            const isMajor = i % 5 === 0; // 0%, 25%, 50%, 75%, 100%
            const isActive = t <= safeVolume + 0.005;

            const rInner = isMajor ? sliderRadius - 8 : sliderRadius - 4;
            const rOuter = isMajor ? sliderRadius + 8 : sliderRadius + 4;

            const x1 = rInner * Math.cos(tickAngle);
            const y1 = -rInner * Math.sin(tickAngle);
            const x2 = rOuter * Math.cos(tickAngle);
            const y2 = -rOuter * Math.sin(tickAngle);

            ticks.push({
                id: `tick-${i}`,
                x1, y1, x2, y2,
                isMajor,
                isActive
            });
        }
        return ticks;
    }, [sliderRadius, safeVolume]);

    // Concentric Inner Dot Orbit for Volume Slider (Deep inner celestial track nestled close to core)
    const innerDotRadius = isMobile ? sliderRadius - 64 : sliderRadius - 56;
    const volumeDotOrbit = useMemo(() => {
        const dots = [];
        const numDots = 12; // 13 micro-dots across the 90-degree quadrant
        for (let i = 0; i <= numDots; i++) {
            const t = i / numDots;
            const dotAngle = t * (Math.PI / 2);
            const isActive = t <= safeVolume + 0.02;
            const isMajor = i % 3 === 0; // 0%, 25%, 50%, 75%, 100%

            const x = innerDotRadius * Math.cos(dotAngle);
            const y = -innerDotRadius * Math.sin(dotAngle);

            dots.push({
                id: `vdot-${i}`,
                x,
                y,
                isActive,
                isMajor,
                t
            });
        }
        return dots;
    }, [innerDotRadius, safeVolume]);

    const lastHapticStepRef = useRef(Math.round(safeVolume * 20));

    const handlePointerMove = useCallback((e) => {
        if (!sliderSvgRef.current) return;
        const rect = sliderSvgRef.current.getBoundingClientRect();
        // Origin is at bottom-left corner of the SVG container
        const centerX = rect.left;
        const centerY = rect.bottom;
        const dx = e.clientX - centerX;
        const dy = e.clientY - centerY;

        // Angle from horizontal right axis (dx > 0) upwards (dy < 0)
        let curAngle = Math.atan2(-dy, dx);

        // Clamp between 0 (horizontal right, 0%) and π/2 (top peak, 100%)
        if (curAngle < 0) curAngle = 0;
        if (curAngle > Math.PI / 2) curAngle = Math.PI / 2;

        const volPercent = curAngle / (Math.PI / 2);
        const clamped = Math.max(0, Math.min(1, volPercent));

        // Precision dial physical step haptics (20 discrete ticks across 0-100%)
        const step = Math.round(clamped * 20);
        if (step !== lastHapticStepRef.current) {
            lastHapticStepRef.current = step;
            if (step === 0 || step === 20) {
                triggerHaptic('boundary'); // Solid tactile bump at min/max extremes
            } else if (step % 5 === 0) {
                triggerHaptic('medium'); // Defined click on 25%, 50%, 75% quarters
            } else {
                triggerHaptic('tick'); // Delicate micro-tick on intermediate 5% intervals
            }
        }

        onVolumeChange(clamped);
    }, [onVolumeChange]);

    const handlePointerDown = (e) => {
        setIsDraggingVolume(true);
        triggerHaptic('light');
        if (sliderSvgRef.current) {
            sliderSvgRef.current.setPointerCapture(e.pointerId);
        }
        handlePointerMove(e);
    };

    const handlePointerUp = (e) => {
        setIsDraggingVolume(false);
        triggerHaptic('tick');
        if (sliderSvgRef.current) {
            try {
                sliderSvgRef.current.releasePointerCapture(e.pointerId);
            } catch {}
        }
    };

    if (isEmergencyMode) return null;

    let itemIndex = 0;
    const svgPadding = 20;
    const svgDim = sliderRadius + svgPadding;

    return (
        <div
            ref={anchorRef}
            className={`fab-anchor ${isOpen ? 'active' : ''} ${isVolumeMode ? 'mode-volume' : ''} ${isAutohidden ? 'autohidden' : ''}`}
        >
            {/* Ambient Corner Gradient Backdrop for Enhanced Contrast */}
            <div className="fab-corner-gradient" />

            {/* Hidden Subtitle File Picker */}
            <input
                ref={subtitleInputRef}
                type="file"
                accept=".vtt,.srt"
                style={{ display: 'none' }}
                onChange={handleSubtitleFileSelect}
            />

            {/* 1. Concentric Rotary Wheel Assembly (10 items: 4 inner, 6 outer) */}
            <div className="fab-wheel" id="fabWheel">
                {/* Visual Line-Type Concentric Orbit Tracks */}
                <svg
                    className="fab-orbit-tracks-svg"
                    width={arcConfigs[1].radius + 30}
                    height={arcConfigs[1].radius + 30}
                    viewBox={`0 -${arcConfigs[1].radius + 30} ${arcConfigs[1].radius + 30} ${arcConfigs[1].radius + 30}`}
                    style={{
                        position: 'absolute',
                        bottom: 0,
                        left: 0,
                        overflow: 'visible',
                        pointerEvents: 'none',
                        zIndex: 1
                    }}
                >
                    {/* Inner Orbit Line (Tier 0) */}
                    <path
                        d={`M 0 -${arcConfigs[0].radius} A ${arcConfigs[0].radius} ${arcConfigs[0].radius} 0 0 1 ${arcConfigs[0].radius} 0`}
                        fill="none"
                        stroke="rgba(255, 255, 255, 0.2)"
                        strokeWidth="1.2"
                        strokeDasharray="3 5"
                        strokeLinecap="round"
                    />
                    {/* Outer Orbit Line (Tier 1) */}
                    <path
                        d={`M 0 -${arcConfigs[1].radius} A ${arcConfigs[1].radius} ${arcConfigs[1].radius} 0 0 1 ${arcConfigs[1].radius} 0`}
                        fill="none"
                        stroke="rgba(255, 255, 255, 0.14)"
                        strokeWidth="1.2"
                        strokeDasharray="4 6"
                        strokeLinecap="round"
                    />
                    {/* Orbit Anchor Pips */}
                    <circle cx="0" cy={-arcConfigs[0].radius} r="2" fill="#ffffff" opacity="0.65" />
                    <circle cx={arcConfigs[0].radius} cy="0" r="2" fill="#ffffff" opacity="0.65" />
                    <circle cx="0" cy={-arcConfigs[1].radius} r="2" fill="#ffffff" opacity="0.5" />
                    <circle cx={arcConfigs[1].radius} cy="0" r="2" fill="#ffffff" opacity="0.5" />
                </svg>

                {arcConfigs.map((config, tierIndex) => {
                    if (itemIndex >= menuItems.length) return null;

                    const countInArc = Math.min(menuItems.length - itemIndex, config.maxCount);
                    const angleStep = countInArc > 1 ? 90 / (countInArc - 1) : 0;
                    const tierItems = menuItems.slice(itemIndex, itemIndex + countInArc);
                    itemIndex += countInArc;

                    return tierItems.map((item, i) => {
                        // Angle from 90 deg (top) down to 0 deg (right)
                        const angleDeg = 90 - (i * angleStep);
                        const angleRad = (angleDeg * Math.PI) / 180;

                        // Trig positioning for bottom-left:
                        // x is positive (move right into screen), y is negative (move up into screen)
                        const x = Math.round(config.radius * Math.cos(angleRad));
                        const y = -Math.round(config.radius * Math.sin(angleRad));

                        const buttonEl = (
                            <button
                                key={item.id}
                                className={`fab-item tier-${tierIndex} ${item.active ? 'item-active' : ''} ${item.danger ? 'item-danger' : ''}`}
                                style={{
                                    position: 'absolute',
                                    top: 0,
                                    left: 0,
                                    width: `${config.btnSize}px`,
                                    height: `${config.btnSize}px`,
                                    '--tx': `${x}px`,
                                    '--ty': `${y}px`,
                                    transform: `translate(${x}px, ${y}px)`,
                                    marginTop: `-${config.btnSize / 2}px`,
                                    marginLeft: `-${config.btnSize / 2}px`
                                }}
                                onClick={(e) => {
                                    e.stopPropagation();
                                    if (item.danger) {
                                        triggerHaptic('danger');
                                    } else if (item.id === 'play' || item.id === 'volume') {
                                        triggerHaptic('toggle');
                                    } else {
                                        triggerHaptic('click');
                                    }
                                    item.onClick();
                                }}
                            >
                                {React.cloneElement(item.icon, {
                                    style: {
                                        width: `${config.iconSize}px`,
                                        height: `${config.iconSize}px`
                                    }
                                })}
                                {item.hasBadge && (
                                    <span
                                        style={{
                                            position: 'absolute',
                                            top: '3px',
                                            right: '3px',
                                            width: '5px',
                                            height: '5px',
                                            borderRadius: '50%',
                                            background: '#ffffff',
                                            boxShadow: '0 0 6px #ffffff'
                                        }}
                                    />
                                )}
                            </button>
                        );

                        return item.title ? (
                            <Tooltip key={item.id} title={item.title} placement="right">
                                {buttonEl}
                            </Tooltip>
                        ) : buttonEl;
                    });
                })}
            </div>

            {/* 2. Minimal Precision Watch Line Dial Volume Arch (Bottom-Left quadrant) */}
            <div className="volume-arch" id="volumeArch">
                <svg
                    ref={sliderSvgRef}
                    width={svgDim}
                    height={svgDim}
                    viewBox={`0 -${svgDim} ${svgDim} ${svgDim}`}
                    className="slider-svg"
                    id="sliderSvg"
                    onPointerDown={handlePointerDown}
                    onPointerMove={isDraggingVolume ? handlePointerMove : undefined}
                    onPointerUp={handlePointerUp}
                    onPointerCancel={handlePointerUp}
                >
                    {/* Minimal Inner Dotted Orbit Line */}
                    <path
                        d={`M ${innerDotRadius} 0 A ${innerDotRadius} ${innerDotRadius} 0 0 0 0 -${innerDotRadius}`}
                        fill="none"
                        stroke="rgba(255, 255, 255, 0.12)"
                        strokeWidth="0.8"
                        strokeDasharray="1.5 3.5"
                    />

                    {/* Minimal Celestial Micro-Dots along Inner Orbit */}
                    {volumeDotOrbit.map(dot => (
                        <circle
                            key={dot.id}
                            cx={dot.x}
                            cy={dot.y}
                            r={dot.isActive ? (dot.isMajor ? 2.2 : 1.5) : (dot.isMajor ? 1.6 : 1.0)}
                            fill={dot.isActive ? '#ffffff' : 'rgba(255, 255, 255, 0.2)'}
                            style={{
                                transition: 'fill 0.15s ease, r 0.15s ease',
                                filter: dot.isActive ? 'drop-shadow(0 0 2px rgba(255, 255, 255, 0.7))' : 'none'
                            }}
                        />
                    ))}

                    {/* Subtle Outer Bezel Guideline */}
                    <path
                        d={`M ${sliderRadius + 8} 0 A ${sliderRadius + 8} ${sliderRadius + 8} 0 0 0 0 -${sliderRadius + 8}`}
                        fill="none"
                        stroke="rgba(255, 255, 255, 0.08)"
                        strokeWidth="1"
                    />

                    {/* Subtle Inner Bezel Guideline */}
                    <path
                        d={`M ${sliderRadius - 8} 0 A ${sliderRadius - 8} ${sliderRadius - 8} 0 0 0 0 -${sliderRadius - 8}`}
                        fill="none"
                        stroke="rgba(255, 255, 255, 0.08)"
                        strokeWidth="1"
                    />

                    {/* Background Thin Center Track */}
                    <path
                        className="slider-track"
                        d={`M ${sliderRadius} 0 A ${sliderRadius} ${sliderRadius} 0 0 0 0 -${sliderRadius}`}
                        fill="none"
                        stroke="rgba(255, 255, 255, 0.14)"
                        strokeWidth="1.5"
                    />

                    {/* Active Illuminated Fill Arc */}
                    <path
                        className="slider-fill"
                        id="volFill"
                        d={`M ${sliderRadius} 0 A ${sliderRadius} ${sliderRadius} 0 0 0 0 -${sliderRadius}`}
                        fill="none"
                        stroke="#ffffff"
                        strokeWidth="2"
                        strokeLinecap="round"
                        style={{
                            strokeDasharray: maxDashOffset,
                            strokeDashoffset: strokeOffset,
                            filter: 'drop-shadow(0 0 4px rgba(255, 255, 255, 0.6))'
                        }}
                    />

                    {/* Precision Watch Line Dial Ticks */}
                    {watchDialTicks.map(tick => (
                        <line
                            key={tick.id}
                            x1={tick.x1}
                            y1={tick.y1}
                            x2={tick.x2}
                            y2={tick.y2}
                            stroke={tick.isActive ? '#ffffff' : 'rgba(255, 255, 255, 0.22)'}
                            strokeWidth={tick.isMajor ? 2 : 1.2}
                            strokeLinecap="round"
                            style={{
                                transition: 'stroke 0.15s ease, filter 0.15s ease',
                                filter: tick.isActive ? 'drop-shadow(0 0 3px rgba(255,255,255,0.7))' : 'none'
                            }}
                        />
                    ))}

                    {/* Precision Watch Needle Line on Thumb */}
                    <line
                        x1={needleX1}
                        y1={needleY1}
                        x2={needleX2}
                        y2={needleY2}
                        stroke="#ffffff"
                        strokeWidth="2.5"
                        strokeLinecap="round"
                        style={{ filter: 'drop-shadow(0 0 5px rgba(255, 255, 255, 0.9))' }}
                    />

                    {/* Glowing Jewel Dial Pip / Thumb Knob */}
                    <circle
                        className="slider-thumb"
                        id="volThumb"
                        cx={thumbCx}
                        cy={thumbCy}
                        r="4"
                        fill="#ffffff"
                        stroke="#0d0d0e"
                        strokeWidth="1.5"
                    />
                </svg>

                {/* Minimal Chrono Watch Readout Badge */}
                <div className="volume-chrono-label">
                    <span className="chrono-vol-val">{Math.round(safeVolume * 100)}</span>
                    <span className="chrono-vol-unit">% VOL</span>
                </div>
            </div>

            {/* 3. Primary Main FAB (Edge-Attached to Bottom-Left Corner) */}
            <button
                className="fab-main"
                id="fabMain"
                aria-label="Toggle menu"
                onClick={() => {
                    triggerHaptic('toggle');
                    if (isVolumeMode) {
                        setIsVolumeMode(false);
                    } else {
                        setIsOpen(prev => !prev);
                    }
                }}
            >
                {/* Menu Hamburger */}
                <svg className="icon-menu" viewBox="0 0 24 24">
                    <line x1="4" y1="12" x2="20" y2="12" />
                    <line x1="4" y1="6" x2="20" y2="6" />
                    <line x1="4" y1="18" x2="20" y2="18" />
                </svg>
                {/* Close Cross */}
                <svg className="icon-close" viewBox="0 0 24 24">
                    <line x1="18" y1="6" x2="6" y2="18" />
                    <line x1="6" y1="6" x2="18" y2="18" />
                </svg>
                {/* Back Arrow */}
                <svg className="icon-back" viewBox="0 0 24 24">
                    <line x1="19" y1="12" x2="5" y2="12" />
                    <polyline points="12 19 5 12 12 5" />
                </svg>
            </button>
        </div>
    );
};

export default React.memo(RotaryFab);
