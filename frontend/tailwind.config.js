export default {
  darkMode: "class",
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Plus Jakarta Sans", "system-ui", "-apple-system", "sans-serif"],
      },

      /* ── Color System ── */
      colors: {
        /* Primary — Indigo-Violet */
        primary: {
          50:  "#f0f0ff",
          100: "#e0e1ff",
          200: "#c7c8fe",
          300: "#a5a6fc",
          400: "#8183f9",
          500: "#6366f1",
          600: "#4f46e5",
          700: "#4338ca",
          800: "#3730a3",
          900: "#312e81",
          950: "#1a1640",
        },

        /* Accent — Warm violet for highlights */
        accent: {
          50:  "#faf5ff",
          100: "#f3e8ff",
          200: "#e9d5ff",
          300: "#d8b4fe",
          400: "#c084fc",
          500: "#a855f7",
          600: "#9333ea",
          700: "#7e22ce",
          800: "#6b21a8",
          900: "#581c87",
          950: "#3b0764",
        },

        /* Semantic surface colors */
        surface: {
          DEFAULT: "#ffffff",
          raised: "#f8f8fc",
          overlay: "rgba(255, 255, 255, 0.85)",
          dark: {
            DEFAULT: "#141220",
            raised: "#1c1a2e",
            overlay: "rgba(20, 18, 32, 0.85)",
          },
        },

        /* Page backgrounds */
        background: {
          DEFAULT: "#fafafc",
          dark: "#0f0e1a",
        },

        /* Border colors */
        border: {
          DEFAULT: "#e8e8f0",
          dark: "#2a2840",
        },

        /* Text hierarchy */
        heading: {
          DEFAULT: "#1a1a2e",
          dark: "#f0f0f5",
        },

        subtle: {
          DEFAULT: "#6b6b80",
          dark: "#9898a8",
        },

        muted: {
          DEFAULT: "#9898a8",
          dark: "#6b6b80",
        },

        /* Semantic states */
        success: {
          50:  "#ecfdf5",
          100: "#d1fae5",
          500: "#10b981",
          600: "#059669",
          700: "#047857",
        },
        warning: {
          50:  "#fffbeb",
          100: "#fef3c7",
          500: "#f59e0b",
          600: "#d97706",
          700: "#b45309",
        },
        error: {
          50:  "#fef2f2",
          100: "#fee2e2",
          500: "#ef4444",
          600: "#dc2626",
          700: "#b91c1c",
        },
        info: {
          50:  "#eff6ff",
          100: "#dbeafe",
          500: "#3b82f6",
          600: "#2563eb",
          700: "#1d4ed8",
        },
      },

      /* ── Spacing System (4px base) ── */
      spacing: {
        "4.5": "18px",
        "13":  "52px",
        "15":  "60px",
        "18":  "72px",
        "22":  "88px",
        "26":  "104px",
        "30":  "120px",
      },

      /* ── Border Radius ── */
      borderRadius: {
        "sm":  "6px",
        "md":  "8px",
        "lg":  "12px",
        "xl":  "16px",
        "2xl": "20px",
        "3xl": "24px",
      },

      /* ── Shadow / Elevation System ── */
      boxShadow: {
        "xs":     "0 1px 2px rgba(0, 0, 0, 0.04)",
        "sm":     "0 2px 4px rgba(0, 0, 0, 0.04), 0 1px 2px rgba(0, 0, 0, 0.02)",
        "md":     "0 4px 12px rgba(0, 0, 0, 0.06), 0 2px 4px rgba(0, 0, 0, 0.03)",
        "lg":     "0 8px 24px rgba(0, 0, 0, 0.08), 0 4px 8px rgba(0, 0, 0, 0.04)",
        "xl":     "0 16px 48px rgba(0, 0, 0, 0.1), 0 8px 16px rgba(0, 0, 0, 0.05)",
        "hover":  "0 8px 28px rgba(0, 0, 0, 0.1), 0 4px 10px rgba(0, 0, 0, 0.04)",
        "focus":  "0 0 0 3px rgba(99, 102, 241, 0.15)",
        "card":   "0 1px 3px rgba(0, 0, 0, 0.04), 0 1px 2px rgba(0, 0, 0, 0.02)",
        "card-hover": "0 6px 20px rgba(0, 0, 0, 0.08), 0 3px 6px rgba(0, 0, 0, 0.03)",
        /* Dark mode shadows */
        "dark-sm":   "0 2px 4px rgba(0, 0, 0, 0.2)",
        "dark-md":   "0 4px 12px rgba(0, 0, 0, 0.3)",
        "dark-lg":   "0 8px 24px rgba(0, 0, 0, 0.4)",
        "dark-card": "0 1px 3px rgba(0, 0, 0, 0.2), 0 1px 2px rgba(0, 0, 0, 0.15)",
        "dark-card-hover": "0 6px 20px rgba(0, 0, 0, 0.35)",
      },

      /* ── Typography ── */
      fontSize: {
        "display": ["3.5rem",  { lineHeight: "1.1",  letterSpacing: "-0.025em", fontWeight: "700" }],
        "h1":      ["2.5rem",  { lineHeight: "1.15", letterSpacing: "-0.02em",  fontWeight: "700" }],
        "h2":      ["1.75rem", { lineHeight: "1.25", letterSpacing: "-0.015em", fontWeight: "600" }],
        "h3":      ["1.375rem",{ lineHeight: "1.3",  letterSpacing: "-0.01em",  fontWeight: "600" }],
        "h4":      ["1.125rem",{ lineHeight: "1.4",  letterSpacing: "0",        fontWeight: "600" }],
        "body":    ["1rem",    { lineHeight: "1.6",   letterSpacing: "0" }],
        "body-sm": ["0.875rem",{ lineHeight: "1.5",   letterSpacing: "0" }],
        "caption": ["0.75rem", { lineHeight: "1.4",   letterSpacing: "0.02em",  fontWeight: "500" }],
        "overline":["0.6875rem",{ lineHeight: "1.3",  letterSpacing: "0.08em",  fontWeight: "600" }],
      },

      /* ── Animations ── */
      animation: {
        "fade-in":  "fadeIn 0.4s ease-out",
        "fade-up":  "fadeUp 0.5s ease-out",
        "slide-in": "slideIn 0.3s ease-out",
        "shimmer":  "shimmer 2s infinite linear",
        "spin-slow":"spin 3s linear infinite",
      },
      keyframes: {
        fadeIn: {
          from: { opacity: "0" },
          to:   { opacity: "1" },
        },
        fadeUp: {
          from: { opacity: "0", transform: "translateY(12px)" },
          to:   { opacity: "1", transform: "translateY(0)" },
        },
        slideIn: {
          from: { opacity: "0", transform: "translateX(-8px)" },
          to:   { opacity: "1", transform: "translateX(0)" },
        },
        shimmer: {
          "0%":   { backgroundPosition: "-200% 0" },
          "100%": { backgroundPosition: "200% 0" },
        },
      },

      /* ── Max widths for content ── */
      maxWidth: {
        "content": "1120px",
        "narrow":  "720px",
        "wide":    "1280px",
      },
    },
  },
  plugins: [],
};
