import React from "react";

export interface LiveInkLogoProps {
  /** Overall width in px (height scales proportionally). Default: 200 */
  width?: number;
  /** Show the "LiveInk" wordmark + tagline next to the icon. Default: true */
  showWordmark?: boolean;
  /** Show the "COLLABORATIVE DOCS" tagline under the wordmark. Default: true */
  showTagline?: boolean;
  /** "light" for light backgrounds, "dark" for dark backgrounds. Default: "dark" */
  theme?: "light" | "dark";
  /** Nib gradient start color. Overrides theme default. */
  colorStart?: string;
  /** Nib gradient end color. Overrides theme default. */
  colorEnd?: string;
  /** Outer ring color. Overrides theme default. */
  ringColor?: string;
  /** Wordmark "Ink" color. Overrides theme default. */
  wordmarkColor?: string;
  /** Wordmark "Sync" color. Overrides theme default. */
  wordmarkAccentColor?: string;
  /** Tagline color. Overrides theme default. */
  taglineColor?: string;
  className?: string;
}

const THEME_DEFAULTS = {
  light: {
    colorStart: "#4338CA",
    colorEnd: "#06B6D4",
    ringColor: "#0E7490",
    wordmarkColor: "#1E1B4B",
    wordmarkAccentColor: "#0891B2",
    taglineColor: "#64748B",
    nibDetail: "#FFFFFF",
  },
  dark: {
    colorStart: "#4338CA",
    colorEnd: "#22D3EE",
    ringColor: "#0E7490",
    wordmarkColor: "#F8FAFC",
    wordmarkAccentColor: "#22D3EE",
    taglineColor: "#7878a3",
    nibDetail: "#FFFFFF",
  },
} as const;

/**
 * LiveInk logo — a static badge: a full ring encircling a fountain-pen
 * nib icon (indigo → cyan gradient). Transparent background by default,
 * adapts to whatever surface it's placed on.
 */
const LiveInkLogo: React.FC<LiveInkLogoProps> = ({
  width = 200,
  showWordmark = true,
  showTagline = true,
  theme = "dark",
  colorStart,
  colorEnd,
  ringColor,
  wordmarkColor,
  wordmarkAccentColor,
  taglineColor,
  className,
}) => {
  const defaults = THEME_DEFAULTS[theme];
  const resolved = {
    colorStart: colorStart ?? defaults.colorStart,
    colorEnd: colorEnd ?? defaults.colorEnd,
    ringColor: ringColor ?? defaults.ringColor,
    wordmarkColor: wordmarkColor ?? defaults.wordmarkColor,
    wordmarkAccentColor: wordmarkAccentColor ?? defaults.wordmarkAccentColor,
    taglineColor: taglineColor ?? defaults.taglineColor,
    nibDetail: defaults.nibDetail,
  };

  const viewWidth = showWordmark ? 560 : 200;
  const viewHeight = 200;
  const height = (width / viewWidth) * viewHeight;
  const gradientId = React.useId();

  return (
    <svg
      width={width}
      height={height}
      viewBox={`0 0 ${viewWidth} ${viewHeight}`}
      xmlns="http://www.w3.org/2000/svg"
      role="img"
      aria-label="LiveInk logo"
      className={className}
    >
      <defs>
        <linearGradient id={gradientId} x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor={resolved.colorStart} />
          <stop offset="100%" stopColor={resolved.colorEnd} />
        </linearGradient>
      </defs>

      {/* Icon: nib badge — full ring + nib icon centered inside */}
      <g transform="translate(100,100)">
        <circle
          cx="0"
          cy="0"
          r="52"
          fill="none"
          stroke={resolved.ringColor}
          strokeWidth={7}
        />
        <g transform="scale(0.72)">
          <path
            d="M 0,-52 L 34,-6 C 40,4 40,20 30,32 L 6,58 L -6,58 L -30,32 C -40,20 -40,4 -34,-6 Z"
            fill={`url(#${gradientId})`}
          />
          <line
            x1="0"
            y1="-30"
            x2="0"
            y2="50"
            stroke={resolved.nibDetail}
            strokeWidth={5}
            strokeLinecap="round"
            opacity={0.9}
          />
          <circle
            cx="0"
            cy="52"
            r="8"
            fill={resolved.nibDetail}
            opacity={0.9}
          />
        </g>
      </g>

      {/* Wordmark */}
      {showWordmark && (
        <g
          transform="translate(180,110)"
          fontFamily="'Segoe UI', 'Helvetica Neue', Arial, sans-serif"
        >
          <text
            x={0}
            y={0}
            fontSize={64}
            fontWeight={700}
            fill={resolved.wordmarkColor}
            letterSpacing={-1}
          >
            <tspan fill={resolved.wordmarkAccentColor}>Live</tspan>
            Ink
          </text>
          {showTagline && (
            <text
              x={4}
              y={26}
              fontSize={15}
              fontWeight={500}
              fill={resolved.taglineColor}
              letterSpacing={3}
            >
              COLLABORATIVE DOCS
            </text>
          )}
        </g>
      )}
    </svg>
  );
};

export default LiveInkLogo;

/*
Usage:

  import LiveInkLogo from "./LiveInkLogo";

  // Dark background (default)
  <LiveInkLogo width={200} theme="dark" />

  // Icon only (badge), dark theme
  <LiveInkLogo width={48} showWordmark={false} theme="dark" />

  // Fully custom colors
  <LiveInkLogo width={220} colorStart="#7C3AED" colorEnd="#06B6D4" ringColor="#0891B2" />
*/
