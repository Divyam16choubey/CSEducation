import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { fadeUp, cardHover, cardTap } from "../animations/motion";

export default function ResourceCard({ label, href, icon }) {
  const isInternal = href && href.startsWith("/");

  const content = (
    <>
      <div className="w-14 h-14 mx-auto mb-4 rounded-2xl bg-gradient-to-br from-blue-500/10 to-indigo-500/10
                      dark:from-blue-500/20 dark:to-indigo-500/20
                      flex items-center justify-center text-2xl">
        {icon}
      </div>
      <div className="text-lg font-semibold text-gray-800 dark:text-gray-200">{label}</div>
      <div className="mt-4 h-0.5 w-0 mx-auto bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500
                      group-hover:w-full transition-all duration-300 rounded-full" />
    </>
  );

  const classes = `group block card p-8 text-center`;

  if (isInternal) {
    return (
      <motion.div variants={fadeUp} whileHover={cardHover} whileTap={cardTap}>
        <Link to={href} className={classes}>{content}</Link>
      </motion.div>
    );
  }

  return (
    <motion.div variants={fadeUp} whileHover={cardHover} whileTap={cardTap}>
      <a href={href} target="_blank" rel="noreferrer" className={classes}>{content}</a>
    </motion.div>
  );
}
