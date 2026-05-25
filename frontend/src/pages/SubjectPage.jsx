import { useParams } from "react-router-dom";
import { motion } from "framer-motion";
import { FaGlobe, FaYoutube } from "react-icons/fa";
import Breadcrumb from "../components/Breadcrumb";
import ResourceCard from "../components/ResourceCard";
import SkeletonCard from "../components/SkeletonCard";
import { getResources } from "../api/contentService";
import { fetchSubjectBySlug } from "../api/subjectApi";
import { staggerContainer } from "../animations/motion";
import useApi from "../hooks/useApi";

const typeConfig = {
  notesLinks: { icon: "📘", label: "Notes" },
  teacherNotesLinks: { icon: "👨‍🏫", label: "Teacher Notes" },
  pyqLinks: { icon: "📄", label: "PYQs" },
  bookLinks: { icon: "📚", label: "Books" },
  referenceLinks: { icon: "🔗", label: "Reference Links" },
};

const resourceTypeToSection = {
  notes: "notesLinks",
  "teacher-notes": "teacherNotesLinks",
  pyqs: "pyqLinks",
  books: "bookLinks",
  reference: "referenceLinks",
};

const getReferenceIcon = (url) => {
  try {
    const hostname = new URL(url).hostname.replace(/^www\./, "");
    const isYouTube = hostname === "youtube.com" || hostname === "youtu.be" || hostname.endsWith(".youtube.com");

    return isYouTube
      ? <FaYoutube className="text-red-600" aria-label="YouTube" />
      : <FaGlobe className="text-blue-600 dark:text-blue-400" aria-label="Website" />;
  } catch {
    return <FaGlobe className="text-blue-600 dark:text-blue-400" aria-label="Website" />;
  }
};

export default function SubjectPage() {
  const { id } = useParams();
  const displayName = id.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());
  const { data: subject, loading: subjectLoading, error: subjectError } = useApi(() => fetchSubjectBySlug(id), [id]);
  const { data: uploadedResources, loading: resourcesLoading, error: resourcesError } = useApi(() => getResources(id), [id]);
  const loading = subjectLoading || resourcesLoading;

  const breadcrumbItems = [
    { label: "Home", to: "/" },
    { label: "Semesters", to: "/semester" },
    { label: displayName },
  ];

  // Build grouped sections from subject document arrays
  const sections = [];
  const addSectionResources = (key, resources) => {
    const existing = sections.find((section) => section.key === key);
    if (existing) {
      existing.resources.push(...resources);
      return;
    }

    sections.push({
      ...typeConfig[key],
      key,
      resources,
    });
  };

  if (subject) {
    // Simple link arrays (notes, teacher notes, pyqs, books)
    for (const [key, cfg] of Object.entries(typeConfig)) {
      if (key === "referenceLinks") continue; // handle separately
      const links = subject[key];
      if (links && links.length > 0) {
        addSectionResources(key, links.map((url, i) => ({
            _id: `${key}-${i}`,
            title: `${cfg.label} ${i + 1}`,
            url,
          })));
      }
    }

    // Reference links (objects with title + url)
    if (subject.referenceLinks && subject.referenceLinks.length > 0) {
      addSectionResources("referenceLinks", subject.referenceLinks.map((ref, i) => ({
          _id: `ref-${i}`,
          title: ref.title || `Reference ${i + 1}`,
          url: ref.url,
          icon: getReferenceIcon(ref.url),
        })));
    }
  }

  if (uploadedResources && uploadedResources.length > 0) {
    uploadedResources.forEach((resource) => {
      const sectionKey = resourceTypeToSection[resource.type];
      if (!sectionKey) return;

      addSectionResources(sectionKey, [{
        _id: resource._id,
        title: resource.title,
        url: resource.url,
        icon: sectionKey === "referenceLinks" ? getReferenceIcon(resource.url) : undefined,
      }]);
    });
  }

  const hasResources = sections.length > 0;
  const error = !hasResources ? subjectError || resourcesError : resourcesError;

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors">
      <section className="gradient-bg py-14 px-6">
        <div className="max-w-6xl mx-auto">
          <Breadcrumb items={breadcrumbItems} />
          <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
            className="section-title"
          >
            <span className="gradient-text">{subject?.subjectName || displayName}</span>
          </motion.h1>
          <p className="section-subtitle mt-3">Browse all available resources for this subject</p>
        </div>
      </section>

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

          {!loading && hasResources && (
            <div className="space-y-14">
              {sections.map((section) => (
                <div key={section.key}>
                  <motion.h2 initial={{ opacity: 0, y: 15 }} whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-2xl font-semibold text-gray-800 dark:text-gray-200 mb-6 flex items-center gap-2"
                  >
                    <span>{section.icon}</span> {section.label}
                  </motion.h2>
                  <motion.div variants={staggerContainer} initial="hidden" whileInView="visible"
                    viewport={{ once: true, margin: "-50px" }}
                    className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6"
                  >
                    {section.resources.map((r) => (
                      <ResourceCard
                        key={r._id}
                        label={r.title}
                        href={r.url}
                        icon={r.icon || section.icon}
                      />
                    ))}
                  </motion.div>
                </div>
              ))}
            </div>
          )}

          {!loading && !hasResources && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}
              transition={{ duration: 0.6 }}
              className="text-center py-16"
            >
              <div className="text-5xl mb-4">📭</div>
              <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-200 mb-2">
                Resources will be uploaded soon.
              </h3>
              <p className="text-gray-500 dark:text-gray-400">
                Resources for {subject?.subjectName || displayName} haven't been uploaded yet. Check back soon!
              </p>
            </motion.div>
          )}
        </div>
      </section>
    </div>
  );
}
