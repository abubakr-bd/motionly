import React, { lazy, Suspense } from "react";
import { AnimatePresence, MotionConfig, motion, useReducedMotion } from "framer-motion";
import { BrowserRouter, Routes, Route, Navigate, useLocation } from "react-router-dom";
import { ThemeProvider } from "./lib/ThemeContext";
import ScrollToTop from "./components/layout/ScrollToTop";
import ScrollReveal from "./components/layout/ScrollReveal";
import Landing from "./pages/Landing";

// Lazy-loaded secondary pages - each gets its own chunk.
const Admin        = lazy(() => import("./pages/Admin"));
const About        = lazy(() => import("./pages/About"));
const Services     = lazy(() => import("./pages/Services"));
const PortfolioPage= lazy(() => import("./pages/PortfolioPage"));
const ContactPage  = lazy(() => import("./pages/ContactPage"));
const Blog         = lazy(() => import("./pages/Blog"));
const BlogPost     = lazy(() => import("./pages/BlogPost"));
const PrivacyPolicy= lazy(() => import("./pages/PrivacyPolicy"));
const TermsOfService=lazy(() => import("./pages/TermsOfService"));
const RefundPolicy = lazy(() => import("./pages/RefundPolicy"));
const NotFound     = lazy(() => import("./pages/NotFound"));
const PersonalBranding = lazy(() => import("./pages/PersonalBranding"));
const Careers          = lazy(() => import("./pages/Careers"));
const PublicInvoice    = lazy(() => import("./pages/PublicInvoice"));
const TeamWorkspace    = lazy(() => import("./pages/TeamWorkspace"));
const ProjectCaseStudy = lazy(() => import("./pages/ProjectCaseStudy"));

const PageLoader = () => (
  <div className="min-h-[70vh] flex flex-col items-center justify-center p-8 bg-transparent" role="status">
    <div className="relative flex flex-col items-center justify-center">
      <div className="absolute -inset-6 bg-gradient-to-r from-blue-500/25 via-indigo-500/20 to-cyan-400/25 rounded-full blur-2xl pointer-events-none" />
      <img
        src="/icon_wave.png"
        alt="Loading..."
        className="w-12 h-12 object-contain relative z-10 animate-pulse"
        width="48"
        height="48"
      />
      <div className="mt-5 w-44 h-[3px] rounded-full overflow-hidden bg-slate-200/50 dark:bg-white/10 relative z-10">
        <div className="w-full h-full bg-gradient-to-r from-[#4F46E5] via-[#3B82F6] to-[#06B6D4] rounded-full animate-pulse origin-left" />
      </div>
    </div>
  </div>
);

function AppRoutes() {
  const location = useLocation();
  const reduceMotion = useReducedMotion();
  const viewportWidth = typeof window === "undefined" ? 1024 : window.innerWidth;
  const routeDuration = reduceMotion
    ? 0
    : viewportWidth <= 639
      ? 0.14
      : viewportWidth <= 1023
        ? 0.16
        : viewportWidth <= 1600
          ? 0.18
          : 0.2;

  return (
    <AnimatePresence mode="wait" initial={false}>
      <motion.div
        key={location.pathname}
        className="route-transition"
        initial={false}
        animate={{ opacity: 1, transition: { duration: routeDuration, ease: "easeOut" } }}
        exit={{ opacity: 0, transition: { duration: routeDuration * 0.65, ease: "easeIn" } }}
      >
        <Suspense fallback={<PageLoader />}>
          <Routes location={location}>
            <Route path="/"          element={<Landing />} />
            <Route path="/about"     element={<About />} />
            <Route path="/services"  element={<Services />} />
            <Route path="/portfolio" element={<PortfolioPage />} />
            <Route path="/portfolio/:id" element={<ProjectCaseStudy />} />
            <Route path="/careers"   element={<Careers />} />
            <Route path="/career"    element={<Navigate to="/careers" replace />} />
            <Route path="/contact"   element={<ContactPage />} />
            <Route path="/blog"      element={<Blog />} />
            <Route path="/blog/:id"  element={<BlogPost />} />
            <Route path="/personal-branding" element={<PersonalBranding />} />
            <Route path="/privacy"   element={<PrivacyPolicy />} />
            <Route path="/terms"     element={<TermsOfService />} />
            <Route path="/refund"    element={<RefundPolicy />} />
            {/* Legacy /legal redirects to the privacy page. */}
            <Route path="/legal"           element={<Navigate to="/privacy" replace />} />
            <Route path="/invoice/:id/:publicToken" element={<PublicInvoice />} />
            <Route path="/admin"     element={<Admin />} />
            <Route path="/admin/*"   element={<Admin />} />
            <Route path="/team/*"    element={<TeamWorkspace />} />
            <Route path="/team"      element={<TeamWorkspace />} />
            <Route path="*"          element={<NotFound />} />
          </Routes>
        </Suspense>
      </motion.div>
    </AnimatePresence>
  );
}

function App() {
  return (
    <MotionConfig reducedMotion="user">
      <ThemeProvider>
        <BrowserRouter>
          <ScrollToTop />
          <ScrollReveal />
          <AppRoutes />
        </BrowserRouter>
      </ThemeProvider>
    </MotionConfig>
  );
}

export default App;
