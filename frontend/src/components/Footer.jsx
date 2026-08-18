import { Link } from "react-router-dom";
import Logo from "./Logo";
import { IconMail, IconMessageCircle, IconGlobe, IconArrowRight } from "./icons";

const quickLinks = [
  { to: "/", label: "Home" },
  { to: "/semester", label: "Semesters" },
  { to: "/pyqs", label: "PYQs" },
  { to: "/about", label: "About" },
  { to: "/contact", label: "Contact" },
];

const resourceLinks = [
  { to: "/semester/1", label: "Semester 1" },
  { to: "/semester/2", label: "Semester 2" },
  { to: "/semester/3", label: "Semester 3" },
  { to: "/semester/4", label: "Semester 4" },
];

const connectLinks = [
  { Icon: IconGlobe, label: "GitHub", href: "https://github.com/Divyam16choubey/CSEducation", display: "GitHub" },
  { Icon: IconMail, label: "Email", href: "mailto:cse2023nitmn@gmail.com", display: "Email" },
  { Icon: IconMessageCircle, label: "Feedback", to: "/contact", display: "Send Feedback" },
];

export default function Footer() {
  const year = new Date().getFullYear();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer
      className="relative transition-colors duration-300"
      style={{
        background: "var(--color-surface)",
        borderTop: "1px solid var(--color-border)",
      }}
    >
      {/* Accent line */}
      <div className="divider-accent" />

      <div className="max-w-content mx-auto px-6 pt-14 pb-10">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-x-8 gap-y-10">

          {/* Brand — full width on mobile, 2 cols on desktop */}
          <div className="col-span-2">
            <div className="mb-4">
              <Logo variant="horizontal" size="sm" />
            </div>
            <p className="text-body-sm leading-relaxed text-subtle dark:text-subtle-dark max-w-xs">
              Your centralized academic portal for CSE students — notes, PYQs, books,
              and curated resources organized for success.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-overline uppercase tracking-wider mb-4 text-heading dark:text-heading-dark font-semibold">
              Quick Links
            </h4>
            <ul className="space-y-2.5">
              {quickLinks.map(({ to, label }) => (
                <li key={to}>
                  <FooterLink to={to}>{label}</FooterLink>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h4 className="text-overline uppercase tracking-wider mb-4 text-heading dark:text-heading-dark font-semibold">
              Resources
            </h4>
            <ul className="space-y-2.5">
              {resourceLinks.map(({ to, label }) => (
                <li key={to}>
                  <FooterLink to={to}>{label}</FooterLink>
                </li>
              ))}
            </ul>
          </div>

          {/* Connect */}
          <div>
            <h4 className="text-overline uppercase tracking-wider mb-4 text-heading dark:text-heading-dark font-semibold">
              Connect
            </h4>
            <ul className="space-y-2.5">
              {connectLinks.map(({ Icon, label, href, to, display }) => (
                <li key={label}>
                  {href ? (
                    <a
                      href={href}
                      target={href.startsWith("mailto:") ? undefined : "_blank"}
                      rel={href.startsWith("mailto:") ? undefined : "noreferrer"}
                      className="group inline-flex items-center gap-2 text-body-sm
                        text-subtle dark:text-subtle-dark hover:text-primary-600 dark:hover:text-primary-400
                        transition-colors duration-200"
                    >
                      <Icon size={15} className="flex-shrink-0 opacity-70 group-hover:opacity-100 transition-opacity" />
                      {display}
                    </a>
                  ) : (
                    <Link
                      to={to}
                      className="group inline-flex items-center gap-2 text-body-sm
                        text-subtle dark:text-subtle-dark hover:text-primary-600 dark:hover:text-primary-400
                        transition-colors duration-200"
                    >
                      <Icon size={15} className="flex-shrink-0 opacity-70 group-hover:opacity-100 transition-opacity" />
                      {display}
                    </Link>
                  )}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div
          className="mt-10 pt-6 flex flex-col sm:flex-row justify-between items-center gap-3 text-caption"
          style={{ borderTop: "1px solid var(--color-border)", color: "var(--color-text-muted)" }}
        >
          <p>© {year} CSEducation — Built for CSE Students</p>

          <button
            onClick={scrollToTop}
            className="inline-flex items-center gap-1.5 text-caption font-medium
              text-subtle dark:text-subtle-dark hover:text-primary-600 dark:hover:text-primary-400
              transition-colors duration-200"
            aria-label="Back to top"
          >
            Back to top
            <IconArrowRight size={12} className="rotate-[-90deg]" />
          </button>
        </div>
      </div>
    </footer>
  );
}

function FooterLink({ to, children }) {
  return (
    <Link
      to={to}
      className="text-body-sm text-subtle dark:text-subtle-dark
        hover:text-primary-600 dark:hover:text-primary-400
        transition-colors duration-200"
    >
      {children}
    </Link>
  );
}
