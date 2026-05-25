import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  addSemester,
  addSubject,
  addResource,
  addPYQ,
} from "../api/contentService";
import { createSubject } from "../api/subjectApi";
import { semesterSubjects, toSlug } from "../data/semesterSubjects";
import toast from "react-hot-toast";

const sidebarItems = [
  { key: "semester", label: "Add Semester", icon: "📅" },
  { key: "subject", label: "Add Subject", icon: "📖" },
  { key: "resources", label: "Manage Resources", icon: "📦" },
  { key: "notes", label: "Upload Notes", icon: "📘" },
  { key: "pyqs", label: "Upload PYQs", icon: "📄" },
  { key: "books", label: "Upload Books", icon: "📚" },
  { key: "links", label: "Add References", icon: "🔗" },
];

export default function AdminDashboard() {
  const [activeForm, setActiveForm] = useState(null);
  const [mobileSidebar, setMobileSidebar] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("adminToken");
    toast.success("Logged out");
    navigate("/admin/login");
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors">
      <div className="flex">
        {/* Sidebar — Desktop */}
        <aside className="hidden lg:flex flex-col w-64 min-h-screen bg-white dark:bg-gray-800/50
                          border-r border-gray-200 dark:border-gray-700/50 p-4">
          <div className="mb-6 px-3">
            <h2 className="text-lg font-bold text-gray-900 dark:text-white flex items-center gap-2">
              <span className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-500 to-indigo-600
                              text-white text-sm flex items-center justify-center">⚙️</span>
              Admin Panel
            </h2>
          </div>

          <nav className="space-y-1 flex-1">
            {sidebarItems.map((item) => (
              <button key={item.key}
                onClick={() => setActiveForm(item.key)}
                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-colors
                  ${activeForm === item.key
                    ? "bg-gradient-to-r from-blue-500/10 to-indigo-500/10 text-blue-700 dark:text-blue-300 border border-blue-500/20"
                    : "text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700/50"
                  }`}
              >
                <span className="text-lg">{item.icon}</span>
                {item.label}
              </button>
            ))}
          </nav>

          <button onClick={handleLogout}
            className="mt-4 w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium
                       text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors">
            <span>🚪</span> Logout
          </button>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-6 lg:p-10">
          {/* Mobile header */}
          <div className="lg:hidden flex items-center justify-between mb-6">
            <button onClick={() => setMobileSidebar(!mobileSidebar)}
              className="px-3 py-2 rounded-xl bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-sm">
              ☰ Menu
            </button>
            <button onClick={handleLogout}
              className="px-3 py-2 rounded-xl text-sm text-red-600 dark:text-red-400
                         hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors">
              Logout
            </button>
          </div>

          {/* Mobile sidebar drawer */}
          <AnimatePresence>
            {mobileSidebar && (
              <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                className="lg:hidden overflow-hidden mb-6 grid grid-cols-2 sm:grid-cols-3 gap-3"
              >
                {sidebarItems.map((item) => (
                  <button key={item.key}
                    onClick={() => { setActiveForm(item.key); setMobileSidebar(false); }}
                    className={`flex items-center gap-2 px-3 py-2.5 rounded-xl text-sm font-medium transition-colors
                      ${activeForm === item.key
                        ? "bg-blue-500/10 text-blue-700 dark:text-blue-300 border border-blue-500/20"
                        : "bg-white dark:bg-gray-800 text-gray-600 dark:text-gray-400 border border-gray-200 dark:border-gray-700"
                      }`}
                  >
                    <span>{item.icon}</span> {item.label}
                  </button>
                ))}
              </motion.div>
            )}
          </AnimatePresence>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
          >
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">Dashboard</h1>
            <p className="text-gray-500 dark:text-gray-400 mb-8">Manage academic resources</p>
          </motion.div>

          {/* Overview stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
            {[
              { label: "Semesters", value: "8", icon: "📅" },
              { label: "Forms", value: "6", icon: "📝" },
              { label: "Resource Types", value: "5", icon: "📦" },
              { label: "Status", value: "Active", icon: "✅" },
            ].map((s, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.08 }}
                className="card text-center"
              >
                <div className="text-2xl mb-2">{s.icon}</div>
                <div className="text-2xl font-bold gradient-text">{s.value}</div>
                <div className="text-xs text-gray-500 dark:text-gray-400 mt-1 uppercase tracking-wider">{s.label}</div>
              </motion.div>
            ))}
          </div>

          {/* Form Area */}
          <div className="card">
            <AnimatePresence mode="wait">
              {!activeForm && (
                <motion.p key="empty" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                  className="text-center text-gray-500 dark:text-gray-400 py-8">
                  Select an action from the {window.innerWidth >= 1024 ? "sidebar" : "menu"} to manage resources.
                </motion.p>
              )}

              {activeForm === "semester" && <SemesterForm key="semester" />}
              {activeForm === "subject" && <SubjectForm key="subject" />}
              {activeForm === "resources" && <SubjectResourceForm key="resources" />}
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

// ── Form Components ──

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
    <FormMotion title="📅 Add Semester">
      <form onSubmit={handleSubmit} className="space-y-4">
        <FormInput label="Semester Number" type="number" min="1" max="8"
          placeholder="1-8" value={number} onChange={setNumber} disabled={loading} required />
        <FormInput label="Semester Name" placeholder="e.g. Sem IV"
          value={name} onChange={setName} disabled={loading} required />
        <button type="submit" disabled={loading} className="btn-primary">
          {loading ? "Saving…" : "Save Semester"}
        </button>
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
    <FormMotion title="📖 Add Subject">
      <form onSubmit={handleSubmit} className="space-y-4">
        <FormInput label="Subject Name" placeholder="e.g. Operating Systems"
          value={name} onChange={setName} disabled={loading} required />
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">Type</label>
          <select className="input" value={type} onChange={(e) => setType(e.target.value)} disabled={loading}>
            <option value="Theory">Theory</option>
            <option value="Lab">Lab</option>
          </select>
        </div>
        <FormInput label="Semester Number" type="number" min="1" max="8"
          placeholder="1-8" value={semester} onChange={setSemester} disabled={loading} required />
        <button type="submit" disabled={loading} className="btn-primary">
          {loading ? "Saving…" : "Save Subject"}
        </button>
      </form>
    </FormMotion>
  );
}

function ResourceForm({ type, label }) {
  const [title, setTitle] = useState("");
  const [url, setUrl] = useState("");
  const [subject, setSubject] = useState("");
  const [semester, setSemester] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await addResource({ title, type, url, subject, semester: Number(semester) });
      toast.success(`${label} saved!`);
      setTitle(""); setUrl(""); setSubject(""); setSemester("");
    } catch (err) { toast.error(err.message || "Failed"); }
    finally { setLoading(false); }
  };

  return (
    <FormMotion title={`Upload ${label}`}>
      <form onSubmit={handleSubmit} className="space-y-4">
        <FormInput label={`${label} Title`} placeholder={`e.g. ${label} name`}
          value={title} onChange={setTitle} disabled={loading} required />
        <FormInput label="URL" type="url" placeholder="Google Drive / URL"
          value={url} onChange={setUrl} disabled={loading} required />
        <SemesterSelect value={semester} onChange={(value) => { setSemester(value); setSubject(""); }} disabled={loading} required />
        <SubjectSelect semester={semester} value={subject} onChange={setSubject} disabled={loading} required />
        <button type="submit" disabled={loading} className="btn-primary">
          {loading ? "Saving…" : `Save ${label}`}
        </button>
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
    <FormMotion title="📄 Upload PYQs">
      <form onSubmit={handleSubmit} className="space-y-4">
        <FormInput label="PYQ Title" placeholder="e.g. DBMS 2024"
          value={title} onChange={setTitle} disabled={loading} required />
        <FormInput label="URL" type="url" placeholder="Google Drive Link"
          value={url} onChange={setUrl} disabled={loading} required />
        <FormInput label="Year" type="number" min="2000" max="2100"
          placeholder="e.g. 2024" value={year} onChange={setYear} disabled={loading} required />
        <SemesterSelect value={semester} onChange={setSemester} disabled={loading} />
        <button type="submit" disabled={loading} className="btn-primary">
          {loading ? "Saving…" : "Save PYQ"}
        </button>
      </form>
    </FormMotion>
  );
}

function SubjectResourceForm() {
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
    if (!semester || !subjectName) {
      toast.error("Semester and Subject Name are required");
      return;
    }
    setLoading(true);
    try {
      const payload = {
        semesterNumber: Number(semester),
        subjectName,
        subjectSlug: toSlug(subjectName),
        subjectType,
        notesLinks: notesLink ? [notesLink] : [],
        teacherNotesLinks: teacherNotesLink ? [teacherNotesLink] : [],
        pyqLinks: pyqLink ? [pyqLink] : [],
        bookLinks: bookLink ? [bookLink] : [],
        referenceLinks: refTitle && refUrl ? [{ title: refTitle, url: refUrl }] : [],
      };
      await createSubject(payload);
      toast.success("Subject resources saved!");
      setSemester(""); setSubjectName(""); setNotesLink("");
      setTeacherNotesLink(""); setPyqLink(""); setBookLink("");
      setRefTitle(""); setRefUrl("");
    } catch (err) { toast.error(err.message || "Failed"); }
    finally { setLoading(false); }
  };

  return (
    <FormMotion title="📦 Manage Subject Resources">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">Semester</label>
          <select className="input" value={semester} onChange={(e) => { setSemester(e.target.value); setSubjectName(""); }} disabled={loading} required>
            <option value="">Select Semester</option>
            {[1, 2, 3, 4, 5, 6, 7, 8].map((n) => <option key={n} value={n}>Semester {n}</option>)}
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">Subject Type</label>
          <select className="input" value={subjectType} onChange={(e) => { setSubjectType(e.target.value); setSubjectName(""); }} disabled={loading}>
            <option value="theory">Theory</option>
            <option value="lab">Lab</option>
            <option value="project">Project</option>
            <option value="elective">Elective</option>
          </select>
        </div>
        <SubjectSelect semester={semester} type={subjectType} value={subjectName} onChange={setSubjectName} disabled={loading} required />

        <div className="h-px bg-gray-200 dark:bg-gray-700 my-2" />
        <p className="text-xs text-gray-500 dark:text-gray-400 uppercase tracking-wider font-medium">Resource Links (optional — add any combination)</p>

        <FormInput label="Notes Link" type="url" placeholder="Google Drive / URL"
          value={notesLink} onChange={setNotesLink} disabled={loading} />
        <FormInput label="Teacher Notes Link" type="url" placeholder="Google Drive / URL"
          value={teacherNotesLink} onChange={setTeacherNotesLink} disabled={loading} />
        <FormInput label="PYQ Link" type="url" placeholder="Google Drive / URL"
          value={pyqLink} onChange={setPyqLink} disabled={loading} />
        <FormInput label="Book Link" type="url" placeholder="Google Drive / URL"
          value={bookLink} onChange={setBookLink} disabled={loading} />

        <div className="h-px bg-gray-200 dark:bg-gray-700 my-2" />
        <p className="text-xs text-gray-500 dark:text-gray-400 uppercase tracking-wider font-medium">Reference Link (optional)</p>
        <FormInput label="Reference Title" placeholder="e.g. GeeksForGeeks Tutorial"
          value={refTitle} onChange={setRefTitle} disabled={loading} />
        <FormInput label="Reference URL" type="url" placeholder="https://..."
          value={refUrl} onChange={setRefUrl} disabled={loading} />

        <button type="submit" disabled={loading} className="btn-primary">
          {loading ? "Saving…" : "Save Resources"}
        </button>
      </form>
    </FormMotion>
  );
}

// ── Shared Helpers ──

function FormMotion({ title, children }) {
  return (
    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }} transition={{ duration: 0.25 }}
    >
      <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">{title}</h2>
      {children}
    </motion.div>
  );
}

function SemesterSelect({ value, onChange, disabled, required }) {
  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">Semester</label>
      <select className="input" value={value} onChange={(e) => onChange(e.target.value)} disabled={disabled} required={required}>
        <option value="">Select Semester</option>
        {Object.keys(semesterSubjects).map((semester) => (
          <option key={semester} value={semester}>Semester {semester}</option>
        ))}
      </select>
    </div>
  );
}

function SubjectSelect({ semester, type, value, onChange, disabled, required }) {
  const config = semesterSubjects[Number(semester)] || {};
  const groups = Object.entries(config).filter(([key]) => !type || key === type);

  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">Subject</label>
      <select className="input" value={value} onChange={(e) => onChange(e.target.value)} disabled={disabled || !semester} required={required}>
        <option value="">{semester ? "Select Subject" : "Select semester first"}</option>
        {groups.map(([group, subjects]) => (
          <optgroup key={group} label={group.charAt(0).toUpperCase() + group.slice(1)}>
            {subjects.map((subjectName) => (
              <option key={`${group}-${subjectName}`} value={subjectName}>{subjectName}</option>
            ))}
          </optgroup>
        ))}
      </select>
    </div>
  );
}

function FormInput({ label, type = "text", placeholder, value, onChange, disabled, required, min, max }) {
  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">{label}</label>
      <input type={type} className="input" placeholder={placeholder} value={value}
        onChange={(e) => onChange(e.target.value)} disabled={disabled} required={required}
        min={min} max={max} />
    </div>
  );
}
