import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { fadeUp, cardHover, cardTap } from "../animations/motion";

export default function SubjectCard({ name, to, icon = "📖", resourceCount = 0 }) {
  return (
    <motion.div variants={fadeUp} whileHover={cardHover} whileTap={cardTap}>
      <Link
        to={to}
        className="group block card text-center"
      >
        <div className="w-12 h-12 mx-auto mb-3 rounded-xl bg-gradient-to-br from-blue-500/10 to-indigo-500/10
                        dark:from-blue-500/20 dark:to-indigo-500/20
                        flex items-center justify-center text-xl">
          {icon}
        </div>
        <div className="text-lg font-semibold text-gray-800 dark:text-gray-200">
          {name}
        </div>
        {resourceCount > 0 && (
          <div className="mt-2 inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-medium
                          bg-gradient-to-r from-emerald-500/10 to-teal-500/10
                          dark:from-emerald-500/20 dark:to-teal-500/20
                          text-emerald-600 dark:text-emerald-400 border border-emerald-500/15">
            📎 {resourceCount} resource{resourceCount !== 1 ? "s" : ""}
          </div>
        )}
        <div className="mt-3 h-0.5 w-0 mx-auto bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500
                        group-hover:w-full transition-all duration-300 rounded-full" />
      </Link>
    </motion.div>
  );
}
