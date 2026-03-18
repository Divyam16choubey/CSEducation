// ── Central Semester Subject Configuration ──
// Data-driven subject mapping for all 8 semesters.
// Ready to be replaced by API fetch in production.

export const semesterSubjects = {
    1: {
        theory: [
            "Engineering Chemistry",
            "Engineering Mechanics",
            "Engineering Mathematics",
            "Basic Electronics Engineering",
            "Communication Skills",
        ],
        lab: [
            "Engineering Drawing",
            "Workshop",
            "Chemistry Lab",
        ],
    },
    2: {
        theory: [
            "Introduction to Computing",
            "Basic Electrical Engineering",
            "Environmental Studies",
            "Engineering Physics",
            "Engineering Mathematics",
        ],
        lab: [
            "Computing Lab",
            "Physics Lab",
            "Basic Electrical Engineering Lab",
        ],
    },
    3: {
        theory: [
            "Mathematics",
            "Data Structures",
            "Discrete Mathematics",
            "Digital Design",
            "Engineering Economics & Accountancy",
        ],
        lab: [
            "Data Structure Lab",
            "Digital Design Lab",
        ],
    },
    4: {
        theory: [
            "FLAT",
            "Algorithms",
            "COA",
            "OOPs with JAVA",
            "Probability & Random Processes",
        ],
        lab: [
            "Algorithms Lab",
            "OOPs with JAVA Lab",
            "Peripherals and Accessories Lab",
        ],
    },
    5: {
        theory: [
            "Optimization",
            "Software Engineering",
            "Operating Systems",
            "Data Communication",
            "Numerical Methods",
        ],
        lab: [
            "Software Engineering Lab",
            "Operating System Lab",
        ],
    },
    6: {
        theory: [
            "Management & Managerial Economics",
            "Databases",
            "Compilers",
            "Computer Networks",
            "Information Storage & Retrieval",
        ],
        lab: [
            "Databases Lab",
            "Compilers Lab",
            "Computer Networks Lab",
        ],
    },
    7: {
        theory: [
            "Computer Graphics",
            "Machine Learning",
            "Department Elective I",
            "Department Elective II",
            "Department Elective III",
        ],
        lab: [
            "Computer Graphics Lab",
            "ML Lab",
            "Project I",
        ],
    },
    8: {
        theory: [
            "Department Elective IV",
            "Department Elective V",
            "Department Elective VI",
        ],
        project: [
            "Project II",
        ],
    },
};

/** Convert subject name → URL slug: "OOPs with JAVA" → "oops-with-java" */
export const toSlug = (name) => name.replace(/\s+/g, "-").toLowerCase();

/** Convert URL slug → display name: "oops-with-java" → "Oops With Java" */
export const toDisplayName = (slug) =>
    slug.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());
