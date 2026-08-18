import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { getSemesters } from "../api/contentService";
import { fadeUp, staggerContainer } from "../animations/motion";
import useApi from "../hooks/useApi";
import useDocTitle from "../hooks/useDocTitle";
import SkeletonCard from "../components/SkeletonCard";
import Breadcrumb from "../components/Breadcrumb";
import { IconSemester, IconAlertCircle } from "../components/icons";
import { semesterSubjects } from "../data/semesterSubjects";

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

const ROMAN = ["I", "II", "III", "IV", "V", "VI", "VII", "VIII"];

/** Get subject counts for a semester from local data */
function getSubjectCounts(semNumber) {
  const config = semesterSubjects[semNumber];
  if (!config) return { theory: 0, lab: 0, project: 0, total: 0 };
  const theory = config.theory?.length || 0;
  const lab = config.lab?.length || 0;
  const project = config.project?.length || 0;
  return { theory, lab, project, total: theory + lab + project };
}

const breadcrumbItems = [
  { label: "Home", to: "/" },
  { label: "Semesters" },
];

export default function SemesterLanding() {
  const { data, loading, error, refetch } = useApi(() => getSemesters(), []);
  const semesters = data && data.length > 0 ? data : FALLBACK_SEMESTERS;
  useDocTitle("Semesters");

  return (
    <div className="min-h-screen" style={{ background: "var(--color-background)" }}>
      {/* Header */}
      <section className="py-14 px-6" style={{ background: "var(--color-surface-raised)" }}>
        <div className="max-w-content mx-auto">
          <Breadcrumb items={breadcrumbItems} />

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
          >
            <h1 className="section-title text-left">
              <span className="gradient-text">Semesters</span>
            </h1>
            <p className="text-body text-subtle dark:text-subtle-dark mt-3 max-w-xl">
              Select your semester to explore subjects and resources. Each semester
              contains theory, lab, and practical coursework.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Semester Cards Grid */}
      <section className="py-14 px-6">
        <div className="max-w-content mx-auto">

          {/* Loading */}
          {loading && (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-5">
              <SkeletonCard count={8} variant="semester" />
            </div>
          )}

          {/* Error State */}
          {error && !loading && (
            <div className="error-state">
              <div className="error-icon">
                <IconAlertCircle size={28} />
              </div>
              <div className="error-title">Unable to load semesters</div>
              <div className="error-description">
                We couldn't fetch the semester data. This might be a temporary issue — please try again.
              </div>
              <button onClick={refetch} className="btn-primary btn-sm">
                Try Again
              </button>
            </div>
          )}

          {/* Semester Grid */}
          {!loading && (
            <motion.div
              variants={staggerContainer}
              initial="hidden"
              animate="visible"
              className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-5"
            >
              {semesters.map((s) => {
                const counts = getSubjectCounts(s.number);
                return (
                  <motion.div key={s.number} variants={fadeUp}>
                    <Link
                      to={`/semester/${s.number}`}
                      className="group block card card-interactive card-accent text-center py-7 px-5"
                    >
                      <div className="icon-container mx-auto mb-3 transition-transform duration-300 group-hover:scale-105">
                        <IconSemester size={22} />
                      </div>
                      <div className="semester-number mb-1">
                        Semester {ROMAN[s.number - 1] || s.number}
                      </div>
                      <div className="text-h4 text-heading dark:text-heading-dark">
                        {s.name}
                      </div>
                      {counts.total > 0 && (
                        <div className="semester-meta">
                          <span>{counts.theory} Theory</span>
                          {counts.lab > 0 && (
                            <>
                              <span className="semester-meta-dot" />
                              <span>{counts.lab} Lab</span>
                            </>
                          )}
                          {counts.project > 0 && (
                            <>
                              <span className="semester-meta-dot" />
                              <span>{counts.project} Project</span>
                            </>
                          )}
                        </div>
                      )}
                      <div className="mt-2">
                        <span className="badge badge-primary">
                          {counts.total} subject{counts.total !== 1 ? "s" : ""}
                        </span>
                      </div>
                    </Link>
                  </motion.div>
                );
              })}
            </motion.div>
          )}
        </div>
      </section>
    </div>
  );
}
