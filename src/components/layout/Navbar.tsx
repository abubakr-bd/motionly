import React, { useEffect, useRef, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { useSiteSettings } from "../../lib/useSiteData";
import { useTheme } from "../../lib/ThemeContext";
import { Menu, X, ArrowUpRight, Sparkles, Sun, Moon } from "lucide-react";

const navLinks = [
  { name: "Work", path: "/#work" },
  { name: "Case Studies", path: "/portfolio" },
  { name: "Reviews", path: "/#testimonials" },
  { name: "Pricing", path: "/#pricing" },
  { name: "Framework", path: "/#process" },
  { name: "Blog", path: "/blog" },
];

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(() => typeof window !== "undefined" && window.scrollY > 20);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const headerRef = useRef<HTMLElement>(null);
  const location = useLocation();
  const { settings } = useSiteSettings();
  const { theme, toggleTheme } = useTheme();

  useEffect(() => {
    setIsOpen(false);
  }, [location.pathname, location.hash]);

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
    <header
      ref={headerRef}
      className={`fixed top-3 sm:top-5 left-0 right-0 z-50 max-w-6xl w-[calc(100%-1.5rem)] sm:w-[calc(100%-2.5rem)] mx-auto transition-all duration-300 ${
        isDark
          ? isScrolled
            ? "bg-[#090D18]/90 backdrop-blur-2xl border-white/15 shadow-[0_12px_40px_rgba(0,0,0,0.7)] text-white"
            : "bg-[#0A0E1A]/80 backdrop-blur-xl border-white/10 shadow-[0_8px_30px_rgba(0,0,0,0.5)] text-white"
          : isScrolled
            ? "bg-white/95 backdrop-blur-2xl border-slate-200/90 shadow-[0_12px_36px_rgba(37,99,235,0.08)] text-slate-900"
            : "bg-white/85 backdrop-blur-xl border-slate-200/70 shadow-[0_8px_25px_rgba(37,99,235,0.05)] text-slate-900"
      } border rounded-full px-4 sm:px-6 py-2.5 sm:py-3`}
    >
      <div className="flex items-center justify-between">
        {/* Brand Logo */}
        <Link to="/" className="flex items-center gap-2.5 group shrink-0" aria-label={`${siteName} home`}>
          <img
            src={isDark ? "/nav_logo_dark.png" : "/nav_logo.png"}
            alt={siteName}
            className="h-7 sm:h-8 w-auto object-contain transition-transform duration-300 group-hover:scale-105"
            width="140"
            height="32"
            decoding="async"
            fetchPriority="high"
            onError={(e) => {
              // Graceful fallback to static logo if needed
              (e.target as HTMLImageElement).src = isDark ? "/nav_logo_dark.png" : "/nav_logo.webp";
            }}
          />
        </Link>

        {/* Desktop Navigation Links */}
        <nav className="hidden lg:flex items-center gap-1 xl:gap-2" aria-label="Main navigation">
          {navLinks.map((link) => {
            const active = isActive(link.path);
            return (
              <Link
                key={link.path}
                to={link.path}
                className={`relative px-3.5 py-1.5 rounded-full text-xs xl:text-sm font-medium transition-all ${
                  active
                    ? isDark
                      ? "text-white bg-white/10 shadow-inner"
                      : "text-blue-700 bg-blue-50 font-semibold shadow-inner"
                    : isDark
                      ? "text-slate-300 hover:text-white hover:bg-white/5"
                      : "text-slate-600 hover:text-slate-900 hover:bg-slate-100/80"
                }`}
              >
                {link.name}
              </Link>
            );
          })}

          {pageToggles.personalBranding !== false && (
            <Link
              to="/personal-branding"
              className={`px-3.5 py-1.5 rounded-full text-xs xl:text-sm font-medium flex items-center gap-1.5 group/pb transition-all ${
                isDark
                  ? "text-slate-300 hover:text-white hover:bg-white/5"
                  : "text-slate-600 hover:text-slate-900 hover:bg-slate-100/80"
              }`}
            >
              <span>Personal Branding</span>
              <span className="w-1.5 h-1.5 rounded-full bg-blue-500 group-hover/pb:animate-ping" />
            </Link>
          )}

          <Link
            to="/careers"
            className={`px-3.5 py-1.5 rounded-full text-xs xl:text-sm font-medium transition-all ${
              isDark
                ? "text-slate-300 hover:text-white hover:bg-white/5"
                : "text-slate-600 hover:text-slate-900 hover:bg-slate-100/80"
            }`}
          >
            Careers
          </Link>
        </nav>

        {/* Right CTA & Black View Toggle */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Theme Toggle Button (Light White & Blue / Black View) */}
          <button
            type="button"
            onClick={toggleTheme}
            className={`relative p-2.5 rounded-full transition-all duration-300 flex items-center justify-center cursor-pointer group active:scale-90 ${
              isDark
                ? "bg-white/[0.08] hover:bg-white/[0.15] text-amber-300 border border-white/10 hover:border-amber-400/40 shadow-[0_0_20px_rgba(251,191,36,0.15)]"
                : "bg-blue-50/80 hover:bg-blue-100 text-blue-600 border border-blue-200/80 shadow-[0_2px_10px_rgba(37,99,235,0.08)]"
            }`}
            title={isDark ? "Switch to White & Blue View" : "Switch to Black View"}
            aria-label="Toggle Black/White View"
          >
            {isDark ? (
              <Sun className="w-4 h-4 transition-transform duration-500 group-hover:rotate-90 group-hover:scale-110" />
            ) : (
              <Moon className="w-4 h-4 fill-current transition-transform duration-500 group-hover:-rotate-45 group-hover:scale-110" />
            )}
          </button>

          {/* Desktop 'LET'S TALK!' Button with Subtle Shimmer */}
          <div className="hidden sm:flex items-center">
            <Link
              to="/contact"
              className={`relative overflow-hidden inline-flex items-center justify-center gap-1.5 px-5 py-2.5 rounded-full text-xs font-bold tracking-wider uppercase transition-all duration-300 active:scale-95 group ${
                isDark
                  ? "bg-gradient-to-r from-blue-600 via-indigo-600 to-blue-500 hover:from-blue-500 hover:to-indigo-500 text-white shadow-[0_0_25px_rgba(37,99,235,0.4)] border border-blue-400/30"
                  : "bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white shadow-lg shadow-blue-600/25"
              }`}
            >
              {/* Shimmer overlay */}
              <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-out" />
              <span className="relative z-10">LET&apos;S TALK!</span>
              <ArrowUpRight className="w-3.5 h-3.5 relative z-10 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </Link>
          </div>

          {/* Mobile Menu Hamburger Toggle */}
          <button
            ref={triggerRef}
            type="button"
            onClick={() => setIsOpen(!isOpen)}
            className={`lg:hidden flex items-center justify-center w-9 h-9 rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 ${
              isDark
                ? "bg-white/10 text-white hover:bg-white/15"
                : "bg-slate-100 text-slate-900 hover:bg-slate-200"
            }`}
            aria-label={isOpen ? "Close menu" : "Open menu"}
            aria-expanded={isOpen}
          >
            {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
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
                className={`flex items-center justify-between px-4 py-2.5 rounded-xl text-sm font-semibold transition-colors ${
                  isDark
                    ? "text-slate-200 hover:text-white hover:bg-white/5"
                    : "text-slate-700 hover:text-slate-900 hover:bg-slate-100"
                }`}
              >
                <div className="flex items-center gap-2">
                  <Sparkles className="w-3.5 h-3.5 text-blue-500" />
                  <span>Personal Branding</span>
                </div>
                <span className="text-[11px] font-mono text-slate-400">0{navLinks.length + 1}</span>
              </Link>
            )}

            <Link
              to="/careers"
              onClick={() => setIsOpen(false)}
              className={`flex items-center justify-between px-4 py-2.5 rounded-xl text-sm font-semibold transition-colors ${
                isDark
                  ? "text-slate-200 hover:text-white hover:bg-white/5"
                  : "text-slate-700 hover:text-slate-900 hover:bg-slate-100"
              }`}
            >
              <span>Careers</span>
              <span className="text-[11px] font-mono text-slate-400">0{navLinks.length + 2}</span>
            </Link>
          </nav>

          <div className="mt-2 pt-2 border-t border-slate-200 dark:border-white/5">
            <Link
              to="/contact"
              onClick={() => setIsOpen(false)}
              className={`w-full flex items-center justify-center gap-2 py-3 px-4 rounded-xl text-xs font-bold uppercase tracking-wider shadow-lg ${
                isDark
                  ? "bg-white text-slate-950 shadow-white/10"
                  : "bg-blue-600 text-white shadow-blue-600/30"
              }`}
            >
              <span>LET&apos;S TALK!</span>
              <ArrowUpRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
