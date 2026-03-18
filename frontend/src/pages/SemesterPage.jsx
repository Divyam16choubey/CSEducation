import { useParams } from "react-router-dom";
import { motion } from "framer-motion";
import SubjectCard from "../components/SubjectCard";
import Breadcrumb from "../components/Breadcrumb";
import SkeletonCard from "../components/SkeletonCard";
import { getSubjects } from "../api/contentService";
import { fetchSemesterSubjects } from "../api/subjectApi";
import { staggerContainer } from "../animations/motion";
import useApi from "../hooks/useApi";
import { semesterSubjects, toSlug } from "../data/semesterSubjects";

// ── Section config by type ──
const sectionConfig = {
  theory: { icon: "📖", label: "Theory Subjects" },
  lab: { icon: "🔬", label: "Lab Subjects" },
  project: { icon: "🚀", label: "Project" },
};

// ── Helpers ──
const buildSubjects = (names, type) =>
  names.map((name) => ({ name, type }));

/** Count total resources in a subject document */
const countResources = (s) => {
  let count = 0;
  if (s.notesLinks) count += s.notesLinks.length;
  if (s.teacherNotesLinks) count += s.teacherNotesLinks.length;
  if (s.pyqLinks) count += s.pyqLinks.length;
  if (s.bookLinks) count += s.bookLinks.length;
  if (s.referenceLinks) count += s.referenceLinks.length;
  return count;
};

export default function SemesterPage() {
  const { id } = useParams();
  const semId = Number(id);
  const { data, loading, error } = useApi(() => getSubjects(id), [id]);

  // Fetch subjects from new subject API for resource counts
  const { data: subjectData } = useApi(() => fetchSemesterSubjects(id), [id]);

  // Build a slug → resource count map
  const resourceCountMap = {};
  if (subjectData && subjectData.length > 0) {
    subjectData.forEach((s) => {
      if (s.subjectSlug) {
        resourceCountMap[s.subjectSlug] = countResources(s);
      }
    });
  }

  // API-first, local config fallback
  const hasApiData = data && data.length > 0;
  const localConfig = semesterSubjects[semId] || { theory: [], lab: [] };

  // Build sections dynamically from whatever keys exist (theory, lab, project)
  const sections = Object.entries(sectionConfig)
    .map(([key, cfg]) => {
      const localNames = localConfig[key];
      if (!localNames) return null; // semester doesn't have this section type

      const subjects = hasApiData
        ? data.filter((s) => s.type === cfg.label.split(" ")[0]) // "Theory", "Lab", "Project"
        : buildSubjects(localNames, cfg.label);

      return { key, ...cfg, subjects };
    })
    .filter(Boolean);

  const breadcrumbItems = [
    { label: "Home", to: "/" },
    { label: "Semesters", to: "/semester" },
    { label: `Semester ${id}` },
  ];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors">
      {/* ── Header ── */}
      <section className="gradient-bg py-14 px-6">
        <div className="max-w-6xl mx-auto">
          <Breadcrumb items={breadcrumbItems} />
          <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
            className="section-title"
          >
            Semester <span className="gradient-text">{id}</span>
          </motion.h1>
          <p className="section-subtitle mt-3">
            {sections.reduce((sum, s) => sum + s.subjects.length, 0)} subjects across{" "}
            {sections.length} categories
          </p>
        </div>
      </section>

      {/* ── Content ── */}
      <section className="py-14 px-6">
        <div className="max-w-6xl mx-auto">
          {loading && (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
              <SkeletonCard count={6} />
            </div>
          )}

          {error && !loading && (
            <p className="text-center text-red-500 mb-6">{error}</p>
          )}

          {!loading && (
            <div className="space-y-12">
              {sections.map((section, sIdx) => (
                <div key={section.key}>
                  {/* ── Section divider (skip before first) ── */}
                  {sIdx > 0 && (
                    <div className="h-px mb-10 bg-gradient-to-r from-transparent via-blue-500/20 to-transparent" />
                  )}

                  {/* ── Section header ── */}
                  <motion.div
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: sIdx * 0.15, duration: 0.4 }}
                    className="flex items-center gap-3 mb-6"
                  >
                    <span className="text-2xl">{section.icon}</span>
                    <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-200">
                      {section.label}
                    </h2>
                    <span className="inline-flex items-center justify-center min-w-[28px] h-7 px-2
                                     rounded-full text-xs font-bold
                                     bg-gradient-to-r from-blue-500/10 to-indigo-500/10
                                     dark:from-blue-500/20 dark:to-indigo-500/20
                                     text-blue-600 dark:text-blue-400 border border-blue-500/15">
                      {section.subjects.length}
                    </span>
                  </motion.div>

                  {/* ── Subject cards grid ── */}
                  <motion.div
                    variants={staggerContainer}
                    initial="hidden"
                    animate="visible"
                    className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6"
                  >
                    {section.subjects.map((s, i) => {
                      const slug = toSlug(s.name);
                      const rCount = resourceCountMap[slug] || 0;
                      return (
                        <SubjectCard
                          key={s._id || i}
                          name={s.name}
                          icon={section.icon}
                          to={`/subject/${slug}`}
                          resourceCount={rCount}
                        />
                      );
                    })}
                  </motion.div>

                  {section.subjects.length === 0 && (
                    <p className="text-gray-500 dark:text-gray-400">
                      No {section.label.toLowerCase()} available yet.
                    </p>
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
