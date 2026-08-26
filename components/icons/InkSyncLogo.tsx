import React from "react";

export interface InkSyncLogoProps {
  /** Overall width in px (height scales proportionally). Default: 200 */
  width?: number;
  /** Show the "InkSync" wordmark + tagline next to the icon. Default: true */
  showWordmark?: boolean;
  /** Show the "COLLABORATIVE DOCS" tagline under the wordmark. Default: true */
  showTagline?: boolean;
  /** "light" for light backgrounds, "dark" for dark backgrounds. Default: "light" */
  theme?: "light" | "dark";
  /** Icon gradient start color. Overrides theme default. */
  colorStart?: string;
  /** Icon gradient end color. Overrides theme default. */
  colorEnd?: string;
  /** Sync-arrow accent color. Overrides theme default. */
  accentColor?: string;
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
    accentColor: "#0E7490",
    wordmarkColor: "#1E1B4B",
    wordmarkAccentColor: "#0891B2",
    taglineColor: "#64748B",
    nibDetail: "#FFFFFF", // slit line + tip dot, sits on top of the nib fill
  },
  dark: {
    colorStart: "#818CF8",
    colorEnd: "#22D3EE",
    accentColor: "#67E8F9",
    wordmarkColor: "#F8FAFC",
    wordmarkAccentColor: "#22D3EE",
    taglineColor: "#94A3B8",
    nibDetail: "#0F172A",
  },
} as const;

/**
 * InkSync logo — fountain-pen nib whose tip curls into a sync arrow.
 * Transparent background by default; it adapts to whatever surface
 * it's placed on. Pass theme="dark" (or override individual colors)
 * when placing on a dark background.
 */
const InkSyncLogo: React.FC<InkSyncLogoProps> = ({
  width = 200,
  showWordmark = true,
  showTagline = true,
  theme = "light",
  colorStart,
  colorEnd,
  accentColor,
  wordmarkColor,
  wordmarkAccentColor,
  taglineColor,
  className,
}) => {
  const defaults = THEME_DEFAULTS[theme];
  const resolved = {
    colorStart: colorStart ?? defaults.colorStart,
    colorEnd: colorEnd ?? defaults.colorEnd,
    accentColor: accentColor ?? defaults.accentColor,
    wordmarkColor: wordmarkColor ?? defaults.wordmarkColor,
    wordmarkAccentColor: wordmarkAccentColor ?? defaults.wordmarkAccentColor,
    taglineColor: taglineColor ?? defaults.taglineColor,
    nibDetail: defaults.nibDetail,
  };

  const viewWidth = showWordmark ? 640 : 200;
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
      aria-label="InkSync logo"
      className={className}
    >
      <defs>
        <linearGradient id={gradientId} x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor={resolved.colorStart} />
          <stop offset="100%" stopColor={resolved.colorEnd} />
        </linearGradient>
      </defs>

      {/* Icon: fountain-pen nib whose tip curls into a sync arrow */}
      <g transform="translate(100,100)">
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
          strokeWidth={4}
          strokeLinecap="round"
          opacity={0.85}
        />
        <circle cx="0" cy="52" r="7" fill={resolved.nibDetail} opacity={0.9} />
        <path
          d="M -56,-14 A 56,56 0 1 1 -56,16"
          fill="none"
          stroke={resolved.accentColor}
          strokeWidth={7}
          strokeLinecap="round"
        />
        <path d="M -56,16 l -14,-4 l 6,-16 z" fill={resolved.accentColor} />
      </g>

      {/* Wordmark */}
      {showWordmark && (
        <g
          transform="translate(210,128)"
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
            Ink
            <tspan fill={resolved.wordmarkAccentColor}>Sync</tspan>
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

export default InkSyncLogo;

/*
Usage:

  import InkSyncLogo from "./InkSyncLogo";

  // Light background (default)
  <InkSyncLogo width={240} />

  // Dark background
  <InkSyncLogo width={240} theme="dark" />

  // Icon only, dark theme (e.g. dark navbar)
  <InkSyncLogo width={40} showWordmark={false} theme="dark" />

  // Auto-switch with next-themes / Tailwind dark mode
  import { useTheme } from "next-themes";
  const { resolvedTheme } = useTheme();
  <InkSyncLogo width={220} theme={resolvedTheme === "dark" ? "dark" : "light"} />

  // Fully custom colors (ignores theme defaults for whichever you set)
  <InkSyncLogo width={220} colorStart="#7C3AED" colorEnd="#06B6D4" />
*/