/* ──────────────────────────────────────────────────────────
   SkillResources — Curated YouTube Learning Resources
   ──────────────────────────────────────────────────────────
   Replaces the "Latest Updates" section on the homepage.
   Carousel on desktop, horizontally scrollable on mobile.
   ────────────────────────────────────────────────────────── */

import { useState, useRef, useEffect, useCallback } from "react";
import { motion } from "framer-motion";
import { fadeUp, staggerContainer } from "../animations/motion";
import { IconYoutube, IconExternalLink, IconChevronRight } from "./icons";


/* ── Skill Data ── */

const skillResources = [
  {
    title: "HTML",
    category: "Frontend Fundamentals",
    description: "Structure of the web — learn semantic markup and modern HTML5.",
    resources: [
      {
        type: "video",
        label: "Full Course",
        url: "https://youtu.be/G3e-cpL7ofc?si=YT_xdUImUb2BSVe1",
        videoId: "G3e-cpL7ofc",
      },
      {
        type: "playlist",
        label: "Video Playlist",
        url: "https://youtube.com/playlist?list=PLu71SKxNbfoDBNF5s-WH6aLbthSEIMhMI&si=n-R9Lo5S6zMavoFE",
      },
    ],
  },
  {
    title: "CSS",
    category: "Styling & Layout",
    description: "Master layouts, animations, and responsive design with CSS.",
    resources: [
      {
        type: "playlist",
        label: "Complete Playlist",
        url: "https://youtube.com/playlist?list=PL4-IK0AVhVjOJs_UjdQeyEZ_cmEV3uJvx&si=pfFqMlz10yfWnPUL",
      },
    ],
  },
  {
    title: "JavaScript",
    category: "Programming Language",
    description: "Core language of the web — from basics to advanced concepts.",
    resources: [
      {
        type: "playlist",
        label: "Namaste JavaScript",
        url: "https://youtube.com/playlist?list=PLlasXeu85E9cQ32gLCvAvr9vNaUccPVNP&si=AVG6I_4UWYe6txqq",
      },
    ],
  },
  {
    title: "Backend Development",
    category: "Server-Side",
    description: "Build robust server-side applications and RESTful APIs.",
    resources: [
      {
        type: "video",
        label: "Full Course",
        url: "https://youtu.be/Oe421EPjeBE?si=clGYEIAKxDL7g-Ux",
        videoId: "Oe421EPjeBE",
      },
    ],
  },
  {
    title: "Python",
    category: "Programming Language",
    description: "Versatile language for scripting, data science, and backend.",
    resources: [
      {
        type: "video",
        label: "Full Course",
        url: "https://youtu.be/_uQrJ0TkZlc?si=8hI1i3QX4YhJReU6",
        videoId: "_uQrJ0TkZlc",
      },
    ],
  },
  {
    title: "React",
    category: "Frontend Framework",
    description: "Build modern, interactive user interfaces with React.",
    resources: [
      {
        type: "video",
        label: "Part 1",
        url: "https://youtu.be/FxgM9k1rg0Q?si=2vXqnTe4X4Zef868",
        videoId: "FxgM9k1rg0Q",
      },
      {
        type: "video",
        label: "Part 2",
        url: "https://youtu.be/IdlF1zsUN3M?si=dtcWuF8NHFVYtmJp",
        videoId: "IdlF1zsUN3M",
      },
    ],
  },
  {
    title: "Web Development",
    category: "Full Stack",
    description: "End-to-end web development — frontend, backend, and deployment.",
    resources: [
      {
        type: "playlist",
        label: "Complete Playlist",
        url: "https://youtube.com/playlist?list=PLu0W_9lII9agq5TrH9XLIKQvv0iaF2X3w&si=ar6l4mVnmkGMGhjB",
      },
    ],
  },
];


/* ── Thumbnail Component with Fallback ── */

function SkillThumbnail({ resource, skillTitle }) {
  const [imgFailed, setImgFailed] = useState(false);

  /* Only video IDs can reliably produce thumbnails */
  const thumbnailUrl = resource.videoId
    ? `https://img.youtube.com/vi/${resource.videoId}/mqdefault.jpg`
    : null;

  if (!thumbnailUrl || imgFailed) {
    /* Branded placeholder for playlists / failed thumbnails */
    return (
      <div className="skill-thumb-placeholder">
        <div className="skill-thumb-placeholder-icon">
          <IconYoutube size={28} />
        </div>
        <span className="skill-thumb-placeholder-label">{skillTitle}</span>
        <span className="skill-thumb-placeholder-sub">Open Learning Resource</span>
      </div>
    );
  }

  return (
    <img
      src={thumbnailUrl}
      alt={`${skillTitle} — ${resource.label}`}
      className="skill-thumb-img"
      loading="lazy"
      onError={() => setImgFailed(true)}
    />
  );
}


/* ── Individual Skill Card ── */

