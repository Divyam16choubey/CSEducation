import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { getPYQYears } from "../api/contentService";
import { fadeUp, staggerContainer } from "../animations/motion";
import useApi from "../hooks/useApi";
import useDocTitle from "../hooks/useDocTitle";
import SkeletonCard from "../components/SkeletonCard";
import { IconPYQ, IconAlertCircle } from "../components/icons";

const FALLBACK_YEARS = [2021, 2022, 2023, 2024, 2025, 2026];

export default function PYQLanding() {
  const { data, loading, error, refetch } = useApi(() => getPYQYears(), []);
  const years = data && data.length > 0 ? data : FALLBACK_YEARS;
  useDocTitle("Previous Year Questions");

  return (
    <div className="min-h-screen" style={{ background: "var(--color-background)" }}>
      <section className="py-16 px-6" style={{ background: "var(--color-surface-raised)" }}>
        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }} className="text-center"
        >
          <h1 className="section-title">Previous Year <span className="gradient-text">Questions</span></h1>
          <p className="section-subtitle mt-3">Select a year to browse question papers</p>
        </motion.div>
      </section>

      <section className="py-14 px-6">
        {loading && (
          <div className="max-w-narrow mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            <SkeletonCard count={5} />
          </div>
        )}

        {error && !loading && (
          <div className="error-state">
            <div className="error-icon">
              <IconAlertCircle size={28} />
            </div>
            <div className="error-title">Unable to load PYQ years</div>
            <div className="error-description">
              We couldn't fetch the available years. Please check your connection and try again.
            </div>
            <button onClick={refetch} className="btn-primary btn-sm">
              Try Again
            </button>
          </div>
        )}

        {!loading && !error && (
          <motion.div variants={staggerContainer} initial="hidden" animate="visible"
            className="max-w-narrow mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6"
          >
            {years.map((y) => (
              <motion.div key={y} variants={fadeUp}>
                <Link to={`/pyqs/${y}`}
                  className="group block card card-interactive card-accent text-center"
                >
                  <div className="icon-container mx-auto mb-3">
                    <IconPYQ size={22} />
                  </div>
                  <div className="text-h3 text-heading dark:text-heading-dark">{y}</div>
                  <div className="text-body-sm text-subtle dark:text-subtle-dark mt-1">View Papers</div>
                </Link>
              </motion.div>
            ))}
          </motion.div>
        )}
      </section>
    </div>
  );
}
