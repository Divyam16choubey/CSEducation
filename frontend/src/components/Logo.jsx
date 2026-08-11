/*  ──────────────────────────────────────────────────
    CSEducation — Logo Component
    ──────────────────────────────────────────────────
    Variants: horizontal | vertical | icon
    Props: variant, size, className
    ────────────────────────────────────────────────── */

/**
 * Logo mark — Code brackets inside an open book shape
 * with a graduation cap, representing CS + Education.
 */
function LogoMark({ size = 32, className = "" }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 48 48"
      fill="none"
      className={className}
    >
      {/* Book shape */}
      <path
        d="M6 12C6 10.3431 7.34315 9 9 9H21C22.6569 9 24 10.3431 24 12V40C24 38.3431 22.6569 37 21 37H9C7.34315 37 6 35.6569 6 34V12Z"
        fill="currentColor"
        opacity="0.12"
      />
      <path
        d="M42 12C42 10.3431 40.6569 9 39 9H27C25.3431 9 24 10.3431 24 12V40C24 38.3431 25.3431 37 27 37H39C40.6569 37 42 35.6569 42 34V12Z"
        fill="currentColor"
        opacity="0.12"
      />
      <path
        d="M6 12C6 10.3431 7.34315 9 9 9H21C22.6569 9 24 10.3431 24 12V40C24 38.3431 22.6569 37 21 37H9C7.34315 37 6 35.6569 6 34V12Z"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M42 12C42 10.3431 40.6569 9 39 9H27C25.3431 9 24 10.3431 24 12V40C24 38.3431 25.3431 37 27 37H39C40.6569 37 42 35.6569 42 34V12Z"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />

      {/* Code brackets </> */}
      <path
        d="M18 18L13 23L18 28"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M30 18L35 23L30 28"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <line
        x1="26"
        y1="17"
        x2="22"
        y2="29"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />

      {/* Graduation cap */}
      <path
        d="M24 3L14 7.5L24 12L34 7.5L24 3Z"
        fill="currentColor"
        opacity="0.9"
      />
      <path
        d="M18 9.5V13C18 13 20 15 24 15C28 15 30 13 30 13V9.5"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
      <line
        x1="34"
        y1="7.5"
        x2="34"
        y2="14"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </svg>
  );
}

/**
 * Logo wordmark — "CSEducation" with "CS" in primary, "Education" in text color
 */
function LogoText({ className = "" }) {
  return (
    <span className={`font-bold tracking-tight ${className}`}>
      <span className="text-primary-600 dark:text-primary-400">CS</span>
      <span className="text-heading dark:text-heading-dark">Education</span>
    </span>
  );
}

/**
 * Logo subtitle
 */
function LogoSubtitle({ className = "" }) {
  return (
    <span className={`text-overline uppercase text-subtle dark:text-subtle-dark tracking-widest ${className}`}>
      Knowledge Hub
    </span>
  );
}


export default function Logo({ variant = "horizontal", size = "default", className = "" }) {
  const markSize = size === "sm" ? 24 : size === "lg" ? 44 : 32;
  const textSize = size === "sm" ? "text-base" : size === "lg" ? "text-2xl" : "text-xl";

  if (variant === "icon") {
    return (
      <div className={`text-primary-600 dark:text-primary-400 ${className}`}>
        <LogoMark size={markSize} />
      </div>
    );
  }

  if (variant === "vertical") {
    return (
      <div className={`flex flex-col items-center gap-2 ${className}`}>
        <div className="text-primary-600 dark:text-primary-400">
          <LogoMark size={markSize * 1.25} />
        </div>
        <div className="flex flex-col items-center gap-0.5">
          <LogoText className={textSize} />
          <LogoSubtitle />
        </div>
      </div>
    );
  }

  /* horizontal (default) */
  return (
    <div className={`flex items-center gap-2.5 ${className}`}>
      <div className="text-primary-600 dark:text-primary-400">
        <LogoMark size={markSize} />
      </div>
      <div className="flex flex-col">
        <LogoText className={textSize} />
        {size === "lg" && <LogoSubtitle />}
      </div>
    </div>
  );
}
