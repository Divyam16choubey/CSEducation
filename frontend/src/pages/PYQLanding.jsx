import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { getPYQYears } from "../api/contentService";
import { fadeUp, staggerContainer } from "../animations/motion";
import useApi from "../hooks/useApi";
import SkeletonCard from "../components/SkeletonCard";

const FALLBACK_YEARS = [2021, 2022, 2023, 2024, 2025, 2026];

export default function PYQLanding() {
  const { data, loading, error } = useApi(() => getPYQYears(), []);
  const years = data && data.length > 0 ? data : FALLBACK_YEARS;

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors">
      <section className="gradient-bg py-16 px-6">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }} className="text-center"
        >
          <h1 className="section-title">Previous Year <span className="gradient-text">Questions</span></h1>
          <p className="section-subtitle mt-4">Select a year to browse question papers</p>
        </motion.div>
      </section>

      <section className="py-14 px-6">
        {loading && (
          <div className="max-w-4xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            <SkeletonCard count={5} />
          </div>
        )}

        {error && !loading && (
          <p className="text-center text-red-500 mb-6">{error}</p>
        )}

        {!loading && (
          <motion.div variants={staggerContainer} initial="hidden" animate="visible"
            className="max-w-4xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6"
          >
            {years.map((y) => (
              <motion.div key={y} variants={fadeUp}>
                <Link to={`/pyqs/${y}`}
                  className="group block card card-accent text-center"
                >
                  <div className="text-3xl mb-3">📄</div>
                  <div className="text-xl font-bold text-gray-800 dark:text-gray-200">{y}</div>
                  <div className="text-sm text-gray-500 dark:text-gray-400 mt-1">View Papers</div>
                </Link>
              </motion.div>
            ))}
          </motion.div>
        )}
      </section>
    </div>
  );
}
