import React, { useState } from 'react';
import { RotaryFabItem, FabPlacement } from './types';
import { triggerHaptic } from './utils/haptics';

export interface RotaryItemProps {
  item: RotaryFabItem;
  x: number;
  y: number;
  size: number;
  iconSize: number;
  tierIndex: number;
  index: number;
  globalIndex?: number;
  angleDeg?: number;
  placement?: FabPlacement;
  enableHaptics?: boolean;
  onItemClick?: (item: RotaryFabItem, event: React.MouseEvent<HTMLButtonElement>) => void;
  renderCustom?: (item: RotaryFabItem, index: number, tierIndex: number) => React.ReactNode;
}

export const RotaryItem: React.FC<RotaryItemProps> = ({
  item,
  x,
  y,
  size,
  iconSize,
  tierIndex,
  index,
  globalIndex,
  angleDeg,
  placement = 'bottom-left',
  enableHaptics = true,
  onItemClick,
  renderCustom
}) => {
  const [showTooltip, setShowTooltip] = useState(false);

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (item.disabled) return;

    if (enableHaptics) {
      if (item.haptic) {
        triggerHaptic(item.haptic);
      } else if (item.danger) {
        triggerHaptic('danger');
      } else {
        triggerHaptic('click');
      }
    }

    item.onClick?.(e);
    onItemClick?.(item, e);
  };

  if (renderCustom) {
    return <>{renderCustom(item, index, tierIndex)}</>;
  }

  // Determine tooltip orientation based on placement
  const getTooltipClass = () => {
    if (item.tooltipPlacement && item.tooltipPlacement !== 'auto') {
      return `rf-tooltip-${item.tooltipPlacement}`;
    }
    if (placement.includes('left')) return 'rf-tooltip-right';
    if (placement.includes('right')) return 'rf-tooltip-left';
    if (placement.includes('top')) return 'rf-tooltip-bottom';
    return 'rf-tooltip-top';
  };

  return (
    <div
      className="rf-item-wrapper"
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        '--rf-tx': `${x}px`,
        '--rf-ty': `${y}px`,
        '--rf-index': globalIndex ?? index,
        '--rf-angle': `${angleDeg ?? 0}deg`,
        marginTop: `-${size / 2}px`,
        marginLeft: `-${size / 2}px`,
        zIndex: 20 + tierIndex * 5 + index
      } as React.CSSProperties}
      onMouseEnter={() => setShowTooltip(true)}
      onMouseLeave={() => setShowTooltip(false)}
      onFocus={() => setShowTooltip(true)}
      onBlur={() => setShowTooltip(false)}
    >
      <button
        type="button"
        className={`rf-item tier-${tierIndex} ${item.active ? 'rf-item-active' : ''} ${
          item.danger ? 'rf-item-danger' : ''
        } ${item.disabled ? 'rf-item-disabled' : ''} ${item.className || ''}`}
        style={{
          width: `${size}px`,
          height: `${size}px`,
          ...item.style
        }}
        disabled={item.disabled}
        aria-label={item.ariaLabel || item.title || item.id}
        aria-pressed={item.active}
        onClick={handleClick}
      >
        {item.children
          ? item.children
          : item.icon &&
            React.isValidElement(item.icon)
            ? React.cloneElement(item.icon as React.ReactElement<{ style?: React.CSSProperties; size?: number }>, {
                style: {
                  width: `${iconSize}px`,
                  height: `${iconSize}px`,
                  ...((item.icon.props as any)?.style || {})
                }
              })
            : item.icon}

        {/* Badge / Notification Indicator */}
        {item.hasBadge !== undefined && item.hasBadge !== false && (
          <span
            className={`rf-badge ${typeof item.hasBadge === 'boolean' ? 'rf-badge-dot' : 'rf-badge-count'}`}
            style={item.badgeColor ? { backgroundColor: item.badgeColor, boxShadow: `0 0 6px ${item.badgeColor}` } : undefined}
          >
            {typeof item.hasBadge !== 'boolean' ? item.hasBadge : null}
          </span>
        )}
      </button>

      {/* Zero-dependency accessible tooltip */}
      {item.title && showTooltip && (
        <div className={`rf-tooltip ${getTooltipClass()}`} role="tooltip">
          {item.title}
        </div>
      )}
    </div>
  );
};
