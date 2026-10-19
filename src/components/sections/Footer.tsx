import React from "react";
import { Link } from "react-router-dom";
import { useSiteSettings } from "../../lib/useSiteData";

const Footer = () => {
  const { settings } = useSiteSettings();
  const email = settings.contact.email || "hello@motionly.media";

  const pageToggles = settings.global.pageToggles || {
    personalBranding: true,
    services: true,
    portfolio: true,
    about: true
  };

  const navigation = [
    pageToggles.portfolio !== false ? { label: "Work", to: "/portfolio" } : null,
    pageToggles.services !== false ? { label: "Services", to: "/services" } : null,
    { label: "Process", to: "/#process" },
    pageToggles.about !== false ? { label: "About", to: "/about" } : null,
    { label: "Careers", to: "/careers" },
    { label: "Journal", to: "/blog" },
    pageToggles.personalBranding !== false ? { label: "Personal branding", to: "/personal-branding" } : null,
  ].filter(Boolean) as { label: string; to: string }[];

  const social = [
    { label: "Instagram", href: settings.contact.instagram },
    { label: "Facebook", href: settings.contact.facebook },
    { label: "LinkedIn", href: settings.contact.linkedin },
  ].filter((item) => item.href);

  return (
    <footer className="site-footer">
      <div className="site-container">
        <div className="site-footer__top">
          <div className="site-footer__brand-block">
            <Link to="/" className="site-footer__wordmark">
              {settings.global.siteName || "Motionly Media"}
            </Link>
            <p>
              Strategy, editing, and creative systems for brands that want their
              video to do more.
            </p>
            <a className="site-footer__email" href={`mailto:${email}`}>
              {email}
            </a>
          </div>

          <div className="site-footer__link-groups">
            <div>
              <h2>Explore</h2>
              <nav aria-label="Footer navigation">
                {navigation.map((item) => (
                  <Link key={item.to} to={item.to}>{item.label}</Link>
                ))}
              </nav>
            </div>
            <div>
              <h2>Follow</h2>
              <nav aria-label="Social links">
                {social.length > 0 ? social.map((item) => (
                  <a key={item.label} href={item.href} target="_blank" rel="noreferrer">
                    {item.label}
                  </a>
                )) : <span className="site-footer__empty">Social profiles coming soon</span>}
              </nav>
              <Link className="site-footer__contact-link" to="/contact">Start a project</Link>
            </div>
          </div>
        </div>

        <div className="site-footer__bottom">
          <div>
            <p>(c) {new Date().getFullYear()} Motionly Media. All rights reserved.</p>
            <p className="site-footer__credits" style={{ fontSize: '0.875rem', marginTop: '0.5rem', color: '#cbd5e1' }}>
              Designed & Developed by <a href="https://kholipha-ahmmad-al-amin.equisaas-bd.com/" target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'underline', color: '#ffffff' }}>Kholipha Ahmmad Al-Amin</a> for <a href="https://agency.equisaas-bd.com/" target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'underline', color: '#ffffff' }}>EquiSaaS Agency</a>, an <a href="https://equisaas-bd.com/" target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'underline', color: '#ffffff' }}>EquiSaaS BD</a> company.
            </p>
          </div>
          <nav aria-label="Legal links">
            <Link to="/privacy">Privacy</Link>
            <Link to="/terms">Terms</Link>
            <Link to="/refund">Refund policy</Link>
          </nav>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
