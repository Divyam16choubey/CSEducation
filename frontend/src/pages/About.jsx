import { motion } from "framer-motion";
import { fadeUp, staggerContainer } from "../animations/motion";

const techStack = [
  { icon: "⚛️", name: "React", desc: "Component-based UI library" },
  { icon: "🎨", name: "Tailwind CSS", desc: "Utility-first styling" },
  { icon: "🟢", name: "Node.js", desc: "JavaScript runtime" },
  { icon: "🚂", name: "Express.js", desc: "Backend framework" },
  { icon: "🍃", name: "MongoDB", desc: "NoSQL database" },
  { icon: "🔐", name: "JWT", desc: "Secure authentication" },
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
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors">
      {/* Hero */}
      <section className="gradient-bg py-20 px-6">
        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }} className="max-w-4xl mx-auto text-center"
        >
          <span className="inline-block px-4 py-1.5 rounded-full text-sm font-medium
                           bg-blue-500/10 dark:bg-blue-500/20 text-blue-700 dark:text-blue-300
                           border border-blue-500/20 mb-6">
            About the Project
          </span>
          <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 dark:text-white mb-6">
            About <span className="gradient-text">CSEducation</span>
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-400 leading-relaxed max-w-3xl mx-auto">
            A Major Project built to solve a real problem faced by Computer Science students —
            scattered study materials across WhatsApp groups, Google Drive folders, and personal collections.
          </p>
        </motion.div>
      </section>

      {/* Problem Statement */}
      <section className="py-20 px-6">
        <div className="max-w-5xl mx-auto">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }} transition={{ duration: 0.5 }}
          >
            <h2 className="section-title mb-4">Problem Statement</h2>
            <p className="section-subtitle mb-10">The challenge that inspired this project</p>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }} transition={{ delay: 0.2, duration: 0.5 }}
            className="card max-w-3xl mx-auto"
          >
            <p className="text-gray-700 dark:text-gray-300 text-lg leading-relaxed">
              CSE students often struggle to find organized study materials. Notes are shared in
              WhatsApp groups that get buried, PYQs are scattered across Google Drives, and
              reference links are lost in browser bookmarks. There is no single, reliable source
              for all academic resources. <strong>CSEducation</strong> solves this by providing a
              centralized, well-organized, and always-accessible academic portal.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Objectives */}
      <section className="py-20 px-6 bg-white dark:bg-gray-950">
        <div className="max-w-5xl mx-auto">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }} transition={{ duration: 0.5 }}
          >
            <h2 className="section-title mb-4">Objectives</h2>
            <p className="section-subtitle mb-12">What this project aims to achieve</p>
          </motion.div>

          <motion.div variants={staggerContainer} initial="hidden" whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            className="max-w-3xl mx-auto space-y-4"
          >
            {objectives.map((obj, i) => (
              <motion.div key={i} variants={fadeUp}
                className="flex items-start gap-4 p-4 rounded-xl bg-gray-50 dark:bg-gray-800/50
                           border border-gray-100 dark:border-gray-700/50"
              >
                <span className="flex-shrink-0 w-8 h-8 rounded-lg bg-gradient-to-br from-blue-500 to-indigo-600
                                 text-white font-bold text-sm flex items-center justify-center">
                  {i + 1}
                </span>
                <p className="text-gray-700 dark:text-gray-300">{obj}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Technology Stack */}
      <section className="py-20 px-6 bg-gray-50 dark:bg-gray-900">
        <div className="max-w-5xl mx-auto">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }} transition={{ duration: 0.5 }}
          >
            <h2 className="section-title mb-4">Technology Stack</h2>
            <p className="section-subtitle mb-12">Built with modern, industry-standard technologies</p>
          </motion.div>

          <motion.div variants={staggerContainer} initial="hidden" whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            className="grid grid-cols-2 md:grid-cols-3 gap-6 max-w-4xl mx-auto"
          >
            {techStack.map((tech, i) => (
              <motion.div key={i} variants={fadeUp}
                className="card text-center"
              >
                <div className="text-3xl mb-3">{tech.icon}</div>
                <h3 className="font-semibold text-gray-900 dark:text-white mb-1">{tech.name}</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400">{tech.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* How It Helps */}
      <section className="py-20 px-6 bg-white dark:bg-gray-950">
        <div className="max-w-5xl mx-auto">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }} transition={{ duration: 0.5 }}
          >
            <h2 className="section-title mb-4">How It Helps Students</h2>
            <p className="section-subtitle mb-12">Real impact on academic preparation</p>
          </motion.div>

          <motion.div variants={staggerContainer} initial="hidden" whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto"
          >
            {[
              { icon: "⏱️", title: "Saves Time", desc: "No more searching through multiple groups and drives." },
              { icon: "📊", title: "Better Preparation", desc: "Organized PYQs and notes for focused exam prep." },
              { icon: "🌐", title: "Anytime Access", desc: "Access from any device, any browser, anywhere." },
            ].map((item, i) => (
              <motion.div key={i} variants={fadeUp} className="card card-accent text-center">
                <div className="text-3xl mb-3">{item.icon}</div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">{item.title}</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">{item.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Vision & Future Scope */}
      <section className="py-20 px-6 gradient-bg">
        <div className="max-w-4xl mx-auto">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }} transition={{ duration: 0.5 }}
          >
            <h2 className="section-title mb-4">Vision & Future Scope</h2>
            <p className="section-subtitle mb-12">Where CSEducation is heading</p>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }} transition={{ delay: 0.2, duration: 0.5 }}
            className="card"
          >
            <div className="space-y-4 text-gray-700 dark:text-gray-300 leading-relaxed">
              <p>
                CSEducation envisions becoming the go-to academic resource platform for all
                Computer Science students, expandable to other departments and universities.
              </p>
              <p className="font-semibold text-gray-900 dark:text-white">Future enhancements include:</p>
              <ul className="space-y-2 ml-4">
                {[
                  "Multi-department support beyond CSE",
                  "Student accounts with personalized dashboards",
                  "Discussion forums and peer collaboration tools",
                  "AI-powered resource recommendations",
                  "Mobile application (React Native)",
                  "Analytics dashboard for admins",
                ].map((item, i) => (
                  <li key={i} className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-gradient-to-r from-blue-500 to-indigo-600 flex-shrink-0" />
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
