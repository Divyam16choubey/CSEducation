import { lazy, Suspense, useEffect } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import ScrollProgress from "./components/ScrollProgress";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import ProtectedRoute from "./components/ProtectedRoute";
import Home from "./pages/Home";

/* Lazy load secondary routes for optimal initial bundle size */
const SemesterLanding = lazy(() => import("./pages/SemesterLanding"));
const SemesterPage = lazy(() => import("./pages/SemesterPage"));
const SubjectPage = lazy(() => import("./pages/SubjectPage"));
const PYQLanding = lazy(() => import("./pages/PYQLanding"));
const PYQPage = lazy(() => import("./pages/PYQPage"));
const About = lazy(() => import("./pages/About"));
const Contact = lazy(() => import("./pages/Contact"));
const AdminLogin = lazy(() => import("./pages/AdminLogin"));
const AdminDashboard = lazy(() => import("./pages/AdminDashboard"));
const NotFound = lazy(() => import("./pages/NotFound"));

/* Route transition fallback */
function RouteLoader() {
  return (
    <div className="min-h-[60vh] flex items-center justify-center" aria-label="Loading page content">
      <div className="w-7 h-7 rounded-full border-2 border-primary-600 dark:border-primary-400 border-t-transparent animate-spin" />
    </div>
  );
}

/* Scroll to top on route change */
function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => { window.scrollTo(0, 0); }, [pathname]);
  return null;
}

export default function App() {
  return (
    <>
      <ScrollToTop />
      <ScrollProgress />
      <Toaster position="top-right" toastOptions={{
        duration: 3000,
        style: {
          borderRadius: "12px",
          background: "var(--color-surface-raised, #1c1a2e)",
          color: "var(--color-text-primary, #f0f0f5)",
          fontSize: "14px",
          fontFamily: "Plus Jakarta Sans, system-ui, sans-serif",
          border: "1px solid var(--color-border, #2a2840)",
          boxShadow: "0 8px 24px rgba(0,0,0,0.12)",
        },
      }} />
      <Navbar />
      <Suspense fallback={<RouteLoader />}>
        <Routes>
          <Route path="/" element={<Home />} />

          {/* Semester Flow */}
          <Route path="/semester" element={<SemesterLanding />} />
          <Route path="/semester/:id" element={<SemesterPage />} />

          {/* Subject */}
          <Route path="/subject/:id" element={<SubjectPage />} />

          {/* PYQs Flow */}
          <Route path="/pyqs" element={<PYQLanding />} />
          <Route path="/pyqs/:year" element={<PYQPage />} />

          {/* Static Pages */}
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />

          {/* Admin */}
          <Route path="/admin/login" element={<AdminLogin />} />
          <Route
            path="/admin/dashboard"
            element={
              <ProtectedRoute>
                <AdminDashboard />
              </ProtectedRoute>
            }
          />

          {/* 404 Catch-all */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Suspense>
      <Footer />
    </>
  );
}
