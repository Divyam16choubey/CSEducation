import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { getSemesters } from "../api/contentService";
import { fadeUp, staggerContainer } from "../animations/motion";
import useApi from "../hooks/useApi";
import SkeletonCard from "../components/SkeletonCard";

const FALLBACK_SEMESTERS = [
  { number: 1, name: "Sem I" },
  { number: 2, name: "Sem II" },
  { number: 3, name: "Sem III" },
  { number: 4, name: "Sem IV" },
  { number: 5, name: "Sem V" },
  { number: 6, name: "Sem VI" },
  { number: 7, name: "Sem VII" },
  { number: 8, name: "Sem VIII" },
];

const semIcons = ["1️⃣", "2️⃣", "3️⃣", "4️⃣", "5️⃣", "6️⃣", "7️⃣", "8️⃣"];

export default function SemesterLanding() {
  const { data, loading, error } = useApi(() => getSemesters(), []);
  const semesters = data && data.length > 0 ? data : FALLBACK_SEMESTERS;

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors">
      <section className="gradient-bg py-16 px-6">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }} className="text-center"
        >
          <h1 className="section-title">Select <span className="gradient-text">Semester</span></h1>
          <p className="section-subtitle mt-4">Choose your semester to browse subjects and resources</p>
        </motion.div>
      </section>

      <section className="py-14 px-6">
        {loading && (
          <div className="max-w-5xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
            <SkeletonCard count={8} />
          </div>
        )}

        {error && !loading && (
          <p className="text-center text-red-500 mb-6">{error}</p>
        )}

        {!loading && (
          <motion.div variants={staggerContainer} initial="hidden" animate="visible"
            className="max-w-5xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6"
          >
            {semesters.map((s, i) => (
              <motion.div key={s.number} variants={fadeUp}>
                <Link to={`/semester/${s.number}`}
                  className="group block card card-accent text-center"
                >
                  <div className="text-3xl mb-3">{semIcons[i] || "📅"}</div>
                  <div className="text-lg font-semibold text-gray-800 dark:text-gray-200">{s.name}</div>
                </Link>
              </motion.div>
            ))}
          </motion.div>
        )}
      </section>
    </div>
  );
}
