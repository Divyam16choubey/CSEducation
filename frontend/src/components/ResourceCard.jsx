import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { fadeUp } from "../animations/motion";
import { IconExternalLink } from "./icons";

/**
 * ResourceCard — Row-style resource item with icon, title, and action button.
 * Action button is always visible (not hidden on mobile).
 *
 * @param {string}    label       — Resource title
 * @param {string}    description — Optional short description
 * @param {string}    href        — URL (internal or external)
 * @param {ReactNode} icon        — Icon element for the resource type
 * @param {string}    type        — Optional type label ("PDF", "Link", etc.)
 */
export default function ResourceCard({ label, description, href, icon, type }) {
  const isInternal = href && href.startsWith("/");

  const content = (
    <>
      <div className="resource-icon">
        {icon}
      </div>
      <div className="resource-body">
        <div className="resource-title">{label}</div>
        {description && <div className="resource-meta">{description}</div>}
        {type && !description && <div className="resource-meta">{type}</div>}
      </div>
      <span className="resource-action">
        {isInternal ? "View" : "Open"}
        <IconExternalLink size={12} />
      </span>
    </>
  );

  if (isInternal) {
    return (
      <motion.div variants={fadeUp}>
        <Link to={href} className="resource-row">{content}</Link>
      </motion.div>
    );
  }

  return (
    <motion.div variants={fadeUp}>
      <a href={href} target="_blank" rel="noreferrer" className="resource-row">{content}</a>
    </motion.div>
  );
}
