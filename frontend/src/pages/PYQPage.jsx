import { useParams } from "react-router-dom";
import { motion } from "framer-motion";
import Breadcrumb from "../components/Breadcrumb";
import SkeletonCard from "../components/SkeletonCard";
import { getPYQs } from "../api/contentService";
import { fadeUp, staggerContainer } from "../animations/motion";
import useApi from "../hooks/useApi";

export default function PYQPage() {
  const { year } = useParams();
  const { data, loading, error } = useApi(() => getPYQs(year), [year]);

  const breadcrumbItems = [
    { label: "Home", to: "/" },
    { label: "PYQs", to: "/pyqs" },
    { label: year },
  ];

  // Group PYQs by semester
  const grouped = {};
  if (data && data.length > 0) {
    data.forEach((pyq) => {
      const sem = pyq.semester || 0;
      if (!grouped[sem]) grouped[sem] = [];
      grouped[sem].push(pyq);
    });
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors">
      <section className="gradient-bg py-14 px-6">
        <div className="max-w-5xl mx-auto">
          <Breadcrumb items={breadcrumbItems} />
          <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
            className="section-title"
          >
            PYQs – <span className="gradient-text">{year}</span>
          </motion.h1>
        </div>
      </section>

      <section className="py-14 px-6">
        <div className="max-w-5xl mx-auto">
          {loading && (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <SkeletonCard count={4} />
            </div>
          )}

          {error && !loading && (
            <p className="text-center text-red-500 mb-6">{error}</p>
          )}

          {!loading && data && data.length > 0 && (
            <div className="space-y-10">
              {Object.entries(grouped)
                .sort(([a], [b]) => Number(a) - Number(b))
                .map(([sem, pyqs]) => (
                  <div key={sem}>
                    <motion.h2 initial={{ opacity: 0, y: 15 }} whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      className="text-2xl font-semibold mb-5 text-gray-800 dark:text-gray-200"
                    >
                      {Number(sem) > 0 ? `Semester ${sem}` : "General"}
                    </motion.h2>
                    <motion.div variants={staggerContainer} initial="hidden" whileInView="visible"
                      viewport={{ once: true, margin: "-50px" }}
                      className="grid grid-cols-1 sm:grid-cols-2 gap-5"
                    >
                      {pyqs.map((pyq) => (
                        <motion.a key={pyq._id} variants={fadeUp}
                          href={pyq.url} target="_blank" rel="noreferrer"
                          className="group block card card-accent"
                        >
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500/10 to-indigo-500/10
                                            dark:from-blue-500/20 dark:to-indigo-500/20
                                            flex items-center justify-center text-lg flex-shrink-0">
                              📄
                            </div>
                            <span className="font-medium text-gray-800 dark:text-gray-200">{pyq.title}</span>
                          </div>
                        </motion.a>
                      ))}
                    </motion.div>
                  </div>
                ))}
            </div>
          )}

          {!loading && (!data || data.length === 0) && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}
              className="text-center py-16"
            >
              <div className="text-5xl mb-4">📭</div>
              <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-200 mb-2">
                No Papers Uploaded
              </h3>
              <p className="text-gray-500 dark:text-gray-400">
                No question papers uploaded for {year} yet. Check back later!
              </p>
            </motion.div>
          )}
        </div>
      </section>
    </div>
  );
}
