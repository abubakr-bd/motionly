import React, { useEffect, useRef, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { useSiteSettings } from "../../lib/useSiteData";
import { useTheme } from "../../lib/ThemeContext";
import { Menu, X, ArrowUpRight, Sun, Moon } from "lucide-react";
import AcademyComingSoonModal from "./AcademyComingSoonModal";

const navLinks = [
  { name: "Work", path: "/#work" },
  { name: "Services", path: "/#services" },
  { name: "About", path: "/#about" },
  { name: "Journal", path: "/blog" },
  { name: "Careers", path: "/careers" },
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

  const siteName = settings.global.siteName || "Motionly Media";
  const pageToggles = settings.global.pageToggles || {
    personalBranding: true,
    services: true,
    portfolio: true,
    about: true
  };

  const isActive = (path: string) => {
    if (path.startsWith("/#")) {
      return location.hash === path.substring(1);
    }
    return location.pathname === path;
  };

  const isDark = theme === "dark";

  return (
    <>
      <header
        ref={headerRef}
        className={`fixed top-3 sm:top-4 left-0 right-0 z-50 max-w-5xl w-[calc(100%-1.5rem)] sm:w-[calc(100%-2rem)] mx-auto transition-colors duration-150 ${
          isDark
            ? isScrolled
              ? "bg-[#0b0d14]/95 backdrop-blur-md border-[#eef0f5]/[0.1] shadow-xs text-[#eef0f5]"
              : "bg-[#0b0d14]/85 backdrop-blur-md border-[#eef0f5]/[0.08] text-[#eef0f5]"
            : isScrolled
              ? "bg-white/95 backdrop-blur-md border-black/[0.08] shadow-xs text-[#111827]"
              : "bg-white/90 backdrop-blur-md border-black/[0.06] text-[#111827]"
        } border rounded-xl px-4 sm:px-5 py-2`}
      >
        <div className="flex items-center justify-between">
          {/* Brand Logo */}
          <Link to="/" className="flex items-center gap-2 group shrink-0" aria-label={`${siteName} home`}>
            <img
              src={isDark ? "/nav_logo_dark.png" : "/nav_logo.png"}
              alt={siteName}
              className="h-6 sm:h-7 w-auto object-contain"
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
                  className={`px-3 py-1.5 rounded-lg text-sm font-normal whitespace-nowrap transition-colors duration-150 ${
                    active
                      ? isDark
                        ? "text-[#eef0f5] bg-[#1a1e28] font-medium"
                        : "text-[#111827] bg-[#eceff4] font-medium"
                      : isDark
                        ? "text-[#a3a9b8] hover:text-[#eef0f5] hover:bg-[#11141c]"
                        : "text-[#4b5565] hover:text-[#111827] hover:bg-[#f4f4f5]"
                  }`}
                >
                  {link.name}
                </Link>
              );
            })}
          </nav>

          {/* Right Action & Theme Toggle */}
          <div className="flex items-center gap-2">
            {/* Theme Toggle Button */}
            <button
              type="button"
              onClick={toggleTheme}
              className={`w-8 h-8 rounded-lg flex items-center justify-center transition-colors duration-150 cursor-pointer ${
                isDark
                  ? "bg-[#11141c] hover:bg-[#1a1e28] text-[#a3a9b8] hover:text-[#eef0f5] border border-[#eef0f5]/[0.08]"
                  : "bg-[#eceff4] hover:bg-[#e2e8f0] text-[#4b5565] hover:text-[#111827] border border-black/[0.06]"
              }`}
              title={isDark ? "Switch to light theme" : "Switch to dark theme"}
              aria-label="Toggle theme"
            >
              {isDark ? (
                <Sun className="w-4 h-4 text-[#eef0f5]" />
              ) : (
                <Moon className="w-4 h-4 text-[#111827]" />
              )}
            </button>

            {/* Desktop 'Let's talk' Button */}
            <div className="hidden sm:flex items-center">
              <Link
                to="/contact"
                className={`inline-flex items-center justify-center gap-1.5 h-8 px-3.5 rounded-lg text-xs font-medium transition-colors duration-150 active:scale-[0.98] ${
                  isDark
                    ? "bg-[#eef0f5] text-[#07080d] hover:bg-white"
                    : "bg-[#111827] text-white hover:bg-black"
                }`}
              >
                <span>Let&apos;s talk</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            {/* Mobile Menu Hamburger Toggle */}
            <button
              ref={triggerRef}
              type="button"
              onClick={() => setIsOpen(!isOpen)}
              className={`lg:hidden flex items-center justify-center w-8 h-8 rounded-lg transition-colors ${
                isDark
                  ? "bg-[#11141c] text-[#eef0f5] border border-[#eef0f5]/[0.08]"
                  : "bg-[#eceff4] text-[#111827] border border-black/[0.06]"
              }`}
              aria-label={isOpen ? "Close menu" : "Open menu"}
              aria-expanded={isOpen}
            >
              {isOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
            </button>
          </div>
        </div>

      {/* Mobile Drawer (Simplified, Clean & High-Contrast for Phone) */}
      {isOpen && (
        <div className={`lg:hidden mt-3 pt-4 pb-3 border-t flex flex-col gap-2 animate-in fade-in slide-in-from-top-2 duration-200 ${
          isDark ? "border-white/10" : "border-slate-200"
        }`}>
          {/* View mode toggle pill in mobile drawer */}
          <div className="flex items-center justify-between px-4 py-2 mb-1 rounded-xl bg-blue-50/50 dark:bg-white/5 border border-blue-100 dark:border-white/5">
            <span className="text-xs font-semibold text-slate-600 dark:text-slate-300">
              Appearance
            </span>
            <button
              type="button"
              onClick={toggleTheme}
              className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-bold bg-white dark:bg-white/10 text-slate-900 dark:text-white shadow-sm border border-slate-200 dark:border-white/10"
            >
              {isDark ? (
                <>
                  <Sun className="w-3.5 h-3.5 text-amber-300" />
                  <span>White &amp; Blue View</span>
                </>
              ) : (
                <>
                  <Moon className="w-3.5 h-3.5 text-blue-600 fill-current" />
                  <span>Black View</span>
                </>
              )}
            </button>
          </div>

          <nav className="flex flex-col gap-1">
            {navLinks.map((link, idx) => (
              <Link
                key={link.path}
                to={link.path}
                onClick={() => setIsOpen(false)}
                className={`flex items-center justify-between px-4 py-2.5 rounded-xl text-sm font-semibold transition-colors ${
                  isDark
                    ? "text-slate-200 hover:text-white hover:bg-white/5"
                    : "text-slate-700 hover:text-slate-900 hover:bg-slate-100"
                }`}
              >
                <span>{link.name}</span>
                <span className="text-[11px] font-mono text-slate-400">0{idx + 1}</span>
              </Link>
            ))}

            {pageToggles.personalBranding !== false && (
              <Link
                to="/personal-branding"
                onClick={() => setIsOpen(false)}
                className={`flex items-center justify-between px-3 py-2 rounded-lg text-sm font-normal transition-colors ${
                  isDark
                    ? "text-[#a3a9b8] hover:text-[#eef0f5] hover:bg-[#11141c]"
                    : "text-[#4b5565] hover:text-[#111827] hover:bg-[#eceff4]"
                }`}
              >
                <span>Personal branding</span>
                <span className="text-xs font-mono text-[#7a8296] tabular-nums">0{navLinks.length + 1}</span>
              </Link>
            )}

            <button
              type="button"
              onClick={() => {
                setIsOpen(false);
                setIsAcademyModalOpen(true);
              }}
              className="w-full flex items-center justify-between px-3 py-2 rounded-lg text-sm font-normal bg-[#F47B35]/10 text-[#F47B35] border border-[#F47B35]/20 text-left cursor-pointer"
            >
              <span>Motionly Academy</span>
              <span className="text-[11px] font-medium bg-[#F47B35] text-white px-2 py-0.5 rounded">Coming soon</span>
            </button>
          </nav>

          <div className="mt-2 pt-2 border-t border-black/[0.06] dark:border-[#eef0f5]/[0.08]">
            <Link
              to="/contact"
              onClick={() => setIsOpen(false)}
              className={`w-full flex items-center justify-center gap-1.5 h-9 px-4 rounded-lg text-xs font-medium transition-colors ${
                isDark
                  ? "bg-[#eef0f5] text-[#07080d]"
                  : "bg-[#111827] text-white"
              }`}
            >
              <span>Let&apos;s talk</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      )}

      </header>

      {/* Academy Coming Soon Modal (Rendered outside header and portaled to body) */}
      <AcademyComingSoonModal
        isOpen={isAcademyModalOpen}
        onClose={() => setIsAcademyModalOpen(false)}
      />
    </>
  );
};

export default Navbar;
