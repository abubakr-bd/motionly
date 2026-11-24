import React, { useEffect, useRef, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { useSiteSettings } from "../../lib/useSiteData";
import { useTheme } from "../../lib/ThemeContext";
import { Menu, X, ArrowUpRight, Sun, Moon } from "lucide-react";
import AcademyComingSoonModal from "./AcademyComingSoonModal";

const navLinks = [
  { name: "Work", path: "/portfolio/" },
  { name: "Services", path: "/services/" },
  { name: "Personal Branding", path: "/personal-branding/" },
  { name: "About", path: "/about/" },
  { name: "Journal", path: "/blog/" },
  { name: "Careers", path: "/careers/" },
];

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(() => typeof window !== "undefined" && window.scrollY > 20);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const headerRef = useRef<HTMLElement>(null);
  const location = useLocation();
  const { settings } = useSiteSettings();
  const { theme, toggleTheme } = useTheme();

  const [isAcademyModalOpen, setIsAcademyModalOpen] = useState(false);

  useEffect(() => {
    setIsOpen(false);
  }, [location.pathname, location.hash]);

  // Open modal if triggered via global custom event or URL query (?academy=coming-soon)
  useEffect(() => {
    const handleOpenModal = () => setIsAcademyModalOpen(true);
    window.addEventListener("open-academy-modal", handleOpenModal);
    return () => window.removeEventListener("open-academy-modal", handleOpenModal);
  }, []);

  useEffect(() => {
    if (location.search.includes("academy=coming-soon") || location.search.includes("academy=true")) {
      setIsAcademyModalOpen(true);
    }
  }, [location.search]);

  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsOpen(false);
        triggerRef.current?.focus();
      }
    };
    const handlePointerDown = (event: PointerEvent) => {
      if (event.target instanceof Node && !headerRef.current?.contains(event.target)) {
        setIsOpen(false);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    document.addEventListener("pointerdown", handlePointerDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.removeEventListener("pointerdown", handlePointerDown);
    };
  }, [isOpen]);

  useEffect(() => {
    const updateScrollState = () => {
      const nextState = window.scrollY > 20;
      setIsScrolled((currentState) => currentState === nextState ? currentState : nextState);
    };

    window.addEventListener("scroll", updateScrollState, { passive: true });
    return () => window.removeEventListener("scroll", updateScrollState);
  }, []);

  const siteName = settings?.global?.siteName || "Motionly Media";

  const isActive = (path: string) => {
    if (path === "/portfolio") {
      return location.pathname === "/portfolio" || location.pathname.startsWith("/portfolio/") || location.hash === "#work";
    }
    if (path === "/careers") {
      return location.pathname === "/careers" || location.pathname === "/career";
    }
    return location.pathname === path;
  };

  const isDark = theme === "dark";

  return (
    <>
      <header
        ref={headerRef}
        className={`fixed top-2.5 sm:top-4 left-0 right-0 z-50 max-w-5xl w-[calc(100%-1.25rem)] sm:w-[calc(100%-2rem)] mx-auto transition-[background-color,border-color,box-shadow,color] duration-300 ${
          isDark
            ? isScrolled
              ? "bg-[#070b14]/90 backdrop-blur-xl border-white/10 border-t-white/20 shadow-[0_12px_36px_rgba(0,0,0,0.55)] text-white"
              : "bg-[#070b14]/75 backdrop-blur-lg border-white/[0.08] border-t-white/15 text-white"
            : isScrolled
              ? "bg-white/95 backdrop-blur-xl border-slate-200/80 border-t-white shadow-[0_8px_30px_rgba(15,23,42,0.06)] text-slate-900"
              : "bg-white/85 backdrop-blur-lg border-slate-200/60 text-slate-900"
        } border rounded-2xl px-3.5 sm:px-5 py-2 sm:py-2.5`}
      >
        <div className="flex items-center justify-between">
          {/* Brand Logo */}
          <Link to="/" className="flex items-center gap-2 group shrink-0 active:scale-[0.98] transition-transform duration-100" aria-label={`${siteName} home`}>
            <img
              src={isDark ? "/nav_logo_dark.png" : "/nav_logo.png"}
              alt={siteName}
              className="h-6 sm:h-7 w-auto object-contain transition-transform duration-200 group-hover:scale-[1.02]"
              width="130"
              height="28"
              decoding="async"
              fetchPriority="high"
              onError={(e) => {
                (e.target as HTMLImageElement).src = isDark ? "/nav_logo_dark.png" : "/nav_logo.webp";
              }}
            />
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-1" aria-label="Main navigation">
            {navLinks.map((link) => {
              const active = isActive(link.path);
              return (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`relative px-3 py-1.5 rounded-lg text-xs font-semibold tracking-wide whitespace-nowrap transition-colors duration-150 active:scale-95 ${
                    active
                      ? isDark
                        ? "text-cyan-400 font-bold"
                        : "text-blue-600 font-bold"
                      : isDark
                        ? "text-slate-300 hover:text-white"
                        : "text-slate-600 hover:text-slate-950"
                  }`}
                >
                  {active && (
                    <motion.span
                      layoutId="navbar-active-pill"
                      transition={{ type: "spring", stiffness: 380, damping: 30 }}
                      className={`absolute inset-0 rounded-lg -z-10 ${
                        isDark ? "bg-white/[0.08]" : "bg-blue-50"
                      }`}
                    />
                  )}
                  {link.name}
                </Link>
              );
            })}
          </nav>

          {/* Right Action & Theme Toggle */}
          <div className="flex items-center gap-2.5">
            {/* Theme Toggle Button */}
            <motion.button
              type="button"
              onClick={toggleTheme}
              whileTap={{ scale: 0.92 }}
              className={`w-8 h-8 rounded-lg flex items-center justify-center transition-colors duration-150 cursor-pointer ${
                isDark
                  ? "bg-white/[0.05] hover:bg-white/[0.1] text-slate-300 hover:text-white border border-white/[0.08]"
                  : "bg-slate-100 hover:bg-slate-200 text-slate-600 hover:text-slate-900 border border-slate-200"
              }`}
              title={isDark ? "Switch to light theme" : "Switch to dark theme"}
              aria-label="Toggle theme"
            >
              {isDark ? (
                <Sun className="w-4 h-4 text-amber-300" />
              ) : (
                <Moon className="w-4 h-4 text-slate-800" />
              )}
            </motion.button>

            {/* Desktop 'Start a Project' Button */}
            <div className="hidden sm:flex items-center">
              <Link
                to="/contact/"
                onClick={(e) => {
                  if (location.pathname === "/") {
                    e.preventDefault();
                    document.getElementById("booking")?.scrollIntoView({ behavior: "smooth" });
                    window.history.pushState(null, "", "#booking");
                  }
                }}
                className="inline-flex items-center justify-center gap-1.5 h-8 px-4 rounded-lg text-xs font-bold uppercase tracking-wider bg-[#315EFA] text-white hover:bg-[#254cd4] shadow-sm transition-[background-color,color,box-shadow,transform] duration-150 active:scale-[0.96] cursor-pointer"
              >
                <span>Start a Project</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            {/* Mobile Menu Hamburger Toggle */}
            <motion.button
              ref={triggerRef}
              type="button"
              onClick={() => setIsOpen(!isOpen)}
              whileTap={{ scale: 0.92 }}
              className={`lg:hidden flex items-center justify-center w-8 h-8 rounded-lg transition-colors ${
                isDark
                  ? "bg-white/[0.05] text-white border border-white/[0.08]"
                  : "bg-slate-100 text-slate-900 border border-slate-200"
              }`}
              aria-label={isOpen ? "Close menu" : "Open menu"}
              aria-expanded={isOpen}
            >
              {isOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
            </motion.button>
          </div>
        </div>

        {/* Mobile Drawer (Clean, High-Contrast & Accessible with AnimatePresence) */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
              className={`lg:hidden mt-3 pt-4 pb-3 border-t flex flex-col gap-2 overflow-hidden ${
                isDark ? "border-white/10" : "border-slate-200"
              }`}
            >
              <nav className="flex flex-col gap-1">
                {navLinks.map((link, idx) => {
                  const active = isActive(link.path);
                  return (
                    <Link
                      key={link.path}
                      to={link.path}
                      onClick={() => setIsOpen(false)}
                      className={`flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider transition-colors ${
                        active
                          ? isDark
                            ? "text-cyan-400 bg-white/[0.08]"
                            : "text-blue-600 bg-blue-50"
                          : isDark
                            ? "text-slate-300 hover:text-white hover:bg-white/5"
                            : "text-slate-700 hover:text-slate-950 hover:bg-slate-100"
                      }`}
                    >
                      <span>{link.name}</span>
                      <span className="text-[10px] font-mono text-slate-400">0{idx + 1}</span>
                    </Link>
                  );
                })}

                <div className="pt-2 mt-2 border-t border-white/10 dark:border-white/10">
                  <Link
                    to="/contact/"
                    onClick={(e) => {
                      setIsOpen(false);
                      if (location.pathname === "/") {
                        e.preventDefault();
                        document.getElementById("booking")?.scrollIntoView({ behavior: "smooth" });
                        window.history.pushState(null, "", "#booking");
                      }
                    }}
                    className="w-full flex items-center justify-center gap-2 py-3 rounded-xl text-xs font-bold uppercase tracking-wider bg-[#315EFA] text-white hover:bg-[#254edb] shadow-sm transition-colors cursor-pointer"
                  >
                    <span>Start a Project</span>
                    <ArrowUpRight className="w-4 h-4" />
                  </Link>
                </div>
              </nav>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* Academy Modal */}
      <AcademyComingSoonModal
        isOpen={isAcademyModalOpen}
        onClose={() => setIsAcademyModalOpen(false)}
      />
    </>
  );
};

export default Navbar;
