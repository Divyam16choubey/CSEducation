import { useEffect } from "react";

const BASE_TITLE = "CSEducation";

/**
 * Sets document.title on mount and restores the base title on unmount.
 * @param {string} title — Page-specific title (e.g. "Semester III")
 */
export default function useDocTitle(title) {
  useEffect(() => {
    document.title = title ? `${title} | ${BASE_TITLE}` : `${BASE_TITLE} – CSE Knowledge Hub`;
    return () => { document.title = `${BASE_TITLE} – CSE Knowledge Hub`; };
  }, [title]);
}
