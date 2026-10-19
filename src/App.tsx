import React, { lazy, Suspense } from "react";
import { AnimatePresence, MotionConfig, motion, useReducedMotion } from "framer-motion";
import { BrowserRouter, Routes, Route, Navigate, useLocation } from "react-router-dom";
import { AuthProvider } from "./lib/auth";
import ScrollToTop from "./components/layout/ScrollToTop";
import ScrollReveal from "./components/layout/ScrollReveal";

// Lazy-loaded pages - each gets its own chunk for faster initial load.
const Landing      = lazy(() => import("./pages/Landing"));
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
  <div className="site-loading-page" role="status">
    <span className="site-spinner" aria-hidden="true" />
    <p>Loading page</p>
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
        initial={{ opacity: 0 }}
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
      <AuthProvider>
        <BrowserRouter>
          <ScrollToTop />
          <ScrollReveal />
          <AppRoutes />
        </BrowserRouter>
      </AuthProvider>
    </MotionConfig>
  );
}

export default App;
