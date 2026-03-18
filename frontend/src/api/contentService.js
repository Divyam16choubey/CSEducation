import API from "./api";

// ── Semesters ──
export const getSemesters = () => API.get("/content/semesters");
export const addSemester = (data) => API.post("/content/semesters", data);

// ── Subjects ──
export const getSubjects = (semester) =>
  API.get(`/content/subjects/${semester}`);
export const addSubject = (data) => API.post("/content/subjects", data);

// ── Resources ──
export const getResources = (subjectId) =>
  API.get(`/content/resources/${subjectId}`);
export const addResource = (data) => API.post("/content/resources", data);

// ── PYQs ──
export const getPYQYears = () => API.get("/content/pyqs/years");
export const getPYQs = (year) => API.get(`/content/pyqs/${year}`);
export const addPYQ = (data) => API.post("/content/pyqs", data);
