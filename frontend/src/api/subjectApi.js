import API from "./api";

// ── Subject Resource Management ──

export const createSubject = (data) => API.post("/subjects", data);

export const fetchSemesterSubjects = (semester) =>
    API.get(`/subjects/semester/${semester}`);

export const fetchSubjectBySlug = (slug) =>
    API.get(`/subjects/slug/${slug}`);
