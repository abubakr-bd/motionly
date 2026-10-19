import React, { useEffect, useRef, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { useSiteSettings } from "../../lib/useSiteData";

const navLinks = [
  { name: "Work", path: "/portfolio" },
  { name: "Services", path: "/services" },
  { name: "Process", path: "/#process" },
  { name: "About", path: "/about" },
  { name: "Journal", path: "/blog" },
];

const Navbar = () => {
  const [menu, setMenu] = useState<{ open: boolean; locationKey: string } | null>(null);
  const [isScrolled, setIsScrolled] = useState(() => typeof window !== "undefined" && window.scrollY > 32);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const headerRef = useRef<HTMLElement>(null);
  const location = useLocation();
  const { settings } = useSiteSettings();
  const locationKey = `${location.pathname}${location.hash}`;
  const isOpen = menu?.open === true && menu.locationKey === locationKey;

  useEffect(() => {
    if (!isOpen) return;
    const trigger = triggerRef.current;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setMenu({ open: false, locationKey });
        trigger?.focus();
      }
    };
    const handlePointerDown = (event: PointerEvent) => {
      if (event.target instanceof Node && !headerRef.current?.contains(event.target)) {
        setMenu({ open: false, locationKey });
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    document.addEventListener("pointerdown", handlePointerDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.removeEventListener("pointerdown", handlePointerDown);
    };
  }, [isOpen, locationKey]);

  const isActive = (path: string) => path !== "/#process" && location.pathname === path;
  const siteName = settings.global.siteName || "Motionly Media";
  const closeMenu = () => setMenu({ open: false, locationKey });

  useEffect(() => {
    const updateScrollState = () => {
      const nextState = window.scrollY > 32;
      setIsScrolled((currentState) => currentState === nextState ? currentState : nextState);
    };

    window.addEventListener("scroll", updateScrollState, { passive: true });
    return () => window.removeEventListener("scroll", updateScrollState);
  }, []);

  const pageToggles = settings.global.pageToggles || {
    personalBranding: true,
    services: true,
    portfolio: true,
    about: true
  };

  const visibleNavLinks = navLinks.filter(link => {
    if (link.path === "/services" && pageToggles.services === false) return false;
    if (link.path === "/portfolio" && pageToggles.portfolio === false) return false;
    if (link.path === "/about" && pageToggles.about === false) return false;
    return true;
  });

  return (
    <header ref={headerRef} className={`site-nav ${isScrolled ? "is-scrolled" : ""}`}>
      <div className="site-container site-nav__inner">
        <Link to="/" className="site-nav__brand" aria-label={`${siteName} home`}>
          <img src={settings.global.logoUrl || "/nav_logo.webp"} alt={siteName} className="site-nav__logo" width="184" height="48" decoding="async" fetchPriority="high" />
        </Link>

        <nav className="site-nav__links" aria-label="Main navigation">
          {visibleNavLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              aria-current={isActive(link.path) ? "page" : undefined}
              className={isActive(link.path) ? "is-active" : undefined}
            >
              {link.name}
            </Link>
          ))}
        </nav>

        <div className="site-nav__actions">
          {pageToggles.personalBranding !== false && (
            <Link to="/personal-branding" className="site-nav__secondary-link">
              Personal branding
            </Link>
          )}
          <Link to="/contact" className="site-button site-nav__cta">
            Start a project
          </Link>
        </div>

        <button
          ref={triggerRef}
          className="site-nav__toggle"
          type="button"
          onClick={() => setMenu({ open: !isOpen, locationKey })}
          aria-label={isOpen ? "Close navigation menu" : "Open navigation menu"}
          aria-expanded={isOpen}
          aria-controls="site-mobile-menu"
        >
          {isOpen ? "Close" : "Menu"}
        </button>
      </div>

      <div
        id="site-mobile-menu"
        className={`site-nav__panel ${isOpen ? "is-open" : ""}`}
        aria-hidden={!isOpen}
      >
        <nav className="site-nav__mobile-links" aria-label="Mobile navigation">
          {visibleNavLinks.map((link, index) => (
            <Link
              key={link.path}
              to={link.path}
              tabIndex={isOpen ? 0 : -1}
              aria-current={isActive(link.path) ? "page" : undefined}
              className={isActive(link.path) ? "is-active" : undefined}
              onClick={closeMenu}
            >
              <span className="site-nav__mobile-index">0{index + 1}</span>
              <span>{link.name}</span>
            </Link>
          ))}
          {pageToggles.personalBranding !== false && (
            <Link
              to="/personal-branding"
              tabIndex={isOpen ? 0 : -1}
              onClick={closeMenu}
            >
              <span className="site-nav__mobile-index">0{visibleNavLinks.length + 1}</span>
              <span>Personal branding</span>
            </Link>
          )}
          <Link
            to="/careers"
            tabIndex={isOpen ? 0 : -1}
            onClick={closeMenu}
          >
            <span className="site-nav__mobile-index">07</span>
            <span>Careers</span>
          </Link>
        </nav>
        <Link
          to="/contact"
          className="site-button"
          tabIndex={isOpen ? 0 : -1}
          onClick={closeMenu}
        >
          Start a project
        </Link>
        <p className="site-nav__panel-note">Motionly Media. Video made to move brands forward.</p>
      </div>
    </header>
  );
};

export default Navbar;
