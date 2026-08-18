import { Link } from "react-router-dom";
import { useState, useEffect, useRef, useCallback } from "react";
import { motion } from "framer-motion";
import { fadeUp, staggerContainer } from "../animations/motion";
import {
  IconArrowRight,
  IconNotes,
  IconPYQ,
  IconBooks,
  IconShield,
  IconMoon,
  IconGrid,
  IconSemester,
  IconSubject,
  IconGraduation,
  IconCode,
} from "../components/icons";
import Logo from "../components/Logo";
import useDocTitle from "../hooks/useDocTitle";

/* ──────────────────────────────────────
   DATA — unchanged from original
   ────────────────────────────────────── */

/* Static landing page stats — intentional marketing values.
   These are not dynamically fetched for landing page performance. */
const stats = [
  { icon: IconSemester, value: "8", label: "Semesters", suffix: "" },
  { icon: IconSubject, value: "50", label: "Resources", suffix: "+" },
  { icon: IconPYQ, value: "5", label: "Years of PYQs", suffix: "+" },
  { icon: IconGraduation, value: "100", label: "Free Access", suffix: "%" },
];

const features = [
  { Icon: IconNotes, title: "Organized Notes", desc: "Semester-wise and subject-wise structured study materials." },
  { Icon: IconPYQ, title: "Previous Year Papers", desc: "Access PYQs organized by year for better exam preparation." },
  { Icon: IconBooks, title: "Books & References", desc: "Curated books, YouTube playlists, and documentation links." },
  { Icon: IconShield, title: "Admin Managed", desc: "Resources are managed by verified admins for quality control." },
  { Icon: IconMoon, title: "Dark Mode", desc: "Study comfortably in any lighting with theme support." },
  { Icon: IconGrid, title: "Mobile Friendly", desc: "Fully responsive design — access from any device, anywhere." },
];

const updates = [
  { title: "DBMS Notes Added", desc: "Semester IV – Complete DBMS handwritten notes are now available.", isNew: true },
  { title: "PYQs 2024 Uploaded", desc: "Latest Previous Year Question Papers for multiple subjects.", isNew: false },
  { title: "New Reference Links", desc: "Curated YouTube playlists and websites for DSA and OS.", isNew: false },
];


/* ──────────────────────────────────────
   ANIMATED COUNTER HOOK
   ────────────────────────────────────── */

function useCountUp(end, duration = 1800, shouldStart = false) {
  const [count, setCount] = useState(0);
  const frameRef = useRef(null);
  const startRef = useRef(null);

  useEffect(() => {
    if (!shouldStart) return;
    const numEnd = parseInt(end, 10);
    if (isNaN(numEnd)) { setCount(end); return; }

    const step = (timestamp) => {
      if (!startRef.current) startRef.current = timestamp;
      const progress = Math.min((timestamp - startRef.current) / duration, 1);
      // Ease-out cubic
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.floor(eased * numEnd));
      if (progress < 1) {
        frameRef.current = requestAnimationFrame(step);
      }
    };
    frameRef.current = requestAnimationFrame(step);

    return () => {
      if (frameRef.current) cancelAnimationFrame(frameRef.current);
    };
  }, [end, duration, shouldStart]);

  return count;
}

function StatValue({ value, suffix }) {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setInView(true); observer.disconnect(); } },
      { threshold: 0.3 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const count = useCountUp(value, 1600, inView);
  return <span ref={ref}>{count}{suffix}</span>;
}


/* ──────────────────────────────────────
   HERO ILLUSTRATION — Custom SVG
   Study desk scene using brand colors
   ────────────────────────────────────── */

