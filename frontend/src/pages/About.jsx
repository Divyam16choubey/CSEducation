import { motion } from "framer-motion";
import { fadeUp, staggerContainer } from "../animations/motion";
import { IconCode, IconNotes, IconBooks, IconShield, IconGlobe, IconClock, IconArrowRight, IconLink } from "../components/icons";

const techStack = [
  { Icon: IconCode, name: "React", desc: "Component-based UI library" },
  { Icon: IconNotes, name: "Tailwind CSS", desc: "Utility-first styling" },
  { Icon: IconGlobe, name: "Node.js", desc: "JavaScript runtime" },
  { Icon: IconLink, name: "Express.js", desc: "Backend framework" },
  { Icon: IconBooks, name: "MongoDB", desc: "NoSQL database" },
  { Icon: IconShield, name: "JWT", desc: "Secure authentication" },
];

const objectives = [
  "Provide centralized access to semester-wise study materials",
  "Organize PYQs, notes, books, and references in one platform",
  "Enable admin-managed content for quality control",
  "Create a responsive, accessible, and modern user experience",
  "Build a scalable full-stack MERN application",
];

export default function About() {
  return (
    <div className="min-h-screen" style={{ background: "var(--color-background)" }}>
      {/* Hero */}
      <section className="py-20 px-6" style={{ background: "var(--color-surface-raised)" }}>
        <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }} className="max-w-narrow mx-auto text-center"
        >
          <span className="badge badge-primary mb-6 inline-flex">
            About the Project
          </span>
          <h1 className="text-h1 md:text-display text-heading dark:text-heading-dark mb-6">
            About <span className="gradient-text">CSEducation</span>
          </h1>
          <p className="text-body text-subtle dark:text-subtle-dark leading-relaxed max-w-3xl mx-auto">
            A Major Project built to solve a real problem faced by Computer Science students —
            scattered study materials across WhatsApp groups, Google Drive folders, and personal collections.
          </p>
        </motion.div>
      </section>

      {/* Problem Statement */}
      <section className="py-20 px-6">
        <div className="max-w-content mx-auto">
          <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }} transition={{ duration: 0.4 }}
          >
            <h2 className="section-title mb-4">Problem Statement</h2>
            <p className="section-subtitle mb-10">The challenge that inspired this project</p>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }} transition={{ delay: 0.15, duration: 0.4 }}
            className="card-static max-w-narrow mx-auto"
          >
            <p className="text-body text-subtle dark:text-subtle-dark leading-relaxed">
              CSE students often struggle to find organized study materials. Notes are shared in
              WhatsApp groups that get buried, PYQs are scattered across Google Drives, and
              reference links are lost in browser bookmarks. There is no single, reliable source
              for all academic resources. <strong className="text-heading dark:text-heading-dark">CSEducation</strong> solves this by providing a
              centralized, well-organized, and always-accessible academic portal.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Objectives */}
      <section className="py-20 px-6" style={{ background: "var(--color-surface)" }}>
        <div className="max-w-content mx-auto">
          <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }} transition={{ duration: 0.4 }}
          >
            <h2 className="section-title mb-4">Objectives</h2>
            <p className="section-subtitle mb-12">What this project aims to achieve</p>
          </motion.div>

          <motion.div variants={staggerContainer} initial="hidden" whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            className="max-w-narrow mx-auto space-y-4"
          >
            {objectives.map((obj, i) => (
              <motion.div key={i} variants={fadeUp}
                className="flex items-start gap-4 p-4 card-static"
              >
                <span className="flex-shrink-0 w-8 h-8 rounded-lg bg-primary-600
                  text-white font-bold text-caption flex items-center justify-center">
                  {i + 1}
                </span>
                <p className="text-body text-subtle dark:text-subtle-dark">{obj}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Technology Stack */}
      <section className="py-20 px-6" style={{ background: "var(--color-surface-raised)" }}>
        <div className="max-w-content mx-auto">
          <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }} transition={{ duration: 0.4 }}
          >
            <h2 className="section-title mb-4">Technology Stack</h2>
            <p className="section-subtitle mb-12">Built with modern, industry-standard technologies</p>
          </motion.div>

          <motion.div variants={staggerContainer} initial="hidden" whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            className="grid grid-cols-2 md:grid-cols-3 gap-6 max-w-narrow mx-auto"
          >
            {techStack.map((tech, i) => (
              <motion.div key={i} variants={fadeUp} className="card text-center">
                <div className="icon-container mx-auto mb-3">
                  <tech.Icon size={22} />
                </div>
                <h3 className="text-h4 text-heading dark:text-heading-dark mb-1">{tech.name}</h3>
                <p className="text-body-sm text-subtle dark:text-subtle-dark">{tech.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* How It Helps */}
      <section className="py-20 px-6" style={{ background: "var(--color-surface)" }}>
        <div className="max-w-content mx-auto">
          <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }} transition={{ duration: 0.4 }}
          >
            <h2 className="section-title mb-4">How It Helps Students</h2>
            <p className="section-subtitle mb-12">Real impact on academic preparation</p>
          </motion.div>

          <motion.div variants={staggerContainer} initial="hidden" whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-narrow mx-auto"
          >
            {[
              { Icon: IconClock, title: "Saves Time", desc: "No more searching through multiple groups and drives." },
              { Icon: IconNotes, title: "Better Preparation", desc: "Organized PYQs and notes for focused exam prep." },
              { Icon: IconGlobe, title: "Anytime Access", desc: "Access from any device, any browser, anywhere." },
            ].map((item, i) => (
              <motion.div key={i} variants={fadeUp} className="card card-accent text-center">
                <div className="icon-container mx-auto mb-3">
                  <item.Icon size={22} />
                </div>
                <h3 className="text-h4 text-heading dark:text-heading-dark mb-2">{item.title}</h3>
                <p className="text-body-sm text-subtle dark:text-subtle-dark">{item.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Vision */}
      <section className="py-20 px-6" style={{ background: "var(--color-surface-raised)" }}>
        <div className="max-w-narrow mx-auto">
          <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }} transition={{ duration: 0.4 }}
          >
            <h2 className="section-title mb-4">Vision & Future Scope</h2>
            <p className="section-subtitle mb-12">Where CSEducation is heading</p>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }} transition={{ delay: 0.15, duration: 0.4 }}
            className="card-static"
          >
            <div className="space-y-4 text-body text-subtle dark:text-subtle-dark leading-relaxed">
              <p>
                CSEducation envisions becoming the go-to academic resource platform for all
                Computer Science students, expandable to other departments and universities.
              </p>
              <p className="font-semibold text-heading dark:text-heading-dark">Future enhancements include:</p>
              <ul className="space-y-2 ml-4">
                {[
                  "Multi-department support beyond CSE",
                  "Student accounts with personalized dashboards",
                  "Discussion forums and peer collaboration tools",
                  "AI-powered resource recommendations",
                  "Mobile application (React Native)",
                  "Analytics dashboard for admins",
                ].map((item, i) => (
                  <li key={i} className="flex items-center gap-2.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-primary-600 dark:bg-primary-400 flex-shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
