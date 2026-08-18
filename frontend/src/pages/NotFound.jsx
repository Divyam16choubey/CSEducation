import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import useDocTitle from "../hooks/useDocTitle";
import { IconHome } from "../components/icons";

export default function NotFound() {
  useDocTitle("Page Not Found");
  return (
    <div className="min-h-screen flex items-center justify-center px-6"
      style={{ background: "var(--color-background)" }}
    >
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center max-w-lg"
      >
        <div className="text-display md:text-[8rem] font-black gradient-text mb-4">
          404
        </div>
        <h1 className="text-h2 md:text-h1 text-heading dark:text-heading-dark mb-4">
          Page Not Found
        </h1>
        <p className="text-body text-subtle dark:text-subtle-dark mb-8">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <Link to="/" className="btn-primary btn-lg gap-2">
          <IconHome size={18} /> Back to Home
        </Link>
      </motion.div>
    </div>
  );
}