function HeroIllustration() {
  return (
    <div className="hero-illustration relative w-full max-w-md mx-auto lg:max-w-none">
      <svg viewBox="0 0 480 400" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-auto">
        {/* Background glow circle */}
        <circle cx="240" cy="200" r="160" fill="url(#heroGlow)" opacity="0.5" />

        {/* Desk surface */}
        <rect x="60" y="280" width="360" height="12" rx="6" fill="var(--color-border)" opacity="0.6" />
        <ellipse cx="240" cy="290" rx="190" ry="8" fill="var(--color-border)" opacity="0.3" />

        {/* Laptop base */}
        <rect x="140" y="270" width="200" height="12" rx="3" fill="#4338ca" opacity="0.8" />

        {/* Laptop screen */}
        <rect x="150" y="140" width="180" height="130" rx="8" fill="#1a1a2e" />
        <rect x="156" y="146" width="168" height="118" rx="4" fill="#1c1a2e" />

        {/* Code lines on laptop */}
        <rect x="168" y="162" width="60" height="4" rx="2" fill="#6366f1" opacity="0.9" />
        <rect x="168" y="174" width="90" height="4" rx="2" fill="#a78bfa" opacity="0.6" />
        <rect x="168" y="186" width="45" height="4" rx="2" fill="#818cf8" opacity="0.7" />
        <rect x="220" y="186" width="55" height="4" rx="2" fill="#c084fc" opacity="0.5" />
        <rect x="168" y="198" width="75" height="4" rx="2" fill="#6366f1" opacity="0.6" />
        <rect x="168" y="210" width="40" height="4" rx="2" fill="#a78bfa" opacity="0.5" />
        <rect x="215" y="210" width="65" height="4" rx="2" fill="#818cf8" opacity="0.4" />
        <rect x="168" y="222" width="100" height="4" rx="2" fill="#4f46e5" opacity="0.5" />
        <rect x="168" y="234" width="50" height="4" rx="2" fill="#c084fc" opacity="0.4" />

        {/* Code brackets </> on screen */}
        <text x="290" y="200" fontFamily="monospace" fontSize="28" fontWeight="bold" fill="#6366f1" opacity="0.3">&lt;/&gt;</text>

        {/* Stack of books — left side */}
        <g transform="translate(70, 220)">
          {/* Book 1 — bottom */}
          <rect x="0" y="32" width="60" height="14" rx="2" fill="#4f46e5" />
          <rect x="2" y="34" width="4" height="10" rx="1" fill="#3730a3" />
          {/* Book 2 — middle */}
          <rect x="-4" y="18" width="64" height="14" rx="2" fill="#7c3aed" />
          <rect x="-2" y="20" width="4" height="10" rx="1" fill="#6d28d9" />
          {/* Book 3 — top */}
          <rect x="2" y="4" width="56" height="14" rx="2" fill="#a78bfa" />
          <rect x="4" y="6" width="4" height="10" rx="1" fill="#8b5cf6" />
        </g>

        {/* Graduation cap — floating above */}
        <g transform="translate(230, 90)">
          {/* Cap board */}
          <polygon points="0,20 40,8 80,20 40,32" fill="#4f46e5" />
          {/* Cap top */}
          <polygon points="20,20 40,12 60,20 40,28" fill="#4338ca" />
          {/* Tassel line */}
          <line x1="60" y1="20" x2="70" y2="35" stroke="#fbbf24" strokeWidth="2" strokeLinecap="round" />
          {/* Tassel end */}
          <circle cx="70" cy="37" r="3" fill="#fbbf24" />
        </g>

        {/* Floating document — right side */}
        <g transform="translate(365, 160)">
          <rect x="0" y="0" width="50" height="65" rx="4" fill="var(--color-surface)" stroke="var(--color-border)" strokeWidth="1.5" />
          {/* Document lines */}
          <rect x="8" y="12" width="34" height="3" rx="1.5" fill="var(--color-primary)" opacity="0.3" />
          <rect x="8" y="20" width="28" height="3" rx="1.5" fill="var(--color-primary)" opacity="0.2" />
          <rect x="8" y="28" width="32" height="3" rx="1.5" fill="var(--color-primary)" opacity="0.15" />
          <rect x="8" y="36" width="20" height="3" rx="1.5" fill="var(--color-primary)" opacity="0.1" />
          {/* PDF badge */}
          <rect x="26" y="46" width="18" height="12" rx="2" fill="#ef4444" opacity="0.9" />
          <text x="29" y="55" fontFamily="system-ui" fontSize="7" fontWeight="bold" fill="white">PDF</text>
        </g>

        {/* Floating atoms / decorative circles */}
        <circle cx="90" cy="150" r="6" fill="#a78bfa" opacity="0.3" />
        <circle cx="400" cy="130" r="4" fill="#6366f1" opacity="0.4" />
        <circle cx="380" cy="260" r="5" fill="#fbbf24" opacity="0.3" />
        <circle cx="110" cy="290" r="3" fill="#818cf8" opacity="0.4" />

        {/* Small floating plus signs */}
        <g transform="translate(100, 120)" opacity="0.25">
          <line x1="0" y1="5" x2="10" y2="5" stroke="#6366f1" strokeWidth="2" strokeLinecap="round" />
          <line x1="5" y1="0" x2="5" y2="10" stroke="#6366f1" strokeWidth="2" strokeLinecap="round" />
        </g>
        <g transform="translate(390, 100)" opacity="0.2">
          <line x1="0" y1="5" x2="10" y2="5" stroke="#a78bfa" strokeWidth="2" strokeLinecap="round" />
          <line x1="5" y1="0" x2="5" y2="10" stroke="#a78bfa" strokeWidth="2" strokeLinecap="round" />
        </g>

        {/* Small diamond shapes */}
        <rect x="370" y="170" width="8" height="8" rx="1" transform="rotate(45 374 174)" fill="#c084fc" opacity="0.25" />
        <rect x="80" y="180" width="6" height="6" rx="1" transform="rotate(45 83 183)" fill="#4f46e5" opacity="0.2" />

        {/* Gradients */}
        <defs>
          <radialGradient id="heroGlow" cx="0.5" cy="0.5" r="0.5">
            <stop offset="0%" stopColor="#6366f1" stopOpacity="0.12" />
            <stop offset="100%" stopColor="#6366f1" stopOpacity="0" />
          </radialGradient>
        </defs>
      </svg>
    </div>
  );
}


