import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import Breadcrumb from "../components/Breadcrumb";
import ResourceCard from "../components/ResourceCard";
import SkeletonCard from "../components/SkeletonCard";
import { getResources } from "../api/contentService";
import { fetchSubjectBySlug } from "../api/subjectApi";
import { staggerContainer } from "../animations/motion";
import useApi from "../hooks/useApi";
import useDocTitle from "../hooks/useDocTitle";
import {
  IconNotes, IconTeacher, IconPYQ, IconBooks, IconLink,
  IconGlobe, IconYoutube, IconEmptyState, IconAlertCircle, IconArrowRight,
} from "../components/icons";

/* ── Resource section config ── */
const typeConfig = {
  notesLinks: { Icon: IconNotes, label: "Notes" },
  teacherNotesLinks: { Icon: IconTeacher, label: "Teacher Notes" },
  pyqLinks: { Icon: IconPYQ, label: "PYQs" },
  bookLinks: { Icon: IconBooks, label: "Books" },
  referenceLinks: { Icon: IconLink, label: "Reference Links" },
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
      ? <IconYoutube size={20} className="text-error-500" />
      : <IconGlobe size={20} className="text-primary-600 dark:text-primary-400" />;
  } catch {
    return <IconGlobe size={20} className="text-primary-600 dark:text-primary-400" />;
  }
};

export default function SubjectPage() {
  const { id } = useParams();
  const displayName = id.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());
  const { data: subject, loading: subjectLoading, error: subjectError } = useApi(() => fetchSubjectBySlug(id), [id]);
  const { data: uploadedResources, loading: resourcesLoading, error: resourcesError, refetch } = useApi(() => getResources(id), [id]);
  const loading = subjectLoading || resourcesLoading;
  useDocTitle(subject?.subjectName || displayName);

  /* ── Build breadcrumb with semester context ── */
  const semNum = subject?.semesterNumber;
  const ROMAN = ["I", "II", "III", "IV", "V", "VI", "VII", "VIII"];
  const breadcrumbItems = [
    { label: "Home", to: "/" },
    { label: "Semesters", to: "/semester" },
    ...(semNum ? [{ label: `Semester ${ROMAN[semNum - 1] || semNum}`, to: `/semester/${semNum}` }] : []),
    { label: subject?.subjectName || displayName },
  ];

  /* ── Build sections from both data sources ── */
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
    for (const [key, cfg] of Object.entries(typeConfig)) {
      if (key === "referenceLinks") continue;
      const links = subject[key];
      if (links && links.length > 0) {
        addSectionResources(key, links.map((url, i) => ({
          _id: `${key}-${i}`,
          title: `${cfg.label} ${i + 1}`,
          url,
        })));
      }
    }

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
        description: resource.description || "",
        url: resource.url,
        icon: sectionKey === "referenceLinks" ? getReferenceIcon(resource.url) : undefined,
      }]);
    });
  }

  const hasResources = sections.length > 0;
  const error = !hasResources ? subjectError || resourcesError : resourcesError;

  /* ── Tab state ── */
  const [activeTab, setActiveTab] = useState(null);
  // Default to first tab once sections are available
  const currentTab = activeTab || (sections.length > 0 ? sections[0].key : null);

  /* ── Subject type badge ── */
  const subjectType = subject?.subjectType;
  const typeBadgeClass = subjectType === "lab" ? "badge-lab"
    : subjectType === "project" ? "badge-featured"
    : "badge-theory";
  const typeBadgeLabel = subjectType === "lab" ? "Lab"
    : subjectType === "project" ? "Project"
    : "Theory";

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
              {subject?.subjectName || displayName}
            </h1>
            <div className="flex items-center gap-2 mt-3 flex-wrap">
              {semNum && (
                <span className="badge badge-primary">
                  Semester {ROMAN[semNum - 1] || semNum}
                </span>
              )}
              {subjectType && (
                <span className={`badge ${typeBadgeClass}`}>
                  {typeBadgeLabel}
                </span>
              )}
              {hasResources && (
                <span className="text-body-sm text-subtle dark:text-subtle-dark">
                  {sections.reduce((t, s) => t + s.resources.length, 0)} resource{sections.reduce((t, s) => t + s.resources.length, 0) !== 1 ? "s" : ""} available
                </span>
              )}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Content */}
      <section className="py-14 px-6">
        <div className="max-w-content mx-auto">

          {/* Loading */}
          {loading && (
            <div>
              <div className="flex gap-4 mb-8">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="skeleton skeleton-text h-9 w-24" />
                ))}
              </div>
              <div className="space-y-4">
                <SkeletonCard count={4} variant="resource" />
              </div>
            </div>
          )}

          {/* Error State */}
          {error && !loading && (
            <div className="error-state">
              <div className="error-icon">
                <IconAlertCircle size={28} />
              </div>
              <div className="error-title">Unable to load resources</div>
              <div className="error-description">
                We couldn't fetch the resources for this subject. Please check your connection and try again.
              </div>
              <div className="flex gap-3">
                <button onClick={refetch} className="btn-primary btn-sm">
                  Try Again
                </button>
                <Link to="/semester" className="btn-secondary btn-sm">
                  Back to Semesters
                </Link>
              </div>
            </div>
          )}

          {/* Resources with tabs */}
          {!loading && hasResources && (
            <>
              {/* Tab Navigation */}
              <div className="tab-nav mb-8">
                {sections.map((section) => (
                  <button
                    key={section.key}
                    className={`tab-nav-item ${currentTab === section.key ? "tab-active" : ""}`}
                    onClick={() => setActiveTab(section.key)}
                  >
                    <section.Icon size={16} />
                    {section.label}
                    <span className="badge badge-primary ml-1" style={{ fontSize: "0.6875rem", padding: "1px 6px" }}>
                      {section.resources.length}
                    </span>
                  </button>
                ))}
              </div>

              {/* Active Tab Content */}
              {sections.map((section) => (
                currentTab === section.key && (
                  <motion.div
                    key={section.key}
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.25 }}
                  >
                    <div className="flex items-center gap-3 mb-5">
                      <div className="icon-container">
                        <section.Icon size={20} />
                      </div>
                      <h2 className="text-h3 text-heading dark:text-heading-dark">
                        {section.label}
                      </h2>
                    </div>

                    <motion.div
                      variants={staggerContainer}
                      initial="hidden"
                      animate="visible"
                      className="space-y-3"
                    >
                      {section.resources.map((r) => (
                        <ResourceCard
                          key={r._id}
                          label={r.title}
                          description={r.description}
                          href={r.url}
                          icon={r.icon || <section.Icon size={20} />}
                          type={section.label}
                        />
                      ))}
                    </motion.div>
                  </motion.div>
                )
              ))}
            </>
          )}

          {/* Empty State */}
          {!loading && !hasResources && !error && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.4 }}
              className="empty-state"
            >
              <div className="empty-icon">
                <IconEmptyState size={28} />
              </div>
              <div className="empty-title">
                No study materials yet
              </div>
              <div className="empty-description" style={{ marginBottom: "20px" }}>
                Resources for {subject?.subjectName || displayName} haven't been uploaded yet. Check back soon!
              </div>
              <Link to={semNum ? `/semester/${semNum}` : "/semester"} className="btn-secondary btn-sm gap-1">
                <IconArrowRight size={14} className="rotate-180" />
                Back to Semester
              </Link>
            </motion.div>
          )}
        </div>
      </section>
    </div>
  );
}
