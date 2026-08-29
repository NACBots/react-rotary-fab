import React, { useState, useRef, useEffect, useMemo, useCallback } from 'react';
import { RotaryFabProps, RotaryFabItem, ArcTierConfig } from './types';
import { RotaryItem } from './RotaryItem';
import { OrbitTracks } from './OrbitTracks';
import { RotaryDial } from './RotaryDial';
import { Icons } from './icons';
import { getThemeStyle } from './utils/themes';
import { getPlacementAngleSpan, polarToCartesian } from './utils/geometry';
import { useOutsideClick } from './hooks/useOutsideClick';
import { useInactivityTimer } from './hooks/useInactivityTimer';
import { useHaptic } from './hooks/useHaptic';

export const RotaryFab: React.FC<RotaryFabProps> = ({
  items = [],
  open: controlledOpen,
  defaultOpen = false,
  onOpenChange,
  placement = 'bottom-left',
  theme = 'luxury-watch',
  customTheme,
  arcConfigs: customArcConfigs,
  mainButton,
  mainButtonIcon,
  mainButtonCloseIcon,
  mainButtonDialIcon,
  mainButtonSize = 52,
  mainButtonClassName = '',
  mainButtonStyle,
  mainButtonAriaLabel = 'Toggle Rotary Action Menu',
  dialMode: controlledDialMode,
  defaultDialMode = false,
  onDialModeChange,
  dialProps = {},
  autoCollapseTimeout = 9500,
  closeOnItemClick = true,
  closeOnOutsideClick = true,
  enableHaptics = true,
  showOrbitLines = true,
  showCornerBackdrop = true,
  renderItem,
  className = '',
  style,
  children
}) => {
  const isControlledOpen = controlledOpen !== undefined;
  const [internalOpen, setInternalOpen] = useState(defaultOpen);
  const isOpen = isControlledOpen ? (controlledOpen as boolean) : internalOpen;

  const isControlledDial = controlledDialMode !== undefined;
  const [internalDialMode, setInternalDialMode] = useState(defaultDialMode);
  const isDialMode = isControlledDial ? (controlledDialMode as boolean) : internalDialMode;

  const anchorRef = useRef<HTMLDivElement>(null);
  const haptic = useHaptic(enableHaptics);

  const setOpenState = useCallback(
    (newOpen: boolean) => {
      if (!isControlledOpen) {
        setInternalOpen(newOpen);
      }
      onOpenChange?.(newOpen);
    },
    [isControlledOpen, onOpenChange]
  );

  const setDialState = useCallback(
    (newDial: boolean) => {
      if (!isControlledDial) {
        setInternalDialMode(newDial);
      }
      onDialModeChange?.(newDial);
    },
    [isControlledDial, onDialModeChange]
  );

  // Outside click detection
  useOutsideClick(
    anchorRef,
    () => {
      if (isOpen || isDialMode) {
        setOpenState(false);
        setDialState(false);
      }
    },
    closeOnOutsideClick && (isOpen || isDialMode)
  );

  // Auto-collapse after inactivity
  useInactivityTimer(
    isOpen || isDialMode,
    () => {
      setOpenState(false);
      setDialState(false);
    },
    autoCollapseTimeout
  );

  // Default Arc Tier Radii if not provided
  const arcConfigs: ArcTierConfig[] = useMemo(() => {
    if (customArcConfigs && customArcConfigs.length > 0) {
      return customArcConfigs;
    }
    // Auto-calculate 2 tiers by default for up to 10-12 items
    return [
      { maxCount: 4, radius: 96, btnSize: 38, iconSize: 18 },
      { maxCount: 6, radius: 154, btnSize: 36, iconSize: 17 },
      { maxCount: 8, radius: 212, btnSize: 34, iconSize: 16 }
    ];
  }, [customArcConfigs]);

  const maxRadius = useMemo(() => {
    return Math.max(...arcConfigs.map(c => c.radius), dialProps.radius || 124);
  }, [arcConfigs, dialProps.radius]);

  // Handle Main FAB Button Click
  const handleMainClick = () => {
    haptic('toggle');
    if (isDialMode) {
      setDialState(false);
      setOpenState(true);
    } else {
      const nextOpen = !isOpen;
      setOpenState(nextOpen);
    }
  };

  // Handle Item Click
  const handleItemClick = (item: RotaryFabItem, event: React.MouseEvent<HTMLButtonElement>) => {
    if (closeOnItemClick) {
      setOpenState(false);
    }
  };

  // Distribute items across arc tiers
  const tierGroups = useMemo(() => {
    const groups: { config: ArcTierConfig; items: RotaryFabItem[]; tierIndex: number }[] = [];
    let itemOffset = 0;

    for (let t = 0; t < arcConfigs.length; t++) {
      const config = arcConfigs[t];
      if (itemOffset >= items.length) break;

      const count = Math.min(items.length - itemOffset, config.maxCount || 4);
      const tierItems = items.slice(itemOffset, itemOffset + count);
      itemOffset += count;

      groups.push({
        config,
        items: tierItems,
        tierIndex: t
      });
    }
    return groups;
  }, [items, arcConfigs]);

  const placementClass = `rf-placement-${placement}`;
  const themeStyle = getThemeStyle(theme, customTheme);

  // Main button inner content
  const renderMainButtonContent = () => {
    if (typeof mainButton === 'function') {
      return mainButton({ isOpen, isDialMode });
    }
    if (mainButton) {
      return mainButton;
    }

    if (isDialMode) {
      return mainButtonDialIcon || <Icons.Back size={22} className="rf-icon-back" />;
    }

    if (isOpen) {
      return mainButtonCloseIcon || <Icons.Close size={22} className="rf-icon-close" />;
    }

    return mainButtonIcon || <Icons.Menu size={22} className="rf-icon-menu" />;
  };

  return (
    <div
      ref={anchorRef}
      className={`rf-container ${placementClass} ${isOpen ? 'rf-open' : ''} ${
        isDialMode ? 'rf-dial-mode' : ''
      } ${className}`}
      style={{
        '--rf-main-size': `${mainButtonSize}px`,
        ...themeStyle,
        ...style
      } as React.CSSProperties}
    >
      {/* Corner Ambient Backdrop */}
      {showCornerBackdrop && <div className="rf-backdrop" aria-hidden="true" />}

      {/* Concentric Action Menu Wheel */}
      <div className="rf-wheel" aria-hidden={!isOpen}>
        {/* Concentric Orbit Guidelines */}
        {showOrbitLines && (
          <OrbitTracks
            arcConfigs={tierGroups.map(g => g.config)}
            placement={placement}
            maxRadius={maxRadius}
          />
        )}

        {/* Rotary Items distributed in Arcs */}
        {tierGroups.map(({ config, items: tItems, tierIndex }) => {
          const span = getPlacementAngleSpan(placement);
          const startAngle = config.startAngleDeg !== undefined ? config.startAngleDeg : span.startDeg;
          const endAngle = config.endAngleDeg !== undefined ? config.endAngleDeg : span.endDeg;
          const count = tItems.length;
          const angleStep = count > 1 ? (endAngle - startAngle) / (count - 1) : 0;

          return tItems.map((item, i) => {
            const angleDeg = count > 1 ? startAngle + i * angleStep : startAngle;
            const { x, y } = polarToCartesian(config.radius, angleDeg);

            return (
              <RotaryItem
                key={item.id}
                item={item}
                x={x}
                y={y}
                size={config.btnSize || 38}
                iconSize={config.iconSize || 18}
                tierIndex={tierIndex}
                index={i}
                placement={placement}
                enableHaptics={enableHaptics}
                onItemClick={handleItemClick}
                renderCustom={renderItem}
              />
            );
          });
        })}
      </div>

      {/* Precision Rotary Dial / Arc Slider */}
      {isDialMode && (
        <div className="rf-dial-wrapper">
          <RotaryDial
            placement={placement}
            enableHaptics={enableHaptics}
            {...dialProps}
          />
        </div>
      )}

      {/* Primary Floating Action Button (FAB) */}
      <button
        type="button"
        className={`rf-main-btn ${isOpen ? 'rf-main-open' : ''} ${
          isDialMode ? 'rf-main-dial' : ''
        } ${mainButtonClassName}`}
        style={{
          width: `${mainButtonSize}px`,
          height: `${mainButtonSize}px`,
          ...mainButtonStyle
        }}
        aria-label={mainButtonAriaLabel}
        aria-expanded={isOpen || isDialMode}
        onClick={handleMainClick}
      >
        <span className="rf-main-btn-inner">{renderMainButtonContent()}</span>
      </button>

      {/* Optional custom children */}
      {children}
    </div>
  );
};
