import { useParams } from "react-router-dom";
import { motion } from "framer-motion";
import SubjectCard from "../components/SubjectCard";
import Breadcrumb from "../components/Breadcrumb";
import SkeletonCard from "../components/SkeletonCard";
import { getSubjects } from "../api/contentService";
import { fetchSemesterSubjects } from "../api/subjectApi";
import { staggerContainer } from "../animations/motion";
import useApi from "../hooks/useApi";
import useDocTitle from "../hooks/useDocTitle";
import { semesterSubjects, toSlug } from "../data/semesterSubjects";
import { IconSubject, IconLab, IconProject, IconAlertCircle, IconEmptyState } from "../components/icons";

// ── Section config by type ──
const sectionConfig = {
  theory: { Icon: IconSubject, label: "Theory Subjects", badge: "Theory" },
  lab: { Icon: IconLab, label: "Lab Subjects", badge: "Lab" },
  project: { Icon: IconProject, label: "Project", badge: "Project" },
};

// ── Helpers ──
const countResources = (s) => {
  let count = 0;
  if (s.notesLinks) count += s.notesLinks.length;
  if (s.teacherNotesLinks) count += s.teacherNotesLinks.length;
  if (s.pyqLinks) count += s.pyqLinks.length;
  if (s.bookLinks) count += s.bookLinks.length;
  if (s.referenceLinks) count += s.referenceLinks.length;
  return count;
};

const ROMAN = ["I", "II", "III", "IV", "V", "VI", "VII", "VIII"];

export default function SemesterPage() {
  const { id } = useParams();
  const semId = Number(id);
  const { data, loading, error, refetch } = useApi(() => fetchSemesterSubjects(id), [id]);
  useDocTitle(`Semester ${ROMAN[semId - 1] || id}`);

  const resourceCountMap = {};
  if (data && data.length > 0) {
    data.forEach((s) => {
      const slug = s.subjectSlug || toSlug(s.subjectName || s.name);
      if (slug) {
        resourceCountMap[slug] = countResources(s);
      }
    });
  }

  const localConfig = semesterSubjects[semId] || { theory: [], lab: [] };

  const sections = Object.entries(sectionConfig)
    .map(([key, cfg]) => {
      const localNames = localConfig[key] || [];
      const apiMatches = (data || []).filter((s) => {
        const type = (s.subjectType || s.type || "").toLowerCase();
        return type === key.toLowerCase();
      });

      let subjects = [];
      if (apiMatches.length > 0) {
        subjects = apiMatches.map((s) => ({
          _id: s._id,
          name: s.subjectName || s.name,
          slug: s.subjectSlug || toSlug(s.subjectName || s.name),
          type: cfg.badge,
        }));
      } else if (localNames.length > 0) {
        subjects = localNames.map((name) => ({
          name,
          slug: toSlug(name),
          type: cfg.badge,
        }));
      }

      if (subjects.length === 0) return null;
      return { key, ...cfg, subjects };
    })
    .filter(Boolean);

  const totalSubjects = sections.reduce((sum, s) => sum + s.subjects.length, 0);

  const breadcrumbItems = [
    { label: "Home", to: "/" },
    { label: "Semesters", to: "/semester" },
    { label: `Semester ${ROMAN[semId - 1] || id}` },
  ];

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
            <h1 className="text-h1 md:text-display text-heading dark:text-heading-dark tracking-tight">
              Semester{" "}
              <span className="gradient-text">{ROMAN[semId - 1] || id}</span>
            </h1>
            <div className="flex items-center gap-3 mt-3 flex-wrap">
              <span className="text-body text-subtle dark:text-subtle-dark">
                {totalSubjects} subject{totalSubjects !== 1 ? "s" : ""} across{" "}
                {sections.length} {sections.length === 1 ? "category" : "categories"}
              </span>
              {sections.map((s) => (
                <span key={s.key} className="badge badge-primary">
                  {s.subjects.length} {s.badge}
                </span>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Content */}
      <section className="py-14 px-6">
        <div className="max-w-content mx-auto">

          {/* Loading */}
          {loading && (
            <div className="space-y-10">
              <div>
                <div className="skeleton skeleton-text h-5 w-40 mb-6" />
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5">
                  <SkeletonCard count={5} variant="subject" />
                </div>
              </div>
              <div>
                <div className="skeleton skeleton-text h-5 w-32 mb-6" />
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5">
                  <SkeletonCard count={3} variant="subject" />
                </div>
              </div>
            </div>
          )}

          {/* Error State */}
          {error && !loading && (
            <div className="error-state">
              <div className="error-icon">
                <IconAlertCircle size={28} />
              </div>
              <div className="error-title">Unable to load subjects</div>
              <div className="error-description">
                We couldn't fetch the subjects for this semester. Please check your connection and try again.
              </div>
              <button onClick={refetch} className="btn-primary btn-sm">
                Try Again
              </button>
            </div>
          )}

          {/* Sections */}
          {!loading && (
            <div className="space-y-14">
              {sections.map((section, sIdx) => (
                <div key={section.key}>
                  {sIdx > 0 && <div className="divider-accent mb-10" />}

                  {/* Section header */}
                  <motion.div
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: sIdx * 0.1, duration: 0.35 }}
                    className="flex items-center gap-3 mb-6"
                  >
                    <div className="icon-container">
                      <section.Icon size={20} />
                    </div>
                    <h2 className="text-h3 text-heading dark:text-heading-dark">
                      {section.label}
                    </h2>
                    <span className="badge badge-primary">
                      {section.subjects.length}
                    </span>
                  </motion.div>

                  {/* Subject cards grid */}
                  {section.subjects.length > 0 ? (
                    <motion.div
                      variants={staggerContainer}
                      initial="hidden"
                      animate="visible"
                      className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5"
                    >
                      {section.subjects.map((s, i) => {
                        const slug = toSlug(s.name);
                        const rCount = resourceCountMap[slug] || 0;
                        return (
                          <SubjectCard
                            key={s._id || i}
                            name={s.name}
                            icon={<section.Icon size={22} />}
                            to={`/subject/${slug}`}
                            resourceCount={rCount}
                            badge={section.badge}
                          />
                        );
                      })}
                    </motion.div>
                  ) : (
                    <div className="empty-state">
                      <div className="empty-icon">
                        <IconEmptyState size={24} />
                      </div>
                      <div className="empty-title">
                        No {section.label.toLowerCase()} yet
                      </div>
                      <div className="empty-description">
                        {section.label} for this semester haven't been added yet.
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
