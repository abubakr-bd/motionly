import React from "react";
import { Link } from "react-router-dom";
import { useSiteSettings } from "../../lib/useSiteData";
import { useTheme } from "../../lib/ThemeContext";
import { ArrowUpRight } from "lucide-react";

export const Footer = () => {
  const { settings } = useSiteSettings();
  const { theme } = useTheme();
  const isDark = theme === "dark";
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
    <footer className="bg-slate-50 dark:bg-[#03050B] border-t border-slate-200 dark:border-white/10 text-slate-700 dark:text-slate-300 pt-16 sm:pt-20 pb-12 relative overflow-hidden transition-colors duration-300">
      {/* Subtle blue bottom lighting */}
      <div className="pointer-events-none absolute bottom-0 left-1/2 -translate-x-1/2 w-[800px] h-[300px] bg-blue-500/5 dark:bg-blue-600/5 rounded-full blur-[140px] -z-10" />

      <div className="container max-w-6xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 sm:gap-12 pb-14 border-b border-slate-200 dark:border-white/10">
          {/* Brand Info */}
          <div className="md:col-span-6 space-y-4">
            <Link to="/" className="inline-block group" aria-label="Motionly Media home">
              <img
                src={isDark ? "/nav_logo_dark.png" : "/nav_logo.png"}
                alt="Motionly Media"
                className="h-8 w-auto object-contain transition-transform duration-300 group-hover:scale-105"
                width="140"
                height="32"
                loading="lazy"
                decoding="async"
              />
            </Link>
            <p className="text-sm text-slate-700 dark:text-slate-200 max-w-md leading-relaxed font-medium">
              Motionly is a creative and video marketing agency helping SaaS companies, founders, creators, and ambitious brands turn ideas into impactful visual experiences.
            </p>
            <div>
              <a
                href={`mailto:${email}`}
                className="inline-flex items-center gap-1.5 text-sm font-semibold text-slate-900 dark:text-white hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
              >
                <span>{email}</span>
                <ArrowUpRight className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400" />
              </a>
            </div>
          </div>

          {/* Navigation Links */}
          <div className="md:col-span-3">
            <h4 className="text-xs font-bold uppercase tracking-widest text-slate-900 dark:text-white mb-4">
              Explore
            </h4>
            <ul className="space-y-2.5">
              {navigation.map((item) => (
                <li key={item.to}>
                  <Link
                    to={item.to}
                    className="text-sm text-slate-700 dark:text-slate-200 hover:text-blue-600 dark:hover:text-white font-medium transition-colors"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Social & Contact */}
          <div className="md:col-span-3">
            <h4 className="text-xs font-bold uppercase tracking-widest text-slate-900 dark:text-white mb-4">
              Connect
            </h4>
            <ul className="space-y-2.5 mb-6">
              {social.length > 0 ? (
                social.map((item) => (
                  <li key={item.label}>
                    <a
                      href={item.href}
                      target="_blank"
                      rel="noreferrer"
                      className="text-sm text-slate-700 dark:text-slate-200 hover:text-blue-600 dark:hover:text-white font-medium transition-colors"
                    >
                      {item.label}
                    </a>
                  </li>
                ))
              ) : (
                <li className="text-sm text-slate-500">Social profiles coming soon</li>
              )}
            </ul>
            <Link
              to="/contact"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider bg-white dark:bg-white/[0.05] hover:bg-slate-100 dark:hover:bg-white/[0.1] text-slate-900 dark:text-white border border-slate-200 dark:border-white/10 hover:border-blue-500/40 transition-all shadow-sm"
            >
              <span>Start a project</span>
              <ArrowUpRight className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400" />
            </Link>
          </div>
        </div>

        {/* Bottom Credits & Legal */}
        <div className="pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-slate-600 dark:text-slate-400">
          <div>
            <p>&copy; {new Date().getFullYear()} Motionly Media. All rights reserved.</p>
            <p className="mt-1 text-[11px] text-slate-600 dark:text-slate-400 font-medium">
              Designed &amp; Developed by{" "}
              <a
                href="https://wa.me/8801948303128"
                target="_blank"
                rel="noopener noreferrer"
                className="underline text-slate-800 dark:text-slate-200 hover:text-blue-600 dark:hover:text-white font-semibold"
                title="Chat with Abu Bakar Siddique on WhatsApp"
              >
                Abu Bakar Siddique
              </a>{" "}
              &amp;{" "}
              <a
                href="https://kholipha-ahmmad-al-amin.equisaas-bd.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="underline text-slate-800 dark:text-slate-200 hover:text-blue-600 dark:hover:text-white font-medium"
              >
                Kholipha Ahmmad Al-Amin
              </a>{" "}
              in partnership with{" "}
              <a
                href="https://agency.equisaas-bd.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="underline text-slate-800 dark:text-slate-200 hover:text-blue-600 dark:hover:text-white font-medium"
              >
                EquiSaaS Agency
              </a>
              , an{" "}
              <a
                href="https://equisaas-bd.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="underline text-slate-800 dark:text-slate-200 hover:text-blue-600 dark:hover:text-white font-medium"
              >
                EquiSaaS BD
              </a>{" "}
              company{" "}
              <span className="text-slate-400 dark:text-slate-500">&bull;</span>{" "}
              <a
                href="https://wa.me/8801605049299"
                target="_blank"
                rel="noopener noreferrer"
                className="underline text-emerald-600 dark:text-emerald-400 hover:text-emerald-700 dark:hover:text-emerald-300 font-medium inline-flex items-center gap-0.5"
                title="Motionly Media Official WhatsApp"
              >
                WhatsApp: +880 1605049299
              </a>{" "}
              <span className="text-slate-400 dark:text-slate-500">&bull;</span>{" "}
              <a
                href="https://www.facebook.com/abubakrsiddiq.founder"
                target="_blank"
                rel="noopener noreferrer"
                className="underline text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 font-medium"
                title="Founder Facebook Profile"
              >
                Founder FB
              </a>{" "}
              <span className="text-slate-400 dark:text-slate-500">&bull;</span>{" "}
              <a
                href="https://www.facebook.com/motionlymedia"
                target="_blank"
                rel="noopener noreferrer"
                className="underline text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 font-medium"
                title="Motionly Media Facebook Page"
              >
                Motionly FB Page
              </a>.
            </p>
          </div>

          <div className="flex items-center gap-6 font-medium">
            <Link to="/privacy" className="hover:text-blue-600 dark:hover:text-white transition-colors">Privacy</Link>
            <Link to="/terms" className="hover:text-blue-600 dark:hover:text-white transition-colors">Terms</Link>
            <Link to="/refund" className="hover:text-blue-600 dark:hover:text-white transition-colors">Refund policy</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
