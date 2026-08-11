// ──────────────────────────────────────────────
// CSEducation — Framer Motion Presets
// ──────────────────────────────────────────────
// Consistent animation language across the app.
// Refined easing curves for a premium feel.
// ──────────────────────────────────────────────

/* Respect user's motion preferences */
const prefersReducedMotion =
  typeof window !== "undefined" &&
  window.matchMedia("(prefers-reduced-motion: reduce)").matches;

const duration = (ms) => (prefersReducedMotion ? 0 : ms);

export const fadeUp = {
  hidden: { opacity: 0, y: prefersReducedMotion ? 0 : 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: duration(0.45), ease: [0.25, 0.46, 0.45, 0.94] },
  },
};

export const fadeIn = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: duration(0.35), ease: "easeOut" },
  },
};

export const scaleIn = {
  hidden: { opacity: 0, scale: prefersReducedMotion ? 1 : 0.95 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: duration(0.35), ease: [0.25, 0.46, 0.45, 0.94] },
  },
};

export const slideInLeft = {
  hidden: { opacity: 0, x: prefersReducedMotion ? 0 : -20 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: duration(0.4), ease: "easeOut" },
  },
};

export const slideInRight = {
  hidden: { opacity: 0, x: prefersReducedMotion ? 0 : 20 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: duration(0.4), ease: "easeOut" },
  },
};

export const staggerContainer = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: prefersReducedMotion ? 0 : 0.06,
      delayChildren: prefersReducedMotion ? 0 : 0.08,
    },
  },
};

/*
 * Card hover — uses ONLY scale (not y-translate).
 * CSS `.card:hover` handles translateY, so Framer must not also translate
 * or we get a janky double-shift.
 */
export const cardHover = prefersReducedMotion
  ? {}
  : {
      scale: 1.015,
      transition: { type: "spring", stiffness: 400, damping: 25 },
    };

export const cardTap = {
  scale: 0.98,
};
