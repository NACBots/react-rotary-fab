import React from 'react';
import { ArcTierConfig, FabPlacement } from './types';
import { describeArc, getPlacementAngleSpan, polarToCartesian, getSvgViewBox } from './utils/geometry';

export interface OrbitTracksProps {
  arcConfigs: ArcTierConfig[];
  placement?: FabPlacement;
  maxRadius: number;
}

export const OrbitTracks: React.FC<OrbitTracksProps> = ({
  arcConfigs,
  placement = 'bottom-left',
  maxRadius
}) => {
  const span = getPlacementAngleSpan(placement);
  const svgInfo = getSvgViewBox(maxRadius, 24, placement);

  return (
    <svg
      className="rf-orbit-tracks-svg"
      width={svgInfo.width}
      height={svgInfo.height}
      viewBox={svgInfo.viewBox}
      aria-hidden="true"
      style={{
        position: 'absolute',
        top: placement.includes('top') ? 0 : 'auto',
        bottom: placement.includes('bottom') ? 0 : 'auto',
        left: placement.includes('left') ? 0 : 'auto',
        right: placement.includes('right') ? 0 : 'auto',
        overflow: 'visible',
        pointerEvents: 'none',
        zIndex: 1
      }}
    >
      {arcConfigs.map((config, i) => {
        const pathData = describeArc(config.radius, span.startDeg, span.endDeg);
        const startPip = polarToCartesian(config.radius, span.startDeg);
        const endPip = polarToCartesian(config.radius, span.endDeg);
        const isOuter = i === arcConfigs.length - 1;

        return (
          <g key={`track-${i}`}>
            <path
              d={pathData}
              fill="none"
              stroke="var(--rf-track, rgba(255, 255, 255, 0.16))"
              strokeWidth="1.2"
              strokeDasharray={isOuter ? '4 6' : '3 5'}
              strokeLinecap="round"
            />
            <circle cx={startPip.x} cy={startPip.y} r="2" fill="var(--rf-text, #ffffff)" opacity={0.6} />
            <circle cx={endPip.x} cy={endPip.y} r="2" fill="var(--rf-text, #ffffff)" opacity={0.6} />
          </g>
        );
      })}
    </svg>
  );
};
