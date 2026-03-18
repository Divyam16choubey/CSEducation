import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const quickLinks = [
    { to: "/", label: "Home" },
    { to: "/semester", label: "Semesters" },
    { to: "/pyqs", label: "PYQs" },
    { to: "/about", label: "About" },
];

const resourceLinks = [
    { to: "/semester/1", label: "Semester 1" },
    { to: "/semester/2", label: "Semester 2" },
    { to: "/semester/3", label: "Semester 3" },
    { to: "/semester/4", label: "Semester 4" },
];

const socialLinks = [
    { icon: "📧", label: "Email", href: "mailto:cse2023nitmn@gmail.com" },
    { icon: "💬", label: "Feedback", to: "/contact" },
];

export default function Footer() {
    const year = new Date().getFullYear();

    return (
        <footer className="relative transition-colors duration-500
                        bg-gradient-to-b from-gray-50 to-gray-100 text-gray-600
                        dark:from-slate-900 dark:to-black dark:text-gray-400
                        border-t border-gray-200/60 dark:border-white/5">
            {/* ── Gradient accent line ── */}
            <div className="h-px bg-gradient-to-r from-transparent via-blue-500/40 to-transparent
                       dark:via-blue-500/30" />

            <div className="max-w-7xl mx-auto px-6 py-14">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-10">

                    {/* ── Brand Column ── */}
                    <div className="md:col-span-1">
                        <motion.div
                            className="flex items-center gap-2.5 mb-4"
                            whileHover={{ x: 2 }}
                            transition={{ type: "spring", stiffness: 300, damping: 20 }}
                        >
                            <span className="text-2xl">🎓</span>
                            <span className="text-xl font-bold gradient-text">CSEducation</span>
                        </motion.div>
                        <p className="text-sm leading-relaxed text-gray-500 dark:text-gray-400">
                            Your centralized academic portal for CSE students — notes, PYQs, books,
                            and curated resources organized for success.
                        </p>
                    </div>

                    {/* ── Quick Links ── */}
                    <div>
                        <h4 className="font-semibold mb-4 text-sm uppercase tracking-wider
                           text-gray-800 dark:text-white">
                            Quick Links
                        </h4>
                        <ul className="space-y-2.5 text-sm">
                            {quickLinks.map(({ to, label }) => (
                                <li key={to}>
                                    <FooterLink to={to}>{label}</FooterLink>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* ── Resources ── */}
                    <div>
                        <h4 className="font-semibold mb-4 text-sm uppercase tracking-wider
                           text-gray-800 dark:text-white">
                            Resources
                        </h4>
                        <ul className="space-y-2.5 text-sm">
                            {resourceLinks.map(({ to, label }) => (
                                <li key={to}>
                                    <FooterLink to={to}>{label}</FooterLink>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* ── Contact ── */}
                    <div>
                        <h4 className="font-semibold mb-4 text-sm uppercase tracking-wider
                           text-gray-800 dark:text-white">
                            Contact
                        </h4>
                        <ul className="space-y-2.5 text-sm">
                            {socialLinks.map(({ icon, label, href, to }) => (
                                <li key={label}>
                                    {href ? (
                                        <a
                                            href={href}
                                            className="group inline-flex items-center gap-2 transition-colors duration-300
                                 text-gray-500 dark:text-gray-400
                                 hover:text-blue-600 dark:hover:text-white"
                                        >
                                            <motion.span whileHover={{ scale: 1.2 }} className="text-base">
                                                {icon}
                                            </motion.span>
                                            <span className="relative">
                                                {label === "Email" ? "cse2023nitmn@gmail.com" : label}
                                                <span className="absolute -bottom-0.5 left-0 w-0 h-px
                                         bg-gradient-to-r from-blue-500 to-indigo-500
                                         group-hover:w-full transition-all duration-300" />
                                            </span>
                                        </a>
                                    ) : (
                                        <Link
                                            to={to}
                                            className="group inline-flex items-center gap-2 transition-colors duration-300
                                 text-gray-500 dark:text-gray-400
                                 hover:text-blue-600 dark:hover:text-white"
                                        >
                                            <motion.span whileHover={{ scale: 1.2 }} className="text-base">
                                                {icon}
                                            </motion.span>
                                            <span className="relative">
                                                Send Feedback
                                                <span className="absolute -bottom-0.5 left-0 w-0 h-px
                                         bg-gradient-to-r from-blue-500 to-indigo-500
                                         group-hover:w-full transition-all duration-300" />
                                            </span>
                                        </Link>
                                    )}
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>

                {/* ── Bottom bar ── */}
                <div className="mt-12 pt-6
                        border-t border-gray-200/60 dark:border-white/10
                        flex flex-col sm:flex-row justify-between items-center gap-4
                        text-xs text-gray-400 dark:text-gray-500">
                    <p>© {year} CSEducation — Built with ❤️ for CSE Students</p>
                    <p className="text-gray-400/60 dark:text-gray-600">MERN Stack Major Project</p>
                </div>
            </div>
        </footer>
    );
}

// ── Reusable footer link with hover gradient underline ──
function FooterLink({ to, children }) {
    return (
        <Link
            to={to}
            className="group relative inline-block transition-colors duration-300
                 text-gray-500 dark:text-gray-400
                 hover:text-blue-600 dark:hover:text-white"
        >
            {children}
            <span className="absolute -bottom-0.5 left-0 w-0 h-px
                       bg-gradient-to-r from-blue-500 to-indigo-500
                       group-hover:w-full transition-all duration-300" />
        </Link>
    );
}
