import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { fadeUp, staggerContainer } from "../animations/motion";

const stats = [
  { value: "8", label: "Semesters" },
  { value: "50+", label: "Resources" },
  { value: "5+", label: "Years of PYQs" },
  { value: "100%", label: "Free Access" },
];

const features = [
  { icon: "📚", title: "Organized Notes", desc: "Semester-wise and subject-wise structured study materials." },
  { icon: "📄", title: "Previous Year Papers", desc: "Access PYQs organized by year for better exam preparation." },
  { icon: "📖", title: "Books & References", desc: "Curated books, YouTube playlists, and documentation links." },
  { icon: "🔒", title: "Admin Managed", desc: "Resources are managed by verified admins for quality control." },
  { icon: "🌙", title: "Dark Mode", desc: "Study comfortably in any lighting with theme support." },
  { icon: "📱", title: "Mobile Friendly", desc: "Fully responsive design — access from any device, anywhere." },
];

const updates = [
  { title: "DBMS Notes Added", desc: "Semester IV – Complete DBMS handwritten notes are now available." },
  { title: "PYQs 2024 Uploaded", desc: "Latest Previous Year Question Papers for multiple subjects." },
  { title: "New Reference Links", desc: "Curated YouTube playlists and websites for DSA and OS." },
];

export default function Home() {
  return (
    <div className="min-h-screen">
      {/* ── Hero Section ── */}
      <section className="relative overflow-hidden gradient-bg">
        {/* Floating decorative blobs */}
        <div className="absolute top-20 left-10 w-72 h-72 bg-blue-400/20 dark:bg-blue-500/10 rounded-full blur-3xl" />
        <div className="absolute bottom-10 right-10 w-96 h-96 bg-indigo-400/20 dark:bg-indigo-500/10 rounded-full blur-3xl" />

        <div className="relative max-w-6xl mx-auto px-6 py-28 md:py-36 text-center">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <span className="inline-block px-4 py-1.5 rounded-full text-sm font-medium
                             bg-blue-500/10 dark:bg-blue-500/20 text-blue-700 dark:text-blue-300
                             border border-blue-500/20 mb-6">
              🎓 CSE Knowledge Hub
            </span>

            <h1 className="text-4xl md:text-6xl lg:text-7xl font-extrabold mb-6 leading-[1.1] tracking-tight text-gray-900 dark:text-white">
              Your Academic{" "}
              <span className="gradient-text">Resource Portal</span>
            </h1>

            <p className="text-lg md:text-xl lg:text-2xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto mb-12 leading-relaxed">
              Access semester-wise notes, previous year questions, books, and curated
              reference materials — all in one centralized platform built for CSE students.
            </p>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.5 }}
            className="flex flex-col sm:flex-row gap-5 justify-center items-center"
          >
            <motion.div whileHover={{ scale: 1.04, y: -2 }} whileTap={{ scale: 0.98 }}
              transition={{ type: "spring", stiffness: 400, damping: 17 }}
            >
              <Link to="/semester"
                className="btn-primary px-10 py-4 rounded-2xl text-lg">
                Explore Semesters →
              </Link>
            </motion.div>
            <motion.div whileHover={{ scale: 1.04, y: -2 }} whileTap={{ scale: 0.98 }}
              transition={{ type: "spring", stiffness: 400, damping: 17 }}
            >
              <Link to="/pyqs"
                className="btn-secondary px-10 py-4 rounded-2xl text-lg">
                View PYQs
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ── Stats Section ── */}
      <section className="py-16 px-6 bg-white dark:bg-gray-950 border-y border-gray-100 dark:border-gray-800">
        <motion.div variants={staggerContainer} initial="hidden" whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="max-w-5xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8 text-center"
        >
          {stats.map((s, i) => (
            <motion.div key={i} variants={fadeUp}>
              <div className="text-4xl md:text-5xl font-extrabold gradient-text mb-2">{s.value}</div>
              <div className="text-sm text-gray-500 dark:text-gray-400 font-medium uppercase tracking-wider">{s.label}</div>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* ── Features Section ── */}
      <section className="py-20 px-6 bg-gray-50 dark:bg-gray-900">
        <div className="max-w-6xl mx-auto">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }} transition={{ duration: 0.5 }}
          >
            <h2 className="section-title">Why CSEducation?</h2>
            <p className="section-subtitle mb-14">
              Everything a CSE student needs, organized and accessible in one place.
            </p>
          </motion.div>

          <motion.div variants={staggerContainer} initial="hidden" whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {features.map((f, i) => (
              <motion.div key={i} variants={fadeUp}
                className="card card-accent text-gray-800 dark:text-gray-200"
              >
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500/10 to-indigo-500/10
                                dark:from-blue-500/20 dark:to-indigo-500/20
                                flex items-center justify-center text-2xl mb-4">
                  {f.icon}
                </div>
                <h3 className="text-xl font-semibold mb-2">{f.title}</h3>
                <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed">{f.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── Latest Updates ── */}
      <section className="py-20 px-6 bg-white dark:bg-gray-950">
        <div className="max-w-7xl mx-auto">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }} transition={{ duration: 0.5 }}
          >
            <h2 className="section-title">Latest Updates</h2>
            <p className="section-subtitle mb-14">What's new on the platform</p>
          </motion.div>

          <motion.div variants={staggerContainer} initial="hidden" whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            className="grid grid-cols-1 md:grid-cols-3 gap-8"
          >
            {updates.map((item, i) => (
              <motion.div key={i} variants={fadeUp}
                className="card card-accent text-gray-800 dark:text-gray-200"
              >
                <h3 className="text-xl font-semibold mb-3">{item.title}</h3>
                <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed">{item.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── CTA Section ── */}
      <section className="relative overflow-hidden gradient-bg py-24 px-6">
        <div className="absolute top-0 right-0 w-80 h-80 bg-purple-400/20 dark:bg-purple-500/10 rounded-full blur-3xl" />
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }} transition={{ duration: 0.5 }}
          className="relative max-w-3xl mx-auto text-center"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-6">
            Ready to Start Learning?
          </h2>
          <p className="text-gray-600 dark:text-gray-400 text-lg mb-8">
            Jump right into semesters, explore subjects, and access all the resources you need.
          </p>
          <motion.div whileHover={{ scale: 1.04, y: -2 }} whileTap={{ scale: 0.98 }}
            transition={{ type: "spring", stiffness: 400, damping: 17 }}
            className="inline-block"
          >
            <Link to="/semester"
              className="btn-primary px-10 py-4 rounded-2xl text-lg">
              Get Started →
            </Link>
          </motion.div>
        </motion.div>
      </section>
    </div>
  );
}
