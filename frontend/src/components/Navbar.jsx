import { Link, useLocation } from "react-router-dom";
import { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function Navbar() {
  const [dark, setDark] = useState(false);
  const [openSem, setOpenSem] = useState(false);
  const [openPyq, setOpenPyq] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  const semRef = useRef(null);
  const pyqRef = useRef(null);

  // ── Scroll detection ──
  const handleScroll = useCallback(() => {
    setScrolled(window.scrollY > 10);
  }, []);

  useEffect(() => {
    const saved = localStorage.getItem("theme");
    if (saved === "dark") {
      document.documentElement.classList.add("dark");
      setDark(true);
    }

    const handleClickOutside = (e) => {
      if (semRef.current && !semRef.current.contains(e.target)) setOpenSem(false);
      if (pyqRef.current && !pyqRef.current.contains(e.target)) setOpenPyq(false);
    };

    document.addEventListener("mousedown", handleClickOutside);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      window.removeEventListener("scroll", handleScroll);
    };
  }, [handleScroll]);

  // Close mobile menu on route change
  useEffect(() => {
    setMobileOpen(false);
    setOpenSem(false);
    setOpenPyq(false);
  }, [location.pathname]);

  const toggleTheme = () => {
    const next = !dark;
    document.documentElement.classList.toggle("dark", next);
    localStorage.setItem("theme", next ? "dark" : "light");
    setDark(next);
  };

  const semesters = ["Sem I", "Sem II", "Sem III", "Sem IV", "Sem V", "Sem VI", "Sem VII", "Sem VIII"];
  const pyqYears = ["2021", "2022", "2023", "2024", "2025", "2026"];

  const dropdownMotion = {
    initial: { opacity: 0, y: -8, scale: 0.96 },
    animate: { opacity: 1, y: 0, scale: 1 },
    exit: { opacity: 0, y: -8, scale: 0.96 },
    transition: { duration: 0.18, ease: "easeOut" },
  };

  const mobileMenuMotion = {
    initial: { opacity: 0, height: 0 },
    animate: { opacity: 1, height: "auto" },
    exit: { opacity: 0, height: 0 },
    transition: { duration: 0.25, ease: "easeInOut" },
  };

  // ── Adaptive navbar classes ──
  const navBase = "sticky top-0 z-50 px-6 py-3 transition-all duration-500";
  const navLight = scrolled
    ? "bg-white/80 border-b border-gray-200/60 shadow-lg shadow-gray-200/20"
    : "bg-white/70 border-b border-gray-200/40 shadow-sm";
  const navDark = scrolled
    ? "bg-gradient-to-r from-slate-900/95 to-slate-800/95 border-b border-white/10 shadow-lg shadow-black/30"
    : "bg-gradient-to-r from-slate-900/90 to-slate-800/90 border-b border-white/5 shadow-md shadow-black/20";

  // ── Dropdown adaptive classes ──
  const dropdownClass = dark
    ? "absolute mt-2 w-44 rounded-xl shadow-2xl overflow-hidden border border-white/10 bg-slate-800/95 backdrop-blur-xl z-50"
    : "absolute mt-2 w-44 rounded-xl shadow-2xl shadow-gray-200/50 overflow-hidden border border-gray-200/60 bg-white/90 backdrop-blur-xl z-50";

  const dropdownItemClass = dark
    ? "block px-4 py-2.5 text-sm text-gray-300 hover:text-white hover:bg-white/10 transition-colors duration-150"
    : "block px-4 py-2.5 text-sm text-gray-600 hover:text-blue-600 hover:bg-blue-50/70 transition-colors duration-150";

  return (
    <nav
      className={`${navBase} ${dark ? navDark : navLight}`}
      style={{ backdropFilter: "blur(16px) saturate(180%)" }}
    >
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        {/* ── Brand ── */}
        <Link to="/" className="flex items-center gap-2.5 group">
          <motion.span
            className="text-2xl"
            whileHover={{ scale: 1.15, rotate: -8 }}
            transition={{ type: "spring", stiffness: 300, damping: 15 }}
          >
            🎓
          </motion.span>
          <span className="text-xl font-bold tracking-wide gradient-text
                           group-hover:opacity-80 transition-opacity duration-300">
            CSEducation
          </span>
        </Link>

        {/* ── Mobile hamburger ── */}
        <button
          className={`md:hidden p-2 rounded-xl transition-colors duration-300 ${dark ? "hover:bg-white/10 text-white" : "hover:bg-gray-100 text-gray-700"
            }`}
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Toggle menu"
        >
          <span className="text-xl">{mobileOpen ? "✕" : "☰"}</span>
        </button>

        {/* ── Desktop menu ── */}
        <div className="hidden md:flex items-center gap-1">
          <NavLink to="/" label="Home" current={location.pathname} dark={dark} />

          {/* Semester dropdown */}
          <div className="relative" ref={semRef}
            onMouseEnter={() => { setOpenSem(true); setOpenPyq(false); }}
          >
            <NavButton label="Semester" isOpen={openSem} dark={dark}
              onClick={() => { setOpenSem(v => !v); setOpenPyq(false); }}
            />
            <AnimatePresence>
              {openSem && (
                <motion.div {...dropdownMotion}
                  className={dropdownClass}
                  onMouseLeave={() => setOpenSem(false)}
                >
                  {semesters.map((s, i) => (
                    <Link key={i} to={`/semester/${i + 1}`}
                      className={dropdownItemClass} onClick={() => setOpenSem(false)}
                    >{s}</Link>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* PYQs dropdown */}
          <div className="relative" ref={pyqRef}
            onMouseEnter={() => { setOpenPyq(true); setOpenSem(false); }}
          >
            <NavButton label="PYQs" isOpen={openPyq} dark={dark}
              onClick={() => { setOpenPyq(v => !v); setOpenSem(false); }}
            />
            <AnimatePresence>
              {openPyq && (
                <motion.div {...dropdownMotion}
                  className={dropdownClass}
                  onMouseLeave={() => setOpenPyq(false)}
                >
                  {pyqYears.map(y => (
                    <Link key={y} to={`/pyqs/${y}`}
                      className={dropdownItemClass} onClick={() => setOpenPyq(false)}
                    >{y}</Link>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <NavLink to="/about" label="About" current={location.pathname} dark={dark} />
          <NavLink to="/contact" label="Contact" current={location.pathname} dark={dark} />

          {/* ── Theme Toggle ── */}
          <motion.button
            onClick={toggleTheme}
            className={`ml-3 p-2.5 rounded-xl transition-all duration-500 ${dark
              ? "bg-white/10 hover:bg-white/20 text-yellow-300"
              : "bg-gray-100 hover:bg-gray-200 text-indigo-500"
              }`}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.92 }}
            aria-label="Toggle theme"
          >
            <motion.span
              key={dark ? "sun" : "moon"}
              initial={{ rotate: -90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: 90, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="block text-lg"
            >
              {dark ? "☀️" : "🌙"}
            </motion.span>
          </motion.button>
        </div>
      </div>

      {/* ── Mobile menu ── */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div {...mobileMenuMotion}
            className={`md:hidden overflow-hidden mt-3 pt-3 ${dark ? "border-t border-white/10" : "border-t border-gray-200/60"
              }`}
          >
            <div className="flex flex-col gap-1 py-2">
              <MobileLink to="/" label="Home" dark={dark} />

              <button
                className={`py-2.5 px-3 text-left rounded-lg text-sm font-medium tracking-wide transition-colors duration-300 ${dark ? "text-gray-300 hover:bg-white/10 hover:text-white" : "text-gray-600 hover:bg-gray-100 hover:text-gray-900"
                  }`}
                onClick={() => setOpenSem(!openSem)}
              >
                Semester {openSem ? "▴" : "▾"}
              </button>
              <AnimatePresence>
                {openSem && (
                  <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }} className="overflow-hidden pl-4 flex flex-col gap-0.5"
                  >
                    {semesters.map((s, i) => (
                      <MobileLink key={i} to={`/semester/${i + 1}`} label={s} small dark={dark} />
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>

              <button
                className={`py-2.5 px-3 text-left rounded-lg text-sm font-medium tracking-wide transition-colors duration-300 ${dark ? "text-gray-300 hover:bg-white/10 hover:text-white" : "text-gray-600 hover:bg-gray-100 hover:text-gray-900"
                  }`}
                onClick={() => setOpenPyq(!openPyq)}
              >
                PYQs {openPyq ? "▴" : "▾"}
              </button>
              <AnimatePresence>
                {openPyq && (
                  <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }} className="overflow-hidden pl-4 flex flex-col gap-0.5"
                  >
                    {pyqYears.map(y => (
                      <MobileLink key={y} to={`/pyqs/${y}`} label={y} small dark={dark} />
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>

              <MobileLink to="/about" label="About" dark={dark} />
              <MobileLink to="/contact" label="Contact" dark={dark} />

              <button onClick={toggleTheme}
                className={`mt-2 px-3 py-2.5 rounded-xl text-left text-sm font-medium transition-all duration-500 ${dark
                  ? "bg-white/10 hover:bg-white/20 text-gray-300"
                  : "bg-gray-100 hover:bg-gray-200 text-gray-600"
                  }`}
              >
                {dark ? "☀️ Light Mode" : "🌙 Dark Mode"}
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}

// ── Desktop Nav Link with underline animation ──
function NavLink({ to, label, current, dark }) {
  const isActive = current === to;
  return (
    <Link
      to={to}
      className={`relative px-3 py-2 rounded-lg text-sm font-medium tracking-wide transition-all duration-300 group ${dark
        ? isActive
          ? "text-white bg-white/10"
          : "text-gray-300 hover:text-white hover:bg-white/10"
        : isActive
          ? "text-blue-600 bg-blue-50/60"
          : "text-gray-600 hover:text-gray-900 hover:bg-gray-100/80"
        }`}
    >
      {label}
      {/* Animated underline */}
      <span className={`absolute bottom-0.5 left-1/2 -translate-x-1/2 h-0.5 rounded-full
                         bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500
                         transition-all duration-300 ${isActive ? "w-4/5" : "w-0 group-hover:w-3/5"}`} />
    </Link>
  );
}

// ── Desktop dropdown button ──
function NavButton({ label, isOpen, dark, onClick }) {
  return (
    <button
      onClick={onClick}
      className={`px-3 py-2 rounded-lg text-sm font-medium tracking-wide transition-all duration-300 ${dark
        ? "text-gray-300 hover:text-white hover:bg-white/10"
        : "text-gray-600 hover:text-gray-900 hover:bg-gray-100/80"
        }`}
    >
      {label}{" "}
      <span className={`inline-block transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`}>
        ▾
      </span>
    </button>
  );
}

// ── Mobile link ──
function MobileLink({ to, label, small, dark }) {
  return (
    <Link to={to}
      className={`py-2 px-3 rounded-lg transition-colors duration-300 ${small ? "text-sm" : "text-sm font-medium tracking-wide"
        } ${dark
          ? "text-gray-300 hover:text-white hover:bg-white/10"
          : "text-gray-600 hover:text-gray-900 hover:bg-gray-100"
        }`}
    >
      {label}
    </Link>
  );
}
