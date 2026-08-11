import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { IconChevronRight } from "./icons";

export default function Breadcrumb({ items }) {
  return (
    <motion.nav
      initial={{ opacity: 0, x: -8 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.25 }}
      className="mb-6 overflow-x-auto"
      aria-label="Breadcrumb"
    >
      <ol className="flex items-center gap-1.5 text-body-sm whitespace-nowrap">
        {items.map((it, i) => (
          <li key={i} className="flex items-center gap-1.5 min-w-0">
            {i !== 0 && (
              <IconChevronRight size={12} className="text-muted dark:text-muted-dark flex-shrink-0 opacity-40" />
            )}
            {it.to ? (
              <Link
                to={it.to}
                className="text-subtle dark:text-subtle-dark hover:text-primary-600 dark:hover:text-primary-400
                  transition-colors duration-200 truncate max-w-[160px] sm:max-w-none"
                title={it.label}
              >
                {it.label}
              </Link>
            ) : (
              <span
                className="text-heading dark:text-heading-dark font-medium truncate max-w-[200px] sm:max-w-none"
                aria-current="page"
                title={it.label}
              >
                {it.label}
              </span>
            )}
          </li>
        ))}
      </ol>
    </motion.nav>
  );
}
