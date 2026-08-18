import { useParams } from "react-router-dom";
import { motion } from "framer-motion";
import Breadcrumb from "../components/Breadcrumb";
import SkeletonCard from "../components/SkeletonCard";
import { getPYQs } from "../api/contentService";
import { fadeUp, staggerContainer } from "../animations/motion";
import useApi from "../hooks/useApi";
import useDocTitle from "../hooks/useDocTitle";
import { IconFileText, IconEmptyState, IconAlertCircle } from "../components/icons";

export default function PYQPage() {
  const { year } = useParams();
  const { data, loading, error, refetch } = useApi(() => getPYQs(year), [year]);
  useDocTitle(`PYQs – ${year}`);

  const breadcrumbItems = [
    { label: "Home", to: "/" },
    { label: "PYQs", to: "/pyqs" },
    { label: year },
  ];

  const grouped = {};
  if (data && data.length > 0) {
    data.forEach((pyq) => {
      const sem = pyq.semester || 0;
      if (!grouped[sem]) grouped[sem] = [];
      grouped[sem].push(pyq);
    });
  }

  return (
    <div className="min-h-screen" style={{ background: "var(--color-background)" }}>
      <section className="py-14 px-6" style={{ background: "var(--color-surface-raised)" }}>
        <div className="max-w-content mx-auto">
          <Breadcrumb items={breadcrumbItems} />
          <motion.h1 initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
            className="section-title text-left"
          >
            PYQs – <span className="gradient-text">{year}</span>
          </motion.h1>
        </div>
      </section>

      <section className="py-14 px-6">
        <div className="max-w-content mx-auto">
          {loading && (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <SkeletonCard count={4} />
            </div>
          )}

          {error && !loading && (
            <div className="error-state">
              <div className="error-icon">
                <IconAlertCircle size={28} />
              </div>
              <div className="error-title">Unable to load question papers</div>
              <div className="error-description">
                We couldn't fetch papers for {year}. Please check your connection and try again.
              </div>
              <button onClick={refetch} className="btn-primary btn-sm">
                Try Again
              </button>
            </div>
          )}

          {!loading && data && data.length > 0 && (
            <div className="space-y-10">
              {Object.entries(grouped)
                .sort(([a], [b]) => Number(a) - Number(b))
                .map(([sem, pyqs]) => (
                  <div key={sem}>
                    <motion.h2 initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      className="text-h3 text-heading dark:text-heading-dark mb-5"
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
                          className="group block card card-interactive card-accent"
                        >
                          <div className="flex items-center gap-3">
                            <div className="icon-container-sm flex-shrink-0">
                              <IconFileText size={18} />
                            </div>
                            <span className="font-medium text-heading dark:text-heading-dark">{pyq.title}</span>
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
              <div className="icon-container-lg mx-auto mb-4 text-muted dark:text-muted-dark">
                <IconEmptyState size={28} />
              </div>
              <h3 className="text-h3 text-heading dark:text-heading-dark mb-2">
                No Papers Uploaded
              </h3>
              <p className="text-subtle dark:text-subtle-dark">
                No question papers uploaded for {year} yet. Check back later!
              </p>
            </motion.div>
          )}
        </div>
      </section>
    </div>
  );
}