/* ──────────────────────────────────────
   HOME PAGE COMPONENT
   ────────────────────────────────────── */

export default function Home() {
  useDocTitle(""); /* Home uses base title */
  return (
    <div className="min-h-screen">
      {/* ── Hero Section ── */}
      <section
        className="relative overflow-hidden"
        style={{ background: "var(--color-surface-raised)" }}
      >
        {/* Background effects */}
        <div className="hero-glow hero-glow-1" />
        <div className="hero-glow hero-glow-2" />
        <div className="hero-grid" />

        <div className="relative max-w-content mx-auto px-6 py-20 md:py-28 lg:py-32">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            {/* Left — Text content */}
            <div className="order-2 lg:order-1">
              <motion.div
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                <span className="badge badge-primary mb-5 inline-flex">
                  CSE Knowledge Hub
                </span>
              </motion.div>

              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.08 }}
                className="text-h1 md:text-display leading-tight text-heading dark:text-heading-dark mb-5"
              >
                Your One Stop{" "}
                <br className="hidden sm:block" />
                Resource Hub for{" "}
                <span className="gradient-text">CSE Students</span>
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.45, delay: 0.16 }}
                className="text-body md:text-h4 text-subtle dark:text-subtle-dark leading-relaxed font-normal mb-8"
                style={{ maxWidth: "480px" }}
              >
                Access semester-wise notes, previous year questions, books, and curated
                reference materials — all in one place.
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.24, duration: 0.4 }}
                className="flex flex-col sm:flex-row gap-3"
              >
                <Link to="/semester" className="btn-primary btn-lg gap-2">
                  Explore Semesters <IconArrowRight size={18} />
                </Link>
                <Link to="/pyqs" className="btn-secondary btn-lg">
                  View PYQs
                </Link>
              </motion.div>
            </div>

            {/* Right — Illustration */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="order-1 lg:order-2"
            >
              <HeroIllustration />
            </motion.div>
          </div>
        </div>
      </section>


      {/* ── Stats Section ── */}
      <section
        className="py-16 md:py-20 px-6"
        style={{ background: "var(--color-surface)" }}
      >
        <div className="section-soft-divider mb-16 md:mb-20 max-w-content mx-auto" />

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="max-w-content mx-auto grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6"
        >
          {stats.map((s, i) => (
            <motion.div key={i} variants={fadeUp} className="stat-card">
              <div className="stat-icon">
                <s.icon size={22} />
              </div>
              <div className="text-h1 md:text-display font-bold gradient-text mb-1">
                <StatValue value={s.value} suffix={s.suffix} />
              </div>
              <div className="text-caption uppercase tracking-wider text-subtle dark:text-subtle-dark">
                {s.label}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </section>


      {/* ── Features Section ── */}
      <section
        className="py-20 md:py-24 px-6"
        style={{ background: "var(--color-surface-raised)" }}
      >
        <div className="max-w-content mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4 }}
          >
            <h2 className="section-title">Why CSEducation?</h2>
            <p className="section-subtitle mb-14">
              Everything a CSE student needs, organized and accessible in one place.
            </p>
          </motion.div>

          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6"
          >
            {features.map((f, i) => (
              <motion.div
                key={i}
                variants={fadeUp}
                className="card card-accent group cursor-default"
              >
                <div className="icon-container icon-container-lg mb-5 transition-transform duration-300 group-hover:scale-105">
                  <f.Icon size={24} />
                </div>
                <h3 className="text-h4 text-heading dark:text-heading-dark mb-2">
                  {f.title}
                </h3>
                <p className="text-body-sm text-subtle dark:text-subtle-dark leading-relaxed">
                  {f.desc}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>


      {/* ── Latest Updates ── */}
      <section
        className="py-20 md:py-24 px-6"
        style={{ background: "var(--color-surface)" }}
      >
        <div className="max-w-content mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4 }}
          >
            <h2 className="section-title">Latest Updates</h2>
            <p className="section-subtitle mb-14">What's new on the platform</p>
          </motion.div>

          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            className="grid grid-cols-1 md:grid-cols-3 gap-5 md:gap-6"
          >
            {updates.map((item, i) => (
              <motion.div
                key={i}
                variants={fadeUp}
                className="card-bordered group transition-all duration-300 hover:shadow-card-hover hover:-translate-y-0.5"
              >
                <div className="flex items-start justify-between gap-3 mb-3">
                  <h3 className="text-h4 text-heading dark:text-heading-dark">
                    {item.title}
                  </h3>
                  {item.isNew && (
                    <span className="badge badge-new flex-shrink-0">New</span>
                  )}
                </div>
                <p className="text-body-sm text-subtle dark:text-subtle-dark leading-relaxed">
                  {item.desc}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>


      {/* ── CTA Section ── */}
      <section
        className="relative py-24 md:py-28 px-6 overflow-hidden"
        style={{ background: "var(--color-surface-raised)" }}
      >
        <div className="cta-glow" />

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.45 }}
          className="relative max-w-narrow mx-auto text-center"
        >
          <div className="flex justify-center mb-6">
            <Logo variant="icon" size="lg" />
          </div>

          <h2 className="text-h2 md:text-h1 text-heading dark:text-heading-dark mb-5">
            Ready to Start Learning?
          </h2>
          <p className="text-body text-subtle dark:text-subtle-dark mb-8 max-w-md mx-auto leading-relaxed">
            Jump right into semesters, explore subjects, and access all the resources you need.
          </p>
          <Link to="/semester" className="btn-primary btn-lg gap-2">
            Get Started <IconArrowRight size={18} />
          </Link>
        </motion.div>
      </section>
    </div>
  );
}
