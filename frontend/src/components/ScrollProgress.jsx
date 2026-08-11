import { useEffect, useState, useCallback } from "react";

export default function ScrollProgress() {
  const [progress, setProgress] = useState(0);

  const handleScroll = useCallback(() => {
    const scrollTop = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    setProgress(docHeight > 0 ? (scrollTop / docHeight) * 100 : 0);
  }, []);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [handleScroll]);

  return (
    <div
      className="fixed top-0 left-0 w-full h-0.5 z-[100] transition-opacity duration-300"
      style={{ opacity: progress > 0 ? 1 : 0 }}
    >
      <div
        className="h-full bg-gradient-to-r from-primary-600 via-primary-500 to-accent-500 transition-[width] duration-100 ease-out"
        style={{ width: `${progress}%` }}
      />
    </div>
  );
}
