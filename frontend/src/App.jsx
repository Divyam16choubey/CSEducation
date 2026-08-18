import { Routes, Route, useLocation } from "react-router-dom";
import { useEffect } from "react";
import { Toaster } from "react-hot-toast";
import ScrollProgress from "./components/ScrollProgress";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import ProtectedRoute from "./components/ProtectedRoute";

/* Scroll to top on route change */
function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => { window.scrollTo(0, 0); }, [pathname]);
  return null;
}

import Home from "./pages/Home";
import SemesterLanding from "./pages/SemesterLanding";
import SemesterPage from "./pages/SemesterPage";
import SubjectPage from "./pages/SubjectPage";

import PYQLanding from "./pages/PYQLanding";
import PYQPage from "./pages/PYQPage";

import About from "./pages/About";
import Contact from "./pages/Contact";

import AdminLogin from "./pages/AdminLogin";
import AdminDashboard from "./pages/AdminDashboard";
import NotFound from "./pages/NotFound";

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
      <Footer />
    </>
  );
}
