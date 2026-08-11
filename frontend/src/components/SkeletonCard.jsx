import { motion } from "framer-motion";

/**
 * SkeletonCard — Shimmer placeholder cards during loading.
 * Supports variants to match actual card layouts.
 *
 * @param {number}  count   — how many skeleton cards to render
 * @param {"semester"|"subject"|"resource"|"default"} variant
 */
export default function SkeletonCard({ count = 4, variant = "default" }) {
  return (
    <>
      {Array.from({ length: count }).map((_, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: i * 0.04 }}
          className="card-static"
        >
          {variant === "semester" && (
            <div className="flex flex-col items-center gap-3 py-2">
              <div className="skeleton skeleton-circle w-11 h-11" />
              <div className="skeleton skeleton-text h-3 w-16" />
              <div className="skeleton skeleton-text h-5 w-24" />
              <div className="flex gap-2 mt-1">
                <div className="skeleton skeleton-text h-3 w-16" />
                <div className="skeleton skeleton-text h-3 w-12" />
              </div>
            </div>
          )}

          {variant === "subject" && (
            <div className="flex items-center gap-4 py-1">
              <div className="skeleton skeleton-circle w-12 h-12 flex-shrink-0" />
              <div className="flex-1 space-y-2">
                <div className="skeleton skeleton-text h-4 w-3/4" />
                <div className="skeleton skeleton-text h-3 w-1/3" />
              </div>
            </div>
          )}

          {variant === "resource" && (
            <div className="flex items-center gap-4">
              <div className="skeleton skeleton-circle w-11 h-11 flex-shrink-0" />
              <div className="flex-1 space-y-2">
                <div className="skeleton skeleton-text h-4 w-2/3" />
                <div className="skeleton skeleton-text h-3 w-1/4" />
              </div>
              <div className="skeleton skeleton-text h-8 w-16 flex-shrink-0" />
            </div>
          )}

          {variant === "default" && (
            <div className="flex flex-col items-center gap-3">
              {/* Icon placeholder */}
              <div className="skeleton skeleton-circle w-11 h-11" />
              {/* Title */}
              <div className="skeleton skeleton-text h-4 w-3/4" />
              {/* Subtitle */}
              <div className="skeleton skeleton-text h-3 w-1/2" />
              {/* Progress bar */}
              <div className="skeleton h-1.5 w-full rounded-full mt-1" />
            </div>
          )}
        </motion.div>
      ))}
    </>
  );
}
