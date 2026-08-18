import { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  addSemester,
  addSubject,
  addResource,
  addPYQ,
  getResources,
  updateResource,
  deleteResource,
} from "../api/contentService";
import { createSubject } from "../api/subjectApi";
import { semesterSubjects, toSlug } from "../data/semesterSubjects";
import useDocTitle from "../hooks/useDocTitle";
import toast from "react-hot-toast";
import {
  IconSemester,
  IconSubject,
  IconResources,
  IconNotes,
  IconFileText,
  IconBooks,
  IconLink,
  IconSettings,
  IconMenu,
  IconClose,
  IconDashboard,
  IconGrid,
  IconCheck,
  IconShield,
  IconEdit,
  IconTrash,
  IconPYQ,
  IconAlertCircle,
} from "../components/icons";

const sidebarItems = [
  { key: "semester", label: "Add Semester", Icon: IconSemester },
  { key: "subject", label: "Add Subject", Icon: IconSubject },
  { key: "resources", label: "Manage Resources", Icon: IconResources },
  { key: "notes", label: "Upload Notes", Icon: IconNotes },
  { key: "pyqs", label: "Upload PYQs", Icon: IconFileText },
  { key: "books", label: "Upload Books", Icon: IconBooks },
  { key: "links", label: "Add References", Icon: IconLink },
];

const TYPE_ICONS = {
  notes: IconNotes,
  "teacher-notes": IconNotes,
  books: IconBooks,
  pyqs: IconPYQ,
  reference: IconLink,
};

