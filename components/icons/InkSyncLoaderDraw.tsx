import React from "react";

export interface InkSyncLoaderDrawProps {
  /** Size in px (width & height, square). Default: 80 */
  size?: number;
  /** Full draw-fill-reset cycle duration in seconds. Default: 1.8 */
  speed?: number;
  /** Nib gradient start color. Default: "#818CF8" */
  colorStart?: string;
  /** Nib gradient end color. Default: "#22D3EE" */
  colorEnd?: string;
  /** Outline stroke color while drawing. Default: "#22D3EE" */
  strokeColor?: string;
  /** Nib detail (slit + tip) color — should contrast the nib fill. Default: "#0F172A" */
  nibDetail?: string;
  className?: string;
}

/**
 * InkSync loader — dark-theme only. The pen-nib outline traces itself
 * like it's being inked, fills with the gradient, holds briefly, then
 * fades and loops. Transparent background, adapts to any dark surface.
 */
const InkSyncLoaderDraw: React.FC<InkSyncLoaderDrawProps> = ({
  size = 80,
  speed = 1.8,
  colorStart = "#818CF8",
  colorEnd = "#22D3EE",
  strokeColor = "#22D3EE",
  nibDetail = "#0F172A",
  className,
}) => {
  const gradientId = React.useId();
  const suffix = gradientId.replace(/[^a-zA-Z0-9]/g, "");
  const drawAnim = `inksync-draw-${suffix}`;
  const detailAnim = `inksync-fade-hold-${suffix}`;
  const resetAnim = `inksync-reset-${suffix}`;

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 120 120"
      xmlns="http://www.w3.org/2000/svg"
      role="img"
      aria-label="Loading"
      className={className}
    >
      <defs>
        <linearGradient id={gradientId} x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor={colorStart} />
          <stop offset="100%" stopColor={colorEnd} />
        </linearGradient>
        <style>{`
          @keyframes ${drawAnim} {
            0%   { stroke-dashoffset: 218; fill-opacity: 0; }
            60%  { stroke-dashoffset: 0;   fill-opacity: 0; }
            80%  { fill-opacity: 1; }
            100% { stroke-dashoffset: 0; fill-opacity: 1; }
          }
          @keyframes ${detailAnim} {
            0%, 70%   { opacity: 0; }
            85%, 100% { opacity: 1; }
          }
          @keyframes ${resetAnim} {
            0%, 90%  { opacity: 1; }
            95%, 100% { opacity: 0; }
          }
        `}</style>
      </defs>

      <g
        transform="translate(60,60)"
        style={{ animation: `${resetAnim} ${speed}s ease-in-out infinite` }}
      >
        {/* nib outline draws itself, then fills */}
        <path
          d="M 0,-40 L 26,-4 C 31,3 31,15 23,24 L 4,44 L -4,44 L -23,24 C -31,15 -31,3 -26,-4 Z"
          fill={`url(#${gradientId})`}
          stroke={strokeColor}
          strokeWidth={3}
          strokeLinejoin="round"
          style={{
            strokeDasharray: 218,
            animation: `${drawAnim} ${speed}s ease-in-out infinite`,
          }}
        />
        {/* slit + tip appear once the fill lands */}
        <g
          style={{ animation: `${detailAnim} ${speed}s ease-in-out infinite` }}
        >
          <line
            x1="0"
            y1="-22"
            x2="0"
            y2="38"
            stroke={nibDetail}
            strokeWidth={3}
            strokeLinecap="round"
            opacity={0.85}
          />
          <circle cx="0" cy="40" r="5" fill={nibDetail} opacity={0.9} />
        </g>
      </g>
    </svg>
  );
};

export default InkSyncLoaderDraw;

/*
Usage:

  import InkSyncLoaderDraw from "./InkSyncLoaderDraw";

  <InkSyncLoaderDraw size={48} />
  <InkSyncLoaderDraw size={64} speed={1.4} />
*/
