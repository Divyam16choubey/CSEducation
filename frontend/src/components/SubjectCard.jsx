import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { fadeUp, cardHover, cardTap } from "../animations/motion";
import { IconArrowRight } from "./icons";

/**
 * SubjectCard — Displays a subject with icon, name, optional category badge,
 * and resource count. Left-aligned layout for better readability with long names.
 *
 * @param {string}      name          — Subject display name
 * @param {string}      to            — Link target
 * @param {ReactNode}   icon          — Icon element
 * @param {number}      resourceCount — Number of available resources
 * @param {string}      badge         — Optional category label ("Theory", "Lab", "Project")
 */
export default function SubjectCard({ name, to, icon, resourceCount = 0, badge }) {
  return (
    <motion.div variants={fadeUp} whileHover={cardHover} whileTap={cardTap}>
      <Link
        to={to}
        className="group flex items-start gap-4 card card-interactive card-accent py-5 px-5"
      >
        <div className="icon-container-lg flex-shrink-0 transition-transform duration-300 group-hover:scale-105">
          {icon}
        </div>
        <div className="flex-1 min-w-0">
          <div className="text-h4 text-heading dark:text-heading-dark leading-snug mb-1 break-words">
            {name}
          </div>
          <div className="flex items-center gap-2 flex-wrap">
            {badge && (
              <span className={`badge ${badge === "Lab" ? "badge-lab" : badge === "Project" ? "badge-featured" : "badge-theory"}`}>
                {badge}
              </span>
            )}
            {resourceCount > 0 && (
              <span className="badge badge-primary">
                {resourceCount} resource{resourceCount !== 1 ? "s" : ""}
              </span>
            )}
          </div>
          {/* Hover indicator */}
          <div className="mt-2 flex items-center gap-1 text-caption text-primary-600 dark:text-primary-400
            opacity-0 group-hover:opacity-100 translate-y-1 group-hover:translate-y-0
            transition-all duration-200"
          >
            <span>View resources</span>
            <IconArrowRight size={12} />
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