export default function AdminDashboard() {
  const [activeForm, setActiveForm] = useState(null);
  const [mobileSidebar, setMobileSidebar] = useState(false);
  const navigate = useNavigate();
  useDocTitle("Admin Dashboard");

  const handleLogout = () => {
    localStorage.removeItem("adminToken");
    toast.success("Logged out");
    navigate("/admin/login");
  };

  return (
    <div className="min-h-screen transition-colors" style={{ background: "var(--color-background)" }}>
      <div className="flex">
        {/* Sidebar — Desktop */}
        <aside
          className="hidden lg:flex flex-col w-64 min-h-screen p-4"
          style={{
            background: "var(--color-surface)",
            borderRight: "1px solid var(--color-border)",
          }}
        >
          <div className="mb-6 px-3">
            <h2 className="text-h4 text-heading dark:text-heading-dark flex items-center gap-2">
              <span className="w-8 h-8 rounded-lg bg-primary-600 text-white text-sm flex items-center justify-center">
                <IconSettings size={16} />
              </span>
              Admin Panel
            </h2>
          </div>

          <nav className="space-y-1 flex-1">
            {sidebarItems.map((item) => (
              <button
                key={item.key}
                onClick={() => setActiveForm(item.key)}
                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-body-sm font-medium transition-colors
                  ${activeForm === item.key
                    ? "bg-primary-600/10 text-primary-600 dark:text-primary-400 border border-primary-600/20"
                    : "text-subtle dark:text-subtle-dark hover:bg-primary-600/5 dark:hover:bg-white/5"
                  }`}
              >
                <item.Icon size={18} />
                {item.label}
              </button>
            ))}
          </nav>

          <button
            onClick={handleLogout}
            className="mt-4 w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-body-sm font-medium
                       text-error-600 dark:text-error-500 hover:bg-error-50 dark:hover:bg-error-500/10 transition-colors"
          >
            <IconClose size={18} /> Logout
          </button>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-6 lg:p-10">
          {/* Mobile header */}
          <div className="lg:hidden flex items-center justify-between mb-6">
            <button
              onClick={() => setMobileSidebar(!mobileSidebar)}
              className="btn-secondary btn-sm gap-2"
            >
              {mobileSidebar ? <IconClose size={16} /> : <IconMenu size={16} />}
              Menu
            </button>
            <button
              onClick={handleLogout}
              className="btn-sm text-error-600 dark:text-error-500
                         hover:bg-error-50 dark:hover:bg-error-500/10 transition-colors rounded-xl px-3 py-2"
            >
              Logout
            </button>
          </div>

          {/* Mobile sidebar drawer */}
          <AnimatePresence>
            {mobileSidebar && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                className="lg:hidden overflow-hidden mb-6 grid grid-cols-2 sm:grid-cols-3 gap-3"
              >
                {sidebarItems.map((item) => (
                  <button
                    key={item.key}
                    onClick={() => { setActiveForm(item.key); setMobileSidebar(false); }}
                    className={`flex items-center gap-2 px-3 py-2.5 rounded-xl text-body-sm font-medium transition-colors
                      ${activeForm === item.key
                        ? "bg-primary-600/10 text-primary-600 dark:text-primary-400 border border-primary-600/20"
                        : "text-subtle dark:text-subtle-dark border"
                      }`}
                    style={{
                      background: activeForm !== item.key ? "var(--color-surface)" : undefined,
                      borderColor: activeForm !== item.key ? "var(--color-border)" : undefined,
                    }}
                  >
                    <item.Icon size={16} /> {item.label}
                  </button>
                ))}
              </motion.div>
            )}
          </AnimatePresence>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}>
            <h1 className="text-h1 text-heading dark:text-heading-dark mb-2">Dashboard</h1>
            <p className="text-body-sm text-subtle dark:text-subtle-dark mb-8">Manage academic resources</p>
          </motion.div>

          {/* Overview stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
            {[
              { label: "Semesters", value: "8", Icon: IconSemester },
              { label: "Forms", value: "6", Icon: IconDashboard },
              { label: "Resource Types", value: "5", Icon: IconGrid },
              { label: "Status", value: "Active", Icon: IconCheck },
            ].map((s, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.08 }} className="card text-center">
                <div className="icon-container mx-auto mb-3"><s.Icon size={20} /></div>
                <div className="text-h2 font-bold gradient-text">{s.value}</div>
                <div className="text-caption text-subtle dark:text-subtle-dark mt-1 uppercase tracking-wider">{s.label}</div>
              </motion.div>
            ))}
          </div>

          {/* Form Area */}
          <div className="card">
            <AnimatePresence mode="wait">
              {!activeForm && (
                <motion.p key="empty" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                  className="text-center text-subtle dark:text-subtle-dark py-8">
                  Select an action from the {window.innerWidth >= 1024 ? "sidebar" : "menu"} to manage resources.
                </motion.p>
              )}
              {activeForm === "semester" && <SemesterForm key="semester" />}
              {activeForm === "subject" && <SubjectForm key="subject" />}
              {activeForm === "resources" && <ManageResourcesPanel key="resources" />}
              {activeForm === "notes" && <ResourceForm key="notes" type="notes" label="Notes" />}
              {activeForm === "pyqs" && <PYQForm key="pyqs" />}
              {activeForm === "books" && <ResourceForm key="books" type="books" label="Book" />}
              {activeForm === "links" && <ResourceForm key="links" type="reference" label="Reference Link" />}
            </AnimatePresence>
          </div>
        </main>
      </div>
    </div>
  );
}


/* ══════════════════════════════════════════════════════
   MANAGE RESOURCES PANEL (Phase 5)
   ══════════════════════════════════════════════════════ */

function ManageResourcesPanel() {
  const [semester, setSemester] = useState("");
  const [subject, setSubject] = useState("");
  const [resources, setResources] = useState([]);
  const [loadingList, setLoadingList] = useState(false);
  const [editingResource, setEditingResource] = useState(null);
  const [deletingResource, setDeletingResource] = useState(null);

  const fetchResources = useCallback(async () => {
    if (!subject) { setResources([]); return; }
    setLoadingList(true);
    try {
      const slug = toSlug(subject);
      const res = await getResources(slug);
      setResources(res.data || []);
    } catch {
      setResources([]);
    } finally {
      setLoadingList(false);
    }
  }, [subject]);

  useEffect(() => { fetchResources(); }, [fetchResources]);

  return (
    <FormMotion title="Manage Resources" Icon={IconResources}>
      {/* Inline subject resource form */}
      <SubjectResourceFormInline />

      <div className="divider my-6" />
      <h3 className="text-h4 text-heading dark:text-heading-dark mb-4 flex items-center gap-2">
        <IconGrid size={18} />
        Browse Existing Resources
      </h3>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-5">
        <SemesterSelect value={semester} onChange={(v) => { setSemester(v); setSubject(""); }} />
        <SubjectSelect semester={semester} value={subject} onChange={setSubject} />
      </div>

      {/* Loading skeleton */}
      {loadingList && (
        <div className="space-y-2">
          {[1, 2, 3].map((i) => (
            <div key={i} className="resource-list-item">
              <div className="skeleton skeleton-circle w-9 h-9" />
              <div className="flex-1 space-y-1.5">
                <div className="skeleton skeleton-text h-4 w-2/3" />
                <div className="skeleton skeleton-text h-3 w-1/3" />
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Empty state */}
      {!loadingList && subject && resources.length === 0 && (
        <div className="text-center py-8 text-subtle dark:text-subtle-dark">
          <p className="text-body-sm">No resources found for this subject.</p>
          <p className="text-caption mt-1">Use the forms above or the sidebar options to add resources.</p>
        </div>
      )}

      {/* Resource list */}
      {!loadingList && resources.length > 0 && (
        <div className="space-y-2">
          {resources.map((r) => {
            const TypeIcon = TYPE_ICONS[r.type] || IconNotes;
            return (
              <div key={r._id} className="resource-list-item">
                <div className="rli-icon"><TypeIcon size={16} /></div>
                <div className="rli-body">
                  <div className="rli-title">{r.title}</div>
                  <div className="rli-meta">{r.type} · {new Date(r.createdAt).toLocaleDateString()}</div>
                </div>
                <div className="rli-actions">
                  <button className="rli-btn" title="Edit" onClick={() => setEditingResource(r)}>
                    <IconEdit size={15} />
                  </button>
                  <button className="rli-btn rli-btn-danger" title="Delete" onClick={() => setDeletingResource(r)}>
                    <IconTrash size={15} />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {!loadingList && !subject && semester && (
        <p className="text-center text-subtle dark:text-subtle-dark text-body-sm py-4">
          Select a subject to view its resources.
        </p>
      )}

      {/* Edit Modal */}
      <AnimatePresence>
        {editingResource && (
          <EditResourceModal
            resource={editingResource}
            onClose={() => setEditingResource(null)}
            onUpdated={(updated) => {
              setResources((prev) => prev.map((r) => (r._id === updated._id ? updated : r)));
              setEditingResource(null);
            }}
          />
        )}
      </AnimatePresence>

      {/* Delete Confirmation */}
      <AnimatePresence>
        {deletingResource && (
          <DeleteResourceModal
            resource={deletingResource}
            onClose={() => setDeletingResource(null)}
            onDeleted={(id) => {
              setResources((prev) => prev.filter((r) => r._id !== id));
              setDeletingResource(null);
            }}
          />
        )}
      </AnimatePresence>
    </FormMotion>
  );
}


/* ── Edit Resource Modal ── */

function EditResourceModal({ resource, onClose, onUpdated }) {
  const [title, setTitle] = useState(resource.title);
  const [description, setDescription] = useState(resource.description || "");
  const [type, setType] = useState(resource.type);
  const [url, setUrl] = useState(resource.url);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await updateResource(resource._id, { title, description, type, url });
      toast.success("Resource updated!");
      onUpdated(res.data);
    } catch (err) {
      toast.error(err.message || "Failed to update");
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.div className="modal-overlay" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={onClose}>
      <motion.div className="modal-content"
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 20 }}
        transition={{ duration: 0.2 }}
        onClick={(e) => e.stopPropagation()}
      >
        <h3 className="text-h3 text-heading dark:text-heading-dark mb-5 flex items-center gap-2">
          <span className="icon-container-sm"><IconEdit size={18} /></span>
          Edit Resource
        </h3>
        <form onSubmit={handleSubmit} className="space-y-4">
          <FormInput label="Title" value={title} onChange={setTitle} disabled={loading} required />
          <FormInput label="Description" placeholder="Optional short description" value={description} onChange={setDescription} disabled={loading} />
          <div>
            <label className="input-label">Type</label>
            <select className="input" value={type} onChange={(e) => setType(e.target.value)} disabled={loading}>
              <option value="notes">Notes</option>
              <option value="teacher-notes">Teacher Notes</option>
              <option value="pyqs">PYQs</option>
              <option value="books">Books</option>
              <option value="reference">Reference</option>
            </select>
          </div>
          <FormInput label="URL" type="url" value={url} onChange={setUrl} disabled={loading} required />
          <div className="flex gap-3 pt-2">
            <button type="submit" disabled={loading} className="btn-primary">{loading ? "Saving…" : "Save Changes"}</button>
            <button type="button" onClick={onClose} className="btn-secondary">Cancel</button>
          </div>
        </form>
      </motion.div>
    </motion.div>
  );
}


/* ── Delete Confirmation Modal ── */

function DeleteResourceModal({ resource, onClose, onDeleted }) {
  const [loading, setLoading] = useState(false);

  const handleDelete = async () => {
    setLoading(true);
    try {
      await deleteResource(resource._id);
      toast.success("Resource deleted");
      onDeleted(resource._id);
    } catch (err) {
      toast.error(err.message || "Failed to delete");
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.div className="modal-overlay" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={onClose}>
      <motion.div className="modal-content"
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 20 }}
        transition={{ duration: 0.2 }}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="text-center">
          <div className="w-14 h-14 mx-auto mb-4 rounded-xl flex items-center justify-center" style={{ background: "rgba(239, 68, 68, 0.08)" }}>
            <IconAlertCircle size={28} className="text-error-500" />
          </div>
          <h3 className="text-h3 text-heading dark:text-heading-dark mb-2">Delete this resource?</h3>
          <p className="text-body-sm text-subtle dark:text-subtle-dark mb-1"><strong>&ldquo;{resource.title}&rdquo;</strong></p>
          <p className="text-body-sm text-subtle dark:text-subtle-dark mb-6">
            This resource will be permanently removed from the subject page. Students will no longer see it.
          </p>
          <div className="flex gap-3 justify-center">
            <button onClick={handleDelete} disabled={loading}
              className="btn-sm px-5 py-2.5 rounded-xl font-medium text-white bg-error-600 hover:bg-error-700 transition-colors">
              {loading ? "Deleting…" : "Delete"}
            </button>
            <button onClick={onClose} className="btn-secondary btn-sm">Cancel</button>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}


/* ══════════════════════════════════════════════════════
   EXISTING FORM COMPONENTS (preserved)
   ══════════════════════════════════════════════════════ */

function SemesterForm() {
  const [number, setNumber] = useState("");
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await addSemester({ number: Number(number), name });
      toast.success("Semester added!");
      setNumber(""); setName("");
    } catch (err) { toast.error(err.message || "Failed"); }
    finally { setLoading(false); }
  };

  return (
    <FormMotion title="Add Semester" Icon={IconSemester}>
      <form onSubmit={handleSubmit} className="space-y-4">
        <FormInput label="Semester Number" type="number" min="1" max="8" placeholder="1-8" value={number} onChange={setNumber} disabled={loading} required />
        <FormInput label="Semester Name" placeholder="e.g. Sem IV" value={name} onChange={setName} disabled={loading} required />
        <button type="submit" disabled={loading} className="btn-primary">{loading ? "Saving…" : "Save Semester"}</button>
      </form>
    </FormMotion>
  );
}

function SubjectForm() {
  const [name, setName] = useState("");
  const [type, setType] = useState("Theory");
  const [semester, setSemester] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await addSubject({ name, type, semester: Number(semester) });
      toast.success("Subject added!");
      setName(""); setSemester("");
    } catch (err) { toast.error(err.message || "Failed"); }
    finally { setLoading(false); }
  };

  return (
    <FormMotion title="Add Subject" Icon={IconSubject}>
      <form onSubmit={handleSubmit} className="space-y-4">
        <FormInput label="Subject Name" placeholder="e.g. Operating Systems" value={name} onChange={setName} disabled={loading} required />
        <div>
          <label className="input-label">Type</label>
          <select className="input" value={type} onChange={(e) => setType(e.target.value)} disabled={loading}>
            <option value="Theory">Theory</option>
            <option value="Lab">Lab</option>
          </select>
        </div>
        <FormInput label="Semester Number" type="number" min="1" max="8" placeholder="1-8" value={semester} onChange={setSemester} disabled={loading} required />
        <button type="submit" disabled={loading} className="btn-primary">{loading ? "Saving…" : "Save Subject"}</button>
      </form>
    </FormMotion>
  );
}

function ResourceForm({ type, label }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [url, setUrl] = useState("");
  const [subject, setSubject] = useState("");
  const [semester, setSemester] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await addResource({ title, description, type, url, subject, semester: Number(semester) });
      toast.success(`${label} saved!`);
      setTitle(""); setDescription(""); setUrl(""); setSubject(""); setSemester("");
    } catch (err) { toast.error(err.message || "Failed"); }
    finally { setLoading(false); }
  };

  return (
    <FormMotion title={`Upload ${label}`} Icon={IconNotes}>
      <form onSubmit={handleSubmit} className="space-y-4">
        <FormInput label={`${label} Title`} placeholder={`e.g. ${label} name`} value={title} onChange={setTitle} disabled={loading} required />
        <FormInput label="Description (optional)" placeholder="Short description" value={description} onChange={setDescription} disabled={loading} />
        <FormInput label="URL" type="url" placeholder="Google Drive / URL" value={url} onChange={setUrl} disabled={loading} required />
        <SemesterSelect value={semester} onChange={(v) => { setSemester(v); setSubject(""); }} disabled={loading} required />
        <SubjectSelect semester={semester} value={subject} onChange={setSubject} disabled={loading} required />
        <button type="submit" disabled={loading} className="btn-primary">{loading ? "Saving…" : `Save ${label}`}</button>
      </form>
    </FormMotion>
  );
}

function PYQForm() {
  const [title, setTitle] = useState("");
  const [url, setUrl] = useState("");
  const [year, setYear] = useState("");
  const [semester, setSemester] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await addPYQ({ title, type: "pyqs", url, year: Number(year), semester: semester ? Number(semester) : undefined });
      toast.success("PYQ saved!");
      setTitle(""); setUrl(""); setYear(""); setSemester("");
    } catch (err) { toast.error(err.message || "Failed"); }
    finally { setLoading(false); }
  };

  return (
    <FormMotion title="Upload PYQs" Icon={IconFileText}>
      <form onSubmit={handleSubmit} className="space-y-4">
        <FormInput label="PYQ Title" placeholder="e.g. DBMS 2024" value={title} onChange={setTitle} disabled={loading} required />
        <FormInput label="URL" type="url" placeholder="Google Drive Link" value={url} onChange={setUrl} disabled={loading} required />
        <FormInput label="Year" type="number" min="2000" max="2100" placeholder="e.g. 2024" value={year} onChange={setYear} disabled={loading} required />
        <SemesterSelect value={semester} onChange={setSemester} disabled={loading} />
        <button type="submit" disabled={loading} className="btn-primary">{loading ? "Saving…" : "Save PYQ"}</button>
      </form>
    </FormMotion>
  );
}

function SubjectResourceFormInline() {
  const [semester, setSemester] = useState("");
  const [subjectType, setSubjectType] = useState("theory");
  const [subjectName, setSubjectName] = useState("");
  const [notesLink, setNotesLink] = useState("");
  const [teacherNotesLink, setTeacherNotesLink] = useState("");
  const [pyqLink, setPyqLink] = useState("");
  const [bookLink, setBookLink] = useState("");
  const [refTitle, setRefTitle] = useState("");
  const [refUrl, setRefUrl] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!semester || !subjectName) { toast.error("Semester and Subject Name are required"); return; }
    setLoading(true);
    try {
      await createSubject({
        semesterNumber: Number(semester), subjectName, subjectSlug: toSlug(subjectName), subjectType,
        notesLinks: notesLink ? [notesLink] : [], teacherNotesLinks: teacherNotesLink ? [teacherNotesLink] : [],
        pyqLinks: pyqLink ? [pyqLink] : [], bookLinks: bookLink ? [bookLink] : [],
        referenceLinks: refTitle && refUrl ? [{ title: refTitle, url: refUrl }] : [],
      });
      toast.success("Subject resources saved!");
      setSemester(""); setSubjectName(""); setNotesLink(""); setTeacherNotesLink("");
      setPyqLink(""); setBookLink(""); setRefTitle(""); setRefUrl("");
    } catch (err) { toast.error(err.message || "Failed"); }
    finally { setLoading(false); }
  };

  return (
    <>
      <h3 className="text-h4 text-heading dark:text-heading-dark mb-4 flex items-center gap-2">
        <IconSubject size={18} /> Add Subject Resources
      </h3>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="input-label">Semester</label>
          <select className="input" value={semester} onChange={(e) => { setSemester(e.target.value); setSubjectName(""); }} disabled={loading} required>
            <option value="">Select Semester</option>
            {[1,2,3,4,5,6,7,8].map((n) => <option key={n} value={n}>Semester {n}</option>)}
          </select>
        </div>
        <div>
          <label className="input-label">Subject Type</label>
          <select className="input" value={subjectType} onChange={(e) => { setSubjectType(e.target.value); setSubjectName(""); }} disabled={loading}>
            <option value="theory">Theory</option>
            <option value="lab">Lab</option>
            <option value="project">Project</option>
            <option value="elective">Elective</option>
          </select>
        </div>
        <SubjectSelect semester={semester} type={subjectType} value={subjectName} onChange={setSubjectName} disabled={loading} required />

        <div className="divider my-2" />
        <p className="text-caption text-subtle dark:text-subtle-dark uppercase tracking-wider font-medium">
          Resource Links (optional — add any combination)
        </p>
        <FormInput label="Notes Link" type="url" placeholder="Google Drive / URL" value={notesLink} onChange={setNotesLink} disabled={loading} />
        <FormInput label="Teacher Notes Link" type="url" placeholder="Google Drive / URL" value={teacherNotesLink} onChange={setTeacherNotesLink} disabled={loading} />
        <FormInput label="PYQ Link" type="url" placeholder="Google Drive / URL" value={pyqLink} onChange={setPyqLink} disabled={loading} />
        <FormInput label="Book Link" type="url" placeholder="Google Drive / URL" value={bookLink} onChange={setBookLink} disabled={loading} />

        <div className="divider my-2" />
        <p className="text-caption text-subtle dark:text-subtle-dark uppercase tracking-wider font-medium">Reference Link (optional)</p>
        <FormInput label="Reference Title" placeholder="e.g. GeeksForGeeks Tutorial" value={refTitle} onChange={setRefTitle} disabled={loading} />
        <FormInput label="Reference URL" type="url" placeholder="https://..." value={refUrl} onChange={setRefUrl} disabled={loading} />

        <button type="submit" disabled={loading} className="btn-primary">{loading ? "Saving…" : "Save Resources"}</button>
      </form>
    </>
  );
}


/* ── Shared Helpers ── */

function FormMotion({ title, Icon, children }) {
  return (
    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} transition={{ duration: 0.25 }}>
      <h2 className="text-h3 text-heading dark:text-heading-dark mb-6 flex items-center gap-2.5">
        {Icon && <span className="icon-container-sm"><Icon size={18} /></span>}
        {title}
      </h2>
      {children}
    </motion.div>
  );
}

function SemesterSelect({ value, onChange, disabled, required }) {
  return (
    <div>
      <label className="input-label">Semester</label>
      <select className="input" value={value} onChange={(e) => onChange(e.target.value)} disabled={disabled} required={required}>
        <option value="">Select Semester</option>
        {Object.keys(semesterSubjects).map((s) => <option key={s} value={s}>Semester {s}</option>)}
      </select>
    </div>
  );
}

function SubjectSelect({ semester, type, value, onChange, disabled, required }) {
  const config = semesterSubjects[Number(semester)] || {};
  const groups = Object.entries(config).filter(([key]) => !type || key === type);

  return (
    <div>
      <label className="input-label">Subject</label>
      <select className="input" value={value} onChange={(e) => onChange(e.target.value)} disabled={disabled || !semester} required={required}>
        <option value="">{semester ? "Select Subject" : "Select semester first"}</option>
        {groups.map(([group, subjects]) => (
          <optgroup key={group} label={group.charAt(0).toUpperCase() + group.slice(1)}>
            {subjects.map((name) => <option key={`${group}-${name}`} value={name}>{name}</option>)}
          </optgroup>
        ))}
      </select>
    </div>
  );
}

function FormInput({ label, type = "text", placeholder, value, onChange, disabled, required, min, max }) {
  const inputId = `admin-${label.toLowerCase().replace(/\s+/g, "-")}`;
  return (
    <div>
      <label htmlFor={inputId} className="input-label">{label}</label>
      <input id={inputId} type={type} className="input" placeholder={placeholder} value={value}
        onChange={(e) => onChange(e.target.value)} disabled={disabled} required={required} min={min} max={max} />
    </div>
  );
}