function SkillResourceCard({ skill }) {
  /* Primary resource is the first one — used for thumbnail */
  const primary = skill.resources[0];

  return (
    <div className="skill-card group">
      {/* Thumbnail area */}
      <a
        href={primary.url}
        target="_blank"
        rel="noopener noreferrer"
        className="skill-card-thumb-link"
        aria-label={`Watch ${skill.title} on YouTube`}
      >
        <div className="skill-card-thumb">
          <SkillThumbnail resource={primary} skillTitle={skill.title} />

          {/* Play overlay */}
          <div className="skill-card-play-overlay">
            <div className="skill-card-play-btn">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                <polygon points="6,3 20,12 6,21" />
              </svg>
            </div>
          </div>
        </div>
      </a>

      {/* Card body */}
      <div className="skill-card-body">
        {/* Type badge */}
        <div className="flex items-center gap-2 mb-2">
          <span className="badge badge-primary text-overline" style={{ fontSize: "0.65rem", padding: "2px 8px" }}>
            {primary.type === "playlist" ? "Playlist" : "Video"}
          </span>
          <span className="text-caption text-subtle dark:text-subtle-dark">
            {skill.category}
          </span>
        </div>

        {/* Title */}
        <h3 className="text-h4 text-heading dark:text-heading-dark mb-1.5 leading-snug">
          {skill.title}
        </h3>

        {/* Description */}
        <p className="text-body-sm text-subtle dark:text-subtle-dark leading-relaxed mb-4 line-clamp-2">
          {skill.description}
        </p>

        {/* Resource links */}
        <div className="flex flex-wrap gap-2">
          {skill.resources.map((res, idx) => (
            <a
              key={idx}
              href={res.url}
              target="_blank"
              rel="noopener noreferrer"
              className="skill-card-cta"
            >
              <IconYoutube size={14} />
              <span>{res.type === "playlist" ? "Explore Playlist" : `Watch ${res.label}`}</span>
              <IconExternalLink size={12} />
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}


/* ── Carousel Navigation Arrows ── */

function CarouselArrow({ direction, onClick, disabled }) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className="skill-carousel-arrow"
      aria-label={direction === "left" ? "Previous skills" : "Next skills"}
    >
      <IconChevronRight
        size={20}
        style={direction === "left" ? { transform: "rotate(180deg)" } : undefined}
      />
    </button>
  );
}


/* ── Main Section Component ── */

export default function SkillResources() {
  const scrollRef = useRef(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  /* Check scroll position to update arrow states */
  const checkScroll = useCallback(() => {
    const el = scrollRef.current;
    if (!el) return;
    const tolerance = 4;
    setCanScrollLeft(el.scrollLeft > tolerance);
    setCanScrollRight(el.scrollLeft + el.clientWidth < el.scrollWidth - tolerance);
  }, []);

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    checkScroll();
    el.addEventListener("scroll", checkScroll, { passive: true });
    window.addEventListener("resize", checkScroll);
    return () => {
      el.removeEventListener("scroll", checkScroll);
      window.removeEventListener("resize", checkScroll);
    };
  }, [checkScroll]);

  const scroll = (dir) => {
    const el = scrollRef.current;
    if (!el) return;
    /* Scroll by ~1.5 card widths for a smooth step */
    const amount = el.clientWidth * 0.75;
    el.scrollBy({ left: dir === "left" ? -amount : amount, behavior: "smooth" });
  };

  return (
    <section
      className="py-20 md:py-24 px-6"
      style={{ background: "var(--color-surface)" }}
    >
      <div className="max-w-content mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4 }}
        >
          <div className="flex justify-center mb-4">
            <span className="badge badge-primary text-overline uppercase tracking-widest">
              Curated Learning
            </span>
          </div>
          <h2 className="section-title">Learn More Skills</h2>
          <p className="section-subtitle mb-14">
            Explore curated learning resources to strengthen your development skills.
          </p>
        </motion.div>

        {/* Carousel wrapper */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="skill-carousel-wrapper"
        >
          {/* Navigation arrows — desktop only */}
          <div className="skill-carousel-nav">
            <CarouselArrow
              direction="left"
              onClick={() => scroll("left")}
              disabled={!canScrollLeft}
            />
            <CarouselArrow
              direction="right"
              onClick={() => scroll("right")}
              disabled={!canScrollRight}
            />
          </div>

          {/* Scrollable track */}
          <div
            ref={scrollRef}
            className="skill-carousel-track"
            role="region"
            aria-label="Skill resources carousel"
            tabIndex={0}
            onKeyDown={(e) => {
              if (e.key === "ArrowLeft") scroll("left");
              if (e.key === "ArrowRight") scroll("right");
            }}
          >
            {skillResources.map((skill, i) => (
              <motion.div key={skill.title} variants={fadeUp} className="skill-carousel-slide">
                <SkillResourceCard skill={skill} />
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
