import { Link } from "react-router-dom";
import { motion } from "framer-motion";

export default function Breadcrumb({ items }) {
  return (
    <motion.nav
      initial={{ opacity: 0, x: -10 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.3 }}
      className="mb-8 text-sm flex items-center gap-2 text-gray-500 dark:text-gray-400"
      aria-label="Breadcrumb"
    >
      {items.map((it, i) => (
        <span key={i} className="flex items-center gap-2">
          {i !== 0 && <span className="text-gray-400 dark:text-gray-600">›</span>}
          {it.to ? (
            <Link to={it.to} className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
              {it.label}
            </Link>
          ) : (
            <span className="text-gray-800 dark:text-gray-200 font-medium">{it.label}</span>
          )}
        </span>
      ))}
    </motion.nav>
  );
}
