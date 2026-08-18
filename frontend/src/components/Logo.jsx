import { useId } from "react";

/*  ──────────────────────────────────────────────────
    CSEducation — Logo Component
    ──────────────────────────────────────────────────
    Option 4: Graduation Cap + Code Symbol + Orbit/Swoosh
    Variants: horizontal | wordmark | subtitle | full | vertical | icon | favicon
    Props:
      - variant: "horizontal" | "wordmark" | "subtitle" | "full" | "vertical" | "icon" | "favicon"
      - size: "xs" | "sm" | "default" | "md" | "lg" | "xl" | number (default: "default")
      - showSubtitle: boolean (forces subtitle display)
      - className: string (container class names)
      - iconClassName: string (icon class names)
      - textClassName: string (text container class names)
    ────────────────────────────────────────────────── */

/**
 * Core Vector Icon Mark
 * Modern graduation cap + centered </> code brackets + dynamic orbital swoosh
 */
export function LogoMark({ size = 36, className = "", isFavicon = false }) {
  const id = useId();
  const gradId = `cse-logo-grad-${id.replace(/:/g, "")}`;
  const strokeWidth = isFavicon ? 6.5 : 5.5;

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 100 100"
      fill="none"
      className={`shrink-0 select-none ${className}`}
      aria-hidden="true"
    >
      <defs>
        <linearGradient id={gradId} x1="10%" y1="90%" x2="90%" y2="10%">
          <stop offset="0%" stopColor="#2563eb" />
          <stop offset="45%" stopColor="#4f46e5" />
          <stop offset="100%" stopColor="#9333ea" />
        </linearGradient>
      </defs>

      {/* Orbit / Swoosh */}
      <path
        d="M 14 72 C 17 86.5 35 93 55 90 C 76 87 90 73 90 47 C 90 29 82 18 71 15.5"
        stroke={`url(#${gradId})`}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        fill="none"
      />

      {/* Graduation Cap - Mortarboard Diamond */}
      <path
        d="M 46.5 17.2 C 48.6 16.2 51.4 16.2 53.5 17.2 L 79.5 28.5 C 81.8 29.5 81.8 32.5 79.5 33.5 L 53.5 44.8 C 51.4 45.8 48.6 45.8 46.5 44.8 L 20.5 33.5 C 18.2 32.5 18.2 29.5 20.5 28.5 Z"
        fill={`url(#${gradId})`}
      />

      {/* Cap Under-structure (Skull cap band) */}
      <path
        d="M 32 37.5 C 32 46.5 40 51 50 51 C 60 51 68 46.5 68 37.5 C 65 42.5 58 46 50 46 C 42 46 35 42.5 32 37.5 Z"
        fill={`url(#${gradId})`}
      />

      {/* Tassel */}
      <path
        d="M 23 30.5 C 20 33 18 39 18 45"
        stroke={`url(#${gradId})`}
        strokeWidth={isFavicon ? 3 : 2.5}
        strokeLinecap="round"
        fill="none"
      />
      <ellipse cx="18" cy="47.5" rx={isFavicon ? 2.5 : 2} ry={isFavicon ? 3.5 : 3} fill={`url(#${gradId})`} />

      {/* Code brackets </> */}
      {/* Left bracket < */}
      <path
        d="M 35 58 L 25 66.5 L 35 75"
        stroke={`url(#${gradId})`}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeLinejoin="round"
      />

      {/* Center slash / */}
      <path
        d="M 54.5 55 L 45.5 78"
        stroke={`url(#${gradId})`}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
      />

      {/* Right bracket > */}
      <path
        d="M 65 58 L 75 66.5 L 65 75"
        stroke={`url(#${gradId})`}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

/**
 * Wordmark Text: "CSEducation"
 */
export function LogoText({ className = "", textSizeClass = "text-xl" }) {
  return (
    <span className={`font-bold tracking-tight leading-none ${textSizeClass} ${className}`}>
      <span className="bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 bg-clip-text text-transparent dark:from-blue-400 dark:via-indigo-400 dark:to-purple-400 font-extrabold">
        CS
      </span>
      <span className="text-heading dark:text-heading-dark">
        Education
      </span>
    </span>
  );
}

/**
 * Subtitle: "CSE Knowledge Hub"
 */
export function LogoSubtitle({ className = "" }) {
  return (
    <span
      className={`text-[10px] sm:text-xs font-semibold tracking-wider uppercase text-subtle dark:text-subtle-dark leading-tight ${className}`}
    >
      CSE Knowledge Hub
    </span>
  );
}

/**
 * Size calculator helper
 */
function resolveSizes(size) {
  if (typeof size === "number") {
    return {
      markSize: size,
      textSize: size < 26 ? "text-sm" : size < 34 ? "text-lg" : size < 44 ? "text-xl" : "text-2xl",
      gap: size < 28 ? "gap-2" : "gap-2.5",
    };
  }

  switch (size) {
    case "xs":
      return { markSize: 22, textSize: "text-sm", gap: "gap-1.5" };
    case "sm":
      return { markSize: 30, textSize: "text-lg", gap: "gap-2" };
    case "lg":
      return { markSize: 44, textSize: "text-2xl", gap: "gap-3" };
    case "xl":
      return { markSize: 56, textSize: "text-3xl", gap: "gap-3.5" };
    case "default":
    case "md":
    default:
      return { markSize: 36, textSize: "text-xl", gap: "gap-2.5" };
  }
}

/**
 * Primary Reusable Logo Component
 */
export default function Logo({
  variant = "horizontal",
  size = "default",
  showSubtitle = false,
  className = "",
  iconClassName = "",
  textClassName = "",
}) {
  const { markSize, textSize, gap } = resolveSizes(size);
  const normalizedVariant = variant.toLowerCase();

  /* Favicon / Icon only */
  if (normalizedVariant === "icon") {
    return (
      <div className={`inline-flex items-center justify-center ${className}`}>
        <LogoMark size={markSize} className={iconClassName} />
      </div>
    );
  }

  if (normalizedVariant === "favicon") {
    return (
      <div className={`inline-flex items-center justify-center ${className}`}>
        <LogoMark size={markSize} isFavicon={true} className={iconClassName} />
      </div>
    );
  }

  /* Vertical / Stacked version */
  if (normalizedVariant === "vertical") {
    return (
      <div className={`inline-flex flex-col items-center text-center gap-2 ${className}`}>
        <LogoMark size={markSize * 1.2} className={iconClassName} />
        <div className="flex flex-col items-center gap-0.5">
          <LogoText textSizeClass={textSize} className={textClassName} />
          {(showSubtitle || size === "lg" || size === "xl") && (
            <LogoSubtitle className="mt-0.5" />
          )}
        </div>
      </div>
    );
  }

  /* Subtitle or Full variant */
  const hasSubtitle = showSubtitle || normalizedVariant === "subtitle" || normalizedVariant === "full";

  /* Horizontal / Wordmark (default) */
  return (
    <div className={`inline-flex items-center ${gap} ${className}`}>
      <LogoMark size={markSize} className={iconClassName} />
      <div className="flex flex-col justify-center">
        <LogoText textSizeClass={textSize} className={textClassName} />
        {hasSubtitle && <LogoSubtitle className="mt-0.5" />}
      </div>
    </div>
  );
}
