import { Link, useLocation } from "react-router-dom";
import { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Logo from "./Logo";
import { IconMenu, IconClose, IconChevronDown, IconSun, IconMoon } from "./icons";

export default function Navbar() {
  const [dark, setDark] = useState(false);
  const [openSem, setOpenSem] = useState(false);
  const [openPyq, setOpenPyq] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const isAdmin = !!localStorage.getItem("adminToken");

  const semRef = useRef(null);
  const pyqRef = useRef(null);

  const handleScroll = useCallback(() => {
    setScrolled(window.scrollY > 10);
  }, []);

  /* Theme initialization — respect OS preference on first visit */
  useEffect(() => {
    const saved = localStorage.getItem("theme");
    if (saved === "dark" || (!saved && window.matchMedia("(prefers-color-scheme: dark)").matches)) {
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

  /* Body scroll lock when mobile menu is open */
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [mobileOpen]);

  /* Close menus on navigation */
  useEffect(() => {
    setMobileOpen(false);
    setOpenSem(false);
    setOpenPyq(false);
  }, [location.pathname]);

  /* Escape key closes dropdowns */
  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === "Escape") {
        setOpenSem(false);
        setOpenPyq(false);
        setMobileOpen(false);
      }
    };
    document.addEventListener("keydown", handleEsc);
    return () => document.removeEventListener("keydown", handleEsc);
  }, []);

  const toggleTheme = () => {
    const next = !dark;
    document.documentElement.classList.toggle("dark", next);
    localStorage.setItem("theme", next ? "dark" : "light");
    setDark(next);
  };

  /* Keyboard navigation for dropdown menus */
  const handleDropdownKeyDown = (e, items, closeDropdown) => {
    const focusable = items;
    const idx = focusable.indexOf(document.activeElement);
    if (e.key === "ArrowDown") {
      e.preventDefault();
      const next = idx < focusable.length - 1 ? idx + 1 : 0;
      focusable[next]?.focus();
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      const prev = idx > 0 ? idx - 1 : focusable.length - 1;
      focusable[prev]?.focus();
    } else if (e.key === "Escape" || e.key === "Tab") {
      closeDropdown();
    }
  };

  const semesters = ["Sem I", "Sem II", "Sem III", "Sem IV", "Sem V", "Sem VI", "Sem VII", "Sem VIII"];
  const pyqYears = ["2021", "2022", "2023", "2024", "2025", "2026"];

  const dropdownMotion = {
    initial: { opacity: 0, y: -6, scale: 0.97 },
    animate: { opacity: 1, y: 0, scale: 1 },
    exit: { opacity: 0, y: -6, scale: 0.97 },
    transition: { duration: 0.15, ease: "easeOut" },
  };

  const mobileMenuMotion = {
    initial: { opacity: 0, height: 0 },
    animate: { opacity: 1, height: "auto" },
    exit: { opacity: 0, height: 0 },
    transition: { duration: 0.2, ease: "easeInOut" },
  };

  /* Check if a dropdown parent is "active" */
  const isSemActive = location.pathname.startsWith("/semester");
  const isPyqActive = location.pathname.startsWith("/pyqs");

  return (
    <nav
      className={`sticky top-0 z-50 transition-all duration-300
        ${scrolled ? "shadow-sm" : ""}`}
      style={{
        backdropFilter: "blur(16px) saturate(180%)",
        background: scrolled
          ? "var(--color-surface-overlay)"
          : "var(--color-surface-overlay)",
        borderBottom: `1px solid ${scrolled ? "var(--color-border)" : "transparent"}`,
      }}
    >
      <div className="max-w-content mx-auto px-6 flex justify-between items-center h-14">
        {/* Brand */}
        <Link to="/" className="flex-shrink-0" aria-label="CSEducation home">
          <Logo variant="horizontal" size="sm" />
        </Link>

        {/* Mobile hamburger */}
        <button
          className="btn-icon md:hidden"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label={mobileOpen ? "Close menu" : "Open menu"}
          aria-expanded={mobileOpen}
        >
          {mobileOpen ? <IconClose size={20} /> : <IconMenu size={20} />}
        </button>

        {/* Desktop menu */}
        <div className="hidden md:flex items-center gap-0.5">
          <NavLink to="/" label="Home" current={location.pathname} />

          {/* Semester dropdown */}
          <div className="relative" ref={semRef}
            onMouseEnter={() => { setOpenSem(true); setOpenPyq(false); }}
          >
            <NavButton
              label="Semesters"
              isOpen={openSem}
              isActive={isSemActive}
              onClick={() => { setOpenSem(v => !v); setOpenPyq(false); }}
            />
            <AnimatePresence>
              {openSem && (
                <motion.div {...dropdownMotion}
                  className="dropdown"
                  role="menu"
                  style={{ width: "320px" }}
                  onMouseLeave={() => setOpenSem(false)}
                  onKeyDown={(e) => handleDropdownKeyDown(e, [...(semRef.current?.querySelectorAll('[role="menuitem"]') || [])], () => setOpenSem(false))}
                >
                  <div className="grid grid-cols-2 gap-0.5">
                    {semesters.map((s, i) => (
                      <Link key={i} to={`/semester/${i + 1}`}
                        className={`dropdown-item ${location.pathname === `/semester/${i + 1}` ? "dropdown-item-active" : ""}`}
                        role="menuitem"
                        onClick={() => setOpenSem(false)}
                      >{s}</Link>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* PYQs dropdown */}
          <div className="relative" ref={pyqRef}
            onMouseEnter={() => { setOpenPyq(true); setOpenSem(false); }}
          >
            <NavButton
              label="PYQs"
              isOpen={openPyq}
              isActive={isPyqActive}
              onClick={() => { setOpenPyq(v => !v); setOpenSem(false); }}
            />
            <AnimatePresence>
              {openPyq && (
                <motion.div {...dropdownMotion}
                  className="dropdown"
                  role="menu"
                  style={{ width: "160px" }}
                  onMouseLeave={() => setOpenPyq(false)}
                  onKeyDown={(e) => handleDropdownKeyDown(e, [...(pyqRef.current?.querySelectorAll('[role="menuitem"]') || [])], () => setOpenPyq(false))}
                >
                  {pyqYears.map(y => (
                    <Link key={y} to={`/pyqs/${y}`}
                      className={`dropdown-item ${location.pathname === `/pyqs/${y}` ? "dropdown-item-active" : ""}`}
                      role="menuitem"
                      onClick={() => setOpenPyq(false)}
                    >{y}</Link>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <NavLink to="/about" label="About" current={location.pathname} />
          <NavLink to="/contact" label="Contact" current={location.pathname} />

          {/* Separator */}
          <div className="w-px h-5 mx-2" style={{ background: "var(--color-border)" }} />

          {/* Theme toggle — pill container */}
          <button
            onClick={toggleTheme}
            className="inline-flex items-center justify-center w-9 h-9 rounded-lg transition-all duration-200
              hover:bg-primary-100/60 dark:hover:bg-primary-900/30"
            style={{ color: "var(--color-text-secondary)" }}
            aria-label={dark ? "Switch to light mode" : "Switch to dark mode"}
          >
            <motion.span
              key={dark ? "sun" : "moon"}
              initial={{ rotate: -90, opacity: 0, scale: 0.8 }}
              animate={{ rotate: 0, opacity: 1, scale: 1 }}
              exit={{ rotate: 90, opacity: 0, scale: 0.8 }}
              transition={{ duration: 0.2 }}
              className="block"
            >
              {dark ? <IconSun size={18} /> : <IconMoon size={18} />}
            </motion.span>
          </button>

          {/* Admin CTA */}
          {isAdmin ? (
            <Link to="/admin/dashboard" className="btn-primary btn-sm ml-1.5">
              Dashboard
            </Link>
          ) : (
            <Link to="/admin/login" className="btn-primary btn-sm ml-1.5">
              Admin Login
            </Link>
          )}
        </div>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div {...mobileMenuMotion}
            className="md:hidden overflow-hidden border-t px-6"
            style={{ borderColor: "var(--color-border)" }}
          >
            <div className="flex flex-col gap-0.5 py-3">
              <MobileLink to="/" label="Home" active={location.pathname === "/"} />

              <button
                className="flex items-center justify-between py-2.5 px-3 rounded-lg text-body-sm font-medium transition-colors duration-200"
                style={{ color: isSemActive ? "var(--color-primary)" : "var(--color-text-secondary)" }}
                onClick={() => setOpenSem(!openSem)}
                aria-expanded={openSem}
              >
                Semesters
                <IconChevronDown size={15} className={`transition-transform duration-200 ${openSem ? "rotate-180" : ""}`} />
              </button>
              <AnimatePresence>
                {openSem && (
                  <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }} className="overflow-hidden pl-3 flex flex-col gap-0.5"
                  >
                    {semesters.map((s, i) => (
                      <MobileLink key={i} to={`/semester/${i + 1}`} label={s} small active={location.pathname === `/semester/${i + 1}`} />
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>

              <button
                className="flex items-center justify-between py-2.5 px-3 rounded-lg text-body-sm font-medium transition-colors duration-200"
                style={{ color: isPyqActive ? "var(--color-primary)" : "var(--color-text-secondary)" }}
                onClick={() => setOpenPyq(!openPyq)}
                aria-expanded={openPyq}
              >
                PYQs
                <IconChevronDown size={15} className={`transition-transform duration-200 ${openPyq ? "rotate-180" : ""}`} />
              </button>
              <AnimatePresence>
                {openPyq && (
                  <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }} className="overflow-hidden pl-3 flex flex-col gap-0.5"
                  >
                    {pyqYears.map(y => (
                      <MobileLink key={y} to={`/pyqs/${y}`} label={y} small active={location.pathname === `/pyqs/${y}`} />
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>

              <MobileLink to="/about" label="About" active={location.pathname === "/about"} />
              <MobileLink to="/contact" label="Contact" active={location.pathname === "/contact"} />

              <div className="divider my-2" />

              <div className="flex items-center gap-2 px-1">
                <button
                  onClick={toggleTheme}
                  className="btn-icon"
                  aria-label={dark ? "Switch to light mode" : "Switch to dark mode"}
                >
                  {dark ? <IconSun size={18} /> : <IconMoon size={18} />}
                </button>
                {isAdmin ? (
                  <Link to="/admin/dashboard" className="btn-primary btn-sm flex-1 text-center">
                    Dashboard
                  </Link>
                ) : (
                  <Link to="/admin/login" className="btn-primary btn-sm flex-1 text-center">
                    Admin Login
                  </Link>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}

/* Desktop Nav Link */
function NavLink({ to, label, current }) {
  const isActive = current === to;
  return (
    <Link
      to={to}
      className={`relative px-3 py-2 rounded-lg text-body-sm font-medium transition-colors duration-200
        ${isActive ? "nav-link-active" : "nav-link"}`}
      aria-current={isActive ? "page" : undefined}
    >
      {label}
      <span className={`absolute bottom-0 left-1/2 -translate-x-1/2 h-0.5 rounded-full
        bg-primary-600 dark:bg-primary-400
        transition-all duration-300 ${isActive ? "w-5" : "w-0 group-hover:w-3"}`} />
    </Link>
  );
}

/* Desktop dropdown button */
function NavButton({ label, isOpen, isActive, onClick }) {
  return (
    <button
      onClick={onClick}
      className={`px-3 py-2 rounded-lg text-body-sm font-medium transition-colors duration-200 flex items-center gap-1
        ${isActive ? "nav-link-active" : "nav-link"}`}
      aria-expanded={isOpen}
      aria-haspopup="true"
    >
      {label}
      <IconChevronDown
        size={14}
        className={`transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`}
      />
    </button>
  );
}

/* Mobile link */
function MobileLink({ to, label, small, active }) {
  return (
    <Link to={to}
      className={`py-2 px-3 rounded-lg transition-colors duration-200 text-body-sm
        ${active ? "text-primary-600 dark:text-primary-400 font-semibold bg-primary-50 dark:bg-primary-950/30" : ""}
        ${!active && small ? "text-subtle dark:text-subtle-dark" : ""}
        ${!active && !small ? "font-medium text-subtle dark:text-subtle-dark" : ""}
        hover:bg-primary-50/60 dark:hover:bg-primary-950/20`}
      aria-current={active ? "page" : undefined}
    >
      {label}
    </Link>
  );
}
